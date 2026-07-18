import Link from "next/link";
import { blogPosts } from "@/lib/blog";

interface SectionCard {
  title: string;
  emoji: string;
  description: string;
  href: string;
  color: string;
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
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Tu Guia de Viaje a <span className="text-red-600">Japon</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas saber para tu viaje: frases, presupuesto, eventos, comida, transporte, clima y mas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-red-200"
          >
            <div className={`w-14 h-14 ${section.color} rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {section.emoji}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
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
            <div className="text-3xl font-bold text-red-600">¥157</div>
            <div className="text-sm text-gray-600">1 Euro aprox.</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">0%</div>
            <div className="text-sm text-gray-600">Propinas</div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-2">🏨</div>
          <div className="font-bold text-gray-900">Hoteles en Japon</div>
          <div className="text-sm text-gray-600 mt-1">Los mejores precios en Booking.com</div>
          <div className="text-xs text-blue-600 mt-2">Ver ofertas ↗</div>
        </a>
        <a href="https://www.japan-guide.com/e/e2361.html" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-2">🚄</div>
          <div className="font-bold text-gray-900">JR Pass</div>
          <div className="text-sm text-gray-600 mt-1">Pasaferrocarril ilimitado por todo Japon</div>
          <div className="text-xs text-blue-600 mt-2">Comprar ↗</div>
        </a>
        <a href="https://www.getyourguide.com/japan-l51/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all text-center">
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
          {blogPosts.slice(0, 3).map((post) => (
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
