# UDGIA-017 — manifiesto y QA del ecosistema

## Propósito

`udgia-ecosystem.json` fija una versión local coherente de los tres repositorios que
componen el corte editorial:

- **Autoridad:** `IAorientaciones`.
- **Distribución:** `aprendizaje-ia`.
- **Fuente del curso:** `alfabetizacion_en_ia`.

El manifiesto distingue las revisiones actuales de los checkouts de las revisiones
históricas que dan procedencia a figuras y paquetes ya integrados.

## Ejecución

Desde `aprendizaje-ia`:

```sh
npm run qa:ecosistema
```

El runner verifica primero la rama y el `HEAD` exactos de las orientaciones y el curso.
Para Hugo, que contiene el propio manifiesto, `revision: "SELF"` resuelve al `HEAD` del
checkout portador y la evidencia conserva ese SHA real. Esta excepción evita una
autorreferencia imposible: un commit no puede declarar dentro de sí su propio SHA. `SELF`
se acepta una sola vez y únicamente cuando la raíz resuelta es la del manifiesto y el
runner. Después se ejecutan las pruebas canónicas de estructura, bibliografía, PDF,
figuras, inventario, runtime H5P, rutas y paquete del curso. No se hacen commits,
escrituras remotas, publicación ni cambios en Moodle.

Los árboles de trabajo pueden contener cambios: el contrato `report-only` los registra
en la evidencia, pero no los confunde con una divergencia de versión. Una rama o revisión
fija distinta sí bloquea las pruebas del repositorio afectado; para el portador, una raíz
que no sea la del manifiesto bloquea la resolución de `SELF`.

La evidencia legible por máquina queda en:

```text
docs/design/evidence/udgia-017/qa-ecosystem.json
```

## Rutas alternativas

Cada checkout puede reubicarse sin modificar el manifiesto:

```sh
UDGIA_ORIENTACIONES_ROOT=/ruta/orientaciones \
UDGIA_HUGO_ROOT=/ruta/aprendizaje-ia \
UDGIA_CURSO_ROOT=/ruta/alfabetizacion_en_ia \
npm run qa:ecosistema
```

El manifiesto completo también puede sustituirse con
`UDGIA_ECOSYSTEM_MANIFEST=/ruta/manifiesto.json`.
