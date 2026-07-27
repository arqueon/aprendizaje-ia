# Runtime H5P de IA UDGPlus

Esta carpeta contiene las fuentes gobernadas del runtime H5P que Hugo publica bajo
`/h5p/udgia/v1/`. El reproductor y los paquetes se fijan por versión y hash; el sitio no
usa CDN, cuentas, xAPI, LRS, calificaciones ni persistencia.

## Construcción

```bash
npm ci --ignore-scripts
npm run h5p:build
npm run h5p:verify
```

`h5p:build` valida y extrae los paquetes registrados en
`data/h5p/catalog.json`. Rechaza hashes inesperados, rutas absolutas, `..`, enlaces
simbólicos y estructuras H5P que no coincidan con el catálogo. El resultado generado y
versionado vive en `static/h5p/udgia/v1/`.

La única actividad incluida en UDGIA-003 es `runtime-probe`: una fixture técnica,
no curricular y `noindex`. Los objetos pedagógicos pertenecen a UDGIA-004.

## Modelo de confianza

Los paquetes H5P contienen JavaScript ejecutable. Solo se publican paquetes:

1. registrados por identificador estable;
2. con procedencia, licencia y SHA-256 conocidos;
3. inspeccionados y extraídos por el pipeline;
4. ejecutados dentro del iframe H5P, nunca en el documento padre.

El iframe usa una política de contenido de mismo origen. `allow-scripts` y
`allow-same-origin` son necesarios porque `h5p-standalone` obtiene JSON, CSS y JavaScript
mediante rutas del propio sitio. Esta combinación no sustituye la revisión del paquete:
el control principal es el catálogo cerrado y su hash.
