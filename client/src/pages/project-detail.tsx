import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useRoute } from "wouter";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
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
} from "lucide-react";

import {
  GalleryModal,
  type GalleryModalState,
} from "@/components/project/gallery-modal";
import { ProjectSection } from "@/components/project/project-section";
import { projects } from "@/data/projects";
import {
  getCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
  isCloudinaryImage,
} from "@/lib/cloudinary";

const LazyCustomCursor = lazy(
  () =>
    import(
      "@/components/ui/custom-cursor"
    ),
);

const SITE_NAME =
  "Muhammad Ibrahim Khan";

const DEFAULT_SOCIAL_IMAGE =
  "/opengraph.jpg";

const AUTO_SLIDE_INTERVAL_MS =
  5000;

function toAbsoluteUrl(
  source: string,
) {
  try {
    return new URL(
      source,
      window.location.origin,
    ).href;
  } catch {
    return source;
  }
}

export default function ProjectDetail() {
  const [, params] =
    useRoute("/project/:id");

  const [, setLocation] =
    useLocation();

  const project = projects.find(
    (item) =>
      item.id === params?.id,
  );

  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const mediaSlides =
    project?.gallery?.length
      ? project.gallery
      : project?.image
        ? [project.image]
        : [];

  const [
    galleryModal,
    setGalleryModal,
  ] =
    useState<GalleryModalState | null>(
      null,
    );

  const [
    sliderPaused,
    setSliderPaused,
  ] = useState(false);

  const [
    cursorEnabled,
    setCursorEnabled,
  ] = useState(false);

  const sliderRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const pageContentRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  /*
   * Load the custom cursor only after a genuine
   * pointer movement on a fine-pointer device.
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
   * Reset scroll and media position when moving
   * between project-detail routes.
   */
  useEffect(() => {
    window.scrollTo(0, 0);

    setSliderPaused(false);

    const frame =
      window.requestAnimationFrame(
        () => {
          sliderRef.current?.scrollTo(
            {
              left: 0,
            },
          );
        },
      );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );
    };
  }, [params?.id]);

  /*
   * Route-specific SEO/social metadata.
   */
  useEffect(() => {
    const previousTitle =
      document.title;

    const managedElements: Array<{
      element: HTMLElement;
      attribute: "content" | "href";
      previousValue: string | null;
      created: boolean;
    }> = [];

    const setHeadAttribute = (
      selector: string,
      createElement: () => HTMLElement,
      attribute:
        | "content"
        | "href",
      value: string,
    ) => {
      let element =
        document.head.querySelector<HTMLElement>(
          selector,
        );

      const created = !element;

      if (!element) {
        element =
          createElement();

        document.head.appendChild(
          element,
        );
      }

      managedElements.push({
        element,
        attribute,
        previousValue:
          element.getAttribute(
            attribute,
          ),
        created,
      });

      element.setAttribute(
        attribute,
        value,
      );
    };

    const pageTitle = project
      ? `${project.title} | ${SITE_NAME}`
      : `Project Not Found | ${SITE_NAME}`;

    const pageDescription =
      project
        ? project.shortDesc
        : "The requested portfolio project could not be found.";

    const pageUrl =
      `${window.location.origin}${window.location.pathname}`;

    const socialImage =
      toAbsoluteUrl(
        project?.gallery?.[0] ??
          project?.image ??
          DEFAULT_SOCIAL_IMAGE,
      );

    document.title = pageTitle;

    setHeadAttribute(
      'meta[name="description"]',
      () => {
        const element =
          document.createElement(
            "meta",
          );

        element.setAttribute(
          "name",
          "description",
        );

        return element;
      },
      "content",
      pageDescription,
    );

    const propertyMeta = (
      property: string,
      value: string,
    ) => {
      setHeadAttribute(
        `meta[property="${property}"]`,
        () => {
          const element =
            document.createElement(
              "meta",
            );

          element.setAttribute(
            "property",
            property,
          );

          return element;
        },
        "content",
        value,
      );
    };

    const namedMeta = (
      name: string,
      value: string,
    ) => {
      setHeadAttribute(
        `meta[name="${name}"]`,
        () => {
          const element =
            document.createElement(
              "meta",
            );

          element.setAttribute(
            "name",
            name,
          );

          return element;
        },
        "content",
        value,
      );
    };

    propertyMeta(
      "og:title",
      pageTitle,
    );

    propertyMeta(
      "og:description",
      pageDescription,
    );

    propertyMeta(
      "og:type",
      "article",
    );

    propertyMeta(
      "og:site_name",
      SITE_NAME,
    );

    propertyMeta(
      "og:url",
      pageUrl,
    );

    propertyMeta(
      "og:image",
      socialImage,
    );

    namedMeta(
      "twitter:card",
      "summary_large_image",
    );

    namedMeta(
      "twitter:title",
      pageTitle,
    );

    namedMeta(
      "twitter:description",
      pageDescription,
    );

    namedMeta(
      "twitter:image",
      socialImage,
    );

    setHeadAttribute(
      'link[rel="canonical"]',
      () => {
        const element =
          document.createElement(
            "link",
          );

        element.setAttribute(
          "rel",
          "canonical",
        );

        return element;
      },
      "href",
      pageUrl,
    );

    return () => {
      document.title =
        previousTitle;

      for (
        const managed of
        managedElements.reverse()
      ) {
        if (managed.created) {
          managed.element.remove();
        } else if (
          managed.previousValue ===
          null
        ) {
          managed.element.removeAttribute(
            managed.attribute,
          );
        } else {
          managed.element.setAttribute(
            managed.attribute,
            managed.previousValue,
          );
        }
      }
    };
  }, [project]);

  const openGallery =
    useCallback(
      (
        title: string,
        items: string[],
      ) => {
        if (items.length === 0) {
          return;
        }

        setGalleryModal({
          title,
          items,
        });
      },
      [],
    );

  const closeGallery =
    useCallback(() => {
      setGalleryModal(null);
    }, []);

  /*
   * Automatically advance project imagery unless
   * motion is reduced or the user is interacting
   * with the slider.
   */
  useEffect(() => {
    if (
      prefersReducedMotion ||
      sliderPaused ||
      mediaSlides.length <= 1
    ) {
      return;
    }

    const slider =
      sliderRef.current;

    if (!slider) {
      return;
    }

    const intervalId =
      window.setInterval(() => {
        if (document.hidden) {
          return;
        }

        const {
          scrollLeft,
          clientWidth,
          scrollWidth,
        } = slider;

        const atEnd =
          scrollLeft +
            clientWidth >=
          scrollWidth - 10;

        if (atEnd) {
          slider.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          slider.scrollBy({
            left: clientWidth,
            behavior: "smooth",
          });
        }
      }, AUTO_SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    mediaSlides.length,
    prefersReducedMotion,
    sliderPaused,
  ]);

  /*
   * Project not found.
   */
  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-black uppercase italic text-primary sm:text-6xl">
            404
          </h1>

          <p className="text-lg font-medium text-muted-foreground sm:text-xl">
            Project not found
          </p>

          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem(
                "portfolio_scroll_to_projects",
                "1",
              );

              setLocation("/");
            }}
            className="inline-flex items-center gap-3 bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
          >
            <ArrowLeft
              size={20}
              aria-hidden="true"
            />

            Back Home
          </button>
        </div>
      </div>
    );
  }

  const hasLiveOrSource =
    Boolean(
      project.liveUrl ||
        project.sourceUrl,
    );

  const hasEvidence =
    Boolean(
      project.evidence &&
        project.evidence.length >
          0,
    );

  const hasSupportContent =
    hasEvidence ||
    hasLiveOrSource;

  const pulseClass =
    prefersReducedMotion
      ? ""
      : "animate-pulse";

  const scrollMedia = (
    direction: "left" | "right",
  ) => {
    const slider =
      sliderRef.current;

    if (!slider) {
      return;
    }

    slider.scrollBy({
      left:
        direction === "left"
          ? -slider.clientWidth
          : slider.clientWidth,

      behavior:
        prefersReducedMotion
          ? "auto"
          : "smooth",
    });
  };

  const handleSliderBlur = (
    event: React.FocusEvent<HTMLDivElement>,
  ) => {
    const nextFocusedElement =
      event.relatedTarget;

    if (
      !(
        nextFocusedElement instanceof
        Node
      ) ||
      !event.currentTarget.contains(
        nextFocusedElement,
      )
    ) {
      setSliderPaused(false);
    }
  };

  const visualsTitle =
    project.id ===
    "home-automation"
      ? "App & Hardware Visuals"
      : "Visuals";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-black">
      <div ref={pageContentRef}>
        {cursorEnabled && (
          <Suspense fallback={null}>
            <LazyCustomCursor />
          </Suspense>
        )}

        <header className="fixed left-0 right-0 top-0 z-50 p-4 sm:p-6">
          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem(
                "portfolio_scroll_to_projects",
                "1",
              );

              setLocation("/");
            }}
            className="group inline-flex items-center gap-2 border-2 border-white/5 bg-card p-3 text-xs font-black uppercase tracking-widest transition-all hover:border-primary sm:gap-3 sm:p-4 sm:text-sm"
          >
            <ArrowLeft
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-x-1"
            />

            Back Home
          </button>
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="pb-12 pt-24 sm:pb-20 sm:pt-32"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  prefersReducedMotion
                    ? 0
                    : 0.6,

                ease: "easeOut",
              }}
              className="space-y-8 md:space-y-10"
            >
              {/* ─────────────────────────────
                  HERO / VISUALS
              ───────────────────────────── */}

              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
                <div className="min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    {project.category && (
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                        {project.category}
                      </div>
                    )}

                    {project.role && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                                opacity: 0,
                                x: -20,
                              }
                        }
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            prefersReducedMotion
                              ? 0
                              : 0.2,

                          duration:
                            prefersReducedMotion
                              ? 0
                              : 0.5,

                          ease:
                            "easeOut",
                        }}
                        className="inline-block bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black sm:px-4 sm:text-xs"
                      >
                        {project.role}
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <h1 className="mb-4 font-display text-3xl font-black uppercase italic leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                      {project.title}
                    </h1>

                    <div
                      aria-hidden="true"
                      className="mb-4 h-2 w-32 bg-primary sm:mb-6 sm:w-40"
                    />

                    <p className="text-base font-medium uppercase leading-snug tracking-tighter text-muted-foreground sm:text-lg md:text-xl">
                      {project.shortDesc}
                    </p>
                  </div>
                </div>

                <section
                  aria-labelledby="project-visuals-title"
                  className="flex min-w-0 flex-col"
                >
                  <h2
                    id="project-visuals-title"
                    className="mb-3 text-lg font-black uppercase italic"
                  >
                    {visualsTitle}
                  </h2>

                  <div
                    className="relative min-h-0 flex-1"
                    onMouseEnter={() =>
                      setSliderPaused(
                        true,
                      )
                    }
                    onMouseLeave={() =>
                      setSliderPaused(
                        false,
                      )
                    }
                    onFocusCapture={() =>
                      setSliderPaused(
                        true,
                      )
                    }
                    onBlurCapture={
                      handleSliderBlur
                    }
                  >
                    {mediaSlides.length >
                    0 ? (
                      <>
                        {mediaSlides.length >
                          1 && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                scrollMedia(
                                  "left",
                                )
                              }
                              aria-label="Show previous project image"
                              className="absolute -left-4 top-1/2 z-20 hidden h-14 w-10 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/60 text-white transition-all hover:bg-black/80 md:flex lg:-left-6"
                            >
                              <ChevronLeft
                                size={
                                  24
                                }
                                aria-hidden="true"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                scrollMedia(
                                  "right",
                                )
                              }
                              aria-label="Show next project image"
                              className="absolute -right-4 top-1/2 z-20 hidden h-14 w-10 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/60 text-white transition-all hover:bg-black/80 md:flex lg:-right-6"
                            >
                              <ChevronRight
                                size={
                                  24
                                }
                                aria-hidden="true"
                              />
                            </button>
                          </>
                        )}

                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent"
                        />

                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent"
                        />

                        <div
                          ref={sliderRef}
                          aria-label={`${project.title} project images`}
                          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2"
                        >
                          {mediaSlides.map(
                            (
                              source,
                              index,
                            ) => (
                              <a
                                key={`${source}-${index}`}
                                href={
                                  source
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.title} visual ${
                                  index +
                                  1
                                } of ${
                                  mediaSlides.length
                                } in a new tab`}
                                className="block aspect-video w-full min-w-full shrink-0 snap-start overflow-hidden border-4 border-white/5 bg-card transition-colors hover:border-primary sm:border-8"
                              >
                                <img
                                  src={getOptimizedCloudinaryUrl(
                                    source,
                                    1200,
                                    "good",
                                  )}
                                  srcSet={getCloudinarySrcSet(
                                    source,
                                    [
                                      640,
                                      1200,
                                      1600,
                                    ],
                                    "good",
                                  )}
                                  sizes={
                                    isCloudinaryImage(
                                      source,
                                    )
                                      ? "(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
                                      : undefined
                                  }
                                  alt={`${project.title} visual ${
                                    index +
                                    1
                                  }`}
                                  width={
                                    1600
                                  }
                                  height={
                                    900
                                  }
                                  loading={
                                    index ===
                                    0
                                      ? "eager"
                                      : "lazy"
                                  }
                                  fetchPriority={
                                    index ===
                                    0
                                      ? "high"
                                      : "auto"
                                  }
                                  decoding="async"
                                  draggable={
                                    false
                                  }
                                  className="h-full w-full bg-card object-contain"
                                />
                              </a>
                            ),
                          )}
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? false
                            : {
                                opacity: 0,
                                scale:
                                  0.95,
                              }
                        }
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay:
                            prefersReducedMotion
                              ? 0
                              : 0.4,

                          duration:
                            prefersReducedMotion
                              ? 0
                              : 0.5,

                          ease:
                            "easeOut",
                        }}
                        className="group relative aspect-video overflow-hidden border-4 border-white/5 bg-card sm:border-8"
                      >
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center">
                          {project.icon ?? (
                            <Layers
                              aria-hidden="true"
                              className="h-16 w-16 text-primary sm:h-20 sm:w-20"
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </section>
              </div>

              {/* ─────────────────────────────
                  PROJECT METADATA
              ───────────────────────────── */}

              {(project.company ||
                project.duration ||
                project.team ||
                project.supervisor) && (
                <div className="border-y border-white/5 py-4 sm:py-6">
                  <div className="flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10 lg:gap-x-16">
                    {project.company && (
                      <div className="min-w-30 flex-1">
                        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.3em]">
                          {project.category?.includes(
                            "Academic",
                          ) ||
                          project.category?.includes(
                            "Final-Year",
                          )
                            ? "Institution"
                            : "Company"}
                        </p>

                        <p className="text-base font-black uppercase italic sm:text-xl">
                          {project.company}
                        </p>
                      </div>
                    )}

                    {project.supervisor && (
                      <div className="min-w-30 flex-1">
                        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.3em]">
                          Supervisor
                        </p>

                        <p className="text-base font-black uppercase italic sm:text-xl">
                          {
                            project.supervisor
                          }
                        </p>
                      </div>
                    )}

                    {project.team && (
                      <div className="min-w-30 flex-1">
                        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.3em]">
                          Team
                        </p>

                        <p className="text-base font-black uppercase italic sm:text-xl">
                          {project.team}
                        </p>
                      </div>
                    )}

                    {project.duration && (
                      <div className="min-w-30 flex-1">
                        <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary sm:text-xs sm:tracking-[0.3em]">
                          Duration
                        </p>

                        <p className="text-base font-black uppercase italic sm:text-xl">
                          {
                            project.duration
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─────────────────────────────
                  OVERVIEW — FULL WIDTH
              ───────────────────────────── */}

              <ProjectSection title="Overview">
                <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-xl">
                  {
                    project.description
                  }
                </p>
              </ProjectSection>

              {/* ─────────────────────────────
                  ROW 1
                  STARTING POINT | CONTEXT
              ───────────────────────────── */}

              {(project.beforeState ||
                project.context) && (
                <div className="grid items-start gap-8 border-t border-white/5 pt-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
                  {project.beforeState && (
                    <div
                      className={
                        project.context
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Starting Point">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.beforeState
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}

                  {project.context && (
                    <div
                      className={
                        project.beforeState
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Context">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.context
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}
                </div>
              )}

              {/* ─────────────────────────────
                  ROW 2
                  CONSTRAINTS | PURPOSE
              ───────────────────────────── */}

              {(project.constraints ||
                project.purpose) && (
                <div className="grid items-start gap-8 border-t border-white/5 pt-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
                  {project.constraints && (
                    <div
                      className={
                        project.purpose
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Constraints">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.constraints
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}

                  {project.purpose && (
                    <div
                      className={
                        project.constraints
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Purpose">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.purpose
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}
                </div>
              )}

              {/* ─────────────────────────────
                  ROW 3
                  WHAT I BUILT | OUTCOME
              ───────────────────────────── */}

              {(project.whatChanged ||
                project.outcome) && (
                <div className="grid items-start gap-8 border-t border-white/5 pt-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
                  {project.whatChanged && (
                    <div
                      className={
                        project.outcome
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="What I Built">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.whatChanged
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}

                  {project.outcome && (
                    <div
                      className={
                        project.whatChanged
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Outcome">
                        <p className="whitespace-pre-line text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
                          {
                            project.outcome
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}
                </div>
              )}

              {/* ─────────────────────────────
                  HIGHLIGHTS — FULL WIDTH,
                  TWO-COLUMN LIST ON DESKTOP
              ───────────────────────────── */}

              {project.highlights &&
                project.highlights
                  .length > 0 && (
                  <div className="border-t border-white/5 pt-8">
                    <ProjectSection title="Highlights">
                      <ol className="grid grid-cols-1 gap-x-12 text-base font-medium text-muted-foreground lg:grid-cols-2 lg:gap-x-16">
                        {project.highlights.map(
                          (
                            item,
                            index,
                          ) => (
                            <li
                              key={`${item}-${index}`}
                              className="flex items-start gap-4 border-b border-white/5 py-3"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1 w-6 shrink-0 text-right text-xs font-black tracking-widest text-primary sm:text-sm"
                              >
                                {String(
                                  index +
                                    1,
                                ).padStart(
                                  2,
                                  "0",
                                )}
                              </span>

                              <span>
                                {item}
                              </span>
                            </li>
                          ),
                        )}
                      </ol>
                    </ProjectSection>
                  </div>
                )}

              {/* ─────────────────────────────
                  SUPPORTING INFORMATION
                  NOTE | EVIDENCE / LINKS
              ───────────────────────────── */}

              {(project.proofNote ||
                hasSupportContent) && (
                <div className="grid items-start gap-8 border-t border-white/5 pt-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16">
                  {project.proofNote && (
                    <div
                      className={
                        hasSupportContent
                          ? "min-w-0"
                          : "min-w-0 md:col-span-2"
                      }
                    >
                      <ProjectSection title="Note on Visuals">
                        <p className="border-l-2 border-primary/50 pl-4 text-sm font-medium italic leading-relaxed text-muted-foreground sm:text-base">
                          {
                            project.proofNote
                          }
                        </p>
                      </ProjectSection>
                    </div>
                  )}

                  {hasSupportContent && (
                    <div
                      className={
                        project.proofNote
                          ? "min-w-0 space-y-8"
                          : "min-w-0 space-y-8 md:col-span-2"
                      }
                    >
                      {project.evidence &&
                        project.evidence
                          .length >
                          0 && (
                          <ProjectSection
                            title={
                              project.ctaLabel ??
                              "Project Notes"
                            }
                          >
                            <ul className="space-y-0 text-base font-medium text-muted-foreground sm:text-lg">
                              {project.evidence.map(
                                (
                                  item,
                                  index,
                                ) => {
                                  const hasGallery =
                                    Boolean(
                                      item
                                        .gallery
                                        ?.length,
                                    );

                                  const hasLink =
                                    Boolean(
                                      item.url,
                                    );

                                  const isInteractive =
                                    hasGallery ||
                                    hasLink;

                                  const rowClassName =
                                    [
                                      "flex w-full items-center gap-4 border-b border-white/5 py-3 text-left transition-all last:border-b-0",
                                      isInteractive
                                        ? "hover:border-primary/30 hover:bg-primary/5 hover:pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                        : "",
                                    ].join(
                                      " ",
                                    );

                                  const rowContent =
                                    (
                                      <>
                                        <span
                                          aria-hidden="true"
                                          className={`w-6 shrink-0 text-right text-xs font-black tracking-widest text-primary sm:text-sm ${
                                            isInteractive
                                              ? pulseClass
                                              : ""
                                          }`}
                                        >
                                          {String(
                                            index +
                                              1,
                                          ).padStart(
                                            2,
                                            "0",
                                          )}
                                        </span>

                                        <span>
                                          {
                                            item.label
                                          }
                                        </span>

                                        {hasGallery && (
                                          <Images
                                            size={
                                              14
                                            }
                                            aria-hidden="true"
                                            className={`ml-auto shrink-0 text-primary ${pulseClass}`}
                                          />
                                        )}

                                        {hasLink &&
                                          !hasGallery && (
                                            <ExternalLink
                                              size={
                                                14
                                              }
                                              aria-hidden="true"
                                              className={`ml-auto shrink-0 text-primary ${pulseClass}`}
                                            />
                                          )}
                                      </>
                                    );

                                  return (
                                    <li
                                      key={`${item.label}-${index}`}
                                    >
                                      {hasGallery &&
                                      item.gallery ? (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            openGallery(
                                              item.label,
                                              item.gallery ??
                                                [],
                                            )
                                          }
                                          aria-label={`Open ${item.label} gallery`}
                                          className={
                                            rowClassName
                                          }
                                        >
                                          {
                                            rowContent
                                          }
                                        </button>
                                      ) : hasLink &&
                                        item.url ? (
                                        <a
                                          href={
                                            item.url
                                          }
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          aria-label={`Open ${item.label} in a new tab`}
                                          className={
                                            rowClassName
                                          }
                                        >
                                          {
                                            rowContent
                                          }
                                        </a>
                                      ) : (
                                        <div
                                          className={
                                            rowClassName
                                          }
                                        >
                                          {
                                            rowContent
                                          }
                                        </div>
                                      )}
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </ProjectSection>
                        )}

                      {hasLiveOrSource && (
                        <div className="grid gap-4 sm:gap-6">
                          {project.liveUrl && (
                            <a
                              href={
                                project.liveUrl
                              }
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
                              href={
                                project.sourceUrl
                              }
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
                  )}
                </div>
              )}

              {/* ─────────────────────────────
                  TECHNOLOGIES — FULL WIDTH
              ───────────────────────────── */}

              <div className="border-t border-white/5 pt-8 md:pt-10">
                <ProjectSection title="Technologies Used">
                  <ul className="flex flex-wrap gap-2 sm:gap-3">
                    {project.tech.map(
                      (tag) => (
                        <li
                          key={tag}
                          className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-widest sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
                        >
                          <Code2
                            size={14}
                            aria-hidden="true"
                            className="shrink-0 text-primary"
                          />

                          {tag}
                        </li>
                      ),
                    )}
                  </ul>
                </ProjectSection>
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <GalleryModal
        modal={galleryModal}
        onClose={closeGallery}
        pageContentRef={
          pageContentRef
        }
        prefersReducedMotion={
          prefersReducedMotion
        }
      />
    </div>
  );
}