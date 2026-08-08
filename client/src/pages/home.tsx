import {
  lazy,
  Suspense,
  useEffect,
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

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: {
      timeout?: number;
    },
  ) => number;

  cancelIdleCallback?: (
    handle: number,
  ) => void;
};

export default function Home() {
  const [
    cursorEnabled,
    setCursorEnabled,
  ] = useState(false);

  const [
    belowFoldEnabled,
    setBelowFoldEnabled,
  ] = useState(false);

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

  /*
   * Restore navigation intent when returning from
   * another route.
   *
   * For a normal homepage visit, keep the
   * below-the-fold bundle out of the first render
   * and request it once the browser becomes idle.
   *
   * When a specific section was requested, load
   * the deferred content immediately so the
   * existing MutationObserver-based scroll helper
   * can find the section as soon as it mounts.
   */
  useEffect(() => {
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

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    const scrollBehavior: ScrollBehavior =
      prefersReducedMotion
        ? "auto"
        : "smooth";

    /*
     * A navigation target exists.
     *
     * Load the below-fold content immediately,
     * then let scrollToElementWhenReady wait for
     * the requested section to appear.
     */
    if (sectionId) {
      setBelowFoldEnabled(true);

      return scrollToElementWhenReady(
        sectionId,
        scrollBehavior,
      );
    }

    /*
     * Normal homepage visit always begins at the
     * top of the page.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    /*
     * Keep Experience, Projects, Credentials,
     * Skills and Contact out of the critical
     * Navbar + Hero rendering window.
     */
    const idleWindow =
      window as IdleWindow;

    let idleCallbackId:
      | number
      | undefined;

    let timeoutId:
      | number
      | undefined;

    const enableBelowFold = () => {
      setBelowFoldEnabled(true);
    };

    if (
      idleWindow.requestIdleCallback
    ) {
      idleCallbackId =
        idleWindow.requestIdleCallback(
          enableBelowFold,
          {
            timeout: 1000,
          },
        );
    } else {
      /*
       * Safari / browsers without
       * requestIdleCallback support.
       */
      timeoutId = window.setTimeout(
        enableBelowFold,
        250,
      );
    }

    return () => {
      if (
        idleCallbackId !==
          undefined &&
        idleWindow.cancelIdleCallback
      ) {
        idleWindow.cancelIdleCallback(
          idleCallbackId,
        );
      }

      if (
        timeoutId !== undefined
      ) {
        window.clearTimeout(
          timeoutId,
        );
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-black">
      <TerminalBoot />

      {cursorEnabled && (
        <Suspense fallback={null}>
          <LazyCustomCursor />
        </Suspense>
      )}

      <BackgroundFX />

      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
      >
        <Hero />

        {belowFoldEnabled && (
          <Suspense fallback={null}>
            <LazyBelowFold />
          </Suspense>
        )}
      </main>
    </div>
  );
}