import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meteorólogo Local para Japón — Clima por Ciudad",
  description: "Clima actual y previsión de 6 días para ciudades japonesas: Tokio, Osaka, Kioto, Sapporo, Fukuoka, Naha y más. Recomendaciones según el tiempo.",
  openGraph: {
    title: "Meteorólogo Local Japón | ViajApp",
    description: "Consulta el tiempo en cualquier ciudad japonesa con previsión a 6 días y consejos personalizados.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
