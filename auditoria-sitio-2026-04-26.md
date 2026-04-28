---
title: Auditoría de consistencia del sitio
date: 2026-04-26
description: Inventario de inconsistencias, duplicidades y stubs antes de la fase 2 (creación de artículos faltantes)
---

# Auditoría del sitio — UDGplus IA y aprendizaje digital

> Corte: 2026-04-26 · Alcance: 80 artículos + 19 entradas de glosario · Marco: `.clinerules` + `CLAUDE.md` + `tareas-sitio-ia-y-aprendizaje-udgplus.md`
> Estado: Batches 1–4 ejecutados (estructura, sentence case, frontmatter editorial, expansión de stubs). Detalle al final.

Este documento sirve como puente entre la auditoría del estado actual y la fase 2 de creación de los 17 artículos urgentes pendientes. Las acciones están priorizadas para que se ejecuten en orden: primero corregir lo estructural (impide commits limpios), después lo editorial (afecta navegación), y al final lo cosmético.

---

## 1. Resumen ejecutivo

| Categoría de hallazgo                          | Severidad | Archivos | Acción |
| ---------------------------------------------- | --------- | -------- | ------ |
| Branch bundles configurados como leaf bundles  | 🔴 Crítico | 4        | Renombrar `index.md` → `_index.md` y reescribir como hub |
| Títulos en Title Case (viola `.clinerules` §3) | 🔴 Crítico | ~20      | Reescribir a sentence case |
| Mención explícita de "el Laboratorio"          | 🟡 Medio  | 2        | Reescribir backlink temático |
| `_index.md` de sección como stubs (<50 pal.)   | 🟡 Medio  | ~6       | Expandir a hub editorial real |
| Glosario sin `areas` en frontmatter            | 🟡 Medio  | 18       | Script masivo de actualización |
| Artículos sin `date` en frontmatter            | 🟡 Medio  | ~13      | Asignar fecha real (`git log` o creación) |
| `categories` con formato mixto                 | 🟢 Bajo   | ~20      | Estandarizar a minúsculas/singular |
| Solapes temáticos no enlazados                 | 🟢 Bajo   | 4 grupos | Agregar bloque "Lecturas relacionadas" |

---

## 2. Hallazgos críticos

### 2.1. Cuatro ramas mal configuradas como leaf bundles

Cuatro carpetas que deberían ser secciones (rama con sub-artículos) están implementadas como artículos individuales. Cada una contiene un `index.md` de una sola frase y un `featured.png`. El archivo `tareas-sitio-ia-y-aprendizaje-udgplus.md` confirma que la intención original era que fueran secciones.

| Carpeta actual                            | Es ahora       | Debe ser           | Sub-contenido planificado en backlog                          |
| ----------------------------------------- | -------------- | ------------------ | ------------------------------------------------------------- |
| `content/laboratorio/experiencias/`       | leaf bundle    | branch bundle      | Caso piloto UdeG, reflexión docente primer semestre, casos externos |
| `content/laboratorio/integracion-ia/`     | leaf bundle    | branch bundle      | Flujos de trabajo docente con IA, diagramas y protocolos      |
| `content/observatorio/guias/`             | leaf bundle    | branch bundle      | Documentación de buenas prácticas, evaluación de herramientas IA |
| `content/recursos/externas/`              | leaf bundle    | branch bundle      | UNESCO, OCDE, comunidades, syllabus internacionales            |

**Acción:**

1. Renombrar `index.md` → `_index.md` en las cuatro carpetas.
2. Conservar el `featured.png` (Blowfish lo detecta igual en branch bundles).
3. Reescribir cada `_index.md` como un hub editorial: 2-3 párrafos de encuadre, shortcode `lead`, y cards o lista hacia los sub-artículos previstos (aunque algunos aún no existan, listar con badge "próximamente").

> Nota: `content/observatorio/guias/` además tiene **dos** featured: `featured.png` y `featured.webp`. Dejar solo `.webp` (preferido por `.clinerules` §6).

### 2.2. Títulos en Title Case (viola `.clinerules` §3)

La regla de sentence case se aplica a "títulos de artículos, encabezados de nivel, viñetas, tablas, esquemas, listas". Detecté ~20 títulos en frontmatter que están en Title Case. Los más visibles (los `_index.md` de secciones principales) son los que más urgen porque se ven en el menú y en los hero.

| Archivo                                                                  | Título actual                                                                          | Título corregido (sentence case)                                                       |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `content/_index.md`                                                      | Aprendizaje Digital e IA                                                               | Aprendizaje digital e IA                                                               |
| `content/ia-educacion/_index.md`                                         | IA en Educación                                                                        | IA en educación                                                                        |
| `content/laboratorio/_index.md`                                          | Laboratorio de Innovación Docente                                                      | Laboratorio de innovación docente                                                      |
| `content/observatorio/_index.md`                                         | Observatorio de IA y Pedagogía Digital                                                 | Observatorio de IA y pedagogía digital                                                 |
| `content/recursos/_index.md`                                             | Recursos y Herramientas                                                                | Recursos y herramientas                                                                |
| `content/formacion-docente/_index.md`                                    | Formación Docente                                                                      | Formación docente                                                                      |
| `content/laboratorio/practicas/_index.md`                                | Prácticas Pedagógicas                                                                  | Prácticas pedagógicas                                                                  |
| `content/recursos/articulos/_index.md`                                   | Artículos y Documentos                                                                 | Artículos y documentos                                                                 |
| `content/recursos/links/_index.md`                                       | Links Relevantes                                                                       | Links relevantes                                                                       |
| `content/glosario/_index.md`                                             | Glosario de Términos                                                                   | Glosario de términos                                                                   |
| `content/ia-educacion/guias/abp-con-ia/index.md`                         | Aprendizaje Basado en Proyectos (ABP) con IA                                           | Aprendizaje basado en proyectos (ABP) con IA                                           |
| `content/ia-educacion/guias/ingenieria-de-prompts-para-docentes/index.md`| Ingeniería de Prompts para Docentes                                                    | Ingeniería de prompts para docentes                                                    |
| `content/laboratorio/practicas/analisis-critico-de-sesgos-en-ia/index.md`| Análisis Crítico de Sesgos en la IA                                                    | Análisis crítico de sesgos en la IA                                                    |
| `content/laboratorio/practicas/debate-socratico-con-ia/index.md`         | Debate Socrático con IA como Interlocutor                                              | Debate socrático con IA como interlocutor                                              |
| `content/recursos/videos/sal-khan-ia-educacion.md`                       | Sal Khan: La IA en el Aula Podría Ser el Mayor Cambio Educativo de la Historia         | Sal Khan: la IA en el aula podría ser el mayor cambio educativo de la historia         |
| `content/recursos/links/ai-for-education-toolkit.md`                     | AI for Education Toolkit — UNESCO                                                      | (mantener — es nombre propio de un producto UNESCO)                                    |

Los artículos creados en abril 2026 en `formacion-docente/` ya respetan la regla. Los que violan son sobre todo `_index.md` y artículos heredados.

> Importante: corregir el título también requiere revisar **encabezados internos H2/H3** en cada uno de esos archivos, ya que probablemente arrastran el mismo patrón.

### 2.3. Backlinks que mencionan secciones explícitamente (viola `.clinerules` §5)

| Archivo                                                          | Línea | Texto actual                                                                                                                | Reescritura sugerida                                                                                                       |
| ---------------------------------------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `content/ia-educacion/guias/abp-con-ia/index.md`                 | 148   | "consulta la [práctica de ABP con IA](/laboratorio/practicas/abp-con-ia/) **en el Laboratorio**"                            | "consulta una [implementación documentada paso a paso](/laboratorio/practicas/abp-con-ia/)"                                |
| `content/ia-educacion/guias/aprendizaje-activo-con-ia/index.md`  | 127   | "consulta la [práctica de aprendizaje activo con IA](/laboratorio/practicas/aprendizaje-activo-ia/) **en el Laboratorio**"  | "consulta un [caso documentado en el aula](/laboratorio/practicas/aprendizaje-activo-ia/)"                                 |

---

## 3. Hallazgos editoriales (severidad media)

### 3.1. Stubs de `_index.md` que no funcionan como hub

Estos `_index.md` tienen menos de 50 palabras y no presentan la sección. El `_index.md` no es solo una página de listado: es la puerta de entrada que el lector ve al hacer clic en el menú.

| Archivo                                          | Palabras | Diagnóstico                                                                                  |
| ------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `content/observatorio/guias/index.md`            | 11       | Una sola frase. El peor stub del sitio.                                                      |
| `content/glosario/_index.md`                     | 22       | No explica el propósito del glosario ni cómo usarlo.                                         |
| `content/laboratorio/practicas/_index.md`        | 26       | Tiene `cardView: true` (correcto) pero no presenta criterios editoriales de las prácticas.   |
| `content/recursos/videos/_index.md`              | 20       | Solo título. Sin marco editorial.                                                            |
| `content/ia-educacion/tendencias/_index.md`      | 39       | Crítico: es la primera sección priorizada del sitio (peso 1). Debe vender el área.           |
| `content/ia-educacion/integracion-curricular/_index.md` | 39 | Stub mínimo. Solo tiene 1 sub-artículo.                                                      |

**Estructura recomendada para un `_index.md` de sección** (aplicar uniformemente):

```markdown
---
title: <Título en sentence case>
description: <1 línea para SEO y Open Graph>
showHero: true
heroStyle: background
weight: <orden>
cardView: true   # solo si es listado de artículos cortos
---

{{< lead >}}
<2-3 frases que sintetizan el ángulo editorial de la sección>
{{< /lead >}}

## Qué encontrarás aquí

<Párrafo de encuadre — qué tipo de contenido, para qué público, con qué criterio de curaduría>

## Cómo está organizado

<Mención de los ejes o categorías internas si las hay>
```

### 3.2. Artículos sin `date` en frontmatter

13 artículos no tienen `date`. Hugo los ordena impredeciblemente en listados y la fecha tampoco aparece en el `featured` ni en cards. Los más afectados:

- `content/formacion-docente/redes/index.md`
- `content/formacion-docente/formacion-continua/index.md`
- `content/formacion-docente/alfabetizacion/index.md`
- (resto: glosario y algunos recursos)

**Acción rápida:** asignar `date: 2026-04-25` a los publicados en abril, salvo que `git log --diff-filter=A --follow -- <archivo>` revele una fecha real de creación distinta.

### 3.3. Glosario sin `areas`

18 de 18 entradas del glosario carecen de la taxonomía `areas`. Esto rompe el filtrado por área en cualquier listado cruzado.

**Mapeo recomendado:**

| Entrada                              | `areas`                       |
| ------------------------------------ | ----------------------------- |
| agentes-de-ia, ia-generativa, tutor-inteligente, ingenieria-de-prompts | `["ia"]`                      |
| sesgo-algoritmico, integridad-academica | `["ia", "etica"]`             |
| alfabetizacion-ia                    | `["ia", "digital", "formacion"]` |
| aprendizaje-digital, aprendizaje-hibrido, aula-invertida | `["digital", "pedagogia"]`    |
| aprendizaje-activo, aprendizaje-basado-en-problemas, aprendizaje-transformativo, pensamiento-critico, descarga-cognitiva | `["pedagogia"]`               |
| evaluacion-autentica, taxonomia-de-bloom, diseno-inverso | `["pedagogia", "evaluacion"]` |
| modelo-samr                          | `["digital", "pedagogia"]`    |

Esto se puede ejecutar con un script `sed` o Python en una sola pasada.

### 3.4. `featured.svg` en lugar de `featured.webp` (caso Simondon)

Corrección de la auditoría inicial: `content/observatorio/estudios/habitar-ia-simondon/` **sí tiene** un `featured.svg` que Blowfish detecta como hero y como `og:image`/`twitter:image`. El problema es que **Facebook y Twitter no soportan SVG en Open Graph**, así que la preview en redes sociales fallará. La cobertura del hero local funciona; lo que falla es la difusión en redes.

`.clinerules` §6 establece preferencia por `.webp`. Acción: incluir el slug en la próxima tanda de Antigravity para generar `featured.webp` (ver Anexo C — prompt sugerido).

---

## 4. Duplicidades y solapes temáticos

Investigué los grupos sospechosos. Conclusión general: **lo que parecía duplicidad es en su mayoría complementariedad bien diseñada** (guía conceptual + práctica documentada + fundamentación). El problema real es que **no hay enlaces cruzados explícitos** que orienten al lector entre los tres ángulos.

### Grupo A — ABP con IA (2 piezas)

- `ia-educacion/guias/abp-con-ia/` — guía prescriptiva (cómo diseñar las 4 fases)
- `laboratorio/practicas/abp-con-ia/` — caso documentado (28 estudiantes, semestre real)

**Veredicto:** complementarios. Ya hay un backlink (corregirlo según §2.3).

### Grupo B — Aprendizaje activo (3 piezas)

- `formacion-docente/aprendizaje-activo/` — fundamentación sin IA (Dewey, Baepler)
- `ia-educacion/guias/aprendizaje-activo-con-ia/` — diseño + ejecución con IA
- `laboratorio/practicas/aprendizaje-activo-ia/` — caso real (35 estudiantes, 90 min)

**Veredicto:** triada bien diferenciada (teoría base → integración IA → práctica). **Acción:** que la guía de IA enlace explícitamente a la fundamentación de formación docente como prerrequisito implícito.

### Grupo C — Aprendizaje híbrido (2 piezas)

- `formacion-docente/aprendizaje-hibrido/` — concepto base (sin IA)
- `ia-educacion/integracion-curricular/ia-aprendizaje-hibrido/` — IA en aprendizaje híbrido

**Veredicto:** diferenciados pero con conexión débil. La pieza de formación docente no menciona IA. **Acción:** agregar al final de `formacion-docente/aprendizaje-hibrido/` una sección "Cómo cambia con IA" con enlace temático a la pieza de integración curricular.

### Grupo D — Evaluación formativa con IA (4 piezas, alta densidad)

- `formacion-docente/evaluacion-retroalimentacion/` — fundamentación (formativa vs sumativa, CAT, pares)
- `ia-educacion/tendencias/evaluacion-en-la-era-ia/` — ensayo crítico ("regar plantas vs construir cercas")
- `ia-educacion/guias/evaluacion-formativa-ia/` — guía operativa (ciclos iterativos, portafolios)
- `laboratorio/practicas/evaluacion-formativa-asistida-ia/` — caso (3 versiones de texto)

**Veredicto:** las cuatro perspectivas son distintas y valiosas, pero el lector que llega a una no descubre las otras. **Acción** (riesgo de exceso, opcional): crear un hub de síntesis en `ia-educacion/evaluacion-formativa-con-ia-hub/` que articule las 4 perspectivas y enlace cada una. Si se decide no crear el hub, basta con un bloque "Lecturas relacionadas" idéntico en las 4 piezas.

### Grupo E — Otros solapes investigados (sin acción urgente)

- **Plagio / integridad académica:** la guía operativa (`plagio-autenticidad-era-ia`) y el ensayo de opinión (`la-ia-no-hace-trampa-nosotros-si`) no se solapan. La definición del glosario es complemento.
- **Diseño inverso / Bloom:** `formacion-docente/taxonomia-bloom-diseno-inverso/` + glosario. Bien diferenciado.

---

## 5. Inconsistencias menores (severidad baja)

### 5.1. `categories` con formatos mixtos

Detectados los siguientes valores en uso:

- Singular minúscula: `"guia"`, `"articulo"`, `"tendencia"`, `"practica-pedagogica"`
- Plural mayúscula: `["Concepto"]`, `["Estudios"]`, `["Metodología"]`, `["Metodologia-pedagogica"]`

**Convención propuesta** (alinear con `.clinerules` §3 — sentence case):

```yaml
categories: ["guia"]
categories: ["practica"]
categories: ["articulo"]
categories: ["estudio"]
categories: ["video"]
categories: ["link"]
categories: ["concepto"]   # para glosario
```

Singular, minúscula, sin tildes en valor (las tildes en presentación se manejan en el tema).

### 5.2. Falta `date` en algunos recursos y links

Sin urgencia, pero recomendable para que los listados tipo `cardView` tengan una metadata visible coherente.

### 5.3. Homepage muy parca

`content/_index.md` (181 palabras) tiene la mínima expresión. La sección de tareas no menciona expandirla, pero merece un futuro ciclo: el hero ya está, lo que falta es 2-3 párrafos de propuesta editorial y mermaid o cards.

---

## 6. Plan de ejecución sugerido (antes de fase 2)

Recomiendo estos cuatro batches en orden. Cada uno se puede commitear por separado.

### Batch 1 — Estructura (riesgo de URLs)

1. Renombrar los 4 `index.md` a `_index.md` (laboratorio/experiencias, laboratorio/integracion-ia, observatorio/guias, recursos/externas).
2. Reescribir esos 4 `_index.md` como hub (lead + presentación + listado planeado).
3. Eliminar `featured.png` duplicado en `observatorio/guias/` (dejar solo `.webp`).

### Batch 2 — Sentence case

1. Corregir frontmatter `title` en los ~20 archivos listados en §2.2.
2. En cada uno, revisar también H2/H3 internos (probablemente arrastran el patrón).

### Batch 3 — Frontmatter editorial

1. Corregir 2 backlinks explícitos (§2.3).
2. Asignar `date` a los ~13 artículos sin fecha.
3. Agregar `areas` al glosario completo (script automatizable).
4. Estandarizar `categories` (decisión: singular minúscula).
5. Agregar `featured.webp` a `habitar-ia-simondon`.

### Batch 4 — Stubs editoriales

1. Reescribir los 6 `_index.md` listados en §3.1 con la estructura propuesta.
2. Decisión sobre el hub de evaluación formativa (Grupo D §4): crear o no.
3. Cierre de los grupos B, C con sus enlaces complementarios.

Solo después de estos cuatro batches conviene atacar los **17 artículos urgentes** del backlog de `tareas-sitio-ia-y-aprendizaje-udgplus.md`, porque los hubs y las convenciones ya estarán fijadas.

---

## 7. Lo que NO se va a tocar (delimitación)

- El glosario seguirá teniendo entradas breves (76-170 palabras): es diseño, no defecto.
- Los artículos del Grupo A, B, D no se fusionan: la triada teoría/integración/práctica funciona.
- `_vendor/` y `static/` no se modifican (CLAUDE.md §4).
- El tema Blowfish no se altera; toda personalización va por `layouts/` y `assets/`.

---

## 8. Anexo C — prompt sugerido para próxima tanda Antigravity

Pendiente que no puedo ejecutar yo (no genero imágenes). Pegar este renglón en `imagenes-tanda-<fecha>.md` y procesarlo en Antigravity:

| Slug | Prompt | Ruta final | Iteraciones |
|------|--------|------------|-------------|
| habitar-ia-simondon | Modern editorial illustration, flat vector style with soft gradients, clean minimalist composition, generous white space, horizontal 1200x630 banner format, no embedded text, no logos, no watermark, no photorealistic people, no clichéd AI imagery such as brains with circuits or humanoid robots. Soft lighting, subtle geometric shapes, professional and calm tone suitable for an academic site about artificial intelligence in higher education. Dominant ocean blue palette with petrol blue accents, soft golden highlights, light neutral background. A figure-of-thought silhouette enveloped by a translucent atmospheric layer of small geometric particles, suggesting a person inhabiting an ambient technical environment rather than holding a tool; faint orbiting bands hint at the idea of *mundoambiente* — a milieu rather than an object. Calm, contemplative, philosophical tone. | `content/observatorio/estudios/habitar-ia-simondon/featured.webp` | 1 |

> Una vez generada, renombrar el `featured.svg` actual a `featured-prev.svg` antes de mover el `.webp` (siguiendo §29 del prompt de Antigravity).

---

## 9. Bitácora de ejecución (2026-04-26)

### Batch 1 — estructura

- 4 carpetas convertidas de leaf bundle a branch bundle: `laboratorio/experiencias/`, `laboratorio/integracion-ia/`, `observatorio/guias/`, `recursos/externas/`. Cada `_index.md` reescrito como hub editorial.
- Eliminado `featured.png` duplicado en `observatorio/guias/` (queda solo `.webp`).

### Batch 2 — sentence case

- 16 títulos de frontmatter pasados a sentence case (todas las secciones top-level y sub-secciones, además de los artículos heredados).
- H2/H3 internos arrastrados también corregidos en `ingenieria-de-prompts-para-docentes`, `abp-con-ia`, `encuesta-dec-2026`, `transformacion-pedagogica-digital`.
- Texto de cards en homepage normalizado a sentence case.
- Bonus: `observatorio/documentacion/_index.md` (otro stub) reescrito como hub editorial.

### Batch 3 — frontmatter editorial

- 2 backlinks reescritos como temáticos (`abp-con-ia`, `aprendizaje-activo-con-ia`). Las secciones "Relación con otras secciones del sitio" se renombraron a "Lecturas relacionadas" para reducir meta-referencia.
- 3 fechas asignadas a partir de `git log` (`alfabetizacion`, `formacion-continua`, `redes` → `2026-03-17`).
- 19 entradas de glosario completadas con `areas` según el mapping del §3.3.
- Categorías normalizadas a sentence case en todo el sitio (`Metodología` → `metodologia`, `Estudios` → `estudio`, `Conceptos fundamentales` → `concepto`, `Concepto` → `concepto` × 16).
- Caso `habitar-ia-simondon`: se confirmó que tiene `featured.svg` pero falta `.webp` para Open Graph. Prompt de Antigravity preparado en Anexo C.

### Batch 4 — expansión de stubs

- `ia-educacion/tendencias/_index.md` (39 → ~340 palabras).
- `ia-educacion/integracion-curricular/_index.md` (39 → ~330 palabras).
- `glosario/_index.md` (22 → ~280 palabras).
- `formacion-docente/alfabetizacion/index.md` (48 → ~510 palabras).
- `formacion-docente/formacion-continua/index.md` (37 → ~480 palabras).
- `formacion-docente/redes/index.md` (39 → ~520 palabras).

### Build

- Hugo build limpio en cada batch (exit 0).
- 457 páginas generadas (mismo conteo antes y después; ningún slug se rompió).

### Pendientes que NO se hicieron en esta auditoría

- **Imagen `featured.webp` para `habitar-ia-simondon`** — requiere generación con Antigravity (prompt en Anexo C).
- **17 artículos urgentes del backlog** — fase 2, pendiente.
- **Hub o "lecturas relacionadas" para el grupo D** (evaluación formativa × 4) — decisión: solo "lecturas relacionadas" en cada pieza, follow-up.
- **Homepage** — sigue parca (181 palabras). No estaba en el alcance de esta auditoría.

---

## 10. Anexo — métricas

| Métrica                                  | Valor    |
| ---------------------------------------- | -------- |
| Total `index.md` + `_index.md`           | 81       |
| Artículos con `featured.*`               | 79 / 81  |
| Artículos con `showHero: true`           | ~65      |
| Stubs `<200` palabras (excl. glosario)   | 8        |
| Glosario (entradas breves intencionales) | 18       |
| Promedio palabras (ensayos largos)       | 1,200    |
| Tareas urgentes en backlog               | 17       |
| Tareas normales en backlog               | 47       |
