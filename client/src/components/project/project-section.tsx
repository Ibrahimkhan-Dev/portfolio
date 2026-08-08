import React from "react";

export function ProjectSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const headingId = React.useId();

  return (
    <section aria-labelledby={headingId} className="space-y-3 sm:space-y-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block h-6 w-1 shrink-0 bg-primary sm:h-7"
        />
        <h2
          id={headingId}
          className="text-2xl font-black uppercase italic sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
