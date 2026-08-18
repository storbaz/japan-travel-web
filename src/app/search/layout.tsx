import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscador de Lugares en Japón",
  description: "Busca restaurantes, templos, farmacias y tiendas en cualquier ciudad de Japón con horarios y enlace a Google Maps.",
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
