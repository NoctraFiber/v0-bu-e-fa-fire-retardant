import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BÜFA Fire Retardant Products",
    short_name: "BÜFA Fire Retardant",
    description: "Hochwertige brandhemmende Gelcoats, Harze und Systemlösungen für den professionellen Brandschutz.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#03479c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
