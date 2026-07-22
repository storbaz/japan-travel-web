"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Send via mailto as fallback (no backend endpoint needed for contact)
    const mailtoUrl = `mailto:contacto@viajapp.app?subject=${encodeURIComponent(`[ViajApp] ${form.subject}`)}&body=${encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Contacto</h1>
      <p className="text-gray-600 mb-8">¿Preguntas, sugerencias o quieres colaborar? Escríbenos.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-green-900 mb-2">Mensaje enviado</h2>
              <p className="text-green-700">Gracias por escribirnos. Te responderemos lo antes posible.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition">
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="Pregunta general">Pregunta general</option>
                  <option value="Sugerencia de contenido">Sugerencia de contenido</option>
                  <option value="Reportar un error">Reportar un error</option>
                  <option value="Colaboración">Colaboración / Partnerships</option>
                  <option value="Press / Media">Press / Media</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6} placeholder="Escribe tu mensaje aquí..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50">
                {loading ? "Enviando..." : "📧 Enviar mensaje"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">📧 Email directo</h3>
            <a href="mailto:contacto@viajapp.app" className="text-blue-600 hover:underline text-sm">contacto@viajapp.app</a>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">🌐 Redes</h3>
            <div className="space-y-2 text-sm">
              <a href="https://www.viajapp.app/blog" className="block text-blue-600 hover:underline">📝 Blog en ViajApp</a>
              <a href="https://dev.to/viajapptravel" className="block text-blue-600 hover:underline">📝 Blog en Dev.to</a>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-5 border border-red-100">
            <h3 className="font-bold text-red-900 mb-2">🗾 ¿Viajas a Japón?</h3>
            <p className="text-sm text-red-700 mb-3">Usa ViajApp para planificar tu viaje. Es gratis y siempre lo será.</p>
            <a href="/trip-planner" className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              Organizar mi viaje →
            </a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">ℹ️ Info legal</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <a href="/about" className="block hover:text-gray-900">Quiénes somos</a>
              <a href="mailto:contacto@viajapp.app" className="block hover:text-gray-900">Contacto</a>
              <p className="text-xs text-gray-400 mt-2">© 2025-2026 ViajApp. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
