import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Images,
  Layers,
  X,
} from "lucide-react";
import { projects } from "@/data/portfolio";
import CustomCursor from "@/components/ui/custom-cursor";

const SITE_NAME = "Muhammad Ibrahim Khan";
const DEFAULT_SOCIAL_IMAGE = "/opengraph.jpg";
const AUTO_SLIDE_INTERVAL_MS = 5000;
const GALLERY_TITLE_ID = "project-gallery-title";
const GALLERY_INSTRUCTIONS_ID = "project-gallery-instructions";
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

function isCloudinaryImage(source: string) {
  return (
    source.includes(CLOUDINARY_HOST) &&
    source.includes(CLOUDINARY_UPLOAD_SEGMENT)
  );
}

function getOptimizedProjectMediaUrl(
  source: string,
  width: number,
) {
  if (!isCloudinaryImage(source)) {
    return source;
  }

  return source.replace(
    CLOUDINARY_UPLOAD_SEGMENT,
    `${CLOUDINARY_UPLOAD_SEGMENT}f_auto,q_auto:good,c_limit,w_${width}/`,
  );
}

function getProjectMediaSrcSet(source: string) {
  if (!isCloudinaryImage(source)) {
    return undefined;
  }

  return [
    `${getOptimizedProjectMediaUrl(source, 640)} 640w`,
    `${getOptimizedProjectMediaUrl(source, 1200)} 1200w`,
    `${getOptimizedProjectMediaUrl(source, 1600)} 1600w`,
  ].join(", ");
}

function isVideoSource(source: string) {
  return /\.(mp4|webm|mov|ogg)(?:$|[?#])/i.test(source);
}

function toAbsoluteUrl(source: string) {
  try {
    return new URL(source, window.location.origin).href;
  } catch {
    return source;
  }
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block w-1 h-6 sm:h-7 bg-primary shrink-0"
        />
        <h2
          id={headingId}
          className="text-2xl sm:text-3xl font-black uppercase italic"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function ProjectDetail() {
  const [, params] = useRoute("/project/:id");
  const [, setLocation] = useLocation();
  const project = projects.find((item) => item.id === params?.id);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const mediaSlides = project?.gallery?.length
    ? project.gallery
    : project?.image
      ? [project.image]
      : [];

  const [galleryModal, setGalleryModal] = useState<{
    title: string;
    items: string[];
  } | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [sliderPaused, setSliderPaused] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const pageContentRef = useRef<HTMLDivElement | null>(null);
  const galleryDialogRef = useRef<HTMLDivElement | null>(null);
  const galleryCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSliderPaused(false);

    const frame = window.requestAnimationFrame(() => {
      sliderRef.current?.scrollTo({ left: 0 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [params?.id]);

  useEffect(() => {
    const previousTitle = document.title;
    const managedElements: Array<{
      element: HTMLElement;
      attribute: "content" | "href";
      previousValue: string | null;
      created: boolean;
    }> = [];

    const setHeadAttribute = (
      selector: string,
      createElement: () => HTMLElement,
      attribute: "content" | "href",
      value: string,
    ) => {
      let element = document.head.querySelector<HTMLElement>(selector);
      const created = !element;

      if (!element) {
        element = createElement();
        document.head.appendChild(element);
      }

      managedElements.push({
        element,
        attribute,
        previousValue: element.getAttribute(attribute),
        created,
      });

      element.setAttribute(attribute, value);
    };

    const pageTitle = project
      ? `${project.title} | ${SITE_NAME}`
      : `Project Not Found | ${SITE_NAME}`;
    const pageDescription = project
      ? project.shortDesc
      : "The requested portfolio project could not be found.";
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    const socialImage = toAbsoluteUrl(
      project?.gallery?.[0] ?? project?.image ?? DEFAULT_SOCIAL_IMAGE,
    );

    document.title = pageTitle;

    setHeadAttribute(
      'meta[name="description"]',
      () => {
        const element = document.createElement("meta");
        element.setAttribute("name", "description");
        return element;
      },
      "content",
      pageDescription,
    );

    const propertyMeta = (property: string, value: string) => {
      setHeadAttribute(
        `meta[property="${property}"]`,
        () => {
          const element = document.createElement("meta");
          element.setAttribute("property", property);
          return element;
        },
        "content",
        value,
      );
    };

    const namedMeta = (name: string, value: string) => {
      setHeadAttribute(
        `meta[name="${name}"]`,
        () => {
          const element = document.createElement("meta");
          element.setAttribute("name", name);
          return element;
        },
        "content",
        value,
      );
    };

    propertyMeta("og:title", pageTitle);
    propertyMeta("og:description", pageDescription);
    propertyMeta("og:type", "article");
    propertyMeta("og:site_name", SITE_NAME);
    propertyMeta("og:url", pageUrl);
    propertyMeta("og:image", socialImage);

    namedMeta("twitter:card", "summary_large_image");
    namedMeta("twitter:title", pageTitle);
    namedMeta("twitter:description", pageDescription);
    namedMeta("twitter:image", socialImage);

    setHeadAttribute(
      'link[rel="canonical"]',
      () => {
        const element = document.createElement("link");
        element.setAttribute("rel", "canonical");
        return element;
      },
      "href",
      pageUrl,
    );

    return () => {
      document.title = previousTitle;

      for (const managed of managedElements.reverse()) {
        if (managed.created) {
          managed.element.remove();
        } else if (managed.previousValue === null) {
          managed.element.removeAttribute(managed.attribute);
        } else {
          managed.element.setAttribute(
            managed.attribute,
            managed.previousValue,
          );
        }
      }
    };
  }, [project]);

  const openGallery = useCallback((title: string, items: string[]) => {
    if (items.length === 0) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setGalleryIndex(0);
    setMediaLoading(true);
    setGalleryModal({ title, items });
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryModal(null);
  }, []);

  const galleryPrev = useCallback(() => {
    const itemCount = galleryModal?.items.length ?? 0;
    if (itemCount <= 1) return;

    setMediaLoading(true);
    setGalleryIndex((currentIndex) =>
      currentIndex === 0 ? itemCount - 1 : currentIndex - 1,
    );
  }, [galleryModal?.items.length]);

  const galleryNext = useCallback(() => {
    const itemCount = galleryModal?.items.length ?? 0;
    if (itemCount <= 1) return;

    setMediaLoading(true);
    setGalleryIndex((currentIndex) =>
      currentIndex === itemCount - 1 ? 0 : currentIndex + 1,
    );
  }, [galleryModal?.items.length]);

  const selectGalleryItem = useCallback((index: number) => {
    setMediaLoading(true);
    setGalleryIndex(index);
  }, []);

  useEffect(() => {
    if (!galleryModal) return;

    const pageContent = pageContentRef.current;
    const previousBodyOverflow = document.body.style.overflow;
    const previousAriaHidden = pageContent?.getAttribute("aria-hidden") ?? null;
    const inertTarget = pageContent as
      | (HTMLDivElement & { inert: boolean })
      | null;
    const previousInert = inertTarget?.inert ?? false;

    document.body.style.overflow = "hidden";

    if (pageContent && inertTarget) {
      pageContent.setAttribute("aria-hidden", "true");
      inertTarget.inert = true;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      galleryCloseButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        galleryPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        galleryNext();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = galleryDialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true",
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === firstElement || !dialog.contains(activeElement)) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (
        activeElement === lastElement ||
        !dialog.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (pageContent && inertTarget) {
        inertTarget.inert = previousInert;

        if (previousAriaHidden === null) {
          pageContent.removeAttribute("aria-hidden");
        } else {
          pageContent.setAttribute("aria-hidden", previousAriaHidden);
        }
      }

      const elementToRestore = restoreFocusRef.current;
      restoreFocusRef.current = null;

      window.requestAnimationFrame(() => {
        elementToRestore?.focus();
      });
    };
  }, [closeGallery, galleryModal, galleryNext, galleryPrev]);

  useEffect(() => {
    if (prefersReducedMotion || sliderPaused || mediaSlides.length <= 1) {
      return;
    }

    const slider = sliderRef.current;
    if (!slider) return;

    const intervalId = window.setInterval(() => {
      if (document.hidden) return;

      const { scrollLeft, clientWidth, scrollWidth } = slider;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (atEnd) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: clientWidth, behavior: "smooth" });
      }
    }, AUTO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [mediaSlides.length, prefersReducedMotion, sliderPaused]);

  if (!project) {
    return (
      <div className="bg-background min-h-screen text-foreground flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl font-black uppercase italic text-primary">
            404
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            Project not found
          </p>
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("portfolio_scroll_to_projects", "1");
              setLocation("/");
            }}
            className="inline-flex items-center gap-3 bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase tracking-widest hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const hasLiveOrSource = Boolean(project.liveUrl || project.sourceUrl);
  const pulseClass = prefersReducedMotion ? "" : "animate-pulse";

  const scrollMedia = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction === "left" ? -slider.clientWidth : slider.clientWidth,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleSliderBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget;

    if (
      !(nextFocusedElement instanceof Node) ||
      !event.currentTarget.contains(nextFocusedElement)
    ) {
      setSliderPaused(false);
    }
  };

  const visualsTitle =
    project.id === "home-automation" ? "App & Hardware Visuals" : "Visuals";

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-black overflow-x-hidden">
      <div ref={pageContentRef}>
        <CustomCursor />

        <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem("portfolio_scroll_to_projects", "1");
              setLocation("/");
            }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-card border-2 border-white/5 p-3 sm:p-4 uppercase font-black text-xs sm:text-sm tracking-widest hover:border-primary transition-all group"
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back Home
          </button>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="pt-24 pb-12 sm:pt-32 sm:pb-20"
        >
          <div className="container mx-auto px-4 sm:px-6 max-w-400">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 lg:gap-x-20 gap-y-8 md:gap-y-10 w-full md:grid-rows-[auto_auto_auto_auto_auto] md:items-start"
            >
              <div className="min-w-0 w-full md:row-start-1 md:col-start-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {project.category && (
                    <div className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">
                      {project.category}
                    </div>
                  )}
                  {project.role && (
                    <motion.div
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, x: -20 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.2,
                        duration: prefersReducedMotion ? 0 : 0.5,
                        ease: "easeOut",
                      }}
                      className="bg-primary text-black px-3 sm:px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest inline-block"
                    >
                      {project.role}
                    </motion.div>
                  )}
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-display uppercase italic leading-tight mb-4">
                    {project.title}
                  </h1>
                  <div
                    aria-hidden="true"
                    className="h-2 w-32 sm:w-40 bg-primary mb-4 sm:mb-6"
                  />
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium uppercase tracking-tighter leading-snug">
                    {project.shortDesc}
                  </p>
                </div>
              </div>

              {(project.company ||
                project.duration ||
                project.team ||
                project.supervisor) && (
                <div className="min-w-0 w-full md:row-start-2 md:col-span-2 border-y border-white/5 py-4 sm:py-6">
                  <div className="flex flex-wrap gap-y-4 gap-x-6 sm:gap-x-10 lg:gap-x-16">
                    {project.company && (
                      <div className="flex-1 min-w-30">
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                          {project.category?.includes("Academic") ||
                          project.category?.includes("Final-Year")
                            ? "Institution"
                            : "Company"}
                        </p>
                        <p className="text-base sm:text-xl font-black uppercase italic">
                          {project.company}
                        </p>
                      </div>
                    )}

                    {project.supervisor && (
                      <div className="flex-1 min-w-30">
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                          Supervisor
                        </p>
                        <p className="text-base sm:text-xl font-black uppercase italic">
                          {project.supervisor}
                        </p>
                      </div>
                    )}

                    {project.team && (
                      <div className="flex-1 min-w-30">
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                          Team
                        </p>
                        <p className="text-base sm:text-xl font-black uppercase italic">
                          {project.team}
                        </p>
                      </div>
                    )}

                    {project.duration && (
                      <div className="flex-1 min-w-30">
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-1">
                          Duration
                        </p>
                        <p className="text-base sm:text-xl font-black uppercase italic">
                          {project.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <section
                aria-labelledby="project-visuals-title"
                className="min-w-0 w-full md:row-start-1 md:col-start-2 flex flex-col"
              >
                <h2
                  id="project-visuals-title"
                  className="text-lg font-black uppercase italic mb-3"
                >
                  {visualsTitle}
                </h2>

                <div
                  className="relative flex-1 min-h-0"
                  onMouseEnter={() => setSliderPaused(true)}
                  onMouseLeave={() => setSliderPaused(false)}
                  onFocusCapture={() => setSliderPaused(true)}
                  onBlurCapture={handleSliderBlur}
                >
                  {mediaSlides.length > 0 ? (
                    <>
                      {mediaSlides.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() => scrollMedia("left")}
                            aria-label="Show previous project image"
                            className="hidden md:flex items-center justify-center absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-10 bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all"
                          >
                            <ChevronLeft size={24} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => scrollMedia("right")}
                            aria-label="Show next project image"
                            className="hidden md:flex items-center justify-center absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-10 bg-black/60 hover:bg-black/80 border border-white/10 text-white transition-all"
                          >
                            <ChevronRight size={24} aria-hidden="true" />
                          </button>
                        </>
                      )}

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-background to-transparent z-10"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-background to-transparent z-10"
                      />

                      <div
                        ref={sliderRef}
                        aria-label={`${project.title} project images`}
                        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-2"
                      >
                        {mediaSlides.map((source, index) => (
                          <a
                            key={`${source}-${index}`}
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} visual ${index + 1} of ${mediaSlides.length} in a new tab`}
                            className="shrink-0 w-full min-w-full snap-start block aspect-video bg-card border-4 sm:border-8 border-white/5 overflow-hidden hover:border-primary transition-colors"
                          >
                            <img
                              src={getOptimizedProjectMediaUrl(
                                source,
                                1200,
                              )}
                              srcSet={getProjectMediaSrcSet(source)}
                              sizes={
                                isCloudinaryImage(source)
                                  ? "(min-width: 1280px) 720px, (min-width: 768px) 50vw, 100vw"
                                  : undefined
                              }
                              alt={`${project.title} visual ${index + 1}`}
                              width={1600}
                              height={900}
                              loading={index === 0 ? "eager" : "lazy"}
                              fetchPriority={index === 0 ? "high" : "auto"}
                              decoding="async"
                              draggable={false}
                              className="h-full w-full bg-card object-contain"
                            />
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, scale: 0.95 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.4,
                        duration: prefersReducedMotion ? 0 : 0.5,
                        ease: "easeOut",
                      }}
                      className="aspect-video bg-card border-4 sm:border-8 border-white/5 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {project.icon ?? (
                          <Layers
                            aria-hidden="true"
                            className="text-primary w-16 h-16 sm:w-20 sm:h-20"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </section>

              <div className="min-w-0 w-full md:row-start-3 md:col-span-2">
                <Section title="Overview">
                  <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                    {project.description}
                  </p>
                </Section>
              </div>

              <div className="min-w-0 w-full md:row-start-4 md:col-start-1 space-y-8 md:space-y-10">
                {project.beforeState && (
                  <Section title="Starting Point">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.beforeState}
                    </p>
                  </Section>
                )}

                {project.context && (
                  <Section title="Context">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.context}
                    </p>
                  </Section>
                )}

                {project.constraints && (
                  <Section title="Constraints">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.constraints}
                    </p>
                  </Section>
                )}

                {project.purpose && (
                  <Section title="Purpose">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.purpose}
                    </p>
                  </Section>
                )}

                {project.whatChanged && (
                  <Section title="What I Built">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.whatChanged}
                    </p>
                  </Section>
                )}

                {project.outcome && (
                  <Section title="Outcome">
                    <p className="text-muted-foreground text-base sm:text-xl leading-relaxed font-medium whitespace-pre-line text-justify">
                      {project.outcome}
                    </p>
                  </Section>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <Section title="Highlights">
                    <ol className="space-y-0 text-muted-foreground font-medium text-base sm:text-lg">
                      {project.highlights.map((item, index) => (
                        <li
                          key={`${item}-${index}`}
                          className="flex items-start gap-4 border-b border-white/5 py-3 last:border-b-0"
                        >
                          <span
                            aria-hidden="true"
                            className="text-primary font-black shrink-0 text-xs sm:text-sm tracking-widest mt-1 w-6 text-right"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </Section>
                )}
              </div>

              <div className="min-w-0 w-full md:row-start-4 md:col-start-2 space-y-8 md:space-y-10">
                {project.proofNote && (
                  <Section title="Note on Visuals">
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium italic border-l-2 border-primary/50 pl-4 text-justify">
                      {project.proofNote}
                    </p>
                  </Section>
                )}

                {project.evidence && project.evidence.length > 0 && (
                  <Section title={project.ctaLabel ?? "Project Notes"}>
                    <ul className="space-y-0 text-muted-foreground font-medium text-base sm:text-lg">
                      {project.evidence.map((item, index) => {
                        const hasGallery = Boolean(item.gallery?.length);
                        const hasLink = Boolean(item.url);
                        const isInteractive = hasGallery || hasLink;
                        const rowClassName = [
                          "w-full flex items-center gap-4 border-b border-white/5 py-3 last:border-b-0 transition-all text-left",
                          isInteractive
                            ? "hover:bg-primary/5 hover:border-primary/30 hover:pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            : "",
                        ].join(" ");

                        const rowContent = (
                          <>
                            <span
                              aria-hidden="true"
                              className={`font-black shrink-0 text-xs sm:text-sm tracking-widest w-6 text-right text-primary ${isInteractive ? pulseClass : ""}`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item.label}</span>
                            {hasGallery && (
                              <Images
                                size={14}
                                aria-hidden="true"
                                className={`ml-auto shrink-0 text-primary ${pulseClass}`}
                              />
                            )}
                            {hasLink && !hasGallery && (
                              <ExternalLink
                                size={14}
                                aria-hidden="true"
                                className={`ml-auto shrink-0 text-primary ${pulseClass}`}
                              />
                            )}
                          </>
                        );

                        return (
                          <li key={`${item.label}-${index}`}>
                            {hasGallery && item.gallery ? (
                              <button
                                type="button"
                                onClick={() =>
                                  openGallery(item.label, item.gallery ?? [])
                                }
                                aria-label={`Open ${item.label} gallery`}
                                className={rowClassName}
                              >
                                {rowContent}
                              </button>
                            ) : hasLink && item.url ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${item.label} in a new tab`}
                                className={rowClassName}
                              >
                                {rowContent}
                              </a>
                            ) : (
                              <div className={rowClassName}>{rowContent}</div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </Section>
                )}

                {hasLiveOrSource && (
                  <div className="grid gap-4 sm:gap-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live preview in a new tab`}
                        className={`flex h-14 items-center justify-center gap-3 bg-primary text-lg font-black uppercase tracking-tighter text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-20 sm:gap-4 sm:text-2xl ${
                          prefersReducedMotion
                            ? ""
                            : "transition-transform hover:scale-[1.02]"
                        }`}
                      >
                        Live Preview
                        <Globe
                          aria-hidden="true"
                          className="h-5 w-5 sm:h-6 sm:w-6"
                        />
                      </a>
                    )}

                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} source code in a new tab`}
                        className="flex h-14 items-center justify-center gap-3 border-2 border-white/10 text-lg font-black uppercase tracking-tighter text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-20 sm:gap-4 sm:text-2xl"
                      >
                        Source Code
                        <Github
                          aria-hidden="true"
                          className="h-5 w-5 sm:h-6 sm:w-6"
                        />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="min-w-0 w-full md:row-start-5 md:col-span-2 border-t border-white/5 pt-8 md:pt-10">
                <Section title="Technologies Used">
                  <ul className="flex flex-wrap gap-2 sm:gap-3">
                    {project.tech.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white/5 border border-white/10 font-black uppercase tracking-widest text-xs sm:text-sm"
                      >
                        <Code2
                          size={14}
                          aria-hidden="true"
                          className="text-primary shrink-0"
                        />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {galleryModal && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            role="presentation"
            className="fixed inset-0 z-100 bg-black/90 flex flex-col items-center justify-center p-4 sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeGallery();
              }
            }}
          >
            <motion.div
              ref={galleryDialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={GALLERY_TITLE_ID}
              aria-describedby={GALLERY_INSTRUCTIONS_ID}
              tabIndex={-1}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, scale: 0.95, y: 20 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: "easeOut",
              }}
              className="w-full max-w-5xl flex flex-col gap-4 focus:outline-none"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="block w-1 h-6 bg-primary shrink-0"
                  />
                  <h2
                    id={GALLERY_TITLE_ID}
                    className="truncate text-xl sm:text-2xl font-black uppercase italic text-white"
                  >
                    {galleryModal.title}
                  </h2>
                  <span
                    aria-live="polite"
                    className="shrink-0 text-xs font-black text-primary tracking-widest uppercase ml-2"
                  >
                    {galleryIndex + 1} / {galleryModal.items.length}
                  </span>
                </div>

                <button
                  ref={galleryCloseButtonRef}
                  type="button"
                  onClick={closeGallery}
                  className="shrink-0 p-2 border border-white/10 hover:border-primary hover:text-primary transition-all text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close gallery"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="relative aspect-video bg-card border-4 border-white/5 overflow-hidden">
                {mediaLoading && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-card"
                  >
                    <div
                      aria-hidden="true"
                      className={`w-10 h-10 border-2 border-white/10 border-t-primary rounded-full ${prefersReducedMotion ? "" : "animate-spin"}`}
                    />
                    <p className="text-xs font-black uppercase tracking-widest text-white/30">
                      Loading…
                    </p>
                  </div>
                )}

                {(() => {
                  const source = galleryModal.items[galleryIndex];
                  const safeSource = encodeURI(source);

                  return isVideoSource(source) ? (
                    <video
                      key={source}
                      src={safeSource}
                      controls
                      preload="metadata"
                      onLoadedData={() => setMediaLoading(false)}
                      onError={() => setMediaLoading(false)}
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <img
                      key={source}
                      src={safeSource}
                      alt={`${galleryModal.title} visual ${galleryIndex + 1} of ${galleryModal.items.length}`}
                      width={1600}
                      height={900}
                      decoding="async"
                      onLoad={() => setMediaLoading(false)}
                      onError={() => setMediaLoading(false)}
                      className={`w-full h-full object-contain bg-card transition-opacity duration-300 ${mediaLoading ? "opacity-0" : "opacity-100"}`}
                    />
                  );
                })()}

                {galleryModal.items.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={galleryPrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 hover:border-primary text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Show previous gallery item"
                    >
                      <ChevronLeft size={22} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={galleryNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/10 hover:border-primary text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label="Show next gallery item"
                    >
                      <ChevronRight size={22} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {galleryModal.items.length > 1 && (
                <div
                  className="flex flex-wrap justify-center gap-2"
                  aria-label="Choose gallery item"
                >
                  {galleryModal.items.map((source, index) => (
                    <button
                      key={`${source}-${index}`}
                      type="button"
                      onClick={() => selectGalleryItem(index)}
                      aria-label={`Show gallery item ${index + 1}`}
                      aria-current={index === galleryIndex ? "true" : undefined}
                      className={[
                        "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        index === galleryIndex
                          ? "bg-primary w-4"
                          : "bg-white/20 hover:bg-white/40 w-2",
                      ].join(" ")}
                    />
                  ))}
                </div>
              )}

              <p
                id={GALLERY_INSTRUCTIONS_ID}
                className="text-center text-xs text-white/30 font-medium tracking-widest uppercase"
              >
                Use Left and Right Arrow keys to navigate · Escape closes the
                gallery · Select outside the dialog to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}