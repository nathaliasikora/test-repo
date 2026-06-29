import Link from "next/link"
import { Search, Database, Shield, BookOpen, ArrowRight, BarChart3, Users, Calendar } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getGlobalStats, getAllMunicipalities } from "@/lib/data"
import { formatNumber } from "@/lib/formatters"
import HomeSearch from "@/components/search/HomeSearch"

export default function HomePage() {
  const stats = getGlobalStats()
  const municipalities = getAllMunicipalities()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              {stats.isDemo ? "Datos de demostración" : `Datos actualizados a ${stats.latestYear}`}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Descubre dónde van tus{" "}
              <span className="text-primary">impuestos locales</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Datos oficiales de Hacienda. Busca tu municipio y entiende su presupuesto,
              gasto por habitante, principales partidas y retribuciones públicas disponibles.
            </p>

            <div className="mt-10">
              <HomeSearch municipalities={municipalities} />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {formatNumber(stats.totalMunicipalities)} municipios cargados &middot; Último
              año: {stats.latestYear}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-secondary/20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          <StatCard icon={<BarChart3 className="h-5 w-5 text-primary" />} value={formatNumber(stats.totalMunicipalities)} label="Municipios cargados" />
          <StatCard icon={<Calendar className="h-5 w-5 text-primary" />} value={String(stats.latestYear)} label="Último año disponible" />
          <StatCard icon={<Database className="h-5 w-5 text-primary" />} value={stats.lastUpdated} label="Última actualización" />
          <StatCard icon={<Users className="h-5 w-5 text-primary" />} value={`${stats.completenessPercentage}%`} label="Con datos presupuestarios" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Cómo funciona</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Tres pasos para entender las finanzas de tu ayuntamiento.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <StepCard number={1} title="Busca tu municipio" description="Escribe el nombre de tu pueblo o ciudad. También puedes filtrar por provincia o comunidad autónoma." />
          <StepCard number={2} title="Consulta el presupuesto" description="Visualiza en qué se gasta el dinero, cuánto supone por habitante y cómo se distribuyen las partidas." />
          <StepCard number={3} title="Comprueba las fuentes" description="Cada dato indica su fuente oficial, año y posibles limitaciones. Transparencia real, sin interpretaciones." />
        </div>
      </section>

      {/* Featured municipalities */}
      <section className="border-t bg-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Municipios destacados</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Explora algunos de los municipios disponibles en la plataforma.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {municipalities.slice(0, 10).map((m) => (
              <Link
                key={m.slug}
                href={`/municipio/${m.slug}`}
                className="group rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <p className="font-semibold group-hover:text-primary">{m.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.province}</p>
                {m.population && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatNumber(m.population)} hab.
                  </p>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/buscar" className={buttonVariants({ variant: "outline" })}>
              Ver todos los municipios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust block */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Por qué confiar en estos datos</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <TrustCard icon={<Database className="h-6 w-6" />} title="Datos públicos" description="Toda la información procede de fuentes oficiales publicadas por las administraciones públicas." />
          <TrustCard icon={<Shield className="h-6 w-6" />} title="Fuentes oficiales" description="CONPREL (Ministerio de Hacienda), ISPA y el INE son nuestras fuentes principales." />
          <TrustCard icon={<BookOpen className="h-6 w-6" />} title="Metodología abierta" description="Explicamos cómo se calculan los indicadores, qué datos usamos y qué limitaciones tienen." />
          <TrustCard icon={<Search className="h-6 w-6" />} title="Limitaciones visibles" description="Cuando faltan datos o son incompletos, lo indicamos claramente. No ocultamos las carencias." />
        </div>
      </section>

      {/* Demo disclaimer */}
      {stats.isDemo && (
        <section className="border-t bg-amber-50/50">
          <div className="mx-auto max-w-4xl px-4 py-8 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-amber-800">
              Los datos mostrados actualmente son de demostración. Sustituir por importación oficial de CONPREL e ISPA.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
      {icon}
      <div>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
          {number}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TrustCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-primary">{icon}</div>
        <h3 className="mt-3 font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
