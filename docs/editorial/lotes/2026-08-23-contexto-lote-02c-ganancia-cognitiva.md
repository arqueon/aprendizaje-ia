# Lote de contexto 02C — Ganancia cognitiva e índice verificable

Fecha: 2026-08-23  
Estado: borrador editorial aprobado por Rubén el 2026-08-23; sin publicación ni retirada de rutas

## Alcance

Este lote corrige una deuda detectada por la segunda lectura del 02B. No hereda el VoBo de los lotes anteriores.

Fuente pública editada:

```text
content/recursos/glosario/ganancia-cognitiva/index.md
```

Control permanente añadido:

```text
tools/lib/glossary-index.mjs
tools/qa-glossary-index.test.mjs
tools/audit-hugo-content.mjs
package.json
```

El índice `content/recursos/glosario/_index.md` no necesitó otra edición: ya enumera las 20 entradas después de la corrección del 02B. El lote añade un control para impedir que vuelva a desincronizarse.

## Procedencia y límites

La entrada existía en la copia local antes del 02C. El lote conserva una copia exacta previa y hashes bajo:

```text
docs/editorial/rollback/2026-08-23-contexto-lote-02c/
```

La copia de trabajo está sincronizada por Nextcloud y no contiene `.git`. Este lote no publica, no retira rutas y no modifica GitHub Pages.

## Problema editorial

La versión inicial:

- definía el término como “reverso de la descarga cognitiva”;
- atribuía a una interacción “bien orientada” la activación del razonamiento;
- afirmaba que en ciertos “desplazamientos” se producía conocimiento genuino;
- no presentaba una situación, material inicial ni acciones observables;
- no indicaba cómo comprobar un cambio en el razonamiento;
- citaba dos estudios sin explicar sus límites de contexto, muestra o método.

La auditoría automática detectaba lenguaje no directo. La segunda lectura del lote 02B confirmó que la entrada era más densa que la promesa de definiciones breves del índice.

## Fuentes verificadas

Se comprobó la información accesible de los dos DOI citados:

1. Ji et al. (2025), DOI `10.1109/TLT.2025.3554584`: cuasiexperimento de ocho semanas con 36 estudiantes de un curso STEM orientado al emprendimiento; grupos de 21 y 15 estudiantes. El resumen informa que el grupo con ChatGPT superó al control en rendimiento, conciencia sobre IA y la medida de carga cognitiva, mientras que el grupo sin ChatGPT obtuvo mejor resultado en pensamiento crítico. La página conserva ese contraste sin inferir una dirección no declarada para la carga cognitiva y limita la afirmación a esa intervención.
2. Nasr et al. (2025), DOI `10.3390/educsci15091198`: encuesta de 40 estudiantes, análisis de seis conversaciones y dos entrevistas. La página registra la neutralidad en la fase de resolución y no generaliza las entrevistas.

“Ganancia cognitiva” se presenta como una síntesis editorial del sitio, no como un efecto técnico garantizado ni como una etiqueta atribuida a los artículos.

## Cambio editorial

La nueva versión:

- define una mejora observable en lo que la persona entiende, cuestiona o explica;
- aclara que una respuesta rápida o bien redactada no basta;
- distingue ganancia y descarga por quién conserva el trabajo de juzgar;
- usa el borrador de una estudiante como material inicial;
- pide contrastar, verificar y reescribir;
- comprueba si la persona puede explicar, aplicar y defender el cambio sin delegar la respuesta;
- limita expresamente lo que permiten afirmar los dos estudios.

No se creó una figura: la entrada puede cumplir su función con texto, ejemplo y lista de comprobación.

## Control permanente del índice

Antes del 02C, el inventario comparaba el número escrito en `summary` con el número de archivos. No comprobaba si los tres ejes mencionaban una vez cada título. Esa laguna permitió declarar 20 entradas y enumerar 19.

El nuevo auditor:

- extrae los nombres de los tres ejes;
- normaliza acentos, mayúsculas, énfasis y enlaces Markdown;
- reconoce las conjunciones finales `y` y `e`;
- informa entradas faltantes, desconocidas y repetidas;
- se integra en `content:inventory` y hace fallar `qa:content-inventory` si hay deriva.

## TDD

### Entrada pública

RED inicial: 12 comprobaciones, 11 fallos esperados.  
GREEN inicial: 12/12.  
La observación factual de Fable añadió cuatro comprobaciones sobre el estudio de Ji et al.; RED `4/16` y GREEN final `16/16`.

El script focal era temporal y se retiró después de guardar sus resultados en `docs/design/evidence/contexto-lote-02c/qa-summary.json`.

### Auditor del índice

1. RED: el módulo no existía.
2. GREEN parcial: el caso sintético pasó y el índice real detectó dos faltantes porque la enumeración terminaba con `e integridad académica`.
3. Refactor mínimo: soporte para `y|e`.
4. GREEN final: 2/2 pruebas.

El test cubre un índice sintético incompleto y el índice real.

## Segunda lectura independiente

Claude Fable leyó exactamente las seis rutas solicitadas. Aprobó la parte editorial y la técnica sin cambios obligatorios ni bloqueos. Confirmó que la página presenta una situación, material inicial, acciones, cambio observable y comprobación, y que no atribuye la ganancia cognitiva a la herramienta por sí sola. También confirmó que el auditor compara títulos reales, detecta faltantes, desconocidos y duplicados y no depende solo del número del resumen.

Su única observación editorial relevante fue la ambigüedad de “mejores resultados en carga cognitiva”. La verificación posterior del DOI y del registro ERIC permitió reemplazarla por la descripción completa del cuasiexperimento y conservar el mejor resultado del grupo sin ChatGPT en pensamiento crítico. El dictamen original permanece intacto y la corrección está documentada en `_reconciliation`.

Fable dejó tres límites técnicos no bloqueantes: un título futuro que termine con “y” o “e” podría producir un falso positivo seguro; dos títulos que solo difieran en acentos colisionarían al normalizarse; y el recuento del resumen toma el primer número visible. El auditor general de títulos y la salida explícita de faltantes/desconocidos hacen detectables esos casos. No se amplió el código para resolver escenarios que todavía no existen.

## QA integrada

Resultados finales posteriores a la reconciliación:

- inventario: 168 documentos;
- enlaces internos rotos: 0;
- auditoría de contexto: 18 candidatas;
- lectura humana: 42/168;
- decisiones: 9 conservar, 28 cambiar, 5 quitar y 126 pendientes;
- auditoría de aprendizaje: 168/168;
- lenguaje directo: PASS;
- rutas y tablas: PASS;
- contrato visual: 143 páginas y 498 cards;
- Hugo: 944 páginas y 1,436 archivos estáticos.

El build conserva avisos preexistentes sobre `languageCode`, `.Site.LanguageCode`, `.Site.Data` y la compatibilidad declarada por Blowfish. No se relajaron las pruebas para ocultarlos.

## QA visual

Ruta comprobada en escritorio y móvil:

```text
/recursos/glosario/ganancia-cognitiva/
```

Dos vistas:

- HTTP 200;
- sin desbordamiento horizontal;
- sin errores de consola;
- axe WCAG A/AA: 0 infracciones;
- sin solapamientos, cortes ni espacios anómalos en lectura humana;
- tarjetas relacionadas apiladas correctamente en móvil.

Las referencias son densas, pero están al final y no interrumpen el ejemplo ni la comprobación.

## Evidencia y reversión

- rollback y manifiesto: `docs/editorial/rollback/2026-08-23-contexto-lote-02c/`;
- diff: `docs/editorial/lotes/2026-08-23-contexto-lote-02c-ganancia-cognitiva.diff`;
- capturas y resultados: `docs/design/evidence/contexto-lote-02c/`.

## Estado para revisión humana

El corte técnico y visual posterior a la precisión factual terminó en PASS. La única acción pendiente es presentar la ruta y obtener o negar el VoBo específico al lote 02C.

El VoBo del 02B no autoriza este lote.
