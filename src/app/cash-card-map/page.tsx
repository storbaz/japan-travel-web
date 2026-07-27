"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { cashCardPOIs, PAYMENT_CONFIG, PaymentType } from "@/lib/cash-card-data";

const CashCardMap = dynamic(() => import("./CashCardMapClient"), { ssr: false });

const cityCoords: Record<string, [number, number]> = {
  tokyo: [35.6762, 139.6503], kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023], nara: [34.6851, 135.8048],
  hiroshima: [34.3853, 132.4553], kanazawa: [36.5613, 136.6562],
  nagoya: [35.1815, 136.9066], hakone: [35.2330, 139.1067],
  fukuoka: [33.5904, 130.4017],
};

const cityNames: Record<string, string> = {
  tokyo: "Tokio", kyoto: "Kioto", osaka: "Osaka", nara: "Nara",
  hiroshima: "Hiroshima", kanazawa: "Kanazawa", nagoya: "Nagoya",
  hakone: "Hakone", fukuoka: "Fukuoka",
};

export default function CashCardMapPage() {
  const [selectedCity, setSelectedCity] = useState("all");
  const [activeTypes, setActiveTypes] = useState<Set<PaymentType>>(new Set(["card", "cash_only", "mixed", "atm"]));

  const toggleType = (type: PaymentType) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredPOIs = useMemo(() => {
    return cashCardPOIs.filter((poi) => {
      const typeMatch = activeTypes.has(poi.type);
      const cityMatch = selectedCity === "all" || poi.city === selectedCity;
      return typeMatch && cityMatch;
    });
  }, [activeTypes, selectedCity]);

  const stats = useMemo(() => {
    const counts: Record<PaymentType, number> = { card: 0, cash_only: 0, mixed: 0, atm: 0 };
    filteredPOIs.forEach((p) => counts[p.type]++);
    return counts;
  }, [filteredPOIs]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">💰</span>
        <h1 className="text-4xl font-bold text-gray-900">Efectivo vs Tarjeta</h1>
      </div>
      <p className="text-gray-600 mb-6">Donde pagar con tarjeta vs donde necesitas efectivo en Japon</p>

      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 mb-6">
        <h2 className="font-bold text-amber-800 mb-2">💡 Consejo importante</h2>
        <p className="text-sm text-amber-700">
          En Japón, la mayoria de <strong>konbini</strong> (7-Eleven, FamilyMart, Lawson) aceptan tarjetas internacionales.
          Los <strong>templos</strong>, <strong>izakayas pequenos</strong>, <strong>yatais</strong> y <strong>mercados callejeros</strong> son casi siempre <strong>solo efectivo</strong>.
          Lleva siempre efectivo encima.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 flex-shrink-0 space-y-4">
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Ciudad</h3>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white"
            >
              <option value="all">Todas las ciudades</option>
              {Object.entries(cityNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3">Tipo de pago</h3>
            <div className="space-y-2">
              {(Object.entries(PAYMENT_CONFIG) as [PaymentType, typeof PAYMENT_CONFIG[PaymentType]][]).map(([type, config]) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition text-left ${
                    activeTypes.has(type)
                      ? "border-current shadow-sm"
                      : "border-gray-100 opacity-50"
                  }`}
                  style={activeTypes.has(type) ? { borderColor: config.color, backgroundColor: config.bgColor } : {}}
                >
                  <span className="text-xl">{config.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-gray-900">{config.label}</div>
                    <div className="text-xs text-gray-500">{stats[type]} puntos</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    activeTypes.has(type) ? "border-current" : "border-gray-300"
                  }`} style={activeTypes.has(type) ? { borderColor: config.color, backgroundColor: config.color } : {}}>
                    {activeTypes.has(type) && <span className="text-white text-xs">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-900 text-sm mb-2">📊 Resumen</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Total puntos:</span><span className="font-bold">{filteredPOIs.length}</span></div>
              <div className="flex justify-between"><span className="text-green-600">Aceptan tarjeta:</span><span className="font-bold">{stats.card}</span></div>
              <div className="flex justify-between"><span className="text-red-600">Solo efectivo:</span><span className="font-bold">{stats.cash_only}</span></div>
              <div className="flex justify-between"><span className="text-amber-600">Mixtos:</span><span className="font-bold">{stats.mixed}</span></div>
              <div className="flex justify-between"><span className="text-blue-600">ATM:</span><span className="font-bold">{stats.atm}</span></div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <CashCardMap
            pois={filteredPOIs}
            selectedCity={selectedCity}
            cityCoords={cityCoords}
          />
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🗣️ Frases utiles para pagar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="font-bold text-gray-900">カードで払えますか？</div>
            <div className="text-sm text-gray-500 italic">Kaado de haraemasu ka?</div>
            <div className="text-gray-700">¿Puedo pagar con tarjeta?</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <div className="font-bold text-gray-900">現金だけですか？</div>
            <div className="text-sm text-gray-500 italic">Genkin dake desu ka?</div>
            <div className="text-gray-700">¿Solo efectivo?</div>
          </div>
        </div>
      </div>
    </div>
  );
}
