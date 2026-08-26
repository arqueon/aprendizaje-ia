# Lote de contexto 02B — reconciliación de guía, ficha y glosario

Fecha: 2026-08-23  
Estado: borrador editorial aprobado por Rubén el 2026-08-23; sin publicación ni retirada de rutas

## Alcance

El lote corrige cuatro fuentes que ya existían en la copia local cuando comenzó la auditoría:

1. `content/ia-educacion/guias/ingenieria-de-prompts-para-docentes/index.md`;
2. `content/recursos/videos/sal-khan-ia-educacion.md`;
3. `content/recursos/glosario/_index.md`;
4. `content/recursos/glosario/agentes-de-ia/index.md`.

El espejo público recuperado en `/tmp/aprendizaje-ia-origin-20260823` no contiene estas rutas. Por eso el expediente no las declara publicadas ni atribuye su procedencia histórica. La afirmación comprobable es más limitada: estaban en la copia local antes de editar el 02B y cuentan con respaldo exacto previo al cambio.

El VoBo del lote 2 no se extiende a estos cambios. “Agentes de IA” pertenecía al lote aprobado, pero el enlace conceptual añadido aquí requiere la decisión propia del 02B.

## Problemas encontrados y cambios

### Guía larga de ingeniería de prompts

Problemas anteriores:

- prometía “resultados de alta calidad”;
- presentaba seis componentes como esenciales para cualquier petición;
- decía que una frase “obliga” a la IA a razonar;
- usaba `insumos`, `encargo` y una oposición entre prompt “pobre” y “profesional”;
- remitía a un repositorio interno que no se localizó en el árbol actual;
- enlazaba un registro de UNESCO distinto de la guía de 2023 que se quería citar.

El borrador:

- parte de una tarea, material inicial y forma de comprobar;
- presenta seis elementos opcionales y pide elegir solo los necesarios;
- distingue instrucciones, ejemplos, trabajo por etapas y comprobación breve;
- incluye un caso completo con objetivo de aprendizaje;
- termina con una versión revisada que la persona puede explicar y reutilizar;
- enlaza documentación identificada de OpenAI, Anthropic y la guía UNESCO de 2023.

### Ficha de Sal Khan

Problemas anteriores:

- repetía en el título una afirmación promocional;
- presentaba la charla como experiencia real sin declarar la relación de Khan con el producto;
- trataba la demostración como respaldo suficiente;
- usaba marcas de tiempo que no coincidían con los capítulos publicados por TED en YouTube.

El borrador:

- usa un título descriptivo;
- identifica la charla como fuente primaria de Khan Academy;
- declara que no es una evaluación independiente de Khanmigo;
- separa afirmación, demostración e información necesaria para comprobar;
- usa los capítulos publicados: 0:57, 4:24, 5:00 y 8:42;
- pide conservar una tabla de contraste después de verla.

### Índice del glosario

Problemas anteriores:

- prometía explicar el origen de cada término, algo que las entradas no cumplen de manera consistente;
- afirmaba que, ante una contradicción, “gana el artículo”;
- no identificaba con claridad a quién le sirve.

El borrador:

- se dirige a quien enseña, estudia o diseña materiales;
- limita la promesa a definición, ejemplo, contraste o lectura relacionada;
- ofrece un recorrido en tres pasos;
- pide revisar fecha, fuentes y contexto cuando dos páginas se contradicen;
- conserva `20` como número para respetar el contrato del inventario automático.

### Agentes de IA

La definición aprobada en el lote 2 se conserva. Solo se añadió una relación explícita:

- la IA generativa produce contenido;
- un agente puede elegir acciones y usar herramientas;
- un tutor inteligente describe una función educativa y puede usar un flujo fijo o capacidades de agente.

Esto evita atribuir capacidad de acción a cualquier sistema que genere texto o cumpla una función tutorial.

## Fuentes externas verificadas

- [TED: How AI could save (not destroy) education](https://www.ted.com/talks/sal_khan_how_ai_could_save_not_destroy_education), TED2023, abril de 2023.
- [YouTube/TED, video `hJP5GqnTrNo`](https://www.youtube.com/watch?v=hJP5GqnTrNo), con capítulos publicados.
- [UNESCO: Guidance for generative AI in education and research](https://unesdoc.unesco.org/ark:/48223/pf0000386693), 2023, CC BY-SA 3.0 IGO y versiones en varios idiomas.
- [OpenAI: Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering), documentación de proveedor.
- [Anthropic: Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview), documentación de proveedor.

Las documentaciones de proveedores sirven como ejemplos de prácticas que cambian por modelo y versión; no se presentan como reglas universales.

## Prueba focal RED → GREEN

Se creó una compuerta temporal con once comprobaciones iniciales:

```text
tools/qa-contexto-lote-02b.tmp.mjs
```

El script se retiró al cerrar el lote; sus resultados RED/GREEN quedaron en `docs/design/evidence/contexto-lote-02b/focal-results.json`.

Estado inicial: 11 fallos esperados. Detectó garantías, estructura universal, afirmación falsa sobre razonamiento, tono promocional, falta de advertencia de interés, promesas incumplidas del glosario y relaciones conceptuales ausentes.

La primera ejecución posterior a la edición dejó un único fallo causado por el propio test: comparaba con sensibilidad a mayúsculas la frase “Elige solo…”. Se corrigió la comparación, no el contenido.

Fable detectó después que los tres ejes enumeraban 19 términos aunque el índice declaraba 20. Se añadió una duodécima comprobación, se observó su fallo y se incorporó `ganancia cognitiva` al eje pedagógico. Resultado final:

```json
{"checks":12,"failures":0}
```

## Cambio concurrente separado

Durante el 02B, Nextcloud incorporó dos fuentes nuevas bajo:

```text
content/formacion-docente/diseno-inverso-cocreacion-ia/
```

No pertenecen al lote. El índice anuncia doce lecciones y solo una está disponible; la lección publicada contiene afirmaciones de evidencia, beneficios de IA y lenguaje promocional que requieren revisión. Ambas quedaron:

- clasificadas en el inventario de 168 fuentes;
- con decisión `cambiar`;
- identificadas como nuevas concurrentes;
- sin VoBo y sin edición dentro del 02B.

Su incorporación explica el cambio del build de 935 a 944 páginas y la aparición de tres taxonomías nuevas. El 02B no creó rutas ni taxonomías.

## QA final

- Compuerta focal: 12/12 PASS.
- Auditoría de contexto: 168 fuentes; 18 candidatas; 0 candidatas sin decisión humana.
- Registro humano: 9 `conservar`, 27 `cambiar`, 5 `quitar`, 127 pendientes; 41/168 con lectura humana.
- Inventario Hugo: 168 documentos y 0 enlaces internos rotos.
- Auditoría de aprendizaje: 168/168 después de clasificar las dos fuentes concurrentes.
- Lenguaje directo: PASS.
- Rutas y tablas: PASS.
- Contrato visual: 143 páginas y 498 tarjetas.
- Build Hugo: 944 páginas y 1,436 archivos estáticos.
- Playwright: ocho vistas, cuatro rutas × escritorio/móvil; HTTP 200, 0 desbordamientos y 0 errores de consola.
- axe WCAG A/AA: 0 infracciones en las ocho vistas.

La primera captura completa no activó todas las imágenes con carga diferida y pareció mostrar bloques vacíos. El procedimiento se corrigió para recorrer la página antes de capturar. La inspección del DOM confirmó imágenes completas y dimensiones naturales válidas en las tarjetas visibles. `Ganancia cognitiva` usa el fallback `default-almagre.svg`; es una deuda visual preexistente, no un fallo introducido por este lote.

Advertencias no introducidas:

- `languageCode` y `.Site.LanguageCode` están deprecados desde Hugo 0.158;
- `.Site.Data` está deprecado desde Hugo 0.156;
- Blowfish 2.97 declara compatibilidad hasta Hugo 0.154.5 y el entorno usa Hugo 0.165.0.

## Reversión, diff y evidencia

Respaldo anterior a los cambios:

```text
docs/editorial/rollback/2026-08-23-contexto-lote-02b/
```

Diff legible de las cuatro fuentes:

```text
docs/editorial/lotes/2026-08-23-contexto-lote-02b-reconciliacion.diff
```

Evidencia visual y axe:

```text
docs/design/evidence/contexto-lote-02b/
```

## Segunda lectura con Claude Fable

Claude Code ejecutó una revisión de solo lectura sobre las cuatro fuentes y el diff, en background y con salida atómica:

```text
docs/editorial/revisiones/2026-08-23-claude-fable-contexto-lote-02b.json
```

Cobertura: 4 rutas esperadas y 4 rutas únicas recibidas. Dictamen original:

- `aprobar-borrador`: 3;
- `ajustar-borrador`: 1;
- `bloquear`: 0.

El único cambio obligatorio fue añadir `ganancia cognitiva` a la enumeración del eje pedagógico. La corrección se aplicó y quedó registrada en `_reconciliation`; la salida original no se alteró.

Notas no bloqueantes:

- el título original en inglés se conserva únicamente en el `label` del video de TED;
- la guía larga podría enlazar la definición breve de ingeniería de prompts, pero el enlace no es necesario para entender la ruta;
- la entrada `ganancia-cognitiva` usa lenguaje denso y deberá revisarse en un lote posterior;
- el número y la enumeración manual del glosario deben comprobarse juntos cuando se añada o retire una entrada.

## Decisión solicitada

Con la segunda lectura reconciliada, la revisión humana debe decidir:

1. si la guía deja claro que no existe una plantilla universal de prompt;
2. si la ficha de Sal Khan separa adecuadamente argumento, demostración y evidencia;
3. si el índice del glosario promete solo lo que sus entradas ofrecen;
4. si la relación entre IA generativa, agente y tutor inteligente evita confusiones.

El lote no autoriza publicación, retirada de rutas ni edición de las dos fuentes concurrentes.
