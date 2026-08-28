(() => {
  "use strict";

  const script = document.currentScript;
  const styleURL = script?.src ? new URL("host.css", script.src).href : "";
  const components = new Map();

  if (styleURL) {
    let link = document.querySelector(`link[data-udg-h5p-host="${styleURL}"]`);
    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = styleURL;
      link.dataset.udgH5pHost = styleURL;
    }
    if (!link.dataset.udgH5pHostState) {
      link.dataset.udgH5pHostState = "loading";
      link.addEventListener(
        "load",
        () => {
          link.dataset.udgH5pHostState = "loaded";
        },
        { once: true }
      );
      link.addEventListener(
        "error",
        () => {
          link.dataset.udgH5pHostState = "error";
        },
        { once: true }
      );
      if (link.sheet) {
        try {
          if (link.sheet.cssRules.length > 0) {
            link.dataset.udgH5pHostState = "loaded";
          }
        } catch {
          // La carga o el origen todavía no permiten consultar el CSSOM.
        }
      }
    }
    if (!link.isConnected) document.head.append(link);
  }

  const setStatus = (component, state, message) => {
    component.root.dataset.state = state;
    component.status.textContent = message;
  };

  const openFallback = (component) => {
    component.fallback.open = true;
  };

  const fail = (component, message) => {
    removeFrame(component);
    setStatus(component, "error", message);
    component.loadButton.hidden = false;
    component.loadButton.textContent = "Reintentar actividad";
    component.resetButton.hidden = true;
    openFallback(component);
  };

  const removeFrame = (component) => {
    window.clearTimeout(component.timeout);
    component.frame?.remove();
    component.frame = null;
    component.frameHost.replaceChildren();
  };

  const currentAppearance = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  const sendAppearance = (component) => {
    if (!component.frame?.contentWindow) return;
    component.frame.contentWindow.postMessage(
      {
        type: "udg-h5p-appearance",
        instance: component.instance,
        appearance: currentAppearance()
      },
      window.location.origin
    );
  };

  const load = (component) => {
    if (component.frame || component.root.dataset.state === "loading") return;

    setStatus(component, "loading", "Cargando la actividad interactiva…");
    component.loadButton.hidden = true;
    component.resetButton.hidden = true;

    const frame = document.createElement("iframe");
    frame.className = "udg-h5p__iframe";
    frame.title = component.title;
    frame.loading = "eager";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
    if (component.fullScreen) {
      frame.allow = "fullscreen";
      frame.allowFullscreen = true;
    }
    const embedURL = new URL(component.embedURL, window.location.href);
    embedURL.searchParams.set("appearance", currentAppearance());
    frame.src = `${embedURL.pathname}${embedURL.search}`;
    component.frame = frame;
    component.frameHost.append(frame);

    frame.addEventListener("error", () => {
      fail(component, "No fue posible cargar la actividad. Usa la versión accesible.");
    });

    component.timeout = window.setTimeout(() => {
      fail(component, "La actividad tardó demasiado en responder. Usa la versión accesible.");
    }, 15000);
  };

  const reset = (component) => {
    removeFrame(component);
    setStatus(component, "idle", "Actividad reiniciada. Puedes abrirla de nuevo.");
    component.loadButton.hidden = false;
    component.loadButton.textContent = "Abrir actividad interactiva";
    component.resetButton.hidden = true;
  };

  const initialize = (root) => {
    const component = {
      root,
      instance: root.dataset.instance,
      title: root.dataset.title,
      embedURL: root.dataset.embedUrl,
      loadMode: root.dataset.load,
      fullScreen: root.dataset.fullscreen === "true",
      loadButton: root.querySelector('[data-h5p-action="load"]'),
      resetButton: root.querySelector('[data-h5p-action="reset"]'),
      status: root.querySelector("[data-h5p-status]"),
      frameHost: root.querySelector("[data-h5p-frame]"),
      fallback: root.querySelector(".udg-h5p__fallback"),
      frame: null,
      timeout: null
    };

    components.set(component.instance, component);
    component.loadButton.addEventListener("click", () => load(component));
    component.resetButton.addEventListener("click", () => reset(component));

    if (component.loadMode === "visible" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer.disconnect();
            load(component);
          }
        },
        { rootMargin: "480px 0px" }
      );
      observer.observe(root);
    }
  };

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || !event.data?.type) return;
    const component = components.get(event.data.instance);
    if (!component || event.source !== component.frame?.contentWindow) return;

    if (event.data.type === "udg-h5p-ready") {
      window.clearTimeout(component.timeout);
      setStatus(component, "ready", "Actividad lista.");
      component.resetButton.hidden = false;
      component.fallback.open = false;
      component.frame.contentWindow.postMessage(
        { type: "udg-h5p-request-height", instance: component.instance },
        window.location.origin
      );
      sendAppearance(component);
    } else if (event.data.type === "udg-h5p-height") {
      const height = Math.max(280, Math.min(6000, Number(event.data.height) || 0));
      component.frame.style.height = `${Math.ceil(height)}px`;
    } else if (event.data.type === "udg-h5p-error") {
      fail(component, "No fue posible iniciar la actividad. Usa la versión accesible.");
    }
  });

  // El sitio conmuta añadiendo/quitando `dark` en <html>. Las clases no cruzan la
  // frontera del iframe, así que hay que retransmitir cada cambio.
  new MutationObserver(() => {
    for (const component of components.values()) sendAppearance(component);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"]
  });

  window.addEventListener("beforeprint", () => {
    for (const component of components.values()) {
      component.fallback.dataset.wasOpen = component.fallback.open ? "true" : "false";
      component.fallback.open = true;
    }
  });

  window.addEventListener("afterprint", () => {
    for (const component of components.values()) {
      component.fallback.open = component.fallback.dataset.wasOpen === "true";
      delete component.fallback.dataset.wasOpen;
    }
  });

  document.querySelectorAll("[data-udg-h5p]").forEach(initialize);
})();
