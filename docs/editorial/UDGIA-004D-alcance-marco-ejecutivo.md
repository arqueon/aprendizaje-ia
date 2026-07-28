# Alcance del marco ejecutivo para decisiones institucionales sobre IA

**Ecosistema IA-docencia UDGPlus · UDGIA-004D**

**Estado:** primera versión local para revisión

**Fecha:** 2026-07-28

## 1. Decisión de audiencia y función

UDGIA-004D atiende a quienes deben conducir decisiones que rebasan un programa o una unidad
académica:

- coordinaciones y direcciones generales;
- rectorías de centro;
- vicerrectorías;
- Rectoría General y órganos colegiados, según sus atribuciones.

La pieza no asigna facultades ni propone un organigrama. Ofrece un marco ejecutivo para
convertir iniciativas dispersas en decisiones institucionales explícitas, revisables y
trazables.

## 2. Relación con UDGIA-004C

UDGIA-004C ayuda a jefaturas, academias, programas y equipos del SEMS a organizar un piloto
docente. UDGIA-004D responde a otra pregunta: ¿qué condiciones comunes debe resolver la
institución para que esos esfuerzos puedan sostenerse sin trasladar todo el costo y el riesgo
a cada equipo académico?

Por ello, 004D:

- no repite el ciclo delimitar–diagnosticar–acordar–acompañar–pilotar–revisar;
- no convierte la ruta operativa en una página más larga;
- no presenta una lista de herramientas recomendadas;
- no simula una política institucional vigente;
- no resuelve decisiones normativas cuya atribución deba confirmarse.

## 3. Arquitectura de la primera entrega

La página pública presenta seis decisiones:

1. propósito y alcance institucional;
2. distribución de decisiones y responsabilidades;
3. capacidades humanas, acceso y acompañamiento;
4. datos, tecnologías, infraestructura y reversibilidad;
5. portafolio, recursos y criterios de prioridad;
6. evidencia, revisión y decisión de continuidad.

Las decisiones convergen en un producto breve: un mandato institucional revisable. Ese
mandato define propósito, alcance, responsables, salvaguardas, iniciativas prioritarias,
recursos, evidencia y fecha de revisión. No equivale a un reglamento ni a un plan de compras.

## 4. Precedencia editorial

1. Las Orientaciones aportan los principios de formación antes que regulación,
   responsabilidad distribuida, equidad, autonomía institucional y revisión periódica.
2. El contrato UDGIA-004A fija vocabulario, metadatos y relaciones.
3. La constelación UDGIA-004B aporta los nodos pedagógicos públicos.
4. La ruta UDGIA-004C muestra cómo un equipo académico convierte los criterios en pilotos y
   acuerdos de programa.
5. UDGIA-004D usa esos antecedentes como insumos, pero no declara aprobado el WIP de
   Orientaciones ni modifica su checkout.

## 5. Límites de esta subfase

- `aprendizaje-ia`: rama local `codex/UDGIA-004D-marco-ejecutivo`.
- `IAorientaciones`: solo lectura; el lote previo permanece intacto.
- Moodle de referencia: solo lectura; no se crean actividades ni se alteran cursos.
- `alfabetizacion_en_ia`: sin cambios; sigue siendo un esbozo derivado.
- No hay integración, push, despliegue ni atribución de aprobación institucional.

## 6. Evidencia y lenguaje

La página evita cifras o diagnósticos institucionales no verificados. Distingue:

- decisiones que puede enmarcar una alta dirección;
- información que debe producir un diagnóstico;
- responsabilidades que corresponden a programas y docentes;
- cuestiones que requieren dictamen jurídico, técnico, presupuestal o de protección de
  datos.

La pieza se presenta como marco de trabajo adaptable. No usa el tono de una disposición
vigente ni convierte escenarios en hechos.

## 7. Diseño y accesibilidad

La portada editorial Almagre representa una mesa de decisión colegiada y una red de unidades
académicas sin logos, texto incrustado, robots ni símbolos de autoridad única. Se generó con
la herramienta integrada `imagegen`, se corrigió para retirar una cúpula central y se
normalizó a 1600 × 900 px.

La revisión del 2026-07-28 contextualizó a las cuatro personas en una universidad pública
del Bajío y el centro-occidente mexicano. El criterio no es crear un fenotipo uniforme, sino
mostrar una diversidad regional contemporánea y plausible mediante rasgos, tonos de piel y
cabello. La contextualización no usa vestuario tradicional, banderas, arquitectura colonial,
artesanías, paisaje, pobreza ni otros atajos folklorizantes o turísticos.

El mapa de seis decisiones es un SVG determinista con `title` y `desc`. La página incluye
inmediatamente una lista textual equivalente; ninguna decisión depende del gráfico.

Las dos matrices ejecutivas usan títulos visibles, encabezados de columna y encabezados
semánticos de fila. Las celdas expresan decisiones mediante oraciones completas, y su
tratamiento visual conserva el reflow: la tabla de tres columnas se desplaza dentro de una
región enfocable con teclado en pantallas estrechas, sin ensanchar la página.

Contenido visual: UDGPlus, CC BY-SA 4.0.

## 8. Puerta de revisión

Antes de integrar o publicar deben revisarse:

- si las seis decisiones corresponden al nivel ejecutivo y no invaden atribuciones;
- si el mandato revisable es suficientemente concreto y breve;
- si la relación con la ruta operativa resulta clara sin duplicarla;
- si el lenguaje evita presentarse como política aprobada;
- si la página funciona en escritorio y móvil, sin desbordamiento;
- si gráfico, enlaces y portada pasan las pruebas de accesibilidad;
- si no hay solicitudes externas, cookies, almacenamiento o errores de consola.

La integración y publicación requieren un VoBo posterior y explícito.

## 9. Resultado de la primera QA local

`npm run qa:decision-institucional-route` terminó en `PASS`:

| Comprobación | Resultado |
|---|---|
| Build Hugo | 925 páginas |
| Estructura | 15 secciones de segundo nivel, 4 tarjetas, 2 tablas ejecutivas y cero H5P |
| Portada | 1024 × 576 px en escritorio y 327 × 184 px en móvil; proporción 16:9 |
| Mapa ejecutivo | 505 × 303 px en escritorio y 327 × 196 px en móvil |
| Reflow | 1440 y 375 px sin desbordamiento horizontal |
| Enlaces internos | todos respondieron HTTP 200 en la copia compilada |
| Axe | cero violaciones serias o críticas |
| Privacidad y estabilidad | cero solicitudes externas, escrituras, cookies, almacenamiento o errores de consola |

La regresión `npm run qa:coordinacion-route` también terminó en `PASS`. La verificación
reproducible del runtime y de los seis paquetes H5P no detectó cambios. Permanecen los avisos
conocidos sobre la diferencia de versiones Hugo/Blowfish y APIs deprecadas; UDGIA-004D no los
introduce.
