"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Intro-played flag — persists across SPA route changes AND
   full-page reloads (bfcache miss) via sessionStorage.
   Only ever transitions false → true (never reset).
───────────────────────────────────────────────────────── */
const _INTRO_KEY = "portfolio_intro_played";
let _introPlayed =
  typeof sessionStorage !== "undefined"
    ? sessionStorage.getItem(_INTRO_KEY) === "1"
    : false;

export function isIntroPlayed() {
  return _introPlayed;
}

export function markIntroPlayed() {
  _introPlayed = true;
  try {
    sessionStorage.setItem(_INTRO_KEY, "1");
  } catch {
    /* storage blocked — ignore */
  }
}

/* ─────────────────────────────────────────────────────────
   Timeline anchor
───────────────────────────────────────────────────────── */
export const BOOT_DURATION = 0.9;

/* ─────────────────────────────────────────────────────────
   Background FX — cursor halo + optional network canvas
───────────────────────────────────────────────────────── */
export function BackgroundFX({ network = false }: { network?: boolean }) {
  const [haloRef, setHaloRef] = useState<HTMLDivElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!haloRef) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    const speed = 0.08;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      haloRef.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    let resizeHandler: (() => void) | undefined;
    let raf2 = 0;

    if (network && canvasRef) {
      const ctx = canvasRef.getContext("2d");
      if (ctx) {
        let width = (canvasRef.width = window.innerWidth);
        let height = (canvasRef.height = window.innerHeight);
        const dots = Array.from({ length: 8 }).map(() => ({
          x: Math.random() * width,
          y: Math.random() * height,
        }));
        resizeHandler = () => {
          width = canvasRef.width = window.innerWidth;
          height = canvasRef.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeHandler);
        const draw = () => {
          ctx.clearRect(0, 0, width, height);
          for (const d of dots) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,140,0,0.08)";
            ctx.fill();
          }
          for (const d of dots) {
            const dx = mouseX - d.x;
            const dy = mouseY - d.y;
            if (Math.sqrt(dx * dx + dy * dy) < 160) {
              ctx.beginPath();
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(mouseX, mouseY);
              ctx.strokeStyle = "rgba(255,140,0,0.05)";
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
          raf2 = requestAnimationFrame(draw);
        };
        draw();
      }
    }

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
    };
  }, [haloRef, canvasRef, network]);

  return (
    <>
      <div
        ref={setHaloRef}
        className="pointer-events-none fixed top-0 left-0 -z-10"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,0,0.08) 0%, rgba(255,140,0,0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {network && (
        <canvas
          ref={setCanvasRef}
          className="fixed inset-0 -z-10 pointer-events-none"
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Terminal Boot Overlay — plays once per session
───────────────────────────────────────────────────────── */
const BOOT_TEXT =
  "> initializing portfolio...\n> loading modules: [██████████] done\n> welcome, visitor.";

export function TerminalBoot() {
  const [count, setCount] = useState(_introPlayed ? BOOT_TEXT.length : 0);
  const [fading, setFading] = useState(_introPlayed);
  const [gone, setGone] = useState(_introPlayed);
  const done = count >= BOOT_TEXT.length;

  useEffect(() => {
    if (_introPlayed) return;

    const totalChars = BOOT_TEXT.length;
    const typingMs = BOOT_DURATION * 600;
    const t0 = performance.now();
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - t0 - 50;
      if (elapsed < 0) { rafId = requestAnimationFrame(tick); return; }
      const progress = Math.min(1, elapsed / typingMs);
      setCount(Math.round(progress * totalChars));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const safetyId = window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => { setGone(true); markIntroPlayed(); }, 400);
    }, (BOOT_DURATION + 1) * 1000);

    return () => { cancelAnimationFrame(rafId); clearTimeout(safetyId); };
  }, []);

  useEffect(() => {
    if (!done || _introPlayed) return;
    const t = window.setTimeout(() => setFading(true), 150);
    return () => clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (!fading || _introPlayed) return;
    const t = window.setTimeout(() => {
      setGone(true);
      markIntroPlayed();
    }, 350);
    return () => clearTimeout(t);
  }, [fading]);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="font-mono text-xs sm:text-sm max-w-lg px-6 w-full">
        <pre className="text-primary whitespace-pre-wrap leading-relaxed">
          {BOOT_TEXT.slice(0, count)}
          {!done && (
            <span className="inline-block w-[0.55ch] h-[1.1em] bg-primary align-middle ml-px" />
          )}
        </pre>
      </div>
    </motion.div>
  );
}
