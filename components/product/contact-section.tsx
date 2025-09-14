import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import type { KontaktInfo } from "@/lib/data-loader"

interface ContactSectionProps {
  kontaktInfo: KontaktInfo
}

export function ContactSection({ kontaktInfo }: ContactSectionProps) {
  const { hauptsitz, ansprechpartner } = kontaktInfo

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-[#03479c]">Kontakt & Beratung</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Brandschutz-Experte</h4>
          <div className="space-y-2 text-sm">
            <p className="font-medium">{ansprechpartner.brandschutzExperte.name}</p>
            <p className="text-gray-600">{ansprechpartner.brandschutzExperte.position}</p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{ansprechpartner.brandschutzExperte.telefon}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{ansprechpartner.brandschutzExperte.email}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Hauptsitz</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>{hauptsitz.firma}</p>
            <p>{hauptsitz.adresse.strasse}</p>
            <p>
              {hauptsitz.adresse.plz} {hauptsitz.adresse.ort}
            </p>
            <p>{hauptsitz.telefon}</p>
          </div>
        </div>

        <Button asChild className="w-full bg-[#03479c] hover:bg-[#02356b] text-white">
          <a href={`mailto:${ansprechpartner.brandschutzExperte.email}?subject=Anfrage zu Brandschutzprodukten`}>
            <Mail className="w-4 h-4 mr-2" />
            Beratung anfragen
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
