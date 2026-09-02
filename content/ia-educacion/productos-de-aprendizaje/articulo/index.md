---
title: "Artículo con IAG"
date: 2026-05-11
draft: false
description: "Cómo escribir un artículo académico con apoyo formativo de IAG, evaluando la delimitación del problema, el estado del arte y la solidez de la contribución antes que el manuscrito final."
summary: "Artículo académico con IAG: estructura disciplinar, mapeo del estado del arte, prueba de la contribución frente a objeciones y revisión de la discusión. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-5", "rubrica-iag", "investigación", "comunicación", "cognitivas", "artículo", "publicación-académica"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

# Dimensiones del marco unificado
bloom_dominante: 5
bloom_rango: "3-6"
competencias_cluster: ["Investigación", "Comunicación", "Cognitivas"]
area_disciplinar: "ambas"
riesgo_sustitucion_autoria: "alto"
modalidad: "cualquiera"
asignatura_ejemplo: "Posgrado / Tesis / Cualquier asignatura con escritura académica para publicación"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de seminario de tesis o de escritura académica en posgrado cuyo estudiantado debe entregar un artículo para una revista con arbitraje y que ya han visto llegar manuscritos con bibliografía plausible que nadie leyó." haras="Una estudiante de maestría en educación escribe un artículo sobre el uso de foros en un curso en línea. Pregunta a la IA qué estructura espera su campo (IMRyD o revisión), lee doce trabajos y le pide a la IA que señale vacíos en esa lista concreta, redacta el cuerpo sola, y al final le pide objeciones que un revisor del campo podría hacerle a su hallazgo («la participación subió, pero cambió a la vez la ponderación del foro»). Entrega el artículo, los borradores fechados y la lista de literatura verificada con DOI." tendras="Cuatro prompts copiables y una regla de revisión que puedes usar mañana: «sin DOI o localización comprobable para cada referencia, el artículo no se revisa; la lista de lecturas anotadas se entrega antes que el estado del arte»." tarda="Diez minutos de lectura; quince si copias los prompts para tu seminario." ejemplo="Empieza con el caso de la estudiante de maestría, en el primer párrafo, y vuelve a él en la secuencia de fases y en las salvaguardas." >}}

En un seminario de tesis de maestría, una estudiante prepara un artículo sobre lo que
pasó en los foros de un curso en línea cuando cambió la forma de preguntar. La profesora
del seminario revisa la contribución (qué se sabe ahora que antes no), más que la
longitud del manuscrito. La IA puede mapear el campo a partir de lo que la estudiante ya
leyó y hacer de revisora que objeta; decidir qué es aporte nuevo y cómo colocarse frente
a la literatura es trabajo de la estudiante.

## Qué es y para qué sirve

Un **artículo académico** es un texto escrito para publicación en una
revista o memoria con arbitraje. Combina problema delimitado, estado del
arte explícito, método (o argumento) y contribución original. Es el
formato más exigente de comunicación académica.

**Dónde entra la IA en este tipo de trabajo:** verifica las convenciones
de estructura de la disciplina (IMRyD, revisión narrativa), señala
tendencias y vacíos en la lista de trabajos que la estudiante ya leyó
(«ninguno de tus doce textos mide participación más allá de un semestre»),
plantea objeciones a la contribución propia y revisa la discusión. La IA
no escribe el cuerpo del artículo; en particular, **no inventa citas**.

## Bloom y progresión de prompts

Este tipo de trabajo moviliza los niveles **3 a 6** de la taxonomía de Bloom, con
nivel dominante **5 — Evaluar** (el posicionamiento argumentado frente al
campo). Para ti, la tabla es un banco de prompts: copia el de la fase en la
que tu grupo se atasca (casi siempre la prueba de la contribución, cuando
presentan como hallazgo algo ya publicado) y sustituye los corchetes.

| Nivel Bloom | Movimiento del artículo | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Estructura disciplinar | Identifica el formato estándar en su área | _"Estoy escribiendo un artículo sobre [problema]. ¿Qué estructura es estándar en mi disciplina (por ejemplo, IMRyD, ensayo crítico, revisión narrativa) y qué secciones se esperan?"_ |
| 4 — Analizar | Estado del arte | Identifica tendencias, vacíos y tensiones en la literatura revisada por él | _"He revisado estos trabajos: [lista]. ¿Qué tendencias, vacíos o tensiones puedes identificar en este estado del arte? No me des una redacción del marco; sólo señala lo que ves."_ |
| 5 — Evaluar **(dominante)** | Prueba de la contribución | Recibe objeciones disciplinares a su posición o hipótesis | _"Mi contribución sería: '[hipótesis/posición]'. ¿Qué autores del campo podrían cuestionarla y desde qué argumentos? No inventes referencias; usa sólo autores reales."_ |
| 6 — Crear | Cierre de la discusión | Asegura que la discusión cierra el argumento y conecta con la literatura | _"He redactado este apartado de discusión: '[texto]'. ¿Dónde no estoy cerrando el argumento o no estoy conectando con la literatura citada?"_ |

## Competencias que desarrolla

- **Investigación** — delimitación de problema investigable, manejo riguroso del estado del arte, justificación metodológica, posicionamiento en el campo.
- **Comunicación** — escritura académica con convenciones disciplinares, citación rigurosa, claridad expositiva.
- **Cognitivas** — síntesis entre múltiples fuentes, juicio crítico sobre el propio aporte, anticipación de objeciones.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="bullseye" header="Fase 1 — Problema y estructura" subheader="Encuadre" md="true" >}}
Delimitación del problema investigable y elección de la estructura
estándar de la disciplina. La IAG confirma convenciones formales.
{{< /timelineItem >}}

{{< timelineItem icon="layer-group" header="Fase 2 — Estado del arte" subheader="Mapeo del campo" md="true" >}}
Lectura crítica de la literatura por parte del estudiante. La IAG
identifica tendencias, vacíos y tensiones **sobre la lista que el
estudiante ya leyó**, no sugiere literatura nueva sin verificar.
{{< /timelineItem >}}

{{< timelineItem icon="pen-fancy" header="Fase 3 — Argumento y método" subheader="Construcción autoral" md="true" >}}
Redacción del cuerpo. La IAG no escribe; el estudiante construye el
argumento o describe el método y sus resultados.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 4 — Discusión y prueba" subheader="Confrontación disciplinar" md="true" >}}
Refinamiento de la discusión. La IAG actúa como par disciplinar
crítico planteando objeciones; el estudiante responde por escrito.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del manuscrito

Riesgo **alto**: los artículos pueden generarse con plausibilidad
superficial. Las dos piezas que más te dicen son la lista de literatura
**leída y verificada** (con las anotaciones propias de cada texto) y los
borradores fechados:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | obligatoria | Transcripción separando fases |
| ≥3 iteraciones del prompt | obligatoria | Especialmente al pedir objeciones disciplinares |
| Lista de literatura verificada | obligatoria | Referencias completas con DOI o localización real; las sugeridas por IAG se verifican antes de citar |
| Anotaciones de validación | obligatoria | Qué objeciones se aceptaron y cuáles se resistieron, con argumento |
| Borradores fechados | obligatoria | Mínimo problema → estado del arte → cuerpo → discusión, en momentos distintos |
| Posicionamiento propio explícito | obligatoria | Párrafo donde el estudiante nombra dónde se ubica en el campo |
| Bitácora metacognitiva | obligatoria | Qué aprendió sobre el oficio de publicar |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito; con explícita declaración de no haber generado citas |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la bitácora, la lista de lecturas y los
borradores, no sólo el manuscrito; ajusta los pesos a tu seminario (por
ejemplo, más peso a «uso ético» si en tu campo ya has recibido citas
inexistentes):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico, anclado a la fase | 10% |
| Nivel cognitivo del prompt | Pide el artículo | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como par disciplinar | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa críticamente y responde objeciones disciplinares | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el artículo es inequívocamente del estudiante | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de posicionamiento | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico — citas verificadas, autoría declarada, sin generación de referencias | 10% |

## Riesgos y salvaguardas

- **Citas inventadas.** El más serio y frecuente. La IAG produce
  referencias plausibles inexistentes. Salvaguarda: cada cita debe tener
  DOI o ubicación verificable; sin verificación, el artículo no se
  evalúa.
- **Cuerpo generado.** El argumento o el método se escriben con IAG.
  Salvaguarda: borradores fechados y verificación oral o de texto del
  posicionamiento propio.
- **Estado del arte derivado.** El estudiante no leyó las fuentes que
  cita. Salvaguarda: lista de literatura **leída** (con anotaciones
  propias) precede al estado del arte escrito.
- **Falsa contribución.** Lo que se presenta como aporte es ya conocido
  o trivial. Salvaguarda: el prompt nivel 5 obliga a confrontar la
  contribución con autores del campo.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar lista de
literatura verificada. **Ninguna referencia generada por IAG se cita sin
verificación**. El artículo es del estudiante; la IAG es par disciplinar
crítico.
{{< /alert >}}

## Asignatura de ejemplo

Posgrado, seminarios de tesis, talleres de escritura académica;
cualquier asignatura cuyo entregable sea un artículo para publicación o
memoria con arbitraje.

## Ejemplos y enlaces

- Trabajo cercano: [Ensayo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/ensayo" >}}) — escala argumentativa menor con literatura más acotada.
- Trabajo cercano: [Monografía con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/monografia" >}}) — etapa formativa previa.
- Trabajo cercano: [Investigación de campo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/investigacion-de-campo" >}}) — de ahí salen los datos (encuestas, entrevistas) de muchos artículos.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
