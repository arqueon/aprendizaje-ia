import { createHash } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import yauzl from "yauzl";
import { ZipFile } from "yazl";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const manifestPath = path.join(repoRoot, "h5p/activities/manifest.json");
const catalogPath = path.join(repoRoot, "data/h5p/catalog.json");
const libraryLicensesPath = path.join(repoRoot, "h5p/templates/library-licenses.json");
const packagesRoot = path.join(repoRoot, "h5p/packages");
const updateLock = process.argv.includes("--update-lock");
const fixedTime = new Date(1980, 0, 1, 0, 0, 0, 0);
const fixedFileMode = 0o100644;
const maxEntryBytes = 64 * 1024 * 1024;
const maxPackageBytes = 250 * 1024 * 1024;

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function compareNames(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function isSyncBackupName(name) {
  return /^\..+\.~[a-f0-9]+$/i.test(name);
}

function isWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function validateZipPath(name) {
  if (
    !name ||
    name.includes("\\") ||
    name.includes("\0") ||
    name.startsWith("/") ||
    /^[a-zA-Z]:/.test(name)
  ) {
    throw new Error(`Ruta ZIP no permitida: ${JSON.stringify(name)}`);
  }
  const withoutSlash = name.endsWith("/") ? name.slice(0, -1) : name;
  const segments = withoutSlash.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Ruta ZIP ambigua: ${name}`);
  }
  if (path.posix.normalize(withoutSlash) !== withoutSlash) {
    throw new Error(`Ruta ZIP no normalizada: ${name}`);
  }
}

async function validatedPath(relative, expectedType) {
  if (!relative || path.isAbsolute(relative)) {
    throw new Error(`Ruta fuente no permitida: ${relative}`);
  }
  const absolute = path.resolve(repoRoot, relative);
  if (!isWithin(repoRoot, absolute)) {
    throw new Error(`Ruta fuente fuera del repositorio: ${relative}`);
  }
  const resolved = await realpath(absolute);
  if (!isWithin(repoRoot, resolved)) {
    throw new Error(`La fuente resuelve fuera del repositorio: ${relative}`);
  }
  const stats = await lstat(absolute);
  if (stats.isSymbolicLink()) throw new Error(`No se admiten symlinks: ${relative}`);
  if (expectedType === "file" && !stats.isFile()) throw new Error(`Se esperaba archivo: ${relative}`);
  if (expectedType === "directory" && !stats.isDirectory()) {
    throw new Error(`Se esperaba directorio: ${relative}`);
  }
  return absolute;
}

async function walk(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => compareNames(a.name, b.name))) {
    if (isSyncBackupName(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(base, absolute).split(path.sep).join("/");
    const stats = await lstat(absolute);
    if (stats.isSymbolicLink()) throw new Error(`No se admiten symlinks: ${relative}`);
    if (stats.isDirectory()) files.push(...(await walk(absolute, base)));
    else if (stats.isFile()) files.push({ absolute, relative });
    else throw new Error(`Tipo de archivo no admitido: ${relative}`);
  }
  return files;
}

async function extractZip(buffer, destination) {
  const zip = await new Promise((resolve, reject) => {
    yauzl.fromBuffer(
      buffer,
      { lazyEntries: true, decodeStrings: true, validateEntrySizes: true },
      (error, archive) => (error ? reject(error) : resolve(archive))
    );
  });
  const names = new Set();
  let totalBytes = 0;
  await new Promise((resolve, reject) => {
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      zip.close();
      error ? reject(error) : resolve();
    };
    zip.on("error", finish);
    zip.on("end", () => finish());
    zip.on("entry", (entry) => {
      (async () => {
        validateZipPath(entry.fileName);
        if (names.has(entry.fileName)) throw new Error(`Entrada ZIP duplicada: ${entry.fileName}`);
        names.add(entry.fileName);
        if (entry.generalPurposeBitFlag & 0x1) {
          throw new Error(`Entrada ZIP cifrada no permitida: ${entry.fileName}`);
        }
        const unixMode = (entry.externalFileAttributes >>> 16) & 0xffff;
        if ((unixMode & 0xf000) === 0xa000) {
          throw new Error(`Enlace simbólico ZIP no permitido: ${entry.fileName}`);
        }
        totalBytes += entry.uncompressedSize;
        if (entry.uncompressedSize > maxEntryBytes || totalBytes > maxPackageBytes) {
          throw new Error(`Paquete H5P excede el límite de tamaño: ${entry.fileName}`);
        }
        const output = path.join(destination, entry.fileName);
        const relative = path.relative(destination, output);
        if (relative.startsWith("..") || path.isAbsolute(relative)) {
          throw new Error(`Escape de directorio detectado: ${entry.fileName}`);
        }
        if (entry.fileName.endsWith("/")) {
          await mkdir(output, { recursive: true });
          zip.readEntry();
          return;
        }
        await mkdir(path.dirname(output), { recursive: true });
        const stream = await new Promise((resolveStream, rejectStream) => {
          zip.openReadStream(entry, (error, readStream) =>
            error ? rejectStream(error) : resolveStream(readStream)
          );
        });
        await pipeline(stream, createWriteStream(output, { mode: 0o644 }));
        zip.readEntry();
      })().catch(finish);
    });
    zip.readEntry();
  });
}

async function copyDirectoryContents(source, destination) {
  for (const entry of await readdir(source, { withFileTypes: true })) {
    const absolute = path.join(source, entry.name);
    const stats = await lstat(absolute);
    if (stats.isSymbolicLink()) throw new Error(`No se admiten symlinks: ${absolute}`);
    await cp(absolute, path.join(destination, entry.name), {
      recursive: stats.isDirectory(),
      force: true
    });
  }
}

async function writeZip(files, destination) {
  const zip = new ZipFile();
  const temporary = `${destination}.tmp`;
  await mkdir(path.dirname(destination), { recursive: true });
  await rm(temporary, { force: true });
  const completed = new Promise((resolve, reject) => {
    const output = createWriteStream(temporary, { mode: 0o644 });
    output.on("close", resolve);
    output.on("error", reject);
    zip.outputStream.on("error", reject);
    zip.outputStream.pipe(output);
  });
  for (const file of files) {
    zip.addFile(file.absolute, file.relative, {
      mtime: fixedTime,
      mode: fixedFileMode,
      compress: false,
      forceDosTimestamp: true
    });
  }
  zip.end();
  await completed;
  await rename(temporary, destination);
}

async function validatePackageRoot(directory, entryID) {
  const h5p = JSON.parse(await readFile(path.join(directory, "h5p.json"), "utf8"));
  JSON.parse(await readFile(path.join(directory, "content/content.json"), "utf8"));
  if (!h5p.mainLibrary || !Array.isArray(h5p.preloadedDependencies)) {
    throw new Error(`h5p.json incompleto en ${entryID}`);
  }
  const main = h5p.preloadedDependencies.find(
    (dependency) => dependency.machineName === h5p.mainLibrary
  );
  if (!main) throw new Error(`Biblioteca principal ausente en h5p.json: ${entryID}`);
  const libraryDirectory = path.join(
    directory,
    `${main.machineName}-${main.majorVersion}.${main.minorVersion}`
  );
  const definition = JSON.parse(await readFile(path.join(libraryDirectory, "library.json"), "utf8"));
  if (!definition.license) throw new Error(`Biblioteca principal sin licencia: ${entryID}`);
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const libraryLicenses = JSON.parse(await readFile(libraryLicensesPath, "utf8"));
const results = [];

async function prepareLibraries(directory, entryID) {
  const h5p = JSON.parse(await readFile(path.join(directory, "h5p.json"), "utf8"));
  const required = new Map();
  const pending = [];
  for (const dependency of h5p.preloadedDependencies || []) {
    const directoryName =
      `${dependency.machineName}-${dependency.majorVersion}.${dependency.minorVersion}`;
    if (!required.has(directoryName)) {
      required.set(directoryName, dependency);
      pending.push([directoryName, dependency]);
    }
  }
  const audit = {};
  for (let index = 0; index < pending.length; index += 1) {
    const [directoryName] = pending[index];
    const definitionPath = path.join(directory, directoryName, "library.json");
    const definition = JSON.parse(await readFile(definitionPath, "utf8"));
    let source = "library.json";
    if (!definition.license) {
      const lock = libraryLicenses.libraries?.[definition.machineName];
      if (!lock?.license || !lock?.source) {
        throw new Error(
          `Falta licencia verificada para ${definition.machineName} en ${entryID}`
        );
      }
      definition.license = lock.license;
      source = lock.source;
      await writeFile(definitionPath, `${JSON.stringify(definition, null, 2)}\n`, "utf8");
    }
    audit[directoryName] = {
      license: definition.license,
      source
    };
    for (const nested of [
      ...(definition.preloadedDependencies || []),
      ...(definition.dynamicDependencies || [])
    ]) {
      const nestedName = `${nested.machineName}-${nested.majorVersion}.${nested.minorVersion}`;
      if (!required.has(nestedName)) {
        required.set(nestedName, nested);
        pending.push([nestedName, nested]);
      }
    }
  }
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || required.has(entry.name) || entry.name === "content") continue;
    try {
      await lstat(path.join(directory, entry.name, "library.json"));
      await rm(path.join(directory, entry.name), { recursive: true, force: true });
    } catch {
      // Conserva directorios que no son bibliotecas H5P.
    }
  }
  await writeFile(
    path.join(directory, "LIBRARY-LICENSES.json"),
    `${JSON.stringify({ schemaVersion: 1, libraries: audit }, null, 2)}\n`,
    "utf8"
  );
}

for (const [entryID, activity] of Object.entries(manifest.activities || {}).sort(([left], [right]) =>
  compareNames(left, right)
)) {
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(entryID)) {
    throw new Error(`Identificador no permitido: ${entryID}`);
  }
  if (!/^[a-z0-9][a-z0-9.-]+\.h5p$/.test(activity.package || "")) {
    throw new Error(`Nombre de paquete no permitido: ${entryID}`);
  }
  const destination = path.join(packagesRoot, activity.package);
  if (!isWithin(packagesRoot, destination)) throw new Error(`Destino inseguro: ${destination}`);
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), `udgia004b-${entryID}-`));
  const packageRoot = path.join(temporaryRoot, "package");
  await mkdir(packageRoot);
  try {
    if (activity.template) {
      const templatePath = await validatedPath(activity.template, "file");
      const templateBuffer = await readFile(templatePath);
      const templateHash = sha256(templateBuffer);
      if (templateHash !== activity.templateSha256) {
        throw new Error(`Hash inesperado en plantilla ${entryID}: ${templateHash}`);
      }
      await extractZip(templateBuffer, packageRoot);
      await rm(path.join(packageRoot, "content"), { recursive: true, force: true });
      await rm(path.join(packageRoot, "h5p.json"), { force: true });
      const overlay = await validatedPath(activity.overlay, "directory");
      await copyDirectoryContents(overlay, packageRoot);
    } else {
      const sourceRoot = await validatedPath(activity.sourceRoot, "directory");
      await copyDirectoryContents(sourceRoot, packageRoot);
    }
    await prepareLibraries(packageRoot, entryID);
    await validatePackageRoot(packageRoot, entryID);
    const files = await walk(packageRoot);
    await writeZip(files, destination);
    const packageHash = sha256(await readFile(destination));
    const entry = catalog.contents?.[entryID];
    if (!entry) throw new Error(`Falta ${entryID} en data/h5p/catalog.json`);
    if (path.resolve(repoRoot, entry.source) !== destination) {
      throw new Error(`La fuente del catálogo no coincide para ${entryID}`);
    }
    if (updateLock) entry.sourceSha256 = packageHash;
    else if (entry.sourceSha256 !== packageHash) {
      throw new Error(
        `Hash inesperado para ${entryID}: ${packageHash}; catálogo: ${entry.sourceSha256}. ` +
          "Usa --update-lock solo después de revisar los cambios."
      );
    }
    results.push(`${entry.source}\t${packageHash}\t${files.length} archivos`);
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

if (updateLock) {
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}
process.stdout.write(`${results.join("\n")}\n`);
