import { chromium } from "playwright-core";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.GUIDE_BASE_URL ?? "http://127.0.0.1:4173/";
const siteRoot = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;
const route = "ia-educacion/guias/aprendizaje-hibrido-activo-disenar-actividad/";
const outputDir = process.env.GUIDE_EVIDENCE_DIR ?? "/tmp/guia-hugo-qa";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const results = [];
const axeSource = await readFile(new URL("../node_modules/axe-core/axe.min.js", import.meta.url), "utf8");

await mkdir(outputDir, { recursive: true });

for (const profile of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport: profile, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => failedRequests.push({ url: request.url(), error: request.failure()?.errorText }));

  const response = await page.goto(new URL(route, siteRoot).href, { waitUntil: "networkidle" });
  const checks = await page.evaluate(() => {
    const guide = document.querySelector(".guia-ilustrada");
    const actions = [...document.querySelectorAll(".accion-guia")].map((link) => link.getAttribute("href"));
    const svgs = [...document.querySelectorAll(".guia-ilustrada svg")];
    const overflow = [...document.querySelectorAll(".guia-ilustrada *")]
      .filter((element) => !(element instanceof SVGElement))
      .filter((element) => element.scrollWidth - element.clientWidth > 2)
      .filter((element) => getComputedStyle(element).overflowX !== "auto")
      .slice(0, 12)
      .map((element) => ({ tag: element.tagName, className: element.className?.baseVal ?? element.className, width: element.clientWidth, scrollWidth: element.scrollWidth }));
    return {
      title: document.title,
      h1: document.querySelector(".guia-ilustrada h1")?.innerText,
      guidePresent: Boolean(guide),
      featuredAlt: document.querySelector(".guide-featured img")?.getAttribute("alt") ?? "",
      actions,
      svgCount: svgs.length,
      svgMissingNames: svgs.filter((svg) => !(svg.getAttribute("aria-label") || svg.querySelector("title"))).length,
      tableCount: document.querySelectorAll(".guia-ilustrada table").length,
      caseCount: document.querySelectorAll(".guia-ilustrada .caso").length,
      hasCocreacionText: document.body.innerText.includes("Cómo se enlaza con la co-creación con IA"),
      formPresent: Boolean(document.querySelector(".plantilla-form")),
      formFields: document.querySelectorAll(".plantilla-form input, .plantilla-form textarea, .plantilla-form select").length,
      unlabeledFormFields: [...document.querySelectorAll(".plantilla-form input, .plantilla-form textarea, .plantilla-form select")]
        .filter((field) => !field.closest("label") && !field.getAttribute("aria-label") && !field.getAttribute("aria-labelledby")).length,
      formButtons: document.querySelectorAll(".plantilla-form button").length,
      formDownload: document.querySelector(".plantilla-form a[download]")?.getAttribute("href") ?? "",
      overflow,
      bodyWidth: document.body.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    };
  });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () => {
    const audit = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return audit.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
      help: violation.help,
      examples: violation.nodes.slice(0, 8).map((node) => ({ target: node.target, summary: node.failureSummary })),
    }));
  });
  const pdfResponse = await page.request.get(new URL("descargas/aprendizaje-hibrido-y-activo-disenar-una-actividad-paso-a-paso.pdf", siteRoot).href);
  const cocreacionResponse = await page.request.get(new URL("ia-educacion/constelaciones/empezar-con-ia/#cuando-aparece-la-co-creacion", siteRoot).href);
  await page.screenshot({ path: path.join(outputDir, `${profile.name}.png`), fullPage: true });
  results.push({
    profile,
    status: response?.status(),
    pdfStatus: pdfResponse.status(),
    cocreacionStatus: cocreacionResponse.status(),
    consoleErrors,
    failedRequests,
    axe,
    checks,
  });
  await context.close();
}

await browser.close();
await writeFile(path.join(outputDir, "report.json"), JSON.stringify(results, null, 2) + "\n");

for (const result of results) {
  const { checks } = result;
  const failures = [];
  if (result.status !== 200) failures.push(`HTTP ${result.status}`);
  if (result.pdfStatus !== 200) failures.push(`PDF HTTP ${result.pdfStatus}`);
  if (result.cocreacionStatus !== 200) failures.push(`co-creation HTTP ${result.cocreacionStatus}`);
  if (!checks.guidePresent) failures.push("guide missing");
  if (!checks.h1?.includes("Aprendizaje híbrido y activo")) failures.push("wrong h1");
  if (checks.svgCount !== 9 || checks.svgMissingNames !== 0) failures.push("SVG accessibility mismatch");
  if (checks.caseCount !== 10) failures.push("case count mismatch");
  if (!checks.hasCocreacionText) failures.push("co-creation bridge missing");
  if (!checks.formPresent || checks.formFields !== 40) failures.push(`form mismatch: ${checks.formFields} fields`);
  if (checks.unlabeledFormFields !== 0) failures.push(`${checks.unlabeledFormFields} unlabeled form fields`);
  if (checks.formButtons !== 1 || !checks.formDownload.endsWith(".pdf")) failures.push("form actions missing");
  if (!checks.actions.some((href) => href?.endsWith(".pdf"))) failures.push("PDF link missing");
  if (checks.bodyWidth > checks.viewportWidth + 2) failures.push("horizontal page overflow");
  if (checks.overflow.length) failures.push(`element overflow: ${JSON.stringify(checks.overflow)}`);
  if (result.consoleErrors.length) failures.push(`console: ${result.consoleErrors.join(" | ")}`);
  if (result.failedRequests.length) failures.push(`network: ${JSON.stringify(result.failedRequests)}`);
  const seriousAxe = result.axe.filter((violation) => ["serious", "critical"].includes(violation.impact));
  if (seriousAxe.length) failures.push(`axe serious/critical: ${JSON.stringify(seriousAxe)}`);
  if (failures.length) {
    console.error(`${result.profile.name}: FAIL\n- ${failures.join("\n- ")}`);
    process.exitCode = 1;
  } else {
    console.log(`${result.profile.name}: PASS — ${checks.svgCount} figuras, ${checks.tableCount} tablas, ${checks.caseCount} patrones, formulario ${checks.formFields} campos, axe ${result.axe.length} hallazgos (${result.axe.filter((v) => ["serious", "critical"].includes(v.impact)).length} serios/críticos)`);
  }
}
