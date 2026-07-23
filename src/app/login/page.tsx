"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

declare global {
  interface Window {
    google?: any;
    handleGoogleCallback?: (response: any) => void;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const googleDivRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Credenciales invalidas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId || !window.google) return;

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: any) => {
        setGoogleLoading(true);
        try {
          await loginWithGoogle(response.credential);
          router.push("/");
        } catch (err: any) {
          setError(err.message || "Error con Google");
        } finally {
          setGoogleLoading(false);
        }
      },
    });

    if (googleDivRef.current) {
      window.google.accounts.id.renderButton(googleDivRef.current, {
        theme: "outline",
        size: "large",
        width: "100%",
        text: "continue_with",
      });
    }
  }, [loginWithGoogle, router]);

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">Entrar</h1>
      <p className="text-gray-600 mb-8 text-center">Accede a tu cuenta para guardar favoritos e itinerarios</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        {error && <div className="bg-red-50 text-red-700 rounded-lg p-3 text-sm">{error}</div>}

        <div className="flex justify-center">
          {googleLoading ? (
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600">
              <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Conectando con Google...
            </div>
          ) : (
            <div ref={googleDivRef} />
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">o continua con email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          No tienes cuenta? <Link href="/register" className="text-red-600 hover:underline">Registrate</Link>
        </p>
      </div>
    </div>
  );
}
