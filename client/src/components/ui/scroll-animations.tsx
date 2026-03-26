"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   Reveal — fade + slide in when element enters viewport
───────────────────────────────────────────────────────── */
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
      show: { opacity: 1, y: 0, transition: { duration, ease: "easeOut", delay } },
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

/* ─────────────────────────────────────────────────────────
   Stagger — staggered children reveal on scroll
───────────────────────────────────────────────────────── */
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
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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

/* ─────────────────────────────────────────────────────────
   SectionComment — decorative scroll-triggered code comment
───────────────────────────────────────────────────────── */
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
