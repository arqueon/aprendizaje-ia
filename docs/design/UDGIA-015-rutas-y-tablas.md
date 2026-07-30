# UDGIA-015 · Rutas visibles y sistema global de tablas

Fecha de cierre local: 2026-07-29
Autorización: UDGIA-012
Estado: implementación local, sin publicación ni despliegue

## Alcance ejecutado

El sprint resolvió dos brechas sistémicas del inventario Hugo sin ampliar el lote visual ni
añadir interacciones:

1. “Elige tu ruta” aparece en la portada y en `IA en educación`, antes de la exploración
   temática.
2. Todas las tablas Markdown pasan por un render hook Almagre reusable.
3. Tres tablas representativas declaran función, título y encabezados de fila.
4. El catálogo, las páginas y los montajes H5P permanecen en su línea base.

La navegación conserva los cinco ejes temáticos. La entrada por audiencia funciona como una
segunda forma de orientación y conduce a:

- estudio o docencia;
- coordinación de procesos docentes;
- decisión institucional.

## Sistema de tablas

El render hook `layouts/_markup/render-table.html` asigna automáticamente:

- `editorial` a una tabla de dos columnas;
- `matrix` a una tabla de tres o más columnas.

Cuando la función necesita expresarse de manera explícita, se usan atributos de bloque:

```markdown
| Criterio | Decisión |
|---|---|
| Propósito | Se formula antes de elegir tecnología. |
{.udgia-table--comparison .udgia-table--row-headers caption="Criterios para decidir"}
```

Variantes disponibles:

| Variante | Uso |
|---|---|
| `udgia-table--editorial` | Síntesis de dos columnas y lectura secuencial. |
| `udgia-table--comparison` | Contraste entre alternativas, estados o responsabilidades. |
| `udgia-table--matrix` | Tres o más dimensiones que deben leerse por fila y columna. |
| `udgia-table--row-headers` | Convierte la primera celda de cada fila en encabezado semántico. |

El comportamiento móvil conserva una tabla HTML real. El contenedor recibe foco, nombre
accesible, indicación de desplazamiento y overflow propio; no transforma los datos en
tarjetas ni provoca desplazamiento horizontal de la página. En impresión desaparece la
indicación móvil y se elimina la anchura mínima.

El sitio mantiene su identidad única clara. El contraste visual claro/oscuro se produce
entre papel o superficies cálidas y cabeceras tinta marina; también se conservan reglas para
alto contraste forzado. No se añadió una bifurcación por `prefers-color-scheme`.

## Muestra aplicada

| Página | Tabla | Variante |
|---|---|---|
| Empezar con IA | Qué puede aportar la IA y qué responsabilidad conserva la persona | Comparativa, cuatro encabezados de fila |
| Coordinación académica | De habilitar condiciones a integrar la IA en el diseño educativo | Matriz, tres encabezados de fila |
| Coordinación académica | Evidencias proporcionadas para revisar un piloto | Comparativa, seis encabezados de fila |

Las celdas de la muestra se ajustaron a sentence case y enunciados completos. El sistema no
capitaliza texto automáticamente: hacerlo con CSS o transformaciones masivas rompería
nombres propios, siglas y continuaciones gramaticales.

## QA registrada

Comando:

```bash
npm run qa:routes-tables
```

La prueba construye y sirve dos escenarios —raíz y `/ecosistema-ia/`— y revisa 375 px y
1440 px.

| Comprobación | Resultado |
|---|---:|
| Páginas Hugo por escenario | 925 |
| Rutas presentes en cada entrada | 3 de 3 |
| Enlaces de ruta | HTTP 200 |
| Overflow horizontal de página | 0 |
| Axe serious/critical | 0 |
| Contraste cabecera y cuerpo de tabla | 15.76:1 |
| Tablas automáticas de la página Ensayo | 8, con IDs únicos |
| Tablas ejecutivas anteriores preservadas | 2 |
| H5P | 9 contenidos, 7 páginas y 10 montajes; sin deriva |
| Advertencias Hugo nuevas | 0 |

Evidencia:

- `docs/design/evidence/udgia-015/qa-routes-tables.json`
- `docs/design/evidence/udgia-015/rutas-inicio-desktop.png`
- `docs/design/evidence/udgia-015/rutas-ia-mobile.png`
- `docs/design/evidence/udgia-015/tabla-comparativa-mobile.png`
- `docs/design/evidence/udgia-015/tabla-matriz-desktop.png`

Las cuatro advertencias observadas son las ya conocidas: `languageCode` y
`.Site.LanguageCode` deprecados, `.Site.Data` deprecado y el rango de compatibilidad que
declara el módulo Blowfish frente a Hugo 0.164.

## Activos visuales fuera de este sprint

No se generaron imágenes. Los siguientes puntos de inserción quedan documentados para un
lote posterior y no deben resolverse mediante sustitución masiva:

- `assets/images/hero-bg.svg`, para la portada;
- `assets/images/hero-ia.svg`, para la sección prioritaria;
- los `featured.webp` de las tres rutas, como referencia situada México/Bajío;
- una posible familia visual para las tarjetas de audiencia, cuando exista un sistema
  autorizado de iconos o ilustraciones locales.

Las tarjetas de ruta actuales son deliberadamente textuales. Se omitieron iconos Font
Awesome que no estaban disponibles en la hoja de estilos pública, evitando círculos vacíos
sin añadir una dependencia externa.

## Deuda restante

- Migrar heros y featured pertenece al lote visual posterior.
- Extender captions y encabezados de fila debe hacerse por lotes con revisión editorial, no
  mediante capitalización automática de las 152 tablas.
- Unificar las dos tablas ejecutivas HTML con el render hook requiere conservar sus
  captions, `scope="row"` y pruebas específicas; no era necesario para este sprint.
- Resolver las deprecaciones Hugo/Blowfish corresponde a una compuerta técnica separada.
