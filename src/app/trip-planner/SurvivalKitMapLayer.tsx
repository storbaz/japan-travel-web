"use client";

import { useMemo } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { getCategoryConfig, POICategory } from "@/lib/survival-kit-types";

function createPOIIcon(category: POICategory) {
  const config = getCategoryConfig(category);
  return L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${config.color};color:white;
      display:flex;align-items:center;justify-content:center;
      font-size:16px;border:2px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    ">${config.icon}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

interface SurvivalKitMapLayerProps {
  routeCities: string[];
  activeCategories: Set<POICategory>;
}

export default function SurvivalKitMapLayer({ routeCities, activeCategories }: SurvivalKitMapLayerProps) {
  const map = useMap();

  const filteredPOIs = useMemo(() => {
    const citySet = new Set(routeCities);
    return survivalPOIs.filter((poi) => citySet.has(poi.city) && activeCategories.has(poi.category));
  }, [routeCities, activeCategories]);

  return (
    <>
      {filteredPOIs.map((poi) => {
        const config = getCategoryConfig(poi.category);
        return (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lng]}
            icon={createPOIIcon(poi.category)}
            eventHandlers={{
              click: () => {
                map.setView([poi.lat, poi.lng], 15, { animate: true });
              },
            }}
          >
            <Popup>
              <div style={{ fontFamily: "system-ui", minWidth: "180px" }}>
                <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px" }}>
                  {config.icon} {poi.name}
                </div>
                {poi.description && (
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                    {poi.description}
                  </div>
                )}
                <div style={{ fontSize: "11px", color: "#999" }}>
                  {poi.city.charAt(0).toUpperCase() + poi.city.slice(1)}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
