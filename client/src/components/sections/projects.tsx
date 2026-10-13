import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link } from "wouter";

import { Reveal } from "@/components/ui/site-animations";
import {
  projectCards,
  type ProjectCard,
} from "@/data/project-cards";
import {
  getCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
  isCloudinaryImage,
} from "@/lib/cloudinary";
import { siteContentContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const flagshipTechnologies = [
  "Angular",
  "ASP.NET Core",
  "SQL Server",
  "AWS",
  "Multi-Tenant",
];

const flagshipFeatures = [
  {
    icon: ShieldCheck,
    title: "Tenant-Aware Architecture",
    description:
      "Secure, access-aware workflows across tenant workspaces.",
  },
  {
    icon: Boxes,
    title: "Serialization Operations",
    description:
      "Serial lifecycle handling and product tracking.",
  },
  {
    icon: Truck,
    title: "Shipment & Traceability Workflows",
    description:
      "Shipment management and traceability operations.",
  },
];

const flagshipDescription =
  "Enterprise traceability workflows for regulated pharmaceutical operations, including serialization, shipment management, and tenant-aware access across supply-chain processes.";

const zenatracePhoneMockup =
  "/media/images/zenatrace-phone-mockup-sanitized.webp";

const defaultProjectOrder = [
  "ehr-system",
  "erp-system",
  "selenium-bot",
];

function OptimizedProjectImage({
  source,
  alt,
  sizes,
  className,
}: {
  source: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  return (
    <img
      src={getOptimizedCloudinaryUrl(
        source,
        1400,
        "good",
      )}
      srcSet={getCloudinarySrcSet(
        source,
        [480, 768, 1100, 1400],
        "good",
      )}
      sizes={
        isCloudinaryImage(source)
          ? sizes
          : undefined
      }
      alt={alt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}

function DeviceComposition({
  primaryImage,
  secondaryImage,
  phoneImage,
}: {
  primaryImage: string;
  secondaryImage: string;
  phoneImage: string;
}) {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, x: 36 }
      }
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion
          ? 0
          : 0.72,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[23rem] sm:min-h-[34rem] lg:min-h-[31rem] xl:min-h-[32rem]"
      aria-label="ZenaTrace interface previews"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[-1%_-6%_0_5%] rounded-full bg-[radial-gradient(ellipse_at_64%_52%,rgba(255,118,40,0.46),rgba(255,118,40,0.15)_36%,rgba(255,118,40,0.04)_60%,transparent_76%)] blur-2xl sm:blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-3%] top-[-7%] aspect-square w-[83%] rounded-full border border-[#FF7628]/85 shadow-[0_0_38px_rgba(255,118,40,0.2)]"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-8%] top-[7%] aspect-square w-[73%] rounded-full border border-[#FF7628]/28"
      />

      <div
        aria-hidden="true"
        className="absolute right-[-1%] top-[1%] h-32 w-40 opacity-75 [background-image:radial-gradient(#FF7628_1.2px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom_left,black,transparent_78%)] sm:h-44 sm:w-56"
      />

      <div className="absolute inset-x-0 top-[4%] z-10 mx-auto w-full sm:left-auto sm:right-[-1%] sm:top-[2%] sm:w-[96%] lg:right-[-2%] lg:w-[97%]">
        <div className="rounded-[0.8rem] border border-white/35 bg-[linear-gradient(145deg,#626A73_0%,#171B20_7%,#05070A_48%,#020304_88%,#3B424A_100%)] p-[5px] pb-2 shadow-[0_42px_96px_rgba(0,0,0,0.8),0_0_48px_rgba(255,118,40,0.2),inset_0_1px_rgba(255,255,255,0.22)] sm:rounded-[1.15rem] sm:p-[7px] sm:pb-2.5">
          <div className="relative overflow-hidden rounded-[0.5rem] border border-black/70 bg-[#DDE6F1] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] sm:rounded-[0.78rem]">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1 z-10 size-1 -translate-x-1/2 rounded-full bg-[#111820] ring-1 ring-white/25"
            />

            <OptimizedProjectImage
              source={primaryImage}
              alt="Sanitized ZenaTrace operational dashboard preview"
              sizes="(min-width: 1280px) 780px, (min-width: 1024px) 58vw, 100vw"
              className="aspect-[2.08/1] w-full object-cover object-top"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto h-2.5 w-[96%] rounded-b-[58%] bg-[linear-gradient(to_bottom,#89919A_0%,#343A41_24%,#121519_56%,#050607_100%)] shadow-[0_14px_24px_rgba(0,0,0,0.78)] before:absolute before:left-1/2 before:top-0 before:h-px before:w-[18%] before:-translate-x-1/2 before:bg-white/35 sm:h-3.5"
        />
      </div>

      <div className="absolute bottom-[1%] right-[-2%] z-30 w-[64%] rotate-[-0.6deg] sm:w-[63%]">
        <div className="rounded-[0.65rem] border border-[#FF7628]/80 bg-[linear-gradient(145deg,#59616A_0%,#11151A_8%,#050709_54%,#020304_100%)] p-1 shadow-[0_30px_68px_rgba(0,0,0,0.82),0_0_34px_rgba(255,118,40,0.25),inset_0_1px_rgba(255,255,255,0.16)] sm:rounded-[0.95rem] sm:p-1.5">
          <div className="relative overflow-hidden rounded-[0.48rem] border border-black/65 bg-[#0B1628] sm:rounded-[0.68rem]">
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1 z-10 size-1 -translate-x-1/2 rounded-full bg-black/75 ring-1 ring-white/15"
            />

            <OptimizedProjectImage
              source={secondaryImage}
              alt="Sanitized ZenaTrace shipment-detail workflow preview"
              sizes="(min-width: 1280px) 500px, 46vw"
              className="aspect-[2.2/1] w-full object-cover object-top"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto h-1.5 w-[95%] rounded-b-[60%] bg-[linear-gradient(to_bottom,#747C84,#252A30_48%,#07090A)] shadow-[0_10px_18px_rgba(0,0,0,0.72)] sm:h-2"
        />
      </div>

      <div className="absolute bottom-[3%] left-[1%] z-40 w-[28%] min-w-0 sm:bottom-[9%] sm:left-[-1%] sm:w-[25%] lg:bottom-[7%] lg:left-[-2%] lg:w-[23%] xl:w-[22%]">
        <img
          src={phoneImage}
          alt="Illustrative ZenaTrace login smartphone mockup"
          width={948}
          height={1660}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-auto w-full object-contain [filter:drop-shadow(0_28px_34px_rgba(0,0,0,0.88))_drop-shadow(0_0_18px_rgba(255,118,40,0.16))]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[7%] right-[4%] h-px bg-[linear-gradient(to_right,transparent,#FF7628_20%,#FF7628_78%,transparent)] shadow-[0_0_18px_rgba(255,118,40,0.48)]"
      />
    </motion.div>
  );
}

function OtherProjectCard({
  project,
}: {
  project: ProjectCard;
}) {
  return (
    <article
      data-project-card
      className="group relative flex h-full min-w-0 snap-start flex-col overflow-hidden rounded-xl border border-[#2C333A] bg-[linear-gradient(155deg,rgba(17,22,27,0.98),rgba(7,10,13,0.98))] shadow-[0_18px_38px_rgba(0,0,0,0.24)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#FF7628]/85 hover:shadow-[0_24px_54px_rgba(0,0,0,0.48),0_0_24px_rgba(255,118,40,0.09)] focus-within:border-[#FF7628]"
    >
      <div className="relative aspect-[16/6] overflow-hidden border-b border-[#2C333A] bg-[#0E141A]">
        {project.image ? (
          <OptimizedProjectImage
            source={project.image}
            alt={`${project.title} project preview`}
            sizes="(min-width: 1280px) 500px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="grid h-full place-items-center text-[#FF7628]">
            <Boxes
              aria-hidden="true"
              className="size-10"
            />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,11,14,0.5),transparent_42%),linear-gradient(110deg,rgba(255,118,40,0.06),transparent_35%)]"
        />

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#FF7628] shadow-[0_0_14px_rgba(255,118,40,0.65)] transition-transform duration-500 group-hover:scale-x-100"
        />
      </div>

      <div className="flex grow flex-col p-4 sm:p-5">
        <p className="mb-2 text-[0.58rem] font-black uppercase tracking-[0.19em] text-[#FF7628]">
          {project.category}
        </p>

        <h3 className="text-lg font-black leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.15rem]">
          {project.title}
        </h3>

        <p className="mt-1.5 grow text-[0.82rem] font-medium leading-[1.4] text-[#ADB4BE] sm:text-[0.84rem]">
          {project.shortDesc}
        </p>

        <div className="mt-4 flex min-h-10 items-end justify-between gap-4">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {project.tech
              .slice(0, 3)
              .map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-[#30343A] bg-white/[0.025] px-2.5 py-1 text-[0.58rem] font-bold leading-none text-[#C7CBD1]"
                >
                  {technology}
                </span>
              ))}
          </div>

          <Link
            href={`/project/${project.id}`}
            aria-label={`View ${project.title} case study`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-[#FF7628] text-[#FF7628] shadow-[0_0_18px_rgba(255,118,40,0.06)] transition-[background-color,color,transform,box-shadow] duration-300 hover:scale-105 hover:bg-[#FF7628] hover:text-[#080B0E] hover:shadow-[0_0_22px_rgba(255,118,40,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
          >
            <ArrowRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const flagshipProject = useMemo(
    () =>
      projectCards.find(
        (project) =>
          project.id === "zenatrace",
      ),
    [],
  );

  const otherProjects = useMemo(
    () => {
      const projects = projectCards.filter(
        (project) =>
          project.id !== "zenatrace",
      );

      return [
        ...defaultProjectOrder.flatMap(
          (projectId) =>
            projects.filter(
              (project) =>
                project.id === projectId,
            ),
        ),
        ...projects.filter(
          (project) =>
            !defaultProjectOrder.includes(
              project.id,
            ),
        ),
      ];
    },
    [],
  );

  const trackRef =
    useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const [isExpanded, setIsExpanded] =
    useState(false);

  const [canScrollPrevious, setCanScrollPrevious] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(true);

  const syncCarouselControls =
    useCallback(() => {
      const track = trackRef.current;

      if (!track || isExpanded) {
        setCanScrollPrevious(false);
        setCanScrollNext(false);
        return;
      }

      const maxScrollLeft =
        track.scrollWidth - track.clientWidth;

      setCanScrollPrevious(
        track.scrollLeft > 4,
      );

      setCanScrollNext(
        track.scrollLeft <
          maxScrollLeft - 4,
      );
    }, [isExpanded]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const syncFrame =
      window.requestAnimationFrame(
        syncCarouselControls,
      );

    track.addEventListener(
      "scroll",
      syncCarouselControls,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      syncCarouselControls,
    );

    return () => {
      window.cancelAnimationFrame(syncFrame);

      track.removeEventListener(
        "scroll",
        syncCarouselControls,
      );

      window.removeEventListener(
        "resize",
        syncCarouselControls,
      );
    };
  }, [syncCarouselControls]);

  const scrollCarousel = (
    direction: -1 | 1,
  ) => {
    const track = trackRef.current;

    const firstCard =
      track?.querySelector<HTMLElement>(
        "[data-project-card]",
      );

    if (!track || !firstCard) {
      return;
    }

    const styles =
      window.getComputedStyle(track);

    const gap =
      Number.parseFloat(styles.columnGap) ||
      Number.parseFloat(styles.gap) ||
      0;

    track.scrollBy({
      left:
        direction *
        (firstCard.offsetWidth + gap),
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth",
    });
  };

  const toggleAllProjects = () => {
    const nextExpandedState =
      !isExpanded;

    setIsExpanded(nextExpandedState);

    if (!nextExpandedState) {
      window.requestAnimationFrame(() => {
        trackRef.current?.scrollTo({
          left: 0,
          behavior: "auto",
        });
      });
    }
  };

  if (!flagshipProject) {
    return null;
  }

  const primaryImage =
    flagshipProject.featuredMedia
      ?.primary ?? flagshipProject.image;

  const secondaryImage =
    flagshipProject.featuredMedia
      ?.secondary ?? flagshipProject.image;

  const phoneImage = zenatracePhoneMockup;

  if (
    !primaryImage ||
    !secondaryImage ||
    !phoneImage
  ) {
    return null;
  }

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#080B0E] py-12 text-white sm:py-14 lg:py-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,118,40,0.13),transparent_27%),radial-gradient(circle_at_14%_22%,rgba(255,118,40,0.06),transparent_20%)]"
      />

      <div
        className={`relative ${siteContentContainerClass}`}
      >
        <div className="grid items-center gap-9 lg:grid-cols-[0.79fr_1.21fr] lg:gap-7 xl:gap-9">
          <Reveal y={22} amount={0.15}>
            <div className="relative z-20">
              <div className="mb-3 flex items-center gap-4 sm:mb-4">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-12 bg-[#FF7628] shadow-[0_0_12px_rgba(255,118,40,0.45)]"
                />

                <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-[#D5D9DE] sm:text-xs">
                  Selected Work / 01
                </p>
              </div>

              <h2
                id="projects-heading"
                className="normal-case text-[clamp(3.25rem,5.25vw,4.85rem)] font-black leading-[0.87] tracking-[-0.062em]"
              >
                <span>Zena</span>
                <span className="text-[#FF7628]">
                  Trace
                </span>
              </h2>

              <p className="mt-2.5 max-w-[34rem] text-xl font-medium tracking-[-0.025em] text-white sm:text-2xl lg:text-[1.45rem] xl:text-[1.55rem]">
                Pharmaceutical Traceability
                Platform
              </p>

              <p className="mt-3.5 max-w-[38rem] text-sm font-medium leading-6 text-[#B8BEC7] sm:text-[0.95rem] sm:leading-6 lg:text-[0.94rem]">
                {flagshipDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {flagshipTechnologies.map(
                  (technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[#3A4048] bg-[#0D1116]/80 px-3 py-1.5 text-[0.67rem] font-bold text-[#E3E6EA] shadow-[inset_0_1px_rgba(255,255,255,0.025)]"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3 xl:grid-cols-3 xl:gap-4">
                {flagshipFeatures.map(
                  (feature) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.title}
                        className="border-l border-[#30343A] pl-4 first:border-[#FF7628]"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-6 text-[#FF7628]"
                          strokeWidth={1.8}
                        />

                        <h3 className="mt-2 text-[0.82rem] font-black normal-case leading-snug tracking-[-0.02em] text-white">
                          {feature.title}
                        </h3>

                        <p className="mt-1 text-[0.7rem] font-medium leading-[1.45] text-[#949BA5]">
                          {feature.description}
                        </p>
                      </div>
                    );
                  },
                )}
              </div>

              <Link
                href="/project/zenatrace"
                className="group mt-7 inline-flex min-h-12 items-center justify-center gap-4 rounded-sm border border-[#FF7628] bg-[#FF7628] px-7 py-3 text-sm font-black text-[#080B0E] shadow-[0_14px_36px_rgba(255,118,40,0.2)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#FF8B4A] hover:shadow-[0_18px_42px_rgba(255,118,40,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
              >
                View Case Study

                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.4}
                />
              </Link>
            </div>
          </Reveal>

          <DeviceComposition
            primaryImage={primaryImage}
            secondaryImage={secondaryImage}
            phoneImage={phoneImage}
          />
        </div>

        <div className="mt-10 border-t border-[#30343A] pt-7 sm:mt-12 sm:pt-8 lg:mt-6 lg:pt-6">
          <Reveal
            y={16}
            amount={0.1}
            className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-0.5 w-12 bg-[#FF7628]"
                />

                <h2 className="text-lg font-black uppercase tracking-[0.14em] text-white sm:text-2xl">
                  Other Projects
                </h2>
              </div>

              <p className="mt-2 pl-16 text-sm font-medium text-[#B8BEC7] sm:text-base">
                More systems. More possibilities.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <button
                type="button"
                onClick={toggleAllProjects}
                aria-expanded={isExpanded}
                aria-controls="other-projects-list"
                className="group inline-flex min-h-11 items-center gap-2 border-0 bg-transparent px-2 text-sm font-black text-[#FF7628] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
              >
                {isExpanded
                  ? "Return to Carousel"
                  : "View All Projects"}

                <ArrowRight
                  aria-hidden="true"
                  className={cn(
                    "size-4 transition-transform duration-300 group-hover:translate-x-1",
                    isExpanded &&
                      "rotate-180 group-hover:-translate-x-1",
                  )}
                />
              </button>
            </div>
          </Reveal>

          <div className="relative sm:px-14">
            {!isExpanded && (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden sm:block"
                aria-label="Project carousel controls"
              >
                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(-1)
                  }
                  disabled={!canScrollPrevious}
                  aria-label="Show previous projects"
                  className="pointer-events-auto absolute left-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#49515A] bg-[#090D11]/95 text-[#B8BEC7] shadow-[0_12px_30px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[border-color,color,background-color,transform] hover:scale-105 hover:border-[#FF7628] hover:text-[#FF7628] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 xl:size-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(1)
                  }
                  disabled={!canScrollNext}
                  aria-label="Show next projects"
                  className="pointer-events-auto absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#FF7628] bg-[#090D11]/95 text-[#FF7628] shadow-[0_12px_30px_rgba(0,0,0,0.55),0_0_18px_rgba(255,118,40,0.08)] backdrop-blur-sm transition-[border-color,color,background-color,transform] hover:scale-105 hover:bg-[#FF7628] hover:text-[#080B0E] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 xl:size-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>
              </div>
            )}

            <div
              ref={trackRef}
              id="other-projects-list"
              aria-label="Other portfolio projects"
              className={cn(
                "grid items-stretch gap-5 sm:gap-6",
                isExpanded
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : "grid-flow-col auto-cols-[100%] snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:auto-cols-[calc(50%-0.75rem)] xl:auto-cols-[calc(33.333%-1rem)] [&::-webkit-scrollbar]:hidden",
              )}
            >
              {otherProjects.map((project) => (
                <OtherProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>

            {!isExpanded && (
              <div
                className="mt-5 flex items-center justify-center gap-3 sm:hidden"
                aria-label="Project carousel controls"
              >
                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(-1)
                  }
                  disabled={!canScrollPrevious}
                  aria-label="Show previous projects"
                  className="grid size-11 place-items-center rounded-full border border-[#49515A] bg-[#090D11] text-[#B8BEC7] transition-colors hover:border-[#FF7628] hover:text-[#FF7628] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(1)
                  }
                  disabled={!canScrollNext}
                  aria-label="Show next projects"
                  className="grid size-11 place-items-center rounded-full border border-[#FF7628] bg-[#090D11] text-[#FF7628] transition-colors hover:bg-[#FF7628] hover:text-[#080B0E] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
