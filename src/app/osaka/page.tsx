import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Osaka - Comida, diversion y vida nocturna | ViajApp",
  description: "Guia completa de Osaka: la capital gastronomica de Japon. Street food, vida nocturna, castillos y la mejor comida callejera.",
  keywords: "osaka, guia osaka, comida osaka, que hacer en osaka, vida nocturna osaka",
  openGraph: { title: "Guia de Osaka | ViajApp", description: "La ciudad que nunca duerme y siempre come", url: "https://www.viajapp.app/osaka" },
  alternates: { canonical: "https://www.viajapp.app/osaka" },
  robots: { index: true, follow: true },
};

const osaka: CityData = {
  name: "Osaka",
  slug: "osaka-l1204",
  description: "La capital gastronomica de Japon. Osaka se come mejor que cualquier otra ciudad. Comida callejera, vida nocturna y gente alegre.",
  emoji: "🏯",
  population: "2.7M",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€60-120",
  gygQuery: "osaka+food+tour",
  bookingSearch: "Osaka",
  mustSee: [
    { name: "Osaka Castle", description: "Castillo historico con museo interior y vistas desde el top floor.", free: false },
    { name: "Dotonbori", description: "La calle de la fama: neones gigantes, comida callejera, el Glico Man.", free: true },
    { name: "Shinsekai", description: "Barrio retro con el Tsutenkaku Tower y kushikatsu (brochetas fritas).", free: true },
    { name: "Universal Studios Japan", description: "El parque tematico mas grande de Japon. Harry Potter, Mario Bros.", free: false },
    { name: "Mercado Kuromon", description: "El mercado de Osaka. Mariscos frescos, fruta, street food.", free: true },
    { name: "Namba", description: "El corazon de la vida nocturna. Bares, restaurantes, tiendas.", free: true },
    { name: "Sumiyoshi Taisha", description: "Uno de los santuarios mas antiguos de Japon. Puente arco iconico.", free: true },
  ],
  food: [
    { name: "Takoyaki (octopus balls)", description: "Bolas de masa con pulpo. El snack mas famoso de Osaka.", price: "~¥500" },
    { name: "Okonomiyaki", description: "Tortilla salada japonesa. Prueba en Mizuno o Fukutaro.", price: "~¥1,200" },
    { name: "Kushikatsu", description: "Brochetas fritas de todo. En Shinsekai: no dupliques salsa!", price: "~¥1,500" },
    { name: "Gyoza en Chao Chao", description: "Empanadillas japonesas crujientes. Perfectas con cerveza.", price: "~¥600" },
    { name: "Kaitenzushi", description: "Sushi rotativo. Platos desde ¥100. En Kura Sushi o Sushiro.", price: "~¥1,500" },
    { name: "Ramen Ichiran", description: "Ramen tonkotsu en cabinas privadas. Experiencia personal.", price: "~¥1,000" },
  ],
  neighborhoods: [
    { name: "Dotonbori", description: "La zona mas famosa: neones, comida callejera, el Glico Man." },
    { name: "Shinsekai", description: "Barrio retro con Tsutenkaku, kushikatsu y ambiente nostalgic." },
    { name: "Namba", description: "Centro de la vida nocturna y compras. Estacion principal." },
    { name: "Umeda", description: "Zona moderna con rascacielos, tiendas y el Sky Building." },
    { name: "Tennoji", description: "Zoo, templo y el barrio mas autentico de Osaka." },
  ],
  gettingAround: [
    "El metro de Osaka es excelente. Billete basico ~¥230.",
    "Pase de 1 dia (~¥820) vale la pena si visitas 3+ zonas.",
    "Osaka esta a 15 min de Kioto en tren (JR o Hankyu).",
    "La Osaka Amazing Pass (¥2,800/1 dia) incluye transporte + entrada a 50 atracciones.",
    "Dotonbori se recorre a pie. Namba y Shinsekai tambien.",
    "Evita conducir: el parking es caro y las calles complicadas.",
  ],
  faq: [
    { question: "Osaka o Kioto?", answer: "Osaka es mejor para comida, vida nocturna y diversión. Kioto para templos y cultura. Idealmente visita las dos (estan a 15 min)." },
    { question: "Cuanto cuesta comer en Osaka?", answer: "Puedes comer bien por ¥1,000-2,000 (€6-12). Osaka es mas barata que Tokio para comida callejera." },
    { question: "Universal Studios vale la pena?", answer: "Si te gusta Harry Potter o Super Mario, si. Entrada ~¥8,600. Llega temprano o compra fast pass." },
    { question: "Cuando visitar Osaka?", answer: "Primavera (cerezos) y otoño (hojas rojas) son ideales. Verano es caluroso pero lleno de festivales. Evita Semana Santa." },
  ],
};

export default function OsakaPage() {
  return <CityPage city={osaka} />;
}
