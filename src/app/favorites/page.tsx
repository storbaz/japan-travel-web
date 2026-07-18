"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { SkeletonCards } from "@/components/Skeleton";

export default function FavoritesPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    apiFetch("/v1/favorites")
      .then((data) => { setFavorites(data.favorites || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [token, router]);

  const removeFavorite = async (id: string) => {
    try {
      await apiFetch(`/v1/favorites/${id}`, { method: "DELETE" });
      setFavorites(favorites.filter((f) => f.id !== id));
    } catch {}
  };

  if (!user) return <div className="max-w-5xl mx-auto px-4 py-12"><SkeletonCards count={3} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">❤️ Mis Favoritos</h1>
      <p className="text-gray-600 mb-8">Cosas que te gustaria hacer o ver en Japon</p>

      {loading ? (
        <SkeletonCards count={3} />
      ) : favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">♡</div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Sin favoritos aun</h2>
          <p className="text-gray-500">Explora las guias y guarda lo que mas te guste</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((fav) => (
            <div key={fav.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
              <div>
                <span className="text-xs bg-gray-100 rounded-full px-2 py-1 mr-2">{fav.item_type}</span>
                <span className="font-medium">{fav.item_id}</span>
              </div>
              <button onClick={() => removeFavorite(fav.id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
