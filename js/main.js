/* ============================================================
   FUNDACJA RODZINNA × ESPAÑA — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initFAQ();
  initCalculator();
  initScrollIndicator();
  initBackToTop();
  initMobileMenu();
  initSmoothScroll();
});

/* ---------- NAVIGATION ---------- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---------- MOBILE MENU ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---------- FAQ ACCORDION ---------- */
function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
      
      // Toggle current
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ---------- TAX CALCULATOR ---------- */
function initCalculator() {
  const calcBtn = document.getElementById('calc-btn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const propertyValue = parseFloat(document.getElementById('calc-value').value) || 0;
    const monthlyRent = parseFloat(document.getElementById('calc-rent').value) || 0;
    const region = document.getElementById('calc-region').value;

    if (propertyValue <= 0) return;

    // ITP rates by region
    const itpRates = {
      'andalucia': 0.07,
      'cataluna': 0.10,
      'madrid': 0.06,
      'valencia': 0.10,
      'baleares': 0.08,
      'canarias': 0.065,
      'other': 0.08
    };

    const itpRate = itpRates[region] || 0.08;
    const itp = propertyValue * itpRate;
    
    // Notary + Registry (approx)
    const notaryRegistry = propertyValue * 0.015;
    
    // Total purchase costs
    const totalPurchase = itp + notaryRegistry;

    // Annual IBI (estimate: 0.7% of ~50% market value as cadastral)
    const cadastralValue = propertyValue * 0.5;
    const ibi = cadastralValue * 0.007;

    // Annual IRNR
    let irnr = 0;
    if (monthlyRent > 0) {
      // Rental income - EU resident can deduct ~30% expenses
      const annualRent = monthlyRent * 12;
      const deductibleExpenses = annualRent * 0.30;
      const taxableBase = annualRent - deductibleExpenses;
      irnr = taxableBase * 0.19;
    } else {
      // Imputed income
      const imputedBase = cadastralValue * 0.011;
      irnr = imputedBase * 0.19;
    }

    // CIT Poland on distribution (15%)
    const netAfterSpain = (monthlyRent > 0 ? monthlyRent * 12 : 0) - irnr - ibi;
    const citPoland = netAfterSpain > 0 ? netAfterSpain * 0.15 : 0;

    // Display results
    const results = document.querySelector('.calculator__results');
    results.classList.add('visible');

    document.getElementById('res-itp').textContent = formatCurrency(itp);
    document.getElementById('res-notary').textContent = formatCurrency(notaryRegistry);
    document.getElementById('res-total-purchase').textContent = formatCurrency(totalPurchase);
    document.getElementById('res-ibi').textContent = formatCurrency(ibi) + '/año';
    document.getElementById('res-irnr').textContent = formatCurrency(irnr) + '/año';
    document.getElementById('res-cit').textContent = formatCurrency(citPoland) + '/año';
    
    const totalAnnual = ibi + irnr + citPoland;
    document.getElementById('res-total-annual').textContent = formatCurrency(totalAnnual) + '/año';
    
    if (monthlyRent > 0) {
      const effectiveRate = ((irnr + citPoland) / (monthlyRent * 12)) * 100;
      document.getElementById('res-effective').textContent = effectiveRate.toFixed(1) + '%';
    } else {
      document.getElementById('res-effective').textContent = 'N/A';
    }
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/* ---------- SCROLL INDICATOR ---------- */
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    indicator.style.width = scrolled + '%';
  }, { passive: true });
}

/* ---------- BACK TO TOP ---------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
