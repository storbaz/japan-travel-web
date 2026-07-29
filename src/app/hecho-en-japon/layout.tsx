import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist de Compras Hecho en Japón",
  description: "33 marcas japonesas que comprar en Japón: Uniqlo, Muji, Nintendo, Shiseido, y más. Checklist interactivo con categorías, descripciones y Tax Free.",
  openGraph: {
    title: "Checklist Hecho en Japón | ViajApp",
    description: "Guía de compras con 33 marcas japonesas auténticas. Marca lo que has comprado y calcula tu progreso.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
