"use client"

import { loadData } from "@/lib/data-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

export default function GlossaryClientPage() {
  const { glossar } = loadData()

  // Sort glossary alphabetically
  const sortedGlossar = [...glossar].sort((a, b) => a.begriff.localeCompare(b.begriff))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#03479c] mb-4">Glossar</h1>
        <p className="text-lg text-gray-700 max-w-3xl text-pretty">
          Wichtige Fachbegriffe aus dem Bereich Brandschutz und Composite-Materialien verständlich erklärt. Erweitern
          Sie Ihr Wissen über brandhemmende Eigenschaften, Normen und Verfahren.
        </p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="max-w-md">
            <Label htmlFor="glossary-search" className="sr-only">
              Glossar durchsuchen
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="glossary-search"
                placeholder="Begriff suchen..."
                className="pl-10"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase()
                  const items = document.querySelectorAll("[data-glossary-item]")
                  items.forEach((item) => {
                    const text = item.textContent?.toLowerCase() || ""
                    const shouldShow = text.includes(searchTerm)
                    ;(item as HTMLElement).style.display = shouldShow ? "block" : "none"
                  })
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Glossary Terms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedGlossar.map((eintrag, index) => (
          <Card key={index} data-glossary-item className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg text-[#03479c] flex items-center gap-2">
                <span className="bg-[#03479c] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {eintrag.begriff.charAt(0).toUpperCase()}
                </span>
                {eintrag.begriff}
                {eintrag.vollstaendigerName && (
                  <span className="text-sm font-normal text-gray-600">({eintrag.vollstaendigerName})</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-pretty">{eintrag.definition}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-[#03479c]">Weitere Informationen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Haben Sie Fragen zu weiteren Fachbegriffe oder benötigen Sie detailliertere Erklärungen? Unser
            Brandschutz-Experte steht Ihnen gerne zur Verfügung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#03479c] text-white rounded-md hover:bg-[#02356b] transition-colors"
            >
              Kontakt aufnehmen
            </a>
            <a
              href="/abkuerzungen"
              className="inline-flex items-center justify-center px-4 py-2 border border-[#03479c] text-[#03479c] rounded-md hover:bg-[#03479c] hover:text-white transition-colors"
            >
              Abkürzungen ansehen
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
