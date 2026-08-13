# Plan de desbloqueo para producir Orientaciones, Hugo y curso

**Fecha:** 2026-08-03  
**Modo:** copiloto  
**Alcance:** producción local y verificable; publicación, despliegue, Moodle y distribución
requieren autorización propia.

## Objetivo

Eliminar los bloqueos en el orden en que condicionan trabajo posterior. El criterio de prioridad
es dependencia, no visibilidad: primero se fija para quién y bajo qué condiciones se produce;
después se prueba la columna pública; luego se integra una rebanada vertical; finalmente se escala.

## Secuencia crítica

| Prioridad | Bloqueo | Estado | Cierre observable | Qué habilita |
|---|---|---|---|---|
| P0 | Nivel educativo de la primera edición | **Cerrado por instrucción humana:** educación superior | Pasaporte y expediente dicen educación superior sin incluir EMS por defecto | Delimitar casos y lectores |
| P0 | Población inicial, disciplinas y tamaño de cohortes | **Cerrado por VoBo:** dos cohortes de 36–60 y casos multidisciplinares | Decisión registrada; adecuación disciplinar real aún no verificada | Calibración interna y ejemplos adaptables |
| P0 | Modalidad, duración y horas semanales | **Cerrado por VoBo:** virtual acompañada, 12 semanas de 5 horas | Escenario único de primera edición o piloto comparativo explícito | Cerrar carga A8/C7 de forma provisional |
| P0 | Unidad responsable, privacidad y contacto | **Diferido por VoBo:** UDGPlus; instrumento sin distribuir | Responsable y condiciones del instrumento documentados | Pilotar población sin improvisar gobernanza |
| P1 | Comprensibilidad de M1, B2 y M6 | **Cerrado internamente:** tres perspectivas simuladas y VoBo | Evidencia interna y limitación explícita | Cerrar comprensibilidad L1 interna |
| P1 | Accesibilidad técnica | **Cerrado internamente:** teclado, foco, axe, fallback y móvil en PASS | Reportes frescos; lector de pantalla real no verificado y aceptado | Preparar C2 y C3 en contexto Hugo |
| P1 | Procedencia/licencia de raster y visuales | Diferida; raster fuera del primer diff | Primera rebanada sin depender de raster | Integración textual y funcional defendible |
| P2 | Rebanada vertical integrada | **Cerrada localmente:** lote aplicado con VoBo de Rubén | Cuatro páginas y once archivos de M1 + B2 + M6 en el working tree, con backup y hashes | Preparar el siguiente lote sin publicar P2 |
| P2 | QA integral de la rebanada | **PASS en working tree:** dos rondas agénticas y QA técnico aplicado | Raíz/subruta, seis rutas, cuatro aliases, móvil, axe, enlaces, fallback, privacidad y hashes en PASS | Abrir P3 con otra compuerta por lote |
| P3 | Derivación de Orientaciones por audiencia | Parcial | Matriz → guía → página → tarea con función y estatus explícitos | Producción sin copiar ni contradecir |
| P3 | Curso | **Separado de este frente:** reinicio pendiente con un enfoque nuevo | No existe una compuerta vigente del curso | El sitio y las guías continúan sin depender de ese reinicio |
| P4 | Publicación, Moodle y distribución | Fuera del alcance actual | Autorización específica, rollback y QA del destino | Entrega externa |

## Orden de ejecución

### 1. Cerrar P0 en una sola decisión

La decisión recibida el 2026-08-03 fijó dos cohortes separadas de educación superior con núcleo
común, casos multidisciplinares adaptables y revisión por campo, modalidad virtual acompañada,
12 semanas de 5 horas y UDGPlus como unidad responsable. El cierre residual fijó 36–60 personas
por cohorte, 60 minutos de encuentro semanal y 4 horas asincrónicas, y un primer lote con núcleo
común y una aplicación breve por cohorte. Por indicación humana, privacidad y contacto se difieren: el instrumento de
población permanece local y no se distribuye, mientras la preparación de contenidos puede avanzar.

### 2. Ejecutar P1 con el mismo paquete

Usar M1, B2 y M6 como paquete vertical para tres perspectivas simuladas: estudiante móvil,
docente no tecnológico y accesibilidad interna. Cada evaluación explica idea, importancia,
ejemplo, primera acción y barrera. En paralelo se prueban teclado, foco, árbol accesible, modo sin
JavaScript, móvil y conectividad limitada. Rubén aceptó que no habrá participantes externos ni
una prueba real con persona usuaria de lector de pantalla.

El preflight técnico conserva B2 y M6 como HTML nativo: ya tienen fallback y QA, mientras una
conversión inmediata a H5P reabriría dependencias sin resolver una barrera pedagógica. La primera
rebanada no dependerá de los raster `imagegen`; puede publicarse sin hero mientras se decide su
licencia y representación. El dictamen vive en
`evidence/udgia-021/P1-preflight-lectura-accesibilidad-integracion.md`.

### 3. Preparar P2 como diff reversible

P1 cerró en PASS interno con dos rondas. Se prepara ahora un cambio concreto, todavía fuera de
integración automática, para `content/` y rutas. La rebanada mínima une:

- entrada que explica la relación entre Orientaciones, Hugo y curso;
- comparador B2 útil para estudiantes y docentes;
- revisor M6 dirigido a quien diseña actividades;
- enlaces tipados hacia matriz, guías y futuras tareas del curso;
- fallbacks completos y sin recolección silenciosa de datos.

Blog, la agrupación de Formación Docente y la sección Experiencias se atienden en un diff L5
separado. Son deudas reales, pero mezclarlas con la primera prueba impediría atribuir los hallazgos
a la entrada, la interacción o la navegación global.

### 4. Escalar P3 por lotes

Con la rebanada aprobada, Orientaciones alimenta derivados por audiencia, Hugo normaliza L1 y el
curso produce su primer módulo sobre la población confirmada. Cada lote conserva generador y
evaluador separados, dos rondas, medición de carga y el VoBo humano final de Rubén. Cuando aporte
contraste, la evaluación puede usar agentes con perspectivas distintas, siempre rotulados como
simulaciones y nunca como participantes reales.

## Bloqueos que no se “eliminan” por redacción

- La propuesta de Orientaciones no se vuelve política institucional por publicarla.
- Una simulación agéntica no reemplaza participantes, revisores externos ni experiencia de uso real.
- Axe, INFLESZ o un build verde no reemplazan comprensión ni prueba con tecnología de asistencia.
- El curso no puede cerrar carga real sin una cohorte o pilotaje observado.
- Producir localmente no autoriza publicar, desplegar, matricular ni modificar Moodle.

## Próximo gate

P2 quedó aplicado al working tree y pasó QA reproducible sobre `content/` y `static/` reales.
El curso se separó de este plan por decisión de Rubén y se reiniciará con un enfoque nuevo. La
muestra reciente de M1 se retiró del curso oculto `UDGIA-LAB` de moodle-dev; la sección 2 y la
Página cmid 76 ya no existen, mientras que M3 se conserva. No hay una siguiente compuerta del curso
hasta definir el nuevo enfoque. El sitio Hugo, las guías y el estado de P2 permanecen vigentes.
Siguen sin autorizarse commit, push, publicación, despliegue, Moodle institucional, matrícula,
distribución del instrumento de población ni aplicación automática de las cinco páginas L1 staged.
