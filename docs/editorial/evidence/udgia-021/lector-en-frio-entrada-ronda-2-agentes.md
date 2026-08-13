# UDGIA-021 — segunda revisión simulada de la entrada general

**Artefacto entregado:** únicamente `muestras/entrada-general.md`; los perfiles no recibieron
pasaporte, briefs, auditorías, diagnósticos previos ni explicación del equipo.  
**Tipo de prueba:** tres lectores en frío simulados e independientes. No sustituye una prueba
con personas reales ni una prueba con tecnologías de asistencia.  
**Fecha:** 2026-08-02.

## Perfiles

1. Estudiante universitario que consulta principalmente desde un teléfono y usa asistentes de
   IA, sin formación en diseño instruccional.
2. Docente universitario con experiencia de aula, poco conocimiento técnico de IA y sin
   formación formal en diseño instruccional.
3. Persona universitaria que necesita navegación lineal, encabezados claros, texto alternativo
   y contenido utilizable en pantalla pequeña. Este perfil evaluó el Markdown, no ejecutó un
   lector de pantalla ni inspeccionó el Hugo renderizado.

## Reconstrucción de la idea

Los tres perfiles pudieron explicar con sus propias palabras:

- que una respuesta pulida no demuestra por sí sola comprensión;
- que la persona conserva propósito, comprobación, decisión y responsabilidad;
- que el caso de Mariana muestra una conclusión más amplia de lo que permiten los datos;
- que el primer paso consiste en formular una idea o duda propia antes de solicitar una ayuda
  delimitada;
- que existe una alternativa sin IA mediante fuentes, pares o conclusiones preparadas.

Esto sostiene el cierre local de la reconstrucción básica de M1, pero los tres dictámenes fueron
**comprensible con reservas**.

## Coincidencias de los tres perfiles

| Prioridad | Evidencia del artefacto | Barrera observada | Consecuencia probable |
|---|---|---|---|
| 1 | `## Elige por dónde continuar` aparece antes de `## Cuando la relación se vuelve co-creación` | El selector funciona como cierre antes de una explicación conceptual necesaria | En móvil o navegación lineal, la persona puede seguir un enlace y no leer el último tramo |
| 2 | “La propuesta de Orientaciones sostiene este recorrido…” | “Orientaciones” no se presenta como documento, propuesta o sección; el párrafo comprime seis criterios y tres destinos | El texto deja de ser autosuficiente justo antes del cierre |
| 3 | “Comprueba la afirmación que más podría cambiar tu conclusión” | No se ofrece un criterio para reconocer cuál afirmación es decisiva | La persona sabe que debe comprobar, pero no necesariamente cómo elegir por dónde empezar |

## Reservas secundarias

- Dos perfiles señalaron `prompt` como término evitable o no explicado; otro identificó
  `sistema generativo`. Ambos pueden resolverse con lenguaje cotidiano sin perder precisión.
- El perfil docente entendió “acción” y “evidencia”, pero pidió un ejemplo operativo que las
  convierta en una consigna y una entrega observables.
- El caso de ciencias ambientales fue transferible para los tres perfiles; ninguno lo consideró
  una barrera importante.
- La imagen cuenta con texto alternativo y mediación narrativa suficiente en el Markdown. No se
  verificaron detalle legible en móvil, reflujo, foco, contraste, árbol de accesibilidad ni
  funcionamiento de enlaces en Hugo.

## Ajustes aprobados y aplicados

1. Mover `Cuando la relación se vuelve co-creación` antes de `Elige por dónde continuar`, de
   manera que el selector sea el cierre real.
2. Presentar la propuesta de Orientaciones en una frase autosuficiente y relacionar solo los
   criterios que la página ya desarrolló. No enlazar rutas canónicas que todavía no existen.
3. Añadir un criterio breve para elegir la afirmación decisiva: aquella que, si resulta falsa o
   imprecisa, obligaría a cambiar la conclusión.
4. Añadir un microejemplo docente de acción y evidencia, y sustituir `prompt` por `instrucción`;
   nombrar al inicio “un sistema de IA generativa”.

Rubén autorizó los cuatro ajustes el `2026-08-02T22:44:13.954Z`, únicamente para M1 fuera de
`content/`, y mantuvo la lectura humana antes de cualquier integración. La optimización se
limitó a esos cuatro puntos. Un evaluador separado los dictaminó cerrados en
`evaluacion-ronda-3-entrada.md`.

## Dictamen

La entrada quedó **refinada y en PASS local después de la segunda simulación**. La revisión
permitió continuar sin depender de reclutar lectores inmediatamente. No cierra la validación
humana ni la accesibilidad del soporte final, y no autoriza integración en `content/`, creación
de rutas, publicación, despliegue o cambios en Moodle.
