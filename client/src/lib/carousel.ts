export function getCarouselPositions(
  scrollWidth: number,
  clientWidth: number,
  itemWidth: number,
  gap: number,
) {
  const maxScrollLeft = Math.max(
    0,
    scrollWidth - clientWidth,
  );
  const step = itemWidth + gap;

  if (maxScrollLeft <= 1 || step <= 0) {
    return [0];
  }

  const positionCount =
    Math.ceil(maxScrollLeft / step) + 1;

  return Array.from(
    { length: positionCount },
    (_, index) =>
      Math.min(index * step, maxScrollLeft),
  );
}

export function getClosestCarouselPosition(
  scrollLeft: number,
  positions: number[],
) {
  return positions.reduce(
    (closestIndex, position, index) =>
      Math.abs(position - scrollLeft) <
      Math.abs(
        positions[closestIndex] - scrollLeft,
      )
        ? index
        : closestIndex,
    0,
  );
}
