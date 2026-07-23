import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Kanazawa - Jardines, arte y sashimi | ViajApp",
  description: "Guia completa de Kanazawa: el Jardin Kenroku-en, el barrio de geishas Higashi Chaya y el mercado Omicho.",
  keywords: "kanazawa, guia kanazawa, kenroku-en, higashi chaya, mercado omicho",
  openGraph: { title: "Guia de Kanazawa | ViajApp", description: "La Kioto del Mar de Japan", url: "https://www.viajapp.app/kanazawa" },
  alternates: { canonical: "https://www.viajapp.app/kanazawa" },
  robots: { index: true, follow: true },
};

const kanazawa: CityData = {
  name: "Kanazawa",
  slug: "kanazawa-l32537",
  description: "La 'Kioto del Mar de Japan'. Jardines de clase mundial, barrio de geishas y el mejor sashimi fresco.",
  emoji: "🌸",
  population: "460K",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€60-110",
  gygQuery: "kanazawa+temple+tour",
  bookingSearch: "Kanazawa",
  mustSee: [
    { name: "Kenroku-en", description: "Uno de los 3 jardines mas bellos de Japon. Perfecto en cualquier estacion.", free: true },
    { name: "Higashi Chaya", description: "Barrio de geishas con casas de madera y tiendas de artesanias.", free: true },
    { name: "Mercado Omicho", description: "El mercado de Kanazawa. 200+ tiendas de pescado fresco y street food.", free: true },
    { name: "Museo de Arte Contemporaneo 21", description: "Museo de arte moderno con instalaciones interactivas.", free: false },
    { name: "Jardin Kenroku-en (Nocturno)", description: "Iluminacion especial en temporada. Los jardines de noche son magicos.", free: false },
    { name: "Nagamachi Samurai District", description: "Barrio de samurais con casas historicas y el museo Nomura.", free: true },
  ],
  food: [
    { name: "Kaisendon (sashimi bowl)", description: "Bowl de arroz con el pescado mas fresco del Mar de Japan.", price: "~¥2,000" },
    { name: "Gold leaf ice cream", description: "Helado cubierto de pan de oro. El souvenir comestible de Kanazawa.", price: "~¥500" },
    { name: "Jibuni", description: "Plato tradicional: pato en caldo con wasabi y gluten.", price: "~¥1,500" },
    { name: "Kaburazushi", description: "Sake de bacalao fermentado con col. Unico de la region.", price: "~¥1,200" },
  ],
  neighborhoods: [
    { name: "Higashi Chaya", description: "El barrio de geishas mas preservado de Japon." },
    { name: "Katamachi", description: "Zona de bares y restaurantes. La vida nocturna." },
    { name: "Korinbo", description: "Centro comercial con tiendas modernas y tradicionales." },
    { name: "Nagamachi", description: "El barrio de los samurais con casas historicas." },
  ],
  gettingAround: [
    "El autobus circular (~¥200/viaje) conecta las atracciones principales.",
    "Pase de autobus de 1 dia (~¥600) vale la pena.",
    "Desde Tokio: Hokuriku Shinkansen (~2.5h).",
    "Desde Kioto: Thunderbird (~2h15) o Shinkansen.",
    "Muchas atracciones estan a distancia caminable del centro.",
    "La bici es otra opcion: alquiler ~¥800/dia.",
  ],
  faq: [
    { question: "Kanazawa como day trip?", answer: "Posible pero apretado. Mejor quedarse 1-2 noches para disfrutar bien." },
    { question: "Kenroku-en en que estacion?", answer: "Primavera (cerezos), verano (fuentes), otoño (hojas rojas) e invierno (nieve). Cada estacion es unica." },
    { question: "Kanazawa vs Kioto?", answer: "Kanazawa es mas compacta y menos turistica. Kioto tiene mas templos. Ambas son excellentes." },
    { question: "JR Pass cubre Kanazawa?", answer: "Si, el JR Pass cubre el Hokuriku Shinkansen desde Tokio y el Thunderbird desde Kioto." },
  ],
};

export default function KanazawaPage() {
  return <CityPage city={kanazawa} />;
}
