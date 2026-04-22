---
title: "Repositorio de prompts para docentes: banco curado por fase pedagógica"
date: 2026-04-22
draft: false
description: "Banco curado de prompts para docencia universitaria organizado por fase pedagógica: diseño de actividad, evaluación formativa, retroalimentación y rúbricas, con plantillas listas para adaptar en Claude, Gemini y DeepSeek."
summary: "Cuatro plantillas verificadas, un criterio de curaduría y ejemplos funcionales para que el docente universitario no empiece cada prompt desde cero."
tags: ["prompts", "plantillas", "evaluacion-formativa", "retroalimentacion", "diseno-instruccional"]
categories: ["recurso-institucional"]
areas: ["ia", "formacion", "pedagogia", "evaluacion"]

showHero: true
heroStyle: "background"
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
weight: 2
---

{{< lead >}}
Un prompt bien escrito ahorra horas de iteración y mejora la calidad del resultado. Este repositorio reúne plantillas verificadas para las cuatro fases pedagógicas más frecuentes en docencia universitaria, con ejemplos funcionales en Claude, Gemini y DeepSeek.
{{< /lead >}}

## Por qué un repositorio y no una lista de ejemplos

Los bancos de prompts que circulan en redes tienden a un mismo problema: acumulan ejemplos sin criterio. Un docente que los consulta encuentra cien prompts para "hacer actividades con IA" y ninguna forma de decidir cuál adaptar a su curso. La cantidad no compensa la falta de estructura.

Este repositorio se organiza por **fase pedagógica**, no por herramienta ni por asignatura. La razón es que la decisión que toma el docente antes de escribir un prompt no es "voy a usar Claude" sino "voy a diseñar una actividad" o "voy a dar retroalimentación". El prompt sigue a la intención pedagógica, no al revés.

La base conceptual de este enfoque aparece desarrollada en la [guía de ingeniería de prompts para docentes]({{< ref "/ia-educacion/guias/ingenieria-de-prompts-para-docentes" >}}), que describe los seis componentes de un prompt efectivo. Este repositorio aplica esos componentes a casos concretos.

## Criterios de curaduría

No todo prompt útil merece entrar al repositorio. Los criterios son cuatro.

Primero, **reproducibilidad**: el prompt debe producir resultados comparables en Claude, Gemini y DeepSeek cuando se adapta mínimamente. Si funciona solo en un modelo, no es una plantilla sino una configuración puntual.

Segundo, **adaptabilidad**: la plantilla debe tener variables explícitas que el docente sustituye por su contexto (asignatura, nivel, objetivo). Un prompt hiperespecífico a una sola materia es útil para quien lo escribió, no para el repositorio.

Tercero, **documentación del proceso**: cada plantilla indica para qué fase sirve, qué insumos pide, qué devuelve y qué no hace. Los prompts sin documentación dejan el trabajo de interpretación al usuario.

Cuarto, **compatibilidad con los principios institucionales**: las plantillas respetan los [siete principios propuestos para una política de IA en la UdeG]({{< ref "/recursos/politica-ia-udeg" >}}). Los prompts que sugieren subir datos personales sin salvaguardas, o que simulan detección automática de autoría, no entran al repositorio.

## Taxonomía por fase pedagógica

Las cuatro fases cubren la mayor parte del trabajo docente con IA. No agotan todo uso posible; son el núcleo operativo.

{{< mermaid >}}
flowchart LR
    A[Fase 1<br/>Diseño de actividad] --> B[Fase 2<br/>Evaluación formativa]
    B --> C[Fase 3<br/>Retroalimentación]
    C --> D[Fase 4<br/>Rúbricas e<br/>instrumentos]
    D -.->|Ajuste<br/>iterativo| A
{{< /mermaid >}}

La flecha punteada importa: las rúbricas que se generan en la fase 4 retroalimentan el diseño de la siguiente actividad. El ciclo es espiral, no lineal.

## Plantilla 1: diseño de actividad

Esta plantilla ayuda a convertir un objetivo de aprendizaje en una actividad concreta, con producto esperado, evidencia de proceso y criterios de calidad.

### Prompt base

```text
Actúa como diseñador instruccional experimentado en educación universitaria.

CONTEXTO
- Asignatura: {{asignatura}}
- Nivel: {{licenciatura / posgrado, semestre}}
- Número aproximado de estudiantes: {{n}}
- Duración disponible: {{sesiones o semanas}}
- Recursos disponibles: {{aula física / virtual / híbrida, herramientas}}

OBJETIVO DE APRENDIZAJE
{{pegar el objetivo tal como aparece en el programa}}

ENCARGO
Propón tres variantes de actividad que aborden ese objetivo. Para cada variante,
desarrolla:
1. Consigna para el estudiante, redactada en segunda persona.
2. Producto o entregable concreto.
3. Evidencia del proceso de aprendizaje que se solicitará (bitácora, versiones,
   reflexión metacognitiva u otra).
4. Tres a cinco criterios de evaluación observables.
5. Qué usos de IA se permiten y cuáles quedan excluidos, y qué debe declarar
   el estudiante.
6. Riesgos pedagógicos previsibles y cómo mitigarlos.

RESTRICCIONES
- No propongas actividades que se resuelvan únicamente con un prompt.
- Incluye al menos una variante sin uso de IA, para contraste.
- Mantén la exigencia académica del nivel indicado.

FORMATO DE SALIDA
Tabla comparativa de las tres variantes, seguida del desarrollo detallado de cada una.
```

### Cuándo usarla

Al inicio del semestre, al planificar una unidad o al rediseñar una actividad que ya no produce aprendizajes visibles.

### Qué devuelve bien y qué no

Devuelve buenas variantes cuando el objetivo está redactado con verbo observable (analizar, comparar, diseñar). Falla cuando el objetivo es genérico ("comprender X"); en ese caso, pide primero al modelo que reformule el objetivo con criterios de especificación antes de generar las actividades.

## Plantilla 2: evaluación formativa

La plantilla 2 produce evaluaciones formativas, no sumativas. La diferencia es práctica: las primeras dan información para ajustar el aprendizaje durante el proceso; las segundas lo certifican al final. La [guía de evaluación formativa con IA]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}) desarrolla el marco.

### Prompt base

```text
Actúa como especialista en evaluación formativa en educación superior.

CONTEXTO
- Asignatura y unidad: {{asignatura, unidad temática}}
- Nivel: {{licenciatura/posgrado, semestre}}
- Momento del curso: {{inicio de unidad / mitad / cierre}}
- Tamaño del grupo: {{n}}

APRENDIZAJES CLAVE DE LA UNIDAD
{{lista de 3 a 5 aprendizajes observables}}

ENCARGO
Diseña un instrumento de evaluación formativa — no calificada — que permita
detectar en qué punto está cada estudiante respecto a esos aprendizajes,
antes de la evaluación sumativa.

Debe incluir:
1. Cinco a ocho preguntas o tareas breves, cada una asociada a un aprendizaje
   concreto de la lista.
2. Para cada ítem, indica qué patrón de respuesta revelaría comprensión,
   comprensión parcial o ausencia de comprensión.
3. Sugiere una acción docente para cada patrón (qué hacer en clase la siguiente
   semana según lo detectado).
4. Estima el tiempo de aplicación y el tiempo de análisis por parte del docente.

RESTRICCIONES
- El instrumento debe ser aplicable en veinte minutos de clase o como tarea corta.
- Evita preguntas de memoria pura; privilegia transferencia y aplicación.
- No propongas rúbricas cerradas; este instrumento informa, no califica.

FORMATO DE SALIDA
Tabla con columnas: ítem, aprendizaje asociado, patrón de respuesta esperado,
acción docente recomendada.
```

### Cuándo usarla

En la mitad de una unidad, cuando no se tiene certeza sobre el nivel real de comprensión del grupo y todavía hay tiempo de ajustar.

### Qué devuelve bien y qué no

Devuelve mejores resultados cuando los aprendizajes clave se redactan con precisión. Si se dan aprendizajes vagos, el instrumento resultante también lo será.

## Plantilla 3: retroalimentación

La retroalimentación es el uso donde la IA ahorra más tiempo al docente, siempre que el prompt evite tres trampas: elogios vacíos, correcciones genéricas y suplantación del criterio del docente.

### Prompt base

```text
Actúa como tutor académico especializado en retroalimentación formativa.

CONTEXTO
- Asignatura y unidad: {{asignatura, unidad}}
- Nivel del curso: {{licenciatura/posgrado}}
- Criterios de evaluación que aplican a este trabajo:
  {{pegar los criterios del syllabus o la rúbrica}}

TRABAJO DEL ESTUDIANTE
{{pegar el texto del estudiante entre comillas triples o adjuntar archivo}}

ENCARGO
Produce retroalimentación formativa en primera persona del docente al estudiante.
La retroalimentación debe:
1. Abrir con una observación específica de lo que el trabajo hace bien —
   con cita textual breve del propio trabajo, no elogio genérico.
2. Identificar dos o tres oportunidades de mejora, cada una con:
   a) descripción del problema,
   b) ejemplo concreto tomado del propio trabajo,
   c) sugerencia de revisión explicada, no reescritura sustitutiva.
3. Cerrar con una pregunta que invite al estudiante a pensar por sí mismo
   un aspecto del trabajo.

RESTRICCIONES
- No califiques, no asignes nota.
- No reescribas fragmentos completos del estudiante.
- No uses frases como "excelente trabajo" o "buen esfuerzo" sin soporte textual.
- Si el trabajo presenta problemas de fondo (tesis ausente, argumento circular),
  señálalos antes de los de forma.

FORMATO DE SALIDA
Texto corrido en tono profesional y respetuoso, entre 250 y 400 palabras.
```

### Cuándo usarla

Para generar una primera versión de retroalimentación que el docente revisa, ajusta y firma. No para enviar directamente al estudiante sin edición.

### Advertencia

Esta plantilla no sustituye la lectura del trabajo por parte del docente. La IA produce una retroalimentación plausible, pero el docente debe verificar que coincide con su criterio antes de entregarla. El [marco ético para el uso de IA en educación superior]({{< ref "/ia-educacion/etica-y-transparencia/marco-etico-ia-educacion-superior" >}}) desarrolla el principio de responsabilidad docente en este uso.

## Plantilla 4: rúbricas e instrumentos

Las rúbricas mal hechas son, en docencia universitaria, una fuente reconocida de inequidad: descriptores vagos, niveles mal calibrados, criterios que no corresponden al producto evaluado (Brookhart, 2018; Dawson, 2017).

### Prompt base

```text
Actúa como experto en diseño de rúbricas analíticas para educación superior.

CONTEXTO
- Asignatura y unidad: {{asignatura, unidad}}
- Nivel: {{licenciatura/posgrado}}
- Producto o desempeño a evaluar: {{descripción del producto}}
- Objetivos de aprendizaje asociados: {{lista}}

ENCARGO
Diseña una rúbrica analítica con cuatro niveles de desempeño
(insuficiente, en desarrollo, competente, avanzado) que evalúe el producto descrito.

Debe incluir:
1. Entre cuatro y seis criterios, cada uno alineado con uno o más objetivos
   de aprendizaje.
2. Descriptores concretos y observables para cada celda de la matriz.
3. Un anclaje cuantitativo por nivel solo si lo solicito explícitamente;
   en caso contrario, descriptores cualitativos.
4. Una columna adicional que indique qué evidencia se pediría al estudiante
   para cada criterio.
5. Al final, tres ejemplos breves (positivos y negativos) de cómo se vería
   cada nivel en el producto.

RESTRICCIONES
- Evita descriptores tipo "excelente" / "bueno" / "regular" sin contenido.
- Los descriptores deben poder distinguir un trabajo del nivel contiguo.
- Los criterios deben ser evaluables por un tercero leyendo el producto.

FORMATO DE SALIDA
Tabla analítica seguida de los ejemplos.
```

### Cuándo usarla

Antes de publicar la consigna de una actividad importante. La rúbrica se comparte con los estudiantes al inicio, no al final.

### Verificación cruzada

Conviene pasar la rúbrica generada por un colega o por una segunda iteración del modelo con el prompt "Encuentra criterios ambiguos o descriptores que no diferencian niveles contiguos en esta rúbrica". Las rúbricas automáticas suelen fallar en la diferenciación entre los niveles 2 y 3.

## Adaptación entre modelos: Claude, Gemini, DeepSeek

Las cuatro plantillas funcionan en los tres modelos con ajustes menores. Las diferencias son de estilo, no de estructura.

**Claude** (Anthropic) tiende a respuestas más extensas y estructuradas; responde bien al patrón "actúa como X" y a las restricciones explícitas. Si la salida es demasiado larga, añadir "máximo N palabras" al final.

**Gemini** (Google) tiende a respuestas más concisas y directas; acepta bien el formato de tabla pedido. Para retroalimentación, conviene pedirle explícitamente tono empático, que por defecto es más técnico.

**DeepSeek** (DeepSeek AI) es útil cuando hay restricciones de costo institucional; su razonamiento para rúbricas y análisis es comparable a los anteriores. Responde mejor con instrucciones en inglés o en español claro sin metáforas.

La [guía sobre qué modelo elegir para cada tarea]({{< ref "/recursos/catalogo-herramientas-ia" >}}) desarrolla la comparación con criterios de privacidad, acceso y costo.

## Qué no hace este repositorio

Tres aclaraciones.

No es un **generador automático de clases**. Las plantillas producen insumos que el docente evalúa, ajusta y firma. La decisión pedagógica sigue siendo humana.

No es un **catálogo exhaustivo**. Cubre las cuatro fases más frecuentes; hay usos legítimos (investigación docente, asesoría de tesis, análisis de datos de evaluación) que pueden incorporarse en futuras versiones.

No es **estático**. El repositorio se revisa con la misma cadencia que la política institucional: cada doce meses se añaden plantillas nuevas, se retiran las que dejaron de funcionar y se ajustan las que cambiaron de contexto.

## Cómo contribuir

El repositorio crece mejor con aportes de la comunidad docente. Un docente que ha iterado un prompt hasta un estado estable puede proponerlo para incorporación si cumple los cuatro criterios de curaduría. La [red docente del Programa de Aprendizaje Digital]({{< ref "/formacion-docente" >}}) coordina la recepción y validación de propuestas.

Los aportes incluyen: la plantilla en el formato de esta página (contexto, encargo, restricciones, formato de salida), una indicación de cuándo usarla, y al menos un ejemplo de salida generada.

## Referencias

- Brookhart, S. M. (2018). Appropriate criteria: Key to effective rubrics. *Frontiers in Education*, 3, 22. https://doi.org/10.3389/feduc.2018.00022
- Dawson, P. (2017). Assessment rubrics: Towards clearer and more replicable design, research and practice. *Assessment & Evaluation in Higher Education*, 42(3), 347–360. https://doi.org/10.1080/02602938.2015.1111294
- Kasneci, E., Sessler, K., Küchemann, S., Bannert, M., Dementieva, D., Fischer, F., Gasser, U., Groh, G., Günnemann, S., Hüllermeier, E., Krusche, S., Kutyniok, G., Michaeli, T., Nerdel, C., Pfeffer, J., Poquet, O., Sailer, M., Schmidt, A., Seidel, T., ... Kasneci, G. (2023). ChatGPT for good? On opportunities and challenges of large language models for education. *Learning and Individual Differences*, 103, 102274. https://doi.org/10.1016/j.lindif.2023.102274
- Mollick, E. R., & Mollick, L. (2023). Assigning AI: Seven approaches for students, with prompts. *The Wharton School Research Paper*. https://doi.org/10.2139/ssrn.4475995
- Perkins, M., Furze, L., Roe, J., & MacVaugh, J. (2024). The AI assessment scale (AIAS): A framework for ethical integration of generative AI in educational assessment. *Journal of University Teaching and Learning Practice*, 21(6). https://doi.org/10.53761/q3azde36
- Sabzalieva, E., & Valentini, A. (2023). *ChatGPT and artificial intelligence in higher education: Quick start guide*. UNESCO International Institute for Higher Education in Latin America and the Caribbean. https://unesdoc.unesco.org/ark:/48223/pf0000385146
