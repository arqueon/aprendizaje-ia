---
reviewer: Sol
delegation: deleg_23f4ef58
date: 2026-08-24
scope: solo lectura
publication_authorized: false
application_authorized: false
---

# Segunda lectura independiente · lote 09

## Dictamen general

**Dictamen: `AJUSTAR` el expediente probatorio, pero confirmar la clasificación editorial de las cinco piezas.** Las propuestas **5 cambiar, 0 conservar, 0 quitar** están justificadas por defectos verificables y por la función diferenciada de cada página. No se confunde brevedad con defecto ni coincidencia temática con duplicación.

Las cinco funciones siguen siendo recuperables: artículo de intervención, ficha bibliográfica, explicación ética, guía operativa y glosario. **No hay fundamento para fusionar, retirar o poner en cuarentena ninguna.**

## Decisión por pieza

1. **Blog · IA generativa y evaluación auténtica — `cambiar`, justificado.**  
   La pieza conserva una función docente clara, pero formula absolutos —“indispensable”, contexto “irreductible”, documentación “obligatoria”— y atribuye a Bearman et al. una única “respuesta institucional adecuada” que el artículo no sostiene (`content/blog/ia-generativa-evaluacion-autentica/index.md:21-28,36-48`). El texto de Bearman et al. desarrolla juicio evaluativo sobre productos, procesos y usos de IA mediante estrategias formativas; no prescribe esa respuesta institucional. La propuesta de mantener el género y presentar defensas, documentación y contextualización como opciones situadas es correcta.

2. **Ficha · Ajjawi, Bearman et al. — `cambiar`, justificado.**  
   `articuloAccesoAbierto: false` es incorrecto (`content/recursos/articulos/autenticidad-evaluacion-ajjawi-bearman/index.md:21-26`). El artículo es de acceso abierto bajo **CC BY-NC-ND 4.0**; apareció en línea el **19-10-2023** y su referencia de volumen, número y páginas corresponde a **2024**. También es correcta la objeción a presentar la IA como objeto principal y a llamar al marco “fundamental” o al estudiante “centro irreemplazable” (`…/index.md:35-44`). Ajjawi et al. amplían la autenticidad mediante tres perspectivas y subrayan compromisos contextuales, no una receta anti-IA.

3. **Plagio y autenticidad — `cambiar`, ampliamente justificado.**  
   - Eaton propone *postplagiarism* como marco amplio y sostiene responsabilidad, atribución y demostración del aprendizaje; no define la trazabilidad cerrada que se le atribuye (`content/ia-educacion/etica-y-transparencia/plagio-autenticidad-era-ia/index.md:29-44`).  
   - Perkins no formula la definición de autenticidad basada en reconstrucción y conversación oral de `:59-69`; sostiene que la transparencia del uso y las políticas institucionales determinan si hay falta.  
   - Cotton et al. recomiendan instrucciones, políticas y revisión del diseño, pero no identifican la falta de acuerdos como “primera causa” de conflictos (`:101-108`).  
   - Liang et al. estudiaron **siete detectores, 91 ensayos TOEFL y 88 ensayos estadounidenses de octavo grado**; el **61.3 %** es la tasa media de falsos positivos del corpus TOEFL, no de toda escritura no anglófona (`:71-79`).  
   - Bitácoras, versiones, declaraciones y defensas de diez minutos se presentan indebidamente como universales (`:101-108`).  
   La función ética extensa es valiosa; corresponde revisar, no retirar.

4. **Guía · Evaluación formativa con IA — `cambiar`, justificado y prioritario.**  
   La propia guía explica correctamente que evaluación formativa y evaluación basada en procesos no son sinónimos (`content/ia-educacion/guias/evaluacion-formativa-ia/index.md:68-73`), pero enseguida se contradice al afirmar que la formativa “no califica” y la sumativa “clasifica” (`:63-75`). La distinción correcta es funcional: la evidencia es formativa cuando se usa para modificar enseñanza o aprendizaje; una actividad calificada puede tener uso formativo y una misma secuencia puede cumplir ambas funciones. También requieren revisión la promesa de escalar sin perder calidad, la aplicación de rúbricas como “primer filtro” con revisión solo muestral y la regla “IA aplica; docente decide” (`:77-84,161-179`). La evidencia reciente sobre retroalimentación confirma rapidez y detalle, pero también heterogeneidad, límites contextuales y necesidad de supervisión humana.

5. **Glosario · Integridad académica — `cambiar`, justificado sin penalizar su brevedad.**  
   Sus dos párrafos cumplen la extensión propia de un glosario. El defecto no es la longitud, sino la caricatura de los enfoques anteriores como casi exclusivamente policiales y la conversión del rediseño evaluativo en requisito general (`content/recursos/glosario/integridad-academica/index.md:13-17`). La definición positiva de ICAI —honestidad, confianza, justicia, respeto, responsabilidad y valentía— ofrece una base mejor. Debe seguir siendo breve y subordinada a la explicación extensa.

## Verificaciones especiales

- **19 enlaces entrantes:** confirmado como **19 archivos activos distintos**, exactamente los enumerados en `docs/editorial/lotes/2026-08-24-contexto-lote-09-link-map.json:40-63`. El recuento independiente encontró **23 apariciones textuales exactas** de la ruta en esos 19 archivos, porque cuatro páginas la contienen dos veces. Por tanto, 19 es correcto como conteo de **páginas citantes**, no como número de ocurrencias o tokens de enlace.
- **Corrección 109 → 106:** confirmada. El manifiesto aplicado del lote 08 registraba 55 decisiones activas y 109 pendientes (`docs/editorial/lotes/2026-08-24-contexto-lote-08-application-manifest.json:17-24`). Las tres decisiones aprobadas del lote 06 estaban ausentes del ledger anterior y ahora aparecen en `data/editorial/context-audit-decisions.json:1110-1174`: coordinación (`conservar`), `about.md` y tutorías (`cambiar`). Resultado comprobado: **164 fuentes, 58 decisiones activas —15 conservar y 43 cambiar—, 106 pendientes**. El ledger histórico tiene 60 registros porque conserva dos rutas inactivas con decisión `quitar`.
- **Hoja de ruta:** 106 asignaciones, 106 rutas únicas, sin duplicados ni omisiones; coincide exactamente con el conjunto vivo de fuentes sin decisión.
- **QA de contexto:** `npm run qa:context-audit` pasó: **164 fuentes; inventario vigente**.
- **Integridad del manifiesto del lote 09:** los 16 hashes y tamaños coinciden con los archivos actuales.

## Bloqueos antes de considerar el expediente listo para VoBo

1. **Completar el ledger de evidencia del lote 09.** La clasificación es correcta, pero `2026-08-24-contexto-lote-09-citations.json` no documenta toda la cadena probatoria:
   - falta por completo el artículo de **Bearman et al. 2024** usado para corregir el blog;
   - la evidencia de Ajjawi no incluye las frases de acceso abierto, licencia y publicación en línea;
   - la cita de Liang incluye el 61.3 %, pero no los siete detectores ni los tamaños de los dos corpus;
   - la cita de Black y Wiliam acredita ganancias, pero no la definición funcional usada para corregir formativa/sumativa;
   - la cita de Eaton acredita responsabilidad, pero no las frases sobre atribución y demostración del aprendizaje.  
   Esto bloquea declarar el **expediente probatorio** completo, aunque no invalida ninguna de las cinco decisiones.

## Mejoras importantes

- Renombrar o explicar `incoming_count` como **conteo de archivos citantes únicos**; “19 enlaces” puede confundirse con las 23 ocurrencias textuales.
- En la ficha, distinguir explícitamente **publicación en línea 2023** de **volumen bibliográfico 2024** y señalar que el artículo publicado —no solo una copia de manuscrito— es abierto.
- En la guía formativa, corregir todas las reapariciones de la falsa oposición: también `:122-125,177-179,241-249`, no únicamente el *lead*.
- Mantener delimitada la cifra de detectores por corpus, herramientas y fecha; no extrapolarla a detectores posteriores ni a todos los estudiantes multilingües.

## Notas opcionales

- Añadir el DOI `10.30935/cedtech/17863` a la revisión sistemática de retroalimentación de 2026.
- En la ficha de Ajjawi, conservar Taylor & Francis como enlace principal abierto y ofrecer UTS como copia de repositorio estable.
- Rotular los tres casos de plagio como hipótesis es suficiente; no es necesario ampliarlos ni convertir la página en protocolo disciplinario.

**Archivos creados o modificados:** ninguno.  
**Publicación, aplicación o VoBo autorizados:** ninguno.
