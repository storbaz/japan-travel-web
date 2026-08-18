import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convertidor de Yen",
  description: "Convierte yenes japoneses a euros, dólares y otras monedas. Tabla de precios comunes en Japón para comparar al instante.",
};

export default function CurrencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
