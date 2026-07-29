import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mapa Útil de Japón — Cajeros, Carga USB y Baños Públicos",
  description: "Mapa interactivo con cajeros sin comisión (7-Bank), puertos de carga USB para móvil, y sento (baños públicos) en Tokio, Kioto, Osaka y más ciudades.",
  openGraph: {
    title: "Mapa Útil de Japón | ViajApp",
    description: "Encuentra cajeros sin comisión, puertos USB para cargar tu móvil y baños públicos en las principales ciudades japonesas.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
