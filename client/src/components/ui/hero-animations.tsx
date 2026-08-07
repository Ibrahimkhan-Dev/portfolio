"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import {
  BOOT_DURATION,
  isIntroPlayed,
} from "./intro-animations";

/* ─────────────────────────────────────────────────────────
   Hero animation timeline (seconds, relative to boot end)
───────────────────────────────────────────────────────── */
export const HERO_T = {
  badgeStart: BOOT_DURATION,
  badgeEnd: BOOT_DURATION + 0.15,
  typingStart: BOOT_DURATION + 0.1,
  typingEnd: BOOT_DURATION + 0.55,
  compileStart: BOOT_DURATION + 0.6,
  compileEnd: BOOT_DURATION + 0.9,
  ctaStart: BOOT_DURATION + 0.9,
  ctaEnd: BOOT_DURATION + 1.15,
  polishStart: BOOT_DURATION + 1.15,
  polishEnd: BOOT_DURATION + 1.35,
};

function useSkipHeroAnimation() {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  return (
    isIntroPlayed() ||
    prefersReducedMotion
  );
}

/* ─────────────────────────────────────────────────────────
   TypingLine — character-by-character text reveal
───────────────────────────────────────────────────────── */
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
  const skipAnimation = useSkipHeroAnimation();

  const [typedCount, setTypedCount] = useState(
    skipAnimation ? text.length : 0,
  );

  const [phase, setPhase] = useState<
    "waiting" | "typing" | "blinking" | "done"
  >(skipAnimation ? "done" : "waiting");

  const [cursorVisible, setCursorVisible] =
    useState(!skipAnimation);

  useEffect(() => {
    if (skipAnimation) {
      setTypedCount(text.length);
      setPhase("done");
      setCursorVisible(false);
      return;
    }

    setTypedCount(0);
    setPhase("waiting");
    setCursorVisible(true);

    const totalCharacters = text.length;
    const startDelayMs = Math.max(
      0,
      startDelay * 1000,
    );

    const typingDurationMs = Math.max(
      1,
      duration * 1000,
    );

    const startedAt = performance.now();

    let typingFrame = 0;
    let blinkTimer: number | undefined;

    const tick = () => {
      const elapsed =
        performance.now() - startedAt;

      if (elapsed < startDelayMs) {
        typingFrame =
          window.requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(
        1,
        (elapsed - startDelayMs) /
          typingDurationMs,
      );

      setTypedCount(
        Math.round(progress * totalCharacters),
      );

      if (progress < 1) {
        setPhase("typing");

        typingFrame =
          window.requestAnimationFrame(tick);
        return;
      }

      if (!cursor) {
        setPhase("done");
        setCursorVisible(false);
        return;
      }

      setPhase("blinking");

      let blinkCount = 0;

      blinkTimer = window.setInterval(() => {
        setCursorVisible(
          (currentValue) => !currentValue,
        );

        blinkCount += 1;

        if (blinkCount >= 4) {
          if (blinkTimer !== undefined) {
            window.clearInterval(blinkTimer);
          }

          setPhase("done");
          setCursorVisible(false);
        }
      }, 100);
    };

    typingFrame =
      window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(typingFrame);

      if (blinkTimer !== undefined) {
        window.clearInterval(blinkTimer);
      }
    };
  }, [
    cursor,
    duration,
    skipAnimation,
    startDelay,
    text,
  ]);

  const isTyping = phase === "typing";

  return (
    <motion.p
      className={className}
      initial={{
        opacity: skipAnimation ? 1 : 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={
        skipAnimation
          ? {
              duration: 0,
            }
          : {
              delay: startDelay,
              duration: 0.15,
              ease: "easeOut",
            }
      }
      style={{
        fontFamily:
          monospaceWhileTyping && isTyping
            ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
            : undefined,
        fontStyle: isTyping
          ? "normal"
          : undefined,
      }}
    >
      {text.slice(0, typedCount)}

      {cursor &&
        (phase === "typing" ||
          phase === "blinking") && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "0.6ch",
              opacity: cursorVisible ? 1 : 0,
            }}
          >
            |
          </span>
        )}
    </motion.p>
  );
}

/* ─────────────────────────────────────────────────────────
   BadgePowerOn — opacity flicker on first load
───────────────────────────────────────────────────────── */
export function BadgePowerOn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const skipAnimation = useSkipHeroAnimation();

  return (
    <motion.div
      className={className}
      initial={
        skipAnimation
          ? {
              opacity: 1,
            }
          : {
              opacity: 0,
              filter:
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
            }
      }
      animate={
        skipAnimation
          ? {
              opacity: 1,
              filter:
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
            }
          : {
              opacity: [
                0,
                1,
                0.86,
                1,
                0.92,
                1,
              ],
              filter: [
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
                "drop-shadow(0 0 18px rgba(255,140,0,0.45))",
                "drop-shadow(0 0 10px rgba(255,140,0,0.25))",
              ],
            }
      }
      transition={
        skipAnimation
          ? {
              duration: 0,
            }
          : {
              opacity: {
                delay: HERO_T.badgeStart,
                duration:
                  HERO_T.badgeEnd -
                  HERO_T.badgeStart,
                times: [
                  0,
                  0.45,
                  0.6,
                  0.75,
                  0.88,
                  1,
                ],
                ease: "easeOut",
              },
              filter: {
                delay: HERO_T.badgeStart,
                duration:
                  HERO_T.badgeEnd -
                  HERO_T.badgeStart,
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

/* ─────────────────────────────────────────────────────────
   RawToCompiledName — name compile-in animation
───────────────────────────────────────────────────────── */
export function RawToCompiledName({
  first,
  last,
  classNameCompiled,
}: {
  first: string;
  last: string;
  classNameCompiled: string;
}) {
  const skipAnimation = useSkipHeroAnimation();

  return (
    <div className="leading-none uppercase">
      <motion.h1
        className={`leading-none ${classNameCompiled}`}
        initial={
          skipAnimation
            ? {
                opacity: 1,
                y: 0,
              }
            : {
                opacity: 0,
                y: -6,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={
          skipAnimation
            ? {
                duration: 0,
              }
            : {
                delay: HERO_T.compileStart,
                duration:
                  HERO_T.compileEnd -
                  HERO_T.compileStart,
                ease: [0.2, 1.3, 0.3, 1],
              }
        }
      >
        <span className="text-white">
          {first}
        </span>{" "}
        <br />

        <span className="text-primary">
          {last}
        </span>
      </motion.h1>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   StaggerIn — CTA buttons stagger reveal
───────────────────────────────────────────────────────── */
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
  const skipAnimation = useSkipHeroAnimation();
  const childrenArray =
    React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map(
        (child, index) => (
          <motion.div
            key={index}
            initial={
              skipAnimation
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={
              skipAnimation
                ? {
                    duration: 0,
                  }
                : {
                    delay:
                      start +
                      index * stagger,
                    duration:
                      HERO_T.ctaEnd -
                      HERO_T.ctaStart,
                    ease: "easeOut",
                  }
            }
            style={{
              display: "inline-flex",
            }}
          >
            {child}
          </motion.div>
        ),
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GlowBreath — one-time radial glow flash
───────────────────────────────────────────────────────── */
export function GlowBreath({
  className,
  at = HERO_T.polishStart,
  centers = ["50% 18%", "50% 58%"],
}: {
  className?: string;
  at?: number;
  centers?: string[];
}) {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const background = useMemo(
    () =>
      centers
        .map(
          (center) =>
            `radial-gradient(circle at ${center}, rgba(255,140,0,0.10), transparent 45%)`,
        )
        .join(", "),
    [centers],
  );

  if (
    isIntroPlayed() ||
    prefersReducedMotion
  ) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none ${
        className ?? ""
      }`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
      }}
      transition={{
        delay: at,
        duration:
          HERO_T.polishEnd -
          HERO_T.polishStart,
        ease: "easeOut",
      }}
      style={{
        position: "absolute",
        inset: 0,
        filter: "blur(22px)",
        background,
        zIndex: 1,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   BadgeIdlePulse — repeating micro glow after intro
───────────────────────────────────────────────────────── */
export function BadgeIdlePulse({
  children,
  className,
  delayAfterIntro = 1.8,
}: {
  children: React.ReactNode;
  className?: string;
  delayAfterIntro?: number;
}) {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={{
        filter:
          "drop-shadow(0 0 0px rgba(255,140,0,0))",
      }}
      animate={
        prefersReducedMotion
          ? {
              filter:
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
            }
          : {
              filter: [
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
                "drop-shadow(0 0 8px rgba(255,140,0,0.05))",
                "drop-shadow(0 0 0px rgba(255,140,0,0))",
              ],
            }
      }
      transition={
        prefersReducedMotion
          ? {
              duration: 0,
            }
          : {
              delay: isIntroPlayed()
                ? 0
                : delayAfterIntro,
              duration: 0.9,
              repeat: Infinity,
              repeatDelay: 6.5,
              ease: "easeOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   CTAButton — hover lift + arrow nudge
───────────────────────────────────────────────────────── */
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
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 ${className}`}
      initial="idle"
      whileHover={
        prefersReducedMotion
          ? undefined
          : "hover"
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : {
              scale: 0.98,
            }
      }
      variants={{
        idle: {
          y: 0,
          filter:
            "drop-shadow(0 0 0px rgba(255,140,0,0))",
        },
        hover: {
          y: -2,
          filter:
            "drop-shadow(0 0 12px rgba(255,140,0,0.18))",
        },
      }}
      transition={
        prefersReducedMotion
          ? {
              duration: 0,
            }
          : {
              duration: 0.18,
              ease: "easeOut",
            }
      }
    >
      <span>{children}</span>

      {showArrow && (
        <motion.span
          aria-hidden="true"
          className="inline-flex"
          variants={{
            idle: {
              x: 0,
            },
            hover: {
              x: 3,
            },
          }}
          transition={
            prefersReducedMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 0.18,
                  ease: "easeOut",
                }
          }
        >
          <ArrowRight size={18} />
        </motion.span>
      )}
    </motion.a>
  );
}