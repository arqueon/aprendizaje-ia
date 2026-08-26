# Rediseño de `revisar-actividad`

**Fecha:** 2026-08-23  
**Estado:** actividad anterior retirada; tres prototipos en revisión humana; sin publicación.

## Decisión humana

La actividad autónoma `actividades/revisar-actividad/` fue rechazada porque no se entiende y su diseño se separa del sitio. Un PASS técnico previo no constituye aprobación pedagógica.

## Diagnóstico reproducible de la versión retirada

- 590 palabras antes del resultado.
- 5 áreas de texto, 12 radios, 4 fieldsets, 9 subtítulos y 5 botones.
- 4,767 px de alto en escritorio y 6,553 px en móvil.
- El resultado aparece alrededor de y=4,284 px.
- La persona debe describir propósito, evidencia, práctica, ayuda y alternativa antes de recibir una recomendación genérica.
- La aplicación crea una identidad visual autónoma y no se siente parte de la guía.
- Axe, consola y red estaban limpios: el defecto principal era comprensión, productividad y coherencia visual.

## Retirada y rollback

- Se eliminaron el iframe y los enlaces de la guía.
- La constelación ahora lleva a la guía de profesorado, no a la actividad retirada.
- La ruta antigua responde HTTP 404 en la versión de prueba.
- El script de autoaltura quedó retirado por no tener usos.
- Copia íntegra en `docs/editorial/quarantine/2026-08-23-revisar-actividad-v2/`.
- Hashes principales de la copia verificados contra los archivos retirados.

La guía conserva una tarea breve sin JavaScript: elegir una ruptura y escribir **antes, después y razón**.

## Prototipos

| Opción | Palabras | Áreas de texto | Botones | Alto escritorio | Alto móvil | Resultado |
|---|---:|---:|---:|---:|---:|---|
| Elegir y reescribir | 191 | 2 | 5 | 2,087 px | 2,318 px | Instrucción inicial, versión revisada y razón del cambio |
| Comparar y aplicar | 236 | 1 | 4 | 2,056 px | 2,504 px | Instrucción revisada y explicación de lo que cambió |
| Revisar y priorizar | 196 | 1 | 11 | 1,433 px | 1,916 px | Primer problema y cambio que se llevará a clase |

### Corrección después de la revisión humana

Rubén señaló que las tres opciones y las tres entradas de la portada seguían descontextualizadas. La corrección no consistió en añadir otra definición: cada opción ahora comienza con el mismo caso, antes de mostrar controles.

- Quién: una docente de primer semestre.
- Cuándo: prepara la próxima clase.
- Qué busca: que el grupo compare dos fuentes y explique su decisión.
- Instrucción inicial: “Lee dos resúmenes y elige cuál fuente es mejor. Puedes usar IA para ayudarte”.
- Problema visible: no dice qué comparar, qué hará la IA ni qué razones se escribirán.
- Resultado: una instrucción revisada y una pregunta para comprobarla con otra persona.

La portada también cambió sus tres accesos por situaciones completas: preparar la próxima clase, usar IA después de un primer intento y acordar una regla antes del siguiente curso. Cada card dice qué tiene ya la persona, qué hará y qué conservará. Tres SVG nuevos representan esas secuencias y llevan título, descripción, versión, fecha y licencia CC BY-SA 4.0.

### Recomendación

**Elegir y reescribir** sigue siendo la candidata principal porque:

1. comienza con una frase real de la actividad;
2. pide elegir solo una ruptura;
3. termina en una reescritura utilizable;
4. hace visible el antes y el después;
5. no pretende calificar ni diagnosticar automáticamente todo el diseño.

`Comparar y aplicar` funciona como alternativa más guiada. `Revisar y priorizar` es útil para una revisión rápida, pero no basta para aprobar una actividad completa.

## QA de prototipos

Las tres variantes:

- generan su producto mediante teclado;
- muestran foco de 3 px;
- pasan axe sin violaciones;
- no generan errores de consola;
- no realizan peticiones externas;
- no presentan overflow horizontal a 412 px;
- usan etiquetas visibles y no dependen solo del color;
- fueron revisadas visualmente en escritorio y móvil.
- `qa:contextualized-entry` comprueba que la portada y las tres opciones muestren persona, momento, instrucción inicial y resultado; también gobierna metadatos y ausencia de recursos externos en los tres SVG de navegación.

## Frontera de publicación

Los prototipos viven en `sketches/003-ejercicio-alineacion/` y se sirven temporalmente como versión de prueba en el puerto 1314. No forman parte del build Hugo ni sustituyen la ruta retirada. La integración requiere elección humana y un nuevo ciclo RED→GREEN para la opción elegida.
