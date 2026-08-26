---
title: Encuesta DEC 2026 — IA en educación superior
date: 2026-02-06
description: Informe sobre la adopción de IA en universidades de Latinoamérica y UdeG.
summary: "Resultados de la encuesta DEC 2026 sobre la adopción y percepción de IA en universidades latinoamericanas y la UdeG."
---

## Resultados Destacados

Este estudio cuenta con la participación de la **Universidad de Guadalajara**. Se realiza a partir de una muestra de 22,941 estudiantes y 7,319 profesores, en 29 instituciones de educación superior en Latinoamérica. La UdeG aporta **6,578 universitarios** a esa muestra.

### Distribución de participantes (UdeG)

{{< chart >}}
type: 'doughnut',
data: {
  labels: ['Estudiantes', 'Docentes'],
  datasets: [{
    label: 'Participantes UdeG',
    data: [5617, 961],
    backgroundColor: ['#6366f1', '#10b981'],
    hoverOffset: 4
  }]
},
options: {
  plugins: {
    title: {
      display: true,
      text: 'Participantes por perfil (UdeG)'
    }
  }
}
{{< /chart >}}

* **Estudiantes**: 5,617 (85.4%)
  * *Predominio de nivel medio superior y licenciatura temprana.*
* **Docentes**: 961 (14.6%)
  * *Equilibrio entre tiempo completo y parcial.*

### Representación de la UdeG en la muestra latinoamericana

{{< chart >}}
type: 'bar',
data: {
  labels: ['Muestra Total', 'UdeG'],
  datasets: [{
    label: 'Estudiantes',
    data: [22941, 5617],
    backgroundColor: '#6366f1'
  }, {
    label: 'Profesores',
    data: [7319, 961],
    backgroundColor: '#10b981'
  }]
},
options: {
  indexAxis: 'y',
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Comparativa UdeG vs total LATAM'
    }
  }
}
{{< /chart >}}

**El gráfico en texto:** la UdeG aporta 5,617 de los 22,941 estudiantes (24.5 %) y 961 de los 7,319 profesores (13.1 %) de la muestra. En conjunto, uno de cada cinco participantes del estudio es universitario de la UdeG: los resultados permiten lecturas con peso propio, aunque conviene recordar que la muestra latinoamericana completa se inclina hacia lo que ocurre en esta institución.

---

## Visualización del informe

A continuación puedes consultar el documento completo directamente en el navegador.

**El informe en breve.** La encuesta del Digital Education Council —en colaboración con el Tecnológico de Monterrey y el Institute for the Future of Education— reunió 22,941 respuestas de estudiantes y 7,319 de profesorado en 29 instituciones de educación superior de América Latina; es la mayor encuesta regional de su tipo. Cuatro hallazgos orientan su lectura:

- La adopción ya es mayoritaria: 92 % del estudiantado y 79 % del profesorado usan IA activamente, niveles que superan las tendencias globales de los estudios previos del DEC.
- La preocupación acompaña al uso: 65 % del estudiantado teme que la IA conduzca a un aprendizaje superficial; 56 % se inquieta por la equidad en la evaluación y otro 56 % por la privacidad de sus datos.
- Persisten brechas de alfabetización en IA, junto con vacíos de gobernanza y de comunicación institucional.
- El llamado del informe: gobernanza transparente, formación práctica en alfabetización para profesorado y estudiantado, y rediseño de la evaluación que proteja la integridad académica y el pensamiento crítico.

<div style="position: relative; width: 100%; height: 0; padding-bottom: 125%; margin-top: 2rem; margin-bottom: 2rem;">
    <iframe src="../../../files/encuesta_ia_latam_2026.pdf" 
            style="position: absolute; width: 100%; height: 100%; border: none;" 
            allowfullscreen>
    </iframe>
</div>

Si tienes problemas para visualizarlo, puedes [descargar el PDF aquí](../../../files/encuesta_ia_latam_2026.pdf).
