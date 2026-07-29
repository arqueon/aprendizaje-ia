---
title: "Adaptador de laboratorio · Sinopé y Coolify"
date: 2026-07-28
tags:
  - ia-udgplus
  - despliegue
  - adaptador
  - coolify
  - staging
---

# Adaptador de laboratorio: Sinopé y Coolify

## Alcance

Este documento traduce el
[runbook institucional](../replicacion-institucional-udgmx.md) al laboratorio Sinopé.
No convierte Sinopé en infraestructura oficial, no autoriza una publicación y no contiene
hostnames, direcciones, puertos públicos, credenciales ni valores de secretos.

El adaptador puede retirarse sin alterar el artefacto Hugo, la imagen OCI ni el contrato para
un eventual dominio bajo `udg.mx`.

## Dictamen de uso

Sinopé es apropiado para **staging privado y ensayo de réplica**, con estas condiciones:

- la imagen se construye y verifica en CI; no en Sinopé;
- Coolify solo descarga y ejecuta el digest aprobado;
- el sitio no usa bind mounts, volúmenes ni datos persistentes;
- la exposición inicial queda restringida al mecanismo privado aprobado;
- GitHub Pages continúa como publicación vigente y vía de recuperación;
- no se promueve a producción institucional mientras no se cierren capacidad, proxy/TLS,
  respaldo del control plane y monitoreo.

Una auditoría de solo lectura del 28 de julio de 2026 observó capacidad de almacenamiento
suficiente, pero presión alta de CPU, E/S y swap por cargas vecinas. El contenedor estático
es liviano; el riesgo es la contención del host. Por ello, ni Hugo, ni Node, ni el escaneo de
imagen ni la generación de SBOM deben ejecutarse ahí.

## Mapeo del contrato

| Contrato institucional | Adaptación en Sinopé |
|---|---|
| Build externo | Workflow CI produce sitio, imagen, SBOM y procedencia |
| Imagen inmutable | Recurso Coolify basado en imagen preconstruida y referencia por digest |
| URL raíz | Hostname de staging dedicado; sin `strip-prefix` |
| TLS/WAF | Terminan en el borde existente, no dentro del contenedor |
| Origen | Puerto local dedicado, no publicado directamente a Internet |
| Servidor estático | Nginx u otro servidor mínimo incluido en la imagen |
| Salud | `/healthz` en la imagen y healthcheck habilitado |
| Persistencia | Ningún volumen o bind mount |
| Rollback | Redeploy del digest anterior exacto |
| Evidencia | Sonda desde fuera del contenedor y expediente en CI |
| Respaldo | Configuración de Coolify y del borde, no el contenido estático |

Coolify admite imágenes preconstruidas y advierte que la construcción de imágenes puede ser
intensiva en recursos
([Coolify Applications](https://coolify.io/docs/applications/index)).
Sus healthchecks permiten retirar de enrutamiento una instancia no saludable
([Coolify Health Checks](https://coolify.io/docs/knowledge-base/health-checks)).

## Topología del ensayo

```text
Repositorio
   |
   v
CI: build + puertas + SBOM + procedencia
   |
   v
Registro OCI: imagen@sha256
   |
   v
Coolify: pull y run, sin build ni volúmenes
   |
   v
Origen local dedicado
   |
   v
Borde privado o staging aprobado: TLS + WAF + hostname
```

No se debe habilitar un proxy adicional en puertos compartidos del host sin un diseño
independiente. El laboratorio ya tiene más de un plano de entrada; agregar otro durante esta
réplica aumentaría el riesgo de colisión y de rutas que eludan las políticas.

## Configuración del recurso

### Imagen

- Usar `registro/ruta@sha256:<digest-aprobado>`.
- Prohibir `latest` en staging de aceptación.
- Verificar que el digest descargado coincide con el expediente.
- Conservar localmente el activo y dos anteriores hasta validar la retención del registro.
- Ejecutar con usuario sin privilegios y filesystem de solo lectura cuando la imagen lo permita.

Docker documenta la ejecución de una imagen por su identificador de contenido
([Docker: image digests](https://docs.docker.com/engine/containers/run/#image-digests));
el digest, no el tag, es la identidad usada para promoción y rollback.

### Runtime

- Sin build pack, clonación Git ni comandos de instalación.
- Sin volúmenes, bind mounts, base de datos, variables de aplicación o secretos de contenido.
- Puerto interno único y publicación solo hacia la interfaz local o red del borde.
- Límites conservadores de CPU y memoria.
- Política de reinicio y logging con rotación.
- `/healthz` devuelve 200 únicamente cuando el árbol estático y el archivo de release existen.
- El healthcheck de la imagen prevalece y se prueba antes de habilitar enrutamiento.

### Servidor estático

La configuración genérica existente en otros servicios no debe copiarse si contiene fallback
de SPA. Para esta imagen:

```nginx
location = /healthz {
    access_log off;
    default_type text/plain;
    return 200 "ok\n";
}

location / {
    try_files $uri $uri/ =404;
}
```

Las reglas completas de H5P, MIME, caché, CSP, `nosniff`, `Referrer-Policy` y Range se
mantienen en [servidor-web-udgplus.md](../servidor-web-udgplus.md).

## Secuencia de staging

1. Confirmar que el host no está en presión sostenida y que existe capacidad para iniciar
   una réplica.
2. Registrar digest candidato y anterior.
3. Crear el recurso a partir de la imagen preconstruida, sin montajes.
4. Aplicar healthcheck, límites, restart y rotación de logs.
5. Conectar solo al borde privado aprobado.
6. Ejecutar:

   ```bash
   DEPLOYMENT_REPORT="evidence/sinope-staging.json" \
     npm run qa:h5p:deployment -- "https://<fqdn-staging-aprobado>/"
   ```

7. Observar durante un periodo que incluya una carga alta de los servicios vecinos.
8. Probar el digest anterior y confirmar `PASS`.
9. Restaurar el candidato únicamente si la prueba de rollback fue satisfactoria.

Un servidor local que responde no supera por sí solo esta puerta: la sonda debe atravesar el
mismo borde, TLS, CSP, WAF y caché previstos para el ensayo.

## Promoción dentro del laboratorio

La única promoción admitida por este adaptador es de candidato a staging compartible:

- mismo digest que pasó staging privado;
- puerta editorial cerrada;
- acceso limitado según la audiencia aprobada;
- monitoreo externo y alertas operativas;
- rollback ensayado;
- sin cambio del sitio público vigente.

La creación o modificación de DNS institucional queda fuera de este adaptador.

## Rollback

1. Detener la promoción de tráfico.
2. Seleccionar el digest previo exacto; no reconstruir.
3. Verificar salud local.
4. Reabrir el borde al digest anterior.
5. Repetir la sonda y archivar `PASS`.
6. Si el host completo falla, conservar o restaurar el tráfico hacia la publicación vigente
   externa a Sinopé.

## Monitoreo

- Sonda externa de portada y H5P.
- Certificado y vencimiento en el borde.
- Salud y reinicios del contenedor.
- CPU, memoria, disco, swap y PSI del host.
- Errores 4xx/5xx y eventos WAF.
- Digest activo.

El ensayo debe tener una alerta real con receptor y prueba de entrega. Sentinel o un tablero
local complementan, pero no sustituyen, una sonda externa.

## Respaldo y actualización de Coolify

Antes de considerar un uso continuo:

- programar respaldo externo de la base de Coolify;
- guardar por un canal seguro las claves necesarias para restaurar su control plane;
- incluir configuración del borde y monitoreo;
- ejecutar una restauración de prueba;
- revisar y actualizar Coolify en una ventana separada, con respaldo y rollback propios.

La documentación de Coolify distingue el respaldo de su instancia del respaldo de datos de
aplicaciones
([Coolify Backup and Restore](https://coolify.io/docs/knowledge-base/how-to/backup-restore-coolify)).
En este sitio no hay datos de aplicación: el contenido se recupera desde el digest.

## Criterios de salida del laboratorio

El adaptador puede entregarse a infraestructura institucional cuando existan:

- tres despliegues consecutivos por digest con `PASS`;
- un rollback probado;
- observación satisfactoria durante carga alta del host;
- respaldo y restauración comprobados del control plane;
- expediente completo de imagen, SBOM, procedencia, H5P y accesibilidad;
- lista explícita de diferencias entre Sinopé y la plataforma institucional.

La plataforma institucional debe volver a ejecutar el
[runbook completo](../replicacion-institucional-udgmx.md). Haber pasado en Sinopé no
autoriza ni garantiza el entorno oficial.
