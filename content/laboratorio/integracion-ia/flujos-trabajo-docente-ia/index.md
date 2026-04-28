---
title: "Flujos de trabajo docente con IA"
date: 2026-04-26
draft: false
description: "Tres flujos representativos de trabajo docente —planeación, retroalimentación y diseño evaluativo— con diagramas de proceso que explicitan dónde la IA aporta y dónde no entra."
summary: "Diagramas Mermaid de tres procesos docentes recurrentes, con puntos de decisión humana visibles. Pensados para que coordinaciones académicas estandaricen criterios sin uniformar prácticas."
tags: ["flujos de trabajo", "Mermaid", "diagramas", "procesos docentes", "protocolos"]
categories: ["guia"]
areas: ["ia", "pedagogia", "digital"]

weight: 1
showHero: true
heroStyle: "background"
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
---

{{< lead >}}
Tres procesos recurrentes del trabajo docente —planear una sesión, dar retroalimentación a un trabajo, diseñar una evaluación— se ven distintos en presencia de IA. Esta pieza ofrece los tres flujos en diagramas Mermaid, con los puntos de decisión humana visibles, para que cada docente los adapte a su contexto sin perder los criterios comunes.
{{< /lead >}}

## Por qué diagramar los flujos

Los principios sobre uso de IA en docencia abundan; los flujos operativos —*qué hago primero, qué después, dónde decido*— escasean. Esta pieza llena ese vacío con tres diagramas que cualquier docente puede usar como referencia, modificar para su asignatura y compartir con colegas para sostener criterios comunes.

Tres reglas que cruzan los tres flujos:

- **Cada paso indica qué actor lo ejecuta.** Docente, IA o estudiante. La distinción importa: cuando un paso recae en la IA, el docente sigue siendo responsable del resultado, pero el flujo lo declara explícitamente.
- **Los puntos de decisión humana son obligatorios.** Cada flujo incluye al menos dos rombos donde el docente decide; sin esa decisión, el proceso no avanza.
- **El producto final del flujo es replicable.** Otro docente que siga el mismo flujo en una asignatura distinta debería producir un objeto comparable.

## Flujo 1 — Planeación de una sesión de clase

Un docente prepara una sesión sobre un tema específico. Tradicionalmente, este proceso recae enteramente en él. Con IA, parte del trabajo se redistribuye, pero el control de la dirección pedagógica permanece humano.

{{< mermaid >}}
flowchart TD
    A[Docente: definir aprendizaje esperado] --> B[Docente: identificar nivel de Bloom]
    B --> C[IA: proponer 3 estructuras de sesión]
    C --> D{Docente: ¿alguna se ajusta al grupo?}
    D -- Sí --> E[Docente: seleccionar y ajustar]
    D -- No --> F[Docente: reformular prompt]
    F --> C
    E --> G[IA: proponer ejemplos disciplinares]
    G --> H{Docente: ¿son pertinentes?}
    H -- Sí --> I[Docente: integrar con materiales propios]
    H -- No --> J[Docente: descartar y proveer ejemplos propios]
    J --> I
    I --> K[Docente: definir momentos de actividad estudiantil]
    K --> L[Plan de sesión final]
{{< /mermaid >}}

**Tres notas operativas sobre este flujo:**

- El paso A no se delega. El aprendizaje esperado es decisión del docente, alineada con el syllabus de la asignatura.
- El bucle entre D y F es donde se desarrolla la competencia de [ingeniería de prompts](/ia-educacion/guias/ingenieria-de-prompts-para-docentes/). Vale invertir tiempo aquí; ahorra tiempo después.
- El paso K no admite IA en este flujo. Diseñar momentos de actividad estudiantil exige conocer al grupo, lo que la IA no captura.

## Flujo 2 — Retroalimentación a un trabajo estudiantil

El docente recibe un borrador o entrega intermedia y produce comentarios formativos. Aquí la IA puede aportar escala, pero no debe sustituir el juicio disciplinar.

{{< mermaid >}}
flowchart TD
    A[Estudiante: entrega borrador] --> B[Docente: lectura inicial sin IA]
    B --> C[Docente: identificar 1-2 problemas estructurales]
    C --> D[IA: revisar coherencia y claridad línea por línea]
    D --> E{Docente: ¿identifica problemas adicionales relevantes?}
    E -- Sí --> F[Docente: integrar a comentarios]
    E -- No --> G[Docente: descartar señalamientos no relevantes]
    F --> H[Docente: redactar comentarios formativos finales]
    G --> H
    H --> I[Docente: revisar tono y especificidad]
    I --> J[Comentarios entregados al estudiante]
    J --> K[Estudiante: producir versión revisada]
    K --> A
{{< /mermaid >}}

**Tres notas operativas sobre este flujo:**

- El paso B —lectura inicial sin IA— es deliberado. Si el docente delega la lectura al modelo desde el inicio, pierde la posibilidad de detectar problemas que la IA no señala (relevancia disciplinar, contexto del grupo, trayectoria del estudiante).
- El bucle K → A —el estudiante revisa y vuelve a entregar— es donde se materializa la [evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/). Sin ese bucle, el flujo es de retroalimentación, no formativa.
- El paso I evita un patrón frecuente: que los comentarios suenen a lenguaje de modelo. La revisión del docente devuelve voz humana al texto.

## Flujo 3 — Diseño de una evaluación

El docente prepara una evaluación de medio término o final. Aquí la IA tiene un rol limitado: ayuda a generar variantes y a verificar consistencia, pero el diseño evaluativo —qué se evalúa, cómo, con qué peso— permanece humano.

{{< mermaid >}}
flowchart TD
    A[Docente: revisar aprendizajes esperados de la unidad] --> B[Docente: definir evidencia esperada]
    B --> C{Docente: ¿la evidencia se sostiene si el estudiante usa IA?}
    C -- No --> D[Docente: rediseñar evidencia con contexto local o defensa]
    C -- Sí --> E[Docente: borrador inicial de la consigna]
    D --> E
    E --> F[IA: proponer 2 variantes equivalentes]
    F --> G{Docente: ¿las variantes mantienen el mismo nivel de Bloom?}
    G -- No --> H[Docente: reformular consigna o prompts]
    H --> F
    G -- Sí --> I[Docente: redactar rúbrica con criterios de proceso]
    I --> J[IA: revisar rúbrica para detectar ambigüedades]
    J --> K[Docente: ajustar rúbrica final]
    K --> L[Evaluación lista para aplicar]
{{< /mermaid >}}

**Tres notas operativas sobre este flujo:**

- El rombo C es decisivo. Si la evidencia no se sostiene en presencia de IA, el rediseño no es opcional. Esta lógica conecta con la [guía de integración curricular de IA](/ia-educacion/guias/integracion-curricular-ia/).
- Las variantes en F sirven para ofrecer evaluaciones equivalentes a estudiantes con condiciones particulares (recursamiento, aplazamiento) sin perder validez.
- El paso I —rúbrica con criterios de proceso— es lo que distingue una evaluación que sigue siendo válida con IA presente de una que no. Ver el [post sobre IA generativa y evaluación auténtica](/blog/ia-generativa-evaluacion-autentica/) para el marco.

## Cómo adaptar los flujos

Los tres diagramas son referencia, no plantilla rígida. Tres orientaciones para adaptarlos:

- **Identificar los pasos donde la IA aporta poco.** Cada disciplina tiene puntos donde la IA no es útil; el flujo debe respetarlos. Por ejemplo, en disciplinas con notación específica (matemáticas formales, química, partituras), los pasos de generación pueden requerir más tiempo de docente que de IA.
- **Documentar las desviaciones del flujo.** Cuando un docente se aparta del diagrama, conviene registrarlo. Las desviaciones repetidas sugieren que el flujo necesita revisarse.
- **Compartir las versiones adaptadas.** Si una academia adopta variantes de estos flujos, el repositorio comparativo —en una carpeta institucional accesible— sostiene el aprendizaje colectivo. La [guía de documentación de buenas prácticas](/observatorio/guias/documentacion-buenas-practicas-ia/) ofrece la plantilla para capturarlas.

## Lecturas relacionadas

La [guía de integración curricular de IA](/ia-educacion/guias/integracion-curricular-ia/) extiende los flujos al nivel de programa académico; los [lineamientos éticos](/ia-educacion/guias/lineamientos-eticos-ia/) sostienen los criterios que cruzan los tres flujos; la [transparencia algorítmica en el aula](/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula/) detalla cómo hacer visibles las decisiones de cada paso.

## Referencias

UNESCO. (2023). *Guidance for generative AI in education and research*. UNESCO. https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research

Wiggins, G., & McTighe, J. (2005). *Understanding by design* (2nd ed.). ASCD.
