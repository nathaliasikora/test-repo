import { ExternalLink, Globe, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatNumber } from "@/lib/formatters"
import type { Municipality, DataCompleteness } from "@/types/municipality"

interface MunicipalityHeaderProps {
  municipality: Municipality
  year: number
  dataCompleteness: DataCompleteness
  isDemo: boolean
}

const completenessConfig: Record<DataCompleteness, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  complete: { label: "Datos completos", variant: "default" },
  partial: { label: "Datos parciales", variant: "secondary" },
  pending: { label: "Pendiente de validar", variant: "outline" },
  demo: { label: "Datos de demostración", variant: "secondary" },
}

export default function MunicipalityHeader({ municipality, year, dataCompleteness, isDemo }: MunicipalityHeaderProps) {
  const config = completenessConfig[dataCompleteness]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">{municipality.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            {municipality.province} &middot; {municipality.autonomousCommunity}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge variant={config.variant}>{config.label}</Badge>
            <Badge variant="outline">Año {year}</Badge>
            {municipality.population && (
              <Badge variant="outline">{formatNumber(municipality.population)} habitantes ({municipality.populationYear})</Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {municipality.officialWebsiteUrl && (
            <a href={municipality.officialWebsiteUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Globe className="mr-1 h-4 w-4" />
              Web oficial
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
          {municipality.transparencyPortalUrl && (
            <a href={municipality.transparencyPortalUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <Eye className="mr-1 h-4 w-4" />
              Transparencia
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </div>

      {isDemo && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-800">
            Datos de demostración. Sustituir por importación oficial.
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Las cifras mostradas son ilustrativas y no representan datos oficiales.
          </p>
        </div>
      )}
    </div>
  )
}
