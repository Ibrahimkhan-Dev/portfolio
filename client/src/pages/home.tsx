import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Contact from "@/components/sections/contact";
import Credentials from "@/components/sections/credentials";
import Experience from "@/components/sections/experience";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import CustomCursor from "@/components/ui/custom-cursor";
import {
  BackgroundFX,
  TerminalBoot,
} from "@/components/ui/site-animations";

const SCROLL_TO_PROJECTS_KEY =
  "portfolio_scroll_to_projects";

const SCROLL_TO_SECTION_KEY =
  "portfolio_scroll_to_section";

export default function Home() {
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
      prefersReducedMotion ? "auto" : "smooth";

    let scrollFrame: number | null = null;

    if (sectionId) {
      scrollFrame = window.requestAnimationFrame(() => {
        const section =
          document.getElementById(sectionId);

        if (!section) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
          });

          return;
        }

        section.scrollIntoView({
          behavior: scrollBehavior,
          block: "start",
        });
      });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }

    return () => {
      if (scrollFrame !== null) {
        window.cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-black">
      <TerminalBoot />

      <CustomCursor />
      <BackgroundFX />
      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Experience />
        <Projects />
        <Credentials />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}