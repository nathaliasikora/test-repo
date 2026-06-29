"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { formatCurrencyCompact } from "@/lib/formatters"
import type { BudgetEvolution } from "@/types/budget"

interface EvolutionChartProps {
  data: BudgetEvolution[]
  title: string
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="font-semibold text-sm">Año {label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm" style={{ color: p.color }}>
          {p.name}: {formatCurrencyCompact(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function EvolutionChartComponent({ data, title }: EvolutionChartProps) {
  if (data.length < 2) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Todavía no hay suficientes años cargados para mostrar evolución.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold">{title}</h4>
      <div className="h-[300px] w-full" role="img" aria-label={title}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={(v: number) => formatCurrencyCompact(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="totalExpenses" name="Gastos" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="totalIncome" name="Ingresos" stroke="var(--chart-2)" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
