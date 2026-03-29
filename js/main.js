/* ============================================
   EXCLUSIVE REFERRAL ACCESS — Main JavaScript
   Form handling, referral validation, email trigger
   ============================================ */

(function () {
  'use strict';

  /* ---------- Config ---------- */
  var CONFIG = {
    submissionDelay: 1500,
    messageAutoHide: 8000,
    emailTemplatePath: 'email/template.html'
  };

  /* ---------- Messages ---------- */
  var MESSAGES = {
    errorEmpty: 'Introduce tu email y el codigo de referido.',
    errorEmail: 'El formato del email no es valido.',
    errorCode: 'El codigo de referido no es valido o ha sido desactivado.',
    success: 'Acceso verificado. Revisa tu bandeja de entrada.',
    sending: 'Verificando...'
  };

  /* ---------- DOM Ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initForm();
    initModal();
  });

  /* ---------- Referral Validation ---------- */
  function validateReferralCode(code) {
    if (!code || typeof REFERRAL_CODES === 'undefined') return null;
    var normalized = code.trim().toUpperCase();
    for (var i = 0; i < REFERRAL_CODES.length; i++) {
      if (REFERRAL_CODES[i].code.toUpperCase() === normalized && REFERRAL_CODES[i].active) {
        return REFERRAL_CODES[i];
      }
    }
    return null;
  }

  /* ---------- Email Validation ---------- */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---------- Form Handling ---------- */
  function initForm() {
    var form = document.getElementById('access-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit(form);
    });
  }

  function handleSubmit(form) {
    var emailInput = form.querySelector('#email');
    var codeInput = form.querySelector('#referral-code');
    var btn = form.querySelector('#submit-btn');
    var msgEl = form.querySelector('#form-message');

    var email = emailInput ? emailInput.value.trim() : '';
    var code = codeInput ? codeInput.value.trim() : '';

    /* Clear previous messages */
    hideMessage(msgEl);

    /* Validate empty fields */
    if (!email || !code) {
      showMessage(msgEl, 'error', MESSAGES.errorEmpty);
      return;
    }

    /* Validate email format */
    if (!isValidEmail(email)) {
      showMessage(msgEl, 'error', MESSAGES.errorEmail);
      return;
    }

    /* Validate referral code */
    var referral = validateReferralCode(code);
    if (!referral) {
      showMessage(msgEl, 'error', MESSAGES.errorCode);
      return;
    }

    /* --- All valid: submit --- */
    setLoading(btn, true);

    /*
     * ===== INTEGRATION POINT =====
     * Replace the setTimeout mock below with your real email trigger.
     *
     * Options:
     *  - Brevo (Sendinblue): POST to Brevo transactional email API
     *  - SendGrid: POST to SendGrid API
     *  - Mailgun: POST to Mailgun API
     *  - Custom backend: POST to your own endpoint
     *
     * Payload to send:
     *  { email: email, referral_code: code, referred_by: referral.name }
     *
     * See README.md for integration details.
     * =============================
     */
    setTimeout(function () {
      setLoading(btn, false);
      showMessage(msgEl, 'success', MESSAGES.success);
      form.reset();

      /* Show email preview (demo mode) */
      showEmailPreview(email, referral);

      /* Log to console for debugging */
      console.log('[REFERRAL SUBMIT]', {
        email: email,
        referral_code: code,
        referred_by: referral.name,
        timestamp: new Date().toISOString()
      });
    }, CONFIG.submissionDelay);
  }

  /* ---------- UI Helpers ---------- */
  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('is-loading', loading);
  }

  function showMessage(el, type, text) {
    if (!el) return;
    el.className = 'form__message form__message--' + type + ' is-visible';
    el.textContent = text;

    if (type === 'success') {
      setTimeout(function () { hideMessage(el); }, CONFIG.messageAutoHide);
    }
  }

  function hideMessage(el) {
    if (!el) return;
    el.className = 'form__message';
    el.textContent = '';
  }

  /* ---------- Email Preview (Demo) ---------- */
  function showEmailPreview(email, referral) {
    var modal = document.getElementById('email-modal');
    var iframe = document.getElementById('email-frame');
    if (!modal || !iframe) return;

    /* Build email HTML with dynamic data */
    var templateUrl = CONFIG.emailTemplatePath +
      '?email=' + encodeURIComponent(email) +
      '&referrer=' + encodeURIComponent(referral.name);

    iframe.src = templateUrl;
    modal.classList.add('is-open');
    modal.removeAttribute('inert');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- Modal ---------- */
  function initModal() {
    var modal = document.getElementById('email-modal');
    var closeBtn = document.getElementById('modal-close');
    var backdrop = document.getElementById('modal-backdrop');

    if (!modal) return;

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('inert', '');
      document.body.style.overflow = '';
      var iframe = document.getElementById('email-frame');
      if (iframe) iframe.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

})();
