const AMAZON_ES_TAG = "viajapp-21";

const amazonUrl = (query: string) =>
  `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${AMAZON_ES_TAG}`;

interface RecProduct {
  name: string;
  desc: string;
  price: string;
  emoji: string;
  query: string;
}

interface CategoryProducts {
  [key: string]: RecProduct[];
}

const CATEGORY_PRODUCTS: CategoryProducts = {
  Comida: [
    { name: "Libro de cocina japonesa", desc: "Recetas de ramen, sushi y wagyu para preparar en casa.", price: "~15-25€", emoji: "🍜", query: "libro cocina japonesa" },
    { name: "Kit para hacer sushi", desc: "Alfombrilla, palillos y herramientas para sushi casero.", price: "~12-25€", emoji: "🍣", query: "kit sushi hacer en casa" },
    { name: "Palillos de aprendizaje", desc: "Conectados y fáciles de usar. Perfección antes del viaje.", price: "~5-10€", emoji: "🥢", query: "palillos aprender usar" },
  ],
  Vuelos: [
    { name: "Almohadilla cervical de viaje", desc: "Cómoda, con memoria y sin ocupar espacio en la mochila.", price: "~15-40€", emoji: "🛌", query: "almohadilla cervical avion" },
    { name: "Antifaz para dormir", desc: "Bloquea la luz de la cabina para dormir mejor.", price: "~5-20€", emoji: "😴", query: "antifaz dormir avion" },
    { name: "Calcetines de compresión", desc: "Previenen la hinchazón de piernas en vuelos largos.", price: "~8-25€", emoji: "🧦", query: "calcetines compresion vuelo" },
  ],
  Guias: [
    { name: "Guía de viaje a Japón", desc: "La guía actualizada para planificar tu ruta desde casa.", price: "~15-25€", emoji: "🗾", query: "guia de viaje japon 2026" },
    { name: "Mapa de Japón", desc: "Mapa turístico para marcar tu recorrido antes de volar.", price: "~10-20€", emoji: "🗺️", query: "mapa japon turistico" },
    { name: "Adaptador universal", desc: "Japón usa enchufe de dos patas planas (tipo A).", price: "~10-25€", emoji: "🔌", query: "adaptador universal enchufe japon" },
  ],
  Ahorro: [
    { name: "Guía de presupuesto para viajar", desc: "Cómo estirar el yen con transporte, comida y alojamiento.", price: "~15-25€", emoji: "💰", query: "guia presupuesto viajar japon" },
    { name: "Botella reutilizable", desc: "Llénala en la fuente y ahorra en bebidas.", price: "~8-20€", emoji: "🥤", query: "botella agua reutilizable viaje" },
    { name: "Tarjeta eSIM con datos", desc: "Datos ilimitados en Japón sin cambiar de SIM.", price: "~15-30€", emoji: "📱", query: "esim japon viaje" },
  ],
  Consejos: [
    { name: "Guía de etiqueta japonesa", desc: "Costumbres, propinas y normas sociales que debes saber.", price: "~12-20€", emoji: "🎌", query: "etiqueta japonesa libro" },
    { name: "Botiquín de viaje compacto", desc: "Analgésicos, curitas y lo esencial en formato mini.", price: "~10-20€", emoji: "🩹", query: "botiquin viaje compacto" },
    { name: "Mochila antirrobo", desc: "Con cremalleras ocultas para viajar tranquilo.", price: "~20-40€", emoji: "🎒", query: "mochila antirrobo viaje" },
  ],
  Planificacion: [
    { name: "Guía de transporte en Japón", desc: "JR Pass, Suica y shinkansen explicados.", price: "~15-25€", emoji: "🚄", query: "guia transporte japon" },
    { name: "Planificador de viajes impreso", desc: "Plantillas para armar tu ruta día a día.", price: "~10-15€", emoji: "📋", query: "planificador viaje cuaderno" },
    { name: "Power bank 10000mAh", desc: "Batería para el móvil durante todo el día.", price: "~15-35€", emoji: "🔋", query: "power bank 10000mah" },
  ],
  Idioma: [
    { name: "Libro de frases en japonés", desc: "Frases esenciales con pronunciación para viajar.", price: "~10-18€", emoji: "🗣️", query: "libro frases japones viajeros" },
    { name: "Tarjetas de vocabulario", desc: "Kanji y hiragana básico para empezar desde cero.", price: "~10-20€", emoji: "🀄", query: "tarjetas vocabulario japones" },
    { name: "Aplicación de aprendizaje offline", desc: "Practica japonés básico durante el vuelo.", price: "~10-30€", emoji: "📱", query: "aprender japones curso libro" },
  ],
  Transporte: [
    { name: "Guía de transporte en Japón", desc: "JR Pass, Suica y shinkansen explicados.", price: "~15-25€", emoji: "🚄", query: "guia transporte japon" },
    { name: "Tarjeta IC Suica con saldo", desc: "Prepárala antes de llegar y muévete al instante.", price: "~25-40€", emoji: "💳", query: "suica card japón" },
    { name: "Organizador de viaje", desc: "Para billetes, pases y monedas siempre a mano.", price: "~10-20€", emoji: "👝", query: "organizador pasaporte billetes" },
  ],
};

const FALLBACK_PRODUCTS: RecProduct[] = [
  { name: "Guía de viaje a Japón", desc: "La guía actualizada para planificar tu ruta desde casa.", price: "~15-25€", emoji: "🗾", query: "guia de viaje japon 2026" },
  { name: "Adaptador universal", desc: "Japón usa enchufe de dos patas planas (tipo A).", price: "~10-25€", emoji: "🔌", query: "adaptador universal enchufe japon" },
  { name: "Power bank 10000mAh", desc: "Batería para el móvil durante todo el día.", price: "~15-35€", emoji: "🔋", query: "power bank 10000mah" },
];

function pickProducts(category: string): RecProduct[] {
  return CATEGORY_PRODUCTS[category] || FALLBACK_PRODUCTS;
}

interface Props {
  category: string;
}

export default function AffiliateRecommendations({ category }: Props) {
  const products = pickProducts(category);

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5 my-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">🛍️ Productos recomendados para este artículo</h2>
      <p className="text-sm text-gray-600 mb-4">Comprados antes del viaje, llegan a casa y caben en tu equipaje.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {products.map((p) => (
          <a
            key={p.name}
            href={amazonUrl(p.query)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl p-4 border border-amber-100 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl group-hover:scale-110 transition-transform">{p.emoji}</span>
              <div>
                <div className="font-bold text-gray-900 text-sm group-hover:text-red-600 transition">{p.name}</div>
                <div className="text-xs text-gray-600 mt-0.5">{p.desc}</div>
                <div className="text-sm font-medium text-red-600 mt-1">{p.price}</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a href="https://www.booking.com/searchresults.html?ss=Japan&aid=3049503" target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium transition">
          <span className="text-lg">🏨</span>
          <div>
            <div>Hoteles en Japón</div>
            <div className="text-xs opacity-80">Booking.com</div>
          </div>
        </a>
        <a href="https://www.getyourguide.com/japan/?partner_id=NRWCY1R" target="_blank" rel="noopener noreferrer sponsored" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition">
          <span className="text-lg">🎯</span>
          <div>
            <div>Tours y experiencias</div>
            <div className="text-xs opacity-80">GetYourGuide</div>
          </div>
        </a>
      </div>

      <p className="text-[10px] text-gray-400 mt-3 text-center">Afiliado · Amazon.es, Booking, GetYourGuide</p>
    </div>
  );
}
