# Registro de aplicación — lote 10: evidencia y recursos para evaluar con IA

**Fecha:** 2026-08-24  
**VoBo humano:** Rubén, 2026-08-24T19:33:57-06:00  
**Alcance autorizado:** borrador reversible y QA  
**Publicación autorizada:** no  
**Producción modificada:** no  
**Estado del registro:** cerrado como borrador reversible; QA y segunda lectura reconciliados; sin publicar

## Cambios aplicados

Se reescribieron cuatro páginas sin cambiar sus rutas ni retirar archivos:

1. `content/recursos/articulos/genai-feedback-engagement-2025/index.md`
   - corrige autoría, referencia y licencia;
   - presenta el artículo como marco conceptual tentativo;
   - separa seis posibilidades, tres etapas de interacción y ciclo de autorregulación;
   - declara límites y ausencia de prueba causal propia.
2. `content/recursos/articulos/guias-iagen-evaluacion-unam/index.md`
   - corrige 32/57/31 páginas físicas;
   - separa ARCHED/GAIA-GEN en bachillerato, UNESCO (2025) en licenciatura y tres modalidades en posgrado;
   - retira primacías no demostradas y comparaciones no citadas;
   - conserva tres PDF, tres portadas, `featured.svg`, licencia, anclas, iframes y descargas locales/oficiales.
3. `content/recursos/articulos/next-era-assessment-dec/index.md`
   - cambia a 101 casos y 14 metodologías atribuidas al DEC/Pearson;
   - reemplaza la URL 404 por la página viva;
   - distingue informe institucional de revisión académica o demostración causal;
   - acota `AI-resistant` y evita presentarlo como garantía.
4. `content/observatorio/guias/evaluacion-herramientas-ia-educativas/index.md`
   - conserva seis dimensiones como adaptación editorial de ASCCC y McMaster/eCampusOntario;
   - retira comité mínimo, comparación obligatoria y relatos atribuidos sin fuente;
   - separa revisión preliminar, prueba controlada y autorización institucional;
   - añade preguntas sobre aprendizaje, supervisión humana, accesibilidad, personas afectadas, privacidad, contrato, retención y sostenibilidad.

El ledger `data/editorial/context-audit-decisions.json` incorporó cuatro decisiones `cambiar`. Estado activo posterior: `15 conservar / 52 cambiar / 0 quitar / 97 pendientes`; los dos registros históricos de rutas fuera del árbol permanecen intactos.

## Reversibilidad

Rollback: `docs/editorial/rollback/2026-08-24-contexto-lote-10/`.

- Archivos congelados: 5.
- Copias verificadas por SHA-256 y tamaño: 5/5.
- Fuentes actuales distintas del rollback: 4/4.
- Ledger actual distinto del rollback: sí.
- PDF, imágenes y recuperaciones ocultas del bundle: conservados byte a byte mediante el manifiesto de investigación y la prueba focal.

## TDD y QA

- Prueba focal: `tools/qa-contexto-lote-10.tmp.mjs`.
- RED inicial: `49 fallos/87`.
- GREEN final previo a segunda lectura: `PASS 87/87`.
- `qa:context-audit`: PASS; 164 fuentes y 11 candidatas.
- `qa:content-inventory`: PASS; 164 documentos y 0 enlaces internos rotos.
- `qa:routes-tables`: PASS.
- `qa:glossary-index`: PASS 2/2.
- `qa:direct-language`: PASS.
- Build Hugo limpio: 922 páginas, 64 paginadores, 1,436 archivos estáticos, 268 imágenes procesadas y 398 aliases. Las cuatro rutas del lote existen y contienen las frases nuevas.

El conteo `922/398` se registra como estado actual. Las reescrituras no cambiaron rutas ni aliases y las cuatro páginas están presentes; no se usó el conteo histórico para fabricar estabilidad.

## Lectura renderizada y QA visual

- Cuatro rutas: HTTP 200 en el sitio de revisión.
- Lectura en frío: cuatro textos completos en `/tmp/lote10-rendered/`.
- QA visual: `8/8`, sin overflow, errores de consola, imágenes rotas ni violaciones axe A/AA.
- Evidencia: `docs/design/evidence/contexto-lote-10/`.
- Los visores PDF aparecen negros en capturas de Chromium headless; los tres `iframe` responden `200 application/pdf`, conservan firma `%PDF-` y tienen enlaces de descarga local y oficial visibles.

## Gates globales no ocultados

- `qa:visual-contract`: exit 1 — 12 páginas sin featured propio y 18 con hero oculto.
- `qa:learning-audit`: exit 1 — inventarios Hugo/curso con conteos distintos.
- `qa:activity-svg-contract`: exit 1 — contrato aún referencia `laboratorio/practicas/aprendizaje-activo-ia/index.md`, ruta ya fuera del árbol activo.
- `qa:udgia-figures`: exit 1 — deriva de checksums en variantes heredadas.
- `qa:udgia-figures-route`: PASS.

Ningún gate se relajó ni se modificó para ocultar la deuda.

## Producción y frontera de publicación

GitHub Pages respondió HTTP 200 en las cuatro rutas y conserva las frases anteriores; ninguna frase nueva está en producción.

Este VoBo no autoriza publicación, push del sitio, merge, despliegue ni retirada definitiva. El trabajo aplicado permanece en el árbol sincronizado y en el sitio de revisión.

## Segunda lectura aplicada

La segunda lectura `deleg_6ff93a3c` terminó con dictamen `AJUSTAR antes del cierre`, sin autoridad para publicar. Sus cuatro hallazgos se reconciliaron:

- GAIA-GEN se presenta como autor de una recomendación citada por la guía de Bachillerato, no como coautor del documento;
- Zhan atribuye positivamente las tres etapas a Malecka, Boud y Carless, y el ciclo de autorregulación a Zimmerman;
- se creó un mapa aplicado con recuentos `0/0`, `1/1`, `4/4` y `3/4`;
- se distinguen los 65/69 registros totales de las 63/67 decisiones sobre fuentes activas y se preserva el expediente de investigación como histórico.

La prueba modificada se observó en RED `2/87` y después en GREEN `87/87`. El dictamen y la reconciliación quedan en `docs/editorial/revisiones/2026-08-24-segunda-lectura-aplicada-contexto-lote-10.md`.

## Estado final

El lote queda cerrado como **borrador reversible, verificado y no publicado**. GitHub Pages conserva las cuatro versiones anteriores; ninguna frase nueva se encuentra en producción. Una publicación futura requiere un VoBo separado y explícito.
