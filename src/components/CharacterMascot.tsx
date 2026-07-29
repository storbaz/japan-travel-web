"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";

interface Mascot {
  name: string;
  emoji: string;
  greeting: string;
  color: string;
}

const PAGE_MASCOTS: Record<string, Mascot[]> = {
  "/freaky": [
    { name: "Robot", emoji: "🤖", greeting: "Beep boop! Bienvenido al lado freaky!", color: "#6366f1" },
    { name: "Alienígena", emoji: "👽", greeting: "We come in peace... mostly", color: "#22c55e" },
    { name: "Monstruo", emoji: "👾", greeting: "Game over? ¡No, game start!", color: "#a855f7" },
  ],
  "/food": [
    { name: "Ramen Master", emoji: "🍜", greeting: "¡Irasshaimase! ¿Ramen hoy?", color: "#f97316" },
    { name: "Sushi Chef", emoji: "🍣", greeting: "Omakase? Leave it to me!", color: "#ef4444" },
    { name: "Dango Seller", emoji: "🍡", greeting: "¡Tres en una skewer!", color: "#ec4899" },
  ],
  "/culture": [
    { name: "Geisha", emoji: "👘", greeting: "¡Bienvenido a la cultura japonesa!", color: "#db2777" },
    { name: "Maiko", emoji: "🎎", greeting: "¿Te gustaría un té?", color: "#f472b6" },
    { name: "Monje", emoji: "🧘", greeting: "Namaste... ah no, ¡Konnichiwa!", color: "#78716c" },
  ],
  "/history": [
    { name: "Samurai", emoji: "⚔️", greeting: "¡Bushido! Conoce nuestra historia", color: "#1e40af" },
    { name: "Ninja", emoji: "🥷", greeting: "Shh... ven en silencio", color: "#1f2937" },
    { name: "Shogun", emoji: "🏯", greeting: "Bienvenido al palacio", color: "#92400e" },
  ],
  "/shopping": [
    { name: "Tendero", emoji: "🏪", greeting: "¡Irasshaimase! ¡Mira lo que tengo!", color: "#059669" },
    { name: "Kawaii Shop", emoji: "🛍️", greeting: "¡Todo es mono aquí!", color: "#ec4899" },
  ],
  "/nature": [
    { name: "Tanuki", emoji: "🦝", greeting: "*rascándose el estómago*", color: "#78716c" },
    { name: "Kitsune", emoji: "🦊", greeting: "¡Bienvenido a los bosques!", color: "#ea580c" },
    { name: "Cerezo", emoji: "🌸", greeting: "Disfruta de la naturaleza", color: "#fda4af" },
  ],
  "/map": [
    { name: "Cartógrafo", emoji: "🗺️", greeting: "¿Hacia dónde vamos?", color: "#2563eb" },
    { name: "Torii", emoji: "⛩️", greeting: "Pasa al otro lado", color: "#dc2626" },
  ],
  "/flights": [
    { name: "Piloto", emoji: "✈️", greeting: "¡Altitud de crucero alcanzada!", color: "#0ea5e9" },
    { name: "Azafata", emoji: "🛫", greeting: "Bienvenido a bordo!", color: "#6366f1" },
  ],
  "/alojamiento": [
    { name: "Conserje", emoji: "🎩", greeting: "Te ayudo a llegar a tu hotel!", color: "#2563eb" },
    { name: "Mapache Viajero", emoji: "🦝", greeting: "Narita o Haneda? Te digo cómo llegar!", color: "#78716c" },
  ],
  "/distancia": [
    { name: "Taxista", emoji: "🚕", greeting: "El taxi es caro... mejor anda!", color: "#f59e0b" },
    { name: "Paseante", emoji: "🚶", greeting: "Andando se ve más Japón!", color: "#16a34a" },
  ],
  "/meteorologo": [
    { name: "Meteorólogo", emoji: "🌤️", greeting: "¿Llevas paraguas? Te digo el clima!", color: "#2563eb" },
    { name: "Kitsune del Clima", emoji: "🦊", greeting: "El tiempo en Japón cambia rápido!", color: "#d97706" },
  ],
  "/errores": [
    { name: "Sensei", emoji: "👨‍🏫", greeting: "Aprende de los errores ajenos!", color: "#dc2626" },
    { name: "Tanuki Sabio", emoji: "🦝", greeting: "No cometas estos fallos!", color: "#78716c" },
  ],
  "/hecho-en-japon": [
    { name: "Japan Shopper", emoji: "🇯🇵", greeting: "¡Tax Free! No olvides el pasaporte", color: "#dc2626" },
    { name: "Mascota Uniqlo", emoji: "👕", greeting: "Ropa japonesa de calidad!", color: "#2563eb" },
  ],
  "/lockers": [
    { name: "Locker-kun", emoji: "🔒", greeting: "¿Dónde dejaste tu maleta?", color: "#059669" },
    { name: "Coin-kun", emoji: "🪙", greeting: "No olvides recoger tu equipaje!", color: "#ca8a04" },
  ],
  "/horario": [
    { name: "Reloj", emoji: "🕐", greeting: "¡No olvides el jet lag!", color: "#6366f1" },
    { name: "Despertador", emoji: "⏰", greeting: "¿A qué hora llamas a casa?", color: "#f97316" },
  ],
  "/budget": [
    { name: "Contable", emoji: "🧮", greeting: "¡Vamos a ahorrar!", color: "#16a34a" },
    { name: "Tanuki Money", emoji: "💰", greeting: "¡Dinero bien gastado!", color: "#ca8a04" },
  ],
  "/events": [
    { name: "Festival Fan", emoji: "🎆", greeting: "¡Hay fiesta hoy!", color: "#f97316" },
    { name: "Matsuri Master", emoji: "🏮", greeting: "¡Bon odori!", color: "#dc2626" },
  ],
  "/translator": [
    { name: "Sensei", emoji: "👨‍🏫", greeting: "¡Hablemos!", color: "#1e40af" },
    { name: "Buddha", emoji: "🗿", greeting: "Las palabras son poder", color: "#78716c" },
  ],
  "/sports": [
    { name: "Sumo", emoji: "🤼", greeting: "¡Hakkeyoi!", color: "#dc2626" },
    { name: "Karateka", emoji: "🥋", greeting: "¡Kiai! ¡Bienvenido!", color: "#fbbf24" },
  ],
  "/": [
    { name: "Ninja", emoji: "🥷", greeting: "¡Bienvenido a ViajApp!", color: "#1f2937" },
    { name: "Geisha", emoji: "🎎", greeting: "¡Konichiwa, viajero!", color: "#db2777" },
    { name: "Tanuki", emoji: "🦝", greeting: "¿Listo para Japón?", color: "#78716c" },
    { name: "Samurai", emoji: "⚔️", greeting: "¡Bienvenido, viajero!", color: "#1e40af" },
  ],
};

const DEFAULT_MASCOT: Mascot = { name: "Viajero", emoji: "🗾", greeting: "¡Bienvenido!", color: "#dc2626" };

export default function CharacterMascot() {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [currentGreeting, setGreeting] = useState("");

  const mascot = useMemo(() => {
    const pageMascots = PAGE_MASCOTS[pathname] || PAGE_MASCOTS["/"] || [DEFAULT_MASCOT];
    const idx = Math.abs(pathname.split("").reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0)) % pageMascots.length;
    return pageMascots[idx];
  }, [pathname]);

  useEffect(() => {
    const storageKey = "viajapp_mascot_seen";
    try {
      if (localStorage.getItem(storageKey) === "true") {
        setDismissed(true);
        return;
      }
    } catch {
      // ignore
    }

    setDismissed(false);
    setVisible(false);
    setFading(false);

    const showTimer = setTimeout(() => {
      setGreeting(mascot.greeting);
      setVisible(true);
    }, 1000);

    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 5000);

    const hideTimer = setTimeout(() => {
      setDismissed(true);
      try {
        localStorage.setItem(storageKey, "true");
      } catch {
        // ignore
      }
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname, mascot]);

  if (dismissed || !visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-1000 ${
        fading ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl border-2 px-4 py-3 max-w-[220px] cursor-pointer transition-all hover:scale-105"
        style={{ borderColor: mascot.color }}
        onClick={() => setDismissed(true)}
      >
        <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
          style={{ backgroundColor: mascot.color }}>
          {mascot.emoji}
        </div>
        <div className="ml-6">
          <div className="text-[10px] font-bold uppercase tracking-wide" style={{ color: mascot.color }}>
            {mascot.name}
          </div>
          <div className="text-xs text-gray-700 mt-0.5 leading-tight">
            {currentGreeting}
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-[10px] text-gray-500 hover:bg-gray-300">
          ×
        </div>
      </div>
    </div>
  );
}
