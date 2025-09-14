import type { Metadata } from "next"
import AbbreviationsClientPage from "./AbbreviationsClientPage"

export const metadata: Metadata = {
  title: "Abkürzungen - Fachbegriffe Brandschutz | BÜFA Fire Retardant Products",
  description:
    "Übersicht aller wichtigen Abkürzungen aus dem Bereich Brandschutz und Composite-Materialien. Von DCPD über RTM bis VI - alle Begriffe verständlich erklärt.",
  openGraph: {
    title: "Brandschutz-Abkürzungen",
    description: "Vollständige Liste aller Abkürzungen und Fachbegriffe aus dem Brandschutz-Bereich.",
    type: "website",
  },
}

export default function AbbreviationsPage() {
  return <AbbreviationsClientPage />
}
