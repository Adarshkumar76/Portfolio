"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  color: string;
}

export default function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Star collection
    const numStars = 280;
    const stars: Star[] = [];
    const colors = ["#ffffff", "#a78bfa", "#38bdf8", "#ec4899", "#818cf8"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.8 + 0.6,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.fillStyle = "#030014";
      ctx.fillRect(0, 0, width, height);

      // Subtle Cosmic Nebula gradients
      const grad1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 2,
        height * 0.3 + mouseY * 2,
        10,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      grad1.addColorStop(0, "rgba(112, 66, 248, 0.12)");
      grad1.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.8 - mouseX * 2,
        height * 0.7 - mouseY * 2,
        10,
        width * 0.8,
        height * 0.7,
        width * 0.5
      );
      grad2.addColorStop(0, "rgba(0, 245, 255, 0.08)");
      grad2.addColorStop(1, "rgba(3, 0, 20, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 3D stars render
      const cx = width / 2 + mouseX;
      const cy = height / 2 + mouseY;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Move star forward
        star.z -= 0.6;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 280 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const currentSize = Math.max(0.4, (1 - star.z / width) * star.size * 2.5);
          const alpha = (1 - star.z / width) * star.opacity;

          ctx.beginPath();
          ctx.arc(px, py, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Subtle glow on closer stars
          if (currentSize > 1.8) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
          } else {
            ctx.shadowBlur = 0;
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#030014" }}
    />
  );
}
