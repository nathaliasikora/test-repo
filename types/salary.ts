export interface OfficialSalary {
  id: string
  municipalityId: string
  year: number
  personName: string | null
  role: string
  dedicationType: string | null
  grossAnnualAmount: number
  sourceId: string | null
  sourceFile: string | null
  notes: string | null
  isDemo: boolean
  createdAt: string
}

export interface SalarySummary {
  municipalityId: string
  year: number
  salaries: OfficialSalary[]
  hasData: boolean
  isDemo: boolean
  source: string
  sourceUrl: string | null
}
