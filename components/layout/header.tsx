"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { mainNavigation } from "@/lib/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Search, Globe, Sun, Moon, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import { NavItem } from "@/types/navigation"

// --- Helper Components ---

const ThemeToggleButton = () => {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}

// Recursive component for rendering mobile navigation items
const MobileNavItem: React.FC<{ item: NavItem; closeSheet: () => void }> = ({ item, closeSheet }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  // Item without a submenu is a direct link
  if (!item.submenu || item.submenu.length === 0) {
    return (
      <Link
        href={item.href}
        onClick={closeSheet}
        className={cn(
          "block rounded-md px-3 py-2 text-base font-medium",
          pathname === item.href
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {item.label}
      </Link>
    )
  }

  // Item with a submenu is a collapsible section
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          <span>{item.label}</span>
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen ? "rotate-90" : ""
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-4 border-l-2 border-muted-foreground/20 ml-3 mt-1">
        <div className="flex flex-col space-y-1 py-1">
          {item.submenu.map((subItem) => (
            <MobileNavItem key={subItem.label} item={subItem} closeSheet={closeSheet} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

// Recursive component for rendering desktop navigation submenus
const DesktopSubmenu: React.FC<{ items: NavItem[]; className?: string }> = ({ items, className }) => {
  return (
    <ul className={cn("grid gap-1", className)}>
      {items.map((item) => (
        <li key={item.label}>
          {item.submenu && item.submenu.length > 0 ? (
            <div>
              <h3 className="px-3 py-2 text-sm font-semibold text-foreground">{item.label}</h3>
              <DesktopSubmenu items={item.submenu} className="pl-3" />
            </div>
          ) : (
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
              >
                <div className="text-sm font-medium">{item.label}</div>
              </Link>
            </NavigationMenuLink>
          )}
        </li>
      ))}
    </ul>
  );
};


// --- Main Header Component ---

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Mobile Nav Trigger (left on mobile) */}
          <div className="md:hidden flex-shrink-0">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] p-4">
                <div className="flex items-center justify-between mb-6">
                  {/* Logo placeholder for mobile view */}
                  <span className="font-bold text-lg">BÜFA</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Menü schließen</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-1">
                  {mainNavigation.map((item) => (
                    <MobileNavItem key={item.label} item={item} closeSheet={() => setIsSheetOpen(false)} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo (center on mobile, left on desktop) */}
          <div className="flex-1 flex justify-center md:justify-start md:flex-none">
            <Link href="/" className="flex items-center space-x-2">
              {/*
                Logo placeholder.
                The prompt requested sourcing the logo from a 'brand JSON', but no such file was provided.
                Using a text logo as a fallback.
              */}
              <span className="font-bold text-lg">BÜFA</span>
            </Link>
          </div>

          {/* Desktop Navigation (center on desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavigation.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                           <div className="p-2 w-[500px] grid grid-flow-col auto-cols-max">
                              <DesktopSubmenu items={item.submenu} />
                           </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side icons (right on desktop) */}
          <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="icon" aria-label="Language">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  )
}
