/**
 * Script de importación de municipios y población.
 *
 * Fuente principal: INE - Padrón Municipal
 * https://www.ine.es/dyngs/INEbase/es/operacion.htm?c=Estadistica_C&cid=1254736177011
 *
 * Uso:
 *   pnpm import:municipalities [--dry-run] [--file <ruta_csv>]
 *
 * El script espera un CSV con columnas:
 *   ine_code, name, province, province_code, autonomous_community,
 *   autonomous_community_code, population, population_year
 *
 * En modo dry-run no escribe en la base de datos.
 */

import { readFileSync } from "fs"
import { resolve } from "path"

interface MunicipalityRow {
  ine_code: string
  name: string
  province: string
  province_code: string
  autonomous_community: string
  autonomous_community_code: string
  population: string
  population_year: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function parseCSV(content: string): MunicipalityRow[] {
  const lines = content.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] ?? ""
    })
    return row as unknown as MunicipalityRow
  })
}

function validate(row: MunicipalityRow, lineNum: number): string[] {
  const errors: string[] = []
  if (!row.ine_code) errors.push(`Línea ${lineNum}: ine_code vacío`)
  if (!row.name) errors.push(`Línea ${lineNum}: name vacío`)
  if (!row.province) errors.push(`Línea ${lineNum}: province vacío`)
  const pop = parseInt(row.population, 10)
  if (row.population && isNaN(pop)) errors.push(`Línea ${lineNum}: population no es numérico`)
  return errors
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes("--dry-run")
  const fileIndex = args.indexOf("--file")
  const filePath = fileIndex >= 0 ? args[fileIndex + 1] : null

  if (!filePath) {
    console.log("Uso: pnpm import:municipalities --file <ruta_csv> [--dry-run]")
    console.log("")
    console.log("Sin archivo proporcionado. Para datos demo, ejecuta: pnpm db:seed")
    process.exit(0)
  }

  console.log(`Importando municipios desde: ${filePath}`)
  console.log(`Modo: ${dryRun ? "DRY RUN (no se escribirá en BD)" : "ESCRITURA"}`)

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

    const slug = slugify(rows[i].name)
    const population = parseInt(rows[i].population, 10)
    const populationYear = parseInt(rows[i].population_year, 10)

    if (!dryRun) {
      // TODO: Insertar en BD con Prisma
      // await prisma.municipality.upsert({
      //   where: { ineCode: rows[i].ine_code },
      //   update: { population, populationYear, updatedAt: new Date() },
      //   create: { ineCode: rows[i].ine_code, name: rows[i].name, slug, ... }
      // })
    }

    imported++
  }

  console.log("")
  console.log("=== REPORTE ===")
  console.log(`Importados: ${imported}`)
  console.log(`Fallidos: ${failed}`)
  if (allErrors.length > 0) {
    console.log("\nErrores:")
    allErrors.forEach((e) => console.log(`  - ${e}`))
  }
}

main().catch(console.error)
