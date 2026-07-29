import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const docker = process.env.DOCKER_BIN || "docker";
const createdContainers = [];
const createdImages = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function command(args, { quiet = false } = {}) {
  const result = spawnSync(docker, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  if (!quiet) {
    process.stdout.write(result.stdout || "");
    process.stderr.write(result.stderr || "");
  }
  if (result.status !== 0) {
    throw new Error(`${docker} ${args.join(" ")} falló con ${result.status}`);
  }
  return (result.stdout || "").trim();
}

async function response(baseURL, pathname, options = {}) {
  const result = await fetch(new URL(pathname, baseURL), {
    redirect: "manual",
    signal: AbortSignal.timeout(10000),
    ...options,
  });
  return result;
}

function header(result, name) {
  return result.headers.get(name) || "";
}

async function waitUntilReady(baseURL) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const result = await response(baseURL, "/healthz");
      if (result.status === 200) return;
    } catch {
      // El socket todavía no está disponible.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`${baseURL} no respondió /healthz`);
}

async function probe(baseURL, mount) {
  const prefix = mount ? `/${mount}/` : "/";
  const page = await response(baseURL, prefix);
  assert(page.status === 200, `${prefix}: HTTP ${page.status}`);
  assert(header(page, "content-type").startsWith("text/html"), `${prefix}: MIME HTML`);
  assert(header(page, "cache-control") === "no-cache", `${prefix}: caché HTML`);
  assert(header(page, "x-content-type-options") === "nosniff", `${prefix}: nosniff`);
  assert(
    header(page, "referrer-policy") === "strict-origin-when-cross-origin",
    `${prefix}: Referrer-Policy`,
  );
  assert(
    header(page, "content-security-policy").includes("frame-src 'self'"),
    `${prefix}: CSP`,
  );

  const health = await response(baseURL, "/healthz");
  assert(health.status === 200 && (await health.text()) === "ok\n", "healthz");
  assert(header(health, "cache-control") === "no-store", "healthz: caché");

  const embedPath = `${prefix}h5p/udgia/v1/embed.html?content=runtime-probe&instance=qa`;
  const embed = await response(baseURL, embedPath);
  assert(embed.status === 200, "embed H5P con query string");
  assert(header(embed, "cache-control") === "no-cache", "embed H5P: caché");

  const jsonPath = `${prefix}h5p/udgia/v1/content-index.json?rev=qa`;
  const json = await response(baseURL, jsonPath);
  assert(json.status === 200, "content-index H5P");
  assert(header(json, "content-type").startsWith("application/json"), "MIME JSON");
  assert(header(json, "cache-control") === "no-cache", "JSON mutable: caché");

  const jsPath = `${prefix}h5p/udgia/v1/player/main.bundle.js?v=qa`;
  const js = await response(baseURL, jsPath);
  assert(js.status === 200, "player H5P");
  assert(header(js, "content-type").startsWith("application/javascript"), "MIME JavaScript");
  assert(
    header(js, "cache-control") === "public, max-age=31536000, immutable",
    "activo H5P versionado: caché",
  );

  const gzip = await response(baseURL, jsPath, {
    headers: { "Accept-Encoding": "gzip" },
  });
  assert(header(gzip, "content-encoding") === "gzip", "gzip H5P");

  const range = await response(baseURL, jsPath, {
    headers: { "Accept-Encoding": "identity", Range: "bytes=0-0" },
  });
  const rangeBody = new Uint8Array(await range.arrayBuffer());
  assert(range.status === 206, `Range: HTTP ${range.status}`);
  assert(/^bytes 0-0\/[1-9]\d*$/.test(header(range, "content-range")), "Range: Content-Range");
  assert(rangeBody.byteLength === 1, `Range: bytes=${rangeBody.byteLength}`);

  const missing = await response(
    baseURL,
    `${prefix}h5p/udgia/v1/__udgia_missing_asset__.js?probe=1`,
  );
  assert(missing.status === 404, `404 real: HTTP ${missing.status}`);
  assert(header(missing, "x-content-type-options") === "nosniff", "404: nosniff");

  if (mount) {
    const wrongRoot = await response(baseURL, "/");
    assert(wrongRoot.status === 404, `subruta: raíz inesperada ${wrongRoot.status}`);
  }
}

const available = spawnSync(docker, ["version", "--format", "{{.Server.Version}}"], {
  encoding: "utf8",
});
if (available.status !== 0) {
  console.error("Docker no está disponible. Ejecuta npm run qa:container:static en este entorno.");
  process.exit(69);
}

try {
  const scenarios = [
    { name: "root", baseURL: "http://127.0.0.1/", mount: "" },
    {
      name: "subpath",
      baseURL: "http://127.0.0.1/ecosistema-ia/",
      mount: "ecosistema-ia",
    },
  ];

  for (const scenario of scenarios) {
    const image = `aprendizaje-ia:udgia009-${scenario.name}-${process.pid}`;
    createdImages.push(image);
    command([
      "build",
      "--pull",
      "--tag",
      image,
      "--build-arg",
      `HUGO_BASEURL=${scenario.baseURL}`,
      ".",
    ]);

    const inspect = JSON.parse(command(["image", "inspect", image], { quiet: true }))[0];
    assert(inspect.Config.User === "101:101", `${scenario.name}: usuario final`);
    assert(inspect.Config.Healthcheck?.Test?.join(" ").includes("/healthz"), `${scenario.name}: HEALTHCHECK`);

    const container = command([
      "run",
      "--detach",
      "--rm",
      "--read-only",
      "--cap-drop=ALL",
      "--security-opt",
      "no-new-privileges:true",
      "--tmpfs",
      "/tmp:rw,noexec,nosuid,size=32m",
      "--publish",
      "127.0.0.1::8080",
      image,
    ], { quiet: true });
    createdContainers.push(container);

    const binding = command(["port", container, "8080/tcp"], { quiet: true });
    const port = binding.match(/:(\d+)\s*$/)?.[1];
    assert(port, `${scenario.name}: puerto publicado`);
    const liveBaseURL = `http://127.0.0.1:${port}/`;
    await waitUntilReady(liveBaseURL);
    await probe(liveBaseURL, scenario.mount);
    command(["stop", "--time", "5", container], { quiet: true });
    createdContainers.pop();
  }

  console.log(
    "PASS: 2 imágenes, usuario 101, rootfs solo lectura, healthz, CSP, MIME, caché, gzip, Range, query strings y 404.",
  );
} finally {
  for (const container of createdContainers.reverse()) {
    spawnSync(docker, ["rm", "--force", container], { cwd: root, encoding: "utf8" });
  }
  for (const image of createdImages.reverse()) {
    spawnSync(docker, ["image", "rm", "--force", image], { cwd: root, encoding: "utf8" });
  }
}
