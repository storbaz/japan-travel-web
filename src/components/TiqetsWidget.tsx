"use client";

import { useEffect, useRef } from "react";

const TIQETS_PARTNER = "viajaapp-188875";
const TIQETS_LOADER = "https://widgets.tiqets.com/loader.js";

interface TiqetsWidgetProps {
  itemCount?: number;
  title?: string;
}

export default function TiqetsWidget({ itemCount = 6, title = "Entradas y experiencias recomendadas" }: TiqetsWidgetProps) {
  const loaderLoaded = useRef(false);

  useEffect(() => {
    if (loaderLoaded.current) return;
    loaderLoaded.current = true;
    const script = document.createElement("script");
    script.src = TIQETS_LOADER;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold text-gray-900 mb-1">🎟️ {title}</h2>
      <p className="text-sm text-gray-600 mb-4">Entradas con acceso rápido y sin colas. Precios y disponibilidad en tiempo real.</p>
      <div
        data-tiqets-widget="discovery"
        data-cards-layout="responsive"
        data-content-type="product"
        data-partner={TIQETS_PARTNER}
        data-item_count={itemCount}
        data-destination-type="recommendation"
        data-language="es"
        data-currency="EUR"
      />
    </div>
  );
}
