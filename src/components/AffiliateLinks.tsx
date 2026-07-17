"use client";

interface AffiliateLinksProps {
  query: string;
  city: string;
  cityName: string;
}

const AFFILIATE = {
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
  return `${AFFILIATE.booking.base}ssne=${dest}&ssne_untouched=${dest}&dest_type=city&checkin=2026-04-01&checkout=2026-04-02&group_adults=2&no_rooms=1&group_children=0&nflt=ht_id%3D204`;
}

function getGetYourGuideUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `${AFFILIATE.getyourguide}s=${encodeURIComponent(dest)}&lc=${encodeURIComponent(dest)}`;
}

function getKlookUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `${AFFILIATE.klook}s?query=${encodeURIComponent(dest + " attractions")}`;
}

function getViatorUrl(query: string, city: string): string {
  const dest = CITY_SLUGS[city] || "Japan";
  return `${AFFILIATE.viator}s/${encodeURIComponent(dest)}/ttd`;
}

export default function AffiliateLinks({ query, city, cityName }: AffiliateLinksProps) {
  const category = detectCategory(query);

  const links = {
    hotel: [
      { ...AFFILIATE.booking, url: getBookingUrl(query, city) },
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
    ],
    tours: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.viator, url: getViatorUrl(query, city) },
    ],
    transport: [
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
    ],
    food: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.viator, url: getViatorUrl(query, city) },
    ],
    activities: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
    ],
    general: [
      { ...AFFILIATE.getyourguide, url: getGetYourGuideUrl(query, city) },
      { ...AFFILIATE.booking, url: getBookingUrl(query, city) },
      { ...AFFILIATE.klook, url: getKlookUrl(query, city) },
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
      <div className="text-[10px] text-gray-400 mt-2 text-center">Afiliado · Booking, GetYourGuide, Klook</div>
    </div>
  );
}
