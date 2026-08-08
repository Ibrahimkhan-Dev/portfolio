const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUDINARY_UPLOAD_SEGMENT = "/image/upload/";

export function isCloudinaryImage(source: string): boolean {
  return (
    source.includes(CLOUDINARY_HOST) &&
    source.includes(CLOUDINARY_UPLOAD_SEGMENT)
  );
}

export function isVideoSource(source: string): boolean {
  return /\.(mp4|webm|mov|ogg)(?:$|[?#])/i.test(source);
}

export function getOptimizedCloudinaryUrl(
  source: string,
  width: number,
  quality: "eco" | "good" = "eco",
): string {
  if (!isCloudinaryImage(source)) {
    return source;
  }

  return source.replace(
    CLOUDINARY_UPLOAD_SEGMENT,
    `${CLOUDINARY_UPLOAD_SEGMENT}f_auto,q_auto:${quality},c_limit,w_${width}/`,
  );
}

export function getCloudinarySrcSet(
  source: string,
  widths: number[],
  quality: "eco" | "good" = "eco",
): string | undefined {
  if (!isCloudinaryImage(source)) {
    return undefined;
  }

  return widths
    .map((w) => `${getOptimizedCloudinaryUrl(source, w, quality)} ${w}w`)
    .join(", ");
}
