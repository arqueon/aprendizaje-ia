#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import axe from "axe-core";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const courseRoot = path.join(
  root,
  "content/formacion-docente/diseno-inverso-cocreacion-ia",
);
const evidenceDir = path.join(
  root,
  "docs/design/evidence/curso-diseno-inverso-cocreacion-ia",
);
const reportPath = path.join(evidenceDir, "qa-course.json");
const port = Number(process.env.QA_COURSE_PORT || 42783);
const baseURL = `http://127.0.0.1:${port}/`;
const sourceHash =
  "2fa5079a75b32f64d68a830a19ec386cc1f66eb16be6887b5a8fcf2ca4c73a2d";
const slugs = [
  "01-panorama-activo-hibrido",
  "02-introduccion-diseno-inverso",
  "03-literacidades-ia",
  "04-cocreacion-persona-ia",
  "05-contexto-diagnostico",
  "06-resultados-aprendizaje",
  "07-evidencias-criterios",
  "08-secuencias-activas-hibridas",
  "09-analisis-casos",
  "10-limitaciones-analisis",
  "11-priorizar-intervenciones",
  "12-evaluacion-mejora-continua",
  "13-autoevaluacion-final",
];
const routePrefix = "formacion-docente/diseno-inverso-cocreacion-ia";
const routes = [`${routePrefix}/`, ...slugs.map((slug) => `${routePrefix}/${slug}/`)];
const knownHugoWarnings = [
  /project config key languageCode was deprecated/,
  /Module "github\.com\/nunocoracao\/blowfish\/v2" is not compatible/,
  /\.Site\.LanguageCode was deprecated/,
  /\.Site\.Data was deprecated/,
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function occurrences(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

async function readJSON(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function staticChecks() {
  const landing = await readFile(path.join(courseRoot, "_index.md"), "utf8");
  const pages = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      markdown: await readFile(path.join(courseRoot, slug, "index.md"), "utf8"),
      featured: await readFile(path.join(courseRoot, slug, "featured.webp")),
    })),
  );
  const combined = pages.map((page) => page.markdown).join("\n");
  const catalog = await readJSON(path.join(root, "data/h5p/course_candidates.json"));
  const production = await readJSON(path.join(root, "data/h5p/catalog.json"));
  const icapFigure = await readFile(
    path.join(courseRoot, slugs[0], "figura-icap.svg"),
    "utf8",
  );
  const icapMobileFigure = await readFile(
    path.join(courseRoot, slugs[0], "figura-icap-mobile.svg"),
    "utf8",
  );
  const candidates = Object.entries(catalog.candidates);

  assert(pages.length === 13, `se esperaban 13 lecciones y hay ${pages.length}`);
  assert(
    occurrences(landing, /\{\{< card link="\d{2}-/g) === 13,
    "la portada no enlaza exactamente trece lecciones",
  );
  assert(
    occurrences(combined, /\{\{<\s*acordeon\s*>\}\}/g) === 23,
    "el traslado nativo no conserva 23 acordeones",
  );
  assert(
    occurrences(combined, /\{\{<\s*pestanas\s*>\}\}/g) === 19,
    "el traslado nativo no conserva 19 grupos de facetas",
  );
  assert(
    occurrences(combined, /\{\{<\s*proceso\s*>\}\}/g) === 14,
    "el traslado nativo no conserva 14 procesos",
  );
  const shortcodeIds = [
    ...combined.matchAll(/\{\{<\s*curso-interactivo\s+id="([^"]+)"\s*>\}\}/g),
  ].map((match) => match[1]);
  assert(shortcodeIds.length === 56, `shortcodes candidatos ${shortcodeIds.length}/56`);
  assert(new Set(shortcodeIds).size === 56, "hay ids de práctica duplicados");
  assert(candidates.length === 56, `catálogo de candidatos ${candidates.length}/56`);
  assert(
    shortcodeIds.every((id) => catalog.candidates[id]),
    "hay un shortcode sin entrada gobernada",
  );
  assert(
    candidates.every(([id]) => shortcodeIds.includes(id)),
    "hay una candidatura sin aparición en el curso",
  );
  assert(catalog.source.lessonCount === 13, "el catálogo no declara 13 lecciones");
  assert(catalog.source.nativeInteractiveCount === 56, "recuento nativo incorrecto");
  assert(catalog.source.h5pCandidateCount === 56, "recuento de decisiones de origen incorrecto");
  assert(catalog.source.sha256 === sourceHash, "hash de la fuente Rise inesperado");
  assert(catalog.policy.publicationAuthorized === false, "la publicación no está autorizada");
  assert(catalog.policy.eligibleCount === 30, "deben existir 30 candidaturas H5P elegibles");
  assert(catalog.policy.deferredCount === 0, "no deben quedar candidaturas diferidas");
  assert(catalog.policy.nativeHtmlPreferredCount === 26, "deben existir 26 prácticas HTML preferidas");
  assert(
    Object.keys(catalog.reviewLessons || {}).length === 25,
    "la autoevaluación debe ofrecer 25 rutas de repaso",
  );
  for (const [id, review] of Object.entries(catalog.reviewLessons || {})) {
    assert(catalog.candidates[id]?.lesson === 13, `${id}: la ruta no corresponde a la autoevaluación`);
    assert(slugs.includes(review.slug), `${id}: ruta de repaso desconocida ${review.slug}`);
    assert(review.label?.trim(), `${id}: ruta de repaso sin etiqueta`);
  }

  const productionLibraries = new Set(
    Object.values(production.contents).map((entry) => entry.mainLibrary),
  );
  for (const [id, entry] of candidates) {
    assert(entry.graded === false, `${id}: no debe calificarse`);
    assert(entry.reportingIsEnabled === false, `${id}: reporte activado`);
    assert(entry.publicationAuthorized === false, `${id}: publicación autorizada por error`);
    assert(entry.contentLicense === "CC BY-SA 4.0", `${id}: licencia ausente`);
    assert(
      entry.licenseStatus === "project-original-pending-publication-gate",
      `${id}: estado de licencia inesperado`,
    );
    assert(entry.rationale?.length > 80, `${id}: decisión sin justificación`);
    assert(entry.fallback?.type, `${id}: fallback sin tipo`);
    assert(entry.title?.trim(), `${id}: fallback sin título`);
    if (entry.fallback.type === "dialog-cards") {
      assert(
        entry.fallback.items?.length > 0
          && entry.fallback.items.every((item) => item.prompt?.trim() && item.answer?.trim()),
        `${id}: tarjetas sin equivalente completo`,
      );
    } else if (["single-choice", "multiple-response"].includes(entry.fallback.type)) {
      assert(entry.fallback.question?.trim(), `${id}: pregunta vacía`);
      assert(entry.fallback.options?.length >= 2, `${id}: opciones insuficientes`);
      const correctOptions = entry.fallback.options.filter((option) => option.correct === true);
      assert(
        correctOptions.length > 0,
        `${id}: no declara respuesta esperada`,
      );
      if (entry.fallback.type === "single-choice") {
        assert(correctOptions.length === 1, `${id}: selección única con ${correctOptions.length} respuestas`);
        assert(
          entry.fallback.options.every((option) => option.feedback?.trim()),
          `${id}: falta retroalimentación por opción`,
        );
      }
    } else if (entry.fallback.type === "fill-blank") {
      assert(
        entry.fallback.question?.includes("_") && entry.fallback.answers?.length > 0,
        `${id}: completar espacios sin solución`,
      );
    } else if (entry.fallback.type === "matching") {
      assert(
        entry.fallback.question?.trim()
          && entry.fallback.pairs?.length > 1
          && entry.fallback.pairs.every((pair) => pair.prompt?.trim() && pair.match?.trim()),
        `${id}: correspondencias incompletas`,
      );
    } else if (entry.fallback.type === "sorting") {
      const groupedItems = entry.fallback.groups?.flatMap((group) => group.items || []) || [];
      assert(
        entry.fallback.groups?.length > 1
          && entry.fallback.groups.every((group) => group.title?.trim() && group.items?.length > 0)
          && entry.fallback.itemsPool?.length === groupedItems.length
          && new Set(entry.fallback.itemsPool).size === groupedItems.length,
        `${id}: clasificación incompleta`,
      );
    } else {
      assert(false, `${id}: tipo de fallback no reconocido ${entry.fallback.type}`);
    }
    if (entry.decision.startsWith("eligible")) {
      assert(entry.catalogEvidence.length > 0, `${id}: falta evidencia de catálogo`);
      for (const evidenceId of entry.catalogEvidence) {
        const evidence = production.contents[evidenceId];
        assert(evidence, `${id}: evidencia ${evidenceId} inexistente`);
        assert(
          evidence.mainLibrary === entry.proposedLibrary,
          `${id}: la evidencia no gobierna ${entry.proposedLibrary}`,
        );
      }
    } else if (entry.decision === "native-html-preferred") {
      assert(entry.catalogEvidence.length === 0, `${id}: HTML nativo con evidencia H5P espuria`);
      assert(
        entry.rationale.includes("HTML") || entry.rationale.includes("html") || entry.rationale.length > 100,
        `${id}: preferencia HTML sin justificación suficiente`,
      );
    } else {
      assert(false, `${id}: decisión no reconocida ${entry.decision}`);
    }
  }

  assert(!/Ma y Zhong/i.test(combined), "permanece la atribución inexistente Ma y Zhong");
  assert(!/versión H5P en preparación/i.test(combined), "permanece un marcador H5P");
  assert(!/(?:\/home\/|~\/|Nextcloud\/|Open Design\/)/.test(combined + landing), "ruta local en contenido público");
  assert(
    pages.slice(0, 12).every((page) => page.markdown.includes("{{< referencias >}}")),
    "una lección sustantiva no declara referencias",
  );
  assert(
    pages.every((page) => page.markdown.includes("{{< curso-navegacion")),
    "una lección carece de navegación del curso",
  );
  assert(
    pages.every((page) => page.featured.length > 20_000),
    "una portada de lección está ausente o vacía",
  );
  assert(
    /role="img"/.test(icapFigure)
      && /<title\b/.test(icapFigure)
      && /<desc\b/.test(icapFigure),
    "la adaptación ICAP carece de semántica SVG accesible",
  );
  assert(
    /role="img"/.test(icapMobileFigure)
      && /<title\b/.test(icapMobileFigure)
      && /<desc\b/.test(icapMobileFigure),
    "la variante móvil de ICAP carece de semántica SVG accesible",
  );
  assert(
    /Adaptación visual del marco ICAP de Chi y Wylie \(2014\)/.test(pages[0].markdown),
    "la adaptación ICAP carece de atribución visible",
  );

  const coverHashes = [...new Set(pages.map((page) => sha256(page.featured)))];
  return {
    lessons: pages.length,
    words: pages.reduce(
      (sum, page) => sum + page.markdown.split(/\s+/).filter(Boolean).length,
      0,
    ),
    native: { accordion: 23, tabs: 19, process: 14, total: 56 },
    candidates: {
      total: candidates.length,
      eligible: catalog.policy.eligibleCount,
      deferred: catalog.policy.deferredCount,
      nativeHtmlPreferred: catalog.policy.nativeHtmlPreferredCount,
      libraries: Object.fromEntries(
        Object.entries(catalog.libraryPolicies).map(([library, policy]) => [
          library,
          {
            status: policy.status,
            count: candidates.filter(([, entry]) => entry.proposedLibrary === library).length,
          },
        ]),
      ),
    },
    licenses: {
      course: "CC BY-SA 4.0",
      publicationAuthorized: false,
      interactiveEntriesChecked: candidates.length,
      h5pCandidateEntriesChecked: catalog.policy.eligibleCount,
      featuredFilesChecked: pages.length,
      originalAdaptationsChecked: 2,
      distinctFeaturedHashes: coverHashes.length,
      riseImagesAdopted: 0,
    },
  };
}

async function waitForServer(server, stderr) {
  const deadline = Date.now() + 20_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Hugo terminó antes de iniciar:\n${stderr.join("")}`);
    }
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      // El servidor aún está iniciando.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 200));
  }
  throw new Error(`Hugo no respondió en ${baseURL}`);
}

async function inspectRoute(browser, route, scenario) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    colorScheme: scenario.mode,
    reducedMotion: "reduce",
  });
  await context.addInitScript((mode) => {
    localStorage.setItem("appearance", mode);
  }, scenario.mode);
  const external = [];
  const writes = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(baseURL).origin) external.push(request.url());
    if (!["GET", "HEAD"].includes(request.method())) {
      writes.push(`${request.method()} ${request.url()}`);
    }
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  const started = Date.now();
  const response = await page.goto(new URL(route, baseURL).href, {
    waitUntil: "networkidle",
  });
  const wallMs = Date.now() - started;
  assert(response?.status() === 200, `${scenario.name} ${route}: HTTP ${response?.status()}`);

  const lessonNumber = slugs.findIndex((slug) => route.includes(`/${slug}/`)) + 1;
  const expectedActivities = lessonNumber
    ? Object.values((await readJSON(path.join(root, "data/h5p/course_candidates.json"))).candidates)
        .filter((entry) => entry.lesson === lessonNumber).length
    : 0;
  const snapshot = await page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    return {
      title: document.title,
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      htmlBytes: new Blob([document.documentElement.outerHTML]).size,
      resourceBytes: resources.reduce(
        (sum, entry) => sum + (entry.transferSize || entry.encodedBodySize || 0),
        0,
      ),
      resources: resources.length,
      h5pRuntimeRequests: resources.filter((entry) => entry.name.includes("/h5p/udgia/")).length,
      iframes: document.querySelectorAll("main iframe").length,
      activities: document.querySelectorAll("[data-course-interactive]").length,
      publicationFlags: [...document.querySelectorAll("[data-course-interactive]")]
        .map((node) => node.getAttribute("data-publication-authorized")),
      dark: document.documentElement.classList.contains("dark"),
      navLinks: document.querySelectorAll(".alm-curso-navegacion a").length,
      localStorageKeys: Object.keys(localStorage).sort(),
      cookies: document.cookie,
    };
  });
  assert(snapshot.title, `${scenario.name} ${route}: título vacío`);
  assert(snapshot.scrollWidth <= snapshot.width + 1, `${scenario.name} ${route}: overflow horizontal`);
  assert(snapshot.htmlBytes < 650_000, `${scenario.name} ${route}: HTML excesivo ${snapshot.htmlBytes}`);
  assert(snapshot.resourceBytes < 2_000_000, `${scenario.name} ${route}: recursos excesivos ${snapshot.resourceBytes}`);
  assert(snapshot.h5pRuntimeRequests === 0, `${scenario.name} ${route}: carga el runtime H5P`);
  assert(snapshot.iframes === 0, `${scenario.name} ${route}: iframe inesperado`);
  assert(snapshot.activities === expectedActivities, `${scenario.name} ${route}: prácticas ${snapshot.activities}/${expectedActivities}`);
  assert(snapshot.publicationFlags.every((value) => value === "false"), `${scenario.name} ${route}: bandera de publicación incorrecta`);
  assert(snapshot.dark === (scenario.mode === "dark"), `${scenario.name} ${route}: apariencia incorrecta`);
  assert(snapshot.cookies === "", `${scenario.name} ${route}: cookie inesperada`);
  assert(snapshot.localStorageKeys.every((key) => key === "appearance"), `${scenario.name} ${route}: persistencia inesperada ${snapshot.localStorageKeys}`);
  if (lessonNumber) assert(snapshot.navLinks === 2, `${scenario.name} ${route}: navegación incompleta`);

  const closedSummary = page
    .locator(
      "main :is(.alm-curso-interactivo, .alm-pestanas) details:not([open]) > summary:visible",
    )
    .first();
  let keyboard = "not-applicable";
  if ((await closedSummary.count()) > 0) {
    const summaryHandle = await closedSummary.elementHandle();
    assert(summaryHandle, `${scenario.name} ${route}: no se obtuvo summary para teclado`);
    await summaryHandle.focus();
    assert(
      await summaryHandle.evaluate((node) => document.activeElement === node),
      `${scenario.name} ${route}: summary no recibe foco`,
    );
    await page.keyboard.press("Space");
    assert(
      await summaryHandle.evaluate((node) => node.parentElement.open),
      `${scenario.name} ${route}: Espacio no abre details`,
    );
    await summaryHandle.dispose();
    keyboard = "details-opened-with-space";
  }

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
    ["serious", "critical"].includes(violation.impact),
  );
  assert(blockingAxe.length === 0, `${scenario.name} ${route}: axe ${JSON.stringify(blockingAxe)}`);
  assert(external.length === 0, `${scenario.name} ${route}: tráfico externo ${external}`);
  assert(writes.length === 0, `${scenario.name} ${route}: escrituras HTTP ${writes}`);
  assert(consoleErrors.length === 0, `${scenario.name} ${route}: consola ${consoleErrors}`);

  await context.close();
  return {
    route,
    scenario: scenario.name,
    wallMs,
    ...snapshot,
    keyboard,
    axe: axeResult,
    externalRequests: external.length,
    httpWrites: writes.length,
    consoleErrors: consoleErrors.length,
  };
}

async function runtimeChecks() {
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
    browser = await chromium.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox"],
    });

    const scenarios = [
      {
        name: "desktop-light",
        mode: "light",
        viewport: { width: 1440, height: 1000 },
        routes,
      },
      {
        name: "mobile-dark",
        mode: "dark",
        viewport: { width: 390, height: 844 },
        routes,
      },
      {
        name: "desktop-dark",
        mode: "dark",
        viewport: { width: 1440, height: 1000 },
        routes: [routes[0], routes[6], routes[13]],
      },
      {
        name: "mobile-light",
        mode: "light",
        viewport: { width: 390, height: 844 },
        routes: [routes[0], routes[6], routes[13]],
      },
    ];
    const inspections = [];
    for (const scenario of scenarios) {
      for (const route of scenario.routes) {
        inspections.push(await inspectRoute(browser, route, scenario));
      }
    }

    const screenshotTargets = [
      { route: routes[0], scenario: scenarios[0], name: "landing-desktop-light.webp" },
      { route: routes[6], scenario: scenarios[2], name: "leccion-6-desktop-dark.webp" },
      { route: routes[0], scenario: scenarios[1], name: "landing-mobile-dark.webp" },
      { route: routes[1], scenario: scenarios[3], name: "leccion-1-mobile-light.webp" },
      {
        route: routes[13],
        scenario: scenarios[3],
        name: "autoevaluacion-mobile-light.webp",
        fullPage: false,
      },
    ];
    for (const target of screenshotTargets) {
      const context = await browser.newContext({
        viewport: target.scenario.viewport,
        colorScheme: target.scenario.mode,
      });
      await context.addInitScript((mode) => localStorage.setItem("appearance", mode), target.scenario.mode);
      const page = await context.newPage();
      await page.goto(new URL(target.route, baseURL).href, { waitUntil: "networkidle" });
      await page.screenshot({
        path: path.join(evidenceDir, target.name),
        fullPage: target.fullPage ?? true,
        type: "webp",
        quality: 76,
      });
      const screenshotStat = await stat(path.join(evidenceDir, target.name));
      assert(
        screenshotStat.size > 1_000,
        `captura vacía o incompleta: ${target.name}`,
      );
      await context.close();
    }

    const printPath = path.join(evidenceDir, "autoevaluacion-print.pdf");
    const printContext = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: "light",
    });
    const printPage = await printContext.newPage();
    await printPage.goto(new URL(routes[13], baseURL).href, { waitUntil: "networkidle" });
    await printPage.emulateMedia({ media: "print" });
    const printVisibility = await printPage.evaluate(() => {
      const header = [...document.body.children].find(
        (node) => node.classList.contains("fixed") && node.classList.contains("inset-x-0"),
      );
      const spacer = [...document.body.children].find((node) =>
        node.classList.contains("min-h-[148px]"),
      );
      return {
        headerDisplay: header ? getComputedStyle(header).display : "absent",
        spacerDisplay: spacer ? getComputedStyle(spacer).display : "absent",
      };
    });
    assert(printVisibility.headerDisplay === "none", "la cabecera fija permanece al imprimir");
    assert(printVisibility.spacerDisplay === "none", "el separador de cabecera permanece al imprimir");
    await printPage.pdf({
      path: printPath,
      format: "A4",
      printBackground: true,
      margin: { top: "13mm", right: "12mm", bottom: "13mm", left: "12mm" },
    });
    const printStat = await stat(printPath);
    assert(printStat.size > 20_000, "el PDF de autoevaluación está vacío o incompleto");
    await printContext.close();
    const printResult = {
      file: path.relative(root, printPath),
      bytes: printStat.size,
      ...printVisibility,
    };

    const warnings = stderr
      .join("")
      .split("\n")
      .filter((line) => line.includes("WARN"));
    const unexpectedWarnings = warnings.filter(
      (warning) => !knownHugoWarnings.some((pattern) => pattern.test(warning)),
    );
    assert(unexpectedWarnings.length === 0, `advertencias Hugo nuevas: ${unexpectedWarnings}`);
    return {
      baseURL,
      inspections,
      print: printResult,
      summary: {
        scenarios: scenarios.map((scenario) => scenario.name),
        routeInspections: inspections.length,
        axeBlockingViolations: inspections.reduce(
          (sum, item) =>
            sum + item.axe.filter((violation) => ["serious", "critical"].includes(violation.impact)).length,
          0,
        ),
        axeAllViolations: inspections.reduce((sum, item) => sum + item.axe.length, 0),
        keyboardChecks: inspections.filter((item) => item.keyboard !== "not-applicable").length,
        externalRequests: inspections.reduce((sum, item) => sum + item.externalRequests, 0),
        httpWrites: inspections.reduce((sum, item) => sum + item.httpWrites, 0),
        consoleErrors: inspections.reduce((sum, item) => sum + item.consoleErrors, 0),
        maxHtmlBytes: Math.max(...inspections.map((item) => item.htmlBytes)),
        maxResourceBytes: Math.max(...inspections.map((item) => item.resourceBytes)),
        maxWallMs: Math.max(...inspections.map((item) => item.wallMs)),
      },
      hugoWarnings: warnings,
      unexpectedHugoWarnings: unexpectedWarnings,
      serverOutputTail: stdout.join("").slice(-2000),
    };
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
    await new Promise((resolvePromise) => {
      if (server.exitCode !== null) return resolvePromise();
      server.once("exit", resolvePromise);
      setTimeout(resolvePromise, 3000);
    });
  }
}

await mkdir(evidenceDir, { recursive: true });
const startedAt = new Date().toISOString();
const staticResult = await staticChecks();
const runtimeResult = await runtimeChecks();
const report = {
  schemaVersion: 1,
  status: "pass",
  startedAt,
  finishedAt: new Date().toISOString(),
  scope: "local-only-not-published",
  static: staticResult,
  runtime: runtimeResult,
  gates: {
    commit: false,
    push: false,
    publication: false,
    deployment: false,
    moodle: false,
  },
};
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(
  `PASS curso Rise: 13 lecciones, 56 prácticas; 26 HTML y 30 candidaturas H5P, ${runtimeResult.summary.routeInspections} renders, axe/teclado/licencias/rendimiento/impresión.\n${reportPath}\n`,
);
