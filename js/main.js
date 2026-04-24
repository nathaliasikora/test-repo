/* ==========================================================================
   Spadki-Hiszpania — Main JS
   Language switcher, calculator, FAQ, modal, cookie consent, scroll effects
   ========================================================================== */

// ═══════════════════ LANGUAGE SWITCHER ═══════════════════
function setLang(lang) {
  if (lang === 'es') {
    document.body.classList.add('lang-es');
  } else {
    document.body.classList.remove('lang-es');
  }
  document.getElementById('btn-pl').classList.toggle('active', lang === 'pl');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.documentElement.lang = lang;

  // Update placeholders
  var isEs = lang === 'es';
  var nameInputs = document.querySelectorAll('input[name="name"]');
  nameInputs.forEach(function(el) { el.placeholder = isEs ? 'Nombre' : 'Imię i nazwisko'; });
  var emailInputs = document.querySelectorAll('input[name="email"]');
  emailInputs.forEach(function(el) { el.placeholder = isEs ? 'Email' : 'Email'; });
  var msgInputs = document.querySelectorAll('textarea[name="message"]');
  msgInputs.forEach(function(el) { el.placeholder = isEs ? 'Describe tu situación...' : 'Opisz swoją sytuację...'; });

  var dlName = document.getElementById('dlName');
  var dlEmail = document.getElementById('dlEmail');
  if (dlName) dlName.placeholder = isEs ? 'Nombre' : 'Imię';
  if (dlEmail) dlEmail.placeholder = isEs ? 'Email' : 'Email';

  try { localStorage.setItem('spadki-lang', lang); } catch(e) {}

  // Restart hero animations so they play on newly-visible elements
  var heroEls = document.querySelectorAll('.hero-badge, .hero h1, .hero-subtitle, .hero-cta');
  heroEls.forEach(function(el) {
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
  });

  // Re-trigger reveal items that may have been hidden
  var revealItems = document.querySelectorAll('.reveal-item');
  revealItems.forEach(function(item) {
    item.classList.remove('visible');
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries, o) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          o.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealItems.forEach(function(item) { obs.observe(item); });
  }
}

// ═══════════════════ FAQ ACCORDION ═══════════════════
document.addEventListener('DOMContentLoaded', function() {
  // Restore language — URL param takes priority, then localStorage
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var urlLang = urlParams.get('lang');
    var savedLang = localStorage.getItem('spadki-lang');
    if (urlLang === 'es' || urlLang === 'pl') setLang(urlLang);
    else if (savedLang === 'pl') setLang('pl');
    else setLang('es');
  } catch(e) { setLang('es'); }

  // FAQ
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function() {
      var wasActive = item.classList.contains('active');
      faqItems.forEach(function(other) {
        other.classList.remove('active');
        var a = other.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
        var b = other.querySelector('.faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!wasActive) {
        item.classList.add('active');
        var answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Set initial placeholders
  var currentLang = document.body.classList.contains('lang-es') ? 'es' : 'pl';
  setLang(currentLang);

  // Scroll reveal
  var revealItems = document.querySelectorAll('.reveal-item');
  if (revealItems.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealItems.forEach(function(item) { observer.observe(item); });
  }

  // Header scroll effect
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile toggle
  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('navLinks');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var isEs = document.body.classList.contains('lang-es');
      alert(isEs ? 'Gracias. Te contactaremos en 24 horas.' : 'Dziękujemy. Skontaktujemy się w ciągu 24 godzin.');
      contactForm.reset();
    });
  }

  // Download form
  var downloadForm = document.getElementById('downloadForm');
  if (downloadForm) {
    downloadForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name = document.getElementById('dlName').value;
      var email = document.getElementById('dlEmail').value;
      var isEs = document.body.classList.contains('lang-es');
      console.log('Lead magnet download:', { name: name, email: email, resource: currentResource });
      alert(isEs ? '¡Gracias! El material ha sido enviado a tu email.' : 'Dziękujemy! Materiał został wysłany na Twój email.');
      closeModal();
      downloadForm.reset();
    });
  }

  // Cookie banner
  try {
    if (!localStorage.getItem('spadki-cookies')) {
      var banner = document.getElementById('cookieBanner');
      if (banner) {
        setTimeout(function() { banner.classList.add('visible'); }, 1000);
      }
    }
  } catch(e) {}
});

// ═══════════════════ CALCULATOR ═══════════════════
function calculate() {
  var value = parseFloat(document.getElementById('calcValue').value);
  if (!value || value <= 0) {
    var isEs = document.body.classList.contains('lang-es');
    alert(isEs ? 'Introduce un valor válido' : 'Wprowadź prawidłową kwotę');
    return;
  }

  var ccaa = document.getElementById('calcCCAA').value;
  var group = parseInt(document.getElementById('calcGroup').value);

  // Group reductions (art. 20.2 LISD)
  var reductions = { 1: 47859, 2: 15957, 3: 7993, 4: 0 };
  var reduction = reductions[group] || 0;

  // Taxable base after reduction
  var taxBase = Math.max(0, value - reduction);

  // Progressive tax rates (art. 21 LISD - state scale)
  var brackets = [
    { limit: 7993.46, rate: 0.0765, base: 0 },
    { limit: 15980.91, rate: 0.0850, base: 611.50 },
    { limit: 23968.36, rate: 0.0935, base: 1290.43 },
    { limit: 31955.81, rate: 0.1020, base: 2037.26 },
    { limit: 39943.26, rate: 0.1105, base: 2851.98 },
    { limit: 47930.72, rate: 0.1190, base: 3734.59 },
    { limit: 55918.17, rate: 0.1275, base: 4685.10 },
    { limit: 63905.62, rate: 0.1360, base: 5703.50 },
    { limit: 71893.07, rate: 0.1445, base: 6789.79 },
    { limit: 79880.52, rate: 0.1530, base: 7943.98 },
    { limit: 119820.77, rate: 0.1700, base: 9166.06 },
    { limit: 159757.03, rate: 0.1870, base: 15955.94 },
    { limit: 239636.53, rate: 0.2040, base: 23410.88 },
    { limit: 398777.54, rate: 0.2550, base: 39694.83 },
    { limit: 797555.08, rate: 0.2950, base: 80180.77 },
    { limit: Infinity, rate: 0.3400, base: 197735.97 }
  ];

  var tax = 0;
  for (var i = 0; i < brackets.length; i++) {
    if (taxBase <= brackets[i].limit) {
      var prevLimit = i === 0 ? 0 : brackets[i - 1].limit;
      tax = brackets[i].base + (taxBase - prevLimit) * brackets[i].rate;
      break;
    }
  }

  // Group multiplier (art. 22 LISD)
  var multipliers = { 1: 1.0, 2: 1.0, 3: 1.5882, 4: 2.0 };
  var grossTax = tax * (multipliers[group] || 1);

  // CCAA bonifications
  var bonifications = {
    'madrid': 0.99,
    'andalucia': value <= 1000000 ? 0.99 : 0,
    'valencia': 0.99,
    'murcia': 0.99,
    'castilla-leon': 0.99,
    'aragon': 0.99,
    'canarias': 0.999,
    'galicia': 0,
    'cataluna': 0,
    'baleares': 0,
    'pais-vasco': 0.95,
    'asturias': 0,
    'extremadura': 0,
    'cantabria': 0.90,
    'la-rioja': 0.99,
    'navarra': 0,
    'castilla-la-mancha': 0
  };

  var bonif = bonifications[ccaa] || 0;

  // Only apply bonification for groups I and II
  if (group > 2) bonif = 0;

  var bonifAmount = grossTax * bonif;
  var finalTax = Math.max(0, grossTax - bonifAmount);

  // Display result
  var resultEl = document.getElementById('calcResult');
  var amountEl = document.getElementById('calcResultAmount');
  var breakdownEl = document.getElementById('calcBreakdown');
  var isEs = document.body.classList.contains('lang-es');

  amountEl.textContent = formatCurrency(finalTax);
  resultEl.classList.add('visible');

  breakdownEl.innerHTML =
    '<div class="row"><span>' + (isEs ? 'Base imponible' : 'Podstawa opodatkowania') + '</span><span>' + formatCurrency(value) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Reducción por parentesco (Gr. ' + group + ')' : 'Redukcja za pokrewieństwo (Gr. ' + group + ')') + '</span><span>-' + formatCurrency(reduction) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Base liquidable' : 'Podstawa po redukcji') + '</span><span>' + formatCurrency(taxBase) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Cuota íntegra' : 'Podatek brutto') + '</span><span>' + formatCurrency(grossTax) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Bonificación CCAA (' + (bonif * 100).toFixed(1) + '%)' : 'Bonifikacja CCAA (' + (bonif * 100).toFixed(1) + '%)') + '</span><span>-' + formatCurrency(bonifAmount) + '</span></div>' +
    '<div class="row"><span><strong>' + (isEs ? 'IMPUESTO A PAGAR' : 'PODATEK DO ZAPŁATY') + '</strong></span><span><strong>' + formatCurrency(finalTax) + '</strong></span></div>';

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function formatCurrency(val) {
  return val.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
}

// ═══════════════════ MODAL ═══════════════════
var currentResource = '';

function openModal(resource) {
  currentResource = resource;
  var modal = document.getElementById('downloadModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    var titles = {
      'checklist': { pl: 'Pobierz: 7 błędów Polaków', es: 'Descargar: 7 errores de polacos' },
      'modelo650': { pl: 'Pobierz: Modelo 650 krok po kroku', es: 'Descargar: Modelo 650 paso a paso' },
      'bonifikacje': { pl: 'Pobierz: Tabela bonifikacji CCAA', es: 'Descargar: Tabla bonificaciones CCAA' }
    };
    var lang = document.body.classList.contains('lang-es') ? 'es' : 'pl';
    var t = titles[resource] || { pl: 'Pobierz materiał', es: 'Descargar material' };
    var titlePl = document.getElementById('modalTitle');
    var titleEs = document.getElementById('modalTitleEs');
    if (titlePl) titlePl.textContent = t.pl;
    if (titleEs) titleEs.textContent = t.es;
  }
}

function closeModal() {
  var modal = document.getElementById('downloadModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ═══════════════════ COOKIES ═══════════════════
function acceptCookies() {
  try { localStorage.setItem('spadki-cookies', 'accepted'); } catch(e) {}
  var banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('visible');
}

function dismissCookies() {
  try { localStorage.setItem('spadki-cookies', 'rejected'); } catch(e) {}
  var banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('visible');
}
