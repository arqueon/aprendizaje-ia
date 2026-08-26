import fs from 'node:fs';
import crypto from 'node:crypto';

const root = process.cwd();
const read = (p) => fs.readFileSync(`${root}/${p}`, 'utf8');
const exists = (p) => fs.existsSync(`${root}/${p}`);
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(`${root}/${p}`)).digest('hex');
const failures = [];
let checks = 0;
const check = (name, condition) => {
  checks += 1;
  if (!condition) failures.push(name);
};

const zhanPath = 'content/recursos/articulos/genai-feedback-engagement-2025/index.md';
const unamPath = 'content/recursos/articulos/guias-iagen-evaluacion-unam/index.md';
const decPath = 'content/recursos/articulos/next-era-assessment-dec/index.md';
const toolsPath = 'content/observatorio/guias/evaluacion-herramientas-ia-educativas/index.md';
const decisionsPath = 'data/editorial/context-audit-decisions.json';
const paths = [zhanPath, unamPath, decPath, toolsPath];
const rb = 'docs/editorial/rollback/2026-08-24-contexto-lote-10/sources/';
const manifest = JSON.parse(read('docs/editorial/lotes/2026-08-24-contexto-lote-10-investigation-manifest.json'));
const decisions = JSON.parse(read(decisionsPath)).decisions;
const [zhan, unam, dec, tools] = paths.map(read);

for (const path of paths) {
  const text = read(path);
  check(`${path} sigue activo y conserva título`, /^---[\s\S]*?^title:\s*["'].+["']/mu.test(text) && /draft:\s*false/.test(text));
  check(`${path} cambia respecto del rollback aprobado`, sha(path) !== sha(`${rb}${path}`));
}

for (const item of manifest.items) {
  for (const file of item.bundle_files) {
    if (file.path === item.source) continue;
    check(`${file.path} se conserva byte a byte`, exists(file.path) && sha(file.path) === file.sha256 && fs.statSync(`${root}/${file.path}`).size === file.bytes);
  }
}

check('Zhan corrige autoría en metadatos o cita', /Ying Zhan.*David Boud.*Phillip Dawson.*Zi Yan/is.test(zhan));
check('Zhan elimina autores incorrectos', !/Tsai|Langendyk|Chen|Yanagisawa/i.test(zhan));
check('Zhan conserva título DOI volumen número y páginas', /Generative artificial intelligence as an enabler of student feedback engagement/i.test(zhan) && /10\.1080\/07294360\.2025\.2476513/.test(zhan) && /44\s*\(5\)|44:5/.test(zhan) && /1289[–-]1304/.test(zhan));
check('Zhan declara artículo conceptual', /artículo conceptual|trabajo conceptual|marco conceptual/i.test(zhan));
check('Zhan declara marco tentativo y provisional', /tentativ/i.test(zhan) && /provisional/i.test(zhan));
check('Zhan distingue seis posibilidades de dimensiones validadas', /seis (posibilidades|affordances)/i.test(zhan) && !/seis dimensiones del marco/i.test(zhan));
check('Zhan distingue etapas de interacción con feedback', /eliciting|obtener retroalimentación/i.test(zhan) && /processing|procesar/i.test(zhan) && /enacting|actuar/i.test(zhan));
check('Zhan distingue ciclo de autorregulación', /forethought|anticipación/i.test(zhan) && /control/i.test(zhan) && /retrospect|retrospectiva/i.test(zhan));
check('Zhan atribuye positivamente etapas y autorregulación', /Malecka, Boud y Carless/i.test(zhan) && /Zimmerman/i.test(zhan) && !/ciclo de retroalimentación formativa documentado por Carless/i.test(zhan));
check('Zhan retira superlativo', !/marco operativo más sólido publicado hasta la fecha/i.test(zhan));
check('Zhan añade copia abierta y licencia', /opus\.lib\.uts\.edu\.au/i.test(zhan) && /CC BY-NC-ND 4\.0/i.test(zhan));
check('Zhan explicita límites y ausencia de prueba propia', /no (es|presenta|incluye) una prueba|no prueba|sin prueba empírica propia|no evalúa eficacia/i.test(zhan) && /context/i.test(zhan));

check('UNAM conserva tres PDF oficiales', /GUIA_USO_IAGEN_EVALUACION_BACHILLERATO_UNAM\.pdf/.test(unam) && /GUIA_USO_IAGEN_EVALUACION_LICENCIATURA_UNAM\.pdf/.test(unam) && /GUIA_USO_IAGEN_EVALUACION_POSGRADO_UNAM\.pdf/.test(unam));
check('UNAM usa páginas físicas verificadas', /32\s*(páginas|pp\.)/i.test(unam) && /57\s*(páginas|pp\.)/i.test(unam) && /31\s*(páginas|pp\.)/i.test(unam));
check('UNAM conserva licencia', /CC BY-NC-SA 4\.0/i.test(unam));
check('UNAM retira primacía mexicana', !/primer cuerpo institucional mexicano|por primera vez.*México/i.test(unam));
check('UNAM no homogeniza marcos', /Bachillerato[\s\S]{0,1200}ARCHED/i.test(unam) && /Bachillerato[\s\S]{0,1400}GAIA-GEN/i.test(unam) && /Licenciatura[\s\S]{0,1400}UNESCO\s*\(2025\)/i.test(unam) && /Posgrado[\s\S]{0,1800}(sin uso de IA|sin IA)[\s\S]{0,700}(IA asistida|asistencia de la IA)[\s\S]{0,700}IA integrada/i.test(unam));
check('UNAM presenta GAIA-GEN como autor de recomendación citada', /GAIA-GEN[\s\S]{0,240}(autor|elaboró)[\s\S]{0,120}recomendación citada/i.test(unam) && !/GAIA-GEN[\s\S]{0,160}participó en el trabajo/i.test(unam) && !/marco GAIA-GEN/i.test(unam));
check('UNAM retira diálogo inventado con Bearman', !/dialogan, sin citarlo, con Bearman|sin citarlo.*Bearman/i.test(unam));
check('UNAM retira frase más repetida', !/frase más repetida/i.test(unam));
check('UNAM retira 14 metodologías necesarias', !/14 metodologías necesarias/i.test(unam));
check('UNAM describe DEC de forma atribuida no normativa', /DEC|Digital Education Council/.test(unam) && /describe|documenta|presenta|recopila/i.test(unam));
check('UNAM usa URLs oficiales estables', /cee\.unam\.mx\/wp-content\/uploads\/2026\/04\/GUIA_USO_IAGEN_EVALUACION_BACHILLERATO_UNAM\.pdf/i.test(unam) && /cee\.unam\.mx\/wp-content\/uploads\/2026\/04\/GUIA_USO_IAGEN_EVALUACION_POSGRADO_UNAM\.pdf/i.test(unam));
check('UNAM conserva anclas e iframes', /\{#guia-bachillerato\}/i.test(unam) && /\{#guia-licenciatura\}/i.test(unam) && /\{#guia-posgrado\}/i.test(unam) && (unam.match(/<iframe/gi) || []).length === 3);
check('UNAM distingue orientación de norma', /orientador|orientativa/i.test(unam) && /no sustituye|no es una norma/i.test(unam));

check('DEC usa URL viva', /digitaleducationcouncil\.com\/resource-library-items\/the-next-era-of-assessment-a-global-review-of-ai-in-assessment-design/i.test(dec));
check('DEC elimina URL 404', !/digitaleducationcouncil\.com\/research\/the-next-era-of-assessment/.test(dec));
check('DEC conserva año autores y tipo de documento', /articuloAnio:\s*["']2025["']/.test(dec) && /Digital Education Council & Pearson/.test(dec) && /tipoDocumento:\s*["']Reporte["']/.test(dec));
check('DEC usa 101 casos', /101\s+(casos|case studies)/i.test(dec) && !/más de 100 casos/i.test(dec));
check('DEC usa 14 metodologías atribuidas', /14\s+metodolog/i.test(dec) && /DEC|Digital Education Council/.test(dec));
check('DEC retira tácticas probadas', !/tácticas probadas|estrategias probadas|metodologías comprobadas|eficacia demostrada/i.test(dec));
check('DEC atribuye primer mapeo al editor', !/(es|constituye) el primer mapeo integral/i.test(dec) || /DEC.*(describe|presenta|denomina).*primer mapeo integral/is.test(dec));
check('DEC distingue informe institucional de revisión académica', /informe institucional/i.test(dec) && /no (es|constituye) una revisión académica|no evalúa causalmente|no demuestra eficacia/i.test(dec));
check('DEC acota AI-resistant', /AI-resistant/i.test(dec) && /principio|prioridad/i.test(dec) && /no garantiza|no vuelve|no significa.*invulnerable/i.test(dec));
check('DEC conserva conexiones internas', /evaluacion-formativa-ia|crisis-revision-pares-ia|guias-iagen-evaluacion-unam|partnerships-pedagogicos-ia-wang-zhang/.test(read('docs/editorial/lotes/2026-08-24-contexto-lote-10-link-map.json')));

check('guía conserva declaración de adaptación', /adapta y simplifica|adaptación/i.test(tools) && /eCampus\s*Ontario/i.test(tools) && /ASCCC/i.test(tools));
check('guía no atribuye cuatro pasos a ambos marcos', !/práctica recomendada por los marcos internacionales[\s\S]{0,160}cuatro pasos/i.test(tools));
check('guía elimina comité mínimo obligatorio', !/Mínimo cuatro perfiles|comité mínimo de cuatro/i.test(tools));
check('guía elimina comparación obligatoria de dos opciones', !/se comparan al menos dos opciones|comparación obligatoria/i.test(tools));
check('guía elimina reportes genéricos de comités', !/Reportes de comités universitarios|errores.*reportados por comités/i.test(tools));
check('guía preserva decisión no aditiva', /decisión final no es la suma de las calificaciones/i.test(tools));
check('guía distingue evaluación de autorización', /decisión preliminar|preselección|prueba controlada|piloto/i.test(tools) && /autorización institucional|instancia competente|gobernanza/i.test(tools));
check('guía cubre resultados y supervisión humana', /resultado[s]? de aprendizaje/i.test(tools) && /supervisión humana|revisión humana/i.test(tools));
check('guía cubre accesibilidad privacidad contrato y retención', /accesibilidad/i.test(tools) && /privacidad/i.test(tools) && /contrat/i.test(tools) && /retención/i.test(tools));
check('guía cubre grupos afectados y sostenibilidad', /grupos afectados|personas afectadas/i.test(tools) && /sostenibilidad/i.test(tools));
check('guía conserva consulta local eCampus', /centro|unidad/i.test(tools) && /tecnolog|TI/i.test(tools) && /consulta|consultar/i.test(tools));
check('guía mapea ASCCC y eCampus sin EDUCAUSE o UNESCO sueltos', /ASCCC/.test(tools) && /eCampus/.test(tools) && !/EDUCAUSE|UNESCO/.test(tools));

for (const path of paths) {
  const d = decisions[path];
  check(`${path} queda en cambiar`, d?.decision === 'cambiar');
  check(`${path} registra VoBo y no publicación`, d?.review_source === 'vobo-humano-2026-08-24' && d?.draft_lot === '2026-08-24-contexto-lote-10' && d?.publication_status === 'sin-publicar' && d?.approved_by === 'Rubén');
}

if (failures.length) {
  console.error(`FAIL ${failures.length}/${checks}`);
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`PASS ${checks}/${checks}`);
