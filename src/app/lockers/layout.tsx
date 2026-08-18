import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temporizador Lockers",
  description: "Guarda dónde dejaste tu coin locker en Japón y recibe aviso antes de que expire el tiempo. Tips de precios y ubicaciones.",
};

export default function LockersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
