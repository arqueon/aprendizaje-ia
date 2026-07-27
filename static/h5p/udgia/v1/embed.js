(() => {
  "use strict";

  const query = new URLSearchParams(window.location.search);
  const contentID = query.get("content") || "";
  const instance = query.get("instance") || "";
  const status = document.getElementById("status");
  const container = document.getElementById("h5p-container");
  let observer;
  let polling;
  let scheduledHeightFrame;

  const validSlug = (value) => /^[a-z0-9][a-z0-9-]{0,79}$/.test(value);
  const send = (type, detail = {}) => {
    window.parent.postMessage({ type, instance, ...detail }, window.location.origin);
  };

  const fitNestedFrames = () => {
    for (const frame of container.querySelectorAll("iframe")) {
      try {
        const nestedDocument = frame.contentDocument;
        if (!nestedDocument?.documentElement || !nestedDocument.body) continue;
        const nestedHeight = Math.max(
          nestedDocument.documentElement.scrollHeight,
          nestedDocument.body.scrollHeight
        );
        if (nestedHeight > 280 && Math.abs(frame.getBoundingClientRect().height - nestedHeight) > 1) {
          frame.style.height = `${Math.ceil(nestedHeight)}px`;
        }
      } catch {
        // Un adaptador futuro de origen distinto conservará el protocolo de mensajes.
      }
    }
  };

  const sendHeight = () => {
    fitNestedFrames();
    const height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      container.scrollHeight
    );
    send("udg-h5p-height", { height });
  };

  const scheduleHeight = () => {
    if (scheduledHeightFrame) return;
    scheduledHeightFrame = window.requestAnimationFrame(() => {
      scheduledHeightFrame = null;
      sendHeight();
    });
  };

  const fail = (error) => {
    container.setAttribute("aria-busy", "false");
    status.classList.add("embed-status--error");
    status.textContent = "No fue posible cargar esta actividad. Usa la versión accesible de la página.";
    console.error("IA UDGPlus H5P:", error);
    send("udg-h5p-error");
    sendHeight();
  };

  window.addEventListener("message", (event) => {
    if (
      event.origin === window.location.origin &&
      event.data?.type === "udg-h5p-request-height" &&
      event.data.instance === instance
    ) {
      sendHeight();
    }
  });

  window.addEventListener("error", (event) => {
    if (/ResizeObserver loop/i.test(String(event.message || ""))) {
      event.preventDefault();
      scheduleHeight();
      return;
    }
    fail(event.error || event.message);
  });
  window.addEventListener("unhandledrejection", (event) => fail(event.reason));

  const start = async () => {
    if (!validSlug(contentID) || !validSlug(instance)) {
      throw new Error("Identificador H5P no permitido");
    }

    const response = await fetch("./content-index.json", {
      credentials: "same-origin",
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`Catálogo H5P no disponible (${response.status})`);

    const index = await response.json();
    const entry = index.contents?.[contentID];
    if (!entry) throw new Error("Contenido H5P no registrado");

    const local = (path) => new URL(path, window.location.href).href;
    const customCss = [local("./themes/udg-c.css")];
    if (entry.adapter) customCss.push(local(`./adapters/${entry.adapter}`));

    const options = {
      id: instance,
      h5pJsonPath: local(`./content/${entry.path}`),
      contentJsonPath: local(`./content/${entry.path}/content`),
      librariesPath: local("./libraries"),
      frameJs: local("./player/frame.bundle.js"),
      frameCss: local("./player/styles/h5p.css"),
      customCss,
      frame: false,
      copyright: false,
      export: false,
      icon: false,
      fullScreen: entry.fullScreen === true,
      embed: false,
      reportingIsEnabled: entry.reportingIsEnabled === true,
      postUserStatistics: false,
      saveFreq: false
    };

    await new H5PStandalone.H5P(container, options);
    container.setAttribute("aria-busy", "false");
    status.remove();
    observer = new ResizeObserver(scheduleHeight);
    observer.observe(container);
    polling = window.setInterval(sendHeight, 250);
    window.setTimeout(() => window.clearInterval(polling), 10000);
    send("udg-h5p-ready");
    sendHeight();
    for (const delay of [250, 900, 1800, 3500]) {
      window.setTimeout(sendHeight, delay);
    }
  };

  start().catch(fail);
})();
