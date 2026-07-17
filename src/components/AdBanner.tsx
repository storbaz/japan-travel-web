"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({ slot, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // @ts-expect-error adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {}
  }, []);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  if (!client) return null;

  return (
    <div className={`ad-container my-6 ${className}`}>
      <div className="text-center text-xs text-gray-400 mb-1">Publicidad</div>
      <div ref={adRef} className="flex justify-center overflow-hidden rounded-lg">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
