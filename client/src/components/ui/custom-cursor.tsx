import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();

  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const dotX = useSpring(rawX, {
    stiffness: 500,
    damping: 28,
  });

  const dotY = useSpring(rawY, {
    stiffness: 500,
    damping: 28,
  });

  const ringX = useSpring(rawX, {
    stiffness: 250,
    damping: 20,
  });

  const ringY = useSpring(rawY, {
    stiffness: 250,
    damping: 20,
  });

  const hoverRef = useRef(false);

  useEffect(() => {
    const touchDevice = isTouchDevice();

    setIsTouch(touchDevice);

    if (touchDevice || prefersReducedMotion) {
      hoverRef.current = false;
      setIsHovering(false);
      return;
    }

    const onMove = (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const isInteractive = Boolean(
        target.closest(
          "button, a, input, textarea, select, [role='link'], [role='button']",
        ),
      );

      if (isInteractive !== hoverRef.current) {
        hoverRef.current = isInteractive;
        setIsHovering(isInteractive);
      }
    };

    const onWindowLeave = () => {
      if (hoverRef.current) {
        hoverRef.current = false;
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove, {
      passive: true,
    });

    window.addEventListener("mouseover", onOver, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "mouseleave",
      onWindowLeave,
    );

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        onWindowLeave,
      );
    };
  }, [prefersReducedMotion, rawX, rawY]);

  if (isTouch || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9999 h-4 w-4 rounded-full bg-primary mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: -8,
          translateY: -8,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-9998 h-8 w-8 rounded-full border border-primary/50"
        style={{
          x: ringX,
          y: ringY,
          translateX: -16,
          translateY: -16,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
      />
    </>
  );
}