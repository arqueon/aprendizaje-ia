#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import axe from "axe-core";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "data/editorial/shortcode-library.json");
const shortcodeRoot = path.join(root, "layouts/shortcodes");
const fixtureRoot = path.join(root, "tests/fixtures/shortcode-library/content");
const evidenceRoot = path.join(root, "docs/design/evidence/shortcode-library");
const reportPath = path.join(evidenceRoot, "qa-shortcode-library.json");
const port = Number(process.env.QA_SHORTCODE_LIBRARY_PORT || 42784);
const baseURL = `http://127.0.0.1:${port}/`;
const expectedCategories = new Set(["global", "compound", "specific", "retirable"]);
const expectedCategoryCounts = { global: 6, compound: 8, specific: 11, retirable: 1 };
const expectedRendered = {
  idea: 1,
  practica: 1,
  parallevar: 1,
  acordeon: 1,
  pliegue: 2,
  proceso: 1,
  paso: 2,
  pestanas: 1,
  pestana: 2,
  cards: 1,
  card: 2,
  figura: 1,
  referencias: 1,
};
const knownHugoWarnings = [
  /project config key languageCode was deprecated/,
  /Module "github\.com\/nunocoracao\/blowfish\/v2" is not compatible/,
  /\.Site\.LanguageCode was deprecated/,
  /\.Site\.Data was deprecated/,
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}


// El tema llega como módulo Go y `_vendor/` no se commitea (CLAUDE.md convención 3),
// así que hay que resolverlo donde Hugo lo deja: la caché de módulos. Se acepta
// `_vendor/` si alguien lo ha materializado en local, pero no se exige.
async function resolveThemeShortcodeRoots() {
  const modulePath = "github.com/nunocoracao/blowfish/v2";
  const goMod = await readFile(path.join(root, "go.mod"), "utf8").catch(() => "");
  const version = goMod.match(
    new RegExp(`${modulePath.replace(/[./]/g, "\\$&")}\\s+(v[\\w.+-]+)`),
  )?.[1];
  const home = process.env.HOME || "";
  const hugoCache =
    process.env.HUGO_CACHEDIR || (home ? path.join(home, ".cache", "hugo_cache") : "");
  const goPath = process.env.GOPATH || (home ? path.join(home, "go") : "");

  const candidates = [path.join(root, "_vendor", modulePath, "layouts", "shortcodes")];
  if (version) {
    const versioned = `${modulePath}@${version}`;
    if (hugoCache) {
      candidates.push(
        path.join(
          hugoCache, "modules", "filecache", "modules", "pkg", "mod",
          versioned, "layouts", "shortcodes",
        ),
      );
    }
    if (goPath) {
      candidates.push(path.join(goPath, "pkg", "mod", versioned, "layouts", "shortcodes"));
    }
  }

  const roots = [];
  for (const dir of candidates) {
    if (await stat(dir).catch(() => null)) roots.push(dir);
  }
  return roots;
}

function sorted(items) {
  return [...items].sort((left, right) => left.localeCompare(right));
}

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(absolute));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(absolute);
  }
  return files;
}

async function fullBuildCheck() {
  const destination = await mkdtemp(path.join(tmpdir(), "udgia-shortcodes-build-"));
  try {
    const build = spawnSync(
      process.env.HUGO_BIN || "hugo",
      ["--quiet", "--noBuildLock", "--destination", destination],
      { cwd: root, encoding: "utf8" },
    );
    assert(
      build.status === 0,
      `el sitio completo no construye:\n${build.stdout}\n${build.stderr}`,
    );
    return { status: "pass" };
  } finally {
    await rm(destination, { recursive: true, force: true });
  }
}

async function invalidFixtureCheck(name, shortcode, expectedError) {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), `udgia-shortcodes-${name}-`));
  const contentRoot = path.join(temporaryRoot, "content");
  const pageRoot = path.join(contentRoot, "prueba");
  const destination = path.join(temporaryRoot, "public");
  await mkdir(pageRoot, { recursive: true });
  await writeFile(
    path.join(pageRoot, "index.md"),
    `---\ntitle: Prueba inválida\nshowHero: false\n---\n\n${shortcode}\n`,
    "utf8",
  );
  try {
    const build = spawnSync(
      process.env.HUGO_BIN || "hugo",
      [
        "--noBuildLock",
        "--contentDir",
        contentRoot,
        "--destination",
        destination,
      ],
      { cwd: root, encoding: "utf8" },
    );
    const output = `${build.stdout}\n${build.stderr}\n${build.error?.message || ""}`;
    assert(build.status !== 0, `${name}: la fixture inválida construyó sin error`);
    assert(
      output.includes(expectedError),
      `${name}: falta el error esperado ${expectedError}; status=${build.status}; signal=${build.signal}; salida=${output.slice(-2_000)}`,
    );
    return { name, expectedError, status: "rejected" };
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

async function staticChecks() {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const css = await readFile(path.join(root, "assets/css/custom.css"), "utf8");
  const localTemplates = sorted(
    (await readdir(shortcodeRoot))
      .filter((name) => name.endsWith(".html"))
      .map((name) => path.basename(name, ".html")),
  );
  const registered = sorted(Object.keys(manifest.components));
  assert(
    JSON.stringify(localTemplates) === JSON.stringify(registered),
    `registro y templates difieren: templates=${localTemplates}; registro=${registered}`,
  );
  assert(manifest.scope.publicationAuthorized === false, "el registro autoriza publicación");
  assert(
    manifest.scope.contentPropagationAuthorized === false,
    "el registro autoriza propagación de contenido",
  );

  const categoryCounts = { global: 0, compound: 0, specific: 0, retirable: 0 };
  for (const [name, component] of Object.entries(manifest.components)) {
    assert(expectedCategories.has(component.category), `${name}: categoría desconocida`);
    categoryCounts[component.category] += 1;
    assert(component.status, `${name}: falta estado`);
    assert(component.family, `${name}: falta familia`);
    assert(component.api?.kind, `${name}: falta API`);
    assert(component.api?.inner, `${name}: falta contrato de contenido interno`);
    assert(component.nesting?.parent, `${name}: falta contrato de padre`);
    assert(component.nesting?.children, `${name}: falta contrato de hijos`);
    const profile = manifest.contractProfiles[component.contractProfile];
    assert(profile, `${name}: perfil inexistente ${component.contractProfile}`);
    for (const field of ["accessibility", "responsive", "print", "fallback", "tests"]) {
      assert(profile[field], `${name}: el perfil ${component.contractProfile} no fija ${field}`);
    }
  }
  assert(
    JSON.stringify(categoryCounts) === JSON.stringify(expectedCategoryCounts),
    `recuento de categorías inesperado ${JSON.stringify(categoryCounts)}`,
  );

  const tokens = Object.values(manifest.tokens)
    .filter(Array.isArray)
    .flat()
    .filter((token) => token.startsWith("--"));
  for (const token of tokens) {
    assert(css.includes(`${token}:`), `token no declarado en CSS: ${token}`);
  }

  const shared = registered.filter((name) =>
    ["global", "compound"].includes(manifest.components[name].category));
  const sharedTemplates = await Promise.all(
    shared.map(async (name) => ({
      name,
      source: await readFile(path.join(shortcodeRoot, `${name}.html`), "utf8"),
    })),
  );
  for (const { name, source } of sharedTemplates) {
    assert(!source.includes("<style"), `${name}: incluye CSS embebido`);
  }
  for (const name of Object.keys(expectedRendered)) {
    const markerOwner = name === "pestana" ? "pestanas" : name;
    const source = await readFile(path.join(shortcodeRoot, `${markerOwner}.html`), "utf8");
    assert(
      source.includes(`data-udgia-component=\"${name}\"`),
      `${name}: falta marcador de render gobernado`,
    );
  }

  const nestingSignals = {
    paso: "solo puede usarse dentro de proceso",
    pliegue: "solo puede usarse dentro de acordeon",
    pestana: "solo puede usarse dentro de pestanas",
  };
  for (const [name, signal] of Object.entries(nestingSignals)) {
    const source = await readFile(path.join(shortcodeRoot, `${name}.html`), "utf8");
    assert(source.includes(signal), `${name}: no aplica su contrato de anidamiento`);
  }

  const publicSources = await Promise.all(
    (await markdownFiles(path.join(root, "content"))).map((file) => readFile(file, "utf8")),
  );
  const combinedPublicSource = publicSources.join("\n");
  for (const [name, component] of Object.entries(manifest.components)) {
    if (component.category !== "retirable") continue;
    const pattern = new RegExp(`\\{\\{[<%]\\s*${name}(?:\\s|[>%])`, "g");
    const uses = [...combinedPublicSource.matchAll(pattern)].length;
    assert(uses === 0, `${name}: componente retirable con ${uses} usos públicos`);
    assert(component.replacement, `${name}: falta reemplazo`);
    assert(manifest.components[component.replacement.split("/")[0]], `${name}: reemplazo inexistente`);
  }

  const themeShortcodeRoots = await resolveThemeShortcodeRoots();
  assert(
    themeShortcodeRoots.length,
    "no se localizó el tema Blowfish: ejecuta `hugo mod get` o define HUGO_CACHEDIR",
  );
  for (const name of Object.keys(manifest.themeDependencies)) {
    const found = [];
    for (const dir of themeShortcodeRoots) {
      if (await stat(path.join(dir, `${name}.html`)).catch(() => null)) found.push(dir);
    }
    assert(found.length, `${name}: dependencia de tema ausente`);
  }

  const invalid = [];
  invalid.push(await invalidFixtureCheck(
    "paso-suelto",
    '{{< paso titulo="Suelto" >}}Texto{{< /paso >}}',
    "solo puede usarse dentro de proceso",
  ));
  invalid.push(await invalidFixtureCheck(
    "pliegue-suelto",
    '{{< pliegue titulo="Suelto" >}}Texto{{< /pliegue >}}',
    "solo puede usarse dentro de acordeon",
  ));
  invalid.push(await invalidFixtureCheck(
    "pestana-suelta",
    '{{< pestana titulo="Suelta" >}}Texto{{< /pestana >}}',
    "solo puede usarse dentro de pestanas",
  ));
  invalid.push(await invalidFixtureCheck(
    "pestanas-unica",
    '{{< pestanas >}}{{< pestana titulo="Única" >}}Texto{{< /pestana >}}{{< /pestanas >}}',
    "requiere al menos dos pestana",
  ));
  invalid.push(await invalidFixtureCheck(
    "figura-ausente",
    '{{< figura src="ausente.svg" caption="Ausente" >}}',
    "no existe el recurso",
  ));
  invalid.push(await invalidFixtureCheck(
    "card-sin-link",
    '{{< card title="Sin destino" >}}',
    "link es obligatorio",
  ));
  invalid.push(await invalidFixtureCheck(
    "card-tall-invalido",
    '{{< card link="#destino" title="Valor inválido" tall="quizá" >}}',
    "tall debe ser true o false",
  ));
  invalid.push(await invalidFixtureCheck(
    "referencias-duplicadas",
    '{{< referencias >}}\n- Fuente principal.\n{{< /referencias >}}\n\n{{< referencias titulo="Fuentes complementarias" >}}\n- Fuente complementaria.\n{{< /referencias >}}',
    "sólo admite una instancia por página",
  ));

  return {
    manifest: path.relative(root, manifestPath),
    templates: registered.length,
    categoryCounts,
    profiles: Object.keys(manifest.contractProfiles).length,
    tokens: tokens.length,
    themeDependencies: Object.keys(manifest.themeDependencies).length,
    invalidFixturesRejected: invalid,
    fullBuild: await fullBuildCheck(),
  };
}

async function waitForServer(server, stderr) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Hugo terminó antes de iniciar:\n${stderr.join("")}`);
    }
    try {
      const response = await fetch(new URL("componentes/", baseURL));
      if (response.ok) return;
    } catch {
      // El servidor aún no acepta conexiones.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
  }
  throw new Error(`Hugo no respondió en ${baseURL}`);
}

async function keyboardDisclosureCheck(page, selector, label) {
  const summary = page.locator(`${selector}:not([open]) > summary:visible`).first();
  assert(await summary.count(), `${label}: no existe un summary cerrado visible`);
  const handle = await summary.elementHandle();
  assert(handle, `${label}: no se obtuvo el summary`);
  await handle.focus();
  assert(await handle.evaluate((node) => document.activeElement === node), `${label}: no recibe foco`);
  await page.keyboard.press("Space");
  assert(await handle.evaluate((node) => node.parentElement.open), `${label}: Espacio no abre details`);
  await handle.dispose();
  return "opened-with-space";
}

async function referencesRerenderCheck(server, stderr, fixtureIndexPath) {
  const marker = "referencias-rerender-verificado";
  const source = await readFile(fixtureIndexPath, "utf8");
  const stderrOffset = stderr.join("").length;
  const started = Date.now();
  await writeFile(fixtureIndexPath, `${source}\n\n${marker}\n`, "utf8");

  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Hugo terminó durante el rerender:\n${stderr.join("").slice(stderrOffset)}`);
    }
    const rerenderErrors = stderr.join("").slice(stderrOffset);
    assert(
      !rerenderErrors.includes("Shortcode referencias: sólo admite una instancia por página"),
      `referencias: el rerender se confundió con una segunda instancia:\n${rerenderErrors}`,
    );
    try {
      const response = await fetch(new URL(`componentes/?qa=${Date.now()}`, baseURL), {
        cache: "no-store",
      });
      if (response.ok && (await response.text()).includes(marker)) {
        return { status: "pass", wallMs: Date.now() - started, source: "temporary-copy" };
      }
    } catch {
      // Hugo puede cerrar brevemente el socket mientras sustituye el render en memoria.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
  }
  throw new Error(`referencias: Hugo no completó el rerender en ${baseURL}`);
}

async function inspectScenario(browser, scenario) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    colorScheme: scenario.mode,
    reducedMotion: "reduce",
    forcedColors: scenario.forcedColors || "none",
  });
  await context.addInitScript((mode) => localStorage.setItem("appearance", mode), scenario.mode);
  const external = [];
  const writes = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL).origin) external.push(request.url());
    if (!["GET", "HEAD"].includes(request.method())) writes.push(`${request.method()} ${request.url()}`);
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const started = Date.now();
  const response = await page.goto(new URL("componentes/", baseURL).href, { waitUntil: "networkidle" });
  const wallMs = Date.now() - started;
  assert(response?.status() === 200, `${scenario.name}: HTTP ${response?.status()}`);

  const state = await page.evaluate(({ expected, mode, forcedColors }) => {
    const rootStyle = getComputedStyle(document.documentElement);
    const tokenNames = [
      "--alm-space-xs",
      "--alm-radius-md",
      "--alm-inset-inline",
      "--alm-control-min",
      "--udg-c-primary",
    ];
    const components = Object.fromEntries(
      Object.keys(expected).map((name) => [
        name,
        document.querySelectorAll(`[data-udgia-component="${name}"]`).length,
      ]),
    );
    const labelsResolve = [...document.querySelectorAll("aside[aria-labelledby]")].every((node) =>
      document.getElementById(node.getAttribute("aria-labelledby"))?.textContent.trim());
    const regionsNamed = [...document.querySelectorAll("section[data-udgia-component]")].every((node) =>
      node.getAttribute("aria-label") ||
      document.getElementById(node.getAttribute("aria-labelledby"))?.textContent.trim());
    const idCounts = [...document.querySelectorAll("[id]")].reduce((counts, node) => {
      counts[node.id] = (counts[node.id] || 0) + 1;
      return counts;
    }, {});
    const referenceLabelIds = [...document.querySelectorAll(
      '[data-udgia-component="referencias"][aria-labelledby]',
    )].map((node) => node.getAttribute("aria-labelledby"));
    const duplicateReferenceIds = referenceLabelIds.filter((id) => idCounts[id] !== 1);
    return {
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      dark: document.documentElement.classList.contains("dark"),
      expectedDark: mode === "dark",
      forcedColors: matchMedia("(forced-colors: active)").matches,
      expectedForcedColors: forcedColors === "active",
      components,
      tokens: Object.fromEntries(tokenNames.map((name) => [name, rootStyle.getPropertyValue(name).trim()])),
      labelsResolve,
      regionsNamed,
      duplicateReferenceIds,
      mainText: document.querySelector("main")?.innerText || "",
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
      cookies: document.cookie,
      localStorageKeys: Object.keys(localStorage).sort(),
      printFallbackVisible: [...document.querySelectorAll(
        ".alm-pliegue-impresion, .alm-pestanas-impresion",
      )].some((node) => getComputedStyle(node).display !== "none" || node.getBoundingClientRect().height > 0),
    };
  }, { expected: expectedRendered, mode: scenario.mode, forcedColors: scenario.forcedColors });

  assert(state.scrollWidth <= state.width + 1, `${scenario.name}: overflow horizontal`);
  assert(state.dark === state.expectedDark, `${scenario.name}: apariencia incorrecta`);
  assert(
    state.forcedColors === state.expectedForcedColors,
    `${scenario.name}: modo de colores forzados incorrecto`,
  );
  assert(JSON.stringify(state.components) === JSON.stringify(expectedRendered), `${scenario.name}: componentes ${JSON.stringify(state.components)}`);
  assert(Object.values(state.tokens).every(Boolean), `${scenario.name}: tokens sin valor ${JSON.stringify(state.tokens)}`);
  assert(state.labelsResolve, `${scenario.name}: aside sin nombre resoluble`);
  assert(state.regionsNamed, `${scenario.name}: sección sin nombre accesible`);
  assert(
    state.duplicateReferenceIds.length === 0,
    `${scenario.name}: IDs de referencias duplicados ${state.duplicateReferenceIds}`,
  );
  assert(state.mainText.includes("HTML semántico"), `${scenario.name}: falta contenido de fallback`);
  assert(state.brokenImages.length === 0, `${scenario.name}: imágenes rotas ${state.brokenImages}`);
  assert(state.cookies === "", `${scenario.name}: cookie inesperada`);
  assert(state.localStorageKeys.every((key) => key === "appearance"), `${scenario.name}: persistencia inesperada`);
  assert(!state.printFallbackVisible, `${scenario.name}: fallback de impresión visible en pantalla`);

  const keyboard = {
    acordeon: await keyboardDisclosureCheck(page, ".alm-acordeon details", `${scenario.name} acordeon`),
    pestanas: await keyboardDisclosureCheck(page, ".alm-pestanas details", `${scenario.name} pestanas`),
  };

  await page.addScriptTag({ content: axe.source });
  const axeResult = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
      rules: { region: { enabled: false } },
    });
    return result.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    }));
  });
  const blockingAxe = axeResult.filter((violation) =>
    ["serious", "critical"].includes(violation.impact));
  assert(blockingAxe.length === 0, `${scenario.name}: axe ${JSON.stringify(blockingAxe)}`);
  assert(external.length === 0, `${scenario.name}: tráfico externo ${external}`);
  assert(writes.length === 0, `${scenario.name}: escrituras HTTP ${writes}`);
  assert(consoleErrors.length === 0, `${scenario.name}: consola ${consoleErrors}`);

  const screenshotName = `${scenario.name}.webp`;
  await page.addStyleTag({
    content: "body > div.fixed.inset-x-0.z-100, body > div.min-h-\\[148px\\] { display: none !important; }",
  });
  await page.screenshot({
    path: path.join(evidenceRoot, screenshotName),
    fullPage: true,
    type: "webp",
    quality: 76,
  });
  const screenshotBytes = (await stat(path.join(evidenceRoot, screenshotName))).size;
  assert(screenshotBytes > 1_000, `${scenario.name}: captura vacía`);
  await context.close();
  return {
    scenario: scenario.name,
    viewport: scenario.viewport,
    mode: scenario.mode,
    wallMs,
    screenshot: screenshotName,
    screenshotBytes,
    ...state,
    keyboard,
    axe: axeResult,
    externalRequests: external.length,
    httpWrites: writes.length,
    consoleErrors: consoleErrors.length,
  };
}

async function printCheck(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  const response = await page.goto(new URL("componentes/", baseURL).href, { waitUntil: "networkidle" });
  assert(response?.status() === 200, `print: HTTP ${response?.status()}`);
  await page.emulateMedia({ media: "print" });
  const state = await page.evaluate(() => {
    const printBodies = [...document.querySelectorAll(
      ".alm-pliegue-impresion, .alm-pestana-impresion",
    )].map((node) => ({
      text: node.textContent.trim(),
      display: getComputedStyle(node).display,
      height: node.getBoundingClientRect().height,
    }));
    const header = [...document.body.children].find(
      (node) => node.classList.contains("fixed") && node.classList.contains("inset-x-0"),
    );
    return {
      printBodies,
      headerDisplay: header ? getComputedStyle(header).display : "absent",
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
  assert(state.printBodies.length === 4, `print: cuerpos de fallback ${state.printBodies.length}/4`);
  assert(
    state.printBodies.every((item) => item.display !== "none" && item.height > 0 && item.text),
    `print: fallback oculto ${JSON.stringify(state.printBodies)}`,
  );
  assert(state.headerDisplay === "none", "print: la cabecera fija permanece visible");
  assert(state.scrollWidth <= state.width + 1, "print: overflow horizontal");
  const screenshotName = "print.webp";
  await page.screenshot({
    path: path.join(evidenceRoot, screenshotName),
    fullPage: true,
    type: "webp",
    quality: 76,
  });
  const screenshotBytes = (await stat(path.join(evidenceRoot, screenshotName))).size;
  assert(screenshotBytes > 1_000, "print: captura vacía");
  await context.close();
  return { ...state, screenshot: screenshotName, screenshotBytes };
}

async function runtimeChecks() {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "udgia-shortcodes-runtime-"));
  const temporaryFixtureRoot = path.join(temporaryRoot, "content");
  await cp(fixtureRoot, temporaryFixtureRoot, { recursive: true });
  const stderr = [];
  const stdout = [];
  const server = spawn(
    process.env.HUGO_BIN || "hugo",
    [
      "server",
      "--bind",
      "127.0.0.1",
      "--port",
      String(port),
      "--baseURL",
      baseURL,
      "--contentDir",
      temporaryFixtureRoot,
      "--renderToMemory",
      "--disableFastRender",
      "--noBuildLock",
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"] },
  );
  server.stdout.on("data", (chunk) => stdout.push(chunk.toString()));
  server.stderr.on("data", (chunk) => stderr.push(chunk.toString()));
  let browser;
  try {
    await waitForServer(server, stderr);
    const executablePath = process.env.CHROMIUM_PATH ||
      ((await stat("/usr/bin/chromium").catch(() => null))
        ? "/usr/bin/chromium"
        : chromium.executablePath());
    assert(executablePath, "No se encontró Chromium");
    browser = await chromium.launch({ executablePath, headless: true, args: ["--no-sandbox"] });
    const scenarios = [
      { name: "desktop-light", mode: "light", viewport: { width: 1280, height: 900 } },
      { name: "mobile-dark", mode: "dark", viewport: { width: 360, height: 800 } },
      {
        name: "forced-colors",
        mode: "light",
        forcedColors: "active",
        viewport: { width: 1024, height: 768 },
      },
    ];
    const inspections = [];
    for (const scenario of scenarios) inspections.push(await inspectScenario(browser, scenario));
    const print = await printCheck(browser);
    const referencesRerender = await referencesRerenderCheck(
      server,
      stderr,
      path.join(temporaryFixtureRoot, "componentes", "index.md"),
    );
    const warnings = stderr.join("").split("\n").filter((line) => line.includes("WARN"));
    const unexpectedWarnings = warnings.filter(
      (warning) => !knownHugoWarnings.some((pattern) => pattern.test(warning)),
    );
    assert(unexpectedWarnings.length === 0, `advertencias Hugo nuevas: ${unexpectedWarnings}`);
    return {
      baseURL,
      fixture: path.relative(root, fixtureRoot),
      inspections,
      print,
      referencesRerender,
      warnings,
      unexpectedWarnings,
      serverOutputTail: stdout.join("").slice(-1_500),
      summary: {
        renders: inspections.length,
        keyboardChecks: inspections.length * 2,
        axeBlockingViolations: inspections.reduce(
          (sum, item) => sum + item.axe.filter((violation) =>
            ["serious", "critical"].includes(violation.impact)).length,
          0,
        ),
        externalRequests: inspections.reduce((sum, item) => sum + item.externalRequests, 0),
        httpWrites: inspections.reduce((sum, item) => sum + item.httpWrites, 0),
        consoleErrors: inspections.reduce((sum, item) => sum + item.consoleErrors, 0),
      },
    };
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
    await new Promise((resolvePromise) => {
      if (server.exitCode !== null) return resolvePromise();
      server.once("exit", resolvePromise);
      setTimeout(resolvePromise, 3_000);
    });
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}

await mkdir(evidenceRoot, { recursive: true });
const startedAt = new Date().toISOString();
try {
  const staticResult = await staticChecks();
  const runtimeResult = await runtimeChecks();
  const report = {
    schemaVersion: 1,
    status: "pass",
    startedAt,
    finishedAt: new Date().toISOString(),
    scope: "local-only-not-published-no-content-propagation",
    static: staticResult,
    runtime: runtimeResult,
    gates: {
      commit: false,
      push: false,
      publication: false,
      deployment: false,
      moodle: false,
      hermes: false,
    },
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(
    `PASS shortcode-library: ${staticResult.templates} clasificados; ` +
    `${runtimeResult.summary.renders} renders, ${runtimeResult.summary.keyboardChecks} pruebas de teclado, ` +
    `axe/overflow/impresión/fallback sin bloqueos.\n${reportPath}\n`,
  );
} catch (error) {
  await writeFile(
    reportPath,
    `${JSON.stringify({
      schemaVersion: 1,
      status: "fail",
      startedAt,
      finishedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`,
    "utf8",
  );
  throw error;
}
