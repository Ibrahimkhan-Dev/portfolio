import {
  useEffect,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";

import {
  addGalleryRetryVersion,
  GalleryMediaFeedback,
  useGalleryMediaState,
} from "@/components/project/gallery-media-state";

import {
  getCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
  isCloudinaryImage,
  isVideoSource,
} from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

type ProjectGalleryProps = {
  projectTitle: string;
  items: string[];
  onExpand: () => void;
  prefersReducedMotion: boolean;
};

export function ProjectGallery({
  projectTitle,
  items,
  onExpand,
  prefersReducedMotion,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [items, projectTitle]);

  const safeActiveIndex =
    items.length === 0
      ? 0
      : Math.min(activeIndex, items.length - 1);
  const activeSource = items[safeActiveIndex];
  const {
    status: mediaStatus,
    retryVersion,
    markLoaded,
    markFailed,
    retry,
  } = useGalleryMediaState(activeSource);

  if (items.length === 0) {
    return null;
  }

  const selectItem = (index: number) => {
    setActiveIndex(index);
  };

  const showPrevious = () => {
    selectItem(
      safeActiveIndex === 0
        ? items.length - 1
        : safeActiveIndex - 1,
    );
  };

  const showNext = () => {
    selectItem(
      safeActiveIndex === items.length - 1
        ? 0
        : safeActiveIndex + 1,
    );
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLElement>,
  ) => {
    if (items.length <= 1) {
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const positionLabel = `Visual ${safeActiveIndex + 1} of ${items.length}`;
  const retryableSource = addGalleryRetryVersion(
    activeSource,
    retryVersion,
  );

  return (
    <section
      id="project-gallery"
      aria-label={`${projectTitle} project gallery`}
      onKeyDown={handleKeyDown}
      className="min-w-0 scroll-mt-20"
    >
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <p className="text-[0.64rem] font-black uppercase tracking-[0.2em] text-[#8D96A0]">
          Project gallery
        </p>
        <p
          aria-live="polite"
          className="text-[0.64rem] font-black uppercase tracking-[0.16em] text-[#FF7628]"
        >
          {positionLabel}
        </p>
      </div>
      <div
        tabIndex={0}
        className="project-gallery-frame group/gallery relative overflow-hidden rounded-[1.35rem] border border-[#36414C] bg-[linear-gradient(145deg,#121820,#090D11)] p-1.5 shadow-[0_34px_92px_rgba(0,0,0,0.52),0_0_46px_rgba(255,118,40,0.08),inset_0_1px_rgba(255,255,255,0.055)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] sm:p-2"
      >
        <div className="project-gallery-viewport relative flex min-h-[17rem] items-center justify-center overflow-hidden rounded-[1rem] bg-[radial-gradient(circle_at_72%_18%,rgba(255,118,40,0.045),transparent_32%),linear-gradient(145deg,rgba(255,255,255,0.03),transparent_42%),#0A0E12] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025)] sm:min-h-[23rem] lg:min-h-[28rem] xl:min-h-[30rem]">
          <GalleryMediaFeedback
            status={mediaStatus}
            label={`${projectTitle} — ${positionLabel}`}
            onRetry={retry}
            prefersReducedMotion={prefersReducedMotion}
          />

          {isVideoSource(activeSource) ? (
            <video
              key={`${activeSource}-${retryVersion}`}
              src={encodeURI(retryableSource)}
              controls
              preload="metadata"
              onLoadedData={() => markLoaded(activeSource)}
              onError={() => markFailed(activeSource)}
              aria-label={`${projectTitle} — ${positionLabel}`}
              className={cn(
                "max-h-[38rem] w-full bg-black object-contain transition-opacity duration-300 motion-reduce:transition-none",
                mediaStatus === "loaded"
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
          ) : (
            <img
              key={`${activeSource}-${retryVersion}`}
              src={addGalleryRetryVersion(
                getOptimizedCloudinaryUrl(
                  activeSource,
                  1800,
                  "good",
                ),
                retryVersion,
              )}
              srcSet={getCloudinarySrcSet(
                activeSource,
                [640, 960, 1280, 1600, 1800],
                "good",
              )
                ?.split(", ")
                .map((candidate) => {
                  const separatorIndex =
                    candidate.lastIndexOf(" ");

                  if (separatorIndex === -1) {
                    return addGalleryRetryVersion(
                      candidate,
                      retryVersion,
                    );
                  }

                  return `${addGalleryRetryVersion(candidate.slice(0, separatorIndex), retryVersion)}${candidate.slice(separatorIndex)}`;
                })
                .join(", ")}
              sizes={
                isCloudinaryImage(activeSource)
                  ? "(min-width: 1024px) 52vw, 100vw"
                  : undefined
              }
              alt={`${projectTitle} — ${positionLabel}`}
              width={1600}
              height={900}
              loading={
                safeActiveIndex === 0 ? "eager" : "lazy"
              }
              decoding="async"
              onLoad={() => markLoaded(activeSource)}
              onError={() => markFailed(activeSource)}
              className={cn(
                "h-auto max-h-[38rem] w-full object-contain transition-opacity duration-300 motion-reduce:transition-none",
                mediaStatus === "loaded"
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-2 bottom-2 h-24 rounded-b-[1rem] bg-gradient-to-t from-black/75 to-transparent" />

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-end gap-4 sm:inset-x-5 sm:bottom-5">
          <button
            type="button"
            onClick={onExpand}
            className="project-gallery-control z-20 grid size-11 place-items-center rounded-full border border-[#4A5560] bg-[#080B0E]/85 text-white shadow-[0_10px_28px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md transition-[border-color,background-color,color,box-shadow] hover:border-[#FF7628] hover:bg-[#FF7628]/10 hover:text-[#FF7628] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_18px_rgba(255,118,40,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628]"
            aria-label={`Open ${projectTitle} gallery`}
          >
            <Expand
              aria-hidden="true"
              className="size-4"
            />
          </button>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="project-gallery-control absolute left-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#4A5560] bg-[#080B0E]/85 text-white shadow-[0_10px_28px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md transition-[border-color,background-color,color,box-shadow] hover:border-[#FF7628] hover:bg-[#FF7628]/10 hover:text-[#FF7628] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_18px_rgba(255,118,40,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628]"
              aria-label="Show previous project visual"
            >
              <ChevronLeft
                aria-hidden="true"
                className="size-5"
              />
            </button>

            <button
              type="button"
              onClick={showNext}
              className="project-gallery-control absolute right-4 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#4A5560] bg-[#080B0E]/85 text-white shadow-[0_10px_28px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.05)] backdrop-blur-md transition-[border-color,background-color,color,box-shadow] hover:border-[#FF7628] hover:bg-[#FF7628]/10 hover:text-[#FF7628] hover:shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_18px_rgba(255,118,40,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628]"
              aria-label="Show next project visual"
            >
              <ChevronRight
                aria-hidden="true"
                className="size-5"
              />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div
          role="group"
          aria-label="Choose project visual"
          className="mt-3 flex flex-wrap justify-center gap-0.5"
        >
          {items.map((source, index) => {
            const isActive = index === safeActiveIndex;

            return (
              <button
                key={`${source}-${index}`}
                type="button"
                onClick={() => selectItem(index)}
                aria-label={`Show project visual ${index + 1} of ${items.length}`}
                aria-current={
                  isActive ? "true" : undefined
                }
                className="group grid size-9 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080B0E]"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block rounded-full transition-[width,height,background-color] duration-300",
                    prefersReducedMotion &&
                      "transition-none",
                    isActive
                      ? "h-2.5 w-5 bg-[#FF7628]"
                      : "size-2 bg-[#535B64] group-hover:bg-[#7A838D]",
                  )}
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
