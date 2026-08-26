# Segunda lectura independiente del borrador aplicado — lote 10

**Fecha:** 2026-08-24  
**Revisión independiente:** subagente `deleg_6ff93a3c`  
**Alcance:** solo lectura; cuatro páginas aplicadas, evidencia, ledger, dependencias, rollback y QA  
**Dictamen original:** `AJUSTAR antes del cierre`  
**Autoriza publicación:** no

## Dictamen independiente

La revisión no encontró motivo para fusionar, retirar o poner en cuarentena ninguna página. Confirmó la integridad de rutas, PDF, portadas, imágenes destacadas, recuperaciones Nextcloud y rollback; también volvió a ejecutar la prueba focal con resultado `PASS 87/87`.

Identificó un ajuste factual público y tres ajustes de trazabilidad:

1. **UNAM:** la ficha decía que GAIA-GEN “participó en el trabajo”. El PDF de Bachillerato permite afirmar que GAIA-GEN es autor de una recomendación citada por la guía, no que sea coautor del documento.
2. **Mapa de enlaces:** el mapa de investigación era una línea base anterior a las reescrituras. El estado aplicado es Zhan `0/0`, UNAM `1/1`, DEC `4/4` y matriz `3/4` en archivos/apariciones.
3. **Conteos del rollback:** la copia protegida del ledger contiene 65 registros totales, mientras la cifra `63` describía decisiones activas. Hay dos registros históricos cuyas rutas ya no forman parte de las 164 fuentes activas. Tras el lote hay 69 registros totales y 67 decisiones activas.
4. **Estado aplicado:** el expediente de investigación debe conservar su estado histórico “propuesta previa al VoBo”; hacía falta un registro y un manifiesto separados para la aplicación.

Como mejora no bloqueante, recomendó reemplazar la frase metacorrectiva de la ficha Zhan por atribuciones positivas: etapas tomadas de Malecka, Boud y Carless; ciclo de autorregulación adaptado de Zimmerman.

## Reconciliación aplicada

### 1. Corrección factual UNAM

Se cambió la atribución por:

> GAIA-GEN nombra al Grupo Académico de Inteligencia Artificial Generativa en Educación de la UNAM, autor de una recomendación citada por la guía; no es un segundo marco equivalente a ARCHED ni se le atribuye la autoría del documento.

### 2. Atribuciones positivas en Zhan

La ficha ahora indica explícitamente:

- `eliciting–processing–enacting`: clasificación tomada de Malecka, Boud y Carless;
- `forethought–control–retrospect`: adaptación del ciclo de autorregulación de Zimmerman.

La prueba focal se modificó primero para exigir ambas correcciones, se observó RED `2/87` y luego GREEN `PASS 87/87`.

### 3. Mapa aplicado

Se creó `docs/editorial/lotes/2026-08-24-contexto-lote-10-applied-link-map.json`.

El mapa previo `2026-08-24-contexto-lote-10-link-map.json` se conserva sin reescritura porque documenta la investigación antes del VoBo. El mapa aplicado registra el árbol posterior a la edición.

### 4. Conteos del ledger

No se reescribió el manifiesto histórico. La reconciliación distingue:

| Estado | Registros totales | Decisiones sobre fuentes activas | Pendientes activas |
|---|---:|---:|---:|
| Rollback anterior al lote 10 | 65 | 63 | 101 |
| Aplicado lote 10 | 69 | 67 | 97 |

La diferencia total `65 → 69` y la diferencia activa `63 → 67` son las cuatro decisiones `cambiar` del lote. No se eliminaron los dos registros históricos.

### 5. Artefactos aplicados

El expediente de investigación se conserva como evidencia histórica. El estado posterior al VoBo queda en:

- `docs/editorial/lotes/2026-08-24-contexto-lote-10-registro-aplicacion.md`;
- `docs/editorial/lotes/2026-08-24-contexto-lote-10-application-manifest.json`;
- esta segunda lectura reconciliada;
- el mapa de enlaces aplicado.

## Resultado reconciliado

**Apto para cerrar como borrador reversible y sin publicar.** No quedan bloqueos del lote 10. Esta conclusión no autoriza despliegue, push del sitio, merge, publicación ni modificación de GitHub Pages.
