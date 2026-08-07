import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Credentials", href: "#credentials" },
  { name: "Tech Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const resumeUrl = "/Muhammad-Ibrahim-Khan-Resume.pdf";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const scrollBehavior: ScrollBehavior = prefersReducedMotion
    ? "auto"
    : "smooth";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(
      "(min-width: 1024px)",
    );

    const handleDesktopChange = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    desktopMediaQuery.addEventListener(
      "change",
      handleDesktopChange,
    );

    return () => {
      desktopMediaQuery.removeEventListener(
        "change",
        handleDesktopChange,
      );
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const rootElement = document.getElementById("root");
    const previousBodyOverflow = document.body.style.overflow;
    const rootWasInert =
      rootElement?.hasAttribute("inert") ?? false;
    const previousAriaHidden =
      rootElement?.getAttribute("aria-hidden") ?? null;

    document.body.style.overflow = "hidden";

    if (rootElement) {
      rootElement.setAttribute("inert", "");
      rootElement.setAttribute("aria-hidden", "true");
    }

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const menuElement = mobileMenuRef.current;

      if (!menuElement) {
        return;
      }

      const focusableElements = Array.from(
        menuElement.querySelectorAll<HTMLElement>(
          focusableSelector,
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement ||
          !menuElement.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow = previousBodyOverflow;

      if (rootElement) {
        if (rootWasInert) {
          rootElement.setAttribute("inert", "");
        } else {
          rootElement.removeAttribute("inert");
        }

        if (previousAriaHidden === null) {
          rootElement.removeAttribute("aria-hidden");
        } else {
          rootElement.setAttribute(
            "aria-hidden",
            previousAriaHidden,
          );
        }
      }

      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (
    event: ReactMouseEvent<HTMLElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const id = sectionId.replace("#", "");

    if (location !== "/") {
      sessionStorage.setItem(
        "portfolio_scroll_to_section",
        id,
      );
      setLocation("/");
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: scrollBehavior,
    });
  };

  const handleLogoClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    if (location !== "/") {
      setLocation("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  };

  const handleMobileLogoClick = () => {
    setIsMobileMenuOpen(false);

    if (location !== "/") {
      setLocation("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: scrollBehavior,
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          ease: "easeOut",
        }}
        aria-label="Primary navigation"
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b-2 border-primary bg-[#050505]/95 py-3 shadow-[0_0_30px_rgba(255,87,34,0.15)] backdrop-blur-md sm:py-4"
            : "bg-transparent py-4 sm:py-8",
        )}
      >
        <div className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            onClick={handleLogoClick}
            className="group flex shrink-0 items-center gap-3 text-2xl font-black uppercase italic tracking-tighter text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-3xl"
          >
            <span>
              IBRAHIM
              <span className="text-primary transition-all group-hover:animate-pulse">
                .
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center justify-end space-x-4 lg:flex xl:space-x-6 2xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={(event) =>
                  scrollToSection(event, link.href)
                }
                className="group relative cursor-pointer border-0 bg-transparent py-2 text-xs font-black uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background xl:tracking-[0.2em]"
              >
                {link.name}

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"
                />
              </button>
            ))}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
              className="group relative py-2 text-xs font-black uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background xl:tracking-[0.2em]"
            >
              Resume

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full"
              />
            </a>

            <button
              type="button"
              onClick={(event) =>
                scrollToSection(event, "#contact")
              }
              className="cursor-pointer border-0 bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-background xl:px-8"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            className="p-1 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:hidden"
            onClick={() =>
              setIsMobileMenuOpen(
                (currentValue) => !currentValue,
              )
            }
            aria-label={
              isMobileMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
          >
            {isMobileMenuOpen ? (
              <X size={32} aria-hidden="true" />
            ) : (
              <Menu size={32} aria-hidden="true" />
            )}
          </button>
        </div>
      </motion.nav>

      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="fixed inset-0 z-9999 flex flex-col overflow-y-auto bg-[#050505] lg:hidden"
            >
              <h2
                id="mobile-navigation-title"
                className="sr-only"
              >
                Portfolio navigation
              </h2>

              {/* Mobile menu header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-6 py-5">
                <button
                  type="button"
                  onClick={handleMobileLogoClick}
                  className="border-0 bg-transparent text-xl font-black uppercase italic tracking-tighter text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  aria-label="Return to the top of the portfolio"
                >
                  IBRAHIM
                  <span className="text-primary">.</span>
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className="p-1 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  aria-label="Close menu"
                >
                  <X size={32} aria-hidden="true" />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex grow flex-col gap-1 px-6 py-8">
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(event) =>
                      scrollToSection(event, link.href)
                    }
                    className="w-full cursor-pointer border-x-0 border-b border-t-0 border-white/5 bg-transparent py-3 text-left text-2xl font-black uppercase tracking-tighter text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:py-4 sm:text-4xl"
                  >
                    <span className="mr-3 text-sm font-black tabular-nums text-primary/30">
                      0{index + 1}
                    </span>

                    {link.name}
                  </button>
                ))}

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
                  className="w-full border-b border-white/5 py-3 text-left text-2xl font-black uppercase tracking-tighter text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset sm:py-4 sm:text-4xl"
                >
                  <span className="mr-3 text-sm font-black tabular-nums text-primary/30">
                    06
                  </span>

                  Resume
                </a>
              </div>

              {/* Mobile CTA */}
              <div className="shrink-0 px-6 pb-10">
                <button
                  type="button"
                  onClick={(event) =>
                    scrollToSection(event, "#contact")
                  }
                  className="w-full cursor-pointer border-0 bg-primary py-5 text-center text-base font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}