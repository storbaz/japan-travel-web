"use client";

import { useState, useEffect } from "react";
import SeoContent from "@/components/SeoContent";
import RelatedTools from "@/components/RelatedTools";

interface Locker {
  id: string;
  name: string;
  location: string;
  createdAt: number;
  totalSecs: number;
  active: boolean;
}

const STORAGE_KEY = "viajapp_lockers";

function loadLockers(): Locker[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

function saveLockers(lockers: Locker[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lockers));
}

export default function LockersPage() {
  const [lockers, setLockers] = useState<Locker[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState(2);
  const [mins, setMins] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setLockers(loadLockers()); }, []);

  useEffect(() => {
    if (lockers.length === 0) return;
    const id = setInterval(() => {
      setLockers(prev => {
        const updated = prev.map(l => {
          if (!l.active) return l;
          const elapsed = Math.floor((Date.now() - l.createdAt) / 1000);
          return { ...l, active: elapsed < l.totalSecs };
        });
        saveLockers(updated);
        return updated;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [lockers.length]);

  const addLocker = () => {
    if (!name.trim() || !location.trim()) return;
    const totalSecs = hours * 3600 + mins * 60;
    const locker: Locker = {
      id: Date.now().toString(),
      name: name.trim(),
      location: location.trim(),
      createdAt: Date.now(),
      totalSecs,
      active: true,
    };
    const updated = [...lockers, locker];
    setLockers(updated);
    saveLockers(updated);
    setName(""); setLocation(""); setHours(2); setMins(0); setShowForm(false);
  };

  const removeLocker = (id: string) => {
    const updated = lockers.filter(l => l.id !== id);
    setLockers(updated);
    saveLockers(updated);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🔒 Temporizador de lockers</h1>
      <p className="text-gray-600 mb-8">Guarda dónde dejaste tu maleta en un coin locker y recibe aviso antes de que expire.</p>

      {!showForm && (
        <button onClick={() => setShowForm(true)}
          className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition mb-6">
          + Añadir locker
        </button>
      )}

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Nuevo locker</h2>
          <div className="space-y-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre (ej. Estación Tokio)" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ubicación (ej. Salida central, 2ª planta)" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            <div className="flex gap-3 items-center">
              <span className="text-sm text-gray-700">Tiempo:</span>
              <select value={hours} onChange={e => setHours(Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {Array.from({ length: 25 }, (_, i) => <option key={i} value={i}>{i}h</option>)}
              </select>
              <select value={mins} onChange={e => setMins(Number(e.target.value))} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                {[0, 15, 30, 45].map(m => <option key={m} value={m}>{m}m</option>)}
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={addLocker} className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition">Guardar</button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {lockers.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-lg">No hay lockers guardados</p>
          <p className="text-sm">Añade un coin locker para no olvidar dónde dejaste tu maleta</p>
        </div>
      )}

      <div className="space-y-3">
        {lockers.map(l => {
          const elapsed = Math.floor((Date.now() - l.createdAt) / 1000);
          const remaining = Math.max(0, l.totalSecs - elapsed);
          const expired = remaining <= 0;
          const warning = !expired && remaining < 600;
          return (
            <div key={l.id} className={`bg-white rounded-xl border p-4 transition ${expired ? "border-red-300 bg-red-50" : warning ? "border-amber-300 bg-amber-50" : "border-gray-100"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{l.name}</h3>
                  <p className="text-sm text-gray-500">{l.location}</p>
                </div>
                <button onClick={() => removeLocker(l.id)} className="text-gray-400 hover:text-red-500 text-lg">✕</button>
              </div>
              <div className="mt-3">
                {expired ? (
                  <div className="text-red-600 font-bold text-lg">⏰ ¡Tiempo expirado!</div>
                ) : (
                  <div className={`font-mono text-2xl font-bold ${warning ? "text-amber-600" : "text-gray-900"}`}>
                    {formatTime(remaining)}
                  </div>
                )}
                  <div className="text-xs text-gray-400 mt-1">Total: {formatTime(l.totalSecs)}</div>
              </div>
              {expired && (
                <p className="text-sm text-red-700 mt-2">Es posible que hayan retirado tu maleta. Vuelve al locker lo antes posible.</p>
              )}
              {warning && !expired && (
                <p className="text-sm text-amber-700 mt-2">⚠️ Quedan menos de 10 minutos. Dirígete al locker.</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mt-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Sobre coin lockers en Japón</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• La mayoría acepta 100¥, 500¥ y tarjetas Suica/Pasmo</li>
          <li>• Precios típicos: 300-700¥/24h según tamaño</li>
          <li>• Los hay en todas las estaciones de tren y zonas turísticas</li>
          <li>• Guarda la ubicación exacta (ej. "cerca de la salida este, 2ª fila")</li>
        </ul>
      </div>

      <SeoContent
        title="Coin lockers: deja tu maleta y viaja ligero"
        paragraphs={[
          "Los coin lockers (コインロッカー) son taquillas de alquiler que encontrarás en casi todas las estaciones de tren de Japón, y son la solución perfecta para no arrastrar la maleta durante tu escala en una ciudad o entre hotel y hotel. Los tamaños van desde los pequeños (para una mochila, 300-400 yenes/24h) hasta los XXL para maletas grandes (600-700 yenes/24h). El pago se hace en efectivo o con tarjeta Suica/Pasmo, y algunos aceptan tarjeta de crédito.",
          "El sistema es sencillo: eliges una taquilla libre, metes tu equipaje, pagas y guardas la llave o el ticket. Al volver, recuperas tu maleta y cierras el ciclo. Algunas taquillas nuevas son electrónicas y se abren con un código QR o una tarjeta de transporte. Importante: el tiempo se cobra por bloque de 24 horas, así que si lo dejas a las 10:00, tienes hasta las 10:00 del día siguiente por el mismo precio.",
          "Las estaciones principales como Tokio, Shinjuku, Kioto o Osaka están llenas de lockers, pero en horas punta se agotan, sobre todo los de tamaño grande. Alternativas: las consignas de los grandes almacenes (Isetan, Takashimaya), los centros de información turística y algunos hoteles que guardan tu equipaje aunque no te alojes en ellos. Este temporizador te recuerda cuándo vuelve a cobrar o cuándo debe recogerlo un amigo.",
        ]}
        faqs={[
          { q: "¿Cuánto cuesta un coin locker en Japón?", a: "Entre 300 y 700 yenes por 24 horas según el tamaño. Los pequeños para mochilas rondan los 300-400 yenes y los grandes para maletas 500-700 yenes. Algunas taquillas en aeropuertos son más caras." },
          { q: "¿Puedo dejar una maleta grande en un coin locker?", a: "Sí, si eliges el tamaño XXL o Jumbo. Ocupan bastante espacio y son los primeros en agotarse, así que llega pronto o busca taquillas en estaciones secundarias." },
          { q: "¿Qué hago si se me caduca el tiempo del locker?", a: "Si el tiempo expira y no recoges tu equipaje, la estación lo retira a una consigna especial y puede cobrar una tarifa adicional por cada día extra. Vuelve antes de que expire para evitarlo: este temporizador te avisa." },
        ]}
      />

      <RelatedTools currentTool="lockers" />
    </div>
  );
}
