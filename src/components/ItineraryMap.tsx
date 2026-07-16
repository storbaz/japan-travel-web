"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  day: number;
  time: string;
  category: string;
}

interface ItineraryMapProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  showRoute?: boolean;
}

const categoryColors: Record<string, string> = {
  restaurante: "#f97316",
  transporte: "#3b82f6",
  alojamiento: "#8b5cf6",
  monumento: "#dc2626",
  tienda: "#10b981",
  otro: "#6b7280",
};

export default function ItineraryMap({ places, center = [35.6762, 139.6503], zoom = 6, showRoute = false }: ItineraryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current).setView(center, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapInstance.current);

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    mapInstance.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        mapInstance.current?.removeLayer(layer);
      }
    });

    if (places.length === 0) return;

    const bounds: L.LatLng[] = [];

    places.forEach((place) => {
      const color = categoryColors[place.category] || "#6b7280";
      const icon = L.divIcon({
        html: `<div style="background:${color};color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:13px;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)">${place.day}</div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([place.lat, place.lng], { icon })
        .addTo(mapInstance.current!)
        .bindPopup(`<b>${place.name}</b>`);

      bounds.push(L.latLng(place.lat, place.lng));
    });

    if (showRoute && places.length > 1) {
      const coords = places.map((p) => [p.lat, p.lng] as [number, number]);
      L.polyline(coords, { color: "#dc2626", weight: 3, opacity: 0.7, dashArray: "8, 8" }).addTo(mapInstance.current);
    }

    if (bounds.length > 0) {
      mapInstance.current.fitBounds(L.latLngBounds(bounds), { padding: [40, 40] });
    }
  }, [places, showRoute]);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-xl border border-gray-200 z-0" />
  );
}
