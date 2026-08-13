# UDGIA-021 — evaluación interna P1, ronda 2

**Fecha:** 2026-08-03  
**Rol:** segunda evaluación separada; no reescribe artefactos públicos.  
**Método:** validación interna aprobada por Rubén; no es estudio con usuarios.

## Hallazgos atendidos

| Hallazgo de ronda 1 | Cambio del optimizador | Verificación |
|---|---|---|
| P1-01 · M6 no persistía el reporte | `qa.mjs` ahora serializa y guarda `qa-report.json`, igual que B2 | Reporte M6 actualizado a `2026-08-04T00:37:03.271Z`, `PASS`, cero fallos |
| P1-02 · protocolo exigía personas externas | Paquete, kit y preflight distinguen perspectivas simuladas, VoBo y limitación | El expediente ya no presenta la simulación como participación real |
| P1-03 · continuidad pendiente | Sin cambio prematuro en los prototipos | Conservado como criterio obligatorio del diff P2 |

## Repetición técnica

| Pieza | Resultado fresco | Cobertura |
|---|---|---|
| B2 · comparador | `PASS` a `2026-08-04T00:37:04.443Z`, cero fallos | raíz, subruta, 1280 px claro, 320 px oscuro, teclado, foco, axe 0, consola/red 0, fallback, impresión, almacenamiento bloqueado |
| M6 · revisor | `PASS` a `2026-08-04T00:37:03.271Z`, cero fallos | raíz, subruta, 1280 px claro, 320 px oscuro, teclado, foco, axe 0, consola/red 0, fallback, impresión, almacenamiento bloqueado |
| M1 y corpus | `PASS` | `npm run qa:learning-audit`: inventario vigente de 158 piezas |
| Paquete P1 | `PASS` de contraste | Todos los pares de texto y fondo cumplen WCAG AA en tema claro y oscuro |

## Comprensibilidad interna

Las tres perspectivas conservan el dictamen de la ronda 1: M1 permite explicar tema,
importancia, caso, primera acción y alternativa sin IA; B2 explica origen, comparación,
decisiones y salida; M6 construye el significado mediante un caso y preguntas cotidianas antes
de la abstracción. No aparecieron términos nuevos, referentes ambiguos ni instrucciones sin
criterio durante la corrección del expediente.

## Límite aceptado

No se realizó prueba con participantes externos ni con una persona usuaria de lector de pantalla.
La estructura, el teclado, el foco, los equivalentes y axe pasaron; la experiencia real de uso
permanece no verificada. Rubén aceptó explícitamente este límite en el VoBo
`2026-08-04T00:32:20.680Z`.

## Dictamen final P1

**PASS interno con limitación aceptada.** P1 puede cerrarse como validación interna y queda
autorizada la preparación local de un diff reversible M1 + B2 + M6. El diff debe incluir la
continuidad con Orientaciones, guías y curso y presentarse a Rubén antes de integrarse. No están
autorizados integración automática, publicación, despliegue, Moodle ni push.
