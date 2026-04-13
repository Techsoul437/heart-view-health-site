"use client";

import { useEffect, useRef, useState } from "react";

export default function PageLoader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    const DURATION = 3200;

    const orbits = [
      { rx: 105, ry: 38, tilt: -35, color: "#45657D", speed: 1.0,  phase: 0 },
      { rx: 105, ry: 38, tilt:  25, color: "#3D7773", speed: 0.75, phase: Math.PI * 0.7 },
      { rx: 105, ry: 38, tilt:  80, color: "#B4B0B0", speed: 0.55, phase: Math.PI * 1.4 },
    ];

    const ghosts = [
      { rx: 95, ry: 34, tilt: -60 },
      { rx: 95, ry: 34, tilt:  10 },
      { rx: 95, ry: 34, tilt:  55 },
      { rx: 90, ry: 32, tilt: 110 },
      { rx: 90, ry: 32, tilt: -10 },
    ];

    function toScreen(rx: number, ry: number, tiltDeg: number, angle: number) {
      const t = (tiltDeg * Math.PI) / 180;
      const lx = rx * Math.cos(angle);
      const ly = ry * Math.sin(angle);
      return {
        x: cx + lx * Math.cos(t) - ly * Math.sin(t),
        y: cy + lx * Math.sin(t) + ly * Math.cos(t),
      };
    }

    function drawOrbitEllipse(rx: number, ry: number, tilt: number, alpha: number) {
      const t = (tilt * Math.PI) / 180;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t);
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180,180,200,${alpha})`;
      ctx.lineWidth = 0.7;
      ctx.stroke();
      ctx.restore();
    }

    function drawThickArc(rx: number, ry: number, tiltDeg: number, color: string, progress: number, lineW: number) {
      const t = (tiltDeg * Math.PI) / 180;
      const steps = 180;
      const arcEnd = progress * Math.PI * 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(t);
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * arcEnd;
        const x = rx * Math.cos(a);
        const y = ry * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = lineW;
      ctx.lineCap = "round";
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    let animId: number;
    let startTime: number | null = null;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const rawP = Math.min(elapsed / DURATION, 1);
      const p = easeInOut(rawP);

      ctx.clearRect(0, 0, W, H);

      ghosts.forEach((g) => drawOrbitEllipse(g.rx, g.ry, g.tilt, 0.18));

      orbits.forEach((orb) => {
        const arcLen = Math.min(p * 1.6, 1);
        drawThickArc(orb.rx, orb.ry, orb.tilt, orb.color, arcLen, 5);
      });

      orbits.forEach((orb) => {
        const angle = orb.phase + orb.speed * elapsed * 0.002;
        const pos = toScreen(orb.rx, orb.ry, orb.tilt, angle);
        const fade = Math.min(p * 3, 1);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 14;
        ctx.globalAlpha = fade;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      });

      const nucleusR = lerp(0, 10, Math.min(p * 2, 1));
      const glowR = lerp(0, 28, Math.min(p * 2, 1));

const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
grd.addColorStop(0, "rgba(69, 101, 125, 0.9)");   // #45657D
grd.addColorStop(0.5, "rgba(61, 119, 115, 0.4)"); // #3D7773
grd.addColorStop(1, "rgba(24, 30, 43, 0)");       // #181E2B
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, nucleusR, 0, Math.PI * 2);
      ctx.fillStyle = "#e060ff";
      ctx.shadowColor = "#ff88ff";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (rawP < 1) {
        animId = requestAnimationFrame(draw);
      } else {
        setTimeout(() => {
          setFading(true);
          setTimeout(() => setVisible(false), 800);
        }, 300);
      }
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.8s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <canvas ref={canvasRef} width={520} height={380} />
    </div>
  );
}