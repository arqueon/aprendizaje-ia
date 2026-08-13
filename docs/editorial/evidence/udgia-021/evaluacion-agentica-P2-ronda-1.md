# UDGIA-021 · evaluación agéntica P2 · ronda 1

**Fecha:** 2026-08-03  
**Alcance:** diff preparado de M1, landings de Orientaciones/Estudiantado/Profesorado y
runtimes B2/M6.  
**Método:** tres evaluadores separados que simulan perspectiva estudiantil móvil, docente no
tecnológica y auditoría técnico-editorial. No son participantes reales ni personas usuarias de
lector de pantalla. El único dictamen humano corresponde a Rubén.

## Resultado de la ronda

**FAIL editorial con QA técnico en PASS.** El overlay temporal compiló en raíz y subruta y pasó
seis rutas por dos viewports sin fallos de axe grave/crítico, enlaces, foco, consola, red externa,
almacenamiento silencioso, overflow o fallback. La lectura separada encontró seis barreras que el
QA automatizado no podía resolver por sí solo.

| Hallazgo bloqueante | Evidencia | Ajuste acotado |
|---|---|---|
| B2 se presentaba como laboratorio breve sin declarar la carga móvil de 13 campos y seis decisiones | Landing y runtime B2 | Se distingue recorrido del ejemplo de 5–10 min y aplicación propia de 25–35 min; los cuatro pasos se declaran y el guardado voluntario aparece antes del formulario. |
| B2 terminaba sin llevar las notas a una tarea ni regresar a la guía | Resultado, footer y fallback B2 | Se añadió una instrucción concreta de transferencia y regreso relativo a la guía estudiantil. |
| M6 terminaba sin regresar a la guía docente | Resultado, footer y fallback M6 | Se añadió regreso relativo a la guía de profesorado. |
| El ejemplo B2 decía que la sugerencia 1 seguía pendiente aunque ya se había decidido modificarla | `app.js`, prioridad de `firstPointToReview()` | La pérdida de propósito bloquea solo si se decide conservar; modificar o descartar permite revisar el siguiente pendiente. |
| La recapitulación B2 llamaba co-creación persona–IA a sugerencias provenientes también de una persona o del curso | Recapitulación del runtime | Se condicionó el término al origen IA y se explicó que el mismo recorrido sirve para otros orígenes. |
| B2 contenía un cierre `</p>` sobrante | Caso introductorio del runtime | Se retiró el cierre inválido. |

## Hallazgos no bloqueantes atendidos

- M1 y B2 usan ahora a Renata y la misma muestra puntual; se eliminó la falsa continuidad entre
  casos distintos.
- “Lectura disciplinar” se tradujo como lectura de alguien con conocimiento del tema.
- La landing docente sustituyó “diagnóstico declarado” por “primer punto para revisar, basado en
  tus respuestas”.
- Se normalizó el nombre público de M6 y se añadió un microejemplo de historia para mostrar
  transferencia fuera de ciencias.
- El README interno de M6 dejó de afirmar que la lectura humana P1 sigue pendiente.

## Límites conservados

- No hubo prueba con participantes ni tecnología de asistencia real.
- La adecuación disciplinar, la carga con una cohorte y el uso real siguen no verificados.
- Los ajustes permanecen fuera de `content/` y `static/`; no hay integración, publicación,
  despliegue, Moodle ni `push`.

