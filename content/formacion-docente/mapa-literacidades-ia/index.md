---
title: "Las tres literacidades en IA — mapa visual"
date: 2026-05-28
draft: false
description: "Vista panorámica del marco de tres literacidades en IA: operativa, crítica y co-creación. Diagrama, cinco principios por nivel, relación orientativa con Bloom y enlaces a cada infografía."
summary: "Mapa visual del marco de alfabetización en IA en tres niveles acumulativos. Un solo lugar para entender el marco completo y navegar a sus piezas."
tags: ["alfabetizacion-ia", "literacidad", "marco-conceptual", "mapa-visual", "tres-literacidades"]
categories: ["marco-conceptual"]
areas: ["digital", "ia", "formacion"]

showHero: true
showBreadcrumbs: true
showSummary: true
showTableOfContents: true
showReadingTime: true
showAuthor: false
weight: 0
ecosistema:
  id: capacity.alfabetizacion-ia
  titulo: "Alfabetización en IA"
  audiencias: [estudiante, docente, coordinacion]
  intenciones: [comprender, diseñar, gobernar]
  tipo: guia
  capas: [R.formacion, L1, L2, L3]
  resultado: "Distingue las tres literacidades y decide cuál necesita desarrollar una experiencia formativa."
  estado_evidencia: evidencia-citada
  fuentes:
    - "https://www.unesco.org/en/articles/ai-competency-framework-teachers"
    - "https://arqueon.github.io/aprendizaje-ia/formacion-docente/alfabetizacion-agenciamiento-ia/"
  revisado: 2026-07-27
  relaciones:
    - tipo: continua
      destino: literacy.cocreacion
    - tipo: requiere
      destino: literacy.operativa
    - tipo: requiere
      destino: literacy.critica
  reutilizacion: [hugo, moodle, curso-amplio]
  accesibilidad: "Los diagramas se acompañan con explicación y tabla que conservan la progresión y sus matices."
  responsable:
    rol: "Coordinación editorial IA-docencia"
    proxima_revision: 2026-10-27
---

{{< lead >}}
Un mapa visual del marco de tres literacidades que organiza la formación docente en IA en la UdeG. Cada literacidad —operativa, crítica y co-creación— tiene su propia infografía con cinco principios y se conecta con un programa formativo de 60 horas.
{{< /lead >}}

## El marco en un vistazo

{{< mermaid >}}
flowchart LR
    A["**OPERATIVA**<br/><i>usar</i><br/>Bloom: aplicar"]
    B["**CRÍTICA**<br/><i>entender</i><br/>Bloom: analizar · evaluar"]
    C["**CO-CREACIÓN**<br/><i>sostener</i><br/>Bloom: crear"]

    A ==> B ==> C

    style A fill:#007c83,stroke:#123b4a,color:#ffffff,stroke-width:3px
    style B fill:#123b4a,stroke:#102e3a,color:#ffffff,stroke-width:3px
    style C fill:#f7a11a,stroke:#123b4a,color:#123b4a,stroke-width:3px
{{< /mermaid >}}

Los tres niveles son **acumulativos**: cada uno supone el anterior. La operativa por sí sola produce uso fluido sin criterio; la crítica sin operativa es teoría sin práctica; la co-creación sin las dos anteriores deriva en delegación pasiva.

## Las tres literacidades

{{< cards >}}

{{< card title="Alfabetización operativa" icon="keyboard" color="#3b82f6"
    link="/formacion-docente/alfabetizacion-operativa/"
    description="Usar la IA con soltura: formular, comparar, verificar, documentar e integrar al flujo de trabajo." >}}

{{< card title="Alfabetización crítica" icon="magnifying-glass" color="#6366f1"
    link="/ia-educacion/etica-y-transparencia/alfabetizacion-critica-ia/"
    description="Entender los sistemas, sus sesgos y efectos; discernir y verificar lo que devuelven." >}}

{{< card title="Alfabetización para la co-creación" icon="handshake" color="#7c3aed"
    link="/formacion-docente/alfabetizacion-co-creacion/"
    description="Sostener el acoplamiento persona-IA conservando la dirección epistémica del proceso." >}}

{{< /cards >}}

## Los cinco principios de cada literacidad

| <span style="color:#3b82f6">**OPERATIVA**</span> | <span style="color:#6366f1">**CRÍTICA**</span> | <span style="color:#7c3aed">**CO-CREACIÓN**</span> |
|---|---|---|
| 1. Formulación clara de instrucciones | 1. Evaluación crítica y discernimiento | 1. Reconocer el acoplamiento |
| 2. Comparación entre modelos y versiones | 2. Conciencia socio-técnica y ética | 2. Conservar la dirección epistémica |
| 3. Verificación sistemática de salidas | 3. Hábitos mentales y agencia humana | 3. Sostener el ciclo iterativo |
| 4. Documentación del uso | 4. Uso selectivo y no-utilización | 4. Documentar el proceso |
| 5. Integración deliberada al flujo de trabajo | 5. Adaptabilidad contextual | 5. Cultivar la ganancia cognitiva |

## Relación orientativa con la taxonomía de Bloom

{{< mermaid >}}
flowchart TB
    C["**CREAR** — cúspide<br/>Co-creación"]
    EV["**EVALUAR**<br/>Crítica"]
    AN["**ANALIZAR**<br/>Crítica"]
    AP["**APLICAR**<br/>Operativa"]
    CO["**COMPRENDER**<br/>Operativa"]
    RE["**RECORDAR**<br/>Operativa"]

    RE --> CO --> AP --> AN --> EV --> C

    style RE fill:#d9eeec,stroke:#007c83,color:#123b4a
    style CO fill:#b9d8d5,stroke:#007c83,color:#123b4a
    style AP fill:#8cb5b7,stroke:#007c83,color:#123b4a
    style AN fill:#d7e0e2,stroke:#123b4a,color:#123b4a
    style EV fill:#123b4a,stroke:#102e3a,color:#ffffff
    style C fill:#f7a11a,stroke:#123b4a,color:#123b4a,stroke-width:3px
{{< /mermaid >}}

Esta relación sirve para diseñar una progresión, no para establecer equivalencias rígidas.
La literacidad operativa suele movilizar **recordar, comprender y aplicar**; la crítica
hace especialmente visibles **analizar y evaluar**; y la co-creación exige integrar el
juicio para **crear**. Según la tarea, sin embargo, las tres literacidades pueden activar
varios niveles de Bloom a la vez. Lo decisivo es la demanda cognitiva que permanece en la
persona y la evidencia que permite observarla.

## El programa formativo (60 horas)

Las tres literacidades se concretan en un programa modular de seis módulos:

{{< mermaid >}}
flowchart LR
    M1["**Discernimiento**"]
    M2["**Ética<br/>sociotécnica**"]
    M3["**Agencia y<br/>co-creación**"]
    M4["**Uso selectivo**"]
    M6["**Proyecto<br/>integrador**"]
    M5["**Transversal**<br/>Adaptabilidad<br/>disciplinar"]

    M1 --> M2 --> M3 --> M4 --> M6
    M5 -.-> M1
    M5 -.-> M2
    M5 -.-> M3
    M5 -.-> M4
    M5 -.-> M6

    style M1 fill:#3b82f6,stroke:#1d4ed8,color:#ffffff
    style M2 fill:#6366f1,stroke:#4338ca,color:#ffffff
    style M3 fill:#7c3aed,stroke:#5b21b6,color:#ffffff
    style M4 fill:#7c3aed,stroke:#5b21b6,color:#ffffff
    style M6 fill:#7c3aed,stroke:#5b21b6,color:#ffffff
    style M5 fill:#f0fdf4,stroke:#16a34a,color:#166534
{{< /mermaid >}}

- **Discernimiento** y **Ética sociotécnica** construyen la literacidad **operativa** y la **crítica**.
- **Agencia y co-creación** y **Uso selectivo** desarrollan la literacidad de **co-creación**.
- **Adaptabilidad disciplinar**, de carácter transversal, atraviesa los anteriores y traduce las tres literacidades a cada campo de estudio.
- **Proyecto integrador** consolida todo y desplaza la evidencia de aprendizaje del producto al **proceso documentado**.

## Para profundizar

{{< alert "circle-info" >}}
**Otras piezas del marco:**

- [Marco conceptual completo de las tres literacidades](/formacion-docente/alfabetizacion/) — desarrollo textual extenso de los tres niveles.
- [Guía formativa de la co-creación](/formacion-docente/alfabetizacion-agenciamiento-ia/) — progresión en tres sub-niveles (detectar, sostener, diseñar para otros) con indicadores observables.
- [Marco conceptual de la co-creación persona-IA](/ia-educacion/guias/agenciamiento-humano-ia/) — sustento teórico (Deleuze-Guattari, Meshi, ensamblaje cognitivo).
- [Evaluación formativa del proceso](/ia-educacion/guias/evaluacion-formativa-ia/) — cómo desplazar la evaluación al proceso de co-creación.
{{< /alert >}}

## Referencias clave

- Meshi, A. (2024). GPT-ME: A human-AI cognitive assemblage. *Proceedings of the ACM on Computer Graphics and Interactive Techniques*, *7*(4), 55:1–55:8. https://doi.org/10.1145/3664214
- Rousell, D., & Sinclair, M. P. (2025). Desiring-futures in education policy: Assemblage theory, artificial intelligence, and UNESCO's futures of education. *Educational Review*, *77*(6), 1754–1777. https://doi.org/10.1080/00131911.2024.2362176
- UNESCO. (2024). *AI competency framework for teachers*. UNESCO. https://www.unesco.org/en/articles/ai-competency-framework-teachers
- Vallès-Peris, N., & Pareto, J. (2025). Artificial intelligence as a mode of ordering: Automated-decision making in primary care. *Information, Communication & Society*, *28*(11), 2015–2033. https://doi.org/10.1080/1369118X.2024.2406802
- Wang, S., & Zhang, H. (2026). Pedagogical partnerships with generative AI in higher education: how dual cognitive pathways paradoxically enable transformative learning. *International Journal of Educational Technology in Higher Education*, *23*(11). https://doi.org/10.1186/s41239-026-00585-x
- Yang, S., & Ma, R. (2025). Classifying epistemic relationships in human-AI interaction: An exploratory approach. *arXiv preprint*.
