import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import { formatCurrencyCompact, formatPerCapita, formatPercentage } from "@/lib/formatters"
import type { BudgetSummary } from "@/types/budget"

interface KpiGridProps {
  summary: BudgetSummary
  year: number
}

interface KpiCardProps {
  label: string
  value: string
  unit?: string
  year: number
  source: string
  tooltip: string
}

function KpiCard({ label, value, year, source, tooltip }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <Tooltip>
            <TooltipTrigger className="text-muted-foreground hover:text-foreground" aria-label={`Info: ${label}`}>
              <Info className="h-3.5 w-3.5" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {source} &middot; {year}
        </p>
      </CardContent>
    </Card>
  )
}

export default function KpiGrid({ summary, year }: KpiGridProps) {
  const source = summary.isDemo ? "Demo" : "CONPREL"

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KpiCard
        label="Presupuesto de gastos"
        value={formatCurrencyCompact(summary.totalExpenses)}
        year={year}
        source={source}
        tooltip="Presupuesto total de gastos del municipio para el año seleccionado, según la clasificación económica."
      />
      <KpiCard
        label="Presupuesto de ingresos"
        value={formatCurrencyCompact(summary.totalIncome)}
        year={year}
        source={source}
        tooltip="Presupuesto total de ingresos previstos por el municipio para el año seleccionado."
      />
      <KpiCard
        label="Gasto por habitante"
        value={summary.expensePerCapita ? formatPerCapita(summary.expensePerCapita) : "N/D"}
        year={year}
        source={source}
        tooltip="Resultado de dividir el presupuesto total de gastos entre la población del municipio."
      />
      <KpiCard
        label="Ingreso por habitante"
        value={summary.incomePerCapita ? formatPerCapita(summary.incomePerCapita) : "N/D"}
        year={year}
        source={source}
        tooltip="Resultado de dividir el presupuesto total de ingresos entre la población del municipio."
      />
      <KpiCard
        label="Inversión por habitante"
        value={summary.investmentPerCapita ? formatPerCapita(summary.investmentPerCapita) : "N/D"}
        year={year}
        source={source}
        tooltip="Gasto en inversiones reales (capítulo 6) dividido entre la población."
      />
      {summary.executionPercentage !== null && (
        <KpiCard
          label="Ejecución presupuestaria"
          value={formatPercentage(summary.executionPercentage)}
          year={year}
          source={source}
          tooltip="Porcentaje de las obligaciones reconocidas respecto al presupuesto inicial de gastos."
        />
      )}
      <KpiCard
        label="Año más reciente"
        value={String(year)}
        year={year}
        source={source}
        tooltip="Año del ejercicio presupuestario más reciente cargado para este municipio."
      />
    </div>
  )
}
