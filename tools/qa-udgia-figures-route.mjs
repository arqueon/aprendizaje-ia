import { createReadStream } from 'node:fs';
import { mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import http from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import axe from 'axe-core';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidenceDir = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(tmpdir(), 'udgia006-hugo-evidence');
const routes = [{
  route: 'observatorio/estudios/paradoja-descarga-cognitiva/',
  id: 'udgia-f04-disociacion',
  mobileSvg: 'disociacion-desempeno-aprendizaje-mobile.svg',
  fallbackRows: 2,
}, {
  route: 'ia-educacion/guias/agenciamiento-humano-ia/',
  id: 'udgia-f05-cocreacion',
  mobileSvg: 'cocreacion-dos-desenlaces-mobile.svg',
  fallbackRows: 2,
}, {
  route: 'ia-educacion/guias/evaluacion-formativa-ia/',
  id: 'udgia-f09-instrumentos',
  mobileSvg: 'instrumentos-evaluacion-proceso-mobile.svg',
  fallbackRows: 3,
}];
const knownWarningPatterns = [
  /project config key languageCode was deprecated/,
  /Module "github\.com\/nunocoracao\/blowfish\/v2" is not compatible/,
  /\.Site\.LanguageCode was deprecated/,
  /\.Site\.Data was deprecated/,
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function mimeType(file) {
  return {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  }[path.extname(file)] || 'application/octet-stream';
}

async function startServer(siteRoot) {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      const normalized = path.posix.normalize(`/${decodeURIComponent(url.pathname)}`).replace(/^\/+/, '');
      assert(!normalized.startsWith('..'), 'ruta insegura');
      let file = path.join(siteRoot, normalized);
      if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, 'index.html');
      const relative = path.relative(siteRoot, file);
      assert(!relative.startsWith('..') && !path.isAbsolute(relative), 'ruta insegura');
      const fileStat = await stat(file);
      response.setHeader('content-type', mimeType(file));
      response.setHeader('content-length', fileStat.size);
      response.writeHead(200);
      await pipeline(createReadStream(file), response);
    } catch {
      response.writeHead(404).end('Not found');
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen({ host: '127.0.0.1', port: 0 }, resolve);
  });
  return {
    baseURL: `http://127.0.0.1:${server.address().port}/`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

function build(siteRoot) {
  const result = spawnSync(
    process.env.HUGO_BIN || 'hugo',
    ['--minify', '--destination', siteRoot, '--baseURL', 'http://127.0.0.1/'],
    { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );
  if (result.status !== 0) throw new Error(`Hugo falló\n${result.stdout}\n${result.stderr}`);
  return result.stderr.split('\n').filter((line) => line.startsWith('WARN'));
}

async function inspect(browser, baseURL, target, viewport, name) {
  const { route, id, mobileSvg, fallbackRows } = target;
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
  const external = [];
  const writes = [];
  const consoleErrors = [];
  context.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL).origin) external.push(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });
  const page = await context.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle' });
  assert(response?.status() === 200, `${route} ${name}: HTTP ${response?.status()}`);
  const figureLocator = page.locator('.udgia-figure');
  await figureLocator.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -80));
  await page.waitForFunction(() => {
    const image = document.querySelector('.udgia-figure img');
    return image?.complete && image.naturalWidth > 0;
  });
  await figureLocator.locator('details').evaluate((details) => {
    details.open = true;
  });

  const snapshot = await page.evaluate(() => {
    const figure = document.querySelector('.udgia-figure');
    const image = figure?.querySelector('img');
    const viewport = figure?.querySelector('.udgia-figure__viewport');
    const details = figure?.querySelector('details');
    const source = figure?.querySelector('picture source');
    const hint = figure?.querySelector('.udgia-figure__mobile-hint');
    const table = details?.querySelector('table');
    const toc = document.querySelector('#TableOfContents');
    return {
      pageWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      figures: document.querySelectorAll('.udgia-figure').length,
      sourceId: figure?.dataset.sourceId || '',
      sourceVersion: figure?.dataset.sourceVersion || '',
      sourceSha256: figure?.dataset.sourceSha256 || '',
      variantSha256: figure?.dataset.variantSha256 || '',
      mobileVariantSha256: figure?.dataset.mobileVariantSha256 || '',
      license: figure?.dataset.license || '',
      publicationAuthorized: figure?.dataset.publicationAuthorized || '',
      alt: image?.getAttribute('alt') || '',
      imageComplete: image?.complete || false,
      naturalWidth: image?.naturalWidth || 0,
      renderedWidth: image?.getBoundingClientRect().width || 0,
      currentSrc: image?.currentSrc || '',
      mobileSrcset: source?.getAttribute('srcset') || '',
      figureWidth: figure?.getBoundingClientRect().width || 0,
      figureRight: figure?.getBoundingClientRect().right || 0,
      tocLeft: toc?.getBoundingClientRect().left || 0,
      viewportWidth: viewport?.clientWidth || 0,
      viewportScrollWidth: viewport?.scrollWidth || 0,
      hintDisplay: hint ? getComputedStyle(hint).display : '',
      detailsText: details?.textContent?.trim().length || 0,
      detailsOpen: details?.open || false,
      fallbackRows: table?.tBodies[0]?.rows.length || 0,
      fallbackHeaders: table?.tHead?.rows[0]?.cells.length || 0,
      link: figure?.querySelector('a[href$=".svg"]')?.getAttribute('href') || '',
      storage: localStorage.length + sessionStorage.length,
    };
  });

  assert(snapshot.figures === 1, `${route} ${name}: figuras=${snapshot.figures}`);
  assert(snapshot.sourceId === id && snapshot.sourceVersion, `${route} ${name}: procedencia`);
  assert(
    snapshot.sourceSha256 && snapshot.variantSha256 && snapshot.mobileVariantSha256,
    `${route} ${name}: checksums`,
  );
  assert(
    snapshot.license === 'pending-institutional-confirmation'
      && snapshot.publicationAuthorized === 'false',
    `${route} ${name}: estado editorial`,
  );
  assert(snapshot.alt.length >= 40, `${route} ${name}: alt insuficiente`);
  assert(
    snapshot.imageComplete && snapshot.renderedWidth >= 250,
    `${route} ${name}: SVG no cargado ${JSON.stringify(snapshot)}`,
  );
  assert(snapshot.detailsOpen && snapshot.detailsText > 180, `${route} ${name}: fallback cerrado o insuficiente`);
  assert(
    snapshot.fallbackRows === fallbackRows && snapshot.fallbackHeaders >= 3,
    `${route} ${name}: tabla fallback ${JSON.stringify(snapshot)}`,
  );
  assert(snapshot.pageScrollWidth <= snapshot.pageWidth, `${route} ${name}: overflow de página`);
  assert(snapshot.storage === 0, `${route} ${name}: almacenamiento`);
  if (viewport.width < 600) {
    assert(
      snapshot.currentSrc.endsWith(mobileSvg) && snapshot.mobileSrcset.endsWith(mobileSvg),
      `${route} ${name}: no seleccionó variante móvil ${JSON.stringify(snapshot)}`,
    );
    assert(snapshot.hintDisplay !== 'none', `${route} ${name}: indicación móvil oculta`);
    assert(snapshot.viewportScrollWidth <= snapshot.viewportWidth + 1, `${route} ${name}: overflow interno móvil`);
  } else {
    assert(!snapshot.currentSrc.endsWith(mobileSvg), `${route} ${name}: variante móvil en escritorio`);
    assert(snapshot.hintDisplay === 'none', `${route} ${name}: indicación móvil en escritorio`);
    assert(snapshot.figureWidth >= 680, `${route} ${name}: breakout insuficiente ${snapshot.figureWidth}`);
    if (snapshot.tocLeft > 0) {
      assert(
        snapshot.figureRight <= snapshot.tocLeft + 1,
        `${route} ${name}: figura invade índice lateral ${JSON.stringify(snapshot)}`,
      );
    }
  }

  const svgResponse = await context.request.get(new URL(snapshot.link, baseURL).href);
  assert(svgResponse.status() === 200, `${route} ${name}: SVG ${svgResponse.status()}`);
  const mobileSvgResponse = await context.request.get(new URL(snapshot.mobileSrcset, baseURL).href);
  assert(mobileSvgResponse.status() === 200, `${route} ${name}: SVG móvil ${mobileSvgResponse.status()}`);

  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, { rules: { region: { enabled: false } } });
    return result.violations
      .filter(({ impact }) => ['serious', 'critical'].includes(impact))
      .map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }));
  });
  assert(violations.length === 0, `${route} ${name}: axe ${JSON.stringify(violations)}`);
  assert(external.length === 0, `${route} ${name}: tráfico externo ${external}`);
  assert(writes.length === 0, `${route} ${name}: escrituras ${writes}`);
  assert(consoleErrors.length === 0, `${route} ${name}: consola ${consoleErrors}`);
  assert((await context.cookies()).length === 0, `${route} ${name}: cookies`);

  const slug = route.split('/').filter(Boolean).at(-1);
  await page.locator('.udgia-figure').screenshot({
    path: path.join(evidenceDir, `${slug}-${name}.png`),
  });
  await context.close();
  return snapshot;
}

await mkdir(evidenceDir, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), 'udgia006-hugo-'));
const siteRoot = path.join(tempRoot, 'public');
let server;
let browser;

try {
  const warnings = build(siteRoot);
  const unexpectedWarnings = warnings.filter(
    (warning) => !knownWarningPatterns.some((pattern) => pattern.test(warning)),
  );
  assert(unexpectedWarnings.length === 0, `advertencias Hugo nuevas: ${unexpectedWarnings.join(' | ')}`);
  server = await startServer(siteRoot);
  browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  const results = [];
  for (const target of routes) {
    results.push(await inspect(browser, server.baseURL, target, { width: 1440, height: 900 }, 'desktop'));
    results.push(await inspect(browser, server.baseURL, target, { width: 375, height: 812 }, 'mobile'));
  }
  console.log(`PASS: ${routes.length} rutas × 2 viewports, axe, SVG, fallback, red y almacenamiento.`);
  if (warnings.length) console.log(`Advertencias Hugo conocidas: ${warnings.length}; nuevas: 0.`);
  console.log(`Evidencia: ${evidenceDir}`);
} finally {
  await browser?.close();
  await server?.close();
  await rm(tempRoot, { recursive: true, force: true });
}
