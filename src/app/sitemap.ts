import { MetadataRoute } from "next";

const BASE_URL = "https://japan-travel-web-lime.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/search",
    "/phrases",
    "/translator",
    "/budget",
    "/events",
    "/food",
    "/transport",
    "/weather",
    "/emergency",
    "/currency",
    "/visa",
    "/packing",
    "/restaurants",
    "/tips",
    "/map",
    "/login",
    "/register",
  ];

  return staticPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
