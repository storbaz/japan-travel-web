"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/phrases", label: "🗣️ Frases" },
    { href: "/map", label: "🗺️ Mapa" },
    { href: "/budget", label: "💰 Presupuesto" },
    { href: "/events", label: "⛩️ Eventos" },
    { href: "/food", label: "🍜 Comida" },
    { href: "/transport", label: "🚄 Transporte" },
    { href: "/weather", label: "🌤️ Clima" },
    { href: "/emergency", label: "🏥 Emergencias" },
  ];

  const extraLinks = [
    { href: "/currency", label: "💱 Moneda" },
    { href: "/visa", label: "🛂 Visa" },
    { href: "/packing", label: "🎒 Equipaje" },
    { href: "/expenses", label: "💸 Gastos" },
  ];

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🇯🇵</span>
            Japan Travel
          </Link>

          <div className="hidden lg:flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-red-200 transition whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button className="hover:text-red-200 transition">⚙️</button>
              <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 py-2 min-w-[160px] hidden group-hover:block z-50">
                {extraLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="block px-4 py-2 hover:bg-gray-50 transition">
                    {link.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link href="/favorites" className="block px-4 py-2 hover:bg-gray-50 transition">❤️ Favoritos</Link>
                    <Link href="/itineraries" className="block px-4 py-2 hover:bg-gray-50 transition">📋 Itinerarios</Link>
                  </>
                )}
              </div>
            </div>
            {user ? (
              <div className="flex items-center gap-3 border-l border-red-400 pl-3">
                <span className="text-red-200">{user.name}</span>
                <button onClick={logout} className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg transition">
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-red-400 pl-3">
                <Link href="/login" className="hover:text-red-200 transition">Entrar</Link>
                <Link href="/register" className="bg-white text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition font-medium">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-red-400 pt-2 mt-2">
              <div className="px-3 py-1 text-red-300 text-xs font-medium">MAS</div>
              {extraLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link href="/favorites" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">❤️ Favoritos</Link>
                  <Link href="/itineraries" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">📋 Itinerarios</Link>
                </>
              )}
            </div>
            <div className="border-t border-red-400 pt-2 mt-2">
              {user ? (
                <>
                  <div className="px-3 py-1 text-red-300 text-sm">{user.name}</div>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-700 transition">
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">Entrar</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg bg-white text-red-600 text-center font-medium">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
