# UDGIA-002 — Identidad C única en Hugo

## Decisión

Rubén aprobó el 2026-07-26 **C · Almagre interactivo** como identidad canónica del
ecosistema IA UDGPlus. El sitio Hugo deja de ofrecer o inferir modos dark/light.

`defaultAppearance = "light"` y `color-scheme: only light` se conservan únicamente como
valores técnicos para que controles nativos, formularios y Mermaid usen una base clara
compatible con la paleta C. No nombran una segunda dirección visual.

## Contrato

- una sola paleta: papel, superficie blanca, tinta marina, almagre, olivo y ocre;
- ningún selector de apariencia;
- ninguna respuesta a `prefers-color-scheme`;
- ninguna preferencia `appearance=dark` heredada de visitas anteriores;
- tipografías autoalojadas: Newsreader, Inter y Archivo Narrow. **Nota 2026-08-28:** este
  documento describe la identidad C original; Piazzolla fue sustituida por Newsreader en el
  rediseño Almagre (`f41f795`, 2026-08-23) y ya no se sirve. Los hashes de Piazzolla que
  aparecen abajo son históricos;
- los SVG y Mermaid modificados usan únicamente roles C con redundancia de trazo y texto;
- foco visible, contraste, movimiento reducido, `forced-colors` e impresión se conservan;
- los H5P futuros recibirán los mismos tokens mediante su tema interior;
- no se despliega desde esta rama.

## Capas de implementación

1. `assets/css/schemes/udgplus-c.css` traduce C a los roles neutral, primary y secondary que
   consume Blowfish.
2. `assets/css/custom.css` conserva los roles semánticos completos y define tipografía,
   superficies, foco, selección, cabecera y prosa.
3. `layouts/partials/extend-head.html`, punto de extensión soportado por Blowfish, neutraliza
   una preferencia persistida antes de pintar la página. La configuración impide que el tema
   vuelva a escuchar el sistema o muestre un selector.
4. Los SVG autónomos dejan de contener media queries dark, pues una imagen cargada mediante
   `<img>` no hereda la identidad del documento. Sus colores Ocean se remapearon de forma
   semántica a almagre, olivo, ocre, riesgo y tinta marina.
5. `static/site.webmanifest` fija papel C para instalación y usa rutas relativas compatibles
   con GitHub Pages. Las fuentes también se resuelven desde el bundle CSS sin asumir que el
   sitio vive en la raíz del dominio.

## Fuentes y licencias

Las fuentes se publican como WOFF2 variables y se acompañan de sus licencias:

- ~~Piazzolla~~ (retirada 2026-08-23) — SIL Open Font License 1.1;
- Newsreader — SIL Open Font License 1.1;
- Inter — SIL Open Font License 1.1;
- Archivo Narrow — SIL Open Font License 1.1.

| Archivo | SHA-256 |
|---|---|
| `piazzolla-variable.woff2` | `9bf8fba7efc1eaa37382ed26ce9e9eb65b4172977d82d1a0bd6cc9f10a72bd08` |
| `piazzolla-italic-variable.woff2` | `5b6663be156c4dafeddf48fe7885d1b0dd725bccc8c0bcfe23a0bc688f1553a8` |
| `inter-variable.woff2` | `693b77d4f32ee9b8bfc995589b5fad5e99adf2832738661f5402f9978429a8e3` |
| `inter-italic-variable.woff2` | `e564f652916db6c139570fefb9524a77c4d48f30c92928de9db19b6b5c7a262a` |
| `archivo-narrow-variable.woff2` | `6b9f00eaab30eaa2e8024267b77cc2eea3c52fd2a50097932ad924294fc6a136` |
| `archivo-narrow-italic-variable.woff2` | `df5e43b64ff713919195efd04b267df3776610c16ebf4d6ff773ed774d48aa66` |

## Fuera de alcance

- despliegue o merge a `main`;
- modificación de Moodle;
- conversión masiva de todas las páginas al nuevo lenguaje de componentes;
- rediseño semántico de los SVG hero y otros esquemas heredados sin bifurcación de
  apariencia, que siguen inventariados como deuda;
- runtime H5P de producción;
- eliminación física de todas las clases `dark:*` heredadas del tema. Permanecen inertes
  mientras Blowfish se actualice; retirarlas del CSS compilado exigiría mantener un fork.

## Aceptación

- build Hugo sin errores nuevos;
- selector de apariencia ausente;
- `html.dark` ausente incluso con sistema oscuro y `localStorage.appearance = "dark"`;
- la clave persistida se elimina;
- `data-auto-appearance = "false"`;
- ningún SVG propio contiene `prefers-color-scheme`;
- mismas capturas y tokens computados con emulación clara u oscura;
- sin overflow a 375, 768 y 1280 px en páginas representativas;
- fuentes WOFF2 servidas localmente y sin solicitudes externas nuevas atribuibles al sistema C.
- build y recursos válidos tanto en `/` como bajo la subruta `/aprendizaje-ia/`;
- manifiesto, iconos, fuentes e imágenes de tarjetas responden HTTP 200 bajo esa subruta;
- los pares críticos de texto en gráficos alcanzan al menos 4.5:1.
