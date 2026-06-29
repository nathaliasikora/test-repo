"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Municipality } from "@/types/municipality"

interface HomeSearchProps {
  municipalities: Municipality[]
}

export default function HomeSearch({ municipalities }: HomeSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filtered = useMemo(() => {
    if (!query || query.length < 2) return []
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return municipalities
      .filter((m) => {
        const name = m.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        return name.includes(q)
      })
      .slice(0, 6)
  }, [query, municipalities])

  function handleSelect(slug: string) {
    setIsOpen(false)
    setQuery("")
    router.push(`/municipio/${slug}`)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (filtered.length > 0) {
      handleSelect(filtered[0].slug)
    } else if (query.length > 0) {
      router.push(`/buscar?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Escribe el nombre de tu municipio..."
          className="h-14 rounded-xl pl-12 pr-4 text-base shadow-lg"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          aria-label="Buscar municipio"
          autoComplete="off"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          className="absolute z-50 mt-2 w-full rounded-lg border bg-card shadow-lg"
          role="listbox"
        >
          {filtered.map((m) => (
            <li key={m.slug}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm hover:bg-secondary/50"
                onClick={() => handleSelect(m.slug)}
                role="option"
                aria-selected={false}
              >
                <span className="font-medium">{m.name}</span>
                <span className="text-xs text-muted-foreground">{m.province}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
