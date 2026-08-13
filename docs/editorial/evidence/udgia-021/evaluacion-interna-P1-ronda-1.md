# UDGIA-021 — evaluación interna P1, ronda 1

**Fecha:** 2026-08-03  
**Rol:** evaluación separada; esta ronda no reescribe artefactos públicos.  
**Alcance:** M1 entrada, B2 comparador y M6 revisor.  
**Método aprobado:** perspectivas simuladas y VoBo final de Rubén; no es estudio con usuarios.

## Evidencia examinada

- `muestras/entrada-general.md` y su paquete SmallDocs vigente.
- `prototipos/comparador-sugerencias-b2/`, incluida ejecución fresca de `qa.mjs`.
- `prototipos/revisor-alineacion-m6/`, incluida ejecución fresca de `qa.mjs`.
- `npm run qa:learning-audit`: inventario vigente de 158 piezas.
- VoBo `.sdocs/UDGIA-021-vobo-P1-validacion-interna.md`, envío
  `2026-08-04T00:32:20.680Z`.

## Lecturas simuladas

| Perspectiva | M1 | B2 | M6 | Dictamen |
|---|---|---|---|---|
| Estudiante en móvil | Puede reconstruir que una respuesta pulida no basta, recuerda el caso del agua y empieza por propósito y primer intento; reconoce alternativa sin IA. | El origen de las sugerencias, el propósito, las cuatro decisiones y el antes/después son explícitos. | Reconoce que se dirige a quien diseña una actividad; no necesita completarlo como tarea propia. | Comprensible; la continuidad entre piezas debe añadirse en P2. |
| Docente no tecnológico | Distingue producto y evidencia de proceso y encuentra un microejemplo aplicable. | Puede usarlo con un borrador propio o como modelo para estudiantes. | El caso “quieres que comparen, pero solo les pides elegir” prepara las cuatro relaciones antes de cualquier término técnico. | Comprensible y transferible. |
| Accesibilidad interna | Encabezados y equivalente textual permiten seguir la explicación; la experiencia real con lector de pantalla queda no verificada. | Skip link, etiquetas, fieldsets, leyendas, foco en errores/resultado, fallback e impresión están presentes. | Mantiene la misma estructura semántica, alternativa sin JavaScript y ayuda equivalente sin IA. | PASS técnico; no equivale a una sesión real de tecnología de asistencia. |

## Pruebas frescas

B2 y M6 pasaron en raíz y subruta, escritorio claro, móvil oscuro a 320 px, teclado, foco,
axe con cero violaciones, consola y red externa con cero incidencias, sin desbordamiento,
fallback sin JavaScript, impresión y almacenamiento bloqueado. La primera ejecución chocó con
la restricción del sandbox de Chromium; la repetición autorizada fuera de esa restricción pasó.

## Hallazgos del evaluador

1. **P1-01 — evidencia no persistida en M6.** `qa.mjs` imprime un PASS fresco, pero no actualiza
   `qa-report.json`; el reporte observado en disco conserva una fecha anterior. Debe persistirse
   igual que en B2 antes de cerrar P1.
2. **P1-02 — protocolo desactualizado.** El paquete de coordinación todavía exige tres personas
   externas, en contradicción con el VoBo recibido. Debe registrar tres perspectivas simuladas,
   dos rondas internas, la limitación aceptada y el VoBo de Rubén.
3. **P1-03 — continuidad pendiente de integración.** Los prototipos autónomos no enlazan todavía
   M1, Orientaciones, guías y curso. No bloquea la claridad local; se convierte en criterio
   obligatorio del diff P2.

## Dictamen de ronda 1

Los tres artefactos públicos conservan dirección y claridad. P1 no puede cerrarse todavía por
P1-01 y P1-02. El optimizador debe atender únicamente esos dos hallazgos; P1-03 se conserva como
criterio de aceptación de P2. La ausencia de lector de pantalla real no se declara resuelta:
queda aceptada por el VoBo como limitación de la validación interna.
