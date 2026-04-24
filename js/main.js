/* ==========================================================================
   SPADKI-HISZPANIA — Main JavaScript
   Language switcher, calculator, FAQ, animations, forms, cookie banner
   ========================================================================== */

// ---- Language Switcher ----
function setLang(lang) {
  if (lang === 'es') {
    document.body.classList.add('lang-es');
  } else {
    document.body.classList.remove('lang-es');
  }
  document.getElementById('btn-pl').classList.toggle('active', lang === 'pl');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.documentElement.lang = lang;
  try { localStorage.setItem('spadki-lang', lang); } catch(e) {}
}

// Restore language
(function() {
  try {
    var saved = localStorage.getItem('spadki-lang');
    if (saved === 'es') setLang('es');
  } catch(e) {}
})();

// ---- Mobile Menu ----
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('active');
}

// ---- FAQ Accordion ----
function toggleFaq(btn) {
  var item = btn.parentElement;
  var wasActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(function(el) {
    el.classList.remove('active');
    el.querySelector('.faq-answer').style.maxHeight = null;
  });

  // Open clicked if wasn't active
  if (!wasActive) {
    item.classList.add('active');
    var answer = item.querySelector('.faq-answer');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ---- Tax Calculator ----
function calculateTax() {
  var value = parseFloat(document.getElementById('calcValue').value) || 0;
  var ccaa = document.getElementById('calcCCAA').value;
  var group = parseInt(document.getElementById('calcGroup').value) || 2;

  if (value <= 0) {
    alert(document.body.classList.contains('lang-es')
      ? 'Por favor, introduce un valor mayor que 0.'
      : 'Proszę wpisać wartość większą niż 0.');
    return;
  }

  // Reductions by group
  var reductions = { 1: 47859, 2: 15957, 3: 7993, 4: 0 };
  var reduction = reductions[group] || 0;
  var taxableBase = Math.max(0, value - reduction);

  // Progressive rates (state scale)
  var brackets = [
    { limit: 7993.46, rate: 0.0765 },
    { limit: 15980.91, rate: 0.0850 },
    { limit: 23968.36, rate: 0.0935 },
    { limit: 31955.81, rate: 0.1020 },
    { limit: 39943.26, rate: 0.1105 },
    { limit: 47930.72, rate: 0.1190 },
    { limit: 55918.17, rate: 0.1275 },
    { limit: 63905.62, rate: 0.1360 },
    { limit: 71893.07, rate: 0.1445 },
    { limit: 79880.52, rate: 0.1530 },
    { limit: 119820.77, rate: 0.1615 },
    { limit: 159761.03, rate: 0.1870 },
    { limit: 239641.54, rate: 0.2125 },
    { limit: 398402.57, rate: 0.2550 },
    { limit: 797814.33, rate: 0.2975 },
    { limit: Infinity, rate: 0.3400 }
  ];

  var tax = 0;
  var prev = 0;
  for (var i = 0; i < brackets.length; i++) {
    var bracket = brackets[i];
    if (taxableBase <= prev) break;
    var taxable = Math.min(taxableBase, bracket.limit) - prev;
    if (taxable > 0) {
      tax += taxable * bracket.rate;
    }
    prev = bracket.limit;
  }

  // Multiplier by group & pre-existing wealth (simplified)
  var multipliers = { 1: 1.0, 2: 1.0, 3: 1.5882, 4: 2.0 };
  tax *= (multipliers[group] || 1.0);

  // Bonification by CCAA
  var bonif = 0;
  var bonifLabel = '';
  if (group <= 2) {
    switch(ccaa) {
      case 'madrid':    bonif = 0.99; bonifLabel = 'Madrid: 99%'; break;
      case 'valencia':  bonif = 0.99; bonifLabel = 'Valencia: 99%'; break;
      case 'andalucia':
        if (value <= 1000000) { bonif = 0.99; bonifLabel = 'Andaluc\u00eda: 99% (do 1M)'; }
        else { bonif = 0.50; bonifLabel = 'Andaluc\u00eda: ~50% (>1M)'; }
        break;
      case 'murcia':    bonif = 0.99; bonifLabel = 'Murcia: 99%'; break;
      case 'canarias':  bonif = 0.999; bonifLabel = 'Canarias: 99,9%'; break;
      case 'cataluna':  bonif = 0; bonifLabel = 'Catalu\u00f1a: 0%'; break;
      case 'baleares':  bonif = 0.33; bonifLabel = 'Baleares: ~33%'; break;
      default:          bonif = 0; bonifLabel = '-'; break;
    }
  } else if (group === 3) {
    switch(ccaa) {
      case 'madrid': bonif = 0.50; bonifLabel = 'Madrid Gr.III: 50%'; break;
      default: bonif = 0; bonifLabel = '-'; break;
    }
  }

  var taxAfterBonif = tax * (1 - bonif);

  // Display
  var resultEl = document.getElementById('calcResult');
  resultEl.classList.add('visible');
  document.getElementById('calcAmount').textContent = formatCurrency(taxAfterBonif);

  var isEs = document.body.classList.contains('lang-es');
  var breakdown = document.getElementById('calcBreakdown');
  breakdown.innerHTML =
    '<div class="row"><span>' + (isEs ? 'Base imponible' : 'Podstawa opodatkowania') + '</span><span>' + formatCurrency(taxableBase) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Reducci\u00f3n personal' : 'Odliczenie osobiste') + '</span><span>-' + formatCurrency(reduction) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Cuota \u00edntegra' : 'Podatek brutto') + '</span><span>' + formatCurrency(tax) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'Bonificaci\u00f3n' : 'Bonifikacja') + ' (' + bonifLabel + ')</span><span>-' + formatCurrency(tax * bonif) + '</span></div>' +
    '<div class="row"><span>' + (isEs ? 'A PAGAR' : 'DO ZAP\u0141ATY') + '</span><span style="color:var(--red);font-size:1.1rem;">' + formatCurrency(taxAfterBonif) + '</span></div>';
}

function formatCurrency(n) {
  return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ---- Lead Magnet Modal ----
var currentMagnet = '';

function openModal(type) {
  currentMagnet = type;
  document.getElementById('downloadModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('downloadModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.id === 'downloadModal') closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

function handleDownload(e) {
  e.preventDefault();
  var name = document.getElementById('dlName').value;
  var email = document.getElementById('dlEmail').value;

  // In production: send to backend / email service
  console.log('Lead captured:', { name: name, email: email, magnet: currentMagnet });

  var isEs = document.body.classList.contains('lang-es');
  alert(isEs
    ? 'Gracias, ' + name + '. Te enviaremos el material a ' + email + '.'
    : 'Dzi\u0119kujemy, ' + name + '. Wy\u015blemy materia\u0142 na ' + email + '.');

  closeModal();
  document.getElementById('downloadForm').reset();
}

// ---- Contact Form ----
function handleContact(e) {
  e.preventDefault();
  var isEs = document.body.classList.contains('lang-es');
  alert(isEs
    ? 'Gracias por tu mensaje. Nos pondremos en contacto contigo en menos de 24 horas.'
    : 'Dzi\u0119kujemy za wiadomo\u015b\u0107. Skontaktujemy si\u0119 z Tob\u0105 w ci\u0105gu 24 godzin.');
  document.getElementById('contactForm').reset();
}

// ---- Cookie Banner ----
(function() {
  try {
    if (!localStorage.getItem('spadki-cookies')) {
      document.getElementById('cookieBanner').classList.add('visible');
    }
  } catch(e) {
    document.getElementById('cookieBanner').classList.add('visible');
  }
})();

function acceptCookies() {
  try { localStorage.setItem('spadki-cookies', 'accepted'); } catch(e) {}
  document.getElementById('cookieBanner').classList.remove('visible');
}

function rejectCookies() {
  try { localStorage.setItem('spadki-cookies', 'rejected'); } catch(e) {}
  document.getElementById('cookieBanner').classList.remove('visible');
}

// ---- Scroll Animations (Intersection Observer) ----
(function() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.fade-in').forEach(function(el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });
})();

// ---- Navbar scroll effect ----
(function() {
  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)';
    }
  });
})();

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = document.querySelector('.navbar').offsetHeight + 10;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
