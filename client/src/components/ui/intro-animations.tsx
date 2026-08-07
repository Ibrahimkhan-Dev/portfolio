"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Intro-played flag — persists across SPA route changes and
   full-page reloads during the current browser session.
───────────────────────────────────────────────────────── */
const INTRO_KEY = "portfolio_intro_played";

function readIntroPlayed() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

let introPlayed = readIntroPlayed();

export function isIntroPlayed() {
  return introPlayed;
}

export function markIntroPlayed() {
  introPlayed = true;

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(INTRO_KEY, "1");
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
export function BackgroundFX({
  network = false,
}: {
  network?: boolean;
}) {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const haloRef = useRef<HTMLDivElement | null>(null);
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const haloElement = haloRef.current;

    if (!haloElement || prefersReducedMotion) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const smoothingSpeed = 0.08;
    const settleThreshold = 0.1;

    let haloAnimationFrame: number | null = null;
    let resizeCanvas: (() => void) | undefined;
    let drawNetwork: (() => void) | undefined;

    const updateHalo = () => {
      haloAnimationFrame = null;

      if (document.hidden) {
        return;
      }

      currentX +=
        (mouseX - currentX) * smoothingSpeed;
      currentY +=
        (mouseY - currentY) * smoothingSpeed;

      haloElement.style.transform = `translate3d(
        ${currentX - 200}px,
        ${currentY - 200}px,
        0
      )`;

      const horizontalDistance = Math.abs(
        mouseX - currentX,
      );

      const verticalDistance = Math.abs(
        mouseY - currentY,
      );

      if (
        horizontalDistance > settleThreshold ||
        verticalDistance > settleThreshold
      ) {
        haloAnimationFrame =
          window.requestAnimationFrame(updateHalo);
      }
    };

    const scheduleHaloUpdate = () => {
      if (
        haloAnimationFrame !== null ||
        document.hidden
      ) {
        return;
      }

      haloAnimationFrame =
        window.requestAnimationFrame(updateHalo);
    };

    const canvasElement = canvasRef.current;

    if (network && canvasElement) {
      const context =
        canvasElement.getContext("2d");

      if (context) {
        let width = window.innerWidth;
        let height = window.innerHeight;

        let dots: Array<{
          x: number;
          y: number;
        }> = [];

        const generateDots = () => {
          dots = Array.from({ length: 8 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
          }));
        };

        drawNetwork = () => {
          if (document.hidden) {
            return;
          }

          context.clearRect(0, 0, width, height);

          for (const dot of dots) {
            context.beginPath();
            context.arc(
              dot.x,
              dot.y,
              2,
              0,
              Math.PI * 2,
            );
            context.fillStyle =
              "rgba(255, 140, 0, 0.08)";
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
              context.strokeStyle =
                "rgba(255, 140, 0, 0.05)";
              context.lineWidth = 1;
              context.stroke();
            }
          }
        };

        resizeCanvas = () => {
          width = window.innerWidth;
          height = window.innerHeight;

          const pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2,
          );

          canvasElement.width = Math.floor(
            width * pixelRatio,
          );

          canvasElement.height = Math.floor(
            height * pixelRatio,
          );

          canvasElement.style.width = `${width}px`;
          canvasElement.style.height = `${height}px`;

          context.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0,
          );

          generateDots();
          drawNetwork?.();
        };

        resizeCanvas();

        window.addEventListener(
          "resize",
          resizeCanvas,
          {
            passive: true,
          },
        );
      }
    }

    const handleMouseMove = (
      event: MouseEvent,
    ) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      scheduleHaloUpdate();
      drawNetwork?.();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (haloAnimationFrame !== null) {
          window.cancelAnimationFrame(
            haloAnimationFrame,
          );

          haloAnimationFrame = null;
        }

        return;
      }

      scheduleHaloUpdate();
      drawNetwork?.();
    };

    haloElement.style.transform = `translate3d(
      ${currentX - 200}px,
      ${currentY - 200}px,
      0
    )`;

    drawNetwork?.();

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      },
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      if (resizeCanvas) {
        window.removeEventListener(
          "resize",
          resizeCanvas,
        );
      }

      if (haloAnimationFrame !== null) {
        window.cancelAnimationFrame(
          haloAnimationFrame,
        );
      }
    };
  }, [network, prefersReducedMotion]);

  return (
    <>
      <div
        ref={haloRef}
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
            ? "translate3d(calc(50vw - 200px), calc(50vh - 200px), 0)"
            : "translate3d(calc(50vw - 200px), calc(50vh - 200px), 0)",
          willChange: prefersReducedMotion
            ? undefined
            : "transform",
        }}
      />

      {network && !prefersReducedMotion && (
        <canvas
          ref={canvasRef}
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
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const skipAnimation =
    introPlayed || prefersReducedMotion;

  const [count, setCount] = useState(
    skipAnimation ? BOOT_TEXT.length : 0,
  );

  const [fading, setFading] =
    useState(skipAnimation);

  const [gone, setGone] =
    useState(skipAnimation);

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
    const typingDurationMs =
      BOOT_DURATION * 600;
    const startedAt = performance.now();

    let typingAnimationFrame = 0;
    let finishTimeout: number | undefined;

    const tick = () => {
      const elapsed =
        performance.now() - startedAt - 50;

      if (elapsed < 0) {
        typingAnimationFrame =
          window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(
        1,
        elapsed / typingDurationMs,
      );

      setCount(
        Math.round(progress * totalCharacters),
      );

      if (progress < 1) {
        typingAnimationFrame =
          window.requestAnimationFrame(tick);
      }
    };

    typingAnimationFrame =
      window.requestAnimationFrame(tick);

    const safetyTimeout = window.setTimeout(() => {
      setFading(true);

      finishTimeout = window.setTimeout(() => {
        setGone(true);
        markIntroPlayed();
      }, 400);
    }, (BOOT_DURATION + 1) * 1000);

    return () => {
      window.cancelAnimationFrame(
        typingAnimationFrame,
      );

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
      className="fixed inset-0 z-100 flex items-center justify-center bg-black"
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