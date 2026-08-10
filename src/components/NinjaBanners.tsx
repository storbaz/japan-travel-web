const NINJA_URL = "https://ninjawifi.com?pr_vmaf=mU1dqNuNqM";

const BANNERS = [
  { src: "/banners/ninja-esim.png", alt: "NINJA eSIM — datos ilimitados para Japón" },
  { src: "/banners/ninja-wifi.png", alt: "NINJA WiFi — Pocket WiFi para Japón" },
  { src: "/banners/shogun-sim.png", alt: "SHOGUN SIM — SIM física para Japón" },
  { src: "/banners/ninja-lineup.png", alt: "NINJA WiFi — eSIM, SIM y Pocket WiFi para Japón" },
];

export default function NinjaBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {BANNERS.map((banner) => (
        <a
          key={banner.src}
          href={NINJA_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-cyan-300 transition-all group"
        >
          <img
            src={banner.src}
            alt={banner.alt}
            loading="lazy"
            width={994}
            height={480}
            className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-300"
          />
        </a>
      ))}
    </div>
  );
}
