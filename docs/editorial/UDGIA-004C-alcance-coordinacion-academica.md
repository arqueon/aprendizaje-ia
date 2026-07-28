# Alcance de la ruta de coordinación académica operativa

**Ecosistema IA-docencia UDGPlus · UDGIA-004C**

**Estado:** integrado en `main`, publicado y verificado

**Fecha:** 2026-07-27

## 1. Decisión de audiencia

UDGIA-004C separa dos capas que el contrato inicial agrupaba como
«coordino/gobierno».

La ruta pública que se construye ahora atiende el nivel de coordinación académica operativa:

- jefaturas de departamento y academias;
- coordinaciones de programas docentes de licenciatura;
- coordinaciones de programas docentes de posgrado;
- coordinaciones y equipos académicos del Sistema de Educación Media Superior.

La ruta se enfoca en procesos docentes: acuerdos de programa, integración curricular,
programas de asignatura, evaluación, formación y acompañamiento del profesorado, pilotos,
evidencia y revisión.

## 2. Documento ejecutivo separado

Se reserva para un documento posterior y autónomo la alta dirección:

- coordinaciones generales;
- direcciones generales;
- rectorías de centro;
- vicerrectorías;
- Rectoría General.

Ese documento tratará estrategia universitaria, prioridades, condiciones habilitantes,
recursos, licenciamiento, infraestructura, datos, gobernanza general y seguimiento
institucional. No se incorporará como una tercera tarjeta en la ruta introductoria para
estudiantes y docentes ni como una ampliación burocrática de la ruta operativa.

## 3. Precedencia y límites

1. Las Orientaciones sostienen principios, gobernanza distribuida y responsabilidades.
2. Hugo traduce ese marco a una ruta pública y operativa; no publica una política vigente
   ni atribuye facultades que deban confirmarse normativamente.
3. El Moodle de referencia puede aportar después secuencias de formación y práctica, pero no
   se modifica en esta subfase.
4. `alfabetizacion_en_ia` permanece como esbozo derivado.
5. Orientaciones, Semillero y Moodle quedan en solo lectura durante UDGIA-004C.

## 4. Arquitectura de la primera entrega

La primera página no intenta enseñar toda la gobernanza. Presenta:

1. a quién sirve y qué resultado común persigue;
2. qué tareas puede convertir la coordinación en trabajo colegiado;
3. un ciclo de seis momentos: delimitar, diagnosticar, acordar, acompañar, pilotar y revisar;
4. adaptaciones para departamentos/academias, licenciatura/posgrado y SEMS;
5. una primera sesión de trabajo de 90 minutos;
6. enlaces a guías existentes para desarrollar cada decisión.

Los contenidos posteriores podrán profundizar cada momento sin repetir la portada.

La separación respecto del futuro documento ejecutivo organiza el trabajo editorial, pero no
forma parte del contenido público de la ruta. La página sólo explica cómo registrar una
dependencia que el equipo no puede resolver: necesidad, efecto sobre el piloto, persona a
consultar y fecha requerida.

El barrido editorial posterior llevó la página hacia el vocabulario de trabajo de su
audiencia: «programa de asignatura» sustituye a `syllabus`; las tres literacidades se expresan
como uso básico, verificación crítica y autoría responsable; cada etapa nombra un producto
concreto; y los casos fuera de atribuciones se convierten en solicitudes documentadas. La
apertura parte ahora del problema observable —indicaciones contradictorias cuando cada
docente resuelve por su cuenta— y no de una definición general.

## 5. Imagen editorial

La portada usa
`content/ia-educacion/rutas/coordinacion-academica/featured.webp`, generada con la herramienta
integrada `imagegen` de OpenAI y normalizada a 1600 × 900 px.

El prompt pidió una sesión de trabajo de coordinación académica operativa con tres personas
de contextos distintos —departamento, programa y SEMS— revisando mapa curricular, syllabus,
rúbricas y plan de piloto; estilo editorial con influencia de serigrafía y collage, paleta
Almagre, sin logos, texto legible, robots, hologramas ni símbolos de alta dirección. La
imagen funciona como acompañamiento editorial: la página no depende de ella para comunicar
audiencias, etapas o decisiones.

La imagen se presenta como `heroStyle: big`, en el flujo de lectura y antes del título. El
estilo local neutraliza el límite de altura de Blowfish que deformaba la imagen y conserva su
proporción 16:9 tanto en escritorio como en móvil. La misma corrección se aplica a la portada
introductoria «Empezar con IA para aprender y enseñar».

Contenido visual: UDGPlus, CC BY-SA 4.0.

## 6. Resultado observable

Una coordinación puede organizar un piloto docente acotado y decidir si conviene sostenerlo,
modificarlo, ampliarlo o detenerlo mediante criterios y evidencias trazables, distinguiendo
qué asunto necesita escalarse.

## 7. Cierre de la puerta de integración

Rubén dio el visto bueno y autorizó la integración y publicación. La entrega:

- lenguaje operativo sin simular normativa institucional vigente;
- diferenciación clara entre los tres contextos de coordinación;
- separación del documento ejecutivo conservada en el informe interno, sin trasladar
  organigramas ni planeación editorial a la página pública;
- enlaces internos válidos;
- imagen editorial propia y diagrama con alternativa textual;
- build Hugo y QA responsive/accesible;
- ausencia de cambios en Moodle, Orientaciones y Semillero.

`main` avanzó de `cd71323` a `1e845c3`. La ejecución
[GitHub Actions 30325286242](https://github.com/arqueon/aprendizaje-ia/actions/runs/30325286242)
concluyó correctamente en sus tres etapas: construcción, despliegue y verificación posterior.

La siguiente pieza será un documento ejecutivo independiente para alta dirección. Queda
fuera de UDGIA-004C y no está todavía autorizada para construcción o publicación.

## 8. QA de la entrega publicada

`npm run qa:coordinacion-route` construye el sitio, sirve una copia estática y revisa la ruta
en Chromium:

| Comprobación | Resultado |
|---|---|
| Build Hugo | 916 páginas |
| Vista escritorio | 1440 px, sin desbordamiento |
| Vista móvil | 375 px, sin desbordamiento |
| Featured de coordinación | visible a 1024 × 576 px en escritorio y 327 × 184 px en móvil |
| Featured de introducción | visible a 1024 × 576 px en escritorio y 327 × 184 px en móvil |
| Proporción de featured | 16:9 natural, sin recorte ni deformación |
| Arquitectura de contenido | 7 tarjetas, 1 tabla, 16 secciones y cero H5P |
| Gráfico del ciclo | 505 × 746 px en escritorio; 327 × 483 px en móvil |
| Contextos | jefaturas/academias, licenciatura/posgrado y SEMS presentes |
| Planeación editorial interna | ausentes «documento ejecutivo», «alta dirección» y «Rectoría General» de la página pública |
| Dependencias fuera del equipo | tratamiento operativo: necesidad, efecto, consulta y fecha |
| Enlaces internos | todos responden HTTP 200 en la copia compilada |
| Axe | cero violaciones serias o críticas |
| Privacidad y estabilidad | cero solicitudes externas y cero errores de consola |

La evidencia está en `docs/design/evidence/udgia-004c/`. Permanecen los avisos conocidos de
alineación de versiones Hugo/Blowfish y API deprecadas; no los introduce esta ruta.

La misma QA forma parte ahora del job de build en GitHub Actions. La sonda posterior al
despliegue también comprueba el índice de rutas, la página de coordinación, su SVG y su WebP;
en Chromium exige propósito operativo, ausencia de lenguaje editorial interno y featured
visible en proporción 16:9.

Después del despliegue se ejecutó además una sonda pública independiente sobre
<https://arqueon.github.io/aprendizaje-ia/>. El resultado fue `PASS`: el índice, la página,
el SVG y el WebP respondieron HTTP 200; el featured público conservó 16:9; se verificaron
671 archivos H5P y 9,071,388 bytes íntegros, `Range 206`, CSP negativa, dos montajes,
teclado, impresión y almacenamiento intacto; no hubo solicitudes fuera de la base,
escrituras, cookies ni errores de consola.

Permanecen como deuda conocida del alojamiento de GitHub Pages la caché pública de diez
minutos y la ausencia de los encabezados `X-Content-Type-Options: nosniff` y
`Referrer-Policy: strict-origin-when-cross-origin`. GitHub Actions también advierte que
algunas acciones oficiales todavía se ejecutan con Node 20. Ninguno de estos avisos impidió
la publicación ni fue introducido por UDGIA-004C.
