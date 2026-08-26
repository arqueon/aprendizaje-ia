import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "content");
const snapshotDate = process.env.UDGIA_SNAPSHOT_DATE || "2026-08-23";
const outputDir = path.resolve(
  process.env.UDGIA_CONTEXT_AUDIT_DIR
    || path.join(root, "docs", "editorial", "inventarios", `${snapshotDate}-contexto`),
);
const checkMode = process.argv.includes("--check");
const decisionsPath = path.join(root, "data", "editorial", "context-audit-decisions.json");
const manualDecisions = fs.existsSync(decisionsPath)
  ? JSON.parse(fs.readFileSync(decisionsPath, "utf8")).decisions || {}
  : {};

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkup(value) {
  return String(value || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\{[<%][\s\S]*?[>%]\}\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_>#|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function frontMatter(text) {
  if (!text.startsWith("---\n")) return { metadata: "", body: text, bodyStartLine: 1 };
  const end = text.indexOf("\n---", 4);
  if (end < 0) return { metadata: "", body: text, bodyStartLine: 1 };
  const beforeBody = text.slice(0, end + 4);
  return {
    metadata: text.slice(4, end),
    body: text.slice(end + 4),
    bodyStartLine: beforeBody.split("\n").length,
  };
}

function metadataValue(metadata, key) {
  const match = metadata.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, "mi"));
  return match?.[1]?.replace(/["']$/, "").trim() || "";
}

function roleFor(relativePath) {
  const clean = relativePath.replace(/^content\//, "");
  if (path.basename(clean) === "_index.md") return "navegacion";
  if (clean.includes("/practicas/")) return "practica";
  if (clean.includes("/guias/")) return "guia";
  if (clean.includes("/rutas/") || clean.includes("/constelaciones/")) return "ruta";
  if (clean.startsWith("recursos/") || clean.includes("/glosario/")) return "recurso";
  if (clean.startsWith("blog/") || clean.startsWith("observatorio/")) return "articulo";
  return "pagina";
}

const signalDefinitions = {
  situacion: /\b(cuando|si necesitas|si quieres|antes de|despues de|problema|reto|caso|situacion|dificultad|escenario|tienes que|vas a|estas por)\b/,
  quien: /\b(docente|profesor(?:a)?|estudiante|grupo|equipo|coordinador(?:a)?|directiv[oa]|investigador(?:a)?|persona|participante|academia)\b/,
  momento_entorno: /\b(clase|curso|semestre|taller|sesion|modalidad|aula|linea|presencial|hibrid[oa]|minutos?|horas?|semanas?|antes|durante|despues)\b/,
  material_inicial: /\b(parte de|empieza con|comienza con|recibe|material|texto|borrador|afirmacion|pregunta|caso|datos|lectura|prompt|archivo|rubrica|instruccion|fuente|tesis|problema inicial)\b/,
  acciones: /\b(escribe|compara|revisa|elige|anota|localiza|formula|discute|entrega|disena|verifica|documenta|explica|decide|registra|contrasta|identifica|redacta|clasifica|prueba|consulta|presenta|modifica|conserva|descarta)\b/,
  resultado: /\b(al terminar|resultado|entregable|entrega|conserva|produce|obtendras|quedara|portafolio|informe|mapa|ficha|tabla|borrador final|version final|reflexion escrita|presentacion|infografia|reporte)\b/,
  comprobacion: /\b(comprueba|verifica|criterios?|lista de cotejo|rubrica|como saber|revision|otra persona|evalua|evaluacion|retroalimentacion|fuente verificable|defiende|justifica)\b/,
};

const abstractTerms = [
  "consigna", "huella", "insumo", "artefacto", "alineacion", "evidencia",
  "producto", "criterio", "proposito", "trazabilidad", "agenciamiento",
  "co-produccion", "ensamblaje", "direccion epistemica",
];

function sourceLines(file, body, bodyStartLine) {
  return body.split("\n").map((text, index) => ({
    source: path.relative(root, file).split(path.sep).join("/"),
    line: bodyStartLine + index,
    text: text.trim(),
    normalized: normalize(stripMarkup(text)),
  }));
}

function firstEvidence(lines, expression) {
  const found = lines.find((line) => line.normalized && expression.test(line.normalized));
  if (!found) return null;
  return { source: found.source, line: found.line, text: found.text.slice(0, 240) };
}

function countMatches(text, terms) {
  return terms.reduce((total, term) => {
    const expression = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    return total + (text.match(expression)?.length || 0);
  }, 0);
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join("|") : String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const markdownFiles = walk(contentRoot)
  .filter((file) => file.endsWith(".md"))
  .sort((a, b) => a.localeCompare(b));

const pages = markdownFiles.map((file) => {
  const relativePath = path.relative(root, file).split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  const { metadata, body, bodyStartLine } = frontMatter(text);
  const title = metadataValue(metadata, "title") || path.basename(path.dirname(file));
  const role = roleFor(relativePath);
  const lines = sourceLines(file, body, bodyStartLine);
  const dependencies = [];

  if (/\{\{[<%]\s*illustrated-guide\s*[>%]\}\}/.test(body)) {
    const guideBody = path.join(path.dirname(file), "guide-body.txt");
    if (fs.existsSync(guideBody)) {
      dependencies.push(path.relative(root, guideBody).split(path.sep).join("/"));
      lines.push(...sourceLines(guideBody, fs.readFileSync(guideBody, "utf8"), 1));
    }
  }

  const plain = stripMarkup(lines.map((line) => line.text).join("\n"));
  const normalized = normalize(plain);
  const words = plain ? plain.split(/\s+/).length : 0;
  const signals = Object.fromEntries(Object.entries(signalDefinitions).map(([name, expression]) => {
    const evidence = firstEvidence(lines, expression);
    return [name, { present: Boolean(evidence), evidence }];
  }));

  const actionCount = countMatches(normalized, [
    "escribe", "compara", "revisa", "elige", "anota", "localiza", "formula",
    "discute", "entrega", "disena", "verifica", "documenta", "explica", "decide",
  ]);
  const abstractCount = countMatches(normalized, abstractTerms);
  const directLanguage = actionCount > 0 && (abstractCount === 0 || actionCount >= abstractCount / 2);
  signals.lenguaje_directo = {
    present: directLanguage,
    evidence: directLanguage
      ? firstEvidence(lines, signalDefinitions.acciones)
      : firstEvidence(lines, new RegExp(`\\b(${abstractTerms.join("|")})\\b`)),
  };

  const riskFlags = [];
  const addRisk = (id, expression, note) => {
    const evidence = firstEvidence(lines, expression);
    if (evidence) riskFlags.push({ id, note, evidence });
  };

  addRisk(
    "afirmacion-implementacion-por-verificar",
    /\b(en la primera implementacion|en la primera aplicacion|despues de implementar esta practica durante|observaciones tras las (?:dos|tres|cuatro|[0-9]+) sesiones|los estudiantes reportaron|se observo que)\b/,
    "La página afirma una implementación o resultado empírico; requiere procedencia independiente antes de tratarlo como hecho.",
  );
  addRisk(
    "solicita-conversacion-completa",
    /\b(documenta|entrega|conserva|muestra|adjunta)\b.{0,60}\b(conversacion completa|intercambio completo|logs? completos?|registro completo de (la )?conversacion)\b/,
    "Revisar minimización de datos: una nota de decisión suele ser preferible a conservar conversaciones completas.",
  );
  if (role === "practica") {
    addRisk(
      "material-central-se-genera-pero-no-se-muestra",
      /\b(el docente genera (un caso|un escenario|una secuencia)|selecciona un problema del entorno local)\b/,
      "La fuente describe cómo producir o elegir el material central, pero no muestra un ejemplar listo para iniciar la práctica.",
    );
    addRisk(
      "material-con-marcadores-sin-completar",
      /\[(pegar|incluir|insertar|completar)[^\]]*\]/,
      "El material inicial contiene marcadores que otra persona todavía tendría que completar.",
    );
  }

  const prototypeEvidence = firstEvidence(lines, /\b(prototipo de escenario|no (es|fue) (el )?reporte de una implementacion|no implementad[oa])\b/);
  const implementedEvidence = firstEvidence(lines, /\b(en la primera implementacion|en la primera aplicacion|despues de implementar esta practica durante|observaciones tras las (?:dos|tres|cuatro|[0-9]+) sesiones|los estudiantes reportaron|se observo que)\b/);
  if (prototypeEvidence && implementedEvidence) {
    riskFlags.push({
      id: "estado-contradictorio",
      note: "La misma fuente se presenta como prototipo/no implementada y como implementación con resultados.",
      evidence: prototypeEvidence,
      relatedEvidence: implementedEvidence,
    });
  }

  if (words < 90) {
    riskFlags.push({
      id: "cuerpo-muy-breve",
      note: "La brevedad activa revisión, pero no decide por sí sola que la página deba quitarse.",
      evidence: { source: relativePath, line: bodyStartLine, text: `${words} palabras visibles/auditables` },
    });
  }

  const requiredByRole = {
    practica: Object.keys(signals),
    guia: ["situacion", "quien", "momento_entorno", "acciones", "resultado", "comprobacion", "lenguaje_directo"],
    ruta: ["situacion", "quien", "acciones", "resultado", "lenguaje_directo"],
    navegacion: ["situacion", "quien", "acciones", "lenguaje_directo"],
    recurso: ["situacion", "quien", "lenguaje_directo"],
    articulo: ["situacion", "quien", "lenguaje_directo"],
    pagina: ["situacion", "quien", "lenguaje_directo"],
  }[role];
  const missing = requiredByRole.filter((name) => !signals[name].present);

  if (role === "practica" && missing.length >= 3) {
    riskFlags.push({
      id: "practica-sin-arco-completo",
      note: `Faltan señales esperadas para una práctica: ${missing.join(", ")}.`,
      evidence: { source: relativePath, line: bodyStartLine, text: "Revisión estructural de la práctica" },
    });
  }
  if (role === "practica" && !signals.material_inicial.present) {
    riskFlags.push({
      id: "practica-sin-material-inicial-visible",
      note: "La práctica no muestra con claridad el texto, caso, datos, pregunta o archivo con el que se empieza.",
      evidence: { source: relativePath, line: bodyStartLine, text: "No se detectó material inicial visible" },
    });
  }
  if (role === "practica" && (!signals.resultado.present || !signals.comprobacion.present)) {
    riskFlags.push({
      id: "practica-sin-cierre-comprobable",
      note: "La práctica no deja claro qué queda al terminar o cómo se comprueba.",
      evidence: { source: relativePath, line: bodyStartLine, text: "No se detectó resultado o comprobación final" },
    });
  }

  let automaticPriority = "baja";
  if (riskFlags.some((risk) => risk.id === "estado-contradictorio")) automaticPriority = "urgente";
  else if (riskFlags.some((risk) => risk.id === "afirmacion-implementacion-por-verificar")) automaticPriority = "alta";
  else if (role === "practica" && missing.length >= 3) automaticPriority = "alta";
  else if ((role === "practica" && missing.length > 0) || (role === "guia" && missing.length >= 3)) automaticPriority = "media";
  else if (riskFlags.length > 0 || missing.length > Math.ceil(requiredByRole.length / 2)) automaticPriority = "media";

  const manual = manualDecisions[relativePath] || {};
  return {
    path: relativePath,
    title,
    role,
    words,
    dependencies,
    signals,
    missing_expected_signals: missing,
    risk_flags: riskFlags,
    automatic_priority: automaticPriority,
    manual_decision: manual.decision || "pendiente",
    manual_reason: manual.reason || "",
    manual_issue_types: manual.issue_types || [],
    manual_citations: manual.citations || [],
  };
});

const priorityOrder = { urgente: 0, alta: 1, media: 2, baja: 3 };
pages.sort((a, b) => priorityOrder[a.automatic_priority] - priorityOrder[b.automatic_priority]
  || a.path.localeCompare(b.path));

const totals = {
  documents: pages.length,
  by_priority: Object.fromEntries(["urgente", "alta", "media", "baja"].map((priority) => [
    priority,
    pages.filter((page) => page.automatic_priority === priority).length,
  ])),
  by_role: Object.fromEntries([...new Set(pages.map((page) => page.role))].sort().map((role) => [
    role,
    pages.filter((page) => page.role === role).length,
  ])),
  by_manual_decision: Object.fromEntries(["conservar", "cambiar", "quitar", "pendiente"].map((decision) => [
    decision,
    pages.filter((page) => page.manual_decision === decision).length,
  ])),
  candidate_manual_pending: pages.filter((page) => page.automatic_priority !== "baja" && page.manual_decision === "pendiente").length,
  flagged_implementation_claims: pages.filter((page) => page.risk_flags.some((risk) => risk.id === "afirmacion-implementacion-por-verificar")).length,
  contradictory_state: pages.filter((page) => page.risk_flags.some((risk) => risk.id === "estado-contradictorio")).length,
  practices_needing_initial_material_review: pages.filter((page) => page.role === "practica" && (
    !page.signals.material_inicial.present
      || page.risk_flags.some((risk) => [
        "material-central-se-genera-pero-no-se-muestra",
        "material-con-marcadores-sin-completar",
      ].includes(risk.id))
  )).length,
  practices_missing_checkable_close: pages.filter((page) => page.risk_flags.some((risk) => risk.id === "practica-sin-cierre-comprobable")).length,
};

const payload = {
  snapshot_date: snapshotDate,
  method: {
    purpose: "Priorizar revisión humana; no retirar contenido automáticamente.",
    signals: Object.keys(signalDefinitions).concat("lenguaje_directo"),
    decisions: {
      conservar: "La función y el recorrido se entienden; solo requiere correcciones menores.",
      cambiar: "La función es recuperable, pero faltan contexto, material, acciones, resultado, comprobación o procedencia.",
      quitar: "No tiene función recuperable, duplica una pieza mejor, está obsoleta o su estado/procedencia no puede sostenerse.",
    },
  },
  totals,
  pages,
};

const json = `${JSON.stringify(payload, null, 2)}\n`;
const columns = [
  "path", "title", "role", "words", "automatic_priority", "missing_expected_signals",
  "risk_flags", "manual_decision", "manual_issue_types", "manual_reason",
];
const csv = [columns.join(","), ...pages.map((page) => columns.map((column) => {
  let value = page[column];
  if (column === "risk_flags") value = page.risk_flags.map((risk) => risk.id);
  return csvCell(value);
}).join(","))].join("\n") + "\n";

const candidates = pages.filter((page) => page.automatic_priority !== "baja");
const reviewed = pages.filter((page) => page.manual_decision !== "pendiente");
const summary = `# Barrido de claridad y contexto — ${snapshotDate}\n\n`
  + `Este barrido cubre **${totals.documents} fuentes Markdown**. Sus prioridades son señales para revisión humana, no órdenes de retiro.\n\n`
  + `## Totales\n\n`
  + `- urgente: ${totals.by_priority.urgente}\n`
  + `- alta: ${totals.by_priority.alta}\n`
  + `- media: ${totals.by_priority.media}\n`
  + `- baja: ${totals.by_priority.baja}\n`
  + `- afirmaciones de implementación por verificar: ${totals.flagged_implementation_claims}\n`
  + `- estados contradictorios: ${totals.contradictory_state}\n`
  + `- prácticas cuyo material inicial necesita revisión: ${totals.practices_needing_initial_material_review}\n`
  + `- prácticas sin cierre comprobable: ${totals.practices_missing_checkable_close}\n\n`
  + `## Decisiones humanas registradas\n\n`
  + `- conservar: ${totals.by_manual_decision.conservar}\n`
  + `- cambiar: ${totals.by_manual_decision.cambiar}\n`
  + `- quitar o poner en cuarentena: ${totals.by_manual_decision.quitar}\n`
  + `- pendientes: ${totals.by_manual_decision.pendiente}\n\n`
  + `## Cola automática\n\n`
  + `| Prioridad | Rol | Ruta | Señales faltantes | Riesgos |\n|---|---|---|---|---|\n`
  + candidates.map((page) => `| ${page.automatic_priority} | ${page.role} | \`${page.path}\` | ${page.missing_expected_signals.join(", ") || "—"} | ${page.risk_flags.map((risk) => risk.id).join(", ") || "—"} |`).join("\n")
  + `\n\n## Decisiones humanas registradas por ruta\n\n`
  + `| Decisión | Ruta | Tipos de problema | Razón |\n|---|---|---|---|\n`
  + reviewed.map((page) => `| ${page.manual_decision} | \`${page.path}\` | ${page.manual_issue_types.join(", ") || "—"} | ${page.manual_reason.replaceAll("|", "\\|")} |`).join("\n")
  + `\n\n## Uso\n\nCada fila debe revisarse en su página renderizada y en su fuente. La decisión final se conserva en \`data/editorial/context-audit-decisions.json\` e incluye citas. Una señal ausente no basta para quitar una página.\n`;

if (checkMode) {
  if (totals.candidate_manual_pending > 0) {
    throw new Error(`Hay ${totals.candidate_manual_pending} candidatas de contexto sin decisión humana.`);
  }
  const expected = [
    [path.join(outputDir, "auditoria-contexto.json"), json],
    [path.join(outputDir, "cola-contexto.csv"), csv],
    [path.join(outputDir, "resumen.md"), summary],
  ];
  for (const [file, content] of expected) {
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content) {
      throw new Error(`Inventario de contexto desactualizado: ${path.relative(root, file)}`);
    }
  }
  console.log(`Inventario de contexto vigente: ${totals.documents} fuentes; ${candidates.length} candidatas.`);
} else {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "auditoria-contexto.json"), json);
  fs.writeFileSync(path.join(outputDir, "cola-contexto.csv"), csv);
  fs.writeFileSync(path.join(outputDir, "resumen.md"), summary);
  console.log(`Auditoría de contexto generada: ${totals.documents} fuentes; ${candidates.length} candidatas.`);
  console.log(JSON.stringify(totals));
}
