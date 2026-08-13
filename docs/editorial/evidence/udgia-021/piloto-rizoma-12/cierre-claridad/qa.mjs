import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { cp, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

const evidenceDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(evidenceDirectory, "../../../../../..");
const variantsDirectory = path.join(evidenceDirectory, "variants");
const capturesDirectory = path.join(evidenceDirectory, "captures");
const reportPath = path.join(evidenceDirectory, "qa-report.json");
const manifestPath = path.join(evidenceDirectory, "manifest.json");
const activeTemplatePath = path.join(repoRoot, "layouts/partials/related.html");
const chromiumBinary = process.env.CHROMIUM_PATH || "/usr/bin/chromium";

const variants = {
  a: {
    name: "A · Solo conexiones curadas",
    template: path.join(variantsDirectory, "related-a-curated.html")
  },
  b: {
    name: "B afinada · Máximo dos coincidencias explicadas",
    template: path.join(variantsDirectory, "related-b-explained.html")
  }
};

const pilotPages = [
  "ia-educacion/constelaciones/empezar-con-ia/",
  "ia-educacion/guias/estudiantes/",
  "ia-educacion/guias/profesorado/",
  "ia-educacion/investigacion/",
  "formacion-docente/alfabetizacion-co-creacion/",
  "recursos/glosario/ganancia-cognitiva/",
  "ia-educacion/guias/evaluacion-formativa-ia/",
  "ia-educacion/guias/privacidad-datos-ia/",
  "ia-educacion/practicas/comprobar-afirmacion/",
  "ia-educacion/practicas/bitacora-cocreacion/",
  "ia-educacion/productos-de-aprendizaje/ensayo/",
  "observatorio/estudios/paradoja-descarga-cognitiva/"
];

const samplePages = [
  {
    slug: "ganancia-cognitiva",
    title: "Ganancia cognitiva",
    path: "recursos/glosario/ganancia-cognitiva/"
  },
  {
    slug: "paradoja-descarga",
    title: "La paradoja de la descarga cognitiva",
    path: "observatorio/estudios/paradoja-descarga-cognitiva/"
  }
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 }
};

const sourceEntries = [
  "assets",
  "content",
  "data",
  "i18n",
  "layouts",
  "static",
  "hugo.toml",
  "go.mod",
  "go.sum"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function exists(file) {
  return Boolean(await stat(file).catch(() => null));
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function fileHash(file) {
  return sha256(await readFile(file));
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

async function copyCandidate(target, template) {
  await mkdir(target, { recursive: true });
  for (const entry of sourceEntries) {
    const source = path.join(repoRoot, entry);
    if (!(await exists(source))) continue;
    await cp(source, path.join(target, entry), { recursive: true });
  }
  const candidateTemplate = path.join(target, "layouts/partials/related.html");
  await mkdir(path.dirname(candidateTemplate), { recursive: true });
  await cp(template, candidateTemplate);
}

function runHugo(candidateRoot, destination) {
  const result = spawnSync(
    process.env.HUGO_BIN || "hugo",
    ["--destination", destination, "--cleanDestinationDir", "--baseURL", "/"],
    { cwd: candidateRoot, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
  );
  if (result.status !== 0) {
    throw new Error(`Hugo falló en ${candidateRoot}\n${result.stdout}\n${result.stderr}`);
  }
  const combined = `${result.stdout}\n${result.stderr}`;
  const pageMatch = combined.match(/Pages\s+│\s+(\d+)/);
  return {
    pages: pageMatch ? Number(pageMatch[1]) : null,
    warnings: combined.split("\n").filter((line) => line.startsWith("WARN"))
  };
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

async function inspectPage(browser, baseURL, variant, pagePath, viewportName) {
  const context = await browser.newContext({
    viewport: viewports[viewportName],
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const consoleErrors = [];
  const externalRequests = [];
  context.on("request", (request) => {
    if (new URL(request.url()).origin !== new URL(baseURL).origin) {
      externalRequests.push(request.url());
    }
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const response = await page.goto(new URL(pagePath, baseURL).href, {
    waitUntil: "networkidle"
  });
  assert(response?.status() === 200, `${variant}/${viewportName}/${pagePath}: HTTP`);
  const panel = page.locator(".udgia-connections");
  await panel.waitFor({ state: "visible", timeout: 15000 });
  await page.addScriptTag({ content: axe.source });
  const snapshot = await panel.evaluate(async (element) => {
    const cards = [...element.querySelectorAll("article")].map((card) => ({
      source: card.dataset.connectionSource || "",
      criterion: card.dataset.connectionCriterion || "",
      label: card.querySelector(":scope > p")?.textContent?.trim() || "",
      title: card.querySelector("h3")?.textContent?.trim() || "",
      href: card.querySelector("h3 a")?.getAttribute("href") || "",
      reason: [...card.querySelectorAll(":scope > p")].at(-1)?.textContent?.trim() || ""
    }));
    const axeResult = await window.axe.run(element, { resultTypes: ["violations"] });
    return {
      cards,
      labelledBy: element.getAttribute("aria-labelledby"),
      heading: element.querySelector("h2")?.textContent?.trim() || "",
      seriousAxe: axeResult.violations
        .filter((item) => ["serious", "critical"].includes(item.impact))
        .map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length })),
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  });

  assert(snapshot.heading === "Sigue tejiendo tu recorrido", `${variant}/${pagePath}: encabezado`);
  assert(snapshot.labelledBy === "udgia-connections-title", `${variant}/${pagePath}: nombre accesible`);
  assert(snapshot.cards.length >= 1 && snapshot.cards.length <= 5, `${variant}/${pagePath}: 1–5 tarjetas`);
  assert(snapshot.cards.every((card) => card.label && card.title && card.href && card.reason), `${variant}/${pagePath}: tarjeta incompleta`);
  assert(new Set(snapshot.cards.map((card) => card.href)).size === snapshot.cards.length, `${variant}/${pagePath}: duplicados`);
  assert(snapshot.scrollWidth <= snapshot.viewportWidth, `${variant}/${viewportName}/${pagePath}: overflow`);
  assert(snapshot.seriousAxe.length === 0, `${variant}/${viewportName}/${pagePath}: axe ${JSON.stringify(snapshot.seriousAxe)}`);
  assert(consoleErrors.length === 0, `${variant}/${viewportName}/${pagePath}: consola ${JSON.stringify(consoleErrors)}`);
  assert(externalRequests.length === 0, `${variant}/${viewportName}/${pagePath}: red externa ${JSON.stringify(externalRequests)}`);

  if (variant === "a") {
    assert(snapshot.cards.every((card) => card.source === "curated"), `${pagePath}: A contiene automática`);
  } else {
    const automatic = snapshot.cards.filter((card) => card.source === "automatic-explained");
    assert(
      automatic.every(
        (card) =>
          card.criterion &&
          /^(Comparte una capacidad clave|Amplía el mismo propósito|Retoma un reto común|Profundiza en)/.test(card.reason) &&
          card.reason.includes("Continúa para") &&
          card.label !== "Explora una conexión"
      ),
      `${pagePath}: B contiene coincidencia sin explicación específica`
    );
    assert(
      new Set(automatic.map((card) => card.criterion)).size === automatic.length,
      `${pagePath}: B repite criterio automático dentro del panel`
    );
    assert(
      new Set(automatic.map((card) => card.reason)).size === automatic.length,
      `${pagePath}: B repite explicación automática dentro del panel`
    );
  }

  const linkChecks = [];
  for (const href of snapshot.cards.map((card) => card.href)) {
    const linkResponse = await context.request.get(new URL(href, baseURL).href);
    linkChecks.push({ href, status: linkResponse.status() });
    assert(linkResponse.status() === 200, `${variant}/${pagePath}: ${href} → ${linkResponse.status()}`);
  }

  await context.close();
  return {
    path: pagePath,
    viewport: viewportName,
    cards: snapshot.cards,
    seriousAxe: snapshot.seriousAxe,
    consoleErrors,
    externalRequests,
    linkChecks
  };
}

async function captureSample(browser, baseURL, variant, sample, viewportName) {
  const context = await browser.newContext({
    viewport: viewports[viewportName],
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const page = await context.newPage();
  await page.goto(new URL(sample.path, baseURL).href, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      body > div.fixed.inset-x-0.z-100,
      #scroll-to-top { display: none !important; }
    `
  });
  const panel = page.locator(".udgia-connections");
  await panel.waitFor({ state: "visible", timeout: 15000 });
  const file = path.join(capturesDirectory, `${sample.slug}-${viewportName}-${variant}.png`);
  await panel.screenshot({ path: file });
  await context.close();
  return file;
}

async function createComparison(browser, sample, viewportName, fileA, fileB) {
  const [imageA, imageB] = await Promise.all([readFile(fileA), readFile(fileB)]);
  const page = await browser.newPage({
    viewport: viewportName === "desktop" ? { width: 1680, height: 1000 } : { width: 840, height: 1000 }
  });
  const width = viewportName === "desktop" ? 760 : 342;
  await page.setContent(`<!doctype html>
    <html lang="es"><head><meta charset="utf-8"><style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 28px; background: #f7f2e8; color: #1d2a42; font-family: system-ui, sans-serif; }
      h1 { margin: 0 0 8px; color: #202d49; font: 700 28px/1.2 Georgia, serif; }
      .meta { margin: 0 0 22px; color: #4b5568; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, ${width}px)); gap: 24px; align-items: start; }
      figure { margin: 0; }
      figcaption { min-height: 62px; margin-bottom: 10px; padding: 10px 14px; border-left: 5px solid #a8202a; background: #efe7d7; }
      figcaption strong { display: block; color: #a8202a; font-size: 17px; }
      figcaption span { color: #374258; font-size: 14px; }
      img { display: block; width: 100%; height: auto; border: 1px solid #c8baa3; background: #fff; }
    </style></head><body>
      <h1>${sample.title}</h1>
      <p class="meta">Comparación local · ${viewportName === "desktop" ? "escritorio" : "teléfono"} · ninguna variante aplicada</p>
      <main class="grid">
        <figure><figcaption><strong>A · Solo conexiones curadas</strong><span>De dos a cinco tarjetas; no completa por cuota.</span></figcaption><img alt="Variante A" src="data:image/png;base64,${imageA.toString("base64")}"></figure>
        <figure><figcaption><strong>B · Máximo dos coincidencias explicadas</strong><span>Profundiza sin completar el panel por cuota.</span></figcaption><img alt="Variante B" src="data:image/png;base64,${imageB.toString("base64")}"></figure>
      </main>
    </body></html>`, { waitUntil: "load" });
  const file = path.join(capturesDirectory, `comparacion-${sample.slug}-${viewportName}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
  return file;
}

async function writeManifest(files) {
  const entries = [];
  for (const file of files) {
    const content = await readFile(file);
    entries.push({
      path: path.relative(evidenceDirectory, file),
      bytes: content.length,
      sha256: sha256(content)
    });
  }
  await writeFile(
    manifestPath,
    `${JSON.stringify({ generated_at: new Date().toISOString(), entries }, null, 2)}\n`
  );
}

await mkdir(capturesDirectory, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), "udgia-pilot-12-claridad-"));
const activeHashBefore = await fileHash(activeTemplatePath);
const candidateBHash = await fileHash(variants.b.template);
assert(activeHashBefore === candidateBHash, "La plantilla activa no coincide con la candidata B autorizada");
const servers = [];
let browser;

try {
  const builds = {};
  for (const [key, variant] of Object.entries(variants)) {
    const candidateRoot = path.join(tempRoot, `candidate-${key}`);
    const buildRoot = path.join(tempRoot, `site-${key}`);
    await copyCandidate(candidateRoot, variant.template);
    builds[key] = {
      ...runHugo(candidateRoot, buildRoot),
      candidate_template_sha256: await fileHash(variant.template),
      buildRoot
    };
    const server = await startServer(buildRoot);
    servers.push(server);
    builds[key].baseURL = server.baseURL;
  }

  browser = await chromium.launch({ headless: true, executablePath: chromiumBinary });
  const checks = [];
  for (const [key, build] of Object.entries(builds)) {
    for (const pagePath of pilotPages) {
      for (const viewportName of Object.keys(viewports)) {
        checks.push(await inspectPage(browser, build.baseURL, key, pagePath, viewportName));
      }
    }
  }

  const desktopChecks = checks.filter((check) => check.viewport === "desktop");
  const checksA = desktopChecks.slice(0, pilotPages.length);
  const checksB = desktopChecks.slice(pilotPages.length);
  const totalCuratedA = checksA.reduce((total, check) => total + check.cards.filter((card) => card.source === "curated").length, 0);
  const totalCuratedB = checksB.reduce((total, check) => total + check.cards.filter((card) => card.source === "curated").length, 0);
  const totalAutomaticB = checksB.reduce((total, check) => total + check.cards.filter((card) => card.source === "automatic-explained").length, 0);
  assert(totalCuratedA === 37, `A: se esperaban 37 relaciones curadas y aparecieron ${totalCuratedA}`);
  assert(totalCuratedB === 37, `B: se esperaban 37 relaciones curadas y aparecieron ${totalCuratedB}`);
  assert(totalAutomaticB === 21, `B: se esperaban 21 conexiones automáticas explicadas y aparecieron ${totalAutomaticB}`);

  for (const check of [...checksA, ...checksB].filter((item) => [
    "ia-educacion/guias/estudiantes/",
    "ia-educacion/guias/profesorado/"
  ].includes(item.path))) {
    const entry = check.cards.find((card) => card.href === "/ia-educacion/constelaciones/empezar-con-ia/");
    assert(entry?.source === "curated", `${check.path}: el alias no recuperó la relación curada`);
    assert(entry?.label === "Prepárate antes", `${check.path}: el alias perdió el verbo`);
    assert(entry?.reason.startsWith("Sitúa"), `${check.path}: el alias perdió la razón`);
  }

  const rawCaptures = [];
  const comparisons = [];
  for (const sample of samplePages) {
    for (const viewportName of Object.keys(viewports)) {
      const fileA = await captureSample(browser, builds.a.baseURL, "a", sample, viewportName);
      const fileB = await captureSample(browser, builds.b.baseURL, "b", sample, viewportName);
      rawCaptures.push(fileA, fileB);
      comparisons.push(await createComparison(browser, sample, viewportName, fileA, fileB));
    }
  }

  const activeHashAfter = await fileHash(activeTemplatePath);
  assert(activeHashAfter === activeHashBefore, "La plantilla activa cambió durante la comparación");

  const report = {
    generated_at: new Date().toISOString(),
    authorization: {
      submitted_at: "2026-08-12T02:15:16.193Z",
      decision: "Preparar comparación local de las variantes A y B",
      limits: "Trabajo local y reversible; sin commit, push, publicación ni despliegue",
      refinement: {
        submitted_at: "2026-08-12T03:10:57.009Z",
        decision: "B · Conexiones curadas más coincidencias explicadas",
        next_step: "Refinar B fuera de la plantilla activa y repetir muestras más QA",
        human_test: "Después del refinamiento",
        limits: "Trabajo local y reversible; sin commit, push, publicación ni despliegue"
      },
      pruning: {
        submitted_at: "2026-08-12T03:22:24.312Z",
        decision: "Aplicar al candidato el tope de dos automáticas por página y repetir QA",
        expected: "37 relaciones curadas y 21 automáticas explicadas",
        limits: "Solo candidato local y reversible; sin commit, push, publicación ni despliegue"
      },
      incorporation: {
        submitted_at: "2026-08-12T03:25:29.761Z",
        decision: "Incorporar B únicamente al piloto local y verificarla",
        rollback_sha256: "0ae52c5d2e1b21229230e4962958f382626863deac6f50b156666c4d53a69ece",
        limits: "Sin commit, push, publicación ni despliegue"
      }
    },
    active_template: {
      path: path.relative(repoRoot, activeTemplatePath),
      sha256_before: activeHashBefore,
      sha256_after: activeHashAfter,
      unchanged_during_qa: true,
      matches_candidate_b: activeHashAfter === candidateBHash
    },
    builds: Object.fromEntries(
      Object.entries(builds).map(([key, build]) => [key, {
        name: variants[key].name,
        pages: build.pages,
        warnings: build.warnings,
        candidate_template_sha256: build.candidate_template_sha256
      }])
    ),
    summary: {
      pilot_pages: pilotPages.length,
      viewport_checks_per_variant: pilotPages.length * Object.keys(viewports).length,
      total_checks: checks.length,
      curated_relations_a: totalCuratedA,
      curated_relations_b: totalCuratedB,
      automatic_explained_b: totalAutomaticB,
      automatic_limit_per_page_b: 2,
      repeated_automatic_criteria_b: 0,
      repeated_automatic_reasons_b: 0,
      comparison_images: comparisons.map((file) => path.relative(evidenceDirectory, file))
    },
    checks
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeManifest([
    variants.a.template,
    variants.b.template,
    reportPath,
    ...rawCaptures,
    ...comparisons
  ]);
  process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
} finally {
  if (browser) await browser.close().catch(() => {});
  await Promise.all(servers.map((server) => server.close().catch(() => {})));
  await rm(tempRoot, { recursive: true, force: true });
}
