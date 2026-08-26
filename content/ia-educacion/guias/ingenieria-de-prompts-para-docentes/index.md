---
title: "Ingeniería de prompts para docentes"
date: 2026-03-17
draft: false
description: "Guía para dar a una IA una tarea docente, el material necesario y una forma concreta de revisar la respuesta."
summary: "Parte de una tarea real, añade solo el contexto que haga falta y comprueba la respuesta antes de usarla en clase."
tags: ["prompts", "diseño didáctico", "IA generativa", "ingeniería de prompts"]
categories: ["guia"]
areas: ["ia", "pedagogia"]
showHero: true
heroStyle: "background"
layoutBackgroundBlur: true
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
---

{{< lead >}}
Tienes un objetivo de aprendizaje, un texto o una actividad que quieres revisar con IA. Esta guía te ayuda a explicar la tarea, entregar el material necesario y decidir si la respuesta sirve. No necesitas usar una fórmula completa cada vez.
{{< /lead >}}

## Empieza por la tarea, no por la herramienta

Antes de escribir, reúne tres cosas:

1. el material de partida, como un objetivo, un tema, una lectura o una actividad;
2. la tarea que quieres delegar, por ejemplo proponer variantes o detectar un punto confuso;
3. una forma de revisar el resultado, como duración, correspondencia con el objetivo o lenguaje apropiado para el grupo.

No incluyas nombres, conversaciones completas, calificaciones ni otros datos personales. Si la tarea depende de esa información, reemplázala por un caso ficticio o elimina los datos que permitan reconocer a alguien.

## Qué es un prompt

Un *prompt* es la instrucción y el material que das a una IA para realizar una tarea. Puede ser una frase breve o una petición con varias partes. La longitud no garantiza una buena respuesta: el prompt debe contener lo que la tarea necesita y nada más.

## Seis elementos que puedes combinar

Estos elementos son una lista de comprobación, no una plantilla obligatoria. Para una tarea sencilla pueden bastar la tarea y el formato. Para una tarea delicada conviene añadir material, contexto y límites. Elige solo los elementos que la tarea necesita.

1. **Tarea:** qué debe hacer la IA. Usa una acción observable: comparar, resumir, proponer, señalar o reescribir.
2. **Material de partida:** el texto, objetivo, tabla o fragmento sobre el que debe trabajar. Pide que avise cuando falte información en vez de inventarla.
3. **Contexto:** para quién es la propuesta y en qué situación se usará. Incluye nivel, asignatura o duración solo si cambian la respuesta.
4. **Límites:** qué debe evitar. Por ejemplo: no asignar una calificación, no inventar fuentes o no usar datos personales.
5. **Formato:** cómo quieres leer o comparar la respuesta: lista breve, tabla, párrafos o campos definidos.
6. **Perspectiva:** un rol puede orientar el vocabulario o el foco, pero no convierte la respuesta en asesoría experta. Úsalo solo cuando aporte algo concreto.

## Ejemplo con material real

Material de partida:

> Objetivo: analizar las fases del ciclo del agua y relacionarlas con microclimas locales.

Petición inicial:

> Propón una actividad sobre el ciclo del agua.

Versión que permite revisar mejor la respuesta:

> Con base únicamente en este objetivo, propón dos actividades de 50 minutos para un grupo de primer semestre: “analizar las fases del ciclo del agua y relacionarlas con microclimas locales”. Para cada actividad indica qué hará el grupo, qué información necesitará y cómo comprobará la relación con un caso local. Evita cuestionarios de opción múltiple. Presenta las dos alternativas en una tabla. Si el objetivo no aporta información suficiente, señala qué dato falta en vez de completarlo por tu cuenta.

La segunda versión no es mejor por ser larga. Es más fácil de revisar porque identifica el material, la acción, los límites y la forma de comparar las alternativas.

{{< practica titulo="Revisa la respuesta antes de usarla" >}}

1. Comprueba que cada propuesta use el objetivo entregado y no otro parecido.
2. Marca datos, fuentes o condiciones que la IA haya añadido sin respaldo.
3. Descarta las opciones que no caben en el tiempo o los recursos disponibles.
4. Adapta el lenguaje y las decisiones pedagógicas; la respuesta no sustituye tu conocimiento del grupo.
5. Conserva el prompt y anota qué cambiaste si piensas reutilizarlo.

El resultado útil no es la primera respuesta de la IA. Es una versión revisada que puedes explicar, adaptar y comprobar antes de llevarla al aula.
{{< /practica >}}

## Recursos para tareas más complejas

- **Dar ejemplos:** incluye uno o dos ejemplos cuando importe reproducir una estructura, un tono o una forma de respuesta. El ejemplo debe parecerse a la tarea real.
- **Dividir el trabajo:** si la petición mezcla análisis, diseño y revisión, haz cada etapa por separado. Revisa una salida antes de usarla en la etapa siguiente.
- **Pedir una comprobación breve:** solicita que la respuesta indique qué partes provienen del material entregado, qué supuestos añadió y qué debería verificar una persona.
- **Probar y comparar:** ejecuta el mismo caso con una versión anterior y otra revisada del prompt. Decide con una lista corta de señales observables; no te quedes con la respuesta que solo suena más convincente.

{{< referencias titulo="Lecturas para contrastar" >}}

- [Prompt engineering, OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) — documentación de un proveedor; útil para instrucciones, ejemplos y formatos.
- [Prompt engineering overview, Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — propone definir primero qué cuenta como éxito y cómo se comprobará.
- [Guidance for generative AI in education and research, UNESCO](https://unesdoc.unesco.org/ark:/48223/pf0000386693) — orientaciones de 2023 sobre validación ética, privacidad y diseño pedagógico, disponibles en varios idiomas.
{{< /referencias >}}
