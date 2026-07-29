# UDGIA-008 · Segundo lote de figuras canónicas en Hugo

**Estado:** listo para revisión local; no publicado ni desplegado.
**Rama:** `codex/UDGIA-008-svg-lote2-hugo`
**Base de Hugo:** `70a548a90e787d382ff231fb2d167a37c4d72665`
**Fuente canónica:** `IAorientaciones` en
`058b22b45fbc46a8ade8ed85efd0c6b93c2b620a`
**Paquete:** `0.2.0-lote2`

## Integración editorial

| Figura | Ruta de Hugo | Adaptación para el sitio |
|---|---|---|
| F1 · De habilitar a integrar. | `/ia-educacion/rutas/coordinacion-academica/` | La trayectoria se presenta como una orientación institucional revisable, no como una escala obligatoria. |
| F3 · Siete principios rectores. | `/ia-educacion/guias/lineamientos-eticos-ia/` | Los principios se convierten en preguntas para revisar decisiones contextualizadas. |
| F7 · Diálogo con IA. | `/ia-educacion/guias/aprendizaje-activo-con-ia/` | La secuencia destaca el trabajo de contrastar, justificar y revisar que conserva la agencia de la persona. |
| F8 · Del producto al proceso. | `/ia-educacion/tendencias/evaluacion-en-la-era-ia/` | La comparación incorpora evidencias del proceso sin plantear una vigilancia exhaustiva. |
| F11 · Política por capas. | `/ia-educacion/tendencias/politicas-institucionales-universidades/` | Las capas se distinguen de los niveles de gobernanza y se explicitan como arquitectura orientativa. |
| F17 · Matriz de priorización. | `/ia-educacion/rutas/decision-institucional-ia/` | La matriz funciona como apoyo a la deliberación del portafolio y no como prescripción automática. |

Cada página contiene una sola figura del sistema UDGIA, una variante móvil legible, enlace de
ampliación al SVG, texto alternativo, pie editorial y una descripción HTML equivalente. Las
tablas de respaldo emplean encabezados visibles, enunciados completos, primera columna
destacada, renglones alternados y desplazamiento horizontal contenido en pantallas estrechas.

Las referencias de sección propias del manuscrito de Orientaciones se retiraron de las
variantes de Hugo. La estructura conceptual, la paleta y la atribución se conservaron.

## Procedencia y estado de publicación

`data/udgia_figures.json` registra para las seis figuras:

- la versión y la revisión canónica exactas;
- el checksum SHA-256 del original, de la descripción canónica, de la variante para
  escritorio y de la variante móvil;
- la adaptación `hugo-2-contextual`;
- la licencia como `pending-institutional-confirmation`;
- la autorización de publicación como `false`.

El shortcode expone la versión, la revisión, los checksums y el estado editorial como
atributos de procedencia. Este lote no autoriza una publicación o despliegue.

## Verificación

- `npm run qa:udgia-figures`: pasan 9 figuras, 18 variantes, checksums, semántica SVG,
  fallbacks y ausencia de recursos externos.
- Compilación Hugo minificada: pasan 925 páginas; aparecen únicamente 4 advertencias
  conocidas de compatibilidad o deprecación.
- `npm run qa:udgia-figures-route`: pasan 9 rutas × 2 bases × 2 viewports.
  La prueba cubre raíz y subruta, 1440 × 900 y 375 × 812, axe, selección de variante móvil,
  ampliación SVG, tablas de respaldo, enlaces internos en raíz, tráfico externo, métodos de
  escritura, cookies y almacenamiento local.
- `npm run qa:content-inventory`: pasan 158 documentos y 0 enlaces internos rotos.
- La revisión visual de los seis pares de capturas confirmó que no hay texto cortado ni
  desbordamiento de página y que las composiciones móviles conservan jerarquía y legibilidad.

La ejecución de axe encontró inicialmente un enlace dentro de una cita que dependía solo del
color. Se corrigió el estilo global de los enlaces en citas mediante un subrayado explícito y
la corrida completa posterior quedó sin violaciones serias o críticas.

## Evidencia

Las 36 capturas de navegador están en `docs/design/evidence/udgia-008/`: nueve rutas, dos
bases y dos anchos. El inventario regenerado está en
`docs/editorial/inventarios/2026-07-28-hugo/`.

## Límite del lote

No se modificaron las figuras canónicas de `IAorientaciones`, no se cambió Moodle y no se
realizó ninguna publicación o despliegue. La revisión institucional de licencia y el visto
bueno editorial continúan pendientes.
