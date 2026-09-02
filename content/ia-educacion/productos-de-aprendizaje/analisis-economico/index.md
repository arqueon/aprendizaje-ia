---
title: "Análisis económico con IAG"
date: 2026-05-11
draft: false
description: "Cómo realizar un análisis económico con apoyo formativo de IAG, evaluando la selección de métricas, la sensibilidad de variables y los supuestos detrás de la conclusión."
summary: "Análisis económico con IAG: métricas estándar (VPN, TIR, payback), análisis de sensibilidad y crítica de los supuestos que sostienen la decisión. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Cuatro estudiantes comparan un proyecto sobre una balanza y tres rutas de escenario antes de tomar una decisión económica."
tags: ["producto-aprendizaje", "bloom-5", "rubrica-iag", "profesionales", "cognitivas", "análisis-económico", "evaluación-financiera"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 5
bloom_rango: "3-5"
competencias_cluster: ["Profesionales", "Cognitivas"]
area_disciplinar: "ambas"
riesgo_sustitucion_autoria: "medio"
modalidad: "cualquiera"
asignatura_ejemplo: "Economía / Administración / Ingeniería industrial / Evaluación de proyectos"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de evaluación de proyectos, economía o ingeniería industrial que piden un análisis de viabilidad (comprar o rentar una máquina, abrir una sucursal) y reciben planillas impecables con supuestos que nadie nombró." haras="Un equipo de administración debe decidir si una panadería de barrio compra un horno nuevo de 180 000 pesos o sigue rentando uno por 6 000 al mes. Pregunta a la IA qué métricas aplican al caso (VPN, payback), arma la planilla con cotizaciones reales y calcula el escenario base; después le pide a la IA que señale qué variables cambian la decisión si se mueven un 10 % (el precio de la harina, las ventas de temporada) y, al final, qué supuestos sostienen su conclusión y qué cambio la invertiría. Entrega la planilla nativa, la lista de supuestos y la bitácora." tendras="Tres prompts copiables y una regla de revisión que puedes usar mañana: «cada dato de entrada lleva su fuente (una cotización, una tarifa publicada) y cada supuesto está escrito en una línea; si la planilla no tiene sensibilidad, la conclusión no cuenta»." tarda="Ocho minutos de lectura; doce si copias los prompts para tu caso." ejemplo="Empieza con el caso del horno de la panadería, en el primer párrafo, y vuelve a él en la secuencia de fases y en las salvaguardas." >}}

Un profesor de evaluación de proyectos plantea a su grupo el caso de una panadería de
barrio: el horno rentado cuesta 6 000 pesos al mes y uno nuevo, 180 000. ¿Conviene
comprar? Cada equipo entrega una recomendación con su planilla. Lo que el profesor revisa
es la honestidad de los supuestos (cuántas piezas venden al día, qué pasa en diciembre,
cuánto durará el horno), más que la elegancia de las planillas. La IA puede correr
escenarios y señalar qué variable pesa más; asumir el riesgo de la recomendación es
trabajo del equipo.

## Qué es y para qué sirve

Un **análisis económico** estructura una decisión cuantificando flujos,
costos y beneficios bajo criterios estándar (VPN, TIR, payback,
costo-beneficio). Lo que el estudiante aprende: a **elegir la métrica con
razones** (payback si al dueño le importa recuperar pronto; VPN si compara
opciones a cinco años), a hacer un **análisis de sensibilidad** y a
**escribir los supuestos** que sostienen su conclusión.

**Dónde entra la IA en este tipo de trabajo:** verifica que las métricas
sean las adecuadas, identifica variables críticas en el análisis de
sensibilidad (por ejemplo, que el precio de la harina pese más que la tasa
de descuento) y pone a prueba los supuestos que sostienen la conclusión.
Los cálculos y la recomendación los hace el estudiante.

## Bloom y progresión de prompts

Nivel dominante **5 — Evaluar** (la prueba de los supuestos y la
decisión justificada). Para ti, la tabla es un banco de prompts: copia el
de la fase en la que tu grupo se atasca (casi siempre la de supuestos,
cuando presentan una sola corrida como conclusión) y sustituye los
corchetes por tu caso.

| Nivel Bloom | Movimiento del análisis | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Selección de métricas | Identifica las métricas estándar pertinentes al caso | _"Voy a hacer un análisis económico de [proyecto/decisión]. ¿Qué métricas son estándar (VPN, TIR, payback, costo-beneficio) y cuáles aplican a este caso?"_ |
| 4 — Analizar | Sensibilidad | Identifica variables cuyos cambios pequeños alteran la decisión | _"Tengo este escenario base: [datos clave]. ¿Qué variables tienen mayor impacto si cambian un ±10 %? No me des los nuevos números; sólo identifica las variables críticas."_ |
| 5 — Evaluar **(dominante)** | Prueba de supuestos | Hace explícitos los supuestos que sostienen la conclusión | _"He concluido que la opción A es preferible bajo [criterios]. ¿En qué supuestos descansa mi conclusión y qué cambio en esos supuestos invertiría la decisión?"_ |

## Competencias que desarrolla

- **Profesionales** — toma de decisiones bajo incertidumbre, justificación cuantitativa, comunicación financiera.
- **Cognitivas** — análisis sistémico, identificación de supuestos implícitos, juicio sobre umbrales de decisión.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="calculator" header="Fase 1 — Métricas y datos" subheader="Encuadre" md="true" >}}
Selección de métricas según el tipo de decisión y reunión de datos de
entrada verificables.
{{< /timelineItem >}}

{{< timelineItem icon="table-cells" header="Fase 2 — Escenario base" subheader="Cálculo propio" md="true" >}}
Cálculo del escenario base por el estudiante (planilla, software).
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 3 — Sensibilidad" subheader="Robustez" md="true" >}}
Identificación con IAG de variables críticas y construcción de
escenarios optimista/pesimista por el estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 4 — Supuestos y decisión" subheader="Honestidad" md="true" >}}
Listado explícito de supuestos y prueba con IAG: qué cambio en cada
supuesto invertiría la decisión.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además de la recomendación

Riesgo **medio**: las planillas pueden generarse, pero los datos de
entrada (una cotización real del horno) y la lista de supuestos son lo
que más te dice de su trabajo:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | obligatoria | Transcripción por fase |
| Planilla con cálculos propios | obligatoria | Archivo nativo, no sólo capturas |
| Datos de entrada verificables | obligatoria | Fuentes citadas (cotizaciones, índices, tarifas), no generadas por IAG |
| Análisis de sensibilidad documentado | obligatoria | Tabla o gráfico mostrando impacto de cambios |
| Lista explícita de supuestos | obligatoria | Cada supuesto nombrado |
| Anotaciones de validación | obligatoria | Qué variables críticas aceptó/rechazó |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre decisiones cuantitativas |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la bitácora, la planilla y la lista de supuestos,
no sólo la recomendación; ajusta los pesos a tu curso (por ejemplo, más
peso a «metacognición» si quieres que expliquen qué supuesto les costó más
nombrar):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la conclusión | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como crítico de supuestos | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con argumento | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el análisis es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza supuestos y umbrales de decisión | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Datos inventados.** La IAG sugiere cifras sin fuente. Salvaguarda:
  cada dato de entrada con fuente verificable.
- **Supuestos invisibles.** El estudiante decide sin nombrar lo que está
  asumiendo. Salvaguarda: lista explícita obligatoria.
- **Análisis sin sensibilidad.** Una sola corrida presentada como
  conclusiva. Salvaguarda: sensibilidad obligatoria con identificación
  de umbrales de decisión.
- **Confusión de unidades o tasas.** Errores en escalas temporales o
  monetarias. Salvaguarda: revisión cruzada manual de unidades antes de
  la conclusión.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar planilla
y datos crudos. La IAG identifica sensibilidades; la decisión y sus
supuestos son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Economía, administración, ingeniería industrial, evaluación de
proyectos, finanzas aplicadas.

## Ejemplos y enlaces

- Trabajo cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — el análisis económico como soporte de viabilidad.
- Trabajo cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — base cuantitativa con análisis de sensibilidad análogo.
- Trabajo cercano: [Gestión industrial con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/gestion-industrial" >}}) — decisiones operativas.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
