import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clima en Japón",
  description: "Pronóstico del tiempo en Japón por ciudad: temperaturas, humedad, viento y previsión a 7 días para Tokio, Kioto, Osaka y más.",
};

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
