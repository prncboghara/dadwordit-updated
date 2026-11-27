/* ============================================================
   DADWORD IT — Main JS v2.0
   Vanilla JS only. No jQuery dependencies.
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     Preloader (first visit per session only)
     ---------------------------------------------------------- */
  (function initPreloader() {
    const pre = document.getElementById('dw-preloader');
    if (!pre) return;

    let seen = false;
    try {
      seen = !!sessionStorage.getItem('dwVisited');
    } catch (e) {}

    if (seen || document.documentElement.classList.contains('dw-skip-preloader')) {
      pre.classList.add('hidden');
      return;
    }

    window.addEventListener('load', function () {
      setTimeout(function () {
        pre.classList.add('hidden');
        try { sessionStorage.setItem('dwVisited', '1'); } catch (e) {}
      }, 500);
    });
  })();

  /* ----------------------------------------------------------
     Sticky Nav
     ---------------------------------------------------------- */
  const nav = document.getElementById('dw-nav');
  if (nav) {
    const onScroll = function () {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------------------------------------
     Active nav link
     ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(function (link) {
    if (link.pathname !== window.location.pathname) return;
    // Hash links (e.g. /#product) only match when the hash is present
    if (link.hash) {
      if (link.hash === window.location.hash) link.classList.add('active');
      return;
    }
    link.classList.add('active');
  });

  /* ----------------------------------------------------------
     Mobile menu toggle
     ---------------------------------------------------------- */
  const hamburger = document.getElementById('dw-hamburger');
  const overlay   = document.getElementById('dw-overlay');

  if (hamburger && overlay) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ----------------------------------------------------------
     Terminal typewriter
     ---------------------------------------------------------- */
  const rotatingEl = document.getElementById('t-rotating');
  if (rotatingEl) {
    const words = ['Node.js', 'React', 'Next.js', 'Shopify', 'Prisma', 'Supabase', 'Claude AI', 'Angular', 'Laravel'];
    let wordIdx  = 0;
    let charIdx  = 0;
    let deleting = false;
    let paused   = false;

    function typeStep() {
      const current = words[wordIdx];

      if (!deleting) {
        charIdx++;
        rotatingEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          paused = true;
          setTimeout(function () { paused = false; deleting = true; loop(); }, 1800);
          return;
        }
      } else {
        charIdx--;
        rotatingEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          wordIdx  = (wordIdx + 1) % words.length;
        }
      }
      loop();
    }

    function loop() {
      if (paused) return;
      const speed = deleting ? 60 : 110;
      setTimeout(typeStep, speed);
    }

    loop();
  }

  /* ----------------------------------------------------------
     Counter animation (stats)
     ---------------------------------------------------------- */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target || el.textContent) || 0;
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value    = Math.floor(eased * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ----------------------------------------------------------
     Scroll Reveal + Counter trigger
     ---------------------------------------------------------- */
  const revealEls  = document.querySelectorAll('.reveal');
  const counterEls = document.querySelectorAll('.stat-counter');

  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObs.observe(el); });

    const counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function (el) { counterObs.observe(el); });
  } else {
    // Fallback for old browsers
    revealEls.forEach(function (el) { el.classList.add('visible'); });
    counterEls.forEach(function (el) { animateCounter(el); });
  }

  /* ----------------------------------------------------------
     Portfolio filter
     ---------------------------------------------------------- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const portCards   = document.querySelectorAll('.port-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(function () { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(function () { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ----------------------------------------------------------
     Lead tracking (GA4). Mark `generate_lead` as a key event in GA.
     ---------------------------------------------------------- */
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
  }

  // Calendly bookings (inline widget posts messages to the page)
  window.addEventListener('message', function (e) {
    if (!e.origin || e.origin.indexOf('calendly.com') === -1) return;
    var ev = e.data && e.data.event;
    if (ev === 'calendly.event_scheduled') {
      track('generate_lead', { method: 'calendly_booking', page: window.location.pathname });
    } else if (ev === 'calendly.date_and_time_selected') {
      track('booking_time_selected', { page: window.location.pathname });
    }
  });

  // Outbound intent clicks: email, Upwork, Clutch, booking page
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) track('contact_click', { method: 'email', page: window.location.pathname });
    else if (href.indexOf('upwork.com') !== -1) track('profile_click', { platform: 'upwork', page: window.location.pathname });
    else if (href.indexOf('clutch.co') !== -1) track('profile_click', { platform: 'clutch', page: window.location.pathname });
    else if (href.indexOf('/lets-talk') === 0) track('cta_click', { target: 'book_call', page: window.location.pathname });
    else if (href.indexOf('/contact-us') === 0) track('cta_click', { target: 'contact', page: window.location.pathname });
  });

  /* ----------------------------------------------------------
     Contact form: posts to /api/contact, which forwards to n8n server-side
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('dw-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const form    = this;
      const msgBox  = document.getElementById('dw-form-msg');
      const btn     = form.querySelector('.btn-submit');

      btn.classList.add('loading');
      btn.disabled = true;

      const fd = new URLSearchParams();
      fd.append('fullName',    form.full_name ? form.full_name.value : '');
      fd.append('email',       form.email.value);
      fd.append('company',     form.company ? form.company.value : '');
      fd.append('phone',       form.phone ? form.phone.value : '');
      fd.append('projectType', form.service.value);
      fd.append('budget',      form.budget ? form.budget.value : '');
      fd.append('description', form.message.value);
      fd.append('website',     form.website ? form.website.value : '');

      try {
        const res = await fetch('/api/contact', {
          method:  'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: fd
        });
        const data = await res.json().catch(function () { return {}; });

        if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please email us at contact@dadwordit.com');

        track('generate_lead', {
          method: 'contact_form',
          project_type: form.service.value || 'unknown',
          budget: (form.budget && form.budget.value) || 'unknown',
          page: window.location.pathname
        });

        if (msgBox) {
          msgBox.className = 'form-msg-box success';
          msgBox.textContent = 'Thanks! We\'ll be in touch within 24 hours.';
        }
        form.reset();
      } catch (err) {
        console.error(err);
        if (msgBox) {
          msgBox.className = 'form-msg-box error';
          msgBox.textContent = err.message || 'Something went wrong. Please email us at contact@dadwordit.com';
        }
      }

      btn.classList.remove('loading');
      btn.disabled = false;

      if (msgBox) {
        setTimeout(function () {
          msgBox.className = 'form-msg-box';
          msgBox.textContent = '';
        }, 8000);
      }
    });
  }

  /* ----------------------------------------------------------
     Preselect project type from ?type= (e.g. /contact-us?type=white-label)
     ---------------------------------------------------------- */
  (function () {
    var sel = document.getElementById('f-service');
    if (!sel || !window.URLSearchParams) return;
    var type = new URLSearchParams(window.location.search).get('type');
    var map = { 'white-label': 'White-Label Partnership' };
    if (type && map[type]) sel.value = map[type];
  })();

  /* ----------------------------------------------------------
     FAQ accordion
     ---------------------------------------------------------- */
  document.querySelectorAll('[data-faq]').forEach(function (item) {
    const btn = item.querySelector('.faq-q');
    if (!btn || btn.dataset.faqBound) return;
    btn.dataset.faqBound = '1';
    if (btn.getAttribute('aria-expanded') === 'true') {
      item.classList.add('open');
    }
    btn.addEventListener('click', function () {
      const opening = !item.classList.contains('open');
      document.querySelectorAll('[data-faq]').forEach(function (f) {
        f.classList.remove('open');
        const q = f.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (opening) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();
