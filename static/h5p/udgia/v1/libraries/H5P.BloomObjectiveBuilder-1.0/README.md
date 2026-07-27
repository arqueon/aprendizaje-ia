# H5P.BloomObjectiveBuilder

Tipo de contenido H5P personalizado para construir objetivos de aprendizaje observables mediante la taxonomía de Bloom revisada. La biblioteca es autocontenida: no necesita servicios externos ni otras bibliotecas H5P distintas del núcleo.

## Identidad y compatibilidad

- **Machine name:** `H5P.BloomObjectiveBuilder`
- **Versión actual:** `1.0.2`
- **Paquete distribuible:** `curso-fuente/bloom_objective_builder.h5p`
- **Biblioteca incluida:** `H5P.BloomObjectiveBuilder-1.0/`
- **Licencia del código:** MIT
- **Idioma de esta distribución:** español
- **Entorno verificado:** Moodle 5.2 con la actividad H5P del núcleo y H5P Core API 1.24 o posterior

Es una biblioteca personalizada, no una variante de `Documentation Tool`. Un sitio receptor debe instalarla una vez con permisos administrativos. Después, cualquier docente autorizado puede reutilizar el paquete en distintos cursos del mismo sitio.

## Qué ofrece

- Los seis niveles del dominio cognitivo de Bloom revisado.
- Banco de 48 verbos observables, más entrada de verbo libre.
- Estructura audiencia–desempeño–condición–grado o criterio.
- Campo separado para la evidencia de aprendizaje alineada.
- Vista previa automática y cuatro comprobaciones de calidad.
- Copia al portapapeles y lista personal de objetivos guardados.
- Persistencia mediante `getCurrentState()` cuando el sitio tiene habilitado el guardado de estado H5P.
- Navegación por teclado, estados `aria-pressed`, regiones `aria-live`, foco visible y diseño adaptable.

Los verbos son orientaciones, no correspondencias rígidas: el nivel cognitivo depende también de la tarea, el contexto y la evidencia.

## Archivos fuente

| Archivo | Responsabilidad |
|---|---|
| `bloom-objective-builder.js` | Interacción, estado, validación y composición del objetivo |
| `bloom-objective-builder.css` | Presentación responsive y paleta visual |
| `../gen_bloom_builder.py` | Generación de `h5p.json`, `library.json`, `semantics.json` y el paquete `.h5p` |
| `../../scripts/h5p_validate_install.php` | Validación e instalación administrativa reutilizable |
| `../../scripts/49_deploy_bloom_builder.php` | Despliegue específico de la actividad demo con CMID 60 |

## Generar el paquete

Requisitos locales: Python 3 y `zip`/`unzip` para las comprobaciones opcionales.

```bash
cd /ruta/taller-vivo
node --check tools/bloom_builder/bloom-objective-builder.js
python3 tools/gen_bloom_builder.py
unzip -t curso-fuente/bloom_objective_builder.h5p
```

El generador crea el paquete en `curso-fuente/`. Antes de publicar una modificación de JavaScript, CSS o semántica, incrementa `patchVersion` en `tools/gen_bloom_builder.py`. H5P no actualiza correctamente una biblioteca si se reemplazan archivos sin aumentar su versión.

## Reutilizarlo en este Moodle

La biblioteca ya está instalada en `moodle-dev` como `H5P.BloomObjectiveBuilder 1.0.2`. Para otro curso:

1. Activa edición y selecciona **Añadir una actividad o recurso → H5P**.
2. Carga `bloom_objective_builder.h5p` como archivo de paquete.
3. Define el nombre de la actividad y guarda.
4. Si el editor muestra los parámetros del tipo de contenido, personaliza título, introducción y audiencia predeterminada.
5. Abre la actividad como estudiante y verifica selección, escritura, copia y guardado de objetivos.

También puede crearse con la utilidad del stack:

```bash
./tool cli/h5p_upload.php \
  --course=SHORTNAME \
  --section=2 \
  --title='Constructor de objetivos de aprendizaje' \
  --file=/var/www/html/tools/scratch/bloom_objective_builder.h5p
```

## Instalarlo en otra instancia Moodle

La instalación de una biblioteca H5P nueva requiere privilegios administrativos. No basta con copiar registros de base de datos.

1. Haz un respaldo del sitio y confirma que es un entorno autorizado.
2. Copia `bloom_objective_builder.h5p` y `h5p_validate_install.php` a un directorio ejecutable del árbol Moodle. El script presupone que vive en `tools/scratch/`; ajusta la ruta de `config.php` si se ubica en otro lugar.
3. Ejecuta el validador dentro del entorno PHP de Moodle:

```bash
php tools/scratch/h5p_validate_install.php \
  --file=/ruta/absoluta/bloom_objective_builder.h5p \
  --userid=2
```

En este stack Docker:

```bash
./tool scratch/h5p_validate_install.php \
  --file=/var/www/html/tools/scratch/bloom_objective_builder.h5p
```

El resultado esperado es `VALID_PACKAGE`. Sin bandera, el proceso permite instalar una biblioteca ausente. Para actualizar una biblioteca que ya existe, ejecuta una segunda vez con `--only-update=1`; Moodle trata instalación y actualización como modos distintos. El script no crea actividades.

4. Purga las cachés de Moodle.
5. Crea la actividad H5P desde la interfaz o mediante una herramienta soportada por el sitio.
6. Comprueba que `H5P.BloomObjectiveBuilder` aparece como biblioteca ejecutable y que el paquete se procesa sin errores.

No se garantiza la instalación directa en H5P.com u otros servicios administrados que prohíban bibliotecas personalizadas. En esos casos, el proveedor debe aprobar e instalar el tipo de contenido.

## Parámetros editables

`semantics.json` expone tres propiedades:

| Propiedad | Uso |
|---|---|
| `title` | Encabezado principal del constructor |
| `intro` | Instrucción breve situada bajo el título |
| `defaultAudience` | Texto inicial editable del componente «Audiencia» |

Para una variante institucional, modifica estos valores en `content` dentro de `gen_bloom_builder.py`; evita duplicar la biblioteca solo para cambiar textos.

## Actualizar actividades existentes

1. Descarga o extrae el `.h5p` vigente y registra su SHA-256.
2. Incrementa `patchVersion`, regenera y valida el paquete nuevo.
3. Instala primero la nueva revisión de biblioteca con `h5p_validate_install.php --only-update=1`.
4. Reemplaza el paquete desde **Editar ajustes** o con una utilidad local que conserve el CMID.
5. Invalida el contenido H5P desplegado, reconstruye la caché del curso y purga cachés globales.
6. Abre dos veces la actividad: la primera despliega el paquete y la segunda confirma el registro cacheado.

El script `49_deploy_bloom_builder.php` implementa este flujo únicamente para `TALLER-IA-DEMO`, CMID 60. No debe usarse sin adaptar sus comprobaciones de curso, CMID y SHA-256.

## Estado y datos del usuario

El estado contiene el nivel, verbo, campos del formulario y objetivos guardados. No almacena datos en servicios externos. La persistencia depende de la configuración de estado H5P del sitio y del acceso autenticado.

Mantén compatibles las claves de `this.state` en actualizaciones de parche. Si una versión futura cambia el esquema, añade una migración desde `extras.previousState` y pruébala antes de reemplazar paquetes con usuarios activos.

## Personalización técnica

- Niveles y verbos: constante `LEVELS` del JavaScript.
- Verbos ambiguos: constante `VAGUE`.
- Reglas de calidad: método `checks()`.
- Composición textual: método `objectiveText()`.
- Colores y responsive: archivo CSS; las reglas están encapsuladas bajo `.h5p-bloom-objective-builder`.
- Parámetros del editor: `semantics` en el generador y valores equivalentes en `content`.

Tras cualquier cambio ejecuta al menos:

```bash
node --check tools/bloom_builder/bloom-objective-builder.js
python3 -m py_compile tools/gen_bloom_builder.py
python3 tools/gen_bloom_builder.py
unzip -t curso-fuente/bloom_objective_builder.h5p
```

Después valida con el motor H5P de la instancia destino. Un ZIP válido no garantiza que el manifiesto o la biblioteca sean aceptados por H5P.

## Lista de verificación funcional

- Los seis niveles responden con ratón y teclado.
- Cada nivel muestra ocho verbos y solo uno queda seleccionado.
- Un verbo ambiguo no supera la revisión.
- Audiencia, nivel/verbo y desempeño son necesarios para guardar o copiar.
- Condición y criterio elevan el resultado a 4/4.
- La vista previa no introduce HTML proporcionado por el usuario.
- Copiar funciona dentro del iframe o usa el mecanismo alternativo.
- Añadir y eliminar objetivos actualiza el estado.
- El diseño funciona a 320 px y en escritorio.
- La consola del navegador no contiene errores.

## Recuperación

Si una actualización falla:

1. Restaura el paquete `.h5p` respaldado en la misma actividad.
2. Elimina el registro desplegado correspondiente al `pathnamehash` para forzar reprocesamiento.
3. Reconstruye la caché del curso y purga cachés.
4. Abre la actividad y confirma que Moodle vuelve a crear su registro H5P.

No reduzcas la versión instalada de una biblioteca compartida sin comprobar antes qué otras actividades la utilizan.

## Fuentes pedagógicas

- University of Waterloo, *Bloom's Taxonomy Learning Activities and Assessments*.
- University of Illinois Chicago, *Bloom's Taxonomy of Educational Objectives* y *Backward Design*.

Las referencias aparecen enlazadas dentro del artefacto. La lista española de verbos es una adaptación pedagógica y debe revisarse según disciplina, nivel educativo y evidencia esperada.
