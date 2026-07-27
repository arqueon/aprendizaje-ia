---
title: "Co-crear con dirección: aprender y evaluar el proceso"
date: 2026-07-27
draft: false
description: "Constelación de rutas y actividades para co-crear con IA, conservar la dirección epistémica y valorar el aprendizaje mediante evidencias del proceso."
summary: "Tres entradas —estudiante, docente y coordinación— conectan co-creación, dirección epistémica, trazabilidad y evaluación basada en procesos."
tags: ["co-creación", "dirección epistémica", "evaluación de procesos", "h5p", "trazabilidad"]
categories: ["ruta-de-aprendizaje"]
areas: ["ia", "evaluacion", "pedagogia", "formacion"]
showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
ecosistema:
  id: route.cocreacion-evaluacion
  titulo: "Co-creación y evaluación basada en procesos"
  audiencias: [estudiante, docente, coordinacion]
  intenciones: [comprender, decidir, diseñar, practicar, evaluar, gobernar]
  tipo: guia
  capas: [R.orientacion, L3, D.cocreacion-evaluacion, P.direccion-epistemica, P.trazabilidad]
  resultado: "Elige una ruta, practica decisiones de co-creación y define evidencias proporcionales del aprendizaje."
  estado_evidencia: prototipo-escenario
  fuentes:
    - "https://arqueon.github.io/aprendizaje-ia/formacion-docente/alfabetizacion-agenciamiento-ia/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/guias/evaluacion-formativa-ia/"
    - "https://arqueon.github.io/aprendizaje-ia/ia-educacion/productos-de-aprendizaje/ensayo/"
  revisado: 2026-07-27
  relaciones:
    - tipo: requiere
      destino: pattern.direccion-epistemica
    - tipo: aplica
      destino: assessment.basada-en-procesos
    - tipo: continua
      destino: practice.portafolio-proceso
    - tipo: contrasta
      destino: risk.descarga-cognitiva
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "Cada H5P incluye una alternativa abierta que conserva la misma comprensión, práctica o decisión."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
Usar IA no garantiza co-creación ni aprendizaje. La diferencia aparece cuando la persona
formula, verifica, decide, transforma y puede explicar qué cambió. Esta ruta conecta esas
decisiones con una evaluación que observa el proceso **y** el producto.
{{< /lead >}}

{{< alert icon="flask" type="info" >}}
Esta constelación es un **prototipo pedagógico**: organiza conceptos y actividades para
probarlos con tres audiencias. No presenta resultados de una implementación real ni
sustituye la secuencia, el acompañamiento o el seguimiento que corresponderían a un curso.
{{< /alert >}}

## Elige tu entrada

{{< cards >}}
  {{< card link="#estudio" title="Estudio" icon="user-graduate" color="#007c83" description="Comprende la co-creación, practica decisiones y reúne evidencias mínimas de tu proceso." >}}
  {{< card link="#enseno-y-diseno" title="Enseño y diseño" icon="chalkboard-user" color="#123b4a" description="Define el esfuerzo humano, los puntos de control y criterios separados para proceso y producto." >}}
  {{< card link="#coordino-y-gobierno" title="Coordino y gobierno" icon="building-columns" color="#f7a11a" description="Acuerda condiciones, apoyos, responsabilidades y un ciclo de revisión del piloto." >}}
{{< /cards >}}

## Un núcleo, tres recorridos

{{< mermaid >}}
flowchart LR
    C["Co-creación<br/>persona-IA"] --> D["Dirección<br/>epistémica"]
    D --> G["Ganancia<br/>cognitiva"]
    D --> E["Evaluación basada<br/>en procesos"]
    E --> T["Trazabilidad<br/>proporcional"]
    T --> R["Reflexión y<br/>responsabilidad"]
    C --> X["Delegación<br/>pasiva"]
    X --> O["Descarga<br/>cognitiva"]
    E --> P["Calidad del<br/>producto"]

    style C fill:#007c83,stroke:#123b4a,color:#ffffff
    style D fill:#f7a11a,stroke:#123b4a,color:#123b4a
    style G fill:#d9eeec,stroke:#007c83,color:#123b4a
    style E fill:#123b4a,stroke:#102e3a,color:#ffffff
    style T fill:#f6f1e8,stroke:#007c83,color:#123b4a
    style R fill:#d9eeec,stroke:#007c83,color:#123b4a
    style X fill:#ead7ce,stroke:#9a4e3f,color:#123b4a
    style O fill:#9a4e3f,stroke:#6f332b,color:#ffffff
    style P fill:#f6f1e8,stroke:#123b4a,color:#123b4a
{{< /mermaid >}}

En texto, la relación central es:

1. La **co-creación** necesita dirección epistémica; sin ella puede convertirse en
   delegación pasiva.
2. La **dirección epistémica** se observa en preguntas, verificaciones y decisiones de
   aceptar, transformar o descartar.
3. Esas decisiones dejan una **trazabilidad proporcional**: no el chat completo, sino las
   evidencias de mayor valor.
4. La evaluación basada en procesos lee esas evidencias junto con la **calidad del producto**.
5. El criterio de éxito es la **ganancia cognitiva**: qué comprensión o estrategia puede
   explicar y transferir la persona.

## Estudio

Tu salida observable es poder defender qué decidiste, verificaste, transformaste o
rechazaste.

1. Formula una pregunta, propósito o tesis antes de usar IA.
2. Usa el sistema para recibir objeciones, alternativas o conexiones.
3. Verifica afirmaciones y fuentes; decide qué sirve al propósito.
4. Compara versiones y conserva dos o tres decisiones relevantes.
5. Entrega producto, evidencias mínimas, declaración y reflexión.

## Enseño y diseño

Tu salida observable es una actividad donde la función de la IA, el rastro esperado y los
criterios de evaluación sean explícitos.

1. Define el resultado de aprendizaje y el esfuerzo que debe permanecer humano.
2. Decide si la IA amenaza, no afecta o habilita ese resultado.
3. Diseña una secuencia antes–durante–después con puntos de control.
4. Especifica evidencias mínimas y una alternativa equivalente sin IA.
5. Evalúa proceso y producto con criterios separados.
6. Revisa privacidad, equidad, procedencia y carga documental.

## Coordino y gobierno

Tu salida observable es poder aprobar, condicionar o detener un piloto mediante criterios
trazables.

1. Acuerda vocabulario, principios y responsabilidades comunes.
2. Distingue las decisiones institucionales, de programa y de asignatura.
3. Garantiza formación, apoyos, privacidad, equidad y alternativa sin IA.
4. Recoge evidencia de implementación sin convertir anécdotas en política.
5. Fija fecha, responsables y criterios para revisar o cerrar el piloto.

## Practica el núcleo

Las seis actividades pueden abrirse de forma independiente. Cada una mantiene debajo una
versión accesible y equivalente; por ello el recorrido sigue siendo útil sin JavaScript o
sin cargar el H5P.

{{< h5p id="cocreacion-versiones-slider" load="manual" title="Tres versiones de una co-creación" >}}
### Compara las tres versiones

| Momento | Qué conserva la persona | Evidencia útil |
|---|---|---|
| Borrador propio | Propósito, tesis, criterios y preguntas iniciales. | Esquema o primera versión. |
| Interrogación con IA | Verifica objeciones, conexiones y fuentes propuestas. | Tabla breve: verificada, descartada o pendiente. |
| Revisión justificada | Acepta, transforma o rechaza aportes desde sus criterios. | Dos o tres cambios explicados y producto final. |

**Pregunta de comparación:** ¿qué cambio no se explicaría solo por copiar una respuesta del
sistema? Señala la decisión humana y el criterio que la sostuvo.
{{< /h5p >}}

{{< h5p id="direccion-epistemica-hotspots" load="manual" title="Cinco decisiones de dirección epistémica" >}}
### Recorre el mapa en forma de lista

1. **Preguntar:** formula propósito, alcance y dudas iniciales.
2. **Verificar:** contrasta datos, referencias y supuestos con fuentes pertinentes.
3. **Aceptar o descartar:** decide qué aportes sirven y conserva una razón breve.
4. **Transformar:** corrige, combina o reescribe desde criterios propios.
5. **Documentar:** reúne borrador, fuentes y decisiones; no exige el chat completo.

**Resultado equivalente:** elige una decisión que ya realizas bien y una que necesitas
hacer visible en tu próximo trabajo.
{{< /h5p >}}

{{< h5p id="cocreacion-conceptos-cards" load="manual" title="Conceptos para co-crear con dirección" >}}
### Cuatro relaciones que conviene recordar

| Pregunta | Respuesta razonada |
|---|---|
| ¿Co-crear equivale a delegar? | No. Distribuye trabajo, pero la persona conserva propósito, criterios, verificación y decisión final. |
| ¿Qué conserva la persona? | La dirección epistémica: formular, contrastar y decidir qué cuenta y por qué. |
| ¿Qué hace visible el proceso? | Una trazabilidad proporcional de borradores, fuentes y decisiones. |
| ¿Qué distingue aprendizaje de aceleración? | La ganancia cognitiva: algo que la persona puede explicar y transferir. |

**Práctica:** escribe un ejemplo y un contraejemplo de co-creación en tu disciplina.
{{< /h5p >}}

{{< h5p id="evaluacion-proceso-decision" load="manual" title="Qué evidencia muestra aprendizaje" >}}
### Decide con la explicación visible

Una estudiante presenta un ensayo sólido después de usar IA. ¿Qué evidencias permiten
valorar aprendizaje sin exigir el chat completo?

- **Sí:** tesis o esquema previo; permite comparar el punto de partida.
- **Sí:** tabla de fuentes propuestas, verificadas y descartadas; muestra criterio.
- **Sí:** dos o tres decisiones de revisión explicadas; muestra juicio y transformación.
- **No:** número total de prompts; cantidad no equivale a calidad.
- **No:** porcentaje de un detector; no reconstruye el proceso de aprendizaje.

El conjunto mínimo combina punto de partida, verificación y decisiones justificadas.
{{< /h5p >}}

{{< h5p id="cocreacion-evaluacion-recorrido" load="manual" title="Recorrido: co-crear y evaluar con IA" >}}
### Guía lineal equivalente

1. **Empieza con una posición propia:** conserva esquema, hipótesis o criterios iniciales.
2. **Interroga y verifica:** busca objeciones y contrasta datos y fuentes.
3. **Transforma y justifica:** compara versiones y explica razones de cambio.
4. **Evalúa proceso, producto y transferencia:** la persona explica; el docente combina
   criterios; la coordinación acuerda mínimos sin vigilancia exhaustiva.

Al cerrar, responde: ¿qué evidencia permite ver una decisión intelectual y cuál solo
registra uso de una herramienta?
{{< /h5p >}}

{{< h5p id="objetivos-bloom-udgplus" load="manual" title="Constructor de objetivos de aprendizaje UDGPlus" >}}
### Plantilla equivalente para formular el objetivo

Completa en este orden:

| Componente | Pregunta | Tu formulación |
|---|---|---|
| Audiencia | ¿Quién aprende? | Al finalizar, el estudiante… |
| Verbo y contenido | ¿Qué hará y sobre qué? | … |
| Condición | ¿Con qué recursos o contexto? | … |
| Criterio | ¿Con qué calidad o estándar? | … |
| Evidencia | ¿Qué producto o actuación permitirá observarlo? | … |

Después decide:

1. ¿Qué esfuerzo necesita atravesar la persona antes de recibir asistencia?
2. ¿En qué fase la IA amenaza, no afecta o habilita el objetivo?
3. ¿Qué evidencia permite evaluar el aprendizaje sin confundirlo con el acabado?

**Ejemplo:** «Al finalizar, el estudiante **contrastará** dos fuentes académicas a partir de
un caso, justificando al menos tres diferencias mediante un informe comparativo».
{{< /h5p >}}

## Continúa según tu intención

| Si necesitas… | Continúa con… | Relación |
|---|---|---|
| Entender la progresión completa | [Mapa de las tres literacidades](/formacion-docente/mapa-literacidades-ia/) | `amplia` |
| Formarte en co-creación | [Alfabetización en co-creación](/formacion-docente/alfabetizacion-agenciamiento-ia/) | `continua` |
| Profundizar el fundamento | [Co-creación y agenciamiento](/ia-educacion/guias/agenciamiento-humano-ia/) | `fundamenta` |
| Diseñar evaluación | [Evaluación formativa y basada en procesos](/ia-educacion/guias/evaluacion-formativa-ia/) | `aplica` |
| Adaptar una práctica | [Portafolio de proceso](/laboratorio/practicas/evaluacion-formativa-asistida-ia/) | `ejemplifica` |
| Revisar un caso completo | [Ensayo como proceso](/ia-educacion/productos-de-aprendizaje/ensayo/) | `ejemplifica` |
| Precisar el resultado | [Ganancia cognitiva](/recursos/glosario/ganancia-cognitiva/) | `continua` |

## Límites y cuidado de datos

Estas actividades no solicitan cuenta, no califican, no envían respuestas a Moodle ni a un
LRS y no conservan conversaciones con sistemas de IA. Su propósito es ofrecer práctica y
feedback local. Una implementación en curso deberá definir por separado seguimiento,
privacidad, alternativa sin IA, criterios de finalización y resguardo de evidencias.
