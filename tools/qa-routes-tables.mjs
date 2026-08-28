import { createReadStream } from "node:fs";
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playwrightChromium = chromium.executablePath();
const chromiumBinary = process.env.CHROMIUM_PATH ||
  ((await stat("/usr/bin/chromium").catch(() => null))
    ? "/usr/bin/chromium"
    : (await stat(playwrightChromium).catch(() => null))
      ? playwrightChromium
      : "");
const evidenceDir = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(root, "docs/design/evidence/udgia-015");
const reportPath = path.join(evidenceDir, "qa-routes-tables.json");
const routeTargets = [
  "ia-educacion/constelaciones/empezar-con-ia/",
  "ia-educacion/rutas/coordinacion-academica/",
  "ia-educacion/rutas/decision-institucional-ia/"
];
const knownWarningPatterns = [
  /project config key languageCode was deprecated/,
  /Module "github\.com\/nunocoracao\/blowfish\/v2" is not compatible/,
  /\.Site\.LanguageCode was deprecated/,
  /\.Site\.Data was deprecated/
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function mimeType(file) {
  return {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
  }[path.extname(file).toLowerCase()] || "application/octet-stream";
}

async function startServer(siteRoot, mountPath = "") {
  const server = http.createServer(async (request, response) => {
    try {
      const requestURL = new URL(request.url, "http://127.0.0.1");
      let normalized = path.posix
        .normalize(`/${decodeURIComponent(requestURL.pathname)}`)
        .replace(/^\/+/, "");
      if (mountPath) {
        assert(
          normalized === mountPath || normalized.startsWith(`${mountPath}/`),
          "ruta fuera del montaje"
        );
        normalized = normalized.slice(mountPath.length).replace(/^\/+/, "");
      }
      assert(!normalized.startsWith(".."), "ruta insegura");
      let file = path.join(siteRoot, normalized);
      if ((await stat(file).catch(() => null))?.isDirectory()) {
        file = path.join(file, "index.html");
      }
      const relative = path.relative(siteRoot, file);
      assert(!relative.startsWith("..") && !path.isAbsolute(relative), "ruta insegura");
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
    baseURL: `http://127.0.0.1:${server.address().port}/${mountPath ? `${mountPath}/` : ""}`,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

function build(siteRoot, baseURL) {
  const result = spawnSync(
    process.env.HUGO_BIN || "hugo",
    ["--minify", "--destination", siteRoot, "--baseURL", baseURL, "--noBuildLock"],
    { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  if (result.status !== 0) {
    throw new Error(`Hugo falló\n${result.stdout}\n${result.stderr}`);
  }
  const warnings = result.stderr.split("\n").filter((line) => line.startsWith("WARN"));
  const unexpectedWarnings = warnings.filter(
    (warning) => !knownWarningPatterns.some((pattern) => pattern.test(warning))
  );
  assert(
    unexpectedWarnings.length === 0,
    `advertencias Hugo nuevas: ${unexpectedWarnings.join(" | ")}`
  );
  const pages = Number(result.stdout.match(/Pages\s+│\s+(\d+)/)?.[1] || 0);
  return { pages, warnings: warnings.length, unexpectedWarnings };
}

function channelToLinear(value) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance([red, green, blue]) {
  return (
    0.2126 * channelToLinear(red) +
    0.7152 * channelToLinear(green) +
    0.0722 * channelToLinear(blue)
  );
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function rgb(value) {
  const channels = value.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  assert(channels?.length === 3, `color no reconocido: ${value}`);
  return channels;
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
        nodes: violation.nodes.length
      }));
  });
  assert(violations.length === 0, `${label}: axe ${JSON.stringify(violations)}`);
  return violations;
}

function routeFromURL(value, baseURL) {
  const url = new URL(value);
  const basePath = new URL(baseURL).pathname;
  return url.pathname.slice(basePath.length).replace(/^\/+/, "");
}

async function inspectEntry(browser, baseURL, route, viewport, scenario, name) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const externalRequests = [];
  const writes = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL).origin) externalRequests.push(request.url());
    if (!["GET", "HEAD"].includes(request.method())) {
      writes.push(`${request.method()} ${request.url()}`);
    }
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "networkidle" });
  assert(response?.status() === 200, `${scenario} ${name}: HTTP ${response?.status()}`);

  const snapshot = await page.evaluate(() => {
    const heading = [...document.querySelectorAll("main h2")]
      .find((element) => element.textContent.trim().startsWith("Elige tu ruta"));
    const routeSectionLinks = [];
    let sibling = heading?.nextElementSibling;
    while (sibling && sibling.tagName !== "H2") {
      routeSectionLinks.push(...sibling.querySelectorAll("a[href]"));
      sibling = sibling.nextElementSibling;
    }
    const targetEnds = [
      "/ia-educacion/constelaciones/empezar-con-ia/",
      "/ia-educacion/rutas/coordinacion-academica/",
      "/ia-educacion/rutas/decision-institucional-ia/"
    ];
    const routeLinks = targetEnds.map((target) =>
      routeSectionLinks.filter((link) => new URL(link.href).pathname.endsWith(target)).length
    );
    return {
      pageWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      heading: heading?.textContent.trim().replace(/#$/, "").trim() || "",
      routeLinks,
      h5p: document.querySelectorAll("[data-udg-h5p]").length
    };
  });
  assert(snapshot.heading === "Elige tu ruta", `${scenario} ${name}: falta el encabezado`);
  assert(
    snapshot.routeLinks.every((count) => count === 1),
    `${scenario} ${name}: rutas ${snapshot.routeLinks}`
  );
  assert(snapshot.pageScrollWidth <= snapshot.pageWidth, `${scenario} ${name}: overflow`);
  assert(snapshot.h5p === 0, `${scenario} ${name}: no debe añadir H5P`);

  for (const target of routeTargets) {
    const targetResponse = await context.request.get(new URL(target, baseURL).href);
    assert(targetResponse.status() === 200, `${scenario} ${name}: ${target} HTTP ${targetResponse.status()}`);
  }
  const axeSeriousCritical = await axeViolations(page, `${scenario} ${name}`);
  assert(externalRequests.length === 0, `${scenario} ${name}: tráfico externo`);
  assert(writes.length === 0, `${scenario} ${name}: escrituras HTTP`);
  assert(consoleErrors.length === 0, `${scenario} ${name}: consola ${consoleErrors}`);

  if (scenario === "root") {
    const chooser = page
      .locator("main section.grid")
      .filter({
        has: page.locator('a[href$="/ia-educacion/rutas/coordinacion-academica/"]')
      })
      .first();
    await chooser.screenshot({ path: path.join(evidenceDir, `rutas-${name}.png`) });
  }
  await context.close();
  return { ...snapshot, axeSeriousCritical, externalRequests, writes, consoleErrors };
}

async function inspectTable(browser, baseURL, route, viewport, scenario, name, selector) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
  const page = await context.newPage();
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: "networkidle" });
  assert(response?.status() === 200, `${scenario} ${name}: HTTP ${response?.status()}`);
  const table = page.locator(selector).first();
  await table.evaluate((wrapper) => {
    const details = wrapper.closest("details");
    if (details) details.open = true;
  });
  await table.scrollIntoViewIfNeeded();
  const snapshot = await table.evaluate((wrapper) => {
    const dataTable = wrapper.querySelector("table");
    const header = dataTable?.querySelector("thead th");
    const cell = dataTable?.querySelector("tbody td");
    const caption = dataTable?.querySelector("caption");
    const hint = wrapper.querySelector(".udgia-table__mobile-hint");
    const wrapperStyle = getComputedStyle(wrapper);
    const headerStyle = header ? getComputedStyle(header) : null;
    const cellStyle = cell ? getComputedStyle(cell) : null;
    return {
      pageWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      wrapperWidth: wrapper.clientWidth,
      wrapperScrollWidth: wrapper.scrollWidth,
      overflowX: wrapperStyle.overflowX,
      role: wrapper.getAttribute("role"),
      tabindex: wrapper.getAttribute("tabindex"),
      ariaLabel: wrapper.getAttribute("aria-label"),
      hintDisplay: hint ? getComputedStyle(hint).display : "",
      caption: caption?.textContent.trim() || "",
      columnHeaders: dataTable?.querySelectorAll("thead th[scope='col']").length || 0,
      rowHeaders: dataTable?.querySelectorAll("tbody th[scope='row']").length || 0,
      headerColor: headerStyle?.color || "",
      headerBackground: headerStyle?.backgroundColor || "",
      cellColor: cellStyle?.color || "",
      cellBackground:
        cellStyle?.backgroundColor === "rgba(0, 0, 0, 0)"
          ? wrapperStyle.backgroundColor
          : (cellStyle?.backgroundColor || "")
    };
  });
  assert(snapshot.pageScrollWidth <= snapshot.pageWidth, `${scenario} ${name}: overflow de página`);
  assert(snapshot.role === "region" && snapshot.tabindex === "0", `${scenario} ${name}: región`);
  assert(snapshot.ariaLabel.startsWith("Tabla:"), `${scenario} ${name}: nombre accesible`);
  assert(snapshot.caption.length >= 20, `${scenario} ${name}: falta título visible`);
  assert(snapshot.columnHeaders >= 2, `${scenario} ${name}: encabezados de columna`);
  assert(snapshot.rowHeaders >= 3, `${scenario} ${name}: encabezados de fila`);
  if (viewport.width < 600) {
    assert(snapshot.hintDisplay === "block", `${scenario} ${name}: indicación móvil`);
    assert(snapshot.wrapperScrollWidth > snapshot.wrapperWidth, `${scenario} ${name}: tabla no desplazable`);
  } else {
    assert(snapshot.hintDisplay === "none", `${scenario} ${name}: indicación fuera de móvil`);
  }
  const headerContrast = contrast(rgb(snapshot.headerColor), rgb(snapshot.headerBackground));
  const bodyContrast = contrast(rgb(snapshot.cellColor), rgb(snapshot.cellBackground));
  assert(headerContrast >= 4.5, `${scenario} ${name}: contraste cabecera ${headerContrast}`);
  assert(bodyContrast >= 4.5, `${scenario} ${name}: contraste cuerpo ${bodyContrast}`);
  const axeSeriousCritical = await axeViolations(page, `${scenario} ${name}`);

  if (scenario === "root") {
    await table.screenshot({ path: path.join(evidenceDir, `tabla-${name}.png`) });
  }
  await context.close();
  return {
    ...snapshot,
    headerContrast: Number(headerContrast.toFixed(2)),
    bodyContrast: Number(bodyContrast.toFixed(2)),
    axeSeriousCritical
  };
}

await mkdir(evidenceDir, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), "udgia015-hugo-"));
let browser;

try {
  const catalog = JSON.parse(await readFile(path.join(root, "data/h5p/catalog.json"), "utf8"));
  const contentFiles = spawnSync(
    "rg",
    ["-l", "\\{\\{[<%]\\s*h5p\\b", "content", "--glob", "*.md"],
    { cwd: root, encoding: "utf8" }
  );
  assert(contentFiles.status === 0, "no se pudieron inventariar montajes H5P");
  const h5pCalls = spawnSync(
    "rg",
    ["-o", "\\{\\{[<%]\\s*h5p\\b", "content", "--glob", "*.md"],
    { cwd: root, encoding: "utf8" }
  );
  assert(h5pCalls.status === 0, "no se pudieron contar montajes H5P");
  const h5pBaseline = {
    catalogContents: Object.keys(catalog.contents).length,
    pages: contentFiles.stdout.trim().split("\n").filter(Boolean).length,
    mounts: h5pCalls.stdout.trim().split("\n").filter(Boolean).length
  };
  // Línea base actualizada 2026-08-27 por UDGIA-022: 9 objetos + 30 prácticas del curso
  // promovidas a H5P.MultiChoice; 5 páginas + las 13 lecciones; 7 montajes + 30.
  // Sigue siendo una guarda de deriva: cualquier alta o baja no intencionada la rompe.
  assert(
    h5pBaseline.catalogContents === 39 && h5pBaseline.pages === 18 && h5pBaseline.mounts === 37,
    `deriva H5P ${JSON.stringify(h5pBaseline)}`
  );

  assert(chromiumBinary, "No se encontró Chromium");
  browser = await chromium.launch({
    executablePath: chromiumBinary,
    headless: true,
    args: ["--no-sandbox"]
  });
  const scenarios = [
    { name: "root", mountPath: "", buildBaseURL: "http://127.0.0.1/" },
    { name: "subpath", mountPath: "ecosistema-ia", buildBaseURL: "http://127.0.0.1/ecosistema-ia/" }
  ];
  const report = {
    schemaVersion: 1,
    status: "PASS",
    checkedAt: new Date().toISOString(),
    h5pBaseline,
    scenarios: {}
  };

  for (const scenario of scenarios) {
    const siteRoot = path.join(tempRoot, scenario.name);
    const hugo = build(siteRoot, scenario.buildBaseURL);
    const server = await startServer(siteRoot, scenario.mountPath);
    try {
      const homeDesktop = await inspectEntry(
        browser,
        server.baseURL,
        "",
        { width: 1440, height: 1000 },
        scenario.name,
        "inicio-desktop"
      );
      const iaMobile = await inspectEntry(
        browser,
        server.baseURL,
        "ia-educacion/",
        { width: 375, height: 812 },
        scenario.name,
        "ia-mobile"
      );
      const comparisonMobile = await inspectTable(
        browser,
        server.baseURL,
        "ia-educacion/constelaciones/empezar-con-ia/",
        { width: 375, height: 812 },
        scenario.name,
        "comparativa-mobile",
        ".udgia-table--comparison"
      );
      const matrixDesktop = await inspectTable(
        browser,
        server.baseURL,
        "ia-educacion/rutas/coordinacion-academica/",
        { width: 1440, height: 1000 },
        scenario.name,
        "matriz-desktop",
        ".udgia-table--matrix"
      );
      const essayResponse = await browser
        .newContext()
        .then(async (context) => {
          try {
            const page = await context.newPage();
            await page.goto(new URL("ia-educacion/productos-de-aprendizaje/ensayo/", server.baseURL).href);
            const audit = await page.locator(".udgia-table").evaluateAll((tables) => {
              const ids = tables.map((table) => table.id);
              return { count: tables.length, uniqueIds: new Set(ids).size };
            });
            return audit;
          } finally {
            await context.close();
          }
        });
      assert(
        essayResponse.count === 8 && essayResponse.uniqueIds === essayResponse.count,
        `${scenario.name}: tablas automáticas ${JSON.stringify(essayResponse)}`
      );
      const decisionResponse = await browser
        .newContext()
        .then(async (context) => {
          try {
            const page = await context.newPage();
            await page.goto(new URL("ia-educacion/rutas/decision-institucional-ia/", server.baseURL).href);
            const count = await page.locator(".udgia-executive-table").count();
            return count;
          } finally {
            await context.close();
          }
        });
      assert(decisionResponse === 2, `${scenario.name}: regresión en tablas ejecutivas`);
      report.scenarios[scenario.name] = {
        hugo,
        homeDesktop,
        iaMobile,
        comparisonMobile,
        matrixDesktop,
        automaticEssayTables: essayResponse.count,
        automaticEssayTableIdsUnique: essayResponse.uniqueIds === essayResponse.count,
        preservedExecutiveTables: decisionResponse
      };
    } finally {
      await server.close();
    }
  }
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(
    `PASS: rutas visibles y tablas Almagre en raíz/subruta; ` +
    `axe, contraste, móvil, enlaces y H5P sin deriva.\nEvidencia: ${evidenceDir}\n`
  );
} finally {
  await browser?.close();
  await rm(tempRoot, { recursive: true, force: true });
}
