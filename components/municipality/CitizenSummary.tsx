import { Card, CardContent } from "@/components/ui/card"

interface CitizenSummaryProps {
  summary: string
}

export default function CitizenSummary({ summary }: CitizenSummaryProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-primary">Resumen ciudadano</h3>
        <p className="mt-3 text-base leading-relaxed">
          {summary}
        </p>
      </CardContent>
    </Card>
  )
}
