import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface DataSource {
  name: string
  description: string
  url: string | null
  year: number
  importDate: string
  limitations: string
}

interface DataSourceCardProps {
  isDemo: boolean
  year: number
}

export default function DataSourceCard({ isDemo, year }: DataSourceCardProps) {
  const sources: DataSource[] = [
    {
      name: "CONPREL - Ministerio de Hacienda",
      description: "Presupuestos y liquidaciones de entidades locales. Clasificación económica de gastos e ingresos.",
      url: "https://serviciostelematicosext.hacienda.gob.es/SGFAL/CONPREL",
      year,
      importDate: isDemo ? "N/A (datos demo)" : "2024-01-15",
      limitations: "Los datos pueden no incluir todos los municipios. Depende de la información remitida por cada entidad local.",
    },
    {
      name: "ISPA - Retribuciones de cargos electos",
      description: "Informes anuales de retribuciones de cargos electos y empleados públicos de entidades locales.",
      url: "https://digital.gob.es/funcion-publica/dgfp/espacio-ispa/estadisticas",
      year,
      importDate: isDemo ? "N/A (datos demo)" : "2024-01-15",
      limitations: "Puede haber municipios sin información remitida o con campos no homogéneos según año.",
    },
    {
      name: "INE - Población municipal",
      description: "Cifras oficiales de población resultantes de la revisión del padrón municipal.",
      url: "https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177011&menu=resultados&secc=1254736195461&idp=1254734710990",
      year,
      importDate: isDemo ? "N/A (datos demo)" : "2024-01-15",
      limitations: "Las cifras de población corresponden al año indicado y pueden diferir del año presupuestario.",
    },
  ]

  return (
    <section aria-labelledby="sources-heading">
      <h3 id="sources-heading" className="text-lg font-semibold">Fuentes y metodología</h3>
      <div className="mt-4 space-y-3">
        {sources.map((source) => (
          <Card key={source.name}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-medium text-sm">{source.name}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{source.description}</p>
                </div>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-primary hover:text-primary/80"
                    aria-label={`Enlace oficial a ${source.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>Año: {source.year}</span>
                <span>Importación: {source.importDate}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground italic">{source.limitations}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isDemo && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs font-medium text-amber-800">
            Los datos actualmente mostrados son de demostración y no proceden de las fuentes indicadas.
            Sustituir por importación oficial para datos reales.
          </p>
        </div>
      )}
    </section>
  )
}
