import type { Project } from "@/data/projects";

export type ArchitectureGroup = {
  title: string;
  description: string;
  technologies: string[];
};

export type ArchitectureGroupOptions = {
  descriptions?: Record<string, string>;
  excludedTechnologies?: string[];
};

export type ProjectDetailSectionNumbers = {
  overview: number;
  challenges?: number;
  contributions?: number;
  highlights?: number;
  results?: number;
  evidence?: number;
  architecture?: number;
};

const architectureRules: Array<{
  title: string;
  description: string;
  matches: RegExp;
}> = [
  {
    title: "Interface Layer",
    description:
      "Documented client and user-interface technologies.",
    matches:
      /angular|typescript|javascript|flutter|dart|html|css|mobile/i,
  },
  {
    title: "Application & API Layer",
    description:
      "Documented application, API, and automation technologies.",
    matches:
      /\.net|asp\.net|c#|python|django|flask|rest api|selenium|workflow automation|web scraping/i,
  },
  {
    title: "Data & Services",
    description:
      "Documented persistence, caching, search, and supporting services.",
    matches:
      /sql|entity framework|redis|amazon s3|postgres|stored procedure|data extraction|outbox/i,
  },
  {
    title: "Security & Access",
    description:
      "Documented authentication and access-control technologies.",
    matches:
      /jwt|authentication|authorization|permission|refresh token|rbac|tenant/i,
  },
  {
    title: "Platform & Hardware",
    description:
      "Documented cloud, infrastructure, networking, and device technologies.",
    matches:
      /azure|aws|openstack|ubuntu|linux|nova|neutron|glance|keystone|network|virtualization|private cloud|arduino|esp8266|iot|sensor|c\/c\+\+/i,
  },
];

export function getArchitectureGroups(
  technologies: string[],
  options: ArchitectureGroupOptions = {},
): ArchitectureGroup[] {
  const assigned = new Set<string>();
  const excluded = new Set(
    options.excludedTechnologies ?? [],
  );

  const groups = architectureRules.flatMap(
    (rule) => {
      const matching = technologies.filter(
        (technology) =>
          !assigned.has(technology) &&
          !excluded.has(technology) &&
          rule.matches.test(technology),
      );

      matching.forEach((technology) =>
        assigned.add(technology),
      );

      return matching.length > 0
        ? [
            {
              title: rule.title,
              description:
                options.descriptions?.[rule.title] ??
                rule.description,
              technologies: matching,
            },
          ]
        : [];
    },
  );

  const remaining = technologies.filter(
    (technology) =>
      !assigned.has(technology) &&
      !excluded.has(technology),
  );

  if (remaining.length > 0) {
    groups.push({
      title: "Supporting Tooling",
      description:
        options.descriptions?.[
          "Supporting Tooling"
        ] ??
        "Additional documented tools and technologies used by the project.",
      technologies: remaining,
    });
  }

  return groups;
}

export function getProjectNavigation(
  allProjects: Project[],
  projectId: string,
) {
  const currentIndex = allProjects.findIndex(
    (project) => project.id === projectId,
  );

  if (currentIndex < 0) {
    return {
      previousProject: undefined,
      nextProject: undefined,
    };
  }

  return {
    previousProject:
      currentIndex > 0
        ? allProjects[currentIndex - 1]
        : undefined,
    nextProject:
      currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : undefined,
  };
}

export function getProjectDetailSectionNumbers(
  project: Project,
  hasArchitecture: boolean,
): ProjectDetailSectionNumbers {
  let nextSectionNumber = 1;
  const takeNumber = (shouldRender: boolean) =>
    shouldRender ? nextSectionNumber++ : undefined;

  const hasChallenges = Boolean(
    project.beforeState ||
      project.context ||
      project.constraints ||
      project.purpose,
  );
  const hasContributions = Boolean(
    project.whatChanged ||
      project.developmentApproach,
  );
  const hasEvidence = Boolean(
    project.evidence?.length ||
      project.liveUrl ||
      project.sourceUrl ||
      project.proofNote,
  );

  return {
    overview: nextSectionNumber++,
    challenges: takeNumber(hasChallenges),
    contributions: takeNumber(hasContributions),
    highlights: takeNumber(
      Boolean(project.highlights?.length),
    ),
    results: takeNumber(Boolean(project.outcome)),
    evidence: takeNumber(hasEvidence),
    architecture: takeNumber(hasArchitecture),
  };
}
