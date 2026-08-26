#!/usr/bin/env node

import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const source = args.get("--source");
const contentRoot = resolve(
  args.get("--content-root") ??
    "content/formacion-docente/diseno-inverso-cocreacion-ia",
);
const catalogPath = resolve(
  args.get("--catalog") ?? "data/h5p/course_candidates.json",
);
const sharedFeatured = resolve(
  args.get("--featured") ?? join(contentRoot, "featured.webp"),
);
const preserveFirst = args.get("--preserve-first") === "true";

if (!source) {
  throw new Error(
    "Uso: node tools/articulate/extract-rise-course.mjs --source CURSO.zip [--preserve-first true]",
  );
}
if (!existsSync(source)) throw new Error(`No existe la fuente: ${source}`);
if (!existsSync(sharedFeatured)) {
  throw new Error(`No existe la imagen compartida: ${sharedFeatured}`);
}

const runtime = spawnSync(
  "unzip",
  ["-p", source, "content/runtime-data.js"],
  { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 },
);
if (runtime.status !== 0) {
  throw new Error(runtime.stderr || "No se pudo leer runtime-data.js");
}

const wrapped = runtime.stdout.match(/^__jsonp\([^,]+,"([^"]+)"\);?$/s);
if (!wrapped) throw new Error("Formato inesperado de runtime-data.js");
const decoded = Buffer.from(wrapped[1], "base64").toString("utf8");
const data = JSON.parse(decoded);
const lessons = data.course?.lessons;
if (!Array.isArray(lessons) || lessons.length !== 13) {
  throw new Error(`Se esperaban 13 lecciones y se encontraron ${lessons?.length}`);
}

const slugs = [
  "01-panorama-activo-hibrido",
  "02-introduccion-diseno-inverso",
  "03-literacidades-ia",
  "04-cocreacion-persona-ia",
  "05-contexto-diagnostico",
  "06-resultados-aprendizaje",
  "07-evidencias-criterios",
  "08-secuencias-activas-hibridas",
  "09-analisis-casos",
  "10-limitaciones-analisis",
  "11-priorizar-intervenciones",
  "12-evaluacion-mejora-continua",
  "13-autoevaluacion-final",
];

const displayTitles = [
  "Panorama del aprendizaje activo e híbrido",
  "Introducción al diseño inverso",
  "Literacidades para el uso de IA",
  "Cocreación persona–IA en el diseño docente",
  "Delimitación del contexto y diagnóstico inicial",
  "Formulación de resultados de aprendizaje observables",
  "Determinación de evidencias y criterios de calidad",
  "Diseño de secuencias activas e híbridas",
  "Análisis de casos",
  "Limitaciones del análisis",
  "Priorizar intervenciones con evidencia",
  "Evaluación, retroalimentación y mejora continua",
  "Autoevaluación final sin calificación",
];

const leadOverrides = [
  "",
  "Cuando una actividad empieza por una herramienta o una dinámica atractiva, puede terminar evaluando algo distinto de lo que el grupo debía aprender. El diseño inverso cambia el orden: primero aclara el aprendizaje esperado, después decide qué evidencia permitiría reconocerlo y solo entonces organiza experiencias y apoyos.",
  "Una respuesta de IA puede sonar convincente y, aun así, contener errores, omitir perspectivas o resolver el trabajo que una persona necesitaba practicar. Para usarla con criterio hacen falta tres literacidades relacionadas: operar la herramienta, examinar críticamente sus respuestas y cocrear sin ceder la decisión.",
  "Al planear con IA, el resultado depende de lo que el sistema propone y de las decisiones que toma el profesorado. Esa relación puede convertirse en cocreación cuando la persona fija el propósito, contrasta lo recibido, transforma la propuesta y responde por el resultado; no vuelve a la IA una autora ni una participante simétrica.",
  "Antes de escribir objetivos o elegir actividades conviene mirar el grupo y las condiciones reales. Un mismo diseño cambia si varían los saberes previos, el tiempo, la conectividad, la accesibilidad, la modalidad o los recursos disponibles. Diagnosticar no significa inventar un perfil: significa reunir información suficiente para decidir.",
  "Decir que el grupo debe «comprender» un tema no permite saber todavía qué hará ni qué evidencia mostrará su aprendizaje. Un resultado observable nombra una acción, el contenido sobre el que se realiza, las condiciones relevantes y el criterio que permitirá valorar el desempeño.",
  "Un producto terminado puede parecer correcto sin mostrar quién comprendió, comparó o decidió. Elegir evidencias y criterios consiste en determinar qué desempeño permitirá reconocer el aprendizaje, qué parte del proceso conviene observar y qué calidad se espera, sin confundir participación o apariencia con comprensión.",
  "Una secuencia híbrida no se limita a repartir materiales entre el aula y una plataforma. Conecta momentos presenciales y en línea de modo que cada uno utilice el trabajo producido en el anterior. El aprendizaje activo describe, por otra parte, qué hace la persona con el conocimiento en cualquiera de esos espacios.",
  "En el caso de dos comunidades expuestas a olas de calor, no basta con identificar una amenaza. El análisis necesita relacionar exposición, vulnerabilidad y capacidad de respuesta para explicar por qué el riesgo cambia y qué evidencia sostiene cada relación. El caso permite practicar esa lectura sin convertirla en una fórmula universal.",
  "Una conclusión puede cambiar cuando falta un dato, cuando un supuesto no se sostiene o cuando aparece una perspectiva omitida. Reconocer limitaciones no debilita el análisis: aclara qué se sabe, qué se infiere, con cuánta confianza y qué información podría modificar la decisión.",
  "Cuando varias intervenciones parecen valiosas y los recursos son limitados, priorizar exige algo más que ordenar preferencias. Hay que conectar la necesidad diagnosticada, la evidencia disponible, los cuidados, la capacidad real de implementación y los criterios que justificarían comenzar, reformular o posponer.",
  "Después de aplicar una actividad, la pregunta no es solo si se completó. Conviene observar qué comprendió el grupo, dónde encontró dificultades, qué apoyos funcionaron, quién quedó fuera y qué carga de trabajo produjo el diseño. Esa evidencia permite decidir qué conservar, modificar o retirar en la siguiente versión.",
  "Esta autoevaluación reúne las preguntas de cierre de la fuente Rise. No asigna calificación, no guarda intentos y puede resolverse en cualquier orden; úsala para localizar qué lección conviene revisar.",
];

const closingOverrides = [
  "",
  "{{< parallevar >}}\n1. El diseño inverso cambia el orden de las decisiones; no impone una plantilla única.\n2. Un resultado orienta la evidencia, y la evidencia orienta las experiencias de práctica.\n3. La herramienta se elige al final, cuando puede explicarse qué aporta al aprendizaje.\n{{< /parallevar >}}\n\nLa siguiente lección añade una condición para trabajar con IA dentro de ese orden: saber operarla, examinar lo que devuelve y cocrear sin ceder la decisión.",
  "{{< parallevar >}}\n1. La literacidad operativa permite usar la herramienta, pero no basta para juzgarla.\n2. La literacidad crítica pide comprobar, reconocer sesgos y hacer visibles los límites.\n3. La cocreación conserva propósito, contraste, decisión y responsabilidad en la persona.\n{{< /parallevar >}}\n\nCon esas tres literacidades, la siguiente lección examina el ciclo concreto de cocreación durante el diseño docente.",
  "{{< parallevar >}}\n1. La IA puede proponer variantes, preguntas u objeciones; no fija el propósito ni responde por el resultado.\n2. Cocrear exige separar generación, contraste, decisión y registro de cambios.\n3. Una respuesta fluida sigue siendo un borrador hasta que se comprueba y adapta.\n{{< /parallevar >}}\n\nEl ciclo solo puede adaptarse bien cuando parte de un grupo y unas condiciones reales. Esa delimitación ocupa la siguiente lección.",
  "{{< parallevar >}}\n1. El contexto incluye saberes previos, modalidad, tiempo, recursos, accesibilidad y restricciones.\n2. Un diagnóstico recoge información para decidir; no inventa un estudiante promedio.\n3. La IA puede ayudar a redactar instrumentos, pero no conoce al grupo ni debe recibir datos sensibles.\n{{< /parallevar >}}\n\nUna vez delimitado el punto de partida, la siguiente decisión es formular qué cambio observable se espera en el aprendizaje.",
  "{{< parallevar >}}\n1. Un tema no es todavía un resultado de aprendizaje.\n2. El verbo orienta, pero el desempeño también necesita contenido, condiciones y criterio.\n3. Bloom ayuda a precisar procesos cognitivos; no ordena personas ni obliga a una secuencia rígida.\n{{< /parallevar >}}\n\nLa lección siguiente conecta esos resultados con evidencias suficientes y criterios que permitan interpretar su calidad.",
  "{{< parallevar >}}\n1. La evidencia debe corresponder al desempeño que el resultado pide observar.\n2. Un producto final puede ocultar el recorrido; conviene combinar muestras de proceso, explicación y desempeño.\n3. Los criterios hacen visible qué calidad se espera y sostienen una retroalimentación útil.\n{{< /parallevar >}}\n\nCon resultados, evidencias y criterios conectados, la siguiente lección distribuye la práctica entre momentos activos e híbridos.",
  "{{< parallevar >}}\n1. Híbrido describe cómo se conectan espacios y tiempos; activo describe qué hace la persona con el conocimiento.\n2. Cada momento necesita utilizar o preparar el trabajo de otro para evitar una experiencia fragmentada.\n3. Una alternativa accesible forma parte del diseño, no de la reparación posterior.\n{{< /parallevar >}}\n\nLa siguiente lección pone esa secuencia a trabajar en un caso que exige relacionar datos y justificar una decisión.",
  "{{< parallevar >}}\n1. El riesgo no depende de una sola variable: relaciona amenaza, exposición, vulnerabilidad y capacidad de respuesta.\n2. Una recomendación necesita datos pertinentes y una explicación del vínculo causal.\n3. Un caso generado o modificado con IA requiere revisión disciplinar antes de usarse.\n{{< /parallevar >}}\n\nToda recomendación sigue limitada por lo que el caso permite conocer. La siguiente lección enseña a reconocer esos límites.",
  "{{< parallevar >}}\n1. Distingue datos conocidos, supuestos e incertidumbres.\n2. Explica cómo una limitación afecta la conclusión y qué información podría modificarla.\n3. Usa la IA para producir objeciones o variantes, no para declarar resuelta la incertidumbre.\n{{< /parallevar >}}\n\nReconocer límites permite comparar alternativas sin fingir certeza. La siguiente lección convierte esa comparación en una priorización justificada.",
  "{{< parallevar >}}\n1. Priorizar conecta necesidad, evidencia, cuidados y capacidad de implementación.\n2. Un criterio explícito permite discutir la decisión sin esconderla detrás de una preferencia.\n3. La IA puede ampliar opciones u objeciones; la pertinencia se juzga con conocimiento del contexto.\n{{< /parallevar >}}\n\nLa última lección del ciclo observa qué ocurrió durante la implementación y cómo convertirlo en una decisión de mejora.",
  "{{< parallevar >}}\n1. Observar uso o satisfacción no equivale a demostrar aprendizaje.\n2. La retroalimentación aporta cuando llega a tiempo y permite revisar.\n3. Mejorar puede significar conservar, modificar o retirar una parte del diseño.\n4. El registro debe explicar qué cambió, por qué y con qué evidencia.\n{{< /parallevar >}}\n\nEl recorrido termina con una autoevaluación sin calificación. Úsala para localizar conceptos que todavía no puedes explicar o aplicar a tu propia actividad.",
  "",
];

const references = [
  [
    "Chi, M. T. H., y Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes. *Educational Psychologist, 49*(4), 219–243. <https://doi.org/10.1080/00461520.2014.965823>",
    "Freeman, S., et al. (2014). Active learning increases student performance in science, engineering, and mathematics. *Proceedings of the National Academy of Sciences, 111*(23), 8410–8415. <https://doi.org/10.1073/pnas.1319030111>",
    "Garrison, D. R., y Kanuka, H. (2004). Blended learning: Uncovering its transformative potential in higher education. *The Internet and Higher Education, 7*(2), 95–105. <https://doi.org/10.1016/j.iheduc.2004.02.001>",
    "Patiño, A., Ramírez-Montoya, M. S., y Buenestado-Fernández, M. (2023). Active learning and education 4.0 for complex thinking training. *Smart Learning Environments, 10*, 8. <https://doi.org/10.1186/s40561-023-00229-x>",
  ],
  [
    "Wiggins, G., y McTighe, J. (2005). *Understanding by Design* (2.ª ed.). ASCD.",
    "Anderson, L. W., et al. (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.",
  ],
  [
    "Miao, F., y Cukurova, M. (2024). *AI competency framework for teachers*. UNESCO. <https://discovery.ucl.ac.uk/id/eprint/10196729/>",
    "Sperling, K., et al. (2024). In search of artificial intelligence literacy in teacher education: A scoping review. *Computers and Education Open, 6*, 100169. <https://doi.org/10.1016/j.caeo.2024.100169>",
    "Veldhuis, A., Lo, P. Y., Kenny, S., y Antle, A. N. (2025). Critical artificial intelligence literacy: A scoping review and framework synthesis. *International Journal of Child-Computer Interaction, 43*, 100708.",
  ],
  [
    "Bearman, M., Ryan, J., y Ajjawi, R. (2023). Discourses of artificial intelligence in higher education: A critical literature review. *Higher Education, 86*, 369–385. <https://doi.org/10.1007/s10734-022-00937-2>",
    "Bozkurt, A. (2024). GenAI et al.: Cocreation, authorship, ownership, academic ethics and integrity in a time of generative AI. *Open Praxis, 16*(1), 1–10. <https://search.informit.org/doi/pdf/10.3316/informit.T2024030500022600105330542>",
    "Meshi, A. (2024). GPT-ME: A human–AI cognitive assemblage. *Proceedings of the ACM on Computer Graphics and Interactive Techniques, 7*(4), 55:1–55:8. <https://doi.org/10.1145/3664214>",
  ],
  [
    "Wiggins, G., y McTighe, J. (2005). *Understanding by Design* (2.ª ed.). ASCD.",
    "Fawns, T. (2022). An entangled pedagogy: Looking beyond the pedagogy—technology dichotomy. *Postdigital Science and Education, 4*, 711–728. <https://doi.org/10.1007/s42438-022-00302-7>",
  ],
  [
    "Anderson, L. W., et al. (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.",
    "Wiggins, G., y McTighe, J. (2005). *Understanding by Design* (2.ª ed.). ASCD.",
  ],
  [
    "Bearman, M., Dawson, P., Ajjawi, R., Tai, J., y Boud, D. (2020). Re-imagining university assessment in a digital world. Springer. <https://doi.org/10.1007/978-3-030-41956-1>",
    "Black, P., y Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education, 5*(1), 7–74. <https://doi.org/10.1080/0969595980050102>",
    "Hattie, J., y Timperley, H. (2007). The power of feedback. *Review of Educational Research, 77*(1), 81–112. <https://doi.org/10.3102/003465430298487>",
  ],
  [
    "Chi, M. T. H., y Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes. *Educational Psychologist, 49*(4), 219–243. <https://doi.org/10.1080/00461520.2014.965823>",
    "Garrison, D. R., y Kanuka, H. (2004). Blended learning: Uncovering its transformative potential in higher education. *The Internet and Higher Education, 7*(2), 95–105. <https://doi.org/10.1016/j.iheduc.2004.02.001>",
    "Mollick, E. R., y Mollick, L. (2022). *New modes of learning enabled by AI chatbots: Three methods and assignments*. <https://doi.org/10.2139/ssrn.4300783>",
  ],
  [
    "Wiggins, G., y McTighe, J. (2005). *Understanding by Design* (2.ª ed.). ASCD.",
    "Bearman, M., Nieminen, J. H., y Ajjawi, R. (2023). Designing assessment in a digital world. Springer. <https://doi.org/10.1007/978-3-031-18556-8>",
  ],
  [
    "Bender, E. M., Gebru, T., McMillan-Major, A., y Shmitchell, S. (2021). On the dangers of stochastic parrots. *Proceedings of FAccT '21*, 610–623. <https://doi.org/10.1145/3442188.3445922>",
    "Gerlich, M. (2025). AI tools in society: Impacts on cognitive offloading and the future of critical thinking. *Societies, 15*(1), 6. <https://doi.org/10.3390/soc15010006>",
    "Selwyn, N. (2024). On the limits of artificial intelligence in education. *Nordisk Tidsskrift for Pedagogikk Og Kritikk, 10*(1), 3–14. <https://doi.org/10.23865/ntpk.v10.6062>",
  ],
  [
    "Wiggins, G., y McTighe, J. (2005). *Understanding by Design* (2.ª ed.). ASCD.",
    "Bearman, M., Nieminen, J. H., y Ajjawi, R. (2023). Designing assessment in a digital world. Springer. <https://doi.org/10.1007/978-3-031-18556-8>",
  ],
  [
    "Black, P., y Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education, 5*(1), 7–74. <https://doi.org/10.1080/0969595980050102>",
    "Hattie, J., y Timperley, H. (2007). The power of feedback. *Review of Educational Research, 77*(1), 81–112. <https://doi.org/10.3102/003465430298487>",
    "Xia, Q., Weng, X., Ouyang, F., Lin, T. J., y Chiu, T. K. F. (2024). A scoping review on how generative artificial intelligence transforms assessment in higher education. *International Journal of Educational Technology in Higher Education, 21*, 40. <https://doi.org/10.1186/s41239-024-00468-z>",
  ],
  [],
];

const entities = {
  amp: "&",
  apos: "'",
  gt: ">",
  hellip: "…",
  laquo: "«",
  lt: "<",
  nbsp: " ",
  ndash: "–",
  quot: '"',
  raquo: "»",
};

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&([a-z]+);/gi, (match, name) => entities[name] ?? match);
}

function htmlToMarkdown(value = "") {
  return decodeEntities(value)
    .replace(/\r/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<p[^>]*>/gi, "")
    .replace(/<\/p>/gi, "")
    .replace(/<(strong|b)>/gi, "**")
    .replace(/<\/(strong|b)>/gi, "**")
    .replace(/<(em|i)>/gi, "*")
    .replace(/<\/(em|i)>/gi, "*")
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function plain(value = "") {
  return htmlToMarkdown(value)
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/[\*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function answerText(value = "") {
  const text = plain(value);
  if (text === "True") return "Verdadero";
  if (text === "False") return "Falso";
  return text;
}

function attr(value = "") {
  return plain(value).replaceAll('"', "&quot;");
}

function truncate(value, length = 180) {
  const text = plain(value);
  if (text.length <= length) return text;
  return `${text.slice(0, length - 1).replace(/\s+\S*$/, "")}…`;
}

const libraryPolicies = {
  "H5P.Dialogcards": {
    status: "eligible-separate-production-gate",
    catalogEvidence: ["cocreacion-conceptos-cards"],
    rationale:
      "El catálogo publicado ya gobierna H5P.Dialogcards. El contenido del curso requiere un paquete nuevo, revisión de medios y una autorización de publicación separada.",
  },
  "H5P.MultiChoice": {
    status: "eligible-separate-production-gate",
    catalogEvidence: [
      "direccion-epistemica-decidir-reformular",
      "evaluacion-proceso-decision",
      "evidencias-proceso-proporcion",
    ],
    rationale:
      "El catálogo publicado ya gobierna H5P.MultiChoice y su presentación formativa sin puntuación. Cada pregunta sigue necesitando paquete, QA y compuerta propios.",
  },
  "H5P.Blanks": {
    status: "deferred-library-not-governed",
    catalogEvidence: [],
    rationale:
      "H5P.Blanks no figura en el catálogo gobernado actual. Se conserva una alternativa textual completa hasta que la biblioteca, el tema, la licencia y el teclado pasen una compuerta específica.",
  },
  "H5P.DragText": {
    status: "deferred-library-not-governed",
    catalogEvidence: [],
    rationale:
      "El catálogo actual no gobierna una biblioteca de pareo. Se evita elegir por similitud técnica sin comprobar semántica, teclado y lectura lineal.",
  },
  "H5P.SortParagraphs": {
    status: "deferred-library-not-governed",
    catalogEvidence: [],
    rationale:
      "El catálogo actual no gobierna una biblioteca de clasificación u ordenación. El fallback agrupado sigue siendo la versión funcional hasta una evaluación separada.",
  },
};

const candidates = {};
const nativeCounts = { accordion: 0, tabs: 0, process: 0 };
const candidateCounts = {};

function addCandidate({ lessonIndex, sequence, block, title, kind }) {
  const id = `l${String(lessonIndex + 1).padStart(2, "0")}-h5p-${String(sequence).padStart(2, "0")}`;
  let proposedLibrary;
  let fallback;
  const first = block.items?.[0] ?? block;

  if (kind === "flashcard") {
    proposedLibrary = "H5P.Dialogcards";
    fallback = {
      type: "dialog-cards",
      instruction: "Abre cada tarjeta para contrastar el concepto con su explicación.",
      items: block.items.map((item) => ({
        prompt: plain(item.front?.description),
        answer: plain(item.back?.description),
      })),
    };
  } else if (kind === "sorting") {
    proposedLibrary = "H5P.SortParagraphs";
    fallback = {
      type: "sorting",
      instruction:
        "Clasifica primero cada elemento por tu cuenta y abre después la solución agrupada.",
      groups: (block.piles ?? []).map((pile) => ({
        title: plain(pile.title),
        items: block.items
          .filter((item) => item.pileId === pile.id)
          .map((item) => plain(item.title)),
      })),
    };
  } else if (first.type === "FILL_IN_THE_BLANK") {
    proposedLibrary = "H5P.Blanks";
    fallback = {
      type: "fill-blank",
      question: plain(first.title),
      answers: (first.answers ?? []).map((answer) => plain(answer.title)),
      feedbackCorrect: plain(first.feedbackCorrect),
      feedbackIncorrect: plain(first.feedbackIncorrect),
    };
  } else if (first.type === "MATCHING") {
    proposedLibrary = "H5P.DragText";
    fallback = {
      type: "matching",
      question: plain(first.title),
      pairs: (first.answers ?? []).map((answer) => ({
        prompt: plain(answer.title),
        match: plain(answer.matchTitle),
      })),
      feedbackCorrect: plain(first.feedbackCorrect),
      feedbackIncorrect: plain(first.feedbackIncorrect),
    };
  } else {
    proposedLibrary = "H5P.MultiChoice";
    fallback = {
      type: first.type === "MULTIPLE_RESPONSE" ? "multiple-response" : "single-choice",
      question: plain(first.title),
      options: (first.answers ?? []).map((answer) => ({
        text: answerText(answer.title),
        correct: Boolean(answer.correct),
        feedback: plain(answer.feedback),
      })),
      feedbackCorrect: plain(first.feedbackCorrect),
      feedbackIncorrect: plain(first.feedbackIncorrect),
    };
  }

  const policy = libraryPolicies[proposedLibrary];
  candidateCounts[proposedLibrary] = (candidateCounts[proposedLibrary] ?? 0) + 1;
  candidates[id] = {
    lesson: lessonIndex + 1,
    sequence,
    lessonSlug: slugs[lessonIndex],
    title: plain(title || first.title || `Práctica ${sequence}`),
    sourceBlockId: block.globalBlockId ?? block.id,
    sourceFamily: kind,
    sourceType: first.type ?? block.variant,
    proposedLibrary,
    decision: policy.status,
    rationale: policy.rationale,
    catalogEvidence: policy.catalogEvidence,
    contentLicense: "CC BY-SA 4.0",
    licenseStatus: "project-original-pending-publication-gate",
    publicationAuthorized: false,
    reportingIsEnabled: false,
    graded: false,
    fallback,
  };
  return id;
}

function renderNative(block) {
  if (block.variant === "accordion") {
    nativeCounts.accordion += 1;
    return [
      "{{< acordeon >}}",
      ...block.items.flatMap((item, index) => [
        `{{< pliegue titulo="${attr(item.title)}"${index === 0 ? ' abierto="true"' : ""} >}}`,
        htmlToMarkdown(item.description),
        "{{< /pliegue >}}",
      ]),
      "{{< /acordeon >}}",
    ].join("\n\n");
  }
  if (block.variant === "tabs") {
    nativeCounts.tabs += 1;
    return [
      "{{< pestanas >}}",
      ...block.items.flatMap((item) => [
        `{{< pestana titulo="${attr(item.title)}" >}}`,
        htmlToMarkdown(item.description),
        "{{< /pestana >}}",
      ]),
      "{{< /pestanas >}}",
    ].join("\n\n");
  }
  if (block.variant === "process") {
    nativeCounts.process += 1;
    const intro = block.items.find((item) => item.type === "intro");
    const summary = block.items.find((item) => item.type === "summary");
    const steps = block.items.filter((item) => item.type === "step");
    return [
      intro ? htmlToMarkdown(intro.description) : "",
      "{{< proceso >}}",
      ...steps.flatMap((item) => [
        `{{< paso titulo="${attr(item.title)}" >}}`,
        htmlToMarkdown(item.description),
        "{{< /paso >}}",
      ]),
      "{{< /proceso >}}",
      summary ? `{{< idea titulo="Síntesis del proceso" >}}\n${htmlToMarkdown(summary.description)}\n{{< /idea >}}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");
  }
  throw new Error(`Interacción nativa no reconocida: ${block.variant}`);
}

function firstParagraph(lesson) {
  for (const block of lesson.items ?? []) {
    if (block.family === "text") {
      const paragraph = block.items?.find((item) => item.paragraph)?.paragraph;
      if (paragraph) return plain(paragraph);
    }
  }
  return lesson.title;
}

function renderLesson(lesson, lessonIndex) {
  const sections = [];
  let candidateSequence = 0;
  let lastHeading = displayTitles[lessonIndex];
  let leadUsed = false;
  let pendingVisual = false;

  if (lesson.type === "quiz") {
    sections.push(
      "{{< lead >}}\nEsta autoevaluación reúne las preguntas de cierre de la fuente Rise. No asigna calificación, no guarda intentos y puede resolverse en cualquier orden; úsala para localizar qué lección conviene revisar.\n{{< /lead >}}",
      "{{< idea titulo=\"Antes de empezar\" >}}\nResponde primero sin abrir las soluciones. Después compara tu razonamiento con la explicación. Una respuesta correcta no sustituye la posibilidad de explicar por qué las otras opciones no corresponden.\n{{< /idea >}}",
    );
    for (const question of lesson.items) {
      candidateSequence += 1;
      const id = addCandidate({
        lessonIndex,
        sequence: candidateSequence,
        block: question,
        title: question.title,
        kind: "quiz",
      });
      sections.push(`{{< curso-interactivo id="${id}" >}}`);
    }
  } else {
    for (const block of lesson.items ?? []) {
      if (block.family === "image") {
        pendingVisual = block.variant !== "banner";
        continue;
      }
      if (block.family === "continue") continue;

      if (block.family === "text") {
        const item = block.items?.[0] ?? {};
        if (item.heading) lastHeading = plain(item.heading);
        const paragraph = htmlToMarkdown(item.paragraph);
        if (!leadUsed && paragraph) {
          sections.push(
            `{{< lead >}}\n${leadOverrides[lessonIndex] || paragraph}\n{{< /lead >}}`,
          );
          leadUsed = true;
          continue;
        }
        if (pendingVisual && paragraph) {
          sections.push(
            `{{< idea titulo="${attr(item.heading || "Lectura equivalente del recurso visual")}" >}}\n${paragraph}\n{{< /idea >}}`,
          );
          pendingVisual = false;
          continue;
        }
        const paragraphPlain = plain(item.paragraph);
        if (
          paragraphPlain.startsWith("En la próxima lección") ||
          paragraphPlain.startsWith("En la siguiente lección") ||
          paragraphPlain.startsWith("Has llegado al cierre de este curso")
        ) {
          continue;
        }
        if (item.heading) sections.push(`## ${plain(item.heading)}`);
        if (paragraph) sections.push(paragraph);
        continue;
      }

      if (block.family === "list") {
        sections.push(
          block.items
            .map((item, index) => `${index + 1}. ${htmlToMarkdown(item.paragraph)}`)
            .join("\n"),
        );
        continue;
      }

      if (block.family === "impact") {
        sections.push(
          `{{< idea >}}\n${htmlToMarkdown(block.items?.[0]?.paragraph)}\n{{< /idea >}}`,
        );
        continue;
      }

      if (
        block.family === "interactive" &&
        ["accordion", "tabs"].includes(block.variant)
      ) {
        sections.push(renderNative(block));
        continue;
      }

      if (
        block.family === "interactive-fullscreen" &&
        block.variant === "process"
      ) {
        sections.push(renderNative(block));
        continue;
      }

      if (block.family === "flashcard") {
        candidateSequence += 1;
        const id = addCandidate({
          lessonIndex,
          sequence: candidateSequence,
          block,
          title: lastHeading,
          kind: "flashcard",
        });
        sections.push(`{{< curso-interactivo id="${id}" >}}`);
        continue;
      }

      if (block.family === "knowledgeCheck") {
        candidateSequence += 1;
        const id = addCandidate({
          lessonIndex,
          sequence: candidateSequence,
          block,
          title: block.items?.[0]?.title,
          kind: "knowledgeCheck",
        });
        sections.push(`{{< curso-interactivo id="${id}" >}}`);
        continue;
      }

      if (
        block.family === "interactive-fullscreen" &&
        block.variant === "sorting"
      ) {
        candidateSequence += 1;
        const id = addCandidate({
          lessonIndex,
          sequence: candidateSequence,
          block,
          title: lastHeading,
          kind: "sorting",
        });
        sections.push(`{{< curso-interactivo id="${id}" >}}`);
        continue;
      }

      throw new Error(
        `Bloque no convertido en lección ${lessonIndex + 1}: ${block.family}/${block.type}/${block.variant}`,
      );
    }
  }

  if (closingOverrides[lessonIndex]) {
    sections.push(closingOverrides[lessonIndex]);
  }

  if (references[lessonIndex].length > 0) {
    sections.push(
      `{{< referencias >}}\n${references[lessonIndex].map((entry) => `- ${entry}`).join("\n")}\n{{< /referencias >}}`,
    );
  } else {
    sections.push(
      "{{< idea titulo=\"Cómo interpretar el resultado\" >}}\nEsta autoevaluación retoma conceptos y decisiones desarrollados en las doce lecciones. Las fuentes aparecen junto a las explicaciones de cada lección; aquí no se introducen afirmaciones nuevas.\n{{< /idea >}}",
    );
  }

  const previous = lessonIndex > 0 ? slugs[lessonIndex - 1] : "";
  const next = lessonIndex < lessons.length - 1 ? slugs[lessonIndex + 1] : "";
  sections.push(
    `{{< curso-navegacion anterior="${previous}" siguiente="${next}" >}}`,
  );

  const description = truncate(
    leadOverrides[lessonIndex] || firstParagraph(lesson),
  );
  const frontMatter = [
    "---",
    `title: ${JSON.stringify(displayTitles[lessonIndex])}`,
    `description: ${JSON.stringify(description)}`,
    `summary: ${JSON.stringify(description)}`,
    "date: 2026-08-25",
    `weight: ${lessonIndex + 1}`,
    "showHero: true",
    'heroStyle: "big"',
    "showBreadcrumbs: true",
    "showTableOfContents: true",
    "showReadingTime: true",
    "showSummary: true",
    'areas: ["formacion", "pedagogia", "ia"]',
    'tags: ["diseño inverso", "aprendizaje activo", "cocreación", "curso abierto"]',
    "---",
  ].join("\n");
  return `${frontMatter}\n\n${sections.join("\n\n")}\n`;
}

mkdirSync(contentRoot, { recursive: true });
lessons.forEach((lesson, lessonIndex) => {
  const bundle = join(contentRoot, slugs[lessonIndex]);
  mkdirSync(bundle, { recursive: true });
  const indexPath = join(bundle, "index.md");
  if (!(preserveFirst && lessonIndex === 0)) {
    writeFileSync(indexPath, renderLesson(lesson, lessonIndex), "utf8");
  } else {
    // El catálogo sí se deriva de la fuente aunque el piloto editorial se conserve.
    let sequence = 0;
    let lastHeading = displayTitles[0];
    for (const block of lesson.items ?? []) {
      if (block.family === "text" && block.items?.[0]?.heading) {
        lastHeading = plain(block.items[0].heading);
      }
      if (block.family === "flashcard") {
        sequence += 1;
        addCandidate({
          lessonIndex,
          sequence,
          block,
          title: lastHeading,
          kind: "flashcard",
        });
      } else if (block.family === "knowledgeCheck") {
        sequence += 1;
        addCandidate({
          lessonIndex,
          sequence,
          block,
          title: block.items?.[0]?.title,
          kind: "knowledgeCheck",
        });
      } else if (
        (block.family === "interactive" &&
          ["accordion", "tabs"].includes(block.variant)) ||
        (block.family === "interactive-fullscreen" && block.variant === "process")
      ) {
        if (block.variant === "accordion") nativeCounts.accordion += 1;
        if (block.variant === "tabs") nativeCounts.tabs += 1;
        if (block.variant === "process") nativeCounts.process += 1;
      }
    }
  }
  const featuredPath = join(bundle, "featured.webp");
  if (!existsSync(featuredPath)) copyFileSync(sharedFeatured, featuredPath);
});

const zipBytes = readFileSync(source);
const sourceSha256 = createHash("sha256").update(zipBytes).digest("hex");
const eligible = Object.values(candidates).filter((entry) =>
  entry.decision.startsWith("eligible"),
).length;
const deferred = Object.values(candidates).length - eligible;
const catalog = {
  schemaVersion: 1,
  courseId: "diseno-inverso-cocreacion-ia",
  status: "local-candidate-not-published",
  source: {
    format: "Articulate Rise web export",
    package: basename(source),
    sha256: sourceSha256,
    lessonCount: lessons.length,
    nativeInteractiveCount: Object.values(nativeCounts).reduce(
      (sum, value) => sum + value,
      0,
    ),
    h5pCandidateCount: Object.keys(candidates).length,
  },
  policy: {
    principle: "El componente más simple que conserva la intención pedagógica.",
    access: "Abierto, sin cuenta, sin calificación y sin persistencia de intentos.",
    publicationAuthorized: false,
    productionRule:
      "Una candidatura no autoriza empaquetado, alta en el catálogo de producción, publicación, Moodle ni despliegue.",
    eligibleCount: eligible,
    deferredCount: deferred,
  },
  libraryPolicies,
  candidates,
};
mkdirSync(dirname(catalogPath), { recursive: true });
writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");

const summary = {
  lessons: lessons.length,
  nativeCounts,
  h5pCandidates: Object.keys(candidates).length,
  candidateCounts,
  eligible,
  deferred,
  contentRoot,
  catalogPath,
};
console.log(JSON.stringify(summary, null, 2));
