# Entrega revisada de la constelación piloto

**Introducción a la IA en educación → co-creación → evaluación basada en procesos**

**Ecosistema IA-docencia UDGPlus · UDGIA-004B**

**Estado:** integrado, publicado y verificado

**Fecha:** 2026-07-27

## 1. Decisión de la revisión

La primera versión entraba directamente a co-creación, dirección epistémica y trazabilidad.
La revisión mostró que esos conceptos requieren una experiencia previa y explicaciones
distribuidas en varias páginas.

La entrega revisada adopta esta secuencia:

1. una portada introductoria explica qué cambia con la IA, qué puede aportar y qué no
   garantiza;
2. la persona elige una entrada como estudiante o como docente;
3. la co-creación aparece más adelante, después de una práctica inicial;
4. cada H5P se ubica dentro del nodo que desarrolla su contenido y nunca sustituye la
   explicación;
5. coordinación y gobierno se reservan para una sección institucional posterior.

La portada ya no intenta funcionar como índice, marco conceptual y colección de actividades
al mismo tiempo.

## 2. Jerarquía entre los tres proyectos

Se mantiene la decisión aprobada:

1. las Orientaciones consolidan conceptos y principios;
2. Hugo publica la red de conceptos, rutas y prácticas;
3. el Moodle de referencia aporta patrones didácticos verificados, sin actuar como copia
   completa del curso futuro;
4. `alfabetizacion_en_ia` permanece como esbozo derivado y no manda sobre el contenido.

No se modificó Moodle, Orientaciones ni el Semillero.

## 3. Nueva puerta de entrada

La fuente permanece en:

`content/ia-educacion/constelaciones/cocreacion-evaluacion/index.md`

La URL pública de la revisión es:

`/ia-educacion/constelaciones/empezar-con-ia/`

La URL anterior se conserva como alias. La nueva página:

- utiliza lenguaje introductorio y evita exigir vocabulario especializado;
- presenta beneficios y límites sin convertir la IA en una solución automática;
- propone una práctica básica de cinco pasos;
- abre solo dos rutas: estudiante y docente;
- mantiene un diagrama con explicación textual equivalente;
- no contiene H5P;
- introduce la co-creación como nivel posterior;
- incorpora una nueva imagen destacada de la serie editorial Almagre.

## 4. Distribución progresiva de los H5P

| Actividad | Página anfitriona | Conocimiento previo |
|---|---|---|
| Del borrador a una revisión justificada | Ensayo con IA | Siete etapas del ensayo |
| Cinco decisiones de dirección epistémica | Principios de co-creación | Cinco principios explicados |
| Conceptos para co-crear con dirección | Agenciamiento persona-IA | Co-creación, dirección, trazabilidad y ganancia |
| Evidencias para valorar aprendizaje | Evaluación formativa con IA | Tabla de evidencias del proceso |
| Recorrido: co-crear y evaluar con IA | Alfabetización en co-creación | Progresión detectar–sostener–diseñar |
| Constructor de objetivos Bloom | Bloom y diseño inverso | Resultado, evidencia y actividad |

Cada actividad mantiene una versión textual abierta y equivalente. Los H5P se cargan solo
cuando la persona los abre.

## 5. Revisión visual

Se sustituyeron los esquemas provisionales por una serie editorial de siete imágenes:

- tres escenas de un mismo ensayo;
- una escena de revisión de evidencias;
- una escena para relacionar conceptos;
- un escritorio con cinco estaciones para los puntos interactivos;
- una imagen destacada para la portada introductoria.

Las ilustraciones se generaron con `imagegen`, se normalizaron a 16:9, se redujeron a una
paleta indexada y se documentaron en
`h5p/activities/assets/editorial/README.md`.

Correcciones por actividad:

- **Image Slider:** ocupa todo el reproductor, conserva 16:9 y ya no muestra franjas
  negras o laterales opacos.
- **Image Hotspots:** los cinco controles se colocan sobre áreas preparadas para ellos; no
  tapan etiquetas.
- **Dialog Cards:** incorpora una escena editorial, texto legible y explicaciones de dos
  párrafos por concepto.
- **Multi Choice:** la imagen ocupa el ancho útil y las opciones tienen tarjetas, bordes,
  estados y foco propios de Almagre.
- **Course Presentation:** las imágenes conservan su proporción natural y la ruta se limita
  a estudiante y docente.

Los SVG esquemáticos sin uso fueron retirados.

## 6. Paquetes reproducibles

| ID | Tipo | SHA-256 | Tamaño |
|---|---|---|---:|
| `cocreacion-versiones-slider` | Image Slider | `1af7d16e…c0305` | 1.48 MB |
| `direccion-epistemica-hotspots` | Image Hotspots | `b04b46a9…a9639` | 1.38 MB |
| `cocreacion-conceptos-cards` | Dialog Cards | `764d5386…d8d6f` | 2.01 MB |
| `evaluacion-proceso-decision` | Multi Choice | `559111cb…c318c` | 2.20 MB |
| `cocreacion-evaluacion-recorrido` | Course Presentation | `d6c76a23…647f4` | 3.90 MB |
| `objetivos-bloom-udgplus` | Bloom Objective Builder | `b8e49886…c2ea` | 46 kB |

Los hashes completos viven en `data/h5p/catalog.json`. El empaquetador rechaza symlinks,
escapes de ruta, plantillas con hash distinto y licencias no verificadas.

## 7. Accesibilidad y QA

La prueba `tools/h5p/qa-pilot.mjs` ahora conoce la arquitectura distribuida. Verifica la
portada y cada página anfitriona por separado.

| Comprobación | Resultado |
|---|---|
| Portada móvil a 375 px | sin desbordamiento; dos rutas; cero H5P |
| Seis páginas anfitrionas | un H5P esperado y fallback suficiente |
| Axe en portada, páginas y reproductores | cero violaciones serias o críticas |
| Red durante las actividades | cero solicitudes externas y cero escrituras |
| Cookies y errores de consola | ninguno |
| Slider | imagen a ancho completo y proporción de paisaje |
| Hotspots | cinco controles sin solapamiento |
| Dialog Cards | cuatro tarjetas, explicación legible y escena 16:9 |
| Multi Choice | cinco opciones estilizadas e imagen legible |
| Course Presentation | escena sin distorsión |
| Bloom | objetivo construido y guardado en estado local |

Además se añadió un render hook de tablas con foco de teclado para que una tabla desplazable
en móvil no quede fuera del recorrido accesible.

La evidencia estructurada y las siete capturas están en:

`docs/design/evidence/udgia-004b/`

## 8. Límites

- El piloto publicado cubre una ruta introductoria y seis actividades; no equivale a una
  reescritura completa del sitio.
- Moodle permanece en solo lectura.
- Las Orientaciones y el Semillero permanecen intactos.
- Los paquetes no envían xAPI, calificaciones ni estado a un LRS.
- El prototipo no demuestra resultados de aprendizaje ni una implementación institucional.
- Coordinación y gobierno necesitan una ruta propia; no se resolvieron ocultándolos dentro
  de la portada introductoria.
- Las deudas previas de Orientaciones y del inventario Moodle siguen fuera de alcance.

## 9. Cierre de publicación

Rubén aprobó la revisión editorial y visual y después autorizó su integración y publicación
el 2026-07-27. `main` avanzó por fast-forward desde `f27ccfc` hasta `bf7cc7f` y se publicó en:

`https://arqueon.github.io/aprendizaje-ia/ia-educacion/constelaciones/empezar-con-ia/`

GitHub Actions `30313739155` concluyó con `success` en sus tres trabajos: construcción,
despliegue y verificación posterior al despliegue. La sonda pública independiente volvió a
dar `PASS`: comprobó 671 archivos y 9,071,388 bytes por integridad, respuesta parcial
`206`, dos montajes independientes, teclado, impresión y CSP negativa, sin solicitudes
externas, escrituras, cookies ni errores de consola. La portada, el alias anterior y las seis
páginas anfitrionas respondieron HTTP `200`.

GitHub Pages conserva tres advertencias de infraestructura no bloqueantes ya conocidas:
caché de activos versionados menor a un año, ausencia de `X-Content-Type-Options` y ausencia
de `Referrer-Policy`. El contrato del futuro servidor institucional ya exige corregirlas.

## 10. Próxima puerta

La siguiente subfase separa dos instrumentos. UDGIA-004C desarrolla una ruta operativa para
jefaturas de departamento, coordinaciones de licenciatura y posgrado, y equipos del SEMS,
centrada en procesos docentes. La alta dirección —coordinaciones y direcciones generales,
rectorías de centro, vicerrectorías y Rectoría General— tendrá después un documento ejecutivo
independiente. Cualquier transferencia a Moodle, cambio en Orientaciones o desarrollo del
Semillero requiere una tarea y autorización separadas.
