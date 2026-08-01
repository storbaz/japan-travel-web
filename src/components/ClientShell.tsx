"use client";

import { ReactNode } from "react";
import SeasonalParticles from "@/components/SeasonalParticles";
import SeasonalBackground from "@/components/SeasonalBackground";

export default function ClientShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SeasonalParticles />
      <SeasonalBackground />
      <div className="relative z-10 main-content page-enter">
        {children}
      </div>
    </>
  );
}
