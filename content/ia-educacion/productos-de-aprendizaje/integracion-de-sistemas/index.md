---
title: "Integración de sistemas con IAG"
date: 2026-05-11
draft: false
description: "Cómo planear la integración de subsistemas con apoyo formativo de IAG, evaluando interfaces críticas, ambigüedades en la especificación y pruebas intermedias de integración."
summary: "Integración de sistemas con IAG: identificación de interfaces críticas, detección de ambigüedades en la especificación y planeación de pruebas de integración intermedia. Progresión de prompts por nivel Bloom y rúbrica de proceso."
tags: ["producto-aprendizaje", "bloom-6", "rubrica-iag", "ingeniería", "innovación", "integración", "interfaces"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 6
bloom_rango: "4-6"
competencias_cluster: ["Ingeniería", "Innovación"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería de sistemas / Mecatrónica / Industrial / Software"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< lead >}}
La integración se rompe donde nadie miró: en la interfaz entre dos subsistemas que cada uno daba por entendida. La IAG puede señalar zonas de ambigüedad y pruebas indispensables; el orden de integración y la responsabilidad de fallos son del estudiante.
{{< /lead >}}

## Qué es y para qué sirve

La **integración de sistemas** articula subsistemas heterogéneos
(mecánico, eléctrico, software, datos) en un sistema operativo único.
Valor formativo: pensamiento de interfaces, anticipación de fallos en
integración y disciplina de pruebas intermedias.

**Uso formativo de la IAG:** identificar interfaces críticas y tipos
de fallo típicos, detectar ambigüedades en la especificación de
interfaces y orientar pruebas de integración intermedia antes del
encendido final.

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (el plan de integración propio).

| Nivel Bloom | Movimiento de la integración | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 4 — Analizar | Interfaces críticas | Identifica interfaces y fallos típicos | _"Mi proyecto integra [subsistemas: mecánico, eléctrico, software, etc.]. ¿Qué interfaces son críticas y qué tipos de fallo en la integración son típicos?"_ |
| 5 — Evaluar | Ambigüedades en la especificación | Detecta zonas de riesgo en su propia especificación | _"He definido estas interfaces: [especificación]. ¿Hay ambigüedades en la especificación que podrían generar fallos en integración? Sólo señálame las zonas de riesgo."_ |
| 6 — Crear **(dominante)** | Plan de pruebas intermedias | Define orden y momentos de prueba | _"Mi plan de integración tiene este orden: [fases]. ¿Qué pruebas de integración intermedia son indispensables y en qué momentos?"_ |

## Competencias que desarrolla

- **Ingeniería** — pensamiento de interfaces, integración multidisciplinaria, disciplina de pruebas.
- **Innovación** — anticipación de fallos en lo no observado.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="diagram-project" header="Fase 1 — Mapa de interfaces" subheader="Identificación" md="true" >}}
Mapeo de subsistemas e interfaces críticas con tipos de fallo
asociados.
{{< /timelineItem >}}

{{< timelineItem icon="file-pen" header="Fase 2 — Especificación de interfaces" subheader="Sin ambigüedad" md="true" >}}
Redacción detallada de cada interfaz: protocolos, formatos, tiempos,
unidades, responsabilidades.
{{< /timelineItem >}}

{{< timelineItem icon="magnifying-glass" header="Fase 3 — Detección de ambigüedades" subheader="Revisión cruzada" md="true" >}}
La IAG señala ambigüedades; el estudiante decide qué precisar.
{{< /timelineItem >}}

{{< timelineItem icon="vial" header="Fase 4 — Plan de pruebas intermedias" subheader="Integración por etapas" md="true" >}}
Definición de pruebas y momentos antes del encendido final.
{{< /timelineItem >}}

{{< /timeline >}}

## Evidencias de proceso requeridas

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Mapa de subsistemas e interfaces | obligatoria | Diagrama o tabla propios |
| Especificación de cada interfaz crítica | obligatoria | Protocolos, formatos, responsabilidades |
| Lista de ambigüedades resueltas | obligatoria | Antes vs. después |
| Plan de pruebas de integración | obligatoria | Fases, criterios de aceptación |
| Anotaciones de validación | obligatoria | Qué señalamientos se incorporaron |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre integrar |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el plan | Algo de análisis | Análisis y evaluación | Pensamiento crítico — IAG como par revisor de interfaces | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con criterio sistémico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el plan es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de orden e interfaces | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Interfaces no especificadas.** Salvaguarda: especificación detallada
  obligatoria con protocolos y unidades.
- **Integración "big bang".** Todo se enciende a la vez. Salvaguarda:
  pruebas intermedias obligatorias.
- **Responsabilidades difusas.** Quién es dueño de cada interfaz.
  Salvaguarda: tabla de responsabilidades obligatoria.
- **Plan sin criterios de aceptación.** Salvaguarda: criterios
  explícitos en cada prueba.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. La especificación
de interfaces y la responsabilidad de la integración son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería de sistemas, mecatrónica, industrial, software; cualquier
proyecto integrador con subsistemas heterogéneos.

## Ejemplos y enlaces

- Producto cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — etapa arquitectónica previa.
- Producto cercano: [Automatización industrial con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/automatizacion-industrial" >}}) — caso típico de integración OT/IT.
- Producto cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — encuadre del entregable.
- Marco general: ver `plan-productos-de-aprendizaje-iag.md`.

## Fuente

Marco UDG (`Guia_IAG_Educacion_Superior_FINAL`) + redacción de prompts
nivelados a Bloom específicamente para este producto.
