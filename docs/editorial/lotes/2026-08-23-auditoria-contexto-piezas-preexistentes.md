# Auditoría de contexto y procedencia de piezas preexistentes

Fecha: 2026-08-23

Estado: diagnóstico para revisión humana; no autoriza publicación.

## Corrección que origina esta auditoría

Las propuestas nuevas no resuelven el problema. El trabajo debe concentrarse en las piezas que ya existían en el sitio para decidir si se conservan, se cambian de manera localizada o se retiran.

Como consecuencia:

- se detuvo el servidor de prototipos del puerto `1314`;
- `sketches/003-ejercicio-alineacion/` y su prueba específica se movieron a `docs/editorial/quarantine/2026-08-23-prototipos-nuevos-descartados/`;
- se restauró `content/_index.md` desde `main` del repositorio público;
- las tres entradas nuevas de la portada, sus SVG y `qa-home-clarity` quedaron en `docs/editorial/quarantine/2026-08-23-portada-nueva-descartada/`;
- `showRecent` volvió a `true`, su valor publicado;
- no se integró ni publicó ningún prototipo.

## Fuente y método

Copia editorial examinada:

```text
/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia
```

Repositorio público usado para comprobar procedencia:

```text
git@github.com:arqueon/aprendizaje-ia.git
main = 2c8ff50c6e9ad8d045a607bd466c326215d1e610
```

Se comprobó cada ruta mediante:

1. existencia e historial en el repositorio público;
2. comparación byte a byte entre `main` y la copia editorial;
3. lectura completa de la fuente Markdown o del recurso que genera la página;
4. lectura en frío de la ruta servida en `1313`, a 1440 × 900;
5. búsqueda de las afirmaciones de implementación en el repositorio y en `arq-graph`.

No se encontró en el repositorio ni en `arq-graph` una fuente independiente para los porcentajes o resultados de implementación que se señalan abajo. El texto de las propias páginas no basta como prueba de esas afirmaciones.

## Qué sí existía antes de esta revisión

Las trece rutas de actividades y guías gobernadas por `activity-svg-contract.json` ya estaban en el repositorio público. La portada también contenía, desde el commit `60e53598` del 2026-07-29, estas tres rutas:

- `Estudio o enseño`;
- `Coordino procesos docentes`;
- `Dirijo decisiones institucionales`.

Estas tres entradas originales, no las sustituciones nuevas descartadas, son las que deben revisarse en la portada. Sus descripciones anuncian “propósito formativo”, “acompañar pilotos”, “revisar evidencias”, “alinear gobernanza” y otros conceptos, pero no presentan una situación concreta ni explican qué conservará la persona al terminar el recorrido.

**Recomendación para la portada original:** cambiar o retirar temporalmente el bloque `Elige tu ruta` después de revisar las tres páginas de destino. No inventar otro grupo de entradas antes de esa revisión.

## Registro de decisiones para las trece piezas existentes

| # | Ruta existente | Procedencia | Hallazgo principal | Acción propuesta | Prioridad |
|---|---|---|---|---|---|
| 1 | `/ia-educacion/guias/abp-con-ia/` | Publicada desde 2026-04-14; copia local idéntica | Contiene ejemplos con actores, material inicial, acciones, resultados y comprobaciones: reformulación de escenarios, pregunta previa, contraste de modelos, hipótesis concreta y registro de decisiones. Su función es una guía metodológica, no una única actividad cerrada. | **Conservar.** Revisar después el vocabulario especializado, pero no tratarla como página escueta ni incompleta. | Baja |
| 2 | `/ia-educacion/guias/aprendizaje-activo-con-ia/` | Publicada desde 2026-04-14; copia local idéntica | Presenta cuatro “actividades tipo”, pero varias solo describen un mecanismo o un prompt. No siempre dicen qué recibe el grupo, qué entrega ni cómo comprobar el aprendizaje. Conserva palabras como “consigna”, “evidencia” y “alineado” sin explicación cotidiana. | **Cambiar.** Conservar el marco; separar explicación de ejemplos y completar o retirar los bloques que se presentan como actividad sin serlo. | Alta |
| 3 | `/ia-educacion/guias/aprendizaje-hibrido-activo-disenar-actividad/` | Publicada desde 2026-08-13; copia local idéntica | Es una referencia de 1,350 líneas y 31,643 px de alto. Contiene tres actividades completas y diez patrones útiles, pero el título aparece cerca del límite del primer pantallazo y el documento usa de forma repetida “huella”, “evidencia” y “alineación”. | **Cambiar la entrada, no retirar.** Conservar como referencia larga; hacer visible desde el inicio quién la usa, con qué actividad llega y qué ficha termina. Sustituir o explicar vocabulario interno. | Media |
| 4 | `/ia-educacion/guias/estudiantes/` | Publicada desde 2026-08-13; copia local idéntica | Presenta a Renata, un borrador, dos sugerencias, la decisión que tomará y el antes/después que conservará. Explica duración, privacidad, alternativa sin IA y límite del resultado. | **Conservar.** Solo revisión humana de estilo y del destino `comparar-sugerencias`; no necesita otro prototipo. | Baja |
| 5 | `/ia-educacion/guias/profesorado/` | Ruta publicada desde 2026-08-13; contenido local reescrito durante esta revisión | La ruta es preexistente. La versión publicada anterior enlazaba la actividad rechazada; la copia local ahora parte de una actividad propia, un caso, una revisión breve, un texto final y una comprobación por otra persona. | **Cambiar mediante el borrador local ya existente, sujeto a revisión.** No restaurar el objeto rechazado ni tratar esta ruta como una página nueva. | Alta |
| 6 | `/ia-educacion/practicas/bitacora-cocreacion/` | Publicada desde 2026-08-13; copia local idéntica | La tabla, los límites de privacidad y la comprobación son útiles, pero todas las celdas son preguntas: no muestra un caso inicial ni una nota terminada. Además se clasifica como práctica aunque funciona como plantilla. | **Cambiar.** Añadir un caso breve completado o declararla explícitamente como plantilla de apoyo; conservar el contenido útil. | Media |
| 7 | `/ia-educacion/practicas/comprobar-afirmacion/` | Publicada desde 2026-08-13; copia local idéntica | Incluye una afirmación exacta, cuatro acciones, el registro que se conserva y una alternativa sin IA. El momento “antes de repetir el número” es reconocible, aunque no nombra una persona concreta. | **Conservar con ajuste menor.** Añadir quién puede usarla y cuándo, sin ampliar la secuencia. | Baja |
| 8 | `/laboratorio/practicas/abp-con-ia/` | Publicada desde 2026-04-14; copia local idéntica | Se presenta como proyecto “documentado”, describe un grupo de 28 estudiantes y afirma resultados de una “primera implementación”. No identifica curso, docente, fecha, institución, instrumento ni datos. También exige dos modelos y logs completos sin justificar acceso o privacidad. | **Poner en cuarentena pública.** Solo volver si aparece procedencia verificable; de lo contrario, convertir explícitamente en escenario de diseño, retirar resultados y revisar privacidad/equidad. | Urgente |
| 9 | `/laboratorio/practicas/analisis-critico-de-sesgos-en-ia/` | Publicada desde 2026-03-17; copia local idéntica | El título empieza a 1,212 px, debajo del primer pantallazo. “Estudiantes de Ciencias Sociales o Humanidades” no sitúa curso, momento ni material. El ejercicio depende de tres servicios, pide capturas y termina en una infografía cuya apariencia pesa 20 %, pero no define una comprobación del análisis. | **Cambiar.** Reducir o retirar el hero, fijar un corpus preparado y una alternativa sin cuentas, precisar la comparación y sustituir la evaluación visual por una revisión del razonamiento. | Alta |
| 10 | `/laboratorio/practicas/aprendizaje-activo-ia/` | Publicada desde 2026-04-14; copia local idéntica | Se presenta como práctica documentada con grupo de 35 estudiantes y “observaciones tras las tres sesiones”, pero no aporta procedencia. Duplica parte de la guía de aprendizaje activo y no muestra los casos, roles ni preguntas concretos con los que empezaría el grupo. | **Poner en cuarentena pública.** Si se conserva, convertirla en escenario adaptable con materiales visibles o documentar la implementación real; resolver después el solapamiento con la guía. | Urgente |
| 11 | `/laboratorio/practicas/aula-invertida/` | Publicada desde 2026-04-13; copia local idéntica | Es una explicación metodológica con un ejemplo semanal y dos ciclos. No es una práctica completa pese a vivir bajo `laboratorio/practicas`. | **Cambiar de rol y ubicación a guía o marco.** Conservar alias y enlaces; no forzarla a parecer una actividad. | Media |
| 12 | `/laboratorio/practicas/debate-socratico-con-ia/` | Publicada desde 2026-03-04; copia local idéntica | El título empieza a 1,212 px. Afirma una aplicación piloto con `n=32`, un resultado de 78 % y mayor profundidad que el semestre anterior, sin fuente ni método. Además exige publicar el intercambio completo con IA, lo que entra en conflicto con privacidad y minimización de datos. | **Poner en cuarentena pública.** Solo reponer con respaldo verificable; si se convierte en escenario, retirar cifras y entrega de conversaciones completas. | Urgente |
| 13 | `/laboratorio/practicas/evaluacion-formativa-asistida-ia/` | Publicada desde 2026-04-14; copia local idéntica | Un aviso dice que es un “prototipo de escenario” no implementado; más abajo afirma una implementación semestral, 72 % y mejoras observadas. Ambas afirmaciones son incompatibles. También pide logs completos. | **Poner en cuarentena pública hasta resolver la contradicción.** La secuencia puede conservarse como escenario si se eliminan resultados sin fuente y se sustituye el log completo por notas de decisión. | Urgente |

## Piezas que pueden permanecer visibles

Cuatro piezas ya tienen una función y un recorrido suficientes para permanecer visibles:

1. `guias/abp-con-ia`: guía metodológica con varios ejemplos completos; no exige una sola actividad cerrada;
2. `guias/estudiantes`: caso, persona, material, decisión, resultado, tiempo, alternativa y límite;
3. `practicas/comprobar-afirmacion`: material inicial exacto, cuatro acciones y registro final;
4. `guias/aprendizaje-hibrido-activo-disenar-actividad`: referencia extensa con actividades completas, aunque necesita una entrada más corta y lenguaje menos interno.

Conservar no significa congelar el texto: las mejoras de estilo o entrada pueden hacerse después, sin presentarlas como rescate de una página que “no sirve”.

## Piezas que deben salir primero de la vista pública

Estas cuatro rutas no deberían seguir presentándose como experiencia comprobada mientras no exista procedencia:

1. `laboratorio/practicas/abp-con-ia/`;
2. `laboratorio/practicas/aprendizaje-activo-ia/`;
3. `laboratorio/practicas/debate-socratico-con-ia/`;
4. `laboratorio/practicas/evaluacion-formativa-asistida-ia/`.

La acción propuesta es cuarentena reversible, no borrado. Hay dos salidas posibles para cada una:

- documentar una implementación real con procedencia, alcance, método y límites;
- presentarla honestamente como escenario adaptable y retirar cifras, resultados observados y lenguaje de “práctica documentada”.

## Problemas de primer pantallazo

La lectura a 1440 × 900 detectó:

| Ruta | Posición aproximada del título | Consecuencia |
|---|---:|---|
| `sesgos` | 1,212 px | la primera pantalla es casi solo imagen; no se sabe qué se hará |
| `debate socrático` | 1,212 px | ocurre lo mismo |
| `guía híbrida` | 865 px | el título queda en el borde inferior |
| `guía profesorado` | 764 px | el caso empieza después del primer pantallazo |

Las trece rutas respondieron HTTP 200, sin imágenes rotas ni errores de consola. Esos PASS técnicos no corrigen la falta de contexto ni la procedencia editorial.

## Orden propuesto de trabajo

1. Obtener VoBo para poner en cuarentena las cuatro rutas con afirmaciones no sustentadas.
2. Revisar las tres páginas de destino de `Elige tu ruta`; cambiar o retirar después el bloque original de la portada.
3. Corregir `sesgos`, `bitácora` y `aprendizaje activo con IA`, porque se presentan como prácticas o repertorios sin material de partida suficiente.
4. Reubicar `aula invertida` como guía.
5. Revisar la entrada y el lenguaje de la guía híbrida sin desarmar sus actividades completas.
6. Someter a revisión humana el borrador local de la guía de profesorado.
7. Verificar cada lote en escritorio, móvil, teclado, fallback y lectura en frío antes de proponer publicación.

## Verificación posterior a la reversión

- inventario Hugo: 166 documentos;
- inventario de aprendizaje: 166 piezas;
- enlaces internos rotos: 0;
- build Hugo: 935 páginas, 1,431 archivos estáticos;
- `qa:routes-tables`: PASS;
- `qa:direct-language`: PASS en las cinco piezas que gobierna;
- `qa:profesorado-pilot`: PASS;
- `qa:visual-contract`: PASS, 142 páginas y 494 tarjetas;
- `qa:activity-svg-contract`: PASS, 13 actividades gobernadas y 12 pendientes de figura;
- `qa:udgia-figures`: PASS;
- `1313` muestra las tres rutas publicadas originales y no las sustituciones nuevas;
- `1314` no responde;
- contenido, layouts y `package.json` no contienen referencias activas a los prototipos o pruebas descartados.

Los PASS confirman que la reversión es coherente; no aprueban las piezas editoriales que esta auditoría recomienda cambiar o poner en cuarentena.

## Límite de esta auditoría

La copia editorial no tiene `.git`; no se publicará desde ella. La producción de GitHub Pages no fue modificada. Las decisiones anteriores son una cola editorial verificable, no cambios autorizados en el sitio público.
