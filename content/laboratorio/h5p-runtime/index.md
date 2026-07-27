---
title: "Laboratorio técnico del runtime H5P"
description: "Fixture no curricular para validar el reproductor H5P autoalojado del sitio."
date: 2026-07-26
robots: "noindex, nofollow"
build:
  render: always
  list: never
showDate: false
showReadingTime: false
showTableOfContents: true
tags:
  - h5p
  - laboratorio
  - accesibilidad
---

Esta página no es una actividad curricular. Sirve para comprobar que el sitio puede cargar
un paquete H5P gobernado por catálogo, mantenerlo dentro de un iframe, adaptarlo a la
identidad C y ofrecer una alternativa aun cuando la interacción no esté disponible.

## Carga manual

Este montaje no solicita el reproductor ni las librerías hasta que se pulsa el botón.

{{< h5p id="runtime-probe" load="manual" title="Comprobación H5P de carga manual" >}}
### Qué representa la alternativa

El runtime separa tres responsabilidades:

1. **Hugo** presenta el propósito, los controles y esta alternativa accesible.
2. **El iframe H5P** ejecuta la interacción sin insertar el JavaScript del paquete en la
   página principal.
3. **El catálogo** solo permite paquetes con identificador, hash, licencia y dependencias
   conocidos.

La comprobación interactiva únicamente revela un mensaje local. No guarda respuestas, no
envía resultados y no asigna calificaciones.
{{< /h5p >}}

<div class="udg-h5p-fixture-offset" aria-hidden="true"></div>

## Carga por proximidad

Este segundo montaje usa el mismo paquete de manera independiente. El iframe aparece cuando
la sección se acerca al área visible; los archivos comunes pueden reutilizar la caché del
navegador.

{{< h5p id="runtime-probe" load="visible" title="Comprobación H5P por proximidad" >}}
### Recorrido equivalente

- La página conserva el texto esencial fuera del objeto.
- La imagen explica las capas sin contener la consigna como texto rasterizado.
- El botón de comprobación produce feedback inmediato y anunciado.
- «Reiniciar actividad» reemplaza solo este montaje y no afecta al otro.

No existe cuenta, intento persistente, xAPI, LRS ni conexión con Moodle.
{{< /h5p >}}
