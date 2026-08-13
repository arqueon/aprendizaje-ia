# Evaluación separada · ronda 2 del comparador de sugerencias

## Artefacto evaluado

`docs/editorial/evidence/udgia-021/prototipos/comparador-sugerencias-b2/`

La ronda se ejecutó después de oscurecer únicamente el olivo del tema claro. El evaluador no
reescribió la actividad.

## Resultado: PASS local

La batería completa verificó:

- carga desde raíz y desde la subruta `biblioteca/`;
- escritorio claro a 1280 px y móvil oscuro a 320 px, sin desbordamiento horizontal;
- axe con cero incidencias en la actividad y en la hoja sin JavaScript;
- navegación por teclado, foco en el resumen de errores y foco en el resultado;
- ejemplo de Renata, prioridad por pérdida de propósito y salida sin pendientes;
- once campos y seis decisiones equivalentes en el fallback;
- entrada del usuario tratada como texto, sin crear HTML;
- cero solicitudes externas y cero errores de consola;
- cero escritura local antes del consentimiento, guardado voluntario, recuperación y borrado;
- respuesta comprensible cuando el navegador bloquea el almacenamiento;
- controles locales ocultos en impresión.

El reporte reproducible quedó en `prototipos/comparador-sugerencias-b2/qa-report.json`. Las
capturas de escritorio, móvil y resultado se generaron en el mismo directorio.

## Lenguaje y carga de lectura

- Auditor público: `0` bloqueos y `0` fragmentos para revisión.
- Actividad interactiva: 743 palabras, 14.29 palabras por oración, variación `0.52` y
  Szigriszt-Pazos `64.26`, nivel INFLESZ normal.
- Hoja sin JavaScript: 410 palabras, 12.42 palabras por oración, variación `0.74` y
  Szigriszt-Pazos `65.71`, nivel INFLESZ bastante fácil.

Estas medidas no demuestran comprensión. El prototipo queda listo para una lectura humana
aislada; no está autorizado para integración.
