---
title: "Prototipo con IAG"
date: 2026-05-11
draft: false
description: "Cómo iterar un prototipo de ingeniería o diseño con apoyo formativo de IAG, evaluando la exploración de alternativas y la mejora justificada."
summary: "Prototipo con IAG: divergencia de soluciones, evaluación de ventajas/desventajas e iteración con mejoras justificadas. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "innovación", "ingeniería", "prototipado", "diseño"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 6
bloom_rango: "3-6"
competencias_cluster: ["Innovación", "Ingeniería"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería / Diseño industrial / Mecatrónica / Innovación tecnológica"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de ingeniería, diseño industrial o mecatrónica que cierran el curso con un prototipo (un dispensador de alimento para mascotas, un soporte para celular impreso en 3D) y reciben aparatos bien acabados sin rastro de por qué se eligió ese diseño y no otro." haras="Un equipo de cuarto semestre debe construir un dispensador automático de alimento para perros con menos de 800 pesos. Primero lista con la IA cinco maneras de dosificar (tornillo sinfín, compuerta con servo, tambor giratorio…), después arma una tabla que compara tres de ellas con sus propias razones (costo, piezas que pueden imprimir, riesgo de atasco), construye en el taller la versión 1 sin IA, la prueba con croquetas reales y justifica por escrito cada cambio de la versión 2. La IA amplía alternativas y sugiere mejoras; el equipo filtra, construye y decide. Entrega el prototipo, la tabla fechada y los bocetos de cada versión." tendras="Tres prompts copiables y una regla de revisión: «la tabla comparativa con tres alternativas va fechada antes de la primera pieza construida; si aparece después, el equipo prototipó la primera idea que tuvo»." tarda="Ocho minutos de lectura; quince si adaptas los prompts a tu taller." ejemplo="Empieza con el dispensador de alimento, en el primer párrafo, y vuelve a él en las fases y en las salvaguardas." >}}

Un profesor de diseño mecánico pide a los equipos de cuarto semestre un dispensador
automático de alimento para perros con un tope de 800 pesos. Un equipo llega con un
aparato de tambor giratorio muy bien acabado; cuando el profesor pregunta por qué tambor
y no tornillo sinfín, nadie sabe: fue la primera idea que salió del chat. Un prototipo
se revisa por el rastro de sus decisiones de diseño: qué alternativas se exploraron, por
qué se descartaron y qué mejora aportó cada versión. La IA amplía el horizonte; el
equipo construye.

## Qué es y para qué sirve

Un **prototipo** es una pieza construida —física, digital o conceptual, como
el dispensador de tambor, una app en pantallas de prueba o una maqueta de
cartón— que materializa una idea de solución para someterla a prueba. Lo que
forma está en el recorrido de
**divergencia (alternativas) → convergencia (decisión) → iteración (mejora)**,
más que en el prototipo terminado.

**Dónde entra la IA en este tipo de trabajo:** explora soluciones (propone el
tornillo sinfín cuando el equipo sólo pensaba en compuertas), contrasta
alternativas y sugiere mejoras de eficiencia o innovación. La IA es socia de
pensamiento; la fabricación, el modelado o el boceto son del equipo.

## Bloom y progresión de prompts

Este tipo de trabajo moviliza los niveles **3 a 6** de la taxonomía de Bloom, con
nivel dominante **6 — Crear** (la construcción iterada de algo nuevo). Para ti,
la tabla es un banco de prompts: el de la fila 2 es el que más conviene
exigir con la tabla comparativa delante, para que las ventajas y desventajas
se midan contra las restricciones del curso.

| Nivel Bloom | Movimiento del prototipo | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Divergencia de soluciones | Lista alternativas posibles para el problema | _"¿Qué posibles soluciones existen para este problema?"_ |
| 4–5 — Analizar/Evaluar | Comparación de alternativas | Identifica ventajas y desventajas con criterios | _"¿Qué ventajas y desventajas tienen estas alternativas?"_ |
| 6 — Crear **(dominante)** | Iteración con mejora | Decide cambios de diseño y los justifica | _"¿Cómo podría mejorar mi diseño para hacerlo más eficiente o innovador?"_ |

## Competencias que desarrolla

- **Innovación** — exploración divergente, resolución creativa de problemas, iteración basada en evidencia.
- **Ingeniería** — diseño técnico, validación de funcionamiento, integración de restricciones reales.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="lightbulb" header="Fase 1 — Divergencia" subheader="Abrir el espacio" md="true" >}}
Generación de tres o más alternativas distintas para el problema. La IA amplía
con enfoques no contemplados (tecnológicos, materiales, sociales). El
equipo filtra con razones técnicas (por ejemplo, descarta el tambor
porque atasca croquetas grandes).
{{< /timelineItem >}}

{{< timelineItem icon="scale-balanced" header="Fase 2 — Comparación" subheader="Ventajas y desventajas" md="true" >}}
Tabla comparativa con criterios pertinentes al curso (costo, piezas que se
pueden imprimir, riesgo de atasco). Selección justificada de la
alternativa a prototipar.
{{< /timelineItem >}}

{{< timelineItem icon="screwdriver-wrench" header="Fase 3 — Construcción" subheader="Sin IAG en el taller" md="true" >}}
Construcción/modelado del primer prototipo. La IAG puede asistir en
cálculos o consultas técnicas puntuales, pero la fabricación, el
boceto o el modelado son trabajo directo del estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="rotate" header="Fase 4 — Iteración" subheader="Mejora justificada" md="true" >}}
Pruebas, identificación de debilidades y propuesta de mejoras. Cada
mejora se justifica por escrito y se traduce en una nueva versión del
prototipo.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el equipo además del prototipo

Riesgo **bajo**: un prototipo físico o funcional es difícil de generar con
IA. Lo que se revisa es el rastro de la iteración (tabla fechada, bocetos
v1, v2, v3, una línea por cada cambio). Junto con el prototipo, el equipo
entrega estas piezas, cada una con su grado de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| ≥3 iteraciones del prompt | opcional | En fases 1 y 2 si hay exploración profunda |
| Anotaciones de validación del output | recomendada | Qué alternativas se descartaron y por qué |
| Tabla comparativa de alternativas | obligatoria | Con criterios explícitos antes de la decisión |
| Bocetos y/o modelos por iteración | obligatoria | v1, v2, v3 del prototipo con fechas |
| Justificación escrita de cada mejora | obligatoria | Una línea por cambio de versión |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre el problema |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la tabla, los bocetos y las justificaciones, no sólo
el acabado; ajusta los pesos a tu curso (por ejemplo, más peso a «uso crítico
de la respuesta» si tus equipos suelen construir la primera idea del chat):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la solución hecha | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como sparring de diseño | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona superficialmente | Contrasta y analiza | Evalúa críticamente y descarta con argumento técnico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el prototipo es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de diseño y trade-offs | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Una sola alternativa explorada.** Se prototipa la primera idea.
  Salvaguarda: tabla comparativa obligatoria con tres o más alternativas
  distintas, fechada antes de la primera pieza.
- **Iteración cosmética.** Las versiones cambian poco y sin justificación.
  Salvaguarda: cada versión exige justificación escrita del cambio.
- **Sobre-ingeniería sugerida por IAG.** La IAG propone soluciones
  innecesariamente complejas. Salvaguarda: el criterio "viable con el
  tiempo/recursos del curso" se incorpora explícitamente.
- **Documentación inflada vs. construcción magra.** Mucho informe, poco
  prototipo real. Salvaguarda: el prototipo físico o funcional se muestra
  (fotos fechadas, video de la prueba con croquetas, archivo de impresión),
  y las descripciones solas no cuentan.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** El equipo declara el modelo y para qué lo
usó (por ejemplo, «pedimos cinco formas de dosificar en la fase 1»). El
prototipo, sus bocetos e iteraciones son del equipo; la IA es socia de diseño.
{{< /alert >}}

## Asignatura de ejemplo

Ingenierías, diseño industrial, mecatrónica, innovación tecnológica;
cursos por proyectos que terminan en una pieza que funciona o se puede
demostrar (un dispositivo, una app, una maqueta).

## Ejemplos y enlaces

- Trabajo cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — fase planificadora previa al prototipo.
- Trabajo cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — escala arquitectónica.
- Trabajo cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — soporte cuantitativo del prototipo.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
