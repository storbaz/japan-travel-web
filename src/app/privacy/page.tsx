export const metadata = {
  title: "Politica de Privacidad - ViajApp",
  description: "Politica de privacidad de ViajApp, tu guia de viaje a Japon.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Politica de Privacidad</h1>
      <p className="text-sm text-gray-500 mb-8">Ultima actualizacion: 25 de julio de 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Informacion que recopilamos</h2>
          <p>ViajApp recopila la siguiente informacion:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Cuenta:</strong> Nombre, email y contrasena (encriptada) cuando te registras.</li>
            <li><strong>Ubicacion:</strong> Solo cuando el usuario lo activa voluntariamente para mostrar puntos cercanos en el mapa. No se almacena ni se comparte.</li>
            <li><strong>Datos de uso:</strong> Estadisticas anonimas de uso de la app (paginas visitadas, funciones utilizadas) para mejorar el servicio.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Como usamos tu informacion</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Para proporcionar y mejorar las funcionalidades de la app.</li>
            <li>Para personalizar tu experiencia (itinerarios, preferencias).</li>
            <li>Para enviar notificaciones relacionadas con tu viaje (solo si las autorizas).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Comparticion de datos</h2>
          <p>No vendemos ni compartimos tu informacion personal con terceros, excepto:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Cuando lo exija la ley.</li>
            <li>Con proveedores de servicios necesarios para el funcionamiento de la app (hosting, base de datos).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Almacenamiento y seguridad</h2>
          <p>Tus datos se almacenan en servidores seguros con encriptacion. Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion contra acceso no autorizado.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">5. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Acceder a tus datos personales.</li>
            <li>Solicitar la eliminacion de tus datos.</li>
            <li>Exportar tus datos en un formato estandar.</li>
            <li>Revocar el consentimiento en cualquier momento.</li>
          </ul>
          <p className="mt-2">Para ejercer estos derechos, contacta a: <strong>antpercor@gmail.com</strong></p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">6. Cookies y tecnologias similares</h2>
          <p>La app puede utilizar cookies y tecnologias similares para mejorar la experiencia del usuario y recopilar estadisticas anonimas de uso.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">7. Menores de edad</h2>
          <p>ViajApp no esta dirigida a menores de 13 anos. No recopilamos intencionadamente informacion de menores de edad.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">8. Cambios en esta politica</h2>
          <p>Nos reservamos el derecho de actualizar esta politica de privacidad. Cualquier cambio significativo sera notificado a los usuarios a traves de la app o por email.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">9. Contacto</h2>
          <p>Si tienes preguntas sobre esta politica de privacidad, contacta con:</p>
          <p className="mt-2">
            <strong>Email:</strong> antpercor@gmail.com<br />
            <strong>Web:</strong> https://viajapp.app
          </p>
        </section>
      </div>
    </div>
  );
}
