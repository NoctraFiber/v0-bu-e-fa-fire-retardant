"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import JsonLd from "@/components/JsonLd"

interface Faq {
  q: string
  a: string
}

interface FaqSectionProps {
  faq: Faq[]
}

export function FaqSection({ faq }: FaqSectionProps) {
  if (!faq || faq.length === 0) {
    return null
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-[#03479c]">Häufig gestellte Fragen (FAQ)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  )
}
