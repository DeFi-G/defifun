"use client";
import { useEffect } from "react";

export default function Home() {
  // Mouse comet trail
  useEffect(() => {
    const trailCanvas = document.createElement("canvas");
    trailCanvas.style.position = "fixed";
    trailCanvas.style.top = "0";
    trailCanvas.style.left = "0";
    trailCanvas.style.pointerEvents = "none";
    trailCanvas.style.zIndex = "9999";
    document.body.appendChild(trailCanvas);

    const ctx = trailCanvas.getContext("2d")!;
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;

    const trail: { x: number; y: number; alpha: number }[] = [];
    const colors = ["#ffffff", "#00ffff", "#9d4edd"];

    const draw = () => {
      ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      trail.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.shadowColor = colors[i % colors.length];
        ctx.shadowBlur = 15;
        ctx.fill();
        p.alpha -= 0.02;
      });
      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].alpha <= 0) trail.splice(i, 1);
      }
      requestAnimationFrame(draw);
    };
    draw();

    const handleMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", () => {
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeChild(trailCanvas);
    };
  }, []);

  // Floating orb particles
  useEffect(() => {
    const orbCanvas = document.createElement("canvas");
    orbCanvas.style.position = "fixed";
    orbCanvas.style.top = "0";
    orbCanvas.style.left = "0";
    orbCanvas.style.pointerEvents = "none";
    orbCanvas.style.zIndex = "5";
    document.body.appendChild(orbCanvas);

    const ctx = orbCanvas.getContext("2d")!;
    orbCanvas.width = window.innerWidth;
    orbCanvas.height = window.innerHeight;

    type Orb = { x: number; y: number; radius: number; alpha: number; speedY: number };
    const orbs: Orb[] = Array.from({ length: 25 }, () => ({
      x: orbCanvas.width / 2 + (Math.random() - 0.5) * 200,
      y: orbCanvas.height / 2 + (Math.random() - 0.5) * 200,
      radius: Math.random() * 3 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      speedY: Math.random() * 0.5 + 0.2,
    }));

    const drawOrbs = () => {
      ctx.clearRect(0, 0, orbCanvas.width, orbCanvas.height);
      orbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173,216,230,${orb.alpha})`; // light blue glow
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 10;
        ctx.fill();

        orb.y -= orb.speedY; // drift upward
        orb.alpha -= 0.001;

        if (orb.alpha <= 0) {
          // reset orb near center
          orb.x = orbCanvas.width / 2 + (Math.random() - 0.5) * 200;
          orb.y = orbCanvas.height / 2 + (Math.random() - 0.5) * 200;
          orb.alpha = Math.random() * 0.8 + 0.2;
        }
      });
      requestAnimationFrame(drawOrbs);
    };
    drawOrbs();

    window.addEventListener("resize", () => {
      orbCanvas.width = window.innerWidth;
      orbCanvas.height = window.innerHeight;
    });

    return () => {
      document.body.removeChild(orbCanvas);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Portal / Pulser */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white blur-3xl opacity-30 animate-pulse" />

      {/* Title */}
      <h1 className="text-5xl font-bold z-10">AetherDeFi.fun</h1>
      <p className="mt-4 text-lg z-10">Web4 creation begins here.</p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col items-center gap-4 z-10">
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-full bg-cyan-600 shadow-lg hover:bg-cyan-500 transition">
            Connect Wallet
          </button>
          <button className="px-6 py-3 rounded-full bg-purple-600 shadow-lg hover:bg-purple-500 transition">
            Download Omni Wallet
          </button>
        </div>
        <span className="mt-2 text-sm text-gray-400 italic">Coming Soon</span>
      </div>

      {/* Top Ticker */}
      <div className="absolute top-0 w-full overflow-hidden whitespace-nowrap z-10">
        <div className="animate-marquee text-lg font-mono">
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi Network — Follow @defi_web4 🌌
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-6 w-full overflow-hidden whitespace-nowrap z-10">
        <div className="animate-marquee text-lg font-mono">
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi Network — Follow @defi_web4 🌌
        </div>
      </div>
    </main>
  );
}
