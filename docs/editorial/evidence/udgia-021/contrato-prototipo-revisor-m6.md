# UDGIA-021 — contrato del prototipo “¿Tu actividad pide, practica y revisa lo mismo?”

**Estado:** listo para producción local; no integrable.  
**Fecha:** 2026-08-02.

## Función pública

Una persona docente lleva una actividad propia o usa un caso ficticio. Escribe qué quiere que
el grupo aprenda a hacer, qué hará al final, cómo lo practicará y qué ayuda estará disponible.
Después responde cuatro preguntas y obtiene un primer punto para volver a mirar.

El prototipo no califica, no interpreta el texto ni certifica la actividad. Ordena la revisión
que la persona ya realizó y propone un cambio concreto. Bloom, diseño inverso, propósito,
evidencia, experiencia y asistencia permanecen en este expediente; no son los rótulos de la
experiencia pública.

## Evidencia que debe producir

- cuatro descripciones: propósito, evidencia, experiencia y asistencia;
- una alternativa equivalente sin IA;
- cuatro juicios explícitos sobre las relaciones de la cadena;
- una síntesis imprimible que identifica el primer enlace marcado como `no` o `no estoy
  seguro`, o declara que no se señaló una ruptura sin convertirlo en aprobación.

## Recorrido

1. Un caso completo muestra que querer una comparación no basta si el grupo solo lee y elige.
2. La persona elige usar ese caso o empieza con una actividad propia.
3. Completa cinco frases en lenguaje cotidiano, con ejemplos visibles.
4. Responde cuatro preguntas en el orden en que ocurre la actividad.
5. Recibe una sugerencia basada únicamente en sus respuestas.
6. Puede imprimir, guardar de forma voluntaria en el dispositivo o borrar el borrador.

## Contrato técnico y de accesibilidad

- HTML semántico, CSS y JavaScript nativos; sin dependencias ni solicitudes externas.
- Rutas relativas para funcionar en raíz, subruta y archivo local.
- Controles nativos, etiquetas persistentes, `fieldset` y `legend`; sin arrastrar.
- Resumen de errores enfocable y resultado con `aria-live` y foco gestionado.
- Significado acompañado por palabras e iconos, nunca solo por color.
- Reflujo a 320 px, zoom 200 %, foco visible y `prefers-reduced-motion`.
- Impresión en una sola secuencia legible; controles de interfaz ocultos al imprimir.
- `noscript` enlaza a una hoja completa sin JavaScript.
- El borrador vive en memoria salvo que la persona elija guardarlo en `localStorage`.
- Guardado, recuperación y borrado se explican en pantalla; no hay analítica ni envío.
- Las entradas se insertan con `textContent`; no se interpreta HTML del usuario.

## Límites

La calidad disciplinar de una actividad no puede inferirse mediante estas comprobaciones. La
retroalimentación es orientadora y depende de la honestidad del juicio de la persona. El
prototipo no sustituye revisión docente, validación de accesibilidad con tecnologías de apoyo
ni prueba con usuarios reales. La primera lectura humana detectó falta de claridad; Rubén
confirmó después que la versión reescrita ya se entiende. Aún faltan otros perfiles y cualquier
VoBo específico de integración.
