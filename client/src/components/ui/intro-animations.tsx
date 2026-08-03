"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Intro-played flag — persists across SPA route changes AND
   full-page reloads (bfcache miss) via sessionStorage.
   Only ever transitions false → true (never reset).
───────────────────────────────────────────────────────── */
const INTRO_KEY = "portfolio_intro_played";

let introPlayed =
  typeof sessionStorage !== "undefined"
    ? sessionStorage.getItem(INTRO_KEY) === "1"
    : false;

export function isIntroPlayed() {
  return introPlayed;
}

export function markIntroPlayed() {
  introPlayed = true;

  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* Storage may be blocked — safely ignore. */
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
  const prefersReducedMotion = useReducedMotion();

  const [haloRef, setHaloRef] = useState<HTMLDivElement | null>(null);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!haloRef || prefersReducedMotion) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const speed = 0.08;

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    window.addEventListener("mousemove", onMove, {
      passive: true,
    });

    let haloAnimationFrame = 0;

    const animateHalo = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;

      haloRef.style.transform = `translate(
        ${currentX - 200}px,
        ${currentY - 200}px
      )`;

      haloAnimationFrame = window.requestAnimationFrame(animateHalo);
    };

    animateHalo();

    let resizeHandler: (() => void) | undefined;
    let networkAnimationFrame = 0;

    if (network && canvasRef) {
      const context = canvasRef.getContext("2d");

      if (context) {
        let width = (canvasRef.width = window.innerWidth);
        let height = (canvasRef.height = window.innerHeight);

        const dots = Array.from({ length: 8 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
        }));

        resizeHandler = () => {
          width = canvasRef.width = window.innerWidth;
          height = canvasRef.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeHandler);

        const drawNetwork = () => {
          context.clearRect(0, 0, width, height);

          for (const dot of dots) {
            context.beginPath();
            context.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
            context.fillStyle = "rgba(255, 140, 0, 0.08)";
            context.fill();
          }

          for (const dot of dots) {
            const deltaX = mouseX - dot.x;
            const deltaY = mouseY - dot.y;
            const distance = Math.sqrt(
              deltaX * deltaX + deltaY * deltaY,
            );

            if (distance < 160) {
              context.beginPath();
              context.moveTo(dot.x, dot.y);
              context.lineTo(mouseX, mouseY);
              context.strokeStyle = "rgba(255, 140, 0, 0.05)";
              context.lineWidth = 1;
              context.stroke();
            }
          }

          networkAnimationFrame =
            window.requestAnimationFrame(drawNetwork);
        };

        drawNetwork();
      }
    }

    return () => {
      window.removeEventListener("mousemove", onMove);

      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
      }

      window.cancelAnimationFrame(haloAnimationFrame);
      window.cancelAnimationFrame(networkAnimationFrame);
    };
  }, [canvasRef, haloRef, network, prefersReducedMotion]);

  return (
    <>
      <div
        ref={setHaloRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 -z-10"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 140, 0, 0.08) 0%, rgba(255, 140, 0, 0.04) 40%, transparent 70%)",
          filter: "blur(60px)",
          transform: prefersReducedMotion
            ? "translate(calc(50vw - 200px), calc(50vh - 200px))"
            : undefined,
        }}
      />

      {network && !prefersReducedMotion && (
        <canvas
          ref={setCanvasRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Terminal Boot Overlay — plays once per session
───────────────────────────────────────────────────────── */
const BOOT_TEXT =
  "> initializing engineering portfolio...\n> loading enterprise systems: [██████████] done\n> welcome.";

export function TerminalBoot() {
  const prefersReducedMotion = useReducedMotion();
  const skipAnimation = introPlayed || Boolean(prefersReducedMotion);

  const [count, setCount] = useState(
    skipAnimation ? BOOT_TEXT.length : 0,
  );

  const [fading, setFading] = useState(skipAnimation);
  const [gone, setGone] = useState(skipAnimation);

  const done = count >= BOOT_TEXT.length;

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    setCount(BOOT_TEXT.length);
    setFading(true);
    setGone(true);
    markIntroPlayed();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (skipAnimation) {
      return;
    }

    const totalCharacters = BOOT_TEXT.length;
    const typingDurationMs = BOOT_DURATION * 600;
    const startedAt = performance.now();

    let typingAnimationFrame = 0;
    let finishTimeout: number | undefined;

    const tick = () => {
      const elapsed = performance.now() - startedAt - 50;

      if (elapsed < 0) {
        typingAnimationFrame = window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(
        1,
        elapsed / typingDurationMs,
      );

      setCount(Math.round(progress * totalCharacters));

      if (progress < 1) {
        typingAnimationFrame = window.requestAnimationFrame(tick);
      }
    };

    typingAnimationFrame = window.requestAnimationFrame(tick);

    const safetyTimeout = window.setTimeout(() => {
      setFading(true);

      finishTimeout = window.setTimeout(() => {
        setGone(true);
        markIntroPlayed();
      }, 400);
    }, (BOOT_DURATION + 1) * 1000);

    return () => {
      window.cancelAnimationFrame(typingAnimationFrame);
      window.clearTimeout(safetyTimeout);

      if (finishTimeout !== undefined) {
        window.clearTimeout(finishTimeout);
      }
    };
  }, [skipAnimation]);

  useEffect(() => {
    if (!done || skipAnimation) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFading(true);
    }, 150);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [done, skipAnimation]);

  useEffect(() => {
    if (!fading || skipAnimation) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setGone(true);
      markIntroPlayed();
    }, 350);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [fading, skipAnimation]);

  if (gone || prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      animate={{
        opacity: fading ? 0 : 1,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      style={{
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <div className="w-full max-w-lg px-6 font-mono text-xs sm:text-sm">
        <pre className="whitespace-pre-wrap text-primary leading-relaxed">
          {BOOT_TEXT.slice(0, count)}

          {!done && (
            <span className="ml-px inline-block h-[1.1em] w-[0.55ch] bg-primary align-middle" />
          )}
        </pre>
      </div>
    </motion.div>
  );
}