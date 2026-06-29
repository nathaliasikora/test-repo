/**
 * Script de importación de presupuestos y liquidaciones.
 *
 * Fuente: CONPREL - Ministerio de Hacienda
 * https://serviciostelematicosext.hacienda.gob.es/SGFAL/CONPREL
 *
 * Uso:
 *   pnpm import:budgets --file <ruta> --year <año> --type <budget|liquidation> [--dry-run]
 *
 * Los datos de CONPREL están disponibles en Excel (agregados) y Access (desglose por entidad).
 * Este script debe adaptarse al formato específico del archivo descargado.
 *
 * Formato esperado (CSV normalizado):
 *   ine_code, year, record_type, side, classification_type, chapter_code,
 *   chapter_name, article_code, article_name, concept_code, concept_name,
 *   amount, amount_type
 */

import { readFileSync } from "fs"
import { resolve } from "path"

interface BudgetRow {
  ine_code: string
  year: string
  record_type: string
  side: string
  classification_type: string
  chapter_code: string
  chapter_name: string
  article_code: string
  article_name: string
  concept_code: string
  concept_name: string
  amount: string
  amount_type: string
}

function parseCSV(content: string): BudgetRow[] {
  const lines = content.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] ?? ""
    })
    return row as unknown as BudgetRow
  })
}

function validate(row: BudgetRow, lineNum: number): string[] {
  const errors: string[] = []
  if (!row.ine_code) errors.push(`Línea ${lineNum}: ine_code vacío`)
  if (!row.year || isNaN(parseInt(row.year))) errors.push(`Línea ${lineNum}: year inválido`)
  if (!["budget", "liquidation"].includes(row.record_type)) errors.push(`Línea ${lineNum}: record_type inválido`)
  if (!["income", "expense"].includes(row.side)) errors.push(`Línea ${lineNum}: side inválido`)
  const amount = parseFloat(row.amount)
  if (isNaN(amount)) errors.push(`Línea ${lineNum}: amount no es numérico`)
  return errors
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const fileIndex = args.indexOf("--file")
  const filePath = fileIndex >= 0 ? args[fileIndex + 1] : null
  const yearIndex = args.indexOf("--year")
  const year = yearIndex >= 0 ? args[yearIndex + 1] : null

  if (!filePath) {
    console.log("Uso: pnpm import:budgets --file <ruta_csv> --year <año> [--dry-run]")
    console.log("")
    console.log("Pasos para obtener datos reales:")
    console.log("1. Acceder a CONPREL: https://serviciostelematicosext.hacienda.gob.es/SGFAL/CONPREL")
    console.log("2. Seleccionar ejercicio, tipo de operación y formato de descarga")
    console.log("3. Convertir el archivo a CSV con las columnas esperadas")
    console.log("4. Ejecutar este script con --file <ruta> --year <año>")
    process.exit(0)
  }

  console.log(`Importando presupuestos desde: ${filePath}`)
  console.log(`Año: ${year ?? "detectado del archivo"}`)
  console.log(`Modo: ${dryRun ? "DRY RUN" : "ESCRITURA"}`)

  const content = readFileSync(resolve(filePath), "utf-8")
  const rows = parseCSV(content)

  console.log(`Filas encontradas: ${rows.length}`)

  let imported = 0
  let failed = 0
  const allErrors: string[] = []
  const unmatchedMunicipalities = new Set<string>()

  for (let i = 0; i < rows.length; i++) {
    const errors = validate(rows[i], i + 2)
    if (errors.length > 0) {
      allErrors.push(...errors)
      failed++
      continue
    }

    // TODO: Verificar que el municipio existe en BD
    // const municipality = await prisma.municipality.findUnique({ where: { ineCode: rows[i].ine_code } })
    // if (!municipality) { unmatchedMunicipalities.add(rows[i].ine_code); failed++; continue }

    if (!dryRun) {
      // TODO: Insertar en BD con Prisma
      // await prisma.budgetRecord.create({ data: { ... } })
    }

    imported++
  }

  console.log("")
  console.log("=== REPORTE ===")
  console.log(`Importados: ${imported}`)
  console.log(`Fallidos: ${failed}`)
  if (unmatchedMunicipalities.size > 0) {
    console.log(`\nMunicipios no encontrados (${unmatchedMunicipalities.size}):`)
    unmatchedMunicipalities.forEach((code) => console.log(`  - ${code}`))
  }
  if (allErrors.length > 0) {
    console.log("\nErrores (primeros 20):")
    allErrors.slice(0, 20).forEach((e) => console.log(`  - ${e}`))
  }
}

main().catch(console.error)
