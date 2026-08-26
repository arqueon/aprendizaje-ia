# Registro de aplicación — lote 07

Fecha de cierre: 2026-08-24  
Estado: **borrador reversible verificado; no publicado**

## VoBo y alcance

Rubén otorgó el **“VoBo lote 7”** para aplicar cinco decisiones, editar cuatro páginas y el índice de Formación docente, registrar el ledger y ejecutar QA. El VoBo no autorizó publicación.

## Decisiones aplicadas

- `cambiar`: aprendizaje activo; modelos SAMR–ICAP; evaluación y retroalimentación; taller de diseño de actividades con IA.
- `conservar`: Taxonomía de Bloom y diseño inverso. Su hash sigue idéntico al rollback.
- Índice: se añadió una ruta sugerida, el taller y un rótulo para distinguir la cuadrícula automática.

El ledger activo quedó en **12 conservar**, **38 cambiar**, **0 quitar** y **114 pendientes**, sobre 164 fuentes activas.

## Revisión independiente

Sol realizó una segunda lectura aislada y de solo lectura. No encontró bloqueos y clasificó el lote como aprobable con cinco mejoras importantes no bloqueantes. Se reconciliaron todas:

1. se dividió el bloque individual de 45 minutos del taller;
2. se explicitó el recorrido aprendizaje activo → Bloom → SAMR–ICAP → evaluación → taller sin modificar Bloom;
3. se rotuló la cuadrícula automática del índice;
4. los cuatro puntos del taller quedaron declarados como síntesis editorial;
5. el expediente previo al VoBo quedó marcado como registro histórico.

También se eliminó la repetición mecánica de los cierres de las tres sesiones.

## QA final

- Prueba editorial focal: **38/38**.
- Inventario: **164 documentos; 0 enlaces internos rotos**.
- Auditoría de contexto: **114 pendientes; 11 candidatas**.
- Rutas y tablas: PASS.
- Hugo: **924 páginas y 399 aliases**; salida en `/tmp`, sin tocar producción.
- Navegador: **12/12** vistas de escritorio/móvil, HTTP 200, sin desbordamiento, errores de consola ni violaciones axe A/AA.

## Deuda global no atribuible al lote

Permanecen bloqueados, sin relajar sus contratos: contrato visual global; reconciliación del inventario de aprendizaje; contrato SVG ligado a un inventario anterior; hashes históricos de variantes SVG; y QA de ecosistema por ausencia de Academia y `.git` en la copia sincronizada. Las causas y la evidencia están en el manifiesto de aplicación.

## Rollback y publicación

El rollback conserva siete archivos y hashes previos en `docs/editorial/rollback/2026-08-24-contexto-lote-07/`. El manifiesto final está en `docs/editorial/lotes/2026-08-24-contexto-lote-07-application-manifest.json`.

**No se publicó ni se modificó GitHub Pages.** La versión servida en `100.107.89.3:1313` es únicamente el sitio de revisión.
