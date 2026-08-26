# Biblioteca global de shortcodes y sistema visual

**Estado:** implementado y verificado sólo en local  
**Fecha de corte:** 25 de agosto de 2026  
**Alcance:** clasificación, API y QA de los shortcodes del repositorio; sin propagación de contenido, publicación ni despliegue

## Decisión rectora

El curso de diseño inverso y cocreación con IA dejó varios recursos visuales que pueden servir fuera de ese recorrido, pero compartir su apariencia no basta para convertirlos en componentes globales. Un componente global debe conservar su sentido al cambiar de sección, funcionar con HTML nativo, exponer una API pequeña y verificable, y tener una conducta definida en pantalla estrecha, impresión y ausencia de JavaScript. Las piezas que dependen de un catálogo, una plantilla o una secuencia pedagógica permanecen acotadas a su dueño.

Con ese criterio, la biblioteca local queda formada por 23 shortcodes clasificados una sola vez: cinco globales, ocho miembros de familias compuestas, nueve específicos y uno retirable. Esta decisión preserva los usos actuales. No sustituye shortcodes en el contenido ni convierte automáticamente el curso en patrón para todo el sitio.

El registro legible por máquina está en `data/editorial/shortcode-library.json`. Ese archivo es la fuente de verdad para categoría, estado, perfil de contrato, API y anidamiento. Este documento explica las decisiones y los límites que el JSON expresa de forma compacta.

## Qué se comparte y qué permanece acotado

Los componentes globales son `idea`, `practica`, `parallevar`, `referencias` y `figura`. Los cuatro primeros son bloques semánticos de texto; `figura` integra un SVG de Page Bundle, una variante móvil opcional y un pie obligatorio. `practica` todavía no aparece en contenido público, pero se conserva como primitivo global porque su función es distinta de `idea`: presenta una acción o ejercicio, no una síntesis conceptual. Su estabilidad se prueba en la fixture antes de cualquier adopción.

Las familias compuestas son `cards`/`card`, `acordeon`/`pliegue`, `proceso`/`paso` y `pestanas`/`pestana`. La pertenencia a una familia importa porque el contenedor aporta semántica, layout o estado que el hijo no debe reconstruir. `pliegue`, `paso` y `pestana` fallan durante el build si se usan fuera de su padre. `card` conserva tres usos standalone heredados, por lo que la agrupación dentro de `cards` es recomendada pero no obligatoria hasta que exista una migración separada.

`pestanas` merece una aclaración: el nombre editorial se conserva para no reescribir el curso, pero el render no implementa el patrón ARIA de tabs. Produce una serie de `details` nativos, permite abrir más de una faceta y mantiene el contenido completo en el DOM. Llamarlo “pestañas” describe la organización del material, no una promesa de interacción JavaScript ni de navegación con flechas.

Permanecen específicos `curso-interactivo`, `curso-navegacion`, `h5p`, `recurso-info`, `illustrated-guide`, la familia `infografia`/`infografia-intro`/`infografia-seccion` y `udgia-figure`. Cada uno depende de un curso, catálogo, runtime, tipo de contenido o layout. Se pueden corregir dentro de su QA propietaria, pero una semejanza visual con los bloques globales no amplía su alcance. La familia `infografia` queda congelada como compatibilidad: todavía tiene usos válidos, aunque mantiene una API cromática anterior y estilos embebidos que no deben copiarse a componentes nuevos.

`tarjetas` es el único shortcode retirable. No tiene usos públicos en el corte actual y duplica la responsabilidad ya cubierta por `cards`/`card`. La plantilla se conserva para no romper una reaparición histórica, emite una advertencia si se invoca y declara su reemplazo. Retirable no significa borrado autorizado.

Los shortcodes `lead`, `alert`, `timeline`, `timelineItem`, `chart`, `mermaid`, `typeit` y `youtubeLite` pertenecen a Blowfish v2.97.0. El registro los identifica como dependencias del tema, no como código gobernado por esta biblioteca. Sus cambios deben evaluarse contra una actualización del tema y no resolverse mediante una copia local silenciosa.

## API estable y anidamiento

Los parámetros obligatorios se validan en el template para que un error de autoría detenga el build con la posición del Markdown. Los parámetros opcionales tienen un valor predeterminado que conserva el contenido existente. La API pública usa los nombres ya presentes en el repositorio; no se introducen alias paralelos.

Los bloques globales admiten estas formas:

```go-html-template
{{< idea titulo="Idea clave" >}}Explicación desarrollada.{{< /idea >}}
{{< practica titulo="Práctica" >}}Acción, producto y criterio.{{< /practica >}}
{{< parallevar >}}Consecuencia que la persona puede trasladar.{{< /parallevar >}}
{{< referencias >}}- Referencia completa.{{< /referencias >}}
{{< figura src="diagrama.svg" movil="diagrama-mobile.svg" caption="Qué muestra y de dónde procede." >}}
```

`idea`, `practica`, `parallevar` y `referencias` exigen contenido. Sus títulos son opcionales y tienen un valor visible predeterminado. `figura` exige `src` y `caption`; tanto `src` como `movil` deben ser SVG existentes dentro del Page Bundle. Si falta la variante móvil, el SVG principal continúa siendo el fallback.

Las familias compuestas fijan este anidamiento:

```go-html-template
{{< acordeon etiqueta="Dudas frecuentes" >}}
  {{< pliegue titulo="Primera duda" abierto="true" >}}Respuesta.{{< /pliegue >}}
  {{< pliegue titulo="Segunda duda" >}}Respuesta.{{< /pliegue >}}
{{< /acordeon >}}

{{< proceso >}}
  {{< paso titulo="Observar" >}}Evidencia necesaria.{{< /paso >}}
  {{< paso titulo="Decidir" >}}Criterio y límite.{{< /paso >}}
{{< /proceso >}}

{{< pestanas etiqueta="Perspectivas" >}}
  {{< pestana titulo="Docencia" >}}Contenido de la primera faceta.{{< /pestana >}}
  {{< pestana titulo="Estudiantado" >}}Contenido de la segunda.{{< /pestana >}}
{{< /pestanas >}}
```

`abierto` sólo admite `true` o `false`. `pestanas` exige al menos dos facetas, pues un único panel no necesita esa organización. `proceso` conserva una lista ordenada real y `paso` requiere título y cuerpo. `cards` acepta la etiqueta accesible del grupo; cada `card` exige `link` y `title`. `description`, `icon`, `img` y `tall` siguen siendo opcionales. El parámetro `color` se mantiene por compatibilidad, pero el contenido nuevo debe omitirlo y dejar que la identidad resuelva el acento.

## Tokens e identidad visual

La biblioteca no crea una segunda paleta. Usa los tokens semánticos de Identidad C definidos en `assets/css/custom.css`: papel, superficies, tinta, texto secundario, línea, primario añil y estados bueno, advertencia y riesgo. Los modos claro y oscuro cambian esos valores en `:root` y `html.dark`; los templates no necesitan duplicar reglas por apariencia.

Sobre esa base se fija una escala pequeña para los componentes: cinco espacios (`--alm-space-xs` a `--alm-space-xl`), dos radios, un inset lateral fluido y un mínimo de control de 2.75 rem, equivalente a 44 px con la raíz habitual. Estos tokens resuelven repetición interna, no autorizan que el contenido público añada estilos inline. La tipografía mantiene Newsreader para títulos, Inter para cuerpo y Archivo Narrow para etiquetas.

Las tarjetas con icono sin color explícito usan ahora los tokens de riesgo en vez de inyectar un bloque `<style>` y valores hexadecimales por cada instancia. Los SVG servidos como recurso externo siguen sin heredar variables CSS: deben resolver por sí mismos ambas apariencias o integrarse inline mediante un componente que tenga contrato para ello.

## Accesibilidad, responsive, impresión y fallback

Los callouts se renderizan como `aside` con un nombre accesible vinculado a la etiqueta visible. `referencias`, `cards`, `acordeon` y `pestanas` producen regiones nombradas. Los desplegables usan `details` y `summary`, conservan foco visible y se activan con teclado sin script. El proceso usa `ol` y `li`; la numeración circular es un refuerzo visual, no la única fuente de orden. Los iconos de las tarjetas son decorativos y el título enlazado conserva el nombre del destino.

En pantalla estrecha, todos los componentes admiten palabras largas sin ampliar el viewport. El inset lateral se reduce de forma fluida y el proceso estrecha su sangría por debajo de 40 rem. La figura cambia a su SVG móvil debajo de 640 px cuando existe. La cuadrícula de tarjetas se apoya en los breakpoints del tema y vuelve a una columna antes de que el texto pierda legibilidad.

En impresión, la navegación del curso permanece fuera, las sombras desaparecen y los bloques intentan evitar cortes internos. Los templates de `pliegue` y `pestanas` incluyen una copia sólo para impresión, oculta en pantalla y fuera de la semántica accesible mediante `aria-hidden`; así, todos los cuerpos se pintan aunque el navegador mantenga cerrado un `details`. El texto usa negro sobre blanco y las líneas conservan contraste. La fixture comprueba que esas copias estén ocultas en pantalla y tengan contenido y altura real con el medio `print`.

El fallback común es HTML nativo. Ningún componente global requiere JavaScript, almacenamiento, cookies o una petición externa. Sin CSS permanecen títulos, listas, enlaces, detalles, texto y pies de figura. Cuando una pieza específica sí contiene interacción, su alternativa pertenece a su contrato propietario: `h5p` requiere un cuerpo Markdown equivalente y `curso-interactivo` toma su solución del catálogo gobernado. La biblioteca no declara equivalencias que no pueda verificar.

## Pruebas y criterio de adopción

`npm run qa:shortcode-library` valida cuatro capas. Primero compara el registro con los 23 templates locales para impedir shortcodes sin clasificar. Después revisa categorías, perfiles, tokens, API, reemplazos y ausencia de usos públicos de componentes retirables. Enseguida construye una fixture aislada que contiene todos los globales y compuestos; esta página no forma parte de `content/` y por ello no propaga ejemplos al sitio. Finalmente abre el render real en escritorio claro, móvil oscuro y colores forzados, y prueba teclado, overflow, apariencia, tráfico, consola, axe y medio de impresión.

La evidencia nueva se guarda en `docs/design/evidence/shortcode-library/`. Un `PASS` significa que la implementación local y la fixture satisfacen el contrato; no significa que el resto del contenido haya sido migrado, que las piezas específicas hayan pasado todas sus QA propietarias ni que exista aprobación de publicación. La adopción futura debe ocurrir página por página, sólo cuando el componente ayude a explicar y no cuando sustituya la explicación con una caja visual.

## Límites vigentes

Este corte no elimina compatibilidad, no modifica los textos del curso ni reemplaza shortcodes en otras secciones. Tampoco convierte los componentes de Blowfish en código propio. La lectura humana todavía debe decidir si cada uso futuro es pedagógicamente pertinente, si el rótulo elegido corresponde al contenido y si una figura ofrece una explicación textual suficiente. La biblioteca fija las condiciones técnicas para reutilizar; no autoriza la reutilización indiscriminada.
