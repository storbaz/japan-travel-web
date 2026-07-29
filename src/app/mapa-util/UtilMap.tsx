"use client";

import { useEffect, useRef, useMemo } from "react";
import { UtilPOI } from "@/lib/mapa-util-data";

interface Props {
  pois: UtilPOI[];
  userPos?: [number, number] | null;
}

export default function UtilMap({ pois, userPos }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const CATEGORY_CONFIG: Record<string, { color: string; icon: string }> = {
    atm: { color: "#16a34a", icon: "💴" },
    charging: { color: "#2563eb", icon: "🔌" },
    sento: { color: "#dc2626", icon: "♨️" },
  };

  const center = useMemo(() => {
    if (pois.length === 0) return [35.6762, 139.6503] as [number, number];
    const avgLat = pois.reduce((s, p) => s + p.lat, 0) / pois.length;
    const avgLng = pois.reduce((s, p) => s + p.lng, 0) / pois.length;
    return [avgLat, avgLng] as [number, number];
  }, [pois]);

  useEffect(() => {
    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstance.current) return;

      const map = L.map(mapRef.current, { zoomControl: true }).setView(center as [number, number], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://openstreetmap.org">OSM</a>',
        maxZoom: 19,
      }).addTo(map);
      mapInstance.current = map;

      if (userPos) {
        L.marker(userPos as [number, number], { icon: L.divIcon({ className: "", html: "📍", iconSize: [20, 20] }) })
          .addTo(map)
          .bindPopup("Tu ubicación");
      }
    };
    init();
    return () => { mapInstance.current?.remove(); mapInstance.current = null; };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const L = require("leaflet");

    markersRef.current.forEach((m) => mapInstance.current.removeLayer(m));
    markersRef.current = [];

    if (pois.length === 0) return;

    const group = L.featureGroup();
    pois.forEach((poi) => {
      const cfg = CATEGORY_CONFIG[poi.category];
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:${cfg.color};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${cfg.icon}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      const marker = L.marker([poi.lat, poi.lng], { icon }).bindPopup(`
        <b>${poi.name}</b><br/>
        <span style="font-size:12px;color:#666">${poi.address}</span><br/>
        ${poi.hours ? `<span style="font-size:12px">🕐 ${poi.hours}</span><br/>` : ""}
        ${poi.fee ? `<span style="font-size:12px">💰 ${poi.fee}</span><br/>` : ""}
        <span style="font-size:12px">${poi.notes}</span>
      `);
      markersRef.current.push(marker);
      group.addLayer(marker);
    });

    group.addTo(mapInstance.current);
    const bounds = group.getBounds();
    if (bounds.isValid()) mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
  }, [pois]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "12px", zIndex: 0 }} />;
}
