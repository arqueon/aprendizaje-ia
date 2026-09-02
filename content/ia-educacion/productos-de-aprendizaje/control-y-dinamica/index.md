---
title: "Control y dinámica con IAG"
date: 2026-05-11
draft: false
description: "Cómo analizar y diseñar un sistema de control con apoyo formativo de IAG, evaluando especificaciones de desempeño, características dinámicas y robustez."
summary: "Control y dinámica con IAG: especificaciones razonables, lectura de polos/ceros/retardos y pruebas de robustez antes de declarar el controlador aceptable. Progresión de prompts por nivel Bloom y rúbrica de proceso."
featured_alt: "Estudiante ajusta un controlador mientras un sistema de nivel responde a una perturbación de agua."
tags: ["producto-aprendizaje", "bloom-4", "rubrica-iag", "ingeniería", "cognitivas", "control", "dinámica", "robustez"]
categories: ["producto-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia"]

bloom_dominante: 4
bloom_rango: "3-5"
competencias_cluster: ["Ingeniería", "Cognitivas"]
area_disciplinar: "ingenieria"
riesgo_sustitucion_autoria: "bajo"
modalidad: "cualquiera"
asignatura_ejemplo: "Ingeniería en control / Mecatrónica / Eléctrica / Mecánica"

showHero: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false
---

{{< contrato modo="ejemplo" quien="Docentes de control, mecatrónica o eléctrica que piden diseñar un controlador (un PID para un tanque de nivel, un lead-lag para un motor de corriente directa) y reciben controladores que funcionan en la simulación limpia y se caen en cuanto entra una perturbación." haras="Una estudiante de sexto semestre debe controlar el nivel de un tanque de laboratorio con un PID. Primero fija con la IA qué especificaciones son razonables para esa planta (sobreimpulso menor al 10 %, establecimiento en menos de 40 segundos), después identifica ella sola qué polo y qué retardo dominan la respuesta, sintoniza el controlador por su cuenta y, antes de darlo por bueno, le aplica tres pruebas de robustez que la IA le ayudó a listar (una perturbación de caudal, un 20 % de error en el área del tanque, ruido en el sensor). Entrega el controlador, el documento de especificaciones razonadas y los resultados de las tres pruebas." tendras="Tres prompts copiables, uno por fase, y una regla de revisión para tu curso: «el documento de polos, ceros y retardos va fechado antes del sintonizado; sin él, el controlador se aceptó por prueba y error»." tarda="Ocho minutos de lectura; quince si adaptas los prompts a tu planta." ejemplo="Empieza con el tanque de nivel, en el primer párrafo, y vuelve a él en las fases y en las salvaguardas." >}}

Un profesor de control pide a su grupo diseñar un PID para el tanque de nivel del
laboratorio: una bomba llena el tanque, una válvula lo vacía y el sensor mide la altura
del agua. Una estudiante lo sintoniza en el simulador y la respuesta queda impecable;
cuando el profesor abre la válvula de salida un poco más, el nivel oscila y no se
establece. Un controlador se evalúa cuando lo presionan, no cuando funciona en
condiciones limpias. La IA puede orientar qué especificaciones son razonables y qué
pruebas de robustez aplicar; la lectura dinámica del sistema y la responsabilidad del
sintonizado son de la estudiante.

## Qué es y para qué sirve

El análisis y diseño de **control y dinámica** trabaja con sistemas
realimentados: planta, controlador, especificaciones de desempeño y
robustez ante perturbaciones e incertidumbre paramétrica. Lo que forma
es la lectura de polos, ceros y retardos (en el tanque, la constante de
tiempo del llenado y el retardo del sensor), el sintonizado con una razón
para cada ganancia y las pruebas de robustez explícitas.

**Dónde entra la IA en este tipo de trabajo:** verifica que las
especificaciones sean razonables para el tipo de planta (por ejemplo, pedir
un establecimiento de 2 segundos a un tanque que tarda 30 en llenarse es
irreal), ayuda a identificar qué características dinámicas dominan y orienta
qué pruebas de robustez aplicar antes de declarar el controlador aceptable.
Las ganancias las decide la estudiante.

## Bloom y progresión de prompts

Nivel dominante **4 — Analizar** (la lectura de características
dinámicas del sistema). Para ti, la tabla es un banco de prompts: copia el
de la fase en la que tu grupo se atasca (casi siempre la de robustez, cuando
aceptan el controlador con la primera simulación limpia) y sustituye los
corchetes por tu planta.

| Nivel Bloom | Movimiento del control | Qué hace el estudiante | Prompt sugerido |
|---|---|---|---|
| 3 — Aplicar | Especificaciones | Define metas razonables para la planta | _"Tengo este sistema [descripción] y quiero diseñar un controlador [PID, lead-lag, etc.]. ¿Qué especificaciones de desempeño (overshoot, tiempo de establecimiento, error en régimen) son razonables para este tipo de planta?"_ |
| 4 — Analizar **(dominante)** | Características dinámicas | Identifica polos, ceros y retardos dominantes | _"Mi función de transferencia es [forma general]. ¿Qué características del sistema (polos, ceros, retardos) condicionan más fuertemente la respuesta y cómo lo identifico sin resolver?"_ |
| 5 — Evaluar | Robustez | Aplica pruebas explícitas antes de aceptar el controlador | _"He sintonizado mi controlador con [método]. ¿Qué pruebas de robustez (perturbaciones, incertidumbre paramétrica, ruido) debo aplicar antes de declararlo aceptable?"_ |

## Competencias que desarrolla

- **Ingeniería** — análisis dinámico, sintonizado con criterio, pruebas de robustez.
- **Cognitivas** — abstracción frecuencial y temporal, juicio sobre umbrales de aceptabilidad.

## Secuencia de la actividad (proceso → producto)

{{< timeline >}}

{{< timelineItem icon="bullseye" header="Fase 1 — Especificaciones" subheader="Encuadre" md="true" >}}
Definición de metas de desempeño con la IA como referencia de lo
razonable (para el tanque: sobreimpulso menor al 10 %, establecimiento en
menos de 40 segundos, error nulo en régimen). La estudiante escribe por qué
esos valores y no otros.
{{< /timelineItem >}}

{{< timelineItem icon="chart-line" header="Fase 2 — Lectura dinámica" subheader="Análisis" md="true" >}}
Identificación de polos, ceros y retardos dominantes; lectura física
del sistema (qué polo corresponde al llenado del tanque, qué retardo al
sensor). Se documenta antes de tocar el controlador.
{{< /timelineItem >}}

{{< timelineItem icon="sliders" header="Fase 3 — Sintonizado" subheader="Sin IAG en la decisión" md="true" >}}
Sintonizado del controlador por la estudiante con el método que elija
(Ziegler-Nichols, lugar de las raíces, ajuste manual justificado). La IA
queda fuera de esta decisión.
{{< /timelineItem >}}

{{< timelineItem icon="shield-halved" header="Fase 4 — Robustez" subheader="Pruebas explícitas" md="true" >}}
Aplicación de pruebas de perturbación, incertidumbre y ruido antes
de aceptar el resultado (abrir más la válvula de salida, cambiar un 20 % el
área del tanque, meter ruido en el sensor). Cada prueba con su gráfica y una
línea que diga si pasó.
{{< /timelineItem >}}

{{< /timeline >}}

## Qué entrega el estudiante además del controlador

Riesgo **bajo**: la IA puede escribir un controlador, pero difícilmente las
pruebas contra una planta real. Junto con el controlador, la estudiante
entrega estas piezas (especificaciones razonadas, lectura dinámica, pruebas),
cada una con su grado de obligación:

| Evidencia | Estado | Forma concreta |
|---|---|---|
| Bitácora del diálogo con IAG | recomendada | Transcripción por fase |
| Documento de especificaciones razonadas | obligatoria | Por qué estos valores y no otros |
| Lectura dinámica documentada | obligatoria | Polos/ceros/retardos identificados |
| Sintonizado con método y justificación | obligatoria | Pasos y decisiones |
| Resultados de pruebas de robustez | obligatoria | Mínimo 3 pruebas con resultados |
| Anotaciones de validación | obligatoria | Qué se aceptó/rechazó del análisis IAG |
| Bitácora metacognitiva | recomendada | Qué aprendió sobre dinámica del sistema |
| Declaración de uso de IAG | obligatoria | Modelo, contexto y propósito |

## Cómo se evalúa (rúbrica de proceso)

Con esta rúbrica revisas la lectura dinámica, el sintonizado y las pruebas,
no sólo la gráfica final; ajusta los pesos a tu curso (por ejemplo, más peso
a «uso crítico de la respuesta» si tu grupo acepta las especificaciones que
la IA propone sin discutirlas):

| Criterio | N1 Inicial | N2 En desarrollo | N3 Competente | N4 Avanzado | Peso |
|---|---|---|---|---|---|
| Pertinencia del prompt | Vago | Relación parcial | Claro y adecuado | Pertinente y estratégico | 10% |
| Nivel cognitivo del prompt | Pide el controlador | Algo de análisis | Análisis dinámico | Pensamiento crítico — IAG como par revisor | 15% |
| Uso crítico de la respuesta | Acepta sin cuestionar | Cuestiona poco | Contrasta y analiza | Evalúa y reformula con argumento dinámico | 20% |
| Integración en el trabajo | Copia | Uso limitado | Integra y adapta | Transforma; el diseño es propio | 20% |
| Iteración del prompt | No ajusta | Ajustes mínimos | Mejora prompts | Itera estratégicamente | 10% |
| Metacognición | No reflexiona | Reflexión superficial | Explica su aprendizaje | Analiza decisiones de sintonizado | 15% |
| Uso ético | Inadecuado | Básico | Adecuado | Crítico y consciente | 10% |

## Riesgos y salvaguardas

- **Especificaciones irreales.** La estudiante pide un establecimiento de
  2 segundos a un tanque que tarda 30 en llenarse. Salvaguarda: cada valor
  se justifica contra el tipo de planta.
- **Sintonizado sin lectura dinámica.** Ajusta ganancias a ciegas hasta que
  la curva se ve bien. Salvaguarda: el documento de polos, ceros y retardos
  va fechado antes del sintonizado.
- **Aceptación sólo en condiciones nominales.** Funciona en la simulación
  limpia y oscila con la válvula abierta. Salvaguarda: tres pruebas de
  robustez obligatorias, con gráfica.
- **Errores algebraicos heredados.** La IA entrega una función de
  transferencia con un signo cambiado y todo el diseño arrastra el error.
  Salvaguarda: la estudiante verifica a mano la función de transferencia
  antes de usarla.

{{< alert icon="shield-halved" type="warning" >}}
**Transparencia obligatoria.** La estudiante declara el modelo y para qué
lo usó (por ejemplo, «pedí una lista de pruebas de robustez en la fase 4»).
La lectura dinámica y el sintonizado son suyos; las pruebas de robustez son
su responsabilidad.
{{< /alert >}}

## Asignatura de ejemplo

Ingeniería en control, mecatrónica, eléctrica, mecánica; cualquier
asignatura con sistemas dinámicos realimentados.

## Ejemplos y enlaces

- Trabajo cercano: [Circuitos eléctricos con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/circuitos-electricos" >}}) — análisis previo en régimen estático.
- Trabajo cercano: [Modelado matemático con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/modelado-matematico" >}}) — base de la función de transferencia.
- Trabajo cercano: [Automatización industrial con IAG]({{< ref "/ia-educacion/productos-de-aprendizaje/automatizacion-industrial" >}}) — aplicación industrial.

{{< referencias titulo="Procedencia editorial" >}}

Elaboración editorial del sitio para este catálogo. La progresión usa Bloom como vocabulario descriptivo e integra criterios de revisión del proceso (por ejemplo, el uso crítico de la respuesta de la IA); no presenta una política institucional ni una rúbrica obligatoria.

{{< /referencias >}}
