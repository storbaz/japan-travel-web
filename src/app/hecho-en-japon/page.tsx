"use client";

import { useState, useEffect } from "react";

interface Brand {
  name: string;
  category: string;
  knownFor: string;
  stores: string[];
  icon: string;
}

const BRANDS: Brand[] = [
  { name: "Uniqlo", category: "Ropa", knownFor: "Ropa básica de calidad a buen precio", stores: ["Uniqlo (Ginza, Shibuya)", "Don Quijote"], icon: "👕" },
  { name: "Muji", category: "Hogar", knownFor: "Todo: ropa, papelería, hogar, cosmética", stores: ["Muji (Yurakucho, Shibuya)", "Aeon Mall"], icon: "🛍️" },
  { name: "Shiseido", category: "Cosmética", knownFor: "Cosmética premium japonesa", stores: ["Shiseido Flagship (Ginza)", "Farmacias", "Don Quijote"], icon: "💄" },
  { name: "SK-II", category: "Cosmética", knownFor: "Sérums y tratamientos faciales", stores: ["Grandes almacenes (Isetan, Takashimaya)", "Farmacias"], icon: "✨" },
  { name: "Shimano", category: "Deportes", knownFor: "Equipamiento de pesca y ciclismo", stores: ["Shimano Concept Store (Osaka)", "Tiendas de deporte"], icon: "🎣" },
  { name: "Yamaha", category: "Música", knownFor: "Pianos, guitarras, instrumentos", stores: ["Yamaha Music (Ginza)", "Tiendas de música"], icon: "🎹" },
  { name: "Nintendo", category: "Videojuegos", knownFor: "Consolas y videojuegos", stores: ["Nintendo Tokyo (Shibuya Parco)", "Nintendo Kyoto", "Yodobashi Camera", "Bic Camera"], icon: "🎮" },
  { name: "Sega", category: "Videojuegos", knownFor: "Arcades y figuras", stores: ["Sega Arcades (Akihabara)", "Yodobashi Camera"], icon: "🕹️" },
  { name: "Pokémon Center", category: "Merchandising", knownFor: "Todo de Pokémon", stores: ["Pokémon Center (Shibuya, Ikebukuro, Mega Tokyo)", "Pokémon Café"], icon: "⚡" },
  { name: "Sanrio", category: "Merchandising", knownFor: "Hello Kitty y personajes kawaii", stores: ["Sanrio World (Ginza)", "Sanrio Gift Gate"], icon: "🎀" },
  { name: "Daiso", category: "Hogar", knownFor: "Todo a 100¥ (básico)", stores: ["Daiso (Shibuya, Harajuku)", "Aeon Mall"], icon: "🏪" },
  { name: "Seria", category: "Hogar", knownFor: "Todo a 100¥ (más calidad que Daiso)", stores: ["Seria (AEON, grandes centros)", "Seria Harajuku"], icon: "🎨" },
  { name: "Montbell", category: "Deportes", knownFor: "Ropa técnica de montaña ligera", stores: ["Montbell (Shinjuku, Shibuya)", "Tiendas outdoor"], icon: "🥾" },
  { name: "Snow Peak", category: "Camping", knownFor: "Equipamiento camping premium", stores: ["Snow Peak (Shinjuku)", "Snow Peak Land Station (Japón)"], icon: "🏕️" },
  { name: "Suntory", category: "Bebidas", knownFor: "Whisky, cerveza, refrescos", stores: ["Suntory Flagship (Ginza)", "Supermercados", "Don Quijote"], icon: "🥃" },
  { name: "Nikka", category: "Bebidas", knownFor: "Whisky japonés de primera", stores: ["Nikka Whisky (Ginza)", "Don Quijote", "Supermercados"], icon: "🥃" },
  { name: "Hario", category: "Hogar", knownFor: "Cafeteras y menaje de vidrio", stores: ["Hario Shop (Tokyo)", "Loft", "Tokyu Hands"], icon: "☕" },
  { name: "Zojirushi", category: "Hogar", knownFor: "Termos y arroceras eléctricas", stores: ["Bic Camera", "Yodobashi Camera", "Don Quijote"], icon: "🫖" },
  { name: "Tiger", category: "Hogar", knownFor: "Termos y fiambreras", stores: ["Bic Camera", "Yodobashi Camera", "Loft"], icon: "🧊" },
  { name: "Kikkoman", category: "Alimentación", knownFor: "Salsa de soja y condimentos", stores: ["Supermercados", "Don Quijote"], icon: "🍶" },
  { name: "Glico", category: "Alimentación", knownFor: "Pocky, Pretz, helados", stores: ["Supermercados", "Konbini", "Don Quijote"], icon: "🍪" },
  { name: "Calbee", category: "Alimentación", knownFor: "Patatas fritas Jagarico, snacks", stores: ["Supermercados", "Konbini", "Don Quijote"], icon: "🥔" },
  { name: "Lupicia", category: "Té", knownFor: "Té japonés de alta calidad", stores: ["Lupicia (Ginza, Shibuya)", "Grandes almacenes"], icon: "🍵" },
  { name: "Ippodo Tea", category: "Té", knownFor: "Matcha y té verde premium", stores: ["Ippodo (Omotesando)", "Kyoto Flagship"], icon: "🍵" },
  { name: "Canon", category: "Electrónica", knownFor: "Cámaras réflex y mirrorless", stores: ["Canon Showroom (Shinjuku)", "Yodobashi Camera", "Bic Camera"], icon: "📷" },
  { name: "Sony", category: "Electrónica", knownFor: "Auriculares, cámaras, PlayStation", stores: ["Sony Store (Ginza)", "Yodobashi Camera", "Bic Camera"], icon: "🎧" },
  { name: "Panasonic", category: "Electrónica", knownFor: "Afeitadoras, secadores, electrodomésticos", stores: ["Panasonic Center (Tokyo)", "Yodobashi Camera"], icon: "🔌" },
  { name: "Fujifilm", category: "Electrónica", knownFor: "Cámaras instantáneas Instax", stores: ["Fujifilm Showroom (Midtown)", "Yodobashi Camera", "Bic Camera"], icon: "📸" },
  { name: "Bandai Namco", category: "Videojuegos", knownFor: "Gundam, figuras, juguetes", stores: ["Bandai Namco Cross Store (Akihabara)", "Gundam Base (Odaiba)"], icon: "🤖" },
  { name: "Tamiya", category: "Hobbies", knownFor: "Maquetas y coches RC", stores: ["Tamiya Plamodel Factory (Shibuya)", "Yodobashi Camera"], icon: "🚗" },
  { name: "Kai", category: "Hogar", knownFor: "Cuchillos de cocina japoneses", stores: ["Kai Showroom (Tokyo)", "Loft", "Tokyu Hands"], icon: "🔪" },
  { name: "Asics", category: "Deportes", knownFor: "Zapatillas running y ropa deportiva", stores: ["Asics Flagship (Ginza, Shibuya)", "Tiendas deporte"], icon: "👟" },
  { name: "Onitsuka Tiger", category: "Ropa", knownFor: "Zapatillas retro (antes ASICS)", stores: ["Onitsuka Tiger (Harajuku, Ginza)", "Grandes almacenes"], icon: "👟" },
];

const CATEGORIES = Array.from(new Set(BRANDS.map(b => b.category)));

const STORAGE_KEY = "viajapp_japan_checklist";

function loadChecked(): string[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}

export default function HechoEnJaponPage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => { setChecked(loadChecked()); }, []);

  const toggle = (name: string) => {
    setChecked(prev => {
      const next = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const filtered = filter ? BRANDS.filter(b => b.category === filter) : BRANDS;
  const progress = BRANDS.length > 0 ? Math.round((checked.length / BRANDS.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🇯🇵 Hecho en Japón</h1>
      <p className="text-gray-600 mb-6">Marca las marcas japonesas que quieres comprar y descubre dónde encontrarlas.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso</span>
          <span className="text-sm font-bold text-red-600">{checked.length}/{BRANDS.length} ({progress}%)</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFilter(null)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${!filter ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"}`}>Todas</button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition capitalize ${filter === cat ? "bg-red-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-red-300"}`}>{cat}</button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map(b => {
          const isChecked = checked.includes(b.name);
          return (
            <div key={b.name} className={`bg-white rounded-xl border transition-all cursor-pointer ${isChecked ? "border-green-300 bg-green-50" : "border-gray-100 hover:border-red-200"}`}
              onClick={() => toggle(b.name)}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{b.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{b.name}</h3>
                      {isChecked && <span className="text-green-500 text-sm">✓</span>}
                    </div>
                    <div className="text-xs text-gray-400 capitalize mb-1">{b.category}</div>
                    <p className="text-sm text-gray-600">{b.knownFor}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {b.stores.map(s => <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No hay marcas en esta categoría</p>}

      <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mt-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tax Free</h3>
        <p className="text-sm text-blue-800">En Japón puedes comprar libre de impuestos (8-10%) si gastas más de 5000¥ en una tienda con cartel "Tax Free". Lleva el pasaporte y te devuelven el IVA en el mismo establecimiento.</p>
      </div>
    </div>
  );
}
