# Lote 05 — procedencia y función de cuatro prácticas cuestionadas

Fecha: 2026-08-24  
Estado: investigación y propuesta verificadas; listas para VoBo  
Copia de trabajo: `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`  
Producción: sin cambios

## Pregunta editorial

Las cuatro páginas se presentan como prácticas implementadas, pilotos o casos documentados. Para conservar ese estatuto deberían permitir identificar, al menos, curso, docente, fecha, materiales, instrumento, participantes y procedencia de los resultados. Si esa documentación no existe, la página debe presentarse como actividad propuesta o salir temporalmente del sitio activo.

## Fuentes revisadas

La revisión incluyó:

1. las cuatro páginas activas y su registro en `data/editorial/context-audit-decisions.json`;
2. las guías metodológicas relacionadas y las dieciséis líneas citantes, distribuidas en catorce páginas;
3. el árbol local de `Projects`, `arq-graph` y los inventarios editoriales;
4. el historial completo del repositorio público, clonado en `/tmp/aprendizaje-ia-history-lote05-20260824` solo para lectura;
5. búsquedas web entre comillas de cuatro frases distintivas y de los porcentajes `72 %` y `78 %`.

La carpeta académica completa no está montada en Sinopé. Esa limitación queda declarada: no se revisaron archivos que solo existan en otro equipo o en una ruta remota no sincronizada. El material disponible no contiene un expediente docente independiente para ninguna de las cuatro páginas.

## Resultado de procedencia

### Debate socrático

El texto con `n=32` y `78 %` aparece desde el commit que creó la arquitectura por tipos el 4 de marzo de 2026. El mensaje de ese commit dice “Post de ejemplo para cada tipo de contenido” y registra coautoría de Claude Sonnet 4.6.[1][3] El historial no contiene encuesta, rúbrica aplicada, base de datos ni comparación con el semestre anterior. Por tanto, los valores no pueden presentarse como resultado observado.

### ABP, aprendizaje activo y evaluación formativa

Las tres páginas entraron juntas el 14 de abril de 2026 en un cambio de 957 adiciones que también creó sus tres guías y las seis imágenes destacadas de esas páginas, dentro de diez PNG añadidos por el commit. El mensaje describe el lote como nuevas guías y prácticas, pero no identifica una aplicación docente ni añade archivos de datos, instrumentos o anexos.[2][4] Las frases sobre “primera implementación”, “tres sesiones” y “un semestre” aparecen desde la creación de cada archivo; no fueron incorporadas después de una evaluación.

Las búsquedas exactas no localizaron una publicación externa que corresponda a esos grupos o resultados. Los porcentajes arrojaron coincidencias sobre otras encuestas, no sobre las prácticas del sitio. La conclusión no es que las secuencias sean pedagógicamente imposibles, sino que no existe base para llamarlas casos implementados.

## Comparación funcional

La similitud de vocabulario entre guía y práctica es de 19 % a 24 % según conjuntos de términos; esa cifra no decide nada por sí sola. La revisión funcional muestra diferencias más útiles:

| Familia | Lo que ya ofrece la guía | Lo propio de la práctica | Decisión propuesta |
|---|---|---|---|
| ABP | Fases, protocolos, ejemplos de prompts y lista de verificación | Calendario de 14 semanas, entregas y ponderación | `cambiar` |
| Aprendizaje activo | Los mismos tres formatos: caso, simulación y *think-pair-share*; además incluye ejemplos | Tiempos de tres sesiones, pero sin el caso, los roles ni las preguntas usadas | `quitar/cuarentena` |
| Debate socrático | No hay una guía canónica equivalente | Secuencia de preparación, diálogo, debate y reflexión | `cambiar` |
| Evaluación formativa | Marco, instrumentos, portafolio, prompt, proporcionalidad y privacidad | Secuencia de cuatro semanas, tabla de decisiones y ponderación | `cambiar` |

## Decisión propuesta por página

### 1. `laboratorio/practicas/abp-con-ia/` — cambiar

**Conservar:** la planificación de 14 semanas, las entregas y la rúbrica ponderada (`L56–99`).

**Cambiar:**

- título y descripción: “Plantilla de proyecto ABP con IA para 14 semanas”;
- estado: `propuesta`, no práctica documentada;
- el grupo de 28 estudiantes y la historia previa sin procedencia (`L27–29`) por condiciones que el docente debe definir;
- incorporar un problema inicial completo para que el calendario pueda probarse sin pedir al docente que invente el caso;
- la sección de resultados (`L105–113`) por preguntas de revisión después de aplicar la propuesta;
- los logs completos por una bitácora breve de fuentes, decisiones y cambios;
- describir una alternativa sin IA basada en fuentes, revisión entre pares y asesoría docente;
- declarar riesgos y condiciones de aplicación: exposición de datos, delegación del análisis, referencias inventadas y acceso desigual a herramientas;
- las cuatro referencias entrantes para que digan “plantilla” o “actividad propuesta”, nunca “caso real”.

Esta página es una derivación práctica de la guía, no su duplicado: la guía explica el método y la página permite planificar un semestre.

### 2. `laboratorio/practicas/aprendizaje-activo-ia/` — quitar/cuarentena

La práctica enumera exactamente las actividades que la guía ya explica (`guia L65–107`), pero no muestra los materiales que harían replicables sus tres sesiones: caso, escenario, roles y preguntas (`práctica L54, L66 y L77`). Sus observaciones (`L107–113`) tampoco tienen fuente.

**Acción propuesta:**

- mover `index.md` e imagen a cuarentena editorial, sin borrarlos;
- añadir la ruta antigua como alias de `/ia-educacion/guias/aprendizaje-activo-con-ia/`;
- corregir las dos referencias entrantes;
- conservar en rollback los tiempos de sesión por si un futuro caso documentado aporta materiales reales.

### 3. `laboratorio/practicas/debate-socratico-con-ia/` — cambiar

**Conservar:** la secuencia individual, diálogo, debate y reflexión (`L49–63`). No hay otra página que cumpla esa función.

**Cambiar:**

- título y estado: “Actividad propuesta: preparar un debate socrático con IA”;
- eliminar el grupo de 32, el `78 %` y la comparación con otro semestre (`L29` y `L85–87`);
- añadir una tesis inicial de ejemplo y los descriptores de la rúbrica analítica cuya tabla de criterios y pesos ya existe;
- sustituir la conversación completa y la “evidencia pública” (`L54–58`) por dos objeciones seleccionadas, la respuesta del estudiante y una nota sobre qué cambió;
- ofrecer una alternativa sin IA con una persona compañera como contraparte;
- corregir cinco referencias entrantes para que hablen de actividad propuesta.

### 4. `laboratorio/practicas/evaluacion-formativa-asistida-ia/` — cambiar

La página ya declara `prototipo-escenario` (`L27` y `L49–53`), pero luego afirma una aplicación semestral, `72 %` y mejoras consistentes (`L149–156`). Esa contradicción debe desaparecer.

**Conservar:** la secuencia de cuatro semanas, la tabla de decisiones y la ponderación (`L85–145`).

**Cambiar:**

- título: “Actividad propuesta: portafolio iterativo con retroalimentación de IA”;
- retirar el grupo ficticio y todos los resultados atribuidos;
- sustituir `[pegar rúbrica]` y `[Pegar texto]` por una rúbrica breve y un fragmento inicial de ejemplo que no contenga datos personales;
- pedir versiones, dos decisiones justificadas y reflexión, no conversaciones completas (`L104` y `L118`);
- ofrecer una alternativa sin IA mediante retroalimentación entre pares con la misma rúbrica y el mismo número de revisiones;
- declarar riesgos y condiciones de aplicación: privacidad de borradores, retroalimentación errónea, homogeneización de la voz y carga desproporcionada de documentación;
- cambiar las cinco referencias entrantes de “implementación/caso real” a “actividad propuesta”.

La guía seguirá siendo la explicación canónica; esta página será su aplicación de cuatro semanas.

## Dependencias que deben corregirse

Hay dieciséis líneas citantes distribuidas en catorce páginas. Una misma línea de la guía de documentación enlaza tres prácticas y se cuenta en cada ruta afectada:

| Ruta | Enlaces entrantes | Tratamiento |
|---|---:|---|
| ABP | 4 | Mantener ruta; cambiar “caso real” o “operativo en aula” por “plantilla propuesta”. |
| Aprendizaje activo | 2 | Apuntar a la guía canónica y preservar alias. |
| Debate socrático | 5 | Mantener ruta; cambiar “caso documentado” o “ya funciona” por “actividad propuesta”. |
| Evaluación formativa | 5 | Mantener ruta; cambiar “implementación/caso real” por “actividad propuesta”. |

La dependencia más delicada es `observatorio/guias/documentacion-buenas-practicas-ia/index.md:38`: presenta ABP, debate y evaluación formativa como modelos que ya cumplen la plantilla de documentación. Esa frase debe dejar de usarlas como referente empírico. Puede enlazar las versiones reescritas únicamente como ejemplos de **estado declarado** —plantilla o actividad propuesta— y debe remitir a futuras prácticas documentadas solo cuando exista un expediente verificable.

La reescritura del portafolio debe conservar el identificador `practice.portafolio-proceso`: la práctica lo define y la guía canónica `assessment.basada-en-procesos` lo referencia mediante una relación `continua`. No se relajará `qa:ecosistema`; esa deuda seguirá separada si depende de rutas externas ausentes.

## Implementación si recibe VoBo

1. preservar las cuatro páginas, imágenes, inventarios y dieciséis líneas citantes en rollback;
2. escribir una prueba RED para estado de evidencia, ausencia de cifras, privacidad, aliases y referencias entrantes;
3. reescribir ABP, debate y portafolios como propuestas completas;
4. mover aprendizaje activo a cuarentena y redirigir su URL a la guía;
5. reconciliar inventario y actualizar explícitamente `context-audit-decisions.json`: tres decisiones pasan de `quitar` a `cambiar` por la rama ya prevista “convertirla honestamente en escenario”; aprendizaje activo conserva `quitar/cuarentena`;
6. ejecutar QA focal, inventario, contexto, aprendizaje, rutas, contrato visual y build;
7. revisar escritorio, móvil, axe, consola y las cuatro rutas antiguas;
8. realizar segunda lectura independiente;
9. presentar el borrador para VoBo específico del lote 5.

El VoBo de esta propuesta no autorizaría publicación, eliminación definitiva ni la presentación futura de resultados sin expediente de procedencia.

## Segunda lectura independiente

Claude Code `claude-fable-5` revisó el expediente, las cuatro prácticas, tres guías, el ledger humano, los commits y los archivos de evidencia. El primer dictamen fue `adjust`: confirmó la procedencia y las cuatro decisiones, pero detectó que el censo tenía trece referencias en lugar de dieciséis líneas citantes, pidió tratar expresamente la guía de documentación y completar los requisitos del estado `propuesta` en ABP y evaluación formativa.

Después de corregir esos puntos, la reconciliación verificó seis controles y emitió `approve`, sin bloqueos ni cambios obligatorios. Los dictámenes están en:

- `docs/editorial/revisiones/2026-08-24-claude-fable-contexto-lote-05.json`;
- `docs/editorial/revisiones/2026-08-24-claude-fable-contexto-lote-05-reconciliacion.json`.

## Sources

[1] https://github.com/arqueon/aprendizaje-ia/commit/80496da95880fc8a072604771bdcbc9200d24047 — Commit: archetypes y estructura de contenido por tipo (4 marzo 2026)
    > "16 files changed"
[2] https://github.com/arqueon/aprendizaje-ia/commit/6421c3ce5640040a12a33f820e314cacaa1ee69f — Commit: new content guides and practices (14 abril 2026)
    > "22 files changed"
[3] https://api.github.com/repos/arqueon/aprendizaje-ia/commits/80496da95880fc8a072604771bdcbc9200d24047 — GitHub API — commit 80496da
    > "Post de ejemplo para cada tipo de contenido"
    > "Co-Authored-By: Claude Sonnet 4.6"
[4] https://api.github.com/repos/arqueon/aprendizaje-ia/commits/6421c3ce5640040a12a33f820e314cacaa1ee69f — GitHub API — commit 6421c3c
    > "feat: add new content guides and practices, remove deprecated blog and lab files, and update project documentation."
