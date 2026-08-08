import { describe, expect, it } from "vitest";
import {
  getCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
  isCloudinaryImage,
  isVideoSource,
} from "@/lib/cloudinary";

const CLOUDINARY_URL =
  "https://res.cloudinary.com/dxeoxpsm5/image/upload/v123/sample.png";
const NON_CLOUDINARY_URL = "https://example.com/image.png";

describe("isCloudinaryImage", () => {
  it("returns true for a Cloudinary upload URL", () => {
    expect(isCloudinaryImage(CLOUDINARY_URL)).toBe(true);
  });

  it("returns false for a non-Cloudinary URL", () => {
    expect(isCloudinaryImage(NON_CLOUDINARY_URL)).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isCloudinaryImage("")).toBe(false);
  });
});

describe("isVideoSource", () => {
  it.each(["video.mp4", "video.webm", "video.mov", "video.ogg"])(
    "returns true for %s",
    (filename) => {
      expect(isVideoSource(filename)).toBe(true);
    },
  );

  it("returns true for a URL with query string after extension", () => {
    expect(isVideoSource("clip.mp4?v=1")).toBe(true);
  });

  it("returns false for an image URL", () => {
    expect(isVideoSource(CLOUDINARY_URL)).toBe(false);
  });
});

describe("getOptimizedCloudinaryUrl", () => {
  it("inserts Cloudinary transformation for eco quality by default", () => {
    const result = getOptimizedCloudinaryUrl(CLOUDINARY_URL, 800);
    expect(result).toContain("f_auto,q_auto:eco,c_limit,w_800");
  });

  it("inserts good quality when specified", () => {
    const result = getOptimizedCloudinaryUrl(CLOUDINARY_URL, 1200, "good");
    expect(result).toContain("f_auto,q_auto:good,c_limit,w_1200");
  });

  it("returns the original URL unchanged for non-Cloudinary sources", () => {
    expect(getOptimizedCloudinaryUrl(NON_CLOUDINARY_URL, 800)).toBe(
      NON_CLOUDINARY_URL,
    );
  });

  it("does not double-transform an already-transformed URL", () => {
    const transformed = getOptimizedCloudinaryUrl(CLOUDINARY_URL, 800);
    const count = (transformed.match(/f_auto/g) ?? []).length;
    expect(count).toBe(1);
  });
});

describe("getCloudinarySrcSet", () => {
  it("returns a srcset string with all requested widths", () => {
    const result = getCloudinarySrcSet(CLOUDINARY_URL, [480, 800, 1200]);
    expect(result).toContain("480w");
    expect(result).toContain("800w");
    expect(result).toContain("1200w");
  });

  it("returns undefined for a non-Cloudinary source", () => {
    expect(getCloudinarySrcSet(NON_CLOUDINARY_URL, [480, 800])).toBeUndefined();
  });

  it("each entry uses the correct width transformation", () => {
    const result = getCloudinarySrcSet(CLOUDINARY_URL, [640]);
    expect(result).toContain("w_640");
  });
});
