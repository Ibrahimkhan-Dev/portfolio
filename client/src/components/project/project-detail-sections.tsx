import type { ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  CheckCircle2,
  Code2,
  Compass,
  Database,
  ExternalLink,
  Images,
  Layers3,
  MonitorSmartphone,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectSection } from "@/components/project/project-section";
import type {
  Project,
  ProjectArchitectureNote,
  ProjectContributionIcon,
  ProjectFeatureHighlightIcon,
} from "@/data/projects";
import type { ArchitectureGroup } from "@/lib/project-detail";
import { siteContentContainerClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

type HomeLinkProps = {
  children: ReactNode;
  className: string;
};

const contributionIcons = {
  direction: Compass,
  logic: Database,
  debugging: Bug,
  verification: CheckCircle2,
} satisfies Record<
  ProjectContributionIcon,
  typeof Compass
>;

const featureHighlightIcons = {
  "master-data": Database,
  serialization: CheckCircle2,
  packaging: Layers3,
  shipment: Truck,
  security: ShieldCheck,
  "data-services": Search,
} satisfies Record<
  ProjectFeatureHighlightIcon,
  typeof Database
>;

const architectureIcons: Record<
  string,
  typeof Layers3
> = {
  "Interface Layer": MonitorSmartphone,
  "Application & API Layer": Code2,
  "Data & Services": Database,
  "Security & Access": ShieldCheck,
  "Platform & Hardware": Server,
  "Supporting Tooling": Wrench,
};

function HomeProjectsLink({
  children,
  className,
}: HomeLinkProps) {
  return (
    <Link
      href="/"
      onClick={() => {
        sessionStorage.setItem(
          "portfolio_scroll_to_projects",
          "1",
        );
      }}
      className={className}
    >
      {children}
    </Link>
  );
}

export function ProjectDetailHeader({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const currentProjectTitle =
    project.detailTitle ?? project.title;

  return (
    <header className="sticky top-0 z-30 border-b border-[#2A323B]/90 bg-[linear-gradient(180deg,rgba(16,21,27,0.96),rgba(8,11,14,0.92))] shadow-[0_10px_36px_rgba(0,0,0,0.32),0_1px_0_rgba(255,118,40,0.035)] backdrop-blur-xl">
      <nav
        aria-label="Project navigation"
        className={cn(
          siteContentContainerClass,
          "grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 py-2 sm:gap-4",
        )}
      >
        <HomeProjectsLink className="group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-[#FF7628]/60 bg-[linear-gradient(145deg,rgba(255,118,40,0.085),rgba(11,16,21,0.98)_55%)] px-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_rgba(255,255,255,0.045),0_8px_24px_rgba(0,0,0,0.18)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#FF7628] hover:bg-[#FF7628]/10 hover:shadow-[inset_0_1px_rgba(255,255,255,0.06),0_10px_28px_rgba(255,118,40,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B0E] sm:justify-start sm:px-4 sm:text-xs">
          <ArrowLeft
            aria-hidden="true"
            className="size-4 shrink-0 text-[#FF7628] transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span className="sr-only sm:not-sr-only">
            All Projects
          </span>
        </HomeProjectsLink>

        <p
          aria-current="page"
          className="min-w-0 truncate px-1 text-center text-xs font-black uppercase tracking-[0.11em] text-[#D9DEE4] sm:text-sm"
        >
          <span className="sr-only">Current project: </span>
          {currentProjectTitle}
        </p>

        {nextProject ? (
          <Link
            href={`/project/${nextProject.id}`}
            aria-label={`Next project: ${nextProject.detailTitle ?? nextProject.title}`}
            className="group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-[#303943] bg-[linear-gradient(145deg,rgba(255,255,255,0.025),rgba(11,16,21,0.98))] px-3 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_rgba(255,255,255,0.035),0_8px_24px_rgba(0,0,0,0.18)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-[#FF7628]/70 hover:bg-[#FF7628]/[0.07] hover:shadow-[inset_0_1px_rgba(255,255,255,0.05),0_10px_28px_rgba(255,118,40,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B0E] sm:min-w-28 sm:justify-end sm:px-4 sm:text-xs lg:max-w-64"
          >
            <span className="hidden sm:inline">
              Next Project
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 shrink-0 text-[#FF7628] transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <span
            aria-hidden="true"
            className="min-h-11 min-w-11 sm:min-w-28 lg:min-w-64"
          />
        )}
      </nav>
    </header>
  );
}

export function ProjectDetailHero({
  project,
  media,
  onExpandGallery,
  prefersReducedMotion,
}: {
  project: Project;
  media: string[];
  onExpandGallery: () => void;
  prefersReducedMotion: boolean;
}) {
  const displayTitle =
    project.detailTitle ?? project.title;
  const hasLongTitle =
    displayTitle.length > 34;

  return (
    <section className="relative overflow-hidden border-b border-[#252D35] bg-[linear-gradient(180deg,#080B0E_0%,#090D11_58%,#080B0E_100%)] pb-3 pt-10 sm:pt-12 lg:pt-12 xl:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_27%,rgba(255,118,40,0.15),transparent_30%),radial-gradient(circle_at_72%_35%,rgba(255,118,40,0.045),transparent_46%),radial-gradient(circle_at_18%_14%,rgba(255,118,40,0.06),transparent_24%)]"
      />

      <div className={cn(siteContentContainerClass, "relative grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 xl:gap-16")}>
        <div className="min-w-0">
          {project.category && (
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[#FF7628] shadow-[0_0_12px_rgba(255,118,40,0.35)]"
              />
              <p className="text-[0.66rem] font-black uppercase tracking-[0.25em] text-[#FF7628] sm:text-xs">
                {project.category}
              </p>
            </div>
          )}

          <h1
            className={cn(
              "normal-case font-black text-white drop-shadow-[0_5px_24px_rgba(0,0,0,0.34)]",
              hasLongTitle
                ? "max-w-[19ch] text-[clamp(2.35rem,4.1vw,4.35rem)] leading-[0.96] tracking-[-0.048em]"
                : "max-w-[13ch] text-[clamp(2.9rem,5.4vw,5.6rem)] leading-[0.9] tracking-[-0.06em]",
            )}
          >
            {displayTitle}
          </h1>

          {project.subtitle && (
            <p className="mt-4 max-w-xl text-lg font-bold leading-snug tracking-[-0.02em] text-white sm:text-xl lg:text-2xl">
              {project.subtitle}
            </p>
          )}

          <p className="mt-5 max-w-[62ch] text-sm font-medium leading-6 text-[#B8BEC7] sm:text-base sm:leading-7 lg:text-[1.03rem] lg:leading-7">
            {project.shortDesc}
          </p>

          <ul
            aria-label="Primary technologies"
            className="mt-6 flex max-w-2xl flex-wrap gap-2"
          >
            {project.tech.slice(0, 8).map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-[#343E48] bg-[linear-gradient(145deg,rgba(255,255,255,0.045),rgba(13,18,23,0.96))] px-3 py-1.5 text-[0.68rem] font-bold leading-none text-[#E1E5E9] shadow-[inset_0_1px_rgba(255,255,255,0.045),0_5px_14px_rgba(0,0,0,0.14)] transition-[border-color,background-color] duration-200 hover:border-[#FF7628]/40 hover:bg-[#121920]"
              >
                {technology}
              </li>
            ))}
          </ul>
        </div>

        {media.length > 0 && (
          <ProjectGallery
            projectTitle={project.title}
            items={media}
            onExpand={onExpandGallery}
            prefersReducedMotion={prefersReducedMotion}
          />
        )}
      </div>
    </section>
  );
}

export function ProjectMetadata({
  project,
}: {
  project: Project;
}) {
  const entries = [
    project.company && {
      label: "Organization",
      value: project.company,
    },
    project.role && {
      label: "My Role",
      value: project.role,
    },
    project.duration && {
      label: "Project Period",
      value: project.duration,
    },
    project.category && {
      label: "Project Type",
      value: project.category,
    },
    project.team && {
      label: "Team Context",
      value: project.team,
    },
    project.supervisor && {
      label: "Supervisor",
      value: project.supervisor,
    },
  ].filter(
    (entry): entry is {
      label: string;
      value: string;
    } => Boolean(entry),
  );

  if (entries.length === 0) {
    return null;
  }

  const desktopGridClass =
    entries.length >= 6
      ? "lg:grid-cols-3 xl:grid-cols-6"
      : entries.length === 5
        ? "lg:grid-cols-3 xl:grid-cols-5"
        : entries.length === 4
          ? "lg:grid-cols-4"
          : entries.length === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-2";

  return (
    <section
      aria-label="Project metadata"
      className="border-b border-[#252D35] bg-[linear-gradient(180deg,#090D11,#0A0F14)]"
    >
      <div className={cn(siteContentContainerClass, "py-5 sm:py-6")}>
        <dl
          className={cn(
            "grid overflow-hidden rounded-xl border border-[#2C3540] bg-[#111820] shadow-[0_20px_55px_rgba(0,0,0,0.28),inset_0_1px_rgba(255,255,255,0.035)] sm:grid-cols-2",
            desktopGridClass,
          )}
        >
          {entries.map((entry) => (
            <div
              key={entry.label}
              className="border-b border-r border-[#28313A] bg-[linear-gradient(145deg,rgba(255,255,255,0.022),rgba(10,14,18,0.98)_48%)] px-5 py-5 shadow-[inset_0_1px_rgba(255,255,255,0.018)] last:border-r-0 sm:min-h-28 sm:px-6 sm:py-6"
            >
              <dt className="text-[0.62rem] font-black uppercase tracking-[0.2em] text-[#FF7628]">
                {entry.label}
              </dt>
              <dd className="mt-2.5 text-sm font-bold leading-5 text-white sm:text-[0.95rem] sm:leading-6">
                {entry.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ContentCard({
  title,
  children,
  prominent = false,
}: {
  title: string;
  children: ReactNode;
  prominent?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative h-full overflow-hidden rounded-xl border bg-[linear-gradient(145deg,#121820_0%,#0C1116_68%)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_rgba(255,255,255,0.028)] transition-[border-color,transform,background-color,box-shadow] duration-300 motion-reduce:transition-none sm:p-6 lg:p-7",
        prominent
          ? "border-[#FF7628]/40 bg-[linear-gradient(135deg,rgba(255,118,40,0.09),rgba(18,24,32,0.96)_35%,rgba(12,17,22,0.99)_72%)] shadow-[0_22px_55px_rgba(0,0,0,0.25),0_0_28px_rgba(255,118,40,0.045),inset_0_1px_rgba(255,255,255,0.035)]"
          : "border-[#2D3640] hover:-translate-y-0.5 hover:border-[#FF7628]/40 hover:shadow-[0_22px_52px_rgba(0,0,0,0.3),0_0_24px_rgba(255,118,40,0.04),inset_0_1px_rgba(255,255,255,0.035)]",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[#FF7628] via-[#FF7628]/65 to-[#FF7628]/15 shadow-[0_0_12px_rgba(255,118,40,0.16)]"
      />
      <h3 className="normal-case text-lg font-black tracking-[-0.025em] text-white sm:text-xl">
        {title}
      </h3>
      <div className="mt-3 max-w-[72ch] text-sm font-medium leading-6 text-[#B8BEC7] sm:text-[0.98rem] sm:leading-7">
        {children}
      </div>
    </article>
  );
}

export function ProjectOverview({
  project,
  challengesSectionNumber,
}: {
  project: Project;
  challengesSectionNumber?: number;
}) {
  const challengeCards = [
    project.beforeState && {
      title: "Starting Point",
      content: project.beforeState,
    },
    project.context && {
      title: "Project Context",
      content: project.context,
    },
    project.constraints && {
      title: "Constraints",
      content: project.constraints,
    },
    project.purpose && {
      title: "Purpose",
      content: project.purpose,
    },
  ].filter(
    (card): card is {
      title: string;
      content: string;
    } => Boolean(card),
  );

  return (
    <>
      <ProjectSection
        title="Project Overview"
        compactTop
        compactBottom
      >
        <div className="relative w-full pl-5 sm:pl-8">
          <span
            aria-hidden="true"
            className="absolute inset-y-1 left-0 w-px bg-gradient-to-b from-[#FF7628] via-[#FF7628]/60 to-transparent shadow-[0_0_14px_rgba(255,118,40,0.18)]"
          />
          <p className="text-base font-medium leading-7 text-[#C8CDD3] sm:text-[1.08rem] sm:leading-8 lg:text-lg lg:leading-[2.05rem]">
            {project.description}
          </p>
        </div>
      </ProjectSection>

      {challengeCards.length > 0 &&
        challengesSectionNumber && (
        <ProjectSection
          title="Problem & Technical Challenges"
          className="border-t border-white/[0.07]"
          compactTop
          compactBottom
          fluidTitle
        >
          <div className="grid items-stretch gap-4 md:grid-cols-2 lg:gap-5">
            {challengeCards.map((card, index) => (
              <ContentCard
                key={card.title}
                title={`${String(index + 1).padStart(2, "0")} · ${card.title}`}
              >
                <p>{card.content}</p>
              </ContentCard>
            ))}
          </div>
        </ProjectSection>
      )}
    </>
  );
}

export function ProjectContributions({
  project,
  sectionNumber,
}: {
  project: Project;
  sectionNumber?: number;
}) {
  const contributionCards =
    project.contributions ?? [];

  if (
    (!project.whatChanged &&
      !project.developmentApproach &&
      contributionCards.length === 0) ||
    !sectionNumber
  ) {
    return null;
  }

  return (
    <ProjectSection
      title="My Role & Contributions"
      className="border-t border-white/[0.07]"
      compactTop
      compactBottom
      fluidTitle
    >
      {contributionCards.length > 0 ? (
        <ul className="grid items-stretch gap-4 md:grid-cols-2 lg:gap-5">
          {contributionCards.map((contribution) => {
            const Icon = contribution.icon
              ? contributionIcons[contribution.icon]
              : Code2;

            return (
              <li key={contribution.title}>
                <article className="group h-full rounded-xl border border-[#2E3741] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#FF7628]/45 hover:shadow-[0_24px_56px_rgba(0,0,0,0.3),0_0_26px_rgba(255,118,40,0.045),inset_0_1px_rgba(255,255,255,0.04)] motion-reduce:transition-none sm:p-6 lg:p-7">
                  <span className="grid size-10 place-items-center rounded-lg border border-[#FF7628]/30 bg-[linear-gradient(145deg,rgba(255,118,40,0.13),rgba(255,118,40,0.035))] shadow-[0_8px_24px_rgba(255,118,40,0.075),inset_0_1px_rgba(255,255,255,0.06)]">
                    <Icon
                      aria-hidden="true"
                      className="size-5 text-[#FF7628]"
                    />
                  </span>
                  <h3 className="mt-5 normal-case text-lg font-black tracking-[-0.025em] text-white sm:text-xl">
                    {contribution.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#B8BEC7] sm:text-[0.96rem] sm:leading-7">
                    {contribution.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        project.whatChanged && (
          <ContentCard
            title="Implementation Contribution"
            prominent
          >
            <p>{project.whatChanged}</p>
          </ContentCard>
        )
      )}

      {project.developmentApproach && (
        <aside className="relative mt-5 overflow-hidden rounded-xl border border-[#FF7628]/30 bg-[linear-gradient(135deg,rgba(255,118,40,0.07),rgba(15,21,28,0.98)_34%,rgba(10,15,20,0.99))] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_rgba(255,255,255,0.028)] sm:p-6 lg:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-[#FF7628]/35 bg-[linear-gradient(145deg,rgba(255,118,40,0.14),rgba(255,118,40,0.035))] shadow-[0_8px_22px_rgba(255,118,40,0.08),inset_0_1px_rgba(255,255,255,0.06)]">
              <Sparkles
                aria-hidden="true"
                className="size-4 text-[#FF7628]"
              />
            </span>
            <h3 className="normal-case text-base font-black tracking-[-0.02em] text-white sm:text-lg">
              Development Approach
            </h3>
          </div>
          <p className="mt-3 max-w-[90rem] text-sm font-medium leading-6 text-[#B8BEC7] sm:text-[0.96rem] sm:leading-7">
            {project.developmentApproach}
          </p>
        </aside>
      )}
    </ProjectSection>
  );
}

export function ProjectArchitecture({
  groups,
  notes = [],
  sectionNumber,
}: {
  groups: ArchitectureGroup[];
  notes?: ProjectArchitectureNote[];
  sectionNumber?: number;
}) {
  if (groups.length === 0 || !sectionNumber) {
    return null;
  }

  return (
    <ProjectSection
      title="System Architecture"
      description="A data-driven view of the documented technologies used across this project."
      className="border-t border-white/[0.07]"
      compactTop
      compactBottom
    >
      <ol
        aria-label="Documented project technology layers"
        className="grid items-stretch gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3"
      >
        {groups.map((group, index) => {
          const Icon =
            architectureIcons[group.title] ?? Layers3;

          return (
            <li
              key={group.title}
              className="relative flex h-full flex-col overflow-hidden rounded-xl border border-[#2E3741] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#FF7628]/45 hover:shadow-[0_24px_56px_rgba(0,0,0,0.3),0_0_26px_rgba(255,118,40,0.045),inset_0_1px_rgba(255,255,255,0.04)] motion-reduce:transition-none sm:p-6 lg:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#FF7628] via-[#FF7628]/30 to-transparent shadow-[0_1px_12px_rgba(255,118,40,0.1)]"
              />
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-lg border border-[#FF7628]/30 bg-[linear-gradient(145deg,rgba(255,118,40,0.13),rgba(255,118,40,0.035))] shadow-[0_8px_24px_rgba(255,118,40,0.075),inset_0_1px_rgba(255,255,255,0.06)]">
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-[#FF7628]"
                  />
                </span>
                <span className="text-[0.65rem] font-black tracking-[0.18em] text-[#69737D]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 normal-case text-lg font-black leading-tight tracking-[-0.025em] text-white sm:text-xl">
                {group.title}
              </h3>
              <p className="mt-2.5 text-sm font-medium leading-6 text-[#AEB6BF] sm:text-[0.95rem] sm:leading-7">
                {group.description}
              </p>
              <ul className="mt-auto flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
                {group.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-full border border-[#39444F] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] px-3 py-1.5 text-[0.68rem] font-bold leading-none text-[#E0E4E8] shadow-[inset_0_1px_rgba(255,255,255,0.035)] sm:text-xs"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      {notes.map((note) => (
        <aside
          key={`${note.title}-${note.status}`}
          aria-label={`${note.title} — ${note.status}`}
          className="mt-4 flex flex-col gap-4 rounded-xl border border-[#303943] bg-[linear-gradient(135deg,rgba(255,118,40,0.045),rgba(13,18,23,0.98)_30%)] p-4 shadow-[0_16px_42px_rgba(0,0,0,0.2),inset_0_1px_rgba(255,255,255,0.025)] sm:flex-row sm:items-center sm:p-5"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#FF7628]/30 bg-[linear-gradient(145deg,rgba(255,118,40,0.13),rgba(255,118,40,0.035))] shadow-[0_8px_24px_rgba(255,118,40,0.075),inset_0_1px_rgba(255,255,255,0.06)]">
            <Smartphone
              aria-hidden="true"
              className="size-5 text-[#FF7628]"
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="normal-case text-base font-black tracking-[-0.02em] text-white sm:text-lg">
                {note.title}
              </h3>
              <span className="rounded-full border border-[#FF7628]/35 bg-[#FF7628]/[0.08] px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.13em] text-[#FF7628]">
                {note.status}
              </span>
            </div>
            <p className="mt-1.5 text-sm font-medium leading-6 text-[#AEB6BF] sm:text-[0.95rem] sm:leading-7">
              {note.description}
            </p>
          </div>
          <ul
            aria-label={`${note.title} technologies`}
            className="flex shrink-0 flex-wrap gap-2"
          >
            {note.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-[#39444F] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] px-3 py-1.5 text-[0.68rem] font-bold leading-none text-[#E0E4E8] shadow-[inset_0_1px_rgba(255,255,255,0.035)] sm:text-xs"
              >
                {technology}
              </li>
            ))}
          </ul>
        </aside>
      ))}
    </ProjectSection>
  );
}

export function ProjectHighlights({
  project,
  sectionNumber,
}: {
  project: Project;
  sectionNumber?: number;
}) {
  if (!project.highlights?.length || !sectionNumber) {
    return null;
  }

  const featureHighlights: Array<{
    title?: string;
    description: string;
    icon?: ProjectFeatureHighlightIcon;
  }> =
    project.featureHighlights ??
    project.highlights.map((description) => ({
      description,
    }));

  return (
    <ProjectSection
      title="Key Features & Engineering Highlights"
      className="border-t border-white/[0.07]"
      compactTop
      compactBottom
      fluidTitle
      fullWidthHeader
    >
      <ul className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
        {featureHighlights.map((highlight) => {
          const Icon = highlight.icon
            ? featureHighlightIcons[highlight.icon]
            : CheckCircle2;
          const key =
            highlight.title ?? highlight.description;

          return (
            <li key={key} className="h-full">
              <article className="group h-full rounded-xl border border-[#2E3741] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.22),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#FF7628]/45 hover:shadow-[0_24px_56px_rgba(0,0,0,0.3),0_0_26px_rgba(255,118,40,0.045),inset_0_1px_rgba(255,255,255,0.04)] motion-reduce:transition-none sm:p-6 lg:p-7">
                <span className="grid size-10 place-items-center rounded-lg border border-[#FF7628]/30 bg-[linear-gradient(145deg,rgba(255,118,40,0.13),rgba(255,118,40,0.035))] shadow-[0_8px_24px_rgba(255,118,40,0.075),inset_0_1px_rgba(255,255,255,0.06)]">
                  <Icon
                    aria-hidden="true"
                    className="size-5 text-[#FF7628]"
                  />
                </span>

                {highlight.title && (
                  <h3 className="mt-5 normal-case text-lg font-black leading-tight tracking-[-0.025em] text-white sm:text-xl">
                    {highlight.title}
                  </h3>
                )}

                <p
                  className={`${highlight.title ? "mt-3" : "mt-5"} text-sm font-medium leading-6 text-[#B8BEC7] sm:text-[0.96rem] sm:leading-7`}
                >
                  {highlight.description}
                </p>
              </article>
            </li>
          );
        })}
      </ul>
    </ProjectSection>
  );
}

export function ProjectResults({
  project,
  sectionNumber,
}: {
  project: Project;
  sectionNumber?: number;
}) {
  if (!project.outcome || !sectionNumber) {
    return null;
  }

  const presentation = project.outcomePresentation;
  const outcomeTitle =
    presentation?.title ?? "Project Outcome";
  const outcomeSummary =
    presentation?.summary ?? project.outcome;
  const outcomeHighlights =
    presentation?.highlights ?? [];

  return (
    <ProjectSection
      title="Results & Outcomes"
      className="border-t border-white/[0.07]"
      compactTop
      compactBottom
    >
      <article className="relative overflow-hidden rounded-2xl border border-[#FF7628]/35 bg-[radial-gradient(circle_at_8%_12%,rgba(255,118,40,0.14),transparent_30%),linear-gradient(135deg,rgba(255,118,40,0.075),rgba(19,26,34,0.98)_38%,rgba(12,17,22,0.99))] p-6 shadow-[0_28px_78px_rgba(0,0,0,0.3),0_0_34px_rgba(255,118,40,0.05),inset_0_1px_rgba(255,255,255,0.04)] sm:p-8 lg:p-10">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#FF9A62] via-[#FF7628] to-[#C94E0B] shadow-[0_0_18px_rgba(255,118,40,0.3)]"
        />

        <div className="flex items-start gap-4 sm:gap-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[#FF7628]/35 bg-[linear-gradient(145deg,rgba(255,118,40,0.16),rgba(255,118,40,0.04))] shadow-[0_10px_28px_rgba(255,118,40,0.1),inset_0_1px_rgba(255,255,255,0.07)] sm:size-12">
            <CheckCircle2
              aria-hidden="true"
              className="size-5 text-[#FF7628] sm:size-6"
            />
          </span>
          <div className="min-w-0">
            <h3 className="normal-case text-2xl font-black leading-tight tracking-[-0.035em] text-white sm:text-3xl">
              {outcomeTitle}
            </h3>
            <p className="mt-3 text-base font-medium leading-7 text-[#D4D8DD] sm:text-lg sm:leading-8">
              {outcomeSummary}
            </p>
          </div>
        </div>

        {outcomeHighlights.length > 0 && (
          <ul className="mt-7 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2 sm:gap-6 lg:mt-8 lg:pt-7">
            {outcomeHighlights.map((highlight) => (
              <li key={highlight.title}>
                <h4 className="normal-case text-sm font-black tracking-[-0.01em] text-white sm:text-base">
                  {highlight.title}
                </h4>
                <p className="mt-1.5 text-sm font-medium leading-6 text-[#AEB6BF] sm:text-[0.95rem] sm:leading-7">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        )}
      </article>
    </ProjectSection>
  );
}

export function ProjectEvidence({
  project,
  onOpenGallery,
  sectionNumber,
}: {
  project: Project;
  onOpenGallery: (
    title: string,
    items: string[],
  ) => void;
  sectionNumber?: number;
}) {
  const hasEvidence = Boolean(
    project.evidence?.length,
  );
  const hasLinks = Boolean(
    project.liveUrl || project.sourceUrl,
  );
  const primaryGallery =
    project.evidencePresentation &&
    project.gallery?.length
      ? {
          ...project.evidencePresentation,
          count: project.gallery.length,
        }
      : null;
  const supplementalEvidence =
    project.evidence?.filter(
      (evidence) =>
        !primaryGallery || !evidence.gallery?.length,
    ) ?? [];
  const confidentialityNote =
    project.evidencePresentation
      ?.confidentialityNote ?? project.proofNote;

  if (
    (!hasEvidence &&
      !hasLinks &&
      !confidentialityNote &&
      !primaryGallery) ||
    !sectionNumber
  ) {
    return null;
  }

  return (
    <ProjectSection
      title="Project Evidence"
      className="border-t border-white/[0.07]"
      compactTop
      compactBottom
    >
      {(primaryGallery ||
        supplementalEvidence.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {primaryGallery && (
            <a
              href="#project-gallery"
              aria-label={`${primaryGallery.galleryTitle}, ${primaryGallery.count} visuals`}
              className="group grid gap-5 rounded-xl border border-[#303A44] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#FF7628]/60 hover:shadow-[0_24px_58px_rgba(0,0,0,0.32),0_0_28px_rgba(255,118,40,0.055),inset_0_1px_rgba(255,255,255,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] motion-reduce:transition-none sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6 md:col-span-2 xl:col-span-3"
            >
              <span className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 sm:gap-x-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[#FF7628]/35 bg-[linear-gradient(145deg,rgba(255,118,40,0.15),rgba(255,118,40,0.04))] shadow-[0_9px_26px_rgba(255,118,40,0.09),inset_0_1px_rgba(255,255,255,0.065)]">
                  <Images
                    aria-hidden="true"
                    className="size-5 text-[#FF7628]"
                  />
                </span>
                <span className="text-lg font-black tracking-[-0.025em] text-white sm:text-xl">
                  {primaryGallery.galleryTitle}
                </span>

                <span className="col-start-2 block max-w-3xl text-sm font-medium leading-6 text-[#AEB6BF] sm:text-[0.95rem] sm:leading-7">
                  {primaryGallery.galleryDescription}
                </span>
              </span>

              <span className="flex items-center justify-between gap-5 sm:justify-end">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#FF7628]">
                  {primaryGallery.count}{" "}
                  {primaryGallery.count === 1
                    ? "visual"
                    : "visuals"}
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#FF7628] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </a>
          )}

          {supplementalEvidence.map((evidence) => (
            <div key={evidence.label}>
              {evidence.gallery?.length ? (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenGallery(
                        evidence.label,
                        evidence.gallery ?? [],
                      )
                    }
                    className="group flex min-h-44 w-full flex-col items-start justify-between rounded-xl border border-[#303A44] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 text-left shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#FF7628]/60 hover:shadow-[0_24px_58px_rgba(0,0,0,0.32),0_0_28px_rgba(255,118,40,0.055),inset_0_1px_rgba(255,255,255,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] motion-reduce:transition-none sm:p-6"
                  >
                    <span className="flex w-full items-start justify-between gap-5">
                      <Images
                        aria-hidden="true"
                        className="size-6 text-[#FF7628]"
                      />
                      <ArrowRight
                        aria-hidden="true"
                        className="size-5 text-[#FF7628] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      />
                    </span>
                    <span className="mt-8">
                      <span className="block text-base font-black text-white">
                        {evidence.label}
                      </span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7F8994]">
                        {evidence.gallery.length} visuals
                      </span>
                    </span>
                  </button>
                ) : evidence.url ? (
                  <a
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-44 flex-col items-start justify-between rounded-xl border border-[#303A44] bg-[linear-gradient(145deg,#131A22_0%,#0E141A_72%)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.24),inset_0_1px_rgba(255,255,255,0.03)] transition-[border-color,transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#FF7628]/60 hover:shadow-[0_24px_58px_rgba(0,0,0,0.32),0_0_28px_rgba(255,118,40,0.055),inset_0_1px_rgba(255,255,255,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] motion-reduce:transition-none sm:p-6"
                  >
                    <ExternalLink
                      aria-hidden="true"
                      className="size-6 text-[#FF7628]"
                    />
                    <span className="mt-8 text-base font-black text-white">
                      {evidence.label}
                    </span>
                  </a>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {hasLinks && (
        <div className="mt-5 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-md bg-[#FF7628] px-5 py-3 text-sm font-black text-[#080B0E] transition-colors hover:bg-[#FF8B4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Live Preview
              <ExternalLink
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}

          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-md border border-white/15 px-5 py-3 text-sm font-black text-white transition-colors hover:border-[#FF7628] hover:text-[#FF7628] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628]"
            >
              Source Code
              <Code2
                aria-hidden="true"
                className="size-4"
              />
            </a>
          )}
        </div>
      )}

      {confidentialityNote && (
        <aside
          aria-label="Publication and confidentiality note"
          className="mt-5 flex items-start gap-3 border-t border-white/[0.08] pt-5 sm:gap-4"
        >
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-[#FF7628]"
          />
          <p className="text-sm font-medium leading-6 text-[#9FA8B2] sm:text-[0.95rem] sm:leading-7">
            {confidentialityNote}
          </p>
        </aside>
      )}
    </ProjectSection>
  );
}

