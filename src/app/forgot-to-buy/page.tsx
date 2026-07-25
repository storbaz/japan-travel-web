"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  store: string;
  url: string;
  emoji: string;
}

const categories = [
  { id: "all", label: "Todos", emoji: "🛍️" },
  { id: "tech", label: "Tecnologia", emoji: "📱" },
  { id: "food", label: "Comida y Bebida", emoji: "🍱" },
  { id: "beauty", label: "Belleza y Salud", emoji: "💄" },
  { id: "anime", label: "Anime y Manga", emoji: "🎌" },
  { id: "fashion", label: "Moda", emoji: "👘" },
  { id: "home", label: "Hogar y Cocina", emoji: "🏠" },
  { id: "traditional", label: "Arte y Tradicional", emoji: "🎨" },
];

const products: Product[] = [
  // Tech
  { name: "Cascos Sony WH-1000XM5", description: "Los mejores canceladores de ruido del mercado. En Japon suelen ser mas baratos.", price: "~¥45,000", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sony+wh-1000xm5&tag=viajapp-21", emoji: "🎧" },
  { name: "Cargador Anker Japones", description: "Cargadores rapidos con enchufe tipo J (dos patas planas).", price: "~¥3,000", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anker+charger+japan&tag=viajapp-21", emoji: "🔌" },
  { name: "Power Bank Anker", description: "Bateria portatil para cargar movil mientras exploras.", price: "~¥3,500", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anker+power+bank&tag=viajapp-21", emoji: "🔋" },

  // Food
  { name: "Matcha Uji Premium", description: "Matcha autentico de Uji, Kioto. Ideal para preparar en casa.", price: "~¥3,000", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=matcha+uji+premium&tag=viajapp-21", emoji: "🍵" },
  { name: "Ramen Instantaneo Shin Black", description: "El ramen instantaneo mas vendido de Japon. Sabor autentico.", price: "~¥600", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=nissin+shin+black&tag=viajapp-21", emoji: "🍜" },
  { name: "KitKat Japones (edicion limitada)", description: "Sabores unicos solo disponibles en Japon: sake, matcha, fresa, etc.", price: "~¥1,500", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kitkat+japan+limited&tag=viajapp-21", emoji: "🍫" },
  { name: "Salsa Tonkatsu", description: "La salsa para tonkatsu que no encuentras fuera de Japon.", price: "~¥400", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=tonkatsu+sauce&tag=viajapp-21", emoji: "🍶" },
  { name: "Cafe Blue Bottle Japones", description: "Cafe tostado en Japon. Ediciones limitadas.", price: "~¥2,000", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=blue+bottle+coffee+japan&tag=viajapp-21", emoji: "☕" },
  { name: "Teh Iyemon Kagaya", description: "El te verde embotellado mas popular de Japon.", price: "~¥200", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=iyemon+kagaya&tag=viajapp-21", emoji: "🫖" },

  // Beauty
  { name: "Crema de Manos Shiasedo", description: "Crema de manos japonesa ultrahidratante.", price: "~¥1,500", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=shiseido+hand+cream&tag=viajapp-21", emoji: "🧴" },
  { name: "Mascarilla Lululun", description: "Mascarillas faciales japonesas. Paquetes de 7 u 36.", price: "~¥1,200", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=lululun+face+mask&tag=viajapp-21", emoji: "🧖" },
  { name: "Protector Solar Anessa", description: "El protector solar #1 en Japon. Perfecto para turismo.", price: "~¥2,500", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anessa+sunscreen&tag=viajapp-21", emoji: "☀️" },

  // Anime & Manga
  { name: "Figura Gundam", description: "Modelos Gunpla de Bandai. Coleccionables unicos.", price: "~¥3,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=bandai+gundam+model&tag=viajapp-21", emoji: "🤖" },
  { name: "Manga Shonen Jump", description: "Manga original en japones. Ediciones de coleccion.", price: "~¥500", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=shonen+jump+manga&tag=viajapp-21", emoji: "📚" },
  { name: "Pelicula Ghibli Blu-ray", description: "Ediciones japonesas con arte exclusivo.", price: "~¥5,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=studio+ghibli+blu-ray&tag=viajapp-21", emoji: "🎬" },
  { name: "Pokemon Center exclusivos", description: "Productos exclusivos de Pokemon Center.", price: "~¥2,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=pokemon+center+exclusive&tag=viajapp-21", emoji: "⚡" },

  // Fashion
  { name: "Calcetines Tabi", description: "Calcetines tradicionales japoneses para zapatillas.", price: "~¥800", category: "fashion", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=tabi+socks+japan&tag=viajapp-21", emoji: "🧦" },
  { name: "Banda de Cabello Japonesa", description: "Accesorios para el cabello estilo japones.", price: "~¥1,500", category: "fashion", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japanese+hair+accessories&tag=viajapp-21", emoji: "🎀" },
  { name: "Zapatillas Uniqlo", description: "Moda japonesa accesible. Envios a Japon.", price: "~¥3,000", category: "fashion", store: "Uniqlo JP", url: "https://www.uniqlo.com/jp/ja/", emoji: "👟" },

  // Home
  { name: "Cuchillo Santoku Japones", description: "Cuchillo de chef japonés tradicional.", price: "~¥8,000", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=santoku+kitchen+knife&tag=viajapp-21", emoji: "🔪" },
  { name: "Tetera Kyusu", description: "Tetera japonesa de barro para te verde.", price: "~¥4,000", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kyusu+teapot&tag=viajapp-21", emoji: "🫖" },
  { name: "Set de Banos Onsen", description: "Sales de baño japonesas para recrear el onsen en casa.", price: "~¥1,500", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=onsen+bath+salts&tag=viajapp-21", emoji: "🛁" },

  // Traditional
  { name: "Tinta Sumi para Caligrafia", description: "Tinta tradicional para shodo (caligrafia japonesa).", price: "~¥2,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sumi+ink+calligraphy&tag=viajapp-21", emoji: "✒️" },
  { name: "Abanico Sensu", description: "Abanico plegable tradicional japonés.", price: "~¥1,500", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sensu+folding+fan&tag=viajapp-21", emoji: "🪭" },
  { name: "Sello Hanko Personalizado", description: "Sello personalizado en japones. Recuerdo unico.", price: "~¥3,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=hanko+stamp+personalized&tag=viajapp-21", emoji: "🔴" },
];

export default function ForgotToBuyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const storeCount = new Set(filtered.map((p) => p.store)).size;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">🛍️ Olvide Comprar</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Productos japoneses que no consigues fuera de Japon. Compra online en tiendas japonesas y recibelos en tu pais.
        </p>
        <Link href="/shopping" className="inline-block mt-4 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
          📋 Crea tu Lista de Compras
        </Link>
        <p className="text-sm text-gray-400 mt-2">
          {filtered.length} productos en {storeCount} tiendas
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, i) => (
          <a
            key={i}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-red-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-red-600">{product.price}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{product.store}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Consejos para Comprar Online desde Japon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-2"> Amazon JP</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acepta tarjetas internacionales</li>
              <li>• Envio internacional disponible</li>
              <li>• Filtros por idioma y Region</li>
              <li>• Precios mas bajos que fuera de Japon</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">🔍 Que Buscar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Productos exclusivos de Japon</li>
              <li>• Ediciones limitadas regionales</li>
              <li>• Snacks y bebidas japonesas</li>
              <li>• Arte y artesanias tradicionales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Precios orientativos en yenes. Los precios reales pueden variar. Algunos envios pueden tardar 2-4 semanas.
        </p>
      </div>
    </div>
  );
}
