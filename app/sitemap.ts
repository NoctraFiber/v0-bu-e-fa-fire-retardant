import { loadData } from "@/lib/data-loader"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const { produkte } = loadData()
  const baseUrl = "https://brandschutz.buefa-composites.com"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/systemloesungen`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossar`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/abkuerzungen`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Product pages
  const productPages = produkte.map((product) => ({
    url: `${baseUrl}/produkte/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }))

  return [...staticPages, ...productPages]
}
