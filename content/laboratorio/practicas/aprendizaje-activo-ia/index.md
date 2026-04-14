---
title: "Aprendizaje activo con IA — actividades diseñadas y ejecutadas con IA"
date: 2026-04-14
draft: false
description: "Práctica documentada donde el docente diseña actividades con IA y los estudiantes las ejecutan usando IA como tutor socrático, generador de contraejemplos y evaluador formativo."
summary: "Tres actividades de aprendizaje activo donde la IA participa en el diseño (docente) y en la ejecución (estudiante): estudio de caso, simulación de roles y think-pair-share."
tags: ["aprendizaje activo", "think-pair-share", "estudio de caso", "simulación", "DeepSeek", "Gemini", "licenciatura", "presencial"]
categories: ["practica-pedagogica"]
areas: ["ia", "pedagogia"]
showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
asignatura: "Ciencias sociales / Administración / adaptable"
---

{{< lead >}}
El aprendizaje activo deja de depender del ingenio del docente en tiempo real cuando la IA entra como co-diseñador. En esta práctica se documentan tres actividades donde la IA participó tanto en la preparación como en la ejecución, con resultados observables en la participación y la profundidad del análisis estudiantil.
{{< /lead >}}

## Contexto

Grupo de 35 estudiantes de segundo semestre en ciencias sociales, modalidad presencial. Las sesiones son de 90 minutos. El docente buscaba reducir el tiempo de exposición magistral y aumentar la participación activa, pero enfrentaba dos obstáculos: la preparación de materiales consumía demasiado tiempo y los estudiantes respondían de forma superficial a las actividades convencionales.

Se diseñó una secuencia de tres sesiones donde la IA interviene en ambos niveles: diseño (docente) y ejecución (estudiante).

## Objetivo pedagógico

Demostrar que la IA puede potenciar el aprendizaje activo sin sustituir la facilitación docente. Al finalizar la secuencia, el estudiante podrá:

- Analizar un caso complejo identificando variables que no son evidentes
- Defender una postura ante objeciones generadas por un interlocutor no humano
- Distinguir entre información validada e información plausible pero incorrecta

## Cómo se integra la IA

La IA tiene un rol diferente en cada sesión:

| Sesión | Rol de la IA (docente) | Rol de la IA (estudiante) |
|--------|----------------------|--------------------------|
| 1. Estudio de caso | Genera el caso y las variables | Consultor que responde preguntas sin dar la solución |
| 2. Simulación de roles | Diseña el escenario y los personajes | Interlocutor que mantiene su rol asignado |
| 3. Think-pair-share | Genera las preguntas con complejidad progresiva | Cuestionador que desafía el consenso del par |

## Secuencia de la actividad

{{< timeline >}}

{{< timelineItem icon="book-open" header="Sesión 1 — Estudio de caso asistido" subheader="90 minutos — presencial" >}}
**Preparación (docente, 20 min antes):** el docente genera un caso con DeepSeek adaptado al contexto local. Revisa y ajusta antes de la clase.

**Ejecución en aula:**
1. **(10 min)** El docente presenta el caso sin solución
2. **(20 min)** Los equipos de 4 analizan el caso e identifican variables
3. **(15 min)** Cada equipo consulta a la IA como "experto" que responde preguntas pero no da soluciones directas
4. **(20 min)** Los equipos presentan sus análisis al grupo
5. **(15 min)** Discusión grupal facilitada por el docente
6. **(10 min)** Reflexión: ¿qué preguntaron a la IA? ¿Qué obtuvieron? ¿Les sirvió?
{{< /timelineItem >}}

{{< timelineItem icon="users-rays" header="Sesión 2 — Simulación de roles" subheader="90 minutos — presencial" >}}
**Preparación (docente, 15 min antes):** el docente genera un escenario de negociación con Gemini. Define los roles y las restricciones de cada personaje.

**Ejecución en aula:**
1. **(10 min)** El docente asigna roles: cada estudiante tiene un personaje con intereses y restricciones
2. **(25 min)** Ronda 1: los estudiantes practican la negociación con la IA como contraparte que mantiene su rol sin ceder fácilmente
3. **(10 min)** Pausa de reflexión: ¿qué estrategia funcionó y cuál no?
4. **(25 min)** Ronda 2: negociación entre pares usando lo aprendido de la interacción con IA
5. **(20 min)** Debrief grupal: comparar la negociación con IA vs. la negociación con humanos
{{< /timelineItem >}}

{{< timelineItem icon="comments" header="Sesión 3 — Think-pair-share con validación IA" subheader="90 minutos — presencial" >}}
**Preparación (docente, 10 min antes):** el docente genera una secuencia de 6 preguntas de complejidad progresiva con Claude, siguiendo la [taxonomía de Bloom](/formacion-docente/taxonomia-bloom-diseno-inverso/).

**Ejecución en aula:**
1. **(5 min)** **Think:** cada estudiante responde individualmente la primera pregunta
2. **(10 min)** **Pair:** en parejas, comparan respuestas y llegan a un consenso
3. **(10 min)** **IA-check:** la pareja presenta su consenso a la IA y le pide objeciones
4. **(10 min)** **Share:** la pareja presenta al grupo qué dijo la IA y qué aceptaron/rechazaron
5. Se repite el ciclo con preguntas de mayor complejidad (3 rondas)
6. **(15 min)** Cierre: ¿en qué momento la IA los hizo cambiar de opinión? ¿En cuál no?
{{< /timelineItem >}}

{{< /timeline >}}

## Forma de evaluación

La evaluación es formativa y se concentra en la participación activa y la reflexión:

| Criterio | Peso |
|----------|------|
| Participación activa en las tres sesiones | 30% |
| Calidad de las preguntas formuladas a la IA | 20% |
| Capacidad de distinguir información útil de la IA vs. información superficial | 25% |
| Reflexión escrita final sobre las tres sesiones | 25% |

{{< alert icon="circle-info" >}}
**No se evalúa la respuesta "correcta".** Se evalúa el proceso de pensamiento: qué preguntó, cómo reaccionó ante lo que la IA dijo, y qué decidió hacer con esa información.
{{< /alert >}}

## Resultados y reflexión

Observaciones tras las tres sesiones:

- **Sesión 1 (caso):** los equipos que formularon preguntas específicas a la IA obtuvieron información más útil que los que hicieron preguntas amplias. Esto generó una discusión orgánica sobre la importancia de saber preguntar, sin que el docente lo impusiera
- **Sesión 2 (roles):** la IA como contraparte resultó más exigente que los pares. Los estudiantes reportaron que les obligó a preparar mejor sus argumentos antes de la negociación con humanos
- **Sesión 3 (think-pair-share):** el paso de "IA-check" generó los momentos más productivos. Varias parejas cambiaron su respuesta después de que la IA les mostró un contraejemplo que no habían considerado

**Área de mejora:** en la sesión de roles, algunos estudiantes se frustraron porque la IA "no cedía". Se ajustó el prompt para que la IA acepte propuestas bien fundamentadas, no que rechace todo automáticamente.

## Relación con otras secciones

- Para el marco teórico y más actividades tipo, consulta la [guía de aprendizaje activo con IA](/ia-educacion/guias/aprendizaje-activo-con-ia/)
- La [taxonomía de Bloom y el diseño inverso](/formacion-docente/taxonomia-bloom-diseno-inverso/) fundamentan las preguntas de complejidad progresiva usadas en la sesión 3
- Para la dimensión de [evaluación formativa](/ia-educacion/guias/evaluacion-formativa-ia/) que atraviesa estas actividades

## Referencias

- Bonwell, C. C., & Eison, J. A. (1991). *Active learning: Creating excitement in the classroom* (ASHE-ERIC Higher Education Report No. 1). George Washington University.
- Chi, M. T. H., & Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes. *Educational Psychologist*, *49*(4), 219–243. https://doi.org/10.1080/00461520.2014.965823
- Lyman, F. (1981). The responsive classroom discussion. En A. S. Anderson (Ed.), *Mainstreaming digest*. University of Maryland College of Education.
