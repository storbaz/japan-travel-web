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
  { id: "all", label: "Todos", emoji: "🧳" },
  { id: "rest", label: "Descanso", emoji: "😴" },
  { id: "comfort", label: "Comodidad", emoji: "🪑" },
  { id: "hygiene", label: "Higiene", emoji: "🧴" },
  { id: "tech", label: "Electrónica", emoji: "🔋" },
  { id: "entertainment", label: "Entretenimiento", emoji: "🎬" },
];

const products: Product[] = [
  { name: "Almohadilla cervical de viaje", description: "Cómoda, con memoria y sin ocupar espacio en la mochila. Imprescindible para dormir en el asiento.", price: "~15-40€", category: "rest", url: amazonUrl("almohadilla cervical avion"), emoji: "🛌" },
  { name: "Antifaz para dormir", description: "Bloquea la luz de la cabina. Mejor si es de seda o con relleno suave y ajustable.", price: "~5-20€", category: "rest", url: amazonUrl("antifaz dormir avion"), emoji: "😴" },
  { name: "Auriculares con cancelación de ruido", description: "El motor y los llantos de la cabina desaparecen. La mejor inversión para vuelos largos.", price: "~40-300€", category: "rest", url: amazonUrl("auriculares cancelacion ruido"), emoji: "🎧" },
  { name: "Tapones de oído", description: "Plan B barato para dormir sin que el ruido te despierte.", price: "~3-10€", category: "rest", url: amazonUrl("tapones oidos dormir"), emoji: "👂" },
  { name: "Manta de viaje plegable", description: "La manta de la aerolínea no siempre alcanza. Una manta fina o pareo hace mucho.", price: "~10-30€", category: "rest", url: amazonUrl("manta viaje avion plegable"), emoji: "🧣" },
  { name: "Calcetines de compresión", description: "Previenen pies y tobillos hinchados en vuelos de más de 8 horas. Te levantarás mejor.", price: "~8-25€", category: "comfort", url: amazonUrl("calcetines compresion vuelo"), emoji: "🧦" },
  { name: "Cojín lumbar de viaje", description: "La lumbar de la silla hace daño tras horas. Un cojín lumbar hinchable salva la espalda.", price: "~10-30€", category: "comfort", url: amazonUrl("cojin lumbar viaje"), emoji: "🪑" },
  { name: "Zapatillas plegables", description: "Cámbiate las botas al despegar. Los pies lo agradecen y ocupan poco en la bolsa.", price: "~15-35€", category: "comfort", url: amazonUrl("zapatillas plegables viaje"), emoji: "👟" },
  { name: "Pantalones de viaje elásticos", description: "Tejido cómodo y sin costuras que aprieten. No querrás otra cosa en 13 horas.", price: "~15-40€", category: "comfort", url: amazonUrl("pantalones viaje comodos"), emoji: "👖" },
  { name: "Neceser de viaje tamaño avión", description: "Líquidos en formato mini para llevar en el equipaje de mano sin problemas.", price: "~10-25€", category: "hygiene", url: amazonUrl("neceser viaje tamaño avion"), emoji: "🧴" },
  { name: "Bálsamo labial hidratante", description: "La cabina reseca muchísimo. Bálsamo y crema de manos van en la bolsa de asiento.", price: "~2-8€", category: "hygiene", url: amazonUrl("balsamo labial hidratante"), emoji: "💋" },
  { name: "Crema hidratante en spray", description: "Recupera la piel al instante sin ensuciar las manos.", price: "~8-20€", category: "hygiene", url: amazonUrl("crema hidratante rostro spray"), emoji: "🧖" },
  { name: "Kit de cepillo y pasta de dientes", description: "Refrescar la boca a mitad de vuelo cambia la sensación por completo.", price: "~3-10€", category: "hygiene", url: amazonUrl("cepillo dientes viaje mini"), emoji: "🪥" },
  { name: "Power bank de 10000mAh", description: "Para el móvil, el libro y las fotos. Cárgalo antes del vuelo y llegará con batería.", price: "~15-35€", category: "tech", url: amazonUrl("power bank 10000mah"), emoji: "🔋" },
  { name: "Adaptador universal", description: "En Japón el enchufe es de dos patas planas (tipo A). Lo necesitarás para cargar todo.", price: "~10-25€", category: "tech", url: amazonUrl("adaptador universal enchufe japon"), emoji: "🔌" },
  { name: "Cable USB-C corto", description: "Un cable corto con el power bank cabe mejor en la bandeja y no estorba.", price: "~5-15€", category: "tech", url: amazonUrl("cable usb c corto"), emoji: "🔋" },
  { name: "Cargador de pared rápido", description: "Para el hotel y las cafeterías con enchufes escasos en Japón.", price: "~15-30€", category: "tech", url: amazonUrl("cargador pared rapido usb c"), emoji: "🔌" },
  { name: "E-reader", description: "Ocupa cero espacio y aguanta 30 horas. Mejor que cargar libros en papel.", price: "~80-150€", category: "entertainment", url: amazonUrl("e-reader kindle"), emoji: "📚" },
  { name: "Botella de agua plegable", description: "Llénala tras pasar el control y mantente hidratado sin comprar agua a cada rato.", price: "~8-20€", category: "entertainment", url: amazonUrl("botella agua plegable viaje"), emoji: "🥤" },
  { name: "Snacks saludables", description: "Frutos secos y barritas para las 2-3 horas entre comidas del avión.", price: "~5-15€", category: "entertainment", url: amazonUrl("snacks frutos secos viaje"), emoji: "🍫" },
];

const tips = [
  { icon: "💧", title: "Hidrátate a conciencia", text: "Bebe un vaso de agua cada hora. El aire de la cabina está muy seco y deshidrata sin que lo notes." },
  { icon: "🚶", title: "Levántate cada 1-2 horas", text: "Pasea por el pasillo y mueve tobillos y piernas para evitar piernas cansadas y mala circulación." },
  { icon: "👕", title: "Ropa por capas", text: "La temperatura cambia entre el embarque, el crucero y la noche. Capas finas que puedas quitar y poner." },
  { icon: "🌙", title: "Duerme con estrategia", text: "Almohadilla cervical + antifaz + tapones y apaga la pantalla. El sueño en el avión se consigue, pero hay que prepararlo." },
  { icon: "🕐", title: "Combate el jet lag", text: "Ajusta el reloj al horario japonés nada más sentarte y duerme según la hora de Japón, no la de casa." },
  { icon: "🎒", title: "Equipaje de mano listo", text: "Todo lo esencial: cargador, medicinas, bálsamo y muda de ropa, accesible en el bolsillo del asiento." },
];

export default function VueloComodoPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">✈️ Vuelos Largos a Japón</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Japón está a 13-14 horas de vuelo desde España. Así sobrevives al viaje en avión
          llegando descansado, cómodo y sin dolores: consejos prácticos y los productos que valen la pena.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/flights" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
            ✈️ Comparar Vuelos
          </Link>
          <Link href="/blog/volar-a-japon-vuelos-largos" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
            📝 Guía completa en el blog
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-8 border border-indigo-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Cómo estar cómodo en un vuelo de 13 horas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{tip.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">🛍️ Productos recomendados</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprados antes del vuelo, llegan a casa y caben en tu equipaje de mano.
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
