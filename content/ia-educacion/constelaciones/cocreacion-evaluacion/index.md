---
title: "Empezar con IA para aprender y enseñar"
slug: "empezar-con-ia"
aliases:
  - "/ia-educacion/constelaciones/cocreacion-evaluacion/"
date: 2026-07-27
draft: false
description: "Una introducción al uso de la IA en educación: qué está cambiando, qué puede aportar y cómo comenzar como estudiante o docente."
summary: "Dos entradas —estudiante y docente— para comprender el cambio, decidir cuándo usar IA y avanzar sin perder de vista el aprendizaje."
tags: ["introducción a la IA", "aprendizaje", "docencia", "alfabetización en IA"]
categories: ["ruta-de-aprendizaje"]
areas: ["ia", "pedagogia", "formacion"]
showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
ecosistema:
  id: route.inicio-ia-educacion
  titulo: "Empezar con IA para aprender y enseñar"
  audiencias: [estudiante, docente]
  intenciones: [comprender, decidir, practicar, diseñar]
  tipo: guia
  capas: [R.orientacion, L1, L2, L3]
  resultado: "Reconoce qué cambia con la IA, elige una ruta inicial y decide qué parte del aprendizaje debe permanecer bajo responsabilidad humana."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "https://arqueon.github.io/aprendizaje-ia/formacion-docente/alfabetizacion/"
    - "https://arqueon.github.io/aprendizaje-ia/formacion-docente/alfabetizacion-operativa/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/"
  revisado: 2026-07-27
  relaciones:
    - tipo: continua
      destino: capacity.alfabetizacion-ia
    - tipo: continua
      destino: literacy.cocreacion
    - tipo: prepara
      destino: assessment.basada-en-procesos
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "El diagrama tiene una explicación textual equivalente y la ruta no depende de actividades interactivas."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
La IA ya aparece al buscar información, escribir, traducir, programar, producir imágenes o
preparar una clase. Su llegada a la educación cambia algo más profundo que las herramientas:
cambia qué parte del trabajo hace una persona, qué puede pedir a un sistema y qué necesita
comprender y decidir por sí misma.
{{< /lead >}}

{{< alert icon="flask" type="info" >}}
Esta es una **entrada introductoria**. No necesitas conocer todavía conceptos como
co-creación, dirección epistémica o trazabilidad. Aparecerán después, cuando tengas una
experiencia concreta desde la cual entenderlos.
{{< /alert >}}

## Qué está cambiando

Una respuesta bien redactada, una imagen convincente o un programa que funciona pueden
producirse en pocos minutos. Eso abre posibilidades reales: ensayar explicaciones, comparar
alternativas, recibir comentarios sobre un borrador o explorar una pregunta desde varios
ángulos.

También vuelve menos evidente qué aprendió una persona. El producto final ya no basta para
reconstruir el recorrido. Por eso importa saber dónde hubo comprensión, qué se verificó y
qué decisiones no fueron delegadas al sistema.

La meta inicial no es dominar una marca ni memorizar fórmulas para escribir prompts. Es
aprender a reconocer cuándo la IA ayuda, cuándo estorba y qué responsabilidad conserva
quien estudia o enseña.

## Qué puede aportar y qué no garantiza

| La IA puede ayudarte a… | Todavía necesitas… |
|---|---|
| ensayar una explicación o pedir otro ejemplo; | comprobar si la explicación es correcta y pertinente; |
| proponer preguntas, objeciones o alternativas; | decidir cuáles sirven para tu propósito; |
| comentar un borrador y localizar puntos débiles; | juzgar qué cambios mejoran realmente el trabajo; |
| ordenar información o comparar versiones; | verificar fuentes, cuidar datos y explicar tus decisiones. |

Un sistema genera respuestas a partir de patrones. No conoce tu asignatura como tu profesor,
no sabe por sí mismo qué comprendiste y puede presentar información falsa con mucha
seguridad. Usarlo bien exige mantener esas limitaciones a la vista.

## Una forma sencilla de empezar

1. **Define el propósito.** Nombra qué quieres aprender, enseñar o producir antes de abrir
   una herramienta.
2. **Haz un primer intento.** Escribe una pregunta, esquema, solución o criterio propio.
3. **Pide una ayuda concreta.** Solicita un ejemplo, una objeción, una comparación o
   retroalimentación localizada.
4. **Comprueba la respuesta.** Contrasta datos y fuentes; busca omisiones y supuestos.
5. **Decide y explica.** Conserva, corrige o rechaza lo que recibiste. Al cerrar, identifica
   qué entendiste mejor.

Esta secuencia es deliberadamente básica. Primero conviene vivir el proceso; después podremos
poner nombre a relaciones más complejas.

## Elige tu entrada

{{< cards >}}
  {{< card link="#si-eres-estudiante" title="Soy estudiante" icon="user-graduate" color="#b12028" description="Quiero usar IA para estudiar, investigar o mejorar un trabajo sin entregar mi aprendizaje a la herramienta." >}}
  {{< card link="#si-eres-docente" title="Soy docente" icon="chalkboard-user" color="#18223c" description="Quiero decidir cuándo integrar IA y cómo conservar el propósito formativo de una actividad." >}}
{{< /cards >}}

## Dos rutas, una misma pregunta

{{< mermaid >}}
flowchart TD
    A["Propósito de aprendizaje"] --> E["Si estudias:<br/>parte de un intento propio"]
    A --> D["Si enseñas:<br/>define el esfuerzo que debe practicar el grupo"]
    E --> I["Pregunta, compara<br/>y verifica"]
    D --> T["Decide cuándo la IA<br/>ayuda o estorba"]
    I --> R["Revisa y explica<br/>tus decisiones"]
    T --> R
    R --> P["Evidencia de aprendizaje"]

    style A fill:#b12028,stroke:#7f1820,color:#ffffff
    style E fill:#f7e5e2,stroke:#b12028,color:#18223c
    style D fill:#ece9e1,stroke:#18223c,color:#18223c
    style I fill:#dcebea,stroke:#2f7f83,color:#18223c
    style T fill:#eee7d5,stroke:#687653,color:#18223c
    style R fill:#d99518,stroke:#8a5e0b,color:#18223c
    style P fill:#18223c,stroke:#10172a,color:#ffffff
{{< /mermaid >}}

En texto: ambas rutas comienzan con un propósito de aprendizaje. El estudiante parte de un
intento propio; el docente identifica el esfuerzo que su grupo necesita practicar. Después
se decide cómo participa la IA, se verifican sus aportes y se conserva alguna evidencia de
las decisiones tomadas.

## Si eres estudiante

La IA puede funcionar como interlocutora, fuente de ejemplos o lectora de un borrador. No
necesita escribir el trabajo por ti para ser útil.

Empieza con una tarea pequeña:

1. escribe en dos o tres frases lo que ya entiendes;
2. pide a la IA una objeción o un ejemplo que ponga a prueba esa idea;
3. comprueba una afirmación importante en una fuente externa;
4. reescribe con tus palabras y anota qué cambió;
5. intenta explicar el resultado sin volver a consultar la conversación.

Cuando esta práctica te resulte familiar, continúa en este orden:

1. [Alfabetización operativa](/formacion-docente/alfabetizacion-operativa/): formular,
   comparar, verificar y documentar.
2. [Alfabetización crítica](/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/):
   reconocer límites, sesgos y efectos.
3. [Alfabetización para la co-creación](/formacion-docente/alfabetizacion-co-creacion/):
   sostener procesos más largos sin perder la dirección.

## Si eres docente

La primera decisión no es qué herramienta usar. Es qué necesita practicar el estudiante y
qué evidencia permitiría reconocer ese aprendizaje.

Antes de integrar IA en una actividad:

1. formula el resultado de aprendizaje con un desempeño observable;
2. identifica el esfuerzo que el estudiante debe atravesar personalmente;
3. decide si la IA amenaza ese esfuerzo, no lo afecta o puede enriquecerlo;
4. explica con claridad qué usos están permitidos y cuáles no;
5. ofrece una alternativa equivalente cuando el acceso, la privacidad o la preferencia del
   estudiante lo requieran;
6. revisa por separado el proceso y el producto final.

Para avanzar gradualmente:

1. [Tres literacidades para la formación](/formacion-docente/alfabetizacion/) ofrece el mapa
   general.
2. [Taxonomía de Bloom y diseño inverso](/formacion-docente/taxonomia-bloom-diseno-inverso/)
   ayuda a fijar objetivos antes de elegir tecnología.
3. [Evaluación formativa con IA](/ia-educacion/guias/evaluacion-formativa-ia/) muestra cómo
   trabajar con borradores, retroalimentación y decisiones.

## Cuándo aparece la co-creación

Después de varios intentos notarás que la relación con la IA no siempre consiste en pedir y
recibir. A veces una objeción cambia tu pregunta; una fuente invalida una respuesta; una
comparación obliga a reescribir. La persona sigue decidiendo, pero el resultado surge de una
interacción.

Llamamos **co-creación** a ese proceso cuando conserva propósito, verificación y decisión
humana. Es un nivel posterior de la ruta, no el punto de partida. La
[guía sobre co-creación y agenciamiento](/ia-educacion/guias/agenciamiento-humano-ia/)
desarrolla el concepto con más detalle.

## Cuida la información

Antes de pegar contenido en una herramienta, retira datos personales, información
confidencial y trabajos de terceros que no tengas permiso de compartir. Comprueba también
las reglas de tu asignatura y las condiciones del servicio. Poder usar una herramienta no
significa que cualquier dato deba entrar en ella.
