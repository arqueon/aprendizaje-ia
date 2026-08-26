import fs from 'node:fs';

const home = fs.readFileSync('content/_index.md', 'utf8');
const config = fs.readFileSync('hugo.toml', 'utf8');
const failures = [];

const required = [
  'Este sitio ayuda a docentes, estudiantes y equipos de la Universidad de Guadalajara',
  '## Elige la situación que se parece a la tuya',
  'Preparas una actividad para la próxima clase',
  'Vas a usar IA para estudiar una pregunta o escribir un texto',
  'El equipo docente debe acordar una regla antes del próximo curso',
  '## Explora el sitio',
];
for (const text of required) {
  if (!home.includes(text)) failures.push(`falta: ${text}`);
}

const startIndex = home.indexOf('## Elige la situación que se parece a la tuya');
const exploreIndex = home.indexOf('## Explora el sitio');
if (startIndex < 0 || exploreIndex < 0 || startIndex > exploreIndex) {
  failures.push('las entradas concretas deben aparecer antes que las categorías');
}

const cardFigures = [
  'static/images/cards/contexto-proxima-clase.svg',
  'static/images/cards/contexto-estudiar-comprobar.svg',
  'static/images/cards/contexto-acuerdo-equipo.svg',
];
for (const relative of cardFigures) {
  if (!home.includes(relative.replace('static/', ''))) failures.push(`falta la figura de contexto: ${relative}`);
  const source = fs.readFileSync(relative, 'utf8');
  for (const marker of ['<title', '<desc', '<metadata>', 'CC BY-SA 4.0']) {
    if (!source.includes(marker)) failures.push(`${relative}: falta ${marker}`);
  }
  if (/\b(?:href|src)=["']https?:/i.test(source)) failures.push(`${relative}: recurso externo`);
}

if (/Ecosistema de aprendizaje|\{\{<\s*mermaid\s*>\}\}/i.test(home)) {
  failures.push('la portada todavía contiene el diagrama interno');
}
if (!/\[params\.homepage\][\s\S]*?showRecent\s*=\s*false/.test(config)) {
  failures.push('la portada todavía muestra la lista automática Reciente');
}

const visible = home
  .replace(/^---\n[\s\S]*?\n---\n/, '')
  .replace(/\]\([^)]*\)/g, ']')
  .replace(/\{\{[<%]\s*\/?(?:lead|cards|mermaid)\s*[>%]\}\}/g, ' ');
const abstractTerms = [...new Set([...visible.matchAll(/\b(consignas?|huellas?|insumos?|artefactos?|productos?|evidencias?|criterios?|propósitos?|alineación|staging)\b/giu)].map((match) => match[0].toLowerCase()))];
if (abstractTerms.length) failures.push(`términos abstractos visibles: ${abstractTerms.join(', ')}`);

if (failures.length) {
  console.error(`FAIL home-clarity: ${failures.join('; ')}`);
  process.exit(1);
}
console.log('PASS home-clarity: explicación directa, tres entradas, categorías después y sin bloques distractores.');
