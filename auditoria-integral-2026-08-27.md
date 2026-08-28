# Auditoría integral del sitio — 27 de agosto de 2026

**Commit auditado:** `0e8ff79cbeecc49f98555a0ef2082e3e0006c240` (`main`, árbol limpio)
**Método:** siete revisiones independientes de sólo lectura, bajo el protocolo de
`.agents/workflows/piloto-revision-solo-lectura.md`. Ninguna modificó el checkout, el índice
Git ni sistemas externos. Todos los hallazgos que se presentan como confirmados están anclados
en archivo y línea, y los de mayor consecuencia fueron reverificados por el coordinador.

**Advertencia de método, aplicable a todo el documento:** nadie ejecutó Hugo, la batería
`npm run qa:*` ni un navegador. Todo es análisis estático. Los ratios de contraste están
*calculados* con la fórmula de luminancia relativa de WCAG 2.1 a partir de los hexadecimales
del repositorio, no medidos sobre píxeles. Lo que exige render se declara como tal en cada caso.

---

## 1. El patrón de fondo

Casi todos los hallazgos graves de esta auditoría son la misma historia contada seis veces.

El rediseño Almagre de agosto de 2026 (`f41f795`, 23-ago) introdujo **dos apariencias** donde
antes había una. Se aplicó con solidez al CSS del sitio: `assets/css/custom.css` está escrito
casi íntegramente con `var()` y `color-mix()`, de modo que redefinir los tokens bajo `html.dark`
(líneas 89-102) basta para que todo lo demás herede. Las únicas cuatro reglas con color fijo
fuera de `@media print` son sombras. **Esa parte está bien hecha.**

El problema es que el rediseño **no alcanzó a las capas que no heredan tokens**, y no había
nada que avisara:

| Capa | Por qué no hereda | Estado |
|---|---|---|
| SVG servidos vía `<img>` | Un `<img>` no recibe las variables CSS de la página | 16 figuras ilegibles |
| Runtime H5P | Vive en un `<iframe>`; las clases no cruzan esa frontera | Sin modo oscuro |
| Shortcode `infografia` | Paleta hexadecimal propia incrustada | Fuera de identidad |
| `comparar-sugerencias` | Conmuta por `prefers-color-scheme`, el sitio por `.dark` | Desincronizado |

Y la razón de que nadie lo detectara es doble. Primero, **la única herramienta del repositorio
que sabía de apariencia quedó fosilizada**: `tools/qa-single-theme.mjs` recorre `["light","dark"]`
y calcula contraste, pero sus aserciones exigen tema único, selector desactivado, primario almagre
y fuente Piazzolla — las cuatro cosas que el rediseño revirtió. No está cableada en `package.json`
ni en CI, y `docs/design/UDGIA-002-informe.md:113` sigue anunciándola como la automatización vigente.

Segundo, **ninguna QA que sí corre ejercita el modo oscuro**. `qa-routes-tables.mjs:179,254` crea
el contexto de Playwright sin `colorScheme`, luego `html.dark` nunca se activa. Y aunque ejecuta
axe, filtra a `serious`/`critical` y su regla `color-contrast` sólo evalúa texto del DOM: el texto
de las figuras vive dentro del `<img>` y es invisible para axe **por construcción**.

De ahí la conclusión que más importa: **el VoBo de figuras (`UDGIA-008`, `UDGIA-010`) se otorgó
sobre derechos, procedencia, hashes, fallback y axe. Ninguno de los dos documentos menciona
apariencia.** Las figuras están autorizadas contra un criterio que no incluía la mitad del sitio.

---

## 2. Bloqueantes de publicación

### 2.1 ~~Referencias bibliográficas que no pueden ser todas ciertas~~ — RESUELTO

> **Verificado y corregido (2026-08-28).** Con acceso a red se comprobaron las nueve fichas
> contra Crossref, arXiv y las fuentes primarias. Cuatro eran inventadas, dos citaban obras
> reales con ficha falsa y tres eran correctas. Todas están corregidas; la «curva en U» se
> reescribió conforme a lo que el estudio sí sostiene. Ver apéndice §F. El texto original se
> conserva abajo como registro del hallazgo.

Es el hallazgo más serio, y es de integridad editorial, no técnico.

**Gerlich (2025)** aparece con tres fichas mutuamente excluyentes:

| Página | Revista | Identificador |
|---|---|---|
| `content/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/index.md:80` | *Societies*, 15(1), 6 | `10.3390/soc15010006` |
| `content/recursos/glosario/descarga-cognitiva/index.md:23` | *Journal of Applied Learning and Teaching*, 8(1), 1-12 | ninguno |
| `content/observatorio/estudios/paradoja-descarga-cognitiva/index.md:105` | *Journal of Applied Cognitive Science*, 12(1), 45-61 | ninguno |

**Wang & Zhang (2026)** va más lejos: cambian hasta las iniciales de los autores.

| Página | Autores | Publicación | DOI |
|---|---|---|---|
| Tres páginas (reseña, mapa-literacidades, alfabetizacion-co-creacion) | Wang, **S.** & Zhang, **H.** | *IJETHE* 23(**11**) | `10.1186/s41239-026-00585-x` |
| `paradoja-descarga-cognitiva/index.md:115` | Wang, **Y.** & Zhang, **X.** | *IJETHE* 23(**1**), art. 14 | ninguno |
| `recursos/glosario/aprendizaje-transformativo/index.md:21` | Wang, **J.** & Zhang, **Y.** | ***Computers & Education***, 215, 105020 | ninguno |

El patrón discrimina sin excepciones: **todas las fichas con DOI son coherentes entre sí; todas
las que carecen de él divergen** en autores, revista, volumen, páginas y título.

**Y hay cifras sin procedencia presentadas como hallazgo empírico.**
`paradoja-descarga-cognitiva/index.md:60-77` atribuye a Wang y Zhang una «curva en U» con tres
zonas descritas en detalle, ilustrada con este gráfico:

```
xychart-beta
    title "Impacto de la descarga cognitiva en el aprendizaje"
    y-axis "Profundidad del aprendizaje" 0 --> 100
    line [60, 30, 95]
```

La reseña que el propio sitio publica de ese estudio
(`recursos/articulos/partnerships-pedagogicos-ia-wang-zhang/index.md:55`) describe PLS-SEM, IPMA,
fsQCA y 45 entrevistas semiestructuradas. **Ni curva en U, ni tres zonas.** Los valores 60, 30
y 95 no tienen origen declarado en ninguna parte.

Pendientes de comprobación externa (no verificables sin red): `Kosmyna et al. (2025)`, atribuido
a *Neuroscience of Education* 8(2) cuando el trabajo conocido con ese contenido es un preprint
del MIT Media Lab en arXiv; `Xu et al. (2026)`; y `Yang & Ma (2025)`, citada cuatro veces como
respaldo sustantivo sin ningún identificador.

**Contexto justo:** `content/about.md:58` declara «Citas APA 7 verificables… la revisión editorial
de este criterio **está en curso**», y `:34` reconoce que ya se retiraron piezas por falta de
procedencia. El equipo conoce esta clase de problema y está actuando; hay precedente en el commit
`631ad3b`, que documenta una cita inexistente ya detectada y corregida. Lo que aporta esta
auditoría es la lista concreta.

**Regla operativa que emerge de los datos:** en las 98 referencias del sitio, *toda* referencia
posterior a 2020 sin DOI, URL o ID de arXiv resultó ser una de las problemáticas. Es un
discriminante limpio y barato de aplicar.

### 2.2 Dieciséis figuras ilegibles en modo oscuro, en ocho rutas públicas

Las figuras de `udgia-figure` se sirven vía `<img>` (`layouts/shortcodes/udgia-figure.html:45-53`),
no tienen rect de lienzo opaco, y declaran tinta fija en su `<style>` interno:

```svg
/* === TOKENS GRÁFICOS === */
.f-ink { fill:#18223c; }  .f-muted { fill:#525d70; }
.st-axis { stroke:#18223c; }
```

Sobre la superficie nocturna `#1a2540`, ese `#18223c` da **1.04:1**. Los paneles con relleno
propio siguen siendo islas legibles, pero **todo lo dibujado sobre el lienzo desaparece**:
títulos de eje, etiquetas de flecha, conectores, leyendas y puntas de flecha. Son **282 elementos**
en los 16 archivos.

El caso peor es `disociacion-desempeno-aprendizaje.svg`: es una gráfica cartesiana y sus dos ejes
son `st-axis`. Sin ejes no comunica nada.

Ningún SVG del repositorio contiene `prefers-color-scheme` — cero de 125. La convención 6 de
`CLAUDE.md` exige «fondo nocturno propio o inlinearse»; estos 16 no hacen ni una cosa ni la otra.
Y no hay mitigación posible: no existe una sola regla `filter`, `invert` o `mix-blend` en
`custom.css`.

Rutas afectadas: guías de aprendizaje activo, evaluación formativa y lineamientos éticos; rutas
de coordinación académica y decisión institucional; tendencias de evaluación y políticas
institucionales; y el estudio de la paradoja de descarga cognitiva.

### 2.3 ~~El sitio se compila como sitio en inglés~~ — REFUTADO

> **Corrección (fase 2).** Este hallazgo es **incorrecto**. El build real produce
> `<html lang=es>`, `content-language: es`, rótulos en español y ningún árbol `/en/`.
> La columna `EN` de Hugo es la clave interna del idioma, no el idioma de salida.
> Ver apéndice §A. Lo único que queda en pie es la deprecación de `languageCode`,
> ya migrada a `locale`. El texto original se conserva abajo como registro.


`hugo.toml:2` declara `languageCode = 'es'`, pero **`defaultContentLanguage` no está definido en
ninguna parte del repositorio** y no existe carpeta `i18n/` propia. Hugo aplica entonces su valor
por defecto, `"en"`. La evidencia de compilación lo confirma: en
`docs/editorial/evidence/udgia-021/diff-p2/qa-report.json:10` la tabla de Hugo rotula la columna
de idioma como **`EN`**.

Consecuencias, en orden de gravedad:

1. Blowfish carga `i18n/en.yaml`: «reading time», «Posted on», «Table of Contents», «Related»
   y «Scroll to top» salen en inglés dentro de un sitio íntegramente en español, sin marcado
   `lang` que los distinga (WCAG 3.1.2).
2. Si el `baseof.html` del tema usa `.Site.Language.Lang` en vez de `.Site.LanguageCode`, el sitio
   **se anuncia como inglés a los lectores de pantalla** — fallo de nivel A en todas las páginas
   (WCAG 3.1.1). No se pudo determinar cuál usa: el tema no está vendorizado.
3. `languageCode` está **deprecado desde Hugo v0.158** y CI corre 0.164. Cuando se elimine, el
   único apoyo del idioma correcto desaparece y el sitio caerá silenciosamente a `"en"`.

~~Es, con diferencia, el hallazgo de mayor impacto por unidad de esfuerzo.~~ Refutado en fase 2:
la migración a `locale` sigue siendo correcta, pero por deprecación, no por fallo de idioma.

---

## 3. Hallazgos por dimensión

### 3.1 Apariencia dual del sitio

La arquitectura es **sólida por diseño** y no requiere trabajo estructural. Dos defectos reales:

**La cabecera de toda tabla se invierte a banda casi blanca en oscuro.** `custom.css:533-540`,
`:657-663` y `:335-341` emparejan `color: var(--udg-c-surface)` con `background: var(--udg-c-ink)`.
En claro es blanco sobre tinta; en oscuro los tokens se invierten y queda `#1a2540` sobre `#eceee9`.
Cumple AA de sobra —no es accesibilidad— pero cada tabla del sitio pinta una franja a plena
luminancia sobre página nocturna. Es el componente de mayor superficie afectado, y nadie lo ha
visto renderizado.

**`layouts/shortcodes/infografia.html` es una isla cromática:** ~25 hexadecimales de la escala
Tailwind sky/slate. Tiene modo oscuro propio y bien construido, pero su superficie nocturna
(`#1a1a2e`) no es la del sitio (`#1a2540`): dos negros distintos en la misma página. Se usa en
6 páginas.

Menores: `custom.css:238` pide `font-family: "Archivo"`, que el sitio **no autoaloja** (sólo
Newsreader, Inter y Archivo Narrow), de modo que el título de cada figura cae a `system-ui`. El
`!important` de `custom.css:151-155` alcanza al selector global `.backdrop-blur` y neutraliza la
opacidad del submenú desplegable. Y `CLAUDE.md` se contradice a sí mismo: `:47` reserva el almagre
a `--udg-c-risk`, `:82` lo asigna como familia cromática de Recursos.

### 3.2 H5P

**El modo claro del H5P no es un olvido: está asertado en la QA.** `tools/qa-runtime.mjs` abre el
navegador en `colorScheme: "dark"` (línea 383), comprueba que la página padre esté oscura, y acto
seguido **exige que el H5P siga claro** (líneas 591-597), emitiendo la bandera `noDarkVariant: true`
(línea 998).

Consecuencia operativa: **cualquier corrección que propague el modo oscuro hará fallar
`qa:runtime`.** No se puede tocar el CSS sin cambiar esa aserción en el mismo commit. Antes de
escribir una línea hay que saber si la decisión tenía una razón viva o si simplemente precede al
rediseño y quedó fosilizada.

Independiente de ese debate, y **ya visible en producción en modo claro**: el runtime quedó
congelado en la identidad anterior, con almagre `#b12028` como primario (`host.css:7`,
`themes/udg-c.css:24,31,34,47`). `CLAUDE.md:47` reserva ese color a riesgo. El botón «Abrir
actividad interactiva» de cada actividad se pinta hoy con el color de peligro.

El runtime no consume **ni un solo** token `--udg-c-*`. Hay tres espacios de nombres sin puente:
`--udg-c-*` (sitio, conmuta), `--h5p-*` (tarjeta anfitriona, fija), `--h-*` (interior del iframe,
fija). Y `--udgia-ochre`, usada en `adapters/bloom-objective-builder.css:10`, **no está definida
en ningún sitio**.

Alcance real: cinco páginas, siete montajes. La más expuesta es `laboratorio/h5p-runtime`, única
con `load="visible"`: el usuario en modo oscuro recibe el bloque blanco sin haber pulsado nada.

**Dato operativo crítico:** `h5p/runtime/` es la fuente y `static/h5p/udgia/v1/` la salida de
`build-runtime.mjs`; son idénticos byte a byte. Editar en `static/` se pierde en el siguiente build.

### 3.3 Curso derivado de Articulate Rise

**En las páginas del curso no hay H5P.** Las 13 lecciones usan 56 llamadas a `curso-interactivo`,
que renderiza HTML estático de respaldo desde `data/h5p/course_candidates.json`. Los ids llevan
«h5p» por herencia de la extracción, pero el runtime real sólo se usa en otras cinco páginas.

Evaluado contra el criterio correcto —**evaluación formativa e interactividad, nunca
calificación**— el resultado se reparte:

| Tipo | N.º | ¿Interactividad? | ¿Retroalimentación formativa? |
|---|---|---|---|
| `dialog-cards` | 17 | **Sí** — gesto real por tarjeta | **Sí** — el reverso llega tras el intento |
| `single-choice` | 30 | **No** — `<ol>` sin nada que seleccionar | Parcial — llega igual se elija o no |
| `matching` / `sorting` / `fill-blank` | 9 | **No** — «escribe en tus notas» | Correcta pero incontrastable |

`dialog-cards` es la decisión mejor argumentada del expediente: pudiendo promoverse a H5P (la
librería está en el runtime y hay un contenido publicado), se decidió no hacerlo porque no ganaría
nada. La justificación de `libraryPolicies` es exacta.

Los 30 `single-choice` **coinciden exactamente con los 30 marcados `eligible-separate-production-gate`**.
No es casualidad: la justificación de `H5P.MultiChoice` invoca «su presentación formativa sin
puntuación», que es precisamente lo que el respaldo estático no puede dar. El proyecto ya
diagnosticó que estos necesitan runtime real.

**Dos defectos de ejecución, ambos corregibles en el shortcode:**

- **Título y pregunta son idénticos en 37 de 56 candidatos** y se renderizan dos veces seguidas.
  Verificado en render (`docs/design/evidence/curso-diseno-inverso-cocreacion-ia/autoevaluacion-print.pdf`,
  págs. 1-4). Causa raíz en `extract-rise-course.mjs:346` + `:363`. Se arregla con un condicional
  en cada una de las tres ramas de `curso-interactivo.html`.
- **Siete candidatos imprimen «Correcto…» seguido de «Incorrecto…»** en el mismo `<details>`
  (`l13-h5p-12,13,20,21,22,23,24`), por los `with` incondicionales de `curso-interactivo.html:51-52`,
  `:61-62`, `:86-87`. La retroalimentación de Rise era contingente y aquí se aplanó a texto simultáneo.

**La lección 13 concentra 25 de los 56**, sin un solo `dialog-cards`. Es decir: el cierre del curso
está compuesto íntegramente por los tipos que peor funcionan. No tiene ningún encabezado Markdown,
de modo que emite 25 `<h3>` colgando del `<h1>` —salto de nivel repetido 25 veces— y declara
`showTableOfContents: true` sobre un documento sin encabezados. Su `index.md` tiene 295 palabras
propias; la página renderizada declara 34 minutos de lectura.

**Riesgo operativo serio:** `tools/articulate/extract-rise-course.mjs` **sobrescribe**
`course_candidates.json` completo, pero el archivo versionado contiene datos que el extractor ya no
sabe producir. Reejecutarlo borraría `reviewLessons` (los 25 enlaces «Revisar la explicación», el
único mecanismo formativo real de la lección 13) e `itemsPool` (con lo que los `sorting` revelarían
su solución), y revertiría 26 candidatos a otra decisión. Rompería `qa-course-rise.mjs` en cinco
puntos. No hay nada en el repositorio que lo advierta.

Lo que **sí está impecable** en el curso: la consistencia JSON↔Markdown es exacta (56↔56, sin
sobrantes ni faltantes), la integridad de los 56 candidatos está limpia, los 25 slugs de
`reviewLessons` existen, no hay restos del export de Rise, y la apariencia clara/oscura del
componente es correcta y **está verificada en render** en los cuatro escenarios.

### 3.4 Accesibilidad

**La buena noticia primero, porque contradice la premisa del encargo:** el contraste de texto de
los tokens es holgado en ambos modos. El mínimo de todas las combinaciones token-sobre-token es
**4.97:1**. **No se encontró ninguna combinación de texto que cumpla en un modo y falle en el otro.**
El riesgo que motivó esta dimensión no se materializó para el texto.

El déficit está en el contraste **no textual** (WCAG 1.4.11): **ningún borde alcanza 3:1 en ninguno
de los dos modos** — `--udg-c-line` sobre `--udg-c-surface` da 1.72 en claro y 1.48 en oscuro. Se
matiza que 1.4.11 exime la decoración pura y que el fondo alterno de fila ya distingue las tablas,
así que no es fallo cerrado, pero es el punto más débil del sistema.

**El fallo confirmado más grave es el anillo de foco.** `custom.css:146-149` declara:

```css
:focus-visible {
  outline: 3px solid var(--udg-c-primary) !important;
  outline-offset: 3px !important;
}
```

Ese `!important` **anula las cuatro reglas que el propio CSS escribió con anillo interior**
(`:202`, `:979`, `:1037`, `:1095`) y las convierte en anillo exterior. Y los contenedores de esos
mismos componentes tienen `overflow: hidden` (`:181`, `:948`, `:991`, `:1025`), de modo que el
trazo cae fuera de la caja y **no se pinta**. Afecta a los componentes interactivos troncales:
pestañas, pliegues, tarjetas y soluciones del curso, y el visor de figuras. Incumple WCAG 2.4.7 e,
en 2.2, 2.4.11. Es geométrico, no cromático: idéntico en claro y oscuro.

**No hay enlace de salto.** `layouts/partials/header/basic.html` es un override completo del partial
del tema (66 líneas) y no contiene ninguno. `desktop-menu.html:9` condiciona el componente de
accesibilidad de Blowfish a `enableA11y`, que **no está definido** en `hugo.toml`, de modo que ese
bloque nunca se renderiza. WCAG 2.4.1 queda sin cumplir salvo que el tema lo emita desde
`baseof.html` — no verificable sin vendorizar.

**Tablas:** de 151 tablas markdown, sólo 13 declaran `caption`. Las ~138 restantes reciben
`aria-label="Tabla {n} en {título de página}"` y el `<table>` interno se queda sin nombre accesible
propio. Además `render-table.html:43` fija `aria-describedby` sin condición hacia una pista de
desplazamiento que el CSS oculta en escritorio — y un nodo referenciado por `aria-describedby` se
anuncia aunque esté oculto, así que todo usuario de lector de pantalla oye una instrucción
inaplicable en las 151 tablas.

Un salto de encabezado real, h1→h4, en
`content/ia-educacion/que-es-la-educacion-digital/index.md:44`. Es el único del sitio: el barrido
de los 182 `.md` no encontró ningún otro.

**Lo que está bien y conviene no romper:** las pestañas son `<details>/<summary>` nativos, no un
`tablist` falso — operables por teclado sin JS y sin ARIA que mantener. Las 10 figuras de
`udgia_figures.json` tienen `alt` descriptivo de 157-219 caracteres. Cero `alt` vacíos o triviales
en los 182 `.md`. **Ningún `outline: none`** en CSS de autoría propia. `custom.css:740-770` respeta
`prefers-reduced-motion` y da soporte a `forced-colors: active`.

### 3.5 Contenido editorial

**El sitio no está en estado de esqueleto**, contra lo que sugería el planteamiento inicial. De
182 páginas, **106 superan las 700 palabras**, y `formacion-docente` está prácticamente completa
(27 de 32 desarrolladas, cero esqueletos). De los 23 «esqueletos», **20 son entradas de glosario
cuya brevedad es decisión explícita** documentada en la auditoría de abril. Esqueletos reales
quedan cuatro.

La deuda está en los **hubs**: 12 de 23 `_index.md` no llegan a 250 palabras, y seis no enlazan a
ninguna de sus páginas hijas. El peor es `ia-educacion/etica-y-transparencia/_index.md` — 126
palabras, cero enlaces a sus siete hijas, dentro de la sección prioritaria — que además contiene
una afirmación universal sin fuente y una promesa colgante a un contenido inexistente.

**`CLAUDE.md` lleva cuatro meses divergiendo de la práctica en `areas`:** declara cinco valores,
el sitio usa **seis**. `etica` está en 11 páginas y tiene su página de término; la decisión consta
en `auditoria-sitio-2026-04-26.md:148`. Cualquier agente que lea el contrato hará lo incorrecto.
Además, 15 páginas de contenido real carecen de `areas`, incluidas las guías de entrada
`guias/estudiantes/` y `guias/profesorado/`.

Otras derivas de taxonomía: `categories` pasó de los siete valores singulares fijados en abril a
**21**, con casi-duplicados; 26 páginas no la tienen, incluidas **las 13 lecciones del curso**.
`tags` acumula **353 términos, 263 usados una sola vez y 39 grupos de colisión** por
acento/guion/mayúscula. La herramienta ya lo detecta pero **no hace fallar el `--check`**.

**Las 27 fichas de `productos-de-aprendizaje` son la misma plantilla rellenada:** esqueleto idéntico
de 9 encabezados en 26 archivos, con filas de rúbrica repetidas literalmente 24 y 15 veces. En
`metrologia/index.md` sólo el 27 % de las palabras es prosa continua. Contra `AGENTS.md:45`
(«Explica antes de resumir. Si una tabla contiene toda la explicación, la pieza todavía no está
lista»).

**Dos avisos sobre las métricas del propio repo**, importantes para no tomar decisiones erróneas:
`aprendizaje-hibrido-activo-disenar-actividad` figura con **2 palabras** en el inventario y recibe
la recomendación «archivar-o-fusionar», cuando su cuerpo real son **8.733 palabras** en
`guide-body.txt` — es la pieza más extensa del sitio. Y `audit-hugo-content.mjs` marca 31 páginas
por «citas sin sección de referencias», de las cuales **30 son falsos positivos**: usan el shortcode
`{{< referencias >}}`, que su regex no reconoce (`tools/audit-hugo-content.mjs:143`).

Arquitectura: la sección `blog/` publica 5 ensayos y recibe enlaces de al menos 10 páginas, pero
está **fuera de `mainSections` y del menú** — alcanzable sólo por enlace profundo. Y `about.md:45`
dice que el sitio tiene cinco secciones cuando publica seis. La familia de «tres rutas» está partida
entre `rutas/` y `constelaciones/`, y esta última **no tiene `_index.md`**.

### 3.6 Salud técnica

**El hueco más caro: la QA existe pero no corre.** De 33 scripts npm, **cinco** se ejecutan
automáticamente al pushear a `main`. **Diecinueve comprobaciones QA no corren en ningún workflow.**
Y no hay disparador `pull_request` en ninguno: **no existe puerta pre-merge**.

Entre las que nunca corren está `qa:routes-tables`, que `CLAUDE.md:106` declara como *la* QA
sistémica del sitio, y `qa:course-rise`, que es el contrato más detallado del repositorio.

Detalle con gracia amarga: el test que verifica que el workflow de contenedor no se auto-publique
sólo se ejecuta **cuando alguien dispara ese mismo workflow a mano**.

**Matriz de versiones incoherente:** `CLAUDE.md:9` dice Hugo v0.157; CI y Dockerfile fijan 0.164.0;
la evidencia local registra 0.165.0; y Blowfish v2.97.0 declara compatibilidad **0.141.0–0.154.5**.
El sitio construye igual, pero se opera fuera del rango declarado del tema, y el warning consta en
toda la evidencia.

**Sobre el merge del 26 de agosto:** `0e8ff79` fue un merge «ours». Su árbol es idéntico byte a byte
al de `448c8a6` y `git diff 448c8a6 0e8ff79` está vacío: los dos commits del lado remoto no
aportaron nada. **No hubo pérdida funcional** — se verificó que el trabajo equivalente ya existía
en la línea local, incluido el fix `headersSent` en los seis archivos que lo necesitaban. Sin
marcadores de conflicto ni duplicados.

Residuos: `debug_build/` (56 archivos, 6,1 MB) es un build fosilizado de **otro tema** (Hextra,
`lang="es-mx"`, con secciones `cultura/` y `marcos-referencia/` que ya no existen) — riesgo real de
que alguien lo tome como estructura vigente, contra `AGENTS.md:10`. `assets_old/` y `layouts_old/`
duplican material superado; este último contiene el `hooks/head-end.html` que `CLAUDE.md:62-64`
documenta como «RETIRADO», con Font Awesome desde cdnjs y Mermaid desde jsdelivr. El PDF de la
encuesta DEC está triplicado (~6 MB). Y `udgia-ecosystem.json:18,68` publica rutas del disco del
autor en un repositorio público, contra `AGENTS.md:9`.

Ambas ramas remotas son podables: `codex/corregir-formulario-guia` duplica trabajo ya integrado por
`ffa0a10`; `cursor/sitio-hugo-mapa-mental-6511` está 161 commits atrás sobre una arquitectura
retirada.

**No tocar:** el `Dockerfile` (imágenes pineadas por digest, Hugo y Go verificados por checksum,
runtime sin privilegios), `deploy/nginx/default.conf` (CSP completa),
`deploy/coolify/sinope-staging.compose.yaml` (`read_only`, `cap_drop: ALL`) y el par
`.npmrc`/`--ignore-scripts`. Están endurecidos con intención. `package-lock.json` es coherente.

---

## 4. Correcciones a los propios revisores

Se verificaron los hallazgos de mayor consecuencia. Dos no resistieron:

**`tools/prepare-p3a.mjs` no es peligroso.** Se reportó como script huérfano que sobrescribiría
seis páginas publicadas. Es una lectura equivocada: el campo `destination` se usa como ruta
*relativa dentro de un directorio de staging* (`:6` define
`stageRoot = docs/editorial/evidence/udgia-021/diff-p3a`; `:107` compone `stagedPath` sobre él;
`:121` escribe ahí). Lee de `content/` y escribe sólo en staging, como declara su propio manifiesto
(`:100`). Sigue siendo un huérfano sin referencias, pero retirarlo es higiene, no urgencia.

**La cobertura oscura de `custom.css` no es escasa.** La pista preliminar del coordinador —cinco
selectores `html.dark` en 1206 líneas— era engañosa. El archivo está escrito casi íntegramente con
`var()` y `color-mix()`, de modo que esas cinco reglas bastan. Que `udgplus-c.css` no mencione
oscuro también es correcto: Blowfish consume esa rampa vía utilidades `dark:`.

---

## 5. Decisiones que requieren a Rubén

Ninguna de estas es inferible desde el código.

1. **¿Se revoca `noDarkVariant`?** Es bloqueante para toda la línea de trabajo del H5P. Hay una
   decisión deliberada, verificada en `qa-runtime.mjs:591-597`. Si se revoca, el cambio de aserción
   debe ir en el mismo commit que el CSS.
2. **¿El VoBo de figuras se enmienda para incluir apariencia?** `UDGIA-008` y `UDGIA-010` no la
   mencionan. Si el criterio pasa a incluirla, ambos documentos necesitan enmienda y las 16 figuras,
   re-verificación. Nota: modificar los SVG invalida los `variant_sha256` de `udgia_figures.json`
   y exige regenerar 32 hashes.
3. **¿`areas` incorpora `etica`, o se migra el contenido?** La regla escrita y la práctica llevan
   cuatro meses divergiendo.
4. **¿Se autoriza una segunda fase para *ejecutar* la batería QA?** Diecinueve comprobaciones no
   han corrido nunca en CI y es plausible que varias hayan caducado con el rediseño, igual que
   `qa-single-theme.mjs`. La de mayor valor es `qa:routes-tables`. Requiere un worktree desechable:
   generan `public/`, `node_modules/` y evidencias.
5. **¿Los 30 `single-choice` se promueven a H5P real?** El runtime ya trae `H5P.MultiChoice-1.16`
   y el adaptador `formative-no-score`, y dos contenidos en producción ya corren ese patrón. La
   brecha es empaquetado, alta en catálogo y **autorización de publicación** — que no es trabajo
   técnico. Coste estimado: ~66 MB en `h5p/packages/`.
6. **¿`blog/` entra en la navegación o se declara material de apoyo?**

---

## 6. Orden de trabajo sugerido

**Inmediato, barato, alto impacto**
1. ~~`defaultContentLanguage`~~ → migrar `languageCode` a `locale` (§2.3, corregido en §A). **Aplicado.**
2. Retirar `outline-offset: 3px !important` de `custom.css:148` (§3.4).
3. Los dos condicionales de `curso-interactivo.html` que arreglan 37 + 7 componentes (§3.3).
4. Documentar en la cabecera de `extract-rise-course.mjs` que reejecutarlo destruye trabajo (§3.3).

**Bloqueante de publicación**
5. Verificar contra Crossref las fichas de Gerlich y Wang & Zhang; conservar una sola de cada una
   y propagarla. Retirar o reatribuir la curva en U y su gráfico (§2.1).
6. Aplicar la regla «sin DOI/URL/arXiv-ID no se publica» al resto del aparato bibliográfico.

**Requiere decisión previa**
7. Las 16 figuras (§2.2), condicionado a la decisión 2. Puente inmediato posible: dar fondo papel
   constante a `.udgia-figure__image` — arregla las 16 en una línea, al coste de una losa clara.
8. El H5P (§3.2), condicionado a la decisión 1. El desfase de identidad almagre→añil es
   independiente y puede ir antes.

**Sostenido**
9. Reescribir `qa-single-theme.mjs` como QA de dos apariencias y cablearlo; añadir `colorScheme`
   a `qa-routes-tables.mjs`; meter `qa:routes-tables` y `qa:course-rise` en CI; añadir disparador
   `pull_request`.
10. Hubs, taxonomías, `productos-de-aprendizaje` por lotes piloto, y limpieza de residuos.

---

## 7. Lo que no está roto

Conviene que conste, porque el sistema es sólido en lo esencial y una lista de defectos da una
impresión sesgada:

- La arquitectura de apariencia dual del CSS del sitio, escrita con tokens de forma consistente.
- El contraste de texto en ambos modos: mínimo 4.97:1, sin una sola combinación que falle.
- La consistencia JSON↔Markdown del curso: exacta, 56 de 56, sin sobrantes ni faltantes.
- El contrato de imágenes `featured`: 12 excepciones gobernadas en `visual-contract.json`, con
  coincidencia exacta con el estado real y bloqueo tanto de altas nuevas como de deuda resuelta
  sin dar de baja.
- Los `alt` de las figuras: descriptivos y sustantivos, sin excepción.
- Las pestañas y pliegues como `<details>` nativos: la decisión correcta.
- El endurecimiento del contenedor, el `Dockerfile` y la CSP.
- El aparato crítico del curso: todas sus referencias con DOI.
- `content/observatorio/estudios/encuesta-dec-2026/index.md`, que separa hecho, interpretación y
  recomendación, declara los límites del método y no atribuye a la UdeG cifras regionales. Es el
  mejor ejemplar del contrato editorial cumplido y sirve de modelo para reescribir las piezas
  débiles.

---

# Apéndice — Fase 2: ejecución y correcciones aplicadas

Añadido el mismo 27 de agosto, después de que la auditoría estática se cerrara. Todo lo que
sigue **sí** se ejecutó: build de Hugo y batería QA en un worktree desechable.

## A. La auditoría estática se equivocó en un punto, y sólo el build lo reveló

**§2.3 de este informe está mal.** El sitio **no** se compila como sitio en inglés. Comprobado
sobre el HTML generado en el estado original:

```html
<html lang=es dir=ltr …><meta http-equiv=content-language content="es">
```

Rótulos en español, sin árbol `/en/`. La columna `EN` de la tabla de Hugo es la **clave interna**
del idioma, no el idioma de salida: el `languageCode = 'es'` del proyecto ya imponía el idioma
correcto. No hay ni ha habido fallo WCAG 3.1.1.

Peor: la corrección propuesta era una regresión. Añadir `defaultContentLanguage = 'es'` activa el
`languages.en.toml` que trae Blowfish y **genera un árbol `/en/` de 5 páginas en inglés**.

| Variante | `<html lang>` | Rótulo | ¿`/en/`? | Páginas |
|---|---|---|---|---|
| `languageCode` (estado original) | `es` | Ir arriba | NO | 1018 |
| `defaultContentLanguage` | `es` | Ir arriba | **SÍ** | 1024 |
| `locale` (aplicado) | `es` | Ir arriba | NO | 1018 |

Queda en pie la parte estrecha: `languageCode` está deprecado desde Hugo 0.158 y CI corre 0.164,
así que desaparecería sin aviso. La migración correcta es `locale = 'es'`, con salida idéntica.

**Lección de método:** las siete revisiones tenían prohibido ejecutar el build. Acertaron en el
síntoma y fallaron en el diagnóstico. Una auditoría estática de un sitio estático no puede cerrar
las preguntas que dependen del render.

## B. Resultado de ejecutar las comprobaciones que nunca habían corrido

**13 de 16 pasan.** El bit-rot temido en §3.6 no se materializó, salvo en tres casos, ninguno de
los cuales es «se rompió con el rediseño»:

- **`qa:shortcode-library`** exige `_vendor/…/blowfish/v2/layouts/shortcodes`
  (`tools/qa-shortcode-library.mjs:214-220`). Pero `CLAUDE.md` convención 3 establece que
  `_vendor/` nunca se commitea y el tema llega por Go modules. **No puede pasar en CI tal como
  está escrita.** Nació incompatible con el contrato del propio proyecto.
- **`qa:profesorado-pilot`** falla con `ERR_CONNECTION_REFUSED`. Su causa está en
  `tools/qa-profesorado-pilot.mjs:5`: `const baseURL = process.env.BASE_URL || "http://100.107.89.3:1313"`.
  Es una dirección Tailscale de una máquina personal, **codificada en un repositorio público**,
  contra `AGENTS.md:9,14`. Es a la vez un fallo de QA y una fuga de infraestructura local.
- **`qa:ecosistema`** confirma lo previsto: no es ejecutable fuera de la máquina de Rubén. Falla
  buscando `IAorientaciones` y `alfabetizacion_en_ia`, y además exige que la rama sea `main`.

## C. Cambios aplicados y verificados

Ninguno commiteado. Todos verificados con la batería en verde.

**Correcciones baratas**
- `hugo.toml` — `languageCode` → `locale` (§A).
- `assets/css/custom.css:146-152` — retirado el `!important` del `outline-offset`, conservado en el
  trazo. Las cuatro reglas con anillo interior (`:202`, `:979`, `:1037`, `:1095`) vuelven a ganar
  por especificidad y dejan de recortarse contra los `overflow: hidden`.
- `layouts/shortcodes/curso-interactivo.html` — tres condicionales que dejan de imprimir la pregunta
  cuando es idéntica al título (**37 de 56 componentes**) y seis líneas de retroalimentación
  etiquetadas como ramas condicionales (**7 candidatos** dejan de contradecirse). Pendiente: pulir
  los 7 textos, que empiezan con «Correcto.» / «Incorrecto.» y ahora leen con redundancia leve.
- `tools/articulate/extract-rise-course.mjs` — cabecera de advertencia con lo que destruye
  reejecutarlo y las líneas de `qa-course-rise.mjs` que rompe.

**Revocación de `noDarkVariant`** (decisión 1 de §5, resuelta: quedó fosilizado)

El proceso reveló algo que el análisis estático no vio: **hay dos fronteras de iframe, no una.**
La primera implementación propagaba bien a `embed.html` y la QA seguía fallando, porque el
reproductor H5P crea **su propio iframe interior** para el contenido:

```
runtimeAppearance: {"dark": true,  "metaColorScheme": "light dark"}   ← propagación correcta
contentAppearance: {"dark": false, "colorScheme": "light"}            ← iframe anidado, sin tocar
```

Aplicado en `h5p/runtime/` (la fuente; `static/h5p/udgia/v1/` se regeneró con `h5p:build` y vuelve
a ser idéntica byte a byte):

- `host.css` — bloque `html.dark` con los 11 tokens espejo de `custom.css`. **Cero literales de
  color** fuera de las definiciones de token. Nuevo `--h5p-on-primary`, porque en oscuro el acento
  es añil claro y el texto blanco encima daba ~1.9:1.
- `theme-udg-c.css` — bloque `html.dark` con 44 tokens; `color-scheme` deja de estar clavado.
- `host.js` — lee la clase del sitio, la pasa en la URL del iframe para evitar el parpadeo inicial,
  la confirma al estar listo, y un `MutationObserver` sobre `<html>` retransmite cada cambio del
  selector a los iframes ya cargados.
- `embed.js` — atiende el mensaje y repinta en **las dos** fronteras.
- `embed.html` — `color-scheme: light dark`.
- `tools/h5p/qa-runtime.mjs` — aserción invertida: ahora exige que el runtime adopte la apariencia
  del padre. `noDarkVariant: true` → `appearanceFollowsHost: true`.

**Realineación de identidad, independiente del modo oscuro:** el acento del runtime pasó de almagre
`#b12028` a añil, dejando el almagre donde `CLAUDE.md:47` lo reserva. El botón «Abrir actividad
interactiva» deja de estar pintado con el color de riesgo, **también en modo claro, ya en producción**.

**Verificación final — todo en verde:**

```
PASS  h5p:verify              PASS  qa:routes-tables
PASS  qa:h5p                  PASS  qa:course-rise
PASS  qa:h5p:pilot            PASS  qa:coordinacion-route
PASS  qa:visual-contract      PASS  qa:decision-institucional-route
PASS  qa:udgia-figures-route
```

## D. Decisiones que siguen abiertas

De las seis de §5, una queda resuelta (la 1). Siguen pendientes:

2. **¿El VoBo de figuras se enmienda para incluir apariencia?** Es el bloqueante de las 16 figuras
   ilegibles, el hallazgo de mayor superficie que queda sin tocar.
3. **¿`areas` incorpora `etica`, o se migra el contenido?**
5. **¿Los 30 `single-choice` se promueven a H5P real?**
6. **¿`blog/` entra en la navegación?**

Y tres nuevas, surgidas de la fase 2:

7. **¿`qa:shortcode-library` se reescribe sin depender de `_vendor/`, o se retira?** Hoy es código
   que no puede pasar.
8. **¿Se saca la IP Tailscale de `qa-profesorado-pilot.mjs`?** Debería ser `BASE_URL` obligatoria.
9. **¿Se regeneran las evidencias de `docs/design/evidence/`?** Las ejecuciones de esta fase las
   actualizaron en el worktree; no se copiaron al clon por ser churn binario voluminoso.

---

# Apéndice E — Segunda ronda: decisiones resueltas y trabajo aplicado

Las ocho decisiones de §5 y §D se resolvieron. Todo lo que sigue está aplicado en el
checkout y verificado con la batería completa: **20 comprobaciones, 20 en verde**.
Nada commiteado.

## E.1 Figuras — corrección completa (decisión 2)

Las dieciséis variantes recibieron lienzo opaco y bloque `@media (prefers-color-scheme: dark)`.

**Un fallo intermedio que sólo cazó el render.** Las variantes móviles usan otro juego de
nombres de clase —`.ink`, `.muted`, `.primary`— frente al de escritorio —`.f-ink`,
`.f-muted`, `.f-primary`—. El primer bloque oscuro sólo cubría el segundo, de modo que a
siete móviles les puso fondo nocturno **dejando la tinta oscura encima**: los empeoró. El
QA de figuras pasaba igualmente, porque sólo verifica checksums y estructura. Corregido
cubriendo ambas convenciones.

Medición sobre render real en Chromium, dimensionando cada imagen a su `viewBox` para
evitar el aplastamiento del tamaño natural por defecto:

| Modo | Lienzo | Tinta | Ratio |
|---|---|---|---|
| claro | `#f5f3ee` | `#18223c` | 14.21 – 14.38 |
| oscuro | `#131c31` | `#eceee9` | 14.52 – 16.96 |

**32 de 32 combinaciones por encima de 4.5:1**, frente al 1.04:1 de partida. Checksums
regenerados y enmienda de apariencia añadida a `docs/design/UDGIA-010-vobo-figuras-hugo.md`,
con el límite conocido documentado.

## E.2 H5P — promoción de las 30 (decisión 5), construida y probada

Treinta paquetes generados desde `multi-choice.h5p`: **49,5 MB, media de 1,7 MB**, por
debajo de la estimación previa. Prueba funcional en navegador sobre `curso-l01-h5p-02`:

```
light  {"radios":8,"botonComprobar":true,"barraPuntuacion":0,"fondo":"rgb(245,243,238)"}
dark   {"radios":8,"botonComprobar":true,"barraPuntuacion":0,"fondo":"rgb(19,28,49)"}
```

Opciones seleccionables, botón «Comprobar», **cero barras de puntuación** —el adaptador
`formative-no-score` cumple— y la apariencia siguiendo al sitio.

Efecto colateral favorable: los `feedbackCorrect`/`feedbackIncorrect` que hoy se imprimen
juntos y se contradicen (§3.3) **son exactamente el `overallFeedback` de H5P**. Al promover
vuelven a su lugar natural y recuperan su carácter contingente.

**El catálogo queda intacto, y no por cautela sino por mecánica.**
`tools/ci/publication-contract.mjs --mode public` marca `decision: "blocked"` si *cualquier*
objeto del catálogo tiene bloqueos, y CI lo ejecuta en cada push: fusionar las treinta sin
autorizar **bloquearía el despliegue del sitio entero**. Por eso viven en:

- `h5p/pending-catalog-udgia-022.json` — treinta entradas de catálogo y de manifiesto
- `h5p/apply-udgia-022.mjs` — las fusiona; con `--authorize` cruza además la compuerta
- `h5p/AUTHORIZATION-UDGIA-022.md` — expediente redactado, **marcado como borrador**

## E.3 Resto de decisiones

- **`areas` (decisión 3):** `etica` documentada como sexto valor en `CLAUDE.md:49` y `:124`,
  con nota de que la decisión venía de la auditoría de abril.
- **`blog` (decisión 6):** entra en `mainSections` y en `menu.main` con peso 50;
  `content/about.md` corregido a «seis secciones» y con su entrada en la lista.
- **`qa:shortcode-library` (decisión 7):** resuelve el tema desde la caché de módulos Go
  (leyendo la versión de `go.mod`) en vez de exigir `_vendor/`, que la convención 3 prohíbe
  commitear. Acepta `_vendor/` si existe, pero no lo requiere. **Pasa por primera vez.**
- **IP Tailscale (decisión 8):** fuera de `tools/qa-profesorado-pilot.mjs`. `BASE_URL` es
  ahora obligatoria y el script aborta con un mensaje explícito, conforme a `AGENTS.md:9,14`.
- **Evidencias (decisión 9):** los inventarios de `docs/editorial/inventarios/` se
  regeneraron con los generadores del repo, porque los cambios en `blog` y `about.md` los
  dejaron desfasados y hacían fallar tres comprobaciones. No era un defecto: es su
  funcionamiento previsto.

## E.4 Procedencia confirmada y promoción completada

El responsable del proyecto confirmó la autoría de la Universidad de Guadalajara sobre el
curso de Articulate Rise. Con esa confirmación se firmó `h5p/AUTHORIZATION-UDGIA-022.md` y
se ejecutó la promoción completa:

- **Catálogo:** 39 objetos, los 39 autorizados; `publication-contract.mjs --mode public`
  devuelve `PASS (public) — 49 objetos, sin bloqueos editoriales`.
- **Paquetes:** 39 en `h5p/packages/` (65 MB), con `sourceSha256` resueltos.
- **Contenido:** los 30 shortcodes `h5p` insertados en las 13 lecciones, cada uno con su
  respaldo previo como alternativa accesible anidada. La lección 13 queda en **121,9 KB de
  HTML**, muy por debajo del umbral de 650 KB que preocupaba.

Queda como recomendación operativa —no como condición— versionar el paquete de Rise o dejar
constancia de su ubicación, para que la procedencia sea rastreable sin depender de una
consulta.

**Sigue pendiente, de la lista original, la verificación bibliográfica de §2.1**: exige
consulta a Crossref, fuera del alcance de esta sesión. Es el último bloqueante de publicación.

## E.5 Un patrón estructural que conviene recordar

Tres veces en esta sesión hubo que reescribir una aserción de QA porque codificaba **el
estado del momento en que se escribió, no una invariante**:

| Aserción | Premisa fosilizada | Sustituida por |
|---|---|---|
| `qa-runtime.mjs:591` `noDarkVariant` | «el H5P conserva apariencia clara» | el runtime adopta la del padre |
| `qa-course-rise.mjs:365` `h5pRuntimeRequests === 0` | «el curso no usa H5P» | el contenido no se carga sin interacción |
| `qa-routes-tables.mjs:349` `catalogContents === 9` | inventario pre-UDGIA-022 | línea base 39/18/37, documentada |
| `qa-pilot.mjs:119` «exactamente los nueve» | catálogo cerrado | los nueve siguen presentes e íntegros |

A ello se suma `qa-single-theme.mjs`, el caso extremo: nadie lo reescribió cuando cambió la
premisa en agosto, y quedó afirmando lo contrario de lo implementado sin que nadie lo notara.

La lección operativa: **toda decisión que cambia el estado obliga a reescribir su aserción en
el mismo commit**, y que 19 de 33 comprobaciones no corran en CI es precisamente lo que
permite que una aserción caducada pase inadvertida durante meses.


---

# Apéndice F — Verificación bibliográfica con acceso a red (2026-08-28)

Autorizado el acceso a red, se comprobó cada ficha contra Crossref, arXiv y, cuando hizo
falta, la fuente primaria.

## F.1 Veredicto

| Referencia | Veredicto |
|---|---|
| Gerlich — *Societies* 15(1) art. 6, `10.3390/soc15010006` | ✅ real; existe además una **corrección publicada**, `10.3390/soc15090252` |
| Gerlich — *J. Applied Learning and Teaching* 8(1) | ❌ **inventada** |
| Gerlich — *J. Applied Cognitive Science* 12(1) | ❌ **inventada**; esa revista no aparece |
| Wang S. & Zhang H. — IJETHE 23, art. 11 | ✅ real; el sitio escribía «23(11)», confundiendo artículo con número |
| Wang Y. & Zhang X. — IJETHE 23(1) art. 14 | ❌ **inventada**; enumerados los 45 artículos de IJETHE 2026 |
| Wang J. & Zhang Y. — *Computers & Education* 215 | ❌ **inventada**; el DOI no resuelve |
| Kosmyna — *Neuroscience of Education* 8(2) | 🟡 obra real, ficha falsa → **arXiv:2506.08872**, MIT Media Lab |
| Yang & Ma — arXiv preprint 2025 | 🟡 obra real, ficha falsa → *Information Research* **2026**, `10.47989/ir31iconf64143` |
| Xu et al. — *A&EHE* 51(2) | ❌ **inventada**; cero autores Xu en esa revista en 2026 |

## F.2 La «curva en U»

El resumen del estudio confirma modelado de ecuaciones estructurales, IPMA, fsQCA y
entrevistas semiestructuradas sobre **N = 912** en China, Europa y Estados Unidos. **No
menciona curva en U ni tres zonas.** Lo que sostiene es un efecto de umbral: la descarga
cognitiva estratégica, «al superar ciertos umbrales», libera recursos mentales para la
reflexión de orden superior.

Se retiró el gráfico con los valores `[60, 30, 95]` —sin procedencia declarada— y las tres
zonas nominadas, y se reescribió la sección conforme al hallazgo real, incluyendo el alcance
del estudio y el límite de lo que puede inferirse. La consecuencia pedagógica resultante es
más modesta: no hay una dosis óptima de delegación prescribible, sino una diferencia
cualitativa entre delegar categorías completas y esparcir la delegación en retoques.

## F.3 Corrección al heurístico de §2.1

La regla «toda referencia posterior a 2020 sin DOI, URL o ID de arXiv es sospechosa»
**sobre-dispara fuera de los artículos de revista**. Marcó 14 referencias más, de las cuales
la mayoría son legítimamente identifier-less: Selwyn, Wegerif y Costa son libros; Miyagawa y
Teich, prensa especializada.

De las que sí eran artículos o ponencias se comprobaron tres y **las tres resultaron reales**:
Kaplan-Rakowski et al. está en *Journal of Interactive Learning Research* 34(2) —ausente de
Crossref porque lo publica AACE— y Kamei se verificó contra el PDF que el propio repositorio
conserva en `assets_old/`, que confirma revista, ISSN, volumen, número, año y autoría exactos.

**Conclusión más precisa que la del informe original: la fabricación estaba concentrada en el
grupo `paradoja-descarga-cognitiva` / `glosario`, no era sistémica.** El heurístico útil no es
«sin identificador», sino «artículo de revista con volumen y páginas declarados pero sin DOI».

## F.4 Otros arreglos de esta pasada

- DOI de FAccT añadido a Bender et al. (2021).
- Ficha de Mollick unificada con la completa que el propio sitio ya tenía en otra página.
- `data/h5p/course_candidates.json`: las 30 candidaturas constan como resueltas por UDGIA-022,
  con nota de por qué el respaldo conserva `publicationAuthorized: false` — describe la
  alternativa accesible, no el paquete publicado.
- `qa-course-rise.mjs`: la guarda pasó de `eligibleCount === 30` a `promotedCount === 30` **y
  se endureció**: cada promoción debe apuntar a un objeto real del catálogo, gobernar la
  biblioteca prometida y conservar `reportingIsEnabled: false` con adaptador
  `formative-no-score`. Antes nadie verificaba que una promoción no introdujera calificación.

**Verificación final: 20 comprobaciones, 20 en verde.**
