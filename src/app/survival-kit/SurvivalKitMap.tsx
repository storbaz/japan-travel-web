"use client";

import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { CATEGORIES, getCategoryConfig, POICategory, SurvivalPOI } from "@/lib/survival-kit-types";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cityCoords: Record<string, [number, number]> = {
  tokyo: [35.6762, 139.6503], kyoto: [35.0116, 135.7681],
  osaka: [34.6937, 135.5023], nara: [34.6851, 135.8048],
  hiroshima: [34.3853, 132.4553], kanazawa: [36.5613, 136.6562],
  nagoya: [35.1815, 136.9066], hakone: [35.2330, 139.1067],
  fukuoka: [33.5904, 130.4017],
};

const cityNames: Record<string, string> = {
  tokyo: "Tokio", kyoto: "Kioto", osaka: "Osaka", nara: "Nara",
  hiroshima: "Hiroshima", kanazawa: "Kanazawa", nagoya: "Nagoya",
  hakone: "Hakone", fukuoka: "Fukuoka",
};

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) { map.setView([36.5, 137.5], 6); return; }
    if (points.length === 1) { map.setView(points[0], 10); return; }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  }, [map, points]);
  return null;
}

function createPOIIcon(category: POICategory) {
  const config = getCategoryConfig(category);
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${config.color};color:white;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);">${config.icon}</div>`,
    iconSize: [32, 32], iconAnchor: [16, 16],
  });
}

interface Props {
  activeCategories: Set<POICategory>;
  selectedCity: string;
}

export default function SurvivalKitMap({ activeCategories, selectedCity }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredPOIs = useMemo(() => {
    return survivalPOIs.filter((poi) => {
      const catMatch = activeCategories.size === 0 || activeCategories.has(poi.category);
      const cityMatch = selectedCity === "all" || poi.city === selectedCity;
      return catMatch && cityMatch;
    });
  }, [activeCategories, selectedCity]);

  const points: [number, number][] = useMemo(() => {
    if (selectedCity !== "all" && cityCoords[selectedCity]) {
      return [cityCoords[selectedCity]];
    }
    return filteredPOIs.map((p) => [p.lat, p.lng]);
  }, [filteredPOIs, selectedCity]);

  if (!mounted) return <div className="h-[450px] bg-gray-100 rounded-xl animate-pulse" />;

  const center: [number, number] = points.length > 0 ? points[0] : [36.5, 137.5];
  const zoom = selectedCity !== "all" ? 12 : points.length > 0 ? 6 : 6;

  return (
    <div>
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <MapContainer center={center} zoom={zoom} style={{ height: "450px", width: "100%" }} scrollWheelZoom={true} className="z-0">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitBounds points={points} />
          {filteredPOIs.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lng]} icon={createPOIIcon(poi.category)}>
              <Popup>
                <div style={{ fontFamily: "system-ui", minWidth: "200px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>{getCategoryConfig(poi.category).icon} {poi.name}</div>
                  {poi.description && <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{poi.description}</div>}
                  <div style={{ fontSize: "11px", color: "#999" }}>{cityNames[poi.city] || poi.city}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {filteredPOIs.length > 0 && (
        <p className="text-sm text-gray-500 mt-2">{filteredPOIs.length} puntos de interes en el mapa</p>
      )}
    </div>
  );
}
