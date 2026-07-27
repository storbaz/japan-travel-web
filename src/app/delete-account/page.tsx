"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { API_URL } from "@/lib/api";

export default function DeleteAccountPage() {
  const { user, token, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/v1/auth/delete-account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.detail || "Error al eliminar la cuenta");
        return;
      }

      setDone(true);
      logout();
    } catch {
      setError("Error de conexion. Intentalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Eliminar cuenta y datos</h1>
      <p className="text-sm text-gray-500 mb-8">
        Sigue los pasos a continuacion para solicitar la eliminacion completa de tu cuenta y todos tus datos personales.
      </p>

      {done ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="font-bold text-green-800 text-lg">Cuenta eliminada</h2>
          <p className="text-sm text-green-700 mt-2">
            Tu cuenta y todos tus datos han sido eliminados permanentemente.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-3">Datos que se eliminan</h2>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Cuenta de usuario</strong> — email, nombre, password hasheado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Itinerarios</strong> — todos tus planes de viaje guardados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Listas de la compra</strong> — todas tus listas y articulos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Consejos de comunidad</strong> — tips que hayas publicado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Resenas</strong> — reviews que hayas escrito</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Gastos compartidos</strong> — grupos y transacciones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">•</span>
                <span><strong>Favoritos</strong> — lugares guardados</span>
              </li>
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              La eliminacion es permanente e inmediata. No se puede deshacer.
            </p>
          </div>

          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de tu cuenta
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contrasena
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none"
                placeholder="Tu contrasena"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Eliminando..." : "Eliminar mi cuenta y todos mis datos"}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-2">Otros metodos</h3>
            <p className="text-sm text-gray-600">
              Si prefieres, tambien puedes solicitar la eliminacion de tus datos enviando un email a{" "}
              <a href="mailto:antpercor@gmail.com?subject=Solicitud%20eliminacion%20datos%20ViajApp" className="text-red-600 underline">
                antpercor@gmail.com
              </a>{" "}
              con el asunto "Solicitud eliminacion datos ViajApp" desde el email asociado a tu cuenta.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Los datos se eliminan de forma permanente e inmediata una vez verificada tu identidad.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
