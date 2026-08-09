import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { API_URL } from "@/lib/api";
import { blogPosts as localPosts } from "@/lib/blog";
import { generatedBlogPosts } from "@/lib/blog-generated";
import ToolCta from "@/components/blog/ToolCta";
import AffiliateRecommendations from "@/components/blog/AffiliateRecommendations";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  content: string;
  generated?: boolean;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const local = [...generatedBlogPosts, ...localPosts].map((p) => ({ ...p, content: p.content || "" }));
  try {
    const res = await fetch(`${API_URL}/v1/blog/posts`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      const apiPosts = (data.posts || []) as BlogPost[];
      const seen = new Set<string>();
      const merged: BlogPost[] = [];
      for (const p of [...local, ...apiPosts]) {
        if (p && p.slug && !seen.has(p.slug)) {
          seen.add(p.slug);
          merged.push(p);
        }
      }
      return merged;
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
  return local;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${API_URL}/v1/blog/posts/${slug}`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
  }
  const allLocal = [...generatedBlogPosts, ...localPosts];
  const local = allLocal.find((p) => p.slug === slug);
  return local ? { ...local, content: local.content || "" } : null;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post || !post.title) return {};
  return {
    title: post.title,
    description: post.description || "",
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

function renderInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]*\]\([^)]*\))/g).map((part, j) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      return <strong key={j}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]*)\]\(([^)]*)\)$/);
    if (linkMatch) {
      return (
        <a key={j} href={linkMatch[2]} target="_blank" rel="noopener noreferrer sponsored" className="text-red-600 hover:text-red-700 underline break-all">
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace("### ", "")}</h3>;
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, "")}</p>;
    if (line.startsWith("- ")) return <li key={i} className="text-gray-700 ml-4 mb-1 list-disc">{renderInline(line.replace("- ", ""))}</li>;
    if (line.match(/^\d+\./)) return <li key={i} className="text-gray-700 ml-4 mb-1 list-decimal">{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>;
    if (line.trim() === "") return <br key={i} />;
    const ctaMatch = line.match(/^\[cta:([a-z0-9]+)\]$/);
    if (ctaMatch) return <ToolCta key={i} tool={ctaMatch[1]} />;
    return <p key={i} className="text-gray-700 mb-2">{renderInline(line)}</p>;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-red-600 hover:text-red-700 text-sm font-medium mb-6 inline-block">← Volver al blog</Link>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description || "",
              datePublished: post.date,
              dateModified: post.date,
              image: "https://www.viajapp.app/og-image.svg",
              inLanguage: "es",
              mainEntityOfPage: `https://www.viajapp.app/blog/${post.slug}`,
              author: {
                "@type": "Organization",
                name: "ViajApp",
                url: "https://www.viajapp.app",
              },
              publisher: {
                "@type": "Organization",
                name: "ViajApp",
                url: "https://www.viajapp.app",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.viajapp.app/og-image.svg",
                },
              },
              keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.viajapp.app" },
                { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.viajapp.app/blog" },
                { "@type": "ListItem", position: 3, name: post.title, item: `https://www.viajapp.app/blog/${post.slug}` },
              ],
            },
          ]),
        }}
      />

      <article>
        <div className="mb-6">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">{post.category}</span>
          {post.generated && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600 ml-2">
              Nuevo
            </span>
          )}
          <span className="text-xs text-gray-400 ml-3">{post.readTime} de lectura</span>
          <span className="text-xs text-gray-400 ml-3">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-600 text-lg mb-8">{post.description}</p>

        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>
      </article>

      <AffiliateRecommendations category={post.category} />

      {otherPosts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artículos relacionados</h2>
          <div className="space-y-4">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
                <h3 className="font-bold text-gray-900">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{p.description.slice(0, 100)}...</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
