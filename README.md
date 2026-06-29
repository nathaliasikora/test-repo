# Dónde van mis impuestos locales

Herramienta de transparencia presupuestaria municipal. Datos oficiales de Hacienda para que cualquier ciudadano pueda buscar su municipio y entender su presupuesto, gasto por habitante, principales partidas y retribuciones públicas disponibles.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **TypeScript** estricto
- **Tailwind CSS 4** + **shadcn/ui** (base-ui)
- **Recharts** para gráficos
- **Prisma** + PostgreSQL (schema preparado, MVP funciona sin BD)
- Datos demo en memoria para desarrollo rápido

## Inicio rápido

```bash
# 1. Clonar e instalar
git clone <repo-url> && cd dondevanmisimpuestos
pnpm install

# 2. Arrancar dev server
pnpm dev
# Abrir http://localhost:3000
```

No se necesita base de datos para el MVP. Los datos demo se cargan en memoria.

## Estructura de carpetas

```
app/                          # Páginas Next.js (App Router)
  page.tsx                    # Home: hero, buscador, stats, municipios destacados
  buscar/page.tsx             # Buscador con filtros
  municipio/[slug]/page.tsx   # Dashboard de municipio (KPIs, gráficos, sueldos)
  comparar/page.tsx           # Comparar hasta 3 municipios
  fuentes/page.tsx            # Fuentes y metodología
  sobre/page.tsx              # Sobre el proyecto
  not-found.tsx               # 404

components/
  layout/                     # Header, Footer
  search/                     # HomeSearch, MunicipalitySearch, SearchFilters, SearchResultCard
  charts/                     # HorizontalBarChart, DonutChart, EvolutionChart
  municipality/               # MunicipalityHeader, KpiGrid, BudgetChapterTable,
                              # SalaryTable, CitizenSummary, DataSourceCard, DataQualityNotice
  ui/                         # shadcn/ui primitivos

lib/
  calculations/budget.ts      # Cálculos: per cápita, capítulos, evolución, resumen ciudadano
  formatters/index.ts         # Formato: moneda, números, porcentajes
  data/index.ts               # Capa de acceso a datos (demo en memoria)
  utils.ts                    # cn() helper

seed/                         # Datos demo
  demo-municipalities.ts      # 10 municipios con datos reales INE
  demo-budgets.ts             # Presupuestos 2022-2023 (distribución realista)
  demo-salaries.ts            # Retribuciones de cargos electos

scripts/import/               # Scripts de importación
  import-municipalities.ts    # Importar municipios desde CSV (INE)
  import-budgets.ts           # Importar presupuestos desde CSV (CONPREL)
  import-salaries.ts          # Importar retribuciones desde CSV (ISPA)
  validate-import.ts          # Validar consistencia de datos importados

prisma/
  schema.prisma               # Schema PostgreSQL normalizado

types/                        # Interfaces TypeScript
  municipality.ts
  budget.ts
  salary.ts
```

## Datos demo incluidos

El MVP incluye 10 municipios con datos de demostración para 2022 y 2023:

| Municipio | Provincia | Población | Presupuesto aprox. |
|---|---|---|---|
| Madrid | Madrid | 3.332.035 | 5.900 M€ |
| Barcelona | Barcelona | 1.636.193 | 3.400 M€ |
| Valencia | Valencia | 792.492 | 1.000 M€ |
| Sevilla | Sevilla | 681.998 | 850 M€ |
| Zaragoza | Zaragoza | 674.997 | 780 M€ |
| Málaga | Málaga | 578.460 | 620 M€ |
| Valladolid | Valladolid | 298.412 | 280 M€ |
| Vigo | Pontevedra | 293.837 | 265 M€ |
| Alcobendas | Madrid | 118.353 | 175 M€ |
| Caravaca de la Cruz | Murcia | 25.089 | 24,5 M€ |

Todos los datos demo están marcados con `isDemo: true`. Las cifras son realistas pero ilustrativas.

## Importación de datos reales

Para sustituir los datos demo por datos oficiales:

```bash
# Importar municipios desde CSV del INE
pnpm import:municipalities --file datos/municipios.csv

# Importar presupuestos desde CSV normalizado de CONPREL
pnpm import:budgets --file datos/presupuestos_2023.csv --year 2023

# Importar retribuciones desde CSV normalizado de ISPA
pnpm import:salaries --file datos/retribuciones_2023.csv --year 2023

# Validar consistencia
pnpm import:validate --year 2023
```

Los scripts de importación esperan CSVs normalizados. Ver comentarios en cada script para el formato esperado.

### Fuentes oficiales

- **CONPREL** (Ministerio de Hacienda): presupuestos y liquidaciones de entidades locales
  https://serviciostelematicosext.hacienda.gob.es/SGFAL/CONPREL
- **ISPA**: retribuciones de cargos electos y empleados públicos
  https://digital.gob.es/funcion-publica/dgfp/espacio-ispa/estadisticas
- **INE**: cifras oficiales de población municipal
  https://www.ine.es

## Base de datos (fase 2)

El schema de Prisma está preparado para PostgreSQL. Para activarlo:

```bash
# Crear .env con DATABASE_URL
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/impuestos"' > .env

# Ejecutar migraciones
pnpm prisma migrate dev --name init

# Generar cliente
pnpm prisma generate
```

## Comandos

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm start` | Servidor de producción |
| `pnpm lint` | ESLint |
| `pnpm import:municipalities` | Importar municipios |
| `pnpm import:budgets` | Importar presupuestos |
| `pnpm import:salaries` | Importar retribuciones |
| `pnpm import:validate` | Validar importaciones |

## Principios

- **No inventar datos oficiales**: solo datos demo (marcados) o importaciones oficiales.
- **Transparencia de fuentes**: cada dato indica fuente, año y limitaciones.
- **Sin juicios de valor**: presentar datos sin sensacionalismo ni interpretaciones.
- **Limitaciones visibles**: cuando faltan datos, se indica claramente.
- **Accesibilidad**: HTML semántico, ARIA labels, navegación por teclado.

## Licencia

Pendiente de definir.
