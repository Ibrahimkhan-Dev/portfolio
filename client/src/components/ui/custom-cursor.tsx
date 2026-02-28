import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
}

export default function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const dotX = useSpring(rawX, { stiffness: 500, damping: 28 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 28 });
  const ringX = useSpring(rawX, { stiffness: 250, damping: 20 });
  const ringY = useSpring(rawY, { stiffness: 250, damping: 20 });

  const hoverRef = useRef(false);

  useEffect(() => {
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hit = !!target.closest("button, a, [role='link'], [role='button']");
      if (hit !== hoverRef.current) {
        hoverRef.current = hit;
        setIsHovering(hit);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [rawX, rawY]);

  if (isTouch) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: -8, translateY: -8 }}
        animate={{ scale: isHovering ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: -16, translateY: -16 }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}
