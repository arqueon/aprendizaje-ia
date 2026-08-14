import { createReadStream } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routePath = "ia-educacion/rutas/coordinacion-academica/";
const routeIndexPath = "ia-educacion/rutas/";
const introductoryRoutePath = "ia-educacion/constelaciones/empezar-con-ia/";
const evidenceDirectory = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(repoRoot, "docs/design/evidence/udgia-004c");
const reportPath = path.join(evidenceDirectory, "qa-route.json");
const playwrightChromium = chromium.executablePath();
const chromiumBinary = process.env.CHROMIUM_PATH ||
  ((await stat("/usr/bin/chromium").catch(() => null))
    ? "/usr/bin/chromium"
    : (await stat(playwrightChromium).catch(() => null))
      ? playwrightChromium
      : "");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function mimeType(file) {
  return (
    {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".woff": "font/woff",
      ".woff2": "font/woff2"
    }[path.extname(file).toLowerCase()] || "application/octet-stream"
  );
}

async function startServer(root) {
  const server = http.createServer(async (request, response) => {
    try {
      const requestURL = new URL(request.url, "http://127.0.0.1");
      const normalized = path.posix
        .normalize(`/${decodeURIComponent(requestURL.pathname)}`)
        .replace(/^\/+/, "");
      if (normalized.startsWith("..")) throw new Error("Ruta insegura");
      let file = path.join(root, normalized);
      if ((await stat(file).catch(() => null))?.isDirectory()) {
        file = path.join(file, "index.html");
      }
      const relative = path.relative(root, file);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        throw new Error("Ruta insegura");
      }
      const fileStat = await stat(file);
      response.setHeader("content-type", mimeType(file));
      response.setHeader("content-length", fileStat.size);
      response.writeHead(200);
      await pipeline(createReadStream(file), response);
    } catch {
      if (!response.headersSent) {
        response.writeHead(404).end("Not found");
      } else {
        response.destroy();
      }
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ host: "127.0.0.1", port: 0 }, resolve);
  });
  return {
    baseURL: `http://127.0.0.1:${server.address().port}/`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

function runHugo(destination, baseURL) {
  const result = spawnSync(
    process.env.HUGO_BIN || "hugo",
    ["--minify", "--destination", destination, "--baseURL", baseURL],
    { cwd: repoRoot, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  if (result.status !== 0) {
    throw new Error(`Hugo falló\n${result.stdout}\n${result.stderr}`);
  }
  const pageMatch = result.stdout.match(/Pages\s+│\s+(\d+)/);
  return {
    pages: pageMatch ? Number(pageMatch[1]) : null,
    warnings: result.stderr.split("\n").filter((line) => line.startsWith("WARN"))
  };
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
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
        targets: violation.nodes.slice(0, 3).map((node) => node.target)
      }));
  });
  assert(violations.length === 0, `${label}: axe ${JSON.stringify(violations)}`);
  return violations;
}

async function inspectEditorialHero(
  page,
  pagePath,
  baseURL,
  label,
  selector = "main article > figure:first-child > img",
  minimumWidth = 320
) {
  const response = await page.goto(new URL(pagePath, baseURL).href, {
    waitUntil: "networkidle"
  });
  assert(response?.status() === 200, `${label}: la página no respondió HTTP 200`);

  const hero = page.locator(selector);
  await hero.waitFor({ state: "attached", timeout: 15000 });
  await hero.scrollIntoViewIfNeeded();
  await hero.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(
    (imageSelector) => {
      const image = document.querySelector(imageSelector);
      return image?.complete && image.naturalWidth > 0;
    },
    selector,
    { timeout: 15000 }
  );
  const geometry = await hero.evaluate((image) => {
    const box = image.getBoundingClientRect();
    return {
      source: image.currentSrc,
      width: Math.round(box.width),
      height: Math.round(box.height),
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    };
  });
  const renderedRatio = geometry.width / geometry.height;
  const naturalRatio = geometry.naturalWidth / geometry.naturalHeight;

  assert(geometry.naturalWidth > 0, `${label}: el featured no cargó`);
  assert(geometry.width >= minimumWidth, `${label}: el featured quedó demasiado pequeño`);
  assert(
    Math.abs(renderedRatio - naturalRatio) <= 0.02,
    `${label}: el featured perdió su proporción natural ${JSON.stringify(geometry)}`
  );
  return geometry;
}

async function inspectViewport(browser, baseURL, name, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const externalRequests = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL).origin) externalRequests.push(request.url());
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const hero = await inspectEditorialHero(page, routePath, baseURL, `${name}: coordinación`);
  const processGraphic = page.locator('img[src$="ciclo-coordinacion.svg"]');
  await processGraphic.waitFor({ state: "attached", timeout: 15000 });
  await processGraphic.scrollIntoViewIfNeeded();
  await processGraphic.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(
    () => {
      const image = document.querySelector('img[src$="ciclo-coordinacion.svg"]');
      return image?.complete && image.naturalWidth > 0;
    },
    null,
    { timeout: 15000 }
  );

  const snapshot = await page.evaluate(() => {
    const links = [...document.querySelectorAll("main a[href]")].map((link) => link.href);
    const processGraphic = document.querySelector('img[src$="ciclo-coordinacion.svg"]');
    const bodyText = document.body.textContent.replace(/\s+/g, " ");
    const rectangle = (element) => {
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return { width: Math.round(box.width), height: Math.round(box.height) };
    };
    const sameOriginLinks = [...new Set(links)]
      .filter((href) => new URL(href).origin === location.origin)
      .filter((href) => !new URL(href).hash)
      .map((href) => new URL(href).pathname);
    return {
      title: document.querySelector("h1")?.textContent?.trim(),
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      cards: document.querySelectorAll("main .card-bg h5 a").length,
      tables: document.querySelectorAll("main table").length,
      h2: document.querySelectorAll("main h2").length,
      processGraphic: document.querySelectorAll('img[src$="ciclo-coordinacion.svg"]').length,
      processGraphicGeometry: rectangle(processGraphic),
      h5p: document.querySelectorAll("[data-udg-h5p]").length,
      hasOperationalScope:
        bodyText.includes("guía de trabajo") &&
        bodyText.includes("organizar un piloto y acuerdos colegiados"),
      hasOperationalDependencies: bodyText.includes("se registra como dependencia"),
      hasInternalPlanningLanguage:
        bodyText.includes("documento ejecutivo") ||
        bodyText.includes("Rectoría General") ||
        bodyText.includes("alta dirección"),
      hasSEMS: bodyText.includes("SEMS"),
      hasThreeContexts:
        Boolean(document.querySelector("#jefaturas-de-departamento-y-academias")) &&
        Boolean(document.querySelector("#coordinaciones-de-licenciatura-y-posgrado")) &&
        Boolean(document.querySelector("#coordinaciones-y-equipos-del-sems")),
      internalPaths: sameOriginLinks
    };
  });

  assert(snapshot.title === "Coordinar la IA en los procesos docentes", `${name}: título`);
  assert(snapshot.scrollWidth <= snapshot.width, `${name}: overflow horizontal`);
  assert(snapshot.cards >= 7, `${name}: faltan tarjetas de ruta`);
  assert(snapshot.tables >= 1, `${name}: falta la tabla operativa`);
  assert(snapshot.h2 >= 12, `${name}: faltan etapas/secciones`);
  assert(snapshot.processGraphic === 1, `${name}: gráfico del ciclo`);
  assert(
    snapshot.processGraphicGeometry?.height >= snapshot.processGraphicGeometry?.width,
    `${name}: el gráfico del ciclo perdió su proporción vertical`
  );
  assert(snapshot.h5p === 0, `${name}: la portada no debe contener H5P`);
  assert(snapshot.hasOperationalScope, `${name}: falta propósito operativo para la audiencia`);
  assert(snapshot.hasOperationalDependencies, `${name}: falta tratamiento operativo de dependencias`);
  assert(!snapshot.hasInternalPlanningLanguage, `${name}: se filtró planeación editorial interna`);
  assert(snapshot.hasSEMS && snapshot.hasThreeContexts, `${name}: faltan audiencias`);

  const linkChecks = [];
  for (const pathname of snapshot.internalPaths) {
    const linkResponse = await context.request.get(new URL(pathname, baseURL).href);
    linkChecks.push({ pathname, status: linkResponse.status() });
    assert(linkResponse.status() === 200, `${name}: enlace ${pathname} → ${linkResponse.status()}`);
  }

  const violations = await axeViolations(page, name);
  if (name === "desktop") {
    await processGraphic.screenshot({
      path: path.join(evidenceDirectory, "ruta-recorrido.png")
    });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: path.join(evidenceDirectory, `ruta-${name}.png`),
    fullPage: false
  });

  const introductoryHero = await inspectEditorialHero(
    page,
    introductoryRoutePath,
    baseURL,
    `${name}: introducción`,
    "#udgia-f18-cinco-movimientos img",
    260
  );

  assert(externalRequests.length === 0, `${name}: tráfico externo ${externalRequests}`);
  assert(consoleErrors.length === 0, `${name}: errores de consola ${consoleErrors}`);
  await context.close();
  return {
    ...snapshot,
    hero,
    introductoryHero,
    linkChecks,
    axeSeriousCritical: violations,
    externalRequests,
    consoleErrors
  };
}

await mkdir(evidenceDirectory, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), "udgia-004c-"));
const siteRoot = path.join(tempRoot, "public");
let server;
let browser;

try {
  const hugo = runHugo(siteRoot, "http://127.0.0.1/");
  server = await startServer(siteRoot);
  assert(chromiumBinary, "No se encontró Chromium");
  browser = await chromium.launch({
    executablePath: chromiumBinary,
    headless: true,
    args: ["--no-sandbox"]
  });

  const routeIndex = await readFile(path.join(siteRoot, routeIndexPath, "index.html"), "utf8");
  assert(routeIndex.includes("Coordino procesos docentes"), "Índice: falta la ruta de coordinación");
  assert(routeIndex.includes("Estudio o enseño"), "Índice: falta la ruta introductoria");

  const desktop = await inspectViewport(
    browser,
    server.baseURL,
    "desktop",
    { width: 1440, height: 1000 }
  );
  const mobile = await inspectViewport(
    browser,
    server.baseURL,
    "mobile",
    { width: 375, height: 900 }
  );
  const report = {
    schemaVersion: 1,
    status: "PASS",
    checkedAt: new Date().toISOString(),
    routePath,
    routeIndexPath,
    hugo,
    desktop,
    mobile
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  if (browser) await browser.close();
  if (server) await server.close();
  await rm(tempRoot, { recursive: true, force: true });
}
