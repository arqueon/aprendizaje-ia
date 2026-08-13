# UDGIA-021 · evaluación agéntica P2 · ronda 2

**Fecha:** 2026-08-03  
**Artefacto:** paquete preparado `diff-p2/`, todavía no aplicado a `content/` ni `static/`.  
**Método:** segunda lectura independiente con perspectivas simuladas de estudiante móvil,
docente no tecnológica y auditoría técnico-editorial. No son participantes reales ni sustituyen
el VoBo humano de Rubén.

## Dictamen

**PASS, sin hallazgos bloqueantes.** Las tres perspectivas reconstruyen la situación, su
importancia, el ejemplo, la acción, el resultado, los límites y la continuidad. Los seis
bloqueantes de la ronda 1 quedaron resueltos y no aparecieron barreras nuevas.

## Evidencia de cierre

### Perspectiva estudiantil móvil

- Distingue recorrido del ejemplo de 5–10 minutos y aplicación con texto propio de 25–35.
- Reconoce los cuatro pasos y puede dividir el trabajo en dos momentos con guardado voluntario.
- M1, landing y B2 conservan el mismo caso de Renata y la muestra junto al puente.
- El ejemplo modificado prioriza correctamente la comprobación pendiente de la sugerencia 2.
- Resultado, footer y fallback indican qué llevar a la tarea y permiten volver a la guía.

### Perspectiva docente no tecnológica

- Comprende la desalineación entre comparar, practicar y producir evidencia.
- El microejemplo de historia permite transferir la relación fuera de ciencias sin volverla
  universal.
- El resultado se presenta como un primer punto basado en las respuestas, no como certificación.
- Interactivo y fallback regresan a la guía; el programa se mantiene como trabajo en diseño, sin
  oferta o matrícula prometida.

### Auditoría técnico-editorial

- B2 y M6 tienen salida a sus guías en versión interactiva y sin JavaScript.
- La lógica B2 no presenta como pendiente una sugerencia ya modificada o descartada.
- Co-creación persona–IA se condiciona al origen de la sugerencia.
- Los HTML pasan revisión estructural y no conservan el cierre sobrante.
- Los 11 archivos públicos coinciden con los hashes y tamaños de `manifest.yaml`.
- El filtro del overlay comprueba las claves `udgia_` y `udgia021-`; no hubo escritura al cargar.

## QA final

`diff-p2/qa-report.json`, generado `2026-08-04T01:06:45.924Z`, registra:

- `PASS` en raíz y bajo `/aprendizaje-ia/`;
- seis rutas por dos viewports en cada escenario;
- cuatro aliases por escenario;
- enlaces rotos, overflow, consola, red externa y escrituras al cargar: `0`;
- axe grave/crítico: `0`;
- fallback B2 y M6: HTTP `200`;
- B2 y M6 individuales: cuatro escenarios cada uno, sin fallos.

La inyección de axe usa `bypassCSP` solo dentro del contexto de auditoría. Los recorridos
funcionales conservaron recursos propios y cero solicitudes externas.

## Observaciones no bloqueantes que se conservan visibles

- M1 usa “laboratorio breve” como descripción, mientras la landing se titula “laboratorio
  guiado” y declara la duración real.
- La primera explicación B2 dice que la relación “se llama” co-creación; la recapitulación usa la
  cautela más precisa “puede formar parte”.
- M6 promete que la persona “sabrá” qué ajustar; sus límites inmediatos evitan presentarlo como
  certeza, pero puede suavizarse en un lote posterior.

No se aplicó otra optimización después de esta ronda para conservar exactamente el estado
evaluado. Las observaciones pueden aceptarse como menores o convertirse en ajustes solicitados por
Rubén antes de integrar.

## Limitaciones aceptadas

- Sin participantes externos ni prueba de uso real.
- Sin sesión con persona usuaria de lector de pantalla.
- Carga de cohorte y adecuación disciplinar real no verificadas.
- Sin integración, publicación, despliegue, Moodle, commit o `push`.

El paquete queda listo para VoBo humano de aplicación al working tree.

