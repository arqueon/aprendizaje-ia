# Evaluación separada · ronda 4 del comparador B2

## Alcance

Esta ronda evalúa la versión local corregida después de la lectura humana de Rubén. El evaluador
no reescribió el prototipo. La rúbrica quedó fijada antes de ejecutar las pruebas: origen y alcance
de las sugerencias, comparación explícita, propósito modelado, antes/después, resumen textual,
reversión del ejemplo y equivalencia sin JavaScript.

## Resultado técnico: PASS local

La primera ejecución de Chromium terminó por una restricción del sandbox (`setsockopt: Operation
not permitted`). La repetición fuera de esa restricción concluyó en PASS y produjo el reporte
reproducible `prototipos/comparador-sugerencias-b2/qa-report.json`.

La batería comprobó:

- carga desde raíz y desde la subruta `biblioteca/`;
- escritorio claro a 1280 px y móvil oscuro a 320 px, sin desbordamiento horizontal;
- `axe` con cero incidencias en la actividad y en la hoja sin JavaScript;
- foco en el resumen de errores y en el resultado;
- origen y encargo de las sugerencias presentes en el ejemplo y en la salida;
- contraste escrito entre las dos sugerencias antes de revisar el fragmento;
- resumen textual «Modificar» / «Dejar pendiente», sin depender solo del color;
- original y revisión visibles juntos en el paso 4 y en el resultado;
- restauración del texto previo después de cargar el ejemplo;
- catorce campos y seis grupos de decisión en la hoja sin JavaScript;
- entrada de la persona tratada como texto, sin crear HTML;
- cero solicitudes externas, cero errores de consola y cero escritura local antes del consentimiento;
- guardado voluntario, recuperación, borrado y comportamiento comprensible con almacenamiento bloqueado;
- controles locales ocultos al imprimir.

Las capturas `captura-escritorio.png`, `captura-movil.png` y `captura-resultado.png` se regeneraron
y se revisaron visualmente. El orden permanece legible en móvil; el antes/después pasa de dos
columnas a una sin perder sus rótulos.

## Dictamen

**PASS técnico local.** No se encontraron defectos que requieran otra optimización técnica. Esta
ronda no prueba comprensión humana ni autoriza integración.
