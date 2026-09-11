"use client";

import React, { useEffect, useRef } from "react";

const TECH_ITEMS = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#68a063" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "Shopify API", color: "#96bf48" },
  { name: "WooCommerce", color: "#96588a" },
  { name: "Docker", color: "#2496ed" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#47a248" },
  { name: "Redis", color: "#dc382d" },
  { name: "WebSockets", color: "#ec4899" },
  { name: "TailwindCSS", color: "#38bdf8" },
  { name: "Linux / Bash", color: "#fcc624" },
  { name: "GraphQL", color: "#e10098" },
  { name: "Express.js", color: "#ffffff" },
];

export default function FloatingTechSphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const size = Math.min(380, window.innerWidth - 40);
    canvas.width = size;
    canvas.height = size;
    const radius = size * 0.42;

    const count = TECH_ITEMS.length;
    const tags = TECH_ITEMS.map((item, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      return {
        text: item.name,
        color: item.color,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      };
    });

    let angleX = 0.003;
    let angleY = 0.004;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - (rect.left + rect.width / 2);
      const my = e.clientY - (rect.top + rect.height / 2);
      angleY = (mx / rect.width) * 0.02;
      angleX = (-my / rect.height) * 0.02;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw subtle orbital rings
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.98, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      // Rotate tags
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      tags.forEach((tag) => {
        // Rotate Y
        const x1 = tag.x * cosY - tag.z * sinY;
        const z1 = tag.z * cosY + tag.x * sinY;

        // Rotate X
        const y2 = tag.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + tag.y * sinX;

        tag.x = x1;
        tag.y = y2;
        tag.z = z2;

        const scale = (tag.z + radius * 1.5) / (radius * 2.5);
        const alpha = Math.max(0.15, (tag.z + radius) / (radius * 2));

        ctx.save();
        ctx.font = `600 ${Math.max(10, 13 * scale)}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = tag.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = tag.color;
        ctx.shadowBlur = scale > 0.8 ? 10 : 0;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(tag.text, cx + tag.x, cy + tag.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow disc */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-600/20 via-cyan-500/20 to-pink-500/20 blur-3xl -z-10 pointer-events-none" />
      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing" />
    </div>
  );
}
