# Spadki Hiszpania

Premium bilingual (Polish/Spanish) website for inheritance and donation advisory services targeting Polish residents in Spain.

## Features

- **Bilingual PL/ES** with client-side language switcher (Polish as primary)
- **Mobile-first responsive design** with premium aesthetic (Poland red + Spain gold)
- **Tax calculator** with real CCAA bonification data (2025/2026)
- **SEO optimized** — Schema.org structured data, FAQ schema, OpenGraph, meta tags
- **Lead magnets** — downloadable guides with email capture modal
- **FAQ accordion** with smooth animations
- **Contact form** with WhatsApp integration
- **Cookie consent banner** (GDPR/RGPD compliant)
- **Scroll animations** via IntersectionObserver
- **Zero dependencies** — pure HTML, CSS, JavaScript (no frameworks)

## Key Sections

1. Hero with urgency messaging
2. "What to do" — deadlines and key info cards
3. Process timeline
4. Detailed guides (EU Regulation 650/2012, CCAA bonifications, etc.)
5. CCAA comparison table
6. Interactive tax calculator
7. Free downloadable resources (lead magnets)
8. Testimonials
9. About / Why me
10. FAQ with Schema.org markup
11. Contact form + WhatsApp

## Tech Stack

- Pure HTML5 + CSS3 + Vanilla JS
- Google Fonts (Inter + Playfair Display)
- No build step required
- Performance: minimal JS, CSS variables, no external dependencies

## Structure

```
spadki-hiszpania/
├── index.html          # Main page (all sections)
├── css/styles.css      # Complete stylesheet
├── js/main.js          # Interactive functionality
├── robots.txt          # SEO robots
├── sitemap.xml         # XML sitemap
├── ESTUDIO-MERCADO.md  # Market study document
└── README.md           # This file
```

## Deployment

Static site — deploy to any hosting (Netlify, Vercel, GitHub Pages, traditional hosting).

```bash
# No build step needed. Just serve the files.
npx serve .
```
