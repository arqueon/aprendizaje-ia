---
title: Encuesta DEC 2026 — IA en educación superior
date: 2026-02-06
description: Informe sobre la adopción de IA en universidades de Latinoamérica y UdeG.
---

## Resultados Destacados

Este estudio cuenta con la participación de la **Universidad de Guadalajara**. Se realiza a partir de una muestra de 22,941 de estudiantes y 7,319 profesores, en 29 instituciones de educación superior en Latinoamérica. La UdeG representa el 24.5% de la muestra total con **6,578 universitarios**.

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

---

## Visualización del informe

A continuación puedes consultar el documento completo directamente en el navegador.

<div style="position: relative; width: 180%; height: 0; padding-bottom: 125%; margin-top: 2rem; margin-bottom: 2rem;">
    <iframe src="../../../files/encuesta_ia_latam_2026.pdf" 
            style="position: absolute; width: 100%; height: 100%; border: none;" 
            allowfullscreen>
    </iframe>
</div>

Si tienes problemas para visualizarlo, puedes [descargar el PDF aquí](../../../files/encuesta_ia_latam_2026.pdf).
