# Método para detectar páginas escuetas, descontextualizadas o sin función clara

Fecha: 2026-08-23

Estado: método activo de auditoría; no autoriza retirar ni publicar páginas.

## Problema

Una página no deja de servir solo por tener pocas palabras. Tampoco se vuelve útil por tener título, tarjetas, imágenes, botones o una prueba técnica en PASS.

La pregunta editorial es si una persona puede entender:

1. para quién es la página;
2. en qué situación conviene abrirla;
3. qué problema ayuda a resolver;
4. con qué texto, caso, datos, pregunta o archivo se empieza;
5. qué acciones debe realizar;
6. qué conservará o entregará;
7. cómo comprobará si el resultado sirve;
8. si las instrucciones usan lenguaje directo.

Estas ocho señales se aplican completas a una práctica. Se ajustan al papel de otras páginas:

- una guía puede contener varios ejemplos y no tiene que convertirse en una única actividad;
- una portada de sección debe explicar para quién sirve, qué contiene y cómo se distinguen sus destinos;
- un glosario necesita definición, ejemplo, situación de uso y relaciones, no un entregable;
- un artículo o estudio necesita alcance, fecha, estado y procedencia;
- una plantilla necesita mostrar al menos un ejemplo completado para que se entienda su uso.

## Barrido reproducible

Comandos:

```bash
npm run content:context-audit
npm run qa:context-audit
```

Implementación:

```text
tools/audit-context-clarity.mjs
```

Salidas:

```text
docs/editorial/inventarios/2026-08-23-contexto/auditoria-contexto.json
docs/editorial/inventarios/2026-08-23-contexto/cola-contexto.csv
docs/editorial/inventarios/2026-08-23-contexto/resumen.md
```

El barrido actual cubre las 166 fuentes Markdown. Cuando una página delega contenido a `illustrated-guide`, también inspecciona `guide-body.txt`; así no se declara vacía una guía cuyo cuerpo está en otro archivo.

## Resultado automático refinado

| Prioridad automática | Fuentes |
|---|---:|
| Urgente | 1 |
| Alta | 3 |
| Media | 22 |
| Baja | 140 |
| **Total** | **166** |

Se detectaron además:

- 4 afirmaciones de implementación que necesitan procedencia independiente;
- 1 contradicción explícita de estado;
- 3 prácticas cuyo material inicial necesita revisión;
- 26 candidatas totales para lectura humana.

Las 26 candidatas ya tienen dictamen humano registrado y reconciliado con Claude Fable:

- conservar: 5;
- cambiar: 16;
- quitar o poner en cuarentena: 5;
- pendientes entre las candidatas: 0.

El registro humano contiene además ocho páginas de prioridad automática baja que fueron revisadas por pertenecer a las mismas familias. En total hay 34 decisiones: 9 conservar, 20 cambiar y 5 quitar/cuarentena. Las otras 132 fuentes permanecen pendientes de lectura humana, aunque 140 fuentes tienen prioridad automática baja.

“Baja” no significa aprobación. Significa que las expresiones automáticas no encontraron motivos suficientes para priorizar la página.

## Señales automáticas

El script registra, por ruta:

- tipo funcional: navegación, guía, práctica, ruta, recurso, artículo o página;
- número de palabras;
- presencia o ausencia de las ocho señales;
- primera línea que respalda cada señal encontrada;
- cuerpo muy breve;
- afirmaciones de implementación en pasado;
- contradicción entre “prototipo/no implementado” y resultados de implementación;
- materiales centrales que se generan, pero no se muestran;
- marcadores sin completar como `[pegar rúbrica]` o `[Pegar texto]`;
- solicitudes de entregar o conservar conversaciones completas;
- prioridad automática.

El detector no retira archivos ni asigna por sí solo `conservar`, `cambiar` o `quitar`.

## Revisión humana obligatoria

Cada candidata se abre en la fuente y en la página renderizada. La persona revisora debe anotar:

```text
ruta
función real
procedencia
situación
quién
momento o entorno
material inicial visible
acciones observables
resultado concreto
comprobación final
lenguaje directo
otros problemas
citas con líneas
decisión
razón
```

“Otros problemas” se registra aparte para no llamar descontextualización a todo:

- duplicación;
- fragmentación;
- rol o ubicación incorrectos;
- contenido abandonado;
- obsolescencia;
- afirmaciones sin procedencia;
- contradicción de estado;
- enlaces rotos;
- navegación deficiente;
- privacidad o exceso de datos;
- imagen que oculta el contexto;
- fallo técnico.

## Reglas de decisión

### Conservar

Se conserva cuando la función y el recorrido se entienden. Puede necesitar correcciones menores, pero otra persona puede usarla o consultarla sin inventar su pieza central.

Ejemplo:

```text
content/ia-educacion/practicas/comprobar-afirmacion/index.md
```

- L37–39 muestra la afirmación inicial: “Una IA afirma que una intervención mejoró el aprendizaje un 30%”.
- L41–46 indica copiar, localizar, comprobar y decidir.
- L48–50 define el registro que queda al terminar.

Es breve, pero no es escueta en lo esencial.

### Cambiar

Se cambia cuando existe una función recuperable, pero falta una parte necesaria o el rol editorial es incorrecto.

Ejemplos:

```text
content/ia-educacion/practicas/bitacora-cocreacion/index.md
```

- L39–49 ofrece una plantilla clara.
- L42 pregunta qué idea o borrador existía, pero no muestra uno.
- L55–57 explica cómo comprobar la nota.

Debe mostrar un caso y una bitácora completada, o presentarse explícitamente como plantilla.

```text
content/laboratorio/practicas/aula-invertida/index.md
```

- L28 y L38–43 explican el ciclo antes, durante y después.
- L47 ofrece un ejemplo semanal.
- No contiene todos los materiales ni una comprobación reproducible.

No se borra: se cambia de práctica a guía.

### Quitar o poner en cuarentena

Se retira de la vista pública, de forma reversible, cuando:

- no tiene una función recuperable;
- duplica una pieza mejor;
- está obsoleta o abandonada;
- conduce a una ruta sin uso claro;
- afirma resultados cuya procedencia no puede sostenerse;
- contiene una contradicción que impide saber qué es.

Ejemplo urgente:

```text
content/laboratorio/practicas/evaluacion-formativa-asistida-ia/index.md
```

- L50–53: “prototipo de escenario… no el reporte de una implementación ya observada”.
- L149–156: “Después de implementar esta práctica durante un semestre” y resultados porcentuales.
- L79 aún contiene `[pegar rúbrica del docente]` y `[Pegar texto]`.

Mientras no se resuelva esa contradicción, no debe presentarse como práctica documentada.

## Afirmaciones de implementación localizadas

Requieren una fuente independiente o deben reescribirse como resultados esperados/escenarios:

1. `content/laboratorio/practicas/abp-con-ia/index.md`, L107: “En la primera implementación, se observó que…”.
2. `content/laboratorio/practicas/aprendizaje-activo-ia/index.md`, L107: “Observaciones tras las tres sesiones…”.
3. `content/laboratorio/practicas/debate-socratico-con-ia/index.md`, L85: “grupo piloto, n=32” y “78%”.
4. `content/laboratorio/practicas/evaluacion-formativa-asistida-ia/index.md`, L149: implementación durante un semestre.

Las referencias bibliográficas generales que aparecen al final de algunas páginas no prueban que esas implementaciones locales hayan ocurrido.

## Falsos positivos ya corregidos

El primer barrido marcó por error:

- “El prototipo y su memoria”, que era el nombre de un patrón;
- “Resultados observados”, que era un campo de una plantilla;
- “Después de implementar”, que era una pregunta de seguimiento;
- “Una conversación completa no explica…”, que desaconseja conservar conversaciones completas.

Las reglas se restringieron para detectar afirmaciones en pasado, estados explícitos y solicitudes efectivas. Esta revisión es parte del método: una expresión regular produce candidatas, no decisiones editoriales.

## Hallazgos fuera de las prácticas

La revisión por función encontró problemas que el conteo de palabras no revela:

- `content/ia-educacion/guias/_index.md`: **cambiar**; presenta las guías como tutoriales docentes, pero la colección también contiene una ruta para estudiantes y no orienta por necesidad.
- `content/ia-educacion/rutas/_index.md`: **cambiar**; duplica el selector de `ia-educacion/_index.md` y no ofrece la comparación de alcances que promete.
- `content/laboratorio/_index.md` y `content/laboratorio/practicas/_index.md`: **cambiar**; afirman que toda entrada es una experiencia real documentada, aunque la colección mezcla propuestas, prototipos y supuestas implementaciones.
- `content/observatorio/estudios/_index.md`: **cambiar**; mezcla encuesta empírica, ensayo teórico y reseña editorial sin distinguir tipos de evidencia.
- `content/observatorio/estudios/encuesta-dec-2026.md`: **cambiar**; conserva la fuente primaria, pero necesita método, fechas, límites de representatividad y moderar la afirmación de que los datos UdeG tienen “peso propio”.
- `content/recursos/externas/_index.md`: **quitar como rama autónoma**, conservando y migrando sus curadurías; duplica parcialmente `recursos/links` y promete cuatro bloques cuando contiene dos.
- `content/recursos/glosario/agentes-de-ia/index.md`, `aprendizaje-digital/index.md` e `ingenieria-de-prompts/index.md`: **cambiar** por imprecisión, obsolescencia o falta de un ejemplo actual; no por ser breves.
- `content/recursos/videos/_index.md`: **cambiar**; la colección mezcla videos, curso web/libro y canales, y contiene al menos un destino incompleto.

También se descartaron falsos positivos legítimos: `blog/_index.md`, `formacion-docente/_index.md`, `ia-educacion/_index.md`, la ruta de cocreación, `recursos/articulos/_index.md` y `comprobar-afirmacion` pueden conservarse porque su brevedad corresponde a su función.

## Orden de trabajo

1. Resolver la candidata urgente.
2. Verificar o retirar temporalmente las tres prácticas con afirmaciones de implementación.
3. Revisar las 22 candidatas medias según su función.
4. Registrar citas y decisión individual.
5. Editar en lotes pequeños y reversibles.
6. Volver a ejecutar inventarios, enlaces, build y lectura en frío.
7. Solicitar VoBo antes de publicación o retiro público.

## Segunda lectura con Claude Fable

Claude Code `2.1.233` ejecutó una revisión de solo lectura con el modelo `claude-fable-5`. Se le prohibieron edición, escritura, comandos y acceso web. La salida completa está en:

```text
docs/editorial/revisiones/2026-08-23-claude-fable-contexto.json
```

Cobertura verificada:

- 26 candidatas esperadas;
- 26 rutas únicas recibidas;
- coincidencia exacta de rutas;
- 25 acuerdos iniciales;
- 1 desacuerdo: `bitacora-cocreacion`.

El desacuerdo se resolvió a favor de **cambiar** porque nuestro propio método exige que una plantilla muestre al menos un ejemplo completado. Después de esa reconciliación, las 26 decisiones coinciden. Fable no sustituyó las citas ni la lectura previa; funcionó como segunda revisión y detectó una inconsistencia en la aplicación del criterio.

## Relación con la auditoría manual inicial

La revisión manual de las primeras trece guías y prácticas está en:

```text
docs/editorial/lotes/2026-08-23-auditoria-contexto-piezas-preexistentes.md
```

Los resultados de tres auditores paralelos fueron reconciliados con la lectura de las fuentes, el render en `1313` y la comparación con el repositorio publicado. Cuando el detector y la lectura humana difieren, prevalece la decisión documentada con citas.
