import navigationData from '@/data/buefa_navigation_config.json';
import { NavigationData, NavItem } from '@/types/navigation';

const typedNavigationData: NavigationData = navigationData;
const originalNavItems = typedNavigationData.navigation_config.main_navigation;

// --- Find the specific items we need from the source JSON ---

const produkteSysteme = originalNavItems.find(item => item.label === "Produkte & Systeme");
const bufaTec = produkteSysteme?.submenu?.find(item => item.label === "BÜFA-Tec");
const branchen = originalNavItems.find(item => item.label === "Branchen");
const knowHow = originalNavItems.find(item => item.label === "Know-how");
const ueberUns = originalNavItems.find(item => item.label === "Über uns");

// --- Manually construct the new navigation structure ---

const newMainNavigation: NavItem[] = [
  // 1. VERTRIEB (Placeholder)
  {
    label: "VERTRIEB",
    href: "/vertrieb",
  },
  // 2. PRODUKTE & SYSTEME (From JSON)
  produkteSysteme || { label: "PRODUKTE & SYSTEME", href: "/produkte-systeme" },
  // 3. BÜFA TEC (Pulled from submenu in JSON)
  bufaTec
    ? { ...bufaTec, label: "BÜFA TEC" }
    : { label: "BÜFA TEC", href: "/buefa-tec" },
  // 4. BRANCHEN (From JSON)
  branchen || { label: "BRANCHEN", href: "/branchen" },
  // 5. ANWENDUNGEN (Placeholder)
  {
    label: "ANWENDUNGEN",
    href: "/anwendungen",
  },
  // 6. KNOW-HOW (From JSON)
  knowHow || { label: "KNOW-HOW", href: "/know-how" },
  // 7. ÜBER UNS (From JSON)
  ueberUns || { label: "ÜBER UNS", href: "/ueber-uns" },
  // 8. NEWS (Placeholder)
  {
    label: "NEWS",
    href: "/news",
  },
].filter((item): item is NavItem => !!item); // Filter out any potential undefined items

export const mainNavigation = newMainNavigation;
export const navigationBehavior = typedNavigationData.navigation_config.navigation_behavior;
