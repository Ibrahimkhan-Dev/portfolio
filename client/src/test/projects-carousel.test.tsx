import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import Projects from "@/components/sections/projects";

describe("Other Projects carousel controls", () => {
  beforeAll(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}

        unobserve() {}

        disconnect() {}
      },
    );
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it("places the desktop arrows in dedicated gutters around the track", () => {
    render(<Projects />);

    const previousButton =
      screen.getAllByRole("button", {
        name: "Show previous projects",
      })[0];
    const nextButton =
      screen.getAllByRole("button", {
        name: "Show next projects",
      })[0];
    const track = screen.getByLabelText(
      "Other portfolio projects",
    );

    expect(
      previousButton.nextElementSibling,
    ).toBe(track);
    expect(track.nextElementSibling).toBe(
      nextButton,
    );
  });

  it("makes the full View All Projects control toggle the project grid", () => {
    render(<Projects />);

    const viewAllButton = screen.getByRole(
      "button",
      { name: "View All Projects" },
    );

    expect(viewAllButton).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    fireEvent.click(viewAllButton);

    expect(
      screen.getByRole("button", {
        name: "Return to Carousel",
      }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
