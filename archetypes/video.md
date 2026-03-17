---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
summary: ""
tags: []
categories: ["video"]
areas: []         # Áreas temáticas: "ia", "evaluacion", "pedagogia", "digital", "formacion"

# Layout — el video es el protagonista, sin hero imagen
showHero: false
showTableOfContents: false
showReadingTime: false
showDate: true
showTaxonomies: true
showRelatedContent: true
showBreadcrumbs: true
showSummary: true
showAuthor: false

# Metadatos del video
videoId: ""           # ID de YouTube (lo que va después de ?v=)
videoCanal: ""        # nombre del canal o autor
videoDuracion: ""     # ej. "18:42"
videoIdioma: "es"     # "es", "en", etc.
---

{{< youtubeLite id="YOUTUBE_ID" label="Título del video" >}}

| | |
|---|---|
| **Canal** | ... |
| **Duración** | ... |
| **Idioma** | ... |

## De qué trata

_Resumen del contenido del video._

## Por qué lo recomendamos

_Qué aporta al docente que integra IA. Qué conceptos o prácticas ilumina._

## Momentos clave

_Opcional: timestamps con lo más valioso (ej. "12:30 — Ejemplo de evaluación con rúbrica generada por IA")._
