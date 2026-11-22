import React from "react";

export function ProjectSection({
  title,
  eyebrow,
  description,
  children,
  className = "",
  compactTop = false,
  compactBottom = false,
  fluidTitle = false,
  fullWidthHeader = false,
}: {
  title: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  compactTop?: boolean;
  compactBottom?: boolean;
  fluidTitle?: boolean;
  fullWidthHeader?: boolean;
}) {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`scroll-mt-20 ${compactBottom ? "pb-6" : "pb-11 sm:pb-14 lg:pb-16 xl:pb-[4.5rem]"} ${compactTop ? "pt-8" : "pt-11 sm:pt-14 lg:pt-16 xl:pt-[4.5rem]"} ${className}`}
    >
      <header
        className={`mb-7 sm:mb-9 lg:mb-10 ${fullWidthHeader ? "max-w-none" : "max-w-4xl"}`}
      >
        {eyebrow && (
          <div className="mb-3.5 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-[#FF7628] shadow-[0_0_12px_rgba(255,118,40,0.34)] sm:w-10"
            />
            <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-[#FF7628]">
              {eyebrow}
            </p>
          </div>
        )}

        <h2
          id={headingId}
          className={`${fluidTitle ? "max-w-none" : "max-w-[22ch]"} normal-case text-[clamp(1.85rem,3.4vw,2.85rem)] font-black leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)]`}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-4 max-w-[68ch] text-sm font-medium leading-6 text-[#9FA8B2] sm:text-base sm:leading-7">
            {description}
          </p>
        )}
        <span
          aria-hidden="true"
          className="mt-6 block h-px w-full bg-gradient-to-r from-[#FF7628]/30 via-white/[0.08] to-transparent shadow-[0_1px_10px_rgba(255,118,40,0.035)]"
        />
      </header>

      {children}
    </section>
  );
}
