"use client";

import { useState } from "react";
import Link from "next/link";

function speakJapanese(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}

const QUICK_PHRASES = [
  { jp: "助けてください！", romaji: "Tasukete kudasai!", es: "Ayuda!" },
  { jp: "病院に行きたいです", romaji: "Byouin ni ikitai desu", es: "Hospital" },
  { jp: "警察を呼んでください", romaji: "Keisatsu wo yonde kudasai", es: "Policia" },
];

const QUICK_NUMBERS = [
  { num: "110", label: "Policia" },
  { num: "119", label: "Bomberos/Ambulancia" },
  { num: "050-3816-2787", label: "JNTO (Ingles)" },
];

export default function EmergencyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl font-bold transition-all hover:scale-110 ${
          open ? "bg-gray-800 text-white rotate-45" : "bg-red-600 text-white animate-pulse"
        }`}
        title="Modo Emergencia"
      >
        {open ? "✕" : "🆘"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-red-600 text-white p-4">
            <div className="font-bold text-lg">🚨 Modo Emergencia</div>
            <div className="text-sm text-red-100">Acceso rapido a ayuda</div>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-2">
              {QUICK_NUMBERS.map((n) => (
                <a
                  key={n.num}
                  href={`tel:${n.num.replace(/[^0-9+#]/g, "")}`}
                  className="flex items-center justify-between bg-red-50 rounded-xl p-3 hover:bg-red-100 transition"
                >
                  <span className="font-medium text-gray-900">{n.label}</span>
                  <span className="font-bold text-red-600 font-mono">{n.num}</span>
                </a>
              ))}
            </div>

            <div className="border-t pt-3">
              <div className="text-xs font-medium text-gray-500 mb-2">FRASES RAPIDAS</div>
              <div className="space-y-2">
                {QUICK_PHRASES.map((p) => (
                  <button
                    key={p.romaji}
                    onClick={() => speakJapanese(p.jp)}
                    className="w-full text-left bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition"
                  >
                    <div className="font-bold text-gray-900">{p.jp}</div>
                    <div className="text-xs text-gray-500">{p.es}</div>
                  </button>
                ))}
              </div>
            </div>

            <Link
              href="/emergency"
              onClick={() => setOpen(false)}
              className="block w-full text-center bg-red-600 text-white rounded-xl py-3 font-bold hover:bg-red-700 transition"
            >
              Ver pagina completa →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
