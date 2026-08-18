import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Distancia",
  description: "Calcula distancias y tiempos entre dos puntos en Japón: caminando, en coche y coste estimado de taxi.",
};

export default function DistanciaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
