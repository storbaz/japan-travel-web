import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurantes en Japón",
  description: "Restaurantes recomendados en Japón por ciudad: ramen, sushi, wagyu e izakaya con precios, horarios y direcciones en Google Maps.",
};

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
