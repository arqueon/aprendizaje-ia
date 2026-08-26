import fs from 'node:fs';
import crypto from 'node:crypto';

const root = process.cwd();
const read = (p) => fs.readFileSync(`${root}/${p}`, 'utf8');
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(`${root}/${p}`)).digest('hex');
const body = (text) => text.replace(/^---[\s\S]*?---\s*/u, '');
const failures = [];
let checks = 0;
const check = (name, condition) => {
  checks += 1;
  if (!condition) failures.push(name);
};

const blogPath = 'content/blog/ia-generativa-evaluacion-autentica/index.md';
const articlePath = 'content/recursos/articulos/autenticidad-evaluacion-ajjawi-bearman/index.md';
const plagiarismPath = 'content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/index.md';
const formativePath = 'content/ia-educacion/guias/evaluacion-formativa-ia/index.md';
const glossaryPath = 'content/recursos/glosario/integridad-academica/index.md';
const decisionsPath = 'data/editorial/context-audit-decisions.json';
const paths = [blogPath, articlePath, plagiarismPath, formativePath, glossaryPath];
const rb = 'docs/editorial/rollback/2026-08-24-contexto-lote-09/sources/';
const [blog, article, plagiarism, formative, glossary] = paths.map(read);
const decisions = read(decisionsPath);

for (const path of paths) {
  const text = read(path);
  check(`${path} conserva publicación activa`, /title:\s*["'].+["']/.test(text) && /draft:\s*false/.test(text));
  check(`${path} cambia respecto del rollback aprobado`, sha(path) !== sha(`${rb}${path}`));
}

check('blog elimina absolutos de necesidad e inmunidad', !/indispensable|más necesaria que antes|no se ve amenazada|validez evaluativa colapsa/i.test(blog));
check('blog retira la falsa respuesta institucional única', !/respuesta institucional adecuada/i.test(blog));
check('blog delimita los tres focos de Bearman', /Bearman/i.test(blog) && /juicio evaluativo/i.test(blog) && /producto|resultado/i.test(blog) && /proceso/i.test(blog));
check('blog evita capacidades humanas irreductibles', !/contexto local irreductible|la IA no puede sustituir|la IA no puede simular|la IA puede asistir pero no resolver|se vuelve obligatoria/i.test(blog));
check('blog presenta instrumentos como opciones situadas', /según|depende|puede combinar/i.test(blog) && /accesib|carga|riesgo|propósito/i.test(blog));
check('blog enlaza glosario y ficha revisada', /recursos\/glosario\/evaluacion-autentica/.test(blog) && /recursos\/articulos\/autenticidad-evaluacion-ajjawi-bearman/.test(blog));
check('blog conserva referencias verificables principales', /10\.1080\/02602938\.2024\.2335321/.test(blog) && /10\.1080\/02602938\.2023\.2271193/.test(blog));

check('ficha declara acceso abierto real', /articuloAccesoAbierto:\s*true/.test(article));
check('ficha conserva DOI y enlace del editor', /10\.1080\/02602938\.2023\.2271193/.test(article) && /tandfonline\.com\/doi\/full/.test(article));
check('ficha distingue publicación en línea e impresa', /19 de octubre de 2023|2023-10-19/.test(article) && /18 de mayo de 2024|2024-05-18/.test(article));
check('ficha registra volumen número y páginas', /volumen\s*49|\*\*49\*\*\(4\)|49\(4\)/i.test(article) && /499[–-]510/.test(article));
check('ficha declara licencia y repositorio estable', /CC BY-NC-ND 4\.0/i.test(article) && /opus\.lib\.uts\.edu\.au/.test(article));
check('ficha conserva las tres perspectivas', /autenticidad psicológica/i.test(article) && /fidelidad ontológica/i.test(article) && /teoría de la práctica/i.test(article));
check('ficha elimina jerarquías promocionales', !/sustento teórico fundamental|centro irreemplazable/i.test(article));
check('ficha no convierte IA en objeto principal', /IA generativa no es el objeto principal|IA aparece como/i.test(article));

check('plagio presenta postplagio como propuesta situada', /Eaton/i.test(plagiarism) && /propone|marco|plantea/i.test(plagiarism) && /responsabilidad/i.test(plagiarism));
check('plagio incorpora atribución y demostración del aprendizaje', /atribución/i.test(plagiarism) && /demostrar|explicar/i.test(plagiarism) && /aprendizaje/i.test(plagiarism));
check('plagio no atribuye a Perkins una definición inexistente', !/Perkins\s*\([^)]*\)\s*define|Perkins.*correspondencia entre/i.test(plagiarism));
check('plagio explica el alcance real de Perkins', /Perkins/i.test(plagiarism) && /declar|polític|regla/i.test(plagiarism));
check('plagio delimita exactamente el estudio de Liang', /siete detectores/i.test(plagiarism) && /91\s+ensayos TOEFL/i.test(plagiarism) && /88\s+ensayos/i.test(plagiarism) && /61[,.]3\s*%/.test(plagiarism));
check('plagio evita universalizar instrumentos', !/instrumentos obligatorios|diez minutos con cada estudiante|nota adicional|evidencia primaria de autenticidad/i.test(plagiarism));
check('plagio presenta evidencias proporcionales y opcionales', /opcion|puede|combin|proporcional/i.test(plagiarism) && /accesib/i.test(plagiarism) && /privacidad/i.test(plagiarism) && /carga/i.test(plagiarism));
check('plagio retira la primera causa atribuida a Cotton', !/primera causa de conflictos/i.test(plagiarism));
check('plagio etiqueta los casos como hipotéticos', /escenarios hipotéticos|casos hipotéticos/i.test(plagiarism));
check('plagio mantiene detectores fuera de la prueba única', /nunca.*prueba única|no.*evidencia suficiente|no.*prueba autónoma/is.test(plagiarism));

check('guía define evaluación formativa por uso de evidencia', /evidencia/i.test(formative) && /modificar|ajustar|adaptar/i.test(formative) && /enseñanza/i.test(formative) && /aprendizaje/i.test(formative));
check('guía elimina oposición formativa no califica', !/evaluación formativa no califica|la evaluación sumativa clasifica|no genera una calificación|IA retroalimenta; el docente califica|retroalimentación de la IA es formativa, no sumativa/i.test(formative));
check('guía admite funciones formativa y sumativa en una actividad', /misma actividad|misma evidencia|ambas funciones/i.test(formative) && /formativ/i.test(formative) && /sumativ/i.test(formative));
check('guía elimina promesas de escalamiento', !/sin sacrificar la calidad|sin fatiga|rol natural|no puede hacer es decidir/i.test(formative));
check('guía delimita ventajas y límites del feedback IA', /rápid|detalle/i.test(formative) && /heterog|context|límite|puede fallar/i.test(formative) && /supervisión humana|revisión humana/i.test(formative));
check('guía no usa IA como primer filtro con revisión muestral', !/primer filtro|verifica una muestra|IA aplica la rúbrica; el docente decide/i.test(formative));
check('guía condiciona rúbricas a políticas y protección de datos', /polític/i.test(formative) && /privacidad|protección de datos/i.test(formative) && /rúbrica/i.test(formative));
check('guía exige criterio acción posterior y comprobación', /criterio/i.test(formative) && /acción posterior|revisión posterior|ajuste posterior/i.test(formative) && /comprob/i.test(formative));
check('guía explicita riesgos transversales', /privacidad/i.test(formative) && /carga/i.test(formative) && /sesgo/i.test(formative) && /dependencia/i.test(formative));
check('guía no reintroduce trazabilidad o rechazo obligatorios', !/borrador inicial \(sin IA\)|log de la conversación|mayor valor formativo|obligatorio[^.]*justificar[^.]*rechaz/i.test(formative));
check('guía conserva tablas Markdown válidas', !/^\|\|/m.test(formative));
check('guía evita oponer procesos y productos en el encabezado', /## La premisa: evaluar procesos, no solo productos/i.test(formative));
check('guía representa aceptar modificar y descartar', /\|Modificó\|/.test(formative) && /aceptó, modificó o descartó|qué hizo con la sugerencia/i.test(formative));
check('guía distingue insuficiencia de irrelevancia', /Lo que no basta por sí solo/i.test(formative) && !/Lo que no importa/i.test(formative));
check('guía no fuerza una sugerencia descartada en la defensa', !/qué sugerencia\s+descartó/i.test(formative));
check('guía conserva identificador de ecosistema', /id:\s*assessment\.basada-en-procesos/.test(formative) && /destino:\s*practice\.portafolio-proceso/.test(formative));
check('ledger cita el GREEN focal vigente', !/GREEN 50\/50/.test(decisions) && /GREEN final: 57\/57/.test(decisions));

const glossaryWords = body(glossary).replace(/\[[^\]]+\]\([^)]*\)/g, ' ').split(/\s+/).filter(Boolean).length;
check('glosario sigue siendo breve', glossaryWords >= 70 && glossaryWords <= 220);
check('glosario define los seis valores ICAI', /honestidad/i.test(glossary) && /confianza/i.test(glossary) && /justicia/i.test(glossary) && /respeto/i.test(glossary) && /responsabilidad/i.test(glossary) && /valentía/i.test(glossary));
check('glosario retira caricatura y requisito universal', !/centrados casi exclusivamente|exige ir más allá|requiere el rediseño/i.test(glossary));
check('glosario incorpora reglas declaración atribución y equidad', /regla|acuerdo/i.test(glossary) && /declar/i.test(glossary) && /atribuci/i.test(glossary) && /equidad/i.test(glossary));
check('glosario mantiene continuidad corta y extensa', /recursos\/glosario\/evaluacion-autentica/.test(glossary) && /ia-educacion\/etica-y-transparencia\/plagio-autenticidad-era-ia/.test(glossary));

if (failures.length) {
  console.error(`FAIL ${failures.length}/${checks}`);
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`PASS ${checks}/${checks}`);
