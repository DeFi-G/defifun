"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // === Mouse comet trail ===
    const trailCanvas = document.createElement("canvas");
    trailCanvas.style.position = "fixed";
    trailCanvas.style.top = "0";
    trailCanvas.style.left = "0";
    trailCanvas.style.pointerEvents = "none";
    trailCanvas.style.zIndex = "9999";
    document.body.appendChild(trailCanvas);

    const ctxTrail = trailCanvas.getContext("2d")!;
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;

    const trail: { x: number; y: number; alpha: number }[] = [];
    const colors = ["#ffffff", "#00ffff", "#9d4edd"];

    const drawTrail = () => {
      ctxTrail.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      trail.forEach((p, i) => {
        ctxTrail.beginPath();
        ctxTrail.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctxTrail.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctxTrail.shadowColor = colors[i % colors.length];
        ctxTrail.shadowBlur = 15;
        ctxTrail.fill();
        p.alpha -= 0.02;
      });
      for (let i = trail.length - 1; i >= 0; i--) {
        if (trail[i].alpha <= 0) trail.splice(i, 1);
      }
      requestAnimationFrame(drawTrail);
    };
    drawTrail();

    const handleMove = (e: MouseEvent) => {
      trail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
    };
    window.addEventListener("mousemove", handleMove);

    // === Floating ions ===
    const ionCanvas = document.createElement("canvas");
    ionCanvas.style.position = "fixed";
    ionCanvas.style.top = "0";
    ionCanvas.style.left = "0";
    ionCanvas.style.pointerEvents = "none";
    ionCanvas.style.zIndex = "1";
    document.body.appendChild(ionCanvas);

    const ctxIons = ionCanvas.getContext("2d")!;
    ionCanvas.width = window.innerWidth;
    ionCanvas.height = window.innerHeight;

    const ions: { x: number; y: number; r: number; dx: number; dy: number; alpha: number; color: string }[] = [];
    const ionColors = ["#ffffff", "#00ffff", "#9d4edd"];

    // create ions drifting out of portal center
    for (let i = 0; i < 40; i++) {
      ions.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random(),
        color: ionColors[i % ionColors.length],
      });
    }

    const drawIons = () => {
      ctxIons.clearRect(0, 0, ionCanvas.width, ionCanvas.height);
      ions.forEach((p) => {
        ctxIons.beginPath();
        ctxIons.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctxIons.fillStyle = `rgba(${p.color === "#ffffff" ? "255,255,255" : p.color === "#00ffff" ? "0,255,255" : "157,78,221"},${p.alpha})`;
        ctxIons.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.001;
        if (p.alpha <= 0) {
          p.x = window.innerWidth / 2;
          p.y = window.innerHeight / 2;
          p.alpha = 1;
        }
      });
      requestAnimationFrame(drawIons);
    };
    drawIons();

    window.addEventListener("resize", () => {
      trailCanvas.width = ionCanvas.width = window.innerWidth;
      trailCanvas.height = ionCanvas.height = window.innerHeight;
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeChild(trailCanvas);
      document.body.removeChild(ionCanvas);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Portal Burst */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-600 via-cyan-400 to-white blur-3xl opacity-30 animate-pulse" />

      {/* DNA Helix */}
      <div className="absolute top-1/3 animate-spin-slow">
        <svg width="220" height="400" viewBox="0 0 220 400">
          <path d="M70 20 C150 100, 70 300, 150 380" stroke="cyan" strokeWidth="4" fill="none" style={{ filter: "drop-shadow(0 0 6px cyan)" }} />
          <path d="M150 20 C70 100, 150 300, 70 380" stroke="magenta" strokeWidth="4" fill="none" style={{ filter: "drop-shadow(0 0 6px magenta)" }} />
          {[...Array(12)].map((_, i) => {
            const y = 30 + i * 30;
            const x1 = 80 + (i % 2 === 0 ? -5 : 5);
            const x2 = 140 + (i % 2 === 0 ? 5 : -5);
            return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke="white" strokeWidth="2" style={{ filter: "drop-shadow(0 0 4px white)" }} />;
          })}
        </svg>
      </div>

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
        <div className="animate-marquee text-lg font-mono inline-block">
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi — Follow @defi_web4 🌌&nbsp;&nbsp;
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi — Follow @defi_web4 🌌
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-6 w-full overflow-hidden whitespace-nowrap z-10">
        <div className="animate-marquee text-lg font-mono inline-block">
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi — Follow @defi_web4 🌌&nbsp;&nbsp;
          🌌 AetherDeFi.fun — Web4 creation begins here — Build Web4 — Powered by DeFi — Follow @defi_web4 🌌
        </div>
      </div>
    </main>
  );
}
