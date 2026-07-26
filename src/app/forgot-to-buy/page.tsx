"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  store: string;
  url: string;
  emoji: string;
}

const categories = [
  { id: "all", label: "Todos", emoji: "🛍️" },
  { id: "tech", label: "Tecnologia", emoji: "📱" },
  { id: "food", label: "Comida y Bebida", emoji: "🍱" },
  { id: "beauty", label: "Belleza y Salud", emoji: "💄" },
  { id: "anime", label: "Anime y Manga", emoji: "🎌" },
  { id: "fashion", label: "Moda", emoji: "👘" },
  { id: "home", label: "Hogar y Cocina", emoji: "🏠" },
  { id: "traditional", label: "Arte y Tradicional", emoji: "🎨" },
  { id: "health", label: "Salud Japan", emoji: "💊" },
];

const products: Product[] = [
  // Tech
  { name: "Cascos Sony WH-1000XM5", description: "Los mejores canceladores de ruido del mercado. En Japon suelen ser mas baratos.", price: "~¥45,000", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sony+wh-1000xm5&tag=viajapp-21", emoji: "🎧" },
  { name: "Cargador Anker Japones", description: "Cargadores rapidos con enchufe tipo J (dos patas planas).", price: "~¥3,000", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anker+charger+japan&tag=viajapp-21", emoji: "🔌" },
  { name: "Power Bank Anker", description: "Bateria portatil para cargar movil mientras exploras.", price: "~¥3,500", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anker+power+bank&tag=viajapp-21", emoji: "🔋" },

  // Food
  { name: "Matcha Uji Premium", description: "Matcha autentico de Uji, Kioto. Ideal para preparar en casa.", price: "~¥3,000", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=matcha+uji+premium&tag=viajapp-21", emoji: "🍵" },
  { name: "Ramen Instantaneo Shin Black", description: "El ramen instantaneo mas vendido de Japon. Sabor autentico.", price: "~¥600", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=nissin+shin+black&tag=viajapp-21", emoji: "🍜" },
  { name: "KitKat Japones (edicion limitada)", description: "Sabores unicos solo disponibles en Japon: sake, matcha, fresa, etc.", price: "~¥1,500", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kitkat+japan+limited&tag=viajapp-21", emoji: "🍫" },
  { name: "Salsa Tonkatsu", description: "La salsa para tonkatsu que no encuentras fuera de Japon.", price: "~¥400", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=tonkatsu+sauce&tag=viajapp-21", emoji: "🍶" },
  { name: "Cafe Blue Bottle Japones", description: "Cafe tostado en Japon. Ediciones limitadas.", price: "~¥2,000", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=blue+bottle+coffee+japan&tag=viajapp-21", emoji: "☕" },
  { name: "Teh Iyemon Kagaya", description: "El te verde embotellado mas popular de Japon.", price: "~¥200", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=iyemon+kagaya&tag=viajapp-21", emoji: "🫖" },

  // Beauty
  { name: "Crema de Manos Shiasedo", description: "Crema de manos japonesa ultrahidratante.", price: "~¥1,500", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=shiseido+hand+cream&tag=viajapp-21", emoji: "🧴" },
  { name: "Mascarilla Lululun", description: "Mascarillas faciales japonesas. Paquetes de 7 u 36.", price: "~¥1,200", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=lululun+face+mask&tag=viajapp-21", emoji: "🧖" },
  { name: "Protector Solar Anessa", description: "El protector solar #1 en Japon. Perfecto para turismo.", price: "~¥2,500", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anessa+sunscreen&tag=viajapp-21", emoji: "☀️" },

  // Anime & Manga
  { name: "Figura Gundam", description: "Modelos Gunpla de Bandai. Coleccionables unicos.", price: "~¥3,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=bandai+gundam+model&tag=viajapp-21", emoji: "🤖" },
  { name: "Manga Shonen Jump", description: "Manga original en japones. Ediciones de coleccion.", price: "~¥500", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=shonen+jump+manga&tag=viajapp-21", emoji: "📚" },
  { name: "Pelicula Ghibli Blu-ray", description: "Ediciones japonesas con arte exclusivo.", price: "~¥5,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=studio+ghibli+blu-ray&tag=viajapp-21", emoji: "🎬" },
  { name: "Pokemon Center exclusivos", description: "Productos exclusivos de Pokemon Center.", price: "~¥2,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=pokemon+center+exclusive&tag=viajapp-21", emoji: "⚡" },

  // Fashion
  { name: "Calcetines Tabi", description: "Calcetines tradicionales japoneses para zapatillas.", price: "~¥800", category: "fashion", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=tabi+socks+japan&tag=viajapp-21", emoji: "🧦" },
  { name: "Banda de Cabello Japonesa", description: "Accesorios para el cabello estilo japones.", price: "~¥1,500", category: "fashion", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japanese+hair+accessories&tag=viajapp-21", emoji: "🎀" },
  { name: "Zapatillas Uniqlo", description: "Moda japonesa accesible. Envios a Japon.", price: "~¥3,000", category: "fashion", store: "Uniqlo JP", url: "https://www.uniqlo.com/jp/ja/", emoji: "👟" },

  // Home
  { name: "Cuchillo Santoku Japones", description: "Cuchillo de chef japonés tradicional.", price: "~¥8,000", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=santoku+kitchen+knife&tag=viajapp-21", emoji: "🔪" },
  { name: "Tetera Kyusu", description: "Tetera japonesa de barro para te verde.", price: "~¥4,000", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kyusu+teapot&tag=viajapp-21", emoji: "🫖" },
  { name: "Set de Banos Onsen", description: "Sales de baño japonesas para recrear el onsen en casa.", price: "~¥1,500", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=onsen+bath+salts&tag=viajapp-21", emoji: "🛁" },

  // Traditional
  { name: "Tinta Sumi para Caligrafia", description: "Tinta tradicional para shodo (caligrafia japonesa).", price: "~¥2,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sumi+ink+calligraphy&tag=viajapp-21", emoji: "✒️" },
  { name: "Abanico Sensu", description: "Abanico plegable tradicional japonés.", price: "~¥1,500", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=sensu+folding+fan&tag=viajapp-21", emoji: "🪭" },
  { name: "Sello Hanko Personalizado", description: "Sello personalizado en japones. Recuerdo unico.", price: "~¥3,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=hanko+stamp+personalized&tag=viajapp-21", emoji: "🔴" },

  // ── Nuevos productos ──

  // Tech (3 nuevos)
  { name: "Adaptador Universal Japan", description: "Enchufe tipo J (dos patas planas). Imprescindible si vienes de Europa.", price: "~¥1,200", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=universal+adapter+japan&tag=viajapp-21", emoji: "🔌" },
  { name: "Cable USB-C Japan Edition", description: "Cable corto tipo L para usar movil en el tren. Edicion japonesa.", price: "~¥800", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anker+cable+usb-c+short&tag=viajapp-21", emoji: "📱" },
  { name: "Cargador Solar Portatil", description: "Panel solar plegable para cargar en parques y montanas.", price: "~¥4,500", category: "tech", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=solar+charger+portable&tag=viajapp-21", emoji: "☀️" },

  // Food (6 nuevos)
  { name: "Curry Golden Japones", description: "Bloques de curry japones. Sabor autentico que no encuentras fuera.", price: "~¥200", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=golden+curry+japan&tag=viajapp-21", emoji: "🍛" },
  { name: "Snacks Calbee Box", description: "Caja surtida de Calbee: Jagabee, Kata-age, Potetos.", price: "~¥1,500", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=calbee+box+snack&tag=viajapp-21", emoji: "🥔" },
  { name: "Salsa Yakisoba Otafuku", description: "La salsa de yakisoba mas vendida de Japon. Sabor umami.", price: "~¥300", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=otafuku+yakisoba+sauce&tag=viajapp-21", emoji: "🍜" },
  { name: "Cafe Boss en Lata", description: "Cafe negro embotellado. Lo venden en cada konbini.", price: "~¥150", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=boss+coffee+can&tag=viajapp-21", emoji: "☕" },
  { name: "Mentaiko Fukuoka", description: "Menta picante de Fukuoka. Recuerdo gastronomico tipico.", price: "~¥800", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=fukuoka+mentaiko&tag=viajapp-21", emoji: "🐟" },
  { name: "Matcha Latte en Polvo", description: "Matcha para preparar latte en casa. Marca Ito En.", price: "~¥600", category: "food", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=ito+en+matcha+latte&tag=viajapp-21", emoji: "🍵" },

  // Beauty (4 nuevos)
  { name: "Bálsamo Labial Mentholatum", description: "El balsamo labial #1 en Japon. Hidratacion intensa.", price: "~¥300", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=mentholatum+lip+balm&tag=viajapp-21", emoji: "💋" },
  { name: "Somin Care Crema Pies", description: "Crema para pies agrietados. Producto japonés top.", price: "~¥800", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=somin+care+cream&tag=viajapp-21", emoji: "🦶" },
  { name: "Tinte Cejas Kiss Me", description: "Tinte para cejas japonés. Dura todo el dia.", price: "~¥1,200", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kiss+me+brow+tint&tag=viajapp-21", emoji: "👁️" },
  { name: "Mascarilla Bento Box", description: "Set de mascarillas variadas. 10 tipos diferentes.", price: "~¥1,800", category: "beauty", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=face+mask+bento+box&tag=viajapp-21", emoji: "🧖" },

  // Anime (4 nuevos)
  { name: "Llavero Gachapon", description: "Llaveros de figuras pequenas. Coleccionables al azar.", price: "~¥500", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=gachapon+keychain&tag=viajapp-21", emoji: "🔑" },
  { name: "Tape Washi San-X", description: "Cinta decorativa japonesa. Rilakkuma, Sumikko Gurashi.", price: "~¥400", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=san-x+washi+tape&tag=viajapp-21", emoji: "🎀" },
  { name: "Figurita Pop Up Parade", description: "Figuras de escala accesibles. Genshin, Demon Slayer, etc.", price: "~¥4,000", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=pop+up+parade+figure&tag=viajapp-21", emoji: "🗿" },
  { name: "Stickers Anime Pack", description: "Paquete de pegatinas anime. 50 piezas variadas.", price: "~¥500", category: "anime", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anime+stickers+pack&tag=viajapp-21", emoji: "🏷️" },

  // Fashion (2 nuevos)
  { name: "Gorra Uniqlo Airism", description: "Gorra con proteccion UV. Tecnologia Airism fresca.", price: "~¥1,500", category: "fashion", store: "Uniqlo JP", url: "https://www.uniqlo.com/jp/ja/", emoji: "🧢" },
  { name: "Pañuelo Tenugui", description: "Pañuelo tradicional japones. Multiples diseños artisticos.", price: "~¥800", category: "fashion", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=tenugui+traditional&tag=viajapp-21", emoji: "🧣" },

  // Home (3 nuevos)
  { name: "Cuchara de Arroz Japonesa", description: "Cuchara de madera para arroz. Forma tipica japonesa.", price: "~¥300", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japanese+rice+spoon&tag=viajapp-21", emoji: "🥄" },
  { name: "Taza Cerámica Kioto", description: "Taza de cerámica artesanal de Kioto.", price: "~¥2,500", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kyoto+ceramic+cup&tag=viajapp-21", emoji: "☕" },
  { name: "Toalla Konbini Premium", description: "Toalla fina y absorbente. Tipo las que venden en konbini.", price: "~¥500", category: "home", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japanese+thin+towel&tag=viajapp-21", emoji: "🏖️" },

  // Traditional (3 nuevos)
  { name: "Papel Washi Artesanal", description: "Papel tradicional japonés para manualidades y envolver.", price: "~¥1,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=washi+paper+craft&tag=viajapp-21", emoji: "📜" },
  { name: "Seda Kimono Miniatura", description: "Trozo de seda con estampado de kimono. Ideal para marco.", price: "~¥2,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kimono+silk+fabric&tag=viajapp-21", emoji: "👘" },
  { name: "Cerámica Arita", description: "Plato decorativo de cerámica de Arita. Arte tradicional.", price: "~¥5,000", category: "traditional", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=arita+yaki+plate&tag=viajapp-21", emoji: "🍽️" },

  // Salud (3 nuevos)
  { name: "Loxonin (dolor de cabeza)", description: "El analgesico #1 en Japon. Recomendado por farmaceuticos.", price: "~¥700", category: "health", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=loxonin+s&tag=viajapp-21", emoji: "💊" },
  { name: "Enpitsu (dolor muscular)", description: "Parche analgesico japonés. Alivio rapido para viajeros.", price: "~¥500", category: "health", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=enpitsu+pain+patch&tag=viajapp-21", emoji: "🩹" },
  { name: "Vitamina C DHC", description: "Suplemento de vitamina C japones. Packs de 60 dias.", price: "~¥400", category: "health", store: "Amazon JP", url: "https://www.amazon.co.jp/s?k=dhc+vitamin+c&tag=viajapp-21", emoji: "🍊" },

  // ── Tiendas japonesas exclusivas (envio internacional) ──

  // CDJapan
  { name: "CD Japan - Disco Vinilo City Pop", description: "Vinilos City Pop japoneses. Tatsuro Yamashita, Mariya Takeuchi, etc.", price: "~¥4,000", category: "anime", store: "CDJapan", url: "https://www.cdjapan.co.jp/", emoji: "💿" },
  { name: "CD Japan - Drama CD Edicion Japonesa", description: "Drama CDs de anime exclusivos de Japon.", price: "~¥3,500", category: "anime", store: "CDJapan", url: "https://www.cdjapan.co.jp/", emoji: "🎙️" },
  { name: "CD Japan - Photo Book Japones", description: "Photobooks de idols y actores japoneses.", price: "~¥3,000", category: "anime", store: "CDJapan", url: "https://www.cdjapan.co.jp/", emoji: "📸" },

  // AmiAmi
  { name: "AmiAmi - Figura Nendoroid", description: "Figuras Nendoroid. Las mas populares de Good Smile Company.", price: "~¥5,000", category: "anime", store: "AmiAmi", url: "https://www.amiami.com/eng/", emoji: "🗿" },
  { name: "AmiAmi - Gunpla RG/MG", description: "Modelos Gunpla de alta calidad. Real Grade y Master Grade.", price: "~¥3,000", category: "anime", store: "AmiAmi", url: "https://www.amiami.com/eng/", emoji: "🤖" },
  { name: "AmiAmi - Figura Scale", description: "Figuras de escala 1/7 y 1/8. Anime y videojuegos.", price: "~¥15,000", category: "anime", store: "AmiAmi", url: "https://www.amiami.com/eng/", emoji: "✨" },
  { name: "AmiAmi - Second Hand Figures", description: "Figuras de segunda mano en excelente estado. Precios bajos.", price: "~¥2,000", category: "anime", store: "AmiAmi", url: "https://www.amiami.com/eng/", emoji: "♻️" },

  // Mandarake
  { name: "Mandarake - Manga Vintage", description: "Manga vintage y ediciones de coleccion. Primera edicion.", price: "~¥1,000", category: "anime", store: "Mandarake", url: "https://order.mandarake.co.jp/order/", emoji: "📚" },
  { name: "Mandarake - Figura Retro", description: "Figuras retro y vintage de anime. Cosu y Galgo.", price: "~¥8,000", category: "anime", store: "Mandarake", url: "https://order.mandarake.co.jp/order/", emoji: "🕹️" },
  { name: "Mandarake - Cel de Anime", description: "Cels de anime originales. Arte original de producciones.", price: "~¥20,000", category: "anime", store: "Mandarake", url: "https://order.mandarake.co.jp/order/", emoji: "🎨" },
  { name: "Mandarake - Doujinshi", description: "Doujinshi y fanzines japoneses. Obras de artistas independientes.", price: "~¥500", category: "anime", store: "Mandarake", url: "https://order.mandarake.co.jp/order/", emoji: "📖" },

  // Rakuten
  { name: "Rakuten - Sake Artesanal", description: "Sake artesanal de productores locales. Envio internacional.", price: "~¥3,000", category: "food", store: "Rakuten", url: "https://www.rakuten.co.jp/", emoji: "🍶" },
  { name: "Rakuten - Té Matcha Uji Premium", description: "Matcha de Uji, Kioto. Calidad de ceremonia.", price: "~¥5,000", category: "food", store: "Rakuten", url: "https://www.rakuten.co.jp/", emoji: "🍵" },
  { name: "Rakuten - Cerámica Arita Yaki", description: "Cerámica artesanal de Arita. Platos y tazas.", price: "~¥8,000", category: "traditional", store: "Rakuten", url: "https://www.rakuten.co.jp/", emoji: "🍽️" },
  { name: "Rakuten - Kimono Second Hand", description: "Kimonos de segunda mano. Buenos estados y precios.", price: "~¥10,000", category: "fashion", store: "Rakuten", url: "https://www.rakuten.co.jp/", emoji: "👘" },
];

export default function ForgotToBuyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = selectedCategory === "all"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const storeCount = new Set(filtered.map((p) => p.store)).size;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">🛍️ Olvide Comprar</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Productos japoneses que no consigues fuera de Japon. Compra online en tiendas japonesas y recibelos en tu pais.
        </p>
        <Link href="/shopping" className="inline-block mt-4 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-md">
          📋 Crea tu Lista de Compras
        </Link>
        <p className="text-sm text-gray-400 mt-2">
          {filtered.length} productos en {storeCount} tiendas
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
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-red-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{product.emoji}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-red-600">{product.price}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{product.store}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Consejos para Comprar Online desde Japon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-2"> Amazon JP</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Acepta tarjetas internacionales</li>
              <li>• Envio internacional disponible</li>
              <li>• Filtros por idioma y Region</li>
              <li>• Precios mas bajos que fuera de Japon</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-2">🔍 Que Buscar</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Productos exclusivos de Japon</li>
              <li>• Ediciones limitadas regionales</li>
              <li>• Snacks y bebidas japonesas</li>
              <li>• Arte y artesanias tradicionales</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🇯🇵 Tiendas Japonesas Exclusivas</h2>
        <p className="text-sm text-gray-600 mb-6">Estas tiendas solo existen en Japon pero envian internacionalmente. Encontraras productos que no estan en Amazon.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="https://www.cdjapan.co.jp/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all group">
            <div className="text-2xl mb-2">💿</div>
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition">CDJapan</h3>
            <p className="text-xs text-gray-500 mt-1">Musica, drama CDs, photobooks, merchandise exclusivo japon.</p>
            <span className="text-xs text-orange-600 font-medium mt-2 inline-block">Envio internacional →</span>
          </a>
          <a href="https://www.amiami.com/eng/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all group">
            <div className="text-2xl mb-2">🗿</div>
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition">AmiAmi</h3>
            <p className="text-xs text-gray-500 mt-1">Figuras, Gunpla, figmas. El mas barato para coleccionables.</p>
            <span className="text-xs text-orange-600 font-medium mt-2 inline-block">Envio internacional →</span>
          </a>
          <a href="https://order.mandarake.co.jp/order/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all group">
            <div className="text-2xl mb-2">🎨</div>
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition">Mandarake</h3>
            <p className="text-xs text-gray-500 mt-1">Manga vintage, cels de anime, doujinshi, coleccionables retro.</p>
            <span className="text-xs text-orange-600 font-medium mt-2 inline-block">Envio internacional →</span>
          </a>
          <a href="https://www.rakuten.co.jp/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all group">
            <div className="text-2xl mb-2">🍶</div>
            <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition">Rakuten</h3>
            <p className="text-xs text-gray-500 mt-1">Marketplace japon. Sake, ceramica, kimono, artesanias.</p>
            <span className="text-xs text-orange-600 font-medium mt-2 inline-block">Envio internacional →</span>
          </a>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 Servicios Proxy (comprar de tiendas que no envian fuera)</h2>
        <p className="text-sm text-gray-600 mb-4">Si una tienda no envia internacionalmente, estos servicios la compran por ti y te lo envian.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="font-bold text-gray-900">Buyee</h3>
            <p className="text-xs text-gray-500 mt-1">Proxy para Mercari, Yahoo Shopping, Rakuten. Fiable y rapido.</p>
            <span className="text-xs text-purple-600 font-medium mt-2 inline-block">buyee.jp</span>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="font-bold text-gray-900">Zenmarket</h3>
            <p className="text-xs text-gray-500 mt-1">Proxy japonés. Compra en cualquier tienda japonesa.</p>
            <span className="text-xs text-purple-600 font-medium mt-2 inline-block">zenmarket.jp</span>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <h3 className="font-bold text-gray-900">Tenso</h3>
            <p className="text-xs text-gray-500 mt-1">Almacen y reenvio. Compra en tiendas y envia a su almacen.</p>
            <span className="text-xs text-purple-600 font-medium mt-2 inline-block">tenso.com</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Precios orientativos en yenes. Los precios reales pueden variar. Algunos envios pueden tardar 2-4 semanas.
        </p>
      </div>
    </div>
  );
}
