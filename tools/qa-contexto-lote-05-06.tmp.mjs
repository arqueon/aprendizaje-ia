// QA focal de aplicación — lotes contexto-05 (procedencia de prácticas) y contexto-06
// (seis fuentes de riesgo). Ejecutar desde la raíz del proyecto: node tools/qa-contexto-lote-05-06.tmp.mjs
// Comprueba estado de evidencia declarado, ausencia de cifras sin procedencia,
// cuarentenas reversibles, aliases y contrato del ecosistema. No modifica nada.
import fs from "node:fs";
import crypto from "node:crypto";

const checks = [];
function check(id, ok, detail = "") {
  checks.push({ id, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${id}${detail && !ok ? ` — ${detail}` : ""}`);
}
const read = (p) => fs.readFileSync(p, "utf8");
const exists = (p) => fs.existsSync(p);
const sha = (p) => crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");

// ---------- LOTE 5 ----------
const practices = {
  abp: "content/laboratorio/practicas/abp-con-ia/index.md",
  debate: "content/laboratorio/practicas/debate-socratico-con-ia/index.md",
  portafolio: "content/laboratorio/practicas/evaluacion-formativa-asistida-ia/index.md",
};
const forbidden = [
  /n\s*=\s*32/i, /78\s*%/, /72\s*%/, /grupo de 28/i, /grupo de 32/i, /grupo de 30/i,
  /grupo de 35/i, /primera implementaci[oó]n/i, /primera aplicaci[oó]n/i,
  /semestre anterior/i, /\[pegar/i, /\[Pegar/,
];
for (const [key, p] of Object.entries(practices)) {
  const t = read(p);
  const bad = forbidden.filter((re) => re.test(t));
  check(`l5.${key}.sin-cifras-ni-huecos`, bad.length === 0, bad.map(String).join(", "));
  check(`l5.${key}.estado-propuesta`, /actividad propuesta|Estado: actividad propuesta/i.test(t));
  check(`l5.${key}.alternativa-sin-ia`, /Alternativa sin IA/.test(t));
  check(`l5.${key}.riesgos`, /Riesgos y condiciones de aplicaci[oó]n/.test(t));
}
check("l5.abp.problema-ejemplo", /Problema inicial de ejemplo/.test(read(practices.abp)));
check("l5.abp.preguntas-revision", /Preguntas de revisi[oó]n tras aplicar/.test(read(practices.abp)));
check("l5.debate.tesis-ejemplo", /Tesis inicial de ejemplo/.test(read(practices.debate)));
check("l5.debate.dos-objeciones", /dos objeciones/.test(read(practices.debate)));
check("l5.debate.sin-conversacion-completa", !/documenta el intercambio completo|Documenta el intercambio completo/i.test(read(practices.debate)));
const porta = read(practices.portafolio);
check("l5.portafolio.ecosistema-id", /id:\s*practice\.portafolio-proceso/.test(porta));
check("l5.portafolio.relacion-continua", /tipo:\s*continua[\s\S]{0,40}destino:\s*practice\.declaracion-uso-ia/.test(porta));
check("l5.portafolio.rubrica-ejemplo", /R[uú]brica breve de ejemplo/.test(porta));
check("l5.portafolio.fragmento-ejemplo", /Fragmento inicial de ejemplo/.test(porta));
check("l5.portafolio.sin-logs-integros", !/log de la conversaci[oó]n|logs de interacciones con la IA/i.test(porta));

// aprendizaje activo: cuarentena reversible
const aaDir = "content/laboratorio/practicas/aprendizaje-activo-ia";
const aaQ = "docs/editorial/cuarentena/2026-08-24-contexto-lote-05/content/laboratorio/practicas/aprendizaje-activo-ia";
check("l5.aa.activo-sin-index", !exists(`${aaDir}/index.md`) && !exists(`${aaDir}/featured.png`));
check("l5.aa.recuperaciones-ocultas-intactas",
  exists(`${aaDir}/.index.md.~41de60cb`) && exists(`${aaDir}/.featured.png.~57231a45`));
check("l5.aa.cuarentena-completa", exists(`${aaQ}/index.md`) && exists(`${aaQ}/featured.png`));
check("l5.aa.cuarentena-hash",
  sha(`${aaQ}/index.md`) === "02fb4410db0784f9213da0541923888ef18fd381365a7ad90e5fcfcff4b9a5ec");
check("l5.aa.alias-en-guia",
  /aliases:.*\/laboratorio\/practicas\/aprendizaje-activo-ia\//.test(read("content/ia-educacion/guias/aprendizaje-activo-con-ia/index.md")));

// referencias entrantes: sin lenguaje de caso implementado hacia las 4 prácticas
const citing = [
  "content/blog/agenciamiento-humano-ia/index.md",
  "content/ia-educacion/guias/abp-con-ia/index.md",
  "content/ia-educacion/productos-de-aprendizaje/proyecto/index.md",
  "content/observatorio/guias/documentacion-buenas-practicas-ia/index.md",
  "content/ia-educacion/guias/aprendizaje-activo-con-ia/index.md",
  "content/observatorio/estudios/habitar-ia-simondon/index.md",
  "content/formacion-docente/pensamiento-critico-ia-generativa/index.md",
  "content/ia-educacion/productos-de-aprendizaje/ensayo/index.md",
  "content/recursos/articulos/partnerships-pedagogicos-ia-wang-zhang/index.md",
  "content/recursos/comparativa-llm-pedagogica/index.md",
  "content/blog/ia-generativa-evaluacion-autentica/index.md",
  "content/ia-educacion/guias/evaluacion-formativa-ia/index.md",
  "content/ia-educacion/guias/integracion-curricular-ia/index.md",
  "content/recursos/articulos/genai-feedback-engagement-2025/index.md",
];
const caseLang = /(caso real|caso documentado|pr[aá]ctica documentada|implementaci[oó]n concreta|ya opera|ya funciona|grupo real)[^\n]{0,120}\/laboratorio\/practicas\/|\/laboratorio\/practicas\/[^\n)]{0,80}\)[^\n]{0,120}(caso real|caso documentado|documenta (una|un) |muestra un caso|grupo real)/i;
for (const f of citing) {
  check(`l5.citante.${f.split("/").slice(-2, -1)[0] || f}`, !caseLang.test(read(f)), "conserva lenguaje de caso implementado");
}
// decisiones actualizadas
const dec = JSON.parse(read("data/editorial/context-audit-decisions.json")).decisions;
check("l5.decisiones.abp-cambiar", dec["content/laboratorio/practicas/abp-con-ia/index.md"].decision === "cambiar");
check("l5.decisiones.debate-cambiar", dec["content/laboratorio/practicas/debate-socratico-con-ia/index.md"].decision === "cambiar");
check("l5.decisiones.portafolio-cambiar", dec["content/laboratorio/practicas/evaluacion-formativa-asistida-ia/index.md"].decision === "cambiar");
check("l5.decisiones.aa-quitar", dec["content/laboratorio/practicas/aprendizaje-activo-ia/index.md"].decision === "quitar");

// ---------- LOTE 6 ----------
check("l6.coordinacion.sin-cambios",
  sha("content/ia-educacion/rutas/coordinacion-academica/index.md") === "38b1e3b64c6bbdadec86e506a2d48daf4f934c02e12afef44f0308142127e029");
const samr = read("content/recursos/glosario/modelo-samr/index.md");
check("l6.samr.wayback", samr.includes("web.archive.org/web/20250904122306/"));
check("l6.samr.doi-critica", samr.includes("doi.org/10.1007/s11528-016-0091-y"));
check("l6.samr.sin-enlace-vivo-roto", !/[^\/]hippasus\.com|(?<!archive\.org\/web\/20250904122306\/https:\/\/)www\.hippasus\.com/.test(samr.replace(/web\.archive\.org\/web\/20250904122306\/https:\/\/www\.hippasus\.com[^\s>]*/g, "WAYBACK")));
check("l6.samr.limites-02a-conservados", /no son una escala de calidad/.test(samr) && /Tampoco existe una correspondencia fija/.test(samr));
const about = read("content/about.md");
check("l6.about.sin-prioridad-institucional", !/prioridad de la Universidad/.test(about));
check("l6.about.sin-promesa-total", !/Toda afirmaci[oó]n factual/.test(about));
check("l6.about.no-canal-oficial", /No es un canal oficial/.test(about));
check("l6.about.estatuto-piezas", /actividades propuestas|Actividades propuestas/.test(about) && /cuarentena|revisi[oó]n editorial/i.test(about));
const tut = read("content/ia-educacion/tendencias/ia-tutorias-mentoria/index.md");
check("l6.tutorias.sin-replicable-robusto", !/replicable y robusto/.test(tut));
check("l6.tutorias.fecha-brookings", /Burns, M\. \(2026, 27 de enero\)/.test(tut));
check("l6.tutorias.sin-brookings-2024", !/Brookings Institution, 2024|Brookings Institution\. \(2024\)/.test(tut));
check("l6.tutorias.sin-cifras-mexicanas", !/cuarenta o cincuenta/.test(tut));
check("l6.tutorias.caveat-kestin", /no suponen que la tutor[ií]a estructurada/.test(tut));
check("l6.tutorias.riesgos-de-diseno", /Riesgos de dise[nñ]o \(no efectos inevitables\)/.test(tut));
check("l6.tutorias.cuando-persona", /cu[aá]ndo debe intervenir una persona/i.test(tut));
check("l6.tutorias.comprobar-sin-ia", /comprobarse sin IA/.test(tut));
// cuarentenas lote 6
const bq = "docs/editorial/cuarentena/2026-08-24-contexto-lote-06/content/blog/experiencias-docentes-ia-aula";
const hq = "docs/editorial/cuarentena/2026-08-24-contexto-lote-06/content/laboratorio/experiencias";
check("l6.blog.activo-sin-index", !exists("content/blog/experiencias-docentes-ia-aula/index.md"));
check("l6.blog.cuarentena-hash", sha(`${bq}/index.md`) === "33e2fbf712cd7842db879318f2d14968761f21e7bcdcebace1026cbd25d32edb");
check("l6.hub.activo-sin-index", !exists("content/laboratorio/experiencias/_index.md"));
check("l6.hub.cuarentena-hash", sha(`${hq}/_index.md`) === "d292ab6b38c51c3dd844863f68a75014984800e3531b38c87f370af3f8e54812");
check("l6.recuperaciones-ocultas-intactas",
  exists("content/blog/experiencias-docentes-ia-aula/.index.md.~2ff78cb4")
  && exists("content/laboratorio/experiencias/._index.md.~3af4d80"));
const lab = read("content/laboratorio/_index.md");
check("l6.lab.aliases", lab.includes("/laboratorio/experiencias/") && lab.includes("/blog/experiencias-docentes-ia-aula/"));
check("l6.lab.sin-tarjeta-experiencias", !/card link="experiencias\/"/.test(lab));
check("l6.lab.sin-promesa-documentada", !/implementaci[oó]n documentada|experiencia documentada|resultados respaldados/.test(lab));
// sin referencias entrantes activas a rutas en cuarentena (fuera de aliases)
const { execSync } = await import("node:child_process");
const grep = (pat) => {
  try {
    return execSync(`grep -rl "${pat}" content/ --include='*.md'`, { encoding: "utf8" }).trim().split("\n").filter(Boolean);
  } catch { return []; }
};
const expRefs = grep("](/laboratorio/experiencias/").concat(grep("](/blog/experiencias-docentes-ia-aula/"));
check("l6.sin-enlaces-a-cuarentena", expRefs.length === 0, expRefs.join(", "));
const aaRefs = grep("](/laboratorio/practicas/aprendizaje-activo-ia/");
check("l5.sin-enlaces-a-cuarentena", aaRefs.length === 0, aaRefs.join(", "));

// ---------- rollback y salvaguardas ----------
for (const lot of ["2026-08-24-contexto-lote-05", "2026-08-24-contexto-lote-06"]) {
  const m = JSON.parse(read(`docs/editorial/rollback/${lot}/manifest.json`));
  const bad = m.pre_edit_copies.filter((e) => sha(`docs/editorial/rollback/${lot}/${e.path}`) !== e.sha256);
  check(`rollback.${lot}.integro`, bad.length === 0, bad.map((e) => e.path).join(", "));
}
check("salvaguarda.sin-git", !exists(".git"));
// public/ es salida de build local que el propio qa:routes-tables regenera (igual que en el
// QA del lote 04); sin .git no existe vía de publicación desde esta copia. Lo que sí debe
// preservarse: las copias en conflicto de Nextcloud dentro de public/ no se tocan.
const rollbackMtime = fs.statSync("docs/editorial/rollback/2026-08-24-contexto-lote-05/manifest.json").mtimeMs;
let conflicted = 0, conflictedTouched = 0;
if (exists("public")) {
  for (const e of fs.readdirSync("public")) {
    if (e.includes("conflicted copy")) {
      conflicted += 1;
      if (fs.statSync(`public/${e}`).mtimeMs >= rollbackMtime) conflictedTouched += 1;
    }
  }
}
check("salvaguarda.conflicted-copies-public-intactas", conflictedTouched === 0,
  `${conflictedTouched} de ${conflicted} copias en conflicto modificadas en sesión`);

const failures = checks.filter((c) => !c.ok);
console.log(`\n${failures.length === 0 ? "PASS" : "FAIL"}: QA focal lotes 05-06 — ${checks.length} comprobaciones, ${failures.length} fallos.`);
fs.mkdirSync("docs/design/evidence/contexto-lote-05-06", { recursive: true });
fs.writeFileSync("docs/design/evidence/contexto-lote-05-06/qa-focal.json",
  JSON.stringify({ schemaVersion: 1, lots: ["contexto-lote-05", "contexto-lote-06"], date: "2026-08-24", checks, failures: failures.length }, null, 2) + "\n");
process.exit(failures.length === 0 ? 0 : 1);
