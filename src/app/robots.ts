import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile", "/favorites", "/itineraries", "/expenses"],
      },
    ],
    sitemap: "https://japan-travel-web-lime.vercel.app/sitemap.xml",
  };
}
