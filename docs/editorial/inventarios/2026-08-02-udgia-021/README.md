# UDGIA-021 — inventario de materiales y activos del sitio Hugo

**Corte:** 2026-08-02  
**Revisión de contenido:** `40b83d9ceb7f11722f857bcc8dadc357cebda0f4`  
**Alcance:** inventario narrativo, didáctico, de consistencia, visual, interactivo,
organizativo y de relación con las Orientaciones, las guías y el curso amplio.

## Qué contiene

- `inventario-materiales.json`: expediente completo y legible por máquinas.
- `inventario-materiales.csv`: una fila por pieza para filtrar y priorizar.
- Este archivo: síntesis del corte y criterios de interpretación.

## Corte cuantitativo

| Indicador | Resultado |
|---|---:|
| Documentos Markdown | 158 |
| Páginas públicas | 134 |
| Secciones | 24 |
| Palabras | 111,975 |
| Activos gráficos | 186 |
| H5P curriculares catalogados | 8 |
| Figuras gobernadas | 9 |
| Páginas con referencia explícita a las Orientaciones | 0 |
| Páginas con referencia explícita a las guías | 0 |
| Páginas sin enlaces entre secciones | 62 |

## Hallazgos de estructura editorial

- Narrativa: 76 piezas débiles, 78 parciales y 4 candidatas robustas.
- Mediación didáctica: 25 débiles, 87 parciales y 46 candidatas robustas.
- Consistencia: 11 revisiones prioritarias y 56 revisiones dirigidas.
- Organización: el sitio contiene una biblioteca amplia, pero todavía no explica de
  forma sistemática cómo se relaciona cada pieza con las Orientaciones, las guías o
  el recorrido del curso.
- Interactividad: 7 páginas ya incorporan H5P. Las demás entradas se clasifican por
  función didáctica posible; la clasificación no autoriza ni recomienda añadir una
  interacción a cada página.

## Hallazgos visuales

| Indicador | Resultado |
|---|---:|
| Páginas cuya única mediación visual es la portada | 106 |
| Páginas con figura gobernada | 9 |
| Páginas sin visual | 16 |
| Portadas de glosario a sustituir por iconos o retirar | 20 |
| Sustituciones visuales prioritarias | 25 |
| Identidades de sección por rediseñar | 21 |
| Páginas con dos candidatos `featured` | 2 |
| Activos animados | 1 |
| Extensiones que no corresponden al formato real | 35 |
| Grupos de duplicados exactos | 2 |

La revisión humana en mosaico confirma cuatro familias que hoy compiten entre sí:

1. escenas editoriales situadas y sobrias;
2. ilustraciones conceptuales claras y con función explicativa;
3. CGI neón de cerebros, redes, robots y pantallas;
4. pseudo-infografías con texto incrustado, pequeño o en inglés.

Las dos primeras ofrecen una dirección viable. Las dos últimas producen fatiga,
envejecen rápido y a menudo repiten el tema sin explicar nada. La portada animada de
`laboratorio/` añade además una consideración de movimiento reducido.

## Lotes editoriales

| Lote | Función | Piezas |
|---|---|---:|
| L1 | Núcleo, riesgos conceptuales y solapamientos | 15 |
| L2 | Apoyos y prácticas | 30 |
| L3 | Ejemplos disciplinares | 27 |
| L4 | Referencias, observatorio y vigencia | 57 |
| L5 | Navegación y material fuera del recorrido inicial | 29 |

El orden recomendado es L1 → L2 → L3 → L4 → L5. Una sustitución masiva de imágenes
antes de resolver el núcleo narrativo y conceptual generaría retrabajo.

## Método y límites

El inventario combina el censo Hugo existente, la clasificación de reutilización en
el curso, los catálogos H5P y de figuras gobernadas, señales reproducibles en el texto,
metadatos de los activos y una revisión visual en mosaico. Las señales automáticas
sirven para priorizar lectura; no sustituyen la evaluación editorial, disciplinar,
de accesibilidad ni el lector en frío.

Regenerar:

```bash
npm run content:learning-audit
npm run qa:learning-audit
```
