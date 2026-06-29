import { demoMunicipalities } from "@/seed/demo-municipalities"
import { getDemoBudgetRecords } from "@/seed/demo-budgets"
import { getDemoSalaries } from "@/seed/demo-salaries"
import { calculateBudgetSummary, calculateBudgetEvolution, calculatePerCapita } from "@/lib/calculations/budget"
import type { Municipality, MunicipalitySearchResult, DataCompleteness } from "@/types/municipality"
import type { BudgetRecord, BudgetSummary } from "@/types/budget"
import type { OfficialSalary } from "@/types/salary"

const budgetRecords = getDemoBudgetRecords()
const salaries = getDemoSalaries()

export function getAllMunicipalities(): Municipality[] {
  return demoMunicipalities
}

export function getMunicipalityBySlug(slug: string): Municipality | undefined {
  return demoMunicipalities.find((m) => m.slug === slug)
}

export function getMunicipalityById(id: string): Municipality | undefined {
  return demoMunicipalities.find((m) => m.id === id)
}

export function getBudgetRecords(municipalityId: string): BudgetRecord[] {
  return budgetRecords.filter((r) => r.municipalityId === municipalityId)
}

export function getSalaries(municipalityId: string): OfficialSalary[] {
  return salaries.filter((s) => s.municipalityId === municipalityId)
}

export function getAvailableYears(municipalityId: string): number[] {
  const years = new Set(
    budgetRecords.filter((r) => r.municipalityId === municipalityId).map((r) => r.year)
  )
  return [...years].sort((a, b) => b - a)
}

export function getLatestYear(municipalityId: string): number | null {
  const years = getAvailableYears(municipalityId)
  return years[0] ?? null
}

export function getBudgetSummary(municipalityId: string, year: number): BudgetSummary | null {
  const municipality = getMunicipalityById(municipalityId)
  if (!municipality) return null

  const records = getBudgetRecords(municipalityId).filter((r) => r.year === year)
  if (records.length === 0) return null

  return calculateBudgetSummary(records, municipalityId, year, municipality.population)
}

export function getBudgetEvolution(municipalityId: string) {
  const municipality = getMunicipalityById(municipalityId)
  if (!municipality) return []

  const records = getBudgetRecords(municipalityId)
  return calculateBudgetEvolution(records, municipality.population)
}

function getDataCompleteness(municipalityId: string): DataCompleteness {
  const records = getBudgetRecords(municipalityId)
  const sals = getSalaries(municipalityId)
  if (records.length === 0) return "pending"
  if (records.every((r) => r.isDemo)) return "demo"
  if (sals.length === 0) return "partial"
  return "complete"
}

export function searchMunicipalities(query: {
  search?: string
  province?: string
  autonomousCommunity?: string
  minPopulation?: number
  maxPopulation?: number
  year?: number
}): MunicipalitySearchResult[] {
  let results = demoMunicipalities

  if (query.search) {
    const searchLower = query.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    results = results.filter((m) => {
      const nameLower = m.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      const provinceLower = m.province.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      return nameLower.includes(searchLower) || provinceLower.includes(searchLower)
    })
  }

  if (query.province) {
    results = results.filter((m) => m.province === query.province)
  }

  if (query.autonomousCommunity) {
    results = results.filter((m) => m.autonomousCommunity === query.autonomousCommunity)
  }

  if (query.minPopulation) {
    results = results.filter((m) => (m.population ?? 0) >= (query.minPopulation ?? 0))
  }

  if (query.maxPopulation) {
    results = results.filter((m) => (m.population ?? Infinity) <= (query.maxPopulation ?? Infinity))
  }

  return results.map((m) => {
    const latestYear = getLatestYear(m.id)
    const records = latestYear ? getBudgetRecords(m.id).filter((r) => r.year === latestYear) : []
    const totalBudget = records.filter((r) => r.side === "expense").reduce((s, r) => s + r.amount, 0) || null
    const expensePerCapita = totalBudget ? calculatePerCapita(totalBudget, m.population) : null

    return {
      id: m.id,
      name: m.name,
      slug: m.slug,
      province: m.province,
      autonomousCommunity: m.autonomousCommunity,
      population: m.population,
      totalBudget,
      expensePerCapita,
      latestYear,
      dataCompleteness: getDataCompleteness(m.id),
      isDemo: true,
    }
  })
}

export function getProvinces(): string[] {
  return [...new Set(demoMunicipalities.map((m) => m.province))].sort()
}

export function getAutonomousCommunities(): string[] {
  return [...new Set(demoMunicipalities.map((m) => m.autonomousCommunity))].sort()
}

export function getGlobalStats() {
  const totalMunicipalities = demoMunicipalities.length
  const latestYear = Math.max(...budgetRecords.map((r) => r.year))
  const municipalitiesWithBudgets = new Set(budgetRecords.map((r) => r.municipalityId)).size
  const completenessPercentage = Math.round((municipalitiesWithBudgets / totalMunicipalities) * 100)

  return {
    totalMunicipalities,
    latestYear,
    lastUpdated: "2024-01-15",
    completenessPercentage,
    isDemo: true,
  }
}

export function getMunicipalitiesByProvince(province: string): MunicipalitySearchResult[] {
  return searchMunicipalities({ province })
}

export function getProvinceAverage(province: string, year: number): { avgExpensePerCapita: number | null } {
  const municipalities = demoMunicipalities.filter((m) => m.province === province)
  const perCapitas: number[] = []

  for (const m of municipalities) {
    const records = getBudgetRecords(m.id).filter((r) => r.year === year && r.side === "expense")
    const total = records.reduce((s, r) => s + r.amount, 0)
    const pc = calculatePerCapita(total, m.population)
    if (pc !== null) perCapitas.push(pc)
  }

  if (perCapitas.length === 0) return { avgExpensePerCapita: null }
  return { avgExpensePerCapita: Math.round(perCapitas.reduce((a, b) => a + b, 0) / perCapitas.length) }
}
