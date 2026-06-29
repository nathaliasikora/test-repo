import type { Metadata } from "next"
import { Suspense } from "react"
import { searchMunicipalities, getProvinces, getAutonomousCommunities } from "@/lib/data"
import MunicipalitySearch from "@/components/search/MunicipalitySearch"
import SearchFilters from "@/components/search/SearchFilters"
import SearchResultCard from "@/components/search/SearchResultCard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Buscador de municipios",
  description:
    "Busca tu municipio por nombre, provincia o comunidad autónoma y consulta sus datos presupuestarios.",
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const q = typeof params.q === "string" ? params.q : undefined
  const provincia = typeof params.provincia === "string" ? params.provincia : undefined
  const ccaa = typeof params.ccaa === "string" ? params.ccaa : undefined
  const poblacion = typeof params.poblacion === "string" ? params.poblacion : undefined

  let minPop: number | undefined
  let maxPop: number | undefined
  if (poblacion && poblacion !== "all") {
    const [min, max] = poblacion.split("-").map(Number)
    minPop = min
    maxPop = max
  }

  const results = searchMunicipalities({
    search: q,
    province: provincia,
    autonomousCommunity: ccaa,
    minPopulation: minPop,
    maxPopulation: maxPop,
  })

  const provinces = getProvinces()
  const communities = getAutonomousCommunities()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Buscador de municipios</h1>
      <p className="mt-2 text-muted-foreground">
        Encuentra tu municipio y consulta sus datos presupuestarios.
      </p>

      <div className="mt-8 space-y-4">
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <MunicipalitySearch />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <SearchFilters provinces={provinces} autonomousCommunities={communities} />
        </Suspense>
      </div>

      <div className="mt-8">
        <p className="mb-4 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "resultado" : "resultados"}
          {q ? ` para "${q}"` : ""}
        </p>

        {results.length === 0 ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-lg font-medium">No se encontraron municipios</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Prueba con otro nombre, provincia o ajusta los filtros.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((m) => (
              <SearchResultCard key={m.id} municipality={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
