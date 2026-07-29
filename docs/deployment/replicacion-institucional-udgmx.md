---
title: "Runbook de réplica y promoción institucional bajo udg.mx"
date: 2026-07-28
tags:
  - ia-udgplus
  - despliegue
  - infraestructura
  - h5p
  - udg-mx
---

# Runbook de réplica y promoción institucional bajo `udg.mx`

## Propósito y alcance

Este runbook convierte el
[contrato técnico del sitio](servidor-web-udgplus.md) en un procedimiento transferible
a infraestructura institucional. Define qué debe entregar cada área, qué evidencia autoriza
una promoción y cómo regresar a una versión conocida sin reconstruirla.

Es deliberadamente neutral respecto del proveedor. Puede aplicarse a un servicio de
contenedores, una máquina virtual, Nginx o Apache, almacenamiento de objetos con CDN u otra
plataforma, siempre que preserve las propiedades del contrato.

El sitio se opera como:

- un artefacto estático, sin PHP, base de datos, cuentas, sesiones ni procesos Node/Hugo en
  producción;
- una imagen OCI inmutable identificada por digest, o una release de archivos con propiedades
  equivalentes;
- una réplica sin volúmenes de aplicación ni datos de usuario;
- una publicación en la que página, fuentes, medios y runtime H5P permanecen en el mismo origen.

Este documento no concede un dominio, no modifica DNS y no contiene hostnames internos,
direcciones privadas, credenciales ni nombres de secretos.

## Decisiones que deben quedar cerradas antes de implementar

| Decisión | Resultado que debe registrarse |
|---|---|
| Propietario institucional | Área que acepta el servicio y puede ordenar promoción o rollback |
| Nombre público | FQDN aprobado bajo `udg.mx`, escrito con `/` final en la URL base |
| Nombre de staging | FQDN distinto al público, con la misma topología y políticas |
| Plataforma | Adaptador elegido y responsable de su plano de control |
| Registro OCI | Repositorio, retención, identidad de lectura y responsable |
| Frontera TLS/WAF | Punto exacto de terminación TLS y aplicación de cabeceras/reglas |
| Preproducción fiel | Mecanismo controlado para probar el FQDN público contra el origen candidato sin cambiar todavía el DNS público |
| Disponibilidad | SLO, ventana de mantenimiento y umbrales de rollback acordados |
| Retención | Mínimo dos releases previas aprobadas durante al menos 30 días |
| Evidencia | Ubicación institucional del expediente de cada release |

### Recomendación de URL

Se recomienda un **hostname raíz dedicado**, por ejemplo
`https://<servicio-aprobado>.udg.mx/`, y otro equivalente para staging.
Una subruta como `https://<portal>.udg.mx/<ruta>/` sigue siendo compatible, pero agrega
dependencias de `baseURL`, reescrituras, prefijos del proxy, CSP y pruebas de enlaces.

El hostname raíz:

- reduce la posibilidad de eliminar o duplicar prefijos;
- permite evolucionar CSP, caché y WAF sin afectar otras aplicaciones del mismo host;
- simplifica el rollback de tráfico;
- conserva el mismo origen para Hugo y H5P.

No se debe asumir el nombre del subdominio: su alta corresponde a la autoridad institucional
de DNS.

## Roles

| Rol | Responsabilidad principal |
|---|---|
| Propietario académico (PA) | Alcance público, oportunidad, aceptación y retiro |
| Responsable editorial/H5P (EH) | Licencias, procedencia, autorización y fallback |
| Mantenimiento del producto (MP) | Código, dependencias, build, imagen, SBOM y procedencia |
| Infraestructura institucional (II) | DNS, TLS, WAF/CDN, runtime, secretos y capacidad |
| Seguridad y privacidad (SP) | Modelo de amenaza, reglas de borde, logs y revisión de datos |
| Accesibilidad y QA (AQ) | Verificación automática, manual y evidencia de aceptación |
| Operaciones (OP) | Monitoreo, guardia, respaldo del control plane y recuperación |

## RACI

`R` ejecuta, `A` responde por la decisión, `C` es consultado e `I` queda informado.

| Actividad | PA | EH | MP | II | SP | AQ | OP |
|---|---:|---:|---:|---:|---:|---:|---:|
| Aprobar alcance y hostname | A | C | I | R | C | I | I |
| Autorizar contenido y licencias H5P | A | R | C | I | C | C | I |
| Producir imagen, SBOM y procedencia | I | C | A/R | C | C | I | I |
| Configurar DNS, TLS, WAF y runtime | I | I | C | A/R | C | I | C |
| Aprobar seguridad y privacidad | I | C | C | R | A/R | C | C |
| Ejecutar accesibilidad y sonda | I | C | C | C | C | A/R | I |
| Autorizar promoción | A | C | R | R | C | C | C |
| Operar y observar | I | I | C | C | C | I | A/R |
| Ordenar rollback | A | I | R | R | C | C | R |
| Probar restauración del control plane | I | I | C | R | C | I | A/R |

## Prerrequisitos institucionales

### Gobierno y acceso

- Existe un ticket o cambio aprobado que identifica responsables, ventana y rollback.
- Las cuentas administrativas usan identidades individuales, MFA y privilegio mínimo.
- Los secretos viven en el gestor institucional; el repositorio solo conserva sus nombres o
  referencias.
- La identidad de producción puede **leer** la imagen aprobada, pero no publicar ni sobrescribir
  imágenes.
- Staging y producción tienen inventario y control de cambios separados.

### DNS y certificados

- II controla la zona y conoce el TTL vigente. Antes de un cambio previsto puede reducirlo con
  anticipación y restaurarlo después; el comportamiento del TTL está definido en
  [RFC 1034](https://www.rfc-editor.org/rfc/rfc1034.html).
- Se revisan CAA y la autoridad certificadora autorizada. CAA permite al titular del dominio
  restringir qué autoridades pueden emitir certificados
  ([RFC 8659](https://www.rfc-editor.org/rfc/rfc8659.html)).
- El certificado cubre exactamente el FQDN, presenta cadena completa y se renueva de forma
  automatizada.
- Se monitorean vencimiento, fallos de renovación y errores de cadena desde fuera de la red
  institucional. TLS se configura según la política vigente de la Universidad; como referencia
  técnica, [NIST SP 800-52 Rev. 2](https://csrc.nist.gov/pubs/sp/800/52/r2/final)
  cubre selección y configuración de TLS.
- El origen no queda expuesto por una ruta alterna que evada TLS o WAF.

### Capacidad y recuperación

- La plataforma acredita capacidad bajo carga ordinaria y durante tareas vecinas intensivas.
- Build, análisis de dependencias y generación de SBOM ocurren fuera del host de producción.
- El runtime cuenta con límites de CPU/memoria, healthcheck y política de reinicio.
- El registro retiene el digest activo y al menos los dos anteriores aprobados.
- Existe respaldo externo del plano de control y una prueba documentada de restauración.

## Contrato de borde: DNS, TLS, WAF y HTTP

El WAF/CDN/proxy no debe alterar silenciosamente el artefacto. Las reglas se validan primero en
staging y, cuando la plataforma lo permita, en modo de observación antes de bloquear. Un conjunto
genérico como [OWASP Core Rule Set](https://owasp.org/www-project-modsecurity-core-rule-set/)
es un punto de partida, no evidencia de compatibilidad por sí mismo.

| Área | Requisito de aceptación |
|---|---|
| DNS | El FQDN resuelve solo hacia el borde aprobado; se registran TTL y respuesta autoritativa |
| TLS | Certificado válido, hostname correcto, cadena completa, renovación y alerta verificadas |
| Métodos | El sitio funciona con `GET` y `HEAD`; métodos de escritura no llegan al origen |
| Rutas | Un activo inexistente devuelve 404 real; nunca `index.html` con estado 200 |
| Redirecciones | Permanecen en el FQDN y prefijo aprobados, sin ciclos |
| Query string | Se conserva completa, en especial en `embed.html` |
| MIME | Se cumplen los tipos del contrato y se envía `nosniff` |
| Range | Un medio de prueba responde `206 Partial Content` y `Content-Range` coherente |
| Compresión | gzip o Brotli para texto; no transforma los bytes descomprimidos |
| Iframe | No se bloquea el embed mismo-origen con `DENY` o `frame-ancestors 'none'` |
| CSP | Restringe recursos al origen aprobado y conserva la carga funcional de H5P |
| Caché | Recursos versionados inmutables; HTML, índices y contenido revalidables |
| Cookies | La ruta pública no crea cookies de aplicación |

`Content-Type` y las solicitudes por rango se rigen por
[RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html); la caché HTTP, por
[RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html). `immutable` significa que la
representación no cambiará durante su frescura
([RFC 8246](https://www.rfc-editor.org/rfc/rfc8246.html)); si cambian sus bytes, cambia
también su URL versionada.

### CSP y WAF

1. Inventariar los recursos que realmente carga el navegador en la sonda.
2. Aplicar una política candidata en staging. Si se usa `Content-Security-Policy-Report-Only`,
   revisar los reportes sin incluir URL completas o datos innecesarios.
3. Confirmar que una política de cabecera no contradice la CSP del embed: varias políticas se
   aplican conjuntamente, no se reemplazan.
4. Ejecutar la prueba funcional y el fallback con teclado, impresión y dos montajes.
5. Pasar la política a modo obligatorio solo después de obtener `PASS`.
6. Afinar el WAF con los mismos recorridos; conservar excepciones concretas y justificadas,
   nunca desactivar globalmente.

La entrega por cabecera, el modo report-only y la composición de políticas se especifican en
[Content Security Policy Level 3](https://www.w3.org/TR/CSP/).

## Cadena de suministro y artefacto

### Identidad de release

Cada release debe relacionar de forma inequívoca:

```text
commit aprobado
  -> build verificable
  -> imagen OCI
  -> digest sha256
  -> SBOM
  -> declaración de procedencia
  -> evidencias de staging
  -> decisión de promoción
```

Un tag es una etiqueta operativa; el despliegue y el rollback usan
`registro/ruta@sha256:<digest>`. Los descriptores OCI identifican contenido mediante digest y
prevén verificar los bytes obtenidos
([OCI Descriptor Spec](https://specs.opencontainers.org/image-spec/descriptor/)).

### Build

1. Partir de un commit revisado y protegido.
2. Instalar dependencias desde lockfile con `npm ci --ignore-scripts`.
3. Ejecutar, como mínimo:

   ```bash
   npm run h5p:verify
   npm run qa:h5p
   npm run qa:h5p:pilot
   npm run qa:coordinacion-route
   npm run qa:decision-institucional-route
   ```

4. Ejecutar la puerta editorial descrita abajo.
5. Compilar con la URL definitiva del destino:

   ```bash
   HUGO_BASEURL="https://<fqdn-aprobado>/" \
     hugo --minify --environment production --destination public
   ```

   Un build exploratorio de staging puede usar su propio FQDN, pero **no es el artefacto
   promovible**. El candidato a producción se compila con el FQDN público y debe probarse
   sin cambiar el DNS público mediante resolución controlada, un origen de preproducción en
   el borde o un mecanismo equivalente que conserve esquema, `Host` y ruta. Así, el mismo
   digest que pasa aceptación puede llegar a producción. Si la plataforma no permite esta
   preproducción fiel, debe tratarse como un riesgo de cambio y usar canario; nunca resolverlo
   con un rebuild después de la aprobación.

6. Construir una imagen mínima que contenga `public/` y la configuración del servidor
   estático. No incluir checkout, `node_modules/`, paquetes fuente `.h5p`, catálogo de
   autoría, herramientas de build ni credenciales.
7. Generar un SBOM en SPDX o un formato interoperable equivalente. SPDX es el estándar
   ISO/IEC 5962:2021 y publica sus versiones vigentes en
   [SPDX Specifications](https://spdx.dev/use/specifications/).
8. Emitir procedencia que vincule fuente, parámetros, plataforma y resultado. SLSA define
   procedencia como información verificable sobre dónde, cuándo y cómo se produjo un artefacto
   ([SLSA Provenance](https://slsa.dev/spec/v1.2/provenance)).
9. Escanear imagen y dependencias; registrar hallazgos, excepciones y fecha de caducidad de
   cada excepción.
10. Publicar imagen, SBOM y procedencia, capturar el digest devuelto y verificarlo desde una
    identidad distinta a la que publicó.

La producción nunca recompila ni vuelve a etiquetar la release promovida.

## Puerta editorial H5P

La aprobación técnica no sustituye la autorización editorial. El pipeline público debe fallar
si cualquier objeto no fixture que vaya a incluirse presenta alguna de estas condiciones:

- `publicationAuthorized` no es explícitamente `true`;
- `licenseStatus` está ausente, pendiente o no aprobado;
- `contentLicense`, `libraryLicense`, autoría, fuente o procedencia están incompletos;
- el SHA-256 del paquete no coincide;
- no existe fallback accesible o su contenido ya no corresponde al objeto;
- se habilita reporte, persistencia, xAPI externo, analítica o solicitudes de terceros sin una
  revisión específica.

La evidencia registra los identificadores aprobados y el hash del catálogo. Una autorización
no se infiere de que un archivo compile ni de que haya aparecido previamente en staging.

## Privacidad y accesibilidad

### Privacidad por defecto

- La réplica pública no persiste respuestas H5P, perfiles, puntuaciones ni identificadores.
- No usa base de datos ni volumen de datos de aplicación.
- No incorpora analítica, píxeles, chat, autenticación o scripts de terceros por defecto.
- Los logs se limitan a lo operativo; se definen campos, acceso, retención y eliminación.
- Query strings y reportes CSP se revisan para no convertirlos en una fuente de datos personales.
- Cualquier cambio que introduzca recolección o correlación de datos vuelve a SP para una revisión
  normativa y técnica antes de desplegarse.

La revisión institucional debe aplicar la legislación y normativa vigente. Para sujetos
obligados, el marco federal actualizado fue publicado en el
[Diario Oficial de la Federación el 20 de marzo de 2025](https://www.dof.gob.mx/nota_detalle.php?codigo=5752569&fecha=20/03/2025).
Este runbook no sustituye el dictamen jurídico ni el aviso de privacidad que, en su caso,
corresponda.

### Accesibilidad

El criterio contractual propuesto es WCAG 2.2 nivel AA, salvo que la política institucional
establezca uno superior. WCAG exige valorar páginas completas y procesos completos, y combina
pruebas automatizadas con evaluación humana
([WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

La revisión de cada release incluye:

- teclado, orden y visibilidad del foco, ausencia de trampas;
- reflow y zoom, contraste, estructura semántica y textos alternativos;
- nombre, función y valor de controles;
- captions/transcripción cuando existan medios;
- movimiento reducido cuando corresponda;
- fallback legible sin JavaScript y salida de impresión;
- cada familia H5P, no solo la portada;
- escritorio y móvil, con lector de pantalla en la muestra acordada.

Un resultado automatizado sin errores no equivale por sí solo a conformidad.

## Staging

Hay dos puertas distintas:

1. **Staging funcional:** usa el FQDN de staging y permite iterar. Su imagen está compilada
   para ese FQDN y no se promueve.
2. **Preproducción fiel:** usa el candidato compilado para el FQDN público. Una resolución
   controlada o función de preview dirige solo a los verificadores hacia el origen candidato,
   conservando esquema, `Host`, ruta, TLS y políticas. No modifica todavía el DNS público.

Para ambas:

1. Registrar commit, digest, SBOM, procedencia, URL base y aprobaciones.
2. Desplegar **por digest**; nunca por un tag mutable.
3. No montar volúmenes ni habilitar persistencia.
4. Aplicar límites, healthcheck y política de reinicio.
5. Configurar TLS, CSP, WAF, caché, MIME y Range como se pretende usar en producción.
6. Ejecutar desde una red que atraviese la topología en evaluación:

   ```bash
   DEPLOYMENT_REPORT="evidence/staging-deployment.json" \
     npm run qa:h5p:deployment -- "https://<fqdn-staging-aprobado>/"
   ```

   En preproducción fiel, el argumento es el FQDN público y el verificador usa el mecanismo
   de resolución controlada documentado.
7. Hacer revisión visual y manual de accesibilidad.
8. Confirmar que no hay solicitudes a terceros, cookies, Service Workers ni escrituras.
9. Provocar de manera controlada la alerta de healthcheck y una alerta externa.
10. Ejecutar un rollback al digest anterior y repetir la sonda. Después, restaurar el candidato
    y repetirla de nuevo.

Solo el digest que pasa preproducción fiel puede solicitar promoción.

## Promoción

1. PA confirma la ventana y el contenido.
2. MP e II comparan el digest solicitado con el aprobado en staging.
3. II valida certificado, DNS, capacidad, monitoreo y digest previo.
4. Se promueve **el mismo digest**, sin rebuild.
5. El tráfico se cambia mediante el mecanismo institucional reversible: origen del CDN,
   balanceador, alias de release o DNS.
6. Se ejecuta de inmediato la sonda pública y la revisión breve de navegador.
7. OP observa durante la ventana acordada latencia, 4xx/5xx, salud del runtime, WAF y
   vencimiento TLS.
8. PA cierra el cambio solo con evidencia `PASS`.

La publicación anterior no se elimina ni se sobrescribe.

## Rollback

Se revierte sin reconstruir cuando:

- la sonda pública falla;
- hay 5xx sostenidos o se rebasa el umbral institucional;
- H5P presenta 404, MIME incorrecto, bloqueo CSP/iframe o pérdida de fallback;
- aparecen solicitudes externas, cookies o persistencia no aprobadas;
- el certificado, DNS o WAF impide acceso válido;
- accesibilidad o contenido muestran una regresión crítica.

Procedimiento:

1. PA u OP declara rollback y registra la hora.
2. II restaura el puntero al digest o release previo exacto.
3. Si el cambio fue de tráfico, restaura el origen anterior; no improvisa una imagen nueva.
4. Purga solo HTML e índices mutables cuando sea necesario. No reemplaza activos marcados
   `immutable`.
5. Ejecuta la sonda pública y confirma `PASS`.
6. Conserva evidencia del fallo y de la recuperación.
7. Abre análisis posterior; la release fallida queda bloqueada hasta una nueva revisión.

## Observabilidad

El monitoreo debe ser independiente del mismo host que sirve el sitio.

| Señal | Comprobación mínima |
|---|---|
| Disponibilidad | Portada, una ruta densa y un embed H5P desde fuera de la red |
| TLS | Validez, hostname, cadena y días hasta vencimiento |
| HTTP | Latencia, 4xx/5xx, redirecciones y 404 real |
| H5P | Manifiesto, carga funcional, MIME y un `Range: bytes=0-1` |
| Runtime | Salud, reinicios, CPU, memoria, disco y presión del host |
| Borde | Eventos WAF/CDN, errores de origen y tasa de caché |
| Release | Digest activo y fecha de promoción |

Las alertas tienen dueño, canal, severidad y prueba de recepción. No se declara operación
lista si solo existe un tablero sin alertamiento.

## Respaldo del plano de control

El contenido público se recupera desde la imagen por digest; no existe una base de datos del
sitio que respaldar. Sí deben respaldarse, fuera de la plataforma:

- configuración y exportación de la zona DNS;
- configuración TLS/ACME, referencias de cuenta y política CAA;
- reglas y excepciones de WAF/CDN;
- manifiestos de despliegue, healthchecks y límites;
- base/configuración del panel o plataforma;
- configuración de monitoreo, alertas y contactos;
- referencias de secretos y procedimiento para regenerarlos, nunca sus valores en Git;
- ledger de releases, digest activo, dos previos, SBOM, procedencia y evidencias.

La restauración se prueba en un entorno aislado. El resultado debe demostrar que se puede
reconstruir el control plane, extraer el digest aprobado y obtener `PASS` sin depender del host
original.

## Expediente de aceptación

| Evidencia | Criterio |
|---|---|
| Revisión de código | Commit aprobado y sin cambios sin registrar |
| Puerta editorial | Lista de objetos, licencias, autorizaciones y hash del catálogo |
| QA previo | Informes de H5P, rutas y navegador con `PASS` |
| Imagen | Referencia OCI por digest, tamaño y fecha |
| SBOM y procedencia | Archivos vinculados al mismo digest y verificables |
| Seguridad | Escaneo, excepciones vigentes, CSP y resultado WAF |
| DNS/TLS | Respuestas, certificado, cadena, CAA y monitoreo |
| HTTP | MIME, caché, 404 real, compresión y `206` |
| Privacidad | Sin terceros, cookies, escrituras, persistencia ni datos no aprobados |
| Accesibilidad | Resultado automatizado y revisión manual firmada |
| Observabilidad | Alertas de aplicación y certificado probadas |
| Rollback | Digest previo y simulacro con `PASS` |
| Decisión | PA, MP, II, AQ y fecha de promoción |

## Checklist de entrega a infraestructura

### Producto entrega

- [ ] URL base solicitada con `/` final.
- [ ] Commit aprobado.
- [ ] Imagen OCI por digest, no solo tag.
- [ ] SBOM, procedencia y escaneo.
- [ ] Catálogo H5P autorizado y su hash.
- [ ] Informes de QA previos.
- [ ] Requisitos de healthcheck y puerto interno.
- [ ] Matriz de caché, MIME, CSP y rutas.
- [ ] Digest anterior probado para rollback.

### Infraestructura confirma

- [ ] FQDN, staging y mecanismo de preproducción fiel aprobados.
- [ ] DNS, TTL, CAA, certificado y renovación.
- [ ] WAF/CDN/proxy sin reescritura SPA ni eliminación de prefijo/query.
- [ ] `Range: 206`, MIME, compresión y 404 real.
- [ ] Runtime sin volúmenes, con límites y healthcheck.
- [ ] Identidad de registro con lectura mínima.
- [ ] Monitoreo externo y alertas.
- [ ] Respaldo y restauración del plano de control.
- [ ] Mecanismo reversible de promoción.

### Aceptación conjunta

- [ ] Preproducción fiel ejecutó el mismo digest que se promoverá.
- [ ] Sonda remota y accesibilidad obtuvieron `PASS`.
- [ ] No hay terceros, cookies ni persistencia no autorizados.
- [ ] Se probó rollback y recuperación.
- [ ] Se archivó el expediente.
- [ ] PA autorizó la promoción.

## Adaptadores

Las particularidades de cada plataforma se documentan fuera de este contrato. El adaptador
de laboratorio actualmente disponible está en
[Sinopé y Coolify](adapters/sinope-coolify.md); no modifica ni rebaja los requisitos
institucionales de este runbook.
