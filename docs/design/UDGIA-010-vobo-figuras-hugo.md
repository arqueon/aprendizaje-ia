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

---

## Enmienda 2026-08-27 · Apariencia clara y oscura

Este visto bueno se otorgó sobre derechos, procedencia, checksums, alternativa textual,
ausencia de recursos externos y axe. **No contemplaba la apariencia**, porque cuando se
emitió el sitio tenía una sola. El rediseño Almagre de agosto de 2026 (`f41f795`)
introdujo dos, y la auditoría integral del 27 de agosto encontró que dieciséis variantes
quedaban ilegibles en modo oscuro: servidas mediante `img`, sin lienzo opaco y con tinta
`#18223c` fija, daban 1.04:1 sobre la superficie nocturna `#1a2540`.

### Qué se corrigió

Las dieciséis variantes de las ocho figuras afectadas —F1, F3, F4, F7, F8, F9, F11 y F17—
recibieron dos cambios: un rectángulo de lienzo opaco que cubre el `viewBox` completo, y un
bloque `@media (prefers-color-scheme: dark)` que redefine las clases de token a la rampa
nocturna. Se cubren los dos juegos de nombres en uso, `.f-ink` en escritorio y `.ink` en
las variantes móviles. F5 y F18 ya traían fondo propio y no se tocaron.

### Verificación de la enmienda

Medición sobre render real, no cálculo sobre los hexadecimales declarados: las 32
combinaciones de figura y apariencia se rindieron en Chromium con `colorScheme` claro y
oscuro, dimensionando cada imagen a su `viewBox` para evitar el aplastamiento del tamaño
natural por defecto. **Las 32 superan 4.5:1** — 14.21 a 14.38 en claro, 14.52 a 16.96 en
oscuro. Los checksums de las dieciséis variantes se regeneraron en `data/udgia_figures.json`.

### Límite conocido, y por qué se acepta

Un SVG servido mediante `img` es un documento aislado: lee `prefers-color-scheme`, que es
la preferencia del sistema operativo, pero **no puede ver la clase `html.dark`** con la que
el sitio conmuta desde su selector. Con `autoSwitchAppearance = true` ambas señales
coinciden mientras la persona no use el selector en contra de su sistema. Si lo hace, la
figura se desincroniza — pero el lienzo opaco garantiza que **siga siendo legible** en
cualquier caso: el peor escenario es un desajuste estético, no la pérdida de contenido que
existía antes. La única solución sin ese matiz es inlinear las figuras, lo que exigiría
renunciar a `picture`/`srcset` y resolver la variante móvil por media query.

### Alcance de esta enmienda

Amplía el criterio de visto bueno de las figuras UDGIA para incluir la apariencia en ambos
modos. No modifica las decisiones editoriales, de derechos ni de procedencia del documento
original, que siguen vigentes.

---

## Enmienda 2026-08-30 · Resincronización con la generación v0.12 de la autoridad

El documento de orientaciones consolidó su versión 0.12 (revisión `abbcafc0b1f2832238153417b0bb917eb6b4a24e`),
que reescribió con lenguaje humanizado siete de las figuras compartidas con el sitio. Esta
enmienda registra la resincronización de la distribución Hugo con esa generación:

- **Siete figuras refrescadas** — F1, F3, F4, F8, F9, F11 y F17 toman íntegro el contenido
  nuevo de la autoridad (título, descripción, textos y estructura) y conservan el patrón de
  apariencia del sitio: identidad C, lienzo opaco `fig-canvas` y bloque
  `@media (prefers-color-scheme: dark)` de la enmienda del 27 de agosto. Las variantes
  móviles son recomposiciones verticales nuevas del contenido v0.12.
- **F18 sustituida** — los «Cinco movimientos para probar una ayuda» (Generated Output de
  Napkin AI adaptado) se retiran; los sustituye la rutina de seis pasos
  `rutina-direccion-epistemica` de la autoridad, publicada como síntesis original del
  proyecto bajo `CC BY-SA 4.0` con la atribución estándar. La procedencia Napkin deja de
  aplicar a la figura vigente; su registro histórico permanece en el historial del repositorio.
- **F7 sin cambios** — la autoridad no modificó `dialogo-ia-aprendizaje-activo` (byte-idéntica
  en ambas revisiones). F5 quedó fuera del alcance de esta ola y conserva su anclaje previo.
- El manifiesto `data/udgia_figures.json`, la QA `qa:udgia-figures` y el registro
  `udgia-ecosystem.json` quedan anclados por figura a la revisión y checksums vigentes.

**Estado:** pendiente de visto bueno visual del responsable sobre las variantes nuevas.
Los criterios de derechos, procedencia y autorización editorial del visto bueno original y
de la enmienda de apariencia del 2026-08-27 siguen vigentes y no se modifican aquí.
