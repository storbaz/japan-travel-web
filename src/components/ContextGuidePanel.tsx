"use client";

import { useMemo } from "react";
import { CONTEXT_GUIDES } from "@/lib/context-guides";
import { survivalPOIs } from "@/lib/survival-kit-data";
import { SurvivalPOI, getCategoryConfig } from "@/lib/survival-kit-types";

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function speakJapanese(text: string) {
  if ("speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  }
}

interface Props {
  userPos: [number, number] | null;
  visible: boolean;
  onClose: () => void;
}

export default function ContextGuidePanel({ userPos, visible, onClose }: Props) {
  const nearestPOI = useMemo(() => {
    if (!userPos) return null;
    let closest: (SurvivalPOI & { distance: number }) | null = null;
    for (const poi of survivalPOIs) {
      const dist = haversineDistance(userPos[0], userPos[1], poi.lat, poi.lng);
      if (dist < 0.5 && (!closest || dist < closest.distance)) {
        closest = { ...poi, distance: dist };
      }
    }
    return closest;
  }, [userPos]);

  const guide = useMemo(() => {
    if (!nearestPOI) return null;
    return CONTEXT_GUIDES.find((g) => g.category === nearestPOI.category) || null;
  }, [nearestPOI]);

  if (!visible || !userPos || !nearestPOI || !guide) return null;

  const config = getCategoryConfig(nearestPOI.category);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 max-h-[70vh] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-100" style={{ backgroundColor: config.bgColor }}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{guide.icon}</span>
          <div>
            <div className="font-bold text-gray-900">{guide.title}</div>
            <div className="text-sm text-gray-600">📍 {nearestPOI.name} ({nearestPOI.distance.toFixed(0)}m de ti)</div>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 shadow-sm">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">📋 Lo que debes saber</h4>
          <div className="space-y-2">
            {guide.rules.map((rule, i) => (
              <div key={i} className={`rounded-xl p-3 border ${rule.important ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-100"}`}>
                <div className="flex items-start gap-2">
                  {rule.important && <span className="text-amber-500 text-sm mt-0.5">⚠️</span>}
                  <div>
                    <div className="font-bold text-sm text-gray-900">{rule.title}</div>
                    <div className="text-sm text-gray-600">{rule.content}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-3">🗣️ Frases utiles</h4>
          <div className="space-y-2">
            {guide.phrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => speakJapanese(phrase.jp)}
                className="w-full text-left bg-white rounded-xl p-3 border border-gray-100 hover:shadow-md transition"
              >
                <div className="font-bold text-gray-900">{phrase.jp}</div>
                <div className="text-sm text-gray-500 italic">{phrase.romaji}</div>
                <div className="text-gray-700">{phrase.es}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
