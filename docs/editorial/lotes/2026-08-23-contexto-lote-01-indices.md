# Lote de contexto 01 — índices de orientación

Fecha: 2026-08-23  
Estado: borrador editorial aprobado por Rubén el 2026-08-23; sin publicación ni retirada de rutas

## Alcance

Se corrigieron cuatro índices preexistentes:

1. `content/ia-educacion/guias/_index.md`;
2. `content/ia-educacion/rutas/_index.md`;
3. `content/laboratorio/_index.md`;
4. `content/laboratorio/practicas/_index.md`.

El lote no modifica las páginas hijas, no introduce piezas nuevas y no retira contenido.

## Cambios

### Guías

- Incluye explícitamente a estudiantes y docentes.
- Ordena los puntos de entrada por una tarea reconocible: estudiar, revisar una actividad, diseñar, comprobar, evaluar, proteger datos o escribir una instrucción delimitada.
- Explica que no es necesario recorrer la colección en orden.

### Rutas

- Sustituye la repetición del selector superior por una comparación real.
- Para cada ruta muestra con qué se empieza, qué se hace, qué se conserva y cómo se revisa la decisión.
- Conserva las tres rutas y sus destinos existentes.

### Laboratorio

- Retira la afirmación de que cada entrada es una experiencia real.
- Distingue tres usos: adaptar una actividad, aprender de una implementación documentada y preparar un flujo docente.
- Exige declarar si una página presenta propuesta, piloto o experiencia documentada.

### Prácticas pedagógicas

- Deja de presentar toda la colección como aplicaciones reales con resultados.
- Distingue propuesta, piloto y práctica documentada.
- Advierte que, mientras termine la revisión, una página sin aplicación y procedencia claras debe leerse como propuesta.

## Reversión

Copia exacta anterior:

```text
docs/editorial/rollback/2026-08-23-contexto-lote-01/
```

| Archivo | SHA-256 anterior | SHA-256 del borrador |
|---|---|---|
| `content/ia-educacion/guias/_index.md` | `a002c3a02171194e69f056ee57878437e4620d2e6fdd35a561b3ddfcebe957f1` | `1d6262df50824fb0f8169238ab0032cee302a4d57c1bd86c9fcd709b79784b2a` |
| `content/ia-educacion/rutas/_index.md` | `ab31593c50c775ffe2a58ebec73b40f7e8867821c79a0cd4109ea975791dcf05` | `61bf5d7760109d2cb1653612fa8ee83e75eacbee0e0110d322922d228a617767` |
| `content/laboratorio/_index.md` | `643d0dc949e6ef5f2d66f5dd884bf0b55fe1cf8003a75d7250e8ed91ad26b154` | `0354c6da579e506636438a310d93903ac4da8eefa02d358d7d1731d86daaa46a` |
| `content/laboratorio/practicas/_index.md` | `3f0525ef524bcffc68ff6dad9e89ff460aaf49895f0dc4579c4d99bec6c3eb64` | `33c2dd11f628073e59830ccc671d3bfe7780c89e4497a6cc508ae567e026d84c` |

El manifiesto está en `docs/editorial/rollback/2026-08-23-contexto-lote-01/manifest.json`. El diff completo y legible está en:

```text
docs/editorial/lotes/2026-08-23-contexto-lote-01-indices.diff
```

## Verificación

Las comprobaciones se ejecutaron por separado:

- `content:context-audit`: 166 fuentes; la cola bajó de 26 a 22 candidatas;
- comprobación por ruta: los cuatro índices quedaron en prioridad baja, sin señales esperadas ausentes ni riesgos automáticos;
- `qa:context-audit`: PASS; 0 candidatas sin decisión humana;
- `content:inventory` y `qa:content-inventory`: 166 documentos, 0 enlaces internos rotos;
- `content:learning-audit` y `qa:learning-audit`: 166 piezas vigentes;
- `qa:routes-tables`: PASS en raíz y subruta, escritorio y móvil;
- `qa:direct-language`: PASS;
- revisión focal de vocabulario sobre los cuatro índices: 0 apariciones de `consigna`, `huella`, `insumo`, `artefacto`, `producto`, `alineación`, `trazabilidad` o `propósito`;
- `qa:visual-contract`: 142 páginas y 494 tarjetas bajo contrato;
- build Hugo: 935 páginas y 1,431 archivos estáticos;
- lectura en frío con Playwright: 8 vistas, estado HTTP 200, 0 desbordamientos de página y 0 errores de consola;
- axe sobre las mismas ocho vistas: 0 infracciones WCAG A/AA.

Evidencia visual y resultados:

```text
docs/design/evidence/contexto-lote-01/
```

## Advertencias técnicas no introducidas por el lote

El build conserva dos avisos ya conocidos:

- `languageCode` y `.Site.LanguageCode` están deprecados en Hugo;
- Blowfish 2.97 declara compatibilidad hasta Hugo 0.154.5, mientras el entorno usa Hugo 0.165.0.

No se modificaron esas dependencias en este lote.

## Segunda lectura con Claude Fable

Claude Code `2.1.233` ejecutó en background una revisión de solo lectura con `claude-fable-5`. La salida atómica terminó con código `0` y quedó en:

```text
docs/editorial/revisiones/2026-08-23-claude-fable-contexto-lote-01.json
```

Cobertura y resultado verificados:

- cuatro rutas esperadas y cuatro rutas únicas recibidas;
- `aprobar-borrador`: 4;
- `ajustar-borrador`: 0;
- cambios obligatorios: ninguno.

Fable confirmó que los cuatro índices muestran situación, audiencia, material inicial, acciones, lo que se conserva y la revisión final en la proporción adecuada para una portada. Nota no bloqueante: `laboratorio/experiencias/` aún no contiene relatos publicados; la tarjeta del Laboratorio se acepta porque define el estándar de esa rama y no afirma que ya existan casos.

## Revisión humana solicitada

En el sitio de revisión, comprobar cuatro decisiones concretas:

1. **Guías:** ¿las siete situaciones permiten elegir sin conocer previamente la estructura del sitio?
2. **Rutas:** ¿la tabla deja clara la diferencia entre estudiar/enseñar, coordinar y preparar una decisión institucional?
3. **Laboratorio:** ¿se entiende que contiene actividades adaptables, relatos de aplicación y flujos, no solo experiencias comprobadas?
4. **Prácticas:** ¿es aceptable tratar como propuesta cualquier página que no identifique aplicación y procedencia?

Rutas de revisión:

```text
http://100.107.89.3:1313/ia-educacion/guias/
http://100.107.89.3:1313/ia-educacion/rutas/
http://100.107.89.3:1313/laboratorio/
http://100.107.89.3:1313/laboratorio/practicas/
```

## Límite de aprobación

Este lote es un borrador en el sitio de revisión. No cambia GitHub Pages ni autoriza retirar las cinco páginas propuestas para cuarentena.
