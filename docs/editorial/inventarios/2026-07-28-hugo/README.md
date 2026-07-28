# Inventario editorial de Hugo — 2026-07-28

Este corte registra los 158 documentos Markdown del sitio como base de
UDGIA-005. No es un dictamen editorial definitivo: las columnas `decision` y
`needs` son una primera clasificación automática para ordenar la revisión
humana.

## Archivos

- `inventario-hugo.json`: informe completo, totales, taxonomías, posibles
  solapamientos y registro por página.
- `inventario-paginas.csv`: vista tabular para filtrar y priorizar páginas.
- `tools/audit-hugo-content.mjs`: generador y verificador, sin dependencias
  adicionales.

## Reproducir

```bash
npm run content:inventory
npm run qa:content-inventory
```

El primer comando regenera el corte. El segundo comprueba que JSON y CSV
coincidan exactamente con el contenido actual y que no existan enlaces internos
rotos entre páginas, alias, recursos de página o archivos estáticos.

## Alcance de las métricas

- `featured` detecta recursos `featured.*` en el bundle o imágenes declaradas en
  front matter.
- `svg_count` cuenta SVG ubicados en la raíz del bundle; no interpreta su calidad
  visual.
- `decision` usa extensión, estructura, descripción y procedencia como señales.
  Una ficha breve de glosario puede ser válida aunque aparezca como candidata a
  ampliar o fusionar.
- `possible_overlaps` compara vocabulario compartido. En familias con plantilla
  común, como productos de aprendizaje, la similitud no implica duplicación.

La fecha pertenece al corte editorial, no a la ejecución del script, para que el
resultado sea determinista en cualquier checkout del mismo commit.
