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
simbólicos y estructuras H5P que no coincidan con el catálogo. Además, confina cada
fuente a `h5p/packages/`, comprueba procedencia y licencias cruzadas, y limita los
adaptadores futuros a hojas CSS gobernadas. El resultado generado y versionado vive en
`static/h5p/udgia/v1/`.

La fixture se empaqueta de forma reproducible: orden binario de rutas, permisos y fecha
fijos, timestamp DOS y entradas sin compresión. Así su SHA-256 no depende de la zona
horaria, ICU o la versión de zlib del equipo que ejecute Node.js.

La única actividad incluida en UDGIA-003 es `runtime-probe`: una fixture técnica,
no curricular y `noindex`. Los objetos pedagógicos pertenecen a UDGIA-004.

## Modelo de confianza

Los paquetes H5P contienen JavaScript ejecutable. Solo se publican paquetes:

1. registrados por identificador estable;
2. con procedencia, licencia y SHA-256 conocidos;
3. inspeccionados y extraídos por el pipeline;
4. cargados dentro del iframe H5P, no como scripts del template de Hugo.

El iframe usa una política de contenido de mismo origen. `allow-scripts` y
`allow-same-origin` son necesarios porque `h5p-standalone` obtiene JSON, CSS y JavaScript
mediante rutas del propio sitio. Esta combinación no sustituye la revisión del paquete:
el control principal es el catálogo cerrado y su hash. Tampoco es una frontera frente a
JavaScript hostil de mismo origen; por eso la interfaz habla de **encapsulación**, no de
aislamiento de seguridad.

La CSP del documento encapsulado impide conexiones y recursos externos. El bootstrap
precompilado que genera H5P requiere actualmente `script-src 'unsafe-inline'`; esta
concesión queda confinada al iframe y se prueba de forma negativa contra scripts y
conexiones externas.

## QA

```bash
npm run qa:h5p
```

El recorrido automatizado prueba Hugo en raíz y subruta, dos montajes independientes,
carga diferida, crecimiento y contracción de altura, teclado, movimiento reducido,
fallback sin JavaScript/ante error/en impresión, reinicio, ausencia de persistencia y
escrituras, CSP real y accesibilidad con axe. La omisión de CSP se usa únicamente en un
contexto separado para inyectar axe; no interviene en los recorridos funcionales ni de
seguridad.

## Despliegue

El runtime no depende de GitHub Pages. Debe publicarse junto con el artefacto Hugo, bajo
el mismo origen y la `baseURL` real. MIME, query strings, políticas de iframe, caché y
soporte de medios forman parte del contrato del servidor.

La guía completa está en `docs/deployment/servidor-web-udgplus.md`. Todo destino se
comprueba después de publicar con:

```bash
npm run qa:h5p:deployment -- https://dominio/ruta/
```
