import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { ProjectGallery } from "@/components/project/project-gallery";
import { GalleryModal } from "@/components/project/gallery-modal";
import { useGalleryMediaState } from "@/components/project/gallery-media-state";

const galleryItems = [
  "https://res.cloudinary.com/demo/image/upload/first.png",
  "https://res.cloudinary.com/demo/image/upload/second.png",
];

describe("ProjectGallery", () => {
  it("does not let a late load event replace the active item state", () => {
    const { result, rerender } = renderHook(
      ({ source }: { source: string }) =>
        useGalleryMediaState(source),
      {
        initialProps: { source: galleryItems[0] },
      },
    );
    const markFirstLoaded = result.current.markLoaded;

    rerender({ source: galleryItems[1] });
    act(() => markFirstLoaded(galleryItems[0]));

    expect(result.current.status).toBe("loading");
  });

  it("shows visible loading feedback and fades the image in after loading", () => {
    render(
      <ProjectGallery
        projectTitle="Test Project"
        items={galleryItems}
        onExpand={vi.fn()}
        prefersReducedMotion={false}
      />,
    );

    const image = screen.getByRole("img", {
      name: "Test Project — Visual 1 of 2",
    });

    expect(
      screen.getByRole("status", {
        name: "Loading Test Project — Visual 1 of 2",
      }),
    ).toBeInTheDocument();
    expect(image).toHaveClass("opacity-0");
    expect(screen.getByText("Loading visual…")).toBeVisible();

    fireEvent.load(image);

    expect(
      screen.queryByRole("status", {
        name: "Loading Test Project — Visual 1 of 2",
      }),
    ).not.toBeInTheDocument();
    expect(image).toHaveClass("opacity-100");
    expect(screen.queryByText("Loading visual…")).not.toBeInTheDocument();
  });

  it("shows loading per item and remembers loaded visuals when revisited", () => {
    render(
      <ProjectGallery
        projectTitle="Test Project"
        items={galleryItems}
        onExpand={vi.fn()}
        prefersReducedMotion={false}
      />,
    );

    const firstImage = screen.getByRole("img", {
      name: "Test Project — Visual 1 of 2",
    });
    fireEvent.load(firstImage);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show next project visual",
      }),
    );
    expect(
      screen.getByRole("status", {
        name: "Loading Test Project — Visual 2 of 2",
      }),
    ).toBeInTheDocument();

    const secondImage = screen.getByRole("img", {
      name: "Test Project — Visual 2 of 2",
    });
    fireEvent.load(secondImage);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show previous project visual",
      }),
    );

    expect(
      screen.queryByRole("status", {
        name: "Loading Test Project — Visual 1 of 2",
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Test Project — Visual 1 of 2",
      }),
    ).toHaveClass("opacity-100");
  });

  it("shows a retry action after an actual image error", () => {
    render(
      <ProjectGallery
        projectTitle="Test Project"
        items={galleryItems}
        onExpand={vi.fn()}
        prefersReducedMotion={false}
      />,
    );

    fireEvent.error(
      screen.getByRole("img", {
        name: "Test Project — Visual 1 of 2",
      }),
    );

    expect(
      screen.getByText(
        "This project visual could not be loaded.",
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "Retry" }),
    );

    expect(
      screen.getByRole("status", {
        name: "Loading Test Project — Visual 1 of 2",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Test Project — Visual 1 of 2",
      }),
    ).toHaveAttribute(
      "src",
      expect.stringContaining("galleryRetry=1"),
    );
  });

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

describe("GalleryModal loading", () => {
  it("keeps feedback visible until each fullscreen image loads, including retries", () => {
    render(
      <GalleryModal
        modal={{ title: "Test gallery", items: galleryItems }}
        onClose={vi.fn()}
        pageContentRef={{ current: null }}
        prefersReducedMotion={true}
      />,
    );

    expect(screen.getByText("Loading visual…")).toBeVisible();
    fireEvent.load(screen.getByRole("img"));
    expect(screen.queryByText("Loading visual…")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Show next gallery item" }));
    expect(screen.getByText("Loading visual…")).toBeVisible();
    fireEvent.error(screen.getByRole("img"));
    expect(screen.queryByText("Loading visual…")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(screen.getByText("Loading visual…")).toBeVisible();
    fireEvent.load(screen.getByRole("img"));
    expect(screen.queryByText("Loading visual…")).not.toBeInTheDocument();
  });
});
