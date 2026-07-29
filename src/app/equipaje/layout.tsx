import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Equipaje para Shinkansen",
  description: "Comprueba si tu maleta cabe en el Shinkansen: en la rejilla superior, detrás del asiento o necesita reserva de espacio. 4 tamaños de maleta predefinidos.",
  openGraph: {
    title: "Simulador de Equipaje para Shinkansen | ViajApp",
    description: "Comprueba si tu maleta cabe en el tren bala japonés y cuándo necesitas reservar espacio para equipaje grande.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
