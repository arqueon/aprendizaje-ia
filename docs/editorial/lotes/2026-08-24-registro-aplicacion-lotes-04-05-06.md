# Registro de aplicación — VoBo editorial lotes 04, 05 y 06

Fecha y hora: 2026-08-24T07:49-06:00
Autorización: VoBo editorial de Rubén (2026-08-24) para preparar borrador reversible y QA.
`publication_authorized = false` — este registro NO autoriza publicar GitHub Pages, push,
merge, despliegue ni borrado definitivo de contenido. Producción sin cambios.

Detalle completo (archivos, hashes post-edición, QA): `2026-08-24-registro-aplicacion-lotes-04-05-06.json`.
Este registro se añade a la evidencia histórica; no sustituye ningún manifiesto previo.

## Estado por lote

- **Lote 04 (recursos externos): ya estaba aplicado; verificado sin deriva.** Los 12
  archivos activos, las 13 recuperaciones ocultas, la cuarentena del índice de `externas`
  y el rollback coinciden con su manifiesto. No se editó nada del lote 4 en esta sesión.
- **Lote 05 (procedencia de prácticas): aplicado.** ABP, debate socrático y evaluación
  formativa reescritas como plantilla/actividad propuesta (sin grupos, sin 78 %/72 %, con
  ejemplos iniciales, alternativas sin IA, riesgos y preguntas de revisión; el portafolio
  conserva `practice.portafolio-proceso` y su relación `continua`). Aprendizaje activo en
  cuarentena reversible con alias a la guía canónica. Las 16 líneas citantes (14 páginas)
  y `data/editorial/context-audit-decisions.json` actualizadas conforme al expediente.
- **Lote 06 (seis fuentes de riesgo): aplicado.** Coordinación académica conservada sin
  cambios (hash idéntico). SAMR: reparación estrictamente bibliográfica (Wayback
  2025-09-04 + Hamilton, Rosenberg y Akcaoglu 2016 con DOI), límites del 02A intactos.
  «Acerca de» reescrito: autoría/relación con UDGPlus explícita («no es un canal
  oficial»), alcance verificable, estatuto de piezas declarado. Tutorías y mentoría:
  fecha de Burns/Brookings corregida (27 de enero de 2026), alcance del ensayo de Kestin
  acotado con el matiz de los autores, cifras y comparaciones no documentadas retiradas,
  riesgos presentados como de diseño y criterios de cuándo interviene una persona.
  Artículo y hub de Experiencias en cuarentena reversible; ambas rutas son aliases de
  `/laboratorio/`; el hub general retiró la tarjeta y la promesa de implementaciones
  documentadas.

## Desviaciones registradas (no silenciosas)

1. **Brecha del censo del lote 06:** dos enlaces activos a `/laboratorio/experiencias/`
   no censados por el manifiesto (`formacion-docente/redes/index.md`,
   `laboratorio/integracion-ia/_index.md`). Se corrigieron como saneamiento mínimo de
   referencias entrantes, con copia previa añadida al rollback del lote 06.
2. **`qa:learning-audit` bloqueado:** compara contra el inventario del proyecto hermano
   `../alfabetizacion_en_ia` (167 piezas vs 164 actuales). Ese archivo está fuera del
   árbol autorizado y no se tocó; queda pendiente regenerarlo desde su propio proyecto.
3. **`qa:ecosistema` falla por preflight de git** (esta copia no tiene `.git`); deuda
   preexistente ya declarada separada en el expediente del lote 05.
4. **QA temporal del lote 04:** 60/61; la única falla es su aserción fija de «167
   documentos», superada legítimamente por las tres cuarentenas de los lotes 5–6.

## QA ejecutado (resultados reales)

Build Hugo exit 0 (924 páginas, 399 aliases; solo deprecaciones conocidas) ·
inventario 164 documentos, 0 enlaces rotos · contexto 0 afirmaciones de implementación,
0 estados contradictorios · `qa:routes-tables` PASS · `qa:glossary-index` PASS ·
`qa:direct-language` PASS · contrato visual sin deuda nueva · QA focal lotes 05-06:
76/76 (`tools/qa-contexto-lote-05-06.tmp.mjs`).

## Segunda revisión independiente

Agente independiente de solo lectura: dictamen **approve**, 11/11 comprobaciones, 0
bloqueos. Verificó hashes, cuarentenas dobles (cuarentena + rollback con hash idéntico),
aliases construidos como meta refresh correctos, ausencia de cifras residuales y
recuperaciones de Nextcloud intactas.
`docs/editorial/revisiones/2026-08-24-claude-fable-aplicacion-lotes-04-05-06.json`.

## Rollback

- `docs/editorial/rollback/2026-08-24-contexto-lote-05/` — 23 copias pre-edición con manifiesto sha256.
- `docs/editorial/rollback/2026-08-24-contexto-lote-06/` — 15 copias pre-edición con manifiesto sha256.
- Restaurar = copiar cada archivo del rollback a su ruta original (los cuarentenados
  también están duplicados en `docs/editorial/cuarentena/2026-08-24-contexto-lote-0{5,6}/`).
