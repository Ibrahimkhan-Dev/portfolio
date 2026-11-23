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

import { ProjectHighlights } from "@/components/project/project-detail-sections";
import { projects } from "@/data/projects";

const featureTitles = [
  "Master Data & Tenant Workflows",
  "Serialization Lifecycle",
  "Packaging & Aggregation",
  "Shipment & Traceability",
  "Security & Authorization",
  "Audit, Search & Data Services",
];

describe("ProjectHighlights", () => {
  it("renders the six structured ZenaTrace features while preserving QA evidence in source data", () => {
    const project = projects.find(
      (item) => item.id === "zenatrace",
    );

    expect(project).toBeDefined();
    expect(project?.highlights).toHaveLength(9);
    expect(project?.highlights?.[7]).toContain(
      "259 screenshots",
    );
    expect(project?.highlights?.[8]).toContain(
      "613 passing backend tests",
    );

    render(
      <ProjectHighlights
        project={project!}
        sectionNumber={4}
      />,
    );

    const section = screen
      .getByRole("heading", {
        name: "Key Features & Engineering Highlights",
      })
      .closest("section");

    expect(section).not.toBeNull();
    expect(
      within(section!).getAllByRole("listitem"),
    ).toHaveLength(6);
    expect(
      within(section!).queryByText(
        "04 / ENGINEERING",
      ),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByText(
        "Engineering highlight",
      ),
    ).not.toBeInTheDocument();

    for (const title of featureTitles) {
      expect(
        within(section!).getByRole("heading", {
          name: title,
        }),
      ).toBeInTheDocument();
    }

    expect(
      within(section!).queryByText(/259 screenshots/i),
    ).not.toBeInTheDocument();
    expect(
      within(section!).queryByText(
        /613 passing backend tests/i,
      ),
    ).not.toBeInTheDocument();
  });

  it.each(projects.filter(({ id }) => id !== "zenatrace"))(
    "renders a titled, illustrated card for each original $id highlight in order",
    (project) => {
      render(<ProjectHighlights project={project} sectionNumber={4} />);

      const section = screen.getByRole("region", {
        name: "Key Features & Engineering Highlights",
      });
      const cards = within(section).getAllByRole("listitem");
      expect(cards).toHaveLength(project.highlights!.length);
      const titles = cards.map((card, index) => {
        const heading = within(card).getByRole("heading", { level: 3 });
        expect(heading).toHaveAccessibleName(/\S/);
        expect(heading.parentElement?.querySelector("svg")).toBeInTheDocument();
        expect(within(card).getByText(project.highlights![index])).toBeVisible();
        return heading.textContent;
      });
      expect(new Set(titles).size).toBe(cards.length);
    },
  );
});
