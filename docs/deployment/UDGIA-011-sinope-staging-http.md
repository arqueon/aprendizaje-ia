---
title: "UDGIA-011 · Sonda HTTP privada en Sinopé"
date: 2026-07-29
tags:
  - ia-udgplus
  - despliegue
  - staging
  - sinope
  - qa
---

# UDGIA-011 · Sonda HTTP privada en Sinopé

## Alcance

Esta compuerta ejecutó en Sinopé una imagen OCI construida fuera del servidor. No hubo
`push`, publicación en un registro, cambio DNS, exposición pública ni promoción a
producción. El origen permanece ligado únicamente a la interfaz loopback del host.

La prueba usó el contenido autorizado de `aprendizaje-ia` en `24b752e` y la URL base
deliberadamente no promocionable `https://oci.invalid/ecosistema-ia/`.

## Hallazgo de la primera ejecución

El OCI de UDGIA-010 se cargó correctamente y conservó su identidad
`sha256:5b3374a0b5a307dc6eaee7b7002c01b541a36d6392386e0e9c5fbcd48f29e491`,
pero Nginx no inició. La expresión regular para detectar nombres con huella hexadecimal
incluía el cuantificador `{8,}` sin comillas, que Nginx interpretó como sintaxis de bloque.

La fuente se corrigió delimitando la expresión completa con comillas y
`tools/container/qa-static.mjs` incorporó una aserción específica para impedir la
regresión. También se alineó la sonda con el contrato documentado: `embed.html` es HTML
mutable y debe usar `no-cache`; solo `host`/`embed` CSS y JavaScript son inmutables.

## Candidato corregido

La reconstrucción se hizo con BuildKit rootless en la estación de trabajo, reutilizando la
caché existente. Sinopé no compiló Hugo, no ejecutó Node y no generó SBOM.

| Evidencia | Valor |
|---|---|
| Referencia local | `udgia.local/aprendizaje-ia:udgia-011` |
| Digest OCI | `sha256:20bbb8c3caaa4304a35ccff87cb4d888c1cb115682c6fbfd459723f435aeabda` |
| Manifest de plataforma | `sha256:a55de3654042643a183498f26e45d61589f3a6aedab01fc4912d9adf817c25fe` |
| Configuración | `sha256:6169ca8f83af0f76536d99141e7fc855103864a1620b65ba6b4d0963677fb4fb` |
| SHA-256 del archivo OCI | `82424b5ce4ccd50f4cfbe2f687a34633c9c15d94b1a050f22150d0ac42117122` |
| SBOM y procedencia | Incluidos como atestaciones OCI |

## Endurecimiento efectivo

El contenedor de staging quedó ejecutándose con:

- usuario `101:101`;
- filesystem raíz de solo lectura;
- todas las capacidades eliminadas;
- `no-new-privileges`;
- `/tmp` efímero, `noexec` y `nosuid`;
- 128 MiB de memoria, sin swap adicional;
- 0.25 CPU y 64 procesos como máximo;
- logs con rotación;
- puerto publicado solo en loopback;
- healthcheck `healthy`.

## Resultado de la sonda

La sonda `qa:h5p:deployment` se ejecutó desde fuera del contenedor mediante un túnel SSH
privado. Resultado final: **PASS sin advertencias**.

| Criterio | Resultado |
|---|---|
| Integridad | 681 archivos y 9,943,325 bytes verificados byte por byte |
| Manifest runtime | SHA-256 `4ca09613a46fc7d05ed44e612e689e03d6bbc52a8901bb99e13436bb715b505e` |
| Salud | `200`, `text/plain`, `no-store` |
| MIME y `nosniff` | PASS para HTML, JSON, SVG, WebP, fuentes, CSS y JavaScript |
| Caché | HTML/JSON/contenido H5P `no-cache`; runtime versionado anual e `immutable` |
| Gzip | PASS en JavaScript H5P |
| Range | `206`, un byte, `Content-Range` válido |
| CSP | Script y `fetch` externos bloqueados por la política desplegada |
| H5P | Dos montajes independientes, teclado y fallback de impresión |
| Privacidad | Cero cookies, escrituras, solicitudes externas o cambios de almacenamiento |
| Errores | Cero errores de consola y `404` real para activo inexistente |

## Estado de Coolify

La imagen se validó en el runtime Docker de Sinopé, pero el contenedor todavía no pertenece
al plano de control de Coolify. La API instalada exige una credencial con alcance raíz para
crear el recurso. No se generó esa credencial ni se modificó la base de Coolify sin una
autorización separada.

El siguiente gate debe escoger entre:

1. registrar el recurso mediante la interfaz de Coolify;
2. autorizar un token raíz temporal, usarlo solo para crear/verificar el recurso y revocarlo;
3. mantener temporalmente el staging privado fuera del plano de control;
4. retirar el staging.

En todos los casos, `push`, GHCR, DNS y producción siguen fuera de alcance hasta una decisión
posterior explícita.

La decisión recibida fue registrar el recurso mediante la interfaz de Coolify, sin emitir un
token nuevo. El Compose validado para esa operación vive en
`deploy/coolify/sinope-staging.compose.yaml`; usa un segundo puerto loopback para permitir una
verificación azul-verde antes de retirar la réplica manual.
