import type { Metadata } from "next";
import CityPage, { CityData } from "@/components/cities/CityPage";

export const metadata: Metadata = {
  title: "Guia de Nara - Ciervos, templos y naturaleza | ViajApp",
  description: "Guia completa de Nara: los ciervos sagrados, el Gran Buda de Todai-ji y el santuario Kasuga Taisha.",
  keywords: "nara, guia nara, ciervos nara, todai-ji, kasuga taisha",
  openGraph: { title: "Guia de Nara | ViajApp", description: "La ciudad de los ciervos sagrados" },
};

const nara: CityData = {
  name: "Nara",
  slug: "nara-l839",
  description: "La primera capital permanente de Japon. Mas de 1,200 ciervos roam libre por los parques junto a templos milenarios.",
  emoji: "🦌",
  population: "360K",
  bestTime: "Mar-May / Oct-Nov",
  avgCost: "€50-90",
  gygQuery: "nara+day+trip",
  bookingSearch: "Nara",
  mustSee: [
    { name: "Parque de Nara", description: "1,200+ ciervos sagrados roam libre. Compra shika-senbei (galletas) para darles.", free: true },
    { name: "Todai-ji (Gran Buda)", description: "El edificio de madera mas grande del mundo. El Gran Buda de 15m te deja sin palabras.", free: false },
    { name: "Santuario Kasuga Taisha", description: "Santuario con miles de faroles de piedra y bronce. Sendero boscoso.", free: true },
    { name: "Bosque de Kasugayama", description: "Bosque virgen protegido. Senderismo entre arboles ancestrales.", free: true },
    { name: "Naramachi", description: "El barrio antiguo con casas de madera, tiendas de artesanos y cafeterias.", free: true },
    { name: "Toshodai-ji", description: "Templo budista con una de las estatuas de Buda mas antiguas de Japon.", free: false },
  ],
  food: [
    { name: "Kakinoha-zushi", description: "Sushi envuelto en hojas de caqui. La especialidad de Nara.", price: "~¥1,000" },
    { name: "Mochi de Nara", description: "Mochi tradicional hecho a mano en tiendas centenarios.", price: "~¥300" },
    { name: "Cha-soba", description: "Fideos soba con te verde. Comida ligera y refrescante.", price: "~¥900" },
    { name: "Persimmon leaf sushi", description: "Sushi envuelto en hojas de caqui, unico de Nara.", price: "~¥1,200" },
  ],
  neighborhoods: [
    { name: "Nara Park", description: "El corazon de Nara: ciervos, templos, santuarios y naturaleza." },
    { name: "Naramachi", description: "Barrio historico con machiya (casas de madera tradicionales)." },
    { name: "Sakyo", description: "Zona norte con el bosque de Kasugayama y senderismo." },
    { name: "Downtown", description: "Estacion y zona comercial moderna." },
  ],
  gettingAround: [
    "Nara es pequena y se recorre a pie desde el parque.",
    "Desde Kioto: 35-45 min en tren JR o Kintetsu.",
    "Desde Osaka: 35-50 min en tren.",
    "JR Pass cubre los trenes JR a Nara.",
    "El bus urbano cuesta ~¥170 por viaje.",
    "Se puede hacer como day trip desde Kioto o Osaka.",
  ],
  faq: [
    { question: "Se puede tocar los ciervos?", answer: "Si, los ciervos son mansos. Compra shika-senbei (¥200) y te rodearan. Cuidado: son persistentes!" },
    { question: "Cuantas horas necesito en Nara?", answer: "Un dia completo es ideal. Minimo 4-5 horas para ver Todai-ji, el parque y Naramachi." },
    { question: "Nara es un day trip?", answer: "Si, es perfecto como day trip desde Kioto (45 min) o Osaka (50 min)." },
    { question: "Los ciervos son peligrosos?", answer: "Generalmente no, pero en celo (primavera) pueden ser mas agresivos. Mantente a distancia si ves ciervos con cuernos." },
  ],
};

export default function NaraPage() {
  return <CityPage city={nara} />;
}
