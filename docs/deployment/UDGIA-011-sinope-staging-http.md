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

El recurso quedó incorporado al plano de control de Coolify:

| Elemento | Estado |
|---|---|
| Proyecto | `UDGIA - staging` |
| Entorno | `staging` |
| Servicio | `aprendizaje-ia-staging` |
| UUID del servicio | `eqapv8jxiegjw26sdafa9uns` |
| Contenedor | `aprendizaje-ia-eqapv8jxiegjw26sdafa9uns` |
| Puerto | `127.0.0.1:8185 → 8080` |
| Imagen efectiva | `sha256:20bbb8c3caaa4304a35ccff87cb4d888c1cb115682c6fbfd459723f435aeabda` |
| Estado inicial | `running / healthy` |

La primera solicitud de despliegue no alcanzó Docker porque el listener de `sshd` de Sinopé,
activo desde antes de una actualización, cerraba la negociación con
`hostkeys confused (config 4 recvd 3)`. Con autorización separada se ejecutó `sshd -t`, se
reinició únicamente `sshd` y se comprobó una conexión nueva. El PID principal cambió de
`856` a `2980913`; la unidad quedó `active/running`.

Coolify volvió a autenticar correctamente contra el host. Se creó un token raíz temporal
dentro del propio contenedor de Coolify, se encoló **un solo** arranque del servicio y el
token se revocó al terminar. La sonda completa se repitió contra `8185` mediante túnel SSH y
dio nuevamente **PASS sin advertencias**, con los mismos 681 archivos y 9,943,325 bytes.

## Conmutación y observación

El contenedor manual `udgia-aprendizaje-ia-staging` se detuvo limpiamente con código `0`,
pero no se eliminó; conserva la imagen aprobada y puede restablecerse como reversión. El
servicio gestionado por Coolify quedó como única réplica activa.

La observación de 24 horas comenzó el `2026-07-29 12:39:53 CST` mediante la unidad transitoria
de usuario `udgia-011-observe-24h.service`. Registra cada cinco minutos, sin efectuar
escrituras sobre el servicio:

- estado y salud del contenedor;
- contador de reinicios;
- HTTP de `/healthz`, la raíz del sitio y el manifest del runtime H5P.

La primera muestra fue `running`, `healthy`, cero reinicios y `200` en los tres endpoints.
El registro privado vive en
`/home/sinope/.local/state/udgia-011/observation-20260729.jsonl`. La promoción, el `push`,
GHCR, DNS y producción continúan bloqueados hasta una compuerta posterior explícita.
