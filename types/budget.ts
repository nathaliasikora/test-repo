export interface BudgetRecord {
  id: string
  municipalityId: string
  year: number
  recordType: "budget" | "liquidation"
  side: "income" | "expense"
  classificationType: "economic" | "program" | "organic"
  chapterCode: string
  chapterName: string
  articleCode: string | null
  articleName: string | null
  conceptCode: string | null
  conceptName: string | null
  subconceptCode: string | null
  subconceptName: string | null
  amount: number
  amountType: "initial_budget" | "final_budget" | "recognized_obligations" | "payments" | "rights_recognized"
  sourceId: string | null
  sourceFile: string | null
  importBatchId: string | null
  isDemo: boolean
  createdAt: string
}

export interface ChapterSummary {
  chapterCode: string
  chapterName: string
  totalAmount: number
  percentageOfTotal: number
  perCapita: number | null
  citizenExplanation: string
}

export interface BudgetSummary {
  municipalityId: string
  year: number
  totalExpenses: number
  totalIncome: number
  expensePerCapita: number | null
  incomePerCapita: number | null
  investmentPerCapita: number | null
  executionPercentage: number | null
  expenseChapters: ChapterSummary[]
  incomeChapters: ChapterSummary[]
  isDemo: boolean
}

export interface BudgetEvolution {
  year: number
  totalExpenses: number
  totalIncome: number
  expensePerCapita: number | null
  investmentPerCapita: number | null
}

export const EXPENSE_CHAPTERS: Record<string, string> = {
  "1": "Gastos de personal",
  "2": "Gastos corrientes en bienes y servicios",
  "3": "Gastos financieros",
  "4": "Transferencias corrientes",
  "5": "Fondo de contingencia",
  "6": "Inversiones reales",
  "7": "Transferencias de capital",
  "8": "Activos financieros",
  "9": "Pasivos financieros",
}

export const INCOME_CHAPTERS: Record<string, string> = {
  "1": "Impuestos directos",
  "2": "Impuestos indirectos",
  "3": "Tasas, precios públicos y otros ingresos",
  "4": "Transferencias corrientes",
  "5": "Ingresos patrimoniales",
  "6": "Enajenación de inversiones reales",
  "7": "Transferencias de capital",
  "8": "Activos financieros",
  "9": "Pasivos financieros",
}

export const CHAPTER_CITIZEN_EXPLANATIONS: Record<string, Record<string, string>> = {
  expense: {
    "1": "Sueldos y cotizaciones del personal del ayuntamiento: funcionarios, policía local, bomberos, trabajadores sociales, etc.",
    "2": "Gastos del día a día: suministros, mantenimiento de edificios, limpieza, alumbrado, contratos de servicios.",
    "3": "Intereses y comisiones de la deuda del ayuntamiento con bancos u otras entidades.",
    "4": "Dinero que el ayuntamiento transfiere a otras entidades, asociaciones o familias para servicios sociales, cultura, deporte, etc.",
    "5": "Reserva para gastos imprevistos que puedan surgir durante el año.",
    "6": "Obras e infraestructuras: construcción o mejora de calles, parques, edificios públicos, redes de agua, etc.",
    "7": "Dinero que el ayuntamiento transfiere a otras administraciones o entidades para inversiones.",
    "8": "Operaciones con activos financieros: depósitos, préstamos concedidos, adquisición de acciones.",
    "9": "Devolución de préstamos bancarios y amortización de deuda.",
  },
  income: {
    "1": "IBI, impuesto de vehículos (IVTM), plusvalía, IAE y otros impuestos directos.",
    "2": "Impuesto de construcciones (ICIO) y otros impuestos indirectos.",
    "3": "Tasas por servicios (basura, agua, alcantarillado), precios públicos, multas y sanciones.",
    "4": "Dinero que recibe el ayuntamiento de otras administraciones para gastos corrientes.",
    "5": "Rentas de propiedades municipales, intereses de depósitos, dividendos.",
    "6": "Venta de terrenos, edificios u otros bienes de inversión del ayuntamiento.",
    "7": "Subvenciones de capital recibidas de otras administraciones para inversiones.",
    "8": "Reintegros de depósitos, préstamos concedidos y otras operaciones financieras.",
    "9": "Préstamos recibidos por el ayuntamiento para financiar gastos.",
  },
}
