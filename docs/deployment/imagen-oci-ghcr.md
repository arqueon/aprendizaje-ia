---
title: "Contrato CI para imagen OCI · Aprendizaje Digital e IA"
date: 2026-07-28
tags:
  - ia-udgplus
  - hugo
  - contenedores
  - ghcr
  - gobernanza
---

# Contrato CI para la imagen OCI

## Alcance de esta puerta

El workflow `container-image.yaml` construye una imagen OCI a partir del
`Dockerfile` de la raíz. Por ahora se ejecuta **solo mediante
`workflow_dispatch`** y no despliega en Coolify ni en otro servidor.

La QA existente de Hugo y H5P ocurre antes de construir la imagen y conserva su
autoridad. La compilación del contenedor no sustituye `h5p:verify`, las pruebas
funcionales, de accesibilidad y seguridad de H5P, ni las pruebas de las rutas de
coordinación y decisión institucional.

El `Dockerfile` debe aceptar `HUGO_BASEURL` como argumento de compilación. El
workflow exige una URL HTTPS absoluta terminada en `/`; la URL queda incorporada
al artefacto Hugo y no es una configuración intercambiable en tiempo de
ejecución. También rechaza credenciales, consultas, fragmentos y caracteres de
control en esa entrada.

## Dos rutas explícitas

### Construcción sin publicación

Con `publish_image: false`, valor predeterminado, BuildKit produce un archivo
OCI efímero y no inicia sesión en ningún registro. El archivo se etiqueta
internamente con el SHA completo del commit y se descarta con el runner; no se
sube como artefacto para evitar que la ruta de prueba se convierta en un canal
alterno de distribución. Solo se conserva el informe técnico sin el contenido
de la imagen. También se desactiva la subida automática del registro interno de
BuildKit.

Esta ruta informa los bloqueos editoriales vigentes, pero no falla por ellos:
permite probar la arquitectura sin hacer públicos materiales cuya licencia aún
no está resuelta.

### Publicación gobernada en GHCR

Con `publish_image: true`, el workflow audita antes del login:

- `data/h5p/catalog.json`;
- `data/udgia_figures.json`.

El intento se bloquea si cualquier objeto no declara
`publicationAuthorized: true` de forma explícita, si la licencia falta o está
pendiente, o si una licencia H5P continúa sin resolverse. En el estado actual
del repositorio la publicación queda bloqueada deliberadamente.

Solo después de una auditoría sin bloqueos, el job obtiene permiso
`packages: write`, inicia sesión en `ghcr.io` con el `GITHUB_TOKEN` efímero y
publica:

```text
ghcr.io/<propietario>/<repositorio>:<sha-completo>
```

No se emiten etiquetas mutables como `latest`. BuildKit solicita SBOM y
procedencia de nivel máximo como atestaciones OCI. Cada corrida conserva además
un informe con el SHA fuente, digest, referencia inmutable
`imagen@sha256:…` y metadatos de construcción.

## Permisos y secretos

No se requiere ningún secreto personalizado:

- `contents: read` se aplica por defecto;
- `packages: write` existe únicamente en el job de publicación;
- `secrets.GITHUB_TOKEN` es el token efímero proporcionado por GitHub Actions.

El repositorio u organización debe permitir que Actions escriba paquetes para
que una futura publicación autorizada funcione. No se incorpora token de
Coolify, contraseña de registro ni credencial de infraestructura al
repositorio. Los argumentos de compilación tampoco deben transportar secretos:
la procedencia de nivel máximo puede registrarlos; `HUGO_BASEURL` contiene
únicamente la URL pública de destino.

## Puertas posteriores

Agregar `push` sobre `main` al disparador requiere una aprobación posterior y
explícita, después de resolver las licencias y validar una publicación manual.
Conectar el digest resultante con Coolify u otra plataforma constituye otra
puerta: deberá consumir una referencia inmutable, definir rollback y ejecutar
la sonda de despliegue. Esta fase no realiza ninguna de esas acciones.

El adaptador vigente de GitHub Pages aplica el mismo contrato en modo
`public` antes de compilar. Por ello, una futura subida a `main` no puede
publicar los SVG o H5P pendientes por una ruta lateral.

## Verificación local

La puerta editorial y la estructura del workflow pueden comprobarse sin
Docker:

```bash
npm run qa:container-publication
npm run qa:container-workflow
node --check tools/ci/publication-contract.mjs
node --check tools/ci/validate-base-url.mjs
node --check tools/ci/write-oci-evidence.mjs
```

El modo público debe fallar mientras existan bloqueos:

```bash
node tools/ci/publication-contract.mjs --mode public
```

El modo de construcción registra los mismos bloqueos sin impedir una prueba
local:

```bash
node tools/ci/publication-contract.mjs \
  --mode build-only \
  --report /tmp/udgia-publication-contract.json
```
