/* global H5P */
var H5P = H5P || {};

H5P.BloomObjectiveBuilder = (function ($, EventDispatcher) {
  'use strict';

  const LEVELS = [
    { id: 'recordar', number: '01', name: 'Recordar', prompt: 'Recuperar información', verbs: ['definir', 'identificar', 'listar', 'nombrar', 'reconocer', 'recordar', 'relacionar', 'seleccionar'] },
    { id: 'comprender', number: '02', name: 'Comprender', prompt: 'Explicar significados', verbs: ['clasificar', 'comparar', 'describir', 'ejemplificar', 'explicar', 'interpretar', 'parafrasear', 'resumir'] },
    { id: 'aplicar', number: '03', name: 'Aplicar', prompt: 'Usar en una situación', verbs: ['calcular', 'completar', 'demostrar', 'ejecutar', 'implementar', 'practicar', 'resolver', 'usar'] },
    { id: 'analizar', number: '04', name: 'Analizar', prompt: 'Examinar partes y relaciones', verbs: ['categorizar', 'comparar', 'contrastar', 'diferenciar', 'examinar', 'inferir', 'investigar', 'organizar'] },
    { id: 'evaluar', number: '05', name: 'Evaluar', prompt: 'Juzgar con criterios', verbs: ['argumentar', 'comprobar', 'concluir', 'criticar', 'defender', 'justificar', 'recomendar', 'valorar'] },
    { id: 'crear', number: '06', name: 'Crear', prompt: 'Producir algo nuevo', verbs: ['componer', 'construir', 'diseñar', 'desarrollar', 'elaborar', 'formular', 'generar', 'proponer'] }
  ];

  const VAGUE = ['aprender', 'comprender', 'conocer', 'entender', 'familiarizarse', 'saber'];
  const DEFAULT_L10N = {
    kicker: 'Diseño inverso · Taxonomía de Bloom revisada',
    formulaLabel: 'Fórmula del objetivo',
    who: 'Quién',
    what: 'Qué hará',
    how: 'Cómo',
    quality: 'Qué tan bien',
    stepsLabel: 'Pasos del constructor',
    stepLevel: 'Nivel',
    stepVerb: 'Verbo',
    stepComponents: 'Componentes',
    stepReview: 'Revisión',
    copy: 'Copiar objetivo',
    save: 'Guardar en mi lista',
    copied: 'Objetivo copiado al portapapeles.',
    saved: 'Objetivo guardado en tu lista.',
    emptyPreview: 'Tu objetivo aparecerá aquí…',
    emptySaved: 'Todavía no has guardado objetivos.'
  };

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char];
    });
  }

  function BloomObjectiveBuilder(params, id, extras) {
    EventDispatcher.call(this);
    this.params = $.extend({
      title: 'Constructor de objetivos de aprendizaje',
      intro: 'Decide la complejidad cognitiva, elige una acción observable y completa las condiciones que harán evaluable el aprendizaje.',
      defaultAudience: 'Al finalizar, el estudiante',
      locale: 'es-MX',
      l10n: DEFAULT_L10N
    }, params || {});
    this.l10n = $.extend({}, DEFAULT_L10N, this.params.l10n || {});
    this.id = id;
    this.state = $.extend(true, {
      level: '', verb: '', audience: this.params.defaultAudience, content: '',
      condition: '', criterion: '', evidence: '', objectives: []
    }, extras && extras.previousState ? extras.previousState : {});
  }

  BloomObjectiveBuilder.prototype = Object.create(EventDispatcher.prototype);
  BloomObjectiveBuilder.prototype.constructor = BloomObjectiveBuilder;

  BloomObjectiveBuilder.prototype.attach = function ($container) {
    const self = this;
    const t = this.l10n;
    $container.addClass('h5p-bloom-objective-builder');
    this.$root = $('<main>', { class: 'bob-shell', lang: this.params.locale || 'es-MX' }).appendTo($container);
    this.$root.html(
      '<header class="bob-hero">' +
        '<div class="bob-kicker">' + esc(t.kicker) + '</div>' +
        '<h1>' + esc(this.params.title) + '</h1>' +
        '<p>' + esc(this.params.intro) + '</p>' +
        '<figure class="bob-visual" aria-labelledby="bob-visual-title bob-visual-desc"><svg viewBox="0 0 620 120" role="img"><title id="bob-visual-title">Progresión cognitiva de Bloom</title><desc id="bob-visual-desc">Seis niveles conectan recordar, comprender, aplicar, analizar, evaluar y crear.</desc><path d="M35 80h550" stroke="#d9eeec" stroke-width="8" stroke-linecap="round"/><g fill="#f7a11a" stroke="#123b4a" stroke-width="4"><circle cx="45" cy="80" r="22"/><circle cx="150" cy="68" r="26"/><circle cx="255" cy="57" r="30"/><circle cx="360" cy="46" r="34"/><circle cx="465" cy="35" r="38"/><circle cx="575" cy="24" r="42"/></g><g fill="#fff" font-family="sans-serif" font-size="16" font-weight="700" text-anchor="middle"><text x="45" y="86">1</text><text x="150" y="74">2</text><text x="255" y="63">3</text><text x="360" y="52">4</text><text x="465" y="41">5</text><text x="575" y="30">6</text></g></svg><figcaption>De recuperar información a producir y justificar algo nuevo.</figcaption></figure>' +
        '<div class="bob-formula" aria-label="' + esc(t.formulaLabel) + '">' +
          '<span><b>' + esc(t.who) + '</b> audiencia</span><i>+</i><span><b>' + esc(t.what) + '</b> verbo y contenido</span><i>+</i><span><b>' + esc(t.how) + '</b> condición</span><i>+</i><span><b>' + esc(t.quality) + '</b> criterio</span>' +
        '</div>' +
      '</header>' +
      '<nav class="bob-progress" aria-label="' + esc(t.stepsLabel) + '">' +
        '<span class="is-current" data-progress="1"><b>1</b> ' + esc(t.stepLevel) + '</span><span data-progress="2"><b>2</b> ' + esc(t.stepVerb) + '</span><span data-progress="3"><b>3</b> ' + esc(t.stepComponents) + '</span><span data-progress="4"><b>4</b> ' + esc(t.stepReview) + '</span>' +
      '</nav>' +
      '<section class="bob-section" aria-labelledby="bob-level-title">' +
        '<div class="bob-section-heading"><span class="bob-step">Paso 1</span><div><h2 id="bob-level-title">¿Qué nivel de pensamiento debe demostrar?</h2><p>Selecciona la demanda cognitiva, no la dificultad del tema.</p></div></div>' +
        '<div class="bob-levels"></div>' +
      '</section>' +
      '<section class="bob-section" aria-labelledby="bob-verb-title">' +
        '<div class="bob-section-heading"><span class="bob-step">Paso 2</span><div><h2 id="bob-verb-title">Elige un verbo observable</h2><p class="bob-verb-guidance">Primero selecciona un nivel para consultar sus verbos sugeridos.</p></div></div>' +
        '<div class="bob-verbs" role="group" aria-label="Verbos sugeridos"></div>' +
        '<label class="bob-custom-verb">Otro verbo observable <input type="text" data-field="verb" maxlength="40" placeholder="Escribe o selecciona un verbo"></label>' +
        '<div class="bob-note"><strong>Evita verbos ambiguos:</strong> conocer, saber, entender, aprender o familiarizarse no indican por sí solos qué evidencia observar.</div>' +
      '</section>' +
      '<section class="bob-section" aria-labelledby="bob-components-title">' +
        '<div class="bob-section-heading"><span class="bob-step">Paso 3</span><div><h2 id="bob-components-title">Completa los componentes</h2><p>Los dos primeros son esenciales; condición y criterio vuelven el objetivo más preciso.</p></div></div>' +
        '<div class="bob-fields">' +
          self.field('audience', 'A', 'Audiencia', '¿Quién aprende?', 'Al finalizar, el estudiante', true) +
          self.field('content', 'D', 'Desempeño y contenido', '¿Qué hará y sobre qué?', 'un informe que contraste dos fuentes académicas', true) +
          self.field('condition', 'C', 'Condición', '¿Con qué recursos o en qué contexto?', 'a partir de un caso y con la plantilla proporcionada', false) +
          self.field('criterion', 'G', 'Grado o criterio', '¿Con qué calidad o estándar?', 'incluyendo al menos tres argumentos sustentados', false) +
        '</div>' +
        '<label class="bob-evidence"><span><b>Evidencia alineada</b><small>¿Qué producto o actuación permitirá verificarlo?</small></span><textarea data-field="evidence" rows="2" maxlength="300" placeholder="Ej.: informe comparativo evaluado con una rúbrica"></textarea></label>' +
      '</section>' +
      '<section class="bob-section bob-review" aria-labelledby="bob-review-title">' +
        '<div class="bob-section-heading"><span class="bob-step">Paso 4</span><div><h2 id="bob-review-title">Revisa, guarda y reutiliza</h2><p>La vista previa se actualiza mientras escribes.</p></div></div>' +
        '<div class="bob-review-grid"><div class="bob-preview-wrap"><span class="bob-label">Objetivo construido</span><blockquote class="bob-preview" aria-live="polite"></blockquote><div class="bob-actions"><button type="button" class="bob-button bob-copy">' + esc(t.copy) + '</button><button type="button" class="bob-button bob-save">' + esc(t.save) + '</button></div><div class="bob-feedback" aria-live="polite"></div></div><aside class="bob-checks"><div class="bob-score"><b>0/4</b><span>componentes completos</span></div><ul></ul></aside></div>' +
        '<div class="bob-saved"><div class="bob-saved-heading"><h3>Mis objetivos</h3><span>Se conservan como estado de esta actividad.</span></div><div class="bob-objective-list"></div></div>' +
      '</section>' +
      '<footer class="bob-footer"><strong>Guía, no receta.</strong> Un verbo puede funcionar en más de un nivel según la tarea y la evidencia. Referencias: <a href="https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/blooms-taxonomy-learning-activities-and-assessments" target="_blank" rel="noopener">University of Waterloo</a> y <a href="https://teaching.uic.edu/cate-teaching-guides/syllabus-course-design/backward-design/" target="_blank" rel="noopener">University of Illinois Chicago</a>.</footer>'
    );

    this.renderLevels();
    this.bindFields();
    this.renderVerbs();
    this.render();
    this.$root.on('focusin', '[data-field="verb"]', function () { self.setProgress(2); });
    this.$root.on('focusin', '.bob-fields input, .bob-evidence textarea', function () { self.setProgress(3); });
    this.$root.on('focusin', '.bob-review button', function () { self.setProgress(4); });
    this.$root.on('click', '.bob-copy', function () { self.copyObjective(); });
    this.$root.on('click', '.bob-save', function () { self.saveObjective(); });
    this.$root.on('click', '.bob-remove', function () { self.removeObjective(Number($(this).attr('data-index'))); });
    this.trigger('resize');
  };

  BloomObjectiveBuilder.prototype.field = function (name, letter, title, help, placeholder, required) {
    return '<label class="bob-field"><span class="bob-field-icon" aria-hidden="true">' + letter + '</span><span class="bob-field-copy"><b>' + title + (required ? ' <em>esencial</em>' : ' <em>recomendado</em>') + '</b><small>' + help + '</small><input type="text" data-field="' + name + '" maxlength="240" placeholder="' + placeholder + '"></span></label>';
  };

  BloomObjectiveBuilder.prototype.renderLevels = function () {
    const self = this;
    const $levels = this.$root.find('.bob-levels').empty();
    LEVELS.forEach(function (level) {
      $('<button>', { type: 'button', class: 'bob-level', 'data-level': level.id, 'aria-pressed': 'false' })
        .html('<span class="bob-level-number">' + level.number + '</span><span><b>' + level.name + '</b><small>' + level.prompt + '</small></span>')
        .on('click', function () {
          self.state.level = level.id;
          self.state.verb = '';
          self.$root.find('[data-field="verb"]').val('');
          self.setProgress(2);
          self.renderVerbs(); self.render();
        }).appendTo($levels);
    });
  };

  BloomObjectiveBuilder.prototype.renderVerbs = function () {
    const self = this;
    const level = LEVELS.find(function (item) { return item.id === self.state.level; });
    const $verbs = this.$root.find('.bob-verbs').empty();
    this.$root.find('.bob-verb-guidance').text(level ? level.name + ': ' + level.prompt + '. Elige el verbo que mejor describa la evidencia.' : 'Primero selecciona un nivel para consultar sus verbos sugeridos.');
    if (!level) {
      $verbs.html('<div class="bob-empty">Los verbos aparecerán aquí.</div>');
      return;
    }
    level.verbs.forEach(function (verb) {
      $('<button>', { type: 'button', class: 'bob-verb', text: verb, 'aria-pressed': self.state.verb === verb ? 'true' : 'false' })
        .on('click', function () {
          self.state.verb = verb;
          self.$root.find('[data-field="verb"]').val(verb);
          self.render();
        }).appendTo($verbs);
    });
  };

  BloomObjectiveBuilder.prototype.bindFields = function () {
    const self = this;
    this.$root.find('[data-field]').each(function () {
      const key = $(this).attr('data-field');
      $(this).val(self.state[key] || '').on('input change', function () {
        self.state[key] = $(this).val().trimStart();
        self.render();
      });
    });
  };

  BloomObjectiveBuilder.prototype.objectiveText = function () {
    const parts = [this.state.audience, this.state.verb, this.state.content];
    if (this.state.condition) parts.push(this.state.condition);
    if (this.state.criterion) parts.push(this.state.criterion);
    let text = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
    if (text) text = text.charAt(0).toUpperCase() + text.slice(1).replace(/[.;,]+$/, '') + '.';
    return text;
  };

  BloomObjectiveBuilder.prototype.checks = function () {
    const verb = (this.state.verb || '').toLowerCase().trim();
    return [
      { ok: !!this.state.audience, text: 'Audiencia identificada' },
      { ok: !!this.state.level && !!verb && VAGUE.indexOf(verb) === -1, text: !this.state.level ? 'Nivel de Bloom pendiente' : (verb && VAGUE.indexOf(verb) !== -1 ? 'El verbo es ambiguo; elige una acción observable' : 'Nivel y verbo observable seleccionados') },
      { ok: !!this.state.content, text: 'Desempeño y contenido definidos' },
      { ok: !!this.state.condition && !!this.state.criterion, text: 'Condición y criterio especificados' }
    ];
  };

  BloomObjectiveBuilder.prototype.render = function () {
    const self = this;
    this.$root.find('.bob-level').each(function () {
      const selected = $(this).attr('data-level') === self.state.level;
      $(this).toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false');
    });
    this.$root.find('.bob-verb').each(function () {
      const selected = $(this).text() === self.state.verb;
      $(this).toggleClass('is-selected', selected).attr('aria-pressed', selected ? 'true' : 'false');
    });
    const text = this.objectiveText();
    this.$root.find('.bob-preview').html(text ? esc(text) : '<span>' + esc(this.l10n.emptyPreview) + '</span>');
    const checks = this.checks();
    const score = checks.filter(function (item) { return item.ok; }).length;
    this.$root.find('.bob-score b').text(score + '/4');
    this.$root.find('.bob-checks ul').html(checks.map(function (item) { return '<li class="' + (item.ok ? 'is-ok' : '') + '"><i aria-hidden="true">' + (item.ok ? '✓' : '○') + '</i>' + esc(item.text) + '</li>'; }).join(''));
    this.$root.find('.bob-copy').prop('disabled', score < 3);
    this.$root.find('.bob-save').prop('disabled', score < 3);
    this.renderSaved();
    this.trigger('resize');
  };

  BloomObjectiveBuilder.prototype.renderSaved = function () {
    const self = this;
    const $list = this.$root.find('.bob-objective-list').empty();
    if (!this.state.objectives.length) {
      $list.html('<div class="bob-empty">' + esc(this.l10n.emptySaved) + '</div>'); return;
    }
    this.state.objectives.forEach(function (item, index) {
      $list.append('<article class="bob-saved-item"><span>' + (index + 1) + '</span><div><b>' + esc(item.level || 'Objetivo') + '</b><p>' + esc(item.text) + '</p>' + (item.evidence ? '<small><strong>Evidencia:</strong> ' + esc(item.evidence) + '</small>' : '') + '</div><button type="button" class="bob-remove" data-index="' + index + '" aria-label="Eliminar objetivo ' + (index + 1) + '">×</button></article>');
    });
  };

  BloomObjectiveBuilder.prototype.setProgress = function (step) {
    this.$root.find('[data-progress]').each(function () {
      const n = Number($(this).attr('data-progress'));
      $(this).toggleClass('is-current', n === step).toggleClass('is-done', n < step);
    });
  };

  BloomObjectiveBuilder.prototype.copyObjective = function () {
    const self = this;
    const text = this.objectiveText();
    const done = function () { self.$root.find('.bob-feedback').text(self.l10n.copied); };
    const fallback = function () {
      const $temp = $('<textarea>').val(text).appendTo(this.$root).select();
      document.execCommand('copy'); $temp.remove(); done();
    }.bind(this);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(fallback);
    else fallback();
  };

  BloomObjectiveBuilder.prototype.saveObjective = function () {
    const level = LEVELS.find((item) => item.id === this.state.level);
    this.state.objectives.push({ text: this.objectiveText(), level: level ? level.name : '', evidence: this.state.evidence || '' });
    this.$root.find('.bob-feedback').text(this.l10n.saved);
    this.render();
  };

  BloomObjectiveBuilder.prototype.removeObjective = function (index) {
    this.state.objectives.splice(index, 1); this.render();
  };

  BloomObjectiveBuilder.prototype.getCurrentState = function () { return this.state; };
  BloomObjectiveBuilder.prototype.resetTask = function () {
    this.state = { level: '', verb: '', audience: this.params.defaultAudience, content: '', condition: '', criterion: '', evidence: '', objectives: [] };
    const self = this;
    this.$root.find('[data-field]').each(function () {
      const key = $(this).attr('data-field');
      $(this).val(self.state[key] || '');
    });
    this.renderVerbs(); this.render();
  };

  return BloomObjectiveBuilder;
}(H5P.jQuery, H5P.EventDispatcher));
