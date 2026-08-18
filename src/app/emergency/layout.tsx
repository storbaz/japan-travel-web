import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergencias en Japón",
  description: "Números de emergencia en Japón, hospitales internacionales, frases de emergencia en japonés y consejos para terremotos y seguridad.",
};

export default function EmergencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
