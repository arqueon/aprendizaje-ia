# UDGIA-021 — preflight P1 de lectura, accesibilidad e integración

**Fecha:** 2026-08-03  
**Estado:** P0 cerrado; validación interna P1 autorizada y en ejecución.  
**Efecto:** no modifica `content/`, rutas, H5P, Moodle ni publicación.

## Resultado

P1 avanza con las dos cohortes separadas, modalidad virtual acompañada y calendario de 12 semanas.
Por VoBo de Rubén, se cierra mediante tres perspectivas simuladas, dos rondas técnicas y aprobación
humana final. No se presenta como estudio con personas usuarias.

## Artefactos de la rebanada vertical

| Pieza | Estado actual | Evidencia disponible | Deuda antes de integrar |
|---|---|---|---|
| M1 · entrada conceptual | Muestra local refinada | Prosa pública, equivalente, escena amplia/móvil y paquete SmallDocs de entrada | Validación interna; decisión visual diferida |
| B2 · comparar sugerencias | HTML nativo v2.1 en PASS | Interacción, fallback, impresión, móvil, teclado, axe, privacidad y dos lecturas de Rubén | Validación interna y prueba dentro de Hugo |
| M6 · revisar coherencia de una actividad | HTML nativo reescrito en PASS | Interacción, fallback, impresión, móvil, teclado, axe y claridad confirmada por Rubén | Validación interna y prueba dentro de Hugo |

Los dos `qa-report.json` vigentes declaran `PASS`. Chromium está disponible en el entorno; Orca
no está instalado. Esto permite repetir QA automatizado y revisar orden del DOM, pero no simular
honestamente la experiencia de una persona usuaria de lector de pantalla.

## Decisiones técnicas para reducir la ruta crítica

### Conservar HTML nativo como candidato de integración

B2 y M6 ya cumplen el contrato funcional sin una biblioteca nueva. Convertirlos ahora a H5P
reabriría semántica, empaquetado, dependencias y mantenimiento sin cerrar una barrera de
aprendizaje. H5P permanece disponible para otras piezas cuando aporte una función comprobable.

### No hacer depender la primera rebanada de los raster

Las escenas `imagegen` tienen prompt, hash, dimensiones, alt provisional y presupuesto de peso,
pero su licencia/uso y representación humana siguen pendientes. El estándar permite páginas sin
portada. El primer diff puede omitir raster y conservar prosa, SVG o ausencia de hero. La decisión
de licencia no desaparece; deja de bloquear la rebanada mínima.

### Posponer navegación global a L5

Blog fuera del menú, Formación Docente plana y Experiencias vacía son deudas reales, pero no
impiden probar M1+B2+M6. Se prepararán como un diff de navegación separado después de validar la
entrada, para no mezclar comprensibilidad, interacción y reorganización global en un solo cambio.

## Paquete de validación interna

El protocolo existente `kit-lectura-humana.md` conserva preguntas y criterios, aplicados ahora a:

1. perspectiva de estudiante de educación superior en móvil con M1 y B2;
2. perspectiva de docente de un campo no tecnológico con M1 y M6;
3. accesibilidad interna con M1, B2 y M6.

Cada evaluación registra tema, importancia, ejemplo, primera acción, alternativa sin IA y
barreras. Una observación bloqueante se corrige aunque las otras perspectivas no la compartan.
La ausencia de lector de pantalla real queda registrada como limitación aceptada, no como PASS.

## Cierre P1

P1 cerrará cuando:

- las tres perspectivas hayan documentado evidencia sobre M1, B2 y M6;
- teclado, semántica, foco y árbol accesible pasen la revisión interna;
- fallback, móvil, raíz/subruta, tema claro/oscuro, impresión y privacidad permanezcan en PASS;
- toda barrera humana tenga corrección y segunda lectura;
- exista un diff concreto y reversible para VoBo de integración.

El paquete de coordinación vive en `.sdocs/UDGIA-021-paquete-coordinacion-P1.md`; el VoBo recibido
vive en `.sdocs/UDGIA-021-vobo-P1-validacion-interna.md`. El instrumento externo preparado antes
del cambio de método no se utilizó.
