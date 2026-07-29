import crypto from "node:crypto";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "../..");
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function includesAll(source, signals, label) {
  for (const signal of signals) {
    assert(source.includes(signal), `${label}: falta ${signal}`);
  }
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} falló\n${result.stdout || ""}\n${result.stderr || ""}`,
    );
  }
  return result;
}

async function exists(file) {
  return Boolean(await stat(file).catch(() => null));
}

const dockerfile = await readFile(path.join(root, "Dockerfile"), "utf8");
const dockerignore = await readFile(path.join(root, ".dockerignore"), "utf8");
const nginx = await readFile(path.join(root, "deploy/nginx/default.conf"), "utf8");
const mime = await readFile(path.join(root, "deploy/nginx/mime.types"), "utf8");
const workflow = await readFile(path.join(root, ".github/workflows/hugo.yaml"));

includesAll(
  dockerfile,
  [
    "node:22.22.0-bookworm-slim@sha256:dd9d21971ec4395903fa6143c2b9267d048ae01ca6d3ea96f16cb30df6187d94",
    "nginxinc/nginx-unprivileged:1.29.4-alpine3.23@sha256:a6c4f61f456b85b8fdf7ec7ab28cc3e299440e6fb4a9dea520e5fd8fd440025e",
    "ARG HUGO_BASEURL",
    "ARG HUGO_VERSION=0.164.0",
    "ARG GO_VERSION=1.25.6",
    "sha256sum --check --strict",
    "npm ci --ignore-scripts --no-audit --no-fund",
    "npm run h5p:verify",
    'node tools/container/build-site.mjs "${HUGO_BASEURL}" /opt/site-root',
    "COPY --from=build --chown=101:101",
    "USER 101:101",
    "EXPOSE 8080",
    "HEALTHCHECK",
    "http://127.0.0.1:8080/healthz",
  ],
  "Dockerfile",
);
assert(/^FROM .+ AS build$/m.test(dockerfile), "Dockerfile: falta etapa build");
assert(/^FROM .+ AS runtime$/m.test(dockerfile), "Dockerfile: falta etapa runtime");
assert(!/COPY\s+\.\s+.*(?:\.env|secret)/i.test(dockerfile), "Dockerfile: copia secretos");

includesAll(
  dockerignore,
  [
    ".git",
    ".github",
    "node_modules",
    "public",
    "resources",
    "docs",
    ".env.*",
    "*.key",
    "*.pem",
    "secrets/**",
  ],
  ".dockerignore",
);

includesAll(
  nginx,
  [
    "listen 8080;",
    "server_tokens off;",
    "autoindex off;",
    "max_ranges 1;",
    "gzip on;",
    "location = /healthz",
    'return 200 "ok\\n";',
    "try_files $uri $uri/ =404;",
    "(?:[A-Za-z0-9._~-]+/)*h5p/udgia/v[0-9]+/",
    "public, max-age=31536000, immutable",
    '"no-cache"',
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline'",
    "frame-src 'self'",
    "object-src 'none'",
    'Referrer-Policy "strict-origin-when-cross-origin"',
    'X-Content-Type-Options "nosniff"',
  ],
  "Nginx",
);
assert(
  [...nginx].reduce((balance, character) => {
    if (character === "{") return balance + 1;
    if (character === "}") return balance - 1;
    return balance;
  }, 0) === 0,
  "Nginx: llaves desbalanceadas",
);
assert(!/try_files[^;]*index\.html/.test(nginx), "Nginx: fallback SPA ocultaría los 404");
assert(!/\berror_page\b/.test(nginx), "Nginx: error_page podría ocultar un 404 real");

includesAll(
  mime,
  [
    "application/javascript",
    "application/json",
    "application/manifest+json",
    "application/wasm",
    "image/svg+xml",
    "font/woff2",
    "video/mp4",
  ],
  "MIME",
);

assert(
  crypto.createHash("sha256").update(workflow).digest("hex")
    === "211d38488d5f36fb97e495ce9cc8f8f52f83ac41369b8492a5776416eeebd173",
  "El workflow de GitHub cambió",
);

const tempRoot = await mkdtemp(path.join(tmpdir(), "udgia009-container-static-"));
try {
  const scenarios = [
    {
      name: "root",
      baseURL: "https://ia.example.invalid/",
      mount: "",
    },
    {
      name: "subpath",
      baseURL: "https://ia.example.invalid/ecosistema-ia/",
      mount: "ecosistema-ia",
    },
  ];

  for (const scenario of scenarios) {
    const output = path.join(tempRoot, scenario.name);
    run("node", [
      "tools/container/build-site.mjs",
      scenario.baseURL,
      output,
    ]);
    const mounted = path.join(output, scenario.mount);
    const indexPath = path.join(mounted, "index.html");
    const embedPath = path.join(mounted, "h5p/udgia/v1/embed.html");
    const playerPath = path.join(mounted, "h5p/udgia/v1/player/main.bundle.js");
    const catalogPath = path.join(mounted, "h5p/udgia/v1/content-index.json");

    assert(await exists(indexPath), `${scenario.name}: falta index.html`);
    assert(await exists(embedPath), `${scenario.name}: falta embed H5P`);
    assert(await exists(playerPath), `${scenario.name}: falta player H5P`);
    assert(await exists(catalogPath), `${scenario.name}: falta catálogo H5P`);
    if (scenario.mount) {
      assert(!(await exists(path.join(output, "index.html"))), "subpath: contenido duplicado en raíz");
    }

    const homepage = await readFile(indexPath, "utf8");
    const interactiveGuide = await readFile(
      path.join(mounted, "ia-educacion/guias/agenciamiento-humano-ia/index.html"),
      "utf8",
    );
    const expectedPrefix = scenario.mount ? `/${scenario.mount}/` : "/";
    assert(
      homepage.includes(`${expectedPrefix}css/`) || homepage.includes(`${expectedPrefix}js/`),
      `${scenario.name}: activos de la portada fuera de la base`,
    );
    assert(
      homepage.includes(scenario.baseURL),
      `${scenario.name}: Hugo no conservó HUGO_BASEURL exactamente`,
    );
    assert(
      interactiveGuide.includes(`${expectedPrefix}h5p/udgia/v1/embed.html?content=`),
      `${scenario.name}: la URL H5P perdió base o query string`,
    );
    assert(
      interactiveGuide.includes(`${expectedPrefix}h5p/udgia/v1/host.js`),
      `${scenario.name}: host H5P fuera de la base`,
    );
    for (const [label, html] of [["portada", homepage], ["guía H5P", interactiveGuide]]) {
      const localURLs = [...html.matchAll(/\b(?:href|src)=["']?(\/[^"' >]+)/g)]
        .map((match) => match[1]);
      assert(localURLs.length > 0, `${scenario.name} ${label}: no se encontraron URLs locales`);
      assert(
        localURLs.every((url) => url.startsWith(expectedPrefix)),
        `${scenario.name} ${label}: una URL local quedó fuera de ${expectedPrefix}`,
      );
    }
  }

  const invalidBaseURLs = [
    "https://user:secret@ia.example.invalid/",
    "https://ia.example.invalid",
    "https://ia.example.invalid/?preview=1",
    "/ruta-relativa/",
    "ftp://ia.example.invalid/",
  ];
  for (const [index, invalidBaseURL] of invalidBaseURLs.entries()) {
    const invalid = spawnSync(
      "node",
      [
        "tools/container/build-site.mjs",
        invalidBaseURL,
        path.join(tempRoot, `invalid-${index}`),
      ],
      { cwd: root, encoding: "utf8" },
    );
    assert(invalid.status === 64, `build-site aceptó HUGO_BASEURL inválida: ${invalidBaseURL}`);
  }
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`FAIL: ${failures.join("; ")}`);
  process.exit(1);
}

console.log(
  "PASS: Dockerfile, contexto, Nginx, MIME, workflow intacto y builds Hugo en raíz/subruta.",
);
