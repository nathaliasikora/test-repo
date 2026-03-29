# Rescate TFG/TFM — Landing Page

Landing page de captacion para estudiantes bloqueados con su TFG o TFM. Minimalista, bilingue (ES/EN), orientada a conversion.

## Estructura

```
index.html          — pagina principal
css/style.css       — estilos
js/main.js          — idioma, formulario, scroll
images/             — logo SVG y favicon
```

## Como usar

Abrir `index.html` en cualquier navegador. No requiere servidor ni build.

## Cambiar el endpoint del formulario

En `js/main.js`, buscar el comentario `INTEGRATION POINT` dentro de la funcion `handleFormSubmit`. Reemplazar el bloque `setTimeout` con tu integracion real:

```js
// Formspree
fetch('https://formspree.io/f/TU_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
}).then(function(r) {
  if (r.ok) { showFormMessage(form, 'success', copy.formSuccess); form.reset(); }
  else { showFormMessage(form, 'error', copy.formError); }
}).finally(function() { btn.disabled = false; btn.textContent = copy.formBtn; });

// Brevo / MailerLite / ConvertKit
// POST al endpoint de la API correspondiente con los datos del formulario
```

## Cambiar textos

Todos los textos estan centralizados en el objeto `COPY` al principio de `js/main.js`. Cada idioma (`es`, `en`) tiene sus propias claves. Para cambiar un texto, editar el valor de la clave correspondiente.

## Cambiar email de contacto

Buscar `info@rescatetfg.com` en `index.html` (footer) y sustituir por el email real.

## Cambiar colores

Todas las variables de color estan en `:root` al principio de `css/style.css`:
- `--color-accent`: color principal de CTAs (dorado)
- `--color-dark`: color oscuro base
- `--color-bg`: fondo

## Tecnologia

HTML + CSS + JS vanilla. Sin dependencias externas (solo Google Fonts).
