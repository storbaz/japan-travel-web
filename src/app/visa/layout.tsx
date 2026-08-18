import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Japón",
  description: "Requisitos de visa para entrar en Japón por país: exención, duración de estancia, documentos necesarios y tramitación.",
};

export default function VisaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
