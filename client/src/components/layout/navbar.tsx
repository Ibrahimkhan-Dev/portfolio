import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const navLinks = [
  { name: "Work", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Credentials", href: "#credentials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (location !== "/") {
      window.location.href = "/" + href;
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 sm:py-4 bg-[#050505]/95 backdrop-blur-md border-b-2 border-primary shadow-[0_0_30px_rgba(255,87,34,0.15)]" : "py-4 sm:py-8 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); setLocation("/"); }}
          className="flex items-center gap-3 text-2xl sm:text-3xl font-black font-display tracking-tighter text-white uppercase italic group"
        >
          <span>
            IBRAHIM<span className="text-primary group-hover:animate-pulse transition-all">.</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-xs font-black uppercase tracking-[0.15em] xl:tracking-[0.2em] text-white/70 hover:text-primary transition-colors relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="px-6 xl:px-8 py-3 bg-primary text-black text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,87,34,0.3)]"
          >
            Start Project
          </a>
        </div>

        <button
          className="lg:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="lg:hidden fixed inset-0 bg-[#050505] z-[60] flex flex-col items-center justify-center space-y-6 sm:space-y-10 p-6 overflow-y-auto"
          >
            <button
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={36} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-white hover:text-primary transition-colors text-center"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="w-full max-w-md py-5 sm:py-6 bg-primary text-black text-lg sm:text-xl font-black uppercase tracking-widest text-center"
            >
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
