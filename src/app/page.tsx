"use client";
import { useEffect } from "react";

export default function Home() {
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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Pulsar */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-white blur-2xl opacity-70 animate-ping"></div>

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

      {/* Tickers */}
      <div className="absolute top-0 w-full overflow-hidden whitespace-nowrap z-10">
        <div className="animate-marquee text-lg font-mono">
          🌌 AetherDeFi.fun — Web4 creation begins here — Powered by DeFi — Follow @defi_web4 🌌
        </div>
      </div>
      <div className="absolute bottom-6 w-full overflow-hidden whitespace-nowrap z-10">
        <div className="animate-marquee text-lg font-mono">
          🌌 AetherDeFi.fun — Web4 creation begins here — Powered by DeFi — Follow @defi_web4 🌌
        </div>
      </div>
    </main>
  );
}