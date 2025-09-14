import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "new" | "available" | "on-request" | "default"
  className?: string
}

export function BadgeCustom({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    new: "bg-[#d6555a] text-white",
    available: "border border-[#03479c] text-[#03479c] bg-transparent",
    "on-request": "border border-gray-400 text-gray-600 bg-transparent",
    default: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", variants[variant], className)}
    >
      {children}
    </span>
  )
}
