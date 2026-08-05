import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description: "Conoce al equipo detrás de ViajApp, tu guía de viaje a Japón. Somos viajeros apasionados que ayudan a otros a descubrir Japón de forma auténtica.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Quiénes Somos</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Nuestra Misión</h2>
          <p>
            <strong>ViajApp</strong> nació con un objetivo claro: hacer que viajar a Japón sea más fácil, auténtico y accesible para todos. No somos una agencia de viajes — somos viajeros que han recorrido Japón de punta a punta y queremos compartir lo que aprendimos.
          </p>
          <p>
            Creemos que la mejor forma de descubrir Japón no es seguir a una masa de turistas por los mismos spots, sino vivir como los locales: comer en konbini, pasear por barrios de verdad, y encontrar esos rincones que no aparecen en las guías tradicionales.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Qué Ofrecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <div className="text-xl mb-2">🗾</div>
              <h3 className="font-bold text-gray-900">Planificación de Viajes</h3>
              <p className="text-sm text-gray-600">Organiza tu itinerario día por día, calcula presupuestos, y reserva todo desde un solo lugar.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="text-xl mb-2">🎌</div>
              <h3 className="font-bold text-gray-900">Experiencias Auténticas</h3>
              <p className="text-sm text-gray-600">Descubre lo que hacen los japoneses de verdad: mercados locales, onsen de barrio, konbini life.</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="text-xl mb-2">🆓</div>
              <h3 className="font-bold text-gray-900">Free Tours</h3>
              <p className="text-sm text-gray-600">Tours gratuitos con guías locales en Tokio, Kioto, Osaka y más ciudades.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="text-xl mb-2">💳</div>
              <h3 className="font-bold text-gray-900">Wallet Digital</h3>
              <p className="text-sm text-gray-600">Guarda tus tickets, QR codes, y pases en un solo lugar. Con recordatorios automáticos.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Nuestros Valores</h2>
          <ul className="space-y-3">
            <li><strong>Autenticidad:</strong> Todo nuestro contenido está basado en experiencias reales, no en información genérica de internet.</li>
            <li><strong>Accesibilidad:</strong> La información está disponible en español, el idioma que hablamos los viajeros hispanohablantes.</li>
            <li><strong>Utilidad práctica:</strong> Cada página, cada herramienta, cada consejo está diseñado para resolver un problema real del viajero.</li>
            <li><strong>Respeto cultural:</strong> Promovemos un turismo respetuoso con la cultura y costumbres japonesas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Cómo Funciona ViajApp</h2>
          <p>
            ViajApp es una plataforma web y móvil (PWA) que funciona como tu compañero de viaje completo. Puedes:
          </p>
          <ul className="space-y-2">
            <li>🌤️ <strong>Ver el clima en tiempo real</strong> de cualquier ciudad japonesa</li>
            <li>🗣️ <strong>Traducir con la cámara</strong> usando OCR y síntesis de voz</li>
            <li>💰 <strong>Calcular tu presupuesto</strong> con conversión de divisas en tiempo real</li>
            <li>⛩️ <strong>Descubrir eventos y festivales</strong> según la estación</li>
            <li>🗺️ <strong>Explorar el mapa</strong> con restaurantes y lugares de interés</li>
            <li>💳 <strong>Guardar tus tickets y QR codes</strong> en la wallet digital</li>
            <li>🆓 <strong>Encontrar free tours</strong> en todas las ciudades principales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Contacto</h2>
          <p>
            ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros?
          </p>
          <div className="bg-gray-50 rounded-xl p-6 not-prose">
            <div className="space-y-3 text-sm">
              <div><strong>📧 Email:</strong> <a href="mailto:contacto@viajapp.app" className="text-blue-600 hover:underline">contacto@viajapp.app</a></div>
              <div><strong>🌐 Web:</strong> <a href="https://www.viajapp.app" className="text-blue-600 hover:underline">www.viajapp.app</a></div>
              <div><strong>📝 Blog:</strong> <a href="https://www.viajapp.app/blog" className="text-blue-600 hover:underline">viajapp.app/blog</a></div>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            ViajApp es un proyecto independiente, creado con pasión por los viajes y por Japón. No estamos afiliados al gobierno japonés ni a ninguna agencia oficial de turismo. Nuestro objetivo es ayudar viajeros hispanohablantes a tener la mejor experiencia posible en Japón.
          </p>
        </section>
      </div>
    </div>
  );
}
