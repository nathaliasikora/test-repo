---
name: testing-mvp-impuestos
description: Test the "Donde van mis impuestos locales" MVP end-to-end. Use when verifying UI pages, KPIs, search, compare, salary tables, or static content.
---

# Testing the MVP - Donde van mis impuestos locales

## Prerequisites

- Node.js 18+ and pnpm installed
- Repository cloned and dependencies installed (`pnpm install`)

## Starting the dev server

```bash
cd /home/ubuntu/repos/dondevanmisimpuestos
pnpm dev
# Server starts on http://localhost:3000 (Next.js with Turbopack)
```

The app uses in-memory demo data (no database needed). All 10 municipalities load from seed files on startup.

## Key test flows

### 1. Home page (/)
- Verify hero heading contains "impuestos locales"
- Verify "Datos de demostración" badge
- Verify stats: "10 Municipios cargados", "2023", "100%"
- Test search autocomplete: type partial name (e.g. "Madr") and verify dropdown
- Verify 10 featured municipality cards with population data

### 2. Municipality detail (/municipio/[slug])
- Test with large city (madrid) and small town (caravaca-de-la-cruz)
- Verify KPIs: Presupuesto, Gasto/hab, Ingreso/hab, Inversión/hab
- Verify citizen summary: "de cada 100 € de gasto municipal"
- Click "Tabla" tab to verify expense chapter breakdown (9 chapters)
- Verify salary table rows match seed data (demo-salaries.ts)
- Verify evolution chart (2022-2023) and Comparación rápida section
- Verify data source cards (CONPREL, ISPA, INE)

### 3. Search page (/buscar)
- Verify initial "10 resultados"
- Type a name and click "Buscar" to filter (server-side search, must submit form)
- Verify result count updates and cards show correct data

### 4. Compare page (/comparar)
- Verify empty state message
- Add municipalities via search autocomplete
- Verify comparison table with 9 indicators side-by-side
- Compare values between large and small municipalities

### 5. Static pages (/fuentes, /sobre)
- /fuentes: heading, 3 source cards (CONPREL, ISPA, INE), methodology sections
- /sobre: heading, "no es oficial" disclaimer, mission/independence sections

## Expected data values (from seed files)

Key values for assertions:

| Municipality | Population | Budget 2023 | Gasto/hab | Alcalde salary |
|---|---|---|---|---|
| Madrid | 3,332,035 | ~5.8-5.9 mil M€ | ~1,734 €/hab | 105,422 € |
| Barcelona | 1,636,193 | ~3.3 mil M€ | ~2,044 €/hab | 98,000 € |
| Caravaca | 25,867 | ~24.0 M€ | ~928 €/hab | 42,500 € |

- Budget KPI may show slightly different from seed total due to chapter-level rounding
- All data marked "Demo" and "isDemo: true"
- Salary source files: `seed/demo-salaries.ts`
- Budget source files: `seed/demo-budgets.ts`
- Municipality data: `seed/demo-municipalities.ts`

## Known quirks

- Search on /buscar is server-side: must click "Buscar" button to filter (not live filtering)
- Home search autocomplete is client-side and filters live as you type
- Filter dropdowns on /buscar might show raw "all" text instead of localized labels
- Budget KPI formatting uses compact notation ("mil M€" for billions, "M€" for millions)
- First page load after code changes may show "Compiling..." briefly (Turbopack HMR)
- Navigation from home search autocomplete might not work on first compile; wait for compilation

## Devin Secrets Needed

None - the app runs entirely locally with in-memory demo data, no external services or API keys required.
