# UDGIA-021 — verificación de M1 después de la segunda revisión simulada

**Rol:** evaluador separado; verifica únicamente los cuatro hallazgos autorizados, sin
reescribir.  
**Artefacto:** `muestras/entrada-general.md`.  
**Fecha:** 2026-08-02.

## 1. El selector funciona como cierre — cerrado

`Cuando la relación se vuelve co-creación` aparece antes de `Elige por dónde continuar`. El
selector es ahora el último bloque de la muestra y no deja una explicación conceptual sin leer
después de ofrecer las rutas.

## 2. La propuesta de Orientaciones tiene contexto — cerrado

El texto declara: “La propuesta de Orientaciones es el documento de referencia del que
provienen varios de estos criterios; todavía no es una norma institucional vigente”. Después
relaciona primer intento, verificación, privacidad y decisión revisable con acciones ya
desarrolladas en la página. El estatus y la función dejan de depender del expediente interno.

## 3. La afirmación decisiva tiene un criterio operativo — cerrado

La pregunta “si fuera falsa, imprecisa o incompleta, ¿tendrías que cambiar lo que afirmas?”
permite reconocer como decisiva la afirmación cuya falla obligaría a modificar la conclusión.

## 4. Acción, evidencia y jerga tienen mediación — cerrado

El microejemplo docente une una acción observable —comparar dos explicaciones con criterios—
con una evidencia entregable: un párrafo que nombre el criterio, cite el dato y justifique la
decisión. La apertura dice `sistema de IA generativa` y `prompt` fue sustituido por
`instrucción`.

## Integridad y mediciones

- La idea central, el caso de Mariana, la alternativa sin IA y las tres rutas permanecen.
- Auditor de lenguaje público: **0 bloqueos y 0 fragmentos para revisión humana**.
- Medición reproducida con segmentación propia y `pyphen es_ES`: 1,266 palabras, 78 oraciones,
  16.23 palabras por oración y Szigriszt-Pazos **63.25**, nivel INFLESZ normal.
- `npm run qa:learning-audit`: **PASS**, inventario vigente de 158 piezas.
- `git diff --check`: **PASS**.

## Dictamen

**PASS local.** Los cuatro hallazgos autorizados quedaron cerrados sin ampliar el alcance. La
prueba automática y el evaluador separado no sustituyen la lectura humana ni verifican todavía
el soporte final en Hugo.
