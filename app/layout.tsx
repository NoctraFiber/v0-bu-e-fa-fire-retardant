import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Suspense } from "react"
import JsonLd from "@/components/JsonLd"

export const metadata: Metadata = {
  title: {
    default: "BÜFA Fire Retardant Products - Brandschutz-Lösungen",
    template: "%s | BÜFA Fire Retardant Products",
  },
  description:
    "Hochwertige brandhemmende Gelcoats, Harze und Systemlösungen von BÜFA Composite Systems für den professionellen Brandschutz. Normkonform nach EN 45545-2.",
  keywords: [
    "Brandschutz",
    "Gelcoats",
    "Harze",
    "Composite",
    "EN 45545-2",
    "Intumeszenz",
    "ATH",
    "Vakuum-Infusion",
    "RTM",
    "BÜFA",
    "Fire Retardant",
    "Schienenfahrzeuge",
    "Schiffbau",
  ],
  authors: [{ name: "BÜFA Composite Systems GmbH & Co. KG" }],
  creator: "BÜFA Composite Systems",
  publisher: "BÜFA Composite Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://buefa-fire-retardant.vercel.app"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://buefa-fire-retardant.vercel.app",
    siteName: "BÜFA Fire Retardant Products",
    title: "BÜFA Fire Retardant Products - Brandschutz-Lösungen",
    description: "Hochwertige brandhemmende Gelcoats, Harze und Systemlösungen für den professionellen Brandschutz.",
    images: [
      {
        url: "/og-image.jpg", // You would add this image
        width: 1200,
        height: 630,
        alt: "BÜFA Fire Retardant Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BÜFA Fire Retardant Products",
    description: "Hochwertige brandhemmende Gelcoats, Harze und Systemlösungen für den professionellen Brandschutz.",
    images: ["/og-image.jpg"], // You would add this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const webSiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BÜFA Fire Retardant",
    "url": "https://brandschutz.buefa-composites.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://brandschutz.buefa-composites.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BÜFA Composite Systems",
    "url": "https://www.buefa-composites.com/",
    "logo": "https://brandschutz.buefa-composites.com/assets/logo.png"
  }

  return (
    <html lang="de">
      <head></head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <JsonLd data={webSiteLd} />
        <JsonLd data={organizationLd} />
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
