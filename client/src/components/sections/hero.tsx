import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileText,
  Layers3,
  MapPin,
} from "lucide-react";

import { projectCards } from "@/data/project-cards";
import { siteContentContainerClass } from "@/lib/layout";

const resumeUrl =
  "/Muhammad-Ibrahim-Khan-Resume.pdf";

const portraitUrl =
  "/media/images/ibrahim-hero-cutout.webp";

const stats = [
  {
    icon: BriefcaseBusiness,
    primary: "3+",
    secondary: "Years of experience",
  },
  {
    icon: Layers3,
    primary: String(projectCards.length),
    secondary: "Portfolio Projects",
  },
  {
    icon: Building2,
    primary: "Enterprise",
    secondary: "Systems",
  },
  {
    icon: Code2,
    primary: "Full-Stack",
    secondary: "Development",
  },
];

export default function Hero({ onProjectsNavigate }: {
  onProjectsNavigate: () => void;
}) {

  return (
    <section
      id="about"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-svh overflow-hidden bg-[#080B0E] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] [background-size:72px_72px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(255,118,40,0.13),transparent_28%),radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.025),transparent_24%)]"
      />

      <div
        className={`relative flex min-h-svh flex-col pt-28 sm:pt-32 lg:pt-24 ${siteContentContainerClass}`}
      >
        <div className="grid grow items-center gap-12 pb-14 md:gap-8 lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:gap-5 lg:pb-6 xl:gap-8 2xl:gap-10">
          <div
            className="hero-copy-enter relative z-20 min-w-0 max-w-[56rem] lg:pr-4 xl:pr-6 2xl:pr-8"
          >
            <div className="mb-7 flex items-center gap-4 sm:mb-8">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 bg-[#FF7628] shadow-[0_0_18px_rgba(255,118,40,0.7)]"
              />

              <p className="text-[0.65rem] font-black uppercase tracking-[0.32em] text-[#E6E8EB] sm:text-xs sm:tracking-[0.38em]">
                Full-Stack Developer
              </p>

              <span
                aria-hidden="true"
                className="hidden h-px w-20 bg-[#FF7628] sm:block"
              />
            </div>

            <h1
              id="hero-heading"
              className="text-[clamp(2.85rem,12.8vw,5.7rem)] font-black leading-[0.82] tracking-[-0.06em] text-white sm:text-[clamp(4.6rem,12vw,7rem)] lg:text-[clamp(3.75rem,6vw,7.5rem)] 2xl:text-[clamp(5rem,6.4vw,8rem)]"
            >
              <span className="block">Building </span>
              <span className="block">Systems </span>
              <span className="block whitespace-nowrap">
                That Scale
                <span className="text-[#FF7628]">
                  .
                </span>
              </span>
            </h1>

            <div className="mt-7 sm:mt-9">
              <p className="flex flex-wrap items-baseline gap-x-[0.28em] text-[clamp(1.55rem,4.8vw,2.25rem)] font-black leading-tight tracking-[-0.035em] text-white">
                <span>Muhammad</span>
                <span className="text-[#FF7628]">
                  Ibrahim
                </span>
                <span>Khan</span>
              </p>

              <span
                aria-hidden="true"
                className="mt-3 block h-1 w-16 bg-[#FF7628]"
              />
            </div>

            <p className="mt-5 max-w-[47rem] text-sm font-medium leading-6 text-[#B8BEC7] sm:text-base sm:leading-7 lg:text-[1.05rem]">
              I build .NET APIs and Angular applications backed by SQL Server.
              My work includes electronic health records, pharmaceutical
              traceability, and inventory systems.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={onProjectsNavigate}
                className="group inline-flex min-h-14 cursor-pointer items-center justify-center gap-4 rounded-sm border border-[#FF7628] bg-[#FF7628] px-7 py-3.5 text-sm font-black text-[#080B0E] shadow-[0_12px_34px_rgba(255,118,40,0.19)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#ff8b4a] hover:shadow-[0_16px_40px_rgba(255,118,40,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
              >
                Explore My Work
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </button>

              <a
                href={resumeUrl}
                download="Muhammad-Ibrahim-Khan-Resume.pdf"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-sm border border-[#FF7628] bg-[#0B0E11]/80 px-7 py-3.5 text-sm font-black text-white transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-[#FF7628] hover:text-[#080B0E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7628] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080B0E]"
              >
                <FileText
                  aria-hidden="true"
                  className="size-5 text-[#FF7628] transition-colors group-hover:text-[#080B0E]"
                  strokeWidth={2.2}
                />
                Download Resume
              </a>
            </div>

            <div className="mt-7 flex flex-col gap-3 text-sm font-medium text-[#D1D5DA] sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <span className="inline-flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#FF7628]"
                  strokeWidth={2.5}
                />
                Lahore, Pakistan
              </span>
            </div>
          </div>

          <div
            className="hero-portrait-enter relative z-10 mx-auto h-[28rem] w-full min-w-0 max-w-[38rem] sm:h-[37rem] lg:-mr-2 lg:h-full lg:min-h-[33rem] lg:max-w-none xl:-mr-4 xl:min-h-[36rem] 2xl:-mr-6 2xl:min-h-[41rem] [@media(min-width:2200px)]:min-h-[45rem] [@media(min-width:3000px)]:h-[52rem] [@media(min-width:3000px)]:min-h-0 [@media(min-width:3000px)]:self-center"
          >
            <div
              aria-hidden="true"
              className="hero-portrait-glow absolute inset-x-[7%] bottom-[1%] top-[7%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,118,40,0.64)_0%,rgba(255,118,40,0.24)_38%,rgba(255,118,40,0.08)_60%,transparent_76%)] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="absolute left-[1%] top-[3%] aspect-square w-[92%] rounded-full border-[1.5px] border-[#FF7628]/95 drop-shadow-[0_0_9px_rgba(255,118,40,0.32)]"
            />

            <div
              aria-hidden="true"
              className="absolute left-[8%] top-[10%] aspect-square w-[79%] rounded-full border border-[#FF7628]/45"
            />

            <div
              aria-hidden="true"
              className="absolute left-[4%] top-[6%] h-[72%] w-px bg-[linear-gradient(to_bottom,transparent,rgba(255,118,40,0.42)_24%,rgba(255,118,40,0.1)_76%,transparent)]"
            />

            <div
              aria-hidden="true"
              className="absolute right-[1%] top-[7%] h-28 w-28 opacity-75 [background-image:radial-gradient(#FF7628_1.15px,transparent_1.15px)] [background-size:14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)] sm:h-36 sm:w-36"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-[14%] left-[2%] h-px w-28 bg-[#FF7628]/50 before:absolute before:-top-1 before:left-0 before:size-2 before:bg-[#FF7628]"
            />

            <img
              src={portraitUrl}
              srcSet={`/media/images/ibrahim-hero-cutout-560.webp 560w, /media/images/ibrahim-hero-cutout-768.webp 768w, ${portraitUrl} 1122w`}
              sizes="(min-width: 3000px) 666px, (min-width: 2200px) max(576px, calc(80svh - 198px)), (min-width: 1536px) max(525px, calc(80svh - 198px)), (min-width: 1024px) min(39vw, max(462px, calc(80svh - 198px))), (min-width: 640px) 474px, min(100vw - 40px, 358px)"
              width={1122}
              height={1402}
              alt="Muhammad Ibrahim Khan, Full-Stack Developer"
              fetchPriority="high"
              decoding="async"
              className="absolute bottom-0 left-1/2 h-auto max-h-full w-auto max-w-full -translate-x-1/2 object-contain object-bottom grayscale contrast-[1.08] [filter:grayscale(1)_contrast(1.08)_drop-shadow(0_0_34px_rgba(255,118,40,0.24))] [mask-image:linear-gradient(to_bottom,black_0%,black_86%,rgba(0,0,0,0.88)_92%,transparent_100%)]"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-[4%] right-[3%] hidden text-[0.62rem] font-black uppercase tracking-[0.5em] text-white/35 [writing-mode:vertical-rl] sm:block"
            >
              Code · Solve · Build · Impact
            </span>
          </div>
        </div>

        <ul
          aria-label="Professional highlights"
          className="relative z-20 -ml-5 grid w-[calc(100%+2.5rem)] grid-cols-2 border-t border-[#FF7628]/85 bg-[#080B0E]/95 sm:-mx-8 sm:w-auto md:grid-cols-4 lg:-mx-10 xl:-mx-12 2xl:-mx-14"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <li
                key={stat.secondary}
                className={`flex min-h-28 items-center gap-3 border-[#30343A] px-3 py-5 sm:gap-4 sm:px-6 lg:px-8 xl:min-h-32 ${
                  index % 2 === 0
                    ? "border-r"
                    : ""
                } ${
                  index < 2
                    ? "border-b md:border-b-0"
                    : ""
                } ${
                  index > 0
                    ? "md:border-l"
                    : ""
                } ${
                  index === 2
                    ? "border-r md:border-r-0"
                    : ""
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className="size-7 shrink-0 text-[#FF7628] sm:size-9"
                  strokeWidth={1.8}
                />

                <span className="min-w-0">
                  <span className="block break-words text-base font-black uppercase leading-tight tracking-[-0.025em] text-white sm:text-xl lg:text-2xl">
                    {stat.primary}
                  </span>
                  <span className="mt-1 block text-[0.58rem] font-bold uppercase leading-4 tracking-[0.22em] text-[#B8BEC7] sm:text-[0.65rem] lg:text-xs">
                    {stat.secondary}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
