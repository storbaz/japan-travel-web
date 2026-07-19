"use client";

import { useSeason } from "@/hooks/useSeason";

export default function SeasonalBackground() {
  const { season } = useSeason();

  const patterns: Record<string, string> = {
    spring: `
      radial-gradient(circle at 20% 80%, rgba(253,164,175,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(244,114,182,0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 50%)
    `,
    summer: `
      radial-gradient(circle at 20% 80%, rgba(251,146,60,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(239,68,68,0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 50%)
    `,
    autumn: `
      radial-gradient(circle at 20% 80%, rgba(217,119,6,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(180,83,9,0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(220,38,38,0.04) 0%, transparent 50%)
    `,
    winter: `
      radial-gradient(circle at 20% 80%, rgba(147,197,253,0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(191,219,254,0.06) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(224,242,254,0.04) 0%, transparent 50%)
    `,
  };

  const waveColors: Record<string, string> = {
    spring: "rgba(253,164,175,0.05)",
    summer: "rgba(251,146,60,0.05)",
    autumn: "rgba(217,119,6,0.05)",
    winter: "rgba(147,197,253,0.05)",
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: patterns[season] }}
      />
      <svg
        className="fixed bottom-0 left-0 w-full pointer-events-none z-0 opacity-30"
        viewBox="0 0 1440 320"
        style={{ maxHeight: "120px" }}
      >
        <path
          fill={waveColors[season]}
          d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"
        />
      </svg>
    </>
  );
}
