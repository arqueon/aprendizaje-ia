# Cierre de claridad del piloto rizomático de doce páginas

**Estado:** B incorporada y verificada únicamente en el piloto local.  
**VoBo:** comparación `2026-08-12T02:15:16.193Z`; refinamiento `2026-08-12T03:10:57.009Z`.  
**Límites:** trabajo reversible; sin commit, push, publicación ni despliegue.

## Propósito

Comparar dos formas de cerrar el panel **Sigue tejiendo tu recorrido** después de comprobar que
las coincidencias automáticas actuales describen la página destino, pero no explican por qué se
recomienda desde la página de origen.

## Variantes

- **A · Solo conexiones curadas:** conserva únicamente relaciones editoriales con verbo y razón.
  Cada panel puede contener de dos a cinco tarjetas.
- **B · Curadas más coincidencias explicadas:** conserva primero las relaciones editoriales y
  completa espacios solo cuando puede declarar una coincidencia concreta —capacidad, intención,
  desafío o tema— y un movimiento acorde con el tipo de página destino.

Ambas variantes resuelven rutas fuente, direcciones públicas y aliases. Las plantillas candidatas
viven bajo `variants/`; `layouts/partials/related.html` permanece fuera de este expediente y no
se sustituye al preparar la comparación.

## Muestra autorizada

La comparación cubre tres páginas en escritorio y teléfono:

1. **Laboratorio guiado para estudiantes:** permite comprobar que la relación hacia el alias de
   **Empezar con IA** recupera **Prepárate antes** y su razón original.
2. **Ganancia cognitiva:** parte de dos conexiones curadas y tres coincidencias automáticas en el
   piloto vigente.
3. **La paradoja de la descarga cognitiva:** ofrece el segundo caso con tres coincidencias
   automáticas y permite valorar si la red aporta contraste o repite los mismos centros.

## Criterio de decisión

Una variante es comprensible cuando una persona puede explicar, sin conocer la taxonomía interna,
por qué aparece cada tarjeta y qué obtendría al abrirla. Cinco tarjetas son un máximo, no una
cuota. Una coincidencia que no produzca una razón específica se omite.

## Verificación prevista

El runner `qa.mjs` construye copias temporales del working tree para A y B, superpone únicamente
la plantilla candidata y verifica los doce nodos en escritorio y móvil. Produce un reporte JSON,
manifiesto de hashes, capturas aisladas y seis comparaciones visuales. También comprueba que la
plantilla activa conserve el mismo hash antes y después del proceso.

## Resultado de la comparación

La corrida final cerró en PASS:

- dos builds de `932` páginas;
- `48` combinaciones verificadas: dos variantes × doce páginas × escritorio/teléfono;
- `37` relaciones curadas recuperadas en A y B, incluidas las dos que usan el alias público de
  **Empezar con IA**;
- `23` coincidencias automáticas explicadas en B;
- cero duplicados, tarjetas incompletas, destinos fallidos, desbordamientos, errores de consola,
  solicitudes externas o violaciones axe graves/críticas en los paneles;
- plantilla activa sin cambios: SHA-256
  `0ae52c5d2e1b21229230e4962958f382626863deac6f50b156666c4d53a69ece` antes y después.

El reporte reproducible es `qa-report.json`; `manifest.json` fija hashes y tamaños de plantillas,
reporte y capturas. Las seis comparaciones finales viven en `captures/comparacion-*.png`.

La inspección visual favorece A para cerrar el piloto: conserva las relaciones deliberadas y
reduce la carga móvil. B demuestra que las coincidencias pueden explicarse, pero en **Ganancia
cognitiva** y **La paradoja de la descarga cognitiva** repite el criterio «conservar la decisión
propia» y convierte dos conexiones fuertes en cinco.

## Elección y refinamiento de B

Rubén eligió B porque «enriquece la propuesta y hace posible una navegación más profunda». El
VoBo posterior autorizó refinar B fuera de la plantilla activa, repetir las seis muestras y la QA,
y hacer después una prueba humana breve.

El refinamiento conserva las `23` coincidencias automáticas, pero asigna a cada una dentro de un
panel un criterio distinto: capacidad, propósito, reto o tema. La explicación nombra ese criterio
y el movimiento que permite; si no hay un criterio nuevo, la conexión se omite.

La nueva corrida quedó en PASS: `48` combinaciones, `37` relaciones curadas y `23` automáticas en
B, con cero criterios y razones automáticas repetidos dentro de un panel. Se regeneraron e
inspeccionaron las seis comparaciones. La plantilla activa mantuvo el SHA-256
`0ae52c5d2e1b21229230e4962958f382626863deac6f50b156666c4d53a69ece`.

## Siguiente compuerta

El anexo visual original lleva las seis comparaciones incrustadas y pesa aproximadamente `562 KB`.
El acortador rechazó ese payload, por lo que se preparó una copia ligera de `181,310` bytes con las
mismas seis comparaciones WebP, legibilidad comprobada y contraste AA. Tras autorización externa
específica, la copia ligera se compartió cifrada mediante `sdoc share --short`; la clave del enlace
no se conserva en este expediente. B ya fue elegida y refinada; la prueba humana breve está
preparada como siguiente compuerta. Su envío no autoriza incorporar la plantilla candidata.

## Resultado de la prueba humana

Envío `2026-08-12T03:20:34.904Z`: la persona lectora pudo describir las tarjetas como caminos de
profundización, preparación, aplicación o repaso; consideró claras las razones en las tres
muestras y dictaminó que enriquecen la navegación, aunque todavía sobran algunas. B necesita otro
ajuste antes de solicitar su incorporación.

El hallazgo apunta a cantidad, no a redacción. Solo **Ganancia cognitiva** y **La paradoja de la
descarga cognitiva** reciben tres tarjetas automáticas; son también las muestras que más crecen en
móvil. La poda mínima propuesta es limitar a dos las automáticas por página, manteniendo cinco como
máximo total. Esto conservaría las `37` curadas y `21` de las `23` automáticas explicadas. Requiere
un VoBo separado antes de modificar de nuevo el candidato.

## Poda mínima ejecutada

VoBo `2026-08-12T03:22:24.312Z`: aplicar únicamente al candidato el máximo de dos automáticas por
página; repetir QA de los doce nodos y generar nuevas muestras de Ganancia cognitiva y Paradoja en
escritorio y teléfono. Límite: local y reversible, sin commit, push, publicación ni despliegue.

Resultado PASS:

- dos builds de `932` páginas y `48` combinaciones;
- `37` relaciones curadas en A y B;
- `21` automáticas explicadas en B, nunca más de dos por página;
- cero criterios o razones automáticas repetidos dentro de un panel;
- cero duplicados, tarjetas incompletas, destinos fallidos, overflow, consola, red externa o axe
  grave/crítico;
- cuatro comparaciones enfocadas regeneradas e inspeccionadas;
- plantilla activa intacta con SHA-256
  `0ae52c5d2e1b21229230e4962958f382626863deac6f50b156666c4d53a69ece`.

B queda preparada como candidata. Incorporarla a `layouts/partials/related.html` requiere una
autorización separada y un respaldo exacto del estado activo anterior.

## Incorporación al piloto local

VoBo `2026-08-12T03:25:29.761Z`: incorporar B solo al piloto local, respaldar la plantilla activa,
compilar y verificar los doce nodos, y restaurar el respaldo si falla alguna comprobación. Límites:
sin commit, push, publicación ni despliegue.

Antes de sustituirla, la plantilla activa se guardó en
`rollback/related-active-before-b-2026-08-11.html`; copia y origen compartieron el SHA-256
`0ae52c5d2e1b21229230e4962958f382626863deac6f50b156666c4d53a69ece`. La plantilla local activa
coincide ahora exactamente con B: SHA-256
`690b30bcb2d870d3bdb0a627b53e77c99a1ac3312f07064ddf5d1a897a885b3a`.

La QA posterior terminó en PASS: dos builds de `932` páginas, `48` combinaciones, `37` relaciones
curadas, `21` automáticas explicadas, máximo dos automáticas por página y cero repeticiones,
duplicados, tarjetas incompletas, destinos fallidos, overflow, consola, red externa o axe
grave/crítico. No fue necesario restaurar. El cambio continúa solo en el working tree local.
