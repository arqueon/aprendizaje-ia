# UDGIA-021 — briefs de contenido, imagen e interacción

**Estado:** briefs preparados; B6 tiene prototipo local en PASS; integración bloqueada.  
**Regla común:** mismo caso recurrente, una pregunta distinta por familia, una página
canónica y un único siguiente paso principal.

## Caso recurrente del piloto

Una estudiante prepara una explicación breve para su asignatura. Tiene un primer borrador y
pide a un sistema dos ayudas: una versión más clara que elimina un matiz disciplinar y una
objeción que revela un supuesto no verificado. Debe decidir qué conservar, comprobar y
reescribir. Su docente quiere convertir ese trabajo en una actividad que pueda realizarse con
o sin IA, en una secuencia con preparación, contraste y cierre, y necesita elegir evidencias
que permitan valorar el aprendizaje.

El caso reaparece con otra pregunta en cada familia. No se presenta como experiencia real ni
como regla universal; su estado es `prototipo-escenario`.

## Vista de conjunto

| Familia | Pregunta pública | Visual | Interacción |
|---|---|---|---|
| Entrada | ¿Qué parte del trabajo sigue siendo tuya? | Escena editorial situada | Selector HTML por necesidad |
| Co-creación | ¿Quién formuló, verificó y decidió cada cambio? | Comparador de dos versiones | `ImageSlider` o comparador accesible existente |
| Aprendizaje activo | ¿Qué idea genera, contrasta o revisa la persona? | Secuencia de acciones cognitivas | Escenario de reformulación de consigna |
| Aprendizaje híbrido | ¿Qué recibe y transforma cada momento? | Diagrama antes–durante–después | Hoja de secuencia; no H5P obligatorio |
| SAMR e ICAP | ¿Qué cambió en la tarea y qué hizo la persona con las ideas? | Mismo caso en dos lentes | Comparador anotado HTML |
| Bloom/diseño inverso | ¿Qué quieres observar y qué tarea lo hace visible? | Cadena propósito–evidencia–experiencia–asistencia | Prototipo HTML local + fallback; H5P no reutilizable tal como está |

## 1. Entrada general

### Función y fuentes

- **Canónica:** `ia-educacion/constelaciones/cocreacion-evaluacion/index.md`.
- **Conservar del original:** entrada narrativa, contraste IA/persona, dos rutas por audiencia,
  cuidado de información y portada actual como referencia.
- **Orientaciones:** §§2.2, 3, 4.1, 5 y 6.
- **Guías:** docente partes 1–4; muestras estudiantiles “Todavía no la entrego”, “Cuando dos
  cambios…” y “Cuando el contexto cambia…”.
- **Curso:** prepara evaluación crítica, agenciamiento/co-creación y uso selectivo.

### Microarco

- **Situación:** dos versiones parecen mejores, pero una borra un matiz y otra exige verificar.
- **Idea cotidiana:** una respuesta fluida no muestra quién comprendió ni por qué cambió.
- **Relación central:** propósito → primer intento → ayuda concreta → verificación → decisión.
- **Ejemplo:** la estudiante conserva la objeción, comprueba su fuente y reescribe con sus
  palabras; descarta la simplificación que cambia el sentido.
- **Límite:** dominar una marca o redactar prompts largos no garantiza aprendizaje.
- **Uso:** elegir entrada “estudio” o “enseño/diseño”.
- **Continuidad:** la pregunta “¿quién conservó la dirección?” conduce a co-creación.

### Brief visual

- **Tipo:** escena editorial situada; conservar como dirección la portada actual si pasa
  revisión de procedencia y recorte.
- **Después de verla:** la persona comprende que el trabajo consiste en comparar evidencias y
  decisiones, no en observar una pantalla espectacular.
- **Acción:** estudiante y docente revisan dos versiones impresas/digitales alrededor de una
  mesa; anotaciones, fuentes y flechas son legibles solo como formas, sin texto incrustado.
- **Evitar:** robot, cerebro, holograma, interfaz flotante, pose de “usuario frente a laptop”.
- **Alt provisional:** “Estudiante y docente comparan dos versiones de un trabajo y señalan
  qué evidencia apoya cada cambio.”
- **Decisión:** conservar/ajustar la portada vigente antes de generar un reemplazo.

### Interacción

Selector HTML con tres necesidades: comprender, decidir o diseñar. La selección devuelve una
ruta y explica por qué; no guarda datos ni exige completarla para leer la página.

## 2. Agenciamiento y co-creación

### Función y fuentes

- **Canónica:** `formacion-docente/alfabetizacion-agenciamiento-ia/index.md`.
- **Reubicar:** `alfabetizacion-co-creacion` como aplicación visual; guía de agenciamiento como
  fundamento docente.
- **Orientaciones:** §§3.1–3.6, 4.1, 5 y 8.2–8.3.
- **Guías:** docente parte 2; muestra “Cuando dos cambios parecen mejorar tu trabajo”.
- **Curso:** profundiza “Agenciamiento y co-creación persona-IA” y prepara el proyecto
  integrador documentado.

### Microarco

- **Situación:** el sistema propone dos cambios plausibles con consecuencias diferentes.
- **Idea cotidiana:** colaborar con una herramienta no significa aceptar lo que entrega; la
  persona conserva pregunta, criterio, verificación y decisión.
- **Concepto:** co-creación persona-IA; “agenciamiento” se explica después como fundamento.
- **Ejemplo:** tabla de dos cambios: aporte del sistema, decisión humana, comprobación, versión
  resultante y razón.
- **Contraste:** delegación pasiva, acabado sin comprensión y atribución de responsabilidad al
  sistema.
- **Uso:** documentar un cambio significativo, no la transcripción completa del chat.
- **Continuidad:** si importa quién decide, también importa qué trabajo cognitivo realiza.

### Brief visual

- **Tipo:** comparador de versiones, preferentemente visual gobernado y no portada narrativa.
- **Después de verlo:** la persona comprende que una misma sugerencia puede aceptarse,
  transformarse o descartarse según el criterio y la evidencia.
- **Composición:** dos versiones del mismo fragmento a izquierda/derecha y una franja central
  de decisiones: conservar, comprobar, transformar, descartar. Sin jerarquía ni score.
- **Evitar:** dos cerebros conectados, humano/robot estrechando manos, piezas de rompecabezas.
- **Alt provisional:** “Dos versiones de un trabajo se comparan mediante cuatro decisiones
  humanas: conservar, comprobar, transformar o descartar.”
- **Decisión:** reencuadrar o sustituir la portada; auditar F5 y el H5P existentes.

### Interacción

**Brief B2 · comparación de sugerencias para un borrador (nombre interno).**

**Título público provisional:** "Decide qué hacer con dos sugerencias para el mismo
borrador".

**Audiencia y puente:** está pensada para una persona que revisa un texto propio con ayuda de
IA, de otra persona o de comentarios preparados. Solo necesita saber qué intentaba explicar
en el texto. Si no tiene un borrador, puede trabajar con el caso completo de Renata.

**Objetivo explicado a la audiencia:** aprender a decidir si una sugerencia mejora realmente
un texto. La comparación no busca elegir la frase más bonita ni descubrir cuál respuesta es
"la correcta". Ayuda a observar qué cambia cada sugerencia, qué consecuencia tendría
aceptarla y si esa consecuencia respeta lo que el texto intenta comunicar.

**Relación que debe enseñarse antes de pedir la acción:** las dos sugerencias se aplican al
mismo párrafo y se comparan contra el mismo propósito. Una puede mejorar la redacción y, al
mismo tiempo, deformar la afirmación. Otra puede no ofrecer una frase terminada, pero señalar
una duda que conviene comprobar. Por eso el orden es propósito del texto → cambio propuesto →
consecuencia → comprobación → decisión.

**Ejemplo trabajado completo:** en este caso, el "límite permitido" es la cantidad máxima de
una sustancia que la norma admite en una muestra. Renata escribe: "La muestra tomada junto al
puente no superó el límite permitido. Este resultado describe ese punto y ese día; no alcanza
para afirmar que todo el arroyo sea seguro". Su propósito es explicar qué permite concluir la
medición y qué no permite concluir.

La primera sugerencia dice: "La muestra demuestra que el agua del arroyo es segura". La frase
es más corta, pero convierte un resultado limitado en una afirmación sobre todo el arroyo.
Renata decide no conservarla tal como está. Recupera la brevedad y escribe: "En el punto y la
fecha analizados, la muestra no superó el límite permitido".

La segunda sugerencia dice: "Aclara si llovió antes del muestreo, porque la lluvia pudo cambiar
la concentración". No es una nueva versión del párrafo; es una advertencia. Renata consulta el
registro de campo. Si encuentra ese dato, explica su efecto. Si no lo encuentra, señala la
incertidumbre en lugar de inventar una respuesta.

**Recorrido de la persona:** primero identificará qué intenta comunicar el párrafo. Después
leerá una sugerencia a la vez, marcará qué añade, quita o cambia y anticipará qué ocurriría si
la aceptara. Luego decidirá conservarla, modificarla o descartarla y anotará qué necesita
comprobar. Al final reescribirá el párrafo y explicará una de sus decisiones.

**Producto y aprendizaje observable:** conservará el párrafo revisado y una nota breve por
sugerencia: qué proponía, qué decidió, por qué y qué comprobó o dejó pendiente. El producto
permite observar si la persona mantuvo la dirección del trabajo y si puede responder por la
versión final. Solo después del ejemplo se introducirá "co-creación persona-IA" como nombre
del proceso en el que una herramienta aporta posibilidades y la persona conserva el criterio,
la comprobación y la decisión.

**Cómo reconocer el avance:** la persona podrá explicar por qué la primera sugerencia sonaba
mejor pero afirmaba demasiado, por qué la segunda requería una fuente y cómo esas diferencias
cambiaron su versión final.

**Contraste y límite:** comparar no siempre exige dos respuestas de IA. Pueden compararse dos
comentarios de pares o dos cambios preparados por el docente. Tampoco hace falta conservar
una sugerencia solo porque fue útil para detectar el problema: una idea puede orientar la
revisión y aun así no aparecer en el texto final.

**Apoyos y devolución:** la actividad ofrecerá el caso resuelto antes del caso propio, una
explicación de "propósito" como "lo que quieres que tu texto permita entender" y preguntas
específicas cuando falte una razón o una comprobación. No habrá puntuación ni respuesta única.

**Versión sin interacción:** mostrará el párrafo original, las dos sugerencias y el ejemplo
resuelto antes de una hoja imprimible. La hoja repetirá el mismo recorrido y dejará espacio
para el propósito, el cambio, su consecuencia, la decisión y la comprobación.

**Privacidad y accesibilidad:** las respuestas permanecerán en el navegador y podrán
imprimirse o borrarse. No se recopilarán textos ni instrucciones. Todo funcionará con teclado,
lectura lineal y botones; la comprensión no dependerá de arrastrar elementos, del color ni de
un material oculto.

## 3. Aprendizaje activo

### Función y fuentes

- **Canónica:** `formacion-docente/aprendizaje-activo/index.md`.
- **Aplicación:** guía `aprendizaje-activo-con-ia`; laboratorio como banco de prácticas.
- **Orientaciones:** §§2.2, 4.2–4.6 y 5.1–5.4.
- **Guía docente:** partes 1, 2 y 5.
- **Curso:** apoya la ruta docente de adaptabilidad disciplinar.

### Microarco

- **Situación:** dos estudiantes usan la misma herramienta; uno copia y ordena, otro explica,
  contrasta y revisa.
- **Idea cotidiana:** estar ocupado o participar no revela qué idea se produjo.
- **Concepto:** aprendizaje activo después de describir la conducta.
- **Ejemplo:** una consigna pasa de “lee la respuesta” a “explica el supuesto, compáralo con
  una fuente y revisa tu posición”.
- **Contraste:** encuesta, juego, chat o discusión sin producción cognitiva suficiente.
- **Uso:** describir primero qué generará la persona y qué evidencia lo mostrará.
- **Continuidad:** la conducta debe conectarse entre momentos, no aparecer aislada.

### Brief visual

- **Tipo:** diagrama explicativo en SVG, no raster generativo.
- **Después de verlo:** la persona distingue recibir, manipular, generar y co-construir por la
  acción observable, sin interpretarlo como una escalera obligatoria.
- **Composición:** cuatro viñetas del mismo caso con verbos y productos; disposición en
  cuadrícula/ramas, no pirámide ni flecha ascendente.
- **Evitar:** cerebro luminoso, “nivel bajo/alto”, iconos de clic como evidencia de aprendizaje.
- **Alt provisional:** “El mismo caso cambia según la persona reciba, ordene, explique o
  construya una respuesta común con otra persona.”
- **Decisión:** sustituir portada prioritaria; conservar y auditar la figura gobernada F7 en la
  guía aplicada.

### Interacción

**Brief B3 · revisión guiada de una instrucción (nombre interno).**

**Título público provisional:** "Revisa una instrucción para que el grupo explique y revise
sus ideas".

**Audiencia y puente:** está pensada para docentes que preparan o adaptan una actividad. No
presupone conocimientos sobre aprendizaje activo ni ICAP. Quien no tenga una instrucción
propia puede usar el caso resuelto y modificarlo para su asignatura.

**Objetivo explicado a la audiencia:** comprobar si una instrucción permite ver lo que el
grupo comprendió. Una actividad puede mantener ocupadas a las personas y producir textos
correctos sin mostrar si formularon una idea, la compararon o la revisaron. Esta revisión
ayuda a pedir ese trabajo de manera explícita.

**Relación que debe enseñarse antes de pedir la acción:** una instrucción orienta lo que el
grupo hará y el producto que entregará. Si ofrece una respuesta terminada antes del primer
intento, el resumen final puede ocultar quién comprendió la relación central. Pedir primero
una explicación propia, después un contraste y finalmente una revisión deja visibles tres
momentos del razonamiento. El orden importa porque la ayuda cumple otra función cuando llega
después de que la persona ya tiene algo que poner a prueba.

**Ejemplo trabajado completo:** la actividad busca que el grupo explique por qué una muestra
tomada junto al puente no basta para afirmar que todo el arroyo es seguro. La instrucción
inicial dice: "Lee la respuesta de la IA sobre la calidad del agua y entrega un resumen". Esa
instrucción no impide comprender, pero tampoco exige mostrar la comprensión.

La revisión añade un primer intento: antes de consultar otra explicación, cada estudiante
escribe qué permite afirmar la muestra del puente y qué todavía no puede saberse. Después
compara su respuesta con una fuente sobre muestreo y con la pregunta: "¿Qué cambiaría si
hubiera llovido antes de tomar la muestra?". La pregunta puede provenir de IA, de una tarjeta
preparada o de otra persona. Finalmente revisa su explicación y señala qué dato o razón
influyó en el cambio.

La instrucción resultante dice: "Explica primero qué permite afirmar la muestra tomada junto
al puente y qué no permite afirmar sobre todo el arroyo. Después compara tu explicación con la
fuente sobre muestreo y con la pregunta sobre la lluvia. Revisa tu respuesta y añade una nota
breve: qué cambió y qué dato o razón te llevó a cambiarlo". Ahora el producto no es solo un
resumen; incluye una explicación inicial, una revisión y la razón del cambio.

**Recorrido de la persona:** la actividad mostrará la instrucción inicial y preguntará qué se
quiere aprender. Luego pedirá definir el primer intento, el material de comparación, la
revisión esperada y la explicación final. La persona ordenará esos elementos en una nueva
instrucción, la leerá completa y hará un último ajuste para su contexto.

**Producto y aprendizaje observable:** obtendrá una instrucción editable y una nota que
explica por qué cada paso está ahí. El resultado permite comprobar si el grupo producirá una
idea propia y mostrará cómo cambió. Después del caso podrá introducirse "aprendizaje activo"
para nombrar una experiencia en la que la persona trabaja con las ideas, e ICAP como una forma
de distinguir recibir información, organizarla, generar una explicación o construirla con
otras personas.

**Cómo reconocer el avance:** otra persona podrá leer la nueva instrucción y responder tres
preguntas sin pedir aclaraciones: qué producirá primero el grupo, con qué pondrá a prueba esa
idea y qué tendrá que explicar al final.

**Contraste y límite:** no toda lectura necesita convertirse en una secuencia extensa. Si el
propósito es conocer vocabulario antes de otra actividad, leer y organizar información puede
ser suficiente. La revisión se usa cuando el aprendizaje esperado exige explicar, comparar o
justificar y la instrucción todavía no lo hace visible.

**Apoyos y devolución:** habrá una versión inicial y una revisada del mismo caso, definiciones
cotidianas junto a cada pregunta y opciones de apoyo con IA, materiales preparados o revisión
entre pares. La devolución señalará el paso ausente y explicará qué función cumple; no pedirá
identificar una categoría de ICAP ni premiará palabras determinadas.

**Versión sin interacción:** una hoja mostrará el caso trabajado completo y las preguntas en
el mismo orden. Permitirá escribir la instrucción a mano o en un archivo editable y conservará
la misma exigencia con o sin IA.

**Privacidad y accesibilidad:** los campos admitirán respuestas breves y extensas, conservarán
un orden lineal y funcionarán con teclado y lector de pantalla. El texto permanecerá en el
dispositivo, podrá borrarse y la actividad se comprenderá desde un teléfono sin abrir ayudas
ocultas.

## 4. Aprendizaje híbrido

### Función y fuentes

- **Canónica:** `formacion-docente/aprendizaje-hibrido/index.md`.
- **Cuarentena:** `ia-educacion/integracion-curricular/ia-aprendizaje-hibrido`.
- **Práctica:** aula invertida como patrón posible, no definición.
- **Orientaciones:** §§4.2–4.6 y 8.1–8.5.
- **Guía docente:** partes 1, 2, 3 y 5.
- **Curso:** apoyo de diseño; no fija la modalidad del programa amplio.

### Microarco

- **Situación:** el video previo se repite en la sesión y el cierre no usa lo discutido.
- **Idea cotidiana:** repartir materiales entre momentos no crea continuidad.
- **Concepto:** aprendizaje híbrido como integración funcional.
- **Ejemplo:** borrador asíncrono → contraste síncrono → revisión y explicación asíncrona.
- **Contraste:** aula invertida como única receta, mayor autonomía obligatoria o más
  asincronía como progreso.
- **Uso:** comprobar qué recibe, transforma y entrega cada momento y si las rutas son
  equivalentes en acceso/carga.
- **Continuidad:** una secuencia puede cambiar la tarea y provocar conductas distintas; hacen
  falta dos lentes.

### Brief visual

- **Tipo:** diagrama SVG con dos variantes, horizontal y móvil vertical.
- **Después de verlo:** la persona comprende que cada momento utiliza un producto del anterior
  y prepara el siguiente.
- **Composición:** tres escenas/momentos conectados por productos nombrados con verbos:
  intentar → contrastar → revisar/explicar. Doble ruta accesible cuando no hay sincronía.
- **Evitar:** videollamada genérica, mitad aula/mitad laptop, flecha lineal hacia “autonomía”.
- **Alt provisional:** “Un primer intento se usa durante el contraste y se transforma en una
  revisión final justificada; una ruta alternativa conserva las mismas evidencias.”
- **Decisión:** sustituir portada prioritaria; no rescatar visuales de la página en cuarentena.

### Interacción

**Brief B4 · conexión del trabajo entre momentos (nombre interno).**

**Título público provisional:** "Haz que el trabajo de antes se use durante y después".

**Audiencia y puente:** está pensada para docentes que distribuyen una actividad entre varios
momentos, espacios o formas de participación. No hace falta conocer el término "aprendizaje
híbrido". El punto de partida puede ser una secuencia propia o un caso resuelto de tres tareas
que todavía no se conectan.

**Objetivo explicado a la audiencia:** revisar si cada parte de una secuencia aprovecha el
trabajo realizado en la anterior. Repartir archivos entre una plataforma, una sesión y una
tarea final no crea continuidad por sí mismo. La actividad ayuda a descubrir repeticiones,
productos que se abandonan y pasos finales que no usan lo aprendido durante el recorrido.

**Relación que debe enseñarse antes de pedir la acción:** cada momento necesita recibir algo
que ya existe, transformarlo mediante una acción y dejar un producto útil para continuar. Si
el primer borrador no reaparece durante el encuentro, la preparación pierde su función. Si la
discusión no cambia el trabajo final, el cierre tampoco permite observar qué se aprendió de
ella. El orden se entiende siguiendo un mismo producto, no enumerando plataformas u horarios.

**Ejemplo trabajado completo:** la meta es que el grupo distinga lo que permite afirmar una
muestra tomada junto al puente de lo que se necesitaría investigar para hablar de todo el
arroyo. Antes del encuentro, cada estudiante escribe un primer intento de unas líneas y anota
una duda. Durante la sesión, compara ese mismo texto con el de otra persona, revisa una fuente
sobre muestreo y marca la afirmación que necesita corregir. Después vuelve a su explicación,
la corrige y añade una nota: qué cambió y qué evidencia influyó.

El primer intento no se califica como versión final; sirve para llegar con una idea propia. El
contraste durante la sesión no abre un tema distinto; usa las diferencias entre los borradores.
La revisión posterior tampoco empieza de cero: conserva el texto inicial para que el cambio
pueda verse. Cada momento tiene una función porque recibe y transforma el trabajo anterior.

Si una persona no puede coincidir en el horario, puede comparar su borrador con comentarios
diferidos, una respuesta de un par o dos objeciones preparadas. La ruta cambia de horario y
soporte, pero mantiene el primer intento, el contraste, la revisión y la explicación final.

**Recorrido de la persona:** primero escribirá qué aprendizaje busca la secuencia. Después
nombrará el producto que existe al comienzo de cada momento, la acción que lo cambia y lo que
queda disponible para seguir. Revisará los enlaces entre momentos y corregirá el primero que
repita, abandone o sustituya el trabajo anterior. Al final describirá una ruta alternativa con
la misma oportunidad de formular, contrastar y revisar.

**Producto y aprendizaje observable:** obtendrá una secuencia explicada, no solo un calendario.
Cada momento mostrará qué recibe, qué hace con ello y qué deja. El producto permite justificar
por qué la distribución ayuda al aprendizaje. Después de verlo en acción puede introducirse
"aprendizaje híbrido" como integración deliberada de momentos, no como sinónimo de usar una
plataforma o combinar aula y videollamada.

**Cómo reconocer el avance:** la persona podrá seguir el mismo borrador desde el primer
intento hasta la revisión final y explicar qué añade cada momento. También podrá mostrar que
la ruta alternativa conserva el mismo aprendizaje y una carga comparable.

**Contraste y límite:** una buena actividad puede ocurrir en un solo momento. Dividirla en
antes, durante y después no la mejora si cada parte repite instrucciones o añade traslados sin
una transformación necesaria. La herramienta debe permitir eliminar momentos que no cumplen
una función, no premiar las secuencias más largas.

**Apoyos y devolución:** el caso trabajado seguirá visible mientras se revisa una secuencia
propia. Las ayudas explicarán "producto" como aquello que el grupo ya escribió, decidió o
preguntó y que puede retomarse. La devolución señalará el enlace que falta y pedirá describir
qué se reutiliza o cambia; no clasificará automáticamente la modalidad.

**Versión sin interacción:** una hoja imprimible presentará primero el caso completo y luego
una tabla de antes, durante y después. Cada fila preguntará qué trabajo existe al comenzar,
qué se hace con él y qué queda para continuar. No requerirá H5P ni conexión.

**Privacidad y accesibilidad:** cualquier cambio de orden tendrá una alternativa mediante
botones. El foco seguirá la lectura, los avisos no dependerán del color y la secuencia podrá
comprenderse en disposición vertical desde un teléfono. Los datos permanecerán en el
dispositivo hasta que la persona los imprima o los borre.

## 5. SAMR e ICAP

### Función y fuentes

- **Canónica:** `formacion-docente/modelos-samr-icap/index.md`.
- **Glosario:** SAMR subordinado; ICAP se explica dentro del caso antes de cualquier ficha.
- **Orientaciones:** §4 y §5; los marcos son lentes didácticas, no principios institucionales.
- **Guía docente:** partes 1 y 5.
- **Curso:** adaptabilidad disciplinar y proyecto integrador.

### Microarco

- **Situación:** una herramienta transforma la presentación, pero la persona recibe; otra
  cambia poco el medio y exige construir una explicación.
- **Idea cotidiana:** “qué cambió en la tarea” y “qué hizo la persona con las ideas” son
  preguntas diferentes.
- **Conceptos:** SAMR e ICAP después de preparar ambas preguntas.
- **Ejemplo:** la misma actividad se analiza en dos columnas, con evidencia separada.
- **Contraste:** correspondencias SAMR–Bloom, colaboración nominal, chat = interacción.
- **Uso:** elegir una lente según el problema de diseño y justificar la clasificación.
- **Continuidad:** describir transformación y conducta no sustituye alinear propósito y
  evidencia.

### Brief visual

- **Tipo:** comparador conceptual SVG/HTML de dos paneles.
- **Después de verlo:** la persona comprende que una misma actividad recibe dos diagnósticos
  independientes y que ninguno prueba por sí solo aprendizaje.
- **Composición:** caso al centro; panel izquierdo “qué cambió en la tarea”; derecho “qué hizo
  la persona”; resultados no alineados verticalmente.
- **Evitar:** escaleras, plataformas luminosas, correspondencias por color, pirámides.
- **Alt provisional:** “Una actividad se observa con dos preguntas independientes: cómo
  cambia la tarea y qué genera la persona con las ideas.”
- **Decisión:** sustituir portada e infografías heredadas que muestran jerarquías equivalentes.

### Interacción

**Brief B5 · separación entre cambio técnico y trabajo con las ideas (nombre interno).**

**Título público provisional:** "Separa dos preguntas: qué cambió la tecnología y qué tuvo que
pensar la persona".

**Audiencia y puente:** está pensada para docentes y estudiantes que quieren revisar una
actividad con tecnología. No requiere conocer SAMR ni ICAP. La persona recibe primero dos
versiones completas de la misma actividad y aprende a formular las preguntas con ese ejemplo.

**Objetivo explicado a la audiencia:** evitar que una herramienta novedosa se confunda con un
aprendizaje más profundo. La actividad ayuda a mirar por separado cuánto cambió la tarea y qué
hizo la persona para comprender. Al separar esas preguntas se puede decidir si conviene
conservar la herramienta, cambiar la instrucción o ajustar ambas.

**Relación que debe enseñarse antes de pedir la acción:** la tecnología puede cambiar el medio,
la velocidad, las posibilidades de colaboración o la forma de producir un resultado. Ese
cambio no permite saber, por sí solo, si la persona explicó, comparó, justificó o revisó una
idea. Del mismo modo, una tarea con papel puede exigir un razonamiento complejo. Primero se
describe el cambio de la tarea; después se describe el trabajo con las ideas; al final se
comparan ambas descripciones con el propósito de aprendizaje.

**Ejemplo trabajado completo:** una docente quiere que el grupo explique por qué una muestra
tomada junto al puente no basta para afirmar que todo el arroyo es seguro. En la primera
versión usa una plataforma que reúne respuestas, corrige el formato y muestra una explicación
terminada.
La tarea cambia: ahora el material llega con rapidez, se consulta desde varios lugares y el
formato se corrige automáticamente. Sin embargo, el grupo solo lee la explicación y elige una
opción. La tecnología cambió varias funciones; el trabajo con las ideas siguió siendo recibir
y reconocer.

En la segunda versión, la docente usa una hoja sencilla. Cada estudiante explica primero qué
permite afirmar la muestra y qué queda sin saber, compara su respuesta con una fuente sobre
muestreo y revisa su posición al considerar si llovió antes de recoger el agua. El medio cambia
poco, pero la persona produce una explicación, la pone a prueba y la transforma. Ninguna
versión es mejor por el brillo o la sencillez del soporte. La segunda se acerca más al
propósito porque hace visible la explicación que se quería enseñar.

La docente puede combinar las ventajas: conservar la plataforma para reunir versiones y
añadir una instrucción que pida el primer intento, el contraste y la revisión. La comparación
termina en una decisión de diseño concreta, no en una etiqueta.

**Recorrido de la persona:** primero escribirá qué busca aprender el grupo. Después describirá
qué función cambió por la tecnología y señalará un detalle del caso. En una respuesta separada
anotará qué produjo, comparó o revisó la persona y qué detalle lo demuestra. Por último
decidirá qué conservar y qué modificar para que la actividad sirva a su propósito.

**Producto y aprendizaje observable:** obtendrá dos descripciones y una decisión justificada.
La primera responde qué cambió en la tarea; la segunda, qué trabajo realizó la persona con las
ideas. Solo entonces se presentarán los nombres técnicos: SAMR puede ayudar a describir la
transformación de una tarea e ICAP a distinguir formas de trabajar con el conocimiento. Los
marcos aportan vocabulario para volver a usar las preguntas; no producen la decisión por sí
solos.

**Cómo reconocer el avance:** la persona podrá explicar por qué la plataforma cambió varias
funciones sin exigir una explicación propia, por qué la hoja sencilla sí hizo visible el
razonamiento y qué ajuste permitiría aprovechar ambas fortalezas.

**Contraste y límite:** las dos preguntas no forman una escalera ni deben dar la misma
clasificación. Una sustitución sencilla puede resolver una barrera de acceso y ser la mejor
decisión. Un cambio tecnológico amplio puede añadir carga sin mejorar la tarea. La actividad
no premia la categoría más alta ni supone que más tecnología equivale a más aprendizaje.

**Apoyos y devolución:** las dos versiones del caso permanecerán visibles. Cada pregunta
incluirá ejemplos de cambios de función y de acciones con las ideas, sin dar una respuesta para
copiar. La devolución mostrará si ambas descripciones dicen lo mismo, si falta un detalle del
caso o si la decisión final no se relaciona con el propósito.

**Versión sin interacción:** una hoja presentará el ejemplo completo en prosa antes de una
tabla de dos columnas. Después de responder qué cambió en la tarea y qué hizo la persona, un
espacio adicional pedirá decidir qué conservar y qué modificar.

**Privacidad y accesibilidad:** las respuestas permanecerán en el dispositivo y podrán
imprimirse o borrarse. Las dos preguntas se mostrarán en secuencia vertical en pantallas
pequeñas. Los avisos funcionarán con teclado y lector de pantalla y no dependerán del color,
de una animación ni de contenido oculto bajo el puntero.

## 6. Bloom y diseño inverso

### Función y fuentes

- **Canónica:** `formacion-docente/taxonomia-bloom-diseno-inverso/index.md`.
- **Glosario en cuarentena:** taxonomía de Bloom.
- **Aplicación:** `taller-diseno-actividades-ia-backward`.
- **Orientaciones:** §§4.2–4.6 y 5.1–5.4.
- **Guía docente:** partes 1, 2 y 5.
- **Curso:** adaptabilidad disciplinar y proyecto integrador.

### Microarco

- **Situación:** un resultado usa “analizar”, pero la tarea pide reconocer una opción.
- **Idea cotidiana:** la palabra del objetivo no garantiza el trabajo que se observará.
- **Conceptos:** Bloom revisada para describir demanda; diseño inverso para alinear propósito,
  evidencia y experiencia.
- **Ejemplo:** corregir una tripleta rota y decidir dónde la IA ayuda sin producir la evidencia
  no delegable.
- **Contraste:** pirámide rígida, niveles inferiores “resueltos por IA”, correspondencia con
  SAMR y verbos como clasificador automático.
- **Uso:** revisar una actividad completa antes de elegir la herramienta.
- **Continuidad:** enlazar a guía, taller o curso según la audiencia.

### Brief visual

- **Tipo:** diagrama SVG de alineación y escena editorial secundaria; no pirámide.
- **Después de verlo:** la persona comprende que propósito, evidencia, experiencia y
  asistencia deben sostener la misma operación cognitiva.
- **Composición:** cuatro tarjetas conectadas en ciclo revisable, con un caso de ruptura
  destacado entre resultado “analizar” y evidencia de reconocimiento.
- **Evitar:** vértice, “subir de nivel”, verbos sin tarea, IA ocupando “niveles inferiores”.
- **Alt provisional:** “Una cadena conecta propósito, evidencia, experiencia y asistencia; un
  ejemplo muestra la ruptura entre pedir analizar y evaluar solo reconocimiento.”
- **Decisión:** sustituir portada prioritaria y retirar la portada neón del glosario.

### Interacción

**Brief B6 · revisor de alineación, primera prioridad.** La persona completa propósito,
evidencia, experiencia y asistencia para una actividad propia o para un caso ficticio. El
revisor no clasifica por el verbo: pregunta qué producto permite observar la operación, qué
pasos lo preparan y si la ayuda realiza una parte no delegable. La salida señala la primera
ruptura y pide justificar un ajuste; no redacta automáticamente el objetivo final.

Antes de reutilizar `H5P.BloomObjectiveBuilder` hay que auditar si cumple ese recorrido. El
fallback es una hoja HTML descargable e imprimible con las cuatro secciones, un caso resuelto
y otro parcialmente guiado. Campos, ayudas y mensajes deben funcionar con teclado y lector de
pantalla, conservarse solo en el dispositivo y poder borrarse. Si el H5P no cumple, se usa
únicamente el fallback hasta una revisión independiente.

**Estado del brief:** existe un prototipo HTML local en
`evidence/udgia-021/prototipos/revisor-alineacion-m6/`. La auditoría del H5P concluyó que su
flujo nivel → verbo → componentes y su visual ascendente no cumplen B6. La alternativa local
ordena cuatro respuestas de la persona, sin puntaje ni evaluación semántica. La primera
lectura humana detectó que “cadena”, “ruptura” y los cuatro rótulos técnicos ocultaban la
función. La superficie se reescribió con el enfoque de las guías: caso completo, acción propia
y primer ajuste concreto. Pasó de nuevo QA en raíz, subruta, 320 px, tema oscuro, impresión,
modo sin JavaScript y almacenamiento bloqueado. Continúan pendientes otros perfiles humanos,
la prueba con tecnologías de asistencia y cualquier VoBo de integración.

**Confirmación posterior:** Rubén respondió `Sí`, sin observaciones, a la pregunta de si la
versión reescrita deja claro qué hace la actividad. Esta confirmación cierra su barrera de
claridad, no las pruebas con otros perfiles ni la integración.

## Criterios comunes de las muestras

- El contenido se prepara fuera de `content/`.
- Una escena raster solo se genera si el brief exige contexto humano; los diagramas se crean
  como SVG/HTML gobernado.
- Cada muestra incluye alt, equivalente textual y decisión móvil.
- Nivel y tiempo se declaran no verificados hasta medirlos.
- Cada página se evalúa como artefacto público sin enseñar el Pasaporte al lector.
- Cada interacción declara propósito, acción, evidencia, devolución y criterio para saber qué
  revisar; no usa un puntaje como sustituto de la explicación.
- Debe existir alternativa estática, imprimible y sin JavaScript con la misma exigencia
  cognitiva; la interacción no bloquea la lectura ni la continuidad.
- Teclado, orden de foco, anuncios para lector de pantalla, contraste AA, reflujo móvil,
  movimiento reducido, raíz y subruta se prueban antes de integrar.
- El estado es local, borrable y sin datos personales. Un eventual H5P registra biblioteca,
  versión, procedencia, licencia, fallback y archivo fuente editable.
- Integración, publicación, `push` y Moodle requieren una decisión posterior.
