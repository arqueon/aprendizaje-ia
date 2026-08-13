# UDGIA-021 — evaluación de claridad del prototipo M6, ronda 4

**Rol:** evaluación separada de la reescritura; no optimiza.  
**Fecha:** 2026-08-02.

## Cambios sometidos a evaluación

La superficie pública ahora se titula “¿Tu actividad pide, practica y revisa lo mismo?”. El
caso muestra una intención concreta: el docente quiere que el grupo compare dos fuentes, pero
la actividad solo permite leer resúmenes y elegir una opción. Los campos públicos se expresan
como preguntas cotidianas; la terminología técnica permanece en el contrato interno.

## Comprobación anclada

| Criterio | Evidencia posterior | Dictamen |
|---|---|---|
| Entrada reconocible | “Elige una actividad que ya utilices” y el caso de las dos fuentes | Pasa local |
| Función y producto explícitos | “Compararás lo que quieres que aprenda el grupo con lo que practicará y entregará. Al final sabrás qué parte conviene ajustar primero.” | Pasa local |
| Ejemplo antes de términos | El caso completo aparece antes del formulario; no se publican “cadena”, “ruptura”, “propósito”, “evidencia”, “experiencia”, “asistencia”, Bloom o diseño inverso | Pasa local |
| Instrucción completa | Cinco frases, cuatro preguntas y una sugerencia de primer ajuste | Pasa local |
| Salida accionable | “Primero ajusta lo que pedirás al final”, “Primero ajusta la práctica”, “Primero delimita la ayuda” o “Primero iguala las dos opciones” | Pasa local |
| Alternativa accesible | Hoja sin JavaScript con el mismo caso y las mismas preguntas | Pasa local |
| Confirmación humana | La persona que detectó la barrera todavía no ha revisado esta versión | Pendiente |

## Verificación técnica y lingüística

- QA funcional: cuatro escenarios, axe `0`, consola `0`, red externa `0` y sin desbordamiento.
- Auditor de lenguaje público: `0` bloqueos y `0` fragmentos para revisión.
- Interactivo: 666 palabras, 13.88 palabras por oración, Szigriszt-Pazos `71.63`, INFLESZ
  “bastante fácil”.
- Hoja sin JavaScript: 361 palabras, 13.88 palabras por oración, Szigriszt-Pazos `70.25`,
  INFLESZ “bastante fácil”.
- Segunda pasada de voz: no se encontraron aperturas genéricas, tono promocional, relleno,
  paralelismos enfáticos ni cierres formularios; predomina la voz activa y el caso concreto.

Estas mediciones verifican rasgos del texto y de la interfaz. No prueban que la explicación ya
sea suficiente para la audiencia.

## Dictamen

**PASS técnico y editorial local; comprensibilidad humana abierta.** La reescritura atiende
CL-R3-H1 a CL-R3-H4, pero la compuerta solo puede cerrar si Rubén u otra persona del perfil
puede explicar qué hace la actividad y cómo comenzaría. No se autoriza integración.

## Confirmación humana posterior

El formulario SmallDocs recibió a las `2026-08-03T00:55:56.027Z` la respuesta `Sí` de Rubén a
“¿queda claro qué hace la actividad?”, sin observaciones adicionales. Con ello se cierra la
barrera específica detectada por esa misma persona. El ajuste a otros perfiles, tecnologías
de asistencia y contexto disciplinar continúa abierto antes de integrar.
