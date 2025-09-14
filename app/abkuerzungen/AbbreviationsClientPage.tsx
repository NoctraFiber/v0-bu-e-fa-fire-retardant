"use client"

import { loadData } from "@/lib/data-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"

export default function AbbreviationsClientPage() {
  const { abkuerzungen } = loadData()

  // Convert object to array and sort alphabetically
  const sortedAbkuerzungen = Object.entries(abkuerzungen).sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#03479c] mb-4">Abkürzungen</h1>
        <p className="text-lg text-gray-700 max-w-3xl text-pretty">
          Übersicht aller wichtigen Abkürzungen aus dem Bereich Brandschutz und Composite-Materialien. Schnell und
          einfach die Bedeutung von Fachbegriffen nachschlagen.
        </p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="max-w-md">
            <Label htmlFor="abbreviation-search" className="sr-only">
              Abkürzungen durchsuchen
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="abbreviation-search"
                placeholder="Abkürzung oder Begriff suchen..."
                className="pl-10"
                onChange={(e) => {
                  const searchTerm = e.target.value.toLowerCase()
                  const rows = document.querySelectorAll("[data-abbreviation-row]")
                  rows.forEach((row) => {
                    const text = row.textContent?.toLowerCase() || ""
                    const shouldShow = text.includes(searchTerm)
                    ;(row as HTMLElement).style.display = shouldShow ? "table-row" : "none"
                  })
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abbreviations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-[#03479c]">
            Abkürzungsverzeichnis ({sortedAbkuerzungen.length} Einträge)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-[#03479c] bg-gray-50">Abkürzung</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#03479c] bg-gray-50">Bedeutung</th>
                </tr>
              </thead>
              <tbody>
                {sortedAbkuerzungen.map(([abkuerzung, bedeutung], index) => (
                  <tr
                    key={abkuerzung}
                    data-abbreviation-row
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-semibold text-[#03479c] bg-blue-50 border-r border-gray-100">
                      {abkuerzung}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{bedeutung}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#03479c]">Harzbasis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono font-semibold">DCPD</span>
                <span className="text-gray-600">Dicyclopentadien</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">OP</span>
                <span className="text-gray-600">Orthophthalsäure</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">IP</span>
                <span className="text-gray-600">Isophthalsäure</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">VE</span>
                <span className="text-gray-600">Vinylester</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#03479c]">Verfahren</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono font-semibold">RTM</span>
                <span className="text-gray-600">Resin Transfer Moulding</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">VI</span>
                <span className="text-gray-600">Vakuum-Infusion</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">HLU</span>
                <span className="text-gray-600">Handlaminierverfahren</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#03479c]">Einheiten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-mono font-semibold">MPa</span>
                <span className="text-gray-600">Megapascal</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">mPas</span>
                <span className="text-gray-600">Millipascal-Sekunde</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono font-semibold">HDT</span>
                <span className="text-gray-600">Heat Deflection Temperature</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl text-[#03479c]">Weitere Informationen</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Für detailliertere Erklärungen zu den Fachbegriffen besuchen Sie unser Glossar oder kontaktieren Sie unseren
            Brandschutz-Experten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/glossar"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#03479c] text-white rounded-md hover:bg-[#02356b] transition-colors"
            >
              Zum Glossar
            </a>
            <a
              href="/kontakt"
              className="inline-flex items-center justify-center px-4 py-2 border border-[#03479c] text-[#03479c] rounded-md hover:bg-[#03479c] hover:text-white transition-colors"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
