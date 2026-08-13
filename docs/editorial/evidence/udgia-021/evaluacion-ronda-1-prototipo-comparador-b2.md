# Evaluación separada · ronda 1 del comparador de sugerencias

## Artefacto evaluado

`docs/editorial/evidence/udgia-021/prototipos/comparador-sugerencias-b2/`

La evaluación revisó el prototipo ya generado. No reescribió el contenido ni modificó el
alcance autorizado.

## Resultado

La ejecución llegó al fallback completo y axe detuvo la ronda por dos incidencias del mismo
patrón:

- `Sugerencia 1` y `Sugerencia 2` usan verde olivo `#6e792d` sobre beige `#efe7d7`;
- el contraste medido fue `3.85:1` para texto de 18.4 px en negrita;
- el mínimo exigido en ese tamaño es `4.5:1`.

Antes del hallazgo pasaron la carga desde raíz, el envío vacío con foco en el resumen de
errores, el ejemplo completo, las dos salidas de decisión, el escape de entrada HTML, el
guardado voluntario y el borrado local. La ronda no se declara completa porque la auditoría de
accesibilidad bloqueó el recorrido.

## Ajuste solicitado al optimizador

Oscurecer únicamente el olivo del tema claro y repetir la batería completa. Conservar el
olivo claro del tema oscuro y no cambiar contenido, estructura ni comportamiento.
