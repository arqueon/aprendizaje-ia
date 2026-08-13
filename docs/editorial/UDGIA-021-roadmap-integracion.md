# UDGIA-021 — roadmap de enriquecimiento e integración

**Estado:** columna en PASS local y primer prototipo M6 verificado; integración no autorizada.  
**Fecha:** 2026-08-02.  
**Fuente:** inventario reproducible, estándar UDGIA-021, Pasaporte `0.8` y decisiones humanas registradas.

## Resultado buscado

Convertir el sitio en una biblioteca formativa coherente que permita a estudiantes y docentes:
comprender una relación mediante un caso, tomar una decisión acotada, reconocer qué criterio
proviene de las Orientaciones y continuar hacia la guía, práctica o tarea de curso pertinente.

El rediseño no se mide por cantidad de imágenes, H5P o páginas reescritas. Se mide por
comprensión, función, continuidad y recuperación de la fuente marco con su estatus explícito.

## Orden de trabajo

| Lote | Piezas | Propósito | Cierre necesario |
|---|---:|---|---|
| L1 · núcleo y riesgos | 15 | Resolver seis páginas canónicas y sus apoyos, cuarentenas y aplicaciones | Columna comprensible, fuentes recuperables y VoBo de integración |
| L2 · apoyos y prácticas | 30 | Convertir guías y laboratorio en acciones con evidencia y alternativa | Tareas probadas, fallbacks y rutas por audiencia |
| L3 · ejemplos disciplinares | 27 | Mostrar cómo cambia el criterio por contexto | Revisión por campo y transferencia sin falsa universalidad |
| L4 · referencias y observatorio | 57 | Separar evidencia, tendencia, interpretación y fecha de vigencia | Procedencia, actualización y enlaces tipados |
| L5 · navegación y exteriores | 29 | Normalizar entrada, secciones, glosario e índices | Recorridos sin callejón y páginas sin portadas innecesarias |

## Flujo de cada pieza

1. Confirmar función y página canónica; no reescribir duplicados como si fueran equivalentes.
2. Vincular Orientaciones, guía y curso mediante el contrato de relaciones tipadas.
3. Desarrollar situación, explicación, relación, caso, contraste, uso y recapitulación.
4. Elegir escena situada, diagrama, icono o ausencia de imagen por función.
5. Añadir interacción solo si hace posible una comparación, decisión o producción relevante.
6. Ejecutar evaluación separada, optimización acotada, segunda ronda y lector en frío.
7. Probar accesibilidad, móvil, raíz/subruta, procedencia, licencia y presupuesto de peso.
8. Solicitar VoBo de integración sobre archivos concretos; después verificar Hugo y despliegue
   únicamente dentro del alcance aprobado.

## Frente visual

### Saneamiento transversal antes de producir más activos

- normalizar las 35 extensiones que no corresponden al formato real;
- resolver los dos bundles con más de un `featured`;
- decidir el duplicado exacto en dos grupos;
- retirar o sustituir la portada animada genérica;
- convertir las 20 portadas repetitivas del glosario en iconos compartidos o ausencia visual;
- priorizar 25 sustituciones y 21 identidades de sección, sin rediseñar por cuota.

### Regla aprobada para escenas

Toda escena debe hacer visibles tres anclas: campo o problema, evidencia o artefacto y decisión
o consecuencia. Si las personas pueden intercambiarse por cualquier grupo frente a una
laptop, la escena falla aunque sea atractiva. Para relaciones conceptuales se usan diagramas
nativos; para navegación, iconos; cuando nada añade comprensión, no se usa portada.

## Frente narrativo y didáctico

- Atender primero 76 piezas con mediación narrativa débil y 25 con mediación didáctica débil.
- Resolver antes las 11 alertas conceptuales prioritarias.
- Mantener núcleo, puente y profundización para públicos heterogéneos.
- Medir dificultad y carga por muestra; hoy la disponibilidad real de la población sigue no
  verificada.
- Tratar los 62 nodos sin enlaces intersección como deuda de continuidad, no como problema de
  “más botones”.

## Frente interactivo

Los candidatos del inventario son señales, no cuotas: 7 H5P existentes por auditar, 5
comparadores de versiones, 26 ejemplos disciplinares anotables y 31 escenarios de decisión.
En 89 piezas no se recomienda interacción obligatoria. Toda interacción debe tener fallback,
funcionar con teclado y sin recopilar borradores, prompts o respuestas personales.

## Orientación del curso

El kit se prepara en tres tiempos sin fijar aún modalidad, calendario ni carga:

- **Antes:** bienvenida, mapa del ecosistema, selector de ruta y expectativas de uso de IA.
- **Durante:** tarjeta de tarea, criterios, apoyo, alternativa, glosario contextual y estado de
  avance.
- **Después:** evidencia portable, siguiente recurso, transferencia al sitio y ayuda.

El sitio explica y orienta; el curso futuro organizará tareas y evidencias; la propuesta de
Orientaciones conserva la autoridad conceptual mientras no exista otra decisión; las guías
acompañan la acción. Moodle no se usa para resolver una relación que todavía no está clara en
el contenido.

## Estado del piloto L1

Seis muestras están fuera de `content/` y pasaron dos rondas, auditor público y lector en frío
simulado: entrada general, co-creación, aprendizaje activo, aprendizaje híbrido, SAMR/ICAP y
Bloom/diseño inverso. La auditoría de fuentes separó la propuesta de Orientaciones, las guías
locales, el curso futuro y SAMR como lente complementaria. Seis SVG y dos direcciones raster,
cada una con variante móvil, están documentados. La nueva escena de entrada hace visibles
campo, evidencia y consecuencia.

La lectura humana de M1 quedó diferida para no bloquear el trabajo local, pero conserva su
carácter obligatorio antes de integrar o publicar. El lote autorizado de M2–M6 ya coloca la
recapitulación antes de navegar, media el estatus de Orientaciones y guías, jerarquiza la
continuidad de M4 y ofrece una aplicación autosuficiente en M6. Pasó dos rondas y auditor
público `0/0`. Los briefs B2–B6 están detallados, sin componentes ni H5P construidos. Los SVG
actuales se conservan como sistema visual conceptual; no son parte de las portadas genéricas
que deben sanearse.

El primer prototipo técnico corresponde a M6: “¿Tu actividad pide, practica y revisa lo
mismo?”. Funciona como HTML local con fallback completo, impresión y guardado voluntario en
el dispositivo. La primera lectura humana mostró que la versión anterior no explicaba qué
hacía. La reescritura adopta la pauta de las guías de profesorado y estudiantes: caso completo,
acción en palabras cotidianas y criterio de avance. No clasifica por verbos ni asigna puntaje;
señala el primer punto que la persona marcó para revisar. Pasó de nuevo raíz/subruta,
escritorio, 320 px oscuro, axe, foco, tres salidas, privacidad, modo sin JavaScript y
almacenamiento bloqueado. `BloomObjectiveBuilder` no se reutiliza porque requeriría un rediseño
conceptual o una nueva biblioteca, no un parche.

Rubén confirmó en la revisión posterior que la versión reescrita ya deja claro qué hace la
actividad, sin observaciones adicionales. La confirmación no sustituye otros perfiles humanos
ni autoriza integrar.

Antes de integrar falta:

1. realizar tres lecturas humanas de la entrada, incluida lectura móvil y de accesibilidad;
2. resolver representación y condiciones de uso de los raster;
3. someter el prototipo M6 a lectura humana y decidir si continúa como HTML o merece una nueva biblioteca H5P;
4. probar el fallback, teclado y raíz/subruta dentro de Hugo solo después de un VoBo de integración;
5. presentar un diff de integración y solicitar VoBo específico.

El contrato local de rutas ya fijó la familia A. Su alcance no autoriza crear las tres páginas
ni sus alias; esa preparación permanece en una compuerta posterior.

No se ha modificado ninguna página pública, no se ha publicado, desplegado ni montado contenido
en Moodle.
