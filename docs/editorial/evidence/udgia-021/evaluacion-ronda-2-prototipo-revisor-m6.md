# UDGIA-021 — evaluación del prototipo revisor M6, ronda 2

**Rol:** evaluador separado; verifica `M6P-R1-H1` a `M6P-R1-H3`.  
**Fecha:** 2026-08-02.

## Cierre de hallazgos

| Hallazgo | Evidencia posterior | Dictamen |
|---|---|---|
| Favicon ausente | `favicon.svg` se sirve en raíz y subruta; cero errores de consola | Cerrado |
| Contraste oscuro insuficiente | Pie y controles oscuros usan `#111722`; axe 0 en fallback e interacción | Cerrado |
| Almacenamiento denegado | Lectura, guardado y borrado capturan `SecurityError`; la simulación conserva la interfaz y explica el límite | Cerrado |

## Comprobación funcional

La QA abre el prototipo en raíz y en `biblioteca/`, con escritorio claro y móvil oscuro a
320 px. Comprueba navegación por teclado en las acciones principales, foco en resumen de
errores y resultado, ausencia de desbordamiento, impresión, texto del usuario sin ejecución,
cero solicitudes externas y guardado en una sola clave únicamente después del consentimiento.

También verifica las tres salidas posibles:

- el primer `no` produce “Primera ruptura declarada”;
- el primer `no estoy seguro` produce “Primer punto por comprobar”;
- cuatro respuestas `sí` producen “No señalaste una ruptura”, no una certificación.

La página sin JavaScript dirige a una hoja con cinco campos y cuatro relaciones. El navegador
con almacenamiento bloqueado mantiene el formulario operativo y no genera errores de consola.

## Accesibilidad, dificultad y privacidad

- Axe: `0` violaciones en interacción y fallback, en los dos temas y viewports probados.
- Reflujo: `320/320` px en móvil; sin desbordamiento horizontal.
- Lenguaje público: `0 bloqueos / 0 fragmentos para revisión`.
- Interacción: Szigriszt-Pazos `62.47`, INFLESZ normal, 15.22 palabras por oración.
- Fallback: Szigriszt-Pazos `64.33`, INFLESZ normal, 13.50 palabras por oración.
- Red: cero solicitudes externas.
- Estado: memoria hasta que la persona elige guardar; recuperación y borrado locales.

Estas mediciones no verifican ajuste a la población. La lectura humana, el lector de pantalla
real, el zoom asistido y el uso disciplinar permanecen abiertos antes de integrar.

## Dictamen

**PASS local, prototipo no integrable todavía.** El revisor cumple el brief B6 sin reutilizar
el H5P inadecuado ni modificar `content/`. No se creó una biblioteca H5P, ruta pública,
publicación, despliegue o cambio en Moodle.
