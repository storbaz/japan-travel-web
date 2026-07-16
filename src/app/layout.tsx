import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japan Travel Guide",
  description: "Tu guia completa para viajar a Japon: frases, presupuesto, eventos, comida y mas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2 font-bold text-xl">
                <span className="text-2xl">🇯🇵</span>
                Japan Travel
              </a>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="/phrases" className="hover:text-red-200 transition">Frases</a>
                <a href="/budget" className="hover:text-red-200 transition">Presupuesto</a>
                <a href="/events" className="hover:text-red-200 transition">Eventos</a>
                <a href="/food" className="hover:text-red-200 transition">Comida</a>
                <a href="/transport" className="hover:text-red-200 transition">Transporte</a>
                <a href="/emergency" className="hover:text-red-200 transition">Emergencias</a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
