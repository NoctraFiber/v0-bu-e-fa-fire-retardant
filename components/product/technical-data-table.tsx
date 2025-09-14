import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TechnischeDaten } from "@/lib/data-loader"

interface TechnicalDataTableProps {
  data: TechnischeDaten
}

export function TechnicalDataTable({ data }: TechnicalDataTableProps) {
  const rows = [
    {
      label: "Harzbasis",
      value: data.harzbasis,
    },
    {
      label: "Nichtflüchtige Anteile",
      value: data.nichtflüchtigeAnteileProzent ? `${data.nichtflüchtigeAnteileProzent}%` : null,
    },
    {
      label: "Viskosität",
      value: data.viskositaet?.wert
        ? `${data.viskositaet.wert} ${data.viskositaet.einheit}${
            data.viskositaet.messverfahren ? ` (${data.viskositaet.messverfahren})` : ""
          }${data.viskositaet.hinweis ? ` - ${data.viskositaet.hinweis}` : ""}`
        : data.viskositaet?.hinweis || null,
    },
    {
      label: "Bruchdehnung",
      value: data.bruchdehnungProzent
        ? `${data.bruchdehnungProzent}%${data.bruchdehnungHinweis ? ` (${data.bruchdehnungHinweis})` : ""}`
        : null,
    },
    {
      label: "Zugfestigkeit",
      value: data.zugfestigkeit_MPa
        ? `${data.zugfestigkeit_MPa} MPa${data.zugfestigkeitHinweis ? ` (${data.zugfestigkeitHinweis})` : ""}`
        : null,
    },
    {
      label: "HDT (Heat Deflection Temperature)",
      value: data.hdt_C ? `${data.hdt_C}°C` : null,
    },
    {
      label: "Zugscherfestigkeit",
      value: data.zugscherfestigkeit_N_mm2 ? `${data.zugscherfestigkeit_N_mm2} N/mm²` : null,
    },
  ].filter((row) => row.value !== null && row.value !== undefined)

  if (rows.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-[#03479c]">Technische Daten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-4 font-medium text-gray-700 border-b border-gray-200">{row.label}</td>
                  <td className="py-3 px-4 text-gray-900 border-b border-gray-200">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
