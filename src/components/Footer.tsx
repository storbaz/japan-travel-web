import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-3">Explorar</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/trip-planner" className="block hover:text-white transition">🗾 Planificar Viaje</Link>
              <Link href="/free-tours" className="block hover:text-white transition">🆓 Free Tours</Link>
              <Link href="/authentic" className="block hover:text-white transition">🎌 Lo Auténtico</Link>
              <Link href="/today" className="block hover:text-white transition">📱 Hoy en Japón</Link>
              <Link href="/blog" className="block hover:text-white transition">📝 Blog</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Herramientas</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/translator" className="block hover:text-white transition">🌐 Traductor</Link>
              <Link href="/jr-pass" className="block hover:text-white transition">🚄 JR Pass</Link>
              <Link href="/budget" className="block hover:text-white transition">💰 Presupuesto</Link>
              <Link href="/wallet" className="block hover:text-white transition">💳 Wallet</Link>
              <Link href="/map" className="block hover:text-white transition">🗺️ Mapa</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">Información</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/visa" className="block hover:text-white transition">🛂 Visa</Link>
              <Link href="/weather" className="block hover:text-white transition">🌤️ Clima</Link>
              <Link href="/transport" className="block hover:text-white transition">🚄 Transporte</Link>
              <Link href="/currency" className="block hover:text-white transition">💱 Moneda</Link>
              <Link href="/emergency" className="block hover:text-white transition">🏥 Emergencias</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-3">ViajApp</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/about" className="block hover:text-white transition">Quiénes Somos</Link>
              <Link href="/contact" className="block hover:text-white transition">Contacto</Link>
              <Link href="/privacy" className="block hover:text-white transition">Politica de Privacidad</Link>
              <Link href="/delete-account" className="block hover:text-white transition">Eliminar cuenta y datos</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="font-bold text-lg">ViajApp</span>
            <span className="text-gray-500 text-sm ml-2">Tu guía de viaje a Japón</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} ViajApp. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
