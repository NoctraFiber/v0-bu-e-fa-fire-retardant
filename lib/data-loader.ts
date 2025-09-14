const bufaData = require("../data/bufa-fire-retardant.json")

export interface TechnischeDaten {
  harzbasis: string
  nichtflüchtigeAnteileProzent?: number | null
  viskositaet: {
    wert: number | null
    einheit: string
    messverfahren?: string | null
    hinweis?: string | null
  }
  bruchdehnungProzent?: number | null
  bruchdehnungHinweis?: string
  zugfestigkeit_MPa?: number | null
  zugfestigkeitHinweis?: string
  hdt_C?: number | null
  zugscherfestigkeit_N_mm2?: number | null
}

export interface Produkt {
  produktName: string
  artikelNr: string | null
  verfuegbarkeit: string
  isNew: boolean
  beschreibung: string
  technischeDaten?: TechnischeDaten
  eigenschaften?: Record<string, any>
  varianten?: any[]
  typ?: string
  kategorie: string
  unterkategorie?: string
  slug: string
}

export interface SystemKombination {
  system: string
  gelcoatWirkungsweise: string
  norm: string
  klassifizierung: string
  verfahren: string
  lackierung: boolean
  fasergehaltGewichtsprozent: {
    min: number
    max: number
  }
  laminatdicke_mm: number
  isNew?: boolean
}

export interface GlossarEintrag {
  begriff: string
  vollstaendigerName?: string
  definition: string
}

export interface KontaktInfo {
  hauptsitz: {
    firma: string
    adresse: {
      strasse: string
      plz: string
      ort: string
      land: string
    }
    telefon: string
    email: string
    website: string
  }
  ansprechpartner: {
    brandschutzExperte: {
      name: string
      position: string
      telefon: string
      email: string
    }
  }
}

// Utility function to create SEO-friendly slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/®/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

// Load and process the JSON data
export function loadData() {
  console.log("[v0] Loading BÜFA data...")

  try {
    const data = bufaData as any

    // Process products into flat list with category information
    const produkte: Produkt[] = []

    data.produktKategorien.forEach((kategorie: any) => {
      const kategorieSlug = createSlug(kategorie.kategorieName)

      if (kategorie.unterkategorien) {
        // Category has subcategories
        kategorie.unterkategorien.forEach((unterkategorie: any) => {
          const unterkategorieSlug = createSlug(unterkategorie.name)

          unterkategorie.produkte.forEach((produkt: any) => {
            produkte.push({
              ...produkt,
              kategorie: kategorie.kategorieName,
              unterkategorie: unterkategorie.name,
              slug: `${kategorieSlug}/${unterkategorieSlug}/${createSlug(produkt.produktName)}`,
            })
          })
        })
      } else {
        // Category has direct products
        kategorie.produkte.forEach((produkt: any) => {
          produkte.push({
            ...produkt,
            kategorie: kategorie.kategorieName,
            slug: `${kategorieSlug}/${createSlug(produkt.produktName)}`,
          })
        })
      }
    })

    console.log("[v0] Successfully loaded", produkte.length, "products")

    return {
      dokumentInfo: data.dokumentInfo,
      produktKategorien: data.produktKategorien,
      produkte,
      systemLoesungen: data.systemLoesungen,
      glossar: data.glossar as GlossarEintrag[],
      abkuerzungen: data.abkuerzungen,
      kontaktInformationen: data.kontaktInformationen as KontaktInfo,
      metadaten: data.metadaten,
    }
  } catch (error) {
    console.error("[v0] Error loading BÜFA data:", error)
    // Return empty data structure to prevent crashes
    return {
      dokumentInfo: {
        titel: "BÜFA Fire Retardant Products",
        version: "2024",
        sprache: "DE",
        erstellungsdatum: "2024-08",
        quelle: "BÜFA Composite Systems GmbH & Co. KG",
      },
      produktKategorien: [],
      produkte: [],
      systemLoesungen: { beschreibung: "", kombinationen: [] },
      glossar: [],
      abkuerzungen: {},
      kontaktInformationen: {} as KontaktInfo,
      metadaten: { letzteAktualisierung: "2024-08", hinweis: "", copyright: "" },
    }
  }
}

// Get unique values for filters
export function getFilterOptions(produkte: Produkt[]) {
  const kategorien = [...new Set(produkte.map((p) => p.kategorie))]
  const unterkategorien = [...new Set(produkte.filter((p) => p.unterkategorie).map((p) => p.unterkategorie!))]
  const harzbasen = [
    ...new Set(produkte.filter((p) => p.technischeDaten?.harzbasis).map((p) => p.technischeDaten!.harzbasis)),
  ]
  const verfuegbarkeiten = [...new Set(produkte.map((p) => p.verfuegbarkeit))]

  return {
    kategorien,
    unterkategorien,
    harzbasen,
    verfuegbarkeiten,
  }
}

// Search and filter products
export function filterProducts(
  produkte: Produkt[],
  filters: {
    search?: string
    kategorien?: string[]
    unterkategorien?: string[]
    harzbasen?: string[]
    verfuegbarkeiten?: string[]
    nurNeu?: boolean
  },
) {
  return produkte.filter((produkt) => {
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      const searchableText = `${produkt.produktName} ${produkt.beschreibung}`.toLowerCase()
      if (!searchableText.includes(searchTerm)) return false
    }

    // Category filters
    if (filters.kategorien?.length && !filters.kategorien.includes(produkt.kategorie)) return false
    if (
      filters.unterkategorien?.length &&
      (!produkt.unterkategorie || !filters.unterkategorien.includes(produkt.unterkategorie))
    )
      return false

    // Technical filters
    if (
      filters.harzbasen?.length &&
      (!produkt.technischeDaten?.harzbasis || !filters.harzbasen.includes(produkt.technischeDaten.harzbasis))
    )
      return false
    if (filters.verfuegbarkeiten?.length && !filters.verfuegbarkeiten.includes(produkt.verfuegbarkeit)) return false

    // New products filter
    if (filters.nurNeu && !produkt.isNew) return false

    return true
  })
}

// Sort products
export function sortProducts(produkte: Produkt[], sortBy: string) {
  switch (sortBy) {
    case "a-z":
      return [...produkte].sort((a, b) => a.produktName.localeCompare(b.produktName))
    case "z-a":
      return [...produkte].sort((a, b) => b.produktName.localeCompare(a.produktName))
    case "neueste":
      return [...produkte].sort((a, b) => {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
        return a.produktName.localeCompare(b.produktName)
      })
    default: // relevanz
      return produkte
  }
}
