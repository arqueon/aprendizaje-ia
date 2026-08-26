import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const failures = [];
let checks = 0;
const expect = (condition, message) => {
  checks += 1;
  if (!condition) failures.push(message);
};
const exists = (rel) => fs.existsSync(path.join(root, rel));
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() ? walk(full) : [full];
});

const oldActive = [
  'content/recursos/externas/_index.md',
  'content/recursos/externas/featured.png',
  'content/recursos/externas/comunidades-practica-docente-ia/index.md',
  'content/recursos/externas/comunidades-practica-docente-ia/featured.webp',
  'content/recursos/externas/syllabus-internacionales-ia/index.md',
  'content/recursos/externas/syllabus-internacionales-ia/featured.webp',
  'content/recursos/links/ai-for-education-toolkit.md',
];
for (const rel of oldActive) expect(!exists(rel), `sigue activo el archivo anterior: ${rel}`);

const required = [
  'content/recursos/links/_index.md',
  'content/recursos/links/featured.webp',
  'content/recursos/links/comunidades-practica-docente-ia/index.md',
  'content/recursos/links/comunidades-practica-docente-ia/featured.webp',
  'content/recursos/links/syllabus-internacionales-ia/index.md',
  'content/recursos/links/syllabus-internacionales-ia/featured.webp',
  'content/recursos/links/ai-for-education-toolkit/index.md',
  'content/recursos/links/ai-for-education-toolkit/featured.webp',
  'content/recursos/links/ocde-ia-educacion/index.md',
  'content/recursos/links/ocde-ia-educacion/featured.webp',
  'content/recursos/links/unesco-marco-competencias-docentes-ia/index.md',
  'content/recursos/links/unesco-marco-competencias-docentes-ia/featured.webp',
];
for (const rel of required) expect(exists(rel), `falta archivo canónico: ${rel}`);

if (exists('content/recursos/links/_index.md')) {
  const s = read('content/recursos/links/_index.md');
  expect(/title:\s*["']Recursos externos seleccionados["']/.test(s), 'el hub canónico conserva un título ambiguo');
  expect(s.includes('aliases: ["/recursos/externas/"]'), 'el hub no preserva /recursos/externas/');
  expect(s.includes('fichas individuales') && s.includes('curadurías temáticas'), 'el hub no distingue sus dos tipos de página');
  expect(s.includes('marco de competencias de IA para docentes de UNESCO'), 'el hub no identifica cuál de las dos fichas UNESCO recomienda');
  expect(s.includes('privacidad') && s.includes('datos personales'), 'el hub perdió la comprobación de privacidad y datos');
}
if (exists('content/recursos/links/comunidades-practica-docente-ia/index.md')) {
  const s = read('content/recursos/links/comunidades-practica-docente-ia/index.md');
  expect(s.includes('aliases: ["/recursos/externas/comunidades-practica-docente-ia/"]'), 'comunidades no preserva su URL anterior');
  expect(!s.includes('seis comunidades activas'), 'comunidades sigue llamando comunidades a seis destinos heterogéneos');
  expect(s.includes('no todos permiten incorporarse a una comunidad'), 'comunidades no declara el límite de participación');
  expect(!s.includes('Wenger, E.') && !s.includes('ANUIES. (2024)'), 'comunidades conserva referencias que ya no se citan en el cuerpo');
}
if (exists('content/recursos/links/syllabus-internacionales-ia/index.md')) {
  const s = read('content/recursos/links/syllabus-internacionales-ia/index.md');
  expect(s.includes('aliases: ["/recursos/externas/syllabus-internacionales-ia/"]'), 'syllabus no preserva su URL anterior');
  expect(/title:\s*["']Políticas de IA para el syllabus: ejemplos internacionales["']/.test(s), 'syllabus conserva un título que promete syllabus completos');
  expect(!s.includes('cinco fuentes con syllabus reales'), 'syllabus sigue prometiendo cinco syllabus reales');
  expect(!s.includes('generan más conflictos') && !s.includes('sin fricción notable'), 'syllabus conserva efectos causales sin fuente');
  expect(s.includes('propuesta editorial') && s.includes('no es una política oficial'), 'syllabus presenta la propuesta local como política oficial');
}
if (exists('content/recursos/links/ai-for-education-toolkit/index.md')) {
  const s = read('content/recursos/links/ai-for-education-toolkit/index.md');
  expect(/title:\s*["']Inteligencia artificial en la educación — UNESCO["']/.test(s), 'la ficha UNESCO sigue llamando toolkit a un portal');
  expect(s.includes('tipoRecurso: "Portal temático institucional"'), 'la ficha UNESCO no identifica el tipo real de recurso');
  expect(s.includes('portal temático') && !s.includes('kit de herramientas'), 'la ficha UNESCO sigue prometiendo un toolkit específico');
}
if (exists('content/recursos/links/ocde-ia-educacion/index.md')) {
  const s = read('content/recursos/links/ocde-ia-educacion/index.md');
  expect(!s.includes('41 %') && s.includes('37 %') && s.includes('secundaria baja'), 'la ficha OCDE no reproduce con precisión el dato TALIS 2024');
  expect(s.includes('type="info"') && !s.includes('cardColor=') && s.includes('Por qué se comparte'), 'la ficha OCDE conserva voz o alerta inconsistente');
}
if (exists('content/recursos/links/unesco-marco-competencias-docentes-ia/index.md')) {
  const s = read('content/recursos/links/unesco-marco-competencias-docentes-ia/index.md');
  expect(!s.includes('primera referencia global') && s.includes('una referencia global'), 'la ficha UNESCO sobredimensiona la precedencia del marco');
  expect(s.includes('type="info"') && !s.includes('cardColor=') && s.includes('Por qué se comparte'), 'la ficha del marco UNESCO conserva voz o alerta inconsistente');
}

const markdown = walk(path.join(root, 'content')).filter((file) => file.endsWith('.md'));
expect(markdown.length === 167, `el inventario activo no quedó en 167 fuentes: ${markdown.length}`);
const staleLinks = markdown.flatMap((file) => {
  const matches = read(path.relative(root, file)).match(/\]\(\/recursos\/externas(?:\/[^)]*)?\)/g) || [];
  return matches.map((match) => `${path.relative(root, file)}: ${match}`);
});
expect(staleLinks.length === 0, `quedan enlaces internos hacia externas: ${staleLinks.join('; ')}`);

const decisions = JSON.parse(read('data/editorial/context-audit-decisions.json')).decisions;
expect(decisions['content/recursos/externas/_index.md']?.draft_status === 'retirado-en-borrador-con-alias', 'el ledger no conserva la decisión histórica del hub retirado');
for (const rel of [
  'content/recursos/links/_index.md',
  'content/recursos/links/comunidades-practica-docente-ia/index.md',
  'content/recursos/links/syllabus-internacionales-ia/index.md',
  'content/recursos/links/ai-for-education-toolkit/index.md',
  'content/recursos/links/ocde-ia-educacion/index.md',
  'content/recursos/links/unesco-marco-competencias-docentes-ia/index.md',
]) expect(Boolean(decisions[rel]), `falta decisión humana para ${rel}`);

const visual = JSON.parse(read('data/editorial/visual-contract.json'));
expect(!visual.missingFeatured.includes('recursos/links/ai-for-education-toolkit.md') && !visual.missingFeatured.includes('recursos/links/ai-for-education-toolkit/index.md'), 'la ficha UNESCO sigue en la deuda de featured');

const coursePath = '/home/hermes/Nextcloud/Projects/ia/alfabetizacion_en_ia/docs/auditoria-hugo-curso-inventario.json';
const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
expect(course.pages.length === 167, `la clasificación externa no quedó en 167: ${course.pages.length}`);
const coursePaths = new Set(course.pages.map((page) => page.path));
for (const rel of ['recursos/links/comunidades-practica-docente-ia/index.md','recursos/links/syllabus-internacionales-ia/index.md','recursos/links/ai-for-education-toolkit/index.md']) {
  expect(coursePaths.has(rel), `la clasificación no contiene ${rel}`);
}
for (const rel of ['recursos/externas/_index.md','recursos/externas/comunidades-practica-docente-ia/index.md','recursos/externas/syllabus-internacionales-ia/index.md','recursos/links/ai-for-education-toolkit.md']) {
  expect(!coursePaths.has(rel), `la clasificación conserva la ruta anterior ${rel}`);
}

const siteIndex = read('indice-sitio.md');
expect(!siteIndex.includes('### 4.4 Recursos externos — `recursos/externas/`'), 'el índice conserva la rama paralela');
expect(siteIndex.includes('Recursos externos seleccionados') && siteIndex.includes('recursos/links/comunidades-practica-docente-ia/'), 'el índice no refleja el hub consolidado');

const manifestPath = path.join(root, 'docs/editorial/rollback/2026-08-24-contexto-lote-04/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const alteredHidden = manifest.hidden_nextcloud_recovery_files_preserved_in_place.filter((entry) => {
  const file = path.join(root, entry.path);
  return !fs.existsSync(file) || sha256(file) !== entry.sha256;
});
expect(alteredHidden.length === 0, `se alteraron copias ocultas de Nextcloud: ${alteredHidden.map((x) => x.path).join(', ')}`);

console.log(JSON.stringify({ checks, failures: failures.length, messages: failures }, null, 2));
process.exit(failures.length ? 1 : 0);
