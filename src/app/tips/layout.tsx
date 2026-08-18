import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tips de Ahorro en Japón",
  description: "Consejos prácticos para ahorrar dinero en Japón: transporte, comida, alojamiento y compras con ahorro estimado por día.",
};

export default function TipsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
