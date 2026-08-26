---
title: "Revisión local del curso Diseño inverso y cocreación con IA"
date: 2026-08-25
status: verificado-localmente
publication_authorized: false
---

# Revisión local del curso Diseño inverso y cocreación con IA

## Resultado

La corrección integrada conserva las doce lecciones sustantivas y la autoevaluación final de la fuente, así como la progresión entre aprendizaje activo e híbrido, diseño inverso, literacidades y cocreación con IA, diagnóstico, resultados, evidencias, secuencias, análisis de casos, priorización y mejora. La idea rectora permanece delimitada: la IA puede ampliar opciones durante el diseño, pero el propósito, la comprobación, la decisión y la responsabilidad corresponden a las personas y a las instancias educativas pertinentes.

El curso es abierto y no califica. No solicita cuenta, no envía respuestas, no guarda intentos y no presenta la actividad como evidencia suficiente de aprendizaje. La portada ahora explica qué integra la ficha de trabajo anunciada —contexto, resultado, evidencia, criterios, secuencia, uso o no uso de IA y revisión— y en qué momentos se completa. La ficha sigue siendo un producto para valoración humana situada, no un formulario oculto ni una entrega automática.

## Correcciones editoriales y de fuentes

La edición eliminó referencias públicas a la cocina de producción y a figuras que no aparecían en las páginas. Completó las descripciones truncadas, normalizó instrucciones y objetivos, distinguió el compromiso cognitivo del mero movimiento, y explicó Bloom como vocabulario para describir desempeños, no como una escalera rígida. También corrigió títulos, signos, términos ambiguos y residuos de plantillas internas.

La terminología se contrastó en modo de solo lectura con el corpus IAOrientaciones, cuya fuente principal mantuvo la huella SHA-256 `401cca1886602f1ef9034e1d1c2097cb10e31876b369be416189d36c0192a9ef` antes y después de la consulta. La versión revisada usa **dirección epistémica** para el propósito, la comprobación y la decisión; sitúa la posibilidad de no usar IA dentro de la cocreación gobernada por personas; mantiene la exploración crítica como el trabajo de examinar razones y límites; y aclara que la progresión de literacidades no es una jerarquía. La referencia de Bearman, Nieminen y Ajjawi se corrigió al artículo de 2023 sobre diseño de evaluación en un mundo digital; las referencias no utilizadas o sin anclaje visible se retiraron o se vincularon al argumento correspondiente.

## Preservación y traslado

La fuente autenticada por su huella SHA-256 contiene 13 lecciones, 367 bloques y 112 interactivos. La versión Hugo conserva los 112: 56 componentes estructurales —23 acordeones, 19 grupos de pestañas y 14 procesos— y 56 prácticas formativas con equivalente textual. No se adoptaron imágenes de Rise porque el paquete no aportaba una procedencia reutilizable suficiente; se conservaron las portadas ya presentes y la adaptación propia del marco ICAP.

La figura ICAP ahora tiene una variante vertical para pantallas estrechas, sin sustituir la versión de escritorio. Ambas contienen título y descripción accesibles, y la atribución sigue visible en la lección. Sus huellas locales son `0982a1309745e11e2bafff502a1ee408eee288f0d77db8f907ba99dd549813a9` para escritorio y `2e796da824887e49be46296b8587c0aaa9718105912383e4d27266ce7dbda70c` para móvil.

## Componentes nativos y candidaturas H5P

La corrección aplica un criterio único: usar el componente más simple que conserve la decisión pedagógica. Veintiséis prácticas quedan preferentemente en HTML nativo: 17 grupos de tarjetas, 4 ejercicios de respuesta breve, 3 correspondencias y 2 clasificaciones. Las correspondencias y clasificaciones ya no muestran únicamente la solución: presentan conceptos, opciones o bancos de elementos para que la persona intente resolverlos antes de abrir la respuesta razonada. Los ejercicios de completar muestran el espacio que debe responderse.

Las otras 30 prácticas son preguntas de selección única y conservan candidatura a `H5P.MultiChoice`, biblioteca que ya cuenta con evidencia en el catálogo gobernado. Las ocho preguntas que antes estaban configuradas como respuesta múltiple pese a tener una sola opción correcta se convirtieron a selección única. Las 30 ofrecen retroalimentación para cada opción. Las 25 preguntas de la autoevaluación incorporan un enlace a la lección que conviene repasar.

Todas las prácticas funcionan ahora mediante HTML nativo sin cargar H5P. Una candidatura no equivale a paquete producido, aprobación ni publicación. El inventario completo, con identificador de fuente, lección, biblioteca propuesta, decisión, evidencia de catálogo, justificación, licencia y alternativa textual, está en `data/h5p/course_candidates.json`.

## Verificación local

La prueba automatizada, la compilación Hugo y la inspección del render real comprobaron:

- 13 páginas de lección, 56 componentes estructurales y 56 prácticas únicas;
- 26 decisiones de HTML nativo preferido y 30 candidaturas H5P, todas sin calificación, reporte ni autorización de publicación;
- 25 rutas de repaso desde la autoevaluación y una sola respuesta esperada con retroalimentación por opción en las 30 preguntas de selección;
- compilación Hugo y 34 inspecciones de rutas en escritorio claro, móvil oscuro y muestras cruzadas de escritorio oscuro y móvil claro;
- navegación por teclado en los componentes desplegables y cero infracciones axe en los niveles WCAG 2 A, 2 AA y 2.1 AA comprobados;
- cero solicitudes externas, escrituras HTTP, iframes, cargas del runtime H5P, errores de consola, cookies o persistencia de actividad;
- ausencia de desbordamiento horizontal, HTML máximo de 120 392 bytes, recursos transferidos máximos de 1 615 111 bytes y render máximo observado inferior a 700 ms en la corrida registrada;
- variante móvil de ICAP renderizada a 390 píxeles de ancho, sin desbordamiento y con la versión vertical visible;
- autoevaluación imprimible en 32 páginas A4, con la cabecera fija y su separador ocultos; la inspección de las primeras páginas no encontró superposición del encabezado sobre el contenido;
- licencia del curso, 56 fichas de interacción, 13 portadas y dos SVG con título, descripción y atribución visible.

El registro reproducible está en `docs/design/evidence/curso-diseno-inverso-cocreacion-ia/qa-course.json`; cinco capturas y el PDF de impresión están en la misma carpeta. La prueba transversal de rutas y tablas también pasó. Los avisos de Hugo registrados son preexistentes y globales: deprecación de `languageCode`, compatibilidad declarada del módulo Blowfish y usos heredados de `.Site.LanguageCode` y `.Site.Data`.

## Estado y límites

Estado actual: **aplicado y verificado localmente**. No se hizo commit, push, publicación, despliegue ni cambio en Moodle o Hermes. Tampoco se generaron paquetes H5P ni se modificó el catálogo de producción.

La comprobación automatizada no sustituye una lectura de comprensión con docentes ni una evaluación humana de la ficha de trabajo. El tamaño táctil de algunas insignias del tema Blowfish es un hallazgo global de prioridad baja y no se modificó desde este curso. La nueva variante móvil de ICAP tiene semántica y huella documentadas aquí, pero aún no forma parte de un catálogo compartido de figuras; integrar ese contrato pertenece a la corrección global correspondiente. También permanecen fuera de este alcance las deudas heredadas del tema H5P y de verificaciones globales que el curso no carga en su render actual.

La corrida transversal de `qa:routes-tables` reescribió cinco archivos de evidencia global bajo `docs/design/evidence/udgia-015`. No quedó una línea base suficiente para demostrar que esos archivos estaban limpios antes de P1B; por ello no se restauraron ni se atribuyen al curso, ya que hacerlo podría borrar cambios previos. El integrador debe tratar ese churn como incierto y separarlo del alcance del curso al preparar cualquier entrega posterior.
