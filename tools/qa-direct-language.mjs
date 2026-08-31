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

if (failures.length) {
  console.error(`FAIL direct-language: ${failures.join('; ')}`);
  process.exit(1);
}

console.log(`PASS direct-language: ${targets.length + scopedTargets.length} piezas y bloques usan instrucciones concretas.`);
