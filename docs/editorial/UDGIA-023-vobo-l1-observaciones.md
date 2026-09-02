# UDGIA-023 · VoBo del piloto L1 y observaciones de la lectura humana

**Fecha:** 2026-09-01 · **Decisión de:** Rubén (lectura humana en el sitio publicado) ·
**Registro:** Fable · **Estado:** VoBo otorgado; correcciones y rediseños derivados en curso.

## Alcance del VoBo

La columna de seis páginas del piloto L1 (entrada general, co-creación, aprendizaje activo,
aprendizaje híbrido, SAMR/ICAP y Bloom/diseño inverso), las tres landings del contrato de
rutas (Orientaciones, guía de estudiantes, guía de profesorado) y las dos actividades (B2 y
M6) quedan aprobadas **en su función y recorrido**. El VoBo no cubre lo que sigue.

## Observaciones y decisiones

1. **Figuras que no siguen al tema claro/oscuro.** Ejemplo: el ciclo formular–contrastar–
   decidir–responder de la entrada, que se veía con lienzo claro sobre página oscura.
   *Causa verificada:* las figuras UDGIA se servían como `<img>`; un SVG servido como imagen
   sólo ve `prefers-color-scheme`, no el selector del sitio. Las figuras nativas del
   shortcode `figura` (cadena de diseño inverso, dos lentes SAMR/ICAP, acciones del
   aprendizaje activo, muestra híbrida) sí iban en línea, pero con la paleta anterior
   (rojo almagre, Lora) y sin reglas oscuras.
   *Decisión:* incrustar las figuras UDGIA en línea (el bloque `@media` del SVG pasa a
   `html.dark { … }` al incrustar; los archivos y sus checksums no cambian) y pasar las
   figuras nativas a los tokens del sitio. Aplicado en la rama `fix/figuras-tema-oscuro`.
   Fuera de alcance por ahora: `niveles-simondon.svg` y `miedo-fascinacion.svg`
   (observatorio) llevan colores fijos por atributo y no pertenecen a L1.

2. **Portadas repetidas o disonantes** en las páginas asociadas al *Laboratorio guiado para
   decidir antes de entregar*. No son archivos idénticos (catorce `featured.webp` distintos
   en `ia-educacion/guias/`), sino portadas de estilos heterogéneos que se ven juntas en las
   tarjetas de contenido relacionado. *Decisión:* se atiende dentro del barrido general de
   portadas ya previsto (receta collage §7.1 del rediseño visual), no pieza por pieza.

3. **Actividades B2 y M6: se conservan, pero se rehacen por completo.** *Compara dos
   sugerencias sin perder tu propósito* (estudiantes) y *¿Tu actividad pide, practica y
   revisa lo mismo?* (profesorado) resultan confusas: lenguaje abstracto y genérico, no se
   entiende qué hay que hacer. B2 además usa una identidad ajena al sitio (paleta almagre y
   Lora propias del prototipo de agosto). M6 tiene el formato del sitio, pero su SVG es
   escueto y tampoco sigue al tema. *Decisiones:*
   - reescribir ambas con la pauta de redacción pública comprensible: caso completo con
     nombre y materia, acción en palabras cotidianas, criterio de avance visible, sin
     abstracciones (“propósito”, “alineación”) sin ejemplo inmediato;
   - construirlas sobre los tokens y tipografías del sitio (Newsreader, Inter, añil), no
     sobre hojas de estilo propias;
   - SAMR e ICAP dan para **dos figuras** bien construidas, una por marco, en lugar de la
     figura única *Dos lentes*; la figura de M6 se rehace con la misma regla de escenas
     (campo, evidencia, consecuencia) que rige el resto de figuras;
   - M6 debe volver al sitio: el commit `448c8a6` (2026-08-26) eliminó su runtime y su
     enlace en la guía de profesorado sin justificación registrada; el prototipo vive en
     `docs/editorial/evidence/udgia-021/prototipos/revisor-alineacion-m6/`.
   La producción sigue el flujo de ficha → prototipo → lectura humana → VoBo específico.

4. **Bloom/diseño inverso no abrió** en la lectura. En el mismo momento la página
   respondía 200 con el HTML completo, sin errores de consola y sin recursos rotos; el
   tiempo hasta el primer byte de GitHub Pages rondó los tres segundos. Se considera un
   fallo transitorio de red; queda en observación, sin cambio.

## Pendientes que abre esta decisión

- [ ] PR de figuras y tema (observación 1) con QA de CI en verde.
- [ ] Ficha de reescritura de B2 y M6 y de las dos figuras SAMR/ICAP (observación 3).
- [ ] Restaurar M6 en `static/actividades/revisar-actividad/` y su enlace en la guía de
      profesorado (puede ir junto con la reescritura).
- [ ] Barrido general de portadas (observación 2), ya en el backlog del rediseño visual.
