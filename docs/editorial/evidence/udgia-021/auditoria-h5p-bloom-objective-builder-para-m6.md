# UDGIA-021 — auditoría del H5P BloomObjectiveBuilder para el revisor M6

**Fecha:** 2026-08-02  
**Rol:** evaluación técnica y didáctica; no modifica la biblioteca.  
**Artefacto:** `H5P.BloomObjectiveBuilder` 1.0.3 del repositorio.

## Dictamen

La biblioteca existente es un constructor funcional de objetivos. Tiene controles nativos,
estados `aria-pressed`, regiones `aria-live`, foco visible, diseño móvil, escape de entradas y
estado H5P. Es aprovechable para su propósito original, pero **no cumple el brief B6** y no se
debe convertir en el revisor de alineación mediante un parche menor.

## Evidencia

| Criterio B6 | Evidencia en la biblioteca | Dictamen |
|---|---|---|
| Empezar por un caso y por lo que se quiere observar | `Paso 1` pide seleccionar un nivel de Bloom | No cumple |
| Juzgar la tarea completa y no el verbo | `Paso 2` ofrece un banco de verbos ligado al nivel seleccionado | No cumple |
| Revisar propósito, evidencia, experiencia y asistencia | El estado contiene objetivo, condición, criterio y evidencia; no contiene experiencia ni asistencia | No cumple |
| Detectar el primer enlace roto | `checks()` cuenta componentes completos; no contrasta relaciones | No cumple |
| No certificar alineación por completitud | Copiar y guardar se habilitan con tres de cuatro comprobaciones; la evidencia no integra el puntaje | No cumple |
| Evitar jerarquía rígida | La cabecera muestra seis círculos ascendentes y el texto “De recuperar… a producir…” | No cumple |
| Conservar alternativa sin IA | No existe un campo ni una comprobación equivalente | No cumple |
| Datos solo en el dispositivo | El estado puede persistir mediante el mecanismo H5P del LMS | Cumple para H5P, no para el contrato local de privacidad |

## Decisión técnica

Se conserva `H5P.BloomObjectiveBuilder` sin cambios. El prototipo M6 será HTML, CSS y
JavaScript nativos, autónomo y local. No clasificará una respuesta semánticamente ni asignará
puntaje: la persona revisará cada relación y el sistema localizará el primer `no` o `no estoy
seguro` declarado.

Si el prototipo se valida y después se decide llevarlo a H5P, convendrá valorar una biblioteca
nueva o una versión mayor con migración explícita. Esa decisión queda fuera del alcance actual.

