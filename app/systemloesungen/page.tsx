import { loadData } from "@/lib/data-loader"
import { SystemCombinationCard } from "@/components/system/system-combination-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCustom } from "@/components/ui/badge-custom"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Systemlösungen - BÜFA FireFox System | BÜFA Fire Retardant Products",
  description:
    "Das BÜFA FireFox-System kombiniert flammhemmende Gelcoats und hochstabile Laminatstrukturen für maximale Festigkeit bei geringem Gewicht.",
  alternates: {
    canonical: "/systemloesungen",
  },
  openGraph: {
    title: "BÜFA FireFox Systemlösungen",
    description:
      "Hochleistungs-Brandschutzsysteme mit intumeszierenden Gelcoats und Brandschutz-Injektionsharzen für verschiedene Normen und Klassifizierungen.",
    type: "website",
  },
}

export default function SystemSolutionsPage() {
  const { systemLoesungen, produkte } = loadData()

  // Count new combinations
  const newCombinationsCount = systemLoesungen.kombinationen.filter((k) => k.isNew).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold text-[#03479c] text-balance">BÜFA®-FireFox Systemlösungen</h1>
          {newCombinationsCount > 0 && (
            <BadgeCustom variant="new">{newCombinationsCount} neue Kombinationen</BadgeCustom>
          )}
        </div>

        <div className="max-w-4xl">
          <p className="text-lg text-gray-700 mb-6 text-pretty">{systemLoesungen.beschreibung}</p>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#03479c]">Systemvorteile</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Maximale Festigkeit und Steifigkeit
                </li>
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Extrem geringes Gewicht
                </li>
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Flammhemmende Eigenschaften
                </li>
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Glasfaserverstärkte Laminatstrukturen
                </li>
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Verschiedene Verfahren möglich
                </li>
                <li className="flex items-start">
                  <span className="text-[#03479c] mr-2">•</span>
                  Normkonform nach EN 45545-2
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Combinations */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#03479c] mb-6">Systemkombinationen</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {systemLoesungen.kombinationen.map((combination, index) => (
            <SystemCombinationCard key={index} combination={combination} products={produkte} />
          ))}
        </div>
      </div>

      {/* Technical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-[#03479c]">Technische Hinweise</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Verfahren</h4>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>VI:</strong> Vakuum-Infusion
                </li>
                <li>
                  <strong>RTM:</strong> Resin Transfer Moulding
                </li>
                <li>
                  <strong>HLU:</strong> Handlaminierverfahren
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Klassifizierungen</h4>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>HL 2:</strong> Hazard Level 2 (mittlere Anforderungen)
                </li>
                <li>
                  <strong>HL 3:</strong> Hazard Level 3 (höchste Anforderungen)
                </li>
                <li>
                  <strong>R1, R7, R17:</strong> Verschiedene Anwendungsbereiche nach EN 45545-2
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Wirkungsweise</h4>
              <p className="text-gray-700">
                <strong>Intumeszierend:</strong> Bildung einer aufgeschäumten, sauerstoffundurchlässigen Schicht durch
                Hitzeeinwirkung, die das darunter liegende Laminat schützt.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Anwendungsbereiche</h4>
              <ul className="space-y-1 text-gray-700">
                <li>Schienenfahrzeuge</li>
                <li>Schiffbau</li>
                <li>Bauindustrie</li>
                <li>Luft- und Raumfahrt</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
