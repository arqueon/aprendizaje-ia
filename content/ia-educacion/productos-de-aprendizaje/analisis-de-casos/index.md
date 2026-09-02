---
title: "Análisis de casos con IAG"
date: 2026-05-11
draft: false
description: "Método de análisis de casos en seis fases (definir problema, generar alternativas, fijar criterios, decidir, reflexionar críticamente y aterrizar en lo local) con apoyo formativo de IAG."
summary: "Análisis de casos global-local con IAG: definición del problema, generación de alternativas, criterios de evaluación, decisión justificada, reflexión crítica y conexión con el entorno. Bloom 2 a 6, rúbrica de proceso y evidencias obligatorias."
tags: ["producto-aprendizaje", "bloom-5", "rubrica-iag", "cognitivas", "profesionales", "investigación", "analisis-de-casos", "abc", "toma-de-decisiones"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 5
bloom_rango: "2-6"
competencias_cluster: ["Cognitivas", "Profesionales", "Investigación"]
area_disciplinar: "ambas"
riesgo_sustitucion_autoria: "medio"
modalidad: "cualquiera"
asignatura_ejemplo: "Ciencias sociales / Administración / Ingeniería / Salud / Educación"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de ciencias sociales, administración, salud pública o ingeniería que ya trabajan con casos en clase (un tiradero a cielo abierto que el municipio debe cerrar, una empresa que decide si cambia de proveedor) y quieren que el grupo use IA para ver más alternativas sin que la IA tome la decisión." haras="Un grupo de segundo semestre recibe el caso del tiradero, formula el problema en una oración, propone tres alternativas distintas (clausura y relleno sanitario, planta de separación, programa de reducción en origen), elige tres criterios para compararlas (costo, impacto en la salud del barrio vecino, meses hasta operar), arma una tabla alternativas × criterios y escribe un párrafo que justifica su decisión. La IA entra en cada fase como tutor que pregunta, como generadora de alternativas y como crítica; los seis prompts literales están en la tabla de Bloom." tendras="Una secuencia de seis fases con su prompt copiable y una regla de revisión que puedes usar mañana: «la tabla de alternativas y criterios se entrega fechada antes del párrafo final; si aparece después, el estudiante decidió primero y justificó después»." tarda="Doce minutos de lectura; veinte si copias los prompts y los adaptas a tu caso." ejemplo="Empieza con el caso del tiradero, en el primer párrafo, y vuelve a él en la secuencia de fases y en las salvaguardas." >}}

Una docente de administración pública entrega a su grupo un caso de dos páginas: un
municipio de 80 000 habitantes tiene un tiradero a cielo abierto a 400 metros de una
colonia y la autoridad ambiental le dio un año para resolverlo. Cada estudiante debe
entregar una decisión justificada: qué hacer con el tiradero y por qué. Lo que ella
revisa es cómo delimitó el problema, qué alternativas se permitió ver y con qué
criterios comparó (costo, salud, tiempo); la respuesta final pesa menos que ese camino.
La IA entra como tutora que pregunta, como generadora de alternativas y como abogada
del diablo; la decisión la escribe y la firma el estudiante.

## Qué es y para qué sirve

El **análisis de casos** es una metodología clásica para llevar problemáticas
reales (globales o disciplinares) al ámbito formativo. El estudiante diagnostica
un problema, propone alternativas, define criterios de comparación (en el caso del
tiradero: costo, impacto en salud y meses hasta operar), decide, reflexiona sobre
los puntos ciegos de su decisión y conecta el caso con su contexto local.

A diferencia de un proyecto, el análisis de casos **no construye una solución
nueva**: estructura el razonamiento alrededor de una decisión justificada.
La calidad del entregable depende casi por completo del proceso de análisis.

**Dónde entra la IA en este tipo de trabajo:** amplía las alternativas que el
estudiante considera (por ejemplo, le propone un programa de reducción en origen
cuando sólo veía opciones de infraestructura), presiona la definición del problema,
afina los criterios de comparación («impacto en salud» pasa a «casos respiratorios
registrados en el centro de salud»), actúa como crítica experta y da pistas de datos
para aterrizar el caso en lo local. Nunca decide por el estudiante.

## Bloom y progresión de prompts

Este tipo de trabajo moviliza los niveles **2 a 6** de la taxonomía de Bloom, con
nivel dominante **5 — Evaluar** (la decisión informada entre alternativas con
criterios explícitos). Cada nivel se ancla a una de las seis fases de la guía
de referencia y a su prompt literal. Para ti, la tabla funciona como banco de
prompts: copia el de la fase en la que tu grupo suele atascarse (casi siempre la
fase 1, donde confunden el problema con uno de sus síntomas) y sustituye los
corchetes por tu caso.

| Nivel Bloom | Fase | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 2 — Comprender | F1 — Definición del problema central | Sintetiza la información del caso y formula el problema raíz en una oración | _"Actúa como un tutor de análisis de casos. Basado en [describir brevemente el caso], he identificado que el problema central es: '[tu formulación del problema]'. ¿Consideras que esta formulación es clara, concisa y refleja la raíz del asunto? ¿Qué preguntas me harías para ayudarme a profundizar o refinar mi definición?"_ |
| 6 — Crear | F2 — Generación de alternativas | Propone ≥3 alternativas distintas (tecnológicas, sociales, políticas…) | _"Para el problema central '[problema definido en la fase 1]', he pensado en estas soluciones: [lista de tus ideas iniciales]. Ayúdame a generar tres alternativas de solución que sean distintas entre sí, considerando un enfoque [tecnológico/social/comunitario/etc.] para cada una."_ |
| 5 — Evaluar | F3 — Criterios de evaluación | Define ≥3 criterios pertinentes y medibles (costo, impacto social, sostenibilidad…) | _"Para evaluar mis alternativas, he propuesto los criterios: [criterio 1], [criterio 2], [criterio 3]. ¿Son pertinentes y distintos? Sugiéreme cómo hacerlos más específicos o medibles."_ |
| 5 — Evaluar **(dominante)** | F4 — Toma de decisión fundamentada | Construye matriz alternativas × criterios y justifica la elección | _"Mis alternativas son A, B, C y mis criterios X, Y, Z. He elegido la alternativa [tu elección]. Ayúdame a estructurar un párrafo de justificación que (1) afirme mi decisión, (2) explique cómo satisface los criterios, y (3) la compare con las otras alternativas."_ |
| 5–6 | F5 — Reflexión crítica sobre la decisión | Identifica efectos no deseados, barreras y resistencias | _"He decidido implementar la solución [tu solución elegida]. Actúa como un crítico experto y plantéame 3 preguntas desafiantes sobre los posibles efectos no deseados, las barreras ocultas y los grupos que podrían oponerse a ella."_ |
| 4 — Analizar | F6 — Relación con el contexto local | Aterriza la problemática global en su comunidad o ámbito profesional | _"El caso que analicé trata sobre [problemática global]. ¿Puedes ayudarme a encontrar datos o noticias recientes que muestren cómo este problema afecta específicamente a mi localidad, [tu ciudad/región]? Busco información para conectar el caso con mi realidad."_ |

## Competencias que desarrolla

- **Cognitivas** — pensamiento crítico (definir problema sin confundirlo con sus síntomas), análisis sistémico, juicio entre alternativas con criterios explícitos.
- **Profesionales** — toma de decisiones bajo incertidumbre, justificación rigurosa, anticipación de obstáculos de implementación.
- **Investigación** — recolección de datos del entorno (por ejemplo, las toneladas diarias que recibe el tiradero según el ayuntamiento) y verificación de los datos que sugiere la IA contra fuentes comprobables.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="magnifying-glass" header="Fase 1 — Definición del problema central" subheader="Diagnóstico" md="true" >}}
El estudiante sintetiza la información del caso, identifica la tensión principal y la formula en **una oración concisa**. La IAG pregunta para refinar; nunca afirma la definición.
{{< /timelineItem >}}

{{< timelineItem icon="lightbulb" header="Fase 2 — Generación de alternativas" subheader="Divergencia" md="true" >}}
Lluvia de ideas y selección de **≥3 alternativas viables y distintas entre sí**. La IAG amplía el rango con enfoques que el estudiante no había considerado; el filtrado y la adaptación son responsabilidad del estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="list-check" header="Fase 3 — Criterios de evaluación" subheader="Marco de juicio" md="true" >}}
Definición de **tres o más criterios pertinentes, medibles y distintos entre sí** (en el caso del tiradero: costo en pesos, casos respiratorios en la colonia vecina, meses hasta operar). La IA ayuda a hacerlos medibles; el estudiante decide cuáles valen para su caso (por ejemplo, si el municipio tiene el terreno, el costo del suelo deja de contar).
{{< /timelineItem >}}

{{< timelineItem icon="scale-balanced" header="Fase 4 — Toma de decisión fundamentada" subheader="Convergencia" md="true" >}}
Construcción de la tabla alternativas × criterios (tres filas, tres columnas, una calificación por celda), comparación y **justificación escrita** de la alternativa elegida. La IA apoya en estructurar el párrafo de justificación; el contenido analítico es del estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 5 — Reflexión crítica" subheader="Abogado del diablo" md="true" >}}
Identificación de **ventajas/desventajas no evidentes**, factores externos y resistencias de los actores involucrados. La IAG actúa como crítica experta para sacar puntos ciegos.
{{< /timelineItem >}}

{{< timelineItem icon="map-pin" header="Fase 6 — Contexto local" subheader="Aterrizaje" md="true" >}}
Conexión de la problemática global con datos, noticias o ejemplos del **entorno local** del estudiante e implicaciones para su vida o futuro profesional. La IAG aporta puntos de partida; la reflexión es personal.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además de la decisión final

Riesgo **medio**: el análisis es estructurado y la tabla hace difícil
falsificar el proceso entero, pero el párrafo de justificación puede generarse
rápido. Por eso, junto con la decisión, el estudiante entrega estas piezas
(bitácora, tabla fechada, borradores), cada una con su grado de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | obligatoria | Transcripción por fase, mostrando qué se preguntó en cada paso |
| ≥3 iteraciones del prompt | recomendada | Al menos en las fases 1 (definición) y 3 (criterios) |
| Anotaciones de validación del output | obligatoria | Qué alternativas se descartaron y por qué; qué criterios se afinaron |
| Matriz alternativas × criterios | obligatoria | Tabla completa antes del párrafo de justificación |
| Borradores previos y posteriores | recomendada | Versiones de la definición del problema y de la justificación |
| Bitácora metacognitiva | obligatoria | Qué aprendió sobre tomar decisiones bajo criterios explícitos |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito de cada uso |
| Verificación de datos locales (F6) | obligatoria | Fuentes citadas y verificables para la dimensión local; los datos sugeridos por IAG deben confirmarse contra fuentes externas |

## Cómo se evalúa (rúbrica de proceso)

Se aplica la rúbrica IAG con pesos sugeridos para análisis de casos; con ella
revisas la bitácora y la tabla, no sólo el párrafo final. Los siete criterios de
siempre permanecen y tú ajustas los pesos a tu curso (por ejemplo, más peso a
«uso crítico de la respuesta» si tu grupo tiende a quedarse con la primera
alternativa que le proponen):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago o no relacionado | Relación parcial | Claro y adecuado | Pertinente y estratégico, anclado a la fase del análisis | 10% |
| Nivel cognitivo del prompt | Pide definiciones simples | Algo de análisis | Análisis y evaluación | Pensamiento crítico y metacognición — usa IAG como crítico, no como decisor | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona superficialmente | Contrasta y analiza | Evalúa críticamente, descarta alternativas con argumento | 20% |
| Integración en el trabajo | Copia o depende de IAG | Uso limitado | Integra y adapta | Transforma; la decisión y su justificación se reconocen como del estudiante | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente, sobre todo en la definición del problema | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza críticamente su proceso de decisión y los puntos ciegos asumidos | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente; verifica los datos locales que la IAG sugiere | 10% |

## Riesgos y salvaguardas

- **Problema confundido con síntoma.** El estudiante puede formular como
  problema lo que en realidad es un efecto. Salvaguarda: la fase 1 pide
  **justificar por qué se considera el problema más relevante**, no sólo
  enunciarlo.
- **Alternativas convergentes disfrazadas de distintas.** Las tres
  alternativas pueden ser variantes de la misma idea. Salvaguarda: la fase 2
  exige enfoques **explícitamente distintos** (tecnológico, social,
  comunitario, etc.).
- **Criterios redundantes o no medibles.** "Eficacia", "buen impacto" y
  "viabilidad" pueden solaparse. Salvaguarda: en la fase 3 el estudiante muestra
  que sus criterios son **distintos y medibles** (por ejemplo, «costo en pesos» y
  «meses hasta operar» en lugar de «viabilidad»).
- **Decisión racionalizada a posteriori.** El estudiante decide primero y
  arma la tabla después para justificar la decisión. Salvaguarda: la bitácora
  debe mostrar la tabla fechada **antes** del párrafo final (si la tabla aparece
  después, la decisión se tomó primero).
- **Datos locales alucinados.** La IAG inventa cifras y noticias para la
  fase 6. Salvaguarda: cada dato local entregado se acompaña de **fuente
  verificable**; si no, no cuenta.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** El estudiante declara el modelo, para qué lo usó
(por ejemplo, «pedí tres alternativas en la fase 2») y cuánto de lo entregado
viene de ahí, y entrega la bitácora por fase. La IAG amplía
el horizonte de alternativas; la decisión y su responsabilidad son del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ciencias sociales, administración, ingeniería industrial, salud pública,
educación, derecho; cualquier curso universitario que trabaje con casos
disciplinares o casos global-local.

## Ejemplos y enlaces

- Trabajo cercano en esta sección: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — comparte la lógica de alternativas y criterios de comparación (costo, impacto, tiempo), pero construye una solución; aquí sólo se justifica una decisión.
- Trabajo cercano: [Ensayo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/ensayo" >}}) — comparte la rúbrica de proceso y la lógica argumentativa.
- Guía pedagógica: [Aprendizaje activo con IA]({{< ref "/ia-educacion/guias/aprendizaje-activo-con-ia" >}}).

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
