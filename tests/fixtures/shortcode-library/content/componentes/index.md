---
title: "Fixture de la biblioteca global"
description: "Página aislada para verificar los componentes compartidos."
date: 2026-08-25
draft: false
showHero: false
showAuthor: false
showDate: false
showReadingTime: false
showTableOfContents: false
---

Esta página reúne los componentes globales en un contexto mínimo. No forma parte del contenido público del sitio.

{{< idea titulo="Idea verificable" >}}
Una decisión de diseño se vuelve reutilizable cuando conserva su sentido fuera de la página donde nació.
{{< /idea >}}

{{< practica titulo="Práctica breve" >}}
Compara el componente con el texto que lo rodea y anota qué relación ayuda a comprender.
{{< /practica >}}

{{< parallevar >}}
La forma visual refuerza una función editorial; no sustituye la explicación.
{{< /parallevar >}}

{{< acordeon etiqueta="Preguntas de comprobación" >}}
{{< pliegue titulo="¿El contenido existe sin JavaScript?" abierto="true" >}}
Sí. El cuerpo usa `details` y `summary` nativos.
{{< /pliegue >}}
{{< pliegue titulo="¿Qué ocurre al imprimir?" >}}
Los paneles cerrados se muestran para conservar la lectura completa.
{{< /pliegue >}}
{{< /acordeon >}}

{{< proceso >}}
{{< paso titulo="Explicar" >}}
Presentar la relación en lenguaje común antes del resumen visual.
{{< /paso >}}
{{< paso titulo="Comprobar" >}}
Revisar el render, el teclado, el contraste y la impresión.
{{< /paso >}}
{{< /proceso >}}

{{< pestanas etiqueta="Dos perspectivas sobre el componente" >}}
{{< pestana titulo="Desde la autoría" >}}
La API debe decir qué parámetros son obligatorios y qué anidamiento admite.
{{< /pestana >}}
{{< pestana titulo="Desde la lectura" >}}
El significado debe permanecer disponible en móvil, impresión y ausencia de script.
{{< /pestana >}}
{{< /pestanas >}}

{{< cards etiqueta="Ejemplos enlazados dentro de la fixture" >}}
{{< card link="#fixture-de-la-biblioteca-global" title="Volver al inicio" description="Tarjeta con imagen e icono decorativos." icon="arrow-up" img="componentes.svg" >}}
{{< card link="#referencias" title="Ir a referencias" description="Tarjeta sin color editorial explícito." icon="book" img="componentes.svg" >}}
{{< /cards >}}

{{< figura src="componentes.svg" movil="componentes-mobile.svg" caption="La misma relación se compone de manera horizontal y vertical según el ancho disponible." >}}

{{< referencias >}}
- Contrato local de la biblioteca de componentes, versión 1.
{{< /referencias >}}
