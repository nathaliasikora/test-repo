"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SearchFiltersProps {
  provinces: string[]
  autonomousCommunities: string[]
}

const populationRanges = [
  { label: "Todos", value: "all" },
  { label: "Menos de 10.000", value: "0-10000" },
  { label: "10.000 - 50.000", value: "10000-50000" },
  { label: "50.000 - 200.000", value: "50000-200000" },
  { label: "200.000 - 500.000", value: "200000-500000" },
  { label: "Más de 500.000", value: "500000-99999999" },
]

export default function SearchFilters({ provinces, autonomousCommunities }: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/buscar?${params.toString()}`)
  }

  function clearFilters() {
    const q = searchParams.get("q")
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`/buscar?${params.toString()}`)
  }

  const hasFilters = searchParams.has("provincia") || searchParams.has("ccaa") || searchParams.has("poblacion")

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={searchParams.get("provincia") ?? "all"}
        onValueChange={(v: string | null) => updateFilter("provincia", v ?? "all")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Provincia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las provincias</SelectItem>
          {provinces.map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("ccaa") ?? "all"}
        onValueChange={(v: string | null) => updateFilter("ccaa", v ?? "all")}
      >
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Comunidad autónoma" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las CC.AA.</SelectItem>
          {autonomousCommunities.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("poblacion") ?? "all"}
        onValueChange={(v: string | null) => updateFilter("poblacion", v ?? "all")}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Población" />
        </SelectTrigger>
        <SelectContent>
          {populationRanges.map((r) => (
            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="mr-1 h-4 w-4" />
          Limpiar filtros
        </Button>
      )}
    </div>
  )
}
