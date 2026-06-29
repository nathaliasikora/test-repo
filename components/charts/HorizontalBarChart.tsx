"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { formatCurrencyCompact, formatPercentage } from "@/lib/formatters"
import type { ChapterSummary } from "@/types/budget"

interface HorizontalBarChartProps {
  data: ChapterSummary[]
  title: string
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "oklch(0.70 0.08 200)",
  "oklch(0.55 0.12 80)",
  "oklch(0.60 0.08 320)",
  "oklch(0.45 0.10 180)",
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChapterSummary }> }) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload
  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="font-semibold text-sm">{data.chapterName}</p>
      <p className="text-sm">{formatCurrencyCompact(data.totalAmount)}</p>
      <p className="text-xs text-muted-foreground">{formatPercentage(data.percentageOfTotal)} del total</p>
    </div>
  )
}

export default function HorizontalBarChartComponent({ data, title }: HorizontalBarChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    shortName: `Cap. ${d.chapterCode}`,
  }))

  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold">{title}</h4>
      <div className="h-[300px] w-full" role="img" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={(v: number) => formatCurrencyCompact(v)} />
            <YAxis type="category" dataKey="shortName" width={50} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="totalAmount" radius={[0, 4, 4, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground sr-only">
        Gráfico de barras horizontales mostrando {data.map((d) => `${d.chapterName}: ${formatPercentage(d.percentageOfTotal)}`).join(", ")}
      </p>
    </div>
  )
}
