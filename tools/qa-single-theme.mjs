import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";

const require = createRequire(import.meta.url);
const playwrightPackage = process.env.PLAYWRIGHT_PACKAGE || "playwright";
const { chromium } = require(playwrightPackage);

const configuredBaseURL = process.env.SITE_BASE_URL || "http://127.0.0.1:1315/";
const baseURL = configuredBaseURL.endsWith("/")
  ? configuredBaseURL
  : `${configuredBaseURL}/`;
const siteBaseURL = new URL(baseURL);
const executablePath = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const captureDir = process.env.CAPTURE_DIR || "";
const siteURL = (path) => new URL(path.replace(/^\/+/, ""), siteBaseURL).href;
const belongsToSite = (url) => {
  const parsed = new URL(url);
  return (
    parsed.origin === siteBaseURL.origin &&
    parsed.pathname.startsWith(siteBaseURL.pathname)
  );
};

const pages = [
  { name: "inicio", path: "/" },
  { name: "ia", path: "/ia-educacion/" },
  { name: "contenido-html", path: "/ia-educacion/que-es-la-educacion-digital/" },
  { name: "contenido-svg", path: "/formacion-docente/aprendizaje-activo/" },
  { name: "aprendizaje-hibrido", path: "/formacion-docente/aprendizaje-hibrido/" },
  { name: "samr-icap", path: "/formacion-docente/modelos-samr-icap/" },
  {
    name: "bloom-diseno-inverso",
    path: "/formacion-docente/taxonomia-bloom-diseno-inverso/"
  },
  {
    name: "transformacion-pedagogica",
    path: "/formacion-docente/transformacion-pedagogica-digital/"
  },
  {
    name: "articulo-recurso",
    path: "/recursos/articulos/cormier-rhizomatic-education/"
  },
  { name: "mermaid-bloom", path: "/recursos/glosario/taxonomia-de-bloom/" },
  {
    name: "mermaid-grafica",
    path: "/observatorio/estudios/paradoja-descarga-cognitiva/"
  }
];

const viewports = [
  { name: "mobile", width: 375, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 900 }
];

const colorSchemes = ["light", "dark"];
const fontPaths = [
  "fonts/piazzolla-variable.woff2",
  "fonts/piazzolla-italic-variable.woff2",
  "fonts/inter-variable.woff2",
  "fonts/inter-italic-variable.woff2",
  "fonts/archivo-narrow-variable.woff2",
  "fonts/archivo-narrow-italic-variable.woff2"
];
const svgSourcePaths = [
  "content/formacion-docente/aprendizaje-activo/img/dilema-habilidades.svg",
  "content/formacion-docente/aprendizaje-hibrido/img/continuo-hibrido.svg",
  "content/formacion-docente/modelos-samr-icap/img/icap-tabla.svg",
  "content/formacion-docente/modelos-samr-icap/img/samr-bloom.svg",
  "content/formacion-docente/taxonomia-bloom-diseno-inverso/img/bloom-invertida.svg",
  "content/formacion-docente/taxonomia-bloom-diseno-inverso/img/diseno-inverso.svg",
  "content/formacion-docente/transformacion-pedagogica-digital/img/encuesta-red-universitaria.svg"
];
const mermaidSourcePath = "content/recursos/glosario/taxonomia-de-bloom/index.md";
const approvedGraphicColors = new Set([
  "#ffffff",
  "#f5f3ee",
  "#ece9e1",
  "#c9c5bb",
  "#18223c",
  "#34405a",
  "#525d70",
  "#b12028",
  "#7f1820",
  "#f7e5e2",
  "#efc6c2",
  "#536326",
  "#3f4b1d",
  "#eceddc",
  "#d8dbae",
  "#914411",
  "#78380f",
  "#f4e6d8",
  "#e7c7a6",
  "#8b2635",
  "#6f1e2a",
  "#f8e7ea",
  "#eabfc7"
]);

function channelToLinear(value) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return (
    0.2126 * channelToLinear(rgb[0]) +
    0.7152 * channelToLinear(rgb[1]) +
    0.0722 * channelToLinear(rgb[2])
  );
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function rgb(value) {
  const hex = value.match(/^#([0-9a-f]{6})$/i)?.[1];
  if (hex) {
    return [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
  }
  const channels = value.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) throw new Error(`Color no reconocido: ${value}`);
  return channels;
}

function readRepoFile(relativePath) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

const graphicContrastDefinitions = [
  ["tinta sobre papel", "#18223c", "#f5f3ee"],
  ["texto secundario sobre papel", "#525d70", "#f5f3ee"],
  ["texto de cuerpo sobre blanco", "#34405a", "#ffffff"],
  ["almagre sobre blanco", "#b12028", "#ffffff"],
  ["olivo sobre blanco", "#536326", "#ffffff"],
  ["ocre sobre blanco", "#914411", "#ffffff"],
  ["riesgo sobre blanco", "#8b2635", "#ffffff"],
  ["almagre oscuro sobre tinte", "#7f1820", "#f7e5e2"],
  ["olivo oscuro sobre tinte", "#3f4b1d", "#eceddc"],
  ["ocre oscuro sobre tinte", "#78380f", "#f4e6d8"],
  ["blanco sobre almagre", "#ffffff", "#b12028"],
  ["blanco sobre olivo", "#ffffff", "#536326"],
  ["blanco sobre ocre", "#ffffff", "#914411"],
  ["blanco sobre riesgo", "#ffffff", "#8b2635"],
  ["blanco sobre tinta marina", "#ffffff", "#18223c"]
];

const report = {
  baseURL,
  pages: [],
  dynamicSwitches: [],
  cardAudit: {
    page: "/formacion-docente/transformacion-pedagogica-digital/",
    httpStatus: 0,
    items: []
  },
  fonts: [],
  manifest: {},
  graphicSources: {
    files: [],
    disallowedColors: [],
    darkQueries: [],
    legacyFonts: [],
    mermaidOceanColors: [],
    contrastPairs: graphicContrastDefinitions.map(([name, foreground, background]) => ({
      name,
      foreground,
      background,
      ratio: Number(contrast(rgb(foreground), rgb(background)).toFixed(2))
    }))
  },
  externalRequests: [],
  consoleErrors: [],
  pageErrors: []
};

for (const relativePath of svgSourcePaths) {
  const source = readRepoFile(relativePath);
  const colors = [
    ...new Set((source.match(/#[0-9a-f]{6}\b/gi) || []).map((color) => color.toLowerCase()))
  ];
  report.graphicSources.files.push({ path: relativePath, colors });
  for (const color of colors) {
    if (!approvedGraphicColors.has(color)) {
      report.graphicSources.disallowedColors.push({ path: relativePath, color });
    }
  }
  if (/prefers-color-scheme/i.test(source)) {
    report.graphicSources.darkQueries.push(relativePath);
  }
  if (/-apple-system|BlinkMacSystemFont|Roboto,\s*Helvetica|font-family:\s*sans-serif/i.test(source)) {
    report.graphicSources.legacyFonts.push(relativePath);
  }
}

const mermaidSource = readRepoFile(mermaidSourcePath);
for (const color of ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#94a3b8"]) {
  if (mermaidSource.toLowerCase().includes(color)) {
    report.graphicSources.mermaidOceanColors.push(color);
  }
}

async function settlePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => image.complete)
        .map((image) => image.decode().catch(() => undefined))
    );
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );
  });
}

async function loadAllImages(page) {
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((image) => {
      image.loading = "eager";
    });
    await Promise.race([
      Promise.all(images.map((image) => image.decode().catch(() => undefined))),
      new Promise((resolve) => setTimeout(resolve, 5000))
    ]);
  });
  await settlePage(page);
}

async function readDynamicState(page) {
  return page.evaluate(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const heading = document.querySelector("h1");
    const diagram = document.querySelector('.prose img[src$=".svg"]');
    const box = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        x: Number(rect.x.toFixed(2)),
        y: Number(rect.y.toFixed(2)),
        width: Number(rect.width.toFixed(2)),
        height: Number(rect.height.toFixed(2))
      };
    };
    return {
      darkClass: document.documentElement.classList.contains("dark"),
      storedAppearance: localStorage.getItem("appearance"),
      computedColorScheme: rootStyle.colorScheme,
      bodyBackground: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      primary500: rootStyle.getPropertyValue("--color-primary-500").trim(),
      paper: rootStyle.getPropertyValue("--udg-c-paper").trim(),
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      headingBox: box(heading),
      diagramBox: box(diagram)
    };
  });
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"]
});

for (const fontPath of fontPaths) {
  const response = await fetch(siteURL(fontPath));
  report.fonts.push({
    path: fontPath,
    url: response.url,
    status: response.status,
    contentType: response.headers.get("content-type"),
    bytes: Number(response.headers.get("content-length") || 0)
  });
}

const manifestURL = siteURL("site.webmanifest");
const manifestResponse = await fetch(manifestURL);
const manifest = manifestResponse.ok ? await manifestResponse.json() : {};
const manifestIcons = [];
for (const icon of manifest.icons || []) {
  const iconURL = new URL(icon.src, manifestURL).href;
  const response = await fetch(iconURL);
  manifestIcons.push({ src: icon.src, url: iconURL, status: response.status });
}
report.manifest = {
  url: manifestURL,
  status: manifestResponse.status,
  name: manifest.name,
  shortName: manifest.short_name,
  startURL: manifest.start_url,
  scope: manifest.scope,
  themeColor: manifest.theme_color,
  backgroundColor: manifest.background_color,
  icons: manifestIcons
};

for (const colorScheme of colorSchemes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      colorScheme,
      reducedMotion: "reduce",
      viewport
    });

    await context.addInitScript(() => {
      try {
        localStorage.setItem("appearance", "dark");
      } catch (_error) {
        // La aserción de la página distinguirá si el almacenamiento no está disponible.
      }
    });

    context.on("request", (request) => {
      const url = new URL(request.url());
      if (!belongsToSite(url) && !["data:", "blob:"].includes(url.protocol)) {
        report.externalRequests.push({
          url: request.url(),
          resourceType: request.resourceType()
        });
      }
    });

    for (const pageSpec of pages) {
      const page = await context.newPage();
      page.on("console", (message) => {
        if (message.type() === "error") report.consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => report.pageErrors.push(error.message));

      const response = await page.goto(siteURL(pageSpec.path), { waitUntil: "load" });
      await settlePage(page);

      const state = await page.evaluate(() => {
        const bodyStyle = getComputedStyle(document.body);
        const heading = document.querySelector("h1, h2");
        const nav = document.querySelector("nav");
        const rootStyle = getComputedStyle(document.documentElement);
        return {
          darkClass: document.documentElement.classList.contains("dark"),
          defaultAppearance: document.documentElement.dataset.defaultAppearance,
          autoAppearance: document.documentElement.dataset.autoAppearance,
          storedAppearance: localStorage.getItem("appearance"),
          switchers: document.querySelectorAll(
            "#appearance-switcher, #appearance-switcher-mobile"
          ).length,
          viewport: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyBackground: bodyStyle.backgroundColor,
          bodyColor: bodyStyle.color,
          computedColorScheme: rootStyle.colorScheme,
          primary500: rootStyle.getPropertyValue("--color-primary-500").trim(),
          paper: rootStyle.getPropertyValue("--udg-c-paper").trim(),
          headingFont: heading ? getComputedStyle(heading).fontFamily : "",
          bodyFont: bodyStyle.fontFamily,
          navFont: nav ? getComputedStyle(nav).fontFamily : "",
          piazzollaReady: document.fonts.check('16px "Piazzolla"'),
          interReady: document.fonts.check('16px "Inter"'),
          archivoNarrowReady: document.fonts.check('16px "Archivo Narrow"'),
          themeColor: document.querySelector('meta[name="theme-color"]')?.content || ""
        };
      });
      state.httpStatus = response?.status() || 0;

      state.contrast = Number(
        contrast(rgb(state.bodyColor), rgb(state.bodyBackground)).toFixed(2)
      );

      report.pages.push({
        page: pageSpec.name,
        path: pageSpec.path,
        emulatedColorScheme: colorScheme,
        viewport: viewport.name,
        ...state
      });

      if (
        captureDir &&
        ((pageSpec.name === "inicio" && viewport.name === "desktop") ||
          (pageSpec.name === "contenido-svg" && viewport.name === "mobile") ||
          (pageSpec.name === "transformacion-pedagogica" &&
            viewport.name === "desktop") ||
          (pageSpec.name === "mermaid-bloom" && viewport.name === "mobile"))
      ) {
        mkdirSync(captureDir, { recursive: true });
        await page.screenshot({
          path: `${captureDir}/${pageSpec.name}-${viewport.name}-${colorScheme}.png`,
          fullPage: true
        });
      }

      await page.close();
    }

    await context.close();
  }
}

for (const pageSpec of [
  { name: "inicio", path: "/", viewport: viewports[2] },
  {
    name: "contenido-svg",
    path: "/formacion-docente/aprendizaje-activo/",
    viewport: viewports[0]
  }
]) {
  const context = await browser.newContext({
    colorScheme: "light",
    reducedMotion: "reduce",
    viewport: pageSpec.viewport
  });
  const page = await context.newPage();
  await page.goto(siteURL(pageSpec.path), { waitUntil: "load" });
  await loadAllImages(page);

  const beforeState = await readDynamicState(page);
  if (captureDir) mkdirSync(captureDir, { recursive: true });
  const before = await page.screenshot({
    fullPage: true,
    path: captureDir
      ? `${captureDir}/dynamic-${pageSpec.name}-${pageSpec.viewport.name}-before.png`
      : undefined
  });
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await settlePage(page);
  const after = await page.screenshot({
    fullPage: true,
    path: captureDir
      ? `${captureDir}/dynamic-${pageSpec.name}-${pageSpec.viewport.name}-after.png`
      : undefined
  });
  const afterState = await readDynamicState(page);

  report.dynamicSwitches.push({
    page: pageSpec.name,
    path: pageSpec.path,
    viewport: pageSpec.viewport.name,
    computedStateIdentical: JSON.stringify(beforeState) === JSON.stringify(afterState),
    screenshotBytesIdentical: before.equals(after),
    before: beforeState,
    after: afterState
  });

  await context.close();
}

{
  const context = await browser.newContext({
    colorScheme: "light",
    reducedMotion: "reduce",
    viewport: viewports[2]
  });
  const page = await context.newPage();
  const response = await page.goto(siteURL(report.cardAudit.page), { waitUntil: "load" });
  await loadAllImages(page);
  report.cardAudit.httpStatus = response?.status() || 0;

  const items = await page.evaluate(() =>
    [...document.querySelectorAll(".card-bg")]
      .map((card) => {
        const image = card.querySelector("img");
        const link = card.querySelector("a[href]");
        const accent = card.querySelector(".card-icon-ring");
        if (!image || !link || !accent) return null;
        return {
          title: image.alt,
          href: link.href,
          src: image.src,
          imageComplete: image.complete,
          naturalWidth: image.naturalWidth,
          accentColor: getComputedStyle(accent).color
        };
      })
      .filter(Boolean)
  );

  report.cardAudit.items = await Promise.all(
    items.map(async (item) => {
      const [imageResponse, linkResponse] = await Promise.all([
        fetch(item.src, { signal: AbortSignal.timeout(5000) }),
        fetch(item.href, { signal: AbortSignal.timeout(5000) })
      ]);
      return {
        ...item,
        hrefWithinBase: belongsToSite(item.href),
        srcWithinBase: belongsToSite(item.src),
        imageStatus: imageResponse.status,
        linkStatus: linkResponse.status
      };
    })
  );

  await context.close();
}

await browser.close();

const invalidPage = report.pages.find(
  (page) =>
    page.httpStatus !== 200 ||
    page.darkClass ||
    page.defaultAppearance !== "light" ||
    page.autoAppearance !== "false" ||
    page.storedAppearance !== null ||
    page.switchers !== 0 ||
    page.computedColorScheme !== "light" ||
    page.scrollWidth > page.viewport ||
    page.primary500 !== "177, 32, 40" ||
    page.paper !== "#f5f3ee" ||
    !page.headingFont.toLowerCase().includes("piazzolla") ||
    !page.bodyFont.toLowerCase().includes("inter") ||
    !page.navFont.toLowerCase().includes("archivo narrow") ||
    !page.piazzollaReady ||
    !page.interReady ||
    !page.archivoNarrowReady ||
    page.contrast < 7
);

const pairedStates = new Map();
let divergentPair = false;
for (const page of report.pages) {
  const key = `${page.path}:${page.viewport}`;
  const signature = JSON.stringify({
    bodyBackground: page.bodyBackground,
    bodyColor: page.bodyColor,
    computedColorScheme: page.computedColorScheme,
    primary500: page.primary500,
    paper: page.paper,
    headingFont: page.headingFont,
    bodyFont: page.bodyFont,
    navFont: page.navFont
  });
  if (pairedStates.has(key) && pairedStates.get(key) !== signature) divergentPair = true;
  pairedStates.set(key, signature);
}

report.externalRequests = [
  ...new Map(report.externalRequests.map((request) => [request.url, request])).values()
];
report.consoleErrors = [...new Set(report.consoleErrors)];
report.pageErrors = [...new Set(report.pageErrors)];
const approvedCardAccents = new Set([
  "rgb(177, 32, 40)",
  "rgb(83, 99, 38)",
  "rgb(145, 68, 17)",
  "rgb(139, 38, 53)",
  "rgb(52, 64, 90)",
  "rgb(127, 24, 32)",
  "rgb(111, 30, 42)"
]);
report.ok =
  !invalidPage &&
  !divergentPair &&
  report.dynamicSwitches.every(
    (result) =>
      result.computedStateIdentical &&
      !result.after.darkClass &&
      result.after.storedAppearance === null &&
      result.after.computedColorScheme === "light"
  ) &&
  report.fonts.every((font) => font.status === 200 && font.bytes > 0) &&
  report.manifest.status === 200 &&
  report.manifest.themeColor === "#f5f3ee" &&
  report.manifest.backgroundColor === "#f5f3ee" &&
  report.manifest.startURL === "./" &&
  report.manifest.scope === "./" &&
  report.manifest.icons.every((icon) => icon.status === 200 && belongsToSite(icon.url)) &&
  report.graphicSources.disallowedColors.length === 0 &&
  report.graphicSources.darkQueries.length === 0 &&
  report.graphicSources.legacyFonts.length === 0 &&
  report.graphicSources.mermaidOceanColors.length === 0 &&
  report.graphicSources.contrastPairs.every((pair) => pair.ratio >= 4.5) &&
  report.cardAudit.httpStatus === 200 &&
  report.cardAudit.items.length === 7 &&
  report.cardAudit.items.every(
    (item) =>
      item.hrefWithinBase &&
      item.srcWithinBase &&
      item.imageComplete &&
      item.naturalWidth > 0 &&
      item.imageStatus === 200 &&
      item.linkStatus === 200 &&
      approvedCardAccents.has(item.accentColor)
  ) &&
  report.externalRequests.length === 0 &&
  report.consoleErrors.length === 0 &&
  report.pageErrors.length === 0;

console.log(JSON.stringify(report, null, 2));

if (!report.ok) process.exitCode = 1;
