import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Fuentes y metodología",
  description:
    "Explicación de las fuentes oficiales, metodología y limitaciones de los datos presupuestarios municipales.",
}

export default function FuentesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Fuentes y metodología</h1>
      <p className="mt-3 text-muted-foreground">
        Toda la información de esta web procede de fuentes oficiales públicas. Aquí explicamos
        de dónde salen los datos, qué significan y qué limitaciones tienen.
      </p>

      <Separator className="my-8" />

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold">De dónde salen los datos</h2>
          <div className="mt-4 space-y-4">
            <SourceBlock
              name="CONPREL - Ministerio de Hacienda"
              url="https://serviciostelematicosext.hacienda.gob.es/SGFAL/CONPREL"
              description="Es la fuente principal de presupuestos y liquidaciones de entidades locales en España. Publica datos agregados en Excel y datos por entidad local con máximo nivel de desglose."
            />
            <SourceBlock
              name="ISPA - Estadísticas de retribuciones"
              url="https://digital.gob.es/funcion-publica/dgfp/espacio-ispa/estadisticas"
              description="Publica informes y listados anuales de retribuciones de cargos electos y empleados públicos de entidades locales."
            />
            <SourceBlock
              name="INE - Instituto Nacional de Estadística"
              url="https://www.ine.es"
              description="Cifras oficiales de población municipal resultantes de la revisión anual del padrón."
            />
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold">Qué son los presupuestos y liquidaciones</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              El <strong className="text-foreground">presupuesto</strong> es el plan financiero que aprueba
              el pleno del ayuntamiento cada año. Indica cuánto se prevé gastar e ingresar.
            </p>
            <p>
              La <strong className="text-foreground">liquidación</strong> es el resultado real de lo que
              efectivamente se gastó e ingresó al cierre del ejercicio.
            </p>
            <p>
              Dentro de una liquidación se distinguen varias fases:
            </p>
            <ul className="ml-4 list-disc space-y-1">
              <li><strong className="text-foreground">Presupuesto inicial:</strong> lo aprobado originalmente.</li>
              <li><strong className="text-foreground">Presupuesto definitivo:</strong> incluye modificaciones aprobadas durante el año.</li>
              <li><strong className="text-foreground">Obligaciones reconocidas:</strong> gasto efectivamente comprometido con terceros.</li>
              <li><strong className="text-foreground">Pagos:</strong> dinero efectivamente pagado.</li>
              <li><strong className="text-foreground">Derechos reconocidos:</strong> ingresos que el ayuntamiento tiene derecho a cobrar.</li>
            </ul>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold">Clasificación económica y capítulos</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              La <strong className="text-foreground">clasificación económica</strong> organiza los gastos e
              ingresos según su naturaleza, siguiendo la Orden EHA/3565/2008 del Ministerio de Hacienda.
            </p>
            <p>
              Se estructura en <strong className="text-foreground">capítulos</strong> (nivel más agregado, del 1 al 9),
              artículos, conceptos y subconceptos. En esta web mostramos principalmente el nivel de capítulo.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">Capítulos de gasto</h3>
                  <ol className="mt-2 space-y-1 text-xs">
                    <li>1. Gastos de personal</li>
                    <li>2. Gastos corrientes en bienes y servicios</li>
                    <li>3. Gastos financieros</li>
                    <li>4. Transferencias corrientes</li>
                    <li>5. Fondo de contingencia</li>
                    <li>6. Inversiones reales</li>
                    <li>7. Transferencias de capital</li>
                    <li>8. Activos financieros</li>
                    <li>9. Pasivos financieros</li>
                  </ol>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground">Capítulos de ingreso</h3>
                  <ol className="mt-2 space-y-1 text-xs">
                    <li>1. Impuestos directos</li>
                    <li>2. Impuestos indirectos</li>
                    <li>3. Tasas, precios públicos y otros ingresos</li>
                    <li>4. Transferencias corrientes</li>
                    <li>5. Ingresos patrimoniales</li>
                    <li>6. Enajenación de inversiones reales</li>
                    <li>7. Transferencias de capital</li>
                    <li>8. Activos financieros</li>
                    <li>9. Pasivos financieros</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold">Cómo se calculan los indicadores</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Gasto por habitante:</strong> presupuesto total de gastos
              dividido entre la población oficial del municipio (fuente INE).
            </p>
            <p>
              <strong className="text-foreground">Ingreso por habitante:</strong> presupuesto total de ingresos
              dividido entre la población.
            </p>
            <p>
              <strong className="text-foreground">Inversión por habitante:</strong> importe del capítulo 6
              (inversiones reales) dividido entre la población.
            </p>
            <p>
              <strong className="text-foreground">Porcentaje de cada capítulo:</strong> importe del capítulo
              dividido entre el total de gastos o ingresos, multiplicado por 100.
            </p>
            <p>
              <strong className="text-foreground">Resumen ciudadano &ldquo;de cada 100 €&rdquo;:</strong> se
              redondea el porcentaje de cada capítulo principal para expresar la distribución de forma intuitiva.
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-xl font-semibold">Limitaciones conocidas</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <ul className="ml-4 list-disc space-y-2">
              <li>No todos los municipios de España están cargados actualmente.</li>
              <li>Los datos dependen de la información remitida por cada ayuntamiento a las fuentes oficiales.</li>
              <li>Puede haber municipios con datos incompletos o de años anteriores al más reciente.</li>
              <li>Las cifras de retribuciones pueden no estar disponibles si el ayuntamiento no remitió la información al ISPA.</li>
              <li>La población utilizada para cálculos per cápita puede no corresponder exactamente al mismo año que el presupuesto.</li>
              <li>Los datos de demostración (marcados como &ldquo;demo&rdquo;) son ilustrativos y deben sustituirse por importaciones oficiales.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function SourceBlock({ name, url, description }: { name: string; url: string; description: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-primary hover:text-primary/80"
            aria-label={`Enlace oficial a ${name}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
