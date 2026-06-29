import Link from "next/link"
import { ArrowRight, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatCurrencyCompact, formatNumber, formatPerCapita } from "@/lib/formatters"
import type { MunicipalitySearchResult } from "@/types/municipality"

interface SearchResultCardProps {
  municipality: MunicipalitySearchResult
}

const completenessLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  complete: { label: "Datos completos", variant: "default" },
  partial: { label: "Datos parciales", variant: "secondary" },
  pending: { label: "Pendiente", variant: "outline" },
  demo: { label: "Demo", variant: "secondary" },
}

export default function SearchResultCard({ municipality }: SearchResultCardProps) {
  const completeness = completenessLabels[municipality.dataCompleteness] ?? completenessLabels.pending

  return (
    <Card className="transition-colors hover:border-primary/30">
      <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{municipality.name}</h3>
            <Badge variant={completeness.variant} className="text-xs">
              {completeness.label}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {municipality.province} &middot; {municipality.autonomousCommunity}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
            {municipality.population && (
              <span>{formatNumber(municipality.population)} habitantes</span>
            )}
            {municipality.totalBudget && (
              <span>Presupuesto: {formatCurrencyCompact(municipality.totalBudget)}</span>
            )}
            {municipality.expensePerCapita && (
              <span>Gasto/hab.: {formatPerCapita(municipality.expensePerCapita)}</span>
            )}
            {municipality.latestYear && (
              <span className="text-muted-foreground">Año: {municipality.latestYear}</span>
            )}
          </div>

          {municipality.dataCompleteness === "demo" && (
            <div className="mt-2 flex items-center gap-1 text-xs text-amber-600">
              <AlertCircle className="h-3 w-3" />
              <span>Datos de demostración</span>
            </div>
          )}
        </div>

        <Link href={`/municipio/${municipality.slug}`} className={buttonVariants({ variant: "outline", size: "sm" }) + " shrink-0"}>
          Ver detalle
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
