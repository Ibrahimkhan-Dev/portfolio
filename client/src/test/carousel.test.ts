import {
  getCarouselPositions,
  getClosestCarouselPosition,
} from "@/lib/carousel";

describe("carousel pagination", () => {
  it("creates one position per valid one-card advance", () => {
    expect(
      getCarouselPositions(1980, 980, 300, 20),
    ).toEqual([0, 320, 640, 960, 1000]);
  });

  it("returns a single position when all cards fit", () => {
    expect(
      getCarouselPositions(900, 900, 280, 20),
    ).toEqual([0]);
  });

  it("selects the nearest position while scrolling", () => {
    const positions = [0, 320, 640, 960];

    expect(
      getClosestCarouselPosition(510, positions),
    ).toBe(2);
    expect(
      getClosestCarouselPosition(90, positions),
    ).toBe(0);
  });
});
