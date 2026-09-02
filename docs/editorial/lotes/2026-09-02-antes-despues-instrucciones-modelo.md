---
title: "Instrucciones explícitas: antes y después de las cuatro páginas modelo"
date: 2026-09-02
---

# Instrucciones explícitas · antes y después (lote 0, para VoBo)

Regla aplicada: `docs/editorial/contrato-instruccion.md`. Cada página empieza ahora con cinco líneas (para quién, qué vas a hacer, qué tendrás, cuánto tarda, dónde está el ejemplo) y el cuerpo evita las negaciones («el problema no es…») y los términos de marco sin ejemplo. Vista previa local: http://127.0.0.1:1315/ia-educacion/guias/estudiantes/ · …/guias/profesorado/ · …/actividades/comparar-sugerencias/ · …/actividades/revisar-actividad/

## 1. Guía para estudiantes

**Título · antes:** Laboratorio guiado para decidir antes de entregar
**Título · después:** Antes de entregar: decide qué hacer con los cambios que te proponen

**Entrada · antes:** «Una sugerencia puede sonar bien y aun así alejar tu trabajo del propósito o afirmar más de lo que permite la evidencia. Este laboratorio te ayuda a decidir antes de entregar. Puedes recorrer el ejemplo en 5–10 minutos o trabajar con un texto propio en aproximadamente 25–35 minutos.»
**Entrada · después (contrato):**
- *Para quién:* Estudiantes que escriben un texto (informe, ensayo, reporte de práctica) y reciben cambios propuestos por una IA, por un compañero o por quien imparte la materia.
- *Qué vas a hacer:* Tomar un párrafo tuyo y dos cambios que te propusieron, y decidir con cada cambio una de tres cosas: lo acepto, lo cambio o lo dejo pendiente. Para decidir usas una sola pregunta: si lo acepto, ¿mi párrafo sigue diciendo lo que yo quería decir?
- *Qué tendrás al terminar:* Una hoja con tres cosas: tu párrafo como estaba, tu párrafo revisado y dos líneas que dicen qué hiciste con cada cambio y por qué (por ejemplo: «Cambio 1: lo rechacé porque quitaba la fecha y el lugar»). Esa hoja es lo que entregas o le enseñas a quien te propuso los cambios. No es una calificación.
- *Cuánto tarda:* Entre cinco y diez minutos con el ejemplo de Renata; entre quince y veinticinco con un texto tuyo.
- *Antes de pedirte nada:* Abajo está el caso de Renata ya resuelto.

**«Qué obtendrás» · antes:** «Al terminar tendrás un fragmento antes y después de la revisión y dos notas breves de decisión. El resultado no prueba por sí solo que el texto sea correcto: deja visible qué comprobaste y por qué elegiste cambiarlo o conservarlo.»
**Después:** la sección desaparece; su contenido pasa al contrato («qué tendrás») y al caso resuelto, que termina así: «Su hoja final tiene el párrafo original, el párrafo revisado (casi igual, más corto) y estas dos líneas: “Cambio 1: lo cambié porque quitaba el lugar y la fecha. Cambio 2: pendiente, tengo que ver si llovió”. Eso es todo lo que la actividad te pide producir.»

**Secciones nuevas:** «El caso de Renata, ya resuelto» (los dos cambios con su decisión y razón), «Qué vas a hacer con tu texto, paso a paso» (tres pasos), «Cuándo te sirve» (tres situaciones), «Cómo seguir».

## 2. Actividad B2 (estudiantes)

**Título · antes:** Dos cambios para tu texto: ¿cuál aceptas?
**Título · después:** Decide qué hacer con dos cambios que te proponen a tu texto

**Promesa · antes:** «Pega un párrafo tuyo y dos cambios que te propusieron (una IA, un compañero, tu profesora). Sales con el párrafo revisado y una razón por cada cambio. Tarda entre diez y veinte minutos. No califica ni envía nada.»
**Después:** contrato de cinco líneas (mismo contenido que la guía, adaptado) y encabezados que dicen la acción: «Así lo resolvió Renata con su párrafo» → «Pega tu párrafo y decide con cada cambio» → «Escribe tu párrafo revisado y mira tu nota de decisión». La nota final explica que sus dos líneas «se escriben solas con lo que marcaste arriba».

## 3. Guía para profesorado

**Título · antes:** Diseñar actividades y observar el aprendizaje
**Título · después:** Revisa una actividad tuya: lo que pides, lo que practican y lo que entregan

**Caso · antes:** «El problema no es el formato digital ni la ausencia de IA. La actividad anuncia una comparación, pero permite resolverla reconociendo una respuesta. Además, la entrega final no deja ver qué información utilizó cada estudiante para decidir.»
**Caso · después:** «Fíjate en lo que pasa. Ella pide comparar, pero para entregar basta con marcar una opción: nadie tuvo que comparar. Y con una opción marcada, ella no puede ver qué información usó cada estudiante para decidir. Ese hueco entre lo que se pide y lo que se entrega es lo que esta guía te ayuda a encontrar en una actividad tuya.»

**Cierre · antes:** «No se trata de usar más tecnología ni de convertir cada actividad en un proyecto extenso. Se trata de que lo que el grupo hace, produce y revisa permita observar el aprendizaje que se anunció.»
**Cierre · después:** «Un cambio pequeño basta: la docente del caso cambió una frase, no la actividad entera. Lo que importa es que lo que el grupo hace, lo que entrega y lo que tú revisas muestren el mismo aprendizaje que anunciaste.»

**Añadido:** la instrucción reescrita del caso aparece textual («Escribe una comparación de cinco líneas que cite las dos fuentes…»), para que se vea el producto antes de pedir el propio.

## 4. Actividad M6 (profesorado)

**Título · antes:** Lo que pides, lo que practican, lo que entregan: ¿es lo mismo?
**Título · después:** Revisa una actividad tuya en tres frases: lo que pides, lo que practican, lo que entregan

**Promesa · antes:** «Describes una actividad tuya en tres frases y ves en qué punto se rompe… Terminas con la instrucción reescrita. Tarda unos doce minutos.»
**Después:** contrato con el ejemplo del producto («Antes: elige cuál fuente es mejor. Después: escribe cinco líneas que citen las dos fuentes… Razón: con una opción marcada no veo si compararon»), y en el paso 2 una instrucción nueva: «Escribe en cada caja lo que pasa de verdad en tu actividad, no lo que te gustaría que pasara. Si dudas, empieza por “Entregan”: es lo único que puedes mirar.»

## Qué se verifica ahora en el CI

`qa:direct-language` exige en estas cuatro páginas: contrato presente y antes del primer encabezado, cinco líneas con contenido, ejemplo en «qué tendrás», ninguna negación prohibida y ningún término de marco sin ejemplo en su oración. Si apruebas la pauta, la lista de páginas gobernadas crece por lotes.
