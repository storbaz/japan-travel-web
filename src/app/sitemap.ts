import { MetadataRoute } from "next";

const BASE_URL = "https://www.viajapp.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/today", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/trip-planner", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/search", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/phrases", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/translator", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/budget", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/food", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/transport", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/weather", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/emergency", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/currency", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/visa", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/packing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/restaurants", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tips", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/map", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/jr-pass", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/free-tours", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/authentic", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/wallet", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/favorites", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/flights", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/freaky", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/login", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/register", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/seasons", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/sports", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/culture", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/history", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/nature", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/shopping", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/forgot-to-buy", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tokyo", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/kyoto", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/osaka", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/reservations", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/itineraries", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/profile", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/expenses", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
