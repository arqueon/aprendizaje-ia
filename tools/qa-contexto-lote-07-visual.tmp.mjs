import fs from 'node:fs';
import path from 'node:path';
import axe from 'axe-core';
import { chromium } from 'playwright-core';

const baseURL = process.env.BASE_URL || 'http://100.107.89.3:1313/';
const executablePath = process.env.CHROMIUM_PATH || '/home/hermes/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome';
const out = process.env.EVIDENCE_DIR || 'docs/design/evidence/contexto-lote-07';
const pages = [
  ['formacion-docente', 'formacion-docente/', ['Trabajo cognitivo observable', 'Dos lentes para revisar una actividad', 'Evaluación, retroalimentación y CAT']],
  ['aprendizaje-activo', 'formacion-docente/aprendizaje-activo/', ['agente computacional', 'Cinco preguntas para revisar una actividad']],
  ['samr-icap', 'formacion-docente/modelos-samr-icap/', ['producto sobre proceso', '10.1007/s11528-016-0091-y']],
  ['bloom-diseno-inverso', 'formacion-docente/taxonomia-bloom-diseno-inverso/', ['Partir de lo que quieres observar']],
  ['evaluacion-retroalimentacion', 'formacion-docente/evaluacion-retroalimentacion/', ['Tres preguntas distintas', '39 de 96', 'Evaluación del curso y de la docencia']],
  ['taller-backward', 'formacion-docente/taller-diseno-actividades-ia-backward/', ['No documenta una aplicación', 'Plantilla 3', 'qué no debe delegarse']],
];
const viewports = [
  ['desktop', { width: 1440, height: 1000 }],
  ['mobile', { width: 390, height: 844 }],
];
const failures = [];
const results = [];
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath, headless: true });

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport });
  for (const [name, route, requiredSignals] of pages) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', (error) => consoleErrors.push(error.message));
    const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      const step = Math.max(300, Math.floor(window.innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      window.scrollTo(0, 0);
    });
    const imageLocator = page.locator('img');
    for (let i = 0; i < await imageLocator.count(); i += 1) {
      await imageLocator.nth(i).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    let imageWaitTimedOut = false;
    await page.waitForFunction(() => [...document.images].every((img) => img.complete), null, { timeout: 10000 })
      .catch(() => { imageWaitTimedOut = true; });
    await page.waitForTimeout(180);
    const state = await page.evaluate(() => ({
      title: document.title,
      heading: document.querySelector('h1')?.textContent?.trim() || '',
      text: document.querySelector('main')?.innerText?.trim() || '',
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      pendingImages: [...document.images].filter((img) => !img.complete).map((img) => img.currentSrc || img.src),
      brokenImages: [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src),
    }));
    await page.addScriptTag({ content: axe.source });
    const axeResult = await page.evaluate(async () => {
      const report = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }, resultTypes: ['violations'] });
      return report.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }));
    });
    await page.screenshot({ path: path.join(out, `${name}-${viewportName}.png`), fullPage: true });
    const status = response?.status() || 0;
    if (status !== 200) failures.push(`${name}/${viewportName}: HTTP ${status}`);
    if (imageWaitTimedOut) failures.push(`${name}/${viewportName}: espera de imágenes agotada`);
    if (!state.heading || state.text.length < 100) failures.push(`${name}/${viewportName}: contenido principal insuficiente`);
    for (const signal of requiredSignals) if (!state.text.includes(signal)) failures.push(`${name}/${viewportName}: falta señal ${signal}`);
    if (state.overflow) failures.push(`${name}/${viewportName}: desbordamiento horizontal`);
    if (state.pendingImages.length) failures.push(`${name}/${viewportName}: imágenes pendientes ${state.pendingImages.join(', ')}`);
    if (state.brokenImages.length) failures.push(`${name}/${viewportName}: imágenes rotas ${state.brokenImages.join(', ')}`);
    if (consoleErrors.length) failures.push(`${name}/${viewportName}: consola ${consoleErrors.join(' | ')}`);
    if (axeResult.length) failures.push(`${name}/${viewportName}: axe ${JSON.stringify(axeResult)}`);
    results.push({ name, viewport: viewportName, status, heading: state.heading, textLength: state.text.length, overflow: state.overflow, consoleErrors, axeViolations: axeResult.length });
    await page.close();
  }
  await context.close();
}
await browser.close();
fs.writeFileSync(path.join(out, 'qa-visual.json'), `${JSON.stringify({ pages: pages.length * viewports.length, failures, results }, null, 2)}\n`);
console.log(JSON.stringify({ pages: pages.length * viewports.length, failures: failures.length, out }));
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
