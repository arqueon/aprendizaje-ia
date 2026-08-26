import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import {
  lstat,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ZipFile } from "yazl";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const fixtureRoot = path.join(repoRoot, "h5p/fixtures/udg-runtime-probe");
const packagePath = path.join(repoRoot, "h5p/packages/udg-runtime-probe-1.0.0.h5p");
const catalogPath = path.join(repoRoot, "data/h5p/catalog.json");
const updateLock = process.argv.includes("--update-lock");
const fixedTime = new Date(1980, 0, 1, 0, 0, 0, 0);
const fixedFileMode = 0o100644;

function compareNames(left, right) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function isSyncBackupName(name) {
  return /^\..+\.~[a-f0-9]+$/i.test(name);
}

async function walk(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((a, b) => compareNames(a.name, b.name))) {
    if (isSyncBackupName(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(base, absolute).split(path.sep).join("/");
    const stats = await lstat(absolute);
    if (stats.isSymbolicLink()) {
      throw new Error(`La fixture no admite enlaces simbólicos: ${relative}`);
    }
    if (stats.isDirectory()) {
      files.push(...(await walk(absolute, base)));
    } else if (stats.isFile()) {
      files.push({ absolute, relative });
    } else {
      throw new Error(`Tipo de archivo no admitido: ${relative}`);
    }
  }

  return files;
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

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

const files = await walk(fixtureRoot);
await writeZip(files, packagePath);
const packageHash = sha256(await readFile(packagePath));
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const entry = catalog.contents?.["runtime-probe"];
if (!entry) throw new Error("Falta runtime-probe en data/h5p/catalog.json");

if (updateLock) {
  entry.sourceSha256 = packageHash;
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
} else if (entry.sourceSha256 !== packageHash) {
  throw new Error(
    `Hash inesperado para runtime-probe: ${packageHash}; catálogo: ${entry.sourceSha256}. ` +
      "Revisa los cambios y usa --update-lock únicamente si son intencionales."
  );
}

process.stdout.write(
  `${path.relative(repoRoot, packagePath)}\t${packageHash}\t${files.length} archivos\n`
);
