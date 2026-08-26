# Auditoría visual reconciliada después del piloto

**Fecha:** 2026-08-23  
**Fuente:** `/home/hermes/Nextcloud/Projects/ia/aprendizaje-ia`  
**Estado:** diagnóstico y contrato local; sin publicación.

## Alcance estricto actual

- 166 URLs canónicas: 142 páginas, 23 secciones y 1 home.
- 137/166 tienen featured propia; faltan 29: 26 páginas, 2 secciones y la home.
- 2 bundles contienen dos candidatos featured.
- 44/166 rutas tienen visual de cuerpo; 122 todavía no.
- 19 rutas ocultan el hero explícita o efectivamente.
- 35 archivos presentan anomalía entre extensión y MIME.
- 1,102 archivos de respaldo sincronizado `.~hash` permanecen dentro del alcance; 139 corresponden a featured.

La featured Almagre global evita vacíos técnicos, pero no cuenta como imagen editorial propia. Las 29 rutas deben resolverse gradualmente, con procedencia, licencia, texto alternativo, geometría y relación semántica revisadas.

## Cards reconciliadas

La primera compuerta cubría solo cards Blowfish y related: 295 salidas. La auditoría paralela detectó que omitía 78 invocaciones fuente del shortcode local `card`.

Se aplicó un ciclo RED→GREEN:

1. RED: `0/78` shortcodes marcados y cubiertos por el contrato.
2. Implementación: `img=` conserva prioridad; enlaces internos resuelven la featured del destino; las anclas usan la featured de su página; el fallback Almagre se usa solo cuando no existe imagen propia.
3. GREEN: 199/199 cards del shortcode renderizadas con imagen —Hugo repite invocaciones en aliases y salidas derivadas—.
4. Contrato total: **494 cards con imagen** (`295 + 199`).

Verificación de navegador en home, Formación docente, Ensayo y Coordinación académica: 35/35 cards con imágenes cargadas, 0 rotas, 0 peticiones externas, 0 errores de consola y móvil a 412 px sin overflow.

### Actualización tras simplificar la portada

La corrección humana de la portada retiró el diagrama interno y el bloque automático `Reciente`: ambos competían con la explicación inicial y las tres acciones de entrada. El contrato visual actual registra **309 cards con imagen y 0 sin imagen**: 95 salidas del shortcode local y 214 cards del tema/related. La diferencia frente al corte de 494 no representa pérdida de imágenes ni páginas; corresponde a salidas derivadas que dejaron de renderizarse al retirar `Reciente`. Las 78 invocaciones fuente del shortcode local continúan gobernadas.

Verificación posterior: escritorio y móvil sin imágenes rotas, tráfico externo, errores de consola, overflow ni violaciones axe; inventarios 166 documentos/196 activos y build Hugo de 935 páginas en PASS.

El script auxiliar `/home/hermes/audit_hugo_cards.py` conserva una heurística anterior y ya no debe usarse como autoridad para el shortcode; segmenta HTML anidado y produce falsos negativos. La fuente vigente es `npm run qa:visual-contract` más las pruebas renderizadas.

## Deuda no resuelta

1. Crear featured propias para las 29 URL estrictas, priorizando targets visibles en cards.
2. Resolver los dos bundles con featured doble.
3. Normalizar las 35 anomalías MIME/extensión sin cambiar contenido inadvertidamente.
4. Excluir los backups `.~hash` del output público mediante una regla reproducible y verificada, no con borrado masivo.
5. Revisar visuales de cuerpo e interactividad por ganancia pedagógica, no por cuota.
6. Sustituir imágenes con texto pequeño/inglés o geometría inadecuada después de revisar procedencia y función.

## Frontera

No se asignaron imágenes genéricas en masa, no se normalizaron archivos ni se borraron backups. Esos trabajos requieren lotes propios, rollback y revisión humana.
