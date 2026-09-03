# Registro de aplicación — UDGIA lote 3: tres literacidades (F13)

**Fecha:** 2026-09-03  
**VoBo humano:** Rubén, 2026-09-03 (figura autorizada en la autoridad IAorientaciones y publicación en el sitio pedida el mismo día)  
**Alcance autorizado:** publicación de la figura F13 en `/formacion-docente/mapa-literacidades-ia/`  
**Publicación autorizada:** sí  
**Producción modificada:** sí (una página)  
**Estado del registro:** aplicado

## Origen

Paquete `dist/figuras/1.0.0-lote3/` del repositorio IAorientaciones (revisión `1fdb18e`), figura
`udgia-f13-literacidades` (`tres-literacidades.svg`, sha256 `15127692…0321`; descripción
`udgia-f13-literacidades.md`, sha256 `eb3cb4a2…6545`). Licencia CC BY-SA 4.0, atribución
Aprendizaje Digital e IA (UDGPlus), Universidad de Guadalajara; autorización editorial del
proyecto, no dictamen institucional.

## Cambios aplicados

1. `content/formacion-docente/mapa-literacidades-ia/tres-literacidades.svg`: variante de
   escritorio con lienzo propio y bloque de apariencia oscura (convención 6); la banda final
   omite la remisión «(§5)» del documento fuente porque no tiene referente en el sitio
   (adaptación `hugo-lote3-vobo-contextual`).
2. `…/tres-literacidades-mobile.svg`: variante vertical nueva (420 × 1010), tres bloques
   apilados con la dependencia «supone la anterior».
3. `…/index.md`: shortcode `udgia-figure` al abrir «Las tres literacidades», con tabla de
   respaldo textual (P3, I3).
4. `data/udgia_figures.json`: entrada `udgia-f13-literacidades` con procedencia y checksums.
5. `tools/qa-udgia-figures.mjs`: F13 en `canonicalSources` y `targets`.

## Verificación

`npm run qa:udgia-figures` y construcción de Hugo, ver el commit.

## Reversibilidad

Revertir el commit; no se retiró ningún archivo previo.
