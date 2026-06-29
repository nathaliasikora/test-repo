import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { TooltipProvider } from "@/components/ui/tooltip"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Dónde van mis impuestos locales",
    template: "%s | Dónde van mis impuestos locales",
  },
  description:
    "Descubre dónde van tus impuestos en tu ayuntamiento. Datos oficiales de Hacienda sobre presupuestos municipales, gasto por habitante y retribuciones públicas.",
  openGraph: {
    title: "Dónde van mis impuestos locales",
    description:
      "Busca tu municipio y entiende su presupuesto, gasto por habitante, principales partidas y retribuciones públicas disponibles.",
    type: "website",
    locale: "es_ES",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TooltipProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
