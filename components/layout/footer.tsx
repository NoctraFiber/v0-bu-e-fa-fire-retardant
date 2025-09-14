import { loadData } from "@/lib/data-loader"

export function Footer() {
  const { kontaktInformationen, metadaten } = loadData()

  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-[#03479c] mb-4">BÜFA Composite Systems</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{kontaktInformationen.hauptsitz.adresse.strasse}</p>
              <p>
                {kontaktInformationen.hauptsitz.adresse.plz} {kontaktInformationen.hauptsitz.adresse.ort}
              </p>
              <p>{kontaktInformationen.hauptsitz.adresse.land}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#03479c] mb-4">Kontakt</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Tel: {kontaktInformationen.hauptsitz.telefon}</p>
              <p>E-Mail: {kontaktInformationen.hauptsitz.email}</p>
              <p>Web: {kontaktInformationen.hauptsitz.website}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#03479c] mb-4">Brandschutz-Experte</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{kontaktInformationen.ansprechpartner.brandschutzExperte.name}</p>
              <p>{kontaktInformationen.ansprechpartner.brandschutzExperte.position}</p>
              <p>Tel: {kontaktInformationen.ansprechpartner.brandschutzExperte.telefon}</p>
              <p>E-Mail: {kontaktInformationen.ansprechpartner.brandschutzExperte.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          <p>{metadaten.copyright}</p>
          <p className="mt-2">{metadaten.hinweis}</p>
          <p className="mt-2">Letzte Aktualisierung: {metadaten.letzteAktualisierung}</p>
        </div>
      </div>
    </footer>
  )
}
