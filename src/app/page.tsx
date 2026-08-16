"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { API_URL } from "@/lib/api";
import SeoContent from "@/components/SeoContent";

interface SectionCard {
  title: string;
  emoji: string;
  description: string;
  href: string;
  color: string;
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
}

const sections: SectionCard[] = [
  { title: "Buscar Lugares", emoji: "🔍", description: "Encuentra restaurantes, hoteles y lugares reales en Google Maps", href: "/search", color: "bg-indigo-500" },
  { title: "Traductor", emoji: "🌐", description: "Frases japonesas con audio para cada situacion", href: "/translator", color: "bg-rose-500" },
  { title: "Frases Utiles", emoji: "🗣️", description: "Aprende japones basico con audio y pantalla para mostrar", href: "/phrases", color: "bg-blue-500" },
  { title: "Mapa de Japon", emoji: "🗺️", description: "Explora lugares populares con mapa interactivo", href: "/map", color: "bg-emerald-500" },
  { title: "Restaurantes", emoji: "🍽️", description: "Los mejores restaurantes por ciudad y tipo de comida", href: "/restaurants", color: "bg-orange-600" },
  { title: "Tips de Ahorro", emoji: "💡", description: "Consejos para ahorrar miles de yen en tu viaje", href: "/tips", color: "bg-green-600" },
  { title: "Presupuesto", emoji: "💰", description: "Costes por ciudad, calculadora de gastos y tiendas tax-free", href: "/budget", color: "bg-green-500" },
  { title: "Eventos y Festivales", emoji: "⛩️", description: "Calendario de festivales, temporadas y eventos por ciudad", href: "/events", color: "bg-purple-500" },
  { title: "Comida", emoji: "🍜", description: "Guia gastronomica, konbini, opciones vegan y mas", href: "/food", color: "bg-orange-500" },
  { title: "Transporte", emoji: "🚄", description: "JR Pass, aeropuertos, conexiones y alquiler de coches", href: "/transport", color: "bg-cyan-500" },
  { title: "Clima", emoji: "🌤️", description: "Pronostico del tiempo por ciudad para planificar tu viaje", href: "/weather", color: "bg-sky-500" },
  { title: "Convertidor", emoji: "💱", description: "Convierte yen a tu moneda al instante", href: "/currency", color: "bg-teal-500" },
  { title: "Emergencias", emoji: "🏥", description: "Numeros de emergencia, hospitales y embajadas", href: "/emergency", color: "bg-red-500" },
  { title: "Info de Visa", emoji: "🛂", description: "Requisitos de entrada por pais de origen", href: "/visa", color: "bg-indigo-500" },
  { title: "Lista de Equipaje", emoji: "🎒", description: "Personalizada segun temporada y duracion del viaje", href: "/packing", color: "bg-yellow-500" },
];

export default function Home() {
  const { rate } = useExchangeRate();
  const jpyPerEur = Math.round(1 / rate);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/v1/blog/posts`)
      .then((res) => res.ok ? res.json() : { posts: [] })
      .then((data) => setBlogPosts((data.posts || []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10 lg:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          La app para organizar tu viaje a <span className="text-red-600">Japon</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
          Planifica, presupuesta y disfruta. Todo lo que necesitas en un solo lugar: frases, mapa, eventos, comida, transporte y mas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {sections.map((section, idx) => (
          <Link
            key={section.href}
            href={section.href}
            className={`group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 lg:p-6 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-400 active:scale-[0.98] card-enter card-delay-${Math.min(idx, 6)}`}
          >
            <div className={`w-12 h-12 lg:w-14 lg:h-14 ${section.color} rounded-lg flex items-center justify-center text-2xl lg:text-3xl mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}>
              {section.emoji}
            </div>
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 lg:mb-2">{section.title}</h2>
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">{section.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Datos Rapidos de Japon</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">42M+</div>
            <div className="text-sm text-gray-600">Visitantes en 2025</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">47</div>
            <div className="text-sm text-gray-600">Prefecturas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">¥{jpyPerEur}</div>
            <div className="text-sm text-gray-600">1 Euro aprox.</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">0%</div>
            <div className="text-sm text-gray-600">Propinas</div>
          </div>
        </div>
      </div>

      <SeoContent
        title="Guía rápida para tu primer viaje a Japón"
        paragraphs={[
          "Japón es uno de los destinos que más sorprende al viajero: un país donde el caos de Tokio convive con los templos silenciosos de Kioto, donde los trenes llegan siempre a tiempo y donde se come de pie en un callejón por menos de 6 euros. Pero también es un destino con reglas propias: no hay papeleras en la calle, el efectivo sigue siendo rey en muchos sitios y el inglés se habla menos de lo que esperarías. Con esta guía y las herramientas de ViajApp tendrás todo bajo control desde el primer día.",
          "Lo primero es elegir la época. La primavera (finales de marzo a mediados de abril) es la más buscada por los cerezos en flor, y el otoño (octubre y noviembre) por los colores de los arces. Ambos tienen las mejores temperaturas y también las mayores multitudes. Si buscas precios bajos, mayo, septiembre y las semanas previas a la Navidad ofrecen buen clima con menos turistas. El verano es caluroso y húmedo, con festivales como el Gion Matsuri, y el invierno es seco y frío, ideal para los onsen (baños termales).",
          "El transporte define el presupuesto. Dentro de Tokio, Kioto y Osaka basta con una tarjeta Suica o Pasmo recargable (unos 2 euros de fianza) que funciona en metro, autobús y tiendas de conveniencia. Si vas a moverte entre ciudades, el JR Pass sigue compensando en rutas largas como Tokio-Kioto-Osaka, y el shinkansen (tren bala) conecta las principales ciudades a 300 km/h. Usa el planificador de ViajApp para saber exactamente cuánto te costará cada trayecto.",
          "La comida es barata y espectacular. Un ramen cuesta entre 800 y 1.200 yenes (5-8 euros), un sushi de cinta entre 100 y 500 yenes por plato y un bento de supermercado sale por 500 yenes. En los konbini (7-Eleven, FamilyMart, Lawson) encuentras desayunos, snacks y cafés de calidad a precios mínimos. No dejes de probar el takoyaki en Osaka, el matcha de Kioto y el wagyu de Kobe, y recuerda: en Japón no se da propina.",
          "El efectivo sigue mandando en los pueblos y en muchos restaurantes familiares, así que lleva siempre algo de dinero en yenes. Puedes sacarlo en los cajeros de 7-Eleven y Japan Post con tarjeta extranjera, y pagar con Visa o Mastercard en tiendas grandes. Con el convertidor de ViajApp sabrás cuánto te cuesta cada compra en tu moneda.",
        ]}
        faqs={[
          { q: "¿Cuánto cuesta un viaje de una semana a Japón?", a: "Un viaje de 7 días cuesta desde 1.200 € por persona en modo económico (hostal, comida de konbini y transporte con Suica). Con hoteles business, restaurantes y el JR Pass, presupuesta entre 1.800 y 2.500 €. El vuelo desde España ida y vuelta ronda los 600-900 € si lo reservas con antelación." },
          { q: "¿Necesito visado para viajar a Japón siendo español?", a: "No. Los ciudadanos españoles entran en Japón sin visado para estancias de hasta 90 días con el pasaporte con al menos 6 meses de validez. Consulta la página de visado de ViajApp para los requisitos de otros países." },
          { q: "¿Cuántos días necesito para ver Japón?", a: "Con 10-14 días puedes hacer la ruta clásica Tokio-Kioto-Osaka con escapadas a Nara, Miyajima o Nikko. Con 7 días aprietas el itinerario a dos ciudades. Japón recompensa el ritmo pausado, así que no intentes cubrir demasiado." },
          { q: "¿Se necesita hablar japonés para viajar?", a: "No, pero conviene saber algunas frases básicas. En las grandes ciudades el inglés funciona en estaciones y hoteles, pero fuera de ellas se agradece saber decir 'sumimasen' (disculpe), 'arigatou' (gracias) y 'kore kudasai' (esto, por favor). El traductor de ViajApp te ayuda con frases y audio." },
        ]}
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.booking.com/searchresults.html?ss=Japan&aid=3049503" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-2">🏨</div>
          <div className="font-bold text-gray-900">Hoteles en Japon</div>
          <div className="text-sm text-gray-600 mt-1">Los mejores precios en Booking.com</div>
          <div className="text-xs text-blue-600 mt-2">Ver ofertas ↗</div>
        </a>
        <a href="https://www.japan-bullettrain.com/?via=antonio-perez-cortes" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-2">🚄</div>
          <div className="font-bold text-gray-900">JR Pass / Shinkansen</div>
          <div className="text-sm text-gray-600 mt-1">Billetes de tren bala al mejor precio</div>
          <div className="text-xs text-blue-600 mt-2">Comprar ↗</div>
        </a>
        <a href="https://www.getyourguide.com/?partner_id=NRWCY1R" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-bold text-gray-900">Actividades</div>
          <div className="text-sm text-gray-600 mt-1">Tours y experiencias en Japon</div>
          <div className="text-xs text-blue-600 mt-2">Explorar ↗</div>
        </a>
      </div>

      <div className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900"> Articulos recientes</h2>
          <Link href="/blog" className="text-red-600 hover:text-red-700 text-sm font-medium">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-700">{post.category}</span>
              <h3 className="font-bold text-gray-900 mt-3 mb-2 hover:text-red-600 transition">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description.slice(0, 80)}...</p>
              <div className="text-xs text-gray-400 mt-2">{post.readTime} de lectura</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
