"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";

export default function ProfilePage() {
  const { user, token, logout, updateUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) { router.push("/login"); return; }
    if (user) setName(user.name);
  }, [token, user, router]);

  const [favoritesCount, setFavoritesCount] = useState(0);
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavoritesCount(Array.isArray(favs) ? favs.length : 0);
    } catch { setFavoritesCount(0); }
  }, []);

  const saveProfile = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await apiFetch("/v1/auth/me", {
        method: "PUT",
        body: JSON.stringify({ name }),
      });
      updateUser({ ...user!, name });
      setSuccess("Perfil actualizado");
      setEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="max-w-2xl mx-auto px-4 py-12 text-center text-gray-400">Cargando...</div>;

  const initials = user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 h-24" />

        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-6">
            <div className="w-20 h-20 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">{initials}</span>
            </div>
            <div className="pb-1">
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500">Plan actual</div>
              <div className="font-bold text-lg capitalize">{user.plan}</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-500">Favoritos</div>
              <div className="font-bold text-lg">{favoritesCount}</div>
            </div>
          </div>

          {success && <div className="bg-green-50 text-green-700 rounded-lg p-3 text-sm mb-4">{success}</div>}
          {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm mb-4">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              {editing ? (
                <div className="flex gap-2">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-2" />
                  <button onClick={saveProfile} disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50">
                    {loading ? "Guardando..." : "Guardar"}
                  </button>
                  <button onClick={() => { setEditing(false); setName(user.name); }} className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition">
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <span>{user.name}</span>
                  <button onClick={() => setEditing(true)} className="text-red-600 text-sm hover:underline">Editar</button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-600">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
              <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-600">••••••••</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-2">
            <button onClick={() => router.push("/favorites")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
              <span className="text-xl">❤️</span> Mis Favoritos
            </button>
            <button onClick={() => router.push("/itineraries")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
              <span className="text-xl">📋</span> Mis Itinerarios
            </button>
            <button onClick={() => router.push("/expenses")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition flex items-center gap-3">
              <span className="text-xl">💸</span> Mis Gastos
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <button onClick={() => { logout(); router.push("/"); }} className="w-full bg-red-50 text-red-700 py-3 rounded-lg font-medium hover:bg-red-100 transition">
              Cerrar Sesion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
