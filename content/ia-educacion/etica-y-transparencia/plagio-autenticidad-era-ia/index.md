---
title: "Plagio y autenticidad académica en la era de la IA"
date: 2026-04-22
draft: false
description: "La noción tradicional de plagio no alcanza para describir la co-producción con IA. Propuesta para desplazar el foco del producto a la trazabilidad del proceso y a la autoría documentada."
summary: "Del plagio como copia al post-plagio como opacidad: autenticidad académica definida por trazabilidad, no por ausencia de asistencia."
tags: ["plagio", "integridad-academica", "autenticidad", "trazabilidad", "autoria"]
categories: ["guia"]
areas: ["ia", "evaluacion", "pedagogia"]

showHero: true
heroStyle: "background"
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
weight: 3
---

{{< lead >}}
El concepto de plagio se construyó para un régimen de autoría individual donde el producto textual era la evidencia principal del trabajo intelectual. La IA generativa ha vuelto insuficiente ese encuadre. Esta guía propone desplazar el foco del producto hacia la **trazabilidad del proceso**, y redefinir la autenticidad académica como autoría documentada, no como ausencia de asistencia.
{{< /lead >}}

## Por qué la noción tradicional no alcanza

El plagio, tal como se definió en los manuales académicos del siglo XX, describe una operación nítida: copiar un texto ajeno y presentarlo como propio. La asistencia con IA generativa no encaja en esa definición. El estudiante que trabaja con Claude Opus 4.6 o DeepSeek-V3.1 no copia un texto preexistente; produce uno nuevo en diálogo con un modelo que sintetiza datos de entrenamiento sin que exista una fuente identificable. La operación no es "copia con ocultamiento" sino "co-producción sin declaración".

Eaton (2023) propuso llamar a esta situación **post-plagio**: un régimen donde la frontera entre autoría humana y asistencia técnica se difumina, y la pregunta central deja de ser "¿quién escribió esto?" para volverse "¿qué parte del proceso es rastreable?". La consecuencia práctica es doble. Primero, los detectores automáticos de IA pierden utilidad como árbitros. Segundo, la evaluación académica necesita evidencia distinta a la que históricamente recolectó.

Bearman et al. (2024) documentan el mismo desplazamiento desde la teoría de la evaluación: el juicio evaluativo — la capacidad del estudiante de valorar su propio trabajo y el de otros — es el objeto formativo que la IA vuelve más necesario y simultáneamente más difícil de evaluar si el docente solo mira el producto final.

## Del producto a la trazabilidad

Si la autenticidad ya no puede inferirse del producto, debe derivarse del proceso. La evidencia relevante se mueve hacia cuatro artefactos:

- **La bitácora de prompts**, donde el estudiante registra las consultas hechas al modelo y las respuestas recibidas.
- **El diario de decisiones**, donde documenta qué sugerencias aceptó, cuáles descartó y por qué.
- **Las versiones sucesivas del trabajo**, con fechas que evidencien el ritmo del proceso.
- **La declaración de uso**, con modelo, versión y extensión del empleo, en la portada del entregable.

Ninguno de estos artefactos es nuevo en la pedagogía universitaria. El portafolio iterativo, el versionado y la memoria de proceso existen desde hace décadas en la enseñanza de la escritura y en el diseño. La novedad es que dejan de ser una pedagogía optativa para volverse la evidencia primaria de autenticidad (Dawson, 2020).

{{< mermaid >}}
flowchart LR
    A[Consulta al modelo] --> B[Respuesta del modelo]
    B --> C{Decisión del estudiante}
    C -->|Acepta| D[Incorpora con ajustes]
    C -->|Rechaza| E[Documenta por qué]
    D --> F[Nueva versión del trabajo]
    E --> F
    F --> G[Entrega + bitácora + declaración]
{{< /mermaid >}}

El foco evaluativo se desplaza del nodo final (la entrega) al recorrido completo (las aristas del flujo). El producto sigue evaluándose, pero ya no en aislamiento.

## Autenticidad como categoría procesual

Perkins (2023) define la autenticidad académica en la era de la IA como la correspondencia entre lo que el estudiante declara haber hecho y lo que efectivamente puede explicar y reconstruir. Un trabajo es auténtico si el estudiante puede dar cuenta de sus decisiones en una conversación oral posterior. Un trabajo inauténtico es aquel cuyo autor nominal no puede reconstruir su propio razonamiento.

Esta definición tiene tres consecuencias operativas.

La primera: la **evaluación dialogada** recupera centralidad. Diez minutos de conversación con el estudiante sobre cómo llegó a su conclusión ofrecen evidencia de autenticidad que ningún detector automatizado iguala.

La segunda: el **conocimiento del dominio** sigue siendo el mejor antídoto contra el uso opaco. Un estudiante que entiende la materia articula sus decisiones de consulta al modelo con criterio; uno que no la entiende delega sin discriminar. La asistencia con IA no sustituye el aprendizaje; amplifica lo que ya hay.

La tercera: la **cohesión del proceso** importa tanto como la calidad del producto. Un trabajo brillante sin bitácora, sin versiones y sin capacidad de explicación oral es, bajo este marco, menos auténtico que un trabajo modesto con evidencia completa del recorrido.

## Los detectores de IA no resuelven el problema

Los detectores automáticos (GPTZero, Turnitin AI Detection, Copyleaks y similares) prometen identificar texto generado por modelos. La evidencia acumulada en los últimos dos años muestra tres problemas sistemáticos (Fleckenstein et al., 2024; Weber-Wulff et al., 2023):

- **Falsos positivos asimétricos**: los textos escritos por estudiantes cuya primera lengua no es el inglés son clasificados con más frecuencia como generados por IA, incluso cuando no lo son. Liang et al. (2023) mostraron tasas de error superiores al 60 % en ensayos de estudiantes no anglófonos.
- **Falsos negativos triviales**: pequeñas ediciones manuales o reescrituras con Claude hacen que un texto previamente detectado como generado pase como humano.
- **Opacidad del criterio**: los detectores no explican por qué clasificaron un texto como generado, por lo que su veredicto no es debatible en un procedimiento académico serio.

Adoptar un detector como autoridad en un procedimiento de integridad académica traslada la carga de la prueba a un algoritmo opaco y sesgado contra los estudiantes más vulnerables. El marco propuesto aquí prescinde del detector y desplaza la evaluación a la trazabilidad declarada y verificable.

## Tres casos para ordenar el criterio

### Caso 1. Co-redacción asistida declarada

Una estudiante usa Gemini 2.5 Pro para reformular párrafos de transición en un ensayo de metodología. Declara el uso en la portada, entrega bitácora con los prompts y decisiones, y puede explicar oralmente cada elección de reformulación. El modelo nunca redactó los argumentos; redactó conectores entre argumentos que la estudiante escribió.

Resolución: no hay problema de autenticidad. La estudiante es autora del argumento y del criterio de edición; la IA fue un asistente de estilo declarado. Esta situación es indistinguible, en términos éticos, del trabajo con un servicio humano de edición, con la diferencia de que la IA deja trazabilidad completa.

### Caso 2. Falso positivo del detector

Un estudiante entrega un ensayo que el detector institucional clasifica como 87 % generado por IA. El estudiante presenta la bitácora de versiones, explica el proceso de redacción en una conversación oral y muestra los documentos de trabajo. Su primera lengua no es el inglés y el ensayo está redactado en un registro académico formal.

Resolución: el detector no es evidencia suficiente para sostener una acusación. La bitácora, las versiones y la capacidad de explicación oral son evidencia más confiable que el puntaje del detector (Weber-Wulff et al., 2023). El procedimiento de integridad académica debe prever esta asimetría de evidencias.

### Caso 3. Traducción al español con IA

Un estudiante redacta su ensayo en inglés y lo traduce al español con DeepSeek-V3.1 para entregarlo. Declara el uso. La cuestión: ¿es plagio?

Resolución: no lo es si la declaración es explícita y el contenido argumentativo es suyo. Es, en rigor, una forma de asistencia lingüística equivalente a usar un diccionario bilingüe, solo que mucho más potente. El criterio docente puede admitirlo, prohibirlo o exigir entrega bilingüe, pero esa decisión corresponde al diseño de la asignatura, no a una categoría universal de plagio.

## Protocolo de aula en cuatro pasos

Un protocolo operativo para implementar este marco en una asignatura universitaria.

1. **Acuerdo inicial**. En la primera sesión, el docente declara qué usos de IA permite, cuáles exige que se declaren y cuáles excluye. El acuerdo queda en el syllabus y el estudiante lo firma. Cotton et al. (2024) muestran que la ausencia de acuerdos explícitos es la primera causa de conflictos sobre integridad.
2. **Instrumentos obligatorios**. La bitácora de prompts, las versiones sucesivas y la declaración de uso son parte del entregable, no anexos optativos. Se evalúan con peso específico en la rúbrica.
3. **Evaluación dialogada**. Al cierre de cada entrega de alto peso, el docente conversa diez minutos con cada estudiante sobre su proceso. La conversación produce una nota adicional y constituye la evidencia principal de autenticidad.
4. **Procedimiento en caso de duda**. Si el docente sospecha opacidad, convoca al estudiante a una conversación extendida basada en la bitácora. El detector automático, si se usa, es referencia secundaria y nunca prueba única.

## Conexiones con el resto del sitio

El desplazamiento hacia la evidencia procesual se operativiza en la [guía de evaluación formativa con IA]({{< ref "/ia-educacion/guias/evaluacion-formativa-ia" >}}), que describe ciclos de retroalimentación iterativa compatibles con este marco. La capacidad de diálogo crítico con el modelo que la evaluación dialogada evalúa se cultiva con la [práctica de análisis crítico de sesgos]({{< ref "/laboratorio/practicas/analisis-critico-de-sesgos-en-ia" >}}) y con la [alfabetización crítica en IA]({{< ref "/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia" >}}). El marco ético institucional que sostiene estas decisiones está formulado en la guía de [marco ético para el uso de IA en educación superior]({{< ref "/ia-educacion/etica-y-transparencia/marco-etico-ia-educacion-superior" >}}).

## Cierre

Plagio dejó de ser una categoría útil para lo que hoy ocurre en el aula. La autenticidad académica, en cambio, sí lo es: describe una propiedad del proceso (trazabilidad y capacidad de reconstrucción) que se puede diseñar, documentar y evaluar. El desplazamiento del producto al proceso no relaja la exigencia; la vuelve pertinente al contexto actual. La universidad que aplica ese desplazamiento con seriedad produce estudiantes que saben trabajar con IA sin perder el hilo de su propio razonamiento.

## Referencias

- Bearman, M., Tai, J., Dawson, P., Boud, D., & Ajjawi, R. (2024). Developing evaluative judgement for a time of generative artificial intelligence. *Assessment & Evaluation in Higher Education*, 49(6), 893–905. https://doi.org/10.1080/02602938.2024.2335321
- Cotton, D. R. E., Cotton, P. A., & Shipway, J. R. (2024). Chatting and cheating: Ensuring academic integrity in the era of ChatGPT. *Innovations in Education and Teaching International*, 61(2), 228–239. https://doi.org/10.1080/14703297.2023.2190148
- Dawson, P. (2020). *Defending assessment security in a digital world: Preventing e-cheating and supporting academic integrity in higher education*. Routledge. https://doi.org/10.4324/9780429324178
- Eaton, S. E. (2023). Postplagiarism: Transdisciplinary ethics and integrity in the age of artificial intelligence and neurotechnology. *International Journal for Educational Integrity*, 19, 23. https://doi.org/10.1007/s40979-023-00144-1
- Fleckenstein, J., Meyer, J., Jansen, T., Keller, S. D., Köller, O., & Möller, J. (2024). Do teachers spot AI? Evaluating the detectability of AI-generated texts among student essays. *Computers and Education: Artificial Intelligence*, 6, 100209. https://doi.org/10.1016/j.caeai.2024.100209
- Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. *Patterns*, 4(7), 100779. https://doi.org/10.1016/j.patter.2023.100779
- Perkins, M. (2023). Academic integrity considerations of AI large language models in the post-pandemic era: ChatGPT and beyond. *Journal of University Teaching and Learning Practice*, 20(2), 07. https://doi.org/10.53761/1.20.02.07
- Weber-Wulff, D., Anohina-Naumeca, A., Bjelobaba, S., Foltýnek, T., Guerrero-Dib, J., Popoola, O., Šigut, P., & Waddington, L. (2023). Testing of detection tools for AI-generated text. *International Journal for Educational Integrity*, 19, 26. https://doi.org/10.1007/s40979-023-00146-z
