import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="text-gray-400 mb-6">
          <Search className="w-16 h-16 mx-auto" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produkt nicht gefunden</h1>

        <p className="text-gray-600 mb-8">
          Das gesuchte Produkt konnte nicht gefunden werden. Möglicherweise wurde es verschoben oder ist nicht mehr
          verfügbar.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full bg-[#03479c] hover:bg-[#02356b] text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zur Produktübersicht
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/kontakt">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
