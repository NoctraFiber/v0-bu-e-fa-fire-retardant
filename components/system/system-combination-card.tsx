import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCustom } from "@/components/ui/badge-custom"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { SystemKombination, Produkt } from "@/lib/data-loader"

interface SystemCombinationCardProps {
  combination: SystemKombination
  products: Produkt[]
}

export function SystemCombinationCard({ combination, products }: SystemCombinationCardProps) {
  // Extract product names from the system string and find matching products
  const extractProductNames = (systemString: string) => {
    // Split by " + " to get individual product names
    return systemString.split(" + ").map((name) => name.trim())
  }

  const findProductByName = (productName: string) => {
    return products.find((p) => p.produktName === productName)
  }

  const productNames = extractProductNames(combination.system)
  const linkedProducts = productNames.map((name) => ({
    name,
    product: findProductByName(name),
  }))

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg text-[#03479c] text-balance">{combination.system}</CardTitle>
          {combination.isNew && <BadgeCustom variant="new">Neu</BadgeCustom>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* System Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Wirkungsweise:</span>
            <p className="text-gray-600">{combination.gelcoatWirkungsweise}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Norm:</span>
            <p className="text-gray-600">{combination.norm}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Klassifizierung:</span>
            <p className="text-gray-600">{combination.klassifizierung}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Verfahren:</span>
            <p className="text-gray-600">{combination.verfahren}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Lackierung:</span>
            <p className="text-gray-600">{combination.lackierung ? "Ja" : "Nein"}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Fasergehalt:</span>
            <p className="text-gray-600">
              {combination.fasergehaltGewichtsprozent.min}–{combination.fasergehaltGewichtsprozent.max}%
            </p>
          </div>
          <div className="sm:col-span-2">
            <span className="font-medium text-gray-700">Laminatdicke:</span>
            <p className="text-gray-600">{combination.laminatdicke_mm} mm</p>
          </div>
        </div>

        {/* Linked Products */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">Verwendete Produkte:</h4>
          <div className="space-y-2">
            {linkedProducts.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.name}</span>
                {item.product ? (
                  <Button asChild size="sm" variant="outline" className="text-xs bg-transparent">
                    <Link href={`/produkte/${item.product.slug}`}>
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Details
                    </Link>
                  </Button>
                ) : (
                  <span className="text-xs text-gray-400">Nicht verfügbar</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
