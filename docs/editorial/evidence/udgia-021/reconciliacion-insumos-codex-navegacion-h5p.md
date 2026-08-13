# UDGIA-021 — reconciliación de los análisis de navegación y H5P

**Fecha:** 2026-08-03  
**Alcance:** árbol Hugo, rutas resueltas, configuración, catálogo H5P y Pasaportes.  
**Efecto:** expediente interno; no modifica `content/`, rutas, H5P, Moodle ni publicación.

## Dictamen

Los análisis recibidos combinan hechos, propuestas y conclusiones que no corresponden al árbol
actual. Se incorporan únicamente los hallazgos comprobados. Hugo conserva la función acordada de
**biblioteca pública formativa** y puede añadir ritmo editorial sin negar esa función.

## Navegación comprobada

| Afirmación recibida | Evidencia actual | Dictamen |
|---|---|---|
| Tres enlaces a `constelaciones/empezar-con-ia/` producen 404 | `cocreacion-evaluacion/index.md` declara `slug: empezar-con-ia`; `hugo list all` resuelve la ruta | **No confirmada**; no reparar ni redirigir |
| Blog no aparece en el menú | `hugo.toml` no tiene entrada `menu.main`; existen seis posts | **Confirmada**; candidata a L5 y a VoBo |
| Formación Docente presenta 17 piezas planas | Hay 17 bundles directamente bajo `content/formacion-docente/` | **Confirmada**; la agrupación requiere arquitectura y prueba |
| Experiencias docentes está vacía | Solo contiene `_index.md` y `featured.png` | **Confirmada**; ocultar, reencuadrar o poblar requiere decisión |
| Los videos no se publican por ser `.md` | `hugo list all` genera las tres rutas | **No confirmada**; convertir a bundles solo si necesitan recursos propios |
| El parámetro de sidebar no produce una barra | Está configurado, pero no se encontró consumo en Blowfish 2.97.0 | **Confirmada como deuda de configuración**, no como autorización de implementación |

Las diez rutas sugeridas para enlaces desde B3–B5 existen. Su pertinencia semántica debe
evaluarse por pieza antes de crear relaciones bidireccionales.

## H5P comprobado

El runtime incluye `CoursePresentation-1.26`, `ImageSlider-1.1`, `Dialogcards-1.9` y
`MultiChoice-1.16`. Sin embargo, la semántica instalada de Course Presentation admite
MultiChoice y Dialogcards, pero **no ImageSlider como contenido de diapositiva**. Por ello no es
ejecutable la propuesta de insertar Image Slider dentro de Course Presentation.

Opciones técnicamente honestas:

1. artículo con dos H5P separados y un recorrido narrativo común;
2. Course Presentation con imágenes estáticas y componentes admitidos;
3. interacción HTML nativa con fallback completo, como B2 y M6;
4. nueva biblioteca o cambio de catálogo tras una decisión explícita de mantenimiento.

B3 y B4 trabajan sobre material propio; B5 termina en una decisión situada. H5P puede enseñar
el caso y comprobar comprensión del ejemplo, pero no evaluar el material aportado por la persona.
La práctica profunda con devolución pertenece al curso; Hugo ofrece una versión exploratoria y no
calificable.

## Elementos adoptados

- visibilidad del blog, mediación de Formación Docente y resolución de Experiencias como backlog;
- enlaces cruzados como relaciones tipadas, no como cuotas;
- bibliotecas H5P disponibles por separado y sus límites reales;
- fallback, carga manual, teclado, móvil, privacidad y raíz/subruta como requisitos bloqueantes;
- separación entre interacción pública y evidencia formativa del curso.

## Elementos no adoptados

- redefinir Hugo como “medio y no biblioteca”;
- reparar una ruta que Hugo ya resuelve;
- convertir videos por una falla de publicación inexistente;
- prometer Image Slider embebido en Course Presentation;
- llamar a B3–B5 actividades ya pertenecientes al curso;
- convertir una prioridad técnica sugerida en autorización de prototipos o integración.

## Siguiente compuerta

El curso conserva A8 y C7 abiertos por población, modalidad, disponibilidad y carga. UDGIA-021
conserva L1, C2 y C3 abiertos por lectores diversos, tecnologías de asistencia y prueba dentro de
Hugo. La producción escalada empieza al cerrar estas dependencias, no al multiplicar borradores.
