import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/register", "/profile", "/wallet", "/delete-account", "/forgot-to-buy"],
      },
    ],
    sitemap: "https://www.viajapp.app/sitemap.xml",
  };
}
