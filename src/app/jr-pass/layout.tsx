import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora JR Pass",
  description: "Compara el coste del Japan Rail Pass con billetes individuales de shinkansen para tu ruta. Ahorra en transporte entre ciudades.",
};

export default function JrPassLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
