---
title: "Diseño de sistemas con IAG"
date: 2026-05-11
draft: false
description: "Cómo abordar el diseño de un sistema con apoyo formativo de IAG, evaluando arquitecturas de referencia, trade-offs y subsistemas críticos no considerados."
summary: "Diseño de sistemas con IAG: arquitecturas de referencia, evaluación de trade-offs e identificación de subsistemas o interfaces críticas. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Dos manos comparan dos arquitecturas modulares e inspeccionan la interfaz crítica entre sus componentes."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "ingeniería", "innovación", "diseño-de-sistemas", "arquitectura"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 6
bloom_rango: "4-6"
competencias_cluster: ["Ingeniería", "Innovación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería de sistemas / Software / Mecatrónica / Industrial"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de ingeniería de software, sistemas, mecatrónica o industrial que piden diseñar un sistema completo (una app de préstamo de bicicletas para el campus, una celda de ensamble) y reciben diagramas vistosos con la arquitectura de moda, sin que nadie explique por qué esa y no otra." haras="Un equipo de sexto semestre debe diseñar el sistema de préstamo de bicicletas del campus: levanta requerimientos, pregunta a la IA qué arquitecturas de referencia existen, compara tres (monolítica, modular, con servicios separados) bajo escalabilidad, mantenibilidad y costo, dibuja su propia arquitectura y al final pide a la IA que le señale qué subsistema olvidó (el de recuperar bicicletas no devueltas). Entrega la matriz de comparación, el diagrama y la lista de interfaces. La IA entra en las fases 1, 2 y 4; el diseño detallado es del equipo." tendras="Una secuencia de cuatro fases con sus prompts copiables y una regla de revisión: «cada arquitectura descartada lleva su argumento en la matriz (por ejemplo, ‘servicios separados: descartada, tres personas no pueden operar cinco despliegues’)»." tarda="Ocho minutos de lectura; quince si adaptas los prompts a tu proyecto." ejemplo="Empieza con el caso del préstamo de bicicletas, en el primer párrafo, y vuelve a él en la secuencia de fases y en las salvaguardas." >}}

Un profesor de ingeniería de software pide a equipos de tres personas diseñar el sistema
de préstamo de bicicletas del campus: registro de usuarios, candados electrónicos, cobro
de retrasos. El primer diagrama que recibe un equipo tiene ocho microservicios y una cola
de mensajes; cuando pregunta quién va a operar eso, nadie sabe. Un sistema se diseña con
lo que se ve y se rompe con lo que no se vio. La IA le sirve al equipo para conocer las
arquitecturas de referencia y para recordar el subsistema olvidado (qué pasa con una
bicicleta que no vuelve); la decisión entre alternativas y la responsabilidad de que el
sistema funcione son del equipo.

## Qué es y para qué sirve

El **diseño de sistemas** define la arquitectura, los componentes, las
interfaces y los flujos de un sistema técnico complejo (mecánico,
electrónico, software, ciber-físico). Al hacerlo, el estudiante practica
el pensamiento arquitectónico, pone por escrito los trade-offs (en el caso
de las bicicletas: menos servicios, más fácil de operar, más difícil de
crecer) y anticipa fallos en operación real.

**Dónde entra la IA en este tipo de trabajo:** mapea arquitecturas de
referencia (monolítica, modular, con servicios separados), ayuda a comparar
trade-offs entre alternativas y señala subsistemas o interfaces que el
estudiante no consideró (por ejemplo, la recuperación de bicicletas no
devueltas o el pago fallido).

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (la construcción de una arquitectura
propia). Para ti, la tabla es un banco de prompts: copia el de la fase donde
tu grupo se atasca (casi siempre la revisión por omisiones, cuando el diseño
ya parece terminado) y sustituye los corchetes por tu proyecto.

| Nivel Bloom | Movimiento del diseño | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 4 — Analizar | Arquitecturas de referencia | Conoce el espacio de arquitecturas y sus trade-offs | _"Necesito diseñar un sistema para [requerimiento]. ¿Qué arquitecturas de referencia existen (monolítica, modular, distribuida, etc.) y qué trade-offs imponen?"_ |
| 5 — Evaluar | Trade-offs aplicados | Compara alternativas bajo criterios técnicos | _"He preseleccionado estas arquitecturas: [lista]. Aplica los criterios [por ejemplo: escalabilidad, mantenibilidad, costo] y muéstrame ventajas/desventajas. No decidas por mí."_ |
| 6 — Crear **(dominante)** | Subsistemas críticos | Identifica omisiones en su diseño | _"Mi diseño propuesto es: [descripción]. ¿Qué subsistemas o interfaces no estoy considerando que podrían ser críticos en operación real?"_ |

## Competencias que desarrolla

- **Ingeniería** — pensamiento sistémico, integración de subsistemas, diseño con trade-offs explícitos.
- **Innovación** — exploración divergente de arquitecturas, decisión bajo incertidumbre.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="layer-group" header="Fase 1 — Requerimientos y arquitecturas" subheader="Mapeo" md="true" >}}
Levantamiento de requerimientos y revisión de arquitecturas de
referencia.
{{< /timelineItem >}}

{{< timelineItem icon="scale-balanced" header="Fase 2 — Trade-offs" subheader="Decisión" md="true" >}}
Comparación de alternativas con criterios explícitos (escalabilidad,
mantenibilidad, costo, personas disponibles para operarlo) y selección
justificada.
{{< /timelineItem >}}

{{< timelineItem icon="diagram-project" header="Fase 3 — Diseño detallado" subheader="Construcción autoral" md="true" >}}
Diseño de subsistemas e interfaces por el estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="bug-slash" header="Fase 4 — Revisión por omisiones" subheader="Anticipación de fallos" md="true" >}}
La IAG actúa como par revisor para identificar subsistemas o
interfaces no consideradas que serían críticas en operación.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del diseño

Riesgo **bajo**: los diagramas y especificaciones son difíciles de
generar consistentemente sin oficio. Junto con el diseño, el equipo entrega
estas piezas (matriz de comparación, diagrama propio, lista de interfaces),
cada una con su grado de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Documento de requerimientos | obligatoria | Versión propia del estudiante |
| Matriz arquitecturas × criterios | obligatoria | Con argumento por descarte |
| Diagrama de arquitectura propio | obligatoria | Bloque, secuencia, despliegue o lo que aplique |
| Especificación de interfaces críticas | obligatoria | Lista de interfaces con responsabilidades |
| Bitácora metacognitiva | recomendada | Trade-offs aceptados y por qué |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la matriz, el diagrama y la bitácora, no sólo el
diseño final; ajusta los pesos a tu curso (por ejemplo, más peso a «uso
crítico de la respuesta» si tu grupo adopta la primera arquitectura que la IA
menciona):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la arquitectura | Algo de análisis | Análisis de trade-offs | Pensamiento crítico — IAG como par arquitecto | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con argumento técnico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el diseño es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza trade-offs aceptados | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Arquitectura de moda adoptada sin análisis.** Salvaguarda: matriz
  trade-offs obligatoria.
- **Interfaces sin responsabilidades claras.** Salvaguarda: especificación
  obligatoria con qué hace cada componente y dónde termina.
- **Sobre-ingeniería.** Salvaguarda: la matriz incluye como criterio la
  viabilidad en el contexto real (por ejemplo, «¿tres estudiantes pueden
  operar cinco despliegues?»).
- **Ausencia de operación real.** El diseño olvida pruebas, despliegue o
  mantenimiento. Salvaguarda: el prompt avanzado obliga a pensar
  subsistemas críticos en operación.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. La arquitectura,
los trade-offs y la responsabilidad operativa son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería de sistemas, software, mecatrónica, industrial, civil
estructural.

## Ejemplos y enlaces

- Trabajo cercano: [Integración de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/integracion-de-sistemas" >}}) — etapa posterior.
- Trabajo cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — encuadre que precede al diseño.
- Trabajo cercano: [Prototipo con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/prototipo" >}}) — materialización del diseño.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
