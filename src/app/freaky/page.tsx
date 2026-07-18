"use client";

import { useState } from "react";
import Link from "next/link";

interface FreakyItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  affiliateLinks: {
    name: string;
    url: string;
  }[];
  image?: string;
}

const categories = [
  { id: "all", name: "Todos", icon: "🗾" },
  { id: "vending", name: "Vending Machines", icon: "🏧" },
  { id: "maid-cafe", name: "Maid Cafés", icon: "☕" },
  { id: "themed-cafe", name: "Themed Cafés", icon: "🐱" },
  { id: "akihabara", name: "Akihabara & Otaku", icon: "🎮" },
  { id: "capsule", name: "Capsule Hotels", icon: "🏨" },
  { id: "kawaii", name: "Kawaii Culture", icon: "🌸" },
  { id: "arcades", name: "Arcades & Pachinko", icon: "🎰" },
  { id: "fashion", name: "Harajuku Fashion", icon: "👗" },
  { id: "temples", name: "Templos Raros", icon: "⛩️" },
  { id: "food", name: "Comida Freaky", icon: "🍣" },
];

const freakyItems: FreakyItem[] = [
  {
    id: "vending-insects",
    title: "Vending Machine de Insectos",
    description: "En Tokio puedes comprar grillos fritos, escarabajos y más. Una experiencia que solo existe en Japón.",
    category: "vending",
    location: "Akihabara, Tokio",
    price: "500-1,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=edible+insects&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+edible+insects" },
    ],
  },
  {
    id: "vending-underwear",
    title: "Vending Machine de Ropa Interior",
    description: "Sí, existe. En Akihabara hay máquinas con ropa interior usada y nueva. Un fenómeno cultural único.",
    category: "vending",
    location: "Akihabara, Tokio",
    price: "1,000-5,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=akihabara&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-hot",
    title: "Vending Machine de Comida Caliente",
    description: "Máquinas que sirven ramen, takoyaki, gyoza y hasta curry caliente. Perfecto para late night.",
    category: "vending",
    location: "Toda Japón",
    price: "300-800 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=hot+food+vending+machine&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-live-crabs",
    title: "Vending Machine de Cangrejos Vivos",
    description: "En el aeropuerto de Narita puedes comprar cangrejos vivos para llevar. Solo en Japón.",
    category: "vending",
    location: "Aeropuerto de Narita",
    price: "3,000-5,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=live+crab+vending&tag=viajapp-21" },
    ],
  },
  {
    id: "maid-cafe-akiba",
    title: "Maid Café Original de Akihabara",
    description: "Las chicas vestidas de maid te sirven café con dibujos kawaii. La experiencia más representativa del otaku culture.",
    category: "maid-cafe",
    location: "Akihabara, Tokio",
    price: "1,500-3,000 yenes (entrada + 1 bebida)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=maid+cafe+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=maid+cafe+tokyo" },
    ],
  },
  {
    id: "maid-cafe-themes",
    title: "Maid Cafés Temáticos",
    description: "Hay maid cafés de gatos, robots, ninjas, vampires y hasta de señoras mayores. Cada uno es una experiencia única.",
    category: "maid-cafe",
    location: "Akihabara, Ikebukuro",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=themed+cafe+tokyo" },
    ],
  },
  {
    id: "cat-cafe",
    title: "Cat Café (Neko Café)",
    description: "Japón inventó los cat cafés. Puedes jugar con gatos mientras tomas café. Hay de todas las razas.",
    category: "themed-cafe",
    location: "Toda Japón",
    price: "1,000-2,000 yenes/hora",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=cat+cafe+japan" },
      { name: "Klook", url: "https://www.klook.com/search/?q=cat+cafe+japan" },
    ],
  },
  {
    id: "owl-cafe",
    title: "Owl Café (Lechuzas)",
    description: "Puedes interactuar con lechuzas reales mientras tomas té. Una experiencia relajante y única.",
    category: "themed-cafe",
    location: "Harajuku, Tokio",
    price: "1,500-2,500 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=owl+cafe+tokyo" },
    ],
  },
  {
    id: "pokemon-cafe",
    title: "Pokémon Café",
    description: "El café oficial de Pokémon en Tokio. Comida temática, figuras y experiencias interactivas.",
    category: "themed-cafe",
    location: "Tokyo DX, Tokio",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=pokemon+cafe+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=pokemon+cafe+tokyo" },
    ],
  },
  {
    id: "robot-restaurant",
    title: "Robot Restaurant (Shinjuku)",
    description: "Show de robots gigantes, luces neon y caos total. La experiencia más freaky de Tokio. (Cerrado temporalmente, verificar apertura)",
    category: "themed-cafe",
    location: "Kabukicho, Shinjuku",
    price: "8,000-10,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=robot+restaurant+tokyo" },
    ],
  },
  {
    id: "akihabara-figure-shops",
    title: "Tiendas de Figures en Akihabara",
    description: "Miles de figuras de anime, manga y videojuegos. Desde 500 yenes hasta colecciones de 100,000+ yenes.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "500-100,000+ yenes",
    affiliateLinks: [
      { name: "AmiAmi", url: "https://www.amiami.com/eng/" },
      { name: "CDJapan", url: "https://www.cdjapan.co.jp/" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anime+figure&tag=viajapp-21" },
    ],
  },
  {
    id: "akihabara-retro-games",
    title: "Tiendas de Videojuegos Retro",
    description: "Super Potato, Game Star y más. Consolas retro, cartuchos y recuerdos de los 80-90s.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "500-50,000 yenes",
    affiliateLinks: [
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+retro+games" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=retro+game+console&tag=viajapp-21" },
    ],
  },
  {
    id: "capsule-nine-hours",
    title: "Capsule Hotel Nine Hours",
    description: "El capsule hotel más minimalista y moderno. Diseño futurista, limpio y funcional.",
    category: "capsule",
    location: "Múltiples ubicaciones",
    price: "4,000-6,000 yenes/noche",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=nine+hours+tokyo" },
      { name: "Agoda", url: "https://www.agoda.com/search?city=14562" },
    ],
  },
  {
    id: "capsule-first-cabin",
    title: "First Cabin (Primera Clase)",
    description: "Capsule hotel de lujo. Cabinas tipo primera clase de avión. Sofá, TV y espacio de sobra.",
    category: "capsule",
    location: "Tokio, Osaka",
    price: "6,000-10,000 yenes/noche",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=first+cabin+japan" },
    ],
  },
  {
    id: "kawaii-harajuku",
    title: "Kawaii Culture en Harajuku",
    description: "Takeshita Street es el epicentro de la moda kawaii. Colores pastel, accesorios cute y dulces.",
    category: "kawaii",
    location: "Harajuku, Tokio",
    price: "Variable",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kawaii+accessories&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+kawaii+accessories" },
    ],
  },
  {
    id: "arcade-sega",
    title: "Arcades SEGA & Taito",
    description: "Máquinas de arcade, crane games (UFO catchers) y photo booths (purikura). Diversión por horas.",
    category: "arcades",
    location: "Akihabara, Shinjuku",
    price: "100-500 yenes/juego",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=arcade+tokyo" },
    ],
  },
  {
    id: "pachinko",
    title: "Pachinko (Juego de Bolas)",
    description: "El juego de azar más popular de Japón. Máquinas ruidosas, luces cegadoras y premios extraños.",
    category: "arcades",
    location: "Toda Japón",
    price: "100 yenes por juego",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=pachinko+japan" },
    ],
  },
  {
    id: "harajuku-fashion",
    title: "Fashion Underground de Harajuku",
    description: "La moda más extravagante del mundo. Decora, Lolita, Visual Kei, Gyaru y más estilos únicos.",
    category: "fashion",
    location: "Harajuku, Tokio",
    price: "Variable",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=harajuku+fashion&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+harajuku+fashion" },
    ],
  },
  {
    id: "fertility-shrine",
    title: "Santuario de la Fertilidad (Kanamara)",
    description: "El festival más... peculiar de Japón. Carrozas con forma fáfica y tradiciones únicas.",
    category: "temples",
    location: "Kawasaki (cerca de Tokio)",
    price: "Entrada gratuita",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=kanamara+shrine" },
    ],
  },
  {
    id: "fugu",
    title: "Fugu (Pez Globo Venenoso)",
    description: "Un plato que puede matarte si no se prepara bien. Solo chefs licenciados pueden servirlo.",
    category: "food",
    location: "Osaka, Tokio",
    price: "5,000-20,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=fugu+restaurant+japan" },
      { name: "Klook", url: "https://www.klook.com/search/?q=fugu+experience" },
    ],
  },
  {
    id: "konbini-weird",
    title: "Snacks Raros de Konbini",
    description: "KitKat de 50 sabores, edamame ice cream, oreo de wasabi y más combinaciones imposibles.",
    category: "food",
    location: "7-Eleven, Lawson, FamilyMart",
    price: "100-500 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japan+snacks+variety&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+snacks+box" },
    ],
  },
];

export default function FreakyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = selectedCategory === "all"
    ? freakyItems
    : freakyItems.filter((item) => item.category === selectedCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Japón Freaky 🇯🇵
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Lo más raro, único y fascinante de Japón. Vending machines de insectos, maid cafés,
          templos de la fertilidad y más.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setShowAll(false);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {categories.find((c) => c.id === item.category)?.icon}{" "}
                  {categories.find((c) => c.id === item.category)?.name}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>📍 {item.location}</span>
                <span>💰 {item.price}</span>
              </div>

              {/* Affiliate Links */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-2">Dónde comprar/experiencia:</p>
                <div className="flex flex-wrap gap-2">
                  {item.affiliateLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      {link.name} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length > 6 && !showAll && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
          >
            Ver más ({filteredItems.length - 6} restantes)
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Quieres vivir estas experiencias?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          ViajApp tiene guías completas para cada una de estas experiencias freaky.
          Descarga la app y no te pierdas nada.
        </p>
        <a
          href="https://japan-travel-web-lime.vercel.app"
          target="_blank"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
        >
          Abrir ViajApp
        </a>
      </div>
    </div>
  );
}
