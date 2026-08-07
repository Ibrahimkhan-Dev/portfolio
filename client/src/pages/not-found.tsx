import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const SITE_NAME = "Muhammad Ibrahim Khan";

export default function NotFound() {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  useEffect(() => {
    const previousTitle = document.title;

    document.title = `Page Not Found | ${SITE_NAME}`;

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      aria-labelledby="not-found-title"
      className="flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground focus:outline-none"
    >
      <div className="space-y-6 text-center">
        <h1
          id="not-found-title"
          className="font-display text-7xl font-black uppercase italic text-primary sm:text-8xl"
        >
          404
        </h1>

        <p className="text-xl font-bold uppercase tracking-tighter text-muted-foreground sm:text-2xl">
          Page Not Found
        </p>

        <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
          The page you&apos;re looking for does not exist or may have been
          moved.
        </p>

        <Link
          href="/"
          aria-label="Return to the portfolio homepage"
          className={`inline-flex items-center gap-3 bg-primary px-8 py-4 font-black uppercase tracking-widest text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
            prefersReducedMotion
              ? ""
              : "transition-transform hover:scale-105 active:scale-95"
          }`}
        >
          <ArrowLeft
            size={20}
            aria-hidden="true"
          />

          Back Home
        </Link>
      </div>
    </main>
  );
}