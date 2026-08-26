export const DEFAULT_H5P_HOST_STYLES_TIMEOUT_MS = 10000;

export function inspectH5pHostStyles(readinessOnly = false) {
  const scripts = Array.from(document.scripts)
    .map((script) => script.src)
    .filter(Boolean);
  const hostScripts = scripts.filter((source) => {
    try {
      return new URL(source, document.baseURI).pathname.endsWith(
        "/h5p/udgia/v1/host.js"
      );
    } catch {
      return false;
    }
  });
  const expectedStyleURLs = [
    ...new Set(hostScripts.map((source) => new URL("host.css", source).href))
  ];
  const documentStyleSheets = Array.from(document.styleSheets);
  const links = Array.from(
    document.querySelectorAll("link[data-udg-h5p-host]")
  ).map((link) => {
    const sheet = link.sheet;
    let cssRulesAvailable = false;
    let cssRuleCount = null;
    let cssRulesError = null;
    if (sheet) {
      try {
        cssRuleCount = sheet.cssRules.length;
        cssRulesAvailable = true;
      } catch (error) {
        cssRulesError = `${error?.name || "Error"}: ${error?.message || error}`;
      }
    }
    return {
      dataURL: link.dataset.udgH5pHost || "",
      href: link.href,
      rel: link.rel,
      disabled: link.disabled,
      loadState: link.dataset.udgH5pHostState || "unknown",
      sheetHref: sheet?.href || "",
      sheetListed: Boolean(sheet && documentStyleSheets.includes(sheet)),
      cssRulesAvailable,
      cssRuleCount,
      cssRulesError
    };
  });
  const correspondingLinks = expectedStyleURLs.map((expectedURL) => ({
    expectedURL,
    link: links.find(
      ({ dataURL, href, rel }) =>
        dataURL === expectedURL &&
        href === expectedURL &&
        rel.split(/\s+/).includes("stylesheet")
    ) || null
  }));
  const mounts = Array.from(document.querySelectorAll("[data-udg-h5p]")).map(
    (mount) => {
      const mountStyle = getComputedStyle(mount);
      const fallback = mount.querySelector(".udg-h5p__fallback");
      const fallbackStyle = fallback ? getComputedStyle(fallback) : null;
      const plainText = fallback
        ? Array.from(
            fallback.querySelectorAll(
              ".udg-h5p__fallback-body p:not([class]), " +
                ".udg-h5p__fallback-body li:not([class])"
            )
          )
        : [];
      const inkToken = mountStyle.getPropertyValue("--h5p-ink").trim();
      const mountBackground = mountStyle.backgroundColor;
      const fallbackBackground = fallbackStyle?.backgroundColor || "";
      const plainTextColorMismatches = plainText
        .map((element) => ({
          element: element.tagName.toLowerCase(),
          color: getComputedStyle(element).color,
          text: element.textContent.trim().slice(0, 80)
        }))
        .filter(({ color }) => color !== mountStyle.color);
      const opaqueBackground = (value) =>
        Boolean(value) && value !== "transparent" && !/rgba\([^)]*,\s*0\s*\)$/.test(value);
      return {
        instance: mount.dataset.instance || "",
        inkToken,
        mountColor: mountStyle.color,
        mountBackground,
        fallbackBackground,
        plainTextCount: plainText.length,
        plainTextColorMismatches,
        applied:
          Boolean(inkToken) &&
          opaqueBackground(mountBackground) &&
          opaqueBackground(fallbackBackground) &&
          plainTextColorMismatches.length === 0
      };
    }
  );
  const ready =
    expectedStyleURLs.length === 1 &&
    correspondingLinks.every(
      ({ link }) =>
        link &&
        !link.disabled &&
        link.sheetHref === link.href &&
        link.sheetListed &&
        link.cssRulesAvailable &&
        link.cssRuleCount > 0 &&
        link.loadState === "loaded"
    ) &&
    mounts.length > 0 &&
    mounts.every(({ applied }) => applied);

  if (readinessOnly) return ready;

  return {
    ready,
    documentURL: document.URL,
    documentReadyState: document.readyState,
    h5pMountCount: mounts.length,
    mounts,
    hostScripts,
    expectedStyleURLs,
    correspondingLinks,
    links,
    styleSheetURLs: documentStyleSheets.map((sheet) => sheet.href).filter(Boolean),
    resources: performance
      .getEntriesByType("resource")
      .filter(({ name }) => expectedStyleURLs.includes(name))
      .map(({ name, initiatorType, duration, responseEnd, transferSize }) => ({
        name,
        initiatorType,
        duration,
        responseEnd,
        transferSize
      }))
  };
}

export async function waitForH5pHostStyles(
  page,
  label,
  { timeout = DEFAULT_H5P_HOST_STYLES_TIMEOUT_MS } = {}
) {
  const deadline = Date.now() + timeout;
  let consecutiveReadyFrames = 0;
  let timeoutCause = null;
  try {
    while (consecutiveReadyFrames < 2) {
      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        timeoutCause = new Error(`Timeout ${timeout} ms`);
        timeoutCause.name = "TimeoutError";
        break;
      }
      await page.waitForFunction(inspectH5pHostStyles, true, {
        timeout: remaining
      });
      await page.evaluate(
        () => new Promise((resolve) => requestAnimationFrame(() => resolve()))
      );
      const stillReady = await page.evaluate(inspectH5pHostStyles, true);
      consecutiveReadyFrames = stillReady ? consecutiveReadyFrames + 1 : 0;
    }
  } catch (error) {
    if (error?.name !== "TimeoutError") throw error;
    timeoutCause = error;
  }

  if (consecutiveReadyFrames < 2) {
    const diagnostic = await page.evaluate(inspectH5pHostStyles).catch(
      (evaluationError) => ({
        evaluationError:
          `${evaluationError?.name || "Error"}: ` +
          `${evaluationError?.message || evaluationError}`
      })
    );
    throw new Error(
      `${label}: host.css no quedó cargado y disponible en el CSSOM ` +
        `después de ${timeout} ms. Diagnóstico: ${JSON.stringify(diagnostic)}`,
      { cause: timeoutCause }
    );
  }

  return page.evaluate(inspectH5pHostStyles);
}
