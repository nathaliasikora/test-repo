"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { formatCurrencyCompact, formatPercentage } from "@/lib/formatters"
import type { ChapterSummary } from "@/types/budget"

interface DonutChartProps {
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
      <p className="text-xs text-muted-foreground">{formatPercentage(data.percentageOfTotal)}</p>
    </div>
  )
}

export default function DonutChartComponent({ data, title }: DonutChartProps) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold">{title}</h4>
      <div className="h-[300px] w-full" role="img" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="totalAmount"
              nameKey="chapterName"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value: string) => <span className="text-xs">{value}</span>}
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
