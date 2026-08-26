# Lote 02B — Auditoría de fragmentación y contrato visual

**Fecha:** 2026-08-23  
**Fuente auditada:** `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`  
**Estado:** piloto local en Sinopé; no publicado  
**Caso de entrada:** `/ia-educacion/guias/profesorado/`

## 1. Hallazgo del caso de entrada

La versión anterior de la guía de profesorado no era un texto incoherente, pero funcionaba como fragmento de un sistema editorial que la persona lectora no podía reconstruir:

- comprimía el diseño en una cadena abstracta de propósito, práctica, evidencia, criterio y ayuda;
- remitía a otra ruta antes de mostrar un producto completo;
- no presentaba un antes/después ni un criterio aplicado;
- no tenía `featured` propio y ocultaba el hero;
- sus cinco cards de continuidad no mostraban imágenes;
- la actividad HTML existía, pero no se integraba en la página.

La métrica anterior la calificaba como robusta porque detectaba vocabulario pedagógico. El error fue confundir **mencionar componentes** con **mostrar una práctica reconstruible**.

## 2. Rúbrica de lectura pública

Una guía, práctica o concepto canónico debe permitir reconstruir, según su función:

1. una situación o pregunta reconocible;
2. una explicación cotidiana antes de los términos técnicos;
3. el propósito o la decisión que la página ayuda a tomar;
4. un ejemplo trabajado o contraste;
5. el producto, evidencia o resultado esperado;
6. un criterio para revisar ese resultado;
7. un límite, alternativa o condición de uso;
8. un siguiente paso comprensible.

La cantidad de palabras no sustituye esta lectura. Los shortcodes deben auditarse también en su salida renderizada y no solo en Markdown.

## 3. Casos similares confirmados

### Prioridad A — reescritura y reconciliación canónica

| Ruta | Evidencia | Acción recomendada |
|---|---|---|
| `/formacion-docente/alfabetizacion-co-creacion/` | Abre con “acoplamiento”, “ensamblaje” y “dirección epistémica” antes de un caso; repite una estructura conceptual que aparece en otras páginas. | Abrir con una decisión concreta; convertir los cinco principios en lectura del caso; definir su rol frente a la guía canónica. |
| `/formacion-docente/mapa-literacidades-ia/` | La vista visual sigue siendo abstracta y presenta como programa una estructura de seis módulos/60 horas que ya no debe reactivarse automáticamente. | Retirar la afirmación programática no vigente; conservarlo como mapa de navegación por necesidades y decisiones. |
| `/formacion-docente/alfabetizacion-agenciamiento-ia/` | Marco muy extenso, redundante y abstracto; vuelve a presentar seis módulos/60 horas y progresiones temporales como si fueran oferta activa. | Definir si es guía formativa o marco histórico; derivar desde una página canónica; reemplazar afirmaciones de programa por una propuesta explícitamente no autorizada o retirarlas. |
| `/recursos/glosario/ganancia-cognitiva/` | Usa “desplazamientos”, “dirección del proceso” y “ciclo iterativo” sin una situación breve que permita distinguir el concepto. | Mantener función de glosario; añadir un microcaso y contraste; volver a la explicación canónica. |
| `/formacion-docente/alfabetizacion/` | Es más clara que las anteriores, pero concentra lenguaje de “modo de ordenamiento”, “acoplamiento” y “dirección epistémica” sin un caso inicial y compite con el mapa. | Elegirla o no como página canónica; abrir con una misma tarea vista desde tres decisiones; hacer subordinados al mapa y al glosario. |
| `/recursos/glosario/alfabetizacion-ia/` | Entrada breve que formula una correspondencia rígida entre literacidades y Bloom y termina en “acoplamiento/dirección epistémica”. | Reescribir como definición breve y subordinada; retirar equivalencia rígida y enlazar la página canónica. |

### Prioridad B — buenos núcleos que necesitan contexto o integración

| Ruta | Diagnóstico | Acción recomendada |
|---|---|---|
| `/ia-educacion/guias/estudiantes/` | Tiene situación y producto, pero externaliza la práctica, carece de `featured` propio y oculta el hero. | Siguiente piloto: imagen propia, actividad integrada en panel accesible y cards ilustradas. |
| `/ia-educacion/guias/privacidad-datos-ia/` | El semáforo es útil y concreto; falta un caso breve, criterio de cierre y continuación visible. | Enriquecimiento pequeño, no reescritura total; imagen propia; interacción HTML solo si permite clasificar sin recolectar datos. |
| `/ia-educacion/practicas/bitacora-cocreacion/` | Plantilla y criterio son claros; falta un ejemplo completo de una fila y un siguiente uso. | Añadir ejemplo, descarga/ficha HTML opcional, imagen propia. |
| `/ia-educacion/practicas/comprobar-afirmacion/` | Práctica breve y funcional; ya contiene ejemplo, producto y alternativa. | Prioridad visual; un formulario HTML ligero podría producir la ficha, pero no es requisito para entenderla. |
| `/laboratorio/practicas/analisis-critico-de-sesgos-en-ia/` | Secuencia y rúbrica legibles, pero no muestra una comparación trabajada y propone prompts sensibles sin protocolo de cuidado. | Añadir muestra comentada, advertencia contextual y alternativa con corpus preparado; interacción comparativa pertinente. |
| `/recursos/glosario/diseno-inverso/` | Definición genérica y aislada de la página canónica ya revisada. | Convertir en derivado breve con un microejemplo y retorno a `/formacion-docente/taxonomia-bloom-diseno-inverso/`. |

### Familias que requieren tratamiento por lote

- **Productos de aprendizaje:** varias páginas disciplinares son extensas y funcionales, pero diez no tienen `featured` propio y la familia carece de visuales interiores. No deben fusionarse por compartir plantilla; conviene diseñar una gramática visual común y activos específicos por disciplina.
- **Glosario breve:** la brevedad es una función editorial legítima. Una entrada no necesita cubrir toda la microestructura ni incorporar H5P; sí debe ofrecer definición cotidiana, un ejemplo o contraste cuando el término sea abstracto, y retorno a una página canónica.
- **Fichas de enlaces, videos y recursos externos:** no son guías truncadas. Deben explicar qué aporta el recurso, a quién sirve y sus condiciones de acceso; no requieren interacción adicional por cuota.

## 4. Falsos positivos descartados

- `/ia-educacion/guias/aprendizaje-hibrido-activo-disenar-actividad/` tiene solo un shortcode en Markdown, pero el shortcode renderiza una guía ilustrada completa.
- `/formacion-docente/redes/` es una página conceptual coherente; requiere imagen, no una reescritura como práctica.
- `/ia-educacion/orientaciones/` cumple una función de estatus y evita atribuir autoridad institucional inexistente; su concisión está justificada.
- `/ia-educacion/investigacion/` y `/ia-educacion/guias/privacidad-datos-ia/` son breves pero explican decisiones concretas; la segunda solo necesita enriquecimiento menor.
- `/recursos/glosario/modelo-samr/` es una definición breve, clara y subordinada; no necesita H5P.
- `/ia-educacion/tendencias/evaluacion-en-la-era-ia/` y `/ia-educacion/guias/evaluacion-formativa-ia/` sí desarrollan casos, contrastes, figuras y acciones; no son fragmentarias.
- `/ia-educacion/guias/agenciamiento-humano-ia/` ya abre con el caso de Renata y explica los términos después; no debe confundirse con las páginas abstractas de la misma familia.

## 5. Contrato visual e interactivo

Desde este lote queda codificado el siguiente contrato:

1. Toda página pública debe tener un `featured.*` propio en su bundle o un `featureimage` explícito.
2. El hero se muestra por defecto. Ocultarlo exige una excepción documentada por función editorial, accesibilidad o disponibilidad/licencia del activo.
3. Toda card de lista, relación automática o relación curada muestra la imagen de destino.
4. La imagen de transición global mantiene visibles las cards heredadas, pero no cancela la deuda de producir un activo propio.
5. Toda página contiene al menos un visual pertinente; la `featured` es el mínimo. Se añaden visuales interiores cuando permiten observar una relación, secuencia, contraste o producto.
6. H5P o HTML se prefieren cuando habilitan una acción significativa: explorar, comparar, decidir, practicar, comprobar o producir.
7. La interactividad no es una cuota. Glosarios, páginas de estatus, licencia y fichas de recursos pueden justificar la excepción.
8. Todo objeto interactivo necesita explicación previa, fallback textual o imprimible, teclado, accesibilidad, carga diferida, procedencia/licencia y ausencia de analítica/almacenamiento no declarados.

### Compuerta técnica

```bash
npm run qa:visual-contract
```

La compuerta aplica una deuda decreciente:

- cualquier página nueva sin imagen propia falla;
- una omisión heredada solo se admite si está enumerada;
- cuando se resuelve una omisión, la prueba obliga a retirar su excepción;
- ninguna card puede quedar sin imagen, incluso mientras exista deuda heredada.

## 6. Deuda visual medida

Estado inicial estricto:

- 142 páginas públicas;
- 115 con `featured` propio;
- 27 sin `featured` propio;
- 19 con `showHero: false`;
- 98 cards renderizadas sin imagen.

Estado después del piloto:

- 116 páginas con `featured` propio;
- 26 excepciones temporales de `featured`;
- 18 excepciones temporales de hero;
- 494 cards renderizadas, todas con imagen: 295 Blowfish/related y 199 salidas del shortcode local derivadas de 78 invocaciones fuente;
- una imagen global de transición para deuda heredada.

El inventario canónico de deuda está en `data/editorial/visual-contract.json` y la evidencia generada en `docs/editorial/lotes/2026-08-23-visual-contract-report.json`.

## 7. Piloto de la guía de profesorado

Cambios locales:

- `featured.svg` propio con propósito, práctica, evidencia y criterio;
- hero visible en flujo normal mediante `heroStyle: big`;
- caso reconocible y tabla de desalineación;
- revisión de doce minutos con producto explícito;
- ejemplo antes/después y criterios de calidad;
- actividad HTML integrada en un panel `<details>` cerrado por defecto;
- autoajuste del iframe del mismo origen para evitar scroll anidado;
- enlace independiente y fallback imprimible;
- cinco cards de continuidad con imagen.

QA observado:

- featured visible en `<figure>`: 1024×576 px en escritorio;
- actividad: 22 controles;
- 5/5 cards con imagen;
- fallback HTTP 200;
- axe WCAG 2 A/AA: 0 violaciones en página y actividad;
- cero errores de consola, cookies, almacenamiento o tráfico externo;
- móvil: 412 px de viewport y 412 px de ancho de documento, sin desbordamiento horizontal;
- panel cerrado evita cargar una página de 14 505 px hasta que la persona decide abrir la práctica.

Comando:

```bash
npm run qa:profesorado-pilot
```

## 8. Próximos lotes propuestos

1. **02C — familia de literacidades/co-creación:** decidir canónica y derivados, retirar 60h/M1–M6 como oferta activa, abrir con un caso compartido y conservar H5P donde sí añade observación.
2. **02D — ruta de estudiantes y dos prácticas breves:** featured propios, integración de la actividad de estudiantes, ejemplos y fichas accesibles.
3. **02E — deuda visual de productos disciplinares:** gramática visual común y activos específicos, sin fusionar páginas por plantilla.
4. **02F — glosario abstracto:** microcasos y retorno a páginas canónicas; excepciones explícitas a H5P.

## 9. Límites de integración

- La copia de trabajo no contiene `.git`; no se afirma rama, commit ni capacidad de publicación.
- No se modificó GitHub Pages, Coolify institucional, Moodle ni otro LMS.
- Sinopé sigue siendo staging mediante Tailscale.
- Cualquier publicación necesita revisar el diff en una copia Git real y obtener el VoBo correspondiente.
