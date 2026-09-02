---
title: "Diseña una actividad de aprendizaje activo donde la IA pregunte, no resuelva"
date: 2026-04-14
lastmod: 2026-08-24
draft: false
aliases: ["/laboratorio/practicas/aprendizaje-activo-ia/"]
description: "Toma una actividad tuya, decide qué papel juega la IA para ti al diseñarla y cuál para el estudiante al resolverla, y escribe la instrucción de uso que recibirá el grupo."
summary: "La IA interviene en dos niveles del aprendizaje activo: ayuda al docente a diseñar actividades y al estudiante a ejecutarlas con retroalimentación inmediata."
tags: ["aprendizaje activo", "diseño didáctico", "IA generativa", "actividades de aula", "retroalimentación"]
categories: ["guia"]
areas: ["ia", "pedagogia"]
showHero: true
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
---

{{< contrato quien="Profesorado que quiere que el grupo haga algo en clase además de escuchar (resolver un caso, defender una postura, criticar una solución) y no sabe si meter la IA ayuda o hace el trabajo por el estudiante." haras="Vas a tomar una actividad tuya, vas a decidir qué papel juega la IA para ti al diseñarla (por ejemplo, generar un caso con datos ficticios) y cuál para el estudiante al resolverla (tutora que pregunta, generadora de contraejemplos, evaluadora de borradores u oponente de debate), y vas a escribir la instrucción de uso de IA que recibirá el grupo." tendras="Una actividad con el papel de la IA fijado por escrito para el grupo (por ejemplo: «Resuelvan el caso en equipo; usen la IA sólo para preguntarle qué variable no consideraron, y anoten qué respondió y qué descartaron»), más el caso o material que generaste y revisaste." tarda="Diez minutos con el caso de Marcos; treinta con una actividad tuya." ejemplo="Abajo está el caso de Marcos, profesor de administración, ya resuelto: cómo pidió el caso, qué corrigió antes de usarlo y qué instrucción dio al grupo. Después vienen tres actividades tipo más y los pasos para la tuya." >}}

## El caso de Marcos, ya resuelto

Marcos da administración en segundo semestre. Su actividad de siempre era leer un caso del libro y responder cinco preguntas; el grupo las respondía copiando párrafos. Decidió que la IA le ayudara a él a fabricar un caso nuevo y que, para el grupo, sirviera sólo para preguntar, no para resolver.

**Lo que pidió (con DeepSeek):**

> *Prompt:* Genera un caso de estudio para estudiantes de administración de segundo semestre. El caso debe involucrar una PyME mexicana que enfrenta tres problemas simultáneos: rotación de personal, caída en ventas y una demanda por incumplimiento de contrato. Incluye datos financieros ficticios pero plausibles. No incluyas la solución.

**Lo que revisó antes de entregarlo:** los datos financieros no cuadraban (las ventas caían 30 % pero la utilidad subía); los corrigió a mano. También quitó una frase que adelantaba la solución.

**La instrucción que recibió el grupo:** «Resuelvan el caso en equipos de tres. Pueden usar la IA como consultora: pregúntenle qué variable no están considerando o qué pasaría si eligen una opción, pero no le pidan la solución. Entreguen su propuesta y una lista de dos preguntas que le hicieron, con qué respondió y qué descartaron y por qué».

Con eso Marcos consiguió dos cosas: el grupo tuvo que decidir (la IA no podía decidir por ellos con esa instrucción) y él pudo ver, en la lista de preguntas, cómo pensaron. Lo que sigue te ayuda a hacer lo mismo con una actividad tuya.

## Dos decisiones que tomar: la IA para ti y la IA para el grupo

La IA puede entrar en dos momentos distintos de tu actividad, y conviene decidir cada uno por separado: qué te ayuda a **diseñar** y qué le permites hacer al estudiante mientras **resuelve**.

### Para ti, al diseñar

Como hizo Marcos con el caso, puedes usar IA para:

- Crear actividades, rúbricas y escenarios adaptados a su grupo
- Generar variantes de un mismo ejercicio para diferentes niveles
- Diseñar secuencias de preguntas con complejidad progresiva
- Construir casos de estudio basados en contextos reales

Parte de lo que quieres que el grupo sepa hacer al final ([diseño inverso](/formacion-docente/taxonomia-bloom-diseno-inverso/)) y pídele a la IA materiales para eso; revisa siempre lo que devuelve antes de usarlo, como hizo Marcos con los datos que no cuadraban.

### Para el grupo, al resolver

Elige uno de estos papeles para la IA y escríbelo en la instrucción; Marcos eligió «consultora que responde preguntas»:

- **Tutor socrático** — formula preguntas en lugar de dar respuestas
- **Generador de contraejemplos** — la IA desestabiliza la primera intuición
- **Evaluador formativo** — ofrece retroalimentación sobre borradores o soluciones parciales
- **Compañero de debate** — defiende una postura contraria para fortalecer argumentos

{{< udgia-figure id="udgia-f07-dialogo" src="dialogo-ia-aprendizaje-activo.svg" >}}
Una actividad dialógica se organiza en seis movimientos:

| Movimiento | Acción de la persona | Función pedagógica |
|---|---|---|
| Instrucción docente. | La persona recibe qué se busca, con qué se revisará y qué límites de uso tiene (por ejemplo: «usa la IA para objeciones, no para redactar»). | La interacción se vincula con un resultado de aprendizaje. |
| Interacción con IA. | La persona formula preguntas, solicita variantes y pide contrapuntos. | La IA funciona como interlocutora y no como sustituta de la tarea. |
| Respuesta del sistema. | La persona recibe la salida como plausible, no como conocimiento ya validado. | Se distingue la plausibilidad del conocimiento sustentado. |
| Contraste. | La persona compara la respuesta con fuentes, con la rúbrica y con lo que sabe de su disciplina. | La revisión activa el juicio disciplinar. |
| Justificación. | La persona acepta, descarta o transforma lo recibido y explica sus razones. | Las decisiones quedan escritas y muestran el recorrido. |
| Revisión. | La persona revisa el trabajo, documenta los cambios y abre una nueva vuelta con preguntas más precisas. | El ciclo vuelve a comenzar con más precisión. |

La IA no produce por sí sola aprendizaje activo: el diseño debe exigir que la persona
contraste, decida y sostenga sus razones. La figura es una síntesis pedagógica de enfoques
de aprendizaje activo y educación dialógica, no la representación de un efecto causal
probado para toda interacción con IA.
{{< /udgia-figure >}}

## Cuatro actividades tipo para adaptar

### 1. Estudio de caso asistido

Es la de Marcos: tú generas el caso con IA y lo revisas; el grupo lo analiza en equipos y usa la IA para explorar variables que no consideró. La instrucción al grupo fija que la IA responde preguntas y no da la solución.

### 2. Preguntas de complejidad progresiva

La IA genera una secuencia de preguntas que va de la comprensión literal a la evaluación crítica, siguiendo la [taxonomía de Bloom](/formacion-docente/taxonomia-bloom-diseno-inverso/).

**Secuencia tipo:**

| Nivel | Ejemplo de pregunta |
|-------|-------------------|
| Recordar | ¿Cuáles son los componentes del PIB? |
| Comprender | Explica con tus palabras qué mide el PIB y qué excluye |
| Aplicar | Calcula el PIB de un país ficticio con estos datos: [...] |
| Analizar | ¿Por qué el PIB de Noruega es alto pero su población es pequeña? |
| Evaluar | ¿Es el PIB un buen indicador de bienestar? Argumenta con datos |
| Crear | Propón un indicador alternativo al PIB que capture lo que este omite |

### 3. Simulación de roles con IA

El estudiante y la IA asumen roles en un escenario profesional simulado. La IA no se sale del personaje asignado.

**Ejemplo con Gemini:**

> *Prompt:* Eres el director de recursos humanos de una empresa de manufactura en Guadalajara. Yo soy un consultor externo. Voy a proponerte un plan de retención de talento. Tu papel es cuestionarlo con objeciones realistas: presupuesto limitado, resistencia del sindicato y rotación estacional. No aceptes propuestas sin datos que las respalden.

### 4. Think-pair-share con validación IA

Adaptación del clásico *think-pair-share* donde se añade un paso de validación:

1. **Think** — el estudiante piensa individualmente
2. **Pair** — discute con un compañero
3. **IA-check** — formulan lo consensuado como prompt y la IA lo cuestiona o enriquece
4. **Share** — presentan al grupo incorporando lo que la IA aportó y lo que descartaron

## Haz lo mismo con una actividad tuya, paso a paso

1. **Escribe qué debe saber hacer el grupo al terminar** (Marcos: «decidir entre tres problemas cuál atender primero y justificarlo»).
2. **Pide a la IA el material que te falte** (un caso, una secuencia de preguntas, un escenario) y revísalo: datos que no cuadran, soluciones adelantadas, contexto ajeno.
3. **Elige el papel de la IA para el grupo** entre los cuatro de arriba y escríbelo en una frase de la instrucción.
4. **Escribe con qué revisarás el trabajo** (por ejemplo: «la propuesta nombra el problema prioritario y da una razón con datos del caso»).
5. **Pide una nota de lo que preguntaron y descartaron**: dos preguntas hechas a la IA, qué respondió y qué hicieron con ello. Esa nota es lo que te deja ver cómo pensaron.

El diagrama resume los pasos:

{{< mermaid >}}
flowchart TD
    A[Definir competencia objetivo] --> B[Generar actividad con IA]
    B --> C{Revisar y adaptar}
    C -->|Actividad adecuada| D[Definir rol de la IA para el estudiante]
    C -->|Necesita ajuste| B
    D --> E[Escribir con qué se revisará el trabajo]
    E --> F[Crear instrucciones explícitas de uso de IA]
    F --> G[Implementar en el aula]
    G --> H[Recoger las notas de preguntas y descartes]
{{< /mermaid >}}

## Cómo saber si la IA hace el trabajo o lo cuestiona

Revisa tu instrucción contra esta tabla; si queda en la columna izquierda, cambia el papel de la IA.

| La IA hace el trabajo | La IA lo cuestiona |
|---|---|
| El estudiante le pide a la IA que resuelva el ejercicio | El estudiante resuelve y la IA cuestiona su solución |
| El docente copia la actividad generada por IA sin revisarla | El docente adapta y contextualiza lo que la IA propone |
| La IA da la respuesta correcta | La IA hace preguntas que obligan a pensar |
| Se usa IA porque está de moda | Se usa IA porque amplifica una estrategia pedagógica |

## Consejos pedagógicos

{{< alert icon="lightbulb" type="info" >}}
**Define el rol de la IA por adelantado.** Si no le dices al estudiante para qué usar la IA en la actividad, la usará para saltarse el proceso. Incluye instrucciones explícitas: "Usa Claude como evaluador de tu borrador, no como redactor."
{{< /alert >}}

{{< alert icon="lightbulb" type="info" >}}
**La IA te quita producción de material, no el aula.** Con el caso ya generado y revisado, tu tiempo en clase va a facilitar la discusión, observar cómo deciden los equipos y comentar sus notas de preguntas y descartes.
{{< /alert >}}

## Lecturas relacionadas

- La [evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) complementa esta guía con instrumentos de retroalimentación iterativa.
- La [guía de ingeniería de prompts](/ia-educacion/guias/ingenieria-de-prompts-para-docentes/) ofrece el marco técnico para formular instrucciones a la IA.

{{< referencias >}}

- Bonwell, C. C., & Eison, J. A. (1991). *Active learning: Creating excitement in the classroom* (ASHE-ERIC Higher Education Report No. 1). George Washington University.
- Chi, M. T. H., & Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes. *Educational Psychologist*, *49*(4), 219–243. https://doi.org/10.1080/00461520.2014.965823
- Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). Active learning increases student performance in science, engineering, and mathematics. *Proceedings of the National Academy of Sciences*, *111*(23), 8410–8415. https://doi.org/10.1073/pnas.1319030111
- Prince, M. (2004). Does active learning work? A review of the research. *Journal of Engineering Education*, *93*(3), 223–231. https://doi.org/10.1002/j.2168-9830.2004.tb00809.x

{{< /referencias >}}
