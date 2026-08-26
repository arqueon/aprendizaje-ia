# AGENTS.md — contrato compartido de trabajo editorial y técnico

Este repositorio combina un sitio Hugo con investigación, escritura educativa y producción institucional. No debe tratarse por defecto como un proyecto exclusivamente de software.

## Contexto que debe cargarse

- Para cualquier cambio del repositorio, conserva las reglas técnicas y visuales de `CLAUDE.md`. Los agentes que no carguen ese archivo automáticamente deben leerlo antes de editar.
- Para una redacción o revisión sustantiva, sigue `.agents/skills/redaccion-editorial/SKILL.md` y carga sólo las referencias que esa skill indique.
- La memoria duradera, el estado editorial y las decisiones viven fuera del repositorio. No los reconstruyas como una segunda fuente de verdad ni expongas rutas, servidores o documentos privados en el contenido público.
- Conserva lo que ya esté bien. No reactives por inferencia estructuras, cursos o métodos retirados.

## Contexto externo en trabajo multiagente

- El coordinador entrega en cada tarea las ubicaciones externas necesarias mediante el prompt o una variable de entorno; nunca hardcodees ni publiques rutas locales en este repositorio.
- Los workers consultan ese contexto en modo de sólo lectura y únicamente en la medida necesaria. Usa `tools/agent-context/read-markdown-tree.sh` para búsquedas y lecturas acotadas cuando el contexto sea un árbol Markdown.
- Un worker no actualiza memoria duradera. Devuelve un bloque `memory_delta` con hechos, decisiones, evidencia y páginas que propondría actualizar; el integrador revisa y persiste lo aceptado al cierre.
- Si el contexto no está disponible por permisos o por máquina, detente y pide al coordinador un extracto acotado. No crees una copia durable, un índice paralelo ni una base vectorial por iniciativa propia.

## Contrato editorial

- El entregable principal es el texto completo revisado en el archivo o formato solicitado, no un resumen del proceso.
- Antes de redactar, establece —a partir del encargo y del contexto disponible— audiencia, propósito, género, tesis o idea rectora, extensión, fuentes y destino. Pregunta sólo si una ausencia cambia materialmente el resultado.
- Escribe en español natural, claro y conceptualmente preciso. La estructura debe ayudar a desarrollar el argumento, no reemplazarlo con encabezados, tablas o listas.
- Desarrolla las transiciones y los pasos intermedios. Distingue hechos, interpretación, inferencias y recomendaciones.
- Conserva objeciones, límites, desacuerdos y ambigüedades relevantes. No cierres una tensión sólo para obtener una conclusión limpia.
- No inventes citas, datos, referencias ni atribuciones. Señala lo que no esté verificado y comprueba las fuentes antes de presentar una pieza como publicable.
- Si existe una muestra de Rubén, úsala para reconocer ritmo, densidad, longitud de párrafos y relación entre exposición y crítica. No copies sus frases ni simules la voz de otra persona.
- Evita prosa telegráfica, simetrías mecánicas, enumeraciones de tres por costumbre, énfasis excesivo y cierres genéricos o edificantes.

## Proceso para textos sustantivos

1. Construye un mapa argumental: pregunta, tesis provisional, progresión, evidencias, objeciones y límites.
2. Redacta un borrador completo en prosa continua.
3. Haz una revisión adversarial de saltos lógicos, simplificaciones, repeticiones, atribuciones y puntos de vista ausentes.
4. Reescribe incorporando la crítica y realiza una edición de ritmo, transiciones y cierre.
5. Verifica las fuentes y, cuando el destino tenga render, revisa el resultado real además del Markdown.

Adapta la profundidad del proceso a la tarea. Una corrección breve no exige fabricar seis artefactos; un ensayo, informe o documento público sí necesita una revisión real antes de cerrarse.

## Material educativo público

- Aplica el criterio de redacción pública comprensible resumido aquí: escritura didáctica, divulgativa, ilustrativa, accesible y reiterativa.
- Parte de una situación reconocible, explica el fenómeno en lenguaje común y sólo después introduce el término técnico.
- Cada idea central necesita desarrollo, ejemplo trabajado, contraste o límite, uso para la audiencia y enlace con lo siguiente.
- Explica antes de resumir. Si una tabla, lista, tarjeta, diapositiva o diagrama contiene toda la explicación, la pieza todavía no está lista.
- Define términos y relaciones donde aparecen; no conviertas una afirmación situada en una regla universal.
- Revisa la página, documento, H5P o diapositiva renderizados y declara qué se verificó y qué sigue pendiente.

## Autorización y entrega

- Preparar, revisar o aprobar localmente un texto no autoriza `commit`, `push`, publicación, despliegue, cambios en Moodle ni mensajes externos.
- Este contrato no autoriza iniciar Orca, lanzar otros agentes ni asignar trabajo. La orquestación requiere una instrucción separada de Rubén.
- Mantén separados el estado preparado, aplicado, verificado y publicado.
