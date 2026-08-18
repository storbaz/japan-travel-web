"use client";

import { useState, useEffect } from "react";
import SeoContent from "@/components/SeoContent";
import RelatedTools from "@/components/RelatedTools";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  season: string[];
  checked: boolean;
}

const defaultItems: Omit<PackingItem, "id" | "checked">[] = [
  { name: "Pasaporte", category: "Documentos", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Visa (si aplica)", category: "Documentos", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Seguro de viaje", category: "Documentos", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Reservas de hotel (impresas)", category: "Documentos", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "JR Pass (si aplica)", category: "Documentos", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Pasamontanas Suica/Pasmo", category: "Documentos", essential: false, season: ["primavera", "verano", "otono", "invierno"] },

  { name: "Camisetas", category: "Ropa", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Pantalones/vaqueros", category: "Ropa", essential: true, season: ["primavera", "otono", "invierno"] },
  { name: "Chaqueta ligera", category: "Ropa", essential: true, season: ["primavera", "otono"] },
  { name: "Chaqueta impermeable", category: "Ropa", essential: true, season: ["primavera", "verano", "otono"] },
  { name: "Abrigo grueso", category: "Ropa", essential: true, season: ["invierno"] },
  { name: "Bufanda", category: "Ropa", essential: false, season: ["invierno"] },
  { name: "Guantes", category: "Ropa", essential: false, season: ["invierno"] },
  { name: "Gorro", category: "Ropa", essential: false, season: ["invierno"] },
  { name: "Sombrero/visor", category: "Ropa", essential: false, season: ["verano"] },
  { name: "Ropa interior extra", category: "Ropa", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Calcetines (5+ pares)", category: "Ropa", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Zapatillas comodas", category: "Ropa", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Sandalias (para onsen)", category: "Ropa", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Pijama", category: "Ropa", essential: false, season: ["primavera", "verano", "otono", "invierno"] },

  { name: "Movil + cargador", category: "Electronica", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Adaptador de enchufe (tipo A/B)", category: "Electronica", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Power bank", category: "Electronica", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Auriculares", category: "Electronica", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Camara", category: "Electronica", essential: false, season: ["primavera", "verano", "otono", "invierno"] },

  { name: "Mochila de dia", category: "Accesorios", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Paraguas plegable", category: "Accesorios", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Botella de agua reutilizable", category: "Accesorios", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Toalla pequena", category: "Accesorios", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Bolsa para zapatos", category: "Accesorios", essential: false, season: ["primavera", "verano", "otono", "invierno"] },

  { name: "Protector solar", category: "Salud", essential: true, season: ["verano", "primavera"] },
  { name: "Repelente de insectos", category: "Salud", essential: false, season: ["verano"] },
  { name: "Farmacia basica", category: "Salud", essential: true, season: ["primavera", "verano", "otono", "invierno"] },
  { name: "Mascarillas (opcional)", category: "Salud", essential: false, season: ["primavera", "verano", "otono", "invierno"] },
];

const seasonNames: Record<string, string> = {
  primavera: "🌸 Primavera",
  verano: "☀️ Verano",
  otono: "🍂 Otoño",
  invierno: "❄️ Invierno",
};

const categories = ["Documentos", "Ropa", "Electronica", "Accesorios", "Salud"];

function loadChecks(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("viajapp_packing_checks") || "{}");
  } catch { return {}; }
}

function saveChecks(checks: Record<string, boolean>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("viajapp_packing_checks", JSON.stringify(checks));
}

export default function PackingPage() {
  const [season, setSeason] = useState("primavera");
  const [days, setDays] = useState(7);
  const [items, setItems] = useState<PackingItem[]>(() => {
    const checks = loadChecks();
    return defaultItems.map((item, i) => {
      const id = `item-${i}`;
      return { ...item, id, checked: checks[id] || false };
    });
  });
  const [showChecked, setShowChecked] = useState(false);

  useEffect(() => {
    const checks: Record<string, boolean> = {};
    items.forEach((i) => { checks[i.id] = i.checked; });
    saveChecks(checks);
  }, [items]);

  const filteredItems = items.filter((item) => item.season.includes(season));
  const checkedCount = filteredItems.filter((i) => i.checked).length;
  const totalEssential = filteredItems.filter((i) => i.essential).length;
  const checkedEssential = filteredItems.filter((i) => i.essential && i.checked).length;

  const toggleItem = (id: string) => {
    setItems(items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const visibleItems = showChecked ? filteredItems : filteredItems.filter((i) => !i.checked);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🎒 Lista de Equipaje</h1>
      <p className="text-gray-600 mb-8">Personalizada para tu viaje</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Temporada</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(seasonNames).map(([key, label]) => (
              <button key={key} onClick={() => setSeason(key)} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${season === key ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dias de viaje: {days}</label>
          <input type="range" min={1} max={30} value={days} onChange={(e) => setDays(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-lg">{checkedCount}</span>
            <span className="text-gray-600"> / {filteredItems.length} items</span>
            <span className="text-gray-400 mx-2">|</span>
            <span className="text-green-600 font-medium">{checkedEssential}</span>
            <span className="text-gray-600"> / {totalEssential} esenciales</span>
          </div>
          <button onClick={() => setShowChecked(!showChecked)} className="text-sm text-red-600 hover:underline">
            {showChecked ? "Ocultar completados" : "Ver completados"}
          </button>
        </div>
        <div className="mt-2 bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${(checkedCount / filteredItems.length) * 100}%` }} />
        </div>
      </div>

      {days >= 10 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
          💡 Viaje largo: considera llevar menos ropa y planear lavanderia en konbini (lavado ¥300-500).
        </div>
      )}

      {categories.map((cat) => {
        const catItems = visibleItems.filter((i) => i.category === cat);
        if (catItems.length === 0) return null;
        return (
          <div key={cat} className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-3">{cat}</h2>
            <div className="space-y-2">
              {catItems.map((item) => (
                <div key={item.id} onClick={() => toggleItem(item.id)} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${item.checked ? "bg-green-50 border border-green-200" : "bg-white border border-gray-100 hover:border-red-200"}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${item.checked ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                    {item.checked && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`flex-1 ${item.checked ? "line-through text-gray-400" : "text-gray-800"}`}>{item.name}</span>
                  {item.essential && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Esencial</span>}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 border border-green-100">
        <h3 className="font-bold text-gray-900 mb-3">📱 Prepara tu viaje</h3>
        <p className="text-sm text-gray-600 mb-3">Sin internet en Japon estas perdido. Compra tu eSIM antes de viajar.</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://www.japan-wireless.com/esim?via=antonio" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Comprar eSIM Japan Wireless ↗
          </a>
          <a href="https://www.airport-taxi.tokyo/en?via=antonio" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Reservar Airport Taxi ↗
          </a>
        </div>
      </div>

      <SeoContent
        title="Qué meter en la maleta para Japón"
        paragraphs={[
          "La maleta perfecta para Japón depende de la época, pero hay una base común. El error más típico es sobrecargar: en Japón se compra muchísimo (electrónica, souvenirs, cosmética) y necesitarás espacio de vuelta. Lleva ropa cómoda para caminar (se andan 15-20 km al día), zapatillas ya gastadas que no te hagan rozaduras y capas para las diferencias de temperatura entre el día y la noche.",
          "El adaptador de enchufe es imprescindible: Japón usa clavijas de tipo A (dos patillas planas) con 100V, que funcionan con la mayoría de cargadores europeos modernos pero necesitan adaptador. El cargador portátil (power bank) es otro básico, porque el móvil se usa todo el día (mapas, traductor, tarjetas de transporte). Una bolsa plegable de viaje ayuda a organizar el botín de vuelta.",
          "En invierno (diciembre-febrero) añade abrigo, guantes y gorro, sobre todo si vas a Sapporo o a los Alpes. En verano (julio-agosto) la humedad es alta: ropa transpirable, gorra y protector solar. En primavera, además, los japoneses usan mascarilla por la alergia al polen del cedro (kafunsho). En cualquier época: calzado que se quite fácilmente, porque en muchos templos, casas de té y restaurantes tradicionales hay que descalzarse a la entrada.",
        ]}
        faqs={[
          { q: "¿Qué adaptador necesito para Japón?", a: "Japón usa enchufes de tipo A (dos patillas planas) a 100V. Compra un adaptador universal o tipo A antes de viajar; la mayoría de cargadores de móvil y portátiles funcionan con 100-240V sin problema." },
          { q: "¿Qué ropa llevar según la estación?", a: "Primavera y otoño: capas (15-22 grados). Verano: ligera y transpirable (30-35 grados y humedad alta). Invierno: abrigo y calzado cerrado (0-10 grados, y bajo cero en Hokkaido)." },
          { q: "¿Necesito zapatos de andar mucho?", a: "Sí, zapatillas cómodas y ya 'domadas'. En Japón se camina muchísimo y se suben muchas escaleras y cuestas en templos y santuarios. No estrenes calzado el primer día." },
        ]}
      />

      <RelatedTools currentTool="packing" />
    </div>
  );
}
