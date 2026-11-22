import {
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
} from "vitest";

import {
  ProjectArchitecture,
  ProjectDetailHeader,
} from "@/components/project/project-detail-sections";
import { projects } from "@/data/projects";
import {
  getArchitectureGroups,
  getProjectNavigation,
} from "@/lib/project-detail";

describe("ProjectArchitecture", () => {
  it("renders every documented ZenaTrace architecture group without the section label", () => {
    const project = projects.find(
      (item) => item.id === "zenatrace",
    );
    const groups = getArchitectureGroups(
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
    );

    expect(groups).toHaveLength(3);

    render(
      <ProjectArchitecture
        groups={groups}
        notes={project?.architectureNotes}
        sectionNumber={7}
      />,
    );

    const section = screen
      .getByRole("heading", {
        name: "System Architecture",
      })
      .closest("section");

    expect(section).not.toBeNull();
    expect(
      within(section!).queryByText("07 / SYSTEM"),
    ).not.toBeInTheDocument();
    expect(
      within(
        within(section!).getByRole("list", {
          name: "Documented project technology layers",
        }),
      ).getAllByRole("listitem"),
    ).toHaveLength(
      groups.length +
        groups.reduce(
          (total, group) =>
            total + group.technologies.length,
          0,
        ),
    );

    for (const group of groups) {
      expect(
        within(section!).getByRole("heading", {
          name: group.title,
        }),
      ).toBeInTheDocument();

      for (const technology of group.technologies) {
        expect(
          within(section!).getByText(technology),
        ).toBeInTheDocument();
      }
    }

    expect(
      within(section!).getByLabelText(
        "Flutter Mobile R&D — In Development",
      ),
    ).toHaveTextContent(
      "not presented as a completed production mobile application",
    );
    expect(
      groups.find(
        (group) => group.title === "Interface Layer",
      )?.technologies,
    ).toEqual(["Angular", "TypeScript"]);
    expect(
      groups.map((group) => group.description),
    ).toEqual([
      "Web interface for operational workflows.",
      "ASP.NET Core REST APIs supporting business logic, application workflows, authentication, tenant-aware authorization, and permission-controlled access.",
      "SQL Server persistence and documented supporting services for search, caching, reliable messaging, and file operations.",
    ]);
    expect(
      groups.find(
        (group) =>
          group.title === "Application & API Layer",
      )?.technologies,
    ).toEqual([
      ".NET 10",
      "ASP.NET Core",
      "C#",
      "REST APIs",
    ]);
    expect(
      groups.find(
        (group) => group.title === "Data & Services",
      )?.technologies,
    ).toEqual([
      "SQL Server",
      "Entity Framework Core",
      "SQL Server Full-Text Search",
      "Redis",
      "SQL Server Outbox",
      "Amazon S3",
    ]);
    expect(
      within(section!).queryByRole("heading", {
        name: "Security & Access",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByRole("heading", {
        name: "Supporting Tooling",
      }),
    ).not.toBeInTheDocument();
    expect(
      within(section!).getByText(
        "Flutter",
      ),
    ).toBeInTheDocument();
    expect(
      within(section!).getByText(
        "Dart",
      ),
    ).toBeInTheDocument();
  });
});

describe("ProjectDetailHeader", () => {
  it("shows the current project with portfolio and next-project destinations", () => {
    const currentProject = projects[0];
    const navigation = getProjectNavigation(
      projects,
      currentProject.id,
    );

    render(
      <ProjectDetailHeader
        project={currentProject}
        nextProject={navigation.nextProject}
      />,
    );

    const nextProjectLink = screen.getByRole("link", {
        name: `Next project: ${navigation.nextProject?.detailTitle ?? navigation.nextProject?.title}`,
      });

    expect(nextProjectLink).toHaveAttribute(
      "href",
      `/project/${navigation.nextProject?.id}`,
    );
    expect(nextProjectLink).toHaveTextContent(
      "Next Project",
    );
    expect(nextProjectLink).not.toHaveTextContent(
      navigation.nextProject?.detailTitle ??
        navigation.nextProject?.title ??
        "",
    );
    expect(
      screen.getByRole("link", {
        name: "All Projects",
      }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByText(
        currentProject.detailTitle ?? currentProject.title,
      ),
    ).toHaveAttribute("aria-current", "page");
  });

  it("omits the next-project control at the end of the project order", () => {
    const currentProject = projects.at(-1)!;

    render(
      <ProjectDetailHeader project={currentProject} />,
    );

    expect(
      screen.queryByRole("link", {
        name: /Next project:/i,
      }),
    ).not.toBeInTheDocument();
  });
});
