#!/usr/bin/env node
import { readFile, stat } from "node:fs/promises";
import { chromium } from "playwright-core";

const baseURL = process.env.BASE_URL || "http://100.107.89.3:1313";
const route = "/ia-educacion/guias/profesorado/";
const playwrightChromium = chromium.executablePath();
const chromiumBinary = process.env.CHROMIUM_PATH ||
  ((await stat("/usr/bin/chromium").catch(() => null))
    ? "/usr/bin/chromium"
    : (await stat(playwrightChromium).catch(() => null))
      ? playwrightChromium
      : "");
if (!chromiumBinary) throw new Error("No se encontró Chromium");
const browser = await chromium.launch({
  executablePath: chromiumBinary,
  headless: true,
  args: ["--no-sandbox"]
});
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const consoleErrors = [];
  const external = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    const requested = new URL(request.url());
    const expected = new URL(baseURL);
    if (requested.hostname !== expected.hostname) external.push(request.url());
  });
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });

  const featured = page.locator('main figure > img[src*="/ia-educacion/guias/profesorado/featured"]');
  if ((await featured.count()) !== 1) {
    throw new Error(
      "La featured propia no se renderiza en el flujo editorial como figure; el fondo fijo no cuenta como imagen visible."
    );
  }
  const box = await featured.boundingBox();
  const alt = await featured.getAttribute("alt");
  if (!box || box.width < 600 || box.height < 250 || !alt?.trim()) {
    throw new Error(
      `La featured no ocupa un área visible o carece de alternativa: ${JSON.stringify({ box, alt })}`
    );
  }

  const cards = page.locator("[data-connection-source]");
  const cardCount = await cards.count();
  const cardsWithImage = await cards.locator("img").count();
  if (cardCount !== 5 || cardsWithImage !== cardCount) {
    throw new Error(`Cards incompletas: ${cardsWithImage}/${cardCount} con imagen.`);
  }

  const retiredReferences = page.locator(
    'iframe[src*="actividades/revisar-actividad"], a[href*="actividades/revisar-actividad"]'
  );
  if ((await retiredReferences.count()) !== 0) {
    throw new Error("La guía todavía enlaza o embebe la actividad retirada.");
  }
  const retiredRoute = await page.request.get(`${baseURL}/actividades/revisar-actividad/`);
  if (retiredRoute.status() !== 404) {
    throw new Error(`La actividad retirada continúa publicada: HTTP ${retiredRoute.status()}.`);
  }

  await page.addScriptTag({ content: await readFile("node_modules/axe-core/axe.min.js", "utf8") });
  const violations = await page.evaluate(async () => {
    const result = await axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
    });
    return result.violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.length }));
  });
  if (violations.length) throw new Error(`Axe: ${JSON.stringify(violations)}`);
  if (external.length) throw new Error(`Peticiones externas: ${JSON.stringify([...new Set(external)])}`);
  if (consoleErrors.length) throw new Error(`Errores de consola: ${JSON.stringify(consoleErrors)}`);

  process.stdout.write(
    `PASS profesorado-pilot: featured visible, ${cardCount} cards ilustradas, actividad retirada y axe AA.\n`
  );
} finally {
  await browser.close();
}
