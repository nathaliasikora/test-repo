"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MunicipalitySearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set("q", query.trim())
    } else {
      params.delete("q")
    }
    router.push(`/buscar?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Nombre del municipio o provincia..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar municipio"
        />
      </div>
      <Button type="submit">Buscar</Button>
    </form>
  )
}
