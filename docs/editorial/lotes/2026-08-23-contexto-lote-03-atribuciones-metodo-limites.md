# Lote de contexto 03 — atribuciones, método y límites en Tendencias y Observatorio

Fecha: 2026-08-23  
Estado: borrador editorial aprobado por Rubén el 2026-08-24 a las 00:58:03 CST; sin publicación ni retirada de rutas

## Alcance

Este lote revisa cinco fuentes preexistentes que ya tenían una decisión humana `cambiar`. No incorpora las demás páginas de Tendencias u Observatorio por cercanía temática: permanecen pendientes de lectura individual.

| Fuente | Función | Problema principal | Decisión vigente |
|---|---|---|---|
| `content/observatorio/_index.md` | Hub del Observatorio | No identificaba públicos ni vinculaba las rutas con decisiones distintas. | `cambiar` |
| `content/observatorio/documentacion/_index.md` | Portada de seguimiento documental | Prometía casos y estrategias validadas que no correspondían con sus destinos reales. | `cambiar` |
| `content/observatorio/estudios/_index.md` | Portada de estudios | Reunía encuesta, ensayo y reseña sin distinguir el tipo de conocimiento que ofrece cada uno. | `cambiar` |
| `content/observatorio/estudios/encuesta-dec-2026/index.md` | Ficha de un informe externo | Omitía método y límites, y convertía cifras UdeG sin fuente localizada en inferencias institucionales. | `cambiar` |
| `content/ia-educacion/tendencias/evaluacion-en-la-era-ia/index.md` | Adaptación de una pieza del DEC | Mezclaba afirmaciones de Liardi con elaboración local y presentaba recomendaciones sin condiciones suficientes. | `cambiar` |

Las cinco rutas se conservan. Los cambios afectan la explicación, la atribución y la forma de acceder al informe DEC; no modifican producción ni autorizan una postura institucional.

## Verificación de fuentes

### Encuesta DEC 2026

Se consultó el PDF en español incluido en `static/files/encuesta_ia_latam_2026.pdf` y la página oficial del Digital Education Council. El informe declara 22,941 respuestas de estudiantes, 7,319 de profesorado y 29 instituciones, para un total de 30,260 respuestas. La Universidad de Guadalajara figura entre las instituciones participantes.

El documento público no presenta un desglose por universidad. Tampoco informa el procedimiento de selección, las fechas del levantamiento, la tasa de respuesta por institución ni una ponderación de resultados. Sus porcentajes describen respuestas declaradas por quienes contestaron; no miden directamente aprendizaje ni permiten estimaciones institucionales.

La versión anterior de la ficha incluía 5,617 estudiantes y 961 docentes de la UdeG, además de dos gráficas construidas con esas cifras. Se buscaron tablas, hojas de cálculo, informes institucionales y otros archivos de datos dentro del proyecto y en `arq-graph`. Solo aparecieron la propia ficha, una lista de tareas y un expediente editorial que repetían los números. Al no localizar una fuente primaria, las gráficas salieron del borrador activo y permanecen completas en rollback. La revisión humana podrá conservar esta decisión o pedir que se restituyan si se aporta la fuente correspondiente.

### Evaluación en la era de la IA

La página original del DEC se publicó el 7 de julio de 2025 y resume una conversación con Vincent Liardi, representante de Pearson. El DEC había anunciado una alianza estratégica con Pearson el 23 de abril de 2025 y ambas organizaciones desarrollaron *The Next Era of Assessment*.

Esta procedencia no invalida el argumento de Liardi. Sí limita su alcance: es una perspectiva institucional interesada, no un estudio de eficacia. La reescritura distingue sus afirmaciones, las traducciones realizadas por el sitio y la elaboración editorial local.

## Cambios editoriales

### 1. Observatorio

El hub identifica ahora a docentes, coordinaciones académicas y personas que investigan la educación. Estudios, Guías y Documentación ya no se describen como tres depósitos similares. Cada ruta corresponde a una decisión: examinar datos y argumentos, elegir un método o seguir fuentes y actores que requieren una revisión posterior.

La nueva redacción elimina la promesa de monitorear “el estado del arte”, porque el sitio no demuestra un procedimiento sistemático de cobertura. También aclara que una referencia documental no certifica eficacia pedagógica.

### 2. Documentación y seguimiento

La portada se alinea con las páginas que contiene: monitoreo de publicaciones, herramientas emergentes y redes de investigación o vinculación. Se retiraron las promesas de experiencias significativas, estrategias validadas, rúbricas y secuencias que no describían la colección real.

La página explica su frontera con otras rutas. Las Guías ofrecen procedimientos de evaluación o documentación; el Laboratorio reúne prácticas para probar una actividad; Documentación ayuda a localizar qué fuente, herramienta o red conviene estudiar antes.

### 3. Estudios, encuestas y hallazgos

La portada distingue explícitamente tres tipos de material. Una encuesta regional describe respuestas declaradas; un ensayo conceptual propone una interpretación; una reseña reconstruye y discute un argumento publicado. Ninguna categoría se presenta como superior a las otras, pero cada una sostiene conclusiones distintas.

La entrada de la encuesta reconoce la participación de la UdeG sin atribuirle porcentajes regionales. Las entradas del ensayo de Simondon y de la reseña sobre revisión por pares declaran su carácter interpretativo y argumental.

### 4. Encuesta DEC 2026

La ficha identifica autor corporativo, fecha de publicación, instituciones colaboradoras y tamaño regional. Incorpora una sección metodológica que diferencia respuestas declaradas, comportamiento observado y resultados de aprendizaje. También enumera la información que el reporte público no ofrece y explica por qué no puede afirmarse representatividad regional o local.

Los resultados seleccionados permanecen atribuidos al DEC: 92 % de uso declarado entre estudiantes, 79 % entre profesorado, 65 % de preocupación por aprendizaje superficial y 56 % por privacidad y equidad en evaluación. Las recomendaciones de gobernanza, formación y rediseño se presentan como interpretación del organismo, no como mandato derivado automáticamente de los porcentajes.

El visor PDF incrustado produjo un rectángulo negro en Chromium, tanto en escritorio como en móvil. Un nuevo ciclo RED–GREEN sustituyó el `iframe` por dos accesos directos: el PDF local y la página oficial. El documento no se retiró.

### 5. Evaluación en la era de la IA

La página separa cuatro capas: procedencia de la fuente, argumento de Liardi, lectura editorial del sitio y decisiones locales. Declara la relación DEC–Pearson y que la pieza no presenta muestra, comparación de grupos o resultados de aprendizaje.

La figura que contrasta producto aislado y proceso revisable se conserva como elaboración editorial. Ahora limita lo que puede inferirse de versiones, verificaciones o defensas: aportan indicios de juicio, pero no demuestran por sí solas aprendizaje transferible.

Las recomendaciones sobre retroalimentación con IA incluyen privacidad, acceso equivalente, revisión humana y responsabilidad docente. La página rechaza registros completos de conversación y decisiones automáticas de calificación. Sus acciones finales se presentan como propuestas del sitio y no como postura oficial de la Universidad de Guadalajara.

## Desarrollo guiado por pruebas

El contrato focal `tools/qa-contexto-lote-03.tmp.mjs` se escribió antes de modificar las fuentes.

1. RED inicial: 28 comprobaciones, 25 fallos. Los fallos correspondían a audiencia ausente, destinos mal descritos, tipos de evidencia mezclados, método no informado, gráficas sin fuente localizada, atribuciones ambiguas y salvaguardas insuficientes.
2. GREEN editorial: 28/28.
3. RED visual: después de detectar el visor PDF negro, se añadió una comprobación nueva. El resultado fue 28 aprobaciones y un fallo específico.
4. GREEN del contenido: 29/29 después de sustituir el visor.
5. RED de reconciliación: la segunda lectura pidió convertir la ficha en Page Bundle, añadir `areas` e incorporar `featured.webp`; el contrato ampliado falló 3/32 por esas ausencias.
6. GREEN final: 32/32 después de migrar la ficha sin cambiar su URL y añadir una miniatura derivada de la portada del informe con procedencia explícita.

Los resultados del contrato temporal y del QA visual se copiaron a evidencia estable. Los dos scripts focales se retiraron después de la última ejecución completa.

## Segunda lectura y reconciliación

Claude Fable revisó las cinco fuentes y el contrato focal en modo de solo lectura: cobertura 6/6, cero bloqueos, cero contradicciones entre archivos y ninguna afirmación clasificada como carente de apoyo o sobredimensionada. Su dictamen fue `ajustar` para la edición y `aprobar` para el control técnico.

Los dos cambios pedidos se referían a la ficha DEC. Fable describió `areas` y `featured.*` como obligaciones generales, aunque `CLAUDE.md` las formula para contenido nuevo. La reconciliación no aceptó esa generalización como regla retroactiva para todo el sitio; sí aceptó resolver esta ficha porque el contrato visual vigente exige reducir, no aumentar, la deuda heredada y la página ya formaba parte del lote.

La ficha pasó de `encuesta-dec-2026.md` a `encuesta-dec-2026/index.md`, pero conserva `/observatorio/estudios/encuesta-dec-2026/`. Su `featured.webp` es una miniatura de la primera página del PDF disponible en el sitio, no una imagen genérica. La propia ficha declara la procedencia y que el documento, los logotipos y las marcas conservan los derechos de sus titulares.

## QA integrado

La versión actual terminó con los siguientes resultados:

- inventario de contenido: 168 documentos y 0 enlaces internos rotos;
- auditoría de contexto: 168 fuentes y 16 candidatas automáticas;
- auditoría de aprendizaje: 168/168;
- lenguaje directo: 5 piezas en PASS;
- contrato visual: 143 páginas y 500 cards con imagen;
- Hugo: 944 páginas, 1,436 archivos estáticos y 251 imágenes procesadas;
- QA visual focal: 10 vistas, 0 fallos;
- axe WCAG A/AA: 0 infracciones;
- consola y errores de página: 0;
- imágenes rotas y desbordamiento horizontal: 0.

El build final está en `/tmp/aprendizaje-ia-contexto-lote-03-final-20260823`. Las advertencias sobre `languageCode`, `.Site.LanguageCode`, `.Site.Data` y compatibilidad declarada de Blowfish con la versión de Hugo son deuda técnica previa; este lote no las relajó ni las atribuye a las reescrituras.

## Reversión y evidencia

- Rollback completo: `docs/editorial/rollback/2026-08-23-contexto-lote-03/`.
- Diff de las cinco fuentes: `docs/editorial/lotes/2026-08-23-contexto-lote-03.diff`.
- Manifiesto de hashes: `docs/editorial/lotes/2026-08-23-contexto-lote-03-manifest.json`.
- Evidencia estable: `docs/design/evidence/contexto-lote-03/`.
- Segunda lectura validada: `docs/editorial/revisiones/2026-08-23-claude-fable-contexto-lote-03.json`.
- Reconciliación compacta: `docs/design/evidence/contexto-lote-03/fable-reconciliation.json`.

La evidencia contiene diez capturas, hojas de contacto, resultados de layout y axe, los ciclos RED–GREEN, el resumen integrado y una matriz de fuentes y límites.

## Decisión humana

Rubén otorgó **VoBo al lote 3** el 2026-08-24 a las 00:58:03 CST. La aprobación cubre las cinco reescrituras, la retirada reversible de las gráficas UdeG sin fuente localizada, la sustitución del visor PDF y la conversión de la ficha DEC en Page Bundle con portada atribuida.

El VoBo aprueba el lote como borrador editorial. No autoriza publicación, retirada de rutas ni cambios en producción, y no se hereda a los lotes 4 y 5.
