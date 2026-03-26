/**
 * site-animations.tsx — re-export barrel
 *
 * Consumers import from here as before; the implementations live in:
 *   intro-animations.tsx  — _introPlayed flag, BackgroundFX, TerminalBoot
 *   scroll-animations.tsx — Reveal, Stagger, SectionComment
 *   hero-animations.tsx   — HERO_T, BadgePowerOn, BadgeIdlePulse,
 *                           RawToCompiledName, StaggerIn, CTAButton,
 *                           GlowBreath, TypingLine
 */

export {
  BOOT_DURATION,
  isIntroPlayed,
  markIntroPlayed,
  BackgroundFX,
  TerminalBoot,
} from "./intro-animations";

export {
  Reveal,
  Stagger,
  SectionComment,
} from "./scroll-animations";

export {
  HERO_T,
  TypingLine,
  BadgePowerOn,
  RawToCompiledName,
  StaggerIn,
  GlowBreath,
  BadgeIdlePulse,
  CTAButton,
} from "./hero-animations";
