# Kasia Siwosz - Life Coach Website Clone

A faithful replica of [kasiasiwosz.com](https://www.kasiasiwosz.com/) built with pure HTML, CSS, and JavaScript.

## Tech Stack

- **Fonts**: [Satoshi](https://www.fontshare.com/fonts/satoshi) via Fontshare
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) v1.3.8
- **Animations**: [GSAP](https://gsap.com/) v3.15.0 with ScrollTrigger, SplitText, CustomEase
- **Carousels**: [Swiper](https://swiperjs.com/) v11
- **No build tools** - Pure static site

## Features Replicated

- Word-by-word text reveal on scroll (GSAP SplitText + ScrollTrigger)
- Line-by-line slide-up animations
- Character-by-character footer brand animation
- Lenis smooth scrolling with custom easing
- Preloader with countdown animation
- Mix-blend-mode navigation overlay
- Responsive design (desktop, tablet, mobile)
- FAQ accordion with GSAP animations
- Swiper carousels for method cards and testimonials
- Floating CTA button that hides on footer
- Mobile menu with overlay
- Image hover zoom effects

## Pages

- `/index.html` - Homepage
- `/pages/coaching.html` - Coaching services
- `/pages/about.html` - About Kasia
- `/pages/testimonials.html` - Client testimonials
- `/pages/contact.html` - Contact form
- `/pages/legal.html` - Terms, Privacy & Cookies

## Running Locally

Simply open `index.html` in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Structure

```
├── index.html          # Homepage
├── css/
│   ├── style.css       # Main styles
│   └── pages.css       # Subpage-specific styles
├── js/
│   ├── main.js         # Core JS (Lenis, GSAP animations, preloader)
│   └── pages.js        # Page-specific JS (FAQ, quiz slider, forms)
├── pages/
│   ├── coaching.html
│   ├── about.html
│   ├── testimonials.html
│   ├── contact.html
│   └── legal.html
└── README.md
```
