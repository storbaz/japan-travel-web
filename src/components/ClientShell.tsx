"use client";

import { ReactNode } from "react";
import SeasonalParticles from "@/components/SeasonalParticles";
import CharacterMascot from "@/components/CharacterMascot";
import SeasonalBackground from "@/components/SeasonalBackground";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SeasonalParticles />
      <SeasonalBackground />
      <div className="relative z-10">
        {children}
      </div>
      <CharacterMascot />
    </>
  );
}
