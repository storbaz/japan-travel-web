"use client";

import { useEffect, useRef, useState } from "react";
import { useSeason } from "@/hooks/useSeason";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
}

export default function SeasonalParticles() {
  const { particles } = useSeason();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let items: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 35;
    for (let i = 0; i < particleCount; i++) {
      items.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 12 + 6,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawSakura = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#ffb7c5";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.4, p.size * 0.25, p.size * 0.5, (i * 72 * Math.PI) / 180, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#ff69b4";
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawSnow = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * p.size * 0.7, Math.sin(angle) * p.size * 0.7);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawLeaf = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      const colors = ["#dc2626", "#ea580c", "#d97706", "#b45309"];
      ctx.fillStyle = colors[Math.floor(p.wobble * 10) % colors.length];
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.5);
      ctx.bezierCurveTo(p.size * 0.5, -p.size * 0.3, p.size * 0.4, p.size * 0.3, 0, p.size * 0.5);
      ctx.bezierCurveTo(-p.size * 0.4, p.size * 0.3, -p.size * 0.5, -p.size * 0.3, 0, -p.size * 0.5);
      ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.4);
      ctx.lineTo(0, p.size * 0.4);
      ctx.stroke();
      ctx.restore();
    };

    const drawFirework = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      const colors = ["#fbbf24", "#f97316", "#ef4444", "#a855f7", "#ec4899"];
      ctx.fillStyle = colors[Math.floor(p.wobble * 10) % colors.length];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180;
        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * p.size * 0.5,
          Math.sin(angle) * p.size * 0.5,
          p.size * 0.1,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawFns: Record<string, (p: Particle) => void> = {
      sakura: drawSakura,
      snow: drawSnow,
      leaves: drawLeaf,
      fireworks: drawFirework,
    };

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        animId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const drawFn = drawFns[particles];
      for (const p of items) {
        p.y += p.speed;
        p.x += Math.sin(p.wobble) * 0.8;
        p.wobble += p.wobbleSpeed;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        drawFn(p);
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: isMobile ? 0.3 : 0.5 }}
    />
  );
}
