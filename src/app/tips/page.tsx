"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import { useExchangeRate, yenToEur } from "@/hooks/useExchangeRate";
import SeoContent from "@/components/SeoContent";
import RelatedTools from "@/components/RelatedTools";

interface Tip {
  id: string;
  category: string;
  title: string;
  description: string;
  savings: string;
  icon: string;
}

export default function TipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { rate } = useExchangeRate();

  useEffect(() => {
    setLoading(true);
    const url = activeCategory ? `${API_URL}/v1/tips/savings?category=${activeCategory}` : `${API_URL}/v1/tips/savings`;
    fetch(url)
      .then((res) => res.json())
      .then((d) => { setTips(d.tips || []); setCategories(d.categories || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const categoryLabels: Record<string, string> = {
    "transporte": "🚄 Transporte",
    "comida": "🍜 Comida",
    "alojamiento": "🛏️ Alojamiento",
    "compras": "🛒 Compras",
    "general": "💡 General",
    "actividades": "🎯 Actividades",
  };

  const totalSavings = tips.reduce((acc, tip) => {
    const match = tip.savings.match(/(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Tips de Ahorro</h1>
      <p className="text-gray-600 mb-8">Ahorra miles de yen siguiendo estos consejos de viajeros experimentados.</p>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
        <div className="text-lg font-medium mb-1">Ahorro potencial total</div>
        <div className="text-4xl font-bold">~{totalSavings.toLocaleString()}+¥ por día <span className="text-lg font-normal opacity-80">({yenToEur(totalSavings, rate)}/día)</span></div>
        <div className="text-sm opacity-80 mt-1">Siguiendo todos los tips de esta categoría</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCategory(null)} className={`px-4 py-2 rounded-full font-medium transition-all ${!activeCategory ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
          Todos
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat ? "bg-red-600 text-white" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-green-200 transition-all">
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{tip.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-lg text-gray-900">{tip.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                      Ahorra {tip.savings}
                    </span>
                  </div>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <SeoContent
        title="Cómo ahorrar dinero en Japón"
        paragraphs={[
          "Japón es más barato de lo que parece si conoces los trucos que usan los locales. La comida es el mayor ahorro: un bento de supermercado cuesta 500 yenes, un ramen de barrio 900-1.200 yenes y en los konbini puedes comer dignamente por 400-600 yenes. Evita los restaurantes de las zonas turísticas y busca las plantas de comida de los centros comerciales, donde los locales comen por 700-1.500 yenes.",
          "En transporte, compra siempre la tarjeta IC (Suica o Pasmo) en lugar de billetes sueltos: cada trayecto cuesta entre 180 y 350 yenes y la tarjeta funciona también en konbini. Los pases de un día (metro de Tokio o autobús de Kioto) compensan a partir de tres trayectos. Entre ciudades, valora el JR Pass solo si haces varias rutas largas.",
          "Las compras también tienen su truco: las tiendas tax-free (libres de impuestos) te devuelven el 8-10% en compras superiores a 5.000 yenes en una misma tienda el mismo día, mostrando el pasaporte. Los supermercados bajan los precios de la comida preparada a partir de las 19:00-20:00, y los 100-yen shops (Daiso, Seria) son ideales para artículos de viaje baratos.",
        ]}
        faqs={[
          { q: "¿Vale la pena el JR Pass en 2026?", a: "Depende del recorrido. Con una ruta Tokio-Kioto-Osaka de ida y vuelta, sí. Si solo vas a una ciudad o haces trayectos cortos, no. Compara el coste del pass con la suma de tus billetes individuales en el planificador de ViajApp." },
          { q: "¿Se puede pagar con tarjeta en Japón?", a: "En tiendas, hoteles y restaurantes de ciudades grandes sí. Pero el efectivo sigue siendo necesario en pueblos, mercados y restaurantes familiares. Lleva siempre yenes encima y saca en cajeros de 7-Eleven o Japan Post." },
          { q: "¿Cuál es el mejor truco para ahorrar en comida?", a: "Desayunar y cenar en konbini, comer el plato del día en las plantas de comida de los centros comerciales y probar el sushi de cinta transportadora. Se come bien por 10-15 euros al día." },
        ]}
      />

      <RelatedTools currentTool="tips" />
    </div>
  );
}
