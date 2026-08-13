(function () {
  "use strict";

  const STORAGE_KEY = "udgia021-m6-activity-review-v2";
  const textFields = ["purpose", "evidence", "experience", "assistance", "alternative"];
  const relations = [
    {
      name: "purposeEvidence",
      group: "purpose-evidence-group",
      label: "Lo que quieres que aprendan y el trabajo final",
      noTitle: "Primero ajusta lo que pedirás al final",
      unsureTitle: "Primero comprueba lo que pedirás al final",
      noExplanation: "Marcaste que el trabajo final no obliga al grupo a hacer lo que escribiste en el primer paso.",
      unsureExplanation: "Todavía no está claro si el trabajo final permitirá ver el aprendizaje que buscas.",
      action: "Pide una acción que muestre ese aprendizaje. Si quieres que comparen, solicita una comparación con razones; elegir una opción no basta."
    },
    {
      name: "evidenceExperience",
      group: "evidence-experience-group",
      label: "El trabajo final y la práctica previa",
      noTitle: "Primero ajusta la práctica",
      unsureTitle: "Primero comprueba la práctica",
      noExplanation: "Marcaste que el grupo no practicará el tipo de trabajo que tendrá que entregar.",
      unsureExplanation: "Todavía no está claro cómo la práctica prepara la entrega final.",
      action: "Añade un intento breve del mismo tipo de trabajo, permite compararlo con un ejemplo y deja tiempo para revisarlo antes de entregar."
    },
    {
      name: "experienceAssistance",
      group: "experience-assistance-group",
      label: "La práctica y la ayuda disponible",
      noTitle: "Primero delimita la ayuda",
      unsureTitle: "Primero aclara qué hará la ayuda",
      noExplanation: "Marcaste que la ayuda hace una parte que el grupo necesita aprender.",
      unsureExplanation: "Todavía no está claro qué seguirá haciendo la persona cuando reciba la ayuda.",
      action: "Haz explícito el límite. La ayuda puede ofrecer una objeción, una fuente o una pregunta; la comparación, la comprobación y la decisión quedan en manos de la persona."
    },
    {
      name: "alternativeEquivalent",
      group: "alternative-equivalent-group",
      label: "Las dos formas de recibir apoyo",
      noTitle: "Primero iguala las dos opciones",
      unsureTitle: "Primero compara las dos opciones",
      noExplanation: "Marcaste que la opción sin IA cambia el trabajo o pide menos que la otra.",
      unsureExplanation: "Todavía no está claro si ambas opciones permiten aprender y mostrar lo mismo.",
      action: "Cambia la forma de apoyo, no el aprendizaje. Conserva el mismo trabajo final y un tiempo parecido con IA, preguntas preparadas o revisión humana."
    }
  ];

  const example = {
    purpose: "Comparar dos fuentes sobre un problema de agua y explicar cuál sostiene mejor una afirmación.",
    evidence: "Elegir en una lista cuál de las dos fuentes parece más confiable.",
    experience: "Leer un resumen de cada fuente y responder una pregunta de selección.",
    assistance: "Una IA resume las dos fuentes antes de que la persona elija.",
    alternative: "El docente entrega un resumen preparado de las dos fuentes.",
    purposeEvidence: "no",
    evidenceExperience: "yes",
    experienceAssistance: "yes",
    alternativeEquivalent: "yes"
  };

  const form = document.getElementById("alignment-form");
  const errorSummary = document.getElementById("error-summary");
  const result = document.getElementById("review-result");
  const status = document.getElementById("draft-status");

  function valueOf(name) {
    const field = form.elements[name];
    if (!field) return "";
    if (field instanceof RadioNodeList) return field.value;
    return field.value.trim();
  }

  function setValue(name, value) {
    const field = form.elements[name];
    if (!field) return;
    if (field instanceof RadioNodeList) {
      Array.from(field).forEach((option) => { option.checked = option.value === value; });
      return;
    }
    field.value = value || "";
  }

  function currentState() {
    const state = {};
    [...textFields, ...relations.map((item) => item.name)].forEach((name) => {
      state[name] = valueOf(name);
    });
    return state;
  }

  function announce(message) {
    status.textContent = message;
  }

  function clearInvalidState() {
    textFields.forEach((name) => form.elements[name].removeAttribute("aria-invalid"));
    relations.forEach((item) => {
      document.getElementById(item.group).removeAttribute("data-invalid");
      Array.from(form.elements[item.name]).forEach((option) => option.removeAttribute("aria-invalid"));
    });
  }

  function validate() {
    clearInvalidState();
    const errors = [];

    textFields.forEach((name) => {
      const field = form.elements[name];
      if (field.value.trim().length < 12) {
        field.setAttribute("aria-invalid", "true");
        errors.push({ target: field, label: `${field.labels[0].textContent}: escribe al menos una frase breve.` });
      }
    });

    relations.forEach((item) => {
      if (!valueOf(item.name)) {
        const group = document.getElementById(item.group);
        group.setAttribute("data-invalid", "true");
        const options = Array.from(form.elements[item.name]);
        options.forEach((option) => option.setAttribute("aria-invalid", "true"));
        errors.push({ target: options[0], label: `${item.label}: elige sí, no o no estoy seguro.` });
      }
    });

    return errors;
  }

  function showErrors(errors) {
    const list = errorSummary.querySelector("ul");
    list.replaceChildren();
    errors.forEach((error, index) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = error.label;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        error.target.focus();
      });
      item.append(link);
      list.append(item);
      if (index === 0) errorSummary.dataset.firstTarget = error.target.id || error.target.name;
    });
    errorSummary.hidden = false;
    errorSummary.focus();
  }

  function appendSummary(term, description) {
    const summary = document.getElementById("result-summary");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    summary.append(dt, dd);
  }

  function renderResult() {
    errorSummary.hidden = true;
    const firstBreak = relations.find((item) => valueOf(item.name) !== "yes");
    const title = document.getElementById("result-title");
    const explanation = document.getElementById("result-explanation");
    const action = document.getElementById("result-action");

    if (!firstBreak) {
      title.textContent = "Tu actividad parece mantener el mismo aprendizaje";
      explanation.textContent = "Según tus cuatro respuestas, el grupo practica y entrega lo que esperas, y la ayuda no sustituye esa parte. La herramienta no puede comprobar si tu juicio es correcto.";
      action.textContent = "Pide a otra persona que lea la actividad sin tus explicaciones. Pregúntale qué aprenderá el grupo, qué hará para demostrarlo y qué trabajo seguirá siendo suyo.";
    }
    else {
      const isUnsure = valueOf(firstBreak.name) === "unsure";
      title.textContent = isUnsure ? firstBreak.unsureTitle : firstBreak.noTitle;
      explanation.textContent = isUnsure ? firstBreak.unsureExplanation : firstBreak.noExplanation;
      action.textContent = firstBreak.action;
    }

    const summary = document.getElementById("result-summary");
    summary.replaceChildren();
    appendSummary("Lo que quieres que aprendan", valueOf("purpose"));
    appendSummary("Trabajo final", valueOf("evidence"));
    appendSummary("Práctica previa", valueOf("experience"));
    appendSummary("Ayuda disponible", valueOf("assistance"));
    appendSummary("Apoyo sin IA", valueOf("alternative"));
    relations.forEach((item) => {
      const response = { yes: "Sí", no: "No", unsure: "No estoy seguro" }[valueOf(item.name)];
      appendSummary(item.label, response);
    });

    result.hidden = false;
    result.focus();
  }

  function fill(state) {
    [...textFields, ...relations.map((item) => item.name)].forEach((name) => setValue(name, state[name] || ""));
    clearInvalidState();
    errorSummary.hidden = true;
    result.hidden = true;
  }

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, savedAt: new Date().toISOString(), values: currentState() }));
      announce("Borrador guardado únicamente en este dispositivo.");
    }
    catch {
      announce("El navegador no permitió guardar. Puedes imprimir la hoja en su lugar.");
    }
  }

  function restoreDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || saved.version !== 2 || !saved.values) return;
      fill(saved.values);
      announce("Se recuperó el borrador que guardaste en este dispositivo.");
    }
    catch {
      announce("El navegador no permitió recuperar un borrador guardado.");
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const errors = validate();
    if (errors.length) {
      result.hidden = true;
      showErrors(errors);
      return;
    }
    renderResult();
  });

  document.getElementById("load-example").addEventListener("click", () => {
    const hasContent = textFields.some((name) => valueOf(name));
    if (hasContent && !window.confirm("Esto reemplazará lo que escribiste en el formulario. ¿Continuar?")) return;
    fill(example);
    announce("Ejemplo cargado. Pulsa “Comprobar mi actividad” para ver qué conviene ajustar.");
    form.elements.purpose.focus();
  });

  document.getElementById("save-draft").addEventListener("click", saveDraft);
  document.getElementById("print-review").addEventListener("click", () => window.print());
  document.getElementById("clear-draft").addEventListener("click", () => {
    if (!window.confirm("¿Borrar del formulario y de este dispositivo todo el borrador?")) return;
    form.reset();
    let storageCleared = false;
    try {
      localStorage.removeItem(STORAGE_KEY);
      storageCleared = true;
    }
    catch {
      storageCleared = false;
    }
    clearInvalidState();
    errorSummary.hidden = true;
    result.hidden = true;
    announce(storageCleared ? "El borrador fue borrado de este dispositivo." : "El formulario quedó limpio; el navegador no permitió acceder al almacenamiento.");
    form.elements.purpose.focus();
  });

  restoreDraft();
}());
