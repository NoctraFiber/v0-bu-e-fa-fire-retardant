import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCustom } from "@/components/ui/badge-custom"
import type { Produkt } from "@/lib/data-loader"

interface ProductCardProps {
  product: Produkt
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight text-balance">{product.produktName}</h3>
          <div className="flex flex-col gap-1 shrink-0">
            {product.isNew && <BadgeCustom variant="new">Neu</BadgeCustom>}
            <BadgeCustom variant={getAvailabilityBadgeVariant(product.verfuegbarkeit)}>
              {product.verfuegbarkeit}
            </BadgeCustom>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3 text-pretty">{product.beschreibung}</p>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        {/* Technical highlights */}
        {product.technischeDaten && (
          <div className="space-y-2 mb-4 text-sm">
            {product.technischeDaten.harzbasis && (
              <div className="flex justify-between">
                <span className="text-gray-600">Harzbasis:</span>
                <span className="font-medium">{product.technischeDaten.harzbasis}</span>
              </div>
            )}
            {product.technischeDaten.viskositaet?.wert && (
              <div className="flex justify-between">
                <span className="text-gray-600">Viskosität:</span>
                <span className="font-medium">
                  {product.technischeDaten.viskositaet.wert} {product.technischeDaten.viskositaet.einheit}
                </span>
              </div>
            )}
            {product.technischeDaten.hdt_C && (
              <div className="flex justify-between">
                <span className="text-gray-600">HDT:</span>
                <span className="font-medium">{product.technischeDaten.hdt_C}°C</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-auto">
          <Button asChild className="w-full bg-[#03479c] hover:bg-[#02356b] text-white">
            <Link href={`/produkte/${product.slug}`}>Details ansehen</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
