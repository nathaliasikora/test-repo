import type { BudgetRecord } from "./budget"
import type { OfficialSalary } from "./salary"

export interface Municipality {
  id: string
  ineCode: string
  name: string
  slug: string
  province: string
  provinceCode: string
  autonomousCommunity: string
  autonomousCommunityCode: string
  population: number | null
  populationYear: number | null
  officialWebsiteUrl: string | null
  transparencyPortalUrl: string | null
  latitude: number | null
  longitude: number | null
  createdAt: string
  updatedAt: string
}

export interface MunicipalityWithData extends Municipality {
  budgetRecords: BudgetRecord[]
  officialSalaries: OfficialSalary[]
  dataQualityFlags: DataQualityFlag[]
}

export interface MunicipalitySearchResult {
  id: string
  name: string
  slug: string
  province: string
  autonomousCommunity: string
  population: number | null
  totalBudget: number | null
  expensePerCapita: number | null
  latestYear: number | null
  dataCompleteness: DataCompleteness
  isDemo: boolean
}

export type DataCompleteness = "complete" | "partial" | "pending" | "demo"

export interface DataQualityFlag {
  id: string
  municipalityId: string
  year: number
  flagType: string
  severity: "info" | "warning" | "error"
  message: string
  createdAt: string
}
