---
title: "Integración de sistemas con IAG"
date: 2026-05-11
draft: false
description: "Cómo planear la integración de subsistemas con apoyo formativo de IAG, evaluando interfaces críticas, ambigüedades en la especificación y pruebas intermedias de integración."
summary: "Integración de sistemas con IAG: identificación de interfaces críticas, detección de ambigüedades en la especificación y planeación de pruebas de integración intermedia. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Dos manos prueban el conector entre subsistemas mecánicos, eléctricos, de control y registro antes de integrarlos."
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

{{< contrato modo="ejemplo" quien="Docentes de mecatrónica, sistemas o proyectos integradores que ven a los equipos construir cada parte por separado (chasis, placa de motores, software) y encenderlo todo junto la noche anterior a la entrega, cuando nada se habla con nada." haras="Un equipo de mecatrónica integra un carrito autónomo para repartir piezas en un taller: chasis y motores de una persona, placa de control de otra, software de navegación de una tercera. Pregunta a la IA qué interfaces son críticas y qué fallos son típicos, escribe la especificación de cada interfaz, le pide a la IA que señale ambigüedades (encuentra que la velocidad viaja por el puerto serie sin decir si va en mm/s o en cm/s) y arma un plan de pruebas intermedias antes del encendido final. Entrega el mapa de interfaces, las especificaciones, la lista de ambigüedades resueltas y el plan de pruebas. La IA entra en las fases 1, 3 y 4; el orden de integración y la responsabilidad de que funcione son del equipo." tendras="Una secuencia de cuatro fases con sus prompts copiables y una regla de revisión: «cada interfaz lleva dueño, unidades y prueba (por ejemplo, ‘puerto serie placa–software: dueño Ana, velocidad en mm/s, prueba: el motor gira a la velocidad enviada ±5 %’)»." tarda="Ocho minutos de lectura; doce si adaptas los prompts a tu proyecto integrador." ejemplo="Empieza con el caso del carrito autónomo, en el primer párrafo, y vuelve a él en las fases y en las salvaguardas." >}}

Un profesor de proyecto integrador de mecatrónica pide un carrito autónomo que lleve
piezas de una estación a otra del taller. El equipo reparte el trabajo: una persona hace
el chasis y los motores, otra la placa de control, otra el software de navegación. Tres
semanas después cada parte funciona sola; juntas, el carrito arranca a diez veces la
velocidad pedida, porque la placa esperaba milímetros por segundo y el software enviaba
centímetros. La integración se rompe donde nadie miró: en la interfaz que cada uno daba
por entendida. La IA puede señalar zonas de ambigüedad y qué pruebas hacer antes de
encender todo; el orden de integración y la responsabilidad de los fallos son del equipo.

## Qué es y para qué sirve

La **integración de sistemas** articula subsistemas heterogéneos
(mecánico, eléctrico, software, datos) en un sistema operativo único.
Al hacerlo, el estudiante practica el pensamiento de interfaces, la
anticipación de fallos en integración (unidades distintas, tiempos de
respuesta que nadie fijó) y la disciplina de pruebas intermedias.

**Dónde entra la IA en este tipo de trabajo:** identifica interfaces
críticas y tipos de fallo típicos (el puerto serie entre placa y
software, la alimentación compartida entre motores y sensores), detecta
ambigüedades en la especificación que el equipo escribió y orienta las
pruebas de integración intermedia antes del encendido final.

## Bloom y progresión de prompts

Nivel dominante **6 — Crear** (el plan de integración propio). Para ti,
la tabla es un banco de prompts: el de la fase 3 (ambigüedades) es el que
evita la noche anterior a la entrega; cópialo y pídele al equipo que pegue
su especificación real.

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

## Qué entrega el equipo además del sistema integrado

Junto con el sistema funcionando, el equipo entrega estas piezas (mapa de
interfaces, especificaciones, plan de pruebas), cada una con su grado de
obligación:

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

Con esta rúbrica revisas las especificaciones, la lista de ambigüedades y el
plan de pruebas, no sólo si el sistema encendió; ajusta los pesos a tu curso
(por ejemplo, más peso a «metacognición» si quieres que el equipo explique
qué orden de integración eligió y por qué):

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
- **Plan sin criterios de aceptación.** Salvaguarda: cada prueba dice
  qué resultado la aprueba (por ejemplo, «el motor gira a la velocidad
  enviada ±5 %»).

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** Declarar uso de IAG. La especificación
de interfaces y la responsabilidad de la integración son del estudiante.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería de sistemas, mecatrónica, industrial, software; cualquier
proyecto integrador con subsistemas heterogéneos.

## Ejemplos y enlaces

- Trabajo cercano: [Diseño de sistemas con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/diseno-de-sistemas" >}}) — etapa arquitectónica previa.
- Trabajo cercano: [Automatización industrial con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/automatizacion-industrial" >}}) — caso típico de integración OT/IT.
- Trabajo cercano: [Proyecto con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/proyecto" >}}) — encuadre del entregable.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
