---
title: "Marco ético para el uso de IA en educación superior"
date: 2026-04-22
draft: false
description: "Cuatro ejes operativos — autonomía del aprendiz, transparencia, justicia epistémica y responsabilidad compartida — para ordenar decisiones docentes sobre IA generativa en la universidad."
summary: "Un marco de cuatro ejes que traduce los principios internacionales sobre IA en educación a decisiones operativas para la docencia universitaria."
tags: ["etica-ia", "marco-etico", "politica-educativa", "docencia-universitaria", "gobernanza"]
categories: ["guia"]
areas: ["ia", "pedagogia", "formacion"]

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
Los principios internacionales sobre IA en educación son abundantes, pero su traducción a decisiones docentes sigue siendo escasa. Este marco propone cuatro ejes operativos — autonomía, transparencia, justicia epistémica y responsabilidad compartida — para orientar acuerdos de aula, diseños de syllabus y políticas de programa sin inmovilizar la práctica.
{{< /lead >}}

## Por qué un marco, no un reglamento

La primera tentación institucional frente a la IA generativa es redactar un reglamento que enumere usos permitidos y prohibidos. La práctica docente demuestra que esa estrategia envejece en semanas: las herramientas mutan, las prácticas estudiantiles se adelantan y el listado se vuelve obsoleto antes de publicarse (Williamson & Eynon, 2020). Un marco ético, en cambio, define los criterios con los que cada docente toma decisiones en su contexto, y soporta el ritmo del cambio tecnológico sin reescribirse cada semestre.

La UNESCO (2023) formuló la primera guía internacional sobre IA generativa en educación con esta lógica: no prescribir herramientas, sino fijar principios que cada institución adapta a sus condiciones. El Russell Group (2023) en el Reino Unido avanzó en la misma dirección con cinco principios comunes para sus universidades. La Comisión Europea (2022) hizo lo propio con lineamientos éticos para docentes. El patrón es claro: los cuerpos internacionales producen marcos, no reglamentos.

Este marco parte del mismo supuesto y añade una capa que los referentes internacionales tratan con menos detalle: la **decisión docente concreta**. Un principio como "transparencia" no se opera solo; requiere acuerdos de aula, rúbricas y contratos didácticos que lo conviertan en práctica.

## Cuatro ejes operativos

Los ejes no son independientes entre sí: se tensionan. Una exigencia máxima de transparencia puede erosionar la autonomía del aprendiz si lo obliga a reportar cada consulta. Una insistencia estricta en justicia epistémica puede entrar en conflicto con responsabilidades individuales. El marco no resuelve esas tensiones de antemano; las hace visibles para que el docente decida en cada caso.

{{< mermaid >}}
flowchart TB
    A[Autonomía del aprendiz] --- B[Transparencia y rendición de cuentas]
    B --- C[Justicia epistémica e inclusión]
    C --- D[Responsabilidad compartida]
    D --- A
    E[Decisión docente en contexto] --- A
    E --- B
    E --- C
    E --- D
{{< /mermaid >}}

### Eje 1. Autonomía del aprendiz

La IA no debe reducir la capacidad del estudiante de pensar, decidir y producir por sí mismo. Lodge y Loble (2026) documentan el fenómeno de la **descarga cognitiva** (*cognitive offloading*): cuando el estudiante delega habitualmente el esfuerzo mental al modelo, pierde la práctica de las operaciones que dan lugar al aprendizaje. La autonomía, entonces, no es una aspiración retórica; es un bien que la docencia protege activamente.

Operativamente, este eje se traduce en decisiones como:

- Diseñar actividades donde la IA retroalimenta borradores, pero el estudiante escribe la versión final sin asistencia.
- Pedir reflexiones metacognitivas donde el estudiante explicita qué partes del proceso delegó y qué mantuvo bajo su control.
- Introducir momentos "sin IA" en el ciclo de aprendizaje, no por nostalgia, sino para ejercitar operaciones que la tecnología tiende a absorber.

Este eje enlaza con la discusión sobre [alfabetización crítica en IA]({{< ref "/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia" >}}): ambos coinciden en que la competencia central es la capacidad de **decidir cuándo no usar la herramienta**.

### Eje 2. Transparencia y rendición de cuentas

El uso de IA debe ser documentable. No por vigilancia punitiva, sino porque el proceso de decidir cuándo, para qué y cómo usar un modelo es, en sí mismo, un objeto de aprendizaje (Bearman et al., 2024). La transparencia funciona en dos direcciones: del estudiante hacia el docente y del docente hacia el estudiante. El docente también declara cuándo usa IA en materiales de clase, retroalimentación o rúbricas.

La transparencia se operacionaliza con instrumentos concretos:

- **Bitácora del proceso**: el estudiante registra sus prompts, las respuestas y las decisiones tomadas sobre cada una.
- **Declaración de uso en la portada del trabajo**: modelo utilizado (por ejemplo, Claude Opus 4.6, Gemini 2.5 Pro, DeepSeek-V3.1 o Kimi K2), versión, fechas y extensión del uso.
- **Documentación de rechazos**: qué sugerencias del modelo se descartaron y por qué.

La rendición de cuentas no se reduce a declarar el uso. Incluye responder por los resultados: el estudiante que publicó una cita inventada por el modelo responde por esa cita, no el modelo.

### Eje 3. Justicia epistémica e inclusión

Los modelos generativos no son neutros. Heredan sesgos de sus datos de entrenamiento y los reproducen en las respuestas: subrepresentan voces del sur global, privilegian el inglés académico, simplifican cuerpos teóricos complejos y, con frecuencia, tratan la norma anglosajona como universal (Bender et al., 2021). Un marco ético para la educación superior en México debe anticipar estos sesgos, no por activismo, sino por compromiso con la calidad de la formación.

Adicionalmente, el acceso a los modelos de mejor desempeño suele requerir suscripción o tarjeta de crédito internacional. Un diseño pedagógico que da por hecho ese acceso produce una desigualdad de partida: los estudiantes con recursos iteran sus borradores con Claude Opus o Gemini 2.5 Pro; los demás con la versión gratuita de turno. El Banco Mundial (2024) señaló esta brecha como uno de los riesgos principales de la integración apresurada de IA en universidades públicas latinoamericanas.

Decisiones operativas:

- Comparar sistemáticamente las respuestas de al menos dos modelos distintos (por ejemplo, Claude y DeepSeek, o Gemini y Qwen) para hacer visible la variabilidad.
- Documentar en voz alta qué voces no aparecen en la respuesta del modelo (autores no anglófonos, perspectivas indígenas, literatura reciente en español).
- Proveer acceso institucional a herramientas de pago cuando la actividad lo requiera, o diseñar actividades que funcionen con herramientas gratuitas.

### Eje 4. Responsabilidad compartida

Ni el estudiante es el único responsable del mal uso, ni la institución lo es del buen uso. La responsabilidad se distribuye: el proveedor del modelo, la institución que lo adopta, el docente que lo integra al diseño del curso y el estudiante que lo usa en su trabajo. El marco vuelve visible esa distribución para evitar que la culpa migre siempre al eslabón más débil.

La OECD (2023) propuso una taxonomía útil: la institución responde por gobernanza, formación docente y acuerdos marco; el docente responde por diseño instruccional y criterios de evaluación; el estudiante responde por autenticidad del trabajo y documentación del proceso. Ninguno puede transferir su parte a otro.

## De principios a decisiones docentes

Los cuatro ejes se concretan en cuatro preguntas que el docente responde al diseñar una asignatura.

| Pregunta | Decisión | Ejemplo |
| --- | --- | --- |
| ¿Qué se enseña a hacer con IA? | Competencia a desarrollar | Evaluar críticamente una respuesta generativa |
| ¿Qué se evalúa y cómo? | Tipo de evidencia | Bitácora de proceso + producto final |
| ¿Qué se reporta? | Instrumento de transparencia | Declaración en portada + anexo de prompts |
| ¿Qué se excluye del uso asistido? | Alcance explícito | Examen diagnóstico inicial sin IA |

Responder las cuatro preguntas al inicio del semestre evita que las decisiones se tomen bajo presión cuando surge el primer conflicto.

## Dilemas recurrentes

Tres casos que aparecen repetidamente en consultas docentes, resueltos desde el marco.

### Dictar una sección entera al modelo

Un estudiante dicta a Claude Opus 4.6 los puntos principales de un argumento y pide al modelo que redacte los párrafos de transición. Entrega el texto como propio. ¿Es plagio?

Desde el eje de autonomía, el estudiante sí mantuvo el control del argumento (él dictó la lógica). Desde el eje de transparencia, la pregunta clave es si declaró el uso. Si lo hizo y el docente permitió explícitamente esta operación, no es plagio; es co-producción declarada. Si no lo hizo, es opacidad deliberada. El marco convierte la pregunta "¿plagió?" en "¿fue transparente?" (Eaton, 2023).

### Estudiante sin acceso a modelos de pago

Una actividad exige iterar un borrador tres veces con retroalimentación de Claude Opus. Tres estudiantes del grupo no tienen acceso a la versión de pago. ¿Se ajusta la actividad?

Desde el eje de justicia epistémica, sí. La actividad se rediseña para funcionar con DeepSeek-V3.1 o Qwen, modelos de desempeño comparable con acceso gratuito, o la institución provee licencias. Prolongar una actividad que produce desigualdad estructural contradice el eje 3 aunque mejore la pedagogía del eje 1.

### Docente que califica con IA sin declararlo

Un docente pega los ensayos de sus estudiantes en Gemini 2.5 Pro y usa las sugerencias del modelo como retroalimentación, sin declararlo. ¿Qué problemas plantea?

El eje de transparencia se rompe de inmediato. El docente exige al estudiante declarar sus usos, pero oculta los propios. El eje de justicia también: los ensayos de los estudiantes pueden quedar alojados en la infraestructura del proveedor del modelo. Y el eje de responsabilidad: si el modelo retroalimenta una cita inexistente como válida, el estudiante recibe información errónea cuya fuente es opaca. Este caso no se resuelve prohibiendo el uso docente de IA; se resuelve operando los cuatro ejes también del lado del docente.

## Matriz de riesgos

Para priorizar en el diseño de política institucional, una matriz cruzada entre eje afectado y actor que responde.

| Riesgo | Eje afectado | Actor que responde | Señal temprana |
| --- | --- | --- | --- |
| Descarga cognitiva sostenida | Autonomía | Docente, estudiante | Caída de desempeño en tareas sin asistencia |
| Entrega opaca de trabajos generados | Transparencia | Estudiante | Inconsistencia entre borrador y producto final |
| Asimetría de acceso | Justicia | Institución | Dispersión de resultados no explicada por esfuerzo |
| Filtración de datos estudiantiles a proveedores | Responsabilidad | Institución, docente | Uso no documentado de modelos en calificación |
| Reproducción de sesgos sin contraste | Justicia | Docente | Respuestas del modelo aceptadas sin crítica |

## Implementación institucional

El marco no se queda en la página si no se integra en tres instrumentos.

Primero, el **syllabus**. Cada asignatura declara sus acuerdos sobre IA: qué se permite, qué se espera que se declare, qué se excluye y cómo se evaluará el proceso. La [guía sobre evaluación formativa con IA]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}) ofrece plantillas para hacerlo.

Segundo, el **programa de formación docente**. Sin formación, los cuatro ejes se vuelven consignas. La sección de [Formación docente]({{< ref "/formacion-docente" >}}) aborda las competencias mínimas que requiere operar este marco.

Tercero, los **espacios colegiados**. Los dilemas no se resuelven individualmente: requieren comunidades de práctica donde los docentes contrastan criterios. La UNESCO (2023) insiste en este punto como condición de viabilidad. Sin espacios colegiados, cada docente construye su propio marco y la experiencia del estudiante pierde coherencia de un curso a otro.

## Cierre

La pregunta relevante no es si la IA generativa es compatible con la educación superior. Está instalada, y seguirá estándolo. La pregunta es con qué criterios la universidad acompaña su uso. Los cuatro ejes propuestos — autonomía, transparencia, justicia epistémica y responsabilidad compartida — no son un listado exhaustivo: son el mínimo común sobre el que construir acuerdos situados, revisables y operativos. Lo demás es decisión docente en contexto.

## Referencias

- Bearman, M., Tai, J., Dawson, P., Boud, D., & Ajjawi, R. (2024). Developing evaluative judgement for a time of generative artificial intelligence. *Assessment & Evaluation in Higher Education*, 49(6), 893–905. https://doi.org/10.1080/02602938.2024.2335321
- Bender, E. M., Gebru, T., McMillan-Major, A., & Shmitchell, S. (2021). On the dangers of stochastic parrots: Can language models be too big? *Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency*, 610–623. https://doi.org/10.1145/3442188.3445922
- European Commission. (2022). *Ethical guidelines on the use of artificial intelligence and data in teaching and learning for educators*. Publications Office of the European Union. https://data.europa.eu/doi/10.2766/153756
- Eaton, S. E. (2023). Postplagiarism: Transdisciplinary ethics and integrity in the age of artificial intelligence and neurotechnology. *International Journal for Educational Integrity*, 19, 23. https://doi.org/10.1007/s40979-023-00144-1
- Lodge, J. M., & Loble, L. (2026). *Artificial intelligence, cognitive offloading and implications for education*. University of Technology Sydney.
- OECD. (2023). *OECD digital education outlook 2023: Towards an effective digital education ecosystem*. OECD Publishing. https://doi.org/10.1787/c74f03de-en
- Russell Group. (2023). *Russell Group principles on the use of generative AI tools in education*. https://russellgroup.ac.uk/media/6137/rg_ai_principles-final.pdf
- UNESCO. (2023). *Guidance for generative AI in education and research*. United Nations Educational, Scientific and Cultural Organization. https://doi.org/10.54675/EWZM9535
- Williamson, B., & Eynon, R. (2020). Historical threads, missing links, and future directions in AI in education. *Learning, Media and Technology*, 45(3), 223–235. https://doi.org/10.1080/17439884.2020.1798995
- World Bank. (2024). *Unlocking the potential of generative AI in education: Opportunities, risks, and policy priorities*. World Bank Group. https://documents.worldbank.org/en/publication/documents-reports/documentdetail/099062024145080589
