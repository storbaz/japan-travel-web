import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temporizador de Coin Lockers en Japón",
  description: "Controla el tiempo de tus taquillas (coin lockers) en Japón. Temporizador, alertas cuando quedan 10 minutos, y persistencia en localStorage.",
  openGraph: {
    title: "Temporizador de Coin Lockers | ViajApp",
    description: "No pierdas la pista de tus taquillas en Japón. Temporizador con alertas para que no se te pase el tiempo.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
