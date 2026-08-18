import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frases en Japonés",
  description: "Frases útiles en japonés para viajar: pronunciación, audio y traducción para restaurantes, compras, transporte y emergencias.",
};

export default function PhrasesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
