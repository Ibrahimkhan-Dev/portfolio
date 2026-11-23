import {
  useCallback,
  useRef,
  useState,
} from "react";
import { ImageOff, LoaderCircle, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

export type GalleryMediaStatus =
  | "loading"
  | "loaded"
  | "error";

type MediaState = {
  source: string;
  status: GalleryMediaStatus;
  retryVersion: number;
};

export function addGalleryRetryVersion(
  source: string,
  retryVersion: number,
) {
  if (retryVersion === 0) {
    return source;
  }

  const hashIndex = source.indexOf("#");
  const base =
    hashIndex === -1
      ? source
      : source.slice(0, hashIndex);
  const hash =
    hashIndex === -1 ? "" : source.slice(hashIndex);
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}galleryRetry=${retryVersion}${hash}`;
}

export function useGalleryMediaState(
  activeSource?: string,
) {
  const loadedSourcesRef = useRef(new Set<string>());
  const retryVersionsRef = useRef(
    new Map<string, number>(),
  );
  const activeSourceRef = useRef(activeSource);
  const [mediaState, setMediaState] =
    useState<MediaState>({
      source: activeSource ?? "",
      status: activeSource ? "loading" : "error",
      retryVersion: 0,
    });

  activeSourceRef.current = activeSource;

  const retryVersion = activeSource
    ? (retryVersionsRef.current.get(activeSource) ?? 0)
    : 0;

  const status: GalleryMediaStatus = !activeSource
    ? "error"
    : mediaState.source === activeSource
      ? mediaState.status
      : loadedSourcesRef.current.has(activeSource)
        ? "loaded"
        : "loading";

  const markLoaded = useCallback((source: string) => {
    loadedSourcesRef.current.add(source);

    if (activeSourceRef.current !== source) {
      return;
    }

    setMediaState({
      source,
      status: "loaded",
      retryVersion:
        retryVersionsRef.current.get(source) ?? 0,
    });
  }, []);

  const markFailed = useCallback((source: string) => {
    loadedSourcesRef.current.delete(source);

    if (activeSourceRef.current !== source) {
      return;
    }

    setMediaState({
      source,
      status: "error",
      retryVersion:
        retryVersionsRef.current.get(source) ?? 0,
    });
  }, []);

  const retry = useCallback(() => {
    const source = activeSourceRef.current;

    if (!source) {
      return;
    }

    loadedSourcesRef.current.delete(source);

    const nextRetryVersion =
      (retryVersionsRef.current.get(source) ?? 0) + 1;

    retryVersionsRef.current.set(
      source,
      nextRetryVersion,
    );
    setMediaState({
      source,
      status: "loading",
      retryVersion: nextRetryVersion,
    });
  }, []);

  return {
    status,
    retryVersion,
    markLoaded,
    markFailed,
    retry,
  };
}

export function GalleryMediaFeedback({
  status,
  label,
  onRetry,
  prefersReducedMotion,
}: {
  status: GalleryMediaStatus;
  label: string;
  onRetry: () => void;
  prefersReducedMotion: boolean;
}) {
  if (status === "loaded") {
    return null;
  }

  if (status === "error") {
    return (
      <div
        role="status"
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_42%,rgba(255,118,40,0.055),transparent_28%),#0A0E12] px-6 py-12 text-center text-[#9AA3AD]"
      >
        <ImageOff
          aria-hidden="true"
          className="size-8 text-[#FF7628]"
        />
        <p className="max-w-sm text-sm font-bold text-[#C7CDD4]">
          This project visual could not be loaded.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-md border border-[#FF7628]/55 bg-[#FF7628]/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition-[border-color,background-color,color] duration-200 hover:border-[#FF7628] hover:bg-[#FF7628]/15 hover:text-[#FFB184] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] motion-reduce:transition-none"
        >
          <RotateCcw
            aria-hidden="true"
            className="size-4 text-[#FF7628]"
          />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label={`Loading ${label}`}
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(145deg,#11171D,#090D11)] px-6 text-center"
    >
      <LoaderCircle
        aria-hidden="true"
        className={cn(
          "size-10 text-[#FF7628]",
          !prefersReducedMotion && "animate-spin motion-reduce:animate-none",
        )}
      />
      <span className="text-sm font-semibold text-[#FFB184]">
        Loading visual…
      </span>
    </div>
  );
}
