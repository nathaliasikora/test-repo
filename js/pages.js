/* ============================================
   FAQ ACCORDION
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const faqTriggers = document.querySelectorAll(".faq-trigger");

  faqTriggers.forEach(function (faqTrigger) {
    const faqAnswer = faqTrigger.querySelector(".faq-trigger_content-wrapper");
    const iconWrapper = faqTrigger.querySelector(".faq-trigger-line.vertical");
    const faqSpacing = faqTrigger.querySelector(".faq-trigger-spacing");

    if (!faqAnswer) return;

    gsap.set(faqAnswer, { height: 0, overflow: "hidden" });
    if (iconWrapper) gsap.set(iconWrapper, { opacity: 1 });
    if (faqSpacing) gsap.set(faqSpacing, { height: 0, overflow: "hidden" });

    faqTrigger.addEventListener("click", function () {
      if (faqTrigger.classList.contains("active")) {
        gsap.to(faqAnswer, { height: 0, duration: 0.3, ease: "power2.inOut" });
        if (iconWrapper)
          gsap.to(iconWrapper, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
        if (faqSpacing)
          gsap.to(faqSpacing, { height: 0, duration: 0.3, ease: "power2.inOut" });
        faqTrigger.classList.remove("active");
      } else {
        // Close all others
        faqTriggers.forEach(function (other) {
          const otherAnswer = other.querySelector(".faq-trigger_content-wrapper");
          const otherIcon = other.querySelector(".faq-trigger-line.vertical");
          const otherSpacing = other.querySelector(".faq-trigger-spacing");

          if (other.classList.contains("active")) {
            if (otherAnswer)
              gsap.to(otherAnswer, { height: 0, duration: 0.3, ease: "power2.inOut" });
            if (otherIcon)
              gsap.to(otherIcon, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
            if (otherSpacing)
              gsap.to(otherSpacing, { height: 0, duration: 0.3, ease: "power2.inOut" });
            other.classList.remove("active");
          }
        });

        // Open current
        gsap.set(faqAnswer, { height: "auto" });
        const contentHeight = faqAnswer.offsetHeight;
        gsap.set(faqAnswer, { height: 0 });
        gsap.to(faqAnswer, {
          height: contentHeight,
          duration: 0.3,
          ease: "power2.inOut",
        });
        if (faqSpacing)
          gsap.to(faqSpacing, {
            height: "1.25em",
            duration: 0.3,
            ease: "power2.inOut",
          });
        if (iconWrapper)
          gsap.to(iconWrapper, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
        faqTrigger.classList.add("active");
      }
    });
  });
});

/* ============================================
   PROFILE CARDS ACCORDION
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const profileCards = document.querySelectorAll(".profile-card");

  profileCards.forEach(function (card) {
    const header = card.querySelector(".profile-card-header");
    if (!header) return;

    header.addEventListener("click", function () {
      const wasActive = card.classList.contains("active");

      // Close all
      profileCards.forEach(function (c) {
        c.classList.remove("active");
      });

      // Toggle current
      if (!wasActive) {
        card.classList.add("active");
      }
    });
  });
});

/* ============================================
   QUIZ SLIDER
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".quiz-slide");
  const prevBtn = document.querySelector(".quiz-prev");
  const nextBtn = document.querySelector(".quiz-next");
  let current = 0;

  if (!slides.length || !prevBtn || !nextBtn) return;

  function showSlide(index) {
    slides.forEach((s) => {
      s.classList.remove("active");
      s.style.display = "none";
      s.style.opacity = "0";
    });
    slides[index].style.display = "block";
    requestAnimationFrame(() => {
      slides[index].classList.add("active");
      slides[index].style.opacity = "1";
    });
  }

  prevBtn.addEventListener("click", function () {
    current = current > 0 ? current - 1 : slides.length - 1;
    showSlide(current);
  });

  nextBtn.addEventListener("click", function () {
    current = current < slides.length - 1 ? current + 1 : 0;
    showSlide(current);
  });
});

/* ============================================
   CONTACT FORM
   ============================================ */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.style.display = "none";
      success.style.display = "block";
    });
  }
});
