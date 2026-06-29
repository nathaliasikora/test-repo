export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrencyCompact(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1).replace(".", ",")} mil M€`
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace(".", ",")} M€`
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1).replace(".", ",")} mil €`
  }
  return formatCurrency(amount)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("es-ES").format(n)
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1).replace(".", ",")}%`
}

export function formatPerCapita(amount: number | null): string {
  if (amount === null) return "N/D"
  return `${formatCurrency(amount)}/hab.`
}

export function formatYear(year: number): string {
  return year.toString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
