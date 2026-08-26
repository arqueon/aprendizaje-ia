# Lote 01 — Verdad de estado y ledger de canonicalización

**Fecha:** 2026-08-23  
**Alcance:** arquitectura editorial y preparación de los lotes de mejora del sitio *Aprendizaje digital e IA*.  
**Estado:** diagnóstico y decisiones de trabajo; no autoriza publicación ni presenta propuestas como postura institucional.

## 1. Baseline verificable

- Fuente inspeccionada: espejo sincronizado `aprendizaje-ia`; no contiene `.git`, por lo que este corte no declara rama ni revisión.
- Inventario Hugo: 166 documentos, 142 páginas, 24 secciones y 115 169 palabras.
- Activos: 195; 2 grupos de duplicados exactos; 35 extensiones cuyo contenido binario corresponde a otro formato.
- Navegación: 0 enlaces internos rotos; 68 páginas sin enlace entre secciones.
- Interactividad: 9 entradas H5P, 8 curriculares, 5 páginas con H5P y 3 objetos curriculares preparados sin integración pública.
- Figuras gobernadas: 10.
- QA recuperada:
  - `qa:content-inventory`: PASS, 166 piezas;
  - `qa:learning-audit`: PASS, 166 piezas;
  - `h5p:verify`, `qa:h5p` y `qa:h5p:pilot`: PASS;
  - `qa:routes-tables`, `qa:coordinacion-route` y `qa:decision-institucional-route`: PASS en raíz/subruta, escritorio/móvil, axe, enlaces, red, almacenamiento, cookies y consola.

El empaquetado H5P excluye ahora copias ocultas de sincronización `.~…`; los nueve paquetes vuelven a reproducir exactamente los hashes catalogados. Los arneses de navegador aceptan el Chromium fijado por Playwright además de `/usr/bin/chromium`.

Los inventarios vigentes viven en:

- `docs/editorial/inventarios/2026-08-23-hugo/`
- `docs/editorial/inventarios/2026-08-23-udgia-021/`

El corte de clasificación de 158 piezas se conserva como evidencia histórica en `alfabetizacion_en_ia/docs/inventarios/2026-08-01/`. El archivo canónico de clasificación se actualizó a 166 piezas sin reactivar la antigua secuencia M1–M6.

## 2. Reglas del ledger

Acciones permitidas en esta fase:

- `conservar`: función distinta y necesaria;
- `reescribir`: conservar ruta, cambiar arquitectura y prosa;
- `fusionar`: trasladar aportes únicos a la página canónica y conservar alias/redirección;
- `convertir-en-glosario`: definición breve subordinada;
- `convertir-en-hub`: orientar y distribuir recorridos, no competir con el contenido;
- `derivar-por-audiencia`: conservar una aplicación distinta sin duplicar el marco;
- `cuarentena`: no integrar al recorrido hasta resolver evidencia, autoridad o QA;
- `retirar-con-motivo`: solo tras verificar enlaces entrantes, procedencia y VoBo.

Ninguna similitud automática autoriza una fusión. Los productos disciplinares con una plantilla común se consideran una familia, no duplicados.

## 3. Ledger inicial por familias

### 3.1 Propósito, evidencia, Bloom, ICAP y SAMR

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `formacion-docente/taxonomia-bloom-diseno-inverso/` | guía conceptual-práctica | misma ruta | `reescribir` | Debe explicar diseño inverso y demanda cognitiva sin convertir Bloom en escalera universal. |
| `recursos/glosario/taxonomia-de-bloom/` | definición de apoyo | guía anterior | `convertir-en-glosario` | Resolver la consulta y devolver a la explicación canónica. |
| `formacion-docente/modelos-samr-icap/` | contraste de lentes | misma ruta | `conservar` | ICAP y SAMR responden preguntas distintas; eliminar equivalencias automáticas con Bloom. |
| `recursos/glosario/modelo-samr/` | definición de apoyo | página de modelos | `convertir-en-glosario` | No repetir el análisis práctico. |
| `formacion-docente/taller-diseno-actividades-ia-backward/` | práctica | guía canónica | `derivar-por-audiencia` | Debe producir un diseño propio y no repetir el marco. |
| H5P `objetivos-bloom-udgplus` | constructor en cuarentena | por decidir | `cuarentena` | No integrar hasta alinear propósito, evidencia, criterio, accesibilidad y privacidad; no reducir el diseño a elegir un verbo. |

**Gate de la familia:** lector en frío distingue propósito, evidencia, criterio, conducta observable y nivel de asistencia; el H5P no se integra todavía.

### 3.2 Co-creación, agenciamiento y literacidades

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `ia-educacion/constelaciones/cocreacion-evaluacion/` | entrada pública | misma ruta | `convertir-en-hub` | Debe ofrecer dos entradas claras por audiencia e intención. |
| `ia-educacion/guias/agenciamiento-humano-ia/` | explicación y guía canónica | misma ruta | `reescribir` | Concentrar dirección epistémica, responsabilidad, contraste y trazabilidad. |
| `formacion-docente/alfabetizacion-agenciamiento-ia/` | aplicación docente | guía canónica | `fusionar` | Trasladar aportes únicos y conservar solo la práctica que no duplique el marco. |
| `formacion-docente/alfabetizacion-co-creacion/` | ejemplos y principios | guía canónica | `fusionar` | Resolver duplicación interna y evitar una segunda definición rival. |
| `formacion-docente/mapa-literacidades-ia/` | mapa sintético | guía canónica | `conservar` | Vista de síntesis, no explicación completa. |
| `blog/agenciamiento-humano-ia/` | ensayo contextual | guía canónica | `conservar` | Mantener como lectura opcional y enlazar la guía, sin hacerlo recorrido obligatorio. |
| H5P `direccion-epistemica-hotspots` | exploración | guía o derivado docente | `auditar` | Conservar solo si la lista estructurada es equivalente y la prosa prepara qué observar. |
| H5P `cocreacion-evaluacion-recorrido` | práctica guiada | derivado docente | `auditar` | Debe culminar en un producto propio, no en recorrer diapositivas. |
| H5P `direccion-epistemica-decidir-reformular` | escenario preparado | guía canónica | `candidato` | Integrar solo después de cerrar la página anfitriona y su fallback lineal. |
| H5P `cocreacion-conceptos-cards` | recuperación | después de la explicación | `candidato-condicionado` | Nunca debe ser la primera explicación; reporting debe quedar desactivado. |

**Gate de la familia:** una sola explicación canónica, derivados explícitos por audiencia y ningún objeto como sustituto de la prosa.

### 3.3 Aprendizaje activo

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `ia-educacion/guias/aprendizaje-activo-con-ia/` | guía canónica | misma ruta | `reescribir` | Organizar por conducta observable, evidencia y alternativa sin IA. |
| `formacion-docente/aprendizaje-activo/` | adaptación docente | guía canónica | `derivar-por-audiencia` | Conservar técnicas solo cuando indiquen qué actividad cognitiva provocan. |
| `laboratorio/practicas/aprendizaje-activo-ia/` | práctica | guía canónica | `conservar` | Debe contener una actividad completa y un criterio de revisión. |
| `recursos/glosario/aprendizaje-activo/` | definición | guía canónica | `convertir-en-glosario` | Evitar definición rival. |
| `formacion-docente/evaluacion-retroalimentacion/` | evaluación del proceso | guía canónica | `conservar` | Diferenciar participación, actividad y aprendizaje demostrado. |

**Gate de la familia:** ninguna técnica se valida por ser “activa”; debe declarar evidencia y criterio.

### 3.4 Aprendizaje híbrido y aula invertida

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `ia-educacion/guias/aprendizaje-hibrido-activo-disenar-actividad/` | práctica principal | misma ruta | `conservar` | Guía operativa de atrás hacia adelante; el auditor cuenta solo dos palabras porque el cuerpo depende de un shortcode, por lo que se necesita fallback auditable. |
| `ia-educacion/integracion-curricular/ia-aprendizaje-hibrido/` | explicación curricular | misma ruta | `reescribir` | Explicar función de momentos, continuidad y carga; no equiparar híbrido con asincronía. |
| `formacion-docente/aprendizaje-hibrido/` | adaptación docente | explicación curricular | `derivar-por-audiencia` | Evitar repetir definición general. |
| `recursos/glosario/aprendizaje-hibrido/` | definición | explicación curricular | `convertir-en-glosario` | Consulta breve. |
| `laboratorio/practicas/aula-invertida/` | práctica específica | misma ruta | `conservar` | Aula invertida es un diseño relacionado, no sinónimo de híbrido ni garantía de actividad cognitiva. |
| `recursos/glosario/aula-invertida/` | definición | práctica de aula invertida | `convertir-en-glosario` | Consulta breve con límites. |

**Gate de la familia:** función antes–durante–después, continuidad entre entornos, alternativa de baja tecnología y fallback de la guía ilustrada.

### 3.5 Ingeniería de prompts

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `ia-educacion/guias/ingenieria-de-prompts-para-docentes/` | guía práctica canónica | misma ruta | `reescribir` | Sustituir “pedir que piense paso a paso” por criterios, pasos verificables y formato de salida. |
| `recursos/glosario/ingenieria-de-prompts/` | definición | guía canónica | `convertir-en-glosario` | No competir con la guía. |
| `recursos/repositorio-prompts-docentes/` | banco de ejemplos | guía canónica | `conservar` | Cada plantilla debe declarar propósito, riesgos, datos que no se deben pegar y cómo verificar. |
| `recursos/videos/learn-prompting-curso-completo.md` | referencia externa | guía canónica | `conservar` | Vigencia y acceso deben verificarse; no hacerlo requisito. |

**Gate de la familia:** uso orientado a tareas y criterios, sin antropomorfizar razonamiento interno ni presentar plantillas como garantías.

### 3.6 Descarga y ganancia cognitiva

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `observatorio/estudios/paradoja-descarga-cognitiva/` | estudio de evidencia | misma ruta | `cuarentena` | Verificar una por una las afirmaciones empíricas, procedencia, alcance y límites. |
| `recursos/glosario/descarga-cognitiva/` | definición | estudio | `convertir-en-glosario` | Definir y remitir a la evidencia. |
| `recursos/glosario/ganancia-cognitiva/` | concepto de contraste | estudio y guías | `conservar` | No fusionar con descarga cognitiva; explicitar que es un criterio de diseño, no una métrica validada por sí sola. |

**Gate de la familia:** evidencia verificable y separación clara entre concepto, interpretación y estudio.

### 3.7 Privacidad, investigación, comprobación y bitácora

| Página actual | Rol objetivo | Canónica o destino | Acción | Motivo y condición |
|---|---|---|---|---|
| `ia-educacion/guias/privacidad-datos-ia/` | cuidado transversal | misma ruta | `conservar` | Debe anteceder cargas de datos y enlazar investigación y bitácora. |
| `ia-educacion/investigacion/` | ruta de apoyo | misma ruta | `reescribir` | Hacer visible la secuencia preguntar–buscar–leer–analizar–escribir y las comprobaciones no delegables. |
| `ia-educacion/practicas/comprobar-afirmacion/` | práctica focal | investigación | `conservar` | Mantener una afirmación decisiva y una fuente pertinente. |
| `ia-educacion/practicas/bitacora-cocreacion/` | evidencia portable | investigación y co-creación | `conservar` | HTML/Markdown descargable; no H5P con persistencia. |
| `ia-educacion/orientaciones/` | estatus y puerta de entrada | misma ruta | `cuarentena-institucional` | Mantener “propuesta” visible y no presentarla como postura oficial. |

**Gate de la familia:** recorrido visible en el cuerpo, no solo en metadatos; sin recopilar prompts, borradores ni información personal.

## 4. Matriz H5P del siguiente lote

| Estado | Objetos | Decisión de Lote 01 |
|---|---|---|
| Integrados y auditables | `cocreacion-versiones-slider`, `direccion-epistemica-hotspots`, `cocreacion-evaluacion-recorrido`, `evidencias-proceso-proporcion`, `evaluacion-proceso-decision` | Auditar página anfitriona, fallback, teclado, red, cookies, almacenamiento y reporting. |
| Preparados sin integración | `direccion-epistemica-decidir-reformular`, `cocreacion-conceptos-cards` | Asignar anfitrión solo tras canonicalizar co-creación/agenciamiento. |
| En cuarentena conceptual | `objetivos-bloom-udgplus` | No integrar; rediseñar después de cerrar la familia propósito–evidencia–criterio. |
| Fixture técnica | `runtime-probe` | Reparar generación determinista antes de actualizar hashes. |

Contrato: sin cuenta, puntuación, analítica, xAPI/LRS, cookies, persistencia ni envío de respuestas por defecto. `reportingIsEnabled: true` es incompatible con este contrato y debe resolverse antes de publicar nuevas integraciones.

## 5. Orden de ejecución derivado

1. **Lote 02A:** canonicalizar propósito–evidencia–Bloom–ICAP–SAMR, sin integrar H5P Bloom.
2. **Lote 02B:** canonicalizar co-creación/agenciamiento y decidir el destino de los dos H5P preparados.
3. **Lote 03:** aprendizaje activo e híbrido; hacer auditable el fallback de la guía ilustrada.
4. **Lote 04:** prompts, privacidad, investigación, comprobación y bitácora.
5. **Lote 05:** observatorio, procedencia y vigencia de evidencia.
6. **Lote 06:** productos disciplinares como familia de plantillas, sin falsas fusiones.
7. **Lote 07:** activos visuales, taxonomía y continuidad entre secciones.

Cada lote requiere diff local, QA focal, QA integrada, lector en frío y VoBo antes de publicación.

## 6. Criterios de aceptación de Lote 01

- [x] Inventario Hugo fechado y separado del snapshot histórico.
- [x] Clasificación de 166/166 piezas.
- [x] Ocho páginas nuevas clasificadas sin módulos M1–M6.
- [x] `qa:content-inventory` en PASS.
- [x] `qa:learning-audit` en PASS.
- [x] Ledger inicial con canónicas, derivados, fusiones y cuarentenas.
- [x] Matriz de H5P integrada/preparada/en cuarentena.
- [x] QA de navegador local aplicable en raíz/subruta, escritorio/móvil y accesibilidad automatizada.
- [ ] QA integral UDGIA-017 entre tres checkouts: permanece bloqueada honestamente porque el espejo sincronizado no contiene las revisiones Git fijadas.
- [ ] Publicación: no autorizada por este documento.
