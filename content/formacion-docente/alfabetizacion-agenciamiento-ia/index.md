---
title: "Alfabetización en co-creación: aprender a co-producir con IA"
date: 2026-04-26
draft: false
description: "Una capa específica de alfabetización digital que las anteriores no cubren: aprender a sostener un acoplamiento productivo con sistemas de IA, sin colapsar en uso instrumental ni en delegación pasiva."
summary: "La co-creación humano-IA no se aprende por exposición. Esta pieza propone un marco formativo de tres niveles para que un docente desarrolle la competencia de co-producir conocimiento con un sistema algorítmico."
tags: ["co-creación", "alfabetización", "co-producción", "competencia digital", "Deleuze"]
categories: ["guia"]
areas: ["digital", "ia", "formacion"]

weight: 13
showHero: true
heroStyle: "background"
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
---

{{< lead >}}
La alfabetización digital tradicional enseña a usar las herramientas. La alfabetización crítica en IA enseña a entender los sistemas que producen las salidas. Esta pieza propone una tercera capa no cubierta por las dos anteriores: aprender a mantener una **co-creación** productiva con la IA, donde lo producido no pertenece ni sólo al humano ni sólo al modelo, sino al acoplamiento (Meshi, 2024). En su raíz teórica, esta relación está conformada por lo que Deleuze y Guattari designan un *agenciamiento* (ensamblaje); en este caso la denominamos **co-creación** por su mayor claridad.
{{< /lead >}}

## Por qué son necesarias las tres alfabetizaciones y no sólo dos

La habitual disociación entre la alfabetización operativa y la alfabetización crítica resulta adecuada para muchos artefactos digitales: aprendo a hacer funcionar Word y aprendo qué intereses son los que sostienen al producto. Para el caso de la IA generativa esa dupla de alfabetizaciones nos dejaría un vacío.

La operativa enseña a formular prompts, a comparar modelos, a enderezar las solicitudes; la crítica enseña a leer los sesgos, a comprender el modelo de negocio, a anticipar las consecuencias sociales. Ninguna de estas dos enseña lo que acontece a lo largo de la interacción: cómo mantener un diálogo con la IA donde el humano sostiene la dirección epistémica, evalúa cada salida, decide qué aceptar, qué descartar y qué transformar. Esa competencia procesual —la **co-creación**— es la que la [guía sobre la co-creación humano-IA](/ia-educacion/guias/agenciamiento-humano-ia/) describe en términos teóricos y que aquí se traduce en marco formativo.

A continuación se presenta un esquema que resume las tres literacidades, detallando lo que cada una desarrolla y cómo se construye:

| Literacidad     | Qué se desarrolla                                                                                                          | Cómo se construye                                                                                                 | Nivel de Bloom                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **Operativa**   | Dominio en el uso de la IA: formulación de instrucciones y su integración en el trabajo diario                             | A través de una práctica guiada y progresiva                                                                      | Recordar · Comprender · Aplicar |
| **Crítica**     | Comprensión de los sistemas, incluyendo sus sesgos y efectos; capacidad de discernimiento y verificación de resultados     | Mediante lectura lateral, análisis del sesgo algorítmico, y desarrollo de conciencia sociotécnica y ética         | Analizar · Evaluar              |
| **Co-creación** | Mantener el acoplamiento mientras se preserva la dirección epistémica, y decidir cuándo no emplear la IA                  | A través de un ciclo iterativo supervisado (formular, evaluar, descartar, reformular) y documentación del proceso | **Crear** (cúspide)             |

Estas literacidades no son etapas independientes sino una progresión acumulativa: cada una se basa en la anterior y culmina en la co-creación. Dicha progresión sigue la [taxonomía de Bloom](/recursos/glosario/taxonomia-de-bloom/): la literacidad operativa abarca los niveles resueltos por la IA (recordar, entender, aplicar), la crítica corresponde a analizar y evaluar, y la co-creación ocupa la **cúspide —crear—**, donde brota el nuevo conocimiento que el acoplamiento produce y el juicio humano se vuelve insustituible.

{{< mermaid >}}
flowchart LR
    A["**Operativa**<br/>usar · M1"]
    B["**Crítica**<br/>entender · M1·M2"]
    C["**Co-creación**<br/>sostener · M3·M4·M6"]
    T["M5 + evaluación<br/>del proceso<br/>(transversal)"]

    A --> B --> C
    T -.- A & B & C
    
    style A fill:#3b82f6,stroke:#2563eb,color:#ffffff
    style B fill:#6366f1,stroke:#4f46e5,color:#ffffff
    style C fill:#7c3aed,stroke:#6d28d9,color:#ffffff
    style T fill:#f0fdf4,stroke:#16a34a,color:#166534

{{< /mermaid >}}

Esta progresión es un **programa de alfabetización en IA** dirigido al profesorado y al estudiantado, dividido en seis módulos (60h): evaluación crítica y discernimiento (M1), conciencia sociotécnica y ética (M2), agencia y co-creación (M3), uso selectivo y derecho a la no-utilización (M4), adaptabilidad disciplinar (M5) y un proyecto integrador de coproducción documentada (M6). Sus contenidos están fundamentados en los principios de las tres literacidades —[operativa](/formacion-docente/alfabetizacion-operativa/), [crítica](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) y [co-creación](/formacion-docente/alfabetizacion-co-creacion/)— y desplazan la evidencia de aprendizaje hacia la [evaluación formativa del proceso](/ia-educacion/guias/evaluacion-formativa-ia/) —bitácora de decisiones, portafolio iterativo y auditoría de salidas—, donde se detallan los tres niveles que siguen.

## Tres niveles de progresión

Esta alfabetización no se obtiene leyendo. Requiere práctica guiada, retroalimentación y reflexión sostenida en el proceso. La progresión sugerida tiene tres niveles, con duración aproximada de un semestre cada uno para quien ya domine la alfabetización operativa.

### Nivel 1 — Detectar la co-creación

El primer movimiento consiste en notar que la co-creación existe. Sonará trivial, pero la mayoría de los docentes y estudiantes que usan IA hablan en términos instrumentales —"yo le pedí", "ella respondió"— como si el resultado se adjudicara a alguna de las partes. Detectar la co-creación implica reconocer que el resultado fue producto del acoplamiento: ni del humano solamente, ni del modelo solamente.

**Indicadores observables:**

- El docente narra la interacción en términos de proceso, no de transacción.
- Sabe distinguir momentos en los cuales la IA propuso algo que él no habría llegado a producir, dado su conocimiento de la materia.
- Identifica decisiones suyas que orientaron las salidas hacia un lugar específico.
- Distingue entre lo que aceptó porque lo evaluó y lo que aceptó por comodidad.

La manera de formarse es a partir de ejercicios de transcripción reflexiva. El docente conserva el diálogo completo con la IA y, al cierre de la sesión, escribe un comentario sobre qué aportó cada parte y qué decisiones tomó. De tres a cinco ejercicios por semana durante seis semanas suelen consolidar la disposición.

### Nivel 2 — Mantener la co-creación

Detectar no es igual a mantener. El segundo nivel plantea que el docente aprenda a sostener el control epistémico durante la interacción, no solo reconocerlo a posteriori. Yang y Ma (2025) proponen una clasificación de las relaciones epistémicas en la interacción humano-IA que permite nombrar qué tipo de vínculo mantiene el humano al realizar cada tarea: si actúa como autor, evaluador o curador del resultado. Hablamos de reformular prompts cuando una salida es insatisfactoria, de descartar respuestas plausibles que no cumplen el criterio del docente, o de no aceptar una salida adecuada cuando la propia exigencia pedía más.

**Indicadores observables:**

- Reformula prompts varias veces y sin frustración, hasta lograr el resultado que busca.
- Descarta respuestas plausibles cuando no responden a un criterio interno definido antes de la consulta.
- Detecta cuándo la IA sigue un patrón simple en la respuesta y exige que el resultado aporte especificidad.
- Mantiene los criterios del docente como marco de referencia estable, no como sugerencia negociable.

**Cómo se entrena:** consignas con criterios estrictos y revisión entre pares. El docente elabora una tarea que solo él puede saber si está bien resuelta (porque conoce el contexto de su asignatura) y la trabaja con IA hasta producir un resultado que pueda defender. Otro docente revisa el proceso completo y comenta dónde percibió que se delegó juicio. Tres iteraciones a lo largo de un semestre.

### Nivel 3 — Diseñar la co-creación para otros

El tercer nivel es la competencia avanzada. El docente no sostiene solo su co-creación; diseña actividades donde sus estudiantes sostendrán procesos de co-creación productiva, lo que implica anticipar las dificultades específicas del estudiante, las trampas en las que caerá, los puntos donde la práctica con IA generará aprendizaje real.

**Indicadores observables:**

- Diseña consignas que exigen al estudiante sostener decisiones, no obtener respuestas.
- Anticipa dónde el estudiante sentirá la tentación de delegar juicio y construye fricciones deliberadas en esos puntos.
- Diferencia entre tareas que la IA debe asistir, tareas donde el estudiante trabaja sin IA y tareas donde el contraste entre ambas es lo que se evalúa.
- Articula la rúbrica de evaluación con la calidad de la co-creación, no con el producto final.

**Cómo se entrena:** diseño y realización de una asignatura completa centrada en procesos de co-creación, con bitácora del docente, retroalimentación entre pares y revisión de los productos al cierre. Aquí la alfabetización en co-creación se consolida y se vuelve enseñable a otros docentes.

## Lo que esta alfabetización requiere de la institución

El docente individual no puede abarcar este aprendizaje solo. Hay tres condiciones institucionales que lo determinan, y conviene nombrarlas para que no queden como buenas intenciones.

El segundo y tercer niveles exigen tiempo real en la carga horaria — tiempo con autorización explícita para iterar, errar y rehacer. Sin eso, lo que se aprende es uso instrumental con vocabulario de co-creación: la forma sin el fondo.

La revisión entre pares no es una recomendación: es parte del método. El segundo nivel requiere que otro docente revise el proceso completo. La [pieza sobre redes y comunidades](/formacion-docente/redes/) cubre el marco; los espacios concretos hay que construirlos institucionalmente.

Y sin reconocimiento académico explícito, la alfabetización en co-creación queda en el territorio del interés personal. Los docentes que la desarrollen lo harán en contra del sistema, no gracias a él.

## Conexiones con los marcos UNESCO

El marco de competencias de IA para docentes de UNESCO (2024) enumera cinco áreas —**mentalidad centrada en lo humano**, **ética de la IA**, **fundamentos y aplicaciones de la IA**, **pedagogía de la IA** e **IA para el aprendizaje profesional**— y tres niveles progresivos de dominio en cada una: *Adquirir*, *Profundizar* y *Crear*. El nivel *Crear* es donde la literacidad de co-creación se vuelve indispensable, aunque el marco no la nombra con ese término. En tres de las cinco áreas, alcanzar *Crear* exige en la práctica sostener un acoplamiento productivo con la IA:

- En **mentalidad centrada en lo humano**, *Crear* implica diseñar configuraciones de uso de IA que preserven la agencia humana —exactamente la decisión que define la co-creación: cuándo el sistema participa, cuándo no y bajo qué criterio.
- En **pedagogía de la IA**, *Crear* significa diseñar actividades de aprendizaje con IA para otros; un docente no puede diseñar lo que él mismo no sabe sostener (es el Nivel 3 de la progresión propuesta arriba).
- En **IA para el aprendizaje profesional**, *Crear* describe el uso de la IA como interlocutor del propio desarrollo intelectual del docente —el caso paradigmático de co-creación aplicado a la práctica profesional.

Las otras dos áreas —**ética de la IA** y **fundamentos y aplicaciones**— en su nivel *Crear* movilizan competencias distintas (liderazgo ético-normativo, diseño técnico) que no dependen del mismo acoplamiento epistémico. Nombrar y desarrollar intencionadamente la literacidad de co-creación ayuda a ese marco: aporta el soporte léxico y el método formativo para la competencia que hoy queda implícita en su nivel máximo. Rousell y Sinclair (2025) señalan, además, que los sistemas de IA no son herramientas al servicio de futuros previamente decididos, sino componentes activos en la creación de esos futuros: la literacidad de co-creación es, también, la competencia de participar en ese proceso.

## Lecturas relacionadas

La [guía sobre la co-creación humano-IA](/ia-educacion/guias/agenciamiento-humano-ia/) ofrece el marco conceptual; el ensayo del blog sobre [la co-creación humano-IA](/blog/agenciamiento-humano-ia/) sostiene la posición filosófica; la [alfabetización digital](/formacion-docente/alfabetizacion/) cubre el nivel previo del que parte esta competencia; la [alfabetización crítica en IA](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/) cubre la dimensión epistémica complementaria.

## Referencias

Deleuze, G., & Guattari, F. (1987). *A thousand plateaus: Capitalism and schizophrenia* (B. Massumi, Trans.). University of Minnesota Press. (Trabajo original publicado en 1980).

Meshi, A. (2024). GPT-ME: A human-AI cognitive assemblage. *Proceedings of the ACM on Computer Graphics and Interactive Techniques*, *7*(4), 55:1–55:8. https://doi.org/10.1145/3664214

Rousell, D., & Sinclair, M. P. (2025). Desiring-futures in education policy: Assemblage theory, artificial intelligence, and UNESCO's futures of education. *Educational Review*, *77*(6), 1754–1777. https://doi.org/10.1080/00131911.2024.2362176

UNESCO. (2024). *AI competency framework for teachers*. UNESCO. https://www.unesco.org/en/articles/ai-competency-framework-teachers

Wenger, E. (1998). *Communities of practice: Learning, meaning, and identity*. Cambridge University Press.

Yang, S., & Ma, R. (2025). Classifying epistemic relationships in human-AI interaction: An exploratory approach. arXiv preprint.
