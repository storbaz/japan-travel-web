import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meteorólogo Local",
  description: "Clima actual y previsión por ciudad japonesa con consejos de vestimenta, planes según el tiempo y tips locales.",
};

export default function MeteorologoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
