import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getMunicipalityBySlug,
  getBudgetSummary,
  getSalaries,
  getLatestYear,
  getBudgetEvolution,
  getProvinceAverage,
  getAllMunicipalities,
} from "@/lib/data"
import { generateCitizenSummary } from "@/lib/calculations/budget"
import { formatPerCapita } from "@/lib/formatters"
import MunicipalityHeader from "@/components/municipality/MunicipalityHeader"
import KpiGrid from "@/components/municipality/KpiGrid"
import BudgetChapterTable from "@/components/municipality/BudgetChapterTable"
import SalaryTable from "@/components/municipality/SalaryTable"
import CitizenSummary from "@/components/municipality/CitizenSummary"
import DataSourceCard from "@/components/municipality/DataSourceCard"
import HorizontalBarChart from "@/components/charts/HorizontalBarChart"
import DonutChart from "@/components/charts/DonutChart"
import EvolutionChart from "@/components/charts/EvolutionChart"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const municipality = getMunicipalityBySlug(slug)

  if (!municipality) {
    return { title: "Municipio no encontrado" }
  }

  return {
    title: `Presupuesto municipal de ${municipality.name}`,
    description: `Descubre dónde van tus impuestos en ${municipality.name} (${municipality.province}). Presupuesto, gasto por habitante, principales partidas y retribuciones públicas.`,
    openGraph: {
      title: `Presupuesto municipal de ${municipality.name}: dónde van tus impuestos locales`,
      description: `Datos presupuestarios de ${municipality.name}. Consulta gasto por habitante, distribución por capítulos y retribuciones públicas.`,
    },
  }
}

export function generateStaticParams() {
  return getAllMunicipalities().map((m) => ({ slug: m.slug }))
}

export default async function MunicipalityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const municipality = getMunicipalityBySlug(slug)

  if (!municipality) notFound()

  const latestYear = getLatestYear(municipality.id)
  if (!latestYear) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <MunicipalityHeader
          municipality={municipality}
          year={0}
          dataCompleteness="pending"
          isDemo={false}
        />
        <div className="mt-8 rounded-lg border bg-card p-8 text-center">
          <p className="text-lg font-medium">No hay datos presupuestarios disponibles</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Este municipio todavía no tiene datos cargados en el sistema.
          </p>
        </div>
      </div>
    )
  }

  const summary = getBudgetSummary(municipality.id, latestYear)
  if (!summary) notFound()

  const salaries = getSalaries(municipality.id)
  const evolution = getBudgetEvolution(municipality.id)
  const provinceAvg = getProvinceAverage(municipality.province, latestYear)
  const citizenText = generateCitizenSummary(summary.expenseChapters, municipality.name)

  const dataCompleteness = summary.isDemo ? "demo" as const : salaries.length > 0 ? "complete" as const : "partial" as const

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <MunicipalityHeader
        municipality={municipality}
        year={latestYear}
        dataCompleteness={dataCompleteness}
        isDemo={summary.isDemo}
      />

      <div className="mt-8">
        <CitizenSummary summary={citizenText} />
      </div>

      <section className="mt-8" aria-labelledby="kpis-heading">
        <h2 id="kpis-heading" className="sr-only">Indicadores principales</h2>
        <KpiGrid summary={summary} year={latestYear} />
      </section>

      <Separator className="my-10" />

      {/* Expense breakdown */}
      <section aria-labelledby="expenses-heading">
        <h2 id="expenses-heading" className="text-xl font-bold">Gasto por capítulos económicos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Distribución del presupuesto de gastos según la clasificación económica (Orden EHA/3565/2008).
        </p>

        {summary.expenseChapters.length > 0 ? (
          <>
            <p className="mt-4 text-sm text-muted-foreground italic">
              La partida más grande es {summary.expenseChapters[0].chapterName}, que representa
              el {summary.expenseChapters[0].percentageOfTotal.toFixed(1).replace(".", ",")}% del presupuesto municipal.
            </p>

            <Tabs defaultValue="charts" className="mt-6">
              <TabsList>
                <TabsTrigger value="charts">Gráficos</TabsTrigger>
                <TabsTrigger value="table">Tabla</TabsTrigger>
              </TabsList>
              <TabsContent value="charts" className="mt-4">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <HorizontalBarChart data={summary.expenseChapters} title="Gastos por capítulo (barras)" />
                  <DonutChart data={summary.expenseChapters} title="Distribución del gasto" />
                </div>
              </TabsContent>
              <TabsContent value="table" className="mt-4">
                <BudgetChapterTable chapters={summary.expenseChapters} title="Desglose de gastos por capítulo económico" />
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="mt-4 rounded-lg border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">No hay datos de gastos disponibles para este municipio.</p>
          </div>
        )}
      </section>

      <Separator className="my-10" />

      {/* Income breakdown */}
      <section aria-labelledby="income-heading">
        <h2 id="income-heading" className="text-xl font-bold">Ingresos principales</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Los ingresos municipales pueden venir de impuestos locales, tasas, transferencias de otras administraciones, deuda u otras fuentes.
        </p>

        {summary.incomeChapters.length > 0 ? (
          <Tabs defaultValue="charts" className="mt-6">
            <TabsList>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="table">Tabla</TabsTrigger>
            </TabsList>
            <TabsContent value="charts" className="mt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <HorizontalBarChart data={summary.incomeChapters} title="Ingresos por capítulo (barras)" />
                <DonutChart data={summary.incomeChapters} title="Distribución de ingresos" />
              </div>
            </TabsContent>
            <TabsContent value="table" className="mt-4">
              <BudgetChapterTable chapters={summary.incomeChapters} title="Desglose de ingresos por capítulo económico" />
            </TabsContent>
          </Tabs>
        ) : (
          <div className="mt-4 rounded-lg border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">No hay datos de ingresos disponibles.</p>
          </div>
        )}
      </section>

      <Separator className="my-10" />

      {/* Salaries */}
      <SalaryTable
        salaries={salaries}
        municipalityName={municipality.name}
        year={latestYear}
        isDemo={summary.isDemo}
      />

      <Separator className="my-10" />

      {/* Evolution */}
      <section aria-labelledby="evolution-heading">
        <h2 id="evolution-heading" className="text-xl font-bold">Evolución temporal</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Comparación del presupuesto a lo largo de los años disponibles.
        </p>
        <div className="mt-6">
          <EvolutionChart data={evolution} title="Evolución de gastos e ingresos" />
        </div>
      </section>

      <Separator className="my-10" />

      {/* Comparison */}
      <section aria-labelledby="comparison-heading">
        <h2 id="comparison-heading" className="text-xl font-bold">Comparación rápida</h2>
        {provinceAvg.avgExpensePerCapita ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Gasto/habitante de {municipality.name}</p>
              <p className="mt-1 text-xl font-bold">
                {summary.expensePerCapita ? formatPerCapita(summary.expensePerCapita) : "N/D"}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Media de la provincia de {municipality.province}</p>
              <p className="mt-1 text-xl font-bold">
                {formatPerCapita(provinceAvg.avgExpensePerCapita)}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-lg border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Comparación no disponible todavía para este municipio.
            </p>
          </div>
        )}
      </section>

      <Separator className="my-10" />

      {/* Sources */}
      <DataSourceCard isDemo={summary.isDemo} year={latestYear} />
    </div>
  )
}
