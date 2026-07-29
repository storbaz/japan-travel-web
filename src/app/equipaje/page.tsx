"use client";

import { useState } from "react";

type Unit = "cm" | "inches";

const STANDARD_SIZES = [
  { name: "Cabina (carry-on 55x40x25)", h: 55, w: 40, d: 25 },
  { name: "Mediana 24\" (65x45x28)", h: 65, w: 45, d: 28 },
  { name: "Grande 28\" (75x50x30)", h: 75, w: 50, d: 30 },
  { name: "XL 32\" (80x55x35)", h: 80, w: 55, d: 35 },
];

function sum3(h: number, w: number, d: number) {
  return h + w + d;
}

function result(h: number, w: number, d: number) {
  const total = sum3(h, w, d);
  if (total <= 85) return { ok: true, msg: "✅ Cabe en el maletero superior (sin límite)", color: "text-green-600" };
  if (total <= 120) return { ok: true, msg: "✅ Cabe en el maletero superior", color: "text-green-600" };
  if (total <= 160) return { ok: true, msg: "⚠️ Cabe detrás del último asiento (reserva espacio si puedes)", color: "text-amber-600" };
  return { ok: false, msg: "❌ Demasiado grande. Necesitas espacio de equipaje reservado o usar takkyubin (envío a hotel)", color: "text-red-600" };
}

export default function EquipajePage() {
  const [h, setH] = useState(55);
  const [w, setW] = useState(40);
  const [d, setD] = useState(25);
  const [unit, setUnit] = useState<Unit>("cm");

  const toCm = (v: number) => unit === "inches" ? Math.round(v * 2.54) : v;
  const r = result(toCm(h), toCm(w), toCm(d));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🧳 Simulador de equipaje</h1>
      <p className="text-gray-600 mb-8">¿Tu maleta cabe en el Shinkansen? Mide y compruébalo.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Medidas de tu maleta</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button onClick={() => setUnit("cm")} className={`px-3 py-1 rounded-md text-sm font-medium transition ${unit === "cm" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>cm</button>
            <button onClick={() => setUnit("inches")} className={`px-3 py-1 rounded-md text-sm font-medium transition ${unit === "inches" ? "bg-white shadow-sm text-gray-900" : "text-gray-500"}`}>in</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alto</label>
            <input type="range" min={10} max={100} value={h} onChange={e => setH(Number(e.target.value))} className="w-full accent-red-500" />
            <span className="text-sm text-gray-600">{h} {unit}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ancho</label>
            <input type="range" min={10} max={80} value={w} onChange={e => setW(Number(e.target.value))} className="w-full accent-red-500" />
            <span className="text-sm text-gray-600">{w} {unit}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fondo</label>
            <input type="range" min={5} max={50} value={d} onChange={e => setD(Number(e.target.value))} className="w-full accent-red-500" />
            <span className="text-sm text-gray-600">{d} {unit}</span>
          </div>
        </div>

        <div className={`text-center p-4 rounded-xl font-bold text-lg ${r.color} bg-gray-50`}>
          {r.msg}
          <div className="text-sm font-normal text-gray-500 mt-1">
            Suma total: {sum3(toCm(h), toCm(w), toCm(d))} cm
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 mb-6">
        <h3 className="font-bold text-amber-900 mb-2">📏 Referencia rápida</h3>
        <p className="text-sm text-amber-700 mb-3">Toca una maleta predefinida para probar:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STANDARD_SIZES.map(s => (
            <button key={s.name} onClick={() => { setH(s.h); setW(s.w); setD(s.d); setUnit("cm"); }}
              className="text-sm bg-white border border-amber-300 rounded-lg px-3 py-2 text-left hover:bg-amber-100 transition">
              <div className="font-medium text-amber-900 truncate">{s.name}</div>
              <div className="text-amber-600 text-xs">{sum3(s.h, s.w, s.d)} cm total</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tips para el Shinkansen</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>Maletero superior:</strong> cabe equipaje de hasta ~85 cm total (cabina)</li>
          <li>• <strong>Detrás del asiento:</strong> maletas hasta ~160 cm total, pero quita espacio para reclinar</li>
          <li>• <strong>Equipaje grande:</strong> si supera 160 cm, debes reservar asientos con espacio especial (última fila)</li>
          <li>• <strong>Takkyubin:</strong> envía tu maleta grande de hotel a hotel por ~2000¥. Recogida un día antes</li>
          <li>• <strong>En los aeropuertos:</strong> hay mostradores de takkyubin justo después de recoger maletas</li>
        </ul>
      </div>
    </div>
  );
}
