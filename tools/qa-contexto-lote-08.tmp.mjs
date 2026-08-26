import fs from 'node:fs';
import crypto from 'node:crypto';

const root = process.cwd();
const read = (p) => fs.readFileSync(`${root}/${p}`, 'utf8');
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(`${root}/${p}`)).digest('hex');
const failures = [];
let checks = 0;
const check = (name, condition) => {
  checks += 1;
  if (!condition) failures.push(name);
};

const activePath = 'content/recursos/glosario/aprendizaje-activo/index.md';
const backwardPath = 'content/recursos/glosario/diseno-inverso/index.md';
const bloomPath = 'content/recursos/glosario/taxonomia-de-bloom/index.md';
const samrPath = 'content/recursos/glosario/modelo-samr/index.md';
const authenticPath = 'content/recursos/glosario/evaluacion-autentica/index.md';
const rb = 'docs/editorial/rollback/2026-08-24-contexto-lote-08/sources/';

const active = read(activePath);
const backward = read(backwardPath);
const authentic = read(authenticPath);

check('aprendizaje activo conserva ruta publicada', /title:\s*["']Aprendizaje activo["']/.test(active) && /draft:\s*false/.test(active));
check('aprendizaje activo evita promesas y déficit no sustentados', !/antídoto|déficit cognitivo|garantiza/i.test(active));
check('aprendizaje activo no restringe la IA a un único papel', !/IA funcione únicamente/i.test(active));
check('aprendizaje activo distingue actividad visible de elaboración cognitiva', /actividad visible|hacer clic|interfaz/i.test(active) && /cognitiv|explic|compar|decid|argument/i.test(active));
check('aprendizaje activo enlaza la explicación canónica', /relref\s+["']formacion-docente\/aprendizaje-activo["']/.test(active));
check('aprendizaje activo cita ICAP con DOI verificable', /Chi.*Wylie/i.test(active) && /10\.1080\/00461520\.2014\.965823/.test(active));

check('diseño inverso conserva ruta publicada', /title:\s*["']Diseño inverso["']/.test(backward) && /draft:\s*false/.test(backward));
check('diseño inverso evita la promesa promocional sobre IA', !/particularmente valioso|competencias cognitivas profundas/i.test(backward));
check('diseño inverso atribuye el marco', /Wiggins.*McTighe|McTighe.*Wiggins/i.test(backward));
check('diseño inverso mantiene resultados evidencia y experiencias', /resultados deseados/i.test(backward) && /evidencia/i.test(backward) && /experiencias de aprendizaje/i.test(backward));
check('diseño inverso enlaza la guía canónica', /relref\s+["']formacion-docente\/taxonomia-bloom-diseno-inverso["']/.test(backward));
check('diseño inverso incorpora referencia verificable', /Understanding by Design/i.test(backward) && /2005/.test(backward));

check('evaluación auténtica conserva ruta publicada', /title:\s*["']Evaluación auténtica["']/.test(authentic) && /draft:\s*false/.test(authentic));
check('evaluación auténtica elimina absolutos no sustentados', !/pierde validez|sin esfuerzo|intrínsecamente irreemplazable/i.test(authentic));
check('evaluación auténtica se presenta como principios situados', /principios/i.test(authentic) && /context/i.test(authentic));
check('evaluación auténtica explicita límites o compensaciones', /límit|compens|no garantiza|no asegura/i.test(authentic));
check('evaluación auténtica centra evidencia observable', /evidencia/i.test(authentic) && /aplic|juicio|justific/i.test(authentic));
check('evaluación auténtica enlaza una explicación extensa ya revisada', /relref\s+["']formacion-docente\/evaluacion-retroalimentacion["']/.test(authentic));
check('evaluación auténtica usa el título real de la continuación', /\[Evaluación y retroalimentación en el aprendizaje activo\]/.test(authentic));
check('evaluación auténtica no envía al blog todavía no revisado', !/relref\s+["']blog\/ia-generativa-evaluacion-autentica["']/.test(authentic));
check('evaluación auténtica retira la referencia no verificada', !/Assessment in an AI world: Redesigning for authentic learning/i.test(authentic));
check('evaluación auténtica cita revisión crítica verificable', /Fawns/i.test(authentic) && /10\.1080\/02602938\.2024\.2404634/.test(authentic));

check('Bloom permanece idéntica al rollback', sha(bloomPath) === sha(`${rb}${bloomPath}`));
check('SAMR permanece idéntica al rollback', sha(samrPath) === sha(`${rb}${samrPath}`));

if (failures.length) {
  console.error(`FAIL ${failures.length}/${checks}`);
  failures.forEach((x) => console.error(`- ${x}`));
  process.exit(1);
}
console.log(`PASS ${checks}/${checks}`);
