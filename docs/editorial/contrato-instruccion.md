# Contrato de instrucción para guías, prácticas y actividades

**Fecha:** 2026-09-02 · **Origen:** lectura humana de Rubén sobre las guías y actividades del
piloto L1 («las instrucciones y la explicación son vagas y generales; no queda claro qué se debe
hacer ni qué se obtiene»). · **Estado:** regla en prueba sobre cuatro páginas modelo; se extiende
al resto tras el VoBo.

## Diagnóstico

Los textos estaban escritos desde el método, no desde la persona que los lee: hablaban de
«propósito», «evidencia» o «alineación», y de lo que el problema *no* es, antes de decir qué va a
hacer alguien y qué se lleva al final. La pauta de redacción pública comprensible ya lo prohíbe,
pero ninguna guarda lo medía: `qa:direct-language` sólo revisaba cinco piezas y una lista corta de
sustantivos.

## La regla

Toda guía, práctica o actividad empieza con el shortcode `contrato`, que obliga a cinco líneas:

| Línea | Qué debe decir | Prueba de que está bien |
|---|---|---|
| Para quién | La persona y su situación, no un rol abstracto | Alguien puede decir «soy yo» o «no soy yo» |
| Qué vas a hacer | Verbo concreto + objeto + con qué | Se puede empezar sin leer nada más |
| Qué tendrás al terminar | La cosa, nombrada, con un ejemplo entre paréntesis | Se puede imaginar la hoja o el archivo final |
| Cuánto tarda | Minutos, con y sin ejemplo | — |
| Antes de pedirte nada | Dónde está el ejemplo resuelto | El ejemplo aparece ANTES del primer campo o paso |

Y tres prohibiciones en todo el cuerpo:

1. Ninguna frase del tipo «el problema no es…», «no se trata de…», «no es X ni Y»: se dice lo que
   sí pasa, con el caso delante.
2. Ningún sustantivo de marco (propósito, evidencia, alineación, criterio, artefacto, insumo,
   consigna, huella) sin su ejemplo en la misma oración.
3. Ningún párrafo que no responda a «¿y yo qué hago con esto?». Si sólo explica el método, se
   corta o se convierte en un paso.

## Tres modos del mismo contrato

El shortcode admite `modo="hacer"` (por defecto, para guías, prácticas y actividades),
`modo="lectura"` (páginas que explican un marco o un concepto: las etiquetas pasan a «Qué vas a
entender», «Qué te llevas» y «Por dónde empieza») y `modo="ejemplo"` (ejemplos disciplinares:
«Qué muestra este ejemplo»). Las cinco líneas y las tres prohibiciones son las mismas; lo que
cambia es que en lectura y ejemplo «qué te llevas» nombra una idea aplicable con su ejemplo, no
un archivo.

## Cómo se verifica

`qa:direct-language` comprueba, en las páginas gobernadas: que el shortcode `contrato` esté
presente y antes del primer encabezado de segundo nivel; que las cinco líneas existan y la tercera
contenga un ejemplo (paréntesis o comillas); que no aparezcan las negaciones prohibidas; y que los
sustantivos de marco no aparezcan sin ejemplo. La lista de páginas gobernadas vive en `data/editorial/contrato-instruccion.json` y crece por
lotes: lote 0, las cuatro modelo (VoBo de Rubén, 2026-09-02); lote 1, guías, prácticas y rutas;
lote 2, páginas de formación docente (modo lectura); lote 3, ejemplos disciplinares (modo ejemplo).

## Páginas exentas

Revisadas con Rubén el 2026-09-02, quedan fuera del contrato: las portadas de sección
(`_index.md`, navegación); los términos del glosario (definiciones breves, con icono compartido
por familia: aprendizaje, técnica e IA, la persona ante la IA, diseño y evaluación, ética e
institución); las fichas de recursos (enlaces, videos, catálogos); las lecciones del curso, que
tienen su propia estructura y se revisarán con el curso; y las páginas institucionales o técnicas
(acerca de, licencia, runtime H5P, landing de Orientaciones). La lista vive en la clave `exentas`
de `data/editorial/contrato-instruccion.json`. Todo lo demás lleva contrato: lotes 4 (blog y
estudios del observatorio) y 5 (ética y transparencia, tendencias, documentación, reseñas de
artículos), en modo lectura.

## Páginas modelo (lote 0, para VoBo)

- `content/ia-educacion/guias/estudiantes/index.md` y `layouts/shortcodes/actividad-b2.html`
- `content/ia-educacion/guias/profesorado/index.md` y `layouts/shortcodes/actividad-m6.html`
