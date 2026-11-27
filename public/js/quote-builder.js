/* Quote builder (/get-a-quote). The page config (#est-config) has labels only, no prices.
   Selections go to /api/contact as hidden fields; the server adds an internal estimate
   for the team. Visitors get their quote by email. */
(function () {
  'use strict';

  var cfgEl = document.getElementById('est-config');
  var form = document.getElementById('est-form');
  if (!cfgEl || !form) return;

  var cfg;
  try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }

  var $ = function (id) { return document.getElementById(id); };
  var byId = function (list, id) { return list.filter(function (x) { return x.id === id; })[0] || list[0]; };
  var checked = function (name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ''; };

  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }

  var lastPrefill = '';

  function selections() {
    var project = byId(cfg.projects, checked('est-type'));
    var picked = Array.prototype.slice.call(
      form.querySelectorAll('input[name="est-feature-' + project.id + '"]:checked')
    ).map(function (el) { return byId(project.features, el.value); });
    return {
      project: project,
      features: picked,
      design: byId(cfg.design, checked('est-design')),
      timeline: byId(cfg.timeline, checked('est-timeline'))
    };
  }

  function summaryText(s) {
    var feats = s.features.length ? s.features.map(function (f) { return f.label; }).join(', ') : 'core features only';
    return s.project.label + ': ' + feats + '. ' + s.design.label + ', ' + s.timeline.label.toLowerCase() + ' timeline.';
  }

  function render() {
    var s = selections();

    form.querySelectorAll('.est-features').forEach(function (el) {
      el.hidden = el.getAttribute('data-for') !== s.project.id;
    });

    $('est-project').textContent = s.project.label;
    var count = s.features.length;
    var mini = s.project.label + (count ? ' · ' + count + ' feature' + (count > 1 ? 's' : '') : '');
    if ($('est-mini-txt')) $('est-mini-txt').textContent = mini;

    var lines = [];
    if (count) s.features.forEach(function (f) { lines.push(f.label); });
    else lines.push('Core features only');
    lines.push(s.design.label);
    lines.push(s.timeline.label + ' timeline');
    var ul = $('est-lines');
    ul.innerHTML = '';
    lines.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });

    fillRequestForm(s);
    return s;
  }

  function setHidden(qf, name, value) {
    var el = qf.querySelector('input[type="hidden"][name="' + name + '"]');
    if (!el) {
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = name;
      el.setAttribute('data-extra', '');
      qf.appendChild(el);
    }
    el.value = value;
  }

  function fillRequestForm(s) {
    var summary = summaryText(s);

    var box = $('est-summary');
    if (box) { box.hidden = false; $('est-summary-txt').textContent = summary; }

    var qf = document.getElementById('dw-contact-form');
    if (!qf) return;

    if (qf.service) qf.service.value = s.project.formValue;

    // Only ids go to the server; it works out the internal estimate itself.
    setHidden(qf, 'quoteType', s.project.id);
    setHidden(qf, 'quoteFeatures', s.features.map(function (f) { return f.id; }).join(','));
    setHidden(qf, 'quoteDesign', s.design.id);
    setHidden(qf, 'quoteTimeline', s.timeline.id);

    qf.setAttribute('data-success', 'Thanks! Your request is in. We\'ll email your quote within 24 hours.');
    var btnTxt = qf.querySelector('.btn-submit .btn-txt');
    if (btnTxt) btnTxt.textContent = 'Send quote request';

    // Prefill the message. Refresh our prefilled part, but keep anything the visitor typed after it.
    if (qf.message) {
      var prefill = 'Quote request: ' + summary + '\n\nAbout my project: ';
      var current = qf.message.value;
      if (!current || (lastPrefill && current.indexOf(lastPrefill) === 0)) {
        qf.message.value = prefill + current.slice(lastPrefill.length);
        lastPrefill = prefill;
      }
    }
  }

  var started = false;
  form.addEventListener('change', function () {
    var s = render();
    if (!started) {
      started = true;
      track('quote_builder_start', { project_type: s.project.id });
    }
  });

  $('est-quote-btn').addEventListener('click', function () {
    var s = selections();
    track('quote_request_click', { project_type: s.project.id, features: s.features.length });
    setTimeout(function () {
      var name = document.getElementById('f-name');
      if (name) name.focus({ preventScroll: true });
    }, 400);
  });

  // After a successful send the form resets; fill the selections back in.
  var qf = document.getElementById('dw-contact-form');
  if (qf) qf.addEventListener('reset', function () { setTimeout(function () { lastPrefill = ''; render(); }, 0); });

  // Mobile bar: show it only while the visitor is choosing options.
  var mini = $('est-mini');
  if (mini && 'IntersectionObserver' in window) {
    var stepsOn = false, resultOn = false;
    var update = function () { mini.classList.toggle('show', stepsOn && !resultOn); };
    new IntersectionObserver(function (e) { stepsOn = e[0].isIntersecting; update(); })
      .observe(form.querySelector('.est-steps'));
    new IntersectionObserver(function (e) { resultOn = e[0].isIntersecting; update(); })
      .observe($('est-result'));
  }

  // Start from ?type= (e.g. /get-a-quote?type=shopify from a service page).
  render();
})();
