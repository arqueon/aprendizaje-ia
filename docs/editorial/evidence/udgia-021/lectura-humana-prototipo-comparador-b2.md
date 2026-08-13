# Lectura humana del prototipo comparador B2

## Alcance

Esta evidencia corresponde al prototipo local **Compara dos sugerencias sin perder tu
propósito**. La respuesta decide si conviene conservar esa dirección y qué debe revisarse antes de
otra lectura. No autoriza cambios en `content/`, rutas, H5P, Git, publicación, despliegue o Moodle.

## Envío recibido

- Lector: Rubén.
- Fecha del envío: `2026-08-03T03:11:00.829Z` (`2026-08-02T21:11:00.829-06:00`).
- Recorrido: **sí sabe cómo empezar y qué obtiene al final**.
- Dirección: **conservar después de ajustes**.
- Explicación en palabras del lector: “comparar dos sugerencias, pero no se sabe de quién son o
  cómo surgen o el alcance de esas sugerencias”.

La observación anterior es evidencia humana directa. El lector añadió una revisión que solicitó a
DeepSeek. Esas sugerencias se registran como **insumo asistido**, no como una segunda lectura humana
independiente ni como prueba de accesibilidad o comprensión.

## Hallazgo bloqueante de la lectura

La actividad permite reconocer la acción general, el inicio y el producto final, pero deja implícito
el origen y el papel de las sugerencias. Antes de pedir que se comparen debe explicar, mediante el
caso de Renata:

1. quién o qué produjo las dos sugerencias;
2. en qué momento aparecen;
3. qué pueden cambiar del borrador;
4. qué no deciden por la persona.

La dirección local se conserva, pero la comprensibilidad del prototipo no se cierra hasta que este
hallazgo sea atendido y leído de nuevo.

## Insumo asistido que debe evaluarse

La revisión aportada por el lector propone siete mejoras. Para no convertir una lista externa en
una orden de implementación, se organizan por la relación que enseñan y por su alcance:

| Prioridad de evaluación | Relación que debe hacerse visible | Propuesta que merece prueba |
|---|---|---|
| Alta | Las dos sugerencias deben compararse entre sí, no solo procesarse por separado. | Añadir una pregunta de contraste antes de revisar el fragmento. |
| Alta | El propósito orienta las decisiones. | Mostrar el propósito de Renata como modelo antes del campo propio. |
| Alta | La revisión modifica un texto anterior. | Presentar original y versión revisada juntos, en columna única en móvil. |
| Media | El resultado debe permitir ver la decisión tomada. | Crear un resumen comparativo breve; no depender solo del color. |
| Media | La experiencia prepara el concepto y el cierre lo recupera. | Introducir una explicación cotidiana breve y reservar el término “co-creación persona-IA” para después de esa preparación; reiterarlo al final. |
| Media | Cargar un ejemplo no debe destruir trabajo sin reversión. | Conservar temporalmente el borrador previo y ofrecer restaurarlo. |
| Integración futura | El prototipo debe conectarse con el ecosistema cuando exista una ruta aprobada. | Preparar después migas de navegación y “Para seguir explorando”; no inventar ahora enlaces ni integrar el prototipo. |

No se adopta la propuesta de usar colores como único código. Cualquier resumen debe conservar
etiquetas textuales. Tampoco se introducirá “dirección epistémica” antes de explicar la situación en
lenguaje cotidiano: es arquitectura interna mientras no exista mediación suficiente para la
audiencia pública.

## Dictamen

**Comprensible en parte; conservar la dirección y reabrir el ajuste local.**

El prototipo ya orienta el inicio y el resultado, y mantiene fortalezas verificadas en privacidad,
alternativa sin JavaScript, teclado, móvil e impresión. La próxima ronda debe atender primero el
origen y alcance de las sugerencias y el contraste entre ellas. Después, un evaluador separado debe
comprobar la corrección y la lectura humana debe repetirse. Los perfiles diversos y las tecnologías
de asistencia siguen pendientes antes de cualquier integración.
