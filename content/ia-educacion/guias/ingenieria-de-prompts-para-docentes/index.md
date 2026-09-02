---
title: "Escribe una petición a la IA que puedas revisar: tarea, material y límites"
date: 2026-03-17
draft: false
description: "Toma una tarea docente real, escríbela como petición a una IA con el material y los límites que necesita, y revisa la respuesta con cinco comprobaciones antes de llevarla al aula."
summary: "Parte de una tarea real, añade solo el contexto que haga falta y comprueba la respuesta antes de usarla en clase."
tags: ["prompts", "diseño didáctico", "IA generativa", "ingeniería de prompts"]
categories: ["guia"]
areas: ["ia", "pedagogia"]
showHero: true
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
---

{{< contrato quien="Docentes que tienen un objetivo, una lectura o una actividad y quieren pedirle a una IA variantes, un caso o una revisión, sin saber cuánto contexto darle ni cómo saber si la respuesta sirve." haras="Vas a tomar una tarea tuya, vas a escribirla como petición con sólo las piezas que hagan falta (la tarea, el material de partida, los límites y el formato de la respuesta) y vas a revisar lo que devuelva con cinco comprobaciones." tendras="Una petición guardada que puedes reutilizar y una respuesta marcada con lo que sirve y lo que descartas (por ejemplo: «Con base únicamente en este objetivo, propón dos actividades de 50 minutos para primer semestre… Si el objetivo no da información suficiente, señala qué falta en vez de completarlo»)." tarda="Diez minutos con el caso del ciclo del agua; veinte con una tarea tuya." ejemplo="Abajo está el caso de Nora, profesora de geografía, ya resuelto: su objetivo, su primera petición, la petición mejorada y qué revisó en la respuesta." >}}

## El caso de Nora, ya resuelto

Nora da geografía en primer semestre y quiere una actividad de 50 minutos para este objetivo de su programa:

> Objetivo: analizar las fases del ciclo del agua y relacionarlas con microclimas locales.

Su primera petición fue esta:

> Propón una actividad sobre el ciclo del agua.

Recibió una actividad genérica de secundaria, con un cuestionario de opción múltiple, sin ninguna relación con microclimas. Sin material ni límites, la IA rellenó los huecos con lo más común. Entonces reescribió la petición:

> Con base únicamente en este objetivo, propón dos actividades de 50 minutos para un grupo de primer semestre: “analizar las fases del ciclo del agua y relacionarlas con microclimas locales”. Para cada actividad indica qué hará el grupo, qué información necesitará y cómo comprobará la relación con un caso local. Evita cuestionarios de opción múltiple. Presenta las dos alternativas en una tabla. Si el objetivo no aporta información suficiente, señala qué dato falta en vez de completarlo por tu cuenta.

La segunda versión funciona mejor porque Nora puede revisarla: identifica el material (su objetivo), la acción (proponer dos actividades), los límites (sin opción múltiple, sin inventar datos) y la forma de comparar (una tabla). Con la respuesta hizo tres cosas: comprobó que las dos actividades usaran su objetivo y no otro parecido; marcó un dato añadido sin respaldo (la IA citó una «estación meteorológica del campus» que su universidad no tiene); y descartó la segunda actividad porque pedía una salida de campo que no cabe en 50 minutos. Se quedó con la primera, cambió el vocabulario para su grupo y guardó la petición con una nota: «funciona; pedir siempre que señale datos faltantes».

## Reúne tres cosas antes de escribir

Antes de escribir tu petición, ten a la mano:

1. el material de partida, como un objetivo, un tema, una lectura o una actividad (Nora usó el objetivo de su programa);
2. la tarea que quieres delegar, por ejemplo proponer variantes o detectar un punto confuso;
3. una forma de revisar el resultado, como duración, correspondencia con el objetivo o lenguaje apropiado para el grupo.

Deja fuera nombres, conversaciones completas, calificaciones y otros datos personales. Si la tarea depende de esa información, reemplázala por un caso ficticio o elimina los datos que permitan reconocer a alguien; la guía [antes de compartir: protege datos y trabajos al usar IA](../privacidad-datos-ia/) muestra cómo.

Un *prompt* es sólo eso: la instrucción y el material que le das a una IA para una tarea. Puede ser una frase o una petición con varias partes; la longitud por sí sola mejora poco la respuesta. Escribe lo que la tarea necesita y nada más.

## Seis piezas que puedes combinar

Usa esta lista para decidir qué le falta a tu petición; para una tarea sencilla bastan la tarea y el formato, y para una delicada conviene añadir material, contexto y límites.

1. **Tarea:** qué debe hacer la IA. Usa una acción observable: comparar, resumir, proponer, señalar o reescribir.
2. **Material de partida:** el texto, objetivo, tabla o fragmento sobre el que debe trabajar. Pide que avise cuando falte información en vez de inventarla.
3. **Contexto:** para quién es la propuesta y en qué situación se usará. Incluye nivel, asignatura o duración sólo si cambian la respuesta.
4. **Límites:** qué debe evitar. Por ejemplo: no asignar una calificación, no inventar fuentes o no usar datos personales.
5. **Formato:** cómo quieres leer o comparar la respuesta: lista breve, tabla, párrafos o campos definidos.
6. **Perspectiva:** un rol («eres una tutora de primer semestre») puede orientar el vocabulario o el foco, pero la respuesta sigue sin ser asesoría experta. Úsalo sólo cuando aporte algo concreto.

Vuelve a la petición de Nora y localiza las piezas: tarea, material, contexto, límites y formato están; perspectiva no hacía falta.

{{< practica titulo="Revisa la respuesta antes de usarla" >}}

Escribe tu petición con las piezas que necesite, envíala y pasa la respuesta por estas cinco comprobaciones:

1. Comprueba que cada propuesta use el objetivo entregado y no otro parecido.
2. Marca datos, fuentes o condiciones que la IA haya añadido sin respaldo.
3. Descarta las opciones que no caben en el tiempo o los recursos disponibles.
4. Adapta el lenguaje y las decisiones pedagógicas; la respuesta no sustituye tu conocimiento del grupo.
5. Conserva el prompt y anota qué cambiaste si piensas reutilizarlo.

Lo que te llevas es la versión revisada, no la primera respuesta: una propuesta que puedes explicar, adaptar y comprobar antes de llevarla al aula, y la petición guardada con tu nota.
{{< /practica >}}

## Recursos para tareas más complejas

- **Dar ejemplos:** incluye uno o dos ejemplos cuando importe reproducir una estructura, un tono o una forma de respuesta. El ejemplo debe parecerse a la tarea real.
- **Dividir el trabajo:** si la petición mezcla análisis, diseño y revisión, haz cada etapa por separado. Revisa una salida antes de usarla en la etapa siguiente.
- **Pedir una comprobación breve:** solicita que la respuesta indique qué partes provienen del material entregado, qué supuestos añadió y qué debería verificar una persona.
- **Probar y comparar:** ejecuta el mismo caso con una versión anterior y otra revisada del prompt. Decide con una lista corta de señales observables (duración, relación con el objetivo, datos sin respaldo), y desconfía de la respuesta que sólo suena más convincente.

{{< referencias titulo="Lecturas para contrastar" >}}

- [Prompt engineering, OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) — documentación de un proveedor; útil para instrucciones, ejemplos y formatos.
- [Prompt engineering overview, Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — propone definir primero qué cuenta como éxito y cómo se comprobará.
- [Guidance for generative AI in education and research, UNESCO](https://unesdoc.unesco.org/ark:/48223/pf0000386693) — orientaciones de 2023 sobre validación ética, privacidad y diseño pedagógico, disponibles en varios idiomas.
{{< /referencias >}}
