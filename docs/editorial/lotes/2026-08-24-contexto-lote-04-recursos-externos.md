# Lote 04 — consolidación de recursos externos

Fecha de apertura: 2026-08-24  
Estado: borrador consolidado, verificado y listo para VoBo específico; sin publicación ni retirada en producción  
Copia de trabajo: `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`

## Problema

El hub principal de Recursos envía a `recursos/links`, pero existe una segunda sección, `recursos/externas`, que promete organismos, comunidades, syllabus y herramientas aunque solo contiene dos curadurías. Las cinco piezas sustantivas no son duplicadas: tres son fichas de recursos individuales y dos comparan varias fuentes. La consolidación debe corregir la jerarquía sin perder esas funciones.

## Ledger de canonicalización

| Fuente actual | Función comprobada | Destino canónico | Acción | Compatibilidad |
|---|---|---|---|---|
| `content/recursos/externas/_index.md` | Hub paralelo e incompleto | `content/recursos/links/_index.md` | retirar el hub del borrador | alias `/recursos/externas/` en el hub canónico |
| `content/recursos/externas/comunidades-practica-docente-ia/index.md` | Curaduría de seis destinos de tipos distintos | `content/recursos/links/comunidades-practica-docente-ia/index.md` | mover y reescribir el alcance | alias desde la URL anterior |
| `content/recursos/externas/syllabus-internacionales-ia/index.md` | Curaduría de orientaciones y ejemplos para políticas de curso | `content/recursos/links/syllabus-internacionales-ia/index.md` | mover y corregir atribuciones | alias desde la URL anterior |
| `content/recursos/links/_index.md` | Índice de tres fichas individuales | misma ruta | convertir en hub canónico de fichas y curadurías | recibe alias del hub retirado |
| `content/recursos/links/ai-for-education-toolkit.md` | Ficha del portal temático UNESCO, no de un toolkit específico | `content/recursos/links/ai-for-education-toolkit/index.md` | corregir función y convertir en Page Bundle | URL pública sin cambio |
| `content/recursos/links/ocde-ia-educacion/index.md` | Ficha de un informe OCDE | misma ruta | conservar después de verificar | sin cambio |
| `content/recursos/links/unesco-marco-competencias-docentes-ia/index.md` | Ficha de un marco UNESCO | misma ruta | conservar después de verificar | sin cambio |

## Enlaces entrantes

- Un enlace al hub `recursos/externas` desde `formacion-docente/formacion-continua/`.
- Dos enlaces a la curaduría de comunidades desde páginas de Documentación.
- Ningún enlace interno a la curaduría de syllabus.

## Límites de la revisión externa inicial

Se inventariaron 18 destinos. Doce se extrajeron normalmente en la primera ronda. Una comprobación HTTP posterior confirmó KHIPUx, Harvard y la página del marco OCDE–Comisión Europea con respuesta 200. El DOI de la OCDE redirigió al informe correcto, aunque la CDN devolvió un desafío; la URL directa del informe ya había sido extraída. Los buscadores localizaron la sección vigente de inteligencia artificial de ANUIES-TIC y la página y el PDF de principios del Russell Group. ANUIES agotó el tiempo en acceso directo y Russell Group mantuvo un 403 de WAF, por lo que se registran como acceso automatizado limitado, no como enlaces rotos.

## Reversibilidad

El rollback está en `docs/editorial/rollback/2026-08-24-contexto-lote-04/`. Contiene 20 copias verificadas y un manifiesto con 13 archivos ocultos de recuperación de Nextcloud que permanecerán intactos en su ubicación original.

El hub retirado y su imagen están además en `docs/editorial/cuarentena/2026-08-24-contexto-lote-04/`. Las dos curadurías y sus imágenes se movieron, no se copiaron ni se borraron. La ficha UNESCO pasó de archivo independiente a Page Bundle sin cambiar su URL pública.

## Cambios del borrador

- `recursos/links` es ahora el único hub de recursos externos y distingue fichas individuales de curadurías temáticas.
- La curaduría de comunidades diferencia redes y programas con posibilidades de participación de catálogos, seminarios, principios e informes. También pide comprobar convocatoria, fecha, público e idioma.
- La curaduría de syllabus se presenta como comparación de políticas de curso y orientaciones. Ya no afirma que las cinco fuentes sean syllabus completos ni que determinadas formulaciones eviten conflictos. La propuesta local se declara editorial y no oficial.
- La ficha `AI for Education Toolkit` identifica ahora el destino real: el portal temático de UNESCO sobre IA en educación. Se convirtió en Page Bundle y recibió una portada editorial propia de 1200×630 píxeles.
- Las fichas del informe OCDE y del marco UNESCO conservaron su función y su ruta. La fuente primaria de la OCDE corrigió `41 %` por `37 % de docentes de secundaria baja que usaron IA para su trabajo`; UNESCO permitió reemplazar `la primera referencia global` por `una referencia global`.
- Se actualizaron las tres referencias internas, el índice del sitio, el ledger de decisiones, el contrato visual y la clasificación externa.

## Resultado técnico

- RED focal: 43 comprobaciones, 35 fallos esperados.
- GREEN estructural: 54/54. Una segunda regresión de atribuciones produjo RED 56/2 y terminó en GREEN 56/56 después de consultar las fuentes primarias. La reconciliación de Fable produjo RED 61/5 y GREEN final 61/61.
- Inventario: 167 documentos y 0 enlaces internos rotos.
- Decisiones activas: 11 `conservar`, 31 `cambiar`, 4 `quitar` y 121 pendientes.
- Auditoría de aprendizaje: 167/167.
- Contrato visual: 143 páginas y 499 cards con imagen.
- Build Hugo aislado: 942 páginas, 65 páginas de paginación, 206 archivos no-página, 1,436 estáticos, 254 imágenes procesadas y 404 aliases.
- Revisión focal: 12 vistas y tres rutas antiguas; 0 fallos programados y 0 infracciones axe A/AA.

La primera hoja de contacto móvil mostró cards con espacios vacíos. La investigación comprobó que las imágenes sí estaban en el HTML, pero seguían pendientes por una espera insuficiente del script de captura. Se añadió una regresión: el QA pasó de RED con cinco imágenes pendientes a GREEN después de esperar la carga diferida. No se modificaron el tema ni las plantillas. La evidencia regenerada muestra las cinco imágenes.

La última ejecución visual coincidió inicialmente con reconstrucciones del servidor Hugo provocadas por otro gate y Playwright perdió su contexto de navegación. Se eliminó la carrera: el servidor con recarga se detuvo, se creó un build en un destino nuevo y las 12 vistas y tres redirecciones se probaron contra un servidor estático. El resultado final fue 0 fallos.

## Segunda lectura independiente

Claude Code `2.1.233`, modelo `claude-fable-5`, leyó 6/6 fuentes activas, cinco fuentes anteriores y cuatro controles. Dictaminó `aprobar` editorialmente y `aprobar` técnicamente, sin bloqueos, sin cambios obligatorios, sin pérdida sustantiva y con aliases correctos.

La reconciliación resolvió cuatro grupos de observaciones menores: el hub nombra ahora el marco UNESCO exacto y recupera privacidad y datos personales; se retiraron dos referencias que ya no aparecían en el cuerpo; y las fichas OCDE y UNESCO usan la misma voz y alerta informativa. Se conservaron cuatro decisiones documentadas: el slug histórico mantiene la URL del antiguo toolkit; la portada editorial incluye texto legible; `curaduria` describe mejor esas páginas que `recurso-institucional`; y las copias ocultas de Nextcloud permanecen intactas aunque contengan enlaces históricos.

## Evidencia y diff

- `docs/editorial/lotes/2026-08-24-contexto-lote-04.diff`
- `docs/editorial/lotes/2026-08-24-contexto-lote-04-manifest.json`
- `docs/design/evidence/contexto-lote-04/`
- `docs/editorial/revisiones/2026-08-24-claude-fable-contexto-lote-04.json`

## Gates

1. prueba focal RED antes de mover contenido;
2. aliases y actualización de enlaces internos;
3. reconciliación del inventario activo de 168 a 167 fuentes;
4. build y comprobación de rutas antiguas y nuevas;
5. escritorio, móvil, consola y axe A/AA;
6. segunda lectura independiente;
7. VoBo específico antes de publicar o retirar rutas en producción.
