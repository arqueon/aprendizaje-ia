# Alcance de la ruta de coordinación académica operativa

**Ecosistema IA-docencia UDGPlus · UDGIA-004C**

**Estado:** alcance fijado por Rubén; primer borrador Hugo listo para revisión editorial y
visual

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
syllabus, evaluación, formación y acompañamiento del profesorado, pilotos, evidencia y
revisión.

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
2. qué decisiones corresponden al nivel operativo y cuáles deben escalarse;
3. un ciclo de seis momentos: delimitar, diagnosticar, acordar, acompañar, pilotar y revisar;
4. adaptaciones para departamentos/academias, licenciatura/posgrado y SEMS;
5. una primera sesión de trabajo de 90 minutos;
6. enlaces a guías existentes para desarrollar cada decisión.

Los contenidos posteriores podrán profundizar cada momento sin repetir la portada.

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

Contenido visual: UDGPlus, CC BY-SA 4.0.

## 6. Resultado observable

Una coordinación puede organizar un piloto docente acotado y decidir si conviene sostenerlo,
modificarlo, ampliarlo o detenerlo mediante criterios y evidencias trazables, distinguiendo
qué asunto necesita escalarse.

## 7. Puerta antes de integrar

La entrega ya cumple:

- lenguaje operativo sin simular normativa institucional vigente;
- diferenciación clara entre los tres contextos de coordinación;
- frontera visible con el documento ejecutivo;
- enlaces internos válidos;
- imagen editorial propia y diagrama con alternativa textual;
- build Hugo y QA responsive/accesible;
- ausencia de cambios en Moodle, Orientaciones y Semillero.

Permanece pendiente:

- revisión editorial y visual de Rubén;
- autorización separada antes de integrar o publicar.

## 8. QA del primer borrador

`npm run qa:coordinacion-route` construye el sitio, sirve una copia estática y revisa la ruta
en Chromium:

| Comprobación | Resultado |
|---|---|
| Build Hugo | 916 páginas |
| Vista escritorio | 1440 px, sin desbordamiento |
| Vista móvil | 375 px, sin desbordamiento |
| Arquitectura de contenido | 7 tarjetas, 2 tablas, 17 secciones y cero H5P |
| Gráfico del ciclo | 505 × 746 px en escritorio; 327 × 483 px en móvil |
| Contextos | jefaturas/academias, licenciatura/posgrado y SEMS presentes |
| Frontera ejecutiva | explícita en la introducción, tabla de decisiones y cierre |
| Enlaces internos | todos responden HTTP 200 en la copia compilada |
| Axe | cero violaciones serias o críticas |
| Privacidad y estabilidad | cero solicitudes externas y cero errores de consola |

La evidencia está en `docs/design/evidence/udgia-004c/`. Permanecen los avisos conocidos de
alineación de versiones Hugo/Blowfish y API deprecadas; no los introduce esta ruta.
