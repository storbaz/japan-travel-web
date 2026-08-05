import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog para Viajar a Japón | Guías y Consejos",
  description: "Blog con guías para viajar a Japón: itinerarios de 14 días, presupuesto, JR Pass, transporte, comida, temporada de cerezos y consejos de expertos para tu primer viaje.",
  keywords: [
    "blog viajar japon", "viajar a japon blog", "guia viajar japon",
    "consejos viajar japon", "itinerario japon", "planificar viaje japon",
    "primer viaje japon", "blog japon en español",
  ],
  openGraph: {
    type: "website",
    title: "Blog para Viajar a Japón | Guías y Consejos",
    description: "Guías para viajar a Japón: itinerarios, presupuesto, JR Pass, transporte, comida y consejos para tu primer viaje.",
    images: [
      {
        url: "https://www.viajapp.app/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ViajApp - Blog para viajar a Japón",
      },
    ],
  },
  alternates: {
    canonical: "https://www.viajapp.app/blog",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
