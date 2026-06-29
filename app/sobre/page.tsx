import type { Metadata } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Sobre el proyecto",
  description:
    "Información sobre el proyecto Dónde van mis impuestos locales: misión, independencia y contacto.",
}

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Sobre el proyecto</h1>

      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">Misión</h2>
          <p className="mt-3">
            <strong className="text-foreground">Dónde van mis impuestos locales</strong> nace con una misión clara:
            empoderar al ciudadano con transparencia real sobre el dinero público local, usando datos públicos
            oficiales y explicaciones comprensibles.
          </p>
          <p className="mt-3">
            Queremos que cualquier persona, sin conocimientos técnicos ni presupuestarios, pueda buscar su
            municipio y entender de forma clara en qué se gasta el dinero público, cuánto supone por
            habitante y qué retribuciones perciben los cargos electos.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-semibold text-foreground">Independencia</h2>
          <p className="mt-3">
            Este es un proyecto independiente. No está vinculado a ningún partido político, administración
            pública, medio de comunicación ni organización con intereses particulares.
          </p>
          <p className="mt-3">
            No emitimos juicios de valor sobre si un gasto es alto, bajo, bueno o malo. Presentamos los
            datos tal como están publicados en las fuentes oficiales, con las explicaciones necesarias para
            que cada ciudadano pueda formar su propia opinión.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-semibold text-foreground">No es una web oficial</h2>
          <p className="mt-3">
            Esta web <strong className="text-foreground">no es oficial</strong>. No representa a ninguna
            administración pública. Usa datos públicos procedentes de fuentes oficiales (CONPREL, ISPA, INE),
            pero la presentación, cálculos y explicaciones son responsabilidad del proyecto.
          </p>
          <p className="mt-3">
            Las cifras pueden depender del año disponible, de la información remitida por cada entidad local
            y del proceso de importación. Siempre indicamos la fuente, el año y las limitaciones conocidas.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-semibold text-foreground">Fuentes de datos</h2>
          <p className="mt-3">
            Toda la información presupuestaria procede de fuentes oficiales publicadas por las administraciones
            públicas españolas. Para más detalles, consulta nuestra{" "}
            <Link href="/fuentes" className="font-medium text-primary underline">
              página de fuentes y metodología
            </Link>.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-semibold text-foreground">Metodología abierta</h2>
          <p className="mt-3">
            Aspiramos a que tanto la metodología como el código fuente del proyecto sean abiertos en el
            futuro, permitiendo la revisión, mejora y reutilización por parte de la comunidad.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-lg font-semibold text-foreground">Contacto</h2>
          <p className="mt-3">
            Si tienes sugerencias, detectas errores en los datos o quieres colaborar con el proyecto,
            puedes contactarnos a través del repositorio del proyecto o por correo electrónico.
          </p>
          <p className="mt-2 text-xs italic">
            (Información de contacto pendiente de configurar.)
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link href="/fuentes" className={buttonVariants({ variant: "outline" })}>
          Ver fuentes y metodología
        </Link>
      </div>
    </div>
  )
}
