import assert from "node:assert/strict";
import http from "node:http";
import { spawnSync } from "node:child_process";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../../../../..");
const tempRoot = await mkdtemp(path.join(os.tmpdir(), "udgia-p2-"));
const overlayContent = path.join(tempRoot, "content");
const overlayStatic = path.join(tempRoot, "static");
const buildsRoot = path.join(tempRoot, "builds");
const reportPath = path.join(here, "qa-report.json");
const appliedMode = process.env.P2_APPLIED === "1";

const contentRoutes = [
  "ia-educacion/constelaciones/empezar-con-ia/",
  "ia-educacion/orientaciones/",
  "ia-educacion/guias/estudiantes/",
  "ia-educacion/guias/profesorado/"
];

const activityRoutes = [
  "actividades/comparar-sugerencias/",
  "actividades/revisar-actividad/"
];

const aliasRoutes = [
  "ia-educacion/constelaciones/cocreacion-evaluacion/",
  "ia-educacion/orientaciones-ia/",
  "ia-educacion/guias/para-estudiantes/",
  "ia-educacion/guias/para-profesorado/"
];

const runtimeCopies = [
  {
    source: path.join(repoRoot, "docs/editorial/evidence/udgia-021/prototipos/comparador-sugerencias-b2"),
    target: path.join(overlayStatic, "actividades/comparar-sugerencias"),
    files: ["index.html", "styles.css", "app.js", "fallback-imprimible.html", "favicon.svg"]
  },
  {
    source: path.join(repoRoot, "docs/editorial/evidence/udgia-021/prototipos/revisor-alineacion-m6"),
    target: path.join(overlayStatic, "actividades/revisar-actividad"),
    files: [
      "index.html",
      "styles.css",
      "app.js",
      "fallback-imprimible.html",
      "favicon.svg",
      "actividad-pide-practica-revisa.svg"
    ]
  }
];

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml; charset=utf-8",
    ".webp": "image/webp",
    ".woff2": "font/woff2"
  }[extension] || "application/octet-stream";
}

async function prepareOverlay() {
  await cp(path.join(repoRoot, "content"), overlayContent, { recursive: true });
  await mkdir(overlayStatic, { recursive: true });
  if (!appliedMode) {
    await cp(path.join(here, "content"), overlayContent, { recursive: true, force: true });
  }

  for (const runtime of runtimeCopies) {
    await mkdir(runtime.target, { recursive: true });
    const source = appliedMode
      ? path.join(repoRoot, "static", path.relative(overlayStatic, runtime.target))
      : runtime.source;
    for (const file of runtime.files) {
      await cp(path.join(source, file), path.join(runtime.target, file));
    }
  }
}

async function startServer(root, mountPath) {
  const prefix = mountPath ? `/${mountPath}/` : "/";
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, "http://localhost");
      if (!url.pathname.startsWith(prefix)) {
        response.writeHead(404).end("Not found");
        return;
      }

      const relative = decodeURIComponent(url.pathname.slice(prefix.length));
      const candidate = path.resolve(root, relative || "index.html");
      if (!candidate.startsWith(`${path.resolve(root)}${path.sep}`) && candidate !== path.resolve(root)) {
        response.writeHead(403).end("Forbidden");
        return;
      }

      let filePath = candidate;
      const info = await stat(filePath).catch(() => null);
      if (info?.isDirectory()) filePath = path.join(filePath, "index.html");
      const body = await readFile(filePath);
      response.writeHead(200, { "content-type": contentType(filePath), "cache-control": "no-store" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ host: "127.0.0.1", port: 0 }, resolve);
  });

  const port = server.address().port;
  return {
    baseURL: `http://127.0.0.1:${port}${prefix}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

function buildHugo(destination, baseURL) {
  const result = spawnSync("hugo", [
    "--contentDir", overlayContent,
    "--destination", destination,
    "--baseURL", baseURL,
    "--cleanDestinationDir"
  ], { cwd: repoRoot, encoding: "utf8" });

  assert.equal(result.status, 0, `Hugo falló:\n${result.stdout}\n${result.stderr}`);
  return `${result.stdout}${result.stderr}`.trim();
}

async function axeViolations(page, label) {
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      resultTypes: ["violations"],
      rules: { region: { enabled: false } }
    });
    return result.violations
      .filter((violation) => ["serious", "critical"].includes(violation.impact))
      .map(({ id, impact, help, nodes }) => ({ id, impact, help, nodes: nodes.length }));
  });
  assert.equal(violations.length, 0, `${label}: axe ${JSON.stringify(violations)}`);
  return violations;
}

async function inspectPage(browser, baseURL, route, viewport, scenario) {
  const context = await browser.newContext({ viewport, bypassCSP: true });
  const page = await context.newPage();
  const consoleErrors = [];
  const externalRequests = [];
  const origin = new URL(baseURL).origin;

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== origin && !["data:", "blob:"].includes(url.protocol)) {
      externalRequests.push(request.url());
    }
  });

  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "networkidle" });
  assert.equal(response?.status(), 200, `${scenario} ${route}: HTTP ${response?.status()}`);

  const snapshot = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    title: document.querySelector("h1")?.textContent?.trim() || "",
    horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    mainLength: document.querySelector("main")?.innerText.length || document.body.innerText.length,
    storageKeys: Object.keys(localStorage).filter((key) => /^(?:udgia_|udgia021-)/.test(key)),
    links: [...document.querySelectorAll("main a[href]")].map((link) => link.href)
  }));

  assert.equal(snapshot.h1, 1, `${scenario} ${route}: se esperaba un h1`);
  assert(snapshot.mainLength > 180, `${scenario} ${route}: contenido insuficiente`);
  assert(snapshot.horizontalOverflow <= 1, `${scenario} ${route}: overflow ${snapshot.horizontalOverflow}px`);
  assert.equal(consoleErrors.length, 0, `${scenario} ${route}: consola ${JSON.stringify(consoleErrors)}`);
  assert.equal(externalRequests.length, 0, `${scenario} ${route}: red externa ${JSON.stringify(externalRequests)}`);
  assert.equal(snapshot.storageKeys.length, 0, `${scenario} ${route}: escritura al cargar ${snapshot.storageKeys}`);

  const brokenLinks = [];
  if (viewport.width >= 1000) {
    for (const href of [...new Set(snapshot.links)]) {
      const url = new URL(href);
      if (url.origin !== origin || url.hash || ["mailto:", "tel:"].includes(url.protocol)) continue;
      const linkResponse = await context.request.get(url.href);
      if (linkResponse.status() < 200 || linkResponse.status() >= 400) {
        brokenLinks.push(`${linkResponse.status()} ${url.pathname}`);
      }
    }
  }
  assert.equal(brokenLinks.length, 0, `${scenario} ${route}: enlaces ${brokenLinks.join(", ")}`);

  await page.keyboard.press("Tab");
  const firstFocus = await page.evaluate(() => ({
    tag: document.activeElement?.tagName || "",
    text: document.activeElement?.textContent?.trim().slice(0, 80) || ""
  }));
  assert.notEqual(firstFocus.tag, "BODY", `${scenario} ${route}: Tab no mueve el foco`);

  const violations = await axeViolations(page, `${scenario} ${route}`);
  await context.close();
  return { route, viewport, ...snapshot, firstFocus, brokenLinks, consoleErrors, externalRequests, axe: violations };
}

async function runScenario(browser, name, mountPath) {
  const destination = path.join(buildsRoot, name, mountPath || "root");
  await mkdir(destination, { recursive: true });
  const server = await startServer(destination, mountPath);

  try {
    const hugoOutput = buildHugo(destination, server.baseURL);
    await cp(path.join(overlayStatic, "actividades"), path.join(destination, "actividades"), {
      recursive: true,
      force: true
    });
    const results = [];
    for (const route of [...contentRoutes, ...activityRoutes]) {
      results.push(await inspectPage(browser, server.baseURL, route, { width: 1280, height: 900 }, name));
      results.push(await inspectPage(browser, server.baseURL, route, { width: 320, height: 800 }, name));
    }

    for (const activity of activityRoutes) {
      const fallback = await fetch(new URL(`${activity}fallback-imprimible.html`, server.baseURL));
      assert.equal(fallback.status, 200, `${name} ${activity}: fallback ${fallback.status}`);
    }
    const aliases = [];
    for (const alias of aliasRoutes) {
      const response = await fetch(new URL(alias, server.baseURL));
      assert.equal(response.status, 200, `${name} alias ${alias}: ${response.status}`);
      aliases.push({ route: alias, status: response.status });
    }
    return { name, baseURL: server.baseURL, hugoOutput, results, aliases };
  } finally {
    await server.close();
  }
}

let browser;
try {
  await prepareOverlay();
  const playwrightChromium = chromium.executablePath();
  const executable = process.env.CHROMIUM_PATH ||
    ((await stat("/usr/bin/chromium").catch(() => null))
      ? "/usr/bin/chromium"
      : (await stat(playwrightChromium).catch(() => null))
        ? playwrightChromium
        : "");
  assert(executable, "No se encontró Chromium; define CHROMIUM_PATH");
  browser = await chromium.launch({ executablePath: executable, headless: true });
  const scenarios = [
    await runScenario(browser, "raiz", ""),
    await runScenario(browser, "subruta", "aprendizaje-ia")
  ];
  const report = {
    generatedAt: new Date().toISOString(),
    status: "PASS",
    scope: appliedMode
      ? "working tree aplicado; fuentes leídas de content/ y static/ del repositorio"
      : "overlay temporal; no aplicado a content/ ni static/ del repositorio",
    axeInjection: "bypassCSP limitado al contexto de auditoría; los recursos funcionales permanecen propios y sin red externa",
    scenarios,
    limitations: [
      "No equivale a una prueba con participantes reales",
      "No equivale a una sesión con persona usuaria de lector de pantalla"
    ]
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`PASS: ${scenarios.length} escenarios × ${contentRoutes.length + activityRoutes.length} rutas × 2 viewports; enlaces, axe, foco, red, consola, almacenamiento y fallback.`);
  console.log(`Evidencia: ${reportPath}`);
} catch (error) {
  const report = {
    generatedAt: new Date().toISOString(),
    status: "FAIL",
    error: error.stack || String(error),
    scope: appliedMode
      ? "working tree aplicado; fuentes leídas de content/ y static/ del repositorio"
      : "overlay temporal; no aplicado a content/ ni static/ del repositorio"
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  throw error;
} finally {
  if (browser) await browser.close();
  if (!process.env.KEEP_P2_TEMP) await rm(tempRoot, { recursive: true, force: true });
}
