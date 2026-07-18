"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const navLinks = [
    { href: "/search", label: "🔍 Buscar" },
    { href: "/translator", label: "🌐 Traductor" },
    { href: "/phrases", label: "🗣️ Frases" },
    { href: "/map", label: "🗺️ Mapa" },
    { href: "/restaurants", label: "🍽️ Restaurantes" },
    { href: "/budget", label: "💰 Presupuesto" },
    { href: "/events", label: "⛩️ Eventos" },
    { href: "/food", label: "🍜 Comida" },
    { href: "/transport", label: "🚄 Transporte" },
    { href: "/weather", label: "🌤️ Clima" },
    { href: "/emergency", label: "🏥 Emergencias" },
  ];

  const extraLinks = [
    { href: "/tips", label: "💡 Tips de Ahorro" },
    { href: "/currency", label: "💱 Moneda" },
    { href: "/visa", label: "🛂 Visa" },
    { href: "/packing", label: "🎒 Equipaje" },
  ];

  const initials = user ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "";

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🇯🇵</span>
            ViajApp
          </Link>

          <div className="hidden lg:flex items-center gap-4 text-sm">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-red-200 transition whitespace-nowrap">
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <button onClick={() => setMoreOpen(!moreOpen)} className="hover:text-red-200 transition">⚙️ Mas</button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px] z-50">
                  {extraLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setMoreOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">
                      {link.label}
                    </Link>
                  ))}
                  {user && (
                    <>
                      <Link href="/favorites" onClick={() => setMoreOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">❤️ Favoritos</Link>
                      <Link href="/itineraries" onClick={() => setMoreOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">📋 Itinerarios</Link>
                      <Link href="/expenses" onClick={() => setMoreOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">💸 Gastos</Link>
                    </>
                  )}
                </div>
              )}
            </div>
            <button onClick={toggle} className="hover:text-red-200 transition text-lg" title={dark ? "Modo claro" : "Modo oscuro"}>
              {dark ? "☀️" : "🌙"}
            </button>
            {user ? (
              <div className="relative ml-2 border-l border-red-400 pl-3">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 hover:text-red-200 transition">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-red-600">{initials}</span>
                  </div>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white text-gray-800 rounded-xl shadow-lg border border-gray-100 py-2 min-w-[200px] z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                    <Link href="/profile" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">👤 Mi Perfil</Link>
                    <Link href="/favorites" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">❤️ Favoritos</Link>
                    <Link href="/itineraries" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">📋 Itinerarios</Link>
                    <Link href="/expenses" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-50 transition">💸 Mis Gastos</Link>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 transition text-red-600">Cerrar Sesion</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-2 border-l border-red-400 pl-3">
                <Link href="/login" className="hover:text-red-200 transition">Entrar</Link>
                <Link href="/register" className="bg-white text-red-600 px-3 py-1 rounded-lg hover:bg-red-50 transition font-medium">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggle} className="p-2 text-lg" title={dark ? "Modo claro" : "Modo oscuro"}>
              {dark ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
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
                  <Link href="/expenses" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">💸 Gastos</Link>
                </>
              )}
            </div>
            <div className="border-t border-red-400 pt-2 mt-2">
              {user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-red-700 transition">
                    👤 {user.name}
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-700 transition">
                    Cerrar Sesion
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
