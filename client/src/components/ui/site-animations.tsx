"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* =========================================================
   Intro-played flag: persists across route changes so
   animations only play on the very first visit.
========================================================= */
let _introPlayed = false;
export function isIntroPlayed() {
  return _introPlayed;
}

/* =========================================================
   Timeline constants (seconds)
   Boot overlay plays first, then hero intro begins.
========================================================= */
export const BOOT_DURATION = 1.2;

export const HERO_T = {
  badgeStart: BOOT_DURATION + 0.0,
  badgeEnd: BOOT_DURATION + 0.2,
  typingStart: BOOT_DURATION + 0.15,
  typingEnd: BOOT_DURATION + 0.75,
  compileStart: BOOT_DURATION + 0.85,
  compileEnd: BOOT_DURATION + 1.2,
  ctaStart: BOOT_DURATION + 1.15,
  ctaEnd: BOOT_DURATION + 1.5,
  polishStart: BOOT_DURATION + 1.5,
  polishEnd: BOOT_DURATION + 1.8,
};

/* =========================================================
   A) Background FX (Cursor Halo + Optional Network)
========================================================= */
export function BackgroundFX({ network = false }: { network?: boolean }) {
  const haloRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    const canvas = canvasRef.current;
    if (!halo) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const speed = 0.08; // lagged follow
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      halo.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Optional network (safe: 6–10 dots, lines only near cursor, ultra low opacity)
    let resizeHandler: (() => void) | undefined;
    let raf2 = 0;

    if (network && canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const DOTS = 8; // in spec range
        const dots = Array.from({ length: DOTS }).map(() => ({
          x: Math.random() * width,
          y: Math.random() * height,
        }));

        resizeHandler = () => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeHandler);

        const draw = () => {
          ctx.clearRect(0, 0, width, height);

          // dots
          for (const d of dots) {
            ctx.beginPath();
            ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,140,0,0.08)";
            ctx.fill();
          }

          // lines only near cursor
          for (const d of dots) {
            const dx = mouseX - d.x;
            const dy = mouseY - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 160) {
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
  }, [network]);

  return (
    <>
      {/* Halo: 5–10% opacity, lagged, click-through */}
      <div
        ref={haloRef}
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
          ref={canvasRef}
          className="fixed inset-0 -z-10 pointer-events-none"
        />
      )}
    </>
  );
}

/* =========================================================
   A-2) Terminal Boot Overlay
========================================================= */
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
      window.setTimeout(() => { setGone(true); _introPlayed = true; }, 400);
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
      _introPlayed = true;
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

/* =========================================================
   B) Reusable Reveal + Stagger (for sections)
========================================================= */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  once = true,
  amount = 0.25,
  duration = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount });

  const variants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: "easeOut", delay },
      },
    }),
    [y, duration, delay],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  once = true,
  amount = 0.25,
  stagger = 0.08,
  delay = 0,
  y = 12,
}: {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  stagger?: number;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount });

  const parentV = useMemo<Variants>(
    () => ({
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }),
    [stagger, delay],
  );

  const childV = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    [y],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={parentV}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {React.Children.map(children, (c, i) => (
        <motion.div key={i} variants={childV}>
          {c}
        </motion.div>
      ))}
    </motion.div>
  );
}

/* =========================================================
   C) Typing line (fast) + exactly 2 cursor blinks
========================================================= */
export function TypingLine({
  text,
  className,
  startDelay = HERO_T.typingStart,
  duration = HERO_T.typingEnd - HERO_T.typingStart,
  monospaceWhileTyping = true,
  cursor = true,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  duration?: number;
  monospaceWhileTyping?: boolean;
  cursor?: boolean;
}) {
  const skip = _introPlayed;
  const [typedCount, setTypedCount] = useState(skip ? text.length : 0);
  const [phase, setPhase] = useState<"waiting" | "typing" | "blinking" | "done">(
    skip ? "done" : "waiting",
  );
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (skip) return;

    const totalChars = text.length;
    const startMs = startDelay * 1000;
    const durationMs = duration * 1000;
    const t0 = performance.now();
    let rafId: number;
    let blinkTimer: number | undefined;

    const tick = () => {
      const elapsed = performance.now() - t0;
      if (elapsed < startMs) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (elapsed - startMs) / durationMs);
      setTypedCount(Math.round(progress * totalChars));

      if (progress < 1) {
        setPhase("typing");
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase("blinking");
        let blinks = 0;
        blinkTimer = window.setInterval(() => {
          setCursorVisible((v) => !v);
          blinks++;
          if (blinks >= 4) {
            if (blinkTimer !== undefined) window.clearInterval(blinkTimer);
            blinkTimer = undefined;
            setPhase("done");
            setCursorVisible(false);
          }
        }, 100);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (blinkTimer !== undefined) window.clearInterval(blinkTimer);
    };
    // skip intentionally excluded: it reads module-level _introPlayed which
    // must NOT re-trigger the effect mid-animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, duration, startDelay]);

  const typed = text.slice(0, typedCount);
  const isTyping = phase === "typing";

  return (
    <motion.p
      className={className}
      initial={{ opacity: skip ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={skip ? { duration: 0 } : { delay: startDelay, duration: 0.15, ease: "easeOut" }}
      style={{
        fontFamily:
          monospaceWhileTyping && isTyping
            ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
            : undefined,
        fontStyle: isTyping ? "normal" : undefined,
      }}
    >
      {typed}
      {cursor && (phase === "typing" || phase === "blinking") && (
        <span style={{ display: "inline-block", width: "0.6ch", opacity: cursorVisible ? 1 : 0 }}>
          |
        </span>
      )}
    </motion.p>
  );
}

/* =========================================================
   D) Hero elements (exact spec)
========================================================= */

/** 1) Badge power-on: opacity in + 2 subtle dips + glow bloom settle */
export function BadgePowerOn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const skip = _introPlayed;
  return (
    <motion.div
      className={className}
      initial={skip ? { opacity: 1 } : { opacity: 0, filter: "drop-shadow(0 0 0px rgba(255,140,0,0))" }}
      animate={
        skip
          ? { opacity: 1 }
          : {
              opacity: [0, 1, 0.86, 1, 0.92, 1],
              filter: [
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
                "drop-shadow(0 0 18px rgba(255,140,0,0.45))",
                "drop-shadow(0 0 10px rgba(255,140,0,0.25))",
              ],
            }
      }
      transition={
        skip
          ? { duration: 0 }
          : {
              opacity: {
                duration: HERO_T.badgeEnd - HERO_T.badgeStart,
                times: [0, 0.45, 0.6, 0.75, 0.88, 1],
                ease: "easeOut",
              },
              filter: {
                duration: HERO_T.badgeEnd - HERO_T.badgeStart,
                times: [0, 0.5, 1],
                ease: "easeOut",
              },
            }
      }
    >
      {children}
    </motion.div>
  );
}

/** 3 + 4) Name appears with micro-settle */
export function RawToCompiledName({
  first,
  last,
  classNameCompiled,
}: {
  first: string;
  last: string;
  classNameCompiled: string;
}) {
  const skip = _introPlayed;
  return (
    <div className="leading-none uppercase">
      <motion.h1
        className={`leading-none ${classNameCompiled}`}
        initial={skip ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          skip
            ? { duration: 0 }
            : {
                delay: HERO_T.compileStart,
                duration: HERO_T.compileEnd - HERO_T.compileStart,
                ease: [0.2, 1.3, 0.3, 1],
              }
        }
      >
        <span className="text-white">{first}</span> <br />
        <span className="text-primary">{last}</span>
      </motion.h1>
    </div>
  );
}

/** 5) CTA + icon stagger: opacity in + y +10 -> 0, stagger 0.06 */
export function StaggerIn({
  children,
  className,
  start = HERO_T.ctaStart,
  stagger = 0.06,
}: {
  children: React.ReactNode;
  className?: string;
  start?: number;
  stagger?: number;
}) {
  const skip = _introPlayed;
  const kids = React.Children.toArray(children);
  return (
    <div className={className}>
      {kids.map((child, i) => (
        <motion.div
          key={i}
          initial={skip ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            skip
              ? { duration: 0 }
              : {
                  delay: start + i * stagger,
                  duration: HERO_T.ctaEnd - HERO_T.ctaStart,
                  ease: "easeOut",
                }
          }
          style={{ display: "inline-flex" }}
        >
          {child as React.ReactElement}
        </motion.div>
      ))}
    </div>
  );
}

/** 6) Final polish glow breath (one-time).
 *  Defaults to two glow centers -- badge area (top) and orange name area (bottom). */
export function GlowBreath({
  className,
  at = HERO_T.polishStart,
  centers = ["50% 18%", "50% 58%"],
}: {
  className?: string;
  at?: number;
  centers?: string[];
}) {
  const bg = useMemo(
    () =>
      centers
        .map((c) => `radial-gradient(circle at ${c}, rgba(255,140,0,0.10), transparent 45%)`)
        .join(", "),
    [centers],
  );

  if (_introPlayed) return null;

  return (
    <motion.div
      className={`pointer-events-none ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ delay: at, duration: HERO_T.polishEnd - HERO_T.polishStart, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        filter: "blur(22px)",
        background: bg,
        zIndex: 1,
      }}
    />
  );
}

/** Badge idle: micro glow pulse every 6–8 seconds after intro (no flicker).
 *  Wrap badge content so the drop-shadow applies to the real element. */
export function BadgeIdlePulse({
  children,
  className,
  delayAfterIntro = 1.8,
}: {
  children: React.ReactNode;
  className?: string;
  delayAfterIntro?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ filter: "drop-shadow(0 0 0px rgba(255,140,0,0))" }}
      animate={{
        filter: [
          "drop-shadow(0 0 0px rgba(255,140,0,0))",
          "drop-shadow(0 0 8px rgba(255,140,0,0.05))",
          "drop-shadow(0 0 0px rgba(255,140,0,0))",
        ],
      }}
      transition={{
        delay: _introPlayed ? 0 : delayAfterIntro,
        duration: 0.9,
        repeat: Infinity,
        repeatDelay: 6.5,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   E) Buttons micro-interactions (hover/tap + arrow nudge)
========================================================= */
export function CTAButton({
  children,
  className,
  href,
  onClick,
  showArrow = true,
}: {
  children: React.ReactNode;
  className: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  showArrow?: boolean;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 ${className}`}
      initial="idle"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      variants={{
        idle: { y: 0, filter: "drop-shadow(0 0 0px rgba(255,140,0,0))" },
        hover: { y: -2, filter: "drop-shadow(0 0 12px rgba(255,140,0,0.18))" },
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="inline-flex"
          variants={{
            idle: { x: 0 },
            hover: { x: 3 },
          }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <ArrowRight size={18} />
        </motion.span>
      )}
    </motion.a>
  );
}

/* =========================================================
   F) Floating Code Editor (hero accent)
========================================================= */
const CODE_LINES: { text: string; color: string }[][] = [
  [
    { text: "function", color: "text-orange-400" },
    { text: " buildSolution", color: "text-white" },
    { text: "(problem) {", color: "text-white/50" },
  ],
  [
    { text: "  const", color: "text-orange-400" },
    { text: " system = ", color: "text-white/50" },
    { text: "architect", color: "text-emerald-400" },
    { text: "(problem);", color: "text-white/50" },
  ],
  [
    { text: "  return", color: "text-orange-400" },
    { text: " deploy", color: "text-emerald-400" },
    { text: "(system);", color: "text-white/50" },
    { text: " // ✓ shipped", color: "text-white/25" },
  ],
  [{ text: "}", color: "text-white/50" }],
];

export function CodeEditorFloat({
  className,
  startAt = HERO_T.polishEnd + 0.2,
}: {
  className?: string;
  startAt?: number;
}) {
  const chars = useMemo(() => {
    const result: { char: string; color: string; isBreak?: boolean }[] = [];
    CODE_LINES.forEach((line, li) => {
      if (li > 0) result.push({ char: "\n", color: "", isBreak: true });
      line.forEach((seg) => {
        for (const c of seg.text) result.push({ char: c, color: seg.color });
      });
    });
    return result;
  }, []);

  const skip = _introPlayed;
  const [count, setCount] = useState(skip ? chars.length : 0);
  const [cursorOn, setCursorOn] = useState(true);
  const done = count >= chars.length;

  useEffect(() => {
    if (skip) return;

    const totalChars = chars.length;
    const startMs = startAt * 1000;
    const durationMs = totalChars * 25;
    const t0 = performance.now();
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - t0;
      if (elapsed < startMs) { rafId = requestAnimationFrame(tick); return; }
      const progress = Math.min(1, (elapsed - startMs) / durationMs);
      setCount(Math.round(progress * totalChars));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
    // skip intentionally excluded: same reasoning as TypingLine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chars.length, startAt]);

  useEffect(() => {
    if (!done) return;
    const interval = window.setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(interval);
  }, [done]);

  const visible = chars.slice(0, count);

  return (
    <motion.div
      className={`hidden sm:block bg-[#0a0a0a] border border-white/[0.08] rounded-lg overflow-hidden max-w-sm mx-auto ${className ?? ""}`}
      initial={skip ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={skip ? { duration: 0 } : { delay: startAt, duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
        <span className="w-2 h-2 rounded-full bg-red-500/50" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <span className="w-2 h-2 rounded-full bg-green-500/50" />
        <span className="ml-2 text-[10px] text-white/20 font-mono tracking-wider">
          solution.ts
        </span>
      </div>
      <div className="px-4 py-3 font-mono text-[11px] sm:text-xs leading-relaxed whitespace-pre">
        {visible.map((c, i) =>
          c.isBreak ? (
            <br key={i} />
          ) : (
            <span key={i} className={c.color}>
              {c.char}
            </span>
          ),
        )}
        <span
          className="inline-block w-[0.55ch] h-[1.1em] bg-primary/70 align-middle ml-px"
          style={{ opacity: done ? (cursorOn ? 0.7 : 0) : 0.7 }}
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   G) Scroll-triggered section code comment
========================================================= */
export function SectionComment({
  comment,
  className,
}: {
  comment: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.span
      ref={ref}
      className={`pointer-events-none absolute top-4 right-4 sm:top-8 sm:right-8 text-white/[0.06] text-[10px] sm:text-xs font-mono select-none ${className ?? ""}`}
      initial={{ opacity: 0, x: 8 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      {comment}
    </motion.span>
  );
}