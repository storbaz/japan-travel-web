"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_URL, apiFetch } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  city: string;
  tags: string;
  likes: number;
  created_at: string;
  users?: { name: string };
}

const categories = [
  { id: "all", label: "Todos", emoji: "📋" },
  { id: "general", label: "General", emoji: "💡" },
  { id: "food", label: "Comida", emoji: "🍜" },
  { id: "transport", label: "Transporte", emoji: "🚄" },
  { id: "budget", label: "Ahorro", emoji: "💰" },
  { id: "culture", label: "Cultura", emoji: "🎌" },
  { id: "safety", label: "Seguridad", emoji: "🏥" },
  { id: "shopping", label: "Compras", emoji: "🛍️" },
];

export default function CommunityPage() {
  const { user, token } = useAuth();
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchTips = async () => {
    try {
      const res = await fetch(`${API_URL}/v1/community-tips`);
      if (res.ok) {
        const data = await res.json();
        setTips(data.tips || []);
      }
    } catch {}
    setLoading(false);
  };

  useEffect(() => { fetchTips(); }, []);

  const submitTip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSubmitting(true);
    setMsg("");
    try {
      await apiFetch("/v1/community-tips", {
        method: "POST",
        body: JSON.stringify({ title, content, category, city }),
      });
      setMsg("Consejo publicado! Gracias por compartir.");
      setTitle(""); setContent(""); setCity(""); setCategory("general"); setShowForm(false);
      fetchTips();
    } catch (err: any) {
      setMsg(err.message || "Error al publicar");
    }
    setSubmitting(false);
  };

  const likeTip = async (tipId: string) => {
    try {
      const res = await fetch(`${API_URL}/v1/community-tips/${tipId}/like`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setTips(tips.map((t) => t.id === tipId ? { ...t, likes: data.likes } : t));
      }
    } catch {}
  };

  const filtered = selectedCategory === "all" ? tips : tips.filter((t) => t.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">💬 Consejos de la Comunidad</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Tips reales de viajeros que ya estuvieron en Japon. Comparte los tuyos!</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id ? "bg-red-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-200 hover:border-red-300"}`}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {user && (
        <div className="mb-8">
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="w-full bg-white rounded-xl border border-dashed border-gray-300 p-4 text-gray-500 hover:border-red-300 hover:text-red-600 transition-all text-center">
              + Compartir un consejo
            </button>
          ) : (
            <form onSubmit={submitTip} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titulo</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Mi consejo..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Tokio, Kioto..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Consejo</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Cuenta tu experiencia o consejo..." />
              </div>
              <div className="flex items-center gap-3">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  {categories.filter((c) => c.id !== "all").map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
                </select>
                <button type="submit" disabled={submitting} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition disabled:opacity-50">
                  {submitting ? "Publicando..." : "Publicar"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 text-sm">Cancelar</button>
              </div>
              {msg && <p className="text-sm text-green-600">{msg}</p>}
            </form>
          )}
        </div>
      )}

      {!user && (
        <div className="mb-8 text-center bg-gray-50 rounded-xl p-4">
          <p className="text-gray-500 text-sm"><Link href="/login" className="text-red-600 hover:underline">Inicia sesion</Link> para compartir tus propios consejos.</p>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="bg-gray-100 rounded-xl h-28"></div>)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💡</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">No hay consejos aun</h2>
          <p className="text-gray-500">Se el primero en compartir!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((tip) => (
            <div key={tip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{tip.title}</h3>
                    {tip.city && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{tip.city}</span>}
                  </div>
                  <p className="text-sm text-gray-600">{tip.content}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <span>{tip.users?.name || "Anonimo"}</span>
                    <span>{new Date(tip.created_at).toLocaleDateString("es-ES")}</span>
                    {tip.tags && <span>{tip.tags}</span>}
                  </div>
                </div>
                <button onClick={() => likeTip(tip.id)} className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-red-500 transition ml-4">
                  <span className="text-lg">❤️</span>
                  <span className="text-xs font-medium">{tip.likes || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
