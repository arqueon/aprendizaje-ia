import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "content");
const snapshotDate = "2026-08-02";
const outputDir = path.join(
  root,
  "docs",
  "editorial",
  "inventarios",
  "2026-08-02-udgia-021",
);
const baseInventoryPath = path.join(
  root,
  "docs",
  "editorial",
  "inventarios",
  "2026-07-28-hugo",
  "inventario-hugo.json",
);
const courseInventoryPath = path.resolve(
  process.env.UDGIA_COURSE_INVENTORY
    || path.join(
      root,
      "..",
      "alfabetizacion_en_ia",
      "docs",
      "auditoria-hugo-curso-inventario.json",
    ),
);
const checkMode = process.argv.includes("--check");

const assetPattern = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else files.push(entryPath);
  }
  return files;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function bodyFromMarkdown(text) {
  if (!text.startsWith("---\n")) return text;
  const end = text.indexOf("\n---", 4);
  return end < 0 ? text : text.slice(end + 4);
}

function has(value, expression) {
  return expression.test(normalize(value));
}

function statusFromCount(count, robustMinimum, partialMinimum) {
  if (count >= robustMinimum) return "robusto-candidato";
  if (count >= partialMinimum) return "parcial";
  return "debil";
}

function topLevelFromRoute(route) {
  return route.split("/").filter(Boolean)[0] || "inicio";
}

function internalLinks(body, route) {
  const markdownLinks = [...body.matchAll(/(?<!!)\[[^\]]+\]\(([^)\s]+)[^)]*\)/g)]
    .map((match) => match[1]);
  const shortcodeLinks = [...body.matchAll(/\blink=["']([^"']+)["']/g)]
    .map((match) => match[1]);
  return [...markdownLinks, ...shortcodeLinks]
    .filter((link) => !/^(?:https?:|mailto:|tel:|#)/i.test(link) && !link.includes("{{"))
    .map((link) => new URL(link.split(/[?#]/)[0], `https://audit.invalid${route}`).pathname);
}

function h5pIDs(body) {
  return [...body.matchAll(/\{\{[<%]\s*h5p\b[^}]*\bid=["']([^"']+)["']/g)]
    .map((match) => match[1]);
}

function figureIDs(body) {
  return [...body.matchAll(/\{\{[<%]\s*udgia-figure\b[^}]*\bid=["']([^"']+)["']/g)]
    .map((match) => match[1]);
}

function imageAltAudit(body) {
  const markdown = [...body.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]
    .map((match) => ({ alt: match[1].trim(), source: match[2] }));
  const html = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => ({
    alt: match[0].match(/\balt=["']([^"']*)["']/i)?.[1]?.trim() || "",
    source: match[0].match(/\bsrc=["']([^"']+)["']/i)?.[1] || "",
  }));
  const images = [...markdown, ...html];
  return {
    referenced: images.length,
    missingAlt: images.filter(({ alt }) => !alt).length,
  };
}

function detectedImageFormat(bytes) {
  if (bytes.length >= 12 && bytes.subarray(0, 4).toString("ascii") === "RIFF"
    && bytes.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (bytes.length >= 8 && bytes.subarray(1, 4).toString("ascii") === "PNG") return "png";
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpeg";
  if (normalize(bytes.subarray(0, 512).toString("utf8")).includes("<svg")) return "svg";
  return "unknown";
}

function jpegDimensions(bytes) {
  let offset = 2;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: bytes.readUInt16BE(offset + 7), height: bytes.readUInt16BE(offset + 5) };
    }
    if (marker === 0xd8 || marker === 0xd9) {
      offset += 2;
      continue;
    }
    const length = bytes.readUInt16BE(offset + 2);
    if (length < 2) break;
    offset += 2 + length;
  }
  return null;
}

function imageDimensions(bytes, format) {
  if (format === "png" && bytes.length >= 24) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (format === "jpeg") return jpegDimensions(bytes);
  if (format !== "webp") return null;

  const vp8x = bytes.indexOf(Buffer.from("VP8X"));
  if (vp8x >= 0 && vp8x + 18 <= bytes.length) {
    return {
      width: bytes.readUIntLE(vp8x + 12, 3) + 1,
      height: bytes.readUIntLE(vp8x + 15, 3) + 1,
    };
  }
  const vp8l = bytes.indexOf(Buffer.from("VP8L"));
  if (vp8l >= 0 && vp8l + 13 <= bytes.length) {
    const b1 = bytes[vp8l + 9];
    const b2 = bytes[vp8l + 10];
    const b3 = bytes[vp8l + 11];
    const b4 = bytes[vp8l + 12];
    return {
      width: 1 + (((b2 & 0x3f) << 8) | b1),
      height: 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | (b2 >> 6)),
    };
  }
  const vp8 = bytes.indexOf(Buffer.from("VP8 "));
  if (vp8 >= 0 && vp8 + 18 <= bytes.length) {
    return {
      width: bytes.readUInt16LE(vp8 + 14) & 0x3fff,
      height: bytes.readUInt16LE(vp8 + 16) & 0x3fff,
    };
  }
  return null;
}

function aspectBucket(dimensions) {
  if (!dimensions?.width || !dimensions?.height) return "sin-dimensiones";
  const ratio = dimensions.width / dimensions.height;
  if (ratio < 0.9) return "vertical";
  if (ratio <= 1.1) return "cuadrada";
  if (ratio < 1.7) return "horizontal-intermedia";
  if (ratio <= 2.0) return "horizontal-16x9-o-social";
  return "panoramica";
}

const orientationRelations = [
  {
    id: "verificacion-y-fuentes",
    pattern: /verific|comprob|fuente original|fluidez|afirmacion|lectura lateral/,
    orientations: ["§2.2", "§4.4", "§5.3", "§9.1"],
    guides: [
      "Guía docente, cuarta parte",
      "Estudiantes: Todavía no la entrego",
    ],
  },
  {
    id: "agenciamiento-y-cocreacion",
    pattern: /agenciamiento|cocreacion|co-creacion|direccion epistemica|version|criterio/,
    orientations: ["§3.2", "§4.3", "§4.4"],
    guides: [
      "Guía docente, segunda parte",
      "Estudiantes: Cuando dos cambios parecen mejorar tu trabajo",
    ],
  },
  {
    id: "aprendizaje-y-evaluacion-del-proceso",
    pattern: /aprendizaje|evaluacion|retroaliment|evidencia|producto final|trazabilidad|rubrica/,
    orientations: ["§2.2", "§5.1–5.4"],
    guides: ["Guía docente, primera y cuarta partes"],
  },
  {
    id: "etica-contexto-y-cuidados",
    pattern: /etic|privacidad|dato|sesgo|equidad|transparencia|responsabilidad|accesib|contexto/,
    orientations: ["§6.1–6.5", "§9.2", "§10.4–10.5"],
    guides: [
      "Guía docente, tercera parte",
      "Estudiantes: Cuando el contexto cambia la decisión",
    ],
  },
  {
    id: "diseno-activo-hibrido",
    pattern: /bloom|icap|diseno inverso|aprendizaje activo|aprendizaje hibrido|actividad|secuencia didactica/,
    orientations: ["§4.2–4.6", "§8.1–8.5"],
    guides: ["Guía docente, primera, segunda y quinta partes"],
  },
  {
    id: "decision-institucional-y-tecnologia",
    pattern: /institucion|gobernanza|politica|tecnologia|infraestructura|implementacion|hoja de ruta/,
    orientations: ["§7–§11"],
    guides: ["Guía docente, alcance y procedencia"],
  },
];

function interactionCandidate(body, courseRole, currentH5P, pagePath) {
  const text = normalize(body);
  if (currentH5P.length > 0) {
    return {
      type: "auditar-y-mediar-h5p-existente",
      technology: "H5P ya gobernado",
      reason: "Conservar la interacción solo si la prosa previa, el fallback y la función didáctica son equivalentes.",
    };
  }
  if (["referencia-opcional", "navegacion", "fuera-del-recorrido-inicial"].includes(courseRole)) {
    return {
      type: "sin-interaccion-obligatoria",
      technology: "Ninguna",
      reason: "La consulta o navegación no mejora por añadir interacción decorativa.",
    };
  }
  if (pagePath.startsWith("recursos/glosario/")) {
    return {
      type: "sin-interaccion-obligatoria",
      technology: "Ninguna",
      reason: "El glosario necesita consulta rápida, enlaces semánticos y ejemplos breves; una interacción por entrada añadiría fricción y fatiga.",
    };
  }
  if (courseRole === "banco-ejemplos-disciplinarios") {
    return {
      type: "ejemplo-anotado-o-comparador",
      technology: "HTML accesible o H5P.ImageSlider cuando existan dos versiones",
      reason: "El ejemplo debe hacer visible el criterio disciplinar, sin convertir cada ficha en una actividad obligatoria.",
    };
  }
  if (/decision|elegir|criterio|consecuencia|dilema|escenario/.test(text)) {
    return {
      type: "escenario-de-decision-con-consecuencias",
      technology: "H5P.BranchingScenario o alternativa HTML accesible",
      reason: "Permite comparar rutas y justificar una decisión; no debe reducirse a acertar una opción.",
    };
  }
  if (/version|borrador|antes y despues|revis|cambio/.test(text)) {
    return {
      type: "comparador-de-versiones",
      technology: "H5P.ImageSlider o comparador HTML",
      reason: "Hace visible qué cambió, por qué cambió y qué criterio se conservó.",
    };
  }
  if (/sistema|capas|componentes|mapa|modelo|infraestructura/.test(text)) {
    return {
      type: "mapa-anotado",
      technology: "H5P.ImageHotspots más fallback estructurado",
      reason: "Ayuda a explorar relaciones sin sustituir la explicación del sistema.",
    };
  }
  if (/actividad|practica|aplica|disena|produce|construye/.test(text)) {
    return {
      type: "hoja-de-trabajo-guiada",
      technology: "HTML/Markdown descargable; H5P solo si no recopila datos",
      reason: "Orienta una producción propia y preserva privacidad, portabilidad y ruta sin IA.",
    };
  }
  return {
    type: "recorrido-guiado",
    technology: "H5P.CoursePresentation o secuencia HTML",
    reason: "Puede mediar un concepto extenso después de desarrollar su explicación pública.",
  };
}

const visualReferencePages = new Set([
  "ia-educacion/constelaciones/cocreacion-evaluacion/index.md",
  "ia-educacion/que-es-la-educacion-digital/index.md",
  "ia-educacion/rutas/coordinacion-academica/index.md",
  "ia-educacion/rutas/decision-institucional-ia/index.md",
  "ia-educacion/tendencias/evaluacion-en-la-era-ia/index.md",
  "observatorio/documentacion/redes-investigacion-vinculacion/index.md",
  "recursos/articulos/genai-feedback-engagement-2025/index.md",
  "recursos/externas/comunidades-practica-docente-ia/index.md",
]);

function visualReview(page, featuredCandidates, hasExplanatoryVisual) {
  if (visualReferencePages.has(page.path)) {
    return {
      decision: "conservar-como-referencia",
      family: "editorial-situada-o-conceptual-especifica",
      reason: "La imagen representa una relación o situación reconocible y ofrece una dirección más propia para el sistema visual.",
    };
  }
  if (/^ia-educacion\/productos-de-aprendizaje\/.+\/index\.md$/.test(page.path)) {
    return {
      decision: "conservar-y-normalizar-familia",
      family: "objetos-disciplinares-violeta",
      reason: "La serie mantiene una gramática común y diferencia productos; conviene completar faltantes sin cambiar de lenguaje.",
    };
  }
  if (/^recursos\/glosario\/.+\/index\.md$/.test(page.path)) {
    return {
      decision: "sustituir-por-sistema-de-iconos-o-retirar",
      family: "neon-tecnologico-generico",
      reason: "La repetición de cerebros, redes, pantallas y símbolos luminosos produce fatiga y no explica el concepto.",
    };
  }
  if (featuredCandidates.length > 1) {
    return {
      decision: "resolver-candidatos-y-sustituir",
      family: "portada-ambigua",
      reason: "El bundle contiene más de un featured y mezcla estilos; Hugo no debería depender del orden de selección.",
    };
  }
  if (page.kind === "section" && featuredCandidates.length > 0) {
    return {
      decision: "rediseñar-como-identidad-de-seccion",
      family: "portada-generica-de-seccion",
      reason: "Las secciones necesitan una señal editorial estable, no otra variación de cerebro, red o interfaz luminosa.",
    };
  }
  if (featuredCandidates.length === 0) {
    return {
      decision: hasExplanatoryVisual ? "no-requiere-portada-adicional" : "evaluar-si-necesita-portada",
      family: "sin-featured-local",
      reason: "No toda ficha necesita hero; la prioridad es orientar y explicar, no completar una cuota visual.",
    };
  }
  if (featuredCandidates.some((asset) => asset.endsWith(".png"))) {
    return {
      decision: "revisar-para-sustitucion-prioritaria",
      family: "cgi-infografia-o-ilustracion-heredada",
      reason: "La revisión en mosaico muestra mayor presencia de CGI neón, texto incrustado o metáforas genéricas en este grupo.",
    };
  }
  return {
    decision: "reencuadrar-o-sustituir-tras-lectura",
    family: "ilustracion-mixta",
    reason: "Debe comprobarse si representa la situación y el criterio de la página o si podría intercambiarse con cualquier texto sobre IA.",
  };
}

function lotFor(courseRole, action) {
  if (
    ["nucleo-candidato", "referencia-en-cuarentena"].includes(courseRole)
    || ["reescribir-antes-de-enlazar", "fusionar-o-desduplicar"].includes(action)
  ) return "L1-nucleo-riesgos-y-solapamientos";
  if (["apoyo-candidato", "banco-de-practicas"].includes(courseRole)) {
    return "L2-apoyos-y-practicas";
  }
  if (courseRole === "banco-ejemplos-disciplinarios") {
    return "L3-ejemplos-disciplinares";
  }
  if (courseRole === "referencia-opcional") {
    return "L4-referencias-observatorio-y-vigencia";
  }
  return "L5-navegacion-y-material-fuera-del-recorrido";
}

const baseInventory = JSON.parse(fs.readFileSync(baseInventoryPath, "utf8"));
const courseInventory = JSON.parse(fs.readFileSync(courseInventoryPath, "utf8"));
const courseByPath = new Map(courseInventory.pages.map((page) => [page.path, page]));
const h5pCatalog = JSON.parse(fs.readFileSync(path.join(root, "data/h5p/catalog.json"), "utf8"));
const figureCatalog = JSON.parse(fs.readFileSync(path.join(root, "data/udgia_figures.json"), "utf8"));

if (baseInventory.pages.length !== courseInventory.pages.length) {
  throw new Error("Los inventarios de Hugo y curso no tienen el mismo número de piezas.");
}

const assetFiles = walk(contentRoot).filter((file) => assetPattern.test(file));
const assetRecords = assetFiles.map((file) => {
  const bytes = fs.readFileSync(file);
  const detectedFormat = detectedImageFormat(bytes);
  const dimensions = imageDimensions(bytes, detectedFormat);
  return {
    path: path.relative(contentRoot, file),
    extension: path.extname(file).slice(1).toLowerCase(),
    detectedFormat,
    extensionMatchesFormat: path.extname(file).slice(1).toLowerCase().replace("jpg", "jpeg") === detectedFormat,
    dimensions,
    aspectBucket: aspectBucket(dimensions),
    animated: detectedFormat === "webp" && bytes.includes(Buffer.from("ANIM")),
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
});
const duplicateAssetGroups = Object.values(Object.groupBy(assetRecords, ({ sha256 }) => sha256))
  .filter((group) => group.length > 1)
  .map((group) => ({
    sha256: group[0].sha256,
    bytes: group[0].bytes,
    paths: group.map(({ path: assetPath }) => assetPath).sort(),
  }))
  .sort((left, right) => right.paths.length - left.paths.length || left.paths[0].localeCompare(right.paths[0]));

const pages = baseInventory.pages.map((page) => {
  const course = courseByPath.get(page.path);
  if (!course) throw new Error(`Falta clasificación del curso para ${page.path}`);

  const filePath = path.join(contentRoot, page.path);
  const body = bodyFromMarkdown(fs.readFileSync(filePath, "utf8"));
  const firstPassage = body.slice(0, 2400);
  const headings = [...body.matchAll(/^#{2,6}\s+(.+)$/gm)].map((match) => match[1]);
  const headingText = headings.join("\n");
  const routeLinks = internalLinks(body, page.route);
  const h5p = h5pIDs(body);
  const figures = figureIDs(body);
  const imageAudit = imageAltAudit(body);
  const directory = path.dirname(filePath);
  const localAssets = fs.readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && assetPattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  const featuredCandidates = localAssets.filter((asset) => /^featured\./i.test(asset));
  const svgAssets = localAssets.filter((asset) => asset.endsWith(".svg"));
  const accessibleSVG = svgAssets.filter((asset) => {
    const svg = fs.readFileSync(path.join(directory, asset), "utf8");
    return /<title\b/i.test(svg) && /<desc\b/i.test(svg);
  });

  const narrativeFlags = {
    entrada_reconocible: has(firstPassage, /imagina|piensa en|situacion|caso|puede ocurrir|cuando una|cuando el|cuando la/),
    pregunta_motriz: firstPassage.includes("?"),
    ejemplo_desarrollado: has(headingText, /ejemplo|caso|situacion/) || has(body, /por ejemplo/),
    contraste_o_limite: has(body, /sin embargo|en cambio|a diferencia|contraste|limite|no significa|no basta/),
    recapitulacion: has(headingText, /resumen|recapitul|lo que aprend|lo que acabas|para recordar|cierre/),
    transicion_explicita: has(body, /ahora|despues|a continuacion|lo que sigue|siguiente paso/),
  };
  const narrativeCount = Object.values(narrativeFlags).filter(Boolean).length;

  const didacticFlags = {
    audiencia_explicita: has(`${page.title} ${page.description} ${firstPassage}`, /estudiante|profesor|docente|coordinacion|institucion|comunidad universitaria/),
    proposito_o_resultado: has(`${headingText} ${firstPassage}`, /para que|al terminar|objetivo|proposito|que aprender|que podras|que obtendras/),
    accion_o_practica: has(`${headingText} ${body}`, /actividad|practica|ahora|aplica|disena|produce|construye|prueba/),
    ejemplo_trabajado: narrativeFlags.ejemplo_desarrollado,
    evidencia_o_producto: has(body, /evidencia|entrega|producto|registro|version/),
    criterio_de_avance: has(body, /criterio|como reconocer|rubrica|suficiente|condicion de cierre/),
    apoyo_o_alternativa: has(body, /apoyo|alternativa|sin ia|sin utilizar ia|si no puedes|accesib/),
    retroalimentacion_o_reflexion: has(body, /retroaliment|reflexion|revisa|explica tu decision|justifica/),
    tiempo_estimado: /\b\d+(?:[.,]\d+)?\s*(?:minuto|minutos|hora|horas)\b/i.test(body),
  };
  const didacticCount = Object.values(didacticFlags).filter(Boolean).length;

  const reviewFlags = [];
  if (has(body, /piramide de bloom|jerarquia de bloom|niveles.*secuen/)) {
    reviewFlags.push("bloom-como-jerarquia-o-secuencia");
  }
  if (has(body, /samr/) && has(body, /bloom/)) {
    reviewFlags.push("correspondencia-samr-bloom-por-revisar");
  }
  if (has(body, /chat/) && has(body, /interactiv/)) {
    reviewFlags.push("interactividad-con-chat-por-justificar");
  }
  if (has(body, /detector.*ia|detectar.*ia/)) {
    reviewFlags.push("deteccion-de-ia-requiere-mediacion");
  }
  if (has(body, /ia.*(?:autora|coautora|responsable)|(?:autora|coautora|responsable).*ia/)) {
    reviewFlags.push("autoria-o-responsabilidad-de-la-ia-por-revisar");
  }

  const relations = orientationRelations
    .filter(({ pattern }) => has(`${page.title} ${page.description} ${body}`, pattern))
    .map(({ id, orientations, guides }) => ({ id, orientations, guides }));
  const explicitOrientationReference = /\borientaciones institucionales\b/i.test(body);
  const explicitGuideReference = /\bgu[ií]a docente\b|todav[ií]a no la entrego|cuando dos cambios parecen mejorar|cuando el contexto cambia/i.test(body);

  const hasExplanatoryVisual = (
    page.visual.svg_count
    + page.visual.mermaid_count
    + imageAudit.referenced
    + figures.length
  ) > 0;
  const visualStatus = figures.length > 0
    ? "figura-gobernada"
    : hasExplanatoryVisual
      ? "visual-explicativo-candidato"
      : page.visual.featured
        ? "solo-imagen-de-portada"
        : "sin-visual";
  const visualReviewResult = visualReview(page, featuredCandidates, hasExplanatoryVisual);
  const candidate = interactionCandidate(body, course.rol_en_el_curso, h5p, page.path);
  const lot = lotFor(course.rol_en_el_curso, course.accion_editorial);
  const organizationNeeds = [];
  if (!page.description) organizationNeeds.push("agregar-description");
  if (!page.summary) organizationNeeds.push("agregar-summary");
  if (routeLinks.length === 0 && page.kind === "page") organizationNeeds.push("crear-enlaces-de-continuidad");
  if (
    ["nucleo-candidato", "apoyo-candidato", "banco-de-practicas"].includes(course.rol_en_el_curso)
    && !routeLinks.some((link) => topLevelFromRoute(link) !== topLevelFromRoute(page.route))
  ) organizationNeeds.push("conectar-entre-secciones");
  if (!explicitOrientationReference && relations.length > 0) {
    organizationNeeds.push("vincular-orientaciones");
  }
  if (!explicitGuideReference && relations.length > 0) {
    organizationNeeds.push("vincular-guia-por-audiencia");
  }

  let priorityScore = 0;
  if (["nucleo-candidato", "referencia-en-cuarentena"].includes(course.rol_en_el_curso)) priorityScore += 5;
  else if (["apoyo-candidato", "banco-de-practicas"].includes(course.rol_en_el_curso)) priorityScore += 3;
  else if (course.rol_en_el_curso === "banco-ejemplos-disciplinarios") priorityScore += 1;
  if (course.accion_editorial === "reescribir-antes-de-enlazar") priorityScore += 4;
  if (course.accion_editorial === "fusionar-o-desduplicar") priorityScore += 3;
  if (narrativeCount <= 1) priorityScore += 3;
  else if (narrativeCount <= 3) priorityScore += 1;
  if (didacticCount <= 2) priorityScore += 3;
  else if (didacticCount <= 5) priorityScore += 1;
  if (!hasExplanatoryVisual && ["nucleo-candidato", "apoyo-candidato"].includes(course.rol_en_el_curso)) priorityScore += 1;
  if (reviewFlags.length > 0) priorityScore += 2;

  return {
    path: page.path,
    route: page.route,
    title: page.title,
    kind: page.kind,
    section: page.section,
    words: page.words,
    metadata: {
      description: Boolean(page.description),
      summary: Boolean(page.summary),
      tags: page.tags.length,
      categories: page.categories.length,
      areas: page.areas.length,
    },
    course: {
      role: course.rol_en_el_curso,
      action: course.accion_editorial,
      modules: course.modulos_posibles,
      routes: course.rutas,
      reason: course.razon,
    },
    narrative: {
      status: statusFromCount(narrativeCount, 5, 2),
      signalCount: narrativeCount,
      flags: narrativeFlags,
    },
    didactic: {
      status: statusFromCount(didacticCount, 7, 3),
      signalCount: didacticCount,
      flags: didacticFlags,
    },
    consistency: {
      reviewBand: ["reescribir-antes-de-enlazar", "fusionar-o-desduplicar"].includes(course.accion_editorial)
        || course.rol_en_el_curso === "referencia-en-cuarentena"
        ? "revision-prioritaria"
        : reviewFlags.length > 0
          ? "revision-dirigida"
          : "sin-alerta-automatica",
      reviewFlags,
      explicitOrientationReference,
      explicitGuideReference,
      relations,
    },
    visual: {
      status: visualStatus,
      featured: page.visual.featured,
      localAssets,
      featuredCandidates,
      svgAssets: svgAssets.length,
      accessibleSVG: accessibleSVG.length,
      inlineImages: imageAudit.referenced,
      missingAlt: imageAudit.missingAlt,
      governedFigureIDs: figures,
      review: visualReviewResult,
    },
    interactive: {
      currentH5PIDs: h5p,
      candidate,
      priority: ["nucleo-candidato", "banco-de-practicas"].includes(course.rol_en_el_curso)
        ? "alta-si-apoya-la-tarea"
        : ["apoyo-candidato", "banco-ejemplos-disciplinarios"].includes(course.rol_en_el_curso)
          ? "media"
          : "baja-o-no-necesaria",
    },
    organization: {
      internalLinks: routeLinks.length,
      crossSectionLinks: routeLinks.filter(
        (link) => topLevelFromRoute(link) !== topLevelFromRoute(page.route),
      ).length,
      needs: organizationNeeds,
    },
    editorial: {
      lot,
      priorityScore,
    },
  };
});

function countBy(values) {
  return Object.fromEntries(
    Object.entries(Object.groupBy(values, (value) => value))
      .map(([key, matches]) => [key, matches.length])
      .sort(([left], [right]) => left.localeCompare(right)),
  );
}

const report = {
  schemaVersion: 1,
  id: "UDGIA-021",
  snapshotDate,
  sourceRevision: "40b83d9ceb7f11722f857bcc8dadc357cebda0f4",
  scope: "Inventario narrativo, didáctico, visual, interactivo, organizativo y de integración del sitio Hugo.",
  methodNote: "Las señales automáticas priorizan revisión; no sustituyen lectura editorial, evaluación disciplinar ni lector en frío.",
  sources: {
    baseInventory: path.relative(root, baseInventoryPath),
    courseInventory: courseInventoryPath,
    orientationAuthority: "IAorientacionesUdG.md, revisión 1cb38d9b7486cb4f931de6d3657cf120e89ea4c1",
    teacherGuide: "profesorado/guia-docente-actividades-evaluacion-ia.md",
    studentGuideSamples: "estudiantes/muestras/*.md",
  },
  totals: {
    documents: pages.length,
    pages: pages.filter(({ kind }) => kind === "page").length,
    sections: pages.filter(({ kind }) => kind === "section").length,
    words: pages.reduce((sum, { words }) => sum + words, 0),
    assets: assetRecords.length,
    assetBytes: assetRecords.reduce((sum, { bytes }) => sum + bytes, 0),
    exactDuplicateAssetGroups: duplicateAssetGroups.length,
    exactDuplicateAssetFiles: duplicateAssetGroups.reduce((sum, { paths }) => sum + paths.length, 0),
    h5pCatalogEntries: Object.keys(h5pCatalog.contents || {}).length,
    curricularH5PEntries: Object.keys(h5pCatalog.contents || {}).filter((id) => id !== "runtime-probe").length,
    governedFigures: Object.keys(figureCatalog).length,
    pagesWithH5P: pages.filter(({ interactive }) => interactive.currentH5PIDs.length > 0).length,
    pagesWithGovernedFigures: pages.filter(({ visual }) => visual.governedFigureIDs.length > 0).length,
    pagesWithExplicitOrientationReference: pages.filter(({ consistency }) => consistency.explicitOrientationReference).length,
    pagesWithExplicitGuideReference: pages.filter(({ consistency }) => consistency.explicitGuideReference).length,
    pagesWithNoCrossSectionLinks: pages.filter(({ kind, organization }) => kind === "page" && organization.crossSectionLinks === 0).length,
    pagesWithMultipleFeaturedCandidates: pages.filter(({ visual }) => visual.featuredCandidates.length > 1).length,
    animatedAssets: assetRecords.filter(({ animated }) => animated).length,
    extensionFormatMismatches: assetRecords.filter(({ extensionMatchesFormat }) => !extensionMatchesFormat).length,
  },
  distribution: {
    bySection: countBy(pages.map(({ section }) => section)),
    byCourseRole: countBy(pages.map(({ course }) => course.role)),
    byEditorialAction: countBy(pages.map(({ course }) => course.action)),
    byNarrativeStatus: countBy(pages.map(({ narrative }) => narrative.status)),
    byDidacticStatus: countBy(pages.map(({ didactic }) => didactic.status)),
    byConsistencyBand: countBy(pages.map(({ consistency }) => consistency.reviewBand)),
    byVisualStatus: countBy(pages.map(({ visual }) => visual.status)),
    byVisualDecision: countBy(pages.map(({ visual }) => visual.review.decision)),
    byLot: countBy(pages.map(({ editorial }) => editorial.lot)),
    interactionCandidates: countBy(pages.map(({ interactive }) => interactive.candidate.type)),
  },
  assets: {
    byExtension: countBy(assetRecords.map(({ extension }) => extension)),
    byDetectedFormat: countBy(assetRecords.map(({ detectedFormat }) => detectedFormat)),
    byAspect: countBy(assetRecords.map(({ aspectBucket: bucket }) => bucket)),
    animated: assetRecords.filter(({ animated }) => animated).map(({ path: assetPath }) => assetPath),
    extensionFormatMismatches: assetRecords
      .filter(({ extensionMatchesFormat }) => !extensionMatchesFormat)
      .map(({ path: assetPath, extension, detectedFormat }) => ({ path: assetPath, extension, detectedFormat })),
    exactDuplicateGroups: duplicateAssetGroups,
  },
  interactiveCatalog: Object.entries(h5pCatalog.contents || {}).map(([id, entry]) => ({
    id,
    title: entry.title,
    mainLibrary: entry.mainLibrary,
    package: entry.package,
  })),
  standardsBaseline: {
    publicWriting: [
      "situación reconocible antes del concepto",
      "explicación en prosa antes de tablas, figuras o H5P",
      "ejemplo desarrollado, contraste, uso y recapitulación",
      "criterio observable para actividades y siguiente paso claro",
    ],
    visual: [
      "featured no cuenta como visual didáctico",
      "SVG con título y descripción; variante móvil cuando la densidad lo exige",
      "figura mediada por texto que explica qué observar",
      "procedencia, licencia, alcance editorial y alternativa textual",
    ],
    interactive: [
      "función didáctica antes de elegir biblioteca",
      "fallback HTML equivalente y navegable por teclado",
      "sin cuentas, calificación, xAPI, cookies ni persistencia por defecto",
      "paquete autoalojado, catálogo gobernado, hash, licencia y QA raíz/subruta",
      "la interacción no sustituye reciprocidad humana ni evidencia de aprendizaje",
    ],
    ecosystemLinking: [
      "cada página central declara qué criterio de Orientaciones desarrolla",
      "cada enlace al curso especifica si prepara, acompaña o profundiza una tarea",
      "las guías por audiencia median la aplicación; no duplican el marco rector",
      "los ejemplos disciplinares son optativos y no amplían la carga obligatoria",
    ],
  },
  pages: pages.sort(
    (left, right) => left.editorial.lot.localeCompare(right.editorial.lot)
      || right.editorial.priorityScore - left.editorial.priorityScore
      || left.path.localeCompare(right.path),
  ),
};

const csvColumns = [
  "lot",
  "priority_score",
  "path",
  "route",
  "title",
  "kind",
  "section",
  "words",
  "course_role",
  "course_action",
  "modules",
  "audience_routes",
  "narrative_status",
  "narrative_signals",
  "didactic_status",
  "didactic_signals",
  "consistency_band",
  "review_flags",
  "orientation_relations",
  "explicit_orientation_reference",
  "explicit_guide_reference",
  "visual_status",
  "visual_decision",
  "visual_family",
  "featured",
  "svg_assets",
  "accessible_svg",
  "inline_images",
  "missing_alt",
  "current_h5p",
  "interaction_candidate",
  "interaction_technology",
  "internal_links",
  "cross_section_links",
  "organization_needs",
];
const csvValue = (value) => {
  const raw = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return /[",\n]/.test(raw) ? `"${raw.replaceAll('"', '""')}"` : raw;
};
const csvRows = report.pages.map((page) => {
  const flat = {
    lot: page.editorial.lot,
    priority_score: page.editorial.priorityScore,
    path: page.path,
    route: page.route,
    title: page.title,
    kind: page.kind,
    section: page.section,
    words: page.words,
    course_role: page.course.role,
    course_action: page.course.action,
    modules: page.course.modules,
    audience_routes: page.course.routes,
    narrative_status: page.narrative.status,
    narrative_signals: page.narrative.signalCount,
    didactic_status: page.didactic.status,
    didactic_signals: page.didactic.signalCount,
    consistency_band: page.consistency.reviewBand,
    review_flags: page.consistency.reviewFlags,
    orientation_relations: page.consistency.relations.map(({ id }) => id),
    explicit_orientation_reference: page.consistency.explicitOrientationReference,
    explicit_guide_reference: page.consistency.explicitGuideReference,
    visual_status: page.visual.status,
    visual_decision: page.visual.review.decision,
    visual_family: page.visual.review.family,
    featured: page.visual.featured,
    svg_assets: page.visual.svgAssets,
    accessible_svg: page.visual.accessibleSVG,
    inline_images: page.visual.inlineImages,
    missing_alt: page.visual.missingAlt,
    current_h5p: page.interactive.currentH5PIDs,
    interaction_candidate: page.interactive.candidate.type,
    interaction_technology: page.interactive.candidate.technology,
    internal_links: page.organization.internalLinks,
    cross_section_links: page.organization.crossSectionLinks,
    organization_needs: page.organization.needs,
  };
  return csvColumns.map((column) => csvValue(flat[column])).join(",");
});

const jsonText = `${JSON.stringify(report, null, 2)}\n`;
const csvText = `${[csvColumns.join(","), ...csvRows].join("\n")}\n`;
const jsonPath = path.join(outputDir, "inventario-materiales.json");
const csvPath = path.join(outputDir, "inventario-materiales.csv");

if (checkMode) {
  const failures = [];
  if (!fs.existsSync(jsonPath) || fs.readFileSync(jsonPath, "utf8") !== jsonText) {
    failures.push(path.relative(root, jsonPath));
  }
  if (!fs.existsSync(csvPath) || fs.readFileSync(csvPath, "utf8") !== csvText) {
    failures.push(path.relative(root, csvPath));
  }
  if (failures.length > 0) {
    console.error(`Inventario UDGIA-021 desactualizado: ${failures.join(", ")}`);
    process.exit(1);
  }
  console.log(`Inventario UDGIA-021 vigente: ${pages.length} piezas auditadas.`);
} else {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(jsonPath, jsonText, "utf8");
  fs.writeFileSync(csvPath, csvText, "utf8");
  console.log(`Inventario UDGIA-021 generado: ${path.relative(root, outputDir)}.`);
}
