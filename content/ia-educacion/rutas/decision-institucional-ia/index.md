---
title: "Decidir institucionalmente sobre IA en la docencia"
date: 2026-07-28
draft: false
description: "Marco ejecutivo para que la alta dirección universitaria alinee propósito, gobernanza, capacidades, tecnología, recursos y evidencia al decidir sobre IA en la docencia."
summary: "Seis decisiones para convertir iniciativas dispersas en un mandato institucional acotado, revisable y con responsabilidades claras."
tags: ["gobernanza institucional", "estrategia universitaria", "inteligencia artificial", "soberanía tecnológica", "formación docente", "evaluación"]
categories: ["marco-ejecutivo"]
areas: ["ia", "pedagogia", "digital", "formacion"]
weight: 20
showHero: true
heroStyle: "big"
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
ecosistema:
  id: route.decision-institucional-ia
  titulo: "Decidir institucionalmente sobre IA en la docencia"
  audiencias: [coordinacion]
  intenciones: [decidir, evaluar, gobernar]
  tipo: guia
  capas: [R1, R2, R3, R4, R5, R6, R7, D4, D5, P.trazabilidad]
  resultado: "Formula un mandato institucional revisable que distribuye responsabilidades y prioriza capacidades e iniciativas antes de escalar la adopción."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "Orientaciones institucionales UdG para IA, secciones 2.3, 7, 8, 10 y 11"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/rutas/coordinacion-academica/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/tendencias/politicas-institucionales-universidades/"
  revisado: 2026-07-28
  relaciones:
    - tipo: aplica
      destino: governance.distribuida
    - tipo: aplica
      destino: principle.responsabilidad-distribuida
    - tipo: aplica
      destino: principle.autonomia-soberania
    - tipo: continua
      destino: route.coordinacion-academica-operativa
  reutilizacion: [orientaciones, hugo, moodle, curso-amplio]
  accesibilidad: "El mapa ejecutivo tiene una descripción textual equivalente; las seis decisiones, preguntas y productos permanecen disponibles como encabezados, listas y tabla."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-28
---

{{< lead >}}
La IA ya aparece en asignaturas, evaluaciones, servicios y decisiones de compra. Si cada
iniciativa avanza por separado, la universidad acumula costos, riesgos y criterios
contradictorios. La alta dirección puede dar coherencia sin decidir por cada disciplina ni
convertir una tecnología cambiante en una regla permanente.
{{< /lead >}}

{{< alert icon="landmark" type="info" >}}
Este es un **marco de trabajo adaptable**, no una política institucional vigente, un
dictamen jurídico ni una recomendación de compra. Ayuda a preparar decisiones para las
instancias que tengan atribuciones y a documentar qué debe confirmarse antes de actuar.
{{< /alert >}}

## La decisión no es «adoptar o prohibir»

Una decisión institucional útil no empieza por elegir una herramienta para toda la
universidad. Empieza por aclarar qué problema educativo o institucional merece atención,
qué capacidades deben protegerse y qué condiciones permitirían actuar sin trasladar todo el
riesgo a docentes y estudiantes.

El resultado buscado tampoco es uniformar las asignaturas. Es construir un marco común para
que centros, programas y docentes puedan decidir de forma distinta cuando los resultados de
aprendizaje lo requieran, pero con responsabilidades, salvaguardas y rutas de consulta
reconocibles.

## Seis decisiones que deben avanzar juntas

![Mapa ejecutivo de seis decisiones conectadas: propósito y alcance; gobernanza y
responsabilidades; personas y equidad; datos, tecnología e infraestructura; portafolio y
recursos; evidencia y revisión.](mapa-decisiones-institucionales.svg
"Seis decisiones institucionales conectadas")

**El mapa en texto:** definir para qué se actuará y qué queda fuera; asignar cada decisión al
nivel que puede tomarla; construir capacidades y acceso antes de exigir nuevas prácticas;
fijar salvaguardas para datos, tecnologías e infraestructura; priorizar pocas iniciativas que
la universidad pueda sostener; y revisar evidencia para continuar, modificar, ampliar o
detener. Una decisión débil en cualquiera de estos ámbitos compromete a los demás.

## 1. Propósito y alcance

La primera decisión es nombrar el problema que la IA ayudará a atender. «Modernizar la
universidad» o «incorporar IA» no delimitan una acción evaluable. Un propósito ejecutivo
debe vincularse con la misión educativa y expresar:

- qué proceso docente, formativo o institucional se quiere mejorar;
- para qué población y en qué parte de la red universitaria;
- qué aprendizaje o capacidad humana debe preservarse;
- qué no se intentará resolver en este ciclo;
- cuándo se revisará si la intervención merece continuar.

**Pregunta de control:** si una herramienta concreta desapareciera mañana, ¿el propósito
seguiría siendo válido? Si la respuesta es no, la decisión está atada al proveedor y no al
problema institucional.

**Producto ejecutivo:** una declaración de propósito y alcance de una página, fechada y
revisable.

## 2. Gobernanza y responsabilidades

No todas las decisiones pertenecen al mismo nivel. El marco común debe distinguir:

<div class="udgia-executive-table" role="region" aria-label="Distribución de decisiones y responsabilidades por nivel" tabindex="0">
  <table>
    <caption>Distribución de decisiones y responsabilidades por nivel</caption>
    <thead>
      <tr>
        <th scope="col">Nivel</th>
        <th scope="col">Decide y sostiene</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Institución</th>
        <td>Define los principios, el ciclo de revisión y las condiciones institucionales de licenciamiento, privacidad, infraestructura, equidad y seguimiento agregado.</td>
      </tr>
      <tr>
        <th scope="row">Centro o programa</th>
        <td>Traduce los criterios institucionales al contexto disciplinar, organiza la formación y el acompañamiento, y selecciona los pilotos.</td>
      </tr>
      <tr>
        <th scope="row">Asignatura</th>
        <td>Comunica las expectativas de uso, diseña las actividades y la evaluación, y define las evidencias que conocerá el estudiantado.</td>
      </tr>
    </tbody>
  </table>
</div>

La responsabilidad distribuida evita dos extremos: que cada docente resuelva en soledad
problemas institucionales o que una regla central sustituya el juicio disciplinar. Para cada
decisión debe quedar claro quién propone, quién resuelve, quién implementa, quién debe ser
consultado y quién revisa la evidencia.

**Producto ejecutivo:** una matriz breve de decisiones y responsabilidades, vinculada con las
atribuciones que corresponda confirmar.

## 3. Personas, capacidades y equidad

La formación no es una actividad posterior a la compra. Es una condición de implementación.
Antes de exigir transparencia, verificación, rediseño evaluativo o uso responsable, la
institución necesita hacer posible que su comunidad aprenda esas prácticas.

La decisión ejecutiva debe prever:

- formación progresiva para docentes, estudiantes y equipos de apoyo;
- tiempo y acompañamiento para rediseñar actividades y evaluaciones reales;
- acceso equitativo y alternativas equivalentes sin IA;
- atención a diferencias entre niveles formativos, disciplinas y territorios;
- participación de las comunidades afectadas en el diseño y la revisión;
- reconocimiento de la carga de trabajo que implica experimentar y documentar.

La [ruta de coordinación académica](/ia-educacion/rutas/coordinacion-academica/) muestra cómo
estas condiciones se convierten en acuerdos y pilotos dentro de programas y academias.

**Producto ejecutivo:** un plan de capacidades y acceso ligado al alcance elegido, no un
catálogo genérico de cursos.

## 4. Datos, tecnología e infraestructura

La selección tecnológica necesita criterios previos a cualquier proveedor. Como mínimo, la
institución debe poder responder:

- qué datos pueden procesarse y cuáles no;
- qué funciones requieren supervisión humana y posibilidad de reversión;
- cómo se exportarán datos, contenidos y evidencias;
- qué ocurrirá si cambian precios, términos o disponibilidad;
- qué soporte, seguridad e infraestructura exige la solución;
- cuál es el costo total de permanencia y de salida;
- qué alternativa evita que una función crítica dependa de un único servicio.

Portabilidad, interoperabilidad, transparencia y reversibilidad conservan margen de decisión
institucional. Lo abierto puede aumentarlo cuando existen capacidades para sostenerlo, pero
no sustituye la evaluación pedagógica, técnica, jurídica y presupuestal.

**Producto ejecutivo:** requisitos institucionales mínimos y una ruta de dictámenes antes de
licenciar o escalar.

## 5. Portafolio y recursos

No todas las iniciativas de IA merecen crecer al mismo tiempo. Conviene valorar cada una por
dos preguntas:

1. ¿cuánto contribuye al propósito educativo e institucional?;
2. ¿existe capacidad real para sostenerla de forma responsable?

{{< udgia-figure id="udgia-f17-priorizacion" src="matriz-priorizacion.svg" >}}
La matriz examina una iniciativa mediante cuatro criterios del marco UDGIA:

| Criterio | Pregunta de decisión | Evidencia mínima |
|---|---|---|
| Propósito de aprendizaje. | ¿Qué problema formativo resuelve y para quién? | Resultado esperado y población definidos. |
| Salvaguardas. | ¿Protege agencia, equidad, datos y responsabilidad humana? | Riesgos, alternativa y responsables identificados. |
| Capacidad para sostener. | ¿Existen personas, tiempo, infraestructura y acompañamiento? | Recursos y responsable operativo confirmados. |
| Evidencia y revisión. | ¿Puede probarse a pequeña escala y revisarse? | Indicadores, fecha de revisión y criterio de salida. |

El cruce de esos criterios abre cuatro orientaciones:

- **Priorizar y pilotar**, cuando propósito, salvaguardas, capacidad y revisión están
  suficientemente definidos.
- **Preparar condiciones**, cuando el propósito es sólido pero faltan capacidad o
  salvaguardas.
- **Reformular**, cuando el problema, la población o la evidencia esperada siguen siendo
  ambiguos.
- **No priorizar por ahora**, cuando la contribución es insuficiente o los riesgos y costos
  resultan desproporcionados.

Es una síntesis original del marco UDGIA para apoyar deliberaciones. No sustituye la
evaluación pedagógica, ética, normativa, presupuestal o contextual.
{{< /udgia-figure >}}

<div class="udgia-executive-table udgia-executive-table--portfolio" role="region" aria-label="Criterios para priorizar iniciativas del portafolio" tabindex="0">
  <table>
    <caption>Criterios para priorizar iniciativas del portafolio</caption>
    <thead>
      <tr>
        <th scope="col">Aporte</th>
        <th scope="col">Capacidad</th>
        <th scope="col">Decisión provisional</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Alto</th>
        <td>Suficiente</td>
        <td>Pilotar o ampliar con evidencia y salvaguardas.</td>
      </tr>
      <tr>
        <th scope="row">Alto</th>
        <td>Insuficiente</td>
        <td>Construir primero la capacidad que falta.</td>
      </tr>
      <tr>
        <th scope="row">Incierto</th>
        <td>Suficiente</td>
        <td>Experimentar en una escala pequeña para aprender.</td>
      </tr>
      <tr>
        <th scope="row">Bajo</th>
        <td>Cualquiera</td>
        <td>Posponer o detener la iniciativa y liberar recursos.</td>
      </tr>
    </tbody>
  </table>
</div>

Cada iniciativa del portafolio debe tener responsable, población, costo, dependencia,
salvaguarda, resultado observable, evidencia y fecha de revisión. El número de herramientas
adquiridas o de personas registradas no demuestra por sí mismo una mejora educativa.

**Producto ejecutivo:** un portafolio pequeño y comparable, con recursos y criterios de
salida explícitos.

## 6. Evidencia, revisión y continuidad

La medición debe servir para decidir, no para vigilar. El seguimiento agregado puede
combinar:

- cobertura y profundidad de la formación;
- claridad de los acuerdos en programas y asignaturas;
- cambios documentados en actividades y evaluaciones;
- acceso efectivo y uso de alternativas;
- incidentes, consultas y riesgos detectados, con datos minimizados;
- costos, dependencias y capacidad de soporte;
- resultados de aprendizaje y experiencia de docentes y estudiantes;
- decisiones tomadas después de revisar la evidencia.

Conviene excluir rankings individuales, conversaciones completas con IA y porcentajes de
detectores de texto. Esos datos aumentan la vigilancia sin responder si el aprendizaje o la
capacidad institucional mejoraron.

La revisión termina con una decisión explícita: **continuar, modificar, ampliar o detener**.
También fija qué se aprendió, qué se comunicará y cuándo volverá a revisarse el marco.

**Producto ejecutivo:** un tablero mínimo de preguntas e indicadores, acompañado por una
minuta de decisión.

## El mandato institucional revisable

Las seis decisiones pueden resumirse en una pieza breve que dé dirección sin cerrar el
debate. Debe contener:

1. propósito, población y alcance;
2. principios y salvaguardas no negociables;
3. decisiones por nivel y ruta de consulta;
4. capacidades y condiciones de acceso que deben financiarse;
5. requisitos para datos, tecnologías e infraestructura;
6. portafolio inicial, responsables y recursos;
7. evidencia mínima y fecha de revisión;
8. asuntos que requieren dictamen o acuerdo de la instancia competente.

Ese mandato permite empezar con límites claros. Las políticas, guías disciplinares y
expectativas de asignatura pueden desarrollarse después en su nivel correspondiente, sin
confundir una prueba con una regla definitiva.

## Una primera conversación ejecutiva

Una sesión inicial puede trabajar sobre evidencia concreta y terminar con decisiones
preparatorias:

1. reunir las iniciativas existentes, sus responsables, costos, poblaciones y dependencias;
2. elegir un problema institucional que justifique coordinación transversal;
3. identificar qué decisiones pertenecen a institución, programa y asignatura;
4. reconocer capacidades, dictámenes y salvaguardas faltantes;
5. seleccionar una o dos iniciativas para un portafolio inicial;
6. nombrar el producto siguiente, la instancia que lo revisará y la fecha de regreso.

La sesión no termina con una política improvisada. Termina con un alcance, una lista de
información faltante y responsables para preparar una decisión competente.

## Continúa según la decisión que necesitas preparar

{{< cards >}}
  {{< card link="/ia-educacion/rutas/coordinacion-academica/" title="Organizar pilotos académicos" icon="people-group" description="Convierte el marco común en acuerdos, acompañamiento y evidencia dentro de programas, academias y SEMS." >}}
  {{< card link="/ia-educacion/guias/integracion-curricular-ia/" title="Mapear el impacto curricular" icon="table-cells" description="Relaciona perfil de egreso, competencias, asignaturas y evaluaciones antes de escalar." >}}
  {{< card link="/ia-educacion/guias/lineamientos-eticos-ia/" title="Preparar salvaguardas" icon="scale-balanced" description="Traduce transparencia, privacidad, equidad y revisión a decisiones operativas." >}}
  {{< card link="/ia-educacion/tendencias/politicas-institucionales-universidades/" title="Comparar marcos institucionales" icon="landmark" description="Revisa patrones de gobernanza y los límites de una política uniforme." >}}
{{< /cards >}}
