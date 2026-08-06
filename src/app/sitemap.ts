import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { generatedBlogPosts } from "@/lib/blog-generated";
import { API_URL } from "@/lib/api";

const BASE_URL = "https://www.viajapp.app";

async function getApiBlogPosts(): Promise<{ slug: string; date: string }[]> {
  try {
    const res = await fetch(`${API_URL}/v1/blog/posts`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const data = await res.json();
      const posts = data.posts || [];
      return posts.map((p: { slug?: string; date?: string; created_at?: string }) => ({
        slug: p.slug || "",
        date: p.date || p.created_at || "",
      })).filter((p: { slug: string }) => p.slug);
    }
  } catch (error) {
    console.error("Error fetching API blog posts for sitemap:", error);
  }
  return [];
}

const placeSlugs = [
  "senso-ji",
  "fushimi-inari",
  "shibuya-crossing",
  "arashiyama-bamboo",
  "dotonbori",
];

const blogUrl = (slug: string) => `${BASE_URL}/blog/${encodeURIComponent(slug)}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiPosts = await getApiBlogPosts();

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
    { path: "/hiroshima", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/nara", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/fukuoka", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/hakone", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/kanazawa", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/tools", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/reservations", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/shared-expenses", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/community", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/equipaje", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/horario", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/lockers", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/hecho-en-japon", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/errores", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/meteorologo", priority: 0.8, changeFrequency: "daily" as const },
    { path: "/distancia", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/alojamiento", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/mapa-util", priority: 0.9, changeFrequency: "monthly" as const },
  ];

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...blogPosts.map((post) => ({
      url: blogUrl(post.slug),
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...generatedBlogPosts.map((post) => ({
      url: blogUrl(post.slug),
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...apiPosts.map((post) => ({
      url: blogUrl(post.slug),
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...placeSlugs.map((slug) => ({
      url: `${BASE_URL}/place/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
