# Rescate TFG/TFM — Funnel Exclusivo por Referidos

Sistema de acceso privado por invitacion para un servicio premium de acompanamiento academico (TFG/TFM).

## Concepto

La web **no explica el servicio**. Solo muestra un formulario minimalista donde el usuario introduce su email y un codigo de referido que recibio en una tarjeta fisica (con QR).

Al enviar el formulario:
1. Se valida el codigo de referido contra la lista de codigos activos
2. Se dispara un email automatico que explica el servicio, precios y como funciona
3. El email incluye un CTA para aceptar condiciones y pagar (pasarela Stripe)

## Estructura

```
index.html              → Pagina principal (ultra-minimalista, oscura)
css/style.css           → Estilos premium dark
js/referrals.js         → Codigos de referido (configurables)
js/main.js              → Logica del formulario y validacion
email/template.html     → Template HTML del email que recibe el usuario
images/                 → Favicon y logos
```

## Configuracion

### 1. Codigos de referido

Edita `js/referrals.js` para anadir/quitar/desactivar codigos:

```javascript
var REFERRAL_CODES = [
  { code: 'MARIA2026',  name: 'Maria Garcia',   active: true },
  { code: 'CARLOS2026', name: 'Carlos Lopez',   active: true },
  { code: 'OLDCODE',    name: 'Ya no activo',   active: false }  // Desactivado
];
```

Cada codigo tiene:
- `code` — El texto que va en la tarjeta fisica (case-insensitive)
- `name` — Quien dio la recomendacion (para tracking)
- `active` — `true`/`false` para activar/desactivar sin borrar

### 2. Pasarela de pago (Stripe)

En `email/template.html`, busca el enlace del boton "Aceptar condiciones y reservar" y reemplazalo con tu Stripe Checkout link:

```html
<a href="https://checkout.stripe.com/pay/TU_ID_AQUI" class="cta-btn">
  Aceptar condiciones y reservar
</a>
```

### 3. Envio de emails (Brevo / SendGrid / etc.)

En `js/main.js`, busca el comentario `INTEGRATION POINT` y reemplaza el `setTimeout` mock con tu API de email real. Payload sugerido:

```javascript
fetch('https://api.brevo.com/v3/smtp/email', {
  method: 'POST',
  headers: {
    'api-key': 'TU_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sender: { name: 'Rescate TFG', email: 'info@rescatetfg.com' },
    to: [{ email: email }],
    subject: 'Tu acceso ha sido verificado',
    htmlContent: '...' // Contenido del email/template.html
  })
})
```

> **Nota:** Para produccion, el envio de emails debe hacerse desde un backend (no client-side) para proteger la API key.

### 4. Precios

Edita los precios directamente en `email/template.html` (seccion de pricing).

Precios actuales:
- TFG: 900 EUR
- TFM: 1.400 EUR
- Casos complejos/urgentes: hasta 2.000 EUR

## Desarrollo local

```bash
# Servir con cualquier servidor estatico
python3 -m http.server 8080

# Abrir en navegador
open http://localhost:8080
```

Codigos de prueba: `RESCATE01`, `RESCATE02`

## Tarjetas fisicas

Las tarjetas deben incluir:
1. Un codigo QR que apunte a la URL de la web
2. El codigo de referido impreso (ej: "MARIA2026")
3. Diseno acorde al branding premium/oscuro

## Flujo completo

```
Tarjeta QR → Web minimalista → Email + codigo referido
                                        ↓
                              Validacion de codigo
                                        ↓
                              Email automatico (explica servicio + precios)
                                        ↓
                              CTA: Aceptar condiciones
                                        ↓
                              Stripe Checkout (pago)
                                        ↓
                              Lista de espera / Confirmacion
```
