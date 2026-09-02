import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const targets = [
  'content/_index.md',
  'content/ia-educacion/guias/profesorado/index.md',
  'assets/figures/rutina-direccion-epistemica.svg',
  'assets/figures/rutina-direccion-epistemica-mobile.svg',
];
const scopedTargets = [{
  relative: 'content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md',
  // Ola 2 (2026-08-30): el bloque gobernado pasó a la rutina de seis pasos.
  start: '## Seis pasos para probar una ayuda',
  end: '## La misma ayuda cambia según el contexto',
}];
const abstractTerms = /\b(consignas?|huellas?|insumos?|artefactos?|productos?|evidencias?|criterios?|propósitos?|alineación|staging)\b/giu;
const failures = [];

function findTerms(source) {
  return [...new Set([...source.matchAll(abstractTerms)].map((match) => match[0].toLowerCase()))];
}

function visibleMarkdown(source) {
  return source
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/\{\{[<%][\s\S]*?[>%]\}\}/g, ' ');
}

for (const relative of targets) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  const terms = findTerms(relative.endsWith('.md') ? visibleMarkdown(source) : source);
  if (terms.length) failures.push(`${relative}: ${terms.join(', ')}`);
}

for (const target of scopedTargets) {
  const source = fs.readFileSync(path.join(root, target.relative), 'utf8');
  const start = source.indexOf(target.start);
  const end = source.indexOf(target.end, start + target.start.length);
  if (start < 0 || end < 0) {
    failures.push(`${target.relative}: no se encontró el bloque gobernado`);
    continue;
  }
  const terms = findTerms(visibleMarkdown(source.slice(start, end)));
  if (terms.length) failures.push(`${target.relative} [cinco movimientos]: ${terms.join(', ')}`);
}

// Contrato de instrucción (2026-09-02): páginas gobernadas por docs/editorial/contrato-instruccion.md.
// La lista crece por lotes; el lote 0 son las cuatro páginas modelo.
// `node tools/qa-direct-language.mjs --file ruta1 [ruta2 …]` comprueba sólo esas rutas contra el
// contrato (útil mientras se reescribe un lote, antes de darlo de alta en el JSON).
const cliFiles = process.argv.includes('--file') ? process.argv.slice(process.argv.indexOf('--file') + 1) : null;
const contractPages = cliFiles || JSON.parse(fs.readFileSync(path.join(root, 'data', 'editorial', 'contrato-instruccion.json'), 'utf8')).paginas;
const forbiddenNegations = /\b(el problema no es|no se trata de|no es (?:solo |sólo )?[^.]{3,40}? ni )/giu;
// El texto de respaldo de las figuras UDGIA ({{< udgia-figure >}}…{{< /udgia-figure >}}) es canónico
// (procede de Orientaciones y lo vigila qa:udgia-figures), así que no se somete a esta regla.
const bodyWithoutContract = (source) => source.replace(/\{\{< udgia-figure[\s\S]*?\{\{< \/udgia-figure >\}\}/g, ' ').replace(/\{\{< contrato[\s\S]*?>\}\}/g, ' ').replace(/partial "udgia\/contrato\.html" \(dict[\s\S]*?\) \}\}/g, ' ');

for (const relative of contractPages) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8');
  // En Markdown el contrato es el shortcode {{< contrato … >}}; en los templates de actividad es
  // el partial udgia/contrato.html con un dict ("clave" `valor`), porque un template no puede
  // invocar shortcodes.
  const match = source.match(/\{\{< contrato([\s\S]*?)>\}\}/)
    || source.match(/partial "udgia\/contrato\.html" \(dict([\s\S]*?)\) \}\}/);
  if (!match) { failures.push(`${relative}: falta el contrato de instrucción`); continue; }
  const params = {};
  for (const m of match[1].matchAll(/(\w+)="([^"]*)"|"(\w+)" `([^`]*)`/g)) params[m[1] || m[3]] = m[2] ?? m[4];
  for (const key of ['quien', 'haras', 'tendras', 'tarda']) {
    if (!params[key] || params[key].length < 20) failures.push(`${relative}: contrato sin ${key} (o demasiado corto)`);
  }
  const tendras = params.tendras || '';
  if (!/[(«"]/.test(tendras)) failures.push(`${relative}: «qué tendrás» sin ejemplo entre paréntesis o comillas`);
  if (relative.endsWith('.md')) {
    const firstH2 = source.indexOf('\n## ');
    if (firstH2 >= 0 && source.indexOf('{{< contrato') > firstH2) failures.push(`${relative}: el contrato debe ir antes del primer encabezado`);
  }
  const body = relative.endsWith('.md') ? visibleMarkdown(bodyWithoutContract(source)) : bodyWithoutContract(source).replace(/<[^>]+>/g, ' ');
  const negations = [...body.matchAll(forbiddenNegations)].map((m) => m[0]);
  if (negations.length) failures.push(`${relative}: negación prohibida (${negations.join(' | ')})`);
  // Los encabezados son etiquetas, no prosa: no se les exige ejemplo (sí se les aplica la
  // prohibición de negaciones). Los nombres de las seis decisiones ejecutivas (UDGIA-004D)
  // son canónicos y los vigila qa:decision-institucional-route.
  const prose = body.replace(/^#{1,6} .*$/gm, ' ');
  const abstract = findTerms(prose).filter((term) => {
    // Un término de marco pasa si en la misma oración hay un ejemplo (paréntesis, comillas o «por ejemplo»).
    const sentences = prose.split(/(?<=[.!?])\s+/).filter((sentence) => new RegExp(`\\b${term}\\b`, 'iu').test(sentence));
    // Un paréntesis sólo cuenta como ejemplo si no es una cita bibliográfica «(Autor, 2024)».
    const hasExample = (sentence) => /[«"]|por ejemplo/u.test(sentence)
      || /\((?![^)]*\b(?:19|20)\d{2}[a-z]?\))[^)]{4,}\)/u.test(sentence);
    return sentences.some((sentence) => !hasExample(sentence));
  });
  if (abstract.length) failures.push(`${relative}: término de marco sin ejemplo en su oración (${abstract.join(', ')})`);
}

if (failures.length) {
  console.error(`FAIL direct-language: ${failures.join('; ')}`);
  process.exit(1);
}

console.log(`PASS direct-language: ${targets.length + scopedTargets.length} piezas y bloques usan instrucciones concretas; ${contractPages.length} páginas cumplen el contrato de instrucción.`);
