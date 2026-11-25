import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import {
  BackgroundFX,
  TerminalBoot,
} from "@/components/ui/site-animations";
import { scrollToElementWhenReady } from "@/lib/scroll-to";

const LazyCustomCursor = lazy(
  () =>
    import(
      "@/components/ui/custom-cursor"
    ),
);

const LazyBelowFold = lazy(
  () =>
    import(
      "@/components/home-below-fold"
    ),
);

const SCROLL_TO_PROJECTS_KEY =
  "portfolio_scroll_to_projects";

const SCROLL_TO_SECTION_KEY =
  "portfolio_scroll_to_section";

const belowFoldSections = ["projects", "experience", "credentials", "skills", "contact"];

export default function Home() {
  const [
    cursorEnabled,
    setCursorEnabled,
  ] = useState(false);

  const [
    belowFoldEnabled,
    setBelowFoldEnabled,
  ] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(false);
  const cancelSectionScroll = useRef<(() => void) | undefined>(undefined);

  const navigateToSection = useCallback((id: string, behavior: ScrollBehavior) => {
    if (belowFoldSections.includes(id)) setBelowFoldEnabled(true);
    cancelSectionScroll.current?.();
    cancelSectionScroll.current = scrollToElementWhenReady(id, behavior);
  }, []);

  /*
   * Load the custom cursor only on devices that
   * actually support a fine pointer.
   *
   * The dynamic cursor bundle is requested only
   * after the first real pointer movement.
   */
  useEffect(() => {
    const isFinePointer =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (
      !isFinePointer ||
      reducedMotion
    ) {
      return;
    }

    const onMove = () => {
      setCursorEnabled(true);
    };

    window.addEventListener(
      "pointermove",
      onMove,
      {
        once: true,
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        onMove,
      );
    };
  }, []);

  useEffect(() => {
    // Keep the first render identical to the HTML written at build time.
    setEffectsEnabled(true);
    let sectionId: string | null = null;

    try {
      sectionId =
        window.sessionStorage.getItem(
          SCROLL_TO_SECTION_KEY,
        ) ||
        (window.sessionStorage.getItem(
          SCROLL_TO_PROJECTS_KEY,
        )
          ? "projects"
          : null);

      window.sessionStorage.removeItem(
        SCROLL_TO_SECTION_KEY,
      );

      window.sessionStorage.removeItem(
        SCROLL_TO_PROJECTS_KEY,
      );
    } catch {
      /*
       * Session storage may be blocked.
       * The homepage can still load normally.
       */
    }

    const requestedFragment = window.location.hash.slice(1);
    if (["about", ...belowFoldSections].includes(requestedFragment)) {
      sectionId = requestedFragment;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const scrollBehavior: ScrollBehavior =
      prefersReducedMotion
        ? "auto"
        : "smooth";

    if (sectionId) {
      navigateToSection(sectionId, scrollBehavior);
    }

    return () => cancelSectionScroll.current?.();
  }, [navigateToSection]);

  useEffect(() => {
    if (belowFoldEnabled) return;

    const loadAfterScroll = () => {
      if (window.scrollY > 0) setBelowFoldEnabled(true);
    };
    window.addEventListener("scroll", loadAfterScroll, { passive: true });
    loadAfterScroll();
    return () => window.removeEventListener("scroll", loadAfterScroll);
  }, [belowFoldEnabled]);

  const loadProjects = () => navigateToSection(
    "projects",
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-black">
      {effectsEnabled && <TerminalBoot />}

      {cursorEnabled && (
        <Suspense fallback={null}>
          <LazyCustomCursor />
        </Suspense>
      )}

      {effectsEnabled && <BackgroundFX />}

      <Navbar onSectionNavigate={navigateToSection} />

      <main
        id="main-content"
        className="portfolio-home"
        tabIndex={-1}
      >
        <div className="home-hero-stage">
          <Hero onProjectsNavigate={loadProjects} />
        </div>

        {belowFoldEnabled
          ? <Suspense fallback={<div aria-hidden="true" className="h-24" />}><LazyBelowFold /></Suspense>
          : <div aria-hidden="true" className="h-24" />}
      </main>
    </div>
  );
}
