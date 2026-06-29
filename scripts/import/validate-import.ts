/**
 * Script de validación de importaciones.
 *
 * Verifica la consistencia de los datos importados:
 * - Municipios sin presupuesto
 * - Presupuestos sin municipio correspondiente
 * - Capítulos con importes negativos o anómalos
 * - Retribuciones sin municipio
 * - Datos demo sin sustituir
 *
 * Uso:
 *   pnpm import:validate [--year <año>]
 */

async function main() {
  const args = process.argv.slice(2)
  const yearIndex = args.indexOf("--year")
  const year = yearIndex >= 0 ? parseInt(args[yearIndex + 1]) : null

  console.log("=== VALIDACIÓN DE IMPORTACIONES ===")
  console.log(`Año: ${year ?? "todos"}`)
  console.log("")

  // TODO: Conectar a Prisma y ejecutar validaciones

  console.log("Validaciones a ejecutar:")
  console.log("  1. Municipios sin registros presupuestarios")
  console.log("  2. Registros presupuestarios sin municipio válido")
  console.log("  3. Capítulos con importes negativos")
  console.log("  4. Registros de retribuciones sin municipio")
  console.log("  5. Datos marcados como demo pendientes de sustitución")
  console.log("  6. Municipios con presupuesto pero sin retribuciones")
  console.log("  7. Incoherencias entre gastos e ingresos (diferencia > 20%)")
  console.log("")
  console.log("Para ejecutar estas validaciones, conecte la base de datos y descomente el código Prisma.")
}

main().catch(console.error)
