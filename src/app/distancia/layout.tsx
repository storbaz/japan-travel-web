import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medidor de Distancia: Andando vs Taxi en Japón",
  description: "Compara tiempo y coste entre caminar y taxi en Japón. Calcula rutas reales con OSRM, estimación de tarifa de taxi con recargo nocturno.",
  openGraph: {
    title: "Andando vs Taxi en Japón | ViajApp",
    description: "Calcula si te sale a cuenta el taxi o es mejor andar. Comparativa de tiempo y coste para cualquier ruta en Japón.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
