import { createReadStream, existsSync } from "node:fs";
import { mkdir, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const prototypeDirectory = path.dirname(fileURLToPath(import.meta.url));
const evidenceRoot = path.resolve(prototypeDirectory, "../..");
const prototypePath = "prototipos/revisor-alineacion-m6/";
const chromiumBinary = process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : chromium.executablePath());

const report = {
  checkedAt: new Date().toISOString(),
  prototype: prototypePath,
  scenarios: [],
  screenshots: [],
  failures: []
};

function assert(condition, message) {
  if (!condition) {
    report.failures.push(message);
    throw new Error(message);
  }
}

function mimeType(file) {
  return ({
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml"
  })[path.extname(file).toLowerCase()] || "application/octet-stream";
}

async function startServer(basePath) {
  const requests = [];
  const normalizedBase = basePath === "/" ? "/" : `/${basePath.replace(/^\/+|\/+$/g, "")}/`;
  const server = http.createServer(async (request, response) => {
    try {
      const requestURL = new URL(request.url, "http://127.0.0.1");
      requests.push(requestURL.pathname);
      if (!requestURL.pathname.startsWith(normalizedBase)) {
        response.writeHead(404).end("Not found");
        return;
      }
      const relativeURL = requestURL.pathname.slice(normalizedBase.length);
      const normalized = path.posix.normalize(`/${relativeURL}`).replace(/^\/+/, "");
      assert(!normalized.startsWith(".."), "El servidor rechazó un escape de directorio");
      let file = path.join(evidenceRoot, normalized);
      if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html");
      const relative = path.relative(evidenceRoot, file);
      assert(!relative.startsWith("..") && !path.isAbsolute(relative), "La ruta solicitada salió del directorio de evidencia");
      const fileStat = await stat(file);
      response.writeHead(200, {
        "content-type": mimeType(file),
        "content-length": fileStat.size,
        "cache-control": "no-store"
      });
      await pipeline(createReadStream(file), response);
    }
    catch {
      response.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ host: "127.0.0.1", port: 0 }, () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  return {
    baseURL: `http://127.0.0.1:${address.port}${normalizedBase}`,
    requests,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

async function axeAudit(page, label) {
  await page.evaluate(axe.source);
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      rules: { region: { enabled: true } }
    });
    return result.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      nodes: item.nodes.length,
      help: item.help,
      targets: item.nodes.map((node) => ({ target: node.target, html: node.html, summary: node.failureSummary }))
    }));
  });
  assert(violations.length === 0, `${label}: axe ${JSON.stringify(violations)}`);
  return violations;
}

async function runInteractive(browser, basePath, viewport, colorScheme, screenshotName) {
  const server = await startServer(basePath);
  const context = await browser.newContext({ viewport, colorScheme });
  const page = await context.newPage();
  const consoleErrors = [];
  const externalRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    if (!request.url().startsWith(server.baseURL)) externalRequests.push(request.url());
  });

  try {
    const url = `${server.baseURL}${prototypePath}`;
    const response = await page.goto(url, { waitUntil: "networkidle" });
    assert(response?.status() === 200, `${basePath}: la página principal no respondió 200`);
    assert(await page.locator("h1").textContent() === "¿Tu actividad pide, practica y revisa lo mismo?", `${basePath}: título inesperado`);
    assert(await page.evaluate(() => localStorage.length) === 0, `${basePath}: hubo escritura local antes del consentimiento`);
    assert(externalRequests.length === 0, `${basePath}: solicitudes externas ${externalRequests.join(", ")}`);
    assert(consoleErrors.length === 0, `${basePath}: errores de consola ${consoleErrors.join(" | ")}`);

    await page.locator("button[type=submit]").focus();
    await page.keyboard.press("Enter");
    assert(await page.locator("#error-summary").isVisible(), `${basePath}: falta el resumen de errores`);
    assert(await page.evaluate(() => document.activeElement?.id) === "error-summary", `${basePath}: el resumen de errores no recibió foco`);

    await page.locator("#load-example").focus();
    await page.keyboard.press("Enter");
    await page.locator("button[type=submit]").focus();
    await page.keyboard.press("Enter");
    assert(await page.locator("#review-result").isVisible(), `${basePath}: no apareció el diagnóstico`);
    assert((await page.locator("#result-title").textContent()).includes("ajusta lo que pedirás al final"), `${basePath}: no detectó el primer ajuste`);
    assert(await page.evaluate(() => document.activeElement?.id) === "review-result", `${basePath}: el resultado no recibió foco`);

    if (screenshotName === "captura-escritorio.png") {
      const resultScreenshot = path.join(prototypeDirectory, "captura-resultado.png");
      await page.screenshot({ path: resultScreenshot, fullPage: true });
      report.screenshots.push("captura-resultado.png");
    }

    await page.locator('input[name="purposeEvidence"][value="yes"]').check();
    await page.locator('input[name="evidenceExperience"][value="unsure"]').check();
    await page.locator("button[type=submit]").click();
    assert((await page.locator("#result-title").textContent()).includes("comprueba la práctica"), `${basePath}: no detectó el primer punto dudoso`);

    for (const relation of ["purposeEvidence", "evidenceExperience", "experienceAssistance", "alternativeEquivalent"]) {
      await page.locator(`input[name="${relation}"][value="yes"]`).check();
    }
    await page.locator("button[type=submit]").click();
    assert((await page.locator("#result-title").textContent()).includes("parece mantener el mismo aprendizaje"), `${basePath}: la salida sin ajuste declarado es incorrecta`);

    await page.locator("#purpose").fill("<img src=x onerror=alert(1)> Comparar dos soluciones con razones.");
    await page.locator("button[type=submit]").click();
    assert(await page.locator("#result-summary img").count() === 0, `${basePath}: la entrada creó HTML en el resultado`);
    assert((await page.locator("#result-summary").textContent()).includes("<img src=x"), `${basePath}: la entrada no se conservó como texto`);

    await page.locator("#save-draft").click();
    assert(await page.evaluate(() => localStorage.length) === 1, `${basePath}: el guardado local no quedó acotado a una clave`);
    await page.reload({ waitUntil: "networkidle" });
    assert((await page.locator("#purpose").inputValue()).includes("Comparar dos soluciones"), `${basePath}: el borrador no se recuperó`);
    page.once("dialog", (dialog) => dialog.accept());
    await page.locator("#clear-draft").click();
    assert(await page.evaluate(() => localStorage.length) === 0, `${basePath}: borrar no retiró el estado local`);
    assert(await page.locator("#purpose").inputValue() === "", `${basePath}: borrar no limpió el formulario`);

    const fallbackResponse = await page.goto(`${server.baseURL}${prototypePath}fallback-imprimible.html`, { waitUntil: "networkidle" });
    assert(fallbackResponse?.status() === 200, `${basePath}: fallback no respondió 200`);
    assert(await page.locator("textarea").count() === 5, `${basePath}: fallback incompleto`);
    assert(await page.locator("fieldset").count() === 4, `${basePath}: fallback sin cuatro relaciones`);
    await axeAudit(page, `${basePath} fallback`);

    await page.goto(url, { waitUntil: "networkidle" });
    await axeAudit(page, `${basePath} interactivo`);
    const overflow = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    assert(overflow.scroll <= overflow.client + 1, `${basePath}: desbordamiento horizontal ${JSON.stringify(overflow)}`);

    await page.emulateMedia({ media: "print" });
    assert(await page.locator(".form-toolbar").evaluate((element) => getComputedStyle(element).display) === "none", `${basePath}: la barra local aparece al imprimir`);
    assert(await page.locator(".primary-actions").evaluate((element) => getComputedStyle(element).display) === "none", `${basePath}: los controles de revisión aparecen al imprimir`);
    await page.emulateMedia({ media: "screen", colorScheme });

    const screenshotPath = path.join(prototypeDirectory, screenshotName);
    await mkdir(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: true });
    report.screenshots.push(screenshotName);
    report.scenarios.push({ basePath, viewport, colorScheme, consoleErrors, externalRequests, requests: server.requests.length, axe: 0, overflow });
  }
  finally {
    await context.close();
    await server.close();
  }
}

async function runNoJavaScript(browser) {
  const server = await startServer("sin-js/");
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    const response = await page.goto(`${server.baseURL}${prototypePath}`, { waitUntil: "networkidle" });
    assert(response?.status() === 200, "sin JS: la página principal no respondió 200");
    assert(await page.locator("noscript").isVisible(), "sin JS: no apareció la alternativa" );
    await page.locator("noscript a").click();
    assert(page.url().endsWith("fallback-imprimible.html"), "sin JS: el enlace no llegó al fallback");
    assert(await page.locator("textarea").count() === 5, "sin JS: la hoja no contiene cinco campos");
    report.scenarios.push({ basePath: "sin-js/", viewport: { width: 390, height: 844 }, javaScriptEnabled: false, fallback: true });
  }
  finally {
    await context.close();
    await server.close();
  }
}

async function runStorageDenied(browser) {
  const server = await startServer("almacenamiento-bloqueado/");
  const context = await browser.newContext({ viewport: { width: 800, height: 800 } });
  await context.addInitScript(() => {
    for (const method of ["getItem", "setItem", "removeItem"]) {
      Object.defineProperty(Storage.prototype, method, {
        configurable: true,
        value() { throw new DOMException("Storage disabled", "SecurityError"); }
      });
    }
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  try {
    const response = await page.goto(`${server.baseURL}${prototypePath}`, { waitUntil: "networkidle" });
    assert(response?.status() === 200, "almacenamiento bloqueado: la página no respondió 200");
    assert((await page.locator("#draft-status").textContent()).includes("no permitió recuperar"), "almacenamiento bloqueado: no explicó la recuperación fallida");
    await page.locator("#load-example").click();
    await page.locator("#save-draft").click();
    assert((await page.locator("#draft-status").textContent()).includes("no permitió guardar"), "almacenamiento bloqueado: no explicó el guardado fallido");
    page.once("dialog", (dialog) => dialog.accept());
    await page.locator("#clear-draft").click();
    assert((await page.locator("#draft-status").textContent()).includes("formulario quedó limpio"), "almacenamiento bloqueado: no limpió el formulario" );
    assert(consoleErrors.length === 0, `almacenamiento bloqueado: errores de consola ${consoleErrors.join(" | ")}`);
    report.scenarios.push({ basePath: "almacenamiento-bloqueado/", viewport: { width: 800, height: 800 }, storageDenied: true, consoleErrors });
  }
  finally {
    await context.close();
    await server.close();
  }
}

let browser;
try {
  browser = await chromium.launch({ executablePath: chromiumBinary, headless: true, args: ["--no-sandbox"] });
  await runInteractive(browser, "/", { width: 1280, height: 900 }, "light", "captura-escritorio.png");
  await runInteractive(browser, "biblioteca/", { width: 320, height: 760 }, "dark", "captura-movil.png");
  await runNoJavaScript(browser);
  await runStorageDenied(browser);
  report.status = "PASS";
}
catch (error) {
  report.status = "FAIL";
  report.error = error.stack || String(error);
  process.exitCode = 1;
}
finally {
  if (browser) await browser.close();
  const serialized = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(path.join(prototypeDirectory, "qa-report.json"), serialized, "utf8");
  process.stdout.write(serialized);
}
