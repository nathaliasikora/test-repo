import { AlertTriangle, Info, AlertCircle } from "lucide-react"
import type { DataQualityFlag } from "@/types/municipality"

interface DataQualityNoticeProps {
  flags: DataQualityFlag[]
}

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
}

const colorMap = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  error: "border-red-200 bg-red-50 text-red-800",
}

export default function DataQualityNotice({ flags }: DataQualityNoticeProps) {
  if (flags.length === 0) return null

  return (
    <div className="space-y-2">
      {flags.map((flag) => {
        const Icon = iconMap[flag.severity]
        return (
          <div
            key={flag.id}
            className={`flex items-start gap-2 rounded-lg border px-4 py-3 ${colorMap[flag.severity]}`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="text-sm">{flag.message}</p>
          </div>
        )
      })}
    </div>
  )
}
