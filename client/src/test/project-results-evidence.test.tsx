import {
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import {
  ProjectEvidence,
  ProjectResults,
} from "@/components/project/project-detail-sections";
import { projects } from "@/data/projects";

describe("ProjectResults", () => {
  it("renders the structured ZenaTrace outcome without redundant labels or methodology", () => {
    const project = projects.find(
      (item) => item.id === "zenatrace",
    );

    expect(project).toBeDefined();

    render(
      <ProjectResults
        project={project!}
        sectionNumber={5}
      />,
    );

    const section = screen
      .getByRole("heading", {
        name: "Results & Outcomes",
      })
      .closest("section");

    expect(section).not.toBeNull();
    expect(
      within(section!).getByRole("heading", {
        name: "Working Web MVP",
      }),
    ).toBeInTheDocument();
    expect(
      within(section!).getByRole("heading", {
        name: "Integrated Workflows",
      }),
    ).toBeInTheDocument();
    expect(
      within(section!).getByRole("heading", {
        name: "Tenant-Aware Application",
      }),
    ).toBeInTheDocument();
    expect(
      within(section!).queryByText("05 / OUTCOME"),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByText("Verified outcome"),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByText(/ChatGPT|Claude/i),
    ).not.toBeInTheDocument();
  });

  it("falls back to an existing project outcome without inventing highlights", () => {
    const project = projects.find(
      (item) => item.id === "ehr-system",
    );

    render(
      <ProjectResults
        project={project!}
        sectionNumber={5}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Project Outcome",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(project?.outcome ?? ""),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        name: "Integrated Workflows",
      }),
    ).not.toBeInTheDocument();
  });

  it("keeps a no-evidence disclosure inside the existing results section", () => {
    const project = projects.find(
      (item) => item.id === "private-cloud",
    );

    render(
      <ProjectResults
        project={project!}
        sectionNumber={5}
      />,
    );

    expect(
      screen.getByLabelText(
        "Project evidence disclosure",
      ),
    ).toHaveTextContent("reconstructed visuals");
  });
});

describe("ProjectEvidence", () => {
  it("links ZenaTrace evidence to its three-item primary gallery and keeps QA metrics private", () => {
    const project = projects.find(
      (item) => item.id === "zenatrace",
    );

    render(
      <ProjectEvidence
        project={project!}
        onOpenGallery={vi.fn()}
        sectionNumber={6}
      />,
    );

    const section = screen
      .getByRole("heading", {
        name: "Project Evidence",
      })
      .closest("section");
    const galleryLink = within(section!).getByRole(
      "link",
      {
        name: "Application Gallery, 3 visuals",
      },
    );

    expect(galleryLink).toHaveAttribute(
      "href",
      "#project-gallery",
    );
    expect(
      within(section!).queryByText("06 / EVIDENCE"),
    ).not.toBeInTheDocument();
    expect(
      within(section!).getByLabelText(
        "Publication and confidentiality note",
      ),
    ).toHaveTextContent(
      "should be displayed only where public use has been approved",
    );
    expect(
      within(section!).queryByText(/224 passing/i),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByText(/259 screenshots/i),
    ).not.toBeInTheDocument();
  });

  it("preserves existing evidence gallery actions for other projects", () => {
    const project = projects.find(
      (item) => item.id === "ehr-system",
    );
    const onOpenGallery = vi.fn();

    render(
      <ProjectEvidence
        project={project!}
        onOpenGallery={onOpenGallery}
        sectionNumber={6}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Legacy EHR/i,
      }),
    );

    expect(onOpenGallery).toHaveBeenCalledWith(
      "Legacy EHR",
      project?.evidence?.[0].gallery,
    );
    expect(
      screen.getByRole("button", {
        name: /Legacy EHR/i,
      }),
    ).not.toHaveClass("min-h-44");
    expect(
      screen.getAllByText("4 visuals"),
    ).toHaveLength(2);
  });

  it("hides the evidence section when only a disclosure remains", () => {
    const project = projects.find(
      (item) => item.id === "private-cloud",
    );

    const { container } = render(
      <ProjectEvidence
        project={project!}
        onOpenGallery={vi.fn()}
        sectionNumber={6}
      />,
    );

    expect(container).toBeEmptyDOMElement();
    expect(
      screen.queryByRole("heading", {
        name: "Project Evidence",
      }),
    ).not.toBeInTheDocument();
  });
});
