import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ServiceWorker from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "Japan Travel Guide",
  description: "Tu guia completa para viajar a Japon: frases, presupuesto, eventos, comida y mas",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Japan Travel",
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
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <script src="https://accounts.google.com/gsi/client" async defer />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <ServiceWorker />
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
