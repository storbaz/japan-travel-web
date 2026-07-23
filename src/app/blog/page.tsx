"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { blogPosts as localPosts } from "@/lib/blog";
import { generatedBlogPosts } from "@/lib/blog-generated";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  generated?: boolean;
}

const categoryColors: Record<string, string> = {
  Ahorro: "bg-green-100 text-green-700",
  Guias: "bg-blue-100 text-blue-700",
  Planificacion: "bg-purple-100 text-purple-700",
  Idioma: "bg-yellow-100 text-yellow-700",
  Comida: "bg-orange-100 text-orange-700",
  Consejos: "bg-red-100 text-red-700",
  Curiosidades: "bg-pink-100 text-pink-700",
  Cultura: "bg-indigo-100 text-indigo-700",
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/v1/blog/posts`);
        if (res.ok) {
          const data = await res.json();
          const apiPosts = data.posts || [];
          if (apiPosts.length > 0) {
            setPosts(apiPosts);
          } else {
            setPosts([...generatedBlogPosts, ...localPosts] as BlogPost[]);
          }
        } else {
          setPosts([...generatedBlogPosts, ...localPosts] as BlogPost[]);
        }
      } catch (error) {
        setPosts([...generatedBlogPosts, ...localPosts] as BlogPost[]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Blog de ViajApp</h1>
      <p className="text-gray-600 mb-8">Guías, consejos y todo lo que necesitas saber para viajar a Japón</p>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-red-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                {post.category}
              </span>
              {post.generated && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                  Nuevo
                </span>
              )}
              <span className="text-xs text-gray-400">{post.readTime} de lectura</span>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-red-600 transition">{post.title}</h2>
            <p className="text-gray-600 text-sm">{post.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">#{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
