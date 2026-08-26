import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { chromium } from "playwright-core";
import { waitForH5pHostStyles } from "./qa-host-styles.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const playwrightChromium = chromium.executablePath();
const chromiumBinary = process.env.CHROMIUM_PATH ||
  ((await stat("/usr/bin/chromium").catch(() => null))
    ? "/usr/bin/chromium"
    : (await stat(playwrightChromium).catch(() => null))
      ? playwrightChromium
      : "");
const hostScript = await readFile(path.join(repoRoot, "h5p/runtime/host.js"), "utf8");
const hostStyles = await readFile(path.join(repoRoot, "h5p/runtime/host.css"), "utf8");

function deferred() {
  let resolve;
  const promise = new Promise((settle) => {
    resolve = settle;
  });
  return { promise, resolve };
}

async function startFixture() {
  const cssRequested = deferred();
  const cssRelease = deferred();
  const server = http.createServer(async (request, response) => {
    const requestURL = new URL(request.url, "http://127.0.0.1");
    if (requestURL.pathname === "/") {
      response.setHeader("content-type", "text/html; charset=utf-8");
      response.end(`<!doctype html>
        <html lang="es">
          <head><script defer src="/h5p/udgia/v1/host.js"></script></head>
          <body>
            <section class="udg-h5p" data-udg-h5p data-instance="race" data-title="Prueba"
              data-embed-url="/h5p/udgia/v1/embed.html" data-load="manual"
              data-fullscreen="false" data-state="idle">
              <button data-h5p-action="load">Abrir</button>
              <button data-h5p-action="reset" hidden>Reiniciar</button>
              <p data-h5p-status>En espera</p>
              <div data-h5p-frame></div>
              <details class="udg-h5p__fallback"><summary>Alternativa</summary>
                <div class="udg-h5p__fallback-body"><p>Explicación</p><ol><li>Paso</li></ol></div>
              </details>
            </section>
          </body>
        </html>`);
      return;
    }
    if (requestURL.pathname === "/h5p/udgia/v1/host.js") {
      response.setHeader("content-type", "text/javascript; charset=utf-8");
      response.end(hostScript);
      return;
    }
    if (requestURL.pathname === "/h5p/udgia/v1/host.css") {
      cssRequested.resolve();
      await cssRelease.promise;
      response.setHeader("content-type", "text/css; charset=utf-8");
      response.end(hostStyles);
      return;
    }
    response.writeHead(404).end("Not found");
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen({ host: "127.0.0.1", port: 0 }, resolve);
  });
  return {
    url: `http://127.0.0.1:${server.address().port}/`,
    cssRequested: cssRequested.promise,
    releaseCSS: cssRelease.resolve,
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

test(
  "el QA espera host.css y diagnostica un timeout antes de medir",
  { skip: !chromiumBinary, timeout: 15000 },
  async (t) => {
    const browser = await chromium.launch({
      executablePath: chromiumBinary,
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"]
    });
    try {
      await t.test("no continúa mientras el CSS sigue pendiente", async () => {
        const fixture = await startFixture();
        const page = await browser.newPage();
        try {
          await page.goto(fixture.url, { waitUntil: "commit" });
          const wait = waitForH5pHostStyles(page, "regresión QF3", { timeout: 5000 });
          await fixture.cssRequested;
          const settledEarly = await Promise.race([
            wait.then(() => true),
            new Promise((resolve) => setTimeout(() => resolve(false), 100))
          ]);
          assert.equal(settledEarly, false, "la barrera terminó antes de recibir host.css");
          fixture.releaseCSS();
          const state = await wait;
          assert.equal(state.ready, true);
          assert.equal(state.correspondingLinks.length, 1);
          assert.equal(state.correspondingLinks[0].link.loadState, "loaded");
          assert.equal(state.correspondingLinks[0].link.cssRulesAvailable, true);
          assert.ok(state.correspondingLinks[0].link.cssRuleCount > 0);
          assert.equal(state.mounts.length, 1);
          assert.equal(state.mounts[0].applied, true);
          assert.equal(state.mounts[0].plainTextCount, 2);
          assert.deepEqual(state.mounts[0].plainTextColorMismatches, []);
        } finally {
          fixture.releaseCSS();
          await page.close();
          await fixture.close();
        }
      });

      await t.test("el timeout incluye estado del link y del CSSOM", async () => {
        const fixture = await startFixture();
        const page = await browser.newPage();
        try {
          await page.goto(fixture.url, { waitUntil: "commit" });
          await fixture.cssRequested;
          await assert.rejects(
            waitForH5pHostStyles(page, "regresión QF3", { timeout: 150 }),
            (error) => {
              assert.match(error.message, /host\.css no quedó cargado y disponible/);
              assert.match(error.message, /expectedStyleURLs/);
              assert.match(error.message, /cssRulesAvailable/);
              assert.match(error.message, /h5pMountCount/);
              return true;
            }
          );
        } finally {
          fixture.releaseCSS();
          await page.close();
          await fixture.close();
        }
      });
    } finally {
      await browser.close();
    }
  }
);
