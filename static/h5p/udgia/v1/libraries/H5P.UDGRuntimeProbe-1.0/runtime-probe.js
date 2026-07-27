var H5P = H5P || {};

H5P.UDGRuntimeProbe = (function (EventDispatcher) {
  "use strict";

  function RuntimeProbe(params, contentId) {
    EventDispatcher.call(this);
    this.params = params || {};
    this.contentId = contentId;
  }

  RuntimeProbe.prototype = Object.create(EventDispatcher.prototype);
  RuntimeProbe.prototype.constructor = RuntimeProbe;

  RuntimeProbe.prototype.attach = function ($container) {
    document.title = this.params.title || "Actividad H5P de IA UDGPlus";

    const root = document.createElement("section");
    root.className = "udg-runtime-probe";

    const copy = document.createElement("div");
    copy.className = "udg-runtime-probe__copy";

    const kicker = document.createElement("p");
    kicker.className = "udg-runtime-probe__kicker";
    kicker.textContent = this.params.kicker || "UDGIA-003";

    const title = document.createElement("h2");
    title.className = "udg-runtime-probe__title";
    title.textContent = this.params.title || "Runtime H5P";

    const prompt = document.createElement("p");
    prompt.className = "udg-runtime-probe__prompt";
    prompt.textContent = this.params.prompt || "";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "udg-runtime-probe__button";
    button.textContent = this.params.revealLabel || "Comprobar";
    button.setAttribute("aria-expanded", "false");

    const feedback = document.createElement("p");
    feedback.id = `udg-runtime-probe-feedback-${this.contentId}`;
    feedback.className = "udg-runtime-probe__feedback";
    feedback.hidden = true;
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    button.setAttribute("aria-controls", feedback.id);

    button.addEventListener("click", () => {
      const revealing = feedback.hidden;
      feedback.hidden = !revealing;
      feedback.textContent = revealing ? this.params.feedback || "Comprobación correcta." : "";
      button.setAttribute("aria-expanded", revealing ? "true" : "false");
      button.textContent = revealing
        ? "Ocultar comprobación"
        : this.params.revealLabel || "Comprobar";
      this.trigger("resize");
    });

    copy.append(kicker, title, prompt, button, feedback);

    const figure = document.createElement("figure");
    figure.className = "udg-runtime-probe__figure";
    const image = document.createElement("img");
    image.src = H5P.getPath(this.params.image?.path || "", this.contentId);
    image.alt = this.params.imageAlt || "";
    figure.append(image);

    root.append(copy, figure);
    $container.get(0).append(root);
    this.trigger("resize");
  };

  return RuntimeProbe;
})(H5P.EventDispatcher);
