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
const routePath = "ia-educacion/rutas/decision-institucional-ia/";
const routeIndexPath = "ia-educacion/rutas/";
const evidenceDirectory = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(repoRoot, "docs/design/evidence/udgia-004d");
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
      ".json": "application/json",
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

async function seriousAxeViolations(page) {
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      resultTypes: ["violations"],
      rules: { region: { enabled: false } }
    });
    return result.violations
      .filter(({ impact }) => ["serious", "critical"].includes(impact))
      .map(({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.length,
        targets: nodes.slice(0, 3).map((node) => node.target)
      }));
  });
  assert(violations.length === 0, `axe: ${JSON.stringify(violations)}`);
  return violations;
}

async function inspectViewport(browser, baseURL, name, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const externalRequests = [];
  const writeRequests = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const requestURL = new URL(request.url());
    if (requestURL.origin !== new URL(baseURL).origin) {
      externalRequests.push(request.url());
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      writeRequests.push({ method: request.method(), url: request.url() });
    }
  });

  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const response = await page.goto(new URL(routePath, baseURL).href, {
    waitUntil: "networkidle"
  });
  assert(response?.status() === 200, `${name}: la página no respondió HTTP 200`);

  const hero = page.locator("main article > figure:first-child > img");
  await hero.waitFor({ state: "visible", timeout: 15000 });
  const heroGeometry = await hero.evaluate((image) => {
    const box = image.getBoundingClientRect();
    return {
      width: Math.round(box.width),
      height: Math.round(box.height),
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight
    };
  });
  assert(
    heroGeometry.naturalWidth >= 1024 &&
      Math.abs(heroGeometry.naturalWidth / heroGeometry.naturalHeight - 16 / 9) <= 0.01,
    `${name}: el featured optimizado perdió resolución o proporción 16:9`
  );
  assert(
    Math.abs(
      heroGeometry.width / heroGeometry.height -
        heroGeometry.naturalWidth / heroGeometry.naturalHeight
    ) <= 0.02,
    `${name}: el featured perdió su proporción natural`
  );

  const decisionMap = page.locator('img[src$="mapa-decisiones-institucionales.svg"]');
  await decisionMap.scrollIntoViewIfNeeded();
  await decisionMap.waitFor({ state: "visible", timeout: 15000 });
  await page.waitForFunction(
    () => {
      const image = document.querySelector(
        'img[src$="mapa-decisiones-institucionales.svg"]'
      );
      return image?.complete && image.naturalWidth > 0;
    },
    null,
    { timeout: 15000 }
  );

  const snapshot = await page.evaluate(() => {
    const bodyText = document.body.textContent.replace(/\s+/g, " ");
    const links = [...document.querySelectorAll("main a[href]")].map((link) => link.href);
    const sameOriginPaths = [...new Set(links)]
      .filter((href) => new URL(href).origin === location.origin)
      .filter((href) => !new URL(href).hash)
      .map((href) => new URL(href).pathname);
    const map = document.querySelector('img[src$="mapa-decisiones-institucionales.svg"]');
    const mapBox = map?.getBoundingClientRect();
    return {
      title: document.querySelector("h1")?.textContent?.trim(),
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h2: document.querySelectorAll("main h2").length,
      cards: document.querySelectorAll("main [data-udgia-card] h3 a").length,
      tables: document.querySelectorAll("main table").length,
      executiveTables: document.querySelectorAll("main .udgia-executive-table").length,
      tableCaptions: [...document.querySelectorAll("main .udgia-executive-table caption")]
        .map((caption) => caption.textContent.trim()),
      tableRowHeaders: document.querySelectorAll(
        'main .udgia-executive-table tbody th[scope="row"]'
      ).length,
      tableBodyCellsBeginUppercase: [
        ...document.querySelectorAll("main .udgia-executive-table tbody td")
      ].every((cell) => /^\p{Lu}/u.test(cell.textContent.trim())),
      h5p: document.querySelectorAll("[data-udg-h5p]").length,
      mapCount: document.querySelectorAll(
        'img[src$="mapa-decisiones-institucionales.svg"]'
      ).length,
      mapGeometry: mapBox
        ? { width: Math.round(mapBox.width), height: Math.round(mapBox.height) }
        : null,
      hasExecutiveDisclaimer:
        bodyText.includes("marco de trabajo adaptable") &&
        bodyText.includes("no una política institucional vigente"),
      hasSixDecisions: [
        "Propósito y alcance",
        "Gobernanza y responsabilidades",
        "Personas, capacidades y equidad",
        "Datos, tecnología e infraestructura",
        "Portafolio y recursos",
        "Evidencia, revisión y continuidad"
      ].every((term) => bodyText.includes(term)),
      hasRevisableMandate:
        bodyText.includes("mandato institucional revisable") &&
        bodyText.includes("continuar, modificar, ampliar o detener"),
      hasOperationalRelationship:
        bodyText.includes("ruta de coordinación académica") &&
        bodyText.includes("programas y academias"),
      internalPaths: sameOriginPaths,
      localStorage: Object.keys(localStorage),
      sessionStorage: Object.keys(sessionStorage)
    };
  });

  assert(
    snapshot.title === "Decidir institucionalmente sobre IA en la docencia",
    `${name}: título`
  );
  assert(snapshot.scrollWidth <= snapshot.width, `${name}: overflow horizontal`);
  assert(snapshot.h2 >= 10, `${name}: faltan decisiones o secciones`);
  assert(snapshot.cards >= 4, `${name}: faltan continuaciones`);
  assert(snapshot.tables >= 2, `${name}: faltan matrices ejecutivas`);
  assert(snapshot.executiveTables === 2, `${name}: faltan tablas ejecutivas estilizadas`);
  assert(
    snapshot.tableCaptions.length === 2 &&
      snapshot.tableCaptions.every((caption) => caption.length > 0),
    `${name}: las tablas ejecutivas requieren títulos visibles`
  );
  assert(snapshot.tableRowHeaders === 7, `${name}: faltan encabezados semánticos de fila`);
  assert(
    snapshot.tableBodyCellsBeginUppercase,
    `${name}: hay celdas que todavía comienzan como fragmentos en minúscula`
  );
  assert(snapshot.h5p === 0, `${name}: el marco ejecutivo no debe contener H5P`);
  assert(snapshot.mapCount === 1, `${name}: falta el mapa de decisiones`);
  assert(
    snapshot.mapGeometry?.width >= 320 &&
      snapshot.mapGeometry.height < snapshot.mapGeometry.width,
    `${name}: el mapa perdió su geometría apaisada`
  );
  assert(snapshot.hasExecutiveDisclaimer, `${name}: falta la frontera no normativa`);
  assert(snapshot.hasSixDecisions, `${name}: faltan decisiones ejecutivas`);
  assert(snapshot.hasRevisableMandate, `${name}: falta el mandato revisable`);
  assert(snapshot.hasOperationalRelationship, `${name}: falta relación con 004C`);
  assert(snapshot.localStorage.length === 0, `${name}: localStorage no vacío`);
  assert(snapshot.sessionStorage.length === 0, `${name}: sessionStorage no vacío`);

  const linkChecks = [];
  for (const pathname of snapshot.internalPaths) {
    const linkResponse = await context.request.get(new URL(pathname, baseURL).href);
    linkChecks.push({ pathname, status: linkResponse.status() });
    assert(linkResponse.status() === 200, `${name}: enlace ${pathname} → ${linkResponse.status()}`);
  }

  const violations = await seriousAxeViolations(page);
  const cookies = await context.cookies();
  assert(cookies.length === 0, `${name}: cookies ${JSON.stringify(cookies)}`);
  assert(externalRequests.length === 0, `${name}: tráfico externo ${externalRequests}`);
  assert(writeRequests.length === 0, `${name}: escrituras ${JSON.stringify(writeRequests)}`);
  assert(consoleErrors.length === 0, `${name}: errores de consola ${consoleErrors}`);

  if (name === "desktop") {
    await decisionMap.screenshot({
      path: path.join(evidenceDirectory, "mapa-decisiones.png")
    });
  }
  const executiveTables = page.locator(".udgia-executive-table");
  await executiveTables.nth(0).screenshot({
    path: path.join(evidenceDirectory, `tabla-gobernanza-${name}.png`)
  });
  await executiveTables.nth(1).screenshot({
    path: path.join(evidenceDirectory, `tabla-portafolio-${name}.png`)
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: path.join(evidenceDirectory, `ruta-${name}.png`),
    fullPage: false
  });
  await context.close();
  return {
    ...snapshot,
    hero: heroGeometry,
    linkChecks,
    axeSeriousCritical: violations,
    cookies: [],
    externalRequests,
    writeRequests,
    consoleErrors
  };
}

await mkdir(evidenceDirectory, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), "udgia-004d-"));
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
  assert(routeIndex.includes("Estudio o enseño"), "Índice: falta la ruta introductoria");
  assert(routeIndex.includes("Coordino procesos docentes"), "Índice: falta la ruta operativa");
  assert(
    routeIndex.includes("Preparo decisiones institucionales"),
    "Índice: falta la ruta ejecutiva"
  );

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
