"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Produktübersicht" },
    { href: "/systemloesungen", label: "Systemlösungen" },
    { href: "/glossar", label: "Glossar" },
    { href: "/abkuerzungen", label: "Abkürzungen" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#03479c]">
              BÜFA<span className="text-sm">®</span>
            </div>
            <div className="text-sm text-gray-600 hidden sm:block">Fire Retardant Products</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#03479c] transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild className="bg-[#03479c] hover:bg-[#02356b] text-white hidden sm:flex">
              <Link href="/kontakt">Beratung anfragen</Link>
            </Button>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xl font-bold text-[#03479c]">
                      BÜFA<span className="text-sm">®</span>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Menü schließen</span>
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-4 flex-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-gray-700 hover:text-[#03479c] transition-colors font-medium py-2 border-b border-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-6">
                    <Button asChild className="w-full bg-[#03479c] hover:bg-[#02356b] text-white">
                      <Link href="/kontakt" onClick={() => setIsOpen(false)}>
                        Beratung anfragen
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
