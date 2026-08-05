import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Hiroshima - Paz, historia y Miyajima",
  description: "Guia completa de Hiroshima: el Parque de la Paz, el Santuario de Itsukushima (Miyajima) y la mejor okonomiyaki de Japon.",
  keywords: "hiroshima, guia hiroshima, itsukushima, miyajima, parque paz hiroshima",
  openGraph: { title: "Guia de Hiroshima | ViajApp", description: "Una ciudad renacida de las cenizas", url: "https://www.viajapp.app/hiroshima" },
  alternates: { canonical: "https://www.viajapp.app/hiroshima" },
  robots: { index: true, follow: true },
};

const hiroshima: CityData = {
  name: "Hiroshima",
  slug: "hiroshima-l32662",
  description: "Ciudad de la paz y la resiliencia. El Parque de la Paz, el famoso torii flotante de Miyajima y la mejor okonomiyaki de Japon.",
  emoji: "☮️",
  population: "1.2M",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€60-110",
  gygQuery: "hiroshima+miyajima+tour",
  bookingSearch: "Hiroshima",
  mustSee: [
    { name: "Parque de la Paz", description: "El memorial atomico, el museo y la Cúpula Genbaku. Impresionante y emotivo.", free: true },
    { name: "Santuario de Itsukushima (Miyajima)", description: "El torii flotante rojo. Patrimonio UNESCO. Se puede ir a pie con la bajamar.", free: false },
    { name: "Monte Misen", description: "Senderismo con vistas panoramicas de Miyajima. Teleferico disponible.", free: false },
    { name: "Mercado de Hiroshima (Hondori)", description: "Calle comercial cubierta con tiendas, restaurantes y street food.", free: true },
    { name: "Castillo de Hiroshima", description: "Castillo reconstruido con museo historico y vistas desde el top.", free: false },
    { name: "Shukkei-en Garden", description: "Jardin tradicional con estanques y puentes. Perfecto para un paseo tranquilo.", free: false },
  ],
  food: [
    { name: "Okonomiyaki Hiroshima-style", description: "La especialidad local: capas de noodles, repollo, huevo y salsa. Prueba en Nagata-ya.", price: "~¥1,200" },
    { name: "Oysters (kaki)", description: "Hiroshima produce el 60% de las ostras de Japon. Fritas, a la plancha o en okonomiyaki.", price: "~¥1,500" },
    { name: "Momiji Manju", description: "Pasteles en forma de hoja de arce rellenos de pasta de judia roja. El souvenir comestible.", price: "~¥200" },
    { name: "Hiroshima Ramen", description: "Ramen caldoso con noodles gruesos y cerdo. Estilo unico de la region.", price: "~¥800" },
  ],
  neighborhoods: [
    { name: "Hondori", description: "La calle comercial principal. Tiendas, restaurantes y vida nocturna." },
    { name: "Nagarekawa", description: "Zona de bares y restaurantes. La vida nocturna de Hiroshima." },
    { name: "Miyajima", description: "Isla con el santuario flotante. Se puede dormir en ryokan." },
    { name: "Kamiyancho", description: "Zona tranquila con tiendas de artesanos y cafeterias." },
  ],
  gettingAround: [
    "El tram (hiden) es el transporte principal. Billete ~¥190.",
    "Pase de 1 dia ~¥700 vale la pena.",
    "Miyajima se alcanza en ferry desde Miyajimaguchi (10 min) o JR ferry.",
    "JR Pass cubre el tren a Miyajimaguchi.",
    "Desde Tokio: Shinkansen ~4h. Desde Kioto: ~2h.",
    "El Parque de la Paz se recorre a pie en 2-3 horas.",
  ],
  faq: [
    { question: "Cuantos dias en Hiroshima?", answer: "1-2 dias. Uno para el Parque de la Paz y otro para Miyajima. Se puede hacer en un dia largo." },
    { question: "Es seguro visitar Hiroshima?", answer: "Totalmente. La ciudad es segura y el Parque de la Paz es un lugar imprescindible para entender la historia." },
    { question: "Miyajima vale la pena?", answer: "Si, es uno de los sitios mas iconicos de Japon. El torii flotante es espectacular, especialmente al atardecer." },
    { question: "Cuando ir a Miyajima?", answer: "Consulta las mareas: con bajamar puedes caminar hasta el torii. Con alta marea parece flotar. Ambos son bonitos." },
  ],
};

export default function HiroshimaPage() {
  return <CityPage city={hiroshima} />;
}
