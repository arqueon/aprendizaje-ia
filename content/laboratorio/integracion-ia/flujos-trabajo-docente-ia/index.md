---
title: "Sigue uno de tres flujos docentes con IA y marca dónde decides tú"
date: 2026-04-26
draft: false
description: "Elige uno de tres flujos (planear una sesión, retroalimentar un trabajo, diseñar una evaluación), recórrelo con un caso tuyo y anota dónde te desvías del diagrama. Sales con el flujo adaptado a tu materia para compartir con tu academia."
summary: "Diagramas Mermaid de tres procesos docentes recurrentes, con puntos de decisión humana visibles. Pensados para que coordinaciones académicas estandaricen criterios sin uniformar prácticas."
tags: ["flujos de trabajo", "Mermaid", "diagramas", "procesos docentes", "protocolos"]
categories: ["guia"]
areas: ["ia", "pedagogia", "digital"]

weight: 1
showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
---

{{< contrato quien="Docentes que ya usan IA para preparar clases, comentar trabajos o armar exámenes, y no tienen claro en qué paso deciden ellos y en cuál delegan." haras="Vas a elegir uno de los tres flujos (planear una sesión, retroalimentar un trabajo, diseñar una evaluación), recorrerlo con un caso tuyo de esta semana y anotar en qué pasos te desvías del diagrama y por qué." tendras="Un flujo adaptado a tu materia con tus desviaciones anotadas (por ejemplo: «Flujo 1, paso C: en química la IA no maneja bien la notación, así que las tres estructuras las propongo yo y la IA sólo entra en G, con ejemplos cotidianos»). Es la hoja que compartes con tu academia." tarda="Quince minutos para leer el caso y los tres diagramas; treinta para recorrer un flujo con un caso tuyo." ejemplo="Abajo está el caso de Andrés, de Química general, ya resuelto sobre el flujo 1: qué pasos siguió tal cual y en cuáles se desvió. Léelo antes de elegir tu flujo." >}}

## El caso de Andrés, ya resuelto

Andrés da Química general y quería preparar la sesión de equilibrio químico con el flujo 1. Recorrió el diagrama con esa sesión y anotó tres cosas:

| Paso del flujo 1 | Qué hizo Andrés |
|---|---|
| A y B (aprendizaje esperado y nivel de Bloom) | Los escribió él: «predecir hacia dónde se desplaza un equilibrio al cambiar la presión», nivel aplicar. |
| C (la IA propone tres estructuras de sesión) | Se desvió: la IA proponía estructuras con ecuaciones mal escritas. Las tres estructuras las propuso él y saltó a G. |
| G y H (la IA propone ejemplos; ¿son pertinentes?) | Aceptó dos ejemplos cotidianos (la olla de presión, el refresco al abrirse) y descartó uno con datos inventados. |

Su hoja para la academia dice: «Flujo 1 sirve para química con una desviación: el paso C lo hago yo; la IA entra sólo en G». Esa hoja de un flujo con sus desviaciones anotadas es lo que esta página te pide producir.

## Por qué diagramar los flujos

Los principios sobre uso de IA en docencia abundan; los flujos operativos —*qué hago primero, qué después, dónde decido*— escasean. Esta página presenta tres flujos en diagramas, con los puntos de decisión humana visibles, para que cualquier docente pueda usarlos como referencia, modificarlos para su asignatura y compartirlos con colegas para acordar qué pasos nadie delega (por ejemplo, la lectura inicial sin IA del flujo 2).

Tres reglas que cruzan los tres flujos:

- **Cada paso indica qué actor lo ejecuta.** Docente, IA o estudiante. La distinción importa: cuando un paso recae en la IA, el docente sigue siendo responsable del resultado, pero el flujo lo declara explícitamente.
- **Los puntos de decisión humana son obligatorios.** Cada flujo incluye al menos dos rombos donde el docente decide; sin esa decisión, el proceso no avanza.
- **Lo que sale del flujo es replicable.** Otro docente que siga el mismo flujo en una asignatura distinta debería producir un objeto comparable.

## Flujo 1 — Planeación de una sesión de clase

Un docente prepara una sesión sobre un tema específico. Tradicionalmente, este proceso recae enteramente en él. Con IA, parte del trabajo se redistribuye, pero el control de la dirección pedagógica permanece humano.

{{< mermaid >}}
flowchart TD
    A["<b>A</b> · Docente: definir aprendizaje esperado"] --> B["<b>B</b> · Docente: identificar <a href='/recursos/glosario/taxonomia-de-bloom/'>nivel de Bloom</a>"]
    B --> C["<b>C</b> · IA: proponer 3 estructuras de sesión"]
    C --> D{"<b>D</b> · Docente: ¿alguna se ajusta al grupo?"}
    D -- Sí --> E["<b>E</b> · Docente: seleccionar y ajustar"]
    D -- No --> F["<b>F</b> · Docente: reformular prompt"]
    F --> C
    E --> G["<b>G</b> · IA: proponer ejemplos disciplinares"]
    G --> H{"<b>H</b> · Docente: ¿son pertinentes?"}
    H -- Sí --> I["<b>I</b> · Docente: integrar con materiales propios"]
    H -- No --> J["<b>J</b> · Docente: descartar y proveer ejemplos propios"]
    J --> I
    I --> K["<b>K</b> · Docente: definir momentos de actividad estudiantil"]
    K --> L["<b>L</b> · Plan de sesión final"]
{{< /mermaid >}}

**Tres notas operativas sobre este flujo:**

- El paso A no se delega. El aprendizaje esperado es decisión del docente, alineada con el syllabus de la asignatura.
- El bucle entre D y F es donde se desarrolla la competencia de [ingeniería de prompts](/ia-educacion/guias/ingenieria-de-prompts-para-docentes/). Vale invertir tiempo aquí; ahorra tiempo después.
- El paso K no admite IA en este flujo. Diseñar momentos de actividad estudiantil exige conocer al grupo, lo que la IA no captura.

## Flujo 2 — Retroalimentación a un trabajo estudiantil

El docente recibe un borrador o entrega intermedia y produce comentarios formativos. Aquí la IA puede aportar escala, pero no debe sustituir el juicio disciplinar.

{{< mermaid >}}
flowchart TD
    A["<b>A</b> · Estudiante: entrega borrador"] --> B["<b>B</b> · Docente: lectura inicial sin IA"]
    B --> C["<b>C</b> · Docente: identificar 1-2 problemas estructurales"]
    C --> D["<b>D</b> · IA: revisar coherencia y claridad línea por línea"]
    D --> E{"<b>E</b> · Docente: ¿identifica problemas adicionales relevantes?"}
    E -- Sí --> F["<b>F</b> · Docente: integrar a comentarios"]
    E -- No --> G["<b>G</b> · Docente: descartar señalamientos no relevantes"]
    F --> H["<b>H</b> · Docente: redactar comentarios formativos finales"]
    G --> H
    H --> I["<b>I</b> · Docente: revisar tono y especificidad"]
    I --> J["<b>J</b> · Comentarios entregados al estudiante"]
    J --> K["<b>K</b> · Estudiante: producir versión revisada"]
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
    A["<b>A</b> · Docente: revisar aprendizajes esperados de la unidad"] --> B["<b>B</b> · Docente: definir qué entregará el estudiante"]
    B --> C{"<b>C</b> · Docente: ¿ese entregable se sostiene si el estudiante usa IA?"}
    C -- No --> D["<b>D</b> · Docente: rediseñar el entregable con contexto local o defensa oral"]
    C -- Sí --> E["<b>E</b> · Docente: borrador inicial de la instrucción"]
    D --> E
    E --> F["<b>F</b> · IA: proponer 2 variantes equivalentes"]
    F --> G{"<b>G</b> · Docente: ¿las variantes mantienen el mismo <a href='/recursos/glosario/taxonomia-de-bloom/'>nivel de Bloom</a>?"}
    G -- No --> H["<b>H</b> · Docente: reformular la instrucción o los prompts"]
    H --> F
    G -- Sí --> I["<b>I</b> · Docente: redactar rúbrica con filas de proceso"]
    I --> J["<b>J</b> · IA: revisar rúbrica para detectar ambigüedades"]
    J --> K["<b>K</b> · Docente: ajustar rúbrica final"]
    K --> L["<b>L</b> · Evaluación lista para aplicar"]
{{< /mermaid >}}

**Tres notas operativas sobre este flujo:**

- El rombo C es decisivo. Si lo que entregan (un ensayo, un informe) puede salir entero de una IA, hay que rediseñarlo. Esta lógica conecta con la [guía de integración curricular de IA](/ia-educacion/guias/integracion-curricular-ia/).
- Las variantes en F sirven para ofrecer evaluaciones equivalentes a estudiantes con condiciones particulares (recursamiento, aplazamiento) sin perder validez.
- El paso I —rúbrica con filas de proceso (versiones, decisiones registradas)— es lo que distingue una evaluación que sigue siendo válida con IA presente de una que no. Ver el [post sobre IA generativa y evaluación auténtica](/blog/ia-generativa-evaluacion-autentica/) para el marco.

## Cómo adaptar los flujos

Los tres diagramas son referencia, no plantilla rígida. Haz lo que hizo Andrés: elige un flujo, recórrelo con un caso tuyo de esta semana y anota en una hoja cada paso donde te desvías y por qué. Tres orientaciones para esa hoja:

{{< proceso >}}
  {{< paso titulo="Identifica dónde la IA aporta poco" >}}
  Cada disciplina tiene puntos donde la IA no es útil; el flujo debe respetarlos. Por ejemplo, en disciplinas con notación específica —matemáticas formales, química o partituras—, los pasos de generación pueden requerir más tiempo de docente que de IA.
  {{< /paso >}}
  {{< paso titulo="Documenta las desviaciones" >}}
  Cuando un docente se aparta del diagrama, conviene registrarlo. Las desviaciones repetidas sugieren que el flujo necesita revisarse.
  {{< /paso >}}
  {{< paso titulo="Comparte las versiones adaptadas" >}}
  Si una academia adopta variantes de estos flujos, el repositorio comparativo —en una carpeta institucional accesible— sostiene el aprendizaje colectivo. La [guía de documentación de buenas prácticas](/observatorio/guias/documentacion-buenas-practicas-ia/) ofrece la plantilla para capturarlas.
  {{< /paso >}}
{{< /proceso >}}

## Lecturas relacionadas

La [guía de integración curricular de IA](/ia-educacion/guias/integracion-curricular-ia/) extiende los flujos al nivel de programa académico; los [lineamientos éticos](/ia-educacion/guias/lineamientos-eticos-ia/) sostienen las reglas que cruzan los tres flujos; la [transparencia algorítmica en el aula](/ia-educacion/etica-y-transparencia/transparencia-algoritmica-aula/) detalla cómo hacer visibles las decisiones de cada paso.

{{< referencias >}}
UNESCO. (2023). *Guidance for generative AI in education and research*. UNESCO. <https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research>

Wiggins, G., & McTighe, J. (2005). *Understanding by design* (2nd ed.). ASCD.
{{< /referencias >}}
