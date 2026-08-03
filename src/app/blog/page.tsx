"use client";

import { useState, useEffect, useMemo } from "react";
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

const POSTS_PER_PAGE = 4;

const CATEGORY_JP: Record<string, string> = {
  Todos: "Todos",
  Guias: "Guías",
  Ahorro: "Ahorro",
  Planificacion: "Planificación",
  Idioma: "Idioma",
  Comida: "Comida",
  Consejos: "Consejos",
  Curiosidades: "Curiosidades",
  Cultura: "Cultura",
};

const CATEGORY_JP_ACCENT: Record<string, string> = {
  Todos: "すべて",
  Guias: "ガイド",
  Ahorro: "節約",
  Planificacion: "計画",
  Idioma: "言葉",
  Comida: "料理",
  Consejos: "知恵",
  Curiosidades: "雑学",
  Cultura: "文化",
};

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function mergePosts(...sources: BlogPost[][]): BlogPost[] {
  const seen = new Set<string>();
  const merged: BlogPost[] = [];
  for (const src of sources) {
    for (const p of src) {
      if (p && p.slug && !seen.has(p.slug)) {
        seen.add(p.slug);
        merged.push(p);
      }
    }
  }
  return merged.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("Todos");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const local = [...generatedBlogPosts, ...localPosts] as BlogPost[];
      try {
        const res = await fetch(`${API_URL}/v1/blog/posts`);
        if (res.ok) {
          const data = await res.json();
          const apiPosts = (data.posts || []) as BlogPost[];
          setPosts(mergePosts(local, apiPosts));
        } else {
          setPosts(mergePosts(local));
        }
      } catch (error) {
        setPosts(mergePosts(local));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category))).filter(Boolean);
    return ["Todos", ...cats];
  }, [posts]);

  const filtered = useMemo(
    () => (activeCat === "Todos" ? posts : posts.filter((p) => p.category === activeCat)),
    [posts, activeCat]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages - 1);
  const visiblePosts = filtered.slice(
    currentPage * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE + POSTS_PER_PAGE
  );

  const selectCat = (cat: string) => {
    setActiveCat(cat);
    setPage(0);
  };

  const goToPage = (p: number) => {
    if (p < 0 || p >= totalPages) return;
    setPage(p);
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="washi-paper rounded-2xl border border-[#d8c9a8] p-6 sm:p-10">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#e6dcc4] dark:bg-[#2a3548] rounded-lg h-28"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <div
              aria-hidden="true"
              className="w-12 h-12 rounded-md bg-[#b5332e] text-[#f8f2e4] flex items-center justify-center text-2xl font-serif font-bold shadow-md rotate-3 ring-2 ring-[#b5332e]/30"
            >
              旅
            </div>
            <span className="mt-1 text-[10px] tracking-widest text-[#b5332e] font-medium">VIAJAR</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-gray-100">
            Blog para Viajar a Japón
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
          Guías, consejos y todo lo que necesitas saber para viajar a Japón: itinerarios, presupuesto, transporte y cultura
        </p>
        <div className="flex items-center justify-center gap-3 mt-5" aria-hidden="true">
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#b5332e]/60 to-[#b5332e]/60"></span>
          <span className="w-2 h-2 rotate-45 border border-[#b5332e]/70"></span>
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#b5332e]/60 to-[#b5332e]/60"></span>
        </div>
      </header>

      <div className="relative mt-8 washi-paper rounded-2xl border border-[#d8c9a8] dark:border-[#3a4658] shadow-xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b5332e] via-[#c9a227] to-[#b5332e] opacity-80"></div>

        <div className="absolute right-3 top-10 bottom-10 hidden md:flex items-center" aria-hidden="true">
          <span className="ja-vertical text-sm font-serif tracking-widest text-[#b5332e]/70">旅の手帳</span>
        </div>

        <div className="p-3 sm:p-4">
          <div className="border border-[#cdbc93] dark:border-[#45536a] rounded-xl px-4 sm:px-8 pt-6 pb-5 sm:pt-8 sm:pb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xs font-serif tracking-widest text-[#b5332e] border border-[#b5332e]/50 rounded px-2 py-0.5">
                Secciones
              </span>
              <span className="text-sm font-serif text-gray-600 dark:text-gray-300">Índice del blog</span>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6" role="tablist" aria-label="Secciones del blog">
              {categories.map((cat) => {
                const active = cat === activeCat;
                const count = cat === "Todos" ? posts.length : filtered.length;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCat(cat)}
                    className={`shrink-0 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-[#b5332e] border-[#b5332e] text-[#f8f2e4] shadow-md"
                        : "bg-white/60 dark:bg-[#2a3548] border-[#cdbc93] dark:border-[#45536a] text-gray-700 dark:text-gray-200 hover:border-[#b5332e]/60 hover:text-[#b5332e] dark:hover:text-[#e0a1a0]"
                    }`}
                  >
                    <span className="font-serif">{CATEGORY_JP[cat] || cat}</span>
                    <span className="text-[10px] font-serif opacity-60 hidden sm:inline">{CATEGORY_JP_ACCENT[cat] || ""}</span>
                    <span className={`text-[10px] font-medium rounded px-1 ${active ? "bg-white/20" : "bg-[#b5332e]/10 text-[#b5332e] dark:text-[#e0a1a0]"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {visiblePosts.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-16">
                Esta sección aún no tiene artículos.
              </p>
            ) : (
              <div key={`${activeCat}-${currentPage}`} className="page-flip grid gap-4 sm:grid-cols-2" aria-live="polite">
                {visiblePosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group relative block bg-white/70 dark:bg-[#2a3548] rounded-lg border border-[#cdbc93] dark:border-[#45536a] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-[#b5332e]/50"
                  >
                    <div className="absolute top-3 right-3" aria-hidden="true">
                      <span className="inline-block w-2 h-2 rotate-45 bg-[#b5332e]/70"></span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-serif tracking-wider text-[#b5332e] border border-[#b5332e]/40 rounded px-1.5 py-0.5">
                        {CATEGORY_JP[post.category] || post.category}
                      </span>
                      <span className="text-[10px] font-serif text-gray-400 dark:text-gray-500">{CATEGORY_JP_ACCENT[post.category] || ""}</span>
                      {post.generated && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#b5332e]/10 text-[#b5332e] dark:text-[#e0a1a0]">
                          Nuevo
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-serif font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug group-hover:text-[#b5332e] dark:group-hover:text-[#e0a1a0] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{post.description}</p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e5d9bd] dark:border-[#45536a]/60">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime} de lectura</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-serif">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#e5d9bd] dark:border-[#45536a]/60">
              <div className="text-xs font-serif tracking-widest text-gray-500 dark:text-gray-400">
                Página {currentPage + 1} / {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  aria-label="Página anterior"
                  className="tap-target w-10 h-10 flex items-center justify-center rounded-lg border border-[#cdbc93] dark:border-[#45536a] text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-[#2a3548] hover:border-[#b5332e]/60 hover:text-[#b5332e] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Página siguiente"
                  className="tap-target w-10 h-10 flex items-center justify-center rounded-lg border border-[#cdbc93] dark:border-[#45536a] text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-[#2a3548] hover:border-[#b5332e]/60 hover:text-[#b5332e] transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#b5332e] via-[#c9a227] to-[#b5332e] opacity-80"></div>
      </div>
    </div>
  );
}
