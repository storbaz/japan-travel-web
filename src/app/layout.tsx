import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CountryProvider } from "@/contexts/CountryContext";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import ServiceWorker from "@/components/ServiceWorker";
import ClientShell from "@/components/ClientShell";

const now = new Date();
const travelYear = now.getMonth() >= 7 ? now.getFullYear() + 1 : now.getFullYear();

export const metadata: Metadata = {
  title: {
    default: "Guía de Viaje a Japón — Todo para tu viaje | ViajApp",
    template: "%s | ViajApp",
  },
  description: "Guía completa para viajar a Japón: frases en japonés, presupuesto diario, eventos y festivales, comida típica, transporte, clima, mapa, traductor con cámara y más. Planifica tu viaje a Japón gratis.",
  keywords: [
    "viaje a Japón", "guía Japón", "Japón turismo", "viajar a Japón barato",
    "presupuesto Japón", "frases japonés", "comida japonesa", "transporte Japón",
    "JR Pass", "tokio", "kioto", "osaka", " Hiroshima", "festival Japón",
    "viaje Asia", "orientalismo", "shinkansen", "templos Japón", "onsen",
    "guia turistica Japón", "planeacion viaje Japón", `Japón ${travelYear}`,
  ],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "ViajApp",
    title: `Guía de Viaje a Japón ${travelYear} — Todo para tu viaje | ViajApp`,
    description: "Guía completa para viajar a Japón: frases, presupuesto, eventos, comida, transporte, clima, mapa y traductor. Planifica tu viaje gratis.",
    images: [
      {
        url: "https://www.viajapp.app/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ViajApp — Guía de Viaje a Japón",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Guía de Viaje a Japón ${travelYear} | ViajApp`,
    description: "Todo lo que necesitas para viajar a Japón: frases, presupuesto, eventos, comida y más.",
    images: ["https://www.viajapp.app/og-image.svg"],
  },
  other: {
    "impact-site-verification": "29022043-7101-49da-88cf-8cd5516dfe25",
    "google-site-verification": "UI36sYwoal57n4IjnrFV67Zw-LYd-E3567HK_5zu69Y",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ViajApp",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="UI36sYwoal57n4IjnrFV67Zw-LYd-E3567HK_5zu69Y" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <link rel="preconnect" href="https://accounts.google.com" />
        <link rel="dns-prefetch" href="https://accounts.google.com" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ViajApp",
              url: "https://www.viajapp.app",
              description: "Guía completa para viajar a Japón: frases, presupuesto, eventos, comida, transporte, clima y traductor con cámara.",
              applicationCategory: "TravelApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              author: {
                "@type": "Person",
                name: "Antonio Pérez Cortés",
                url: "https://www.viajapp.app/about",
              },
              inLanguage: ["es", "ja"],
            }),
          }}
        />
        <script src="https://accounts.google.com/gsi/client" async defer />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`} crossOrigin="anonymous" />
        )}
        <script async defer src="https://widget.getyourguide.com/dist/pa.umd.production.min.js" data-gyg-partner-id="NRWCY1R" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');` }} />
          </>
        )}
      </head>
      <body className="bg-gray-50 min-h-screen">
        <ServiceWorker />
        <ThemeProvider>
          <CountryProvider>
          <AuthProvider>
            <Navbar />
            <ClientShell>
              {children}
            </ClientShell>
            <Footer />
          </AuthProvider>
          </CountryProvider>
        </ThemeProvider>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}
