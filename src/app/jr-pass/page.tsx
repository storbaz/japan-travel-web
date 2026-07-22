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

    for (let i = 0; i < route.length - 1; i++) {
      const from = route[i].city;
      const to = route[i + 1].city;
      const key = getRouteKey(from, to);
      const isShinkansen = shinkansenFares[key] !== undefined;
      const fare = isShinkansen ? shinkansenFares[key] : localFares[key] || 3000;
      segments.push({ from, to, fare, type: isShinkansen ? "shinkansen" : "local" });
      totalIndividual += fare;
    }

    const numDays = Math.max(route.length * 2, 5);
    const eligiblePasses = jrPassPrices.filter((p) => p.days >= numDays);
    const bestPass = eligiblePasses.length > 0 ? eligiblePasses[0] : null;
    const saving = bestPass ? totalIndividual - bestPass.price : 0;
    const recommendsPass = saving > 0;
    const shinkansenTotal = segments.filter((s) => s.type === "shinkansen").reduce((sum, s) => sum + s.fare, 0);

    return { segments, totalIndividual, bestPass, saving, recommendsPass, numDays, shinkansenTotal };
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
            <div className="text-5xl mb-3">{analysis.recommendsPass ? "✅" : "❌"}</div>
            <h2 className="text-2xl font-bold mb-2">
              {analysis.recommendsPass ? `El JR Pass te ahorra ${formatYen(analysis.saving)}` : "No te merece la pena el JR Pass"}
            </h2>
            <p className="opacity-90">
              {analysis.recommendsPass
                ? `Con el pass pagas ${formatYen(analysis.bestPass!.price)} vs ${formatYen(analysis.totalIndividual)} por separado`
                : `Por separado pagas ${formatYen(analysis.totalIndividual)} vs ${analysis.bestPass ? formatYen(analysis.bestPass.price) : "N/A"} el pass`
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-3">💰 Sin JR Pass</h3>
              <div className="text-3xl font-bold text-red-600 mb-1">{formatYen(analysis.totalIndividual)}</div>
              <div className="text-sm text-gray-500 mb-4">{formatEur(analysis.totalIndividual)}</div>
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
                {analysis.recommendsPass && analysis.bestPass && (
                  <> El JR Pass 7d cuesta {formatYen(analysis.bestPass.price)}, así que{" "}
                  <strong>te ahorras {formatYen(analysis.shinkansenTotal - analysis.bestPass.price)}</strong> solo en Shinkansen.</>
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
