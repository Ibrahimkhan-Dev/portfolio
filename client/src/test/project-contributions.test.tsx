import {
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
} from "vitest";

import { ProjectContributions } from "@/components/project/project-detail-sections";
import { projects } from "@/data/projects";

describe("ProjectContributions", () => {
  it("renders four ZenaTrace contribution cards and one supporting approach panel without redundant role cards", () => {
    const project = projects.find(
      (item) => item.id === "zenatrace",
    );

    expect(project).toBeDefined();

    render(
      <ProjectContributions
        project={project!}
        sectionNumber={3}
      />,
    );

    expect(
      screen.queryByText("03 / CONTRIBUTION"),
    ).not.toBeInTheDocument();
    expect(project?.officialRole).toBe(
      "DotNet Developer",
    );
    expect(project?.functionalFocus).toBe(
      "Full-Stack Development",
    );
    expect(
      screen.queryByText("DotNet Developer"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Full-Stack Development"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Planning & Technical Direction",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Application & Database Logic",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Code Review & Debugging",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Testing & Verification",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/ChatGPT and Claude/),
    ).toHaveLength(1);
  });

  it("preserves the original contribution narrative as a fallback for other projects", () => {
    const project = projects.find(
      (item) => item.id === "ehr-system",
    );

    expect(project).toBeDefined();

    render(
      <ProjectContributions
        project={project!}
        sectionNumber={3}
      />,
    );

    const contributionText = screen.getByText(
      project?.whatChanged ?? "",
    );

    expect(contributionText).toBeInTheDocument();
    expect(
      contributionText.closest("article"),
    ).toHaveAttribute(
      "data-content-width",
      "balanced-wide",
    );
    expect(contributionText.parentElement).toHaveClass(
      "max-w-[96ch]",
    );
    expect(project?.role).toBe(
      "Full-Stack Developer",
    );
    expect(
      screen.queryByText("Full-Stack Developer"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "Planning & Technical Direction",
      }),
    ).not.toBeInTheDocument();
  });
});
