import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/ui/site-animations";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";

export default function Credentials() {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const sortedCertifications = useMemo(
    () =>
      [...certifications].sort(
        (firstCertification, secondCertification) =>
          Number(secondCertification.year) -
          Number(firstCertification.year),
      ),
    [],
  );

  const sliderRef =
    useRef<HTMLDivElement | null>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);

  const scrollBehavior: ScrollBehavior =
    prefersReducedMotion ? "auto" : "smooth";

  const updateScrollControls = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const maximumScrollLeft =
      slider.scrollWidth - slider.clientWidth;

    const tolerance = 2;

    setCanScrollLeft(
      slider.scrollLeft > tolerance,
    );

    setCanScrollRight(
      slider.scrollLeft <
        maximumScrollLeft - tolerance,
    );
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const updateFrame =
      window.requestAnimationFrame(
        updateScrollControls,
      );

    slider.addEventListener(
      "scroll",
      updateScrollControls,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateScrollControls,
      {
        passive: true,
      },
    );

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(
            updateScrollControls,
          )
        : null;

    resizeObserver?.observe(slider);

    return () => {
      window.cancelAnimationFrame(updateFrame);

      slider.removeEventListener(
        "scroll",
        updateScrollControls,
      );

      window.removeEventListener(
        "resize",
        updateScrollControls,
      );

      resizeObserver?.disconnect();
    };
  }, [
    sortedCertifications.length,
    updateScrollControls,
  ]);

  const scrollByCards = (
    direction: "left" | "right",
  ) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const amount = Math.max(
      340,
      Math.floor(slider.clientWidth * 0.9),
    );

    slider.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,
      behavior: scrollBehavior,
    });
  };

  const scrollToSliderEdge = (
    edge: "start" | "end",
  ) => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollTo({
      left:
        edge === "start"
          ? 0
          : slider.scrollWidth,
      behavior: scrollBehavior,
    });
  };

  const handleSliderKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCards("left");
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCards("right");
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      scrollToSliderEdge("start");
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      scrollToSliderEdge("end");
    }
  };

  return (
    <section
      id="credentials"
      className="relative border-y border-white/5 bg-[#080808] py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="mb-12 sm:mb-20">
          <h2 className="mb-4 font-display text-4xl font-black uppercase italic text-white sm:text-5xl md:text-7xl">
            Credentials
          </h2>

          <div
            className="h-2 w-32 bg-primary sm:w-40"
            aria-hidden="true"
          />
        </Reveal>

        {/* Education */}
        <Reveal className="mb-4 sm:mb-6">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary/60">
            Education
          </h3>
        </Reveal>

        <div className="mb-16 grid items-stretch gap-6 sm:mb-24 sm:gap-12 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal
              key={item.id ?? String(index)}
              delay={index * 0.1}
              className="h-full"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden border-2 border-white/5 bg-card p-6 text-left transition-all hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-10"
                    aria-label={`View education details for ${item.degree} at ${item.institution}`}
                  >
                    <div
                      className="absolute -bottom-4 -right-4 opacity-5 transition-opacity group-hover:opacity-10"
                      aria-hidden="true"
                    >
                      <GraduationCap
                        size={120}
                        className="sm:h-37.5 sm:w-37.5"
                      />
                    </div>

                    <span className="text-xs font-black uppercase tracking-[0.2em] text-primary sm:tracking-[0.3em]">
                      {item.period}
                    </span>

                    <span className="mt-3 text-2xl font-black uppercase italic leading-none text-white transition-colors group-hover:text-primary sm:mt-4 sm:text-4xl">
                      {item.institution}
                    </span>

                    <span className="my-4 text-xl font-bold uppercase leading-none tracking-tighter text-white/60 sm:my-6 sm:text-2xl">
                      {item.degree}
                    </span>

                    <span className="grow text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {item.desc}
                    </span>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-h-[85vh] w-[92vw] max-w-2xl overflow-y-auto rounded-none border-2 border-primary/50 bg-[#0b0b0b] text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic text-primary sm:text-4xl">
                      {item.institution}
                    </DialogTitle>

                    <DialogDescription className="text-base font-bold uppercase tracking-tight text-white/60 sm:text-xl">
                      {item.degree} | {item.period}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                    <div className="border-l-4 border-primary bg-white/5 p-4 italic sm:p-6">
                      <p className="text-base text-white/80 sm:text-xl">
                        {item.desc}
                      </p>
                    </div>

                    {(item.details ?? []).length >
                      0 && (
                      <div className="space-y-3 sm:space-y-4">
                        <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                          Academic Highlights
                        </h4>

                        <ul className="space-y-3">
                          {(item.details ?? []).map(
                            (
                              detail,
                              detailIndex,
                            ) => (
                              <li
                                key={detailIndex}
                                className="flex items-start gap-3 text-sm font-medium text-white/80 sm:text-lg"
                              >
                                <CheckCircle2
                                  className="mt-1 shrink-0 text-primary"
                                  size={18}
                                  aria-hidden="true"
                                />

                                <span>
                                  {detail}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>

        {/* Certifications */}
        <Reveal className="mb-4 sm:mb-6">
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary/60">
            Certifications &amp; Professional
            Learning
          </h3>
        </Reveal>

        <p
          id="certifications-slider-instructions"
          className="sr-only"
        >
          Use the previous and next buttons, or
          focus this region and press the left and
          right arrow keys. Press Home to move to
          the first certification and End to move
          to the last.
        </p>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              scrollByCards("left")
            }
            disabled={!canScrollLeft}
            aria-label="Scroll to previous certifications"
            aria-controls="certifications-slider"
            className="absolute -left-6 top-1/2 z-20 hidden h-16 w-12 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/60 text-white transition-all hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-black/60 lg:-left-10 md:flex"
          >
            <ChevronLeft
              size={26}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              scrollByCards("right")
            }
            disabled={!canScrollRight}
            aria-label="Scroll to next certifications"
            aria-controls="certifications-slider"
            className="absolute -right-6 top-1/2 z-20 hidden h-16 w-12 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/60 text-white transition-all hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-black/60 lg:-right-10 md:flex"
          >
            <ChevronRight
              size={26}
              aria-hidden="true"
            />
          </button>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#080808] to-transparent"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#080808] to-transparent"
            aria-hidden="true"
          />

          <div
            ref={sliderRef}
            id="certifications-slider"
            role="region"
            aria-label="Certifications and professional learning"
            aria-describedby="certifications-slider-instructions"
            tabIndex={0}
            onKeyDown={handleSliderKeyDown}
            className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-8 ${
              prefersReducedMotion
                ? "scroll-auto"
                : "scroll-smooth"
            }`}
          >
            {sortedCertifications.map(
              (certification, index) => (
                <Reveal
                  key={
                    certification.id ??
                    String(index)
                  }
                  delay={index * 0.05}
                  className="w-70 min-w-70 shrink-0 snap-start sm:w-105 sm:min-w-105 lg:w-120 lg:min-w-120"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.button
                        type="button"
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : {
                                y: -10,
                              }
                        }
                        transition={
                          prefersReducedMotion
                            ? {
                                duration: 0,
                              }
                            : {
                                duration: 0.2,
                                ease: "easeOut",
                              }
                        }
                        className="group relative flex h-full w-full cursor-pointer flex-col border-2 border-white/5 bg-card p-5 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-6"
                        aria-label={`View certification details for ${certification.title}`}
                      >
                        <div
                          className="absolute right-0 top-0 p-3 opacity-5 transition-opacity group-hover:opacity-20"
                          aria-hidden="true"
                        >
                          <Award
                            size={48}
                            className="text-primary"
                          />
                        </div>

                        <div className="mb-3 flex items-center gap-3">
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary sm:h-10 sm:w-10"
                            aria-hidden="true"
                          >
                            <Award size={18} />
                          </div>

                          <span className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                            {certification.issuer ??
                              "Certificate"}
                          </span>
                        </div>

                        <span className="mb-1.5 line-clamp-2 text-xl font-black uppercase italic leading-tight transition-colors group-hover:text-primary sm:text-2xl">
                          {certification.title}
                        </span>

                        <span className="mb-3 line-clamp-2 grow text-xs leading-snug text-muted-foreground sm:mb-4 sm:text-sm">
                          {certification.description ??
                            ""}
                        </span>

                        <span className="flex items-center justify-between border-t border-white/5 pt-3">
                          <span className="flex items-center gap-2 text-xs font-black uppercase text-white/40">
                            <Calendar
                              size={14}
                              aria-hidden="true"
                            />

                            {certification.year ??
                              ""}
                          </span>

                          <span
                            className="bg-white/5 p-1.5 transition-all group-hover:bg-primary group-hover:text-black"
                            aria-hidden="true"
                          >
                            {certification.credentialUrl ? (
                              <ExternalLink
                                size={16}
                              />
                            ) : (
                              <Award size={16} />
                            )}
                          </span>
                        </span>
                      </motion.button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[85vh] w-[92vw] max-w-4xl overflow-y-auto rounded-none border-2 border-primary/50 bg-[#0b0b0b] text-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase italic text-primary sm:text-4xl">
                          {certification.title}
                        </DialogTitle>

                        <DialogDescription className="text-base font-bold uppercase tracking-tight text-white/60 sm:text-xl">
                          {(certification.issuer ??
                            "Certificate") +
                            (certification.year
                              ? ` • ${certification.year}`
                              : "")}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
                        {certification.description && (
                          <div className="border-l-4 border-primary bg-white/5 p-4 italic sm:p-6">
                            <p className="text-base text-white/80 sm:text-xl">
                              {
                                certification.description
                              }
                            </p>
                          </div>
                        )}

                        {(certification.skills ?? [])
                          .length > 0 && (
                          <div className="space-y-3 sm:space-y-4">
                            <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                              Skills &amp; Topics
                            </h4>

                            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                              {(
                                certification.skills ??
                                []
                              ).map((skill) => (
                                <li
                                  key={skill}
                                  className="flex items-center gap-3 bg-white/5 p-2.5 text-sm font-medium text-white/80 sm:p-3 sm:text-lg"
                                >
                                  <CheckCircle2
                                    className="shrink-0 text-primary"
                                    size={18}
                                    aria-hidden="true"
                                  />

                                  <span>
                                    {skill}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {certification.credentialUrl && (
                          <div className="pt-4 sm:pt-6">
                            <a
                              href={
                                certification.credentialUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${certification.title} credential in a new tab`}
                              className={`flex h-14 w-full items-center justify-center bg-primary text-base font-black uppercase tracking-widest text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-16 sm:text-lg ${
                                prefersReducedMotion
                                  ? ""
                                  : "transition-transform hover:scale-[1.02]"
                              }`}
                            >
                              View Credential

                              <ExternalLink
                                size={18}
                                className="ml-2"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}