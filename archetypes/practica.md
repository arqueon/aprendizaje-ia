---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
description: "Descripción de la práctica..."
summary: "Resumen de la experiencia pedagógica."
tags: ["herramienta", "nivel", "modalidad", "competencia"]
categories: ["practica-pedagogica"]
areas: ["ia", "pedagogia"]

showHero: true
heroStyle: "big"
showTableOfContents: true
showReadingTime: true
showBreadcrumbs: true
showSummary: true
showTaxonomies: true
showRelatedContent: true
showAuthor: false

asignatura: ""
---

{{< lead >}}
Frase inspiradora o resumen del reto pedagógico...
{{< /lead >}}

{{< taxo-list >}}

## Contexto

_Describir el grupo, asignatura y el reto previo._

## Objetivo pedagógico

_¿Qué se busca que el estudiante aprenda o desarrolle?_

## Cómo se integra la IA

_Descripción del rol de la IA en la actividad._

## Secuencia de la actividad

{{< timeline >}}
{{< timelineItem icon="pencil" header="Fase 1" subheader="Preparación" >}} ... {{< /timelineItem >}}
{{< timelineItem icon="brain" header="Fase 2" subheader="Ejecución" >}} ... {{< /timelineItem >}}
{{< timelineItem icon="list-check" header="Fase 3" subheader="Evaluación" >}} ... {{< /timelineItem >}}
{{< /timeline >}}

## Forma de evaluación

_Rúbrica o criterios utilizados._

## Resultados y reflexión

_¿Qué funcionó y qué se puede mejorar?_
