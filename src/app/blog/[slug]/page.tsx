import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { API_URL } from "@/lib/api";
import { blogPosts as localPosts } from "@/lib/blog";

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
  try {
    const res = await fetch(`${API_URL}/v1/blog/posts`, {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      const posts = data.posts || [];
      if (posts.length > 0) return posts;
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
  }
  return localPosts.map((p) => ({ ...p, content: p.content || "" }));
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
  const local = localPosts.find((p) => p.slug === slug);
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
    title: `${post.title} | ViajApp`,
    description: post.description || "",
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

function renderContent(content: string) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.replace("## ", "")}</h2>;
    if (line.startsWith("### ")) return <h3 key={i} className="text-xl font-bold text-gray-800 mt-6 mb-3">{line.replace("### ", "")}</h3>;
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-bold text-gray-900 mt-4 mb-2">{line.replace(/\*\*/g, "")}</p>;
    if (line.startsWith("- ")) return <li key={i} className="text-gray-700 ml-4 mb-1 list-disc">{line.replace("- ", "")}</li>;
    if (line.match(/^\d+\./)) return <li key={i} className="text-gray-700 ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-gray-700 mb-2">{line.replace(/\*\*(.*?)\*\*/g, "$1")}</p>;
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
