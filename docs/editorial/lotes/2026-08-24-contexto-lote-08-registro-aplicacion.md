# Registro de aplicación — lote 08

Fecha: 2026-08-24  
Estado: **borrador reversible aplicado y verificado; lote cerrado sin publicar**  
Publicación autorizada: **no**

## Alcance aplicado

- `cambiar`: aprendizaje activo, diseño inverso y evaluación auténtica.
- `conservar`: Taxonomía de Bloom y modelo SAMR; ambos permanecen idénticos al rollback.
- `quitar`: ninguna fuente.

Se preservaron las cinco rutas públicas. Evaluación auténtica enlaza ahora la introducción ya revisada de evaluación y retroalimentación, no el blog que aún requiere revisión propia.

## Ciclos RED–GREEN

1. RED inicial: 16 fallos esperados de 22 controles.
2. GREEN tras las tres reescrituras: 22/22.
3. Reconciliación del dictamen Sol sobre el destino de evaluación auténtica: RED 2/23 y GREEN 23/23.
4. Alineación de la etiqueta con el título real de la continuación: RED 1/24 y GREEN final 24/24.

## Conteos verificados

- Fuentes activas: 164.
- Decisiones activas: 55 —14 `conservar`, 41 `cambiar`, 0 `quitar`.
- Pendientes: 109.
- Registros históricos del ledger: 57; dos corresponden a rutas que ya no están activas.

## QA aprobado

- Inventario: 164 documentos, 0 enlaces internos rotos.
- Auditoría de contexto: vigente.
- Índice del glosario: 2/2.
- Lenguaje directo: PASS.
- Rutas y tablas: PASS.
- Hugo: 924 páginas y 399 aliases.
- Visual focal: 5 rutas × 2 viewports = 10 revisiones, 0 fallos; sin overflow, errores de consola ni violaciones axe A/AA.

## Gates globales no relajados

Permanecen fallos ajenos al lote: deuda del contrato visual; recuentos distintos entre inventario Hugo y curso; una fuente ausente en el contrato SVG; y checksums históricos de variantes UDGIA. No se cambiaron locks ni controles para ocultarlos.

## Revisión independiente

La lectura Sol de la propuesta terminó `approve`, sin bloqueos, y sus cuatro mejoras importantes fueron reconciliadas. La lectura Sol del borrador aplicado (`deleg_6c49f8bc`) también terminó `approve`, sin bloqueos. Confirmó la conservación byte a byte de Bloom y SAMR y la pertinencia del nuevo enlace de evaluación auténtica.

Queda como deuda futura una explicación extensa dedicada específicamente a autenticidad en evaluación. No se enlazará automáticamente el blog actual hasta revisarlo como posible texto canónico.

## Frontera

GitHub Pages permanece fuera del alcance. `publication_authorized: false` y `production_changed: false`.
