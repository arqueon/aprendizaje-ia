import { mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

function fail(message) {
  console.error(`build-site: ${message}`);
  process.exit(64);
}

const rawBaseURL = process.argv[2] || "";
const outputRoot = path.resolve(process.argv[3] || "");

if (!rawBaseURL) fail("HUGO_BASEURL es obligatorio");
if (!process.argv[3]) fail("falta el directorio de salida");

let baseURL;
try {
  baseURL = new URL(rawBaseURL);
} catch {
  fail("HUGO_BASEURL no es una URL válida");
}

if (!["http:", "https:"].includes(baseURL.protocol)) {
  fail("HUGO_BASEURL debe usar HTTP o HTTPS");
}
if (baseURL.username || baseURL.password) {
  fail("HUGO_BASEURL no debe contener credenciales");
}
if (baseURL.search || baseURL.hash) {
  fail("HUGO_BASEURL no debe contener query string ni fragmento");
}
if (!rawBaseURL.endsWith("/") || baseURL.href !== rawBaseURL) {
  fail("HUGO_BASEURL debe ser una URL absoluta normalizada y terminar en /");
}
if (baseURL.pathname.includes("//") || baseURL.pathname.split("/").includes("..")) {
  fail("HUGO_BASEURL contiene una ruta insegura");
}

const mountPath = decodeURIComponent(baseURL.pathname)
  .split("/")
  .filter(Boolean);
for (const segment of mountPath) {
  if (!/^[A-Za-z0-9._~-]+$/.test(segment)) {
    fail(`segmento de subruta no admitido: ${segment}`);
  }
}

const destination = path.join(outputRoot, ...mountPath);
const relative = path.relative(outputRoot, destination);
if (relative.startsWith("..") || path.isAbsolute(relative)) {
  fail("el destino calculado escapa del directorio de salida");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(destination, { recursive: true });

const hugo = process.env.HUGO_BIN || "hugo";
const result = spawnSync(
  hugo,
  [
    "--baseURL",
    rawBaseURL,
    "--destination",
    destination,
    "--environment",
    "production",
    "--gc",
    "--minify",
    "--cleanDestinationDir",
  ],
  {
    cwd: path.resolve(import.meta.dirname, "../.."),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  },
);

if (result.status !== 0) {
  process.stdout.write(result.stdout || "");
  process.stderr.write(result.stderr || "");
  process.exit(result.status ?? 1);
}

process.stdout.write(result.stdout || "");
process.stderr.write(result.stderr || "");
console.log(`build-site: ${rawBaseURL} -> ${destination}`);
