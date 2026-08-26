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
  : path.join(tmpdir(), 'udgia008-hugo-evidence');
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
  fallbackRows: 4,
}, {
  route: 'ia-educacion/rutas/coordinacion-academica/',
  id: 'udgia-f01-trayectoria',
  mobileSvg: 'trayectoria-habilitar-integrar-mobile.svg',
  fallbackRows: 3,
}, {
  route: 'ia-educacion/guias/lineamientos-eticos-ia/',
  id: 'udgia-f03-principios',
  mobileSvg: 'principios-rectores-mobile.svg',
  fallbackRows: 7,
}, {
  route: 'ia-educacion/guias/aprendizaje-activo-con-ia/',
  id: 'udgia-f07-dialogo',
  mobileSvg: 'dialogo-ia-aprendizaje-activo-mobile.svg',
  fallbackRows: 6,
}, {
  route: 'ia-educacion/tendencias/evaluacion-en-la-era-ia/',
  id: 'udgia-f08-producto-proceso',
  mobileSvg: 'producto-a-proceso-mobile.svg',
  fallbackRows: 2,
}, {
  route: 'ia-educacion/tendencias/politicas-institucionales-universidades/',
  id: 'udgia-f11-politica-capas',
  mobileSvg: 'politica-por-capas-mobile.svg',
  fallbackRows: 4,
  notice: 'Esquema conceptual no normativo.',
}, {
  route: 'ia-educacion/rutas/decision-institucional-ia/',
  id: 'udgia-f17-priorizacion',
  mobileSvg: 'matriz-priorizacion-mobile.svg',
  fallbackRows: 4,
}, {
  route: 'ia-educacion/constelaciones/empezar-con-ia/',
  id: 'udgia-f18-cinco-movimientos',
  mobileSvg: 'cinco-movimientos-ayuda-mobile.svg',
  fallbackItems: 5,
  editorialState: 'local-napkin',
  notice: 'Publicación autorizada por Rubén el 2026-08-13',
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

async function startServer(siteRoot, mountPath = '') {
  const server = http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      let normalized = path.posix.normalize(`/${decodeURIComponent(url.pathname)}`).replace(/^\/+/, '');
      if (mountPath) {
        assert(
          normalized === mountPath || normalized.startsWith(`${mountPath}/`),
          'ruta fuera del montaje',
        );
        normalized = normalized.slice(mountPath.length).replace(/^\/+/, '');
      }
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
      if (!response.headersSent) {
        response.writeHead(404).end('Not found');
      } else {
        response.destroy();
      }
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen({ host: '127.0.0.1', port: 0 }, resolve);
  });
  return {
    baseURL: `http://127.0.0.1:${server.address().port}/${mountPath ? `${mountPath}/` : ''}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

function build(siteRoot, baseURL) {
  const result = spawnSync(
    process.env.HUGO_BIN || 'hugo',
    ['--minify', '--destination', siteRoot, '--baseURL', baseURL],
    { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
  );
  if (result.status !== 0) throw new Error(`Hugo falló\n${result.stdout}\n${result.stderr}`);
  return result.stderr.split('\n').filter((line) => line.startsWith('WARN'));
}

async function inspect(browser, baseURL, target, viewport, name, scenario) {
  const {
    route,
    id,
    mobileSvg,
    fallbackRows,
    fallbackItems,
    editorialState = 'canonical',
    notice = '',
  } = target;
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
      sourceRevision: figure?.dataset.sourceRevision || '',
      sourceSha256: figure?.dataset.sourceSha256 || '',
      descriptionSha256: figure?.dataset.descriptionSha256 || '',
      variantSha256: figure?.dataset.variantSha256 || '',
      mobileVariantSha256: figure?.dataset.mobileVariantSha256 || '',
      license: figure?.dataset.license || '',
      attribution: figure?.dataset.attribution || '',
      editorialScope: figure?.dataset.editorialScope || '',
      authorizationScope: figure?.dataset.authorizationScope || '',
      institutionalPolicyStatus: figure?.dataset.institutionalPolicyStatus || '',
      provenanceKind: figure?.dataset.provenanceKind || '',
      publicationAuthorized: figure?.dataset.publicationAuthorized || '',
      credit: figure?.querySelector('.udgia-figure__credit')?.textContent?.trim() || '',
      scope: figure?.querySelector('.udgia-figure__scope')?.textContent?.trim() || '',
      notice: figure?.querySelector('.udgia-figure__notice')?.textContent?.trim() || '',
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
      fallbackItems: details?.querySelectorAll('ol > li').length || 0,
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
  if (editorialState === 'local-napkin') {
    assert(
      snapshot.sourceVersion === 'napkin-generated-output-selection-18'
        && snapshot.sourceRevision === '40b83d9ceb7f11722f857bcc8dadc357cebda0f4'
        && /^[a-f0-9]{64}$/.test(snapshot.descriptionSha256),
      `${route} ${name}: revisión local Napkin`,
    );
    assert(
      snapshot.license === 'Generated Output de Napkin AI; uso sujeto a los términos aplicables de Napkin'
        && snapshot.attribution.includes('Generated Output de Napkin AI')
        && snapshot.editorialScope === 'Material editorial del proyecto; no constituye un dictamen institucional.'
        && snapshot.authorizationScope === 'project-editorial'
        && snapshot.institutionalPolicyStatus === 'not-an-institutional-ruling'
        && snapshot.provenanceKind === 'napkin-generated-output-adapted'
        && snapshot.publicationAuthorized === 'true',
      `${route} ${name}: estado editorial local`,
    );
  } else {
    assert(
      /^1\.0\.0-lote[12]$/.test(snapshot.sourceVersion)
        && snapshot.sourceRevision === '0331dfec00b47d2138641b0cdd3b6c8c56b9c345'
        && /^[a-f0-9]{64}$/.test(snapshot.descriptionSha256),
      `${route} ${name}: revisión canónica`,
    );
    assert(
      snapshot.license === 'CC BY-SA 4.0'
        && snapshot.attribution === 'Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara'
        && snapshot.editorialScope === 'Material editorial del proyecto; no constituye un dictamen institucional.'
        && snapshot.authorizationScope === 'project-editorial'
        && snapshot.institutionalPolicyStatus === 'not-an-institutional-ruling'
        && snapshot.provenanceKind === 'original-synthesis'
        && snapshot.publicationAuthorized === 'true',
      `${route} ${name}: estado editorial`,
    );
  }
  assert(
    snapshot.credit.includes(snapshot.attribution)
      && snapshot.credit.includes(snapshot.license)
      && snapshot.scope === snapshot.editorialScope,
    `${route} ${name}: crédito o alcance no visible`,
  );
  if (notice) {
    assert(snapshot.notice.includes(notice), `${route} ${name}: advertencia esperada ausente`);
  } else {
    assert(snapshot.notice === '', `${route} ${name}: advertencia no prevista`);
  }
  assert(snapshot.alt.length >= 40, `${route} ${name}: alt insuficiente`);
  assert(
    snapshot.imageComplete && snapshot.renderedWidth >= 250,
    `${route} ${name}: SVG no cargado ${JSON.stringify(snapshot)}`,
  );
  assert(snapshot.detailsOpen && snapshot.detailsText > 180, `${route} ${name}: fallback cerrado o insuficiente`);
  if (Number.isInteger(fallbackRows)) {
    assert(
      snapshot.fallbackRows === fallbackRows && snapshot.fallbackHeaders >= 3,
      `${route} ${name}: tabla fallback ${JSON.stringify(snapshot)}`,
    );
  } else {
    assert(
      snapshot.fallbackItems === fallbackItems,
      `${route} ${name}: lista fallback ${JSON.stringify(snapshot)}`,
    );
  }
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
      .map(({ id, impact, nodes }) => ({
        id,
        impact,
        nodes: nodes.length,
        target: nodes[0]?.target,
        html: nodes[0]?.html,
      }));
  });
  assert(violations.length === 0, `${route} ${name}: axe ${JSON.stringify(violations)}`);
  assert(external.length === 0, `${route} ${name}: tráfico externo ${external}`);
  assert(writes.length === 0, `${route} ${name}: escrituras ${writes}`);
  assert(consoleErrors.length === 0, `${route} ${name}: consola ${consoleErrors}`);
  assert((await context.cookies()).length === 0, `${route} ${name}: cookies`);

  if (viewport.width >= 1000 && scenario === 'root') {
    const links = await page.locator('a[href]').evaluateAll((anchors) => [...new Set(anchors
      .map((anchor) => anchor.href)
      .filter((href) => {
        const url = new URL(href);
        return ['http:', 'https:'].includes(url.protocol)
          && url.origin === window.location.origin
          && url.pathname !== window.location.pathname;
      }))]);
    const broken = [];
    for (const href of links) {
      const linkResponse = await context.request.get(href);
      if (linkResponse.status() < 200 || linkResponse.status() >= 400) {
        broken.push(`${linkResponse.status()} ${href}`);
      }
    }
    assert(broken.length === 0, `${route} ${name}: enlaces internos rotos ${broken.join(' | ')}`);
  }

  const slug = route.split('/').filter(Boolean).at(-1);
  await page.locator('.udgia-figure').screenshot({
    path: path.join(evidenceDir, `${slug}-${scenario}-${name}.png`),
  });
  await context.close();
  return snapshot;
}

await mkdir(evidenceDir, { recursive: true });
const tempRoot = await mkdtemp(path.join(tmpdir(), 'udgia008-hugo-'));
let browser;

try {
  const executablePath = process.env.CHROMIUM_PATH || ((await stat('/usr/bin/chromium').catch(() => null)) ? '/usr/bin/chromium' : chromium.executablePath());
  browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const scenarios = [
    { name: 'root', mountPath: '', buildBaseURL: 'http://127.0.0.1/' },
    { name: 'subpath', mountPath: 'ecosistema-ia', buildBaseURL: 'http://127.0.0.1/ecosistema-ia/' },
  ];
  let warningCount = 0;
  for (const scenario of scenarios) {
    const siteRoot = path.join(tempRoot, scenario.name);
    const warnings = build(siteRoot, scenario.buildBaseURL);
    const unexpectedWarnings = warnings.filter(
      (warning) => !knownWarningPatterns.some((pattern) => pattern.test(warning)),
    );
    assert(unexpectedWarnings.length === 0, `advertencias Hugo nuevas: ${unexpectedWarnings.join(' | ')}`);
    warningCount += warnings.length;
    const server = await startServer(siteRoot, scenario.mountPath);
    try {
      for (const target of routes) {
        await inspect(browser, server.baseURL, target, { width: 1440, height: 900 }, 'desktop', scenario.name);
        await inspect(browser, server.baseURL, target, { width: 375, height: 812 }, 'mobile', scenario.name);
      }
    } finally {
      await server.close();
    }
  }
  console.log(`PASS: ${routes.length} rutas × 2 bases × 2 viewports, axe, enlaces, SVG, fallback, red y almacenamiento.`);
  if (warningCount) console.log(`Advertencias Hugo conocidas: ${warningCount}; nuevas: 0.`);
  console.log(`Evidencia: ${evidenceDir}`);
} finally {
  await browser?.close();
  await rm(tempRoot, { recursive: true, force: true });
}
