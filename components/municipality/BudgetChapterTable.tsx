import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { formatCurrency, formatPercentage, formatPerCapita } from "@/lib/formatters"
import type { ChapterSummary } from "@/types/budget"

interface BudgetChapterTableProps {
  chapters: ChapterSummary[]
  title: string
}

export default function BudgetChapterTable({ chapters, title }: BudgetChapterTableProps) {
  if (chapters.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">No hay datos de {title.toLowerCase()} disponibles.</p>
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">Cap.</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead className="text-right">% Total</TableHead>
              <TableHead className="text-right">Por habitante</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chapters.map((ch) => (
              <TableRow key={ch.chapterCode}>
                <TableCell className="font-mono text-sm">{ch.chapterCode}</TableCell>
                <TableCell className="font-medium">{ch.chapterName}</TableCell>
                <TableCell className="text-right">{formatCurrency(ch.totalAmount)}</TableCell>
                <TableCell className="text-right">{formatPercentage(ch.percentageOfTotal)}</TableCell>
                <TableCell className="text-right">{formatPerCapita(ch.perCapita)}</TableCell>
                <TableCell>
                  {ch.citizenExplanation && (
                    <Tooltip>
                      <TooltipTrigger aria-label={`Info sobre ${ch.chapterName}`}>
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <p className="text-xs">{ch.citizenExplanation}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
