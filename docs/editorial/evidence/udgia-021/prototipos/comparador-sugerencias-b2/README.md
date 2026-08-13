# Prototipo local — comparación de sugerencias B2

Este directorio contiene un prototipo autónomo y no integrado de la actividad
«Decide qué hacer con dos sugerencias para el mismo borrador». La experiencia parte de un
caso completo, revisa una sugerencia a la vez y termina con un fragmento revisado y dos notas
de decisión. La segunda versión aclara de dónde vienen las sugerencias, las pone frente a frente,
muestra el antes y el después y permite restaurar un borrador reemplazado por el ejemplo.

## Archivos

- `index.html`: actividad pública interactiva.
- `styles.css`: sistema visual editorial, adaptable a móvil, modo oscuro e impresión.
- `app.js`: validación, resumen de decisiones, guardado voluntario y borrado local.
- `fallback-imprimible.html`: actividad equivalente sin JavaScript.
- `qa.mjs`: QA local de rutas, accesibilidad, teclado, privacidad y comportamiento.

## Abrir localmente

Sirve este directorio con un servidor HTTP estático y abre `index.html`. Todas las rutas son
relativas para que funcionen tanto en la raíz como dentro de una subruta.

## Límites

El prototipo no decide si una sugerencia es correcta y no revisa la exactitud del texto.
Organiza las razones y comprobaciones escritas por la persona. No modifica Hugo ni H5P, no
envía datos y no pertenece a Moodle. Su posible integración requiere otra revisión y otro
VoBo.
