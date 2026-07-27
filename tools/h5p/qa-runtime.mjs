import { createHash } from "node:crypto";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import {
  access,
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
import { ZipFile } from "yazl";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const hugoBinary = process.env.HUGO_BIN || "hugo";
const chromiumBinary =
  process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : "");
const evidenceDirectory = process.env.EVIDENCE_DIR
  ? path.resolve(process.env.EVIDENCE_DIR)
  : path.join(repoRoot, "docs/design/evidence/udgia-003");
const reportPath = process.env.REPORT_PATH
  ? path.resolve(process.env.REPORT_PATH)
  : path.join(evidenceDirectory, "qa-runtime.json");
const captureScreenshots = process.env.CAPTURE_SCREENSHOTS !== "false";
const fixturePath = "laboratorio/h5p-runtime/";
const runtimePrefix = "/h5p/udgia/v1/";
const failures = [];

const assert = (condition, message) => {
  if (!condition) {
    failures.push(message);
    throw new Error(message);
  }
};

const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");

function command(commandName, args, options = {}) {
  const result = spawnSync(commandName, args, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    ...options
  });
  return {
    status: result.status,
    stdout: result.stdout || "",
    stderr: result.stderr || ""
  };
}

function runHugo(destination, baseURL) {
  const result = command(hugoBinary, [
    "--minify",
    "--destination",
    destination,
    "--baseURL",
    baseURL
  ]);
  if (result.status !== 0) {
    throw new Error(`Hugo falló para ${baseURL}\n${result.stdout}\n${result.stderr}`);
  }
  return {
    version: command(hugoBinary, ["version"]).stdout.trim(),
    pages: Number(result.stdout.match(/Pages\s+│\s+(\d+)/)?.[1] || 0),
    warnings: result.stderr
      .split("\n")
      .filter((line) => line.startsWith("WARN"))
  };
}

function mimeType(file) {
  const extension = path.extname(file).toLowerCase();
  return (
    {
      ".css": "text/css; charset=utf-8",
      ".gif": "image/gif",
      ".html": "text/html; charset=utf-8",
      ".ico": "image/x-icon",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webmanifest": "application/manifest+json",
      ".woff": "font/woff",
      ".woff2": "font/woff2"
    }[extension] || "application/octet-stream"
  );
}

async function startServer(root, basePath) {
  const requests = [];
  const counts = new Map();
  const normalizedBase = basePath === "/" ? "/" : `/${basePath.replace(/^\/|\/$/g, "")}/`;
  const server = http.createServer(async (request, response) => {
    try {
      const requestURL = new URL(request.url, "http://127.0.0.1");
      let pathname = decodeURIComponent(requestURL.pathname);
      requests.push(pathname);
      counts.set(pathname, (counts.get(pathname) || 0) + 1);

      if (!pathname.startsWith(normalizedBase)) {
        response.writeHead(404).end("Not found");
        return;
      }
      pathname = pathname.slice(normalizedBase.length);
      const normalized = path.posix.normalize(`/${pathname}`).replace(/^\/+/, "");
      if (normalized.startsWith("..")) {
        response.writeHead(400).end("Bad path");
        return;
      }

      let file = path.join(root, normalized);
      if ((await stat(file).catch(() => null))?.isDirectory()) file = path.join(file, "index.html");
      const relative = path.relative(root, file);
      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        response.writeHead(400).end("Bad path");
        return;
      }
      const fileStat = await stat(file);
      response.setHeader("content-type", mimeType(file));
      response.setHeader("content-length", fileStat.size);
      if (requestURL.pathname.includes("/h5p/udgia/v1/")) {
        response.setHeader("cache-control", "public, max-age=31536000, immutable");
      }
      response.writeHead(200);
      await pipeline(createReadStream(file), response);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ port: 0, host: "127.0.0.1" }, () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  return {
    baseURL: `http://127.0.0.1:${address.port}${normalizedBase}`,
    requests,
    counts,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

async function addZip(destination, entryName, options = {}) {
  const zip = new ZipFile();
  const completed = new Promise((resolve, reject) => {
    const output = createWriteStream(destination);
    output.on("close", resolve);
    output.on("error", reject);
    zip.outputStream.on("error", reject);
    zip.outputStream.pipe(output);
  });
  zip.addBuffer(Buffer.from("probe"), entryName, {
    mtime: new Date("1980-01-01T00:00:00.000Z"),
    mode: options.mode || 0o100644
  });
  zip.end();
  await completed;
}

async function replaceZipEntry(source, destination, originalName, replacementName) {
  assert(
    Buffer.byteLength(originalName) === Buffer.byteLength(replacementName),
    "La sonda ZIP requiere nombres de igual longitud"
  );
  const buffer = await readFile(source);
  const original = Buffer.from(originalName);
  const replacement = Buffer.from(replacementName);
  let offset = 0;
  let replacements = 0;
  while ((offset = buffer.indexOf(original, offset)) !== -1) {
    replacement.copy(buffer, offset);
    offset += replacement.length;
    replacements += 1;
  }
  assert(replacements >= 2, `No se localizaron ambas cabeceras ZIP de ${originalName}`);
  await writeFile(destination, buffer);
}

async function securityProbes(temporaryDirectory) {
  const validPackage = path.join(repoRoot, "h5p/packages/udg-runtime-probe-1.0.0.h5p");
  const catalog = JSON.parse(await readFile(path.join(repoRoot, "data/h5p/catalog.json"), "utf8"));
  const expectedHash = catalog.contents["runtime-probe"].sourceSha256;
  const valid = command(process.execPath, [
    "tools/h5p/build-runtime.mjs",
    "--audit-package",
    validPackage,
    "--expected-sha256",
    expectedHash
  ]);
  assert(valid.status === 0, `La sonda de paquete válido falló: ${valid.stderr}`);

  const wrongHash = command(process.execPath, [
    "tools/h5p/build-runtime.mjs",
    "--audit-package",
    validPackage,
    "--expected-sha256",
    "0".repeat(64)
  ]);
  assert(wrongHash.status !== 0, "La auditoría aceptó un hash incorrecto");

  const seed = path.join(temporaryDirectory, "seed.zip");
  const traversal = path.join(temporaryDirectory, "traversal.zip");
  const absolute = path.join(temporaryDirectory, "absolute.zip");
  const symlink = path.join(temporaryDirectory, "symlink.zip");
  await addZip(seed, "aa/escape.txt");
  await replaceZipEntry(seed, traversal, "aa/escape.txt", "../escape.txt");
  await replaceZipEntry(seed, absolute, "aa/escape.txt", "/x/escape.txt");
  await addZip(symlink, "unsafe-link", { mode: 0o120777 });

  const malicious = [
    ["traversal", traversal, /Ruta ZIP ambigua|Escape de directorio|invalid relative path/i],
    ["absolute", absolute, /Ruta ZIP no permitida|absolute path/i],
    ["symlink", symlink, /Enlace simbólico ZIP no permitido/]
  ];
  const results = [];
  for (const [name, packagePath, expectedError] of malicious) {
    const probe = command(process.execPath, [
      "tools/h5p/build-runtime.mjs",
      "--audit-package",
      packagePath
    ]);
    const output = `${probe.stdout}\n${probe.stderr}`;
    assert(probe.status !== 0, `La auditoría aceptó el ZIP malicioso ${name}`);
    assert(
      expectedError.test(output),
      `La auditoría rechazó ${name} por una causa inesperada: ${output.trim()}`
    );
    results.push({ name, rejected: true });
  }

  const catalogCases = [
    [
      "invalid-id",
      (candidate) => {
        candidate.contents["../runtime-probe"] = candidate.contents["runtime-probe"];
        delete candidate.contents["runtime-probe"];
      },
      /Identificador de catálogo no permitido/
    ],
    [
      "source-escape",
      (candidate) => {
        candidate.contents["runtime-probe"].source = "../../outside.h5p";
      },
      /Fuente H5P fuera/
    ],
    [
      "content-license",
      (candidate) => {
        candidate.contents["runtime-probe"].contentLicense = "CC0 1.0";
      },
      /Licencia de contenido no coincide/
    ],
    [
      "library-license",
      (candidate) => {
        candidate.contents["runtime-probe"].libraryLicense = "GPL-3.0";
      },
      /Licencia de biblioteca no coincide/
    ],
    [
      "adapter-path",
      (candidate) => {
        candidate.contents["runtime-probe"].adapter = "../unsafe.css";
      },
      /Adaptador no permitido/
    ],
    [
      "provenance",
      (candidate) => {
        candidate.contents["runtime-probe"].provenance = null;
      },
      /Procedencia incompleta/
    ]
  ];
  const catalogGuards = [];
  for (const [name, mutate, expectedError] of catalogCases) {
    const candidate = structuredClone(catalog);
    mutate(candidate);
    const candidatePath = path.join(temporaryDirectory, `catalog-${name}.json`);
    await writeFile(candidatePath, `${JSON.stringify(candidate, null, 2)}\n`, "utf8");
    const probe = command(process.execPath, [
      "tools/h5p/build-runtime.mjs",
      "--check",
      "--catalog",
      candidatePath
    ]);
    const output = `${probe.stdout}\n${probe.stderr}`;
    assert(probe.status !== 0, `El build aceptó el catálogo inválido ${name}`);
    assert(
      expectedError.test(output),
      `El build rechazó el catálogo ${name} por una causa inesperada: ${output.trim()}`
    );
    catalogGuards.push({ name, rejected: true });
  }
  return {
    validHash: expectedHash,
    badHashRejected: true,
    malicious: results,
    catalogGuards
  };
}

async function frameWithSelector(page, selector) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    for (const frame of page.frames()) {
      if (await frame.locator(selector).count()) return frame;
    }
    await page.waitForTimeout(100);
  }
  throw new Error(`No apareció ${selector} dentro de ningún iframe`);
}

async function storageSnapshot(page) {
  return page.evaluate(async () => {
    const sortedEntries = (storage) =>
      Object.keys(storage)
        .sort()
        .map((key) => [key, storage.getItem(key)]);
    const databases =
      typeof indexedDB.databases === "function"
        ? (await indexedDB.databases()).map((database) => database.name || "").sort()
        : [];
    const cacheNames = "caches" in window ? (await caches.keys()).sort() : [];
    const serviceWorkers =
      "serviceWorker" in navigator
        ? (await navigator.serviceWorker.getRegistrations()).map((registration) => registration.scope).sort()
        : [];
    return {
      localStorage: sortedEntries(localStorage),
      sessionStorage: sortedEntries(sessionStorage),
      indexedDB: databases,
      cacheStorage: cacheNames,
      serviceWorkers
    };
  });
}

async function axeAudit(frame, label) {
  await frame.addScriptTag({ content: axe.source });
  const result = await frame.evaluate(async () => {
    const audit = await window.axe.run(document, {
      resultTypes: ["violations"],
      rules: {
        region: { enabled: false }
      }
    });
    return audit.violations
      .filter((violation) => ["serious", "critical"].includes(violation.impact))
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length
      }));
  });
  assert(result.length === 0, `${label}: axe detectó ${JSON.stringify(result)}`);
  return result;
}

async function functionalCase(browser, server, label, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    colorScheme: "dark"
  });
  const externalRequests = [];
  const writeRequests = [];
  const consoleErrors = [];
  context.on("request", (request) => {
    const url = new URL(request.url());
    if (url.origin !== new URL(server.baseURL).origin && !["data:", "blob:"].includes(url.protocol)) {
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
  const requestStart = server.requests.length;
  const response = await page.goto(new URL(fixturePath, server.baseURL).href, {
    waitUntil: "load"
  });
  assert(response?.status() === 200, `${label}: la fixture no respondió HTTP 200`);
  await page.waitForTimeout(700);
  await page.evaluate(() => {
    localStorage.setItem("udgia-h5p-qa-local", "preservar");
    sessionStorage.setItem("udgia-h5p-qa-session", "preservar");
  });
  const storageBefore = await storageSnapshot(page);

  assert(
    (await page.locator('meta[name="robots"]').getAttribute("content")) === "noindex, nofollow",
    `${label}: la fixture perdió noindex`
  );
  assert((await page.locator("[data-udg-h5p]").count()) === 2, `${label}: se esperaban dos montajes`);
  assert((await page.locator(`script[src*="${runtimePrefix}host.js"]`).count()) === 1, `${label}: host.js se emitió más de una vez`);
  assert((await page.locator(".udg-h5p__iframe").count()) === 0, `${label}: un iframe se cargó antes de activarse`);

  const initialRequests = server.requests.slice(requestStart);
  const heavyPattern = /\/(?:player\/|libraries\/|content\/|embed\.html|content-index\.json)/;
  assert(
    initialRequests.every((pathname) => !heavyPattern.test(pathname)),
    `${label}: se descargaron bytes del player antes de activar: ${initialRequests.filter((item) => heavyPattern.test(item))}`
  );

  const first = page.locator("[data-udg-h5p]").nth(0);
  await first.locator('[data-h5p-action="load"]').focus();
  await page.keyboard.press("Enter");
  await first.evaluate((element) =>
    new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error("timeout")), 15000);
      const finish = () => {
        if (element.dataset.state === "ready") {
          window.clearTimeout(timeout);
          resolve();
        }
      };
      new MutationObserver(finish).observe(element, {
        attributes: true,
        attributeFilter: ["data-state"]
      });
      finish();
    })
  );

  const firstIframe = first.locator("iframe");
  assert((await firstIframe.getAttribute("title"))?.includes("carga manual"), `${label}: falta título de iframe`);
  assert(
    (await firstIframe.getAttribute("sandbox")) === "allow-scripts allow-same-origin",
    `${label}: política sandbox inesperada`
  );
  try {
    await page.waitForFunction(
      () => Number.parseFloat(document.querySelector(".udg-h5p__iframe")?.style.height || "0") > 280,
      null,
      { timeout: 10000 }
    );
  } catch {
    const diagnostic = await page.evaluate(() => {
      const frame = document.querySelector(".udg-h5p__iframe");
      return {
        styleHeight: frame?.style.height,
        clientHeight: frame?.clientHeight,
        scrollHeight: document.documentElement.scrollHeight,
        state: document.querySelector("[data-udg-h5p]")?.dataset.state,
        status: document.querySelector("[data-h5p-status]")?.textContent
      };
    });
    throw new Error(
      `${label}: la altura no superó el mínimo ${JSON.stringify({ diagnostic, consoleErrors })}`
    );
  }
  const firstHeight = Number.parseFloat(await firstIframe.evaluate((element) => element.style.height));
  assert(firstHeight > 280 && firstHeight <= 6000, `${label}: altura dinámica inválida ${firstHeight}`);
  assert(
    !(await first.locator(".udg-h5p__fallback").evaluate((element) => element.open)),
    `${label}: fallback no se cerró al quedar lista la interacción`
  );

  const contentFrame = await frameWithSelector(page, ".udg-runtime-probe");
  await contentFrame.locator(".udg-runtime-probe__button").focus();
  await contentFrame.press(".udg-runtime-probe__button", "Enter");
  assert(
    await contentFrame.locator(".udg-runtime-probe__feedback").isVisible(),
    `${label}: no apareció la retroalimentación`
  );
  const feedbackText = await contentFrame.locator(".udg-runtime-probe__feedback").textContent();
  await page.waitForFunction(
    (previousHeight) =>
      Number.parseFloat(document.querySelector(".udg-h5p__iframe")?.style.height || "0") >
      previousHeight + 8,
    firstHeight,
    { timeout: 10000 }
  );
  const expandedHeight = Number.parseFloat(
    await firstIframe.evaluate((element) => element.style.height)
  );
  await contentFrame.locator(".udg-runtime-probe__button").click();
  await contentFrame.locator(".udg-runtime-probe__feedback").waitFor({ state: "hidden" });
  await page.waitForFunction(
    (previousHeight) =>
      Number.parseFloat(document.querySelector(".udg-h5p__iframe")?.style.height || "0") <
      previousHeight - 8,
    expandedHeight,
    { timeout: 10000 }
  );
  const collapsedHeight = Number.parseFloat(
    await firstIframe.evaluate((element) => element.style.height)
  );
  await contentFrame.locator(".udg-runtime-probe__button").click();
  await contentFrame.locator(".udg-runtime-probe__feedback").waitFor({ state: "visible" });
  await page.waitForFunction(
    (previousHeight) =>
      Number.parseFloat(document.querySelector(".udg-h5p__iframe")?.style.height || "0") >
      previousHeight + 8,
    collapsedHeight,
    { timeout: 10000 }
  );
  await page.waitForTimeout(400);
  const stableHeightA = Number.parseFloat(
    await firstIframe.evaluate((element) => element.style.height)
  );
  await page.waitForTimeout(400);
  const stableHeightB = Number.parseFloat(
    await firstIframe.evaluate((element) => element.style.height)
  );
  assert(
    Math.abs(stableHeightA - stableHeightB) <= 2,
    `${label}: altura inestable ${stableHeightA}/${stableHeightB}`
  );
  const innerGeometry = await contentFrame.evaluate(() => ({
    clientHeight: document.documentElement.clientHeight,
    scrollHeight: document.documentElement.scrollHeight
  }));
  assert(
    innerGeometry.scrollHeight <= innerGeometry.clientHeight + 2,
    `${label}: scrollbar interior ${JSON.stringify(innerGeometry)}`
  );

  const second = page.locator("[data-udg-h5p]").nth(1);
  await second.scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => document.querySelectorAll('[data-udg-h5p][data-state="ready"]').length === 2,
    null,
    { timeout: 15000 }
  );
  assert((await page.locator(".udg-h5p__iframe").count()) === 2, `${label}: los dos montajes no son independientes`);

  const runtimeBasePath = new URL(server.baseURL).pathname.replace(/\/$/, "");
  const playerPath = `${runtimeBasePath}${runtimePrefix}player/main.bundle.js`.replace(/\/{2,}/g, "/");
  assert(
    (server.counts.get(playerPath) || 0) <= 1,
    `${label}: el player común no reutilizó la caché (${server.counts.get(playerPath)})`
  );
  await second.locator('[data-h5p-action="reset"]').click();
  assert((await first.getAttribute("data-state")) === "ready", `${label}: reiniciar el segundo montaje afectó al primero`);
  assert(
    await contentFrame.locator(".udg-runtime-probe__feedback").isVisible(),
    `${label}: el estado efímero del primer montaje se perdió al reiniciar el segundo`
  );

  await page.emulateMedia({ media: "print" });
  assert(
    await first.locator(".udg-h5p__fallback").isVisible(),
    `${label}: el fallback no permanece en impresión`
  );
  await page.emulateMedia({ media: "screen", reducedMotion: "reduce" });

  const layout = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    dark: document.documentElement.classList.contains("dark"),
    colorScheme: getComputedStyle(document.documentElement).colorScheme,
    iframeTransition: getComputedStyle(document.querySelector(".udg-h5p__iframe")).transitionDuration
  }));
  assert(layout.scrollWidth <= layout.width, `${label}: overflow horizontal ${layout.scrollWidth}/${layout.width}`);
  assert(!layout.dark && layout.colorScheme.includes("light"), `${label}: la identidad dejó de ser únicamente clara`);
  assert(
    ["0s", "0.001ms"].includes(layout.iframeTransition),
    `${label}: reduced-motion no anuló la transición (${layout.iframeTransition})`
  );

  assert(externalRequests.length === 0, `${label}: solicitudes externas ${externalRequests.join(", ")}`);
  assert(writeRequests.length === 0, `${label}: solicitudes de escritura ${JSON.stringify(writeRequests)}`);
  assert(
    !server.requests
      .slice(requestStart)
      .some((pathname) => /xapi|lrs|ajax|user-state|attempt|grade/i.test(pathname)),
    `${label}: apareció una ruta de seguimiento o calificación`
  );
  assert((await context.cookies()).length === 0, `${label}: la interacción creó cookies`);
  assert(consoleErrors.length === 0, `${label}: errores de consola ${consoleErrors.join(" | ")}`);

  let screenshot = null;
  if (captureScreenshots && [375, 1280].includes(viewport.width)) {
    const screenshotPath = path.join(evidenceDirectory, `h5p-${viewport.width}.jpg`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
      type: "jpeg",
      quality: 82
    });
    const screenshotBuffer = await readFile(screenshotPath);
    screenshot = {
      path: path.relative(repoRoot, screenshotPath),
      bytes: screenshotBuffer.byteLength,
      sha256: sha256(screenshotBuffer)
    };
  }

  const storageAfterInteraction = await storageSnapshot(page);
  assert(
    JSON.stringify(storageAfterInteraction) === JSON.stringify(storageBefore),
    `${label}: H5P alteró almacenamiento ${JSON.stringify({
      before: storageBefore,
      after: storageAfterInteraction
    })}`
  );
  await page.reload({ waitUntil: "load" });
  const storageAfterReload = await storageSnapshot(page);
  assert(
    JSON.stringify(storageAfterReload) === JSON.stringify(storageBefore),
    `${label}: la recarga alteró almacenamiento ${JSON.stringify({
      before: storageBefore,
      after: storageAfterReload
    })}`
  );
  const reloadedFirst = page.locator("[data-udg-h5p]").first();
  await reloadedFirst.locator('[data-h5p-action="load"]').click();
  await page.waitForFunction(
    () => document.querySelector("[data-udg-h5p]")?.dataset.state === "ready",
    null,
    { timeout: 15000 }
  );
  const reloadedContentFrame = await frameWithSelector(page, ".udg-runtime-probe");
  assert(
    await reloadedContentFrame.locator(".udg-runtime-probe__feedback").isHidden(),
    `${label}: la retroalimentación reapareció tras recargar`
  );
  assert(
    (await reloadedContentFrame.locator(".udg-runtime-probe__button").getAttribute("aria-expanded")) ===
      "false",
    `${label}: el estado interactivo persistió tras recargar`
  );
  assert(externalRequests.length === 0, `${label}: solicitudes externas tras recarga`);
  assert(writeRequests.length === 0, `${label}: solicitudes de escritura tras recarga`);
  assert((await context.cookies()).length === 0, `${label}: cookies tras recarga`);
  assert(consoleErrors.length === 0, `${label}: errores de consola tras recarga ${consoleErrors.join(" | ")}`);

  await context.close();
  return {
    label,
    basePath: new URL(server.baseURL).pathname,
    viewport,
    initialRuntimeRequests: initialRequests.filter((item) => item.includes("/h5p/")),
    firstHeight,
    feedbackText: feedbackText?.trim(),
    expandedHeight,
    collapsedHeight,
    stableHeight: stableHeightB,
    innerGeometry,
    playerNetworkHits: server.counts.get(playerPath) || 0,
    externalRequests,
    writeRequests,
    consoleErrors,
    storage: {
      before: storageBefore,
      afterInteraction: storageAfterInteraction,
      afterReload: storageAfterReload,
      interactiveStateRestored: false
    },
    layout,
    screenshot
  };
}

async function layoutCase(browser, server, viewport) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
    colorScheme: "light"
  });
  const page = await context.newPage();
  await page.goto(new URL(fixturePath, server.baseURL).href, { waitUntil: "load" });
  const first = page.locator("[data-udg-h5p]").first();
  await first.locator('[data-h5p-action="load"]').click();
  await page.waitForFunction(
    () => document.querySelector('[data-udg-h5p]')?.dataset.state === "ready",
    null,
    { timeout: 15000 }
  );
  const result = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    iframeWidth: document.querySelector(".udg-h5p__iframe")?.getBoundingClientRect().width || 0
  }));
  assert(result.scrollWidth <= result.width, `${viewport.width}px: overflow horizontal`);
  assert(result.iframeWidth <= result.width, `${viewport.width}px: iframe desbordado`);
  await context.close();
  return { viewport, ...result };
}

async function errorFallbackCase(browser, server) {
  const context = await browser.newContext({ viewport: { width: 768, height: 900 } });
  const page = await context.newPage();
  const indexPattern = "**/h5p/udgia/v1/content-index.json";
  await page.route(indexPattern, (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ error: "sonda deliberada" })
    })
  );
  await page.goto(new URL(fixturePath, server.baseURL).href, { waitUntil: "load" });
  const first = page.locator("[data-udg-h5p]").first();
  await first.locator('[data-h5p-action="load"]').click();
  await page.waitForFunction(
    () => document.querySelector("[data-udg-h5p]")?.dataset.state === "error",
    null,
    { timeout: 15000 }
  );
  const failed = {
    state: await first.getAttribute("data-state"),
    iframeCount: await first.locator("iframe").count(),
    fallbackOpen: await first.locator(".udg-h5p__fallback").evaluate((element) => element.open),
    fallbackText: (await first.locator(".udg-h5p__fallback-body").textContent())?.trim(),
    retryText: (await first.locator('[data-h5p-action="load"]').textContent())?.trim()
  };
  assert(failed.iframeCount === 0, "El iframe fallido no se retiró");
  assert(failed.fallbackOpen && failed.fallbackText.length > 80, "El fallback de error no quedó utilizable");
  assert(failed.retryText === "Reintentar actividad", "No apareció el control de reintento");

  await page.unroute(indexPattern);
  await first.locator('[data-h5p-action="load"]').click();
  await page.waitForFunction(
    () => document.querySelector("[data-udg-h5p]")?.dataset.state === "ready",
    null,
    { timeout: 15000 }
  );
  const recovered = {
    state: await first.getAttribute("data-state"),
    fallbackOpen: await first.locator(".udg-h5p__fallback").evaluate((element) => element.open),
    iframeCount: await first.locator("iframe").count()
  };
  assert(
    recovered.state === "ready" && !recovered.fallbackOpen && recovered.iframeCount === 1,
    `El reintento no recuperó la actividad: ${JSON.stringify(recovered)}`
  );
  await context.close();
  return { failed, recovered };
}

async function cspCase(browser, server) {
  const context = await browser.newContext();
  const externalAttempts = [];
  const externalResponses = [];
  const externalFailures = [];
  const isExternal = (rawURL) => {
    const url = new URL(rawURL);
    return url.origin !== new URL(server.baseURL).origin && !["data:", "blob:"].includes(url.protocol);
  };
  context.on("request", (request) => {
    if (isExternal(request.url())) externalAttempts.push(request.url());
  });
  context.on("response", (response) => {
    if (isExternal(response.url())) externalResponses.push(response.url());
  });
  context.on("requestfailed", (request) => {
    if (isExternal(request.url())) {
      externalFailures.push({
        url: request.url(),
        error: request.failure()?.errorText || "desconocido"
      });
    }
  });
  const page = await context.newPage();
  const embedURL = new URL("h5p/udgia/v1/embed.html", server.baseURL);
  embedURL.searchParams.set("content", "runtime-probe");
  embedURL.searchParams.set("instance", "csp-probe");
  await page.goto(embedURL.href, { waitUntil: "load" });
  await frameWithSelector(page, ".udg-runtime-probe");
  await page.evaluate(() => {
    window.__udgCspViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.__udgCspViolations.push({
        blockedURI: event.blockedURI,
        effectiveDirective: event.effectiveDirective
      });
    });
  });

  const externalScriptBlocked = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        const timeout = window.setTimeout(() => resolve(true), 1000);
        script.src = "https://example.invalid/udgia-csp-probe.js";
        script.addEventListener("load", () => {
          window.clearTimeout(timeout);
          resolve(false);
        });
        script.addEventListener("error", () => {
          window.clearTimeout(timeout);
          resolve(true);
        });
        document.head.append(script);
      })
  );
  const connectBlocked = await page.evaluate(async () => {
    try {
      await fetch("https://example.invalid/udgia-csp-probe");
      return false;
    } catch {
      return true;
    }
  });
  await page.waitForTimeout(250);
  const violations = await page.evaluate(() => window.__udgCspViolations);
  assert(externalScriptBlocked, "La CSP permitió un script externo");
  assert(connectBlocked, "La CSP permitió una conexión externa");
  assert(
    violations.some((violation) => violation.effectiveDirective.startsWith("script-src")),
    `La CSP no registró la violación de script: ${JSON.stringify(violations)}`
  );
  assert(
    violations.some((violation) => violation.effectiveDirective === "connect-src"),
    `La CSP no registró la violación de conexión: ${JSON.stringify(violations)}`
  );
  assert(externalResponses.length === 0, `La sonda CSP recibió respuesta externa: ${externalResponses.join(", ")}`);
  await context.close();
  return {
    externalScriptBlocked,
    connectBlocked,
    violations,
    externalAttempts,
    externalFailures,
    externalResponses
  };
}

async function axeCase(browser, server) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 844 },
    reducedMotion: "reduce",
    bypassCSP: true
  });
  const page = await context.newPage();
  await page.goto(new URL(fixturePath, server.baseURL).href, { waitUntil: "load" });
  const first = page.locator("[data-udg-h5p]").first();
  await first.locator('[data-h5p-action="load"]').click();
  await page.waitForFunction(
    () => document.querySelector("[data-udg-h5p]")?.dataset.state === "ready",
    null,
    { timeout: 15000 }
  );
  const contentFrame = await frameWithSelector(page, ".udg-runtime-probe");
  const documentViolations = await axeAudit(page.mainFrame(), "axe/documento");
  const contentViolations = await axeAudit(contentFrame, "axe/contenido-h5p");
  await context.close();
  return {
    bypassScope: "Sólo inyección de axe; los recorridos funcional y CSP usan política real",
    seriousOrCritical: documentViolations.length + contentViolations.length
  };
}

async function noJavaScriptCase(browser, server) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(new URL(fixturePath, server.baseURL).href, { waitUntil: "load" });
  const result = {
    iframes: await page.locator(".udg-h5p__iframe").count(),
    fallbackVisible: await page.locator(".udg-h5p__fallback").first().isVisible(),
    fallbackText: (await page.locator(".udg-h5p__fallback-body").first().textContent())?.trim()
  };
  assert(result.iframes === 0, "Sin JavaScript se creó un iframe");
  assert(result.fallbackVisible && result.fallbackText.length > 80, "Sin JavaScript falta la alternativa");
  await context.close();
  return result;
}

async function nonH5PCase(browser, server) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const start = server.requests.length;
  const response = await page.goto(new URL("about/", server.baseURL).href, { waitUntil: "load" });
  assert(response?.status() === 200, "La página de control sin H5P no respondió HTTP 200");
  const requests = server.requests.slice(start).filter((pathname) => pathname.includes("/h5p/"));
  assert(requests.length === 0, `Una página sin H5P solicitó runtime: ${requests.join(", ")}`);
  const listingResponse = await page.goto(new URL("laboratorio/", server.baseURL).href, {
    waitUntil: "load"
  });
  assert(listingResponse?.status() === 200, "El listado de Laboratorio no respondió HTTP 200");
  const fixtureLinks = await page.locator('a[href*="/laboratorio/h5p-runtime/"]').count();
  assert(fixtureLinks === 0, "La fixture técnica apareció en el listado curricular");
  await context.close();
  return {
    controlPath: "about/",
    runtimeRequests: requests,
    listingPath: "laboratorio/",
    fixtureLinks
  };
}

await mkdir(evidenceDirectory, { recursive: true });
await mkdir(path.dirname(reportPath), { recursive: true });
const temporaryDirectory = await mkdtemp(path.join(tmpdir(), "udgia-h5p-qa-"));
const rootOutput = path.join(temporaryDirectory, "root");
const subpathOutput = path.join(temporaryDirectory, "subpath");
await mkdir(rootOutput, { recursive: true });
await mkdir(subpathOutput, { recursive: true });

const rootServer = await startServer(rootOutput, "/");
const subpathServer = await startServer(subpathOutput, "/aprendizaje-ia/");
let browser;

try {
  const builds = [
    { mode: "root", ...runHugo(rootOutput, rootServer.baseURL) },
    { mode: "subpath", ...runHugo(subpathOutput, subpathServer.baseURL) }
  ];
  const runtimeVerification = command("npm", ["run", "h5p:verify"]);
  assert(runtimeVerification.status === 0, `h5p:verify falló: ${runtimeVerification.stderr}`);
  const security = await securityProbes(temporaryDirectory);

  const browserOptions = {
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"]
  };
  if (chromiumBinary) browserOptions.executablePath = chromiumBinary;
  browser = await chromium.launch(browserOptions);

  const cases = [
    await functionalCase(browser, rootServer, "root-375", { width: 375, height: 844 }),
    await functionalCase(browser, subpathServer, "subpath-1280", { width: 1280, height: 900 })
  ];
  const layouts = [
    await layoutCase(browser, rootServer, { width: 320, height: 780 }),
    await layoutCase(browser, subpathServer, { width: 768, height: 1024 })
  ];
  const errorFallback = await errorFallbackCase(browser, subpathServer);
  const csp = await cspCase(browser, subpathServer);
  const axe = await axeCase(browser, rootServer);
  const noJavaScript = await noJavaScriptCase(browser, subpathServer);
  const nonH5P = await nonH5PCase(browser, subpathServer);
  const manifest = JSON.parse(
    await readFile(path.join(repoRoot, "static/h5p/udgia/v1/runtime-manifest.json"), "utf8")
  );

  const report = {
    status: "PASS",
    scope: "UDGIA-003 runtime H5P; fixture no curricular",
    moodleChanged: false,
    builds,
    runtime: {
      player: manifest.player,
      totalBytes: manifest.totalBytes,
      files: manifest.files.length,
      contents: Object.keys(manifest.contents)
    },
    security,
    cases,
    layouts,
    errorFallback,
    csp,
    axe,
    noJavaScript,
    nonH5P,
    assertions: {
      lazyLoad: true,
      twoIndependentMounts: true,
      commonAssetsCached: true,
      dynamicHeight: true,
      keyboardAndFocus: true,
      fallbackNoJsErrorAndPrint: true,
      cspEnforced: true,
      rootAndSubpath: true,
      reducedMotion: true,
      noDarkVariant: true,
      noTelemetryGradesOrPersistence: true,
      axeSeriousOrCritical: axe.seriousOrCritical
    }
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`PASS ${path.relative(repoRoot, reportPath)}\n`);
} catch (error) {
  const report = {
    status: "FAIL",
    moodleChanged: false,
    error: error.stack || String(error),
    failures
  };
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  throw error;
} finally {
  await browser?.close();
  await rootServer.close();
  await subpathServer.close();
  await rm(temporaryDirectory, { recursive: true, force: true });
}
