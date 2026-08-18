import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de Equipaje para Japón",
  description: "Checklist de equipaje para viajar a Japón: qué meter en la maleta según la estación con lista interactiva y esenciales marcados.",
};

export default function PackingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
