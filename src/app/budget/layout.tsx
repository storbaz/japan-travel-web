import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presupuesto Japón",
  description: "Calcula cuánto necesitas para viajar a Japón: presupuesto diario por ciudad, estilo de viaje y duración. Comparador en euros, dólares y yenes.",
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
