# UDGIA-010 · Visto bueno editorial de las figuras en Hugo

**Estado:** integración local terminada; sin push ni despliegue.  
**Base de Hugo:** `f5404b1ac96e3dbe441176e4f9a0da5872e96ad0`  
**Fuente canónica:** `IAorientaciones` en
`0331dfec00b47d2138641b0cdd3b6c8c56b9c345`  
**Paquetes canónicos:** `1.0.0-lote1` y `1.0.0-lote2`

## Cierre editorial

Las nueve figuras quedan autorizadas para publicación bajo `CC BY-SA 4.0` con la atribución
exacta **Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara**. El componente
Hugo muestra el crédito y delimita el material como alcance editorial del proyecto, no como
dictamen institucional. Los 18 SVG incorporan además metadatos de derechos para conservar
esa información cuando se abren de forma independiente.

- F7 conserva los seis movimientos canónicos y alinea su alternativa HTML.
- F9 restituye portafolio iterativo, bitácora de decisiones, defensa oral y rúbricas
  asistidas en escritorio, móvil y alternativa HTML.
- F11 se publica como modelo conceptual con una advertencia no normativa visible.
- F17 se sustituye por la síntesis original del marco UDGIA; se elimina la atribución de
  adaptación al Digital Education Council.

Los SVG de escritorio F7, F9, F11 y F17 son idénticos a los canónicos. Las variantes móviles
son derivadas específicas de Hugo. El manifiesto registra revisión, hashes de fuente,
descripción, escritorio y móvil, tipo de procedencia, licencia y alcance de autorización.

## Verificación

- `npm run qa:udgia-figures`: 9 figuras, 18 variantes, hashes, metadatos de derechos,
  fallback y ausencia de recursos externos.
- `npm run qa:udgia-figures-route`: 9 rutas, raíz y subruta, 1440 × 900 y 375 × 812,
  axe, fallbacks, ampliación SVG, cero tráfico externo, escrituras, cookies o almacenamiento.
- `npm run qa:content-inventory`: 158 documentos y 0 enlaces internos rotos.
- `npm run qa:container-publication`: las nueve figuras quedan sin bloqueos editoriales;
  permanecen 11 bloqueos exclusivos del catálogo H5P, que no se modificó en este cierre.

La evidencia de las 36 combinaciones de ruta, base y viewport está en
`docs/design/evidence/udgia-010/`.

## Límites

No se modificaron `data/h5p`, `static/h5p`, los paquetes H5P, workflows ni despliegues. No se
realizó push. La licencia y autorización cubren la publicación editorial del proyecto y no
convierten las figuras en política, norma o dictamen institucional.
