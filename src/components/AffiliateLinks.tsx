"use client";

interface AffiliateLinksProps {
  query: string;
  city: string;
  cityName: string;
}

const AFFILIATE = {
  amazon: {
    base: "https://www.amazon.co.jp/",
    label: "Amazon JP",
    icon: "📦",
    color: "bg-yellow-500 hover:bg-yellow-600",
    desc: "Productos japoneses y souvenirs",
  },
  booking: {
    base: "https://www.booking.com/searchresults.html?",
    label: "Booking.com",
    icon: "🏨",
    color: "bg-blue-600 hover:bg-blue-700",
    desc: "Hoteles con las mejores ofertas",
  },
  getyourguide: {
    base: "https://www.getyourguide.com/",
    label: "GetYourGuide",
    icon: "🎯",
    color: "bg-orange-500 hover:bg-orange-600",
    desc: "Tours y experiencias guiadas",
  },
  klook: {
    base: "https://www.klook.com/",
    label: "Klook",
    icon: "🎫",
    color: "bg-red-500 hover:bg-red-600",
    desc: "Pases de transporte y atracciones",
  },
  viator: {
    base: "https://www.viator.com/",
    label: "Viator",
    icon: "🗺️",
    color: "bg-green-600 hover:bg-green-700",
    desc: "Excursiones y actividades",
  },
};

const CITY_GYG_SLUGS: Record<string, string> = {
  tokyo: "tokyo-l193",
  osaka: "osaka-l1204",
  kyoto: "kyoto-l96826",
  hiroshima: "hiroshima-l32662",
  nagoya: "nagoya-l148",
  fukuoka: "fukuoka-l32581",
  sapporo: "sapporo-l843",
  nara: "nara-l1707",
  hakone: "hakone-l1875",
  kamakura: "kamakura-l846",
  nikko: "nikko-l847",
  kanazawa: "kanazawa-l32537",
  kobe: "kobe-l849",
  yokohama: "yokohama-l850",
  osaka_kansai: "osaka-l1204",
};

const CITY_SLUGS: Record<string, string> = {
  tokyo: "Tokyo",
  osaka: "Osaka",
  kyoto: "Kyoto",
  hiroshima: "Hiroshima",
  nagoya: "Nagoya",
  fukuoka: "Fukuoka",
  sapporo: "Sapporo",
  nara: "Nara",
  hakone: "Hakone",
  kamakura: "Kamakura",
  nikko: "Nikko",
  kanazawa: "Kanazawa",
  kobe: "Kobe",
  yokohama: "Yokohama",
  osaka_kansai: "Osaka",
};

const CATEGORIES = {
  hotel: ["hotel", "hostel", "ryokan", "accommodation", "hospedaje", "alojamiento", "inn"],
  tours: ["temple", "shrine", "tour", "castle", "museum", "palace", "jardín", "garden", "festival", "experiencia", "activity"],
  transport: ["train", "station", "airport", "bus", "metro", "subway", "pass", "transport"],
  food: ["ramen", "sushi", "restaurant", "cafe", "izakaya", "food", "comida", "restaurante", "cafetería"],
  activities: ["onsen", "spa", "theme park", "bowling", "karaoke", "gaming", "arcade", "ski", "snorkeling"],
};

function detectCategory(query: string): string {
  const q = query.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((k) => q.includes(k))) return cat;
  }
  return "general";
}

function getBookingUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `https://www.booking.com/searchresults.html?ssne=${encodeURIComponent(dest)}&ssne_untouched=${encodeURIComponent(dest)}&dest_type=city&group_adults=2&no_rooms=1&group_children=0&aid=3049503`;
}

function getAmazonUrl(query: string, city: string): string {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(query + " " + (city || "japan"))}&tag=viajapp-21`;
}

function getGetYourGuideUrl(query: string, city: string): string {
  const dest = CITY_GYG_SLUGS[city] || "japan";
  return `https://www.getyourguide.com/${dest}/?q=${encodeURIComponent(query)}&partner_id=NRWCY1R`;
}

function getKlookUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `https://www.klook.com/en-US/search/?query=${encodeURIComponent(dest + " " + query)}&aid=128948`;
}

function getViatorUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `https://www.viator.com/searchResults/all?text=${encodeURIComponent(dest + " " + query)}`;
}

export default function AffiliateLinks({ query, city, cityName }: AffiliateLinksProps) {
  const category = detectCategory(query);

  const links = {
    hotel: [
      { ...AFFILIATE.booking, url: getBookingUrl(query, city) },
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
    ],
    tours: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.viator, url: getViatorUrl(query, city) },
    ],
    transport: [
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
    ],
    food: [
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.viator, url: getViatorUrl(query, city) },
    ],
    activities: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
    ],
    general: [
      { ...AFFILIATE.amazon, url: getAmazonUrl(query, city) },
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.booking, url: getBookingUrl(query, city) },
    ],
  };

  const items = links[category as keyof typeof links] || links.general;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💡</span>
        <span className="font-semibold text-gray-800 text-sm">
          Ofertas en {cityName || "Japón"} para &quot;{query}&quot;
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`flex items-center gap-3 ${item.color} text-white px-4 py-3 rounded-lg transition text-sm font-medium`}
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <div>{item.label}</div>
              <div className="text-xs opacity-80">{item.desc}</div>
            </div>
            <span className="text-xs opacity-70">→</span>
          </a>
        ))}
      </div>
      <div className="text-[10px] text-gray-400 mt-2 text-center">Afiliado · Amazon, Booking, GetYourGuide, Klook</div>
    </div>
  );
}
