"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const JAPAN_OFFSET = 9;

const zones = [
  { label: "España (peninsular)", offset: 2 },
  { label: "Canarias", offset: 1 },
  { label: "Portugal / Reino Unido", offset: 1 },
  { label: "Francia / Alemania / Italia", offset: 2 },
  { label: "México (CDMX)", offset: -6 },
  { label: "Colombia / Perú", offset: -5 },
  { label: "Argentina / Brasil (Brasilia)", offset: -3 },
  { label: "Chile", offset: -4 },
  { label: "EE.UU. Este (Nueva York)", offset: -4 },
  { label: "EE.UU. Centro (Chicago)", offset: -5 },
  { label: "EE.UU. Oeste (LA)", offset: -7 },
  { label: "Australia (Sídney)", offset: 10 },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date) {
  const days = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  return `${days[d.getDay()]} ${d.getDate()} de ${d.toLocaleString("es", { month: "long" })}`;
}

export default function JetLagPage() {
  const [offset, setOffset] = useState(2);
  const [depTime, setDepTime] = useState("15:00");
  const [duration, setDuration] = useState(14);

  const result = useMemo(() => {
    const [h, m] = depTime.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return null;

    const base = new Date(2026, 0, 1, 0, 0, 0);
    const depUtc = base.getTime() + (h - offset) * 3600e3 + m * 60e3;
    const arrUtc = depUtc + duration * 3600e3;

    const japanTime = new Date(arrUtc + JAPAN_OFFSET * 3600e3);
    const homeAtArrival = new Date(arrUtc + offset * 3600e3);

    const diff = JAPAN_OFFSET - offset;
    const adaptDays = Math.ceil(Math.abs(diff) / 2);

    const japanHour = japanTime.getHours();
    let advice = "";
    if (japanHour < 6) {
      advice = "Llegas de madrugada en Japón. Intenta dormir lo máximo en el avión para aterrizar lo más descansado posible y aguanta hasta la mañana. En cuanto salga el sol, busca luz natural para resetear tu reloj.";
    } else if (japanHour < 12) {
      advice = "Llegas por la mañana japonesa: perfecto. Aguanta despierto todo el día con luz del sol, aunque tengas sueño, y acuéstate a la hora local. Es la mejor manera de adaptarte rápido.";
    } else if (japanHour < 18) {
      advice = "Llegas por la tarde. Haz algo de actividad ligera (un paseo), cena temprano y vete a dormir a la hora japonesa. Evita la siesta larga o te despertarás a medianoche.";
    } else {
      advice = "Llegas de noche. Cena ligera y directos a la cama a la hora local japonesa. Por la mañana, sal a la calle y toma el sol para regular el ritmo de sueño.";
    }

    return { japanTime, homeAtArrival, diff, adaptDays, advice, japanHour };
  }, [offset, depTime, duration]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">⏰ Calculadora de Jet Lag</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dime cuándo despegas y cuánto dura el vuelo, y te digo a qué hora llegas a Japón
          con consejos para adaptarte cuanto antes.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">🌍 Tu zona horaria (verano)</label>
            <select
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-red-400"
            >
              {zones.map((z) => (
                <option key={z.label} value={z.offset}>UTC{z.offset >= 0 ? "+" : ""}{z.offset} · {z.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">🛫 Hora de salida (en tu zona)</label>
            <input
              type="time"
              value={depTime}
              onChange={(e) => setDepTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">⏱️ Duración del vuelo: {duration} horas</label>
            <input
              type="range"
              min={10}
              max={20}
              step={0.5}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10h</span>
              <span>14h (España → Tokio)</span>
              <span>20h</span>
            </div>
          </div>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 text-center">
              <div className="text-sm font-bold text-gray-500 mb-1">🇯🇵 Llegas a Japón</div>
              <div className="text-4xl font-extrabold text-gray-900">
                {pad(result.japanTime.getHours())}:{pad(result.japanTime.getMinutes())}
              </div>
              <div className="text-sm text-gray-600 mt-1">{formatDate(result.japanTime)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 text-center">
              <div className="text-sm font-bold text-gray-500 mb-1">🏠 En casa serán las</div>
              <div className="text-4xl font-extrabold text-gray-900">
                {pad(result.homeAtArrival.getHours())}:{pad(result.homeAtArrival.getMinutes())}
              </div>
              <div className="text-sm text-gray-600 mt-1">{formatDate(result.homeAtArrival)}</div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🕐</span>
              <h2 className="text-lg font-bold text-gray-900">Diferencia con Japón</h2>
            </div>
            <div className="text-gray-700 mb-3">
              Japón está {result.diff > 0 ? `${result.diff} horas por delante` : `${Math.abs(result.diff)} horas por detrás`} de tu zona.
              <span className="block text-sm text-gray-500 mt-1">
                Tu cuerpo necesita de media <b>{result.adaptDays} {result.adaptDays === 1 ? "día" : "días"}</b> por cada 2 horas de desfase
                (unos {result.adaptDays} días en tu caso). 
              </span>
            </div>
            <div className="bg-white rounded-xl p-4 border border-amber-100">
              <div className="text-sm font-bold text-gray-900 mb-1">💡 Consejo para este horario de llegada</div>
              <p className="text-sm text-gray-700">{result.advice}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🚀 Trucos extra para adaptarte</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2"><span>🌞</span><span className="text-gray-600">Busca luz del sol nada más llegar. Es el reloj más potente que existe.</span></div>
              <div className="flex gap-2"><span>🌙</span><span className="text-gray-600">Ajusta tu reloj al horario japonés en el avión, desde el despegue.</span></div>
              <div className="flex gap-2"><span>💧</span><span className="text-gray-600">Hidrátate en el vuelo. El jet lag se nota más deshidratado.</span></div>
              <div className="flex gap-2"><span>🍶</span><span className="text-gray-600">Evita el alcohol y la cafeína las horas antes de aterrizar.</span></div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/vuelo-comodo" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
          ✈️ Cómo sobrevivir al vuelo
        </Link>
        <Link href="/tienda-viajero" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
          🛍️ Tienda del viajero
        </Link>
      </div>
    </div>
  );
}
