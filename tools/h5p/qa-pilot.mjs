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
const introPagePath = "ia-educacion/constelaciones/empezar-con-ia/";
const activityPages = [
  {
    id: "cocreacion-versiones-slider",
    path: "ia-educacion/productos-de-aprendizaje/ensayo/"
  },
  {
    id: "direccion-epistemica-hotspots",
    path: "formacion-docente/alfabetizacion-co-creacion/"
  },
  {
    id: "cocreacion-conceptos-cards",
    path: "ia-educacion/guias/agenciamiento-humano-ia/"
  },
  {
    id: "evaluacion-proceso-decision",
    path: "ia-educacion/guias/evaluacion-formativa-ia/"
  },
  {
    id: "cocreacion-evaluacion-recorrido",
    path: "formacion-docente/alfabetizacion-agenciamiento-ia/"
  },
  {
    id: "objetivos-bloom-udgplus",
    path: "formacion-docente/taxonomia-bloom-diseno-inverso/"
  }
];
const expectedIDs = activityPages.map(({ id }) => id);
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

function sectionFor(page, id) {
  return page.locator(
    `[data-udg-h5p][data-embed-url*="content=${id}"]`
  );
}

async function loadActivity(page, id) {
  const section = sectionFor(page, id);
  assert((await section.count()) === 1, `${id}: no se encontró una sección única`);
  assert((await section.locator(".udg-h5p__iframe").count()) === 0, `${id}: carga anticipada`);
  await section.locator('[data-h5p-action="load"]').focus();
  await page.keyboard.press("Enter");
  await page.waitForFunction(
    (activityID) => {
      const activity = [...document.querySelectorAll("[data-udg-h5p]")].find(
        (element) => element.dataset.embedUrl?.includes(`content=${activityID}`)
      );
      return activity?.dataset.state === "ready";
    },
    id,
    { timeout: 30000 }
  );
  const iframe = section.locator("iframe");
  const contentFrame = await locatorFrame(iframe, id);
  await contentFrame.locator("#h5p-container[aria-busy='false']").waitFor({ timeout: 30000 });
  await contentFrame.locator(".h5p-iframe").waitFor({ timeout: 30000 });
  const playerFrame = await locatorFrame(contentFrame.locator(".h5p-iframe"), `${id} player`);
  await contentFrame.waitForTimeout(700);
  return { section, iframe, playerFrame };
}

async function mobileCase(browser, baseURL) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 900 },
    reducedMotion: "reduce",
    colorScheme: "dark"
  });
  const page = await context.newPage();
  const introResponse = await page.goto(new URL(introPagePath, baseURL).href, {
    waitUntil: "load"
  });
  assert(introResponse?.status() === 200, "Móvil: la introducción no respondió HTTP 200");
  const intro = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h5pCount: document.querySelectorAll("[data-udg-h5p]").length,
    studentRoute: Boolean(document.querySelector('a[href="#si-eres-estudiante"]')),
    teacherRoute: Boolean(document.querySelector('a[href="#si-eres-docente"]')),
    dark: document.documentElement.classList.contains("dark"),
    colorScheme: getComputedStyle(document.documentElement).colorScheme
  }));
  assert(intro.h5pCount === 0, "Móvil: la introducción no debe contener H5P");
  assert(intro.studentRoute && intro.teacherRoute, "Móvil: faltan las dos entradas");
  assert(intro.scrollWidth <= intro.width, "Móvil: overflow en la introducción");
  assert(!intro.dark && intro.colorScheme.includes("light"), "Móvil: identidad no clara");
  await axeViolations(page, "Introducción móvil");
  await page.screenshot({
    path: path.join(evidenceDirectory, "introduccion-movil.png"),
    fullPage: true
  });

  const activities = [];
  for (const activity of activityPages) {
    const response = await page.goto(new URL(activity.path, baseURL).href, {
      waitUntil: "load"
    });
    assert(response?.status() === 200, `${activity.id}: página móvil HTTP`);
    const result = await page.evaluate((id) => {
      const section = [...document.querySelectorAll("[data-udg-h5p]")].find(
        (element) => element.dataset.embedUrl?.includes(`content=${id}`)
      );
      return {
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        fallbackLength:
          section?.querySelector(".udg-h5p__fallback-body")?.textContent.trim().length || 0
      };
    }, activity.id);
    assert(result.scrollWidth <= result.width, `${activity.id}: overflow móvil`);
    assert(result.fallbackLength > 180, `${activity.id}: fallback insuficiente`);
    await axeViolations(page, `${activity.id} móvil`);
    activities.push({ ...activity, ...result });
  }
  await context.close();
  return { intro, activities };
}

async function visualAudit(playerFrame, id) {
  const result = await playerFrame.evaluate((activityID) => {
    const root = document.documentElement;
    const visibleImages = [...document.querySelectorAll("img")].map((image) => {
      const box = image.getBoundingClientRect();
      return {
        width: box.width,
        height: box.height,
        ratio: box.height ? box.width / box.height : 0
      };
    }).filter(({ width, height }) => width > 20 && height > 20);
    const audit = {
      viewportWidth: root.clientWidth,
      visibleImages,
      checks: {}
    };
    if (activityID === "cocreacion-versiones-slider") {
      const widest = visibleImages.reduce(
        (best, current) => (current.width > best.width ? current : best),
        { width: 0, height: 0, ratio: 0 }
      );
      audit.checks = {
        imageFillsPlayer: widest.width >= root.clientWidth * 0.8,
        landscapeRatio: widest.ratio >= 1.65 && widest.ratio <= 1.9
      };
    }
    if (activityID === "direccion-epistemica-hotspots") {
      const hotspots = [...document.querySelectorAll(".h5p-image-hotspot")].map((element) => {
        const box = element.getBoundingClientRect();
        return { left: box.left, top: box.top, right: box.right, bottom: box.bottom };
      });
      const overlaps = hotspots.some((left, index) =>
        hotspots.slice(index + 1).some(
          (right) =>
            left.left < right.right &&
            left.right > right.left &&
            left.top < right.bottom &&
            left.bottom > right.top
        )
      );
      audit.checks = { hotspotCount: hotspots.length, hotspotsDoNotOverlap: !overlaps };
    }
    if (activityID === "cocreacion-conceptos-cards") {
      const paragraphLengths = [...document.querySelectorAll("p")]
        .filter((element) => {
          const box = element.getBoundingClientRect();
          return box.width > 0 && box.height > 0;
        })
        .map((element) => element.textContent.trim().length);
      const scene = visibleImages.reduce(
        (best, current) => (current.width > best.width ? current : best),
        { width: 0, height: 0, ratio: 0 }
      );
      audit.checks = {
        progressShowsFour: /\b(?:de|\/)\s*4\b/.test(document.body.innerText),
        explanatoryTextPresent: Math.max(0, ...paragraphLengths) > 180,
        sceneKeepsLandscapeRatio: scene.ratio >= 1.65 && scene.ratio <= 1.9
      };
    }
    if (activityID === "evaluacion-proceso-decision") {
      const alternatives = [...document.querySelectorAll(".h5p-alternative-container")];
      const image = visibleImages.reduce(
        (best, current) => (current.width > best.width ? current : best),
        { width: 0, height: 0, ratio: 0 }
      );
      audit.checks = {
        answerCount: alternatives.length,
        answersStyled: alternatives.every((element) => {
          const style = getComputedStyle(element);
          return style.backgroundColor !== "rgb(221, 221, 221)" &&
            Number.parseFloat(style.borderRadius) >= 8;
        }),
        imageReadable: image.width >= root.clientWidth * 0.72
      };
    }
    if (activityID === "cocreacion-evaluacion-recorrido") {
      const landscape = visibleImages.find(
        ({ ratio, width }) => ratio >= 1.65 && ratio <= 1.9 && width > root.clientWidth * 0.35
      );
      audit.checks = { sceneKeepsLandscapeRatio: Boolean(landscape) };
    }
    return audit;
  }, id);
  for (const [check, value] of Object.entries(result.checks)) {
    if (typeof value === "number") {
      assert(value > 0, `${id}: ${check} no produjo un conteo válido`);
    } else {
      assert(
        value,
        `${id}: falló la revisión visual ${check} ${JSON.stringify(result)}`
      );
    }
  }
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
  const introResponse = await page.goto(new URL(introPagePath, baseURL).href, {
    waitUntil: "load"
  });
  assert(introResponse?.status() === 200, "La introducción no respondió HTTP 200");
  assert((await page.locator("[data-udg-h5p]").count()) === 0, "La introducción contiene H5P");
  await axeViolations(page, "Introducción");

  const activities = [];
  for (const activity of activityPages) {
    const response = await page.goto(new URL(activity.path, baseURL).href, {
      waitUntil: "load"
    });
    assert(response?.status() === 200, `${activity.id}: página HTTP`);
    await axeViolations(page, `${activity.id}: página`);
    const { section, iframe, playerFrame } = await loadActivity(page, activity.id);
    if (activity.id === "cocreacion-conceptos-cards") {
      await playerFrame.locator(".h5p-dialogcards-turn:visible").first().click();
      await playerFrame.waitForTimeout(350);
    }
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
    assert(height > 180 && height <= 6000, `${activity.id}: altura inválida ${height}`);
    assert(inner.scrollWidth <= inner.width + 2, `${activity.id}: overflow horizontal`);
    assert(inner.errorText.length === 0, `${activity.id}: ${inner.errorText.join(" | ")}`);
    assert(inner.imageCount > 0, `${activity.id}: falta una imagen interior`);
    assert(
      !(await section.locator(".udg-h5p__fallback").evaluate((element) => element.open)),
      `${activity.id}: el fallback no se cerró`
    );
    const visual = await visualAudit(playerFrame, activity.id);
    const violations = await axeViolations(playerFrame, activity.id);
    await section.screenshot({
      path: path.join(evidenceDirectory, `${activity.id}.png`)
    });
    activities.push({ ...activity, height, inner, visual, violations });
  }

  const bloomActivity = activityPages.find(({ id }) => id === "objetivos-bloom-udgplus");
  await page.goto(new URL(bloomActivity.path, baseURL).href, { waitUntil: "load" });
  const { playerFrame: bloomFrame } = await loadActivity(page, bloomActivity.id);
  await bloomFrame.locator(".bob-level").nth(3).click();
  await bloomFrame.locator(".bob-verb").first().click();
  await bloomFrame.locator('[data-field="content"]').fill("dos fuentes con criterios explícitos");
  await bloomFrame.locator('[data-field="condition"]').fill("a partir de un caso");
  await bloomFrame.locator('[data-field="criterion"]').fill("justificando tres diferencias");
  const preview = (await bloomFrame.locator(".bob-preview").textContent())?.trim() || "";
  assert(preview.includes("dos fuentes"), "Bloom: la vista previa no respondió");
  assert(await bloomFrame.locator(".bob-save").isEnabled(), "Bloom: no habilitó el guardado");
  await bloomFrame.locator(".bob-save").click();
  assert((await bloomFrame.locator(".bob-saved-item").count()) === 1, "Bloom: no guardó");

  assert(externalRequests.length === 0, `Solicitudes externas: ${externalRequests.join(", ")}`);
  assert(writeRequests.length === 0, `Solicitudes de escritura: ${JSON.stringify(writeRequests)}`);
  assert(consoleErrors.length === 0, `Errores de consola: ${consoleErrors.join(" | ")}`);
  assert((await context.cookies()).length === 0, "Las actividades crearon cookies");
  await context.close();
  return {
    activities,
    preview,
    externalRequests,
    writeRequests,
    consoleErrors
  };
}

const temporaryRoot = await mkdtemp(path.join(tmpdir(), "udgia004b-qa-"));
const publicRoot = path.join(temporaryRoot, "public");
await mkdir(publicRoot);
await mkdir(evidenceDirectory, { recursive: true });
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
    schemaVersion: 2,
    generated: new Date().toISOString(),
    introPage: introPagePath,
    activityPages,
    expectedIDs,
    hugo,
    mobile: await mobileCase(browser, server.baseURL),
    desktop: await desktopCase(browser, server.baseURL)
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`PASS ${path.relative(repoRoot, reportPath)}\n`);
} finally {
  if (browser) await browser.close();
  await server.close();
  await rm(temporaryRoot, { recursive: true, force: true });
}
