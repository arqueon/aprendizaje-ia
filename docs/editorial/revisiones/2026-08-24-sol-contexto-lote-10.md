# Segunda lectura independiente — lote 10

**Fecha:** 2026-08-24  
**Revisora:** Sol, agente independiente  
**Delegación:** `deleg_9d6decba`  
**Alcance:** solo lectura; sin editar `content/`, sincronizar ni publicar  
**Resultado original:** AJUSTAR antes de solicitar VoBo

La clasificación **4 cambiar / 0 conservar / 0 quitar o poner en cuarentena está justificada**. Las cuatro páginas tienen utilidad y funciones distintas; no recomienda fusionarlas ni retirarlas. El expediente inicial contenía errores propios que debían corregirse antes del VoBo.

## Bloqueos señalados

### 1. Defectos atribuidos a la guía de herramientas que no existen

- No hay “piloto de cuatro semanas” ni plazo fijo en `evaluacion-herramientas-ia-educativas/index.md`; tampoco existe una plantilla descargable en su bundle.
- La página ya dice que la decisión **no es la suma de calificaciones** (`index.md:110-112`), por lo que “evitar una aprobación automática” no describía un problema actual.
- Debían conservarse como problemas reales el comité mínimo, la comparación obligatoria y los “errores reportados” sin fuente; eliminar piloto, plazo fijo, aprobación automática y “descarga de plantilla”.
- El bundle real solo contiene `index.md`, `featured.webp` y recuperaciones ocultas.

### 2. Dependencia DEC subcontada

- No eran 3 archivos/3 apariciones, sino **4 archivos/4 apariciones** en `content/`.
- Faltaba `content/recursos/articulos/partnerships-pedagogicos-ia-wang-zhang/index.md:87`, que usa un shortcode `ref`.
- El conteo limitado a URL exacta no capturaba referencias Hugo.

### 3. Enlace externo DEC roto

- El `articuloUrl` actual (`https://www.digitaleducationcouncil.com/research/the-next-era-of-assessment`) devuelve **404**.
- Debe sustituirse por la página viva del recurso.
- El informe denomina internamente las 14 como “emerging methodologies” y usa principalmente “AI-resilient”; la página pública usa “practical methodologies” y “AI-resistant”. La reescritura debe comprobar y respetar esa diferencia.

### 4. Ledger de evidencia

- La cita [6] estaba traducida al inglés, aunque Gaceta UNAM publica la frase en español.
- [7] debía distinguir adopción/código de 2021 y publicación en 2022.
- Las citas de [3]-[5], [8] y [10] debían cubrir explícitamente licencia, 14 metodologías, criterios y consulta local.

## Ajustes por página

- **Zhan et al.:** corregir autores y referencia; describir estudio conceptual, marco tentativo y provisional; separar seis *affordances* de las etapas `eliciting–processing–enacting` y del ciclo `forethought–control–retrospect`; no atribuir un ciclo conjunto a Carless y Hattie; identificar la copia abierta como CC BY-NC-ND.
- **Guías UNAM:** conservar 32, 57 y 31 páginas físicas; no homogenizar ARCHED y GAIA-GEN en bachillerato, los diez principios atribuidos a UNESCO (2025) en licenciatura y la clasificación sin IA/asistida/integrada en posgrado; retirar “la frase más repetida”, la primacía mexicana y el diálogo no citado con Bearman.
- **DEC:** cambiar “más de 100” por 101 y “comprobadas” por una descripción atribuida de las 14 metodologías; atribuir “primer mapeo integral” al DEC/Pearson; corregir también en la página UNAM “las 14 metodologías necesarias”.
- **Guía de herramientas:** preservar que ya declara su adaptación de ASCCC/eCampusOntario; no atribuir a ambos marcos los cuatro pasos completos; auditar EDUCAUSE y UNESCO; usar la página del capítulo eCampusOntario porque su PDF directo devolvió 403.

## Dependencias que deben preservarse

- Las cuatro rutas.
- Zhan: `featured.webp` y DOI.
- UNAM: tres PDF, tres portadas PNG, `featured.svg`, anclas, iframes y descargas.
- DEC: `featured.png` y 4 enlaces entrantes.
- Guía de herramientas: `featured.webp` y 4 apariciones en 3 archivos.
- Todos los archivos ocultos de recuperación Nextcloud.
- Crear rollback nuevo antes de cualquier edición.

## Reconciliación editorial

Se incorporaron todos los hallazgos anteriores salvo la afirmación adicional de que `etica` no figuraría entre las áreas permitidas. Esa observación fue descartada tras comprobar que múltiples páginas activas usan `etica` y que no existe un vocabulario controlado localizado que la excluya.

**Archivos creados o modificados por la revisora:** ninguno.  
**Publicación autorizada por la revisión:** no.
