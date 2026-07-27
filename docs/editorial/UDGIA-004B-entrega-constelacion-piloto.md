# Entrega de la constelación piloto

**Co-creación + dirección epistémica + evaluación basada en procesos**

**Ecosistema IA-docencia UDGPlus · UDGIA-004B**

**Estado:** construido y verificado en rama; pendiente de revisión editorial y VoBo para
integrar

**Fecha:** 2026-07-27

## 1. Resultado

La fase materializa el contrato aprobado en una pieza pública navegable y seis actividades
H5P. Mantiene la jerarquía acordada:

1. las Orientaciones consolidan conceptos y principios;
2. Hugo publica la red de conceptos, rutas y prácticas;
3. el Moodle de referencia aporta patrones didácticos verificados, sin actuar como copia
   completa del curso futuro;
4. `alfabetizacion_en_ia` permanece como esbozo derivado y no manda sobre el contenido.

No se modificó Moodle ni el checkout de trabajo de Orientaciones.

## 2. Superficie pública

La nueva portada vive en:

`content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md`

Incluye:

- entradas explícitas para estudiante, docente y coordinación;
- mapa visual y alternativa textual;
- recorridos con salidas observables;
- seis H5P de carga manual;
- alternativa accesible abierta para cada interacción;
- enlaces tipados hacia los nodos que fundamentan, aplican o ejemplifican la ruta;
- límites de seguimiento y cuidado de datos.

La portada se enlaza desde `IA en educación`. Su imagen destacada original sigue la
identidad C.

## 3. Metadatos piloto y correcciones editoriales

Ocho bundles recibieron la ficha `ecosistema` con identificador, audiencias, intenciones,
tipo, capas, resultado, estado de evidencia, fuentes, revisión, relaciones, reutilización,
accesibilidad y responsable:

| Nodo | ID principal |
|---|---|
| Mapa de las tres literacidades | `capacity.alfabetizacion-ia` |
| Alfabetización en co-creación | `literacy.cocreacion` |
| Principios para la co-creación | `pattern.direccion-epistemica` |
| Co-creación/agenciamiento | `concept.cocreacion-persona-ia` |
| Evaluación formativa | `assessment.basada-en-procesos` |
| Portafolio iterativo | `practice.portafolio-proceso` |
| Ensayo como proceso | `practice.declaracion-uso-ia` |
| Ganancia cognitiva | `outcome.ganancia-cognitiva` |

Además:

- Bloom se presenta como heurística de diseño, no equivalencia rígida entre literacidad y
  nivel;
- la evaluación formativa se distingue de la evaluación basada en procesos;
- el portafolio se declara `prototipo-escenario`, no práctica implementada;
- se corrigieron enlaces heredados de ganancia/descarga cognitiva;
- las tarjetas modificadas de `IA en educación` usan la paleta C.

## 4. H5P producidos

`aprendizaje-ia` queda como repositorio canónico de:

- fuentes editables de las actividades;
- plantillas oficiales fijadas por hash;
- paquetes `.h5p` reproducibles;
- catálogo, hashes, procedencia y licencias;
- adaptadores visuales;
- runtime estático publicado;
- QA automatizado.

| ID | Tipo | Paquete | Tamaño |
|---|---|---:|---:|
| `cocreacion-versiones-slider` | Image Slider | `28d0e26…77ee` | 350 kB |
| `direccion-epistemica-hotspots` | Image Hotspots | `284702b…57fe` | 1.16 MB |
| `cocreacion-conceptos-cards` | Dialog Cards | `8da6c8a…8591` | 1.61 MB |
| `evaluacion-proceso-decision` | Multi Choice | `35aa1c6…05f0` | 1.84 MB |
| `cocreacion-evaluacion-recorrido` | Course Presentation | `e0f0f06…dee7` | 2.41 MB |
| `objetivos-bloom-udgplus` | Bloom Objective Builder | `b8e4988…c2ea` | 46 kB |

Los hashes completos viven en `data/h5p/catalog.json`. Los paquetes se construyen con
`node tools/h5p/package-pilot.mjs`; el comando rechaza symlinks, escapes de ruta, plantillas
con hash distinto y licencias no verificadas.

Las plantillas oficiales se reducen al cierre real de dependencias de cada actividad. Las
bibliotecas que en el paquete oficial omiten `license` se completan desde
`h5p/templates/library-licenses.json`, cuya procedencia apunta a los repositorios oficiales.

## 5. Constructor Bloom

La biblioteca local se convirtió en fuente canónica del repositorio y avanzó a patch
`1.0.3`:

- contenido CC BY-SA 4.0 y biblioteca MIT;
- interfaz en español con `es` y `es-MX`;
- textos principales configurables mediante `l10n`;
- imagen SVG interior con título y descripción;
- paleta C y contrastes corregidos;
- funcionamiento de selección, vista previa y lista guardada comprobado en navegador.

## 6. Accesibilidad y runtime

El runtime ahora:

- asigna título al iframe interno que genera `h5p-standalone`;
- corrige la semántica de las pestañas de Course Presentation, evitando controles
  interactivos anidados;
- conserva foco visible y adaptador específico por tipo;
- traduce los controles de pantalla completa al español;
- mantiene aislamiento, carga diferida y fallbacks imprimibles.

Cada H5P contiene imagen interior, pero la alternativa no depende de verla ni de operar la
interacción.

## 7. QA ejecutado

| Comprobación | Resultado |
|---|---|
| Hugo `--minify` | 907 páginas; sin error de construcción |
| `npm run h5p:verify` | runtime reproducible |
| `npm run qa:h5p` | regresión técnica y sondas de seguridad aprobadas |
| `npm run qa:h5p:pilot` | seis actividades cargan y no desbordan |
| Axe en portada y seis iframes | cero violaciones serias o críticas |
| Red durante las actividades | cero solicitudes externas y cero escrituras |
| Cookies | ninguna |
| Vista móvil 375 px | sin desbordamiento; seis fallbacks equivalentes |
| Bloom | objetivo construido y guardado en estado local de la actividad |
| `git diff --check` | sin errores |

La evidencia estructurada queda en
`docs/design/evidence/udgia-004b/qa-pilot.json`.

Hugo conserva advertencias de deprecación ya existentes sobre `languageCode`,
`.Site.LanguageCode` y `.Site.Data`, además del rango de compatibilidad declarado por el
módulo Blowfish. Ninguna bloquea esta entrega; no se amplió el alcance para resolverlas.

## 8. Límites de la entrega

- La rama no se ha integrado ni publicado.
- Moodle permanece en solo lectura.
- Los paquetes no envían xAPI, calificaciones ni estado a un LRS.
- El prototipo no demuestra resultados de aprendizaje ni implementación.
- Las siete referencias faltantes del WIP de Orientaciones siguen siendo deuda previa a
  una publicación de ese documento.
- `cmid 71` y la diferencia histórica 15/16 H5P siguen fuera de alcance.

## 9. Siguiente puerta

Tras revisión y VoBo:

1. integrar esta rama en `main` y publicar Hugo;
2. ejecutar la sonda de despliegue contra GitHub Pages;
3. abrir la fase siguiente como transferencia controlada a Moodle, con respaldo,
   importación, QA, rollback y registro, o como revisión temática de Orientaciones, según
   la prioridad aprobada;
4. no promover el Semillero a autoridad curricular durante esa transferencia.
