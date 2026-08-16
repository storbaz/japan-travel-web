"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { useExchangeRate, yenToEur } from "@/hooks/useExchangeRate";
import SeoContent from "@/components/SeoContent";

interface CityBudget {
  city: string;
  daily_budget_low: number;
  daily_budget_medium: number;
  daily_budget_high: number;
  tips: string[];
}

export default function BudgetPage() {
  const [cities, setCities] = useState<CityBudget[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [days, setDays] = useState(7);
  const [style, setStyle] = useState("medium");
  const [estimate, setEstimate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { rate } = useExchangeRate();

  useEffect(() => {
    fetch(`${API_URL}/v1/budget/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data.cities || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetch(`${API_URL}/v1/budget/estimate?city=${selectedCity}&style=${style}&days=${days}`)
        .then((res) => res.json())
        .then((data) => setEstimate(data))
        .catch(() => {});
    }
  }, [selectedCity, style, days]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Presupuesto</h1>
      <p className="text-gray-600 mb-8">Calcula cuanto necesitas para tu viaje</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Calculadora de Viaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((c) => (
                <option key={c.city} value={c.city.toLowerCase()}>{c.city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estilo</label>
            <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="low">Economico</option>
              <option value="medium">Moderado</option>
              <option value="high">Lujo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dias</label>
            <input type="number" value={days} onChange={(e) => setDays(parseInt(e.target.value) || 1)} min={1} max={30} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        {estimate && !estimate.error && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">¥{estimate.daily_budget_jpy?.toLocaleString()} <span className="text-sm font-normal">({yenToEur(estimate.daily_budget_jpy, rate)})</span></div>
                <div className="text-sm text-gray-600">Por dia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">¥{estimate.total_budget_jpy?.toLocaleString()} <span className="text-sm font-normal">({yenToEur(estimate.total_budget_jpy, rate)})</span></div>
                <div className="text-sm text-gray-600">Total ({estimate.days} dias)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">€{estimate.estimated_eur}</div>
                <div className="text-sm text-gray-600">En Euros</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${estimate.estimated_usd}</div>
                <div className="text-sm text-gray-600">En Dolares</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">Costes por Ciudad (diario)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city.city} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition cursor-pointer" onClick={() => setSelectedCity(city.city.toLowerCase())}>
            <h3 className="font-bold text-lg mb-3">{city.city}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Economico:</span><span className="font-medium">¥{city.daily_budget_low.toLocaleString()} <span className="text-xs text-gray-400">({yenToEur(city.daily_budget_low, rate)})</span></span></div>
              <div className="flex justify-between"><span className="text-gray-500">Moderado:</span><span className="font-medium">¥{city.daily_budget_medium.toLocaleString()} <span className="text-xs text-gray-400">({yenToEur(city.daily_budget_medium, rate)})</span></span></div>
              <div className="flex justify-between"><span className="text-gray-500">Lujo:</span><span className="font-medium">¥{city.daily_budget_high.toLocaleString()} <span className="text-xs text-gray-400">({yenToEur(city.daily_budget_high, rate)})</span></span></div>
            </div>
          </div>
        ))}
      </div>

      <SeoContent
        title="¿Cuánto cuesta viajar a Japón?"
        paragraphs={[
          "El presupuesto diario de Japón sorprende a la mayoría de viajeros: se puede dormir en un hostal por 3.000-4.000 yenes (20-27 euros), comer ramen por 1.000 yenes y moverse en metro por 200-300 yenes por trayecto. Con una media de 10.000 yenes (65 euros) al día vives con comodidad, y por 15.000 yenes o más añades cenas en restaurantes con reserva y alojamiento en hoteles céntricos. El alojamiento es la partida que más pesa, especialmente en temporada alta.",
          "El transporte interurbano es el segundo gran gasto. El shinkansen Tokio-Kioto cuesta unos 14.000 yenes (91 euros) por trayecto; si haces varias ciudades, el JR Pass o los billetes de 14 días pueden ahorrarte cientos de euros. Dentro de las ciudades, la tarjeta Suica o Pasmo mantiene cada trayecto por debajo de 350 yenes.",
          "Las entradas a atracciones suman: TeamLab Planets cuesta 2.400 yenes, la Tokyo Skytree unos 2.100 yenes y un onsen entre 1.000 y 2.000 yenes. Tenlo en cuenta al planificar el día a día. Esta calculadora te da una estimación realista combinando ciudad, estilo de viaje y duración, y la puedes usar para ajustar tu ruta y tu hucha.",
        ]}
        faqs={[
          { q: "¿Cuál es el presupuesto mínimo diario en Japón?", a: "Con 7.000-8.000 yenes (45-52 euros) al día puedes cubrir hostal, comida de konbini o ramen y transporte en una ciudad. Es el mínimo realista para no privarte de todo." },
          { q: "¿Es Japón más caro que Europa?", a: "El transporte y el alojamiento son comparables a las capitales europeas, pero la comida es notablemente más barata: se come bien por 5-8 euros. La relación calidad-precio en restaurantes de nivel medio es excelente." },
          { q: "¿Cuánto cuesta el vuelo a Japón?", a: "Desde España, un billete de ida y vuelta con escala suele costar 600-900 euros. Los meses más baratos son mayo, septiembre y noviembre, y conviene reservar con 3-4 meses de antelación." },
        ]}
      />
    </div>
  );
}
