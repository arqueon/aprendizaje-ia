(function () {
  "use strict";

  const STORAGE_KEY = "udgia021-b2-suggestion-comparison-v1";
  const textFields = [
    "purpose", "original", "suggestionOrigin", "suggestionA", "changeA", "consequenceA",
    "verificationA", "suggestionB", "changeB", "consequenceB", "verificationB",
    "comparison", "revised"
  ];
  const choiceFields = [
    { name: "preservesA", group: "preserves-a-group", label: "Propósito y sugerencia 1" },
    { name: "needsCheckA", group: "check-a-group", label: "Comprobación de la sugerencia 1" },
    { name: "decisionA", group: "decision-a-group", label: "Decisión sobre la sugerencia 1" },
    { name: "preservesB", group: "preserves-b-group", label: "Propósito y sugerencia 2" },
    { name: "needsCheckB", group: "check-b-group", label: "Comprobación de la sugerencia 2" },
    { name: "decisionB", group: "decision-b-group", label: "Decisión sobre la sugerencia 2" }
  ];

  const example = {
    purpose: "La medición describe un punto y un día; no demuestra que todo el arroyo sea seguro.",
    original: "La muestra tomada junto al puente no superó el límite permitido. Este resultado describe ese punto y ese día; no alcanza para afirmar que todo el arroyo sea seguro.",
    suggestionOrigin: "Pedí a una IA generativa que señalara una posible conclusión y un dato que quizá hiciera falta comprobar. Las sugerencias se refieren al borrador; no sustituyen el registro de campo.",
    suggestionA: "La muestra demuestra que el agua del arroyo es segura.",
    changeA: "Quita el lugar, la fecha y el límite de la conclusión. Convierte una medición puntual en una afirmación sobre todo el arroyo.",
    consequenceA: "El informe afirmaría más de lo que muestra la medición y podría dar una seguridad que la evidencia no sostiene.",
    preservesA: "no",
    needsCheckA: "no",
    verificationA: "No hace falta otro dato para reconocer la generalización; el alcance ya aparece en el registro de la muestra.",
    decisionA: "modify",
    suggestionB: "Aclara si llovió antes del muestreo, porque la lluvia pudo cambiar la concentración.",
    changeB: "Añade una pregunta sobre una condición previa que podría influir en la concentración medida.",
    consequenceB: "La explicación podría necesitar un límite adicional o una nota sobre la lluvia.",
    preservesB: "yes",
    needsCheckB: "yes",
    verificationB: "Consultaré el registro de campo para saber si llovió antes de tomar la muestra.",
    decisionB: "pending",
    comparison: "La sugerencia 1 se aleja del propósito porque generaliza la medición. La sugerencia 2 se acerca más porque ayuda a precisar un límite, pero no puedo aceptarla hasta revisar el registro. Si aceptara ambas, el texto se contradiría: afirmaría seguridad general y a la vez reconocería una condición todavía no comprobada.",
    revised: "En el punto y la fecha analizados, la muestra no superó el límite permitido. Este resultado no basta para afirmar que todo el arroyo sea seguro. Antes de interpretar la concentración, queda pendiente revisar si llovió antes del muestreo."
  };

  const form = document.getElementById("comparison-form");
  const errorSummary = document.getElementById("error-summary");
  const result = document.getElementById("comparison-result");
  const status = document.getElementById("draft-status");
  const restoreBeforeExample = document.getElementById("restore-before-example");
  let stateBeforeExample = null;

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
    [...textFields, ...choiceFields.map((item) => item.name)].forEach((name) => {
      state[name] = valueOf(name);
    });
    return state;
  }

  function announce(message) {
    status.textContent = message;
  }

  function updateOriginalPreview() {
    const original = valueOf("original");
    document.getElementById("original-preview").textContent = original || "Tu fragmento original aparecerá aquí.";
  }

  function clearInvalidState() {
    textFields.forEach((name) => form.elements[name].removeAttribute("aria-invalid"));
    choiceFields.forEach((item) => {
      document.getElementById(item.group).removeAttribute("data-invalid");
      Array.from(form.elements[item.name]).forEach((option) => option.removeAttribute("aria-invalid"));
    });
  }

  function validate() {
    clearInvalidState();
    const errors = [];

    textFields.forEach((name) => {
      const field = form.elements[name];
      const minimum = Number(field.getAttribute("minlength")) || 8;
      if (field.value.trim().length < minimum) {
        field.setAttribute("aria-invalid", "true");
        const label = field.labels?.[0]?.textContent || name;
        errors.push({ target: field, label: `${label}: escribe al menos una frase breve.` });
      }
    });

    choiceFields.forEach((item) => {
      if (!valueOf(item.name)) {
        const group = document.getElementById(item.group);
        const options = Array.from(form.elements[item.name]);
        group.setAttribute("data-invalid", "true");
        options.forEach((option) => option.setAttribute("aria-invalid", "true"));
        errors.push({ target: options[0], label: `${item.label}: elige una respuesta.` });
      }
    });

    return errors;
  }

  function showErrors(errors) {
    const list = errorSummary.querySelector("ul");
    list.replaceChildren();
    errors.forEach((error) => {
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
    });
    errorSummary.hidden = false;
    errorSummary.focus();
  }

  function readableChoice(name) {
    const dictionaries = {
      preserves: { yes: "Sí", no: "No", unsure: "No estoy seguro" },
      check: { yes: "Sí", no: "No", unsure: "No estoy seguro" },
      decision: { keep: "Conservar", modify: "Modificar", discard: "Descartar", pending: "Dejar pendiente" }
    };
    if (name.startsWith("preserves")) return dictionaries.preserves[valueOf(name)];
    if (name.startsWith("needsCheck")) return dictionaries.check[valueOf(name)];
    return dictionaries.decision[valueOf(name)];
  }

  function appendSummary(container, term, description) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    container.append(dt, dd);
  }

  function appendSuggestionSummary(suffix) {
    const container = document.getElementById(`result-${suffix.toLowerCase()}`);
    container.replaceChildren();
    appendSummary(container, "Sugerencia", valueOf(`suggestion${suffix}`));
    appendSummary(container, "Qué cambia", valueOf(`change${suffix}`));
    appendSummary(container, "Consecuencia prevista", valueOf(`consequence${suffix}`));
    appendSummary(container, "Conserva el propósito", readableChoice(`preserves${suffix}`));
    appendSummary(container, "Necesita comprobación", readableChoice(`needsCheck${suffix}`));
    appendSummary(container, "Comprobación", valueOf(`verification${suffix}`));
    appendSummary(container, "Decisión", readableChoice(`decision${suffix}`));
  }

  function renderDecisionStatus(suffix) {
    const value = valueOf(`decision${suffix}`);
    const label = document.getElementById(`decision-${suffix.toLowerCase()}-label`);
    label.textContent = readableChoice(`decision${suffix}`);
    label.dataset.decision = value;
  }

  function firstPointToReview() {
    for (const suffix of ["A", "B"]) {
      const number = suffix === "A" ? "1" : "2";
      const preserves = valueOf(`preserves${suffix}`);
      const needsCheck = valueOf(`needsCheck${suffix}`);
      const decision = valueOf(`decision${suffix}`);

      if (preserves === "no" && decision === "keep") {
        return {
          title: `Revisa primero la sugerencia ${number}`,
          explanation: "Marcaste que no conserva el propósito del fragmento, pero elegiste conservarla. Usa lo que anotaste sobre el cambio y su consecuencia para modificarla, descartarla o explicar por qué cambió tu propósito."
        };
      }
      if (preserves === "unsure") {
        return {
          title: `Aclara primero la relación de la sugerencia ${number} con tu propósito`,
          explanation: "Todavía no sabes si la sugerencia ayuda a comunicar lo que buscas. Compara palabra por palabra qué añade, quita o generaliza antes de cerrar la decisión."
        };
      }
      if (needsCheck === "yes" && ["keep", "modify"].includes(decision)) {
        return {
          title: `Completa la comprobación de la sugerencia ${number}`,
          explanation: "Marcaste que depende de un dato, una fuente o un ejemplo, pero ya elegiste conservarla, modificarla o descartarla. Realiza la comprobación anotada antes de cerrar esa decisión."
        };
      }
      if (needsCheck === "unsure") {
        return {
          title: `Decide qué necesita comprobarse en la sugerencia ${number}`,
          explanation: "Señalaste una duda sobre la evidencia. Busca el dato o pide una revisión antes de tratar la sugerencia como resuelta."
        };
      }
      if (decision === "pending") {
        return {
          title: `La sugerencia ${number} conserva una decisión pendiente`,
          explanation: "Tu nota ya identifica qué falta. Mantén visible esa comprobación y evita presentar el fragmento como final hasta resolverla."
        };
      }
    }
    return {
      title: "Ya tienes dos decisiones explicadas",
      explanation: "Tus notas muestran qué cambió, qué consecuencia anticipaste, qué comprobaste y qué decidiste. La herramienta no puede verificar si esas razones son correctas; conserva las fuentes junto al fragmento."
    };
  }

  function renderResult() {
    errorSummary.hidden = true;
    const point = firstPointToReview();
    document.getElementById("result-title").textContent = point.title;
    document.getElementById("result-explanation").textContent = point.explanation;
    document.getElementById("result-origin").textContent = valueOf("suggestionOrigin");
    document.getElementById("result-comparison").textContent = valueOf("comparison");
    renderDecisionStatus("A");
    renderDecisionStatus("B");
    appendSuggestionSummary("A");
    appendSuggestionSummary("B");
    document.getElementById("result-original").textContent = valueOf("original");
    document.getElementById("result-revised").textContent = valueOf("revised");
    result.hidden = false;
    result.focus();
  }

  function fill(state) {
    [...textFields, ...choiceFields.map((item) => item.name)].forEach((name) => setValue(name, state[name] || ""));
    clearInvalidState();
    errorSummary.hidden = true;
    result.hidden = true;
    updateOriginalPreview();
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
      if (!saved || ![1, 2].includes(saved.version) || !saved.values) return;
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
    stateBeforeExample = hasContent ? currentState() : null;
    fill(example);
    restoreBeforeExample.hidden = !stateBeforeExample;
    announce(stateBeforeExample
      ? "Ejemplo cargado. Puedes restaurar lo que habías escrito."
      : "Ejemplo cargado. Pulsa “Preparar mis notas de decisión” para revisar el resultado.");
    form.elements.purpose.focus();
  });

  restoreBeforeExample.addEventListener("click", () => {
    if (!stateBeforeExample) return;
    fill(stateBeforeExample);
    stateBeforeExample = null;
    restoreBeforeExample.hidden = true;
    announce("Restauramos lo que habías escrito antes de cargar el ejemplo.");
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
    stateBeforeExample = null;
    restoreBeforeExample.hidden = true;
    updateOriginalPreview();
    announce(storageCleared ? "El borrador fue borrado de este dispositivo." : "El formulario quedó limpio; el navegador no permitió acceder al almacenamiento.");
    form.elements.purpose.focus();
  });

  form.elements.original.addEventListener("input", updateOriginalPreview);
  restoreDraft();
  updateOriginalPreview();
}());
