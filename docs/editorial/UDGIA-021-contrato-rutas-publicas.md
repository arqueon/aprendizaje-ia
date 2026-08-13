---
title: "UDGIA-021 · Contrato local de rutas públicas"
date: 2026-08-02
status: "Contrato local aprobado; no crea páginas, alias ni redirecciones"
---

# UDGIA-021 · Contrato local de rutas públicas

> **Decisión registrada el 2026-08-02:** Rubén eligió la opción A, familia por función y
> audiencia. El alcance aprobado es registrar el contrato y no crear páginas. La evidencia de
> la decisión permanece en `.sdocs/UDGIA-021-decision-rutas-ligera.md`.

## Decisión recomendada

Reservar una familia corta y estable dentro de `ia-educacion`:

| Destino canónico | Etiqueta pública mientras no exista aprobación institucional | Función |
|---|---|---|
| `/ia-educacion/orientaciones/` | Propuesta de Orientaciones para el uso pedagógico de la IA | Explicar estatus, alcance y rutas de consulta del documento marco |
| `/ia-educacion/guias/estudiantes/` | Laboratorio breve para decidir antes de entregar | Ofrecer actividades de comprobación, criterio, contexto y decisión |
| `/ia-educacion/guias/profesorado/` | Diseñar actividades y observar el aprendizaje | Llevar el marco a una actividad propia y a una evidencia proporcional |

La familia no cambia las rutas conceptuales existentes de
`/formacion-docente/`. Esas páginas explican ideas; las nuevas rutas permitirían consultar la
fuente marco y entrar a una guía por audiencia. El curso se enlazaría solo cuando exista un
destino público o institucional autorizado y verificable.

## Alias reservados

Los alias se crearían únicamente junto con las páginas canónicas, nunca antes:

| Alias de entrada | Destino |
|---|---|
| `/ia-educacion/orientaciones-ia/` | `/ia-educacion/orientaciones/` |
| `/ia-educacion/guias/para-estudiantes/` | `/ia-educacion/guias/estudiantes/` |
| `/ia-educacion/guias/para-profesorado/` | `/ia-educacion/guias/profesorado/` |

Los enlaces internos nuevos usarían siempre el destino canónico. Los alias existen para
recuperar formas previsibles y no se presentarían como rutas rivales.

## Contrato editorial de cada landing

Toda ruta deberá incluir, antes de cualquier llamada a la acción:

1. nombre público y audiencia;
2. estatus exacto del recurso y autoridad que lo respalda;
3. qué pregunta ayuda a resolver y qué no resuelve;
4. forma accesible de leer o descargar el contenido;
5. continuidad hacia una página conceptual, una práctica o el curso cuando corresponda;
6. fecha o versión recuperable y responsable de revisión;
7. alternativa que no exija cuenta, servicio de IA ni compartir datos sensibles.

La ruta de Orientaciones no usará “vigente”, “oficial”, “lineamiento” o “política” mientras el
documento conserve el estado de propuesta sin aprobación institucional. Las guías no se
presentarán como publicadas hasta que la autorización exista y se comprueben sus enlaces.

## Alternativas consideradas

### A. Familia por función y audiencia — recomendada

Tres rutas duraderas separan autoridad, estudiantado y profesorado. Facilitan enlaces
profundos, lectura selectiva y actualización independiente. Añaden tres landings, pero evitan
que una sola página mezcle estatus, actividades y decisiones docentes.

### B. Centro único de orientación

Una sola ruta, `/ia-educacion/orientacion/`, reuniría el marco y ambas guías mediante secciones
o pestañas. Reduce el número de páginas, pero debilita los enlaces por audiencia, hace más
frágiles los anclajes y puede ocultar el estatus distinto de cada recurso.

### C. Archivos o destinos externos sin landing

El sitio enlazaría directamente documentos o servicios externos. Reduce el trabajo inicial,
pero pierde contexto, estatus, navegación, accesibilidad y continuidad cuando cambie un
archivo. No se recomienda para fuentes que deben orientar todo el ecosistema.

## Orden de aplicación después del VoBo

1. Persistir la decisión en el Pasaporte y Logseq.
2. Preparar, si se autoriza por separado, tres prototipos locales fuera de `content/`.
3. Probar texto, enlaces, móvil y tecnologías de asistencia con lectores humanos.
4. Definir licencia, versión y autoridad de publicación de cada fuente.
5. Solo con autorización posterior, crear las páginas, alias y enlaces en Hugo.
6. Construir y revisar el sitio completo antes de publicar.

Este contrato no autoriza los pasos 2–6. La primera decisión fija únicamente la familia de
rutas y el nombre público provisional.
