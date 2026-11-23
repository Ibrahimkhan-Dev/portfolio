import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import {
  addGalleryRetryVersion,
  GalleryMediaFeedback,
  useGalleryMediaState,
} from "@/components/project/gallery-media-state";
import {
  getOptimizedCloudinaryUrl,
  isVideoSource,
} from "@/lib/cloudinary";

const GALLERY_TITLE_ID = "project-gallery-title";
const GALLERY_INSTRUCTIONS_ID = "project-gallery-instructions";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "video[controls]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface GalleryModalState {
  title: string;
  items: string[];
}

interface GalleryModalProps {
  modal: GalleryModalState | null;
  onClose: () => void;
  pageContentRef: React.RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
}

export function GalleryModal({
  modal,
  onClose,
  pageContentRef,
  prefersReducedMotion,
}: GalleryModalProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const activeSource = modal?.items[galleryIndex];
  const {
    status: mediaStatus,
    retryVersion,
    markLoaded,
    markFailed,
    retry,
  } = useGalleryMediaState(activeSource);

  const galleryDialogRef = useRef<HTMLDivElement | null>(
    null,
  );

  const galleryCloseButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const restoreFocusRef = useRef<HTMLElement | null>(
    null,
  );

  const galleryPrev = useCallback(() => {
    const itemCount = modal?.items.length ?? 0;

    if (itemCount <= 1) {
      return;
    }

    setGalleryIndex((index) =>
      index === 0 ? itemCount - 1 : index - 1,
    );
  }, [modal?.items.length]);

  const galleryNext = useCallback(() => {
    const itemCount = modal?.items.length ?? 0;

    if (itemCount <= 1) {
      return;
    }

    setGalleryIndex((index) =>
      index === itemCount - 1 ? 0 : index + 1,
    );
  }, [modal?.items.length]);

  const selectGalleryItem = useCallback(
    (index: number) => {
      setGalleryIndex(index);
    },
    [],
  );

  /*
   * Capture the currently focused element and reset gallery
   * state whenever the modal opens or changes.
   *
   * This effect intentionally appears before the scroll-lock
   * effect so focus restoration has the correct source element.
   */
  useEffect(() => {
    if (!modal) {
      return;
    }

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    setGalleryIndex(0);
  }, [modal]);

  /*
   * Manage modal accessibility:
   * - lock page scrolling
   * - make background content inert
   * - move initial focus into the dialog
   * - support Escape and arrow navigation
   * - trap keyboard focus
   * - restore focus when the gallery closes
   */
  useEffect(() => {
    if (!modal) {
      return;
    }

    const pageContent = pageContentRef.current;

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousAriaHidden =
      pageContent?.getAttribute("aria-hidden") ?? null;

    const inertTarget = pageContent as
      | (HTMLDivElement & { inert: boolean })
      | null;

    const previousInert = inertTarget?.inert ?? false;

    document.body.style.overflow = "hidden";

    if (pageContent && inertTarget) {
      pageContent.setAttribute(
        "aria-hidden",
        "true",
      );

      inertTarget.inert = true;
    }

    const focusFrame =
      window.requestAnimationFrame(() => {
        galleryCloseButtonRef.current?.focus();
      });

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        galleryPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        galleryNext();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = galleryDialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR,
        ),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !==
            "true",
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusableElements[0];

      const last =
        focusableElements[
          focusableElements.length - 1
        ];

      const active = document.activeElement;

      if (event.shiftKey) {
        if (
          active === first ||
          !dialog.contains(active)
        ) {
          event.preventDefault();
          last.focus();
        }

        return;
      }

      if (
        active === last ||
        !dialog.contains(active)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.cancelAnimationFrame(focusFrame);

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      document.body.style.overflow =
        previousBodyOverflow;

      if (pageContent && inertTarget) {
        inertTarget.inert = previousInert;

        if (previousAriaHidden === null) {
          pageContent.removeAttribute(
            "aria-hidden",
          );
        } else {
          pageContent.setAttribute(
            "aria-hidden",
            previousAriaHidden,
          );
        }
      }

      const elementToRestore =
        restoreFocusRef.current;

      restoreFocusRef.current = null;

      window.requestAnimationFrame(() => {
        elementToRestore?.focus();
      });
    };
  }, [
    modal,
    onClose,
    galleryPrev,
    galleryNext,
    pageContentRef,
  ]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion
              ? 0
              : 0.2,
          }}
          role="presentation"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#050709]/94 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={galleryDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={GALLERY_TITLE_ID}
            aria-describedby={
              GALLERY_INSTRUCTIONS_ID
            }
            tabIndex={-1}
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: prefersReducedMotion
                ? 0
                : 0.25,
              ease: "easeOut",
            }}
            className="flex w-full max-w-6xl flex-col gap-4 focus:outline-none"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="block h-6 w-1 shrink-0 bg-primary"
                />

                <h2
                  id={GALLERY_TITLE_ID}
                  className="truncate text-xl font-black normal-case tracking-[-0.025em] text-white sm:text-2xl"
                >
                  {modal.title}
                </h2>

                <span
                  aria-live="polite"
                  className="ml-2 shrink-0 text-xs font-black uppercase tracking-widest text-primary"
                >
                  {galleryIndex + 1} /{" "}
                  {modal.items.length}
                </span>
              </div>

              <button
                ref={galleryCloseButtonRef}
                type="button"
                onClick={onClose}
                className="grid size-11 shrink-0 place-items-center rounded-full border border-[#3A444E] bg-[#10151B] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35),inset_0_1px_rgba(255,255,255,0.04)] transition-[border-color,background-color,color,box-shadow] hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_18px_rgba(255,118,40,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close gallery"
              >
                <X
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="project-gallery-frame relative aspect-video overflow-hidden rounded-xl border border-[#36414C] bg-card shadow-[0_30px_88px_rgba(0,0,0,0.58),0_0_38px_rgba(255,118,40,0.065),inset_0_1px_rgba(255,255,255,0.04)]">
              <GalleryMediaFeedback
                status={mediaStatus}
                label={`${modal.title} visual ${galleryIndex + 1} of ${modal.items.length}`}
                onRetry={retry}
                prefersReducedMotion={prefersReducedMotion}
              />

              {(() => {
                const source =
                  modal.items[galleryIndex];

                const retryableSource =
                  addGalleryRetryVersion(
                    source,
                    retryVersion,
                  );
                const safeSource = encodeURI(
                  retryableSource,
                );

                return isVideoSource(source) ? (
                  <video
                    key={`${source}-${retryVersion}`}
                    src={safeSource}
                    controls
                    preload="metadata"
                    onLoadedData={() =>
                      markLoaded(source)
                    }
                    onError={() =>
                      markFailed(source)
                    }
                    className={`h-full w-full bg-black object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                      mediaStatus === "loaded"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                ) : (
                  <img
                    key={`${source}-${retryVersion}`}
                    src={addGalleryRetryVersion(
                      getOptimizedCloudinaryUrl(
                        source,
                        1600,
                        "good",
                      ),
                      retryVersion,
                    )}
                    alt={`${modal.title} visual ${
                      galleryIndex + 1
                    } of ${modal.items.length}`}
                    width={1600}
                    height={900}
                    decoding="async"
                    onLoad={() =>
                      markLoaded(source)
                    }
                    onError={() =>
                      markFailed(source)
                    }
                    className={`h-full w-full bg-card object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                      mediaStatus === "loaded"
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                );
              })()}

              {modal.items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={galleryPrev}
                    className="absolute left-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#46515C] bg-[#080B0E]/85 text-white shadow-[0_10px_28px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.05)] transition-[border-color,background-color,color,box-shadow] hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Show previous gallery item"
                  >
                    <ChevronLeft
                      size={22}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={galleryNext}
                    className="absolute right-3 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#46515C] bg-[#080B0E]/85 text-white shadow-[0_10px_28px_rgba(0,0,0,0.42),inset_0_1px_rgba(255,255,255,0.05)] transition-[border-color,background-color,color,box-shadow] hover:border-primary hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Show next gallery item"
                  >
                    <ChevronRight
                      size={22}
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div>

            {modal.items.length > 1 && (
              <div
                className="flex flex-wrap justify-center gap-2"
                aria-label="Choose gallery item"
              >
                {modal.items.map(
                  (source, index) => (
                    <button
                      key={`${source}-${index}`}
                      type="button"
                      onClick={() =>
                        selectGalleryItem(
                          index,
                        )
                      }
                      aria-label={`Show gallery item ${
                        index + 1
                      }`}
                      aria-current={
                        index === galleryIndex
                          ? "true"
                          : undefined
                      }
                      className={[
                        "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                        index === galleryIndex
                          ? "w-4 bg-primary"
                          : "w-2 bg-white/20 hover:bg-white/40",
                      ].join(" ")}
                    />
                  ),
                )}
              </div>
            )}

            <p
              id={GALLERY_INSTRUCTIONS_ID}
              className="text-center text-xs font-medium uppercase tracking-widest text-white/30"
            >
              Use Left and Right Arrow keys to
              navigate · Escape closes the gallery
              · Select outside the dialog to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
