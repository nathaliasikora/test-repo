import type { BudgetRecord, ChapterSummary, BudgetSummary, BudgetEvolution } from "@/types/budget"
import { CHAPTER_CITIZEN_EXPLANATIONS } from "@/types/budget"

export function calculateTotalByFilter(
  records: BudgetRecord[],
  filters: { side?: string; chapterCode?: string; year?: number }
): number {
  return records
    .filter((r) => {
      if (filters.side && r.side !== filters.side) return false
      if (filters.chapterCode && r.chapterCode !== filters.chapterCode) return false
      if (filters.year && r.year !== filters.year) return false
      return true
    })
    .reduce((sum, r) => sum + r.amount, 0)
}

export function calculatePerCapita(total: number, population: number | null): number | null {
  if (!population || population === 0) return null
  return Math.round((total / population) * 100) / 100
}

export function calculateChapterSummaries(
  records: BudgetRecord[],
  side: "income" | "expense",
  year: number,
  population: number | null
): ChapterSummary[] {
  const filtered = records.filter((r) => r.side === side && r.year === year)
  const total = filtered.reduce((sum, r) => sum + r.amount, 0)

  const chapterMap = new Map<string, { code: string; name: string; amount: number }>()

  for (const record of filtered) {
    const existing = chapterMap.get(record.chapterCode)
    if (existing) {
      existing.amount += record.amount
    } else {
      chapterMap.set(record.chapterCode, {
        code: record.chapterCode,
        name: record.chapterName,
        amount: record.amount,
      })
    }
  }

  return Array.from(chapterMap.values())
    .map((chapter) => ({
      chapterCode: chapter.code,
      chapterName: chapter.name,
      totalAmount: chapter.amount,
      percentageOfTotal: total > 0 ? Math.round((chapter.amount / total) * 1000) / 10 : 0,
      perCapita: calculatePerCapita(chapter.amount, population),
      citizenExplanation: CHAPTER_CITIZEN_EXPLANATIONS[side]?.[chapter.code] ?? "",
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
}

export function calculateBudgetSummary(
  records: BudgetRecord[],
  municipalityId: string,
  year: number,
  population: number | null
): BudgetSummary {
  const yearRecords = records.filter((r) => r.year === year)
  const totalExpenses = calculateTotalByFilter(yearRecords, { side: "expense" })
  const totalIncome = calculateTotalByFilter(yearRecords, { side: "income" })
  const investmentAmount = calculateTotalByFilter(yearRecords, { side: "expense", chapterCode: "6" })

  const budgetRecords = yearRecords.filter((r) => r.amountType === "initial_budget")
  const liquidationRecords = yearRecords.filter((r) => r.amountType === "recognized_obligations")

  let executionPercentage: number | null = null
  if (budgetRecords.length > 0 && liquidationRecords.length > 0) {
    const budgetTotal = budgetRecords.filter((r) => r.side === "expense").reduce((s, r) => s + r.amount, 0)
    const liquidationTotal = liquidationRecords.filter((r) => r.side === "expense").reduce((s, r) => s + r.amount, 0)
    if (budgetTotal > 0) {
      executionPercentage = Math.round((liquidationTotal / budgetTotal) * 1000) / 10
    }
  }

  return {
    municipalityId,
    year,
    totalExpenses,
    totalIncome,
    expensePerCapita: calculatePerCapita(totalExpenses, population),
    incomePerCapita: calculatePerCapita(totalIncome, population),
    investmentPerCapita: calculatePerCapita(investmentAmount, population),
    executionPercentage,
    expenseChapters: calculateChapterSummaries(yearRecords, "expense", year, population),
    incomeChapters: calculateChapterSummaries(yearRecords, "income", year, population),
    isDemo: yearRecords.some((r) => r.isDemo),
  }
}

export function calculateBudgetEvolution(
  records: BudgetRecord[],
  population: number | null
): BudgetEvolution[] {
  const years = [...new Set(records.map((r) => r.year))].sort()

  return years.map((year) => {
    const yearRecords = records.filter((r) => r.year === year)
    const totalExpenses = calculateTotalByFilter(yearRecords, { side: "expense" })
    const totalIncome = calculateTotalByFilter(yearRecords, { side: "income" })
    const investmentAmount = calculateTotalByFilter(yearRecords, { side: "expense", chapterCode: "6" })

    return {
      year,
      totalExpenses,
      totalIncome,
      expensePerCapita: calculatePerCapita(totalExpenses, population),
      investmentPerCapita: calculatePerCapita(investmentAmount, population),
    }
  })
}

export function generateCitizenSummary(
  expenseChapters: ChapterSummary[],
  municipalityName: string
): string {
  if (expenseChapters.length === 0) {
    return `No hay datos suficientes para generar un resumen del gasto municipal de ${municipalityName}.`
  }

  const parts: string[] = []

  const personal = expenseChapters.find((c) => c.chapterCode === "1")
  if (personal) parts.push(`${Math.round(personal.percentageOfTotal)} € a personal`)

  const corrientes = expenseChapters.find((c) => c.chapterCode === "2")
  if (corrientes) parts.push(`${Math.round(corrientes.percentageOfTotal)} € a servicios corrientes`)

  const inversiones = expenseChapters.find((c) => c.chapterCode === "6")
  if (inversiones) parts.push(`${Math.round(inversiones.percentageOfTotal)} € a inversiones`)

  const deuda = expenseChapters.find((c) => c.chapterCode === "9")
  const financieros = expenseChapters.find((c) => c.chapterCode === "3")
  const deudaTotal = (deuda?.percentageOfTotal ?? 0) + (financieros?.percentageOfTotal ?? 0)
  if (deudaTotal > 0) parts.push(`${Math.round(deudaTotal)} € a deuda y operaciones financieras`)

  if (parts.length === 0) return `No hay datos suficientes para detallar el gasto de ${municipalityName}.`

  return `En ${municipalityName}, de cada 100 € de gasto municipal, aproximadamente ${parts.join(", ")}.`
}

export function calculateInterannualVariation(current: number, previous: number): number | null {
  if (previous === 0) return null
  return Math.round(((current - previous) / previous) * 1000) / 10
}

export function calculateProvinceRanking(
  municipalities: Array<{ slug: string; expensePerCapita: number | null }>,
  currentSlug: string
): { position: number; total: number } | null {
  const withData = municipalities.filter((m) => m.expensePerCapita !== null)
  if (withData.length < 2) return null

  const sorted = withData.sort((a, b) => (a.expensePerCapita ?? 0) - (b.expensePerCapita ?? 0))
  const position = sorted.findIndex((m) => m.slug === currentSlug) + 1

  return position > 0 ? { position, total: sorted.length } : null
}
