---
title: "Actividad propuesta: portafolio iterativo con retroalimentación de IA"
date: 2026-04-14
lastmod: 2026-08-24
draft: false
description: "Actividad propuesta donde los estudiantes construyen portafolios iterativos con retroalimentación de IA en cada versión, documentando sus decisiones de revisión."
summary: "Un sistema de portafolios donde cada texto pasa por tres versiones con retroalimentación de IA. Lo que se evalúa no es el producto final sino las decisiones que el estudiante tomó en cada iteración. Es un prototipo de escenario para adaptar, no una implementación observada."
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
ecosistema:
  id: practice.portafolio-proceso
  titulo: "Portafolio de proceso"
  audiencias: [estudiante, docente]
  intenciones: [practicar, diseñar, evaluar]
  tipo: practica
  capas: [D.evaluacion, P.trazabilidad, P.retroalimentacion]
  resultado: "Construye y evalúa un portafolio mínimo con versiones, decisiones, producto y reflexión."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/evaluacion-formativa-ia/"
  revisado: 2026-08-24
  relaciones:
    - tipo: ejemplifica
      destino: assessment.basada-en-procesos
    - tipo: aplica
      destino: evidence.trazabilidad
    - tipo: continua
      destino: practice.declaracion-uso-ia
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "La secuencia, los entregables y la tabla de decisiones se presentan como texto y tablas."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
¿Qué pasa si evaluamos las decisiones del estudiante en lugar del texto que entrega? Esta actividad propone un sistema de portafolios iterativos donde la IA ofrece retroalimentación formativa en cada versión. El centro de la evaluación no es la calidad del producto final sino la evidencia del proceso: qué aceptó, qué rechazó y por qué.
{{< /lead >}}

{{< alert icon="flask" type="warning" >}}
**Estado: actividad propuesta (prototipo de escenario).** Esta página describe un diseño
adaptable, no el reporte de una implementación observada. No existe un expediente —curso,
grupo, fecha, instrumentos aplicados, resultados— que la respalde como caso real. Una
aplicación futura deberá documentar contexto, alcance, resultados y limitaciones antes de
presentarse como práctica implementada.
{{< /alert >}}

## Contexto de aplicación previsto

La actividad está pensada para asignaturas de escritura académica o argumentativa, en cualquier modalidad, durante cuatro semanas. Responde a un problema habitual: los estudiantes entregan un texto una vez, reciben calificación y no vuelven a mirarlo; no hay iteración ni reflexión sobre el proceso de escritura.

El diseño hace que cada texto pase por tres versiones con retroalimentación de IA entre cada una, y que el docente evalúe el portafolio completo (las tres versiones + las decisiones documentadas), no solo el texto final. El docente define grupo, calendario y herramientas antes de aplicar.

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

> Aquí tienes una rúbrica con 4 criterios: *(rúbrica del docente; abajo hay una de ejemplo)*. Evalúa el siguiente texto usando exclusivamente estos criterios. Para cada criterio: (1) indica el nivel que consideras, (2) justifica tu evaluación con ejemplos del texto, (3) ofrece una sugerencia concreta de mejora. No reescribas el texto. *(texto del estudiante)*

**Rúbrica breve de ejemplo** (para un ensayo argumentativo; el docente la sustituye por la suya):

| Criterio | Qué se observa |
|----------|----------------|
| Tesis y enfoque | La tesis es identificable, discutible y se mantiene a lo largo del texto |
| Argumentación | Las premisas sostienen la conclusión; se consideran objeciones |
| Uso de fuentes | Las fuentes son pertinentes, están citadas y se distinguen de la voz propia |
| Claridad y organización | Los párrafos progresan; cada uno cumple una función reconocible |

**Fragmento inicial de ejemplo** (sin datos personales, para probar el prompt antes de usarlo con textos reales):

> La discusión sobre el uso de celulares en el aula suele plantearse como disciplina, pero
> es más útil plantearla como diseño: cuando la actividad exige consultar, comparar o
> producir algo con el dispositivo, la distracción disminuye sin necesidad de prohibiciones.

## Secuencia de la actividad

{{< timeline >}}

{{< timelineItem icon="pencil" header="Semana 1 — Versión 1: borrador sin IA" subheader="Trabajo individual" >}}
El estudiante escribe la primera versión de su texto sin usar IA. El propósito es capturar su punto de partida real, sin intervención algorítmica.

<strong>Entregable:</strong> Texto V1 (borrador original).
{{< /timelineItem >}}

{{< timelineItem icon="brain" header="Semana 2 — Retroalimentación IA + versión 2" subheader="Trabajo individual con IA" >}}
El estudiante somete su V1 a retroalimentación de la IA usando el prompt estandarizado con la rúbrica del docente. La IA comenta cada criterio.

El estudiante lee la retroalimentación, decide qué incorporar y qué rechazar, y produce la V2. Documenta en la tabla de registro al menos dos decisiones justificadas (una aceptación y un rechazo, cuando sea posible).

<strong>Tabla de registro:</strong>

| Sugerencia de la IA | ¿Aceptada? | Justificación del estudiante |
|---------------------|-----------|------------------------------|
| "El argumento del párrafo 3 es circular" | Sí | Revisé y efectivamente repito la premisa como conclusión |
| "Incluir estadísticas de impacto ambiental" | No | El texto es un ensayo argumentativo, no un reporte; las estadísticas desvían el tono |
| "Reorganizar la estructura: mover §4 antes de §2" | Parcial | Moví §4 pero lo combiné con §2 en un solo párrafo |

<strong>Entregable:</strong> Texto V2 + tabla de registro con al menos dos decisiones justificadas. No se entregan conversaciones completas.
{{< /timelineItem >}}

{{< timelineItem icon="users" header="Semana 3 — Revisión de pares + versión 3" subheader="Sesión presencial" >}}
Los estudiantes intercambian sus V2 con un compañero. Cada uno ofrece retroalimentación escrita usando los mismos criterios de la rúbrica. El autor produce V3 integrando los comentarios del par.

<strong>Entregable:</strong> Texto V3 + comentarios del par + decisiones tomadas.
{{< /timelineItem >}}

{{< timelineItem icon="file-lines" header="Semana 4 — Reflexión y entrega del portafolio" subheader="Trabajo individual" >}}
El estudiante prepara su portafolio final:

1. Las tres versiones del texto (V1, V2, V3)
2. Las tablas de registro de decisiones
3. Una reflexión escrita (500 palabras) respondiendo:
   - ¿Qué cambió entre V1 y V3?
   - ¿En qué fue útil la retroalimentación de la IA? ¿En qué no?
   - ¿Hubo algún momento donde la IA estaba equivocada? ¿Cómo lo identificaste?
   - ¿Qué aprendiste sobre tu proceso de escritura?

<strong>Entregable:</strong> Portafolio completo (versiones, decisiones y reflexión).
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

## Alternativa sin IA

El mismo sistema funciona sustituyendo la retroalimentación de IA de la semana 2 por retroalimentación entre pares con la misma rúbrica y el mismo número de revisiones: V1 recibe comentarios de un par (con la rúbrica), V2 los incorpora con tabla de decisiones, y la semana 3 usa un segundo par distinto. Los entregables y la ponderación no cambian. Esta vía garantiza participación equivalente a quien no puede o no quiere usar IA.

## Riesgos y condiciones de aplicación

- **Privacidad de borradores.** Los textos de estudiantes no deben contener datos personales al enviarse a una herramienta de IA; el docente debe indicar qué herramienta usar y con qué configuración.
- **Retroalimentación errónea.** La IA puede señalar problemas inexistentes o sugerir cambios que empeoran el texto; la tabla de decisiones existe precisamente para que el estudiante ejerza y documente su criterio.
- **Homogeneización de la voz.** La revisión asistida puede uniformar el estilo; la revisión de pares de la semana 3 y el criterio de evolución documentable ayudan a vigilarlo.
- **Carga de documentación.** Exigir conversaciones completas o registros exhaustivos convierte la trazabilidad en trámite; por eso se piden versiones, dos decisiones justificadas y una reflexión, no logs íntegros.

## Preguntas de revisión tras aplicar la propuesta

- ¿Las tablas de registro produjeron decisiones justificadas o se llenaron de forma superficial? ¿Hizo falta modelar un ejemplo?
- ¿Qué diferencias se observaron entre estudiantes que rechazaron sugerencias con justificación y los que aceptaron todo?
- ¿Se detectó homogeneización de la voz entre V1 y V2? ¿La revisión de pares la corrigió?
- ¿Qué cambiaría en el prompt, la rúbrica o la ponderación para la siguiente aplicación?

## Relación con otras secciones

- La [guía de evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) presenta el marco teórico y otros instrumentos formativos
- El concepto de [co-creación persona-IA](/ia-educacion/guias/agenciamiento-humano-ia/) explica por qué documentar las decisiones —no solo el producto— es central para entender la relación persona-IA
- La [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) fundamenta la competencia de evaluar críticamente lo que la IA propone

## Referencias

- Black, P., & Wiliam, D. (1998). Assessment and classroom learning. *Assessment in Education: Principles, Policy & Practice*, *5*(1), 7–74. https://doi.org/10.1080/0969595980050102
- Hamp-Lyons, L., & Condon, W. (2000). *Assessing the portfolio: Principles for practice, theory, and research*. Hampton Press.
- Nicol, D. J., & Macfarlane-Dick, D. (2006). Formative assessment and self-regulated learning: A model and seven principles of good feedback practice. *Studies in Higher Education*, *31*(2), 199–218. https://doi.org/10.1080/03075070600572090
- Yancey, K. B. (1998). *Reflection in the writing classroom*. Utah State University Press.

Las referencias respaldan la evaluación formativa y el trabajo con portafolios en general, no esta actividad en particular: ninguna de ellas evaluó esta secuencia con IA.
