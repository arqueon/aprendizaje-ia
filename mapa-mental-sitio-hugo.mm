<map version="1.0.1">
  <node TEXT="aprendizaje-ia (sitio Hugo)">
    <node TEXT="Configuracion del sitio">
      <node TEXT="hugo.toml">
        <node TEXT="Tema: blowfish/v2"/>
        <node TEXT="Idioma: es"/>
        <node TEXT="Menu principal: laboratorio, observatorio, recursos, cultura, marcos-referencia, blog"/>
        <node TEXT="Secciones principales: laboratorio, observatorio, recursos, cultura, marcos-referencia"/>
      </node>
      <node TEXT="go.mod / go.sum (modulo Hugo)"/>
      <node TEXT=".gitignore"/>
    </node>
    <node TEXT="Contenido (content/)">
      <node TEXT="_index.md (home)"/>
      <node TEXT="about.md"/>
      <node TEXT="blog/">
        <node TEXT="_index.md"/>
        <node TEXT="la-ia-no-hace-trampa-nosotros-si.md"/>
      </node>
      <node TEXT="laboratorio/">
        <node TEXT="_index.md"/>
        <node TEXT="experiencias/index.md"/>
        <node TEXT="integracion-ia/index.md"/>
        <node TEXT="practicas/_index.md"/>
        <node TEXT="practicas/debate-socratico-con-ia.md"/>
      </node>
      <node TEXT="observatorio/">
        <node TEXT="_index.md"/>
        <node TEXT="documentacion/_index.md"/>
        <node TEXT="guias/index.md"/>
        <node TEXT="estudios/_index.md"/>
        <node TEXT="estudios/encuesta-dec-2026.md"/>
      </node>
      <node TEXT="recursos/">
        <node TEXT="_index.md"/>
        <node TEXT="institucionales/index.md"/>
        <node TEXT="externas/index.md"/>
        <node TEXT="articulos/_index.md"/>
        <node TEXT="articulos/evaluacion-autentica-ia-bearman.md"/>
        <node TEXT="links/_index.md"/>
        <node TEXT="links/ai-for-education-toolkit.md"/>
        <node TEXT="videos/_index.md"/>
        <node TEXT="videos/sal-khan-ia-educacion.md"/>
      </node>
      <node TEXT="cultura/">
        <node TEXT="_index.md"/>
        <node TEXT="alfabetizacion/index.md"/>
        <node TEXT="directrices/index.md"/>
        <node TEXT="formacion/index.md"/>
        <node TEXT="transparencia/index.md"/>
      </node>
      <node TEXT="marcos-referencia/">
        <node TEXT="_index.md"/>
        <node TEXT="uso-etico/index.md"/>
      </node>
    </node>
    <node TEXT="Presentacion (layouts/)">
      <node TEXT="shortcodes/card.html"/>
      <node TEXT="shortcodes/cards.html"/>
      <node TEXT="partials/hooks/head-end.html"/>
      <node TEXT="partials/home/background.html"/>
    </node>
    <node TEXT="Recursos visuales">
      <node TEXT="assets/images/ (hero-bg, hero-cultura, hero-laboratorio, hero-marcos, hero-observatorio, hero-recursos, udg-logo)"/>
      <node TEXT="static/images/ (logo.svg, logo-dark.svg)"/>
      <node TEXT="static/files/test.txt"/>
    </node>
    <node TEXT="Plantillas de contenido (archetypes/)">
      <node TEXT="default.md"/>
      <node TEXT="articulo.md"/>
      <node TEXT="link.md"/>
      <node TEXT="opinion.md"/>
      <node TEXT="practica.md"/>
      <node TEXT="video.md"/>
    </node>
    <node TEXT="Automatizacion y despliegue">
      <node TEXT=".github/workflows/hugo.yaml (build y deploy a GitHub Pages)"/>
    </node>
    <node TEXT="Directorios auxiliares o historicos">
      <node TEXT="debug_build/ (salida de build local)"/>
      <node TEXT="layouts_old/"/>
      <node TEXT="assets_old/"/>
    </node>
  </node>
</map>
