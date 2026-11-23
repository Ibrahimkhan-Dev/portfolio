import {
  describe,
  expect,
  it,
} from "vitest";

import { projects } from "@/data/projects";
import {
  getArchitectureGroups,
  getProjectDetailSectionNumbers,
  getProjectNavigation,
  hasAccessibleProjectEvidence,
  isAccessibleEvidenceSource,
} from "@/lib/project-detail";

describe("shared project-detail utilities", () => {
  it("groups only documented technologies without duplication", () => {
    const technologies = [
      "Angular",
      "ASP.NET Core",
      "SQL Server",
      "JWT Authentication",
      "Git",
    ];

    const groups =
      getArchitectureGroups(technologies);
    const groupedTechnologies = groups.flatMap(
      (group) => group.technologies,
    );

    expect(groupedTechnologies).toHaveLength(
      technologies.length,
    );
    expect(
      new Set(groupedTechnologies),
    ).toEqual(new Set(technologies));
  });

  it("uses the real project order for boundary-aware navigation", () => {
    const first = getProjectNavigation(
      projects,
      projects[0].id,
    );
    const middle = getProjectNavigation(
      projects,
      projects[3].id,
    );
    const last = getProjectNavigation(
      projects,
      projects.at(-1)?.id ?? "",
    );

    expect(first.previousProject).toBeUndefined();
    expect(first.nextProject?.id).toBe(
      projects[1].id,
    );
    expect(middle.previousProject?.id).toBe(
      projects[2].id,
    );
    expect(middle.nextProject?.id).toBe(
      projects[4].id,
    );
    expect(last.previousProject?.id).toBe(
      projects.at(-2)?.id,
    );
    expect(last.nextProject).toBeUndefined();
  });

  it("numbers only rendered sections and keeps architecture last", () => {
    const project = projects[0];
    const fullNumbers =
      getProjectDetailSectionNumbers(
        project,
        true,
      );
    const renderedNumbers = Object.values(
      fullNumbers,
    ).filter(
      (value): value is number =>
        typeof value === "number",
    );

    expect(renderedNumbers).toEqual(
      renderedNumbers.map((_, index) => index + 1),
    );
    expect(fullNumbers.architecture).toBe(
      Math.max(...renderedNumbers),
    );

    const minimalNumbers =
      getProjectDetailSectionNumbers(
        {
          ...project,
          beforeState: undefined,
          context: undefined,
          constraints: undefined,
          purpose: undefined,
          whatChanged: undefined,
          developmentApproach: undefined,
          contributions: undefined,
          highlights: undefined,
          outcome: undefined,
          evidence: undefined,
          evidencePresentation: undefined,
          gallery: undefined,
          liveUrl: undefined,
          sourceUrl: undefined,
          proofNote: undefined,
        },
        true,
      );

    expect(minimalNumbers).toEqual({
      overview: 1,
      challenges: undefined,
      contributions: undefined,
      highlights: undefined,
      results: undefined,
      evidence: undefined,
      architecture: 2,
    });
  });

  it("distinguishes accessible evidence from notes and placeholders", () => {
    const ehrProject = projects.find(
      (project) => project.id === "ehr-system",
    );
    const seleniumProject = projects.find(
      (project) => project.id === "selenium-bot",
    );
    const openStackProject = projects.find(
      (project) => project.id === "private-cloud",
    );

    expect(
      hasAccessibleProjectEvidence(ehrProject!),
    ).toBe(true);
    expect(
      hasAccessibleProjectEvidence(seleniumProject!),
    ).toBe(false);
    expect(
      hasAccessibleProjectEvidence(openStackProject!),
    ).toBe(false);
    expect(
      isAccessibleEvidenceSource(
        "https://example.cloudflare.com/delayed-image.png",
      ),
    ).toBe(true);
    expect(
      isAccessibleEvidenceSource(
        "PASTE_APPROVED_SCREENSHOT_URL_HERE",
      ),
    ).toBe(false);
  });
});
