import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";

import {
  GalleryModal,
  type GalleryModalState,
} from "@/components/project/gallery-modal";
import {
  ProjectArchitecture,
  ProjectContributions,
  ProjectDetailHeader,
  ProjectDetailHero,
  ProjectEvidence,
  ProjectHighlights,
  ProjectMetadata,
  ProjectOverview,
  ProjectResults,
} from "@/components/project/project-detail-sections";
import { projects } from "@/data/projects";
import {
  getArchitectureGroups,
  getProjectDetailSectionNumbers,
  getProjectNavigation,
} from "@/lib/project-detail";
import { siteContentContainerClass } from "@/lib/layout";

const SITE_NAME = "Muhammad Ibrahim Khan";
const DEFAULT_SOCIAL_IMAGE = "/opengraph.jpg";

function toAbsoluteUrl(source: string) {
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
  const [, params] = useRoute(
    "/project/:id",
  );
  const project = projects.find(
    (item) => item.id === params?.id,
  );
  const prefersReducedMotion =
    useReducedMotion() ?? false;
  const pageContentRef =
    useRef<HTMLDivElement | null>(null);
  const [galleryModal, setGalleryModal] =
    useState<GalleryModalState | null>(null);

  const mediaSlides = useMemo(() => {
    if (project?.gallery?.length) {
      return project.gallery;
    }

    return project?.image ? [project.image] : [];
  }, [project]);

  const architectureGroups = useMemo(
    () =>
      getArchitectureGroups(
        project?.tech ?? [],
        {
          descriptions:
            project?.architectureDescriptions,
          excludedTechnologies:
            [
              ...(project?.architectureNotes?.flatMap(
                (note) => note.technologies,
              ) ?? []),
              ...(project?.architectureExcludedTechnologies ??
                []),
            ],
        },
      ),
    [project],
  );

  const projectNavigation = useMemo(
    () =>
      getProjectNavigation(
        projects,
        project?.id ?? "",
      ),
    [project?.id],
  );

  const sectionNumbers = useMemo(
    () =>
      project
        ? getProjectDetailSectionNumbers(
            project,
            architectureGroups.length > 0,
          )
        : null,
    [architectureGroups.length, project],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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
      let element =
        document.head.querySelector<HTMLElement>(
          selector,
        );
      const created = !element;

      if (!element) {
        element = createElement();
        document.head.appendChild(element);
      }

      managedElements.push({
        element,
        attribute,
        previousValue:
          element.getAttribute(attribute),
        created,
      });
      element.setAttribute(attribute, value);
    };

    const setMeta = (
      key: "name" | "property",
      label: string,
      value: string,
    ) => {
      setHeadAttribute(
        `meta[${key}="${label}"]`,
        () => {
          const element =
            document.createElement("meta");
          element.setAttribute(key, label);
          return element;
        },
        "content",
        value,
      );
    };

    const pageTitle = project
      ? `${project.title} | ${SITE_NAME}`
      : `Project Not Found | ${SITE_NAME}`;
    const pageDescription = project
      ? project.shortDesc
      : "The requested portfolio project could not be found.";
    const pageUrl = `${window.location.origin}${window.location.pathname}`;
    const socialImage = toAbsoluteUrl(
      project?.gallery?.[0] ??
        project?.image ??
        DEFAULT_SOCIAL_IMAGE,
    );

    document.title = pageTitle;
    setMeta(
      "name",
      "description",
      pageDescription,
    );
    setMeta("property", "og:title", pageTitle);
    setMeta(
      "property",
      "og:description",
      pageDescription,
    );
    setMeta("property", "og:type", "article");
    setMeta(
      "property",
      "og:site_name",
      SITE_NAME,
    );
    setMeta("property", "og:url", pageUrl);
    setMeta(
      "property",
      "og:image",
      socialImage,
    );
    setMeta(
      "name",
      "twitter:card",
      "summary_large_image",
    );
    setMeta(
      "name",
      "twitter:title",
      pageTitle,
    );
    setMeta(
      "name",
      "twitter:description",
      pageDescription,
    );
    setMeta(
      "name",
      "twitter:image",
      socialImage,
    );
    setHeadAttribute(
      'link[rel="canonical"]',
      () => {
        const element =
          document.createElement("link");
        element.setAttribute("rel", "canonical");
        return element;
      },
      "href",
      pageUrl,
    );

    return () => {
      document.title = previousTitle;

      managedElements.reverse().forEach(
        (managed) => {
          if (managed.created) {
            managed.element.remove();
          } else if (
            managed.previousValue === null
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
        },
      );
    };
  }, [project]);

  const openGallery = useCallback(
    (title: string, items: string[]) => {
      if (items.length === 0) {
        return;
      }

      setGalleryModal({ title, items });
    },
    [],
  );

  const closeGallery = useCallback(() => {
    setGalleryModal(null);
  }, []);

  if (!project) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="grid min-h-screen place-items-center bg-[#080B0E] px-5 text-white"
      >
        <div className="max-w-lg text-center">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#FF7628]">
            404 / Project Not Found
          </p>
          <h1 className="mt-4 normal-case text-4xl font-black tracking-[-0.045em] sm:text-6xl">
            This case study is unavailable.
          </h1>
          <p className="mt-5 text-base font-medium leading-7 text-[#AAB2BC]">
            The requested project route does not match an existing portfolio record.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-md bg-[#FF7628] px-6 py-3 text-sm font-black text-[#080B0E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4"
            />
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="project-detail-shell min-h-screen overflow-x-clip bg-[#080B0E] text-white selection:bg-[#FF7628] selection:text-[#080B0E]">
      <div ref={pageContentRef}>
        <ProjectDetailHeader
          project={project}
          nextProject={projectNavigation.nextProject}
        />

        <motion.main
          id="main-content"
          tabIndex={-1}
          className="project-detail-main"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, y: 14 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion
              ? 0
              : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProjectDetailHero
            project={project}
            media={mediaSlides}
            onExpandGallery={() =>
              openGallery(
                `${project.title} visuals`,
                mediaSlides,
              )
            }
            prefersReducedMotion={
              prefersReducedMotion
            }
          />

          <ProjectMetadata project={project} />

          <div className={siteContentContainerClass}>
            <ProjectOverview
              project={project}
              challengesSectionNumber={
                sectionNumbers?.challenges
              }
            />
            <ProjectContributions
              project={project}
              sectionNumber={
                sectionNumbers?.contributions
              }
            />
            <ProjectHighlights
              project={project}
              sectionNumber={
                sectionNumbers?.highlights
              }
            />
            <ProjectResults
              project={project}
              sectionNumber={sectionNumbers?.results}
            />
            <ProjectEvidence
              project={project}
              onOpenGallery={openGallery}
              sectionNumber={sectionNumbers?.evidence}
            />
            <ProjectArchitecture
              groups={architectureGroups}
              notes={project.architectureNotes}
              sectionNumber={
                sectionNumbers?.architecture
              }
            />
          </div>
        </motion.main>
      </div>

      <GalleryModal
        modal={galleryModal}
        onClose={closeGallery}
        pageContentRef={pageContentRef}
        prefersReducedMotion={
          prefersReducedMotion
        }
      />
    </div>
  );
}
