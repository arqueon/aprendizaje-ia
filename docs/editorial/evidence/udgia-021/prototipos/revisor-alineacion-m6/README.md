# Prototipo local — comprobación de una actividad

Este directorio contiene un prototipo autónomo y no integrado para revisar una actividad. La experiencia
pública sigue el enfoque de las guías para profesorado y estudiantes: situación reconocible,
ejemplo completo, acción propia, criterio de avance y teoría solo después de la experiencia.

## Archivos

- `index.html`: actividad pública interactiva.
- `styles.css`: sistema visual editorial, responsive, oscuro e imprimible.
- `app.js`: validación, diagnóstico declarado, guardado voluntario y borrado local.
- `fallback-imprimible.html`: actividad completa sin JavaScript.
- `qa.mjs`: QA local de rutas, accesibilidad, teclado, privacidad y comportamiento.

## Abrir localmente

Sirve este directorio con un servidor HTTP estático y abre `index.html`. Las rutas son
relativas y deben funcionar tanto en `/` como en una subruta.

## Límites

No modifica Hugo ni H5P. No certifica una actividad, no evalúa texto libre y no envía datos.
Rubén cerró la revisión humana interna de P1. El uso por otras personas, una sesión real con
tecnologías de asistencia y la integración en un destino público permanecen no verificados.
