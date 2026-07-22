"use client";

import { useState, useMemo } from "react";

interface RouteStop {
  city: string;
}

const cities = [
  { id: "tokyo", label: "Tokio", jp: "東京" },
  { id: "osaka", label: "Osaka", jp: "大阪" },
  { id: "kyoto", label: "Kioto", jp: "京都" },
  { id: "hiroshima", label: "Hiroshima", jp: "広島" },
  { id: "nagoya", label: "Nagoya", jp: "名古屋" },
  { id: "nara", label: "Nara", jp: "奈良" },
  { id: "kanazawa", label: "Kanazawa", jp: "金沢" },
  { id: "fukuoka", label: "Fukuoka", jp: "福岡" },
  { id: "hakone", label: "Hakone", jp: "箱根" },
  { id: "nikko", label: "Nikko", jp: "日光" },
  { id: "kamakura", label: "Kamakura", jp: "鎌倉" },
  { id: "sapporo", label: "Sapporo", jp: "札幌" },
];

const shinkansenFares: Record<string, number> = {
  "tokyo-osaka": 14720,
  "tokyo-kyoto": 13320,
  "tokyo-nagoya": 11300,
  "tokyo-hiroshima": 19760,
  "tokyo-hakone": 3500,
  "tokyo-kanazawa": 14380,
  "tokyo-nikko": 5500,
  "tokyo-kamakura": 950,
  "tokyo-nara": 14500,
  "osaka-kyoto": 2860,
  "osaka-hiroshima": 10780,
  "osaka-nagoya": 6680,
  "osaka-nara": 820,
  "osaka-kanazawa": 7260,
  "osaka-fukuoka": 10780,
  "kyoto-hiroshima": 12200,
  "kyoto-nara": 720,
  "kyoto-kanazawa": 4560,
  "nagoya-hiroshima": 11760,
  "nagoya-kanazawa": 4580,
  "hiroshima-fukuoka": 9180,
  "kanazawa-nagoya": 4580,
};

const localFares: Record<string, number> = {
  "tokyo-nikko": 2000,
  "tokyo-kamakura": 950,
  "osaka-nara": 820,
  "kyoto-nara": 720,
  "tokyo-hakone": 2300,
  "kyoto-osaka": 580,
};

const jrPassPrices = [
  { id: "7day", days: 7, name: "JR Pass 7 días", price: 50000, priceEur: 311 },
  { id: "14day", days: 14, name: "JR Pass 14 días", price: 80000, priceEur: 497 },
  { id: "21day", days: 21, name: "JR Pass 21 días", price: 100000, priceEur: 621 },
];

// Sugerencias de day trips desde cada ciudad (solo JR lines incluidas en el pass)
const dayTripSuggestions: Record<string, { city: string; fare: number; desc: string }[]> = {
  tokyo: [
    { city: "kamakura", fare: 950, desc: "Templo Great Buddha" },
    { city: "nikko", fare: 5500, desc: "Tosho-gu Shrine" },
    { city: "hakone", fare: 3500, desc: "Onsen + vistas Fuji" },
  ],
  kyoto: [
    { city: "nara", fare: 720, desc: "Ciervos + templos" },
    { city: "osaka", fare: 580, desc: "Dotonbori + street food" },
  ],
  osaka: [
    { city: "nara", fare: 820, desc: "Todai-ji + ciervos" },
    { city: "kyoto", fare: 580, desc: "Templos + geishas" },
  ],
  hiroshima: [
    { city: "miyajima", fare: 420, desc: "Isla + torii flotante" },
  ],
};

function getRouteKey(a: string, b: string): string {
  const sorted = [a, b].sort();
  return `${sorted[0]}-${sorted[1]}`;
}

function getFare(from: string, to: string): number {
  const key = getRouteKey(from, to);
  return shinkansenFares[key] || localFares[key] || 3000;
}

function formatYen(yen: number): string {
  return `¥${yen.toLocaleString()}`;
}

function formatEur(yen: number): string {
  return `~${Math.round(yen * 0.0062)}€`;
}

export default function JRPassCalculatorPage() {
  const [route, setRoute] = useState<RouteStop[]>([
    { city: "tokyo" },
    { city: "kyoto" },
    { city: "osaka" },
  ]);
  const [showResult, setShowResult] = useState(false);

  const addStop = () => {
    if (route.length < 15) {
      setRoute([...route, { city: "tokyo" }]);
    }
  };

  const removeStop = (index: number) => {
    if (route.length > 2) {
      setRoute(route.filter((_, i) => i !== index));
    }
  };

  const updateStop = (index: number, city: string) => {
    const newRoute = [...route];
    newRoute[index] = { city };
    setRoute(newRoute);
  };

  const moveStop = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= route.length) return;
    const newRoute = [...route];
    [newRoute[index], newRoute[newIndex]] = [newRoute[newIndex], newRoute[index]];
    setRoute(newRoute);
  };

  const analysis = useMemo(() => {
    const segments: { from: string; to: string; fare: number; type: "shinkansen" | "local" }[] = [];
    let totalIndividual = 0;

    // Segmentos directos de la ruta
    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i].city;
      const to = route[i + 1].city;
      const key = getRouteKey(from, to);
      const isShinkansen = shinkansenFares[key] !== undefined;
      const fare = isShinkansen ? shinkansenFares[key] : localFares[key] || 3000;
      segments.push({ from, to, fare, type: isShinkansen ? "shinkansen" : "local" });
      totalIndividual += fare;
    }

    // Incluir day trips sugeridos desde cada ciudad de la ruta
    const suggestedSegments: { from: string; to: string; fare: number; type: "shinkansen" | "local"; suggested: boolean }[] = [];
    let suggestedTotal = 0;
    const visitedCities = new Set(route.map((r) => r.city));

    // 1. Sugerir viaje de vuelta a la ciudad de origen si el ultimo != primero
    if (route.length >= 2) {
      const firstCity = route[0].city;
      const lastCity = route[route.length - 1].city;
      if (firstCity !== lastCity) {
        const key = getRouteKey(firstCity, lastCity);
        const isShinkansen = shinkansenFares[key] !== undefined;
        const fare = isShinkansen ? shinkansenFares[key] : localFares[key] || 3000;
        suggestedSegments.push({ from: lastCity, to: firstCity, fare, type: isShinkansen ? "shinkansen" : "local", suggested: true });
        suggestedTotal += fare;
      }
    }

    // 2. Day trips sugeridos desde cada ciudad
    route.forEach((stop) => {
      const suggestions = dayTripSuggestions[stop.city] || [];
      suggestions.forEach((sug) => {
        // Solo sugerir si no esta ya en la ruta
        if (!visitedCities.has(sug.city)) {
          const key = getRouteKey(stop.city, sug.city);
          const isShinkansen = shinkansenFares[key] !== undefined;
          const fare = isShinkansen ? shinkansenFares[key] : sug.fare;
          suggestedSegments.push({ from: stop.city, to: sug.city, fare, type: isShinkansen ? "shinkansen" : "local", suggested: true });
          suggestedTotal += fare;
          visitedCities.add(sug.city); // No sugerir dos veces
        }
      });
    });

    const allSegments = [...segments, ...suggestedSegments];
    const totalWithSuggestions = totalIndividual + suggestedTotal;

    const numDays = Math.max(route.length * 2, 5);
    const eligiblePasses = jrPassPrices.filter((p) => p.days >= numDays);
    const bestPass = eligiblePasses.length > 0 ? eligiblePasses[0] : null;

    // Calcular si merece la pena CON day trips sugeridos
    const saving = bestPass ? totalWithSuggestions - bestPass.price : 0;
    const recommendsPass = saving > 0;

    // Tambien calcular sin day trips para mostrar la comparativa
    const savingDirect = bestPass ? totalIndividual - bestPass.price : 0;
    const recommendsDirect = savingDirect > 0;

    const shinkansenTotal = allSegments.filter((s) => s.type === "shinkansen").reduce((sum, s) => sum + s.fare, 0);

    return {
      segments,
      suggestedSegments,
      totalIndividual,
      totalWithSuggestions,
      suggestedTotal,
      bestPass,
      saving,
      recommendsPass,
      savingDirect,
      recommendsDirect,
      numDays,
      shinkansenTotal,
    };
  }, [route]);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const getCityLabel = (id: string) => cities.find((c) => c.id === id)?.label || id;
  const getCityJp = (id: string) => cities.find((c) => c.id === id)?.jp || "";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">🚄 Calculadora JR Pass</h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Introduce tu ruta y te decimos si el JR Pass te ahorra dinero. Compara con precios reales de Shinkansen.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🗺️ Tu ruta por Japón</h2>
        <p className="text-sm text-gray-500 mb-4">Añade las ciudades en orden. Primero y último parada son fijos.</p>

        <div className="space-y-3">
          {route.map((stop, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {i + 1}
              </div>
              {i > 0 && i < route.length - 1 && (
                <button onClick={() => removeStop(i)}
                  className="text-gray-400 hover:text-red-500 text-lg flex-shrink-0" title="Eliminar parada">
                  ✕
                </button>
              )}
              <select value={stop.city} onChange={(e) => updateStop(i, e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm font-medium">
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>{c.label} ({c.jp})</option>
                ))}
              </select>
              {i > 0 && (
                <button onClick={() => moveStop(i, -1)} className="text-gray-400 hover:text-gray-600 text-sm" title="Mover arriba">▲</button>
              )}
              {i < route.length - 1 && (
                <button onClick={() => moveStop(i, 1)} className="text-gray-400 hover:text-gray-600 text-sm" title="Mover abajo">▼</button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={addStop}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            + Añadir parada
          </button>
        </div>

        <button onClick={handleCalculate}
          className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition">
          Calcular si merece la pena →
        </button>
      </div>

      {showResult && (
        <div className="space-y-6">
          <div className={`rounded-2xl p-6 text-white text-center ${analysis.recommendsPass ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}>
            <div className="text-5xl mb-3">{analysis.recommendsPass ? "✅" : "💡"}</div>
            <h2 className="text-2xl font-bold mb-2">
              {analysis.recommendsPass
                ? `El JR Pass te ahorra ${formatYen(analysis.saving)}`
                : "Para tu ruta directa, no merece la pena"}
            </h2>
            <p className="opacity-90">
              {analysis.recommendsPass
                ? `Con el pass pagas ${formatYen(analysis.bestPass!.price)} vs ${formatYen(analysis.totalWithSuggestions)} por separado`
                : `Tu ruta cuesta ${formatYen(analysis.totalIndividual)} — el pass cuesta ${analysis.bestPass ? formatYen(analysis.bestPass.price) : "N/A"}`
              }
            </p>
          </div>

          {/* Day trips sugeridos */}
          {analysis.suggestedSegments.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-2">🏙️ Viajes adicionales que probablemente harás</h3>
              <p className="text-sm text-amber-700 mb-3">
                La mayoría de viajeros regresan a su ciudad de origen y hacen day trips. Incluimos estos viajes en el cálculo:
              </p>
              <div className="space-y-1.5">
                {analysis.suggestedSegments.map((seg, i) => {
                  const isReturn = i === 0 && route.length >= 2 && route[0].city !== route[route.length - 1].city;
                  const sugDesc = !isReturn ? dayTripSuggestions[seg.from]?.find(s => s.city === seg.to)?.desc : null;
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-amber-800">
                        {getCityLabel(seg.from)} → {getCityLabel(seg.to)}
                        {isReturn && <span className="text-amber-500 text-xs ml-1">(viaje de vuelta)</span>}
                        {sugDesc && <span className="text-amber-500 text-xs ml-1">({sugDesc})</span>}
                      </span>
                      <span className="font-medium text-amber-700">{formatYen(seg.fare)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200 flex justify-between text-sm font-bold">
                <span className="text-amber-800">Total con viajes adicionales</span>
                <span className="text-amber-900">{formatYen(analysis.totalWithSuggestions)} ({formatEur(analysis.totalWithSuggestions)})</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">💰 Sin JR Pass</h3>
              <div className="text-3xl font-bold text-red-600 mb-1">{formatYen(analysis.totalWithSuggestions)}</div>
              <div className="text-sm text-gray-500 mb-4">{formatEur(analysis.totalWithSuggestions)}</div>
              <div className="space-y-2">
                {analysis.segments.map((seg, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {getCityLabel(seg.from)} → {getCityLabel(seg.to)}
                    </span>
                    <span className={`font-medium ${seg.type === "shinkansen" ? "text-blue-600" : "text-gray-600"}`}>
                      {formatYen(seg.fare)}
                      <span className="text-[10px] ml-1 text-gray-400">{seg.type === "shinkansen" ? "🚄" : "🚃"}</span>
                    </span>
                  </div>
                ))}
                {analysis.suggestedSegments.map((seg, i) => (
                  <div key={`sug-${i}`} className="flex justify-between text-sm opacity-70">
                    <span className="text-gray-600">
                      {getCityLabel(seg.from)} → {getCityLabel(seg.to)} <span className="text-xs">(day trip)</span>
                    </span>
                    <span className={`font-medium ${seg.type === "shinkansen" ? "text-blue-600" : "text-gray-600"}`}>
                      {formatYen(seg.fare)}
                      <span className="text-[10px] ml-1 text-gray-400">{seg.type === "shinkansen" ? "🚄" : "🚃"}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">🎫 Con JR Pass</h3>
              {analysis.bestPass ? (
                <>
                  <div className="text-3xl font-bold text-green-600 mb-1">{formatYen(analysis.bestPass.price)}</div>
                  <div className="text-sm text-gray-500 mb-4">{formatEur(analysis.bestPass.price)}</div>
                  <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <div className="font-medium text-green-800">{analysis.bestPass.name}</div>
                    <div className="text-sm text-green-600">Válido {analysis.bestPass.days} días</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">✅ Shinkansen ilimitado</p>
                    <p className="mb-1">✅ JR trains locales</p>
                    <p className="mb-1">✅ JR buses</p>
                    <p>✅ Ferry a Miyajima</p>
                  </div>
                  {analysis.recommendsPass && (
                    <div className="mt-3 bg-green-50 rounded-lg p-3 text-sm text-green-800 font-medium">
                      ✅ Te ahorras {formatYen(analysis.saving)} ({formatEur(analysis.saving)})
                    </div>
                  )}
                </>
              ) : (
                <div className="text-gray-500">No hay JR Pass para {analysis.numDays} días</div>
              )}
            </div>
          </div>

          {analysis.shinkansenTotal > 0 && (
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">📊 Dato interesante</h3>
              <p className="text-sm text-blue-800">
                Tus viajes en Shinkansen cuestan <strong>{formatYen(analysis.shinkansenTotal)}</strong> ({formatEur(analysis.shinkansenTotal)}).
                {analysis.bestPass && (
                  <> El JR Pass de {analysis.bestPass.days}d cuesta {formatYen(analysis.bestPass.price)},
                  {analysis.shinkansenTotal > analysis.bestPass.price
                    ? <> así que <strong>te ahorras {formatYen(analysis.shinkansenTotal - analysis.bestPass.price)}</strong> solo en Shinkansen.</>
                    : <> pero tus Shinkansen cuestan menos que el pass.</>
                  }</>
                )}
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-3">💡 Tips para ahorrar</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Compra el JR Pass online antes del viaje</strong> — es más barato que en Japón</li>
              <li>• <strong>El JR Pass no cubre Nozomi/Mizuho</strong> — usa Hikari o Kodama (más lentos pero incluidos)</li>
              <li>• <strong>Para viajes cortos</strong>, un billete suelto suele ser más barato</li>
              <li>• <strong>Si haces Tokyo→Kioto→Osaka→Tokio</strong>, el pass casi siempre merece la pena</li>
              <li>• <strong>Incluye day trips</strong> — Nara, Kamakura, Nikko y Hakone están incluidos en el pass</li>
              <li>• <strong>Actívalo en el aeropuerto</strong> al llegar para maximizar los días</li>
            </ul>
          </div>

          <div className="text-center">
            <a href="/transport"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">
              🚄 Ver guía de transporte
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
