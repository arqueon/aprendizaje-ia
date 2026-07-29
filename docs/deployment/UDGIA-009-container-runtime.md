# UDGIA-009 · Contrato de imagen y runtime del sitio Hugo

**Estado:** implementación local lista para revisión; no desplegada ni publicada.
**Rama:** `codex/UDGIA-009-container-runtime`
**Base:** `19021444f8d41838c9fc77c43e0df1decbc30136`

## Propósito

La imagen permite construir el sitio fuera de Sinopé y ejecutar exactamente el artefacto
estático resultante en un Nginx sin privilegios. El servidor no conoce secretos, no compila
en producción y no convierte rutas inexistentes en páginas válidas.

El `Dockerfile` tiene dos etapas:

1. La etapa `build` instala y verifica Hugo Extended 0.164.0 y Go 1.25.6 sobre Node
   22.22.0. Ejecuta `npm ci`, comprueba el runtime H5P y genera el sitio con una
   `HUGO_BASEURL` obligatoria.
2. La etapa `runtime` contiene únicamente Nginx 1.29.4 sin privilegios, la configuración y
   la salida estática. El proceso final declara `USER 101:101` y escucha en el puerto 8080.

Las imágenes de Node y Nginx están fijadas mediante etiquetas de versión y digests
multi-arquitectura. Los archivos oficiales de Hugo y Go para `amd64` y `arm64` se verifican
con SHA-256 antes de extraerse. El bloqueo de Node se reproduce con `npm ci` y el módulo
Hugo se valida mediante `go.sum`.

Fuentes de versión:
[Hugo 0.164.0](https://github.com/gohugoio/hugo/releases/tag/v0.164.0),
[Node 22.22](https://hub.docker.com/_/node) y
[Nginx sin privilegios](https://github.com/nginx/docker-nginx-unprivileged).

## Construcción

La URL base es parte del artefacto y debe indicarse de forma exacta, absoluta, normalizada y
con `/` final:

```bash
docker build \
  --build-arg HUGO_BASEURL=https://sitio.example/ \
  --tag aprendizaje-ia:local \
  .
```

Para una publicación bajo subruta:

```bash
docker build \
  --build-arg HUGO_BASEURL=https://sitio.example/aprendizaje-ia/ \
  --tag aprendizaje-ia:subruta-local \
  .
```

El constructor rechaza URLs relativas, credenciales, fragmentos, query strings, rutas
inseguras o valores sin `/` final. El contenido se coloca en la misma subruta dentro del
document root de Nginx, por lo que la imagen no necesita sustituciones en el arranque.

`.dockerignore` excluye Git, workflows, salidas previas, dependencias locales, documentos de
trabajo, archivos de entorno, llaves, certificados y directorios de secretos.

## Contrato HTTP

| Aspecto | Contrato |
|---|---|
| Proceso | Nginx se ejecuta como `101:101` y escucha en `8080`. |
| Salud | `GET /healthz` devuelve `200`, `text/plain`, `ok` y `Cache-Control: no-store`. |
| Rutas inexistentes | `try_files $uri $uri/ =404` conserva un `404` real; no existe fallback de aplicación de una sola página. |
| Query strings | La resolución usa `$uri`, por lo que parámetros como `?content=…&instance=…` no alteran el archivo ni se pierden. |
| MIME | Se declaran HTML, CSS, JavaScript/MJS, JSON, webmanifest, WASM, SVG, fuentes, audio y video. |
| Activos versionados | JavaScript, CSS, fuentes e imágenes de `/h5p/udgia/vN/`, incluso bajo subruta, usan un año e `immutable`. Los nombres con huella hexadecimal reciben el mismo tratamiento. |
| Contenido mutable | HTML, JSON y webmanifest usan `no-cache`. Los demás archivos usan una hora. |
| Compresión | Gzip se habilita para texto, CSS, JavaScript, JSON, XML, SVG, webmanifest y WASM. |
| Solicitudes parciales | Nginx conserva soporte nativo de `Range` y limita cada petición a un rango. |
| Seguridad | Todas las respuestas incluyen CSP compatible con el montaje H5P, `nosniff` y `strict-origin-when-cross-origin`. |

La CSP mantiene scripts en el mismo origen, permite estilos en línea requeridos por H5P,
restringe marcos y conexiones al propio origen, y bloquea objetos. El iframe H5P conserva
además su política meta más restrictiva.

## Ejecución endurecida

La imagen admite un filesystem raíz de solo lectura y todas las capacidades eliminadas:

```bash
docker run --rm \
  --read-only \
  --cap-drop=ALL \
  --security-opt no-new-privileges:true \
  --tmpfs /tmp:rw,noexec,nosuid,size=32m \
  --publish 127.0.0.1:8080:8080 \
  aprendizaje-ia:local
```

No se incluyen credenciales, configuración de proxy, certificados ni decisiones específicas
de Sinopé. Esos elementos pertenecen al entorno de despliegue y requieren una puerta
separada.

## Verificación local

La prueba disponible sin motor de contenedores es:

```bash
npm run qa:container:static
```

Esta prueba:

- valida versiones, digests, checksums, usuario, healthcheck y estructura multi-stage;
- comprueba el contrato Nginx, MIME, caché, CSP, gzip, Range y `404`;
- confirma por checksum que `.github/workflows/hugo.yaml` permanece intacto;
- construye Hugo con una URL raíz y otra bajo `/ecosistema-ia/`;
- verifica que la salida física, los activos H5P y sus query strings respeten cada base;
- confirma que el constructor rechace una URL con credenciales.

Cuando Docker esté disponible:

```bash
npm run qa:container:image
```

La prueba construye dos imágenes efímeras, las ejecuta con rootfs de solo lectura, sin
capacidades y con `no-new-privileges`, y comprueba usuario, healthcheck, raíz/subruta,
cabeceras, MIME, caché mutable/versionada, gzip, `Range 206`, query strings y `404` real.
Después elimina únicamente los contenedores e imágenes temporales que ella creó.

## Verificación de este corte

- `npm run qa:container:static`: `PASS` en raíz y subruta.
- `git diff --check`: sin errores.
- Los tres scripts Node pasan comprobación sintáctica.
- Docker, Podman, Nginx y otros runtimes de contenedores no están instalados en este
  entorno; por ello la construcción y la prueba de imagen quedan preparadas, pero no se
  reportan como ejecutadas.
- No se modificó el workflow de GitHub y no hubo push, despliegue ni publicación.
