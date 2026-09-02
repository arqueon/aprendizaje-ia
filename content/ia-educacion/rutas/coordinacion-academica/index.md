---
title: "Organiza un piloto de IA en tu departamento o programa, en seis pasos"
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

{{< contrato modo="lectura" quien="Jefaturas de departamento, coordinaciones de licenciatura y posgrado, academias y equipos del SEMS que ven a cada docente resolver por su cuenta qué hacer con la IA, reciben quejas del estudiantado por indicaciones contradictorias y quieren ordenarlo sin uniformar las asignaturas." haras="Vas a entender qué puede coordinar tu equipo y en qué orden: delimitar un problema concreto (por ejemplo, las evaluaciones escritas de primer año que hoy se resuelven con IA), diagnosticarlo, acordar mínimos de programa, acompañar el rediseño docente, pilotar en pocas asignaturas y revisar para decidir si el piloto sigue, cambia, crece o se detiene." tendras="Seis documentos de una página, uno por paso (por ejemplo, la ficha de alcance: «revisar durante un semestre las evaluaciones escritas de primer año, formar a sus doce docentes y acordar cómo se documenta el proceso»), y el guion de una primera reunión de 90 minutos con tu equipo." tarda="Veinte minutos de lectura; noventa minutos la primera sesión de trabajo con tu equipo." ejemplo="El ejemplo recorre toda la ruta: la jefatura de un departamento de ciencias sociales que revisa las evaluaciones escritas de primer año. Aparece en el paso 1 y vuelve al final de cada paso, marcado como «En el ejemplo»." >}}

Cuando cada docente resuelve por su cuenta cómo usar IA, el estudiantado recibe indicaciones
contradictorias y los problemas se descubren tarde. Una jefatura de departamento de ciencias
sociales lo vio en un semestre: doce docentes de primer año, tres reglas distintas sobre
declarar el uso de IA y un examen escrito que el grupo resolvía con una herramienta sin
mostrar comprensión. Esta ruta muestra cómo esa jefatura ordenó expectativas, formación,
evaluación y apoyos sin uniformar todas las asignaturas, y qué documento salió de cada paso.

{{< alert icon="clipboard-check" type="info" >}}
Esta **guía de trabajo** está dirigida a jefaturas de departamento, coordinaciones de
programas docentes de licenciatura y posgrado, academias y equipos del SEMS. Ayuda a
organizar un piloto y acuerdos colegiados; no sustituye las disposiciones universitarias
vigentes.
{{< /alert >}}

## Para quién es esta ruta

{{< cards >}}
  {{< card link="#jefaturas-de-departamento-y-academias" title="Jefaturas y academias" icon="users-gear" description="Necesito acompañar al profesorado, ordenar criterios disciplinares y revisar evaluaciones sin uniformar todas las asignaturas." >}}
  {{< card link="#coordinaciones-de-licenciatura-y-posgrado" title="Licenciatura y posgrado" icon="diagram-project" description="Necesito articular el perfil de egreso, la progresión entre materias y las expectativas de uso de IA del programa." >}}
  {{< card link="#coordinaciones-y-equipos-del-sems" title="SEMS" icon="school" description="Necesito una implementación gradual, apropiada para el nivel formativo y coherente entre escuelas, academias y asignaturas." >}}
{{< /cards >}}

El punto común es concreto. El profesorado debe saber qué puede decidir, qué apoyo recibirá,
qué necesita comunicar al estudiantado y qué se revisará al final del ciclo (por ejemplo, las
rúbricas antes y después del piloto).

## Qué permite coordinar

La ruta se concentra en tareas que pueden convertirse en trabajo colegiado:

- diagnosticar asignaturas, evaluaciones y necesidades docentes;
- acordar mínimos de programa (por ejemplo, qué usos de IA se declaran y cómo) que orienten los programas de asignatura;
- organizar formación y acompañamiento del profesorado;
- preparar pilotos acotados y alternativas equivalentes sin IA;
- reunir lo que permita revisar la práctica al cierre del ciclo (versiones de actividades, consultas recibidas);
- definir una ruta de consulta para casos no previstos.

La coordinación traduce los acuerdos comunes (por ejemplo, «todo uso de IA se declara en una línea») a un contexto disciplinar y acompaña su aplicación.
Cuando una condición necesaria no puede resolverse desde el equipo, se registra como
dependencia: qué se necesita, por qué afecta al piloto, quién debe consultarlo y para cuándo
se requiere una respuesta.

{{< udgia-figure id="udgia-f01-trayectoria" src="trayectoria-habilitar-integrar.svg" >}}
El recorrido distingue tres momentos que pueden solaparse y volver a revisarse:

| Etapa | Qué ocurre | Qué necesita |
|---|---|---|
| Ya está disponible. | La IA ya está presente y en uso cotidiano. | Reconocer que ese acceso, por sí solo, no garantiza aprendizaje. |
| Aprender a utilizarla. | La comunidad comprende sus límites, comprueba sus respuestas y explica decisiones. | Formación que enseñe a comprobar una respuesta y explicar una decisión. |
| Integrarla donde aporta. | La IA se incorpora donde aporta, sin desplazar el aprendizaje. | Revisar lo que ocurre en la práctica. |
{.udgia-table--matrix .udgia-table--row-headers caption="De tener IA disponible a integrarla donde aporta"}

Las orientaciones se concentran en aprender, decidir e integrar. Son revisables a partir
de la experiencia; no constituyen un reglamento cerrado.
{{< /udgia-figure >}}

## El recorrido de un ciclo

![Ciclo operativo de coordinación académica: delimitar, diagnosticar, acordar, acompañar,
pilotar, revisar y documentar la decisión.](ciclo-coordinacion.svg
"Ciclo operativo de coordinación académica")

**Recorrido en texto:** la coordinación delimita un problema docente concreto; reúne una línea de base;
acuerda mínimos de programa; acompaña a quienes rediseñarán programas de asignatura, actividades y
evaluaciones; prueba esos cambios en pocas asignaturas o academias; y revisa lo recogido (rúbricas,
versiones de actividades, consultas) para sostener, modificar, ampliar o detener el piloto. La revisión abre un nuevo ciclo, no una
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

**Ficha de alcance:** una página que dice para qué se actúa (por ejemplo: «que las evaluaciones
escritas de primer año muestren comprensión»), alcance, responsables, calendario, recursos
disponibles y decisiones que quedarán fuera.

**En el ejemplo:** la jefatura escribió: «Alcance: las cuatro asignaturas de primer año con examen
escrito. Problema: el examen se resuelve con IA sin mostrar comprensión. Responsable: la jefatura,
con la presidencia de academia. Revisión: última semana del semestre. Fuera: las asignaturas de
tercer año y la compra de herramientas».

## 2. Diagnosticar prácticas y evaluaciones

El punto de partida es observar qué está ocurriendo en los procesos docentes; la compra de una
herramienta, si llega, viene después:

1. revisar una muestra pequeña de programas de asignatura, instrucciones de tareas y rúbricas;
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

**En el ejemplo:** observado: tres de las cuatro asignaturas evalúan con un ensayo de casa sin
borradores; inferido: el grupo usa IA en dos de ellas, según dos docentes; no se sabe: cuántos
estudiantes tienen acceso a una herramienta de pago.

## 3. Acordar mínimos de programa

El acuerdo fija reglas mínimas que el profesorado puede trasladar a su programa de asignatura
(por ejemplo: «todo uso de IA se declara en una línea al final de la entrega»). Debe responder,
con lenguaje común:

- ¿qué debe enseñarse antes de pedir un uso responsable?;
- ¿qué usos se permiten, se restringen o se excluyen según el aprendizaje esperado?;
- ¿qué uso debe declarar el estudiante y con qué nivel de detalle?;
- ¿qué se conservará del proceso (por ejemplo, borradores fechados o una bitácora breve)?;
- ¿qué alternativa equivalente existe si una persona no puede o no desea usar IA?;
- ¿qué datos nunca deben introducirse en un servicio externo?;
- ¿a quién se consulta un caso no previsto?;
- ¿cuándo y con qué se revisará el acuerdo (por ejemplo, con una muestra de rúbricas y las consultas recibidas)?

Los [lineamientos éticos operativos](/ia-educacion/guias/lineamientos-eticos-ia/) y la
[guía de evaluación formativa](/ia-educacion/guias/evaluacion-formativa-ia/) desarrollan
estas decisiones.

**Guía de programa:** una o dos páginas, fechadas y versionadas, con responsable de revisión.
Debe indicar qué cuerpo colegiado la acordó, en qué asignaturas o procesos se aplicará y
cuándo volverá a revisarse.

**En el ejemplo:** la academia acordó cuatro reglas en una página: se enseña a comprobar una
respuesta antes de pedir uso responsable; el ensayo de casa se entrega con un borrador fechado;
todo uso se declara en una línea; quien no use IA entrega el mismo borrador con comentarios de
una compañera. Firmada por la academia, con revisión al cierre del semestre.

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

**En el ejemplo:** dos sesiones de dos horas en las que las docentes reescriben la instrucción
de su ensayo de casa con la [guía de revisión en tres frases](/ia-educacion/guias/profesorado/),
y una hora quincenal de asesoría con la presidencia de academia.

## 5. Pilotar en un alcance acotado

Un piloto prueba una hipótesis pedagógica y organizativa. Antes de iniciar debe quedar claro:

- qué asignaturas, grupos o academias participan;
- qué cambia en los programas de asignatura, las actividades y la evaluación;
- qué apoyo recibirán docentes y estudiantes;
- qué alternativa se ofrecerá cuando la IA no sea accesible o pertinente;
- qué casos requieren una consulta inmediata y con quién;
- qué se recogerá (versiones de actividades, consultas anonimizadas) y qué no (conversaciones completas, datos personales).

Conviene comenzar con pocos casos contrastantes: una asignatura de fundamentos, una de
aplicación y, cuando corresponda, una de cierre, titulación o investigación. La comparación
permite reconocer dónde la misma orientación necesita expresarse de forma diferente.

**Ficha de piloto:** un registro por caso con qué se busca mejorar, cambio docente, apoyo, qué
se revisará, riesgo, responsable y fecha de revisión.

**En el ejemplo:** dos asignaturas, una de fundamentos y una de aplicación. Cambio: ensayo con
borrador fechado y declaración de una línea. Apoyo: las dos sesiones y la asesoría. Se revisará:
las rúbricas antes y después, los borradores de una muestra de diez estudiantes y las consultas
recibidas. Riesgo: acceso desigual a herramientas de pago; alternativa: la revisión entre pares.

## 6. Revisar lo recogido y decidir

La revisión pregunta si el proceso docente mejoró y si la coordinación pudo sostenerlo. La
cantidad de usos de IA, por sí sola, no responde ninguna de las dos preguntas.

| Qué revisar | Pregunta que permite responder |
|---|---|
| Muestra de programas de asignatura y rúbricas antes y después. | ¿Las expectativas y las reglas de uso se hicieron más claras? |
| Versiones de actividades y evaluaciones. | ¿El rediseño protege o mejora el aprendizaje esperado? |
| Consultas y casos no previstos, anonimizados. | ¿Qué vacíos tuvo la guía y qué apoyo faltó? |
| Asistencia a la formación y lo que salió de ella (instrucciones reescritas, rúbricas nuevas). | ¿La capacitación llegó a la práctica o quedó aislada? |
| Problemas de acceso y alternativas utilizadas. | ¿El piloto produjo o redujo desigualdades? |
| Retroalimentación breve de docentes y estudiantes. | ¿Qué funcionó, para quién y bajo qué condiciones? |
{.udgia-table--comparison .udgia-table--row-headers caption="Qué revisar para decidir sobre un piloto"}

Conviene excluir conversaciones completas con IA, datos personales, rankings de docentes y
porcentajes de detectores de texto. Añaden vigilancia sin demostrar aprendizaje.

**Decisión de cierre:** sostener, modificar, ampliar o detener. Cualquiera de las cuatro se
documenta con alcance y razones. Cuando la decisión rebasa las atribuciones académicas
operativas, se convierte en una solicitud documentada: necesidad, lo observado en el piloto,
instancia a consultar y fecha en la que se requiere respuesta.

**En el ejemplo:** al cierre del semestre, ocho de los diez borradores mostraban un cambio
razonado entre versiones y las consultas fueron cuatro, todas sobre la declaración. Decisión:
sostener el piloto y ampliarlo a las otras dos asignaturas de primer año; la compra de una
herramienta con licencia quedó como solicitud documentada a la dirección del centro.

## El mismo recorrido en tres contextos

### Jefaturas de departamento y academias

La unidad práctica suele ser una academia, un conjunto de asignaturas afines o un tipo de
evaluación compartido. La jefatura facilita acuerdos disciplinares, organiza acompañamiento y
evita que cada docente resuelva en soledad. Lo que sale de aquí es una guía adaptable que
conserva el juicio docente y vuelve comparables los casos.

### Coordinaciones de licenciatura y posgrado

La unidad práctica es el programa y su progresión. En licenciatura importa distinguir qué
capacidades básicas necesitan protección en los primeros ciclos y dónde la IA puede
incorporarse gradualmente. En posgrado aumenta la relevancia de los procesos de investigación,
autoría, revisión de literatura, tesis, datos y reglas de autoría de cada campo. Lo que sale
de aquí es un mapa que relaciona perfil de egreso, asignaturas, evaluaciones y formación docente.

### Coordinaciones y equipos del SEMS

La implementación necesita considerar el momento formativo, la posible participación de
menores de edad, la mediación docente y las diferencias de acceso entre escuelas. Conviene
comenzar por literacidades básicas, acuerdos comunes de comunicación con las familias y pocos
pilotos acompañados. Cuando la edad o la normativa lo requieran, se definen también los canales de
información y participación de madres, padres o personas tutoras. Lo que sale de aquí es una
secuencia gradual que las academias puedan adaptar sin perder un núcleo común.

## Una primera sesión de trabajo de 90 minutos

Para iniciar sin convertir la reunión en un debate abstracto:

1. **Antes:** reunir tres programas de asignatura, tres evaluaciones frecuentes, el perfil de
   egreso o referente formativo y dos casos que hayan generado dudas.
2. **Minutos 0–15:** acordar el problema concreto y lo que queda fuera.
3. **Minutos 15–40:** revisar los ejemplos y distinguir hechos, supuestos y vacíos.
4. **Minutos 40–60:** elegir uno o dos casos para un piloto.
5. **Minutos 60–75:** asignar responsable, apoyo, qué se revisará y ruta de consulta.
6. **Minutos 75–90:** fijar el siguiente entregable (por ejemplo, la línea de base) y la fecha de revisión.

La sesión termina con una ficha de alcance y una tarea verificable, como la que escribió la
jefatura del ejemplo en el paso 1. Eso es lo que se espera de la sesión: una ficha y una tarea,
no un reglamento.

## Continúa según la decisión que necesitas tomar

{{< cards >}}
  {{< card link="/ia-educacion/guias/integracion-curricular-ia/" title="Mapear el programa" icon="table-cells" description="Relaciona perfil de egreso, competencias, asignaturas y evaluaciones afectadas." >}}
  {{< card link="/ia-educacion/guias/lineamientos-eticos-ia/" title="Acordar criterios" icon="scale-balanced" description="Traduce transparencia, equidad, privacidad y revisión a decisiones operativas." >}}
  {{< card link="/ia-educacion/guias/evaluacion-formativa-ia/" title="Rediseñar evaluación" icon="arrows-rotate" description="Conserva evidencias del proceso sin reemplazar la calidad del producto final." >}}
  {{< card link="/formacion-docente/taller-diseno-actividades-ia-backward/" title="Acompañar al profesorado" icon="person-chalkboard" description="Aplica un taller replicable a actividades y evaluaciones reales del programa." >}}
{{< /cards >}}
