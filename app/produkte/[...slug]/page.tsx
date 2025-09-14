import { notFound } from "next/navigation"
import Link from "next/link"
import { loadData } from "@/lib/data-loader"
import { Breadcrumbs } from "@/components/product/breadcrumbs"
import { TechnicalDataTable } from "@/components/product/technical-data-table"
import { RelatedProducts } from "@/components/product/related-products"
import { ContactSection } from "@/components/product/contact-section"
import { BadgeCustom } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { produkte } = loadData()
  const productSlug = params.slug.join("/")
  const product = produkte.find((p) => p.slug === productSlug)

  if (!product) {
    return {
      title: "Produkt nicht gefunden",
    }
  }

  return {
    title: `${product.produktName} - BÜFA Fire Retardant Products`,
    description: product.beschreibung,
    openGraph: {
      title: product.produktName,
      description: product.beschreibung,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  const { produkte } = loadData()
  return produkte.map((product) => ({
    slug: product.slug.split("/"),
  }))
}

export default function ProductPage({ params }: ProductPageProps) {
  const { produkte, kontaktInformationen } = loadData()
  const productSlug = params.slug.join("/")
  const product = produkte.find((p) => p.slug === productSlug)

  if (!product) {
    notFound()
  }

  // Get related products from same category/subcategory
  const relatedProducts = produkte.filter(
    (p) =>
      p.kategorie === product.kategorie &&
      (product.unterkategorie ? p.unterkategorie === product.unterkategorie : !p.unterkategorie),
  )

  // Build breadcrumbs
  const breadcrumbItems = [{ label: "Produktübersicht", href: "/" }, { label: product.kategorie }]

  if (product.unterkategorie) {
    breadcrumbItems.push({ label: product.unterkategorie })
  }

  breadcrumbItems.push({ label: product.produktName })

  const getAvailabilityBadgeVariant = (verfuegbarkeit: string) => {
    switch (verfuegbarkeit) {
      case "lagernd":
        return "available"
      case "auf Anfrage":
        return "on-request"
      default:
        return "default"
    }
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.produktName,
    description: product.beschreibung,
    manufacturer: {
      "@type": "Organization",
      name: "BÜFA Composite Systems GmbH & Co. KG",
    },
    offers: {
      "@type": "Offer",
      availability: product.verfuegbarkeit === "lagernd" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
    },
    ...(product.artikelNr && { sku: product.artikelNr }),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-6">
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Übersicht
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Product Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold text-[#03479c] text-balance">{product.produktName}</h1>
                <div className="flex flex-col gap-2 shrink-0">
                  {product.isNew && <BadgeCustom variant="new">Neu</BadgeCustom>}
                  <BadgeCustom variant={getAvailabilityBadgeVariant(product.verfuegbarkeit)}>
                    {product.verfuegbarkeit}
                  </BadgeCustom>
                </div>
              </div>
              <p className="text-lg text-gray-700 text-pretty">{product.beschreibung}</p>
            </div>

            {/* Technical Data */}
            {product.technischeDaten && <TechnicalDataTable data={product.technischeDaten} />}

            {/* Advantages & Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#03479c]">Vorteile & Anwendung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 mb-4">{product.beschreibung}</p>

                  {/* Extract typical processes from technical data */}
                  {product.technischeDaten?.harzbasis && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Typische Verfahren</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {product.beschreibung.includes("Vakuum-Infusion") && <li>Vakuum-Infusion (VI)</li>}
                        {product.beschreibung.includes("RTM") && <li>Resin Transfer Moulding (RTM)</li>}
                        {product.beschreibung.includes("Handlaminier") && <li>Handlaminierverfahren (HLU)</li>}
                        {product.beschreibung.includes("Spritz") && <li>Spritzverfahren</li>}
                        {!product.beschreibung.match(/(Vakuum-Infusion|RTM|Handlaminier|Spritz)/) && (
                          <li>Verschiedene Verarbeitungsverfahren möglich</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability & Article Number */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-[#03479c]">Verfügbarkeit & Artikelnummer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Verfügbarkeit:</span>
                    <BadgeCustom variant={getAvailabilityBadgeVariant(product.verfuegbarkeit)}>
                      {product.verfuegbarkeit}
                    </BadgeCustom>
                  </div>
                  {product.artikelNr && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Artikelnummer:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{product.artikelNr}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <RelatedProducts products={relatedProducts} currentProductSlug={product.slug} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ContactSection kontaktInfo={kontaktInformationen} />
          </div>
        </div>
      </div>
    </>
  )
}
