---
title: "Evaluación formativa asistida por IA — portafolios iterativos"
date: 2026-04-14
draft: false
description: "Práctica documentada donde los estudiantes construyen portafolios iterativos con retroalimentación de IA en cada versión, documentando sus decisiones de revisión."
summary: "Un sistema de portafolios donde cada texto pasa por tres versiones con retroalimentación de IA. Lo que se evalúa no es el producto final sino las decisiones que el estudiante tomó en cada iteración."
tags: ["evaluación formativa", "portafolios", "retroalimentación iterativa", "Claude", "Gemini", "licenciatura", "híbrida", "rúbrica"]
categories: ["practica-pedagogica"]
areas: ["ia", "evaluacion", "pedagogia"]
showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
asignatura: "Comunicación / Derecho / Ciencias sociales — adaptable"
---

{{< lead >}}
¿Qué pasa si evaluamos las decisiones del estudiante en lugar del texto que entrega? Esta práctica implementa un sistema de portafolios iterativos donde la IA ofrece retroalimentación formativa en cada versión. El centro de la evaluación no es la calidad del producto final sino la evidencia del proceso: qué aceptó, qué rechazó y por qué.
{{< /lead >}}

## Contexto

Grupo de 30 estudiantes de tercer semestre en una asignatura de comunicación escrita, modalidad híbrida. El problema habitual: los estudiantes entregan un texto una vez, reciben calificación y no vuelven a mirarlo. No hay iteración ni reflexión sobre el proceso de escritura.

Se diseñó un sistema donde cada texto pasa por tres versiones con retroalimentación de IA entre cada una, y el docente evalúa el portafolio completo (las tres versiones + las decisiones documentadas), no solo el texto final.

## Objetivo pedagógico

Desarrollar la capacidad de escribir de forma iterativa, recibiendo y procesando retroalimentación con criterio. Al finalizar, el estudiante podrá:

- Revisar un texto propio con base en retroalimentación externa
- Distinguir entre una sugerencia válida y una sugerencia incorrecta de la IA
- Documentar y justificar sus decisiones de revisión
- Reflexionar sobre su proceso de escritura

## Cómo se integra la IA

La IA funciona como **evaluador formativo intermedio**: recibe cada versión del texto del estudiante y ofrece retroalimentación usando la rúbrica del docente. El estudiante decide qué incorporar.

La IA **no** califica. El docente es quien evalúa el portafolio completo al final del proceso.

**Prompt que se proporciona a los estudiantes para solicitar retroalimentación (adaptado a Claude):**

> Aquí tienes una rúbrica con 4 criterios: [pegar rúbrica del docente]. Evalúa el siguiente texto usando exclusivamente estos criterios. Para cada criterio: (1) indica el nivel que consideras, (2) justifica tu evaluación con ejemplos del texto, (3) ofrece una sugerencia concreta de mejora. No reescribas el texto. [Pegar texto]

## Secuencia de la actividad

{{< timeline >}}

{{< timelineItem icon="pencil" header="Semana 1 — Versión 1: borrador sin IA" subheader="Trabajo individual" >}}
El estudiante escribe la primera versión de su texto sin usar IA. El propósito es capturar su punto de partida real, sin intervención algorítmica.

<strong>Entregable:</strong> Texto V1 (borrador original).
{{< /timelineItem >}}

{{< timelineItem icon="brain" header="Semana 2 — Retroalimentación IA + versión 2" subheader="Trabajo individual con IA" >}}
El estudiante somete su V1 a retroalimentación de la IA usando el prompt estandarizado con la rúbrica del docente. La IA comenta cada criterio.

El estudiante lee la retroalimentación, decide qué incorporar y qué rechazar, y produce la V2. Documenta cada decisión en una tabla de registro.

<strong>Tabla de registro:</strong>

| Sugerencia de la IA | ¿Aceptada? | Justificación del estudiante |
|---------------------|-----------|------------------------------|
| "El argumento del párrafo 3 es circular" | Sí | Revisé y efectivamente repito la premisa como conclusión |
| "Incluir estadísticas de impacto ambiental" | No | El texto es un ensayo argumentativo, no un reporte; las estadísticas desvían el tono |
| "Reorganizar la estructura: mover §4 antes de §2" | Parcial | Moví §4 pero lo combiné con §2 en un solo párrafo |

<strong>Entregable:</strong> Texto V2 + tabla de registro de decisiones + log de la conversación con IA.
{{< /timelineItem >}}

{{< timelineItem icon="users" header="Semana 3 — Revisión de pares + versión 3" subheader="Sesión presencial" >}}
Los estudiantes intercambian sus V2 con un compañero. Cada uno ofrece retroalimentación escrita usando los mismos criterios de la rúbrica. El autor produce V3 integrando los comentarios del par.

<strong>Entregable:</strong> Texto V3 + comentarios del par + decisiones tomadas.
{{< /timelineItem >}}

{{< timelineItem icon="file-lines" header="Semana 4 — Reflexión y entrega del portafolio" subheader="Trabajo individual" >}}
El estudiante prepara su portafolio final:

1. Las tres versiones del texto (V1, V2, V3)
2. Las tablas de registro de decisiones
3. Los logs de interacciones con la IA
4. Una reflexión escrita (500 palabras) respondiendo:
   - ¿Qué cambió entre V1 y V3?
   - ¿En qué fue útil la retroalimentación de la IA? ¿En qué no?
   - ¿Hubo algún momento donde la IA estaba equivocada? ¿Cómo lo identificaste?
   - ¿Qué aprendiste sobre tu proceso de escritura?

<strong>Entregable:</strong> Portafolio completo.
{{< /timelineItem >}}

{{< /timeline >}}

## Forma de evaluación

El docente evalúa el portafolio completo, no el texto final:

| Criterio | Peso |
|----------|------|
| Calidad de la V1 (punto de partida) | 10% |
| Calidad de las decisiones de revisión (V1→V2) | 25% |
| Capacidad de evaluar críticamente la retroalimentación de la IA | 20% |
| Evolución documentable entre versiones | 20% |
| Calidad de la reflexión final | 15% |
| Incorporación productiva de la retroalimentación de pares (V2→V3) | 10% |

{{< alert icon="shield-halved" type="warning" >}}
**El texto final no es lo más importante.** El 65% de la evaluación se concentra en el proceso (decisiones, evolución, reflexión). Un estudiante que entrega un texto final excelente pero sin evidencia de proceso obtiene una calificación inferior a uno cuyo texto evolucionó de forma documentada.
{{< /alert >}}

## Resultados y reflexión

Después de implementar esta práctica durante un semestre:

- El 72% de los estudiantes reportó que las tablas de registro les ayudaron a ser más conscientes de sus decisiones de escritura
- Los estudiantes que rechazaron al menos una sugerencia de la IA con justificación produjeron textos de mayor calidad que los que aceptaron todo acríticamente
- La V2 (post-IA) mejoró consistentemente respecto a la V1 en estructura y argumentación, pero en algunos casos empeoró en voz personal (el texto se "homogeneizó")
- La V3 (post-pares) recuperó la voz personal en la mayoría de los casos

**Área de mejora:** en la primera implementación, algunos estudiantes no entendieron la tabla de registro y la llenaron de forma superficial ("Sí porque me pareció bien"). Se añadió un ejemplo modelado por el docente al inicio de la semana 2 mostrando cómo luce una decisión bien justificada y una superficial.

## Relación con otras secciones

- La [guía de evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) presenta el marco teórico y otros instrumentos formativos
- El concepto de [agenciamiento (ensamblaje) humano-IA](/ia-educacion/guias/agenciamiento-humano-ia/) explica por qué documentar las decisiones —no solo el producto— es central para entender la relación persona-IA
- La [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) fundamenta la competencia de evaluar críticamente lo que la IA propone

## Referencias

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, *5*(1), 7–74. https://doi.org/10.1080/0969595980050102
- Hamp-Lyons, L., & Condon, W. (2000). *Assessing the portfolio: Principles for practice, theory, and research*. Hampton Press.
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. *Studies in Higher Education*, *31*(2), 199–218. https://doi.org/10.1080/03075070600572090
- Yancey, K. B. (1998). *Reflection in the writing classroom*. Utah State University Press.
