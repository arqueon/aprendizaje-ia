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
    id: "direccion-epistemica-decidir-reformular",
    path: "ia-educacion/guias/agenciamiento-humano-ia/"
  },
  {
    id: "evidencias-proceso-proporcion",
    path: "ia-educacion/guias/evaluacion-formativa-ia/"
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
const governedIDs = ["runtime-probe", ...expectedIDs];
const attribution =
  "Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara";
const authorizationDecision = {
  scope: "project-editorial",
  decision: "UDGIA-010",
  decisionDate: "2026-07-28",
  evidence: "h5p/AUTHORIZATION-UDGIA-010.md"
};
const evidenceDirectory = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(repoRoot, "docs/design/evidence/udgia-004b");
const reportPath = path.join(evidenceDirectory, "qa-pilot.json");
const udgia007Activities = {
  "direccion-epistemica-decidir-reformular": {
    page: "content/ia-educacion/guias/agenciamiento-humano-ia/index.md",
    requiredTerms: ["criterio", "verificar", "decidir", "reformular"]
  },
  "evidencias-proceso-proporcion": {
    page: "content/ia-educacion/guias/evaluacion-formativa-ia/index.md",
    requiredTerms: ["esquema inicial", "verificación", "decisiones", "versión final"]
  }
};
const chromiumBinary =
  process.env.CHROMIUM_PATH || (await stat("/usr/bin/chromium").catch(() => null)
    ? "/usr/bin/chromium"
    : "");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function udgia007GovernanceAudit() {
  const catalog = JSON.parse(
    await readFile(path.join(repoRoot, "data/h5p/catalog.json"), "utf8")
  );
  const manifest = JSON.parse(
    await readFile(path.join(repoRoot, "h5p/activities/manifest.json"), "utf8")
  );
  const authorizationEvidence = await readFile(
    path.join(repoRoot, authorizationDecision.evidence),
    "utf8"
  );
  const results = {};

  assert(
    Object.keys(catalog.contents || {}).length === governedIDs.length &&
      governedIDs.every((id) => catalog.contents?.[id]),
    "UDGIA-010: el catálogo no contiene exactamente los nueve H5P gobernados"
  );
  assert(
    authorizationEvidence.includes("Fecha de decisión: 2026-07-28") &&
      authorizationEvidence.includes(`Atribución: ${attribution}`) &&
      authorizationEvidence.includes("No constituye un dictamen institucional general"),
    "UDGIA-010: la evidencia no delimita fecha, atribución y alcance editorial"
  );
  for (const id of governedIDs) {
    const entry = catalog.contents[id];
    assert(entry.contentLicense === "CC BY-SA 4.0", `${id}: licencia no autorizada`);
    assert(
      entry.licenseStatus === "authorized-project-editorial",
      `${id}: estado editorial inesperado`
    );
    assert(entry.publicationAuthorized === true, `${id}: publicación no autorizada`);
    assert(
      JSON.stringify(entry.publicationAuthorization) ===
        JSON.stringify(authorizationDecision),
      `${id}: decisión editorial sin trazabilidad completa`
    );
    assert(entry.provenance?.author === attribution, `${id}: atribución inexacta`);

    const activity = manifest.activities?.[id];
    const sourceRoot =
      id === "runtime-probe"
        ? path.join(repoRoot, "h5p/fixtures/udg-runtime-probe")
        : path.join(repoRoot, activity?.overlay || activity?.sourceRoot || "");
    assert(
      id === "runtime-probe" || activity,
      `${id}: falta la fuente gobernada en el manifiesto`
    );
    const sourceH5p = JSON.parse(
      await readFile(path.join(sourceRoot, "h5p.json"), "utf8")
    );
    const sourceContent = await readFile(
      path.join(sourceRoot, "content/content.json"),
      "utf8"
    );
    const sourceLicense = await readFile(
      path.join(sourceRoot, "LICENSE-content.txt"),
      "utf8"
    );
    assert(
      sourceH5p.license === "CC BY-SA" &&
        sourceH5p.licenseVersion === "4.0" &&
        sourceH5p.authors?.[0]?.name === attribution,
      `${id}: metadatos raíz no sincronizados`
    );
    assert(
      !/"(?:author|name)"\s*:\s*"UDGPlus"/.test(sourceContent),
      `${id}: permanece una atribución abreviada en metadatos internos`
    );
    assert(
      sourceLicense.includes(attribution) &&
        /CC BY-SA 4\.0|Creative Commons Atribución-CompartirIgual 4\.0/.test(
          sourceLicense
        ),
      `${id}: licencia fuente sin atribución exacta`
    );
  }

  for (const [id, expectation] of Object.entries(udgia007Activities)) {
    const entry = catalog.contents?.[id];
    const activity = manifest.activities?.[id];
    assert(entry, `${id}: falta la entrada de catálogo`);
    assert(activity, `${id}: falta la entrada del manifiesto`);
    assert(entry.contentLicense === "CC BY-SA 4.0", `${id}: licencia H5P inesperada`);
    assert(
      entry.licenseStatus === "authorized-project-editorial",
      `${id}: falta el estado de autorización editorial`
    );
    assert(entry.publicationAuthorized === true, `${id}: la publicación no quedó autorizada`);
    assert(entry.reportingIsEnabled === false, `${id}: el reporte debe permanecer desactivado`);
    assert(entry.fixture === false, `${id}: una actividad curricular no puede ser fixture`);
    assert(entry.adapter === "multi-choice.css", `${id}: falta el adaptador visual gobernado`);
    assert(
      entry.presentationAdapter?.policy === "formative-no-score" &&
        entry.presentationAdapter.css === "formative-no-score.css" &&
        entry.presentationAdapter.js === "formative-no-score.js",
      `${id}: falta la política gobernada que desactiva la scorebar`
    );
    assert(
      entry.provenance?.kind === "adapted-official-template",
      `${id}: procedencia H5P inesperada`
    );

    const overlayRoot = path.join(repoRoot, activity.overlay);
    const content = JSON.parse(
      await readFile(path.join(overlayRoot, "content/content.json"), "utf8")
    );
    const h5p = JSON.parse(await readFile(path.join(overlayRoot, "h5p.json"), "utf8"));
    const licenseNotice = await readFile(path.join(overlayRoot, "LICENSE-content.txt"), "utf8");
    const serialized = JSON.stringify(content).toLocaleLowerCase("es");
    const correctAnswers = content.answers.filter(({ correct }) => correct);

    assert(
      h5p.license === "CC BY-SA" && h5p.licenseVersion === "4.0",
      `${id}: h5p.json no declara CC BY-SA 4.0`
    );
    assert(h5p.authors?.[0]?.name === attribution, `${id}: autor H5P inexacto`);
    assert(
      content.media?.type?.params?.file?.copyright?.license === "CC BY-SA" &&
        content.media.type.params.file.copyright.version === "4.0" &&
        content.media.type.params.file.copyright.author === attribution &&
        content.media.type.metadata?.license === "CC BY-SA" &&
        content.media.type.metadata?.licenseVersion === "4.0" &&
        content.media.type.metadata?.authors?.[0]?.name === attribution,
      `${id}: metadatos internos de imagen no sincronizados`
    );
    assert(content.answers.length === 5, `${id}: se esperaban cinco rutas comparables`);
    assert(correctAnswers.length === 1, `${id}: debe existir una sola ruta recomendada`);
    assert(content.behaviour?.type === "single", `${id}: la decisión debe ser de ruta única`);
    assert(content.behaviour?.showScorePoints === false, `${id}: no debe mostrar puntuación`);
    for (const term of expectation.requiredTerms) {
      assert(
        correctAnswers[0].text.toLocaleLowerCase("es").includes(term),
        `${id}: la ruta recomendada no contiene ${term}`
      );
    }
    assert(!/https?:|localstorage|sessionstorage|indexeddb|fetch\(|xmlhttprequest/.test(serialized),
      `${id}: el contenido incluye red o persistencia`);
    assert(!/calificaci|puntuaci|puntaje|aprobad|reprobad/.test(serialized),
      `${id}: el contenido introduce lenguaje sumativo`);
    assert(
      /CC BY-SA 4\.0/.test(licenseNotice) &&
        /UDGIA-010/.test(licenseNotice) &&
        /2026-07-28/.test(licenseNotice) &&
        /no constituye un dictamen institucional general/i.test(licenseNotice),
      `${id}: el aviso editorial no documenta licencia, decisión, fecha y alcance`
    );

    const pageSource = await readFile(path.join(repoRoot, expectation.page), "utf8");
    const shortcodeMatches =
      pageSource.match(new RegExp(`h5p id="${id}"`, "g")) || [];
    assert(shortcodeMatches.length === 1, `${id}: integración de página no única`);
    assert(
      pageSource.includes("no genera una calificación") &&
        pageSource.includes("no registra el intento"),
      `${id}: la página no explica el carácter formativo y efímero`
    );
    results[id] = {
      page: expectation.page,
      contentLicense: entry.contentLicense,
      licenseStatus: entry.licenseStatus,
      publicationAuthorized: entry.publicationAuthorized,
      reportingIsEnabled: entry.reportingIsEnabled,
      answerCount: content.answers.length,
      correctAnswerCount: correctAnswers.length,
      showScorePoints: content.behaviour.showScorePoints
    };
  }
  return results;
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
          section?.querySelector(".udg-h5p__fallback-body")?.textContent.trim().length || 0,
        contentLicense: section?.dataset.contentLicense || "",
        licenseStatus: section?.dataset.licenseStatus || "",
        publicationAuthorized: section?.dataset.publicationAuthorized || ""
      };
    }, activity.id);
    assert(result.scrollWidth <= result.width, `${activity.id}: overflow móvil`);
    assert(result.fallbackLength > 180, `${activity.id}: fallback insuficiente`);
    assert(
      result.contentLicense === "CC BY-SA 4.0",
      `${activity.id}: licencia no emitida en la ruta`
    );
    assert(
      result.licenseStatus === "authorized-project-editorial",
      `${activity.id}: estado editorial no emitido en la ruta`
    );
    assert(
      result.publicationAuthorized === "true",
      `${activity.id}: autorización de publicación no emitida en la ruta`
    );
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
    if (
      activityID === "direccion-epistemica-decidir-reformular" ||
      activityID === "evidencias-proceso-proporcion"
    ) {
      const alternatives = [...document.querySelectorAll(".h5p-alternative-container")];
      const image = visibleImages.reduce(
        (best, current) => (current.width > best.width ? current : best),
        { width: 0, height: 0, ratio: 0 }
      );
      const bodyText = document.body.innerText.toLocaleLowerCase("es");
      audit.checks = {
        answerCountIsFive: alternatives.length === 5,
        answersStyled: alternatives.every((element) => {
          const style = getComputedStyle(element);
          return style.backgroundColor !== "rgb(221, 221, 221)" &&
            Number.parseFloat(style.borderRadius) >= 8;
        }),
        imageReadable: image.width >= root.clientWidth * 0.72,
        scenarioVisible:
          activityID === "direccion-epistemica-decidir-reformular"
            ? bodyText.includes("dirección epistémica") && bodyText.includes("mejor iteración")
            : bodyText.includes("paquete mínimo suficiente") && bodyText.includes("vigilancia")
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

async function exerciseUDGIA007Decision(playerFrame, id) {
  const scorebarSnapshot = () =>
    playerFrame.evaluate(() => {
      const nodes = [
        ...document.querySelectorAll(
          ".h5p-question-scorebar, .h5p-question-scorebar-container"
        )
      ];
      const bodyText = document.body.innerText.toLocaleLowerCase("es");
      return {
        nodeCount: nodes.length,
        visibleClassCount: document.querySelectorAll(
          ".h5p-question-scorebar.h5p-question-visible"
        ).length,
        visibleCount: nodes.filter((element) => {
          const style = getComputedStyle(element);
          const box = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number.parseFloat(style.opacity) !== 0 &&
            box.width > 0 &&
            box.height > 0
          );
        }).length,
        scoreLanguagePresent:
          /\b1\s*\/\s*1\b|obtuviste|puntos|puntaje|puntuación/.test(bodyText)
      };
    });
  const assertScorebarAbsent = (snapshot, stage) => {
    assert(
      snapshot.nodeCount === 0 &&
        snapshot.visibleClassCount === 0 &&
        snapshot.visibleCount === 0 &&
        snapshot.scoreLanguagePresent === false,
      `${id}: scorebar o lenguaje de puntuación presente ${stage} ${JSON.stringify(snapshot)}`
    );
  };

  const answers = playerFrame.locator(".h5p-answer");
  assert((await answers.count()) === 5, `${id}: no aparecieron cinco rutas`);
  await answers.nth(1).click();
  await playerFrame.locator(".h5p-question-check-answer").click();
  await playerFrame.waitForTimeout(250);
  const wrongFeedback = (await playerFrame.locator("body").innerText()).toLocaleLowerCase("es");
  const wrongScorebar = await scorebarSnapshot();
  assertScorebarAbsent(wrongScorebar, "tras una ruta insuficiente");
  assert(
    id === "direccion-epistemica-decidir-reformular"
      ? wrongFeedback.includes("editar la forma no resuelve")
      : wrongFeedback.includes("ligera, pero insuficiente"),
    `${id}: no apareció retroalimentación específica para la ruta insuficiente`
  );
  await playerFrame.locator(".h5p-question-try-again").click();
  await answers.nth(0).click();
  await playerFrame.locator(".h5p-question-check-answer").click();
  await playerFrame.waitForTimeout(250);
  const correctFeedback = (await playerFrame.locator("body").innerText()).toLocaleLowerCase("es");
  const correctScorebar = await scorebarSnapshot();
  assertScorebarAbsent(correctScorebar, "tras la ruta recomendada");
  assert(
    id === "direccion-epistemica-decidir-reformular"
      ? correctFeedback.includes("conserva la dirección epistémica")
      : correctFeedback.includes("suficiente y proporcional"),
    `${id}: no apareció retroalimentación para la ruta recomendada`
  );
  assert(
    !correctFeedback.includes("obtuviste") && !correctFeedback.includes("puntos"),
    `${id}: la interacción mostró una puntuación sumativa`
  );
  return {
    wrongFeedbackVerified: true,
    correctFeedbackVerified: true,
    scoreLanguageAbsent: true,
    scorebarAbsent: {
      afterWrongAnswer: wrongScorebar,
      afterCorrectAnswer: correctScorebar
    }
  };
}

async function storageSnapshot(page) {
  return page.evaluate(async () => {
    const sortedEntries = (storage) =>
      Object.keys(storage)
        .sort()
        .map((key) => [key, storage.getItem(key)]);
    return {
      localStorage: sortedEntries(localStorage),
      sessionStorage: sortedEntries(sessionStorage),
      indexedDB:
        typeof indexedDB.databases === "function"
          ? (await indexedDB.databases()).map((database) => database.name || "").sort()
          : [],
      cacheStorage: "caches" in window ? (await caches.keys()).sort() : [],
      serviceWorkers:
        "serviceWorker" in navigator
          ? (await navigator.serviceWorker.getRegistrations())
              .map((registration) => registration.scope)
              .sort()
          : []
    };
  });
}

async function captureUDGIA007Evidence(page, section, id) {
  await section.evaluate((element) => {
    const fixedHeader = [...document.querySelectorAll("body *")].find((candidate) => {
      const style = getComputedStyle(candidate);
      return style.position === "fixed" && candidate.querySelector(".main-menu");
    });
    const headerHeight = fixedHeader?.getBoundingClientRect().height || 0;
    const sectionTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      left: 0,
      top: Math.max(0, sectionTop - headerHeight - 16),
      behavior: "instant"
    });
  });
  await page.waitForTimeout(150);
  const geometry = await section.evaluate((element) => {
    const fixedHeader = [...document.querySelectorAll("body *")].find((candidate) => {
      const style = getComputedStyle(candidate);
      const box = candidate.getBoundingClientRect();
      return (
        style.position === "fixed" &&
        candidate.querySelector(".main-menu") &&
        box.width > 0 &&
        box.height > 0
      );
    });
    const sectionBox = element.getBoundingClientRect();
    const headerBox = fixedHeader?.getBoundingClientRect();
    const overlap = headerBox
      ? !(
          headerBox.right <= sectionBox.left ||
          headerBox.left >= sectionBox.right ||
          headerBox.bottom <= sectionBox.top ||
          headerBox.top >= sectionBox.bottom
        )
      : false;
    return {
      scrollX: window.scrollX,
      viewportWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      fixedHeaderPresent: Boolean(fixedHeader),
      fixedHeader: headerBox
        ? {
            top: headerBox.top,
            bottom: headerBox.bottom,
            width: headerBox.width,
            height: headerBox.height
          }
        : null,
      section: {
        top: sectionBox.top,
        bottom: sectionBox.bottom,
        width: sectionBox.width,
        height: sectionBox.height
      },
      overlapsAtActivityEntry: overlap
    };
  });
  assert(geometry.fixedHeaderPresent, `${id}: no se localizó la cabecera fija para auditarla`);
  assert(geometry.scrollX === 0, `${id}: la página quedó desplazada horizontalmente`);
  assert(
    geometry.pageScrollWidth <= geometry.viewportWidth,
    `${id}: la página tiene overflow horizontal`
  );
  assert(
    geometry.overlapsAtActivityEntry === false,
    `${id}: la cabecera fija tapa la actividad en el viewport ${JSON.stringify(geometry)}`
  );
  await page.screenshot({
    path: path.join(evidenceDirectory, `${id}-viewport.png`)
  });

  await page.evaluate(() => {
    const fixedHeader = [...document.querySelectorAll("body *")].find((candidate) => {
      const style = getComputedStyle(candidate);
      return style.position === "fixed" && candidate.querySelector(".main-menu");
    });
    if (fixedHeader) {
      fixedHeader.dataset.udgiaQaPreviousVisibility = fixedHeader.style.visibility || "";
      fixedHeader.style.visibility = "hidden";
      fixedHeader.dataset.udgiaQaHidden = "true";
    }
  });
  await section.screenshot({
    path: path.join(evidenceDirectory, `${id}.png`)
  });
  await page.evaluate(() => {
    const fixedHeader = document.querySelector("[data-udgia-qa-hidden='true']");
    if (!fixedHeader) return;
    fixedHeader.style.visibility = fixedHeader.dataset.udgiaQaPreviousVisibility || "";
    delete fixedHeader.dataset.udgiaQaPreviousVisibility;
    delete fixedHeader.dataset.udgiaQaHidden;
  });
  return {
    ...geometry,
    sectionScreenshotFixedHeaderHidden: true,
    viewportScreenshot: `${id}-viewport.png`
  };
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
  const storageBefore = await storageSnapshot(page);

  const activities = [];
  for (const activity of activityPages) {
    const storageBeforeActivity = udgia007Activities[activity.id]
      ? await storageSnapshot(page)
      : null;
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
    await playerFrame.waitForFunction(
      () =>
        [...document.querySelectorAll("*")].some((element) => {
          const background = getComputedStyle(element).backgroundImage;
          return (
            ["IMG", "SVG", "CANVAS", "PICTURE"].includes(element.tagName.toUpperCase()) ||
            (background && background !== "none" && background.includes("url("))
          );
        }),
      null,
      { timeout: 5000 }
    );
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
    const formativeDecision = udgia007Activities[activity.id]
      ? await exerciseUDGIA007Decision(playerFrame, activity.id)
      : null;
    let overlapAudit = null;
    if (udgia007Activities[activity.id]) {
      overlapAudit = await captureUDGIA007Evidence(page, section, activity.id);
    } else {
      await section.screenshot({
        path: path.join(evidenceDirectory, `${activity.id}.png`)
      });
    }
    const storageAfterActivity = udgia007Activities[activity.id]
      ? await storageSnapshot(page)
      : null;
    if (storageBeforeActivity) {
      assert(
        JSON.stringify(storageAfterActivity) === JSON.stringify(storageBeforeActivity),
        `${activity.id}: alteró almacenamiento ${JSON.stringify({
          before: storageBeforeActivity,
          after: storageAfterActivity
        })}`
      );
    }
    activities.push({
      ...activity,
      height,
      inner,
      visual,
      violations,
      formativeDecision,
      overlapAudit,
      storage: storageBeforeActivity
        ? { before: storageBeforeActivity, after: storageAfterActivity }
        : null
    });
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
  const storageAfter = await storageSnapshot(page);
  assert(
    JSON.stringify(storageAfter) === JSON.stringify(storageBefore),
    `Las actividades alteraron almacenamiento ${JSON.stringify({
      before: storageBefore,
      after: storageAfter
    })}`
  );
  await context.close();
  return {
    activities,
    preview,
    externalRequests,
    writeRequests,
    consoleErrors,
    storage: {
      before: storageBefore,
      after: storageAfter
    }
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
    udgia007Governance: await udgia007GovernanceAudit(),
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
