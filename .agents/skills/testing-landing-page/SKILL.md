# Testing: Rescate TFG/TFM Landing Page

## Overview
Static vanilla HTML/CSS/JS landing page with bilingual (ES/EN) support, email capture forms, and responsive design. No build step, no framework.

## Environment Setup

```bash
cd /home/ubuntu/repos/test-repo
python3 -m http.server 8080 &
# Verify: curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
```

No dependencies to install. Just serve the static files.

## Key Test Flows

### 1. Page Structure (ES default)
- Navigate to http://localhost:8080
- Scroll through all 6 sections: Hero, Pain, Solution, Trust, CTA Final, Footer
- Verify Spanish copy matches the brief

### 2. Language Switcher
- Click EN button in header → all text switches to English
- Click ES button → all text reverts to Spanish
- Check `document.documentElement.lang` updates correctly
- Form placeholders, select options, and button text should all change

### 3. Form Validation & Submission
- Submit with empty email → error message appears (red styling)
- Submit with valid email → button shows "Enviando..."/"Sending..." (disabled) → after 1.2s success message appears (green styling) → form resets
- **Important:** Success message auto-hides after 6 seconds. If testing visually, check quickly or use console to verify:
  ```js
  // After submitting, check message state:
  const msg = document.querySelector('.form-message');
  console.log(msg.style.display, msg.className, msg.textContent);
  ```
- Test in both ES and EN modes

### 4. Responsive Mobile Layout
- Use browser mobile emulation (410px width)
- Verify nav CTA button is hidden (`display: none`)
- Content should stack vertically: hero text above form, solution steps in 1 column
- No horizontal overflow

## Common Pitfalls

### CSS Specificity for Mobile Hiding
If an element has both a utility class (like `.btn`) and a hide class (like `.nav__cta`), the utility class may override `display: none`. Fix by combining selectors: `.nav__cta.btn { display: none; }` instead of just `.nav__cta { display: none; }`.

### Form Success Message Timing
The mock form submission uses `setTimeout(1200)` and the success message auto-hides after `setTimeout(6000)`. When testing programmatically, use a 1.5s delay after submission to check the message, otherwise you may miss it.

### HTML Validation
Run `npx html-validate index.html` before committing. Common issues:
- Redundant ARIA roles on semantic elements (`role="banner"` on `<header>`, `role="contentinfo"` on `<footer>`)
- Inline styles that should be in CSS classes

## Architecture Notes

- All bilingual copy lives in the `COPY` object in `js/main.js` (lines 10-118)
- Language switching uses `data-i18n` attributes on HTML elements
- Form submission handler is at `handleFormSubmit()` in `js/main.js` (line 241) with a clearly marked `INTEGRATION POINT` comment for replacing the mock with a real API call
- CSS uses custom properties defined in `:root` for theming (colors, fonts, spacing)
- Responsive breakpoint is 768px (`@media (min-width: 768px)`)

## Devin Secrets Needed
None — this is a static site with no backend or API keys required for testing.
