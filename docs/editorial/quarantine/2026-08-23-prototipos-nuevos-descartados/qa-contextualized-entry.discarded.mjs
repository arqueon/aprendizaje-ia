import fs from 'node:fs';

const home = fs.readFileSync('content/_index.md', 'utf8');
const prototypeFiles = [
  'sketches/003-ejercicio-alineacion/index.html',
  'sketches/003-ejercicio-alineacion/una-decision/index.html',
  'sketches/003-ejercicio-alineacion/antes-despues/index.html',
  'sketches/003-ejercicio-alineacion/semaforo/index.html',
];
const failures = [];

const homeRequirements = [
  '## Elige la situación que se parece a la tuya',
  'Preparas una actividad para la próxima clase',
  'Vas a usar IA para estudiar una pregunta o escribir un texto',
  'El equipo docente debe acordar una regla antes del próximo curso',
];
for (const text of homeRequirements) {
  if (!home.includes(text)) failures.push(`portada sin situación: ${text}`);
}

const cardFigures = [
  'static/images/cards/contexto-proxima-clase.svg',
  'static/images/cards/contexto-estudiar-comprobar.svg',
  'static/images/cards/contexto-acuerdo-equipo.svg',
];
for (const relative of cardFigures) {
  if (!home.includes(relative.replace('static/', ''))) failures.push(`portada sin figura: ${relative}`);
  const source = fs.readFileSync(relative, 'utf8');
  for (const marker of ['<title', '<desc', '<metadata>', 'CC BY-SA 4.0']) {
    if (!source.includes(marker)) failures.push(`${relative}: falta ${marker}`);
  }
  if (/\b(?:href|src)=["']https?:/i.test(source)) failures.push(`${relative}: recurso externo`);
}

const sharedCase = 'Lee dos resúmenes y elige cuál fuente es mejor. Puedes usar IA para ayudarte.';
const sharedContext = 'Una docente de primer semestre prepara una actividad para la próxima clase.';
for (const relative of prototypeFiles) {
  const source = fs.readFileSync(relative, 'utf8');
  if (!source.includes(sharedCase)) failures.push(`${relative}: falta la misma instrucción inicial`);
  if (!source.includes(sharedContext)) failures.push(`${relative}: falta quién y cuándo`);
  if (!source.includes('Al terminar')) failures.push(`${relative}: falta decir qué queda al terminar`);
}

const comparator = fs.readFileSync(prototypeFiles[0], 'utf8');
for (const text of ['Tres formas de revisar la misma actividad', 'Usa la misma instrucción en las tres opciones', 'elige cuál te ayuda mejor a escribir un cambio que puedas usar']) {
  if (!comparator.includes(text)) failures.push(`comparador sin explicación: ${text}`);
}

if (failures.length) {
  console.error(`FAIL contextualized-entry: ${failures.join('; ')}`);
  process.exit(1);
}
console.log('PASS contextualized-entry: portada y tres prototipos parten de situaciones reconocibles y resultados explícitos.');
