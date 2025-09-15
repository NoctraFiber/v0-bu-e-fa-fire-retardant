import type { Metadata } from "next"
import GlossaryClientPage from "./GlossaryClientPage"

export const metadata: Metadata = {
  title: "Glossar - Brandschutz-Fachbegriffe | BÜFA Fire Retardant Products",
  description:
    "Umfassendes Glossar mit wichtigen Fachbegriffe aus dem Bereich Brandschutz und Composite-Materialien. Verständliche Erklärungen zu ATH, Intumeszenz, EN 45545-2 und mehr.",
  alternates: {
    canonical: "/glossar",
  },
  openGraph: {
    title: "Brandschutz-Glossar",
    description: "Fachbegriffe und Definitionen rund um Brandschutz und Composite-Materialien verständlich erklärt.",
    type: "website",
  },
}

export default function GlossaryPage() {
  return <GlossaryClientPage />
}
