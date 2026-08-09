"use client";

import { useState } from "react";
import Link from "next/link";

const AMAZON_ES_TAG = "viajapp-21";

const amazonUrl = (query: string) =>
  `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${AMAZON_ES_TAG}`;

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  url: string;
  emoji: string;
}

const categories = [
  { id: "all", label: "Todos", emoji: "🛒" },
  { id: "luggage", label: "Equipaje", emoji: "🧳" },
  { id: "tech", label: "Electrónica", emoji: "🔌" },
  { id: "rest", label: "Descanso", emoji: "😴" },
  { id: "hygiene", label: "Higiene", emoji: "🧴" },
  { id: "organization", label: "Organización", emoji: "🗂️" },
  { id: "safety", label: "Seguridad", emoji: "🛡️" },
];

const products: Product[] = [
  { name: "Mochila de viaje 40L", description: "Ideal como equipaje de mano en vuelos a Japón. La cabina la acepta sin problema y te mueves más libre.", price: "~40-100€", category: "luggage", url: amazonUrl("mochila viaje 40 litros"), emoji: "🎒" },
  { name: "Maleta rígida ligera", description: "Si llevas compras, una maleta cabina con ruedas es lo mejor. Que pese poco.", price: "~40-120€", category: "luggage", url: amazonUrl("maleta rigida cabina ligera"), emoji: "🧳" },
  { name: "Juego de bolsas de compresión", description: "Vacuum bags que multiplican el espacio de la maleta. Vuelves con el doble de compras.", price: "~10-25€", category: "luggage", url: amazonUrl("bolsas compresion viaje ropa"), emoji: "🎁" },
  { name: "Cubo organizador de equipaje", description: "Separar ropa por días o categorías. Encontrarlo todo en segundos.", price: "~10-25€", category: "luggage", url: amazonUrl("cubos organizadores equipaje"), emoji: "🗂️" },
  { name: "Báscula de equipaje digital", description: "Pesa la maleta en casa y evita sustos de sobrepeso en el aeropuerto.", price: "~5-15€", category: "luggage", url: amazonUrl("bascula equipaje maleta digital"), emoji: "⚖️" },
  { name: "Etiqueta con localizador de equipaje", description: "Apple AirTag o similar para saber dónde está tu maleta en cada escala.", price: "~25-40€", category: "luggage", url: amazonUrl("airtag etiqueta equipaje"), emoji: "📍" },
  { name: "Power bank de 20000mAh", description: "Días enteros de fotos, maps y traducción sin quedarte sin batería.", price: "~20-45€", category: "tech", url: amazonUrl("power bank 20000mah"), emoji: "🔋" },
  { name: "Adaptador universal", description: "Japón usa enchufe de dos patas planas (tipo A). Con USB para cargar varios a la vez.", price: "~10-25€", category: "tech", url: amazonUrl("adaptador universal enchufe japon usb"), emoji: "🔌" },
  { name: "Cargador de pared multi USB", description: "Los enchufes escasean en cafeterías y hoteles. Uno con 3-4 puertos te salva.", price: "~15-30€", category: "tech", url: amazonUrl("cargador pared multi usb"), emoji: "⚡" },
  { name: "eSIM con datos para Japón", description: "Actívala antes de volar y llega con internet. No necesitas cambiar la SIM física.", price: "~15-30€", category: "tech", url: amazonUrl("esim japon datos"), emoji: "📶" },
  { name: "Traductor de bolsillo", description: "Para frases y menús sin sacar el móvil. Algunos funcionan sin internet.", price: "~25-80€", category: "tech", url: amazonUrl("traductor de bolsillo"), emoji: "🗣️" },
  { name: "Almohadilla cervical de viaje", description: "Para dormir en el avión y en los shinkansen. Que sea cómoda y compacta.", price: "~15-40€", category: "rest", url: amazonUrl("almohadilla cervical avion"), emoji: "🛌" },
  { name: "Antifaz para dormir", description: "En el avión, en el hotel o en el onsen. Bloquea toda la luz.", price: "~5-20€", category: "rest", url: amazonUrl("antifaz dormir viaje"), emoji: "😴" },
  { name: "Tapones de oído", description: "Para el ruido del avión y el ambiente del hotel. Baratos y esenciales.", price: "~3-10€", category: "rest", url: amazonUrl("tapones oidos dormir"), emoji: "👂" },
  { name: "Calcetines de compresión", description: "Preven la hinchazón de piernas en vuelos largos y días de caminata.", price: "~8-25€", category: "rest", url: amazonUrl("calcetines compresion vuelo"), emoji: "🧦" },
  { name: "Neceser de viaje tamaño avión", description: "Líquidos en formato mini para el equipaje de mano.", price: "~10-25€", category: "hygiene", url: amazonUrl("neceser viaje tamaño avion"), emoji: "🧴" },
  { name: "Toalla de microfibra", description: "Se seca en un momento. Perfecta para playas, onsens y días de calor en verano.", price: "~10-25€", category: "hygiene", url: amazonUrl("toalla microfibra viaje"), emoji: "🛁" },
  { name: "Kit de higiene dental compacto", description: "Cepillo, pasta y enjuague en formato viaje para refrescarse a mitad de día.", price: "~3-10€", category: "hygiene", url: amazonUrl("kit higiene dental viaje"), emoji: "🪥" },
  { name: "Protector solar en formato mini", description: "En verano el sol japonés pica de verdad. Llévalo siempre contigo.", price: "~5-15€", category: "hygiene", url: amazonUrl("protector solar mini viaje"), emoji: "☀️" },
  { name: "Cartera con cierre de cremallera", description: "Para monedas, billetes y tarjetas. Japón sigue siendo un país muy de efectivo.", price: "~5-20€", category: "organization", url: amazonUrl("cartera monedas viaje japón"), emoji: "👛" },
  { name: "Organizador de pasaportes", description: "Pasaporte, billetes, tarjetas y dinero en un solo estuche.", price: "~8-20€", category: "organization", url: amazonUrl("organizador pasaporte viaje"), emoji: "🛂" },
  { name: "Funda para tarjetas con blíndaje NFC", description: "Protege tus tarjetas y Suica del contacto accidental con lectores.", price: "~5-15€", category: "organization", url: amazonUrl("funda tarjetas blíndaje nfc"), emoji: "💳" },
  { name: "Botella de agua reutilizable", description: "Llénala en la fuente y ahorra. En verano es imprescindible.", price: "~8-20€", category: "organization", url: amazonUrl("botella agua reutilizable viaje"), emoji: "🥤" },
  { name: "Mochila antirrobo", description: "Con cremalleras ocultas y tela cortada para viajar tranquilo por las ciudades grandes.", price: "~20-40€", category: "safety", url: amazonUrl("mochila antirrobo viaje"), emoji: "🛡️" },
  { name: "Candado de equipaje TSA", description: "Para la maleta en el hotel y en taquillas. El estándar de aeropuerto.", price: "~5-15€", category: "safety", url: amazonUrl("candado equipaje tsa"), emoji: "🔒" },
  { name: "Botiquín de viaje compacto", description: "Analgésicos, curitas, tiritas y pastillas para el estómago en formato mini.", price: "~10-20€", category: "safety", url: amazonUrl("botiquin viaje compacto"), emoji: "🩹" },
  { name: "Repelente de mosquitos", description: "En verano y otoño los mosquitos japoneses son molestos. Llévalo en crema o spray.", price: "~5-15€", category: "safety", url: amazonUrl("repelente mosquitos viaje"), emoji: "🦟" },
  { name: "Pitillera / cenicero de bolsillo", description: "Japón es muy estricto con fumar en la calle. Lleva tu propio cenicero portátil.", price: "~5-10€", category: "safety", url: amazonUrl("cenicero de bolsillo portatil"), emoji: "🚭" },
];

const blocks = [
  { icon: "💡", title: "Empieza por lo que usas todos los días", text: "Power bank, adaptador y organización. Son los que más notas y los que más valen la pena." },
  { icon: "🆓", title: "Regla 1: si no cabe en la maleta, no lo compres", text: "Piensa en el espacio del equipaje de mano. Mejor varios ligeros que uno que te obliga a facturar." },
  { icon: "🏷️", title: "Compra con tiempo", text: "Los precios de Amazon.es suben y bajan. Añade a tu lista y compra cuando baje, no la noche antes del vuelo." },
];

export default function TiendaViajeroPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🛍️ Tienda del Viajero</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas comprar antes de volar a Japón, ordenado por categorías.
          Enlaces directos a Amazon.es con los precios orientativos para que sepas cuánto presupuestar.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/vuelo-comodo" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
            ✈️ Cómo sobrevivir al vuelo
          </Link>
          <Link href="/jet-lag" className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-600 transition shadow-md">
            ⏰ Calculadora de jet lag
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-8 border border-indigo-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🧭 Cómo elegir bien</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <div key={block.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{block.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{block.title}</h3>
              <p className="text-sm text-gray-600">{block.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">📦 Productos para tu viaje</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {filtered.length} productos · Precios orientativos en Amazon.es
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
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-red-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-red-600">{product.price}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">Amazon.es →</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-500">
          Precios orientativos. Algunos enlaces son de afiliado: si compras a través de ellos, a ViajApp le
          llega una pequeña comisión sin que tú pagues más. Gracias por apoyar el proyecto.
        </p>
      </div>
    </div>
  );
}
