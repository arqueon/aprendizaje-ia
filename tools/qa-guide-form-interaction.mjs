import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const siteRoot = process.env.GUIDE_BASE_URL ?? "http://127.0.0.1:4173/";
const guideURL = new URL("ia-educacion/guias/aprendizaje-hibrido-activo-disenar-actividad/#plantilla-titulo", siteRoot);
await page.goto(guideURL.href, { waitUntil: "networkidle" });
const name = page.locator('input[name="actividad_nombre"]');
const objective = page.locator('textarea[name="objetivo"]');
await name.fill("Actividad de prueba");
await objective.fill("Comparará dos explicaciones con criterios explícitos.");
if (await name.inputValue() !== "Actividad de prueba") throw new Error("input did not retain value");
if (!(await objective.inputValue()).includes("Comparará")) throw new Error("textarea did not retain value");
await page.locator("#plantilla-titulo").scrollIntoViewIfNeeded();
await page.screenshot({ path: "/tmp/guia-hugo-form-mobile-interaction.png", fullPage: false });
await page.locator('button[type="reset"]').click();
if (await name.inputValue() !== "" || await objective.inputValue() !== "") throw new Error("reset failed");
const formRequests = [];
page.on("request", (request) => {
  if (!["document", "stylesheet", "script", "image", "font"].includes(request.resourceType())) formRequests.push(request.url());
});
await name.fill("Sin envío");
await page.waitForTimeout(250);
if (formRequests.length) throw new Error(`unexpected network: ${formRequests.join(", ")}`);
console.log("Formulario web PASS: escritura, conservación local, reinicio y 0 envíos de datos");
await browser.close();
