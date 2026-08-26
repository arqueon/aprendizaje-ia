# Segunda lectura independiente del lote 07 — Sol

- Fecha: 2026-08-24
- Revisor: subagente aislado con modelo Sol
- Alcance: solo lectura; sin internet, escrituras ni publicación
- Resultado: **aprobable como borrador reversible, con mejoras importantes no bloqueantes**
- Bloqueos: **ninguno**

## Validaciones sustantivas

- **ICAP:** correcto en ambas páginas. `aprendizaje-activo/index.md`, “Una interfaz conversacional no basta…”, admite al agente computacional bajo condiciones de pertinencia, aportes constructivos, respuesta y turnos. `modelos-samr-icap/index.md`, “En ICAP, ‘interactivo’…”, conserva la misma precisión.
- **SAMR:** correcto. `modelos-samr-icap/index.md`, “No conviertas SAMR en una meta de ascenso”, no lo presenta como jerarquía universal, secuencia obligatoria ni prueba automática de calidad. La revisión crítica y su DOI están incluidos.
- **Evaluación:** corregida adecuadamente. “Evaluación formativa y sumativa” define la función formativa por el uso de evidencia para modificar enseñanza y aprendizaje. “Evaluación del curso y de la docencia” ya no confunde evaluación sumativa del aprendizaje con evaluación de la docencia. La sección CAT limita Holbeck et al. a una técnica, cuatro cursos en línea, 96 estudiantes y 39 participantes opcionales.
- **Taller:** el lead declara que no documenta una aplicación ni resultados observados; retiró la clasificación 4+3 no respaldada y ofrece tres plantillas copiables.
- **Bloom:** conserva su función propia y permanece intacta. Su SHA-256 coincide con el rollback.

## Mejoras importantes no bloqueantes

1. **Contradicción en la duración de una modalidad.** En `taller-diseno-actividades-ia-backward/index.md`, “nunca más de 30 minutos seguidos en la misma modalidad” contradice el bloque `0:45–1:30 | Trabajo individual`, de 45 minutos.
2. **Recorrido entre piezas poco lineal.** El índice coloca Bloom antes que SAMR–ICAP; SAMR deriva a Bloom; Bloom regresa a SAMR; aprendizaje activo sale hacia aprendizaje híbrido. Falta una ruta explícita hacia evaluación y taller.
3. **Jerarquía visual ambigua en el índice.** Tras las cards manuales aparece la cuadrícula automática sin un rótulo que explique el cambio; varias piezas reaparecen.
4. **Procedencia de los cuatro principios.** En la sesión 2 del taller no queda claro si “contexto local, proceso documentado, defensa oral y juicio en zona gris” es una síntesis editorial o una clasificación de Bearman et al.
5. **Expediente previo sin marca histórica.** El expediente mantiene “pendiente de VoBo” y “no modifica content/”, mientras el rollback ya registra el VoBo y la aplicación.

## Nota opcional de estilo

El taller repite casi literalmente “La pieza clave es el bloque…; el resto del guion existe para…” después de cada sesión. La repetición es funcional, pero produce ritmo mecánico.

## QA visual y frontera operativa

- Las cinco capturas inspeccionadas no muestran cortes, solapamientos ni desbordes de página.
- Los diagramas conservan legibilidad.
- Las tablas móviles usan desplazamiento horizontal con aviso visible.
- `qa-visual.json`: 12/12 renders con estado 200, sin overflow, errores de consola ni violaciones axe.
- Se preservan las rutas; no hay aliases ni eliminaciones nuevas.
- El rollback mantiene `publication_authorized: false`.
- La copia revisada no contiene `.git`; la lectura no implicó publicación.

## Control de trabajo del revisor

- Archivos creados o modificados: ninguno.
- Internet/publicación: no utilizados.
- Dictamen reconciliado por Hermes contra los archivos antes de aplicar ajustes.
