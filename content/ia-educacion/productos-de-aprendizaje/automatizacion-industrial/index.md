---
title: "Automatización industrial con IAG"
date: 2026-05-11
draft: false
description: "Cómo diseñar una solución de automatización industrial con apoyo formativo de IAG, evaluando la arquitectura de control, la seguridad operacional y las pruebas de aceptación."
summary: "Automatización industrial con IAG: arquitecturas de control (PLC, DCS, SCADA), selección de sensores y actuadores, seguridad operacional y pruebas FAT/SAT. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Dos estudiantes prueban sensores y un segmento de seguridad en una línea automatizada de laboratorio."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "ingeniería", "innovación", "automatización", "control-industrial"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 6
bloom_rango: "3-6"
competencias_cluster: ["Ingeniería", "Innovación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería en automatización / Mecatrónica / Industrial / Eléctrica"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de automatización, mecatrónica o ingeniería eléctrica que piden como proyecto integrador una propuesta de control para un proceso real (una línea de envasado, una caldera, una banda de clasificación) y reciben diagramas vistosos sin análisis de qué pasa cuando algo falla." haras="Un equipo de séptimo semestre debe automatizar la línea de envasado de una embotelladora pequeña: llenado, tapado y etiquetado. Pregunta a la IA qué arquitectura conviene (un PLC con HMI, no un DCS), selecciona sensores y actuadores con hojas de datos, y después le pide a la IA que señale riesgos que no consideró (un atasco en el tapado con la banda en marcha, el acceso remoto al PLC sin contraseña) y qué pruebas de aceptación son indispensables antes de arrancar. Entrega el diagrama P&ID, el HAZOP simplificado y el plan de pruebas." tendras="Cuatro prompts copiables y una regla de revisión que puedes usar mañana: «sin análisis de riesgo (HAZOP simplificado o equivalente) la propuesta no se revisa; cada sensor lleva una línea que dice por qué ése y no otro»." tarda="Ocho minutos de lectura; doce si copias los prompts para tu proyecto." ejemplo="Empieza con el caso de la línea de envasado, en el primer párrafo, y vuelve a él en la secuencia de fases y en las salvaguardas." >}}

Un profesor de automatización plantea a sus equipos una línea de envasado real: una
embotelladora pequeña que llena, tapa y etiqueta 1 200 botellas por hora y quiere dejar
de hacerlo a mano. Cada equipo entrega una propuesta de control. Lo que el profesor
revisa es cómo se comporta esa propuesta cuando algo falla (una botella atorada en el
tapado, un sensor de nivel que se ensucia), más que cómo luce el diagrama. La IA puede
mapear arquitecturas y recordar qué pruebas son indispensables; responder por la
seguridad de quien opera la línea es trabajo del equipo.

## Qué es y para qué sirve

La **automatización industrial** propone una solución de control para
un proceso productivo o de servicio: arquitectura, instrumentación,
lógica y pruebas. Lo que el estudiante aprende: a integrar piezas
técnicas, a pensar en la seguridad de quien opera (qué pasa si el paro de
emergencia falla) y a seguir el hilo desde el requerimiento hasta la
puesta en marcha.

**Dónde entra la IA en este tipo de trabajo:** mapea arquitecturas de
control, identifica errores típicos de selección de instrumentación (un
sensor capacitivo donde hay espuma), señala riesgos de seguridad
operacional y orienta las pruebas de aceptación (FAT/SAT). El diseño y el
análisis de riesgo los hace el estudiante.

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (la propuesta integrada lista para
pruebas). Para ti, la tabla es un banco de prompts: copia el de la fase en
la que tu grupo se atasca (casi siempre la de seguridad operacional, cuando
el diseño sólo contempla el funcionamiento normal) y sustituye los
corchetes por tu proceso.

| Nivel Bloom | Movimiento del diseño | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Arquitectura de control | Decide entre PLC, DCS, SCADA, edge | _"Necesito automatizar [proceso]. ¿Qué arquitecturas de control son estándar (PLC, DCS, SCADA, edge computing) y qué condiciona la elección?"_ |
| 4 — Analizar | Instrumentación | Selecciona sensores y actuadores con criterio | _"Para mi proceso, los actuadores y sensores candidatos son [lista]. ¿Qué criterios técnicos uso para seleccionarlos y qué errores típicos de selección debo evitar?"_ |
| 5 — Evaluar | Seguridad operacional | Identifica riesgos no considerados | _"He propuesto esta arquitectura de automatización: [descripción]. ¿Qué riesgos de seguridad operacional (process safety, ciberseguridad OT) no estoy considerando?"_ |
| 6 — Crear **(dominante)** | Pruebas de aceptación | Estructura FAT/SAT | _"Tengo el diseño funcional. ¿Qué pruebas de aceptación (FAT/SAT) son indispensables antes de la puesta en marcha y cómo las estructuro?"_ |

## Competencias que desarrolla

- **Ingeniería** — integración de sistemas de control, seguridad operacional, normativa industrial.
- **Innovación** — propuesta técnica completa con conciencia de fallo.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="industry" header="Fase 1 — Proceso y arquitectura" subheader="Encuadre" md="true" >}}
Caracterización del proceso a automatizar y elección de arquitectura
de control.
{{< /timelineItem >}}

{{< timelineItem icon="circle-nodes" header="Fase 2 — Instrumentación y lógica" subheader="Diseño" md="true" >}}
Selección de sensores, actuadores y desarrollo de la lógica de
control por el estudiante.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 3 — Seguridad operacional" subheader="Revisión de riesgos" md="true" >}}
Identificación con IAG de riesgos no considerados (process safety y
ciberseguridad OT).
{{< /timelineItem >}}

{{< timelineItem icon="vial" header="Fase 4 — Pruebas FAT/SAT" subheader="Aceptación" md="true" >}}
Estructuración de pruebas indispensables antes de la puesta en
marcha.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además de la propuesta

Junto con la propuesta de control, el equipo entrega estas piezas (el
diagrama, el análisis de riesgo, el plan de pruebas), cada una con su grado
de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| P&ID o diagrama de arquitectura | obligatoria | Diagrama propio del estudiante |
| Lista de instrumentación con criterio | obligatoria | Hojas de selección con justificación |
| Análisis de riesgo operacional | obligatoria | HAZOP simplificado, LOPA o análogo |
| Plan de pruebas FAT/SAT | obligatoria | Protocolo de aceptación |
| Anotaciones de validación | obligatoria | Qué riesgos señalados se incorporaron |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre operar bajo riesgo |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la bitácora y las anotaciones de validación, no
sólo el diagrama; ajusta los pesos a tu curso (por ejemplo, más peso a «uso
ético» si tu proyecto toca procesos con riesgo para personas):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide la solución | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como par auditor | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con criterio de seguridad | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; la propuesta es propia | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de seguridad | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico — conciencia de riesgo a personas y entorno | 10% |

## Riesgos y salvaguardas

- **Diseño sin análisis de riesgo.** Grave. Salvaguarda: HAZOP o
  análogo obligatorio.
- **Instrumentación sobre-especificada.** Salvaguarda: justificación
  por componente obligatoria.
- **Ciberseguridad OT no considerada.** Salvaguarda: el prompt nivel 5
  obliga a nombrarla explícitamente.
- **Pruebas FAT/SAT ausentes o triviales.** Salvaguarda: protocolo de
  aceptación obligatorio.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG y entregar análisis
de riesgo. La responsabilidad operacional de la propuesta es del
estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería en automatización, mecatrónica, industrial, eléctrica;
proyectos integradores con instrumentación de procesos.

## Ejemplos y enlaces

- Trabajo cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — encuadre arquitectónico previo.
- Trabajo cercano: [Control y dinámica con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/control-y-dinamica" >}}) — base teórica de la lógica de control.
- Trabajo cercano: [Integración de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/integracion-de-sistemas" >}}) — integración con TI.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
