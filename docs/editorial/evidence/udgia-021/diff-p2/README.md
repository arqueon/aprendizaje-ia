# UDGIA-021 · P2 aplicado de M1, B2 y M6

**Estado:** aplicado al working tree y verificado; sin commit, push ni publicación.  
**VoBo recibido:** Rubén autorizó copiar exactamente el lote a `content/` y `static/` y repetir
QA mediante el envío SmallDocs `2026-08-04T01:49:12.718Z`. No autorizó publicar, desplegar,
modificar Moodle ni hacer `push`.

## Qué contiene

La rebanada conecta cinco decisiones que antes estaban separadas:

1. M1 explica con un caso qué se decide, por qué y con qué consecuencias.
2. La landing de Orientaciones nombra el documento como propuesta académica en revisión, no
   como política vigente.
3. La ruta de estudiantes conduce a B2, donde se comparan dos sugerencias para un borrador.
4. La ruta de profesorado conduce a M6, donde se revisa la alineación de una actividad.
5. El curso acompañado se menciona como trabajo en diseño y no recibe una URL ficticia.

Los cuatro Markdown bajo el staging conservan el texto exacto aplicado. Los runtimes no se
duplican dentro de este expediente: `manifest.yaml` fija sus fuentes verificadas, destinos
aplicados, tamaños y hashes SHA-256. Esto permite comprobar que el working tree no derivó del
prototipo que pasó QA.

## Árbol aplicado

```text
content/ia-educacion/
├── constelaciones/cocreacion-evaluacion/index.md  ← reemplazo M1
├── orientaciones/index.md                         ← landing nueva
└── guias/
    ├── estudiantes/index.md                       ← landing nueva → B2
    └── profesorado/index.md                       ← landing nueva → M6

static/actividades/
├── comparar-sugerencias/                          ← runtime B2 verificado
└── revisar-actividad/                             ← runtime M6 verificado
```

## Decisiones de alcance

- Se omiten las escenas raster: no son necesarias para comprender ni usar esta rebanada y su
  procedencia/representación continúa diferida.
- Los prototipos permanecen como HTML nativo porque ya ofrecen teclado, móvil, impresión,
  fallback sin JavaScript y almacenamiento voluntario sin dependencia nueva.
- No se modifica el menú global. Blog, Formación Docente y Experiencias pertenecen al lote L5.
- Las revisiones con agentes se registrarán como perspectivas simuladas. Rubén conserva el único
  dictamen humano y el VoBo final.
- El uso real, el lector de pantalla real, la carga de cohorte y la adecuación por campo siguen
  explícitamente no verificados.

## Criterios verificados después de aplicar

- Las cuatro páginas explican situación, acción, consecuencia, límite y continuidad sin códigos
  internos en la superficie pública.
- Todas las rutas y aliases resuelven tanto en raíz como bajo subruta.
- M1 llega a B2, M6, Orientaciones y ambas rutas por audiencia sin callejones.
- B2 y M6 conservan el mismo hash que los prototipos aprobados.
- No aparecen solicitudes externas, escrituras silenciosas de almacenamiento ni errores de
  consola.
- Escritorio, 320 px, teclado, foco, modo oscuro, impresión, fallback y axe permanecen en PASS.
- Dos rondas de evaluación separada no dejan hallazgos bloqueantes.
- Rubén autorizó la aplicación exacta y aceptó las tres observaciones menores como no
  bloqueantes.

El QA del working tree terminó en PASS el `2026-08-04T01:52:38.702Z`: raíz y subruta, seis
rutas en dos viewports, cuatro aliases por escenario, fallbacks, axe grave/crítico, enlaces,
overflow, foco, consola, red externa y escritura al cargar. El reemplazo anterior de M1 se
conserva en `rollback/pre-aplicacion/`.
