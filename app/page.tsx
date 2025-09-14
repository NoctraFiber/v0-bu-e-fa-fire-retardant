"use client"

import { useState, useMemo } from "react"
import { loadData, getFilterOptions, filterProducts, sortProducts } from "@/lib/data-loader"
import { ProductFilters } from "@/components/product/product-filters"
import { ProductCard } from "@/components/product/product-card"

export default function HomePage() {
  const { dokumentInfo, produkte } = loadData()
  const filterOptions = getFilterOptions(produkte)

  const [filters, setFilters] = useState({
    search: "",
    kategorien: [],
    unterkategorien: [],
    harzbasen: [],
    verfuegbarkeiten: [],
    nurNeu: false,
    sortBy: "relevanz",
  })

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(produkte, filters)
    return sortProducts(filtered, filters.sortBy)
  }, [produkte, filters])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#03479c] mb-4 text-balance">{dokumentInfo.titel}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Version {dokumentInfo.version}</span>
          <span>•</span>
          <span>Quelle: {dokumentInfo.quelle}</span>
        </div>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl text-pretty">
          Entdecken Sie unser umfassendes Sortiment an brandhemmenden Gelcoats, Harzen und Systemlösungen für höchste
          Brandschutzanforderungen in verschiedenen Industriezweigen.
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        filterOptions={filterOptions}
        filters={filters}
        onFiltersChange={setFilters}
        productCount={filteredAndSortedProducts.length}
      />

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Keine Produkte gefunden</h3>
          <p className="text-gray-500 mb-4">
            Versuchen Sie, Ihre Suchkriterien anzupassen oder die Filter zurückzusetzen.
          </p>
          <button
            onClick={() =>
              setFilters({
                search: "",
                kategorien: [],
                unterkategorien: [],
                harzbasen: [],
                verfuegbarkeiten: [],
                nurNeu: false,
                sortBy: "relevanz",
              })
            }
            className="text-[#03479c] hover:text-[#02356b] font-medium"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  )
}
