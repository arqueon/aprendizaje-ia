# UDGIA-021 — auditoría de continuidad de M2–M6

**Fecha:** 2026-08-02  
**Estado:** diagnóstico local; optimización pendiente de VoBo  
**Alcance:** cinco muestras fuera de `content/` y sus seis SVG; sin integración, rutas,
publicación, despliegue ni Moodle.

## Propósito y método

Esta evaluación contrasta las páginas de co-creación, aprendizaje activo, aprendizaje
híbrido, SAMR/ICAP y Bloom/diseño inverso con el cierre ya refinado de la entrada general.
Se revisaron continuidad narrativa, primera acción, mediación de fuentes, función de los
visuales, navegación y oportunidades de interacción. La evaluación registra hallazgos; no
reescribe las muestras ni se autoaprueba.

## Dictamen

Las cinco páginas tienen una base conceptual y didáctica utilizable. Parten de situaciones,
explican relaciones, desarrollan ejemplos, incluyen alternativas sin IA y evitan convertir
Bloom, SAMR e ICAP en una sola jerarquía. Sus diagramas no son portadas genéricas: cada uno
responde una pregunta de comprensión y ya forma parte del sistema visual objetivo.

El problema transversal está en el cierre. En las cinco páginas la recapitulación aparece
después de `Cómo continuar`; en una lectura lineal, especialmente móvil, la navegación puede
interrumpir la síntesis. También varía la explicación del estatus de la propuesta de
Orientaciones y de las guías. M6, como final de la columna, ofrece una acción y un enlace de
regreso, pero todavía no conduce a una aplicación o guía pública recuperable.

## Matriz de hallazgos

| Muestra | Lo que funciona | Ajuste local recomendado | Prioridad |
|---|---|---|---|
| M2 · Co-creación | Caso de dos sugerencias, decisión humana y rastro de cambio | Nombrar desde el inicio “sistema de IA generativa”; mediar estatus de Orientaciones/guía; mover recapitulación antes de navegar | Alta |
| M3 · Aprendizaje activo | Distingue acción visible, elaboración e interacción humana; el chat no se confunde con ICAP interactivo | Mediar estatus de fuente y guía; mover recapitulación antes de navegar | Alta |
| M4 · Aprendizaje híbrido | Es la secuencia más madura; conecta lo que cada momento recibe y produce; conserva alternativa equivalente | Hacer principal la continuidad hacia SAMR/ICAP y secundaria la vuelta a aprendizaje activo; mover recapitulación antes de navegar | Alta |
| M5 · SAMR/ICAP | Separa con precisión cambio de tarea y conducta cognitiva; declara que SAMR es complementario | Añadir estatus no normativo de la propuesta sin recargar; mover recapitulación antes de navegar | Alta |
| M6 · Bloom/diseño inverso | Caso antes/después y cadena propósito–evidencia–experiencia–asistencia | Nombrar “sistema de IA generativa”; mediar estatus; cerrar con una acción aplicable y dejar explícita la futura continuidad hacia guía | Alta |

## Continuidad de la columna

La secuencia conceptual es coherente:

1. la entrada pregunta quién conserva propósito y criterio;
2. co-creación observa quién decide;
3. aprendizaje activo mira qué produce la persona con las ideas;
4. aprendizaje híbrido conecta ese trabajo entre momentos;
5. SAMR/ICAP separa transformación de tarea y conducta;
6. Bloom/diseño inverso alinea propósito, evidencia, experiencia y asistencia.

La navegación actual conserva esa progresión, con enlaces de regreso útiles en M4 y M6. El
último nodo, sin embargo, queda editorialmente abierto: mientras no existan las rutas públicas
aprobadas en el contrato, M6 debe ofrecer una acción autosuficiente y declarar que la guía será
el destino posterior, sin inventar un enlace.

## Sistema visual

Los cinco conceptos usan una familia reconocible: papel cálido, azul tinta, almagre, verde
olivo, tarjetas redondeadas y tipografías Lora/Inter. Cada SVG tiene `title`, `desc`,
`role="img"` y `aria-labelledby`; la codificación por color se acompaña con texto, número o
etiqueta. Los seis archivos son XML válido.

No se recomienda sustituir estos diagramas. Funcionan como estándar para relaciones
conceptuales y contrastan con las portadas heredadas genéricas que sí pertenecen al frente de
saneamiento visual. La pieza híbrida dispone de composición ancha y variante móvil; su futura
integración debe seleccionar ambas de forma responsiva. Orden de foco, reflujo real, lector de
pantalla, teclado y equivalente dentro de Hugo siguen sin verificarse.

## Interacciones candidatas

Estas propuestas son briefs, no desarrollos autorizados:

| Muestra | Interacción con función didáctica | Evidencia o salida | Fallback |
|---|---|---|---|
| M2 | Comparar dos versiones y aceptar, transformar o descartar aportes | Cambio, razón y comprobación | Tabla editable o imprimible |
| M3 | Reformular una consigna para que la persona genere y revise algo | Primer intento, producto observable y criterio | Plantilla de cuatro preguntas |
| M4 | Conectar lo que cada momento recibe, transforma y entrega | Secuencia funcional anotada | Lista de comprobación |
| M5 | Diagnosticar por separado cambio de tarea y conducta cognitiva | Dos diagnósticos con evidencia | Matriz de dos columnas |
| M6 | Revisar la cadena propósito–evidencia–experiencia–asistencia | Ruptura detectada y ajuste justificado | Hoja de revisión de cuatro pasos |

M6 ofrece el mayor valor para un primer brief interactivo porque convierte la síntesis del
recorrido en una decisión observable. Ninguna interacción debe recopilar datos personales,
borradores o instrucciones del usuario. Todas requieren teclado, estado local, alternativa
sin JavaScript, versión imprimible, móvil, contraste AA, raíz/subruta y, si se usa H5P,
procedencia, licencia y versión registradas.

## Lote A recomendado para VoBo

1. Mover en M2–M6 cada recapitulación antes de `Cómo continuar`, de modo que la navegación sea
   el cierre real.
2. Mediar de forma breve y no formularia qué es la propuesta de Orientaciones, aclarar que no
   es una norma institucional vigente y explicar cómo la guía traduce el criterio a una
   acción.
3. Cambiar `sistema generativo` por `sistema de IA generativa` en M2 y M6.
4. En M4, presentar SAMR/ICAP como continuidad principal y aprendizaje activo como regreso
   opcional.
5. En M6, terminar con una aplicación concreta de las cuatro preguntas y conservar el enlace
   de regreso; registrar la guía futura sin crear una ruta inexistente.

El lote conserva los SVG actuales y no crea interacciones. Los briefs interactivos pueden
documentarse después como lote B, todavía sin implementación.

## Evidencia técnica y límites

- Auditor de lenguaje público en M2–M6: `0 bloqueos; 0 fragmentos para revisión humana`.
- `xmllint --noout` en los seis SVG: `PASS`.
- Inventario de contenido: `158` documentos y `0` enlaces internos rotos.
- La lectura humana está diferida, no cancelada. Sigue siendo necesaria antes de integrar o
  publicar.
- No se modificó `content/`; este diagnóstico no autoriza rutas, Git, publicación, despliegue
  ni Moodle.

## Resultado después del VoBo

Rubén autorizó el lote A, la preparación de briefs B2–B6, la conservación de los SVG y el
aplazamiento de la lectura humana hasta la etapa previa a integración. Los cinco ajustes se
aplicaron únicamente a las muestras locales. La ronda 1 detectó una discordancia singular/
plural en la referencia a la guía docente de M6; se corrigió y la ronda 2 quedó en `PASS`.

La implementación solicitada se entiende dentro de los límites del formulario: los briefs ya
están especificados, pero no se construyeron H5P ni componentes. `content/`, rutas, Git,
publicación, despliegue y Moodle siguen fuera de alcance.
