import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Fukuoka - Ramen y vida nocturna | ViajApp",
  description: "Guia completa de Fukuoka: el mejor ramen de Japon, yatais (puestos callejeros),-templos y playa.",
  keywords: "fukuoka, guia fukuoka, ramen fukuoka, yatai, hakata",
  openGraph: { title: "Guia de Fukuoka | ViajApp", description: "La puerta de Kyushu" },
};

const fukuoka: CityData = {
  name: "Fukuoka",
  slug: "fukuoka-l841",
  description: "La ciudad mas animada de Kyushu. famosa por su ramen tonkotsu, los yatais (puestos nocturnos) y su vida nocturna vibrante.",
  emoji: "🍜",
  population: "1.6M",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€55-100",
  gygQuery: "fukuoka+food+tour",
  bookingSearch: "Fukuoka",
  mustSee: [
    { name: "Yatais (puestos nocturnos)", description: "Puestos de comida callejera a orillas del rio Nakasu. Ramen, yakitori, okonomiyaki.", free: true },
    { name: "Templo Tocho-ji", description: "Templo budista con la estatua de Buda sentado mas grande de madera de Japon.", free: true },
    { name: "Fukuoka Castle Ruins", description: "Ruinas del castillo con vistas a la ciudad. Ideal para paseo.", free: true },
    { name: "Ohori Park", description: "Parque con estanque, museo de arte y pista de jogging.", free: true },
    { name: "Canal City Hakata", description: "Complejo comercial con fuente luminica, cines y tiendas.", free: true },
    { name: "Nanzoin Temple", description: "El Buda reclinado mas grande del mundo (41m). Impresionante.", free: true },
  ],
  food: [
    { name: "Hakata Ramen", description: "Ramen tonkotsu con caldo cremoso de cerdo. La especialidad de Fukuoka.", price: "~¥800" },
    { name: "Motsunabe", description: "Hot pot de intestinos de cerdo con vegetales. Plato reconfortante.", price: "~¥1,500" },
    { name: "Mentaiko", description: "Huevas de bacalao picantes. Sobre arroz o solo.", price: "~¥1,000" },
    { name: "Yatai food", description: "Comida callejera: yakitori, ramen, gyoza. Abren de noche a orillas del rio.", price: "~¥1,500" },
    { name: "Hakata Torimon", description: "El souvenir mas famoso: pollo picado con especias envuelto en pasta de judia.", price: "~¥500" },
  ],
  neighborhoods: [
    { name: "Nakasu", description: "La zona de entretenimiento mas grande de Kyushu. Yatais y bares." },
    { name: "Hakata", description: "El centro historico con templos, tiendas y la estacion principal." },
    { name: "Tenjin", description: "Zona de compras moderna. Department stores y boutiques." },
    { name: "Dazaifu", description: "Dia trip: santuario Tenmangu y el Museo Nacional." },
  ],
  gettingAround: [
    "El metro es barato (~¥210) y eficiente.",
    "Pase de 1 dia ~¥640 para metro + autobus.",
    "Los yatais se recorren a pie por la zona de Nakasu.",
    "JR Pass cubre el Shinkansen desde Tokio (~5h) o Kioto (~2h).",
    "Autobus a Dazaifu desde Tenjin (~30 min).",
    "Fukuoka es la puerta a Kyushu: Kumamoto, Beppu, Nagasaki.",
  ],
  faq: [
    { question: "Fukuoka o Osaka para comida?", answer: "Osaka tiene mas variedad. Fukuoka gana en ramen y yatai. Ambas son excellentes." },
    { question: "Los yatais什么时候 abren?", answer: "Normalmente de 6pm a 2am. Cada puesto tiene 6-10 sitios. Espera 10-15 min en hora punta." },
    { question: "Cuantos dias en Fukuoka?", answer: "2-3 dias. Un dia para la ciudad, otro para Dazaifu o un day trip a Kumamoto." },
  ],
};

export default function FukuokaPage() {
  return <CityPage city={fukuoka} />;
}
