import { loadData } from "@/lib/data-loader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Globe, Clock, User } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt - BÜFA Composite Systems | BÜFA Fire Retardant Products",
  description:
    "Kontaktieren Sie unsere Brandschutz-Experten für individuelle Beratung zu brandhemmenden Gelcoats, Harzen und Systemlösungen. Direkter Draht zu Joe Mardoukh und dem BÜFA-Team.",
  openGraph: {
    title: "Kontakt - BÜFA Brandschutz-Experten",
    description: "Professionelle Beratung zu Brandschutz-Lösungen. Kontaktieren Sie unsere Experten direkt.",
    type: "website",
  },
}

export default function ContactPage() {
  const { kontaktInformationen } = loadData()
  const { hauptsitz, ansprechpartner } = kontaktInformationen

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#03479c] mb-4">Kontakt</h1>
        <p className="text-lg text-gray-700 max-w-3xl text-pretty">
          Haben Sie Fragen zu unseren Brandschutz-Produkten oder benötigen Sie eine individuelle Beratung? Unser
          Expertenteam steht Ihnen gerne zur Verfügung und unterstützt Sie bei der Auswahl der optimalen Lösung für Ihre
          Anwendung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Expert Contact */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl text-[#03479c] flex items-center gap-2">
              <User className="w-5 h-5" />
              Brandschutz-Experte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#03479c] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {ansprechpartner.brandschutzExperte.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{ansprechpartner.brandschutzExperte.name}</h3>
              <p className="text-gray-600">{ansprechpartner.brandschutzExperte.position}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">Telefon</p>
                  <a
                    href={`tel:${ansprechpartner.brandschutzExperte.telefon}`}
                    className="text-[#03479c] hover:text-[#02356b] transition-colors"
                  >
                    {ansprechpartner.brandschutzExperte.telefon}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">E-Mail</p>
                  <a
                    href={`mailto:${ansprechpartner.brandschutzExperte.email}`}
                    className="text-[#03479c] hover:text-[#02356b] transition-colors"
                  >
                    {ansprechpartner.brandschutzExperte.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">Erreichbarkeit</p>
                  <p className="text-gray-600">Mo-Fr: 8:00-17:00 Uhr</p>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-[#03479c] hover:bg-[#02356b] text-white" size="lg">
              <a href={`mailto:${ansprechpartner.brandschutzExperte.email}?subject=Anfrage zu Brandschutzprodukten`}>
                <Mail className="w-4 h-4 mr-2" />
                Beratung anfragen
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-xl text-[#03479c] flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Unternehmen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{hauptsitz.firma}</h3>
              <div className="space-y-2 text-gray-600">
                <p>{hauptsitz.adresse.strasse}</p>
                <p>
                  {hauptsitz.adresse.plz} {hauptsitz.adresse.ort}
                </p>
                <p>{hauptsitz.adresse.land}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">Zentrale</p>
                  <a
                    href={`tel:${hauptsitz.telefon}`}
                    className="text-[#03479c] hover:text-[#02356b] transition-colors"
                  >
                    {hauptsitz.telefon}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">Allgemeine Anfragen</p>
                  <a
                    href={`mailto:${hauptsitz.email}`}
                    className="text-[#03479c] hover:text-[#02356b] transition-colors"
                  >
                    {hauptsitz.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-[#03479c]" />
                <div>
                  <p className="font-medium">Website</p>
                  <a
                    href={`https://${hauptsitz.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#03479c] hover:text-[#02356b] transition-colors"
                  >
                    {hauptsitz.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold text-gray-900 mb-2">Anfahrt</h4>
              <p className="text-sm text-gray-600 mb-3">
                Unser Hauptsitz befindet sich in Rastede, zwischen Oldenburg und Wilhelmshaven. Gerne können Sie einen
                Termin für einen Besuch vor Ort vereinbaren.
              </p>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${hauptsitz.adresse.strasse}, ${hauptsitz.adresse.plz} ${hauptsitz.adresse.ort}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Route planen
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#03479c]">Unsere Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Brandschutz-Gelcoats und Topcoats
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Halogenfreie und halogenierte Harze
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Systemlösungen nach EN 45545-2
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Technische Beratung und Support
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Individuelle Produktentwicklung
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-[#03479c]">Branchen</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Schienenfahrzeugbau
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Schiffbau und Marine
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Bauindustrie
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Luft- und Raumfahrt
              </li>
              <li className="flex items-start">
                <span className="text-[#03479c] mr-2">•</span>
                Industrielle Anwendungen
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
