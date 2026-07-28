---
title: "Coordinar la IA en los procesos docentes"
date: 2026-07-27
draft: false
description: "Ruta operativa para que jefaturas de departamento, coordinaciones de licenciatura y posgrado, y equipos del SEMS acompañen la incorporación de IA en la docencia."
summary: "Seis momentos para pasar de casos aislados a acuerdos de programa, formación docente, pilotos y revisión con evidencias."
tags: ["coordinación académica", "procesos docentes", "integración curricular", "formación docente", "evaluación", "SEMS"]
categories: ["ruta-de-aprendizaje"]
areas: ["ia", "pedagogia", "formacion"]
weight: 10
showHero: true
heroStyle: "big"
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
ecosistema:
  id: route.coordinacion-academica-operativa
  titulo: "Coordinar la IA en los procesos docentes"
  audiencias: [coordinacion]
  intenciones: [comprender, decidir, diseñar, evaluar, gobernar]
  tipo: guia
  capas: [R1, R2, R3, R4, R5, R7, D4, D5, P.evaluacion-proceso, P.trazabilidad]
  resultado: "Organiza un piloto docente acotado, define acuerdos de programa y decide si conviene sostenerlo, modificarlo, ampliarlo o detenerlo con base en evidencias."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "Orientaciones institucionales UdG para IA, secciones 2.3, 7, 8 y 11"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/integracion-curricular-ia/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/lineamientos-eticos-ia/"
  revisado: 2026-07-27
  relaciones:
    - tipo: aplica
      destino: governance.distribuida
    - tipo: aplica
      destino: assessment.basada-en-procesos
    - tipo: continua
      destino: route.inicio-ia-educacion
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "El diagrama tiene una explicación textual equivalente; todas las decisiones, etapas y plantillas permanecen disponibles como texto y tablas."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
Cuando cada docente resuelve por su cuenta cómo usar IA, el estudiantado recibe indicaciones
contradictorias y los problemas se descubren tarde. La coordinación puede ordenar
expectativas, formación, evaluación y apoyos sin uniformar todas las asignaturas.
{{< /lead >}}

{{< alert icon="clipboard-check" type="info" >}}
Esta **guía de trabajo** está dirigida a jefaturas de departamento, coordinaciones de
programas docentes de licenciatura y posgrado, academias y equipos del SEMS. Ayuda a
organizar un piloto y acuerdos colegiados; no sustituye las disposiciones universitarias
vigentes.
{{< /alert >}}

## Para quién es esta ruta

{{< cards >}}
  {{< card link="#jefaturas-de-departamento-y-academias" title="Jefaturas y academias" icon="users-gear" color="#b12028" description="Necesito acompañar al profesorado, ordenar criterios disciplinares y revisar evaluaciones sin uniformar todas las asignaturas." >}}
  {{< card link="#coordinaciones-de-licenciatura-y-posgrado" title="Licenciatura y posgrado" icon="diagram-project" color="#18223c" description="Necesito articular el perfil de egreso, la progresión entre materias y las expectativas de uso de IA del programa." >}}
  {{< card link="#coordinaciones-y-equipos-del-sems" title="SEMS" icon="school" color="#2f7f83" description="Necesito una implementación gradual, apropiada para el nivel formativo y coherente entre escuelas, academias y asignaturas." >}}
{{< /cards >}}

El punto común es concreto. El profesorado debe saber qué puede decidir, qué apoyo recibirá,
qué necesita comunicar al estudiantado y qué evidencia se revisará al final del ciclo.

## Qué permite coordinar

La ruta se concentra en tareas que pueden convertirse en trabajo colegiado:

- diagnosticar asignaturas, evaluaciones y necesidades docentes;
- acordar criterios disciplinares o de programa que orienten los programas de asignatura;
- organizar formación y acompañamiento del profesorado;
- preparar pilotos acotados y alternativas equivalentes sin IA;
- reunir evidencias para revisar la práctica al cierre del ciclo;
- definir una ruta de consulta para casos no previstos.

La coordinación traduce criterios comunes a un contexto disciplinar y acompaña su aplicación.
Cuando una condición necesaria no puede resolverse desde el equipo, se registra como
dependencia: qué se necesita, por qué afecta al piloto, quién debe consultarlo y para cuándo
se requiere una respuesta.

## El recorrido de un ciclo

![Ciclo operativo de coordinación académica: delimitar, diagnosticar, acordar, acompañar,
pilotar, revisar y documentar la decisión.](ciclo-coordinacion.svg
"Ciclo operativo de coordinación académica")

**Recorrido en texto:** la coordinación delimita un problema docente concreto; reúne una línea de base;
acuerda criterios mínimos; acompaña a quienes rediseñarán programas de asignatura, actividades y
evaluaciones; prueba esos cambios en pocas asignaturas o academias; y revisa evidencias para
sostener, modificar, ampliar o detener el piloto. La revisión abre un nuevo ciclo, no una
regla permanente.

## 1. Delimitar qué se coordinará

La primera decisión es reducir el alcance. «Integrar IA en el programa» es demasiado amplio
para convertirse en trabajo. Un punto de partida útil nombra:

- una población y un nivel formativo;
- un conjunto pequeño de asignaturas, academias o procesos docentes;
- un problema observable;
- una persona responsable de convocar, documentar y dar seguimiento;
- un ciclo o periodo después del cual se revisará.

**Ejemplo de alcance:** revisar durante un semestre las evaluaciones escritas de primer año
que hoy pueden resolverse con IA sin mostrar comprensión, formar a sus docentes y acordar
cómo se documentará el proceso.

**Ficha de alcance:** una página con propósito, alcance, responsables, calendario, recursos
disponibles y decisiones que quedarán fuera.

## 2. Diagnosticar prácticas y evaluaciones

La compra de una herramienta no es el punto de partida. Primero se observa qué está ocurriendo
en los procesos docentes:

1. revisar una muestra pequeña de programas de asignatura, consignas y rúbricas;
2. identificar dónde el estudiantado ya usa IA, aunque no esté declarada;
3. distinguir evaluaciones que conservan su validez de las que requieren rediseño;
4. localizar brechas de acceso, privacidad o formación;
5. escuchar a docentes y estudiantes sin convertir una anécdota en diagnóstico general.

La [guía de integración curricular](/ia-educacion/guias/integracion-curricular-ia/) ofrece un
método para mapear competencias, asignaturas y evaluaciones. Los
[flujos de trabajo docente](/laboratorio/integracion-ia/flujos-trabajo-docente-ia/) ayudan a
localizar los puntos donde debe permanecer una decisión humana.

**Línea de base:** un registro breve que distingue lo observado, lo inferido y lo que aún no
se sabe.

## 3. Acordar criterios mínimos de programa

El acuerdo fija criterios que el profesorado puede trasladar a su programa de asignatura.
Debe responder, con lenguaje común:

- ¿qué debe enseñarse antes de pedir un uso responsable?;
- ¿qué usos se permiten, se restringen o se excluyen según el aprendizaje esperado?;
- ¿qué uso debe declarar el estudiante y con qué nivel de detalle?;
- ¿qué evidencia del proceso se conservará?;
- ¿qué alternativa equivalente existe si una persona no puede o no desea usar IA?;
- ¿qué datos nunca deben introducirse en un servicio externo?;
- ¿a quién se consulta un caso no previsto?;
- ¿cuándo y con qué evidencias se revisará el acuerdo?

Los [lineamientos éticos operativos](/ia-educacion/guias/lineamientos-eticos-ia/) y la
[guía de evaluación formativa](/ia-educacion/guias/evaluacion-formativa-ia/) desarrollan
estas decisiones.

**Guía de programa:** una o dos páginas, fechadas y versionadas, con responsable de revisión.
Debe indicar qué cuerpo colegiado la acordó, en qué asignaturas o procesos se aplicará y
cuándo volverá a revisarse.

## 4. Acompañar el rediseño docente

La coordinación acompaña los cambios con tiempo, formación y asesoría. El plan puede combinar:

- una introducción común al uso básico de IA, la verificación crítica y la autoría
  responsable;
- talleres breves sobre objetivos, evaluación y transparencia;
- tiempo colegiado para revisar actividades reales;
- ejemplos disciplinares que puedan adaptarse;
- asesoría para dudas y casos no previstos;
- reconocimiento de la carga que implica documentar y rediseñar.

El [taller de diseño de actividades con IA](/formacion-docente/taller-diseno-actividades-ia-backward/)
ofrece una secuencia replicable y la
[guía de programas de asignatura y portafolio](/formacion-docente/syllabus-portafolio/) ayuda
a traducir los acuerdos a cada curso.

**Plan de acompañamiento:** actividades vinculadas con los cambios que el piloto realmente
pedirá. Un curso genérico sobre herramientas no basta.

## 5. Pilotar en un alcance acotado

Un piloto prueba una hipótesis pedagógica y organizativa. Antes de iniciar debe quedar claro:

- qué asignaturas, grupos o academias participan;
- qué cambia en los programas de asignatura, las actividades y la evaluación;
- qué apoyo recibirán docentes y estudiantes;
- qué alternativa se ofrecerá cuando la IA no sea accesible o pertinente;
- qué casos requieren una consulta inmediata y con quién;
- qué evidencias se recogerán y cuáles no.

Conviene comenzar con pocos casos contrastantes: una asignatura de fundamentos, una de
aplicación y, cuando corresponda, una de cierre, titulación o investigación. La comparación
permite reconocer dónde la misma orientación necesita expresarse de forma diferente.

**Ficha de piloto:** un registro por caso con propósito, cambio docente, apoyo, evidencia,
riesgo, responsable y fecha de revisión.

## 6. Revisar evidencias y decidir

La revisión pregunta si el proceso docente mejoró y si la coordinación pudo sostenerlo. La
cantidad de usos de IA, por sí sola, no responde ninguna de las dos preguntas.

| Evidencia útil | Pregunta que permite responder |
|---|---|
| muestra de programas de asignatura y rúbricas antes/después; | ¿las expectativas y los criterios se hicieron más claros? |
| versiones de actividades y evaluaciones; | ¿el rediseño protege o mejora el aprendizaje esperado? |
| consultas y casos no previstos, anonimizados; | ¿qué vacíos tuvo la guía y qué apoyo faltó? |
| participación y productos de la formación; | ¿la capacitación llegó a la práctica o quedó aislada? |
| problemas de acceso y alternativas utilizadas; | ¿el piloto produjo o redujo desigualdades? |
| retroalimentación breve de docentes y estudiantes; | ¿qué funcionó, para quién y bajo qué condiciones? |

Conviene excluir conversaciones completas con IA, datos personales, rankings de docentes y
porcentajes de detectores de texto. Añaden vigilancia sin demostrar aprendizaje.

**Decisión de cierre:** sostener, modificar, ampliar o detener. Cualquiera de las cuatro se
documenta con alcance y razones. Cuando la decisión rebasa las atribuciones académicas
operativas, se convierte en una solicitud documentada: necesidad, evidencia disponible,
instancia a consultar y fecha en la que se requiere respuesta.

## El mismo recorrido en tres contextos

### Jefaturas de departamento y academias

La unidad práctica suele ser una academia, un conjunto de asignaturas afines o un tipo de
evaluación compartido. La jefatura facilita acuerdos disciplinares, organiza acompañamiento y
evita que cada docente resuelva en soledad. El producto principal es una guía adaptable que
conserva el juicio docente y vuelve comparables los casos.

### Coordinaciones de licenciatura y posgrado

La unidad práctica es el programa y su progresión. En licenciatura importa distinguir qué
capacidades básicas necesitan protección en los primeros ciclos y dónde la IA puede
incorporarse gradualmente. En posgrado aumenta la relevancia de los procesos de investigación,
autoría, revisión de literatura, tesis, datos y criterios de cada campo. El producto principal
es un mapa que relaciona perfil de egreso, asignaturas, evaluaciones y formación docente.

### Coordinaciones y equipos del SEMS

La implementación necesita considerar el momento formativo, la posible participación de
menores de edad, la mediación docente y las diferencias de acceso entre escuelas. Conviene
comenzar por literacidades básicas, criterios comunes de comunicación y pocos pilotos
acompañados. Cuando la edad o la normativa lo requieran, se definen también los canales de
información y participación de madres, padres o personas tutoras. El producto principal es una
secuencia gradual que las academias puedan adaptar sin perder un núcleo común.

## Una primera sesión de trabajo de 90 minutos

Para iniciar sin convertir la reunión en un debate abstracto:

1. **Antes:** reunir tres programas de asignatura, tres evaluaciones frecuentes, el perfil de
   egreso o referente formativo y dos casos que hayan generado dudas.
2. **Minutos 0–15:** acordar el problema concreto y lo que queda fuera.
3. **Minutos 15–40:** revisar los ejemplos y distinguir hechos, supuestos y vacíos.
4. **Minutos 40–60:** elegir uno o dos casos para un piloto.
5. **Minutos 60–75:** asignar responsable, apoyo, evidencia y ruta de consulta.
6. **Minutos 75–90:** fijar el siguiente producto y la fecha de revisión.

La sesión termina con una ficha de alcance y una tarea verificable. Ese es el producto
esperado, no un reglamento.

## Continúa según la decisión que necesitas tomar

{{< cards >}}
  {{< card link="/ia-educacion/guias/integracion-curricular-ia/" title="Mapear el programa" icon="table-cells" color="#18223c" description="Relaciona perfil de egreso, competencias, asignaturas y evaluaciones afectadas." >}}
  {{< card link="/ia-educacion/guias/lineamientos-eticos-ia/" title="Acordar criterios" icon="scale-balanced" color="#b12028" description="Traduce transparencia, equidad, privacidad y revisión a decisiones operativas." >}}
  {{< card link="/ia-educacion/guias/evaluacion-formativa-ia/" title="Rediseñar evaluación" icon="arrows-rotate" color="#2f7f83" description="Conserva evidencias del proceso sin reemplazar la calidad del producto final." >}}
  {{< card link="/formacion-docente/taller-diseno-actividades-ia-backward/" title="Acompañar al profesorado" icon="person-chalkboard" color="#687653" description="Aplica un taller replicable a actividades y evaluaciones reales del programa." >}}
{{< /cards >}}
