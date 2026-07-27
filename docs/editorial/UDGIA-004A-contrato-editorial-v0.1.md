# Contrato editorial común v0.1

**Ecosistema IA-docencia UDGPlus · UDGIA-004A**

**Estado:** aprobado para la constelación piloto; VoBo de Rubén el 2026-07-27

**Fecha de corte:** 2026-07-27

**Alcance:** Orientaciones institucionales, `aprendizaje-ia`, curso Moodle de referencia y
semillero `alfabetizacion_en_ia`

## 1. Propósito

Este contrato permite que un mismo núcleo conceptual circule por documentos, páginas
públicas y actividades sin copiar la misma prosa ni convertir soportes distintos en una
sola pieza. La coherencia se conserva mediante identificadores, vocabulario, relaciones y
criterios de evidencia compartidos. Cada medio mantiene una función diferente:

- las **Orientaciones** fijan principios, conceptos y criterios institucionales;
- **Hugo** publica conceptos, guías, prácticas, casos y rutas reutilizables;
- **Moodle** secuencia, permite practicar, retroalimenta, evalúa y registra finalización;
- **`alfabetizacion_en_ia`** funciona como esbozo derivado, semillero del curso amplio y
  laboratorio visual; sus contenidos obedecen a lo que consoliden las Orientaciones,
  Hugo y el Moodle de referencia;
- **Logseq** registra decisiones, cortes y relaciones entre versiones, pero no sustituye
  ninguna fuente publicable.

La versión 0.1 se probará únicamente en la constelación **co-creación + dirección
epistémica + evaluación basada en procesos**. No impone una migración retroactiva a todo
el sitio.

## 2. Decisiones canónicas

### 2.1 Núcleo semántico

> La co-creación con IA produce aprendizaje cuando la persona conserva la dirección
> epistémica. La evaluación basada en procesos hace visible esa dirección mediante
> decisiones, versiones, verificación, trazabilidad y reflexión, sin dejar de valorar la
> calidad del producto final.

Esta formulación separa cuatro cuestiones que no deben colapsarse:

1. **qué relación se sostiene:** co-creación persona-IA;
2. **quién conduce el sentido y la validación:** la persona conserva la dirección
   epistémica;
3. **qué evidencia permite valorar el aprendizaje:** el proceso documentado;
4. **qué también se evalúa:** la calidad disciplinar del producto final.

### 2.2 Nombre de la tercera literacidad

El término canónico es **literacidad de co-creación**.

- **Variantes admitidas en prosa:** alfabetización en co-creación y alfabetización para la
  co-creación.
- **Alias de búsqueda:** literacidad de autoría.
- **Uso de «agenciamiento» o «ensamblaje»:** se reserva para explicar el fundamento
  conceptual; no sustituye el nombre público de la literacidad.
- **Regla:** las tres capacidades se nombran **literacidad operativa**, **literacidad
  crítica** y **literacidad de co-creación**. *Alfabetización en IA* nombra el proceso o
  programa formativo que las articula.

### 2.3 Cuatro capas que no compiten

| Capa | Pregunta | Elementos canónicos | Fuente rectora |
|---|---|---|---|
| **R · Principios rectores** | ¿Qué orienta y obliga institucionalmente? | R1 formación antes que regulación · R2 transparencia por defecto · R3 evaluación del proceso · R4 equidad de acceso · R5 responsabilidad distribuida · R6 autonomía y soberanía institucional · R7 revisión periódica | Orientaciones §2.3 |
| **L · Literacidades** | ¿Qué capacidades se desarrollan? | L1 operativa · L2 crítica · L3 de co-creación | Orientaciones §8.2–8.3 |
| **D · Criterios didácticos** | ¿Qué se cultiva mediante la formación? | D1 juicio crítico · D2 conciencia sociotécnica y ética · D3 agencia y hábitos mentales · D4 uso selectivo y no utilización · D5 adaptación contextual | Semillero de alfabetización y piezas formativas de Hugo |
| **P · Patrones de práctica** | ¿Qué debe ocurrir en una actividad concreta? | dirección epistémica · transparencia · evaluación del proceso · verificación · trazabilidad · alternativa sin IA · privacidad · soberanía | Orientaciones, Hugo y evidencia de implementación |

Una página o actividad puede relacionarse con elementos de las cuatro capas, pero nunca
debe renumerarlos, fusionarlos o presentarlos como una lista única.

### 2.4 Precedencia ante conflictos

1. La definición institucional vigente en las **Orientaciones** prevalece para conceptos,
   principios y criterios de gobernanza.
2. La formulación de **Hugo** prevalece para una guía, práctica o caso público.
3. La implementación de **Moodle** prevalece para secuencia, interacción, feedback,
   finalización y evaluación del curso.
4. El semillero de **alfabetización** no prescribe contenidos. Es un esbozo derivado: su
   estructura, secuencia y lenguaje visual deben actualizarse según lo que consoliden las
   Orientaciones, los nodos públicos de Hugo y los elementos didácticos verificados del
   Moodle de referencia. No se considera todavía curso, fuente canónica ni marco rector.
5. Una lección de implementación solo modifica las Orientaciones después de documentarse,
   verificar su procedencia y pasar por revisión.

## 3. Ficha mínima de un nodo

Cada nodo nuevo o revisado del piloto debe declarar los siguientes campos. En Hugo pueden
vivir bajo una clave `ecosistema` del front matter; en Moodle y Orientaciones pueden
registrarse en la matriz de correspondencia.

| Campo | Regla |
|---|---|
| `id` | Identificador estable, semántico y sin depender de una URL. |
| `titulo` | Título canónico en español. |
| `audiencias` | Una o más: `estudiante`, `docente`, `coordinacion`. |
| `intenciones` | Una o más: `comprender`, `decidir`, `diseñar`, `practicar`, `evaluar`, `gobernar`. |
| `tipo` | Uno: `concepto`, `principio`, `guia`, `practica`, `caso`, `herramienta`, `evidencia`, `politica`. |
| `capas` | Identificadores R/L/D/P relacionados; no implica pertenecer a todas. |
| `resultado` | Comprensión, acción o decisión observable que el nodo habilita. |
| `estado_evidencia` | Uno: `institucional`, `evidencia-citada`, `practica-documentada`, `prototipo-escenario`, `opinion`. |
| `fuentes` | Fuentes recuperables o referencia a la formulación canónica; nunca marcadores opacos. |
| `revisado` | Fecha de revisión de contenido y procedencia. |
| `relaciones` | Enlaces tipados hacia otros identificadores. |
| `reutilizacion` | Uno o más: `orientaciones`, `hugo`, `moodle`, `curso-amplio`. |
| `accesibilidad` | Alternativa equivalente para imagen, diagrama o interacción. |
| `responsable` | Rol responsable y fecha de próxima revisión. |

Ejemplo de aplicación futura en Hugo:

```yaml
ecosistema:
  id: literacy.cocreacion
  audiencias: [estudiante, docente]
  intenciones: [comprender, practicar]
  tipo: concepto
  capas: [L3, D3, P.direccion-epistemica, P.trazabilidad]
  resultado: "Distingue co-creación dirigida de delegación pasiva y documenta sus decisiones."
  estado_evidencia: evidencia-citada
  revisado: 2026-07-27
  relaciones:
    - tipo: aplica
      destino: assessment.basada-en-procesos
    - tipo: contrasta
      destino: risk.descarga-cognitiva
  reutilizacion: [hugo, moodle, curso-amplio]
```

Los nombres de campo se prueban primero en la constelación. No se incorporarán al
front matter general hasta confirmar que Hugo los ignora o procesa de forma estable y
que aportan una mejora editorial real.

## 4. Vocabulario controlado inicial

Los identificadores son estables. El término canónico puede aclararse en una revisión,
pero no debe reutilizarse un identificador para otro concepto.

| ID | Término canónico | Uso y límites | Alias o variantes |
|---|---|---|---|
| `concept.ia-generativa` | inteligencia artificial generativa | Sistemas que producen contenido nuevo a partir de instrucciones. | IAG, IA generativa |
| `capacity.alfabetizacion-ia` | alfabetización en IA | Proceso o programa que articula las tres literacidades. | formación en IA; no usar como sinónimo exclusivo de manejo técnico |
| `literacy.operativa` | literacidad operativa | Saber usar, comparar, verificar, documentar e integrar herramientas. | alfabetización operativa |
| `literacy.critica` | literacidad crítica | Comprender sistemas, sesgos y efectos; discernir y verificar. | alfabetización crítica |
| `literacy.cocreacion` | literacidad de co-creación | Sostener un acoplamiento productivo conservando la dirección epistémica. | alfabetización en/para la co-creación; «de autoría» solo como alias |
| `concept.cocreacion-persona-ia` | co-creación persona-IA | Relación productiva en la que el resultado emerge de la interacción. | agenciamiento o ensamblaje al explicar el fundamento |
| `pattern.direccion-epistemica` | dirección epistémica | Capacidad humana de decidir preguntas, sentido, validación, aceptación, descarte y transformación. | evitar reducir a «control humano» |
| `concept.agencia-humana` | agencia humana | Capacidad efectiva de actuar, decidir y responder por el proceso. | no equivale a autonomía técnica del sistema |
| `didactic.aprendizaje-activo` | aprendizaje activo | Aprender al formular, contrastar, transformar y reflexionar. | participación activa solo si hay trabajo cognitivo |
| `didactic.esfuerzo-productivo` | esfuerzo productivo | Dificultad que debe atravesarse para formar una capacidad antes de recibir asistencia. | *productive struggle* |
| `outcome.ganancia-cognitiva` | ganancia cognitiva | La interacción activa el razonamiento y obliga a revisar supuestos. | no equivale a rapidez ni acabado |
| `risk.descarga-cognitiva` | descarga cognitiva | Delegación del trabajo intelectual que correspondía a la persona. | *cognitive offloading* |
| `risk.deriva-metacognitiva` | deriva metacognitiva | Pérdida de conciencia sobre cuánto se ha dejado de pensar. | evitar «pereza» como etiqueta moral |
| `risk.alienacion-epistemica` | alienación epistémica | Pérdida del control interpretativo sobre lo que se presenta como propio. | no confundir con error factual aislado |
| `assessment.basada-en-procesos` | evaluación basada en procesos | Enfoque que valora recorrido, decisiones y revisión junto con el producto. | evaluación por procesos; «evaluación del proceso» cuando se refiere al objeto |
| `assessment.autentica` | evaluación auténtica | Tarea relevante cuyo valor reside en el razonamiento disciplinar movilizado. | no toda tarea «realista» es auténtica |
| `evidence.trazabilidad` | trazabilidad | Posibilidad de reconstruir cómo se produjo un trabajo y qué decisiones intervinieron. | rastro de procedencia |
| `principle.transparencia` | transparencia por defecto | Declarar usos de IA como práctica normal, bidireccional y no punitiva. | transparencia del proceso |
| `practice.declaracion-uso-ia` | declaración de uso de IA | Síntesis de herramientas, fases, aportes y decisiones relevantes. | no exigir la conversación completa |
| `practice.verificacion` | verificación | Contrastar afirmaciones, fuentes, datos y adecuación disciplinar. | lectura lateral cuando corresponda |
| `safeguard.alternativa-sin-ia` | alternativa equivalente sin IA | Ruta que permite alcanzar el mismo resultado sin usar IA. | derecho a la no utilización |
| `safeguard.uso-selectivo` | uso selectivo y no utilización | Decidir cuándo usar, limitar o rechazar la IA. | restricción informada |
| `safeguard.privacidad` | privacidad y protección de datos | Minimizar datos, evitar información sensible y usar entornos adecuados. | no reducir a aviso legal |
| `principle.equidad-acceso` | equidad de acceso | Evitar que costo, infraestructura o condiciones personales creen desventaja. | acceso equitativo |
| `principle.responsabilidad-distribuida` | responsabilidad distribuida | Cada actor responde por decisiones dentro de su ámbito. | no significa responsabilidad difusa |
| `governance.distribuida` | gobernanza distribuida | Las decisiones se toman en el nivel institucional, de programa o de asignatura que corresponde. | gobernanza por niveles |
| `principle.autonomia-soberania` | autonomía y soberanía institucional | Control universitario sobre tecnologías, datos y dependencias. | soberanía tecnológica y de datos como desarrollos específicos |
| `practice.portafolio-proceso` | portafolio de proceso | Selección mínima de versiones, fuentes, decisiones, producto y reflexión. | bitácora o dossier; no transcripción completa de prompts |

## 5. Relaciones tipadas

Solo se permiten estas relaciones en v0.1:

| Relación | Significado |
|---|---|
| `fundamenta` | Aporta el marco o evidencia sobre el que se sostiene otro nodo. |
| `amplia` | Añade profundidad sin cambiar el sentido del nodo de origen. |
| `aplica` | Convierte un concepto o criterio en una acción o diseño. |
| `ejemplifica` | Muestra un caso concreto, no una regla universal. |
| `contrasta` | Presenta un riesgo, límite o alternativa relevante. |
| `requiere` | Es una precondición conceptual o práctica. |
| `continua` | Propone el siguiente paso de un recorrido curado. |

«Relacionado» solo se admite durante inventarios; debe sustituirse por una relación
tipada antes de publicar el piloto.

## 6. Audiencias e intenciones

Cada nodo debe tener una entrada principal, aunque pueda servir a más de una audiencia:

- **Estudio:** comprender, practicar, decidir y reflexionar sobre el propio proceso.
- **Enseño/diseño:** diseñar consignas, secuencias, evidencias, feedback y evaluación.
- **Coordino/gobierno:** establecer criterios, apoyos, responsabilidades, revisión y
  condiciones institucionales.

Las intenciones canónicas son **comprender, decidir, diseñar, practicar, evaluar y
gobernar**. No sustituyen las secciones actuales de Hugo; actúan como una capa de
navegación transversal.

## 7. Evidencia y procedencia

- Una afirmación institucional usa `institucional` y remite a la formulación vigente.
- Una afirmación empírica usa `evidencia-citada` y conserva fuente recuperable.
- Una experiencia real usa `practica-documentada` y distingue contexto, alcance y
  limitaciones.
- Un ejemplo inventado usa `prototipo-escenario`; nunca se presenta como caso real.
- Un ensayo interpretativo usa `opinion` y no simula consenso o evidencia.
- Los informes generados por IA, marcadores sin bibliografía y cifras sin fuente no se
  convierten en evidencia publicable.

## 8. Accesibilidad y equivalencia

Todo diagrama o interacción del piloto debe tener:

1. título y propósito comprensibles fuera del contexto visual;
2. alternativa textual que conserve la relación o decisión central;
3. operación por teclado y foco visible cuando sea interactivo;
4. contenido legible sin movimiento y sin depender solo de color;
5. fallback que permita alcanzar el mismo resultado pedagógico;
6. imagen, crédito, fuente y licencia cuando corresponda.

El fallback no necesita imitar la interacción, pero sí permitir la misma comprensión,
práctica o decisión.

## 9. Criterios de aceptación del piloto

El contrato pasa de v0.1 a v0.2 cuando:

- los mismos identificadores y términos funcionan en una página Hugo, una unidad Moodle y
  una sección práctica derivada de las Orientaciones;
- estudiante, docente y coordinación encuentran una entrada explícita;
- cada enlace del recorrido expresa su relación;
- ninguna afirmación empírica carece de fuente o estado de evidencia;
- la alternativa accesible conserva el propósito de cada H5P;
- proceso y producto se evalúan por separado;
- el vocabulario no obliga a fusionar las capas R/L/D/P;
- una revisión editorial identifica menos ambigüedades que en el corte inicial.

## 10. Control de cambios

La revisión del contrato debe registrar:

- término o campo afectado;
- motivo y evidencia de uso;
- artefactos impactados;
- aliases o redirecciones necesarios;
- fecha y responsable;
- compatibilidad con nodos ya publicados.

No se reescriben identificadores estables ni URL públicas únicamente por una preferencia
terminológica. Primero se añaden aliases, se corrigen títulos visibles y se comprueba la
navegación.
