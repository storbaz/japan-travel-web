import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cómo Llegar del Aeropuerto a tu Hotel en Japón",
  description: "Indica tu hotel y te mostramos cómo llegar desde Narita, Haneda, KIX, CTS y más aeropuertos. Compara tren, bus y taxi con precios reales.",
  openGraph: {
    title: "Llegar del Aeropuerto al Hotel en Japón | ViajApp",
    description: "Cómo llegar desde cualquier aeropuerto japonés hasta tu alojamiento. Transporte público, taxi, precios y consejos.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
