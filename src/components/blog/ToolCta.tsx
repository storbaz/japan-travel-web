import Link from "next/link";

export interface ToolInfo {
  href: string;
  title: string;
  description: string;
  kanji: string;
  label: string;
}

export const TOOLS: Record<string, ToolInfo> = {
  presupuesto: {
    href: "/budget",
    title: "Calcula tu presupuesto para Japón",
    description: "Introduce tus días, estilo de viaje y gastos previstos. Obtén cuánto dinero necesitas y cómo repartirlo.",
    kanji: "金",
    label: "Presupuesto",
  },
  itinerario: {
    href: "/trip-planner",
    title: "Planifica tu itinerario por Japón",
    description: "Arma tu ruta día a día: ciudades, transporte, tiempos de viaje y actividades. Organizado en minutos.",
    kanji: "旅",
    label: "Itinerario",
  },
  jrpass: {
    href: "/jr-pass",
    title: "¿Te sale a cuenta el JR Pass?",
    description: "Compara el coste de tu ruta con y sin Japan Rail Pass. Sabrás si debes comprarlo en 30 segundos.",
    kanji: "速",
    label: "JR Pass",
  },
  transporte: {
    href: "/transport",
    title: "Cómo moverte por Japón",
    description: "Shinkansen, metro, autobuses y tarjetas IC explicados paso a paso, con tiempos y precios reales.",
    kanji: "道",
    label: "Transporte",
  },
  comida: {
    href: "/food",
    title: "Dónde comer y qué probar",
    description: "Platos imprescindibles, precios orientativos y recomendaciones de restaurantes en cada ciudad.",
    kanji: "食",
    label: "Comida",
  },
  frases: {
    href: "/phrases",
    title: "Frases útiles en japonés",
    description: "Saludos, restaurantes, transporte y emergencias. Aprende lo esencial con audio y pronunciación.",
    kanji: "語",
    label: "Frases",
  },
  meteorologo: {
    href: "/meteorologo",
    title: "Meteorólogo para tu viaje",
    description: "Tiempo real en las ciudades de tu ruta y recomendaciones de qué llevar cada día.",
    kanji: "空",
    label: "Meteorólogo",
  },
  alojamiento: {
    href: "/alojamiento",
    title: "Dónde dormir en Japón",
    description: "Barrios recomendados, precios por tipo de alojamiento y consejos para cada ciudad.",
    kanji: "宿",
    label: "Alojamiento",
  },
  distancia: {
    href: "/distancia",
    title: "Distancias y tiempos de viaje",
    description: "Calcula cuánto se tarda entre ciudades y estaciones. Perfecto para planificar tu ruta.",
    kanji: "程",
    label: "Distancias",
  },
  equipaje: {
    href: "/equipaje",
    title: "Lista de equipaje para Japón",
    description: "Qué meter en la maleta según estación y ciudad, con trucos para viajar ligero.",
    kanji: "袋",
    label: "Equipaje",
  },
  restaurantes: {
    href: "/restaurants",
    title: "Recomendaciones de restaurantes",
    description: "Restaurantes con buenas reseñas por ciudad, tipo de cocina y presupuesto.",
    kanji: "皿",
    label: "Restaurantes",
  },
  eventos: {
    href: "/events",
    title: "Eventos y festivales cerca de ti",
    description: "Matsuri, fuegos artificiales y celebraciones que no te puedes perder según tu fecha de viaje.",
    kanji: "祭",
    label: "Eventos",
  },
};

export default function ToolCta({ tool, className = "" }: { tool: string; className?: string }) {
  const info = TOOLS[tool];
  if (!info) return null;

  return (
    <div className={`my-6 rounded-xl border border-[#b5332e]/30 bg-gradient-to-br from-[#b5332e]/5 to-[#c9a227]/10 p-4 sm:p-5 ${className}`}>
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="hidden sm:flex w-11 h-11 shrink-0 rounded-lg bg-[#b5332e] text-[#f8f2e4] items-center justify-center text-xl font-serif font-bold shadow-sm rotate-3 ring-2 ring-[#b5332e]/20"
        >
          {info.kanji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-serif tracking-widest text-[#b5332e] border border-[#b5332e]/40 rounded px-1.5 py-0.5">
              HERRAMIENTA VIAJAPP
            </span>
            <span className="text-[10px] font-serif tracking-wider text-[#b5332e]/70">{info.label}</span>
          </div>
          <h3 className="font-serif font-bold text-gray-900 dark:text-gray-100 mt-2 text-lg leading-snug">
            {info.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{info.description}</p>
          <Link
            href={info.href}
            className="inline-flex items-center gap-2 mt-3 rounded-lg bg-[#b5332e] px-4 py-2 text-sm font-medium text-[#f8f2e4] shadow-sm transition-all hover:bg-[#9c2824] hover:shadow-md"
          >
            Probar ahora
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
