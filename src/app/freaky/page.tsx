"use client";

import { useState } from "react";
import Link from "next/link";

interface FreakyItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  affiliateLinks: {
    name: string;
    url: string;
  }[];
  image?: string;
}

const categories = [
  { id: "all", name: "Todos", icon: "🗾" },
  { id: "vending", name: "Vending Machines", icon: "🏧" },
  { id: "maid-cafe", name: "Maid Cafés", icon: "☕" },
  { id: "themed-cafe", name: "Themed Cafés", icon: "🐱" },
  { id: "akihabara", name: "Akihabara & Otaku", icon: "🎮" },
  { id: "capsule", name: "Capsule Hotels", icon: "🏨" },
  { id: "kawaii", name: "Kawaii Culture", icon: "🌸" },
  { id: "arcades", name: "Arcades & Pachinko", icon: "🎰" },
  { id: "fashion", name: "Harajuku Fashion", icon: "👗" },
  { id: "temples", name: "Templos Raros", icon: "⛩️" },
  { id: "food", name: "Comida Freaky", icon: "🍣" },
  { id: "toilets", name: "Aseos Futuristas", icon: "🚽" },
  { id: "trains", name: "Trenes Temáticos", icon: "🚅" },
  { id: "museums", name: "Museos Raros", icon: "🏛️" },
];

const freakyItems: FreakyItem[] = [
  {
    id: "vending-insects",
    title: "Vending Machine de Insectos",
    description: "En Tokio puedes comprar grillos fritos, escarabajos y más. Una experiencia que solo existe en Japón.",
    category: "vending",
    location: "Akihabara, Tokio",
    price: "500-1,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=edible+insects&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+edible+insects" },
    ],
  },
  {
    id: "vending-underwear",
    title: "Vending Machine de Ropa Interior",
    description: "Sí, existe. En Akihabara hay máquinas con ropa interior usada y nueva. Un fenómeno cultural único.",
    category: "vending",
    location: "Akihabara, Tokio",
    price: "1,000-5,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=akihabara&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-hot",
    title: "Vending Machine de Comida Caliente",
    description: "Máquinas que sirven ramen, takoyaki, gyoza y hasta curry caliente. Perfecto para late night.",
    category: "vending",
    location: "Toda Japón",
    price: "300-800 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=hot+food+vending+machine&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-live-crabs",
    title: "Vending Machine de Cangrejos Vivos",
    description: "En el aeropuerto de Narita puedes comprar cangrejos vivos para llevar. Solo en Japón.",
    category: "vending",
    location: "Aeropuerto de Narita",
    price: "3,000-5,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=live+crab+vending&tag=viajapp-21" },
    ],
  },
  {
    id: "maid-cafe-akiba",
    title: "Maid Café Original de Akihabara",
    description: "Las chicas vestidas de maid te sirven café con dibujos kawaii. La experiencia más representativa del otaku culture.",
    category: "maid-cafe",
    location: "Akihabara, Tokio",
    price: "1,500-3,000 yenes (entrada + 1 bebida)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=maid+cafe+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=maid+cafe+tokyo" },
    ],
  },
  {
    id: "maid-cafe-themes",
    title: "Maid Cafés Temáticos",
    description: "Hay maid cafés de gatos, robots, ninjas, vampires y hasta de señoras mayores. Cada uno es una experiencia única.",
    category: "maid-cafe",
    location: "Akihabara, Ikebukuro",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=themed+cafe+tokyo" },
    ],
  },
  {
    id: "cat-cafe",
    title: "Cat Café (Neko Café)",
    description: "Japón inventó los cat cafés. Puedes jugar con gatos mientras tomas café. Hay de todas las razas.",
    category: "themed-cafe",
    location: "Toda Japón",
    price: "1,000-2,000 yenes/hora",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=cat+cafe+japan" },
      { name: "Klook", url: "https://www.klook.com/search/?q=cat+cafe+japan" },
    ],
  },
  {
    id: "owl-cafe",
    title: "Owl Café (Lechuzas)",
    description: "Puedes interactuar con lechuzas reales mientras tomas té. Una experiencia relajante y única.",
    category: "themed-cafe",
    location: "Harajuku, Tokio",
    price: "1,500-2,500 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=owl+cafe+tokyo" },
    ],
  },
  {
    id: "pokemon-cafe",
    title: "Pokémon Café",
    description: "El café oficial de Pokémon en Tokio. Comida temática, figuras y experiencias interactivas.",
    category: "themed-cafe",
    location: "Tokyo DX, Tokio",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=pokemon+cafe+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=pokemon+cafe+tokyo" },
    ],
  },
  {
    id: "robot-restaurant",
    title: "Robot Restaurant (Shinjuku)",
    description: "Show de robots gigantes, luces neon y caos total. La experiencia más freaky de Tokio. (Cerrado temporalmente, verificar apertura)",
    category: "themed-cafe",
    location: "Kabukicho, Shinjuku",
    price: "8,000-10,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=robot+restaurant+tokyo" },
    ],
  },
  {
    id: "akihabara-figure-shops",
    title: "Tiendas de Figures en Akihabara",
    description: "Miles de figuras de anime, manga y videojuegos. Desde 500 yenes hasta colecciones de 100,000+ yenes.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "500-100,000+ yenes",
    affiliateLinks: [
      { name: "AmiAmi", url: "https://www.amiami.com/eng/" },
      { name: "CDJapan", url: "https://www.cdjapan.co.jp/" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=anime+figure&tag=viajapp-21" },
    ],
  },
  {
    id: "akihabara-retro-games",
    title: "Tiendas de Videojuegos Retro",
    description: "Super Potato, Game Star y más. Consolas retro, cartuchos y recuerdos de los 80-90s.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "500-50,000 yenes",
    affiliateLinks: [
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+retro+games" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=retro+game+console&tag=viajapp-21" },
    ],
  },
  {
    id: "capsule-nine-hours",
    title: "Capsule Hotel Nine Hours",
    description: "El capsule hotel más minimalista y moderno. Diseño futurista, limpio y funcional.",
    category: "capsule",
    location: "Múltiples ubicaciones",
    price: "4,000-6,000 yenes/noche",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=nine+hours+tokyo" },
      { name: "Agoda", url: "https://www.agoda.com/search?city=14562" },
    ],
  },
  {
    id: "capsule-first-cabin",
    title: "First Cabin (Primera Clase)",
    description: "Capsule hotel de lujo. Cabinas tipo primera clase de avión. Sofá, TV y espacio de sobra.",
    category: "capsule",
    location: "Tokio, Osaka",
    price: "6,000-10,000 yenes/noche",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=first+cabin+japan" },
    ],
  },
  {
    id: "kawaii-harajuku",
    title: "Kawaii Culture en Harajuku",
    description: "Takeshita Street es el epicentro de la moda kawaii. Colores pastel, accesorios cute y dulces.",
    category: "kawaii",
    location: "Harajuku, Tokio",
    price: "Variable",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kawaii+accessories&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+kawaii+accessories" },
    ],
  },
  {
    id: "arcade-sega",
    title: "Arcades SEGA & Taito",
    description: "Máquinas de arcade, crane games (UFO catchers) y photo booths (purikura). Diversión por horas.",
    category: "arcades",
    location: "Akihabara, Shinjuku",
    price: "100-500 yenes/juego",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=arcade+tokyo" },
    ],
  },
  {
    id: "pachinko",
    title: "Pachinko (Juego de Bolas)",
    description: "El juego de azar más popular de Japón. Máquinas ruidosas, luces cegadoras y premios extraños.",
    category: "arcades",
    location: "Toda Japón",
    price: "100 yenes por juego",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=pachinko+japan" },
    ],
  },
  {
    id: "harajuku-fashion",
    title: "Fashion Underground de Harajuku",
    description: "La moda más extravagante del mundo. Decora, Lolita, Visual Kei, Gyaru y más estilos únicos.",
    category: "fashion",
    location: "Harajuku, Tokio",
    price: "Variable",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=harajuku+fashion&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+harajuku+fashion" },
    ],
  },
  {
    id: "fertility-shrine",
    title: "Santuario de la Fertilidad (Kanamara)",
    description: "El festival más... peculiar de Japón. Carrozas con forma fáfica y tradiciones únicas.",
    category: "temples",
    location: "Kawasaki (cerca de Tokio)",
    price: "Entrada gratuita",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=kanamara+shrine" },
    ],
  },
  {
    id: "fugu",
    title: "Fugu (Pez Globo Venenoso)",
    description: "Un plato que puede matarte si no se prepara bien. Solo chefs licenciados pueden servirlo.",
    category: "food",
    location: "Osaka, Tokio",
    price: "5,000-20,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=fugu+restaurant+japan" },
      { name: "Klook", url: "https://www.klook.com/search/?q=fugu+experience" },
    ],
  },
  {
    id: "konbini-weird",
    title: "Snacks Raros de Konbini",
    description: "KitKat de 50 sabores, edamame ice cream, oreo de wasabi y más combinaciones imposibles.",
    category: "food",
    location: "7-Eleven, Lawson, FamilyMart",
    price: "100-500 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japan+snacks+variety&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+snacks+box" },
    ],
  },
  // ========== NUEVOS ITEMS ==========
  // Vending Machines extra
  {
    id: "vending-bouquet",
    title: "Vending Machine de Flores",
    description: "En estaciones de tren hay máquinas que venden ramos de flores frescas. Perfecto para un regalo de última hora.",
    category: "vending",
    location: "Estaciones de tren, Tokio",
    price: "500-2,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=fresh+flowers+vending&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-hot-drinks",
    title: "Vending Machine de Bebidas Calientes y Frías",
    description: "La misma máquina tiene café caliente y refrescos fríos. Algo normal en Japón pero raro fuera de él.",
    category: "vending",
    location: "Toda Japón",
    price: "100-300 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japan+vending+machine+drinks&tag=viajapp-21" },
    ],
  },
  {
    id: "vending-emergency",
    title: "Vending Machine de Emergencia",
    description: "Tras terremotos, estas máquinas se abren y regalan agua y comida gratis. Tecnología humanitaria japonesa.",
    category: "vending",
    location: "Toda Japón",
    price: "Gratis (emergencias)",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=emergency+supplies+japan&tag=viajapp-21" },
    ],
  },
  // Maid Cafés extra
  {
    id: "butler-cafe",
    title: "Butler Café (Ikebukuro)",
    description: "La versión masculina del maid café. Chicos elegantes de traje te atienden como si fueras de la realeza.",
    category: "maid-cafe",
    location: "Ikebukuro, Tokio",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=butler+cafe+tokyo" },
    ],
  },
  {
    id: "hierophant-green-cafe",
    title: "Café Temático de Anime/JoJo",
    description: "Cafés temáticos de animes populares como JoJo, Demon Slayer o One Piece. Decoración completa y comida temática.",
    category: "maid-cafe",
    location: "Akihabara, Ikebukuro",
    price: "2,000-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=anime+cafe+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=anime+cafe+tokyo" },
    ],
  },
  // Themed Cafés extra
  {
    id: "hedgehog-cafe",
    title: "Hedgehog Café (Erizos)",
    description: "Juega con erizos africanos. Son adorables y muy mansos. Puedes tocarlos y sacar fotos.",
    category: "themed-cafe",
    location: "Harajuku, Roppongi",
    price: "1,500-2,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=hedgehog+cafe+tokyo" },
    ],
  },
  {
    id: "rabbit-cafe",
    title: "Rabbit Café (Conejos)",
    description: "Conejos enanos que puedes acariciar. Perfecto para familias con niños.",
    category: "themed-cafe",
    location: "Varios en Tokio",
    price: "1,000-1,500 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=rabbit+cafe+tokyo" },
    ],
  },
  {
    id: "vampire-cafe",
    title: "Vampire Café (Ginza)",
    description: "Decoración gótica, sangre falsa en los platos y camareros vestidos de vampiro. Experiencia teatral.",
    category: "themed-cafe",
    location: "Ginza, Tokio",
    price: "2,500-4,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=vampire+cafe+tokyo" },
    ],
  },
  {
    id: "ninja-cafe",
    title: "Ninja Café (Asakusa)",
    description: "Comida ninja, trucos de magia y decoración de castillo japonés. Los camareros son ninjas.",
    category: "themed-cafe",
    location: "Asakusa, Tokio",
    price: "2,000-3,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=ninja+cafe+tokyo" },
    ],
  },
  // Akihabara & Otaku extra
  {
    id: "akihabara-maid-recruit",
    title: "Maid Recruitment Streets",
    description: "Las calles de Akihabara llenas de chicas maid repartiendo flyers. Un espectáculo visual único.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "Gratis (solo mirar)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=akihabara+walking+tour" },
    ],
  },
  {
    id: "doujinshi-shops",
    title: "Tiendas de Doujinshi (Comics Independientes)",
    description: "Comics creados por fans, incluyendo contenido para adultos. El lado underground del anime.",
    category: "akihabara",
    location: "Akihabara, Tokio",
    price: "500-5,000 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=doujinshi+manga&tag=viajapp-21" },
    ],
  },
  {
    id: "gachapon-street",
    title: "Calle de Gachapon (Máquinas de Cápsulas)",
    description: "Filas de máquinas gachapon con figuras, accesorios y rarezas. Hay miles de diseños únicos.",
    category: "akihabara",
    location: "Akihabara, Nakano",
    price: "100-500 yenes/cápsula",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=gachapon+capsule+toy&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+gachapon+capsule" },
    ],
  },
  // Capsule Hotels extra
  {
    id: "capsule-book-and-bed",
    title: "Book and Bed (Dormir entre Libros)",
    description: "Estanterías de manga y libros como decoración. Lees antes de dormir y te despiertas entre historias.",
    category: "capsule",
    location: "Ikebukuro, Shinjuku, Osaka",
    price: "5,000-8,000 yenes",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=book+and+bed+japan" },
    ],
  },
  {
    id: "capsule-millennials",
    title: "The Millennials (Kyoto)",
    description: "El más tech. Control por smartphone, cama articulada, proyección en la pared. Futurista total.",
    category: "capsule",
    location: "Kyoto",
    price: "5,000-8,000 yenes",
    affiliateLinks: [
      { name: "Booking.com", url: "https://www.booking.com/searchresults.html?ss=the+millennials+kyoto" },
    ],
  },
  // Kawaii extra
  {
    id: "kawaii-sweets",
    title: "Dulces Kawaii Extremos",
    description: "Tres leches de colores pastel, cotton candy gigante, pancakes con cara de oso y más.",
    category: "kawaii",
    location: "Harajuku, Shibuya",
    price: "500-1,500 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=kawaii+sweets+tokyo" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=kawaii+sweets+making&tag=viajapp-21" },
    ],
  },
  {
    id: "purikura",
    title: "Purikura (Photo Booths Kawaii)",
    description: "Máquinas de fotos con filtros extremos, stickers y efectos. Los adolescentes japoneses están obsesionados.",
    category: "kawaii",
    location: "Harajuku, Akihabara, Shibuya",
    price: "400-600 yenes/sesión",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=purikura+tokyo" },
    ],
  },
  // Arcades extra
  {
    id: "arcade-crane-game",
    title: "UFO Catcher (Crane Games)",
    description: "Máquinas de garra con figuras, peluches y premios. Adictivo y frustrante a partes iguales.",
    category: "arcades",
    location: "Akihabara, Shinjuku, Shibuya",
    price: "100-200 yenes/intento",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=crane+game+prize&tag=viajapp-21" },
    ],
  },
  {
    id: "arcade-rhythm",
    title: "Arcades de Música (Taiko, DDR, IIDX)",
    description: "Taiko no Tatsujin, Dance Dance Revolution y más. Los japoneses son experts. Diversión garantizada.",
    category: "arcades",
    location: "Akihabara, Shinjuku",
    price: "200-500 yenes/juego",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=arcade+gaming+tokyo" },
    ],
  },
  {
    id: "arcade-retro",
    title: "Game Centers Retro (SEGA, Taito, GiGO)",
    description: "Máquinas clásicas de los 80-90s. Space Invaders, Pac-Man, Street Fighter y más.",
    category: "arcades",
    location: "Akihabara, Ikebukuro",
    price: "100-200 yenes/juego",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=retro+arcade+game&tag=viajapp-21" },
    ],
  },
  // Fashion extra
  {
    id: "fashion-lolita",
    title: "Moda Lolita (Gothic & Sweet)",
    description: "Vestidos de princesa victoriana, encajes y sombreros. Los hay Gothic (negro) y Sweet (pastel).",
    category: "fashion",
    location: "Harajuku, Laforet Musem",
    price: "10,000-100,000+ yenes (outfit completo)",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=lolita+fashion+japan&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=japan+lolita+fashion" },
    ],
  },
  {
    id: "fashion-visual-kei",
    title: "Visual Kei (Rock Visual)",
    description: "El estilo visual kei: maquillaje pesado, pelo extravagante y ropa de rockstar. Influencia de bands japonesas.",
    category: "fashion",
    location: "Harajuku, Shinjuku",
    price: "Variable",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=visual+kei+fashion&tag=viajapp-21" },
    ],
  },
  // Temples extra
  {
    id: "sword-temple",
    title: "Templo de la Espada (Zenkoku-ji)",
    description: "Un templo dedicado a las espadas japonesas. Puedes ver katanas históricas y comprar réplicas.",
    category: "temples",
    location: "Tokyo, Kamakura",
    price: "Entrada gratuita (500 yenes para exposición)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=katana+museum+japan" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=japanese+katana+replica&tag=viajapp-21" },
    ],
  },
  {
    id: "fox-temple",
    title: "Templo de los Zorros (Fushimi Inari)",
    description: "Miles de torii naranjas y estatuas de zorros. Los zorros son mensajeros del dios Inari.",
    category: "temples",
    location: "Kyoto",
    price: "Entrada gratuita",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=fushimi+inari+tour" },
    ],
  },
  {
    id: "suicide-forest",
    title: "Bosque de Aokigahara",
    description: "El 'Bosque de los Suicidios'. Un bosque denso al pie del Monte Fuji con un historial oscuro. Solo para valientes.",
    category: "temples",
    location: "Monte Fuji, Yamanashi",
    price: "Gratis (no recomendado ir solo)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=aokigahara+forest+tour" },
    ],
  },
  // Food extra
  {
    id: "shirako",
    title: "Shirako (Sacos de Leche de Pescado)",
    description: "Órganos reproductores de pescado, servidos en tempura, nabe o crudos. Una delicatesen polarizante.",
    category: "food",
    location: "Osaka, Tokio",
    price: "1,000-3,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=japanese+exotic+food+tour" },
    ],
  },
  {
    id: "natto",
    title: "Natto (Fermentados de Soja)",
    description: "Frijoles de soja fermentados con textura viscosa y olor fuerte. Los japoneses lo comen con arroz. Divisor de opiniones.",
    category: "food",
    location: "Toda Japón",
    price: "100-300 yenes",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=natto+fermented+soy&tag=viajapp-21" },
    ],
  },
  {
    id: "raw-horse",
    title: "Basashi (Caballo Crudo)",
    description: "Carne de caballo servida cruda con jengibre y salsa de soja. Especialidad de Kumamoto.",
    category: "food",
    location: "Kumamoto, Tokio",
    price: "800-2,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=kumamoto+food+tour" },
    ],
  },
  // ========== NUEVAS CATEGORÍAS ==========
  {
    id: "washlet-toilet",
    title: "Washlet (Aseos Inteligentes Toto)",
    description: "Los aseos japoneses más avanzados del mundo. Calefacción, bidet, secador, sonidos de agua y más.",
    category: "toilets",
    location: "Toda Japón",
    price: "Gratis (en konbini y restaurants)",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=toto+washlet+smart+toilet&tag=viajapp-21" },
      { name: "eBay", url: "https://www.ebay.com/sch/i.html?_nkw=toto+washlet+japan" },
    ],
  },
  {
    id: "toilet-music",
    title: "Aseos con Música (Otohime)",
    description: "Botón que reproduce sonidos de agua o música para ocultar ruidos. Cortesía japonesa extrema.",
    category: "toilets",
    location: "Toda Japón",
    price: "Gratis",
    affiliateLinks: [
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=otohime+sound+masking&tag=viajapp-21" },
    ],
  },
  {
    id: "toilet-simulator",
    title: "Museo de los Aseos (Tokyo Toilet)",
    description: "Los aseos públicos de Tokyo Toilet son obras de arquitectura. Algunos son transparentes (se opacan al usarlos).",
    category: "toilets",
    location: "Shibuya, Tokio",
    price: "Gratis",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=tokyo+toilet+architecture+tour" },
    ],
  },
  {
    id: "themed-train",
    title: "Trenes Temáticos (Hello Kitty, Evangelion)",
    description: "Trenes decorados con personajes de anime. Hello Kitty Shinkansen, Evangelion y más.",
    category: "trains",
    location: "Toda Japón",
    price: "Precio de billete normal",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=hello+kitty+shinkansen" },
      { name: "Klook", url: "https://www.klook.com/search/?q=japan+rail+pass" },
    ],
  },
  {
    id: "sleeper-train",
    title: "Trenes Cama (Sunrise Izumo)",
    description: "Duermes en el tren. Cabinas privadas con cama, lavabo y vistas al amanecer. Experiencia romántica.",
    category: "trains",
    location: "Tokio → Okayama/Izumo",
    price: "12,000-30,000 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=sunrise+izumo+train+japan" },
      { name: "Klook", url: "https://www.klook.com/search/?q=japan+sleeper+train" },
    ],
  },
  {
    id: "museum-cup-noodles",
    title: "Museo Cup Noodles (Yokohama)",
    description: "Diseña tu propio Cup Noodles. Elige el caldo, los toppings y decora el vaso. Divertidísimo.",
    category: "museums",
    location: "Yokohama",
    price: "500 yenes (entrada + 1 cup noodle)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=cup+noodles+museum+yokohama" },
      { name: "Amazon JP", url: "https://www.amazon.co.jp/s?k=cup+noodles+custom&tag=viajapp-21" },
    ],
  },
  {
    id: "museum-instant-ramen",
    title: "Museo del Ramen Instantáneo (Yokohama)",
    description: "Historia del ramen instantáneo y cómo se inventó. Exposiciones interactivas y tienda exclusiva.",
    category: "museums",
    location: "Yokohama",
    price: "500 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=yokohama+ramen+museum" },
    ],
  },
  {
    id: "museum-maid",
    title: "Museo del Anime (Ghibli Museum)",
    description: "El museo de Studio Ghibli. Películas originales, talleres y una reproducción del mundo de Miyazaki.",
    category: "museums",
    location: "Mitaka, Tokio",
    price: "1,000 yenes (solo con reserva)",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=ghibli+museum+tokyo" },
      { name: "Klook", url: "https://www.klook.com/search/?q=ghibli+museum" },
    ],
  },
  {
    id: "museum-robot",
    title: "Museo de Robots (Miraikan)",
    description: "El museo nacional de ciencia e innovación. Robots humanoides, ASIMO y tecnología futurista.",
    category: "museums",
    location: "Odaiba, Tokio",
    price: "630 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=miraikan+museum+tokyo" },
    ],
  },
  {
    id: "museum-toilet",
    title: "Museo del Fugu (Osaka)",
    description: "Museo dedicado al pez globo venenoso. Exposiciones sobre su historia, preparación y riesgos.",
    category: "museums",
    location: "Osaka",
    price: "600 yenes",
    affiliateLinks: [
      { name: "GetYourGuide", url: "https://www.getyourguide.com/s/?q=fugu+museum+osaka" },
    ],
  },
];

export default function FreakyPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = selectedCategory === "all"
    ? freakyItems
    : freakyItems.filter((item) => item.category === selectedCategory);

  const displayedItems = showAll ? filteredItems : filteredItems.slice(0, 9);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Japón Freaky 🇯🇵
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Lo más raro, único y fascinante de Japón. Vending machines de insectos, maid cafés,
          templos de la fertilidad y más.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setShowAll(false);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {categories.find((c) => c.id === item.category)?.icon}{" "}
                  {categories.find((c) => c.id === item.category)?.name}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <span>📍 {item.location}</span>
                <span>💰 {item.price}</span>
              </div>

              {/* Affiliate Links */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400 mb-2">Dónde comprar/experiencia:</p>
                <div className="flex flex-wrap gap-2">
                  {item.affiliateLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                    >
                      {link.name} →
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length > 9 && !showAll && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
          >
            Ver más ({filteredItems.length - 6} restantes)
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¿Quieres vivir estas experiencias?
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          ViajApp tiene guías completas para cada una de estas experiencias freaky.
          Descarga la app y no te pierdas nada.
        </p>
        <a
          href="https://japan-travel-web-lime.vercel.app"
          target="_blank"
          className="inline-block px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
        >
          Abrir ViajApp
        </a>
      </div>
    </div>
  );
}
