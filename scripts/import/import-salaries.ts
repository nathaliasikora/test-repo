/**
 * Script de importación de retribuciones de cargos electos.
 *
 * Fuente: ISPA - Informes de retribuciones
 * https://digital.gob.es/funcion-publica/dgfp/espacio-ispa/estadisticas
 *
 * Uso:
 *   pnpm import:salaries --file <ruta> --year <año> [--dry-run]
 *
 * Formato esperado (CSV normalizado):
 *   ine_code, year, person_name, role, dedication_type, gross_annual_amount
 */

import { readFileSync } from "fs"
import { resolve } from "path"

interface SalaryRow {
  ine_code: string
  year: string
  person_name: string
  role: string
  dedication_type: string
  gross_annual_amount: string
}

function parseCSV(content: string): SalaryRow[] {
  const lines = content.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] ?? ""
    })
    return row as unknown as SalaryRow
  })
}

function validate(row: SalaryRow, lineNum: number): string[] {
  const errors: string[] = []
  if (!row.ine_code) errors.push(`Línea ${lineNum}: ine_code vacío`)
  if (!row.year || isNaN(parseInt(row.year))) errors.push(`Línea ${lineNum}: year inválido`)
  if (!row.role) errors.push(`Línea ${lineNum}: role vacío`)
  const amount = parseFloat(row.gross_annual_amount)
  if (isNaN(amount) || amount < 0) errors.push(`Línea ${lineNum}: gross_annual_amount inválido`)
  return errors
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const fileIndex = args.indexOf("--file")
  const filePath = fileIndex >= 0 ? args[fileIndex + 1] : null

  if (!filePath) {
    console.log("Uso: pnpm import:salaries --file <ruta_csv> --year <año> [--dry-run]")
    console.log("")
    console.log("Pasos para obtener datos reales:")
    console.log("1. Acceder a ISPA: https://digital.gob.es/funcion-publica/dgfp/espacio-ispa/estadisticas")
    console.log("2. Descargar el informe del año correspondiente")
    console.log("3. Convertir a CSV con las columnas: ine_code, year, person_name, role, dedication_type, gross_annual_amount")
    console.log("4. Ejecutar este script con --file <ruta>")
    process.exit(0)
  }

  console.log(`Importando retribuciones desde: ${filePath}`)
  console.log(`Modo: ${dryRun ? "DRY RUN" : "ESCRITURA"}`)

  const content = readFileSync(resolve(filePath), "utf-8")
  const rows = parseCSV(content)

  console.log(`Filas encontradas: ${rows.length}`)

  let imported = 0
  let failed = 0
  const allErrors: string[] = []

  for (let i = 0; i < rows.length; i++) {
    const errors = validate(rows[i], i + 2)
    if (errors.length > 0) {
      allErrors.push(...errors)
      failed++
      continue
    }

    if (!dryRun) {
      // TODO: Insertar en BD con Prisma
      // await prisma.officialSalary.create({ data: { ... } })
    }

    imported++
  }

  console.log("")
  console.log("=== REPORTE ===")
  console.log(`Importados: ${imported}`)
  console.log(`Fallidos: ${failed}`)
  if (allErrors.length > 0) {
    console.log("\nErrores:")
    allErrors.slice(0, 20).forEach((e) => console.log(`  - ${e}`))
  }
}

main().catch(console.error)
