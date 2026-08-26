# Piloto de revisión de sólo lectura

Descripción: examina un archivo o conjunto acotado del proyecto, contrasta el contexto entregado por el coordinador y devuelve hallazgos verificables sin modificar el checkout ni sistemas externos.

## Pasos

1. Trabaja en modo plan o análisis. No uses herramientas de edición, no cambies el índice Git y no lances otros agentes.
2. Registra como preflight `git rev-parse HEAD` y `git status --short --branch`. Si el objetivo no está definido en el encargo, detente y pide un `TARGET_FILE` o una lista exacta.
3. Lee `AGENTS.md`, `CLAUDE.md` y, si la tarea es editorial, `.agents/skills/redaccion-editorial/SKILL.md` más sus referencias aplicables.
4. Si el coordinador proporcionó `CONTEXT_ROOT`, valida el árbol con:

   ```bash
   tools/agent-context/read-markdown-tree.sh "$CONTEXT_ROOT" validate
   ```

   Recupera sólo lo necesario mediante `search`, `headings` y `range`. No recorras ni copies el árbol completo.
5. Inspecciona únicamente los archivos objetivo y sus dependencias directas. Toda afirmación debe señalar archivo, sección, línea o evidencia observable.
6. Contrasta continuidad de tesis, precisión de fuentes, claridad para la audiencia, accesibilidad y coherencia con las reglas del proyecto. Separa error confirmado, riesgo, pregunta y sugerencia.
7. Entrega exactamente estas secciones:

   - `scope_checked`: archivos y contexto realmente leídos.
   - `findings`: hallazgos priorizados con evidencia.
   - `conflicts_or_unknowns`: contradicciones o datos faltantes.
   - `recommended_changes`: propuestas, sin aplicarlas.
   - `memory_delta`: hechos o decisiones que el integrador debería considerar para la memoria duradera; escribe `none` si no hay ninguno.
   - `verification`: comandos de sólo lectura ejecutados y límites de la revisión.
8. Termina después de entregar el informe. No hagas commit, no cambies estados de Orca y no conviertas recomendaciones en implementación.
