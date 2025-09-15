import { Produkt } from "./data-loader"

/**
 * Extends the base product type with optional offer details for SEO purposes.
 */
export interface ProductWithOffer extends Produkt {
  price?: number
  priceCurrency?: string
}

/**
 * Maps the internal availability status of a product to a schema.org ItemAvailability URL.
 * @param availabilityStatus The availability status string from the product data.
 * @returns The corresponding schema.org URL.
 */
const mapAvailabilityToSchema = (availabilityStatus: string): string => {
  const mapping: { [key: string]: string } = {
    "Auf Anfrage": "https://schema.org/Inquire",
    lagernd: "https://schema.org/InStock",
    Bestellartikel: "https://schema.org/PreOrder",
  }
  // Default to Inquire if the status is not recognized.
  return mapping[availabilityStatus] || "https://schema.org/Inquire"
}

/**
 * Builds a JSON-LD object for a product, conforming to the schema.org "Product" type.
 * This includes creating an Offer to specify availability and, if available, price.
 *
 * @param p The product data, which may include price and currency.
 * @returns A JSON-LD object for the product.
 */
export const buildProductJsonLd = (p: ProductWithOffer) => {
  const jsonLd: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.produktName,
    description: p.beschreibung,
    sku: p.artikelNr || undefined,
    url: `https://brandschutz.buefa-composites.com/produkte/${p.slug}`,
    brand: {
      "@type": "Organization",
      name: "BÜFA",
    },
  }

  // Create the offer part. Availability is always present.
  const offer: any = {
    "@type": "Offer",
    availability: mapAvailabilityToSchema(p.verfuegbarkeit),
  }

  // Add price information only if it exists
  if (p.price && p.priceCurrency) {
    offer.price = p.price
    offer.priceCurrency = p.priceCurrency
  }

  jsonLd.offers = offer

  // Clean up undefined sku before returning
  if (!jsonLd.sku) {
    delete jsonLd.sku
  }

  return jsonLd
}
