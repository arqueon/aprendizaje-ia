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

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pagePath = "ia-educacion/constelaciones/cocreacion-evaluacion/";
const expectedIDs = [
  "cocreacion-versiones-slider",
  "direccion-epistemica-hotspots",
  "cocreacion-conceptos-cards",
  "evaluacion-proceso-decision",
  "cocreacion-evaluacion-recorrido",
  "objetivos-bloom-udgplus"
];
const evidenceDirectory = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(repoRoot, "docs/design/evidence/udgia-004b");
const reportPath = path.join(evidenceDirectory, "qa-pilot.json");
const chromiumBinary =
  process.env.CHROMIUM_PATH || (await stat("/usr/bin/chromium").catch(() => null)
    ? "/usr/bin/chromium"
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
      if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html");
      const relative = path.relative(root, file);
      if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Ruta insegura");
      const fileStat = await stat(file);
      response.setHeader("content-type", mimeType(file));
      response.setHeader("content-length", fileStat.size);
      response.writeHead(200);
      await pipeline(createReadStream(file), response);
    } catch {
      response.writeHead(404).end("Not found");
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
  return {
    warnings: result.stderr.split("\n").filter((line) => line.startsWith("WARN"))
  };
}

async function axeViolations(target, label) {
  await target.addScriptTag({ content: axe.source });
  const violations = await target.evaluate(async () => {
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
        targets: violation.nodes.slice(0, 3).map((node) => ({
          target: node.target,
          html: node.html,
          summary: node.failureSummary
        }))
      }));
  });
  assert(violations.length === 0, `${label}: axe ${JSON.stringify(violations)}`);
  return violations;
}

async function locatorFrame(iframe, label) {
  const handle = await iframe.elementHandle();
  const frame = await handle?.contentFrame();
  assert(frame, `${label}: no se pudo resolver el iframe`);
  return frame;
}

async function mobileCase(browser, baseURL) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 900 },
    reducedMotion: "reduce",
    colorScheme: "dark"
  });
  const page = await context.newPage();
  await page.goto(new URL(pagePath, baseURL).href, { waitUntil: "load" });
  const result = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h5pCount: document.querySelectorAll("[data-udg-h5p]").length,
    fallbackLengths: [...document.querySelectorAll(".udg-h5p__fallback-body")].map(
      (element) => element.textContent.trim().length
    ),
    dark: document.documentElement.classList.contains("dark"),
    colorScheme: getComputedStyle(document.documentElement).colorScheme
  }));
  assert(result.h5pCount === expectedIDs.length, "Móvil: inventario H5P incompleto");
  assert(result.scrollWidth <= result.width, `Móvil: overflow ${result.scrollWidth}/${result.width}`);
  assert(result.fallbackLengths.every((length) => length > 180), "Móvil: fallback insuficiente");
  assert(!result.dark && result.colorScheme.includes("light"), "Móvil: identidad no exclusivamente clara");
  await axeViolations(page, "Página móvil");
  await context.close();
  return result;
}

async function desktopCase(browser, baseURL) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const externalRequests = [];
  const writeRequests = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const requestURL = new URL(request.url());
    if (
      requestURL.origin !== new URL(baseURL).origin &&
      !["data:", "blob:"].includes(requestURL.protocol)
    ) {
      externalRequests.push(request.url());
    }
    if (!["GET", "HEAD"].includes(request.method())) {
      writeRequests.push({ method: request.method(), url: request.url() });
    }
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  const response = await page.goto(new URL(pagePath, baseURL).href, { waitUntil: "load" });
  assert(response?.status() === 200, "La portada no respondió HTTP 200");
  assert((await page.locator("[data-udg-h5p]").count()) === expectedIDs.length, "Faltan H5P");
  assert((await page.locator(".udg-h5p__iframe").count()) === 0, "Hubo carga anticipada");
  await axeViolations(page, "Página de constelación");

  const activities = [];
  for (let index = 0; index < expectedIDs.length; index += 1) {
    const expectedID = expectedIDs[index];
    const section = page.locator("[data-udg-h5p]").nth(index);
    const embedURL = await section.getAttribute("data-embed-url");
    assert(embedURL?.includes(`content=${expectedID}`), `Orden o ID inesperado: ${expectedID}`);
    await section.locator('[data-h5p-action="load"]').focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(
      (ordinal) =>
        document.querySelectorAll("[data-udg-h5p]")[ordinal]?.dataset.state === "ready",
      index,
      { timeout: 30000 }
    );
    const iframe = section.locator("iframe");
    const contentFrame = await locatorFrame(iframe, expectedID);
    await contentFrame.locator("#h5p-container[aria-busy='false']").waitFor({ timeout: 30000 });
    await contentFrame.locator(".h5p-iframe").waitFor({ timeout: 30000 });
    const playerFrame = await locatorFrame(
      contentFrame.locator(".h5p-iframe"),
      `${expectedID} player`
    );
    await contentFrame.waitForTimeout(500);
    const height = Number.parseFloat(await iframe.evaluate((element) => element.style.height));
    const inner = await playerFrame.evaluate(() => {
      const imageCount = [...document.querySelectorAll("*")].filter((element) => {
        const background = getComputedStyle(element).backgroundImage;
        return (
          ["IMG", "SVG", "CANVAS", "PICTURE"].includes(element.tagName.toUpperCase()) ||
          (background && background !== "none" && background.includes("url("))
        );
      }).length;
      return {
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        height: document.documentElement.clientHeight,
        scrollHeight: document.documentElement.scrollHeight,
        imageCount,
        errorText: [...document.querySelectorAll(".h5p-error, .h5p-error-message")]
          .map((element) => element.textContent.trim())
          .filter(Boolean)
      };
    });
    assert(height > 180 && height <= 6000, `${expectedID}: altura inválida ${height}`);
    assert(inner.scrollWidth <= inner.width + 2, `${expectedID}: overflow horizontal`);
    assert(inner.errorText.length === 0, `${expectedID}: ${inner.errorText.join(" | ")}`);
    assert(inner.imageCount > 0, `${expectedID}: no contiene imagen interior ${JSON.stringify(inner)}`);
    assert(
      !(await section.locator(".udg-h5p__fallback").evaluate((element) => element.open)),
      `${expectedID}: fallback no se cerró`
    );
    const violations = await axeViolations(playerFrame, expectedID);
    activities.push({ id: expectedID, height, inner, violations });
  }

  const bloom = page.locator("[data-udg-h5p]").nth(expectedIDs.indexOf("objetivos-bloom-udgplus"));
  const bloomEmbedFrame = await locatorFrame(bloom.locator("iframe"), "Bloom embed");
  const bloomFrame = await locatorFrame(
    bloomEmbedFrame.locator(".h5p-iframe"),
    "Bloom player"
  );
  await bloomFrame.locator(".bob-level").nth(3).click();
  await bloomFrame.locator(".bob-verb").first().click();
  await bloomFrame.locator('[data-field="content"]').fill("dos fuentes con criterios explícitos");
  await bloomFrame.locator('[data-field="condition"]').fill("a partir de un caso");
  await bloomFrame.locator('[data-field="criterion"]').fill("justificando tres diferencias");
  const preview = (await bloomFrame.locator(".bob-preview").textContent())?.trim() || "";
  assert(preview.includes("dos fuentes"), "Bloom: la vista previa no respondió");
  assert(await bloomFrame.locator(".bob-save").isEnabled(), "Bloom: no habilitó el guardado");
  await bloomFrame.locator(".bob-save").click();
  assert((await bloomFrame.locator(".bob-saved-item").count()) === 1, "Bloom: no guardó el objetivo");

  const pageGeometry = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));
  assert(pageGeometry.scrollWidth <= pageGeometry.width, "Escritorio: overflow horizontal");
  assert(externalRequests.length === 0, `Solicitudes externas: ${externalRequests.join(", ")}`);
  assert(writeRequests.length === 0, `Solicitudes de escritura: ${JSON.stringify(writeRequests)}`);
  assert(consoleErrors.length === 0, `Errores de consola: ${consoleErrors.join(" | ")}`);
  assert((await context.cookies()).length === 0, "Las actividades crearon cookies");
  await context.close();
  return {
    activities,
    preview,
    pageGeometry,
    externalRequests,
    writeRequests,
    consoleErrors
  };
}

const temporaryRoot = await mkdtemp(path.join(tmpdir(), "udgia004b-qa-"));
const publicRoot = path.join(temporaryRoot, "public");
await mkdir(publicRoot);
const server = await startServer(publicRoot);
let browser;
try {
  const hugo = runHugo(publicRoot, server.baseURL);
  assert(chromiumBinary, "No se encontró Chromium");
  browser = await chromium.launch({
    executablePath: chromiumBinary,
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  const report = {
    schemaVersion: 1,
    generated: new Date().toISOString(),
    page: pagePath,
    expectedIDs,
    hugo,
    mobile: await mobileCase(browser, server.baseURL),
    desktop: await desktopCase(browser, server.baseURL)
  };
  await mkdir(evidenceDirectory, { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`PASS ${path.relative(repoRoot, reportPath)}\n`);
} finally {
  if (browser) await browser.close();
  await server.close();
  await rm(temporaryRoot, { recursive: true, force: true });
}
