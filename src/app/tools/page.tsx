import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Herramientas Gratis para Viajar a Japon",
  description: "Calculadora de presupuesto, conversor de yen, simulador JR Pass, traductor y mas herramientas para tu viaje a Japon.",
  keywords: "herramientas japon, calculadora presupuesto, conversor yen, JR Pass simulador, traductor japones",
  openGraph: { title: "Herramientas para Viajar a Japon | ViajApp", description: "Todo lo que necesitas para planificar tu viaje" },
};

const tools = [
  { href: "/budget", emoji: "💰", title: "Calculadora de Presupuesto", description: "Calcula cuanto necesitas por dia segun tu estilo de viaje", color: "bg-green-500" },
  { href: "/currency", emoji: "💱", title: "Conversor de Moneda", description: "Convierte yen a tu moneda en tiempo real", color: "bg-teal-500" },
  { href: "/jr-pass", emoji: "🚄", title: "Simulador JR Pass", description: "Calcula si el JR Pass te conviene segun tu ruta", color: "bg-cyan-500" },
  { href: "/translator", emoji: "🌐", title: "Traductor con Camara", description: "Traduce menus y carteles con la camara de tu movil", color: "bg-rose-500" },
  { href: "/phrases", emoji: "🗣️", title: "Frases Utiles", description: "Las 30 frases esenciales en japones con audio", color: "bg-blue-500" },
  { href: "/packing", emoji: "🎒", title: "Lista de Equipaje", description: "Checklist personalizada segun temporada y duracion", color: "bg-yellow-500" },
  { href: "/weather", emoji: "🌤️", title: "Clima por Ciudad", description: "Pronostico del tiempo para planificar tu viaje", color: "bg-sky-500" },
  { href: "/trip-planner", emoji: "🗾", title: "Planificador de Viaje", description: "Genera un itinerario completo automaticamente", color: "bg-red-500" },
  { href: "/today", emoji: "📱", title: "Hoy en Japon", description: "Tu dia personalizado: eventos, frases y recomendaciones", color: "bg-purple-500" },
  { href: "/wallet", emoji: "💳", title: "Wallet Digital", description: "Guarda tickets, QR codes y pases de avion", color: "bg-indigo-500" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">🛠️ Herramientas para tu Viaje</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Todo lo que necesitas para planificar y disfrutar tu viaje a Japon. Herramientas 100% gratis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-red-200 transition-all">
            <div className={`w-14 h-14 ${tool.color} rounded-lg flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
              {tool.emoji}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition">{tool.title}</h2>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">¿Necesitas algo mas?</h2>
        <p className="text-gray-600 mb-4">Explora todas nuestras guias y herramientas para tu viaje a Japon.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/restaurants" className="bg-red-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-red-700 transition">🍽️ Restaurantes</Link>
          <Link href="/events" className="bg-white text-gray-900 px-5 py-2 rounded-lg font-medium border border-gray-200 hover:border-red-300 transition">⛩️ Eventos</Link>
          <Link href="/blog" className="bg-white text-gray-900 px-5 py-2 rounded-lg font-medium border border-gray-200 hover:border-red-300 transition">📝 Blog</Link>
        </div>
      </div>
    </div>
  );
}
