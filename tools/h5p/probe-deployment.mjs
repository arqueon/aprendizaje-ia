import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "../..");
const RUNTIME_ROOT = path.join(REPOSITORY_ROOT, "static/h5p/udgia/v1");
const FETCH_TIMEOUT_MS = 10000;
const MAX_REDIRECTS = 5;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

class UsageError extends Error {}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function requireArgumentValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new UsageError(`${flag} requiere un valor`);
  }
  return value;
}

function reportPathHint(argv) {
  const index = argv.indexOf("--report");
  if (index !== -1 && argv[index + 1] && !argv[index + 1].startsWith("--")) {
    return argv[index + 1];
  }
  return process.env.DEPLOYMENT_REPORT || "";
}

function parseArguments(argv) {
  let url = "";
  let reportPath = "";
  let allowHTTP = false;
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--url") {
      if (url) throw new UsageError("--url sólo puede indicarse una vez");
      url = requireArgumentValue(argv, index, "--url");
      index += 1;
    } else if (argument === "--report") {
      if (reportPath) throw new UsageError("--report sólo puede indicarse una vez");
      reportPath = requireArgumentValue(argv, index, "--report");
      index += 1;
    } else if (argument === "--allow-http") {
      if (allowHTTP) throw new UsageError("--allow-http sólo puede indicarse una vez");
      allowHTTP = true;
    } else if (argument.startsWith("-")) {
      throw new UsageError(`Opción desconocida: ${argument}`);
    } else {
      positional.push(argument);
    }
  }

  if (positional.length > 1) {
    throw new UsageError("Sólo se admite una URL posicional");
  }
  if (url && positional.length) {
    throw new UsageError("Usa --url o una URL posicional, no ambas");
  }

  return {
    rawURL: url || positional[0] || process.env.DEPLOYMENT_URL || "",
    reportPath: reportPath || process.env.DEPLOYMENT_REPORT || "",
    allowHTTP: allowHTTP || process.env.ALLOW_HTTP === "true"
  };
}

function normalizedBaseURL(rawValue) {
  const value = String(rawValue || "").trim();
  if (!value) {
    throw new UsageError(
      "Falta la URL. Usa: npm run qa:h5p:deployment -- https://sitio/ruta/"
    );
  }

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new UsageError("La URL de despliegue no es válida");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new UsageError(`Protocolo no permitido: ${url.protocol}`);
  }
  if (url.username || url.password) {
    throw new UsageError("La URL no debe contener credenciales");
  }
  if (url.search || url.hash) {
    throw new UsageError("La URL base no debe contener query string ni fragmento");
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url;
}

function isLoopback(url) {
  const hostname = url.hostname.replace(/^\[|\]$/g, "");
  return ["127.0.0.1", "localhost", "::1"].includes(hostname);
}

function withinBase(candidate, baseURL) {
  const url = new URL(candidate, baseURL);
  return (
    url.origin === baseURL.origin &&
    (url.pathname === baseURL.pathname.slice(0, -1) ||
      url.pathname.startsWith(baseURL.pathname))
  );
}

function assertSafeURL(candidate, baseURL, label) {
  const url = new URL(candidate, baseURL);
  assert(!url.username && !url.password, `${label}: URL con credenciales`);
  assert(["http:", "https:"].includes(url.protocol), `${label}: protocolo no permitido`);
  assert(withinBase(url, baseURL), `${label}: URL fuera del origen o subruta`);
  return url;
}

function assertExpectedQuery(url, expectedQuery, label) {
  if (!expectedQuery) return;
  for (const [name, value] of Object.entries(expectedQuery)) {
    assert(
      url.searchParams.get(name) === value,
      `${label}: se perdió o alteró el parámetro ${name}`
    );
  }
}

function assetURL(baseURL, relative) {
  return new URL(relative.replace(/^\/+/, ""), baseURL);
}

async function fetchWithinBase(
  baseURL,
  input,
  {
    accept = "",
    headers = {},
    expectedQuery = null,
    label = "Recurso",
    timeoutMs = FETCH_TIMEOUT_MS
  } = {}
) {
  let currentURL = assertSafeURL(input, baseURL, label);
  assertExpectedQuery(currentURL, expectedQuery, label);
  const redirects = [];

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    let response;
    try {
      response = await fetch(currentURL, {
        redirect: "manual",
        headers: {
          ...(accept ? { Accept: accept } : {}),
          ...headers
        },
        signal: AbortSignal.timeout(timeoutMs)
      });
    } catch (error) {
      const reason =
        error instanceof Error && /timeout|abort/i.test(`${error.name} ${error.message}`)
          ? `agotó ${timeoutMs} ms`
          : "falló la solicitud";
      throw new Error(`${label}: ${reason}`);
    }

    if (!REDIRECT_STATUSES.has(response.status)) {
      assertExpectedQuery(currentURL, expectedQuery, label);
      return {
        response,
        finalURL: currentURL.href,
        redirects
      };
    }

    const location = response.headers.get("location");
    assert(location, `${label}: redirección ${response.status} sin Location`);
    assert(hop < MAX_REDIRECTS, `${label}: excedió ${MAX_REDIRECTS} redirecciones`);
    const nextURL = assertSafeURL(new URL(location, currentURL), baseURL, label);
    assertExpectedQuery(nextURL, expectedQuery, label);
    redirects.push({
      status: response.status,
      from: currentURL.href,
      to: nextURL.href
    });
    currentURL = nextURL;
  }

  throw new Error(`${label}: redirección no resuelta`);
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

async function configureNetworkGuard(
  context,
  baseURL,
  blockedRequests,
  blockedWebSockets
) {
  await context.route("**/*", async (route) => {
    const requestURL = new URL(route.request().url());
    if (
      ["http:", "https:"].includes(requestURL.protocol) &&
      !withinBase(requestURL, baseURL)
    ) {
      blockedRequests.push(route.request().url());
      await route.abort("blockedbyclient");
      return;
    }
    await route.continue();
  });
  await context.routeWebSocket(
    (url) => ["ws:", "wss:"].includes(url.protocol),
    async (webSocketRoute) => {
      const socketURL = new URL(webSocketRoute.url());
      if (!withinBase(socketURL, baseURL)) {
        blockedWebSockets.push(webSocketRoute.url());
        await webSocketRoute.close({
          code: 1008,
          reason: "UDGIA deployment probe: outside publication base"
        });
        return;
      }
      webSocketRoute.connectToServer();
    }
  );
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
  const { response, finalURL, redirects } = await fetchWithinBase(baseURL, requestedURL, {
    accept: definition.accept || "*/*",
    label: definition.path || "Raíz del sitio"
  });
  const body = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "";
  assert(response.status === 200, `${definition.path || "/"}: HTTP ${response.status}`);
  assert(
    definition.contentType.test(contentType),
    `${definition.path || "/"}: Content-Type inesperado ${JSON.stringify(contentType)}`
  );
  assert(body.byteLength > 0, `${definition.path || "/"}: respuesta vacía`);
  return {
    path: definition.path,
    cachePolicy: definition.cachePolicy || "neutral",
    finalURL,
    redirects,
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

function safeManifestPath(relativePath) {
  assert(typeof relativePath === "string" && relativePath.length > 0, "Manifiesto: ruta vacía");
  assert(!relativePath.includes("\0"), "Manifiesto: ruta con byte nulo");
  assert(!path.posix.isAbsolute(relativePath), `Manifiesto: ruta absoluta ${relativePath}`);
  const normalized = path.posix.normalize(relativePath);
  assert(
    normalized === relativePath && normalized !== ".." && !normalized.startsWith("../"),
    `Manifiesto: ruta no segura ${relativePath}`
  );
  return normalized;
}

async function verifyRuntimeIntegrity(baseURL) {
  const localManifestPath = path.join(RUNTIME_ROOT, "runtime-manifest.json");
  const localManifestBytes = await readFile(localManifestPath);
  const localManifest = JSON.parse(localManifestBytes.toString("utf8"));
  assert(Array.isArray(localManifest.files), "Manifiesto local sin lista de archivos");

  const manifestFetch = await fetchWithinBase(
    baseURL,
    assetURL(baseURL, "h5p/udgia/v1/runtime-manifest.json"),
    { accept: "application/json", label: "runtime-manifest.json" }
  );
  assert(
    manifestFetch.response.status === 200,
    `runtime-manifest.json: HTTP ${manifestFetch.response.status}`
  );
  const remoteManifestBytes = Buffer.from(await manifestFetch.response.arrayBuffer());
  assert(
    remoteManifestBytes.byteLength === localManifestBytes.byteLength &&
      sha256(remoteManifestBytes) === sha256(localManifestBytes),
    "El runtime-manifest.json publicado no coincide byte por byte con el checkout"
  );

  let nextIndex = 0;
  let totalBytes = 0;
  const results = [];
  const worker = async () => {
    while (nextIndex < localManifest.files.length) {
      const file = localManifest.files[nextIndex];
      nextIndex += 1;
      const relativePath = safeManifestPath(file.path);
      const localBytes = await readFile(path.join(RUNTIME_ROOT, ...relativePath.split("/")));
      assert(
        localBytes.byteLength === file.bytes && sha256(localBytes) === file.sha256,
        `El checkout no coincide con el manifiesto: ${relativePath}`
      );

      const remoteFetch = await fetchWithinBase(
        baseURL,
        assetURL(baseURL, `h5p/udgia/v1/${relativePath}`),
        { label: `Integridad ${relativePath}` }
      );
      assert(
        remoteFetch.response.status === 200,
        `Integridad ${relativePath}: HTTP ${remoteFetch.response.status}`
      );
      const remoteBytes = Buffer.from(await remoteFetch.response.arrayBuffer());
      assert(
        remoteBytes.byteLength === file.bytes && sha256(remoteBytes) === file.sha256,
        `El archivo publicado fue alterado: ${relativePath}`
      );
      totalBytes += remoteBytes.byteLength;
      results.push(relativePath);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(6, localManifest.files.length) }, () => worker())
  );

  assert(
    totalBytes === localManifest.totalBytes,
    `El total publicado (${totalBytes}) no coincide con el manifiesto (${localManifest.totalBytes})`
  );
  return {
    manifestBytes: localManifestBytes.byteLength,
    manifestSha256: sha256(localManifestBytes),
    filesVerified: results.length,
    totalBytes,
    redirects: manifestFetch.redirects
  };
}

async function rangeProbe(baseURL) {
  const { response, finalURL, redirects } = await fetchWithinBase(
    baseURL,
    assetURL(baseURL, "h5p/udgia/v1/player/main.bundle.js"),
    {
      headers: { Range: "bytes=0-0" },
      label: "Range player/main.bundle.js"
    }
  );
  const body = Buffer.from(await response.arrayBuffer());
  const contentRange = response.headers.get("content-range") || "";
  if (response.status === 206) {
    const match = /^bytes 0-0\/([1-9]\d*)$/i.exec(contentRange);
    assert(match, `Range: Content-Range inválido ${JSON.stringify(contentRange)}`);
    assert(body.byteLength === 1, `Range: se esperó 1 byte y llegaron ${body.byteLength}`);
  } else {
    assert(response.status === 200, `Range: HTTP ${response.status}`);
  }
  return {
    finalURL,
    redirects,
    status: response.status,
    bytes: body.byteLength,
    acceptRanges: response.headers.get("accept-ranges") || "",
    contentRange
  };
}

async function cspProbe(baseURL) {
  const browser = await chromium.launch(browserOptions());
  const context = await browser.newContext({ serviceWorkers: "block" });
  const blockedByGuard = [];
  const blockedWebSockets = [];
  const externalResponses = [];
  const policyViolations = [];
  await configureNetworkGuard(context, baseURL, blockedByGuard, blockedWebSockets);
  context.on("response", (response) => {
    const responseURL = new URL(response.url());
    if (["http:", "https:"].includes(responseURL.protocol) && !withinBase(responseURL, baseURL)) {
      externalResponses.push(response.url());
    }
  });

  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  page.setDefaultNavigationTimeout(20000);
  try {
    const embedURL = assetURL(baseURL, "h5p/udgia/v1/embed.html");
    embedURL.searchParams.set("content", "runtime-probe");
    embedURL.searchParams.set("instance", "deployment-csp-probe");
    const response = await page.goto(embedURL.href, { waitUntil: "load" });
    assert(response?.status() === 200, `CSP embed: HTTP ${response?.status()}`);
    const contentFrame = await frameWithSelector(page, ".udg-runtime-probe");
    assert(await contentFrame.locator(".udg-runtime-probe").isVisible(), "CSP: H5P no cargó");

    await page.evaluate(() => {
      window.__udgiaPolicyViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        window.__udgiaPolicyViolations.push({
          blockedURI: event.blockedURI,
          effectiveDirective: event.effectiveDirective,
          violatedDirective: event.violatedDirective
        });
      });
    });

    const attempted = await page.evaluate(async () => {
      const script = document.createElement("script");
      script.src = "https://example.invalid/udgia-csp-script.js";
      document.head.append(script);
      let fetchRejected = false;
      try {
        await fetch("https://example.invalid/udgia-csp-fetch.json");
      } catch {
        fetchRejected = true;
      }
      await new Promise((resolve) => window.setTimeout(resolve, 250));
      return {
        fetchRejected,
        violations: window.__udgiaPolicyViolations || []
      };
    });
    policyViolations.push(...attempted.violations);

    const directives = new Set(
      policyViolations.map((violation) => violation.effectiveDirective)
    );
    assert(attempted.fetchRejected, "CSP: fetch externo no fue rechazado");
    assert(
      directives.has("script-src-elem") || directives.has("script-src"),
      "CSP: no se observó el bloqueo declarativo de script externo"
    );
    assert(
      directives.has("connect-src"),
      "CSP: no se observó el bloqueo declarativo de fetch externo"
    );
    assert(
      externalResponses.length === 0,
      `CSP: hubo respuestas externas: ${externalResponses.join(", ")}`
    );
    assert(
      blockedByGuard.length === 0,
      "CSP: la guarda de red tuvo que impedir una salida; la política desplegada no bastó"
    );
    assert(
      blockedWebSockets.length === 0,
      "CSP: la guarda de WebSockets tuvo que impedir una salida"
    );

    return {
      embedURL: embedURL.href,
      scriptBlocked: true,
      fetchBlocked: true,
      policyViolations,
      externalResponses,
      blockedByGuard,
      blockedWebSockets,
      serviceWorkersBlocked: true
    };
  } finally {
    await context.close();
    await browser.close();
  }
}

async function functionalProbe(baseURL) {
  const browser = await chromium.launch(browserOptions());
  const context = await browser.newContext({
    viewport: { width: 375, height: 844 },
    reducedMotion: "reduce",
    colorScheme: "dark",
    serviceWorkers: "block"
  });
  const blockedByGuard = [];
  const blockedWebSockets = [];
  const externalRequests = [];
  const outsideBaseRequests = [];
  const writeRequests = [];
  const consoleErrors = [];
  const runtimeRequests = [];
  await configureNetworkGuard(context, baseURL, blockedByGuard, blockedWebSockets);

  context.on("request", (request) => {
    const requestURL = new URL(request.url());
    if (["http:", "https:"].includes(requestURL.protocol)) {
      if (requestURL.origin !== baseURL.origin) externalRequests.push(request.url());
      if (
        requestURL.origin === baseURL.origin &&
        !requestURL.pathname.startsWith(baseURL.pathname)
      ) {
        outsideBaseRequests.push(request.url());
      }
      if (requestURL.pathname.includes("/h5p/udgia/v1/")) {
        runtimeRequests.push(requestURL.pathname);
      }
    }
    if (!["GET", "HEAD"].includes(request.method())) {
      writeRequests.push({ method: request.method(), url: request.url() });
    }
  });

  const page = await context.newPage();
  page.setDefaultTimeout(20000);
  page.setDefaultNavigationTimeout(20000);
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
    const internalLinks = await page.locator("a[href]").evaluateAll((links) =>
      links
        .map((link) => link.href)
        .filter((href) => {
          const url = new URL(href);
          return url.origin === window.location.origin;
        })
    );
    assert(
      internalLinks.every((href) => withinBase(href, baseURL)),
      `Enlaces internos fuera de la base: ${internalLinks
        .filter((href) => !withinBase(href, baseURL))
        .join(", ")}`
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
      () => document.querySelector("[data-udg-h5p]")?.dataset.state === "ready"
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
      () => document.querySelectorAll('[data-udg-h5p][data-state="ready"]').length === 2
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
    assert(
      outsideBaseRequests.length === 0,
      `Solicitudes fuera de la subruta: ${outsideBaseRequests.join(", ")}`
    );
    assert(
      blockedByGuard.length === 0,
      `Solicitudes bloqueadas por la guarda de red: ${blockedByGuard.join(", ")}`
    );
    assert(
      blockedWebSockets.length === 0,
      `WebSockets bloqueados por la guarda de red: ${blockedWebSockets.join(", ")}`
    );
    assert(consoleErrors.length === 0, `Errores de consola: ${consoleErrors.join(" | ")}`);

    await page.emulateMedia({ media: "print" });
    assert(
      await first.locator(".udg-h5p__fallback").isVisible(),
      "La alternativa accesible no permanece visible al imprimir"
    );

    await page.emulateMedia({ media: "screen" });
    const coordinationURL = assetURL(
      baseURL,
      "ia-educacion/rutas/coordinacion-academica/"
    );
    const coordinationResponse = await page.goto(coordinationURL.href, {
      waitUntil: "networkidle"
    });
    assert(
      coordinationResponse?.status() === 200,
      `Ruta de coordinación desplegada: HTTP ${coordinationResponse?.status()}`
    );
    assert(
      (await page.locator("h1").textContent())?.trim() ===
        "Coordinar la IA en los procesos docentes",
      "La ruta de coordinación perdió su título"
    );
    const coordinationText = (await page.locator("body").textContent()).replace(/\s+/g, " ");
    assert(
      coordinationText.includes("organizar un piloto y acuerdos colegiados"),
      "La ruta de coordinación perdió su propósito operativo"
    );
    assert(
      !["documento ejecutivo", "alta dirección", "Rectoría General"].some((term) =>
        coordinationText.includes(term)
      ),
      "La ruta pública contiene planeación editorial interna"
    );
    const coordinationHero = page.locator("main article > figure:first-child > img");
    await coordinationHero.waitFor({ state: "visible" });
    const coordinationHeroGeometry = await coordinationHero.evaluate((image) => {
      const box = image.getBoundingClientRect();
      return {
        width: Math.round(box.width),
        height: Math.round(box.height),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight
      };
    });
    assert(
      coordinationHeroGeometry.naturalWidth > 0 &&
        coordinationHeroGeometry.width >= 320,
      "El featured de coordinación no es visible"
    );
    assert(
      Math.abs(
        coordinationHeroGeometry.width / coordinationHeroGeometry.height -
          coordinationHeroGeometry.naturalWidth /
            coordinationHeroGeometry.naturalHeight
      ) <= 0.02,
      "El featured de coordinación perdió su proporción natural"
    );

    const executiveURL = assetURL(
      baseURL,
      "ia-educacion/rutas/decision-institucional-ia/"
    );
    const executiveResponse = await page.goto(executiveURL.href, {
      waitUntil: "networkidle"
    });
    assert(
      executiveResponse?.status() === 200,
      `Ruta ejecutiva desplegada: HTTP ${executiveResponse?.status()}`
    );
    assert(
      (await page.locator("h1").textContent())?.trim() ===
        "Decidir institucionalmente sobre IA en la docencia",
      "La ruta ejecutiva perdió su título"
    );
    const executiveText = (await page.locator("body").textContent()).replace(/\s+/g, " ");
    assert(
      executiveText.includes("marco de trabajo adaptable") &&
        executiveText.includes("no una política institucional vigente"),
      "La ruta ejecutiva perdió su frontera no normativa"
    );
    assert(
      [
        "Propósito y alcance",
        "Gobernanza y responsabilidades",
        "Personas, capacidades y equidad",
        "Datos, tecnología e infraestructura",
        "Portafolio y recursos",
        "Evidencia, revisión y continuidad"
      ].every((term) => executiveText.includes(term)),
      "La ruta ejecutiva perdió una o más decisiones"
    );
    const executiveHero = page.locator("main article > figure:first-child > img");
    await executiveHero.waitFor({ state: "visible" });
    const executiveHeroGeometry = await executiveHero.evaluate((image) => {
      const box = image.getBoundingClientRect();
      return {
        width: Math.round(box.width),
        height: Math.round(box.height),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight
      };
    });
    assert(
      executiveHeroGeometry.naturalWidth > 0 &&
        executiveHeroGeometry.width >= 320,
      "El featured ejecutivo no es visible"
    );
    assert(
      Math.abs(
        executiveHeroGeometry.width / executiveHeroGeometry.height -
          executiveHeroGeometry.naturalWidth /
            executiveHeroGeometry.naturalHeight
      ) <= 0.02,
      "El featured ejecutivo perdió su proporción natural"
    );
    const executiveMap = page.locator(
      'img[src$="mapa-decisiones-institucionales.svg"]'
    );
    await executiveMap.waitFor({ state: "visible" });
    assert(
      await executiveMap.evaluate((image) => image.complete && image.naturalWidth > 0),
      "El mapa de decisiones ejecutivas no cargó"
    );

    const routeIndexURL = assetURL(baseURL, "ia-educacion/rutas/");
    const routeIndexResponse = await page.goto(routeIndexURL.href, {
      waitUntil: "networkidle"
    });
    assert(
      routeIndexResponse?.status() === 200,
      `Índice de rutas desplegado: HTTP ${routeIndexResponse?.status()}`
    );
    const routeIndexText = (await page.locator("body").textContent()).replace(/\s+/g, " ");
    assert(
      routeIndexText.includes("Estudio o enseño") &&
        routeIndexText.includes("Coordino procesos docentes") &&
        routeIndexText.includes("Dirijo decisiones institucionales"),
      "El índice no presenta las tres rutas de audiencia"
    );
    assert(writeRequests.length === 0, `Solicitudes de escritura: ${JSON.stringify(writeRequests)}`);
    assert(
      externalRequests.length === 0,
      `Solicitudes fuera del origen: ${externalRequests.join(", ")}`
    );
    assert(
      outsideBaseRequests.length === 0,
      `Solicitudes fuera de la subruta: ${outsideBaseRequests.join(", ")}`
    );
    assert(
      blockedByGuard.length === 0,
      `Solicitudes bloqueadas por la guarda de red: ${blockedByGuard.join(", ")}`
    );
    assert(
      blockedWebSockets.length === 0,
      `WebSockets bloqueados por la guarda de red: ${blockedWebSockets.join(", ")}`
    );
    assert(consoleErrors.length === 0, `Errores de consola: ${consoleErrors.join(" | ")}`);
    const cookies = await context.cookies();

    return {
      fixtureURL: fixtureURL.href,
      firstIframeURL,
      firstHeight,
      twoIndependentMounts: true,
      keyboardFeedback: true,
      printFallback: true,
      storageUnchanged: true,
      internalLinksWithinBase: true,
      externalRequests,
      outsideBaseRequests,
      blockedByGuard,
      blockedWebSockets,
      serviceWorkersBlocked: true,
      writeRequests,
      consoleErrors,
      coordinationRoute: {
        url: coordinationURL.href,
        title: "Coordinar la IA en los procesos docentes",
        operationalPurpose: true,
        internalPlanningLanguageAbsent: true,
        hero: coordinationHeroGeometry
      },
      executiveRoute: {
        url: executiveURL.href,
        title: "Decidir institucionalmente sobre IA en la docencia",
        nonNormativeBoundary: true,
        sixDecisions: true,
        decisionMap: true,
        hero: executiveHeroGeometry
      },
      routeIndex: {
        url: routeIndexURL.href,
        studentTeacherEntry: true,
        coordinationEntry: true,
        executiveEntry: true
      },
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

function cacheMaxAge(cacheControl) {
  const maxAge = /(?:^|,)\s*max-age=(\d+)\b/i.exec(cacheControl);
  return maxAge ? Number.parseInt(maxAge[1], 10) : null;
}

function immutableCacheIsStrong(cacheControl) {
  const maxAge = cacheMaxAge(cacheControl);
  return Boolean(
    maxAge !== null &&
      maxAge >= 31536000 &&
      !/(?:^|,)\s*(?:no-cache|no-store|private)(?:\s*,|$)/i.test(cacheControl) &&
      /(?:^|,)\s*immutable(?:\s*,|$)/i.test(cacheControl)
  );
}

function mutableCacheIsUnsafe(cacheControl) {
  const maxAge = cacheMaxAge(cacheControl);
  const requiresRevalidation =
    /(?:^|,)\s*(?:no-cache|no-store)(?:\s*,|$)/i.test(cacheControl);
  return (
    /(?:^|,)\s*immutable(?:\s*,|$)/i.test(cacheControl) ||
    (!requiresRevalidation && maxAge !== null && maxAge >= 31536000)
  );
}

async function writeReport(reportPath, report) {
  if (!reportPath) return;
  const absoluteReportPath = path.resolve(reportPath);
  await mkdir(path.dirname(absoluteReportPath), { recursive: true });
  await writeFile(absoluteReportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

const argv = process.argv.slice(2);
let reportPath = reportPathHint(argv);
const report = {
  schemaVersion: 2,
  status: "RUNNING",
  baseURL: null,
  checkedAt: new Date().toISOString(),
  requirements: {
    providerIndependent: true,
    staticHosting: true,
    sameOriginRuntime: true,
    rootOrSubpath: true,
    byteIntegrity: true,
    externalNetworkDenied: true
  },
  resources: [],
  warnings: [],
  errors: []
};

let exitCode = 0;
try {
  const argumentsResult = parseArguments(argv);
  reportPath = argumentsResult.reportPath;
  const baseURL = normalizedBaseURL(argumentsResult.rawURL);
  report.baseURL = baseURL.href;
  assert(
    baseURL.protocol === "https:" || (argumentsResult.allowHTTP && isLoopback(baseURL)),
    "Producción requiere HTTPS; --allow-http sólo se admite para una sonda loopback"
  );

  const resources = [
    { path: "", contentType: /^text\/html\b/i, accept: "text/html", cachePolicy: "mutable" },
    {
      path: "laboratorio/h5p-runtime/",
      contentType: /^text\/html\b/i,
      accept: "text/html",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/",
      contentType: /^text\/html\b/i,
      accept: "text/html",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/coordinacion-academica/",
      contentType: /^text\/html\b/i,
      accept: "text/html",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/coordinacion-academica/ciclo-coordinacion.svg",
      contentType: /^image\/svg\+xml\b/i,
      accept: "image/svg+xml",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/coordinacion-academica/featured.webp",
      contentType: /^image\/webp\b/i,
      accept: "image/webp",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/decision-institucional-ia/",
      contentType: /^text\/html\b/i,
      accept: "text/html",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/decision-institucional-ia/mapa-decisiones-institucionales.svg",
      contentType: /^image\/svg\+xml\b/i,
      accept: "image/svg+xml",
      cachePolicy: "mutable"
    },
    {
      path: "ia-educacion/rutas/decision-institucional-ia/featured.webp",
      contentType: /^image\/webp\b/i,
      accept: "image/webp",
      cachePolicy: "mutable"
    },
    {
      path: "h5p/udgia/v1/host.js",
      contentType: /^(text|application)\/javascript\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/host.css",
      contentType: /^text\/css\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/embed.html",
      contentType: /^text\/html\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/embed.js",
      contentType: /^(text|application)\/javascript\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/embed.css",
      contentType: /^text\/css\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/content-index.json",
      contentType: /^application\/json\b/i,
      cachePolicy: "mutable"
    },
    {
      path: "h5p/udgia/v1/runtime-manifest.json",
      contentType: /^application\/json\b/i,
      cachePolicy: "mutable"
    },
    {
      path: "h5p/udgia/v1/player/main.bundle.js",
      contentType: /^(text|application)\/javascript\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/player/styles/h5p.css",
      contentType: /^text\/css\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/libraries/H5P.UDGRuntimeProbe-1.0/runtime-probe.js",
      contentType: /^(text|application)\/javascript\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/libraries/H5P.UDGRuntimeProbe-1.0/runtime-probe.css",
      contentType: /^text\/css\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/themes/udg-c.css",
      contentType: /^text\/css\b/i,
      cachePolicy: "immutable"
    },
    {
      path: "h5p/udgia/v1/content/runtime-probe/content/content.json",
      contentType: /^application\/json\b/i,
      cachePolicy: "mutable"
    },
    {
      path: "h5p/udgia/v1/content/runtime-probe/content/images/runtime-probe.svg",
      contentType: /^image\/svg\+xml\b/i,
      cachePolicy: "mutable"
    },
    {
      path: "fonts/piazzolla-variable.woff2",
      contentType: /^font\/woff2\b/i,
      cachePolicy: "neutral"
    }
  ];
  for (const resource of resources) {
    report.resources.push(await inspectResource(baseURL, resource));
  }

  report.integrity = await verifyRuntimeIntegrity(baseURL);

  const embedURL = assetURL(baseURL, "h5p/udgia/v1/embed.html");
  embedURL.searchParams.set("content", "runtime-probe");
  embedURL.searchParams.set("instance", "deployment-probe");
  const embedFetch = await fetchWithinBase(baseURL, embedURL, {
    expectedQuery: {
      content: "runtime-probe",
      instance: "deployment-probe"
    },
    label: "Iframe con query"
  });
  assert(embedFetch.response.status === 200, `Iframe con query: HTTP ${embedFetch.response.status}`);
  await embedFetch.response.arrayBuffer();
  report.embedQuery = {
    finalURL: embedFetch.finalURL,
    redirects: embedFetch.redirects,
    preserved: true
  };

  const missingAssetURL = assetURL(baseURL, "h5p/udgia/v1/__udgia_missing_asset_probe__.js");
  const missingAssetFetch = await fetchWithinBase(baseURL, missingAssetURL, {
    label: "Activo inexistente"
  });
  report.missingAsset = {
    url: missingAssetURL.href,
    finalURL: missingAssetFetch.finalURL,
    redirects: missingAssetFetch.redirects,
    status: missingAssetFetch.response.status
  };
  await missingAssetFetch.response.arrayBuffer();
  assert(
    missingAssetFetch.redirects.length === 0 && missingAssetFetch.response.status === 404,
    `Un activo H5P inexistente respondió ${missingAssetFetch.response.status} o fue redirigido; debe producir un 404 directo`
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

  const immutableAssets = report.resources.filter(
    (resource) => resource.cachePolicy === "immutable"
  );
  if (immutableAssets.some((resource) => !immutableCacheIsStrong(resource.cacheControl))) {
    report.warnings.push(
      "Uno o más activos versionados H5P no usan Cache-Control con max-age>=31536000 e immutable."
    );
  }
  const wronglyImmutable = report.resources.filter(
    (resource) =>
      resource.cachePolicy === "mutable" && mutableCacheIsUnsafe(resource.cacheControl)
  );
  assert(
    wronglyImmutable.length === 0,
    `Recursos mutables con caché anual o immutable: ${wronglyImmutable
      .map((resource) => resource.path || "/")
      .join(", ")}`
  );
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

  report.csp = await cspProbe(baseURL);
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
  exitCode = error instanceof UsageError ? 2 : 1;
}

try {
  await writeReport(reportPath, report);
} catch {
  report.status = "FAIL";
  report.errors.push("No fue posible escribir el informe solicitado");
  exitCode = exitCode || 1;
}

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = exitCode;
