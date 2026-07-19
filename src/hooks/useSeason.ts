"use client";

import { useMemo } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

export interface SeasonTheme {
  season: Season;
  label: string;
  emoji: string;
  navbarFrom: string;
  navbarTo: string;
  accent: string;
  particles: string;
}

const THEMES: Record<Season, SeasonTheme> = {
  spring: {
    season: "spring",
    label: "Primavera",
    emoji: "🌸",
    navbarFrom: "#c06c84",
    navbarTo: "#f67280",
    accent: "#fda4af",
    particles: "sakura",
  },
  summer: {
    season: "summer",
    label: "Verano",
    emoji: "🎆",
    navbarFrom: "#c97b3d",
    navbarTo: "#d4a76a",
    accent: "#fbbf24",
    particles: "fireworks",
  },
  autumn: {
    season: "autumn",
    label: "Otoño",
    emoji: "🍁",
    navbarFrom: "#8b5e3c",
    navbarTo: "#c08552",
    accent: "#d97706",
    particles: "leaves",
  },
  winter: {
    season: "winter",
    label: "Invierno",
    emoji: "❄️",
    navbarFrom: "#3d5a80",
    navbarTo: "#98c1d9",
    accent: "#93c5fd",
    particles: "snow",
  },
};

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export function useSeason(): SeasonTheme {
  return useMemo(() => THEMES[getCurrentSeason()], []);
}
