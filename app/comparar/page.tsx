"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { X, Plus, Search } from "lucide-react"
import { formatCurrencyCompact, formatPerCapita, formatNumber, formatPercentage } from "@/lib/formatters"
import { getAllMunicipalities, getBudgetSummary, getSalaries, getLatestYear } from "@/lib/data"
import type { Municipality } from "@/types/municipality"
import type { BudgetSummary } from "@/types/budget"

interface SelectedMunicipality {
  municipality: Municipality
  summary: BudgetSummary | null
  year: number | null
  mayorSalary: number | null
}

export default function CompararPage() {
  const allMunicipalities = getAllMunicipalities()
  const [selected, setSelected] = useState<SelectedMunicipality[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return []
    const q = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return allMunicipalities
      .filter((m) => {
        const name = m.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return name.includes(q) && !selected.some((s) => s.municipality.id === m.id)
      })
      .slice(0, 5)
  }, [searchQuery, allMunicipalities, selected])

  function addMunicipality(m: Municipality) {
    if (selected.length >= 3) return
    const year = getLatestYear(m.id)
    const summary = year ? getBudgetSummary(m.id, year) : null
    const salaries = getSalaries(m.id)
    const mayor = salaries.find((s) => s.role.toLowerCase().includes("alcalde"))
    setSelected([...selected, { municipality: m, summary, year, mayorSalary: mayor?.grossAnnualAmount ?? null }])
    setSearchQuery("")
  }

  function removeMunicipality(id: string) {
    setSelected(selected.filter((s) => s.municipality.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Comparar municipios</h1>
      <p className="mt-2 text-muted-foreground">
        Selecciona hasta 3 municipios para comparar sus datos presupuestarios.
      </p>

      {/* Search to add */}
      {selected.length < 3 && (
        <div className="relative mt-6 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar municipio para añadir..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar municipio para comparar"
            />
          </div>
          {searchResults.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full rounded-lg border bg-card shadow-lg">
              {searchResults.map((m) => (
                <li key={m.id}>
                  <button
                    className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-secondary/50"
                    onClick={() => addMunicipality(m)}
                  >
                    <span>{m.name}</span>
                    <span className="text-xs text-muted-foreground">{m.province}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.map((s) => (
            <Badge key={s.municipality.id} variant="secondary" className="gap-1 px-3 py-1">
              {s.municipality.name}
              <button onClick={() => removeMunicipality(s.municipality.id)} aria-label={`Quitar ${s.municipality.name}`}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selected.length < 3 && (
            <Badge variant="outline" className="gap-1 px-3 py-1 text-muted-foreground">
              <Plus className="h-3 w-3" /> Añadir municipio
            </Badge>
          )}
        </div>
      )}

      {selected.length === 0 ? (
        <div className="mt-12 rounded-lg border bg-card p-12 text-center">
          <p className="text-lg font-medium">Selecciona municipios para comparar</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Busca y añade hasta 3 municipios usando el buscador de arriba.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <Separator className="mb-8" />

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Indicador</th>
                  {selected.map((s) => (
                    <th key={s.municipality.id} className="px-4 py-3 text-right font-semibold">
                      {s.municipality.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompRow label="Población" values={selected.map((s) => s.municipality.population ? formatNumber(s.municipality.population) : "N/D")} />
                <CompRow label="Presupuesto total" values={selected.map((s) => s.summary ? formatCurrencyCompact(s.summary.totalExpenses) : "N/D")} />
                <CompRow label="Gasto por habitante" values={selected.map((s) => s.summary?.expensePerCapita ? formatPerCapita(s.summary.expensePerCapita) : "N/D")} />
                <CompRow label="Ingreso por habitante" values={selected.map((s) => s.summary?.incomePerCapita ? formatPerCapita(s.summary.incomePerCapita) : "N/D")} />
                <CompRow label="Inversión por habitante" values={selected.map((s) => s.summary?.investmentPerCapita ? formatPerCapita(s.summary.investmentPerCapita) : "N/D")} />
                <CompRow label="Cap. 1 - Personal (%)" values={selected.map((s) => {
                  const ch = s.summary?.expenseChapters.find((c) => c.chapterCode === "1")
                  return ch ? formatPercentage(ch.percentageOfTotal) : "N/D"
                })} />
                <CompRow label="Cap. 6 - Inversiones (%)" values={selected.map((s) => {
                  const ch = s.summary?.expenseChapters.find((c) => c.chapterCode === "6")
                  return ch ? formatPercentage(ch.percentageOfTotal) : "N/D"
                })} />
                <CompRow label="Retribución alcalde/sa" values={selected.map((s) => s.mayorSalary ? formatCurrencyCompact(s.mayorSalary) : "Sin datos")} />
                <CompRow label="Año datos" values={selected.map((s) => s.year ? String(s.year) : "N/D")} />
              </tbody>
            </table>
          </div>

          {selected.some((s) => s.summary?.isDemo) && (
            <p className="mt-4 text-xs text-amber-600">
              Algunos datos son de demostración y deben sustituirse por importaciones oficiales.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function CompRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-4 py-3 font-medium text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="px-4 py-3 text-right">{v}</td>
      ))}
    </tr>
  )
}
