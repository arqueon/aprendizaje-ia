# Registro de aplicación — lote 09

Fecha: 2026-08-24  
Estado: **borrador reversible aplicado, reconciliado y verificado; lote cerrado sin publicar**  
Publicación autorizada: **no**

## Autorización y alcance

Rubén dio el VoBo explícito “VoBo lote 09” el 24 de agosto de 2026. El alcance autorizado fue preparar un borrador reversible y ejecutar QA; no incluyó publicación, push, merge, despliegue ni retirada definitiva.

Se aplicaron cinco decisiones `cambiar`, cero `conservar` y cero `quitar`:

1. `content/blog/ia-generativa-evaluacion-autentica/index.md`;
2. `content/recursos/articulos/autenticidad-evaluacion-ajjawi-bearman/index.md`;
3. `content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/index.md`;
4. `content/ia-educacion/guias/evaluacion-formativa-ia/index.md`;
5. `content/recursos/glosario/integridad-academica/index.md`.

No se fusionó, retiró ni trasladó ninguna página. Se conservaron las cinco rutas públicas y los identificadores del ecosistema de la guía.

## Cambios aplicados

- El blog presenta la autenticidad como una propiedad multidimensional y situada. Retira absolutos, separa Ajjawi de Bearman y ofrece decisiones de rediseño condicionadas por propósito, riesgo, accesibilidad y carga.
- La ficha Ajjawi/Bearman corrige acceso abierto, licencia, fechas, volumen, número y páginas. Explica las tres perspectivas y no convierte la IA en el objeto principal del artículo.
- La explicación sobre plagio acota Eaton, Perkins, Cotton y Liang; contextualiza el 61.3 %, excluye detectores como prueba autónoma y transforma los rastros de proceso en opciones proporcionales con debido proceso.
- La guía define evaluación formativa por el uso de evidencia para ajustar enseñanza y aprendizaje; admite coexistencia con una función sumativa y delimita feedback, rúbricas, privacidad, sesgo, dependencia, carga y supervisión humana.
- El glosario conserva su brevedad y define integridad mediante los seis valores de ICAI, reglas comprensibles, declaración, atribución, equidad y responsabilidad.

## Ciclos RED–GREEN

1. RED inicial: 38 fallos esperados de 50 controles; GREEN tras las cinco reescrituras: 50/50.
2. La lectura en frío detectó que la guía aún exigía “V1 sin IA”, conversaciones completas y rechazo obligatorio: RED 1/51.
3. Al corregir esa contradicción, la prueba detectó una tabla Markdown con doble separador: RED 1/52.
4. GREEN tras la lectura en frío: 52/52.
5. La segunda lectura independiente pidió cuatro ajustes de coherencia y una actualización documental: RED 5/57.
6. GREEN final reconciliado: 57/57.

## Conteos verificados

- Fuentes activas: 164.
- Decisiones activas: 63 —15 `conservar`, 48 `cambiar`, 0 `quitar`.
- Pendientes: 101.
- Registros históricos del ledger: 65; dos corresponden a rutas que ya no están activas.

## QA aprobado

- Prueba focal: 57/57.
- Inventario: 164 documentos, 0 enlaces internos rotos.
- Auditoría de contexto: vigente; 0 candidatas pendientes entre las 11 de prioridad media.
- Índice del glosario: 2/2.
- Lenguaje directo: PASS.
- Rutas y tablas: PASS.
- Gate estricto de citas: PASS; 12/12 fuentes en ledger y 12/12 con evidencia literal; cobertura 16 % con umbral declarado de 10 %.
- Hugo: 924 páginas y 399 aliases. Permanecen las advertencias conocidas de compatibilidad entre Hugo 0.165.0 y Blowfish 2.97 y de claves deprecadas.
- QA visual focal: 5 rutas × 2 viewports = 10 revisiones, 0 fallos; sin overflow, imágenes rotas, errores de consola ni violaciones axe A/AA.
- Lectura en frío: las cinco rutas devolvieron HTTP 200 y texto principal completo. La contradicción residual de la guía se corrigió y volvió a verificarse.

## Gates globales no relajados

Se reejecutaron después de la aplicación:

- `qa:visual-contract`: FAIL por 22 fuentes sin `featured` propio y 18 con hero oculto; 0 cards sin imagen.
- `qa:learning-audit`: FAIL porque los inventarios Hugo y curso no tienen el mismo número de piezas.
- `qa:activity-svg-contract`: FAIL porque falta la fuente preexistente `laboratorio/practicas/aprendizaje-activo-ia/index.md`.
- `qa:udgia-figures`: FAIL por checksums históricos de 18 variantes escritorio/móvil.
- `qa:udgia-figures-route`: PASS en 10 rutas × 2 bases × 2 viewports; 0 advertencias Hugo nuevas.

Ningún lock, checksum o control fue modificado para ocultar estas deudas.

## Reversibilidad y frontera

El rollback `docs/editorial/rollback/2026-08-24-contexto-lote-09/` conserva seis archivos y sus seis hashes originales. Las cinco fuentes actuales existen y difieren del rollback; el ledger previo también está respaldado.

El 24 de agosto se consultaron las cinco rutas de GitHub Pages: respondieron HTTP 200 y ninguna contenía los marcadores nuevos del borrador. `publication_authorized: false` y `production_changed: false`.

## Segunda lectura independiente

La lectura Sol del borrador aplicado (`deleg_ed4131e6`) terminó `AJUSTAR`, sin bloqueos de atribución, reversibilidad, rutas, funcionamiento, fusión o retirada. Aprobó blog, ficha, explicación ética y glosario; en la guía pidió:

1. cambiar “procesos, no productos” por “procesos, no solo productos”;
2. añadir la vía `modificó` al diagrama;
3. sustituir “Lo que no importa” por “Lo que no basta por sí solo”;
4. no forzar una sugerencia descartada en la defensa;
5. actualizar la referencia documental `GREEN 50/50`.

Los cinco ajustes fueron aplicados y pasaron RED 5/57 → GREEN 57/57, build y QA visual 10/10. El dictamen íntegro y la reconciliación están en `docs/editorial/revisiones/2026-08-24-sol-contexto-lote-09-final.md`.

La publicación sigue fuera del alcance.
