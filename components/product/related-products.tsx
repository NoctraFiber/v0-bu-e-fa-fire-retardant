import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BadgeCustom } from "@/components/ui/badge-custom"
import type { Produkt } from "@/lib/data-loader"

interface RelatedProductsProps {
  products: Produkt[]
  currentProductSlug: string
}

export function RelatedProducts({ products, currentProductSlug }: RelatedProductsProps) {
  const relatedProducts = products.filter((p) => p.slug !== currentProductSlug).slice(0, 3)

  if (relatedProducts.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-[#03479c]">Verwandte Produkte</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.slug} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm leading-tight">{product.produktName}</h4>
                {product.isNew && <BadgeCustom variant="new">Neu</BadgeCustom>}
              </div>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.beschreibung}</p>
              <Button asChild size="sm" variant="outline" className="w-full text-xs bg-transparent">
                <Link href={`/produkte/${product.slug}`}>Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
