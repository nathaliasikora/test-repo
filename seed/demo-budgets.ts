import type { BudgetRecord } from "@/types/budget"
import { EXPENSE_CHAPTERS, INCOME_CHAPTERS } from "@/types/budget"

interface BudgetDistribution {
  expense: Record<string, number>
  income: Record<string, number>
}

const defaultExpenseDist: Record<string, number> = {
  "1": 0.34,
  "2": 0.28,
  "3": 0.02,
  "4": 0.12,
  "5": 0.005,
  "6": 0.12,
  "7": 0.03,
  "8": 0.01,
  "9": 0.055,
}

const defaultIncomeDist: Record<string, number> = {
  "1": 0.30,
  "2": 0.04,
  "3": 0.18,
  "4": 0.32,
  "5": 0.03,
  "6": 0.02,
  "7": 0.06,
  "8": 0.01,
  "9": 0.04,
}

const municipalityBudgets: Record<string, { totalExpense2023: number; totalExpense2022: number; customDist?: Partial<BudgetDistribution> }> = {
  "m-madrid": { totalExpense2023: 5_894_000_000, totalExpense2022: 5_612_000_000 },
  "m-barcelona": { totalExpense2023: 3_412_000_000, totalExpense2022: 3_198_000_000 },
  "m-valencia": {
    totalExpense2023: 958_000_000,
    totalExpense2022: 912_000_000,
    customDist: {
      expense: { "1": 0.32, "2": 0.26, "3": 0.03, "4": 0.14, "5": 0.005, "6": 0.14, "7": 0.02, "8": 0.01, "9": 0.045 },
    },
  },
  "m-sevilla": { totalExpense2023: 892_000_000, totalExpense2022: 845_000_000 },
  "m-zaragoza": { totalExpense2023: 782_000_000, totalExpense2022: 738_000_000 },
  "m-malaga": { totalExpense2023: 698_000_000, totalExpense2022: 654_000_000 },
  "m-valladolid": { totalExpense2023: 298_000_000, totalExpense2022: 278_000_000 },
  "m-vigo": { totalExpense2023: 284_000_000, totalExpense2022: 268_000_000 },
  "m-alcobendas": { totalExpense2023: 178_000_000, totalExpense2022: 164_000_000 },
  "m-caravaca": { totalExpense2023: 24_500_000, totalExpense2022: 22_800_000 },
}

function generateBudgetRecords(
  municipalityId: string,
  year: number,
  totalExpense: number,
  customDist?: Partial<BudgetDistribution>
): BudgetRecord[] {
  const records: BudgetRecord[] = []
  const expDist = { ...defaultExpenseDist, ...customDist?.expense }
  const incDist = { ...defaultIncomeDist, ...customDist?.income }
  const totalIncome = totalExpense * 1.02

  for (const [code, pct] of Object.entries(expDist)) {
    records.push({
      id: `br-${municipalityId}-${year}-e-${code}`,
      municipalityId,
      year,
      recordType: "budget",
      side: "expense",
      classificationType: "economic",
      chapterCode: code,
      chapterName: EXPENSE_CHAPTERS[code] ?? `Capítulo ${code}`,
      articleCode: null,
      articleName: null,
      conceptCode: null,
      conceptName: null,
      subconceptCode: null,
      subconceptName: null,
      amount: Math.round(totalExpense * pct),
      amountType: "initial_budget",
      sourceId: null,
      sourceFile: "demo-seed",
      importBatchId: null,
      isDemo: true,
      createdAt: "2024-01-15T10:00:00Z",
    })
  }

  for (const [code, pct] of Object.entries(incDist)) {
    records.push({
      id: `br-${municipalityId}-${year}-i-${code}`,
      municipalityId,
      year,
      recordType: "budget",
      side: "income",
      classificationType: "economic",
      chapterCode: code,
      chapterName: INCOME_CHAPTERS[code] ?? `Capítulo ${code}`,
      articleCode: null,
      articleName: null,
      conceptCode: null,
      conceptName: null,
      subconceptCode: null,
      subconceptName: null,
      amount: Math.round(totalIncome * pct),
      amountType: "initial_budget",
      sourceId: null,
      sourceFile: "demo-seed",
      importBatchId: null,
      isDemo: true,
      createdAt: "2024-01-15T10:00:00Z",
    })
  }

  return records
}

export function getDemoBudgetRecords(): BudgetRecord[] {
  const allRecords: BudgetRecord[] = []

  for (const [munId, config] of Object.entries(municipalityBudgets)) {
    allRecords.push(...generateBudgetRecords(munId, 2023, config.totalExpense2023, config.customDist))
    allRecords.push(...generateBudgetRecords(munId, 2022, config.totalExpense2022, config.customDist))
  }

  return allRecords
}
