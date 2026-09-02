---
title: "Programación con IAG"
date: 2026-05-11
draft: false
description: "Cómo aprender a programar con apoyo formativo de IAG, evaluando la comprensión del código, la capacidad de depurar y la justificación de las mejoras propuestas."
summary: "Programación con IAG: lectura comprensiva de código, depuración asistida, análisis de casos límite, mejoras justificadas. Progresión de prompts por nivel Bloom y rúbrica de proceso, con foco en evitar la dependencia."
tags: ["producto-aprendizaje", "bloom-3", "rubrica-iag", "ingeniería", "cognitivas", "programación", "depuración"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 3
bloom_rango: "2-6"
competencias_cluster: ["Ingeniería", "Cognitivas"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "medio"
modalidad: "cualquiera"
asignatura_ejemplo: "Ciencias computacionales / Ingeniería de software / Cualquier curso con código"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de introducción a la programación, estructuras de datos o laboratorios con código que reciben programas que funcionan y ven que el estudiante no sabe explicar ni una línea de lo que entregó." haras="Un estudiante de primer semestre recibe una función en Python que debe ordenar las calificaciones de un grupo y falla con la lista vacía. Antes de tocarla, explica con sus palabras qué hace; formula una hipótesis del error antes de preguntarle a la IA; diseña tres entradas que rompen el código (lista vacía, un solo elemento, dos alumnos con la misma calificación) y, al final, justifica por escrito cada mejora que hace. La IA explica, confirma o corrige su hipótesis y sugiere casos límite; la decisión de qué cambiar es suya. Entrega el código, las explicaciones por bloque, los tres casos de prueba y la línea de razón de cada cambio." tendras="Cinco prompts copiables ordenados de leer a diseñar, y una regla de revisión: «sin hipótesis escrita del error, el estudiante no le entrega el código a la IA»." tarda="Ocho minutos de lectura; quince si adaptas los prompts a tu lenguaje y a tus ejercicios." ejemplo="Empieza con la función que ordena calificaciones, en el primer párrafo, y vuelve a ella en las fases y en las salvaguardas." >}}

Una profesora de introducción a la programación entrega a su grupo una función en
Python que ordena las calificaciones de un grupo de mayor a menor y les avisa que falla
con la lista vacía. Un estudiante la pega en un chat, recibe la versión corregida en
diez segundos y la entrega. Cuando la profesora le pregunta por qué fallaba, no sabe.
La IA genera código en segundos; lo difícil es aprender a leerlo, depurarlo y decidir
qué mejora vale la pena. Aquí se revisan esas tres capacidades, y la cantidad de líneas
entregadas pesa poco.

## Qué es y para qué sirve

**Programación** como trabajo de aprendizaje cubre el ciclo completo de
escribir, leer, depurar y mejorar código. La IA cambia radicalmente el
costo de generar código pero no el de **entenderlo**, y entender es lo
que la asignatura forma.

**Dónde entra la IA en este tipo de trabajo:** explica código (qué hace la
línea que compara dos calificaciones), confirma o corrige la hipótesis del
estudiante sobre un error («falla porque intenta leer el primer elemento de
una lista vacía»), sugiere casos límite y propone mejoras que el estudiante
justifica o descarta. La decisión sobre qué cambiar y por qué es del
estudiante.

## Bloom y progresión de prompts

Este tipo de trabajo cubre todo el rango Bloom (**2 a 6**), con nivel dominante
**3 — Aplicar** (escribir y depurar código que funcione). El nivel 6
aparece cuando el estudiante diseña una solución completa. Para ti, la tabla
es un banco de prompts: el de la fila 2 es el que conviene exigir con
hipótesis previa, y el de la fila 4 corta el «hazme el código».

| Nivel Bloom | Movimiento de programación | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 2 — Comprender | Lectura comprensiva | Reconstruye qué hace un fragmento existente | _"Explícame qué hace este código."_ |
| 3 — Aplicar **(dominante)** | Depuración asistida | Identifica el origen de un error y lo corrige | _"¿Qué errores tiene este código y por qué ocurren?"_ |
| 4 — Analizar | Trazas y casos límite | Prueba el código con entradas no obvias | _"Para este código, ¿qué entradas podrían romperlo? Dame 3 casos límite."_ |
| 5 — Evaluar | Mejoras justificadas | Decide si vale la pena cambiar algo | _"Sugiere mejoras en eficiencia y justifica los cambios sin reescribir completamente el código."_ |
| 6 — Crear | Diseño propio | Diseña la arquitectura y la implementa | _"Tengo este problema: [descripción]. Discute conmigo posibles arquitecturas antes de escribir código; sólo escribe pseudocódigo de alto nivel."_ |

## Competencias que desarrolla

- **Ingeniería** — pensamiento computacional, lectura técnica, depuración, diseño de soluciones.
- **Cognitivas** — abstracción, descomposición de problemas, evaluación crítica de alternativas técnicas.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="book-open" header="Fase 1 — Lectura" subheader="Comprender antes de tocar" md="true" >}}
Ante un código ajeno o un fragmento generado por IAG, el estudiante
**explica con sus palabras** qué hace antes de modificarlo. La IAG verifica
la explicación; el estudiante corrige su interpretación.
{{< /timelineItem >}}

{{< timelineItem icon="bug" header="Fase 2 — Depuración" subheader="Trazas y diagnóstico" md="true" >}}
Frente a un error, el estudiante traza el flujo y formula una hipótesis
antes de consultar IAG. La IAG confirma o desvía la hipótesis explicando
**por qué** ocurre el error.
{{< /timelineItem >}}

{{< timelineItem icon="vial" header="Fase 3 — Casos límite" subheader="Romper el código" md="true" >}}
El estudiante diseña pruebas con entradas extremas; la IAG sugiere
adicionales. Las pruebas se documentan junto con sus resultados.
{{< /timelineItem >}}

{{< timelineItem icon="rotate" header="Fase 4 — Mejora justificada" subheader="Refactor con criterio" md="true" >}}
Identificación de mejoras (eficiencia, legibilidad, modularidad). Cada
cambio se justifica por escrito; los cambios sin justificación no se
aceptan.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del código

Riesgo **medio**: lo que se pierde con la IA es la capacidad de trabajar sin
ella, y eso pesa más que la calidad del código. La pieza que más te dice es la
explicación en lenguaje natural de cada bloque (por ejemplo, «esta línea
devuelve la lista vacía antes de intentar ordenar»); si el estudiante puede
escribirla sin abrir el chat, entendió. Junto con el código entrega estas
piezas, cada una con su grado de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | obligatoria | Transcripción por fase, incluyendo prompts de depuración |
| Explicaciones del propio código en lenguaje natural | obligatoria | Comentarios o bitácora; el estudiante debe poder explicar cada bloque sin la IAG |
| Trazas y casos de prueba | obligatoria | Mínimo 3 casos límite con resultados esperados y obtenidos |
| Justificación de cambios y refactors | obligatoria | Por cada mejora, una línea de "por qué este cambio" |
| Historial de versiones | recomendada | Commits o snapshots fechados |
| Bitácora metacognitiva | obligatoria | Qué aprendió sobre el problema, no sobre las herramientas |
| Declaración de uso de IAG | obligatoria | Qué partes del código tuvieron asistencia y de qué tipo |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la bitácora, las explicaciones por bloque y los
casos de prueba, no sólo si el programa corre; ajusta los pesos a tu curso
(por ejemplo, más peso a «integración en el trabajo» si te preocupa el
copia-pega):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico (errores, casos, refactor) | 10% |
| Nivel cognitivo del prompt | "Hazme el código" | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como tutor de depuración | 15% |
| Uso crítico de la respuesta | Acepta sin probar | Cuestiona poco | Prueba y contrasta | Evalúa críticamente y verifica con casos límite | 20% |
| Integración en el trabajo | Copia/pega | Uso limitado | Integra y adapta | Transforma; entiende cada línea que entrega | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza dependencias y decisiones de diseño | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico; declara qué partes son asistidas | 10% |

## Riesgos y salvaguardas

- **Copia-pega sin entender.** El código funciona pero el estudiante no
  sabe explicarlo. Salvaguarda: examen oral breve sobre el propio código,
  o requisito de explicación en lenguaje natural por bloque.
- **Dependencia para depurar.** Cada error vuelve directo al chat.
  Salvaguarda: el prompt de depuración exige hipótesis previa del
  estudiante; sin hipótesis no se entrega el código a la IAG.
- **Refactor sin justificación.** Cambios cosméticos sin razón.
  Salvaguarda: cada commit/cambio necesita una línea de justificación
  evaluable.
- **Tests ausentes o triviales.** Prueba sólo con la lista del enunciado.
  Salvaguarda: requisito de tres o más casos límite documentados con
  entradas y salidas (lista vacía, un elemento, empates).

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar qué partes del código tuvieron
asistencia y de qué tipo (explicación, depuración, refactor). La IAG es
asistente; la titularidad técnica y la rendición de cuentas son del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Introducción a la programación, estructuras de datos, ingeniería de
software, laboratorios de cualquier ingeniería con código.

## Ejemplos y enlaces

- Trabajo cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — análisis cuantitativo análogo.
- Trabajo cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — escala arquitectónica.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
