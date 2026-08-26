# Contrato de SVG para actividades y prácticas

**Vigencia:** 2026-08-23  
**Dirección visual:** C · Almagre interactivo  
**Estado:** regla editorial local; cualquier publicación conserva las compuertas de VoBo vigentes.

## Regla predeterminada

Toda actividad o práctica incluye al menos un SVG explicativo y reusable. La ausencia es una excepción, no la opción predeterminada, y requiere una justificación pedagógica explícita, nombre de quien la aprueba y fecha.

La figura no se añade para decorar ni satisfacer una cuota. Debe ayudar a realizar por lo menos una de estas operaciones:

- anticipar una secuencia;
- distinguir etapas o responsabilidades;
- comparar dos versiones o rutas;
- reconocer dónde se comprueba una afirmación;
- relacionar propósito, acción, evidencia y decisión;
- comprender el producto esperado;
- revisar el trabajo terminado con un criterio visible.

Una featured no sustituye este SVG: la featured identifica la página; la figura ayuda a comprender o realizar la actividad.

## Reutilizar antes de crear

1. Buscar primero una figura cuyo significado, no solo cuyo vocabulario, coincida con la actividad.
2. Reutilizar su identificador y fuente canónica cuando la relación conceptual se conserve.
3. Añadir en la página una introducción y una descripción textual ajustadas al contexto; reutilizar la figura no obliga a repetir la misma prosa.
4. Crear una figura nueva cuando cambiar etiquetas, etapas o relaciones alteraría el significado de la existente.
5. Cuando dos páginas necesitan el mismo modelo —por ejemplo, guía y práctica de ABP—, producir una sola figura compartida y dos usos contextualizados.

Los activos compartidos viven en `assets/figures/`; el catálogo `data/udgia_figures.json` conserva `src`, `src_mobile`, `reuse_key` y `reusable_contexts`. Los bundles locales se reservan para visuales que realmente dependen de una sola página.

## Entrega reusable mínima

Cada figura gobernada incluye:

- SVG de escritorio con `viewBox` responsive;
- SVG vertical o recompuesto para móvil, no una miniatura ilegible;
- `role="img"`, `<title>`, `<desc>` y `aria-labelledby`;
- título, resumen y enlace **Ampliar SVG** en la página;
- descripción textual equivalente mediante el shortcode `udgia-figure`;
- procedencia, licencia y alcance editorial visibles;
- identificador estable y clave de reutilización;
- colores Almagre con contraste suficiente, sin depender solo del color;
- ningún script, `foreignObject`, imagen raster embebida ni recurso remoto;
- texto legible y relaciones comprensibles cuando el archivo se abre de manera autónoma;
- fallback en prosa, lista o tabla que permita realizar la actividad sin ver el SVG.

## Circulación

Una figura compartida puede incorporarse, sin duplicar su fuente, en:

- guías para profesorado o estudiantado;
- prácticas y talleres;
- cards o portadas cuando su geometría lo permita;
- hojas de trabajo, PDF y DOCX;
- presentaciones;
- objetos HTML o H5P como apoyo, nunca como dependencia remota;
- materiales descargables o compartidos bajo la licencia declarada.

La reutilización debe conservar título, atribución y licencia. Si una adaptación cambia el significado, se registra como una nueva versión o nueva figura; no se sobrescribe silenciosamente la canónica.

## Excepción válida

Una excepción solo es válida cuando añadir un SVG duplicaría exactamente una representación ya visible y no aportaría orientación, comprensión, decisión o reutilización. El registro debe contener:

- página;
- justificación de al menos una oración sustantiva;
- representación equivalente que ya cumple la función, si existe;
- persona que aprueba;
- fecha;
- fecha o condición de revisión.

“No hubo tiempo”, “la página ya tiene featured” o “la actividad es breve” no constituyen justificación pedagógica.

## Línea base del 23 de agosto de 2026

El inventario UDGIA-021 clasifica 13 páginas como `banco-de-practicas`:

- 1 integra una figura gobernada;
- 6 reutilizarán figuras ya catalogadas;
- 6 requieren producción, organizadas en 5 conceptos compartidos porque las dos páginas de ABP usarán una sola fuente;
- 12 constituyen deuda heredada temporal;
- 0 tienen excepción aprobada.

La línea base está en `data/editorial/activity-svg-contract.json`. La deuda solo puede disminuir. Una actividad nueva debe integrar una figura catalogada o registrar una excepción aprobada en el mismo cambio.

## Verificación

```bash
npm run qa:activity-svg-contract
npm run qa:udgia-figures
npm run qa:udgia-figures-route
```

El QA comprueba cobertura, deuda no creciente, reutilización catalogada, activos compartidos, variantes, procedencia, checksums, fallback, raíz/subruta, escritorio/móvil, axe, enlaces, red, cookies y almacenamiento.
