import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diferencia Horaria España-Japón y Alarma",
  description: "Reloj en vivo con la hora de España y Japón. Alarma para llamar sin despertar. Calcula la diferencia horaria y recibe consejos sobre cuándo llamar.",
  openGraph: {
    title: "Diferencia Horaria España-Japón | ViajApp",
    description: "Calcula la diferencia horaria, alarma para llamar a familia y consejos sobre el huso horario japonés.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
