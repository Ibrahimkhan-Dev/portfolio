import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ProjectGallery } from "@/components/project/project-gallery";

const galleryItems = [
  "https://res.cloudinary.com/demo/image/upload/first.png",
  "https://res.cloudinary.com/demo/image/upload/second.png",
];

describe("ProjectGallery", () => {
  it("synchronizes next navigation with the active indicator", () => {
    render(
      <ProjectGallery
        projectTitle="Test Project"
        items={galleryItems}
        onExpand={vi.fn()}
        prefersReducedMotion={false}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show next project visual",
      }),
    );

    expect(
      screen.getByRole("img", {
        name: "Test Project — Visual 2 of 2",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Show project visual 2 of 2",
      }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("supports keyboard navigation and omits unnecessary controls for one image", () => {
    const { rerender } = render(
      <ProjectGallery
        projectTitle="Test Project"
        items={galleryItems}
        onExpand={vi.fn()}
        prefersReducedMotion={true}
      />,
    );

    fireEvent.keyDown(
      screen.getByLabelText(
        "Test Project project gallery",
      ).firstElementChild as HTMLElement,
      { key: "ArrowRight" },
    );

    expect(
      screen.getByRole("img", {
        name: "Test Project — Visual 2 of 2",
      }),
    ).toBeInTheDocument();

    rerender(
      <ProjectGallery
        projectTitle="Test Project"
        items={[galleryItems[0]]}
        onExpand={vi.fn()}
        prefersReducedMotion={true}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Show next project visual",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("group", {
        name: "Choose project visual",
      }),
    ).not.toBeInTheDocument();
  });
});
