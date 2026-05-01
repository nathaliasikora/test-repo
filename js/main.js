/* ============================================
   LENIS SMOOTH SCROLL
   ============================================ */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* ============================================
   PRELOADER
   ============================================ */
(function () {
  const customEase =
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";

  let counter = { value: 99 };
  let loaderDuration = 3.5;

  if (sessionStorage.getItem("visited") !== null) {
    loaderDuration = 2.5;
    counter.value = 50;
  }
  sessionStorage.setItem("visited", "true");

  const loaderNum = document.querySelector(".loader_number");
  const loader = document.querySelector(".loader");

  if (!loader || !loaderNum) return;

  function updateLoaderText() {
    let progress = Math.round(counter.value);
    loaderNum.textContent = progress;
  }

  function endLoaderAnimation() {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        loader.style.display = "none";
        document.body.classList.add("loaded");
      },
    });
  }

  let tl = gsap.timeline({ onComplete: endLoaderAnimation });
  tl.to(counter, {
    value: 1,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase),
  });
})();

/* ============================================
   GSAP SCROLL ANIMATIONS
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Word-by-word reveal on scroll
  const wordElements = document.querySelectorAll('[animate="word"]');
  wordElements.forEach((el) => {
    const split = new SplitText(el, { type: "words", wordsClass: "word" });
    gsap.fromTo(
      split.words,
      { opacity: 0.3 },
      {
        opacity: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 35%",
          scrub: true,
        },
      }
    );
  });

  // Line-by-line slide up reveal
  const lineElements = document.querySelectorAll('[animate="line"]');
  lineElements.forEach((el) => {
    const split = new SplitText(el, { type: "lines", wordsClass: "line" });
    gsap.fromTo(
      split.lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        ease: "power2.out",
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          once: true,
        },
      }
    );
  });

  // Footer letter-by-letter animation
  const footerElements = document.querySelectorAll('[animate="footer-letter"]');
  footerElements.forEach((el) => {
    const split = new SplitText(el, { type: "chars", wordsClass: "char" });
    gsap.fromTo(
      split.chars,
      { y: "-100%" },
      {
        y: "0%",
        ease: "power2.out",
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          once: true,
        },
      }
    );
  });

  // Floating button hide on footer
  if (window.innerWidth > 478) {
    const floatingBtn = document.querySelector(".floating-btn");
    const footer = document.querySelector(".footer-section");

    if (floatingBtn && footer) {
      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        end: "bottom bottom",
        onEnter: () => {
          gsap.to(floatingBtn, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => gsap.set(floatingBtn, { display: "none" }),
          });
        },
        onLeaveBack: () => {
          gsap.set(floatingBtn, { display: "block" });
          gsap.to(floatingBtn, { opacity: 1, duration: 0.3 });
        },
      });
    }
  }

  // Hero entrance animation
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    gsap.from(".hero-line-1", {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 3.8,
      ease: "power3.out",
    });
    gsap.from(".hero-line-2", {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 4.0,
      ease: "power3.out",
    });
    gsap.from(".hero-line-3", {
      y: 60,
      opacity: 0,
      duration: 1,
      delay: 4.2,
      ease: "power3.out",
    });
  }
});

/* ============================================
   MOBILE MENU
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.querySelector(".menu-open-btn");
  const closeBtn = document.querySelector(".menu-close-btn");
  const modal = document.getElementById("modalMenu");

  if (openBtn && modal) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("active");
      });
      lenis.stop();
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
      }, 400);
      lenis.start();
    });
  }
});

/* ============================================
   SWIPER INITIALIZATION
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Method cards swiper
  if (document.querySelector(".method-swiper")) {
    new Swiper(".method-swiper", {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: false,
      speed: 400,
      centeredSlides: false,
    });
  }

  // Reviews swiper
  if (document.querySelector(".home-reviews-swiper")) {
    new Swiper(".home-reviews-swiper", {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: false,
      speed: 400,
      centeredSlides: false,
    });
  }
});
