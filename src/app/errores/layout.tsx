import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Errores de Turista en Japón — Guía de Supervivencia",
  description: "20 errores comunes que cometen los turistas en Japón: propinas, palillos, zapatos, onsen, y más. Aprende la etiqueta japonesa antes de viajar.",
  openGraph: {
    title: "Errores de Turista en Japón | ViajApp",
    description: "Los 20 errores más comunes al viajar a Japón y cómo evitarlos. Guía de etiqueta y costumbres japonesas.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
