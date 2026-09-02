---
title: "Rediseña tu proyecto de semestre (ABP) fase por fase: dónde entra la IA y qué entrega el estudiante"
date: 2026-04-20
draft: false
description: "Toma un proyecto que ya diriges y decide, en cada una de sus cuatro fases, qué le pide el estudiante a la IA, qué comprueba por su cuenta y qué te entrega. Terminas con el calendario del proyecto anotado."
summary: "Descubre cómo transformar el ABP tradicional utilizando la IA como un co-productor activo. Esta guía explora el diseño de escenarios complejos, la investigación asistida, la iteración socrática y la evaluación del proceso cognitivo."
tags: ["ABP", "metodología", "evaluación formativa", "agenciamiento (ensamblaje)", "trabajo colaborativo"]
categories: ["guia"]
areas: ["ia", "pedagogia"]
showHero: true
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
---

{{< contrato quien="Profesorado que ya dirige un proyecto de semestre (un diagnóstico, un plan, un prototipo) y ve que el grupo llega con entregas pulidas que pudo generar una IA la noche anterior." haras="Vas a tomar tu proyecto y a decidir, fase por fase (definir el problema, investigar, poner a prueba la hipótesis, presentar), qué le puede pedir el estudiante a la IA, qué debe comprobar por su cuenta y qué te entrega en cada fase, con la lista de verificación del final." tendras="Un calendario de tu proyecto con cuatro fases y, en cada una, el papel de la IA y la entrega que le pides al grupo (por ejemplo: «Fase 2: la IA resume literatura; el estudiante entrega la tabla de fuentes verificadas y descartadas, con la razón de cada descarte»)." tarda="Diez minutos si sólo recorres el caso de Marcela; entre cuarenta y sesenta si rediseñas un proyecto tuyo." ejemplo="Abajo está el caso de Marcela, docente de Arquitectura, con su proyecto de sostenibilidad urbana ya repartido en cuatro fases." >}}

## El caso de Marcela, ya resuelto

Marcela imparte tercer semestre de Arquitectura y Urbanismo. Cada semestre pide un proyecto de cuatro semanas sobre sostenibilidad urbana y el último grupo entregó láminas impecables que nadie supo defender en la exposición. Repartió el proyecto así:

| Fase | Qué pide el estudiante a la IA | Qué comprueba por su cuenta | Qué entrega a Marcela |
|---|---|---|---|
| 1. Problema | Un escenario de barrio con datos plausibles (población, uso de suelo, transporte). | Qué variables del escenario son creíbles para un barrio real de Guadalajara. | El escenario reescrito, con dos variables cambiadas y la razón. |
| 2. Investigación | Un resumen de literatura sobre islas de calor urbanas. | Que cada referencia exista en Scholar o Scopus. | Una tabla de fuentes: verificadas, descartadas y por qué. |
| 3. Hipótesis | Objeciones a su propuesta («techos verdes reducen 3 °C la temperatura de la manzana»). | Cuáles objeciones se sostienen con las fuentes verificadas. | Dos versiones de la propuesta y una nota de qué cambió entre ellas. |
| 4. Presentación | Ayuda con el guion y la infografía. | Que puede explicar cada elemento sin mirar la conversación. | La exposición y una defensa de tres minutos con preguntas del grupo. |

Cambió una sola regla de calificación: la versión final pesa la mitad; la otra mitad son las tablas y notas de las fases 1 a 3. Con eso ve el recorrido, y el grupo sabe desde el día uno qué se le va a preguntar.

## 1. Qué cambia cuando la IA entra al ABP

En el ABP tradicional, el estudiante define un problema, investiga, formula hipótesis, itera y presenta resultados. La IA no sustituye ninguna de estas fases: las transforma. El par estudiante-IA constituye lo que Deleuze y Guattari (1987) denominan un *agenciamiento (ensamblaje)* —lo que en este sitio llamamos **co-creación**—: una máquina productiva que genera algo que ninguno de los dos produciría solo.

La diferencia operativa es que la IA permite:

- Generar escenarios de problema más complejos y situados
- Contrastar hipótesis con un interlocutor que no se cansa ni se ofende
- Iterar sobre versiones intermedias (un esquema, un borrador, un plano) con retroalimentación inmediata
- Documentar cada decisión en un registro trazable (logs de prompts, versiones)

Lo que la IA **no** puede hacer es decidir qué importa, qué se descarta y por qué. Eso sigue siendo responsabilidad del estudiante.

---

## 2. Las 4 fases del ABP asistido por IA

La integración efectiva de la IA modifica sustancialmente el ciclo de vida del ABP. A continuación, detallamos cómo estructurar cada etapa.

### Fase 1: Definición del problema y escenario

El docente puede usar IA para generar escenarios complejos adaptados al contexto disciplinar. El estudiante recibe el escenario y lo reformula con apoyo de la IA.

**Ejemplo con Gemini:**

> *Prompt:* Actúa como consultor en salud pública. Genera un escenario de brote epidemiológico en una ciudad de 200,000 habitantes con estas condiciones: sistema de salud saturado, desinformación en redes sociales y una población con 40% de adultos mayores. Incluye datos ficticios pero plausibles.

El estudiante no usa el escenario tal cual: lo evalúa, lo modifica y decide qué variables conservar.

{{< alert icon="lightbulb" type="info" >}}
**Idea para el Aula:** Pide a tus estudiantes que soliciten a la IA (ej. Gemini o Claude) que actúe como un "cliente conflictivo" o un "stakeholder afectado" por el problema que intentan resolver. La entrevista con este agente de IA les ayudará a definir mejor su objetivo.
{{< /alert >}}

### Fase 2: Investigación y búsqueda de fuentes

La IA asiste en la búsqueda y síntesis de literatura, pero el estudiante opera como curador crítico.

**Protocolo recomendado:**

1. El estudiante formula la pregunta de investigación *antes* de consultar la IA.
2. Usa al menos dos modelos distintos (por ejemplo, Claude y DeepSeek) para contrastar las síntesis generadas.
3. Verifica toda referencia bibliográfica en bases de datos.
4. Documenta qué información aceptó, cuál rechazó y por qué.

{{< mermaid >}}
graph TD
    A["Estudiante formula pregunta"] --> B["IA Generativa sintetiza"]
    B --> C{"¿La fuente es verificable?"}
    C -- "Sí" --> D["Integrar al marco teórico"]
    C -- "No" --> E["Pedir a la IA citas exactas / Buscar en bases de datos"]
    E --> F["Refinar pregunta y volver a iterar"]
{{< /mermaid >}}

{{< alert icon="triangle-exclamation" type="danger" >}}
**Verificación obligatoria.** Las IA generan referencias bibliográficas que parecen reales pero no existen. El estudiante debe verificar cada fuente en Google Scholar, Scopus o bases de datos disciplinares antes de incluirla.
{{< /alert >}}

### Fase 3: Formulación de hipótesis e iteración (Tutor Socrático)

La IA funciona como *adversario epistémico*: el estudiante le presenta su hipótesis y la IA la refuta, la cuestiona o la lleva a sus consecuencias lógicas.

**Ejemplo con Claude:**

> *Prompt:* Soy estudiante de ingeniería ambiental. Mi hipótesis es que la reforestación con especies nativas reduce la erosión del suelo en un 60% en zonas semiáridas de Jalisco en un periodo de 5 años. Cuestiona esta hipótesis desde tres perspectivas: ecológica, económica y de implementación. Señala los supuestos no explícitos.

**Ciclo recomendado:**

{{< mermaid >}}
graph LR
    A["Borrador"] --> B["Retroalimentación IA"]
    B --> C["Revisión propia"]
    C --> D["Retroalimentación de pares"]
    D --> E["Versión final"]
{{< /mermaid >}}

En cada ciclo, el estudiante registra los cambios realizados y la justificación. Ese registro (qué cambió en cada versión y por qué) es lo que te permite ver el proceso, no sólo la versión final.

### Fase 4: Presentación y comunicación

La IA puede asistir en la preparación de piezas comunicativas (presentaciones, infografías, reportes), pero el estudiante debe poder explicar y defender cada decisión ante el grupo y el docente.

**Regla clave:** si el estudiante no puede explicar por qué incluyó algo en su presentación o reporte, ese elemento no debería estar ahí.

---

## 3. Evaluando procesos, no resultados

El mayor riesgo del ABP actual es evaluar solo el "entregable", el cual pudo haber sido generado 100% por una IA en el último minuto. Para evitar esto, la evaluación debe ser formativa y trazable.

{{< alert icon="triangle-exclamation" type="danger" >}}
**Punto clave:** evaluamos las **decisiones del estudiante** (qué le preguntó a la IA, por qué modificó su prompt, cómo validó el resultado), más que la respuesta correcta.
{{< /alert >}}

**Herramientas de Evaluación Sugeridas:**
1. **Diarios de Reflexión (Logs):** Anexos obligatorios donde el estudiante pega su historial de chat con la IA y comenta sus decisiones.
2. **Defensas Orales Rápidas:** Preguntas aleatorias sobre por qué el algoritmo sugirió X y por qué el estudiante lo modificó a Y.
3. **Rúbricas Iterativas:** Evaluar borradores progresivos, no solo la entrega en la semana final.

## 4. Diseño del proyecto: lista de verificación para el docente

Recorre tu proyecto con estas seis preguntas; donde la respuesta sea «no» o «no sé», ahí está la fase que conviene ajustar primero (Marcela empezó por la trazabilidad).

| Elemento | Pregunta orientadora |
|----------|---------------------|
| Problema auténtico | ¿El problema tiene relevancia fuera del aula? |
| Rol de la IA | ¿En qué fases interviene la IA y con qué función? |
| Trazabilidad | ¿Cómo documentará el estudiante su interacción con la IA? |
| Qué se evalúa | ¿Se evalúa el proceso (versiones, decisiones) o solo la entrega final? |
| Transparencia | ¿Se requiere que el estudiante explicite cómo usó la IA? |
| Iteración | ¿Hay al menos dos ciclos de retroalimentación antes de la entrega final? |

---

## 5. Ejemplo práctico: diseñando el escenario (prompt docente)

Como docente, también puedes usar la IA para preparar tu ABP utilizando la técnica de "Diseño Inverso". Aquí tienes un prompt estructurado (usando el marco R-O-C-E) que puedes probar en modelos como **Gemini 3.1 Pro** o **Claude 3.5 Sonnet**:

> **(Rol)** Actúa como un experto en pedagogía activa y diseño instruccional universitario.  
> **(Objetivo)** Diseña el escenario inicial para un Aprendizaje Basado en Proyectos (ABP) sobre sostenibilidad urbana.  
> **(Contexto)** Mis estudiantes son de 3er semestre de Arquitectura y Urbanismo. El proyecto durará 4 semanas y deben usar IA para iterar sus planos.  
> **(Estructura)** Entrégame: 1. Un "Wicked Problem" (problema complejo sin solución obvia) como disparador. 2. Tres restricciones clave del proyecto. 3. Una tabla con el cronograma de 4 semanas, indicando en qué momento los estudiantes deben usar IA y para qué tarea específica.

---

## Lecturas relacionadas

- Para observar cómo una persona evalúa sugerencias y conserva la dirección del trabajo, ver la [guía sobre la co-creación persona-IA](/ia-educacion/guias/agenciamiento-humano-ia/).
- Para una [plantilla de proyecto de 14 semanas](/laboratorio/practicas/abp-con-ia/) — actividad propuesta para planificar un semestre completo con calendario, entregas y ponderación.
- Los principios de [evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) aplican directamente a la fase de iteración.

## Recursos adicionales

- [PBLWorks — What is PBL?](https://www.pblworks.org/what-is-pbl) — Marco de referencia del Buck Institute para ABP
- [UNESCO — AI competencies for educators](https://www.unesco.org/en/digital-education/ai-future-learning) — Competencias de IA para educadores

{{< referencias >}}

- Deleuze, G., & Guattari, F. (1987). *A thousand plateaus: Capitalism and schizophrenia*. University of Minnesota Press.
- Krajcik, J. S., & Shin, N. (2014). Project-based learning. En R. K. Sawyer (Ed.), *The Cambridge handbook of the learning sciences* (2.ª ed., pp. 275–297). Cambridge University Press.
- Lam, S. F., Cheng, R. W., & Choy, H. C. (2010). School support and teacher motivation to implement project-based learning. *Learning and Instruction*, *20*(6), 487–497. https://doi.org/10.1016/j.learninstruc.2009.07.003
- Thomas, J. W. (2000). *A review of research on project-based learning*. Autodesk Foundation.

{{< /referencias >}}
