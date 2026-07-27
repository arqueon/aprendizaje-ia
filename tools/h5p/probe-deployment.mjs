import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

function cliValue(flag) {
  const index = process.argv.indexOf(flag);
  return index === -1 ? "" : process.argv[index + 1] || "";
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalizedBaseURL(rawValue) {
  const value = String(rawValue || "").trim();
  assert(value, "Falta la URL. Usa: npm run qa:h5p:deployment -- https://sitio/ruta/");
  const url = new URL(value);
  assert(["http:", "https:"].includes(url.protocol), `Protocolo no permitido: ${url.protocol}`);
  url.search = "";
  url.hash = "";
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url;
}

function isLoopback(url) {
  return ["127.0.0.1", "localhost", "::1"].includes(url.hostname);
}

function withinBase(candidate, baseURL) {
  const url = new URL(candidate);
  return url.origin === baseURL.origin && url.pathname.startsWith(baseURL.pathname);
}

function assetURL(baseURL, relative) {
  return new URL(relative.replace(/^\/+/, ""), baseURL);
}

function browserOptions() {
  const executablePath =
    process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : "");
  const options = {
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"]
  };
  if (executablePath) options.executablePath = executablePath;
  return options;
}

async function frameWithSelector(page, selector) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    for (const frame of page.frames()) {
      if (await frame.locator(selector).count()) return frame;
    }
    await page.waitForTimeout(100);
  }
  throw new Error(`No apareció ${selector} dentro del H5P desplegado`);
}

async function storageSnapshot(page) {
  return page.evaluate(async () => ({
    localStorage: Object.keys(localStorage)
      .sort()
      .map((key) => [key, localStorage.getItem(key)]),
    sessionStorage: Object.keys(sessionStorage)
      .sort()
      .map((key) => [key, sessionStorage.getItem(key)]),
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
  }));
}

async function inspectResource(baseURL, definition) {
  const requestedURL = assetURL(baseURL, definition.path);
  const response = await fetch(requestedURL, {
    redirect: "follow",
    headers: { Accept: definition.accept || "*/*" }
  });
  const body = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "";
  assert(response.status === 200, `${definition.path}: HTTP ${response.status}`);
  assert(withinBase(response.url, baseURL), `${definition.path}: redirección fuera de la base`);
  assert(
    definition.contentType.test(contentType),
    `${definition.path}: Content-Type inesperado ${JSON.stringify(contentType)}`
  );
  assert(body.byteLength > 0, `${definition.path}: respuesta vacía`);
  return {
    path: definition.path,
    finalURL: response.url,
    status: response.status,
    contentType,
    bytes: body.byteLength,
    sha256: sha256(body),
    cacheControl: response.headers.get("cache-control") || "",
    xContentTypeOptions: response.headers.get("x-content-type-options") || "",
    referrerPolicy: response.headers.get("referrer-policy") || "",
    contentSecurityPolicy: response.headers.get("content-security-policy") || "",
    xFrameOptions: response.headers.get("x-frame-options") || ""
  };
}

async function rangeProbe(baseURL) {
  const url = assetURL(baseURL, "h5p/udgia/v1/player/main.bundle.js");
  const response = await fetch(url, {
    redirect: "follow",
    headers: { Range: "bytes=0-0" }
  });
  await response.arrayBuffer();
  return {
    status: response.status,
    acceptRanges: response.headers.get("accept-ranges") || "",
    contentRange: response.headers.get("content-range") || ""
  };
}

async function functionalProbe(baseURL) {
  const browser = await chromium.launch(browserOptions());
  const context = await browser.newContext({
    viewport: { width: 375, height: 844 },
    reducedMotion: "reduce",
    colorScheme: "dark"
  });
  const externalRequests = [];
  const writeRequests = [];
  const consoleErrors = [];
  const runtimeRequests = [];

  context.on("request", (request) => {
    const requestURL = new URL(request.url());
    if (!["data:", "blob:"].includes(requestURL.protocol)) {
      if (requestURL.origin !== baseURL.origin) externalRequests.push(request.url());
      if (requestURL.pathname.includes("/h5p/udgia/v1/")) {
        runtimeRequests.push(requestURL.pathname);
      }
    }
    if (!["GET", "HEAD"].includes(request.method())) {
      writeRequests.push({ method: request.method(), url: request.url() });
    }
  });

  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  try {
    const fixtureURL = assetURL(baseURL, "laboratorio/h5p-runtime/");
    const response = await page.goto(fixtureURL.href, { waitUntil: "load" });
    assert(response?.status() === 200, `Fixture desplegada: HTTP ${response?.status()}`);
    assert(withinBase(page.url(), baseURL), "La fixture redirigió fuera de la base de publicación");
    assert(
      (await page.locator('meta[name="robots"]').getAttribute("content")) === "noindex, nofollow",
      "La fixture técnica perdió noindex,nofollow"
    );
    await page.waitForTimeout(500);
    assert(
      !runtimeRequests.some((request) => request.endsWith("/player/main.bundle.js")),
      "El servidor descargó el player antes de activar el H5P"
    );

    await page.evaluate(() => {
      localStorage.setItem("udgia-deployment-probe-local", "preservar");
      sessionStorage.setItem("udgia-deployment-probe-session", "preservar");
    });
    const storageBefore = await storageSnapshot(page);

    const first = page.locator("[data-udg-h5p]").first();
    await first.locator('[data-h5p-action="load"]').click();
    await page.waitForFunction(
      () => document.querySelector("[data-udg-h5p]")?.dataset.state === "ready",
      null,
      { timeout: 20000 }
    );
    const firstIframeURL = await first
      .locator(".udg-h5p__iframe")
      .evaluate((element) => element.src);
    assert(withinBase(firstIframeURL, baseURL), "El iframe H5P salió de la base de publicación");

    const contentFrame = await frameWithSelector(page, ".udg-runtime-probe");
    await contentFrame.locator(".udg-runtime-probe__button").focus();
    await contentFrame.press(".udg-runtime-probe__button", "Enter");
    assert(
      await contentFrame.locator(".udg-runtime-probe__feedback").isVisible(),
      "La interacción H5P desplegada no respondió al teclado"
    );

    const firstHeight = Number.parseFloat(
      await first.locator(".udg-h5p__iframe").evaluate((element) => element.style.height)
    );
    assert(firstHeight > 280 && firstHeight <= 6000, `Altura H5P inválida: ${firstHeight}`);

    const second = page.locator("[data-udg-h5p]").nth(1);
    await second.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => document.querySelectorAll('[data-udg-h5p][data-state="ready"]').length === 2,
      null,
      { timeout: 20000 }
    );
    assert(
      (await page.locator(".udg-h5p__iframe").count()) === 2,
      "El servidor no sostuvo dos montajes H5P independientes"
    );

    const storageAfter = await storageSnapshot(page);
    assert(
      JSON.stringify(storageAfter) === JSON.stringify(storageBefore),
      "El runtime desplegado modificó el almacenamiento del origen"
    );
    assert(writeRequests.length === 0, `Solicitudes de escritura: ${JSON.stringify(writeRequests)}`);
    assert(
      externalRequests.length === 0,
      `Solicitudes fuera del origen: ${externalRequests.join(", ")}`
    );
    assert(consoleErrors.length === 0, `Errores de consola: ${consoleErrors.join(" | ")}`);

    await page.emulateMedia({ media: "print" });
    assert(
      await first.locator(".udg-h5p__fallback").isVisible(),
      "La alternativa accesible no permanece visible al imprimir"
    );

    const cookies = await context.cookies();
    return {
      fixtureURL: fixtureURL.href,
      firstIframeURL,
      firstHeight,
      twoIndependentMounts: true,
      keyboardFeedback: true,
      printFallback: true,
      storageUnchanged: true,
      externalRequests,
      writeRequests,
      consoleErrors,
      cookies: cookies.map(({ name, domain, path: cookiePath, secure, sameSite }) => ({
        name,
        domain,
        path: cookiePath,
        secure,
        sameSite
      }))
    };
  } finally {
    await context.close();
    await browser.close();
  }
}

const positionalURL = process.argv.slice(2).find((argument) => !argument.startsWith("-"));
const baseURL = normalizedBaseURL(
  cliValue("--url") || process.env.DEPLOYMENT_URL || positionalURL
);
const allowHTTP = process.argv.includes("--allow-http") || process.env.ALLOW_HTTP === "true";
const reportPath = cliValue("--report") || process.env.DEPLOYMENT_REPORT || "";
const report = {
  schemaVersion: 1,
  status: "RUNNING",
  baseURL: baseURL.href,
  checkedAt: new Date().toISOString(),
  requirements: {
    providerIndependent: true,
    staticHosting: true,
    sameOriginRuntime: true,
    rootOrSubpath: true
  },
  resources: [],
  warnings: [],
  errors: []
};

let exitCode = 0;
try {
  assert(
    baseURL.protocol === "https:" || (allowHTTP && isLoopback(baseURL)),
    "Producción requiere HTTPS; --allow-http sólo se admite para una sonda loopback"
  );

  const resources = [
    { path: "", contentType: /^text\/html\b/i, accept: "text/html" },
    {
      path: "laboratorio/h5p-runtime/",
      contentType: /^text\/html\b/i,
      accept: "text/html"
    },
    {
      path: "h5p/udgia/v1/host.js",
      contentType: /^(text|application)\/javascript\b/i
    },
    { path: "h5p/udgia/v1/host.css", contentType: /^text\/css\b/i },
    { path: "h5p/udgia/v1/embed.html", contentType: /^text\/html\b/i },
    { path: "h5p/udgia/v1/content-index.json", contentType: /^application\/json\b/i },
    {
      path: "h5p/udgia/v1/player/main.bundle.js",
      contentType: /^(text|application)\/javascript\b/i
    },
    { path: "h5p/udgia/v1/player/styles/h5p.css", contentType: /^text\/css\b/i },
    {
      path: "h5p/udgia/v1/content/runtime-probe/content/content.json",
      contentType: /^application\/json\b/i
    },
    {
      path: "h5p/udgia/v1/content/runtime-probe/content/images/runtime-probe.svg",
      contentType: /^image\/svg\+xml\b/i
    },
    { path: "fonts/piazzolla-variable.woff2", contentType: /^font\/woff2\b/i }
  ];
  for (const resource of resources) {
    report.resources.push(await inspectResource(baseURL, resource));
  }

  const embedURL = assetURL(baseURL, "h5p/udgia/v1/embed.html");
  embedURL.searchParams.set("content", "runtime-probe");
  embedURL.searchParams.set("instance", "deployment-probe");
  const embedResponse = await fetch(embedURL, { redirect: "follow" });
  assert(embedResponse.status === 200, `Iframe con query: HTTP ${embedResponse.status}`);
  assert(withinBase(embedResponse.url, baseURL), "El servidor perdió o redirigió la query H5P");
  const finalEmbedURL = new URL(embedResponse.url);
  assert(
    finalEmbedURL.searchParams.get("content") === "runtime-probe" &&
      finalEmbedURL.searchParams.get("instance") === "deployment-probe",
    "El servidor descartó los parámetros content/instance del iframe H5P"
  );
  await embedResponse.arrayBuffer();

  const missingAssetURL = assetURL(
    baseURL,
    "h5p/udgia/v1/__udgia_missing_asset_probe__.js"
  );
  const missingAssetResponse = await fetch(missingAssetURL, {
    redirect: "manual"
  });
  report.missingAsset = {
    url: missingAssetURL.href,
    status: missingAssetResponse.status,
    location: missingAssetResponse.headers.get("location") || ""
  };
  await missingAssetResponse.arrayBuffer();
  assert(
    missingAssetResponse.status === 404,
    `Un activo H5P inexistente respondió ${missingAssetResponse.status}; no debe reescribirse a HTML`
  );

  const embedHeaders = report.resources.find(
    (resource) => resource.path === "h5p/udgia/v1/embed.html"
  );
  if (/^deny$/i.test(embedHeaders.xFrameOptions)) {
    throw new Error("X-Frame-Options: DENY impide el iframe H5P de mismo origen");
  }
  if (/frame-ancestors\s+'none'/i.test(embedHeaders.contentSecurityPolicy)) {
    throw new Error("La CSP HTTP usa frame-ancestors 'none' y bloquea el iframe H5P");
  }

  report.range = await rangeProbe(baseURL);
  if (report.range.status !== 206) {
    report.warnings.push(
      "El servidor no respondió 206 a Range; será obligatorio corregirlo antes de H5P con audio o video."
    );
  }
  const immutableAssets = report.resources.filter((resource) =>
    [
      "h5p/udgia/v1/host.js",
      "h5p/udgia/v1/host.css",
      "h5p/udgia/v1/embed.html",
      "h5p/udgia/v1/player/"
    ].some((prefix) => resource.path.startsWith(prefix))
  );
  if (
    immutableAssets.some(
      (resource) => !/max-age=\d+/i.test(resource.cacheControl) || !/immutable/i.test(resource.cacheControl)
    )
  ) {
    report.warnings.push(
      "Los activos versionados H5P no usan todavía Cache-Control con max-age e immutable."
    );
  }
  if (
    report.resources.some(
      (resource) => resource.xContentTypeOptions.toLowerCase() !== "nosniff"
    )
  ) {
    report.warnings.push(
      "Falta X-Content-Type-Options: nosniff en una o más respuestas; se recomienda en el servidor oficial."
    );
  }
  if (
    report.resources.some(
      (resource) =>
        resource.referrerPolicy.toLowerCase() !== "strict-origin-when-cross-origin"
    )
  ) {
    report.warnings.push(
      "Falta Referrer-Policy: strict-origin-when-cross-origin en una o más respuestas."
    );
  }

  report.functional = await functionalProbe(baseURL);
  if (report.functional.cookies.length) {
    report.warnings.push(
      "El origen emitió cookies de infraestructura; deben revisarse antes del despliegue oficial."
    );
  }
  report.status = "PASS";
} catch (error) {
  report.status = "FAIL";
  report.errors.push(error instanceof Error ? error.message : String(error));
  exitCode = 1;
}

if (reportPath) {
  const absoluteReportPath = path.resolve(reportPath);
  await mkdir(path.dirname(absoluteReportPath), { recursive: true });
  await writeFile(absoluteReportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = exitCode;
