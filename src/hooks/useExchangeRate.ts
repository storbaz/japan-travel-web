"use client";

import { useState, useEffect, useCallback } from "react";

const RATE_CACHE_KEY = "jpy_eur_rate";
const RATE_CACHE_TIME = "jpy_eur_rate_time";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

function getCachedRate(): number | null {
  if (typeof window === "undefined") return null;
  const rate = localStorage.getItem(RATE_CACHE_KEY);
  const time = localStorage.getItem(RATE_CACHE_TIME);
  if (rate && time && Date.now() - parseInt(time) < CACHE_DURATION) {
    return parseFloat(rate);
  }
  return null;
}

function setCachedRate(rate: number) {
  localStorage.setItem(RATE_CACHE_KEY, rate.toString());
  localStorage.setItem(RATE_CACHE_TIME, Date.now().toString());
}

// Fallback rates (updated: July 2026)
const FALLBACK_RATE = 0.0062; // 1 JPY ≈ 0.0062 EUR

export function useExchangeRate() {
  const [rate, setRate] = useState<number>(FALLBACK_RATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = getCachedRate();
    if (cached) {
      setRate(cached);
      setLoading(false);
      return;
    }

    fetch("https://api.exchangerate-api.com/v4/latest/JPY")
      .then((res) => res.json())
      .then((data) => {
        if (data.rates?.EUR) {
          const newRate = data.rates.EUR;
          setRate(newRate);
          setCachedRate(newRate);
        }
      })
      .catch(() => {
        // Use fallback
      })
      .finally(() => setLoading(false));
  }, []);

  return { rate, loading };
}

export function yenToEur(yen: number, rate: number): string {
  const eur = yen * rate;
  if (eur >= 100) return `~${Math.round(eur)}€`;
  if (eur >= 10) return `~${eur.toFixed(0)}€`;
  return `~${eur.toFixed(2)}€`;
}

export function formatPriceWithEur(yenText: string, rate: number): string {
  // Extract numbers from text like "500-1,000 yenes" or "300 yenes"
  const numbers = yenText.match(/[\d,]+/g);
  if (!numbers || numbers.length === 0) return yenText;

  const parseNum = (s: string) => parseInt(s.replace(/,/g, ""), 10);

  if (numbers.length === 1) {
    const yen = parseNum(numbers[0]);
    return `${yenText} (${yenToEur(yen, rate)})`;
  }

  if (numbers.length === 2) {
    const min = parseNum(numbers[0]);
    const max = parseNum(numbers[1]);
    const eurMin = yenToEur(min, rate);
    const eurMax = yenToEur(max, rate);
    return `${yenText} (${eurMin}-${eurMax})`;
  }

  return yenText;
}
