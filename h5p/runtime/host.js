(() => {
  "use strict";

  const script = document.currentScript;
  const styleURL = script?.src ? new URL("host.css", script.src).href : "";
  const components = new Map();

  if (styleURL && !document.querySelector(`link[data-udg-h5p-host="${styleURL}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = styleURL;
    link.dataset.udgH5pHost = styleURL;
    document.head.append(link);
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
    frame.src = component.embedURL;
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
    } else if (event.data.type === "udg-h5p-height") {
      const height = Math.max(280, Math.min(6000, Number(event.data.height) || 0));
      component.frame.style.height = `${Math.ceil(height)}px`;
    } else if (event.data.type === "udg-h5p-error") {
      fail(component, "No fue posible iniciar la actividad. Usa la versión accesible.");
    }
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
