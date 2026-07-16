"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/phrases", label: "Frases" },
    { href: "/budget", label: "Presupuesto" },
    { href: "/events", label: "Eventos" },
    { href: "/food", label: "Comida" },
    { href: "/transport", label: "Transporte" },
    { href: "/emergency", label: "Emergencias" },
  ];

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🇯🇵</span>
            Japan Travel
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-red-200 transition">
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4 ml-4 border-l border-red-400 pl-4">
                <Link href="/favorites" className="hover:text-red-200 transition">❤️ Favoritos</Link>
                <Link href="/itineraries" className="hover:text-red-200 transition">📋 Itinerarios</Link>
                <span className="text-red-200">{user.name}</span>
                <button onClick={logout} className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg transition">
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 border-l border-red-400 pl-4">
                <Link href="/login" className="hover:text-red-200 transition">Entrar</Link>
                <Link href="/register" className="bg-white text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition font-medium">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
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
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/favorites" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">❤️ Favoritos</Link>
                <Link href="/itineraries" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">📋 Itinerarios</Link>
                <div className="border-t border-red-400 pt-2 mt-2">
                  <div className="px-3 py-1 text-red-200 text-sm">{user.name}</div>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-700 transition">
                    Salir
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-red-400 pt-2 mt-2 space-y-1">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">Entrar</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg bg-white text-red-600 text-center font-medium">Registrarse</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
