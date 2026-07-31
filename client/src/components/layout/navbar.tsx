import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (
    event: React.MouseEvent<HTMLElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const id = sectionId.replace("#", "");

    if (location !== "/") {
      sessionStorage.setItem("portfolio_scroll_to_section", id);
      setLocation("/");
      return;
    }

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    if (location !== "/") {
      setLocation("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
            className="group flex shrink-0 items-center gap-3 text-2xl font-black uppercase italic tracking-tighter text-white sm:text-3xl"
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
                className="group relative cursor-pointer border-0 bg-transparent py-2 text-xs font-black uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-primary xl:tracking-[0.2em]"
              >
                {link.name}

                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
              </button>
            ))}

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
              className="group relative py-2 text-xs font-black uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary xl:tracking-[0.2em]"
            >
              Resume

              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </a>

            <button
              type="button"
              onClick={(event) =>
                scrollToSection(event, "#contact")
              }
              className="cursor-pointer border-0 bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-black shadow-[0_0_15px_rgba(255,87,34,0.3)] transition-all hover:scale-105 active:scale-95 xl:px-8"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-primary lg:hidden"
            onClick={() =>
              setIsMobileMenuOpen((currentValue) => !currentValue)
            }
            aria-label={
              isMobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
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
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="fixed inset-0 z-[9999] flex flex-col overflow-y-auto bg-[#050505] lg:hidden"
            >
              {/* Mobile menu header */}
              <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-6 py-5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);

                    if (location !== "/") {
                      setLocation("/");
                      return;
                    }

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="border-0 bg-transparent text-xl font-black uppercase italic tracking-tighter text-white"
                  aria-label="Return to the top of the portfolio"
                >
                  IBRAHIM
                  <span className="text-primary">.</span>
                </button>

                <button
                  type="button"
                  className="p-1 text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={32} aria-hidden="true" />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex flex-grow flex-col gap-1 px-6 py-8">
                {navLinks.map((link, index) => (
                  <button
                    key={link.name}
                    type="button"
                    onClick={(event) =>
                      scrollToSection(event, link.href)
                    }
                    className="w-full cursor-pointer border-x-0 border-b border-t-0 border-white/5 bg-transparent py-3 text-left text-2xl font-black uppercase tracking-tighter text-white transition-colors hover:text-primary sm:py-4 sm:text-4xl"
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="View Muhammad Ibrahim Khan's resume in a new tab"
                  className="w-full border-b border-white/5 py-3 text-left text-2xl font-black uppercase tracking-tighter text-white transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:py-4 sm:text-4xl"
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
                  className="w-full cursor-pointer border-0 bg-primary py-5 text-center text-base font-black uppercase tracking-widest text-black transition-opacity hover:opacity-90"
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