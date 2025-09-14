"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, X } from "lucide-react"

interface FilterOptions {
  kategorien: string[]
  unterkategorien: string[]
  harzbasen: string[]
  verfuegbarkeiten: string[]
}

interface Filters {
  search: string
  kategorien: string[]
  unterkategorien: string[]
  harzbasen: string[]
  verfuegbarkeiten: string[]
  nurNeu: boolean
  sortBy: string
}

interface ProductFiltersProps {
  filterOptions: FilterOptions
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  productCount: number
}

export function ProductFilters({ filterOptions, filters, onFiltersChange, productCount }: ProductFiltersProps) {
  const updateFilters = (updates: Partial<Filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      kategorien: [],
      unterkategorien: [],
      harzbasen: [],
      verfuegbarkeiten: [],
      nurNeu: false,
      sortBy: "relevanz",
    })
  }

  const hasActiveFilters =
    filters.search ||
    filters.kategorien.length > 0 ||
    filters.unterkategorien.length > 0 ||
    filters.harzbasen.length > 0 ||
    filters.verfuegbarkeiten.length > 0 ||
    filters.nurNeu

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filter & Suche</CardTitle>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Filter zurücksetzen
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Produktsuche</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Produktname oder Beschreibung durchsuchen..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label className="font-medium">Kategorien</Label>
            <div className="space-y-2">
              {filterOptions.kategorien.map((kategorie) => (
                <div key={kategorie} className="flex items-center space-x-2">
                  <Checkbox
                    id={`kategorie-${kategorie}`}
                    checked={filters.kategorien.includes(kategorie)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters({ kategorien: [...filters.kategorien, kategorie] })
                      } else {
                        updateFilters({ kategorien: filters.kategorien.filter((k) => k !== kategorie) })
                      }
                    }}
                  />
                  <Label htmlFor={`kategorie-${kategorie}`} className="text-sm leading-none">
                    {kategorie}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          <div className="space-y-3">
            <Label className="font-medium">Unterkategorien</Label>
            <div className="space-y-2">
              {filterOptions.unterkategorien.map((unterkategorie) => (
                <div key={unterkategorie} className="flex items-center space-x-2">
                  <Checkbox
                    id={`unterkategorie-${unterkategorie}`}
                    checked={filters.unterkategorien.includes(unterkategorie)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters({ unterkategorien: [...filters.unterkategorien, unterkategorie] })
                      } else {
                        updateFilters({ unterkategorien: filters.unterkategorien.filter((u) => u !== unterkategorie) })
                      }
                    }}
                  />
                  <Label htmlFor={`unterkategorie-${unterkategorie}`} className="text-sm leading-none">
                    {unterkategorie}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Resin Base */}
          <div className="space-y-3">
            <Label className="font-medium">Harzbasis</Label>
            <div className="space-y-2">
              {filterOptions.harzbasen.map((harzbasis) => (
                <div key={harzbasis} className="flex items-center space-x-2">
                  <Checkbox
                    id={`harzbasis-${harzbasis}`}
                    checked={filters.harzbasen.includes(harzbasis)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters({ harzbasen: [...filters.harzbasen, harzbasis] })
                      } else {
                        updateFilters({ harzbasen: filters.harzbasen.filter((h) => h !== harzbasis) })
                      }
                    }}
                  />
                  <Label htmlFor={`harzbasis-${harzbasis}`} className="text-sm leading-none">
                    {harzbasis}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability & New */}
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="font-medium">Verfügbarkeit</Label>
              <div className="space-y-2">
                {filterOptions.verfuegbarkeiten.map((verfuegbarkeit) => (
                  <div key={verfuegbarkeit} className="flex items-center space-x-2">
                    <Checkbox
                      id={`verfuegbarkeit-${verfuegbarkeit}`}
                      checked={filters.verfuegbarkeiten.includes(verfuegbarkeit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilters({ verfuegbarkeiten: [...filters.verfuegbarkeiten, verfuegbarkeit] })
                        } else {
                          updateFilters({
                            verfuegbarkeiten: filters.verfuegbarkeiten.filter((v) => v !== verfuegbarkeit),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={`verfuegbarkeit-${verfuegbarkeit}`} className="text-sm leading-none">
                      {verfuegbarkeit}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="nur-neu"
                checked={filters.nurNeu}
                onCheckedChange={(checked) => updateFilters({ nurNeu: !!checked })}
              />
              <Label htmlFor="nur-neu" className="text-sm leading-none">
                Nur neue Produkte
              </Label>
            </div>
          </div>
        </div>

        {/* Sort and Results */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Label htmlFor="sort" className="text-sm font-medium">
              Sortierung:
            </Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevanz">Relevanz</SelectItem>
                <SelectItem value="a-z">A–Z</SelectItem>
                <SelectItem value="z-a">Z–A</SelectItem>
                <SelectItem value="neueste">Neueste zuerst</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600 text-center sm:text-right">
            {productCount} {productCount === 1 ? "Produkt" : "Produkte"} gefunden
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
