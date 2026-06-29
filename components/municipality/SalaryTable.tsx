import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Info } from "lucide-react"
import { formatCurrency } from "@/lib/formatters"
import type { OfficialSalary } from "@/types/salary"

interface SalaryTableProps {
  salaries: OfficialSalary[]
  municipalityName: string
  year: number
  isDemo: boolean
}

export default function SalaryTable({ salaries, municipalityName, year, isDemo }: SalaryTableProps) {
  return (
    <section aria-labelledby="salaries-heading">
      <h3 id="salaries-heading" className="text-lg font-semibold">Retribuciones públicas declaradas</h3>

      {salaries.length === 0 ? (
        <div className="mt-4 rounded-lg border bg-card p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">No consta información para {municipalityName}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                El dato puede no estar disponible si el ayuntamiento no remitió información a la fuente consultada.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Dedicación</TableHead>
                  <TableHead className="text-right">Retribución bruta anual</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Fuente</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaries.map((salary) => (
                  <TableRow key={salary.id}>
                    <TableCell className="font-medium">{salary.role}</TableCell>
                    <TableCell>{salary.personName ?? "No disponible"}</TableCell>
                    <TableCell className="capitalize">{salary.dedicationType ?? "N/D"}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(salary.grossAnnualAmount)}</TableCell>
                    <TableCell>{salary.year}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {isDemo ? "Demo" : "ISPA"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-3 w-3 shrink-0" />
              <p>Las cantidades son brutas anuales según la fuente indicada.</p>
            </div>
            {isDemo && (
              <div className="flex items-start gap-2 text-xs text-amber-600">
                <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                <p>Datos de demostración. Sustituir por importación oficial ISPA ({year}).</p>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  )
}
