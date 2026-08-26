# Lote de contexto 02 — bitácora, glosarios y recursos audiovisuales

Fecha: 2026-08-23  
Estado: borrador editorial aprobado por Rubén el 2026-08-23; sin publicación ni retirada de rutas

## Alcance

Se corrigieron siete fuentes preexistentes:

1. `content/ia-educacion/practicas/bitacora-cocreacion/index.md`;
2. `content/recursos/glosario/agentes-de-ia/index.md`;
3. `content/recursos/glosario/aprendizaje-digital/index.md`;
4. `content/recursos/glosario/ingenieria-de-prompts/index.md`;
5. `content/recursos/videos/_index.md`;
6. `content/recursos/videos/learn-prompting-curso-completo.md`;
7. `content/recursos/videos/tutoriales-herramientas-ia-docentes.md`.

No se cambió la ruta pública de ninguna página. El lote no autoriza publicación ni retirada.

## Cambios

### Bitácora

- Se declara como plantilla, no como reporte de una aplicación.
- Muestra con qué se empieza y cómo guardar una decisión sin copiar la conversación completa.
- Añade un ejemplo ficticio completado sobre un borrador de 250 palabras.
- Conserva la versión inicial, la comprobación, el cambio realizado y la duda pendiente.
- Sustituye `content_type: practica` por `content_type: plantilla`.

### Agentes de IA

- Retira la definición de autonomía obligatoria y la idea de una evolución lineal respecto de los modelos generativos.
- Distingue un flujo con pasos fijos de un agente que elige acciones y herramientas.
- Añade un ejemplo de apoyo bibliográfico con aprobación humana antes de modificar una biblioteca compartida.
- Nombra permisos, datos, tiempo de operación y registro como preguntas previas a la autorización.

### Aprendizaje digital

- Retira “verdadero aprendizaje digital” y la reducción a experiencias hiperpersonalizadas.
- Sitúa el concepto en clases presenciales, híbridas o en línea.
- Distingue la presencia de un archivo digital de la acción que realizará el grupo.
- Añade acceso, privacidad y carga de trabajo como límites que deben revisarse.

### Ingeniería de prompts

- Explica que una tarea sencilla puede resolverse con una instrucción breve.
- Añade un ejemplo que parte de una introducción y una rúbrica.
- Retira las garantías de “limitar” información inventada o “forzar” resultados.
- Distingue la instrucción del acceso a fuentes y de la comprobación final.
- Enlaza la guía específica para docentes.

### Videos y cursos abiertos

- La ruta `/recursos/videos/` se conserva para no romper enlaces, pero el título y la entrada reconocen que la colección mezcla charlas, series, cursos y guías web.
- El índice orienta por tarea y exige que cada ficha identifique el formato real y un destino directo.
- Learn Prompting deja de presentarse como video y como recurso completamente gratuito sin condiciones. La ficha enlaza la guía introductoria, separa los cursos y propone una prueba breve.
- La curaduría pasa de cinco recomendaciones declaradas a tres destinos comprobables: AI for Education, Prompt Engineering en YouTube y Code.org / CodeAI AI 101 for Educators.
- Se retiran del listado activo IGNITE Capacitaciones y UDGplus + Google AI porque no se localizó una URL verificable. Permanecen en la copia reversible; podrían reincorporarse cuando exista una dirección directa y se compruebe su contenido.

## Fuentes externas comprobadas

| Uso | Fuente |
|---|---|
| Distinción entre flujos y agentes | [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) |
| Definición amplia de aprendizaje digital | [UNESCO, Digital learning](https://www.unesco.org/en/query-list/d/digital-learning) |
| Instrucciones simples, contexto e iteración | [Learn Prompting, Tips for Writing Better Prompts](https://learnprompting.org/docs/basics/ai_prompt_tips) |
| Guía y cursos de Learn Prompting | [Learn Prompting](https://learnprompting.org/docs) |
| Webinars y recursos audiovisuales | [AI for Education](https://www.aiforeducation.io/) |
| Canal técnico | [Prompt Engineering en YouTube](https://www.youtube.com/@engineerprompt) |
| Curso y series para docentes | [Code.org / CodeAI, AI 101 for Educators](https://code.org/en-US/professional-learning/artificial-intelligence-101) |

Las direcciones y páginas se comprobaron el 23 de agosto de 2026. La ausencia de resultados verificables para las dos recomendaciones retiradas se confirmó mediante búsquedas por nombre, institución y plataforma.

## Reversión y diff

Copia exacta anterior:

```text
docs/editorial/rollback/2026-08-23-contexto-lote-02/
```

Diff completo:

```text
docs/editorial/lotes/2026-08-23-contexto-lote-02-piezas-breves.diff
```

El manifiesto del rollback contiene el SHA-256 y tamaño anterior de cada fuente.

## Verificación

- `content:context-audit`: 166 fuentes; la cola bajó de 22 a 17 candidatas.
- Las siete fuentes quedaron en prioridad baja, sin señales esperadas ausentes ni riesgos automáticos.
- `qa:context-audit`: PASS; 0 candidatas prioritarias sin decisión humana.
- `content:inventory` y `qa:content-inventory`: 166 documentos y 0 enlaces internos rotos.
- `content:learning-audit` y `qa:learning-audit`: 166 piezas vigentes.
- Revisión focal del texto visible: 0 apariciones de los diez términos abstractos evitados por el contrato editorial.
- `qa:routes-tables`: PASS en raíz y subruta, escritorio y móvil.
- `qa:direct-language`: PASS.
- `qa:visual-contract`: 142 páginas y 494 tarjetas bajo contrato.
- Build Hugo final: 935 páginas y 1,436 archivos estáticos; no se generaron rutas taxonómicas nuevas.
- Lectura en frío: 14 vistas —siete rutas × escritorio/móvil— con HTTP 200, 0 desbordamientos y 0 errores de consola.
- axe sobre las mismas 14 vistas: 0 infracciones WCAG A/AA.

Evidencia:

```text
docs/design/evidence/contexto-lote-02/
```

## Cambio visual concurrente no introducido por el lote

Mientras se editaba el lote, Nextcloud terminó de recibir un cambio visual con hora de origen `19:51`, anterior al inicio de este trabajo editorial: Piazzolla fue sustituida por Newsreader y se añadieron cinco archivos autohospedados de Font Awesome. `CLAUDE.md`, `assets/css/custom.css` y `layouts/partials/extend-head.html` ya documentan esa decisión.

Por eso el conteo estático pasó de 1,431 a 1,436. No se revirtió ni se mezcló ese cambio con el diff editorial. Después de que la sincronización terminó con `Result=success`, se repitieron rutas/tablas, contrato visual y las 14 vistas focales sobre Newsreader; todas pasaron y la evidencia final sustituyó las capturas preliminares.

## Segunda lectura con Claude Fable

Claude Code `2.1.233` ejecutó una revisión de solo lectura con `claude-fable-5`, en background y con salida atómica:

```text
docs/editorial/revisiones/2026-08-23-claude-fable-contexto-lote-02.json
```

Cobertura: siete rutas esperadas y siete rutas únicas recibidas. Resultado original:

- `aprobar-borrador`: 6;
- `ajustar-borrador`: 1.

Fable pidió dos correcciones en la curaduría audiovisual:

1. cambiar `resourceLanguage` de `es / en` a `en`, porque las tres fuentes activas están en inglés;
2. nombrar el tercer proveedor `Code.org / CodeAI` en la ficha y en este informe.

Ambas correcciones se aplicaron. La salida conserva el dictamen original y añade una sección `_reconciliation` con los campos modificados; el lote quedó listo para revisión humana.

### Hallazgos relacionados fuera del alcance

La segunda lectura detectó cuatro deudas que no deben ampliar silenciosamente este lote:

- la guía larga de ingeniería de prompts todavía promete “resultados de alta calidad” y presenta seis componentes como universales;
- la ficha de Sal Khan conserva un título promocional y momentos clave sin una advertencia propia de comprobación;
- el índice del glosario promete narrar el origen de cada término, algo que sus entradas no hacen de forma consistente;
- la entrada de agentes aún puede relacionarse con las entradas hermanas sobre IA generativa y tutor inteligente.

Se registran para un lote breve posterior; no bloquean la revisión de las siete fuentes actuales.

## Advertencias técnicas no introducidas por el lote

El build conserva avisos ya conocidos sobre claves de idioma y datos deprecadas en Hugo, además de la compatibilidad declarada por Blowfish 2.97 hasta Hugo 0.154.5. No se modificaron esas dependencias.

## Revisión humana solicitada

1. **Bitácora:** comprobar si el ejemplo muestra cuánto detalle basta sin parecer un caso real documentado.
2. **Glosarios:** comprobar si las definiciones sirven para decidir qué hacer en una situación concreta y no solo para memorizar términos.
3. **Colección audiovisual:** comprobar si conviene conservar la ruta histórica `/videos/` con el título visible “Videos y cursos abiertos”.
4. **Curaduría:** confirmar si se acepta retirar del listado activo las dos recomendaciones sin URL y conservar las tres verificadas.

## Límite de aprobación

El lote permanece como borrador en el sitio de revisión. Un VoBo posterior aprobará el texto como borrador editorial, pero no publicará el sitio ni autorizará retirar rutas completas.
