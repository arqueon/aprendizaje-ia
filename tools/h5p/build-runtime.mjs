import { createHash } from "node:crypto";
import { createReadStream, createWriteStream } from "node:fs";
import {
  access,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import yauzl from "yauzl";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const cliValue = (flag) => {
  const index = process.argv.indexOf(flag);
  return index === -1 ? "" : process.argv[index + 1] || "";
};
const catalogPath = path.resolve(cliValue("--catalog") || path.join(repoRoot, "data/h5p/catalog.json"));
const runtimeSource = path.join(repoRoot, "h5p/runtime");
const packagesRoot = path.join(repoRoot, "h5p/packages");
const target = path.join(repoRoot, "static/h5p/udgia/v1");
const checkOnly = process.argv.includes("--check");
const maxEntryBytes = 64 * 1024 * 1024;
const maxPackageBytes = 250 * 1024 * 1024;

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function validateTarget(destination) {
  const expected = path.join("static", "h5p", "udgia", "v1");
  if (path.relative(repoRoot, destination) !== expected) {
    throw new Error(`Destino H5P inseguro: ${destination}`);
  }
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

function isWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function normalizedLicense(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

function validateCatalogEntry(entryID, entry) {
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(entryID)) {
    throw new Error(`Identificador de catálogo no permitido: ${entryID}`);
  }
  if (!entry || typeof entry !== "object") {
    throw new Error(`Entrada de catálogo inválida: ${entryID}`);
  }

  const packagePath = path.resolve(repoRoot, String(entry.source || ""));
  if (
    !isWithin(packagesRoot, packagePath) ||
    path.extname(packagePath).toLowerCase() !== ".h5p"
  ) {
    throw new Error(`Fuente H5P fuera de h5p/packages: ${entryID}`);
  }

  if (
    entry.adapter !== null &&
    entry.adapter !== undefined &&
    !/^[a-z0-9][a-z0-9-]{0,79}\.css$/.test(entry.adapter)
  ) {
    throw new Error(`Adaptador no permitido en ${entryID}: ${entry.adapter}`);
  }
  if (!normalizedLicense(entry.contentLicense) || !normalizedLicense(entry.libraryLicense)) {
    throw new Error(`Licencias incompletas en el catálogo: ${entryID}`);
  }
  if (
    !entry.provenance ||
    !normalizedLicense(entry.provenance.kind) ||
    !normalizedLicense(entry.provenance.author) ||
    !normalizedLicense(entry.provenance.source)
  ) {
    throw new Error(`Procedencia incompleta en el catálogo: ${entryID}`);
  }
  return packagePath;
}

async function extractZip(buffer, destination) {
  const zip = await new Promise((resolve, reject) => {
    yauzl.fromBuffer(
      buffer,
      { lazyEntries: true, decodeStrings: true, validateEntrySizes: true },
      (error, archive) => (error ? reject(error) : resolve(archive))
    );
  });

  let totalBytes = 0;
  const names = new Set();

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
        const fileType = unixMode & 0xf000;
        if (fileType === 0xa000) {
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

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function validateLibrary(directory, expected) {
  const definitionPath = path.join(directory, "library.json");
  const definition = JSON.parse(await readFile(definitionPath, "utf8"));
  const expectedDirectory = `${definition.machineName}-${definition.majorVersion}.${definition.minorVersion}`;
  if (path.basename(directory) !== expectedDirectory) {
    throw new Error(
      `Biblioteca mal nombrada: ${path.basename(directory)}; se esperaba ${expectedDirectory}`
    );
  }
  if (
    expected &&
    (definition.machineName !== expected.mainLibrary ||
      definition.majorVersion !== expected.majorVersion ||
      definition.minorVersion !== expected.minorVersion)
  ) {
    throw new Error(`Biblioteca principal no coincide con el catálogo: ${expectedDirectory}`);
  }
  if (
    expected &&
    normalizedLicense(definition.license) !== normalizedLicense(expected.libraryLicense)
  ) {
    throw new Error(
      `Licencia de biblioteca no coincide en ${expectedDirectory}: ` +
        `${definition.license} / ${expected.libraryLicense}`
    );
  }

  for (const asset of [...(definition.preloadedJs || []), ...(definition.preloadedCss || [])]) {
    const assetPath = asset.path;
    validateZipPath(assetPath);
    if (!(await exists(path.join(directory, assetPath)))) {
      throw new Error(`Activo declarado ausente en ${expectedDirectory}: ${assetPath}`);
    }
  }
  return definition;
}

async function copyPackage(entryID, entry, packageRoot, output) {
  const h5pPath = path.join(packageRoot, "h5p.json");
  const contentPath = path.join(packageRoot, "content");
  const h5p = JSON.parse(await readFile(h5pPath, "utf8"));
  const packageLicense = normalizedLicense(
    [h5p.license, h5p.licenseVersion].filter(Boolean).join(" ")
  );

  if (
    h5p.mainLibrary !== entry.mainLibrary ||
    !h5p.preloadedDependencies?.some(
      (dependency) =>
        dependency.machineName === entry.mainLibrary &&
        Number(dependency.majorVersion) === Number(entry.majorVersion) &&
        Number(dependency.minorVersion) === Number(entry.minorVersion)
    )
  ) {
    throw new Error(`h5p.json de ${entryID} no coincide con el catálogo`);
  }
  if (packageLicense !== normalizedLicense(entry.contentLicense)) {
    throw new Error(
      `Licencia de contenido no coincide en ${entryID}: ` +
        `${packageLicense} / ${entry.contentLicense}`
    );
  }
  if (!(await exists(path.join(contentPath, "content.json")))) {
    throw new Error(`Falta content/content.json en ${entryID}`);
  }

  const contentOutput = path.join(output, "content", entryID);
  await mkdir(contentOutput, { recursive: true });
  await cp(h5pPath, path.join(contentOutput, "h5p.json"));
  await cp(contentPath, path.join(contentOutput, "content"), { recursive: true });

  for (const licenseName of ["LICENSE-content.txt", "LICENSE", "NOTICE"]) {
    const licensePath = path.join(packageRoot, licenseName);
    if (await exists(licensePath)) {
      await cp(licensePath, path.join(contentOutput, licenseName));
    }
  }

  const dependencies = new Map(
    h5p.preloadedDependencies.map((dependency) => [
      `${dependency.machineName}-${dependency.majorVersion}.${dependency.minorVersion}`,
      dependency
    ])
  );

  const pending = [...dependencies.entries()];
  for (let index = 0; index < pending.length; index += 1) {
    const [directoryName, dependency] = pending[index];
    const librarySource = path.join(packageRoot, directoryName);
    if (!(await exists(librarySource))) {
      throw new Error(`Dependencia ausente en ${entryID}: ${directoryName}`);
    }
    const definition = await validateLibrary(
      librarySource,
      dependency.machineName === entry.mainLibrary ? entry : null
    );
    const libraryOutput = path.join(output, "libraries", directoryName);
    if (await exists(libraryOutput)) {
      const sourceHash = await hashTree(librarySource);
      const outputHash = await hashTree(libraryOutput);
      if (sourceHash !== outputHash) {
        throw new Error(`Conflicto entre copias de ${directoryName}`);
      }
    } else {
      await cp(librarySource, libraryOutput, { recursive: true });
    }
    if (!definition.license) {
      throw new Error(`Biblioteca sin licencia declarada: ${directoryName}`);
    }
    for (const nested of [
      ...(definition.preloadedDependencies || []),
      ...(definition.dynamicDependencies || [])
    ]) {
      const nestedName = `${nested.machineName}-${nested.majorVersion}.${nested.minorVersion}`;
      if (!dependencies.has(nestedName)) {
        dependencies.set(nestedName, nested);
        pending.push([nestedName, nested]);
      }
    }
  }
}

async function listFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    if ((await lstat(absolute)).isSymbolicLink()) {
      throw new Error(`El runtime generado no admite symlinks: ${absolute}`);
    }
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absolute, base)));
    } else if (entry.isFile()) {
      files.push(path.relative(base, absolute).split(path.sep).join("/"));
    }
  }
  return files;
}

async function hashTree(directory) {
  const hash = createHash("sha256");
  for (const relative of await listFiles(directory)) {
    hash.update(relative);
    hash.update(await readFile(path.join(directory, relative)));
  }
  return hash.digest("hex");
}

async function writeManifest(output, catalog, contentIndex) {
  const files = [];
  let totalBytes = 0;
  for (const relative of await listFiles(output)) {
    if (relative === "runtime-manifest.json") continue;
    const buffer = await readFile(path.join(output, relative));
    totalBytes += buffer.byteLength;
    files.push({ path: relative, bytes: buffer.byteLength, sha256: sha256(buffer) });
  }

  const manifest = {
    schemaVersion: 1,
    runtimeVersion: catalog.runtimeVersion,
    player: catalog.player,
    contents: contentIndex.contents,
    totalBytes,
    files
  };
  await writeFile(
    path.join(output, "runtime-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );
}

async function patchPlayerPrivacy(output, catalog) {
  const expectedPatchID = "volatile-anonymous-xapi-actor";
  if (catalog.player.privacyPatch?.id !== expectedPatchID) {
    throw new Error(`Parche de privacidad H5P no gobernado: ${catalog.player.privacyPatch?.id}`);
  }
  const target = path.join(output, "player/frame.bundle.js");
  const source = await readFile(target, "utf8");
  const persistentActor =
    'try{localStorage.H5PUserUUID?t=localStorage.H5PUserUUID:(t=e.createUUID(),' +
    'localStorage.H5PUserUUID=t)}catch(n){t="not-trackable-"+e.createUUID()}';
  const volatileActor = 't="not-trackable-"+e.createUUID();';
  const matches = source.split(persistentActor).length - 1;
  if (matches !== 1) {
    throw new Error(
      `No se pudo aplicar de forma unívoca el parche de privacidad H5P (${matches} coincidencias)`
    );
  }
  const patched = source.replace(persistentActor, volatileActor);
  if (patched.includes("H5PUserUUID")) {
    throw new Error("El player H5P conserva una referencia a H5PUserUUID");
  }
  await writeFile(target, patched, "utf8");
}

async function build(output) {
  const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  const playerRoot = path.join(repoRoot, "node_modules/h5p-standalone");
  const playerPackage = JSON.parse(await readFile(path.join(playerRoot, "package.json"), "utf8"));
  if (playerPackage.version !== catalog.player.version || playerPackage.license !== "MIT") {
    throw new Error(
      `Player inesperado: ${playerPackage.version}/${playerPackage.license}; ` +
        `catálogo: ${catalog.player.version}/${catalog.player.license}`
    );
  }

  await mkdir(output, { recursive: true });
  await cp(path.join(playerRoot, "dist"), path.join(output, "player"), { recursive: true });
  await patchPlayerPrivacy(output, catalog);
  await cp(path.join(runtimeSource, "host.js"), path.join(output, "host.js"));
  await cp(path.join(runtimeSource, "host.css"), path.join(output, "host.css"));
  await cp(path.join(runtimeSource, "embed.html"), path.join(output, "embed.html"));
  await cp(path.join(runtimeSource, "embed.js"), path.join(output, "embed.js"));
  await cp(path.join(runtimeSource, "embed.css"), path.join(output, "embed.css"));
  await mkdir(path.join(output, "themes"), { recursive: true });
  await cp(
    path.join(runtimeSource, "theme-udg-c.css"),
    path.join(output, "themes/udg-c.css")
  );
  await mkdir(path.join(output, "licenses"), { recursive: true });
  for (const licenseName of ["LICENSE", "LICENSE.md", "LICENSE.txt"]) {
    const licensePath = path.join(playerRoot, licenseName);
    if (await exists(licensePath)) {
      await cp(licensePath, path.join(output, "licenses/h5p-standalone-MIT.txt"));
      break;
    }
  }

  const contentIndex = {
    schemaVersion: 1,
    runtimeVersion: catalog.runtimeVersion,
    contents: {}
  };

  for (const [entryID, entry] of Object.entries(catalog.contents)) {
    const packagePath = validateCatalogEntry(entryID, entry);
    const packageBuffer = await readFile(packagePath);
    const packageHash = sha256(packageBuffer);
    if (packageHash !== entry.sourceSha256) {
      throw new Error(
        `Hash inesperado para ${entryID}: ${packageHash}; catálogo: ${entry.sourceSha256}`
      );
    }

    if (entry.adapter) {
      const adapterSource = path.join(runtimeSource, "adapters", entry.adapter);
      if (!(await exists(adapterSource))) {
        throw new Error(`Adaptador declarado ausente en ${entryID}: ${entry.adapter}`);
      }
      await mkdir(path.join(output, "adapters"), { recursive: true });
      await cp(adapterSource, path.join(output, "adapters", entry.adapter));
    }

    const packageRoot = await mkdtemp(path.join(tmpdir(), `udgia-h5p-${entryID}-`));
    try {
      await extractZip(packageBuffer, packageRoot);
      await copyPackage(entryID, entry, packageRoot, output);
    } finally {
      await rm(packageRoot, { recursive: true, force: true });
    }

    contentIndex.contents[entryID] = {
      path: entryID,
      title: entry.title,
      mainLibrary: entry.mainLibrary,
      adapter: entry.adapter,
      fullScreen: entry.fullScreen === true,
      reportingIsEnabled: entry.reportingIsEnabled === true
    };
  }

  await writeFile(
    path.join(output, "content-index.json"),
    `${JSON.stringify(contentIndex, null, 2)}\n`,
    "utf8"
  );
  await writeManifest(output, catalog, contentIndex);
}

async function compareDirectories(expected, actual) {
  const expectedFiles = await listFiles(expected);
  const actualFiles = await listFiles(actual);
  if (JSON.stringify(expectedFiles) !== JSON.stringify(actualFiles)) {
    throw new Error("El inventario del runtime generado difiere del versionado");
  }
  for (const relative of expectedFiles) {
    const expectedBuffer = await readFile(path.join(expected, relative));
    const actualBuffer = await readFile(path.join(actual, relative));
    if (!expectedBuffer.equals(actualBuffer)) {
      throw new Error(`El runtime versionado no es reproducible: ${relative}`);
    }
  }
}

async function auditPackage(packagePath, expectedHash) {
  const packageBuffer = await readFile(path.resolve(packagePath));
  const packageHash = sha256(packageBuffer);
  if (expectedHash && expectedHash !== packageHash) {
    throw new Error(`Hash inesperado: ${packageHash}; se esperaba ${expectedHash}`);
  }

  const auditRoot = await mkdtemp(path.join(tmpdir(), "udgia-h5p-audit-"));
  try {
    await extractZip(packageBuffer, auditRoot);
    process.stdout.write(`Paquete seguro para extracción: ${packageHash}\n`);
  } finally {
    await rm(auditRoot, { recursive: true, force: true });
  }
}

async function main() {
  const auditIndex = process.argv.indexOf("--audit-package");
  if (auditIndex !== -1) {
    const packagePath = process.argv[auditIndex + 1];
    if (!packagePath) throw new Error("--audit-package requiere una ruta");
    const expectedIndex = process.argv.indexOf("--expected-sha256");
    const expectedHash = expectedIndex === -1 ? "" : process.argv[expectedIndex + 1];
    await auditPackage(packagePath, expectedHash);
    return;
  }

  validateTarget(target);
  const stagingRoot = await mkdtemp(path.join(tmpdir(), "udgia-h5p-runtime-"));
  const staging = path.join(stagingRoot, "v1");
  try {
    await build(staging);
    if (checkOnly) {
      await compareDirectories(staging, target);
      process.stdout.write(`Runtime verificado: ${path.relative(repoRoot, target)}\n`);
    } else {
      const replacement = `${target}.next`;
      validateTarget(target);
      await rm(replacement, { recursive: true, force: true });
      await mkdir(path.dirname(target), { recursive: true });
      await cp(staging, replacement, { recursive: true });
      await rm(target, { recursive: true, force: true });
      await rename(replacement, target);
      const runtimeStats = await stat(path.join(target, "runtime-manifest.json"));
      process.stdout.write(
        `Runtime generado: ${path.relative(repoRoot, target)} (${runtimeStats.size} bytes de manifiesto)\n`
      );
    }
  } finally {
    await rm(stagingRoot, { recursive: true, force: true });
  }
}

await main();
