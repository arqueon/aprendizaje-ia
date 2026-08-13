# UDGIA-021 — evaluación del prototipo revisor M6, ronda 1

**Rol:** evaluador separado; cita y dictamina, no reescribe.  
**Artefactos:** prototipo HTML/CSS/JS, fallback y QA automatizada.  
**Fecha:** 2026-08-02.

## Rúbrica bloqueada

| Dimensión | Evidencia | Razonamiento | Puntaje |
|---|---|---|---:|
| Claridad | “Tú describes la actividad y juzgas cuatro relaciones” y el caso de comparar frente a reconocer | La persona conoce el límite del sistema antes de empezar y ve un ejemplo trabajado. La longitud móvil aún requiere lectura humana. | 4/5 |
| Integridad | Cinco campos, cuatro juicios, diagnóstico, siguiente acción, guardado, impresión y fallback | El recorrido contiene situación, propósito, acción, evidencia, devolución y alternativa equivalente. | 5/5 |
| Profundidad | “La herramienta no interpreta tu disciplina” y salida que distingue `no`, duda y ausencia de ruptura declarada | Evita la falsa certificación y conserva un caso límite; no pretende evaluación semántica. | 4/5 |
| Practicidad | HTML/CSS/JS sin dependencias, rutas relativas y ausencia de solicitudes externas | Funciona en raíz, subruta y 320 px. El manejo de almacenamiento bloqueado conserva una fragilidad. | 4/5 |
| Pertinencia | Caso educativo, alternativa sin IA, versión oscura, impresión y datos locales | Atiende acceso heterogéneo, pero dispositivo, disciplina y comprensión real siguen sin validación humana. | 3/5 |

## Compuerta didáctica

- La actividad empieza con una desalineación reconocible, no con una tabla de verbos.
- La persona produce una cadena completa y cuatro juicios; no se limita a elegir una etiqueta.
- El resultado identifica únicamente el primer `no` o `no estoy seguro` declarado.
- La salida “No señalaste una ruptura” evita afirmar que la actividad está alineada.
- La alternativa sin IA conserva producto, criterio y carga como relación explícita.
- El H5P existente permanece intacto porque no satisface este contrato.

## Hallazgos técnicos

1. **M6P-R1-H1 — cerrado durante QA:** Chromium solicitó un favicon ausente y produjo un 404
   en consola. Se añadió un SVG local y ambas páginas lo declaran mediante ruta relativa.
2. **M6P-R1-H2 — cerrado durante QA:** axe detectó contraste 1.11:1 en el pie del fallback
   oscuro porque `--navy` cambia a un tono claro. El modo oscuro usa ahora un fondo fijo
   `#111722`; la repetición quedó en cero violaciones.
3. **M6P-R1-H3 — abierto:** `restoreDraft()` captura un error de lectura o JSON y vuelve a
   llamar `localStorage.removeItem()` dentro del bloque `catch`; el botón de borrado también
   llama el almacenamiento sin protección. Si el navegador deniega completamente el acceso,
   puede quedar una excepción sin manejar. Proteger esas operaciones sin cambiar la política
   de guardado voluntario.

El optimizador debe atender únicamente `M6P-R1-H3`. No se solicitan cambios narrativos,
visuales, de campos ni de diagnóstico.
