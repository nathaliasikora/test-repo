import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold">Dónde van mis impuestos</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Transparencia real sobre el dinero público local. Datos oficiales de Hacienda.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Navegación</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/buscar" className="text-sm text-muted-foreground hover:text-foreground">
                  Buscador
                </Link>
              </li>
              <li>
                <Link href="/comparar" className="text-sm text-muted-foreground hover:text-foreground">
                  Comparar municipios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Información</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/fuentes" className="text-sm text-muted-foreground hover:text-foreground">
                  Fuentes y metodología
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground">
                  Sobre el proyecto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Aviso legal</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Esta web no es oficial. Usa datos públicos procedentes de fuentes oficiales.
              Las cifras pueden depender del año disponible, de la información remitida por cada
              entidad local y del proceso de importación.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>Proyecto independiente de transparencia presupuestaria municipal.</p>
          <p className="mt-1">Datos procedentes de CONPREL (Ministerio de Hacienda), ISPA e INE.</p>
        </div>
      </div>
    </footer>
  )
}
