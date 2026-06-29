import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Página no encontrada
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        El municipio o la página que buscas no existe o todavía no tiene datos cargados.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          Volver al inicio
        </Link>
        <Link href="/buscar" className={buttonVariants({ variant: "outline" })}>
          Buscar municipio
        </Link>
      </div>
    </div>
  )
}
