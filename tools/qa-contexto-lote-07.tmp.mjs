#!/usr/bin/env node
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const checks = [];
const check = (name, condition) => checks.push({ name, ok: Boolean(condition) });

const active = read('content/formacion-docente/aprendizaje-activo/index.md');
const models = read('content/formacion-docente/modelos-samr-icap/index.md');
const bloom = read('content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md');
const evaluation = read('content/formacion-docente/evaluacion-retroalimentacion/index.md');
const workshop = read('content/formacion-docente/taller-diseno-actividades-ia-backward/index.md');
const index = read('content/formacion-docente/_index.md');
const report = read('docs/editorial/lotes/2026-08-24-contexto-lote-07-diseno-actividades.md');
const decisions = JSON.parse(read('data/editorial/context-audit-decisions.json')).decisions;

check('aprendizaje activo deja de exigir reciprocidad exclusivamente entre aprendices', !active.includes('reciprocidad entre aprendices'));
check('aprendizaje activo reconoce el agente computacional condicionado', /agente computacional/i.test(active) && /contenido pertinente/i.test(active));
check('aprendizaje activo distingue interfaz de interacción cognitiva', /interfaz conversacional/i.test(active) && /no (basta|demuestra)/i.test(active));
check('aprendizaje activo conserva alternativa sin IA y preguntas de revisión', /alternativa sin IA/i.test(active) && active.includes('Cinco preguntas'));
check('aprendizaje activo continúa hacia Bloom', active.includes('formacion-docente/taxonomia-bloom-diseno-inverso'));

check('SAMR–ICAP deja de presentar interacción como exclusivamente humana', !/reciprocidad humana/i.test(models));
check('SAMR–ICAP reconoce condiciones para agente computacional', /agente computacional/i.test(models) && /turnos/i.test(models));
check('SAMR–ICAP incorpora DOI de revisión crítica', models.includes('10.1007/s11528-016-0091-y'));
check('SAMR–ICAP nombra límites de contexto jerarquía y producto', /contexto/i.test(models) && /jerárqu/i.test(models) && /producto sobre proceso/i.test(models));
check('SAMR–ICAP continúa hacia evaluación', models.includes('formacion-docente/evaluacion-retroalimentacion'));

check('Bloom permanece idéntico al rollback aprobado', sha('content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md') === sha('docs/editorial/rollback/2026-08-24-contexto-lote-07/content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md'));

check('evaluación separa evaluación de la docencia', /evaluación (del curso|de la docencia)/i.test(evaluation));
check('evaluación elimina la categoría retroalimentación sumativa', !evaluation.includes('### Retroalimentación sumativa'));
check('evaluación define CAT como respuestas productos o indicios', /(respuestas|productos).*(indicios|comprensión)/is.test(evaluation));
check('evaluación limita el estudio CAT a una técnica y participación opcional', /una (sola )?técnica/i.test(evaluation) && /39 de 96/i.test(evaluation) && /opcional/i.test(evaluation));
check('evaluación no exige rúbrica universal', !/debe utilizar[^.\n]{0,30}rúbricas/i.test(evaluation));
check('evaluación incorpora fuente pública de evaluación formativa', /Black.*Wiliam/is.test(evaluation));

check('taller se declara propuesta no resultado de aplicación', /propuesta de taller/i.test(workshop) && /no documenta una aplicación/i.test(workshop));
check('taller usa diseñado para en vez de funciona con grupos', /diseñado para grupos de 12 a 24/i.test(workshop) && !workshop.includes('Funciona con grupos de **12 a 24'));
check('taller retira clasificación 4+3 sin soporte', !workshop.includes('cuatro tareas donde la IA aporta más') && !workshop.includes('tres donde no'));
check('taller ofrece decisión observable sobre delegación', /qué parte del trabajo.*observar/is.test(workshop) && /qué no debe delegarse/i.test(workshop));
check('taller incorpora tres plantillas copiables', (workshop.match(/#### Plantilla [123]/g) || []).length === 3);
check('taller no mantiene 45 minutos seguidos de trabajo individual', !workshop.includes('0:45–1:30 | Trabajo individual') && workshop.includes('1:15–1:40 | Revisión en parejas'));
check('taller declara como síntesis editorial los cuatro principios', /síntesis editorial[^\n]*cuatro/i.test(workshop));
check('taller evita cierre mecánico repetido en las tres sesiones', (workshop.match(/La pieza clave es el bloque/g) || []).length < 2);

check('índice describe aprendizaje activo por trabajo cognitivo', /Trabajo cognitivo observable/i.test(index));
check('índice describe SAMR–ICAP como dos lentes', /Dos lentes para revisar una actividad/i.test(index));
check('índice describe Bloom por propósito evidencia y experiencia', /propósito, evidencia y experiencia/i.test(index));
check('índice separa evaluación retroalimentación y CAT', /Evaluación, retroalimentación y CAT/i.test(index));
check('índice incorpora el taller a la ruta manual', index.includes('link="taller-diseno-actividades-ia-backward/"'));
check('índice explica la secuencia aprendizaje activo Bloom SAMR evaluación taller', /aprendizaje activo[\s\S]*Bloom[\s\S]*SAMR[\s\S]*evaluación[\s\S]*taller/i.test(index));
check('índice rotula la cuadrícula automática', /## Todas las páginas de Formación docente/i.test(index));
check('expediente marca como histórico el estado anterior al VoBo', /VoBo recibido/i.test(report) && /registro histórico/i.test(report));

const expected = {
  'content/formacion-docente/aprendizaje-activo/index.md': 'cambiar',
  'content/formacion-docente/modelos-samr-icap/index.md': 'cambiar',
  'content/formacion-docente/taxonomia-bloom-diseno-inverso/index.md': 'conservar',
  'content/formacion-docente/evaluacion-retroalimentacion/index.md': 'cambiar',
  'content/formacion-docente/taller-diseno-actividades-ia-backward/index.md': 'cambiar',
};
for (const [p, decision] of Object.entries(expected)) {
  check(`ledger registra ${p} como ${decision}`, decisions[p]?.decision === decision && decisions[p]?.approved_by === 'Rubén' && decisions[p]?.draft_status === 'borrador-editorial-aprobado');
}

const failed = checks.filter((c) => !c.ok);
for (const c of checks) console.log(`${c.ok ? 'PASS' : 'FAIL'} ${c.name}`);
console.log(`Lote 07: ${checks.length - failed.length}/${checks.length}`);
if (failed.length) process.exit(1);
