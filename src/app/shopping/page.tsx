"use client";

import { useExchangeRate, yenToEur } from "@/hooks/useExchangeRate";

const shoppingAreas = [
  {
    name: "Shibuya & Harajuku",
    icon: "🛍️",
    city: "Tokio",
    desc: "Lo más trendy de Tokio. Ropa de diseño, streetwear y tiendas únicas.",
    bestFor: ["Ropa japonesa", "Streetwear", "Zapatillas", "Souvenirs"],
    places: [
      { name: "Shibuya 109", desc: "Ropa femenina japonesa, 10 plantas" },
      { name: "Harajuku Takeshita", desc: "Streetwear kawaii, accesorios baratos" },
      { name: "Omotesando", desc: "Lujo: Louis Vuitton, Dior, Comme des Garçons" },
      { name: "Cat Street", desc: "Streetwear premium y tiendas vintage" },
    ],
    tips: "Los sábados Hay más ambiente pero más gente. Los domingos muchas tiendas cierran temprano.",
  },
  {
    name: "Ginza",
    icon: "💎",
    city: "Tokio",
    desc: "El barrio más elegante de Tokio. Tiendas de lujo, duty-free y restaurantes.",
    bestFor: ["Lujo", "Duty-free", "Gourmet", "Arte"],
    places: [
      { name: "Ginza Six", desc: "Centro comercial de lujo, 12 plantas" },
      { name: "Mitsukoshi", desc: "El departamento más antiguo de Japón (1673)" },
      { name: "Itoya", desc: "Paraíso de papelería (12 plantas)" },
      { name: "Uniqlo Global Flagship", desc: "12 plantas de Uniqlo, ropa básica perfecta" },
    ],
    tips: "Duty-free en casi todas las tiendas si llevas pasaporte. Mínimo de compra: ~5,000 yenes.",
  },
  {
    name: "Akihabara",
    icon: "🎮",
    city: "Tokio",
    desc: "Paraíso de electrónica, anime y videojuegos. El barrio otaku por excelencia.",
    bestFor: ["Electrónica", "Anime", "Figuras", "Retro gaming"],
    places: [
      { name: "Yodobashi Camera", desc: "9 plantas de electrónica. Duty-free." },
      { name: "Mandarake", desc: "8 plantas de manga, figures y doujinshi" },
      { name: "Super Potato", desc: "Videojuegos retro de los 80-90s" },
      { name: "AmiAmi", desc: "Figuras nuevas y de segunda mano" },
    ],
    tips: "Compara precios entre tiendas. Yodobashi es más barato que Bic Camera en electrónica.",
  },
  {
    name: "Don Quijote (ドンキ)",
    icon: "🏪",
    city: "Todo Japón",
    desc: "La tienda más caótica y divertida de Japón. De todo: snacks, cosmética, souvenirs, maletas.",
    bestFor: ["Souvenirs baratos", "Snacks", "Cosmética", "Maletas"],
    places: [
      { name: "Don Quijote Shibuya", desc: "Abierto 24h, 5 plantas de caos" },
      { name: "Don Quijote Akihabara", desc: "Electrónica + snacks + todo" },
    ],
    tips: "Pide tax-free si compras más de 5,000 yenes. Los purple stickers son los más baratos.",
  },
  {
    name: "100-Yen Shops (Daiso, Seria, Can Do)",
    icon: "💴",
    city: "Todo Japón",
    desc: "Todo por 100 yenes. Regalos, utensilios, decoración, snacks. ¡Imprescindible!",
    bestFor: ["Regalos baratos", "Utensilios", "Decoración", "Bolsas de envío"],
    places: [
      { name: "Daiso", desc: "La más grande, 30,000+ productos" },
      { name: "Seria", desc: "Más bonita, estilo Muji barato" },
      { name: "Can Do", desc: "Básicos y utensilios de cocina" },
    ],
    tips: "Compra cajas de cartón para enviar compras a casa. También bolsas de vacío y packing cubes.",
  },
  {
    name: "Uniqlo & GU",
    icon: "👕",
    city: "Todo Japón",
    desc: "Ropa básica japonesa de calidad. Heattech para invierno, AIRism para verano.",
    bestFor: ["Ropa básica", "Heattech", "AIRism", "Algodón"],
    places: [
      { name: "Uniqlo Ginza", desc: "12 plantas, flagship store" },
      { name: "GU", desc: "Hermana barata de Uniqlo" },
    ],
    tips: "Heattech: ropa térmica que calienta. Perfecta para invierno. Compra en Japón que es más barato.",
  },
  {
    name: "Bic Camera & Yodobashi",
    icon: "📷",
    city: "Todo Japón",
    desc: "Electrónica japonesa: cámaras, móviles, auriculares, gadgets. Duty-free.",
    bestFor: ["Cámaras", "Auriculares", "Móviles", "Gadgets"],
    places: [
      { name: "Bic Camera Shibuya", desc: "9 plantas de electrónica" },
      { name: "Yodobashi Akiba", desc: "La tienda de electrónica más grande" },
    ],
    tips: "Compara precios online antes de ir. Yodobashi suele ser más barato. Duty-free si llevas pasaporte.",
  },
  {
    name: "Nishiki Market (Kioto)",
    icon: "🍣",
    city: "Kioto",
    desc: "El mercado de 400 años de Kioto. Comida fresca, snacks y artesanía.",
    bestFor: ["Comida", "Souvenirs gourmet", "Artesanía"],
    places: [
      { name: "Nishiki Market", desc: "5 cuadras de comida y tiendas" },
      { name: "Kyoto Handicraft Center", desc: "Artesanía japonesa de calidad" },
    ],
    tips: "Ve temprano (antes de las 11am). Prueba el tsukemono (encurtidos) y el tofu fresco.",
  },
  {
    name: "Daiso & Costco en Osaka",
    icon: "🛒",
    city: "Osaka",
    desc: "Osaka: la ciudad de las compras. Costco japonés, Daiso gigante y mercados.",
    bestFor: ["Compras grandes", "Snacks al por mayor", "Electrónica"],
    places: [
      { name: "Costco Osaka", desc: "Todo al por mayor (necesitas carnet)" },
      { name: "Den Den Town", desc: "El Akihabara de Osaka, más barato" },
    ],
    tips: "Den Den Town: más barato que Akihabara para figures y electrónica.",
  },
];

const taxFree = [
  {
    title: "Tax-Free en tiendas",
    icon: "🏷️",
    items: [
      "Compra mínima: 5,000 yenes (en una tienda)",
      "Lleva pasaporte siempre",
      "Busca el logo 'Tax Free'",
      "Proceso: compras → pasaporte → sello → sin IVA",
      "El IVA es 10% (te ahorras ~10%)",
    ],
  },
  {
    title: "Duty-Free en aeropuerto",
    icon: "✈️",
    items: [
      "Para artículos caros (relojes, joyas)",
      "Compra en tiendas duty-free del aeropuerto",
      "Sin límite de cantidad",
      "No pagas impuestos al salir",
      "Guarda el recibo para aduanas",
    ],
  },
  {
    title: "Envío a casa",
    icon: "📮",
    items: [
      "Yamato Transport: envía desde konbini",
      "Japan Post EMS: envío internacional",
      "Cajas de cartón en 100-yen shops",
      "Envío más barato que traer maleta extra",
      "Guarda los recibos de impuestos",
    ],
  },
];

export default function ShoppingPage() {
  const { rate } = useExchangeRate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🛍️ Compras en Japón
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Japón es paraíso de compradores. Desde 100-yen shops hasta tiendas de lujo.
          Todo con calidad impecable.
        </p>
      </div>

      {/* Shopping areas */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {shoppingAreas.map((area) => (
          <div
            key={area.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{area.icon}</span>
              <div>
                <h3 className="font-bold text-gray-900">{area.name}</h3>
                <p className="text-sm text-gray-500">{area.city}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{area.desc}{area.name.includes("100-Yen") && <span className="text-xs text-gray-400 ml-1">({yenToEur(100, rate)} cada uno)</span>}</p>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-600 mb-1">Ideal para:</h4>
              <div className="flex flex-wrap gap-1">
                {area.bestFor.map((item, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-600 mb-1">📍 Tiendas:</h4>
              <div className="space-y-1">
                {area.places.map((place, i) => (
                  <div key={i} className="text-xs">
                    <span className="font-medium text-gray-700">{place.name}:</span>{" "}
                    <span className="text-gray-500">{place.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">💡 {area.tips}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tax Free */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          💰 Tax-Free y Envíos
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {taxFree.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="text-center mb-4">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mt-2">{item.title}</h3>
              </div>
              <ul className="space-y-2">
                {item.items.map((text, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Best buys */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🎁 Mejores compras en Japón
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Lo que comprar en Japón:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Ropa Uniqlo (Heattech, AIRism)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Cosmética japonesa (Shiseido, SK-II)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Snacks de konbini (matcha, wasabi)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Figures de anime (AmiAmi, Mandarake)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Papelería (Itoya, Loft)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Utensilios de cocina (Knifewear)</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Souvenirs de 100-yen shops</div>
              <div className="flex items-center gap-2"><span className="text-green-500">✓</span> Mascarillas faciales (Lululun)</div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Consejos de comprador:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Lleva siempre pasaporte para tax-free</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Compara precios entre Yodobashi y Bic Camera</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Los domingos algunas tiendas cierran</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Envía cosas pesadas por Yamato</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Compra maletas en Don Quijote para la vuelta</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Las konbini tienen cajas de cartón gratis</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Los 100-yen shops tienen bolsas de vacío</div>
              <div className="flex items-start gap-2"><span className="text-blue-500">💡</span> Guarda recibos para aduanas al volver</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
