export type PaymentType = "card" | "cash_only" | "mixed" | "atm";

export interface CashCardPOI {
  id: string;
  name: string;
  type: PaymentType;
  city: string;
  lat: number;
  lng: number;
  description: string;
  tip?: string;
}

export const PAYMENT_CONFIG: Record<PaymentType, { label: string; icon: string; color: string; bgColor: string }> = {
  card: { label: "Acepta tarjeta", icon: "💳", color: "#16a34a", bgColor: "#dcfce7" },
  cash_only: { label: "Solo efectivo", icon: "💴", color: "#dc2626", bgColor: "#fef2f2" },
  mixed: { label: "Mixto", icon: "🔄", color: "#d97706", bgColor: "#fef3c7" },
  atm: { label: "ATM cercano", icon: "🏧", color: "#2563eb", bgColor: "#eff6ff" },
};

export const cashCardPOIs: CashCardPOI[] = [
  // ══════════════════════════════════════════
  // TOKIO
  // ══════════════════════════════════════════

  // Card-friendly
  { id: "tk-c1", name: "7-Eleven Shibuya", type: "card", city: "tokyo", lat: 35.6617, lng: 139.7036, description: "Konbini. Acepta tarjetas internacionales en caja.", tip: "Los 7-Eleven siempre aceptan tarjeta" },
  { id: "tk-c2", name: "FamilyMart Shinjuku", type: "card", city: "tokyo", lat: 35.6938, lng: 139.7034, description: "Konbini. Tarjeta aceptada.", tip: "FamilyMart acepta tarjeta en caja automatica" },
  { id: "tk-c3", name: "Lawson Ginza", type: "card", city: "tokyo", lat: 35.6717, lng: 139.7649, description: "Konbini. Tarjeta aceptada.", tip: "Lawson acepta tarjeta en caja" },
  { id: "tk-c4", name: "Don Quijote Shibuya", type: "card", city: "tokyo", lat: 35.6590, lng: 139.6984, description: "Tienda de descuentos. Acepta todo.", tip: "Don Quijote acepta tarjeta y tiene tax-free" },
  { id: "tk-c5", name: "Uniqlo Ginza", type: "card", city: "tokyo", lat: 35.6717, lng: 139.7630, description: "Moda japonesa. Tarjeta aceptada.", tip: "Uniqlo acepta tarjeta en todas sus tiendas" },
  { id: "tk-c6", name: "MUJI Ginza", type: "card", city: "tokyo", lat: 35.6695, lng: 139.7633, description: "Hogar y moda. Tarjeta aceptada.", tip: "MUJI acepta tarjeta" },
  { id: "tk-c7", name: "Starbucks Shibuya", type: "card", city: "tokyo", lat: 35.6580, lng: 139.7016, description: "Cafe. Tarjeta aceptada.", tip: "Starbucks siempre acepta tarjeta" },
  { id: "tk-c8", name: "McDonald's Shinjuku", type: "card", city: "tokyo", lat: 35.6932, lng: 139.7000, description: "Comida rapida. Tarjeta aceptada.", tip: "McDonald's acepta tarjeta y IC cards" },
  { id: "tk-c9", name: "Tokyu Hands Shibuya", type: "card", city: "tokyo", lat: 35.6590, lng: 139.6999, description: "Tienda de souvenirs y manualidades. Tarjeta aceptada.", tip: "Tokyu Hands acepta tarjeta" },
  { id: "tk-c10", name: "Bic Camera Shinjuku", type: "card", city: "tokyo", lat: 35.6880, lng: 139.6999, description: "Electronica. Tarjeta aceptada.", tip: "Bic Camera acepta tarjeta y tiene tax-free" },

  // Cash-only
  { id: "tk-x1", name: "Tsukiji Outer Market", type: "cash_only", city: "tokyo", lat: 35.6654, lng: 139.7707, description: "Mercado de pescado. La mayoria de puestos son cash.", tip: "Lleva efectivo, casi todos los puestos son cash-only" },
  { id: "tk-x2", name: "Senso-ji (ofrendas)", type: "cash_only", city: "tokyo", lat: 35.7148, lng: 139.7967, description: "Templo. Ofrendas y amuletos son cash.", tip: "Los templos casi siempre son cash-only para ofrendas" },
  { id: "tk-x3", name: "Yatai Omoide Yokocho", type: "cash_only", city: "tokyo", lat: 35.6932, lng: 139.6975, description: "Callejon de bares pequenos. Solo efectivo.", tip: "Los izakayas pequenos son cash-only" },
  { id: "tk-x4", name: "Ameya Yokocho (Ameyoko)", type: "cash_only", city: "tokyo", lat: 35.6631, lng: 139.7110, description: "Mercado callejero. Efectivo en casi todos los puestos.", tip: "Mercado callejero, lleva efectivo" },
  { id: "tk-x5", name: "Yanaka Ginza", type: "cash_only", city: "tokyo", lat: 35.7265, lng: 139.7654, description: "Calle comercial antigua. Puestos de snacks.", tip: "Calle comercial tradicional, cash en la mayoria" },

  // Mixed
  { id: "tk-m1", name: "Tsuruha Drug Shibuya", type: "mixed", city: "tokyo", lat: 35.6612, lng: 139.7015, description: "Farmacia. Algunas sucursales aceptan tarjeta.", tip: "Pregunta antes, no todas las cajas aceptan tarjeta" },
  { id: "tk-m2", name: "Matsumoto Kiyoshi Shinjuku", type: "mixed", city: "tokyo", lat: 35.6935, lng: 139.7010, description: "Farmacia grande. Algunas aceptan tarjeta.", tip: "Las sucursales grandes aceptan tarjeta" },

  // ATMs
  { id: "tk-a1", name: "7-Eleven ATM Shibuya", type: "atm", city: "tokyo", lat: 35.6619, lng: 139.7037, description: "ATM de 7-Eleven. Acepta tarjetas extranjeras 24/7.", tip: "El ATM de 7-Eleven es el mas fiable para extranjeros" },
  { id: "tk-a2", name: "JP Post ATM Shinjuku", type: "atm", city: "tokyo", lat: 35.6900, lng: 139.7010, description: "ATM de Japan Post. Acepta tarjetas extranjeras.", tip: "JP Post ATM acepta tarjetas Visa/Mastercard" },

  // ══════════════════════════════════════════
  // KIOTO
  // ══════════════════════════════════════════

  { id: "ky-c1", name: "7-Eleven Kyoto Station", type: "card", city: "kyoto", lat: 34.9858, lng: 135.7588, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "ky-c2", name: "FamilyMart Gion", type: "card", city: "kyoto", lat: 35.0036, lng: 135.7753, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "ky-c3", name: "Don Quijote Kyoto", type: "card", city: "kyoto", lat: 35.0036, lng: 135.7690, description: "Tienda de descuentos. Tarjeta aceptada.", tip: "" },
  { id: "ky-c4", name: "Starbucks Kawaramachi", type: "card", city: "kyoto", lat: 35.0050, lng: 135.7720, description: "Cafe. Tarjeta aceptada.", tip: "" },

  { id: "ky-x1", name: "Fushimi Inari (ofrendas)", type: "cash_only", city: "kyoto", lat: 34.9671, lng: 135.7727, description: "Templo. Ofrendas y amuletos son cash.", tip: "Los templos son cash-only para ofrendas" },
  { id: "ky-x2", name: "Nishiki Market (puestos)", type: "cash_only", city: "kyoto", lat: 35.0054, lng: 135.7644, description: "Mercado de comida. La mayoria de puestos son cash.", tip: "Los puestos de comida del mercado son cash" },
  { id: "ky-x3", name: "Pontocho (izakayas)", type: "cash_only", city: "kyoto", lat: 35.0045, lng: 135.7700, description: "Callejon de bares. La mayoria es cash.", tip: "Los izakayas tradicionales son cash-only" },
  { id: "ky-x4", name: "Kiyomizu-dera (ofrendas)", type: "cash_only", city: "kyoto", lat: 34.9949, lng: 135.7850, description: "Templo. Ofrendas cash.", tip: "" },
  { id: "ky-x5", name: "Arashiyama Bamboo Grove (puestos)", type: "cash_only", city: "kyoto", lat: 35.0170, lng: 135.6713, description: "Puestos de snacks cerca del bosque.", tip: "Los puestos callejeros son cash" },

  { id: "ky-a1", name: "7-Eleven ATM Kyoto Station", type: "atm", city: "kyoto", lat: 34.9859, lng: 135.7589, description: "ATM 24/7. Acepta tarjetas extranjeras.", tip: "" },

  // ══════════════════════════════════════════
  // OSAKA
  // ══════════════════════════════════════════

  { id: "os-c1", name: "7-Eleven Namba", type: "card", city: "osaka", lat: 34.6686, lng: 135.5013, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "os-c2", name: "FamilyMart Dotonbori", type: "card", city: "osaka", lat: 34.6687, lng: 135.5034, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "os-c3", name: "Don Quijote Dotonbori", type: "card", city: "osaka", lat: 34.6689, lng: 135.5032, description: "Tienda de descuentos. Tarjeta aceptada.", tip: "" },
  { id: "os-c4", name: "Uniqlo Shinsaibashi", type: "card", city: "osaka", lat: 34.6730, lng: 135.5022, description: "Moda. Tarjeta aceptada.", tip: "" },
  { id: "os-c5", name: "McDonald's Namba", type: "card", city: "osaka", lat: 34.6660, lng: 135.5019, description: "Comida rapida. Tarjeta aceptada.", tip: "" },

  { id: "os-x1", name: "Kuromon Market", type: "cash_only", city: "osaka", lat: 34.6654, lng: 135.5063, description: "Mercado de pescado. La mayoria de puestos es cash.", tip: "Mercado callejero, lleva efectivo" },
  { id: "os-x2", name: "Dotonbori (yatais)", type: "cash_only", city: "osaka", lat: 34.6687, lng: 135.5032, description: "Puestos de comida callejera. Cash.", tip: "Los yatais son cash-only" },
  { id: "os-x3", name: "Shinsekai (izakayas)", type: "cash_only", city: "osaka", lat: 34.6527, lng: 135.5063, description: "Barrio de izakayas. La mayoria es cash.", tip: "Los izakayas de Shinsekai son cash" },
  { id: "os-x4", name: "Sumiyoshi Taisha (ofrendas)", type: "cash_only", city: "osaka", lat: 34.6137, lng: 135.4929, description: "Templo. Ofrendas cash.", tip: "" },

  { id: "os-a1", name: "7-Eleven ATM Namba", type: "atm", city: "osaka", lat: 34.6687, lng: 135.5014, description: "ATM 24/7.", tip: "" },

  // ══════════════════════════════════════════
  // HIROSHIMA
  // ══════════════════════════════════════════

  { id: "hi-c1", name: "7-Eleven Peace Park", type: "card", city: "hiroshima", lat: 34.3955, lng: 132.4534, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "hi-c2", name: "FamilyMart Hiroshima Station", type: "card", city: "hiroshima", lat: 34.3977, lng: 132.4760, description: "Konbini. Tarjeta aceptada.", tip: "" },

  { id: "hi-x1", name: "Okonomimura (puestos)", type: "cash_only", city: "hiroshima", lat: 34.3930, lng: 132.4563, description: "Edificio de okonomiyaki. Varios puestos son cash.", tip: "Algunos puestos aceptan tarjeta, otros no" },
  { id: "hi-x2", name: "Hiroshima Peace Park (ofrendas)", type: "cash_only", city: "hiroshima", lat: 34.3912, lng: 132.4531, description: "Ofrendas y flores son cash.", tip: "" },

  { id: "hi-a1", name: "7-Eleven ATM Hiroshima", type: "atm", city: "hiroshima", lat: 34.3978, lng: 132.4761, description: "ATM 24/7.", tip: "" },

  // ══════════════════════════════════════════
  // NARA
  // ══════════════════════════════════════════

  { id: "na-c1", name: "7-Eleven Nara Station", type: "card", city: "nara", lat: 34.6831, lng: 135.8048, description: "Konbini. Tarjeta aceptada.", tip: "" },

  { id: "na-x1", name: "Nara Park (puestos de senbei)", type: "cash_only", city: "nara", lat: 34.6851, lng: 135.8430, description: "Puestos de galletas para ciervos. Cash.", tip: "Los puestos de senbei del parque son cash-only" },
  { id: "na-x2", name: "Todai-ji (ofrendas)", type: "cash_only", city: "nara", lat: 34.6891, lng: 135.8398, description: "Templo. Ofrendas cash.", tip: "" },
  { id: "na-x3", name: "Kasuga Taisha (ofrendas)", type: "cash_only", city: "nara", lat: 34.6811, lng: 135.8497, description: "Templo. Ofrendas cash.", tip: "" },

  { id: "na-a1", name: "ATM Nara Station", type: "atm", city: "nara", lat: 34.6832, lng: 135.8049, description: "ATM en la estacion.", tip: "" },

  // ══════════════════════════════════════════
  // KANAZAWA
  // ══════════════════════════════════════════

  { id: "kz-c1", name: "7-Eleven Kanazawa Station", type: "card", city: "kanazawa", lat: 36.5781, lng: 136.6479, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "kz-c2", name: "FamilyMart Korinbo", type: "card", city: "kanazawa", lat: 36.5620, lng: 136.6544, description: "Konbini. Tarjeta aceptada.", tip: "" },

  { id: "kz-x1", name: "Omicho Market", type: "cash_only", city: "kanazawa", lat: 36.5654, lng: 136.6534, description: "Mercado de pescado. La mayoria es cash.", tip: "Mercado tradicional, lleva efectivo" },
  { id: "kz-x2", name: "Higashi Chaya (puestos)", type: "cash_only", city: "kanazawa", lat: 36.5740, lng: 136.6640, description: "Barrio de geishas. Tiendas de artesanias.", tip: "Las tiendas de artesanias son cash" },
  { id: "kz-x3", name: "Kenroku-en (puestos)", type: "cash_only", city: "kanazawa", lat: 36.5622, lng: 136.6628, description: "Jardin. Puestos de snacks.", tip: "" },

  { id: "kz-a1", name: "JP Post ATM Kanazawa", type: "atm", city: "kanazawa", lat: 36.5780, lng: 136.6480, description: "ATM en la estacion.", tip: "" },

  // ══════════════════════════════════════════
  // NAGOYA
  // ══════════════════════════════════════════

  { id: "ng-c1", name: "7-Eleven Sakae", type: "card", city: "nagoya", lat: 35.1669, lng: 136.9085, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "ng-c2", name: "Don Quijote Nagoya", type: "card", city: "nagoya", lat: 35.1695, lng: 136.9083, description: "Tienda de descuentos. Tarjeta aceptada.", tip: "" },

  { id: "ng-x1", name: "Osu Shopping Street", type: "cash_only", city: "nagoya", lat: 35.1620, lng: 136.9025, description: "Calle comercial. Muchas tiendas pequeñas son cash.", tip: "Las tiendas de segunda mano son cash" },
  { id: "ng-x2", name: "Atsuta Shrine (ofrendas)", type: "cash_only", city: "nagoya", lat: 35.1250, lng: 136.9078, description: "Templo. Ofrendas cash.", tip: "" },

  { id: "ng-a1", name: "7-Eleven ATM Nagoya Station", type: "atm", city: "nagoya", lat: 35.1709, lng: 136.8816, description: "ATM 24/7.", tip: "" },

  // ══════════════════════════════════════════
  // HAKONE
  // ══════════════════════════════════════════

  { id: "hk-c1", name: "7-Eleven Hakone-Yumoto", type: "card", city: "hakone", lat: 35.2330, lng: 139.1067, description: "Konbini. Tarjeta aceptada.", tip: "" },

  { id: "hk-x1", name: "Hakone Open Air Museum (puestos)", type: "cash_only", city: "hakone", lat: 35.2450, lng: 139.0460, description: "Museo al aire libre. Puestos de snacks.", tip: "El museo acepta tarjeta, pero los puestos interiores son cash" },
  { id: "hk-x2", name: "Onsen tradicionales", type: "cash_only", city: "hakone", lat: 35.2320, lng: 139.1050, description: "Muchos onsen pequenos son solo efectivo.", tip: "Los onsen tradicionales son cash-only" },

  { id: "hk-a1", name: "ATM Hakone-Yumoto", type: "atm", city: "hakone", lat: 35.2331, lng: 139.1068, description: "ATM en la estacion.", tip: "" },

  // ══════════════════════════════════════════
  // FUKUOKA
  // ══════════════════════════════════════════

  { id: "fk-c1", name: "7-Eleven Hakata", type: "card", city: "fukuoka", lat: 33.5898, lng: 130.4207, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "fk-c2", name: "FamilyMart Tenjin", type: "card", city: "fukuoka", lat: 33.5904, lng: 130.3989, description: "Konbini. Tarjeta aceptada.", tip: "" },
  { id: "fk-c3", name: "Don Quijote Tenjin", type: "card", city: "fukuoka", lat: 33.5891, lng: 130.3990, description: "Tienda de descuentos. Tarjeta aceptada.", tip: "" },

  { id: "fk-x1", name: "Yatai Nakasu", type: "cash_only", city: "fukuoka", lat: 33.5935, lng: 130.4100, description: "Puestos de ramen en la calle. Solo efectivo.", tip: "Los yatai de Fukuoka son cash-only" },
  { id: "fk-x2", name: "Yatai Tenjin", type: "cash_only", city: "fukuoka", lat: 33.5910, lng: 130.3985, description: "Puestos de ramen. Solo efectivo.", tip: "Lleva efectivo, los yatai no aceptan tarjeta" },
  { id: "fk-x3", name: "Kushida Shrine (ofrendas)", type: "cash_only", city: "fukuoka", lat: 33.5931, lng: 130.4100, description: "Templo. Ofrendas cash.", tip: "" },
  { id: "fk-x4", name: "Canal City Hakata (puestos)", type: "mixed", city: "fukuoka", lat: 33.5893, lng: 130.4110, description: "Centro comercial. Tiendas aceptan tarjeta, puestos interiores cash.", tip: "Las tiendas grandes aceptan tarjeta, los puestos de comida内は cash" },

  { id: "fk-a1", name: "JP Post ATM Hakata", type: "atm", city: "fukuoka", lat: 33.5898, lng: 130.4208, description: "ATM en la estacion.", tip: "" },
];
