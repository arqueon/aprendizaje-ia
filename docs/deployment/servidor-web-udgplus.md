---
title: "Contrato de despliegue web · Aprendizaje Digital e IA"
date: 2026-07-26
tags:
  - ia-udgplus
  - hugo
  - h5p
  - despliegue
  - infraestructura
---

# Contrato de despliegue para el servidor oficial UDGPlus

## Documentos relacionados

- [Runbook de réplica y promoción institucional bajo `udg.mx`](replicacion-institucional-udgmx.md):
  roles, prerrequisitos, cadena de suministro, staging, promoción, rollback y expediente.
- [Adaptador de laboratorio para Sinopé y Coolify](adapters/sinope-coolify.md):
  traducción operativa separada del contrato institucional.

## Decisión

El sitio es un **artefacto estático portable**. GitHub Pages es el adaptador de publicación
vigente, no una dependencia de arquitectura. La misma carpeta `public/` puede servirse
desde Nginx, Apache, almacenamiento de objetos con CDN u otra plataforma institucional que
cumpla este contrato.

El carril complementario de construcción en contenedor se rige por el
[contrato CI para la imagen OCI](imagen-oci-ghcr.md). En su puerta inicial solo
admite despacho manual, no despliega y bloquea el push a GHCR cuando algún
objeto conserva licencia pendiente o publicación no autorizada.

Hugo y Node.js se necesitan al construir y verificar el artefacto, no en el servidor web
de producción. El runtime H5P, las fuentes, imágenes, SVG, CSS, JavaScript y JSON se
publican juntos y desde el mismo origen.

La URL final —dominio, raíz o subruta— todavía es una decisión de infraestructura. Debe
conocerse **antes** de compilar: Hugo define `baseURL` como la URL absoluta de publicación
con protocolo, host, ruta y `/` final. También permite establecerla mediante
`HUGO_BASEURL`, sin cambiar el repositorio
([documentación de Hugo](https://gohugo.io/configuration/introduction/#environment-variables)).

```bash
export HUGO_BASEURL="https://sitio-oficial.udg.mx/ruta/"
npm ci --ignore-scripts
npm run h5p:verify
npm run qa:h5p
hugo --minify --environment production --destination public
```

Solo se publica `public/`; nunca el checkout, `node_modules/`, las fuentes `.h5p`, el
catálogo de autoría ni los archivos de trabajo.

## Requisitos obligatorios

| Área | Requisito |
|---|---|
| Transporte | HTTPS público con certificado válido. HTTP queda limitado a pruebas loopback |
| Modelo | Hosting de archivos estáticos; no requiere PHP, base de datos, sesión ni ejecución Node/Hugo |
| Base URL | Servir exactamente en la raíz o subruta usada al compilar, conservando `/` final |
| Rutas | No reescribir archivos inexistentes a `index.html`; devolver 404 real para activos ausentes |
| Mismo origen | Página, `/h5p/udgia/v1/`, `/fonts/` y medios deben compartir protocolo, host y puerto |
| Query string | Conservar `?content=…&instance=…` al servir `embed.html` |
| MIME | HTML `text/html`; JS `text/javascript` o `application/javascript`; CSS `text/css`; JSON `application/json`; SVG `image/svg+xml`; WOFF2 `font/woff2`; audio/video según formato |
| Iframe | No usar `X-Frame-Options: DENY` ni `frame-ancestors 'none'` sobre el embed. `SAMEORIGIN` es compatible |
| CSP | Si el servidor añade CSP por cabecera al embed, debe permitir recursos propios y el bootstrap inline que exige actualmente H5P; la prueba funcional es la autoridad |
| Integridad | Transferir el árbol completo sin renombrar, recomprimir ni modificar HTML/JS/JSON después del build |
| Privacidad | No inyectar analítica, scripts, gestores de consentimiento o autenticación dentro del iframe sin una revisión separada |

Los navegadores se apoyan en `Content-Type`, no en la extensión, y pueden bloquear scripts
o estilos con tipos incorrectos, especialmente si se activa `nosniff`
([MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types),
[`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options)).

## Requisitos para medios y rendimiento

- El player, las bibliotecas y los shells versionados bajo `/h5p/udgia/v1/` deberían usar
  `Cache-Control: public, max-age=31536000, immutable`.
- El HTML del sitio, `content-index.json`, `runtime-manifest.json` y los contenidos H5P
  no deben quedar inmutables: pueden cambiar al incorporar objetos sin cambiar el player.
- El servidor debe ofrecer compresión Brotli o gzip para HTML, CSS, JS, JSON y SVG sin
  alterar sus bytes descomprimidos.
- Antes de incorporar H5P con audio o video, debe responder solicitudes `Range` con
  `206 Partial Content`; esto permite buscar y reanudar medios
  ([HTTP Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests)).
- Se recomienda `X-Content-Type-Options: nosniff` y
  `Referrer-Policy: strict-origin-when-cross-origin` en todo el sitio.

La caché larga es segura para player/bibliotecas/shell porque el runtime usa un directorio
versionado. **Cualquier cambio de bytes**, compatible o incompatible, en un recurso marcado
`immutable` exige una URL nueva —en este esquema, publicar `v2/`—; nunca se reemplazan
silenciosamente sus bytes en `v1/`.

## Configuración orientativa

Estas reglas deben adaptarse al dominio y ruta definitivos; no sustituyen la configuración
de infraestructura.

### Nginx

```nginx
location /ruta/ {
    try_files $uri $uri/ =404;
}

location ~* ^/ruta/h5p/udgia/v[0-9]+/(player|libraries|themes)/ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
    add_header X-Content-Type-Options "nosniff" always;
}

location ~* ^/ruta/h5p/udgia/v[0-9]+/(host\.(css|js)|embed\.(css|html|js))$ {
    try_files $uri =404;
    add_header Cache-Control "public, max-age=31536000, immutable";
    add_header X-Content-Type-Options "nosniff" always;
}

location ~* ^/ruta/h5p/udgia/v[0-9]+/(content-index\.json|runtime-manifest\.json|content/) {
    try_files $uri =404;
    add_header Cache-Control "no-cache";
    add_header X-Content-Type-Options "nosniff" always;
}
```

`try_files` comprueba la existencia de archivos en el orden indicado
([Nginx](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)); las
cabeceras se configuran con `add_header`
([Nginx](https://nginx.org/en/docs/http/ngx_http_headers_module.html#add_header)).

### Apache 2.4

```apache
Options -Indexes -MultiViews

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"

  <LocationMatch "^/ruta/h5p/udgia/v[0-9]+/(player|libraries|themes)/">
    Header always set Cache-Control "public, max-age=31536000, immutable"
  </LocationMatch>

  <LocationMatch "^/ruta/h5p/udgia/v[0-9]+/(host\.(css|js)|embed\.(css|html|js))$">
    Header always set Cache-Control "public, max-age=31536000, immutable"
  </LocationMatch>

  <LocationMatch "^/ruta/h5p/udgia/v[0-9]+/(content-index\.json|runtime-manifest\.json|content/)">
    Header always set Cache-Control "no-cache"
  </LocationMatch>
</IfModule>
```

Apache asocia extensiones y tipos mediante `mod_mime`, y controla cabeceras/caché con
[`mod_headers`](https://httpd.apache.org/docs/2.4/mod/mod_headers.html) y
[`mod_expires`](https://httpd.apache.org/docs/2.4/mod/mod_expires.html). Deben verificarse
los MIME reales después del despliegue; no basta con confiar en la configuración.

## Sonda portable de aceptación

Después de cada publicación, incluida la futura plataforma oficial:

```bash
npm ci --ignore-scripts
npx playwright-core install chromium
npm run qa:h5p:deployment -- https://sitio-oficial.udg.mx/ruta/
```

La sonda `tools/h5p/probe-deployment.mjs`:

1. exige HTTPS en destinos no locales;
2. sigue redirecciones manualmente, con límite y timeout, y rechaza cada salto fuera del
   origen o de la subruta antes de hacer la siguiente solicitud;
3. compara el manifiesto y cada archivo H5P publicado, byte por byte y SHA-256, con el
   checkout desde el que se ejecuta;
4. comprueba raíz, subruta, enlaces/solicitudes internas, 404 directos, query strings,
   MIME, caché mutable/inmutable —incluidas directivas contradictorias y caché anual
   accidental sobre contenido mutable— y respuestas Range;
5. abre la fixture no curricular con Chromium y CSP real, y confirma que la propia CSP
   bloquea script y `fetch` externos sin depender de una salida real a Internet;
6. verifica carga diferida, teclado, dos montajes, altura, impresión y fallback;
7. rechaza solicitudes externas —incluidos WebSockets—, bloquea Service Workers en el
   navegador de prueba y rechaza métodos de escritura, errores de consola o cambios de
   almacenamiento;
8. informa como advertencias la falta de caché larga en activos versionados, `nosniff`,
   cookies de infraestructura, `Referrer-Policy` y soporte Range antes de incorporar medios.

Para una prueba local se permite exclusivamente:

```bash
npm run qa:h5p:deployment -- http://127.0.0.1:8080/ruta/ --allow-http
```

Con `--report ruta/informe.json` —o `DEPLOYMENT_REPORT`— la evidencia queda en JSON.
Los errores de uso salen con código `2`; los fallos de aceptación, con código `1`.

## Publicación atómica y rollback

El destino institucional debe conservar **al menos la versión activa y las dos versiones
anteriores que hayan pasado la sonda**, durante un mínimo de 30 días. La retención mayor
que establezcan UDGPlus o su política de respaldo prevalece.

### Nginx o Apache sobre sistema de archivos

1. Construir cada entrega en un directorio nuevo e inmutable, por ejemplo
   `/srv/aprendizaje-ia/releases/<commit>/`; nunca copiar encima de la versión activa.
2. Verificar el artefacto, permisos y hashes antes de exponerlo. La raíz del virtual host
   apunta a un enlace `current` o a un mecanismo equivalente del servidor.
3. Cambiar `current` mediante un reemplazo atómico de enlace dentro del mismo sistema de
   archivos. Registrar qué release era la anterior.
4. Ejecutar inmediatamente la sonda remota contra la URL pública y observar respuestas
   4xx/5xx y errores del navegador.
5. Si la sonda da `FAIL`, aparece un 5xx sostenido, los activos H5P dan 404/MIME erróneo,
   se bloquea el iframe/CSP o se supera el umbral institucional de errores, volver
   atómicamente `current` a la release anterior **sin reconstruirla**.
6. Repetir la sonda después del rollback y conservar ambos informes. Un rollback no está
   cerrado hasta recuperar `PASS`.

Ejemplo de cambio atómico, después de validar que `RELEASE_ID` corresponde a un commit
aprobado y que la release contiene `index.html`:

```bash
test -f "/srv/aprendizaje-ia/releases/${RELEASE_ID}/index.html"
ln -s "releases/${RELEASE_ID}" "/srv/aprendizaje-ia/current.next"
mv -Tf "/srv/aprendizaje-ia/current.next" "/srv/aprendizaje-ia/current"
```

El rollback repite esas tres operaciones con el identificador exacto de la release anterior
registrada; `mv` debe ocurrir en el mismo sistema de archivos para conservar la atomicidad.
Si el panel institucional ofrece una primitiva de release equivalente, se usa esa primitiva
y se documenta el identificador reversible.

### Almacenamiento de objetos o CDN

1. Subir el artefacto completo a un prefijo nuevo, por ejemplo
   `releases/<commit>/`, sin mutar el prefijo de la entrega activa.
2. Validar ese prefijo en staging y después cambiar de forma atómica el alias, origen o
   regla de enrutamiento que representa la versión activa.
3. Ante los mismos criterios de fallo, restaurar el puntero al prefijo anterior y purgar
   únicamente HTML/índices mutables si la plataforma lo requiere; no purgar ni sobrescribir
   activos inmutables compartidos.
4. Repetir la sonda pública, guardar la evidencia y confirmar `PASS`.

La tecnología definitiva —symlink, releases del panel institucional, alias de bucket o
versión del CDN— se acordará con infraestructura UDGPlus. Debe demostrar estas propiedades,
no necesariamente usar los nombres de los ejemplos.

## Migración al espacio oficial

Antes de cambiar DNS o retirar GitHub Pages:

1. acordar dominio, subruta, servidor/CDN, responsable, publicación atómica, retención y
   mecanismo probado de rollback;
2. confirmar límites de tamaño, tipos MIME, CSP/WAF, cookies y soporte Range;
3. construir con la `baseURL` definitiva y conservar el artefacto firmado o su SHA-256;
4. publicar primero en staging bajo la misma topología;
5. ejecutar QA local y la sonda remota;
6. revisar visualmente portada, una página densa, SVG, fuentes y cada familia H5P;
7. hacer el cambio de tráfico conservando activa la referencia exacta a la entrega anterior;
8. aplicar los criterios de rollback durante la ventana de observación acordada;
9. repetir la sonda desde fuera de la red universitaria, también después de cualquier rollback;
10. registrar versión, fecha, responsable, URL, commit, release anterior y evidencia en el
    ledger y Logseq.

El repositorio no debe guardar contraseñas, llaves SSH, tokens del CDN ni rutas privadas
del servidor. Esos datos pertenecen al gestor institucional de secretos.
