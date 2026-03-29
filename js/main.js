/* ============================================
   RESCATE TFG/TFM — Main JavaScript
   Language switcher, form handling, scroll effects
   ============================================ */

(function () {
  'use strict';

  /* ---------- i18n Copy ---------- */
  const COPY = {
    es: {
      /* Nav */
      navCta: 'Dejar email',
      /* Hero */
      heroHeading: '\u00bfVas tarde con tu TFG o TFM?',
      heroSub: 'Si est\u00e1s bloqueado, no necesitas m\u00e1s teor\u00eda. Necesitas estructura, criterio y alguien que te ayude a llegar a una entrega defendible.',
      heroPos: 'No es una academia. No es una web de trabajos por p\u00e1ginas. Es ayuda real para salir del caos y avanzar.',
      /* Form */
      formTitle: 'Empieza aqu\u00ed',
      labelEmail: 'Email',
      labelName: 'Nombre',
      labelType: 'Tipo de trabajo',
      placeholderEmail: 'Tu mejor email',
      placeholderName: 'Tu nombre (opcional)',
      selectLabel: '\u00bfQu\u00e9 necesitas?',
      selectOpt1: 'TFG',
      selectOpt2: 'TFM',
      selectOpt3: 'No estoy seguro',
      formBtn: 'Quiero que me escribas',
      formNote: 'Te escribir\u00e9 para entender tu caso. Sin spam y sin mensajes absurdos.',
      formSending: 'Enviando...',
      formSuccess: 'Perfecto. He recibido tu email. Te escribir\u00e9 pronto para ver tu caso.',
      formError: 'Ha habido un problema. Prueba otra vez en un momento.',
      /* Pain */
      painTitle: 'Si te pasa esto, esta web es para ti',
      pain1: 'Vas tarde y no sabes por d\u00f3nde empezar',
      pain2: 'Tu tutor te corrige, pero sigues sin saber qu\u00e9 cambiar',
      pain3: 'Has probado ChatGPT y sigues bloqueado',
      pain4: 'No tienes claro el enfoque, la metodolog\u00eda o la estructura',
      pain5: 'Te agobia pensar que no llegas a la entrega',
      /* Solution */
      solTitle: 'Qu\u00e9 hacemos contigo',
      sol1Title: 'Ordenamos el caos',
      sol1Text: 'Vemos en qu\u00e9 punto est\u00e1s, qu\u00e9 te falta y qu\u00e9 est\u00e1 frenando tu trabajo.',
      sol2Title: 'Te damos direcci\u00f3n',
      sol2Text: 'Definimos el enfoque, la estructura y los siguientes pasos para que dejes de improvisar.',
      sol3Title: 'Te ayudamos a llegar',
      sol3Text: 'Te acompa\u00f1amos para convertir el bloqueo en una entrega que puedas defender con sentido.',
      /* Trust */
      trustYesTitle: 'Lo que esto s\u00ed es',
      trustYes1: 'Ayuda seria y personalizada',
      trustYes2: 'Direcci\u00f3n clara para avanzar',
      trustYes3: 'Acompa\u00f1amiento real en el proceso',
      trustNoTitle: 'Lo que esto no es',
      trustNo1: 'No vendemos trabajos por p\u00e1ginas',
      trustNo2: 'No prometemos aprobados',
      trustNo3: 'No te soltamos un texto gen\u00e9rico y desaparecemos',
      /* CTA Final */
      ctaTitle: 'Si quieres salir del bloqueo, d\u00e9jame tu email',
      ctaSub: 'Te escribo, veo tu caso y te digo si puedo ayudarte.',
      ctaBtn: 'Quiero ayuda',
      /* Footer */
      footerDisclaimer: 'Este servicio est\u00e1 orientado a acompa\u00f1amiento, estructura y apoyo en el proceso de TFG/TFM.',
      footerRights: '\u00a9 2026 Rescate TFG/TFM. Todos los derechos reservados.',
      /* SEO */
      pageTitle: 'Ayuda TFG TFM | Sal del bloqueo y llega a la entrega',
      metaDesc: 'Ayuda real para estudiantes bloqueados con su TFG o TFM. Estructura, direcci\u00f3n y acompa\u00f1amiento para llegar a una entrega defendible.'
    },
    en: {
      navCta: 'Leave your email',
      heroHeading: 'Running late with your thesis or final project?',
      heroSub: 'If you are stuck, you do not need more theory. You need structure, direction, and someone to help you reach a defendable final submission.',
      heroPos: 'This is not an essay mill. This is not a fake academic service. This is real help to get out of chaos and move forward.',
      formTitle: 'Start here',
      labelEmail: 'Email',
      labelName: 'Name',
      labelType: 'Project type',
      placeholderEmail: 'Your best email',
      placeholderName: 'Your name (optional)',
      selectLabel: 'What do you need?',
      selectOpt1: 'Bachelor final project',
      selectOpt2: 'Master final project',
      selectOpt3: 'I am not sure yet',
      formBtn: 'I want you to contact me',
      formNote: 'I will email you to understand your situation. No spam, no nonsense.',
      formSending: 'Sending...',
      formSuccess: 'Done. I got your email. I will contact you soon to review your case.',
      formError: 'Something went wrong. Please try again in a moment.',
      painTitle: 'If this sounds like you, this page is for you',
      pain1: 'You are running out of time and do not know where to start',
      pain2: 'Your supervisor gives feedback, but you still do not know what to fix',
      pain3: 'You tried ChatGPT and you are still stuck',
      pain4: 'You are not clear on the topic, method, or structure',
      pain5: 'You are stressed because the deadline is getting closer',
      solTitle: 'How we help',
      sol1Title: 'We organise the chaos',
      sol1Text: 'We look at where you are, what is missing, and what is blocking your project.',
      sol2Title: 'We give you direction',
      sol2Text: 'We define the focus, structure, and next steps so you can stop improvising.',
      sol3Title: 'We help you get there',
      sol3Text: 'We support you in turning confusion into a final project you can actually defend.',
      trustYesTitle: 'What this is',
      trustYes1: 'Serious and personal support',
      trustYes2: 'Clear direction',
      trustYes3: 'Real guidance through the process',
      trustNoTitle: 'What this is not',
      trustNo1: 'We do not sell papers by the page',
      trustNo2: 'We do not promise grades',
      trustNo3: 'We do not dump generic text on you and disappear',
      ctaTitle: 'If you want to get unstuck, leave your email',
      ctaSub: 'I will review your situation and tell you if I can help.',
      ctaBtn: 'I want help',
      footerDisclaimer: 'This service is focused on guidance, structure, and support throughout the final project process.',
      footerRights: '\u00a9 2026 Rescate TFG/TFM. All rights reserved.',
      pageTitle: 'Final Project Help | Get unstuck and reach your deadline',
      metaDesc: 'Real support for students stuck with their final thesis or project. Structure, direction, and guidance to reach a defendable submission.'
    }
  };

  /* ---------- State ---------- */
  let currentLang = 'es';

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLangSwitch();
    initScrollReveal();
    initNavScroll();
    initSmoothScroll();
    initForms();
    setLang('es');
  });

  /* ---------- Language Switcher ---------- */
  function initLangSwitch() {
    var btns = document.querySelectorAll('.lang-switch__btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang');
        setLang(lang);
      });
    });
  }

  function setLang(lang) {
    currentLang = lang;
    var copy = COPY[lang];
    if (!copy) return;

    /* Update active button */
    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });

    /* Update all [data-i18n] elements */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (copy[key] !== undefined) {
        el.textContent = copy[key];
      }
    });

    /* Update all [data-i18n-placeholder] elements */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (copy[key] !== undefined) {
        el.setAttribute('placeholder', copy[key]);
      }
    });

    /* Update page title and meta description */
    document.title = copy.pageTitle;
    var metaEl = document.querySelector('meta[name="description"]');
    if (metaEl) {
      metaEl.setAttribute('content', copy.metaDesc);
    }

    /* Update html lang attribute */
    document.documentElement.setAttribute('lang', lang);
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Nav Scroll Effect ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    function checkScroll() {
      nav.classList.toggle('is-scrolled', window.scrollY > 10);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ---------- Smooth Scroll for anchor links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navH = document.querySelector('.nav');
          var offset = navH ? navH.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- Form Handling ---------- */
  function initForms() {
    document.querySelectorAll('.contact-form').forEach(function (form) {
      form.addEventListener('submit', handleFormSubmit);
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var btn = form.querySelector('.form-btn');
    var msgEl = form.querySelector('.form-message');
    var copy = COPY[currentLang];

    /* Get form data */
    var email = form.querySelector('[name="email"]');
    if (!email || !email.value.trim()) {
      showFormMessage(form, 'error', copy.formError);
      return;
    }

    /* Basic email validation */
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      showFormMessage(form, 'error', copy.formError);
      return;
    }

    /* Loading state */
    btn.disabled = true;
    btn.textContent = copy.formSending;
    if (msgEl) {
      msgEl.className = 'form-message';
      msgEl.style.display = 'none';
    }

    /*
     * ===== INTEGRATION POINT =====
     * Replace the setTimeout mock below with your actual form submission.
     *
     * Options:
     *  - Formspree:   fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} })
     *  - Brevo:       POST to Brevo API
     *  - MailerLite:  POST to MailerLite API
     *  - ConvertKit:  POST to ConvertKit API
     *  - Custom:      POST to your backend endpoint
     *
     * See README.md for details.
     * =============================
     */
    setTimeout(function () {
      /* Mock success — replace with real API call */
      btn.disabled = false;
      btn.textContent = copy.formBtn;
      showFormMessage(form, 'success', copy.formSuccess);
      form.reset();
    }, 1200);
  }

  function showFormMessage(form, type, text) {
    var msgEl = form.querySelector('.form-message');
    if (!msgEl) return;
    msgEl.className = 'form-message form-message--' + type;
    msgEl.textContent = text;
    msgEl.style.display = 'block';

    /* Auto-hide after 6 seconds */
    setTimeout(function () {
      msgEl.style.display = 'none';
      msgEl.className = 'form-message';
    }, 6000);
  }

})();
