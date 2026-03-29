/* ============================================
   REFERRAL CODES — Configuration
   ============================================
   
   HOW TO ADD/REMOVE CODES:
   Each referral code has:
     - code:    The unique code printed on the physical card (case-insensitive)
     - name:    Name of the person who gave the referral (for tracking)
     - active:  true/false — deactivate a code without deleting it
   
   Example: You give "Maria" a card with code "MARIA2026".
   When someone scans the QR and types "MARIA2026", the system
   validates it, records who referred them, and triggers the email.
   ============================================ */

var REFERRAL_CODES = [
  { code: 'RESCATE01',  name: 'Demo Card 1',    active: true },
  { code: 'RESCATE02',  name: 'Demo Card 2',    active: true },
  { code: 'MARIA2026',  name: 'Maria Garcia',   active: true },
  { code: 'CARLOS2026', name: 'Carlos Lopez',   active: true },
  { code: 'ANA2026',    name: 'Ana Martinez',   active: true },
  { code: 'PEDRO2026',  name: 'Pedro Sanchez',  active: true },
  { code: 'LAURA2026',  name: 'Laura Fernandez', active: true },
  { code: 'DISABLED01', name: 'Test Disabled',  active: false }
];
