import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight, BookOpen, CodeXml, Binary, Grid2X2, Rocket, Landmark,
  Award,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GraduationCap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { certifications, type Certification } from "@/data/certifications";
import { education, type Education } from "@/data/education";
import sunrise from "@/assets/credentials-sunrise.webp";
import styles from "./credentials.module.css";

const academicJourney = [...education].reverse();

const profile = [
  { icon: GraduationCap, title: "CS Graduate", detail: "Academic foundation" },
  { icon: CodeXml, title: "Backend Focus", detail: "Building scalable solutions" },
  { icon: BookOpen, title: "Continuous Learner", detail: "Expanding my skills" },
  { icon: Rocket, title: "Impact Driven", detail: "Applying what I learn" },
];

export default function Credentials() {
  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const sortedCertifications = useMemo(
    () =>
      [...certifications].sort(
        (firstCertification, secondCertification) =>
          Number(secondCertification.year) -
          Number(firstCertification.year),
      ),
    [],
  );

  const sliderRef =
    useRef<HTMLDivElement | null>(null);

  const [showAll, setShowAll] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const pages = useMemo(() => Array.from(
    { length: Math.ceil(sortedCertifications.length / 3) },
    (_, page) => sortedCertifications.slice(page * 3, page * 3 + 3),
  ), [sortedCertifications]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || showAll) return;

    const syncPage = () => {
      if (slider.clientWidth) {
        setActivePage(Math.round(slider.scrollLeft / slider.clientWidth));
      }
    };
    const observer = new ResizeObserver(syncPage);
    observer.observe(slider);
    slider.addEventListener("scroll", syncPage, { passive: true });
    syncPage();
    return () => {
      observer.disconnect();
      slider.removeEventListener("scroll", syncPage);
    };
  }, [showAll]);

  const goToPage = (page: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollTo({
      left: Math.max(0, Math.min(page, pages.length - 1)) * slider.clientWidth,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  const handleSliderKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const destinations: Record<string, number> = {
      ArrowLeft: activePage - 1, ArrowRight: activePage + 1,
      Home: 0, End: pages.length - 1,
    };
    if (Object.hasOwn(destinations, event.key)) {
      event.preventDefault();
      goToPage(destinations[event.key]);
    }
  };

  return (
    <section id="credentials" aria-labelledby="credentials-title" className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.academicStage}>
          <img className={styles.sunrise} src={sunrise} width="1920" height="640" alt="" loading="lazy" decoding="async" />
          <header className={styles.intro}>
            <div>
              <p className={styles.eyebrow}>Credentials</p>
              <h2 className={styles.heading} id="credentials-title">From foundation to <span>continuous growth</span></h2>
              <p className={styles.lede}>My path from science to software engineering began in the classroom and continues through hands-on projects and professional learning.</p>
            </div>
            <ul className={styles.profile}>
              {profile.map(({ icon: Icon, title, detail }) => (
                <li key={title}><Icon aria-hidden="true" /><strong>{title}</strong><span>{detail}</span></li>
              ))}
            </ul>
          </header>
          <div className={styles.bar}>
            <h3><BookOpen aria-hidden="true" />Education</h3><span className={styles.rule} />
            <span className={styles.caption}>Academic journey</span>
          </div>
          <div className={styles.educationRow}>
            {academicJourney.map((item) => <EducationCard key={item.id} item={item} />)}
            <div className={styles.bridge} aria-hidden="true">
              <svg viewBox="0 0 200 90" preserveAspectRatio="none">
                <path d="M0 3 C90 3 115 87 200 87" vectorEffect="non-scaling-stroke" />
              </svg>
              <span>From a foundation in science to a career in technology.</span>
            </div>
          </div>
        </div>

        <div className={styles.bar}>
          <h3><Award aria-hidden="true" />Certifications &amp; professional learning</h3>
          <span className={styles.rule} />
          <div className={styles.controls}>
            <button type="button" className={styles.all} aria-expanded={showAll} aria-controls="certifications-slider"
              onClick={() => { setActivePage(0); setShowAll(!showAll); }}>
              {showAll ? "Show carousel" : "View all credentials"} <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
        <p id="certifications-slider-instructions" className="sr-only">Use the arrow keys to scroll. Home and End move to the first and last certificates.</p>
        <div className={styles.carousel} data-expanded={showAll || undefined}>
          {!showAll && <button type="button" className={styles.arrow} onClick={() => goToPage(activePage - 1)} disabled={activePage === 0} aria-controls="certifications-slider" aria-label="Scroll to previous certifications"><ChevronLeft /></button>}
          <div key={showAll ? "grid" : "pages"} ref={sliderRef} id="certifications-slider" role="region" aria-label="Certifications and professional learning"
            aria-describedby={showAll ? undefined : "certifications-slider-instructions"} tabIndex={showAll ? undefined : 0}
            onKeyDown={showAll ? undefined : handleSliderKeyDown} className={styles.slider} data-expanded={showAll || undefined}>
            {showAll ? sortedCertifications.map(certification => (
              <CertificateCard key={certification.id} certification={certification} featured={false} />
            )) : pages.map((page, index) => (
              <div className={styles.slide} key={page[0].id} role="group" aria-label={`Page ${index + 1} of ${pages.length}`} inert={index !== activePage}>
                {page.map((certification, i) => (
                  <CertificateCard key={certification.id} certification={certification} featured={i === 0} />
                ))}
              </div>
            ))}
          </div>
          {!showAll && <button type="button" className={styles.arrow} onClick={() => goToPage(activePage + 1)} disabled={activePage === pages.length - 1} aria-controls="certifications-slider" aria-label="Scroll to next certifications"><ChevronRight /></button>}
        </div>
        {!showAll && pages.length > 1 && (
          <div className={styles.dots} role="group" aria-label="Certification pages">
            {pages.map((page, index) => (
              <button type="button" key={page[0].id} aria-label={`Show certificate page ${index + 1} of ${pages.length}`}
                aria-current={index === activePage ? "page" : undefined} aria-controls="certifications-slider"
                onClick={() => goToPage(index)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EducationCard({ item }: { item: Education }) {
  const graduate = item.id === "abasyn-uni";
  const Emblem = graduate ? GraduationCap : Landmark;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={styles.school} data-graduate={graduate || undefined}
          aria-label={`View education details for ${item.degree} at ${item.institution}`}>
          <span className={styles.schoolTop}><span>{item.period}</span>{graduate && <small><GraduationCap size={14} /> Graduated</small>}</span>
          <span className={styles.schoolBody}>
            <span><strong>{item.institution}</strong><span className={styles.degree}>{item.degree}</span><span className={styles.description}>{item.desc}</span></span>
            <span className={styles.emblem} aria-hidden="true"><Emblem /><b>{graduate ? "Abasyn" : "KKSC"}</b></span>
          </span>
          <span className={styles.tags}>{item.subjects.map(subject => <span key={subject}>{subject}</span>)}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-[92vw] max-w-2xl overflow-y-auto rounded-xl border border-primary/40 bg-[#0b1114] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase italic text-primary sm:text-4xl">
            {item.institution}
          </DialogTitle>

          <DialogDescription className="text-base font-bold uppercase tracking-tight text-white/60 sm:text-xl">
            {item.degree} | {item.period}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          <div className="border-l-4 border-primary bg-white/5 p-4 italic sm:p-6">
            <p className="text-base text-white/80 sm:text-xl">
              {item.desc}
            </p>
          </div>

          {(item.details ?? []).length >
            0 && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                Academic Highlights
              </h4>

              <ul className="space-y-3">
                {(item.details ?? []).map(
                  (
                    detail,
                    detailIndex,
                  ) => (
                    <li
                      key={detailIndex}
                      className="flex items-start gap-3 text-sm font-medium text-white/80 sm:text-lg"
                    >
                      <CheckCircle2
                        className="mt-1 shrink-0 text-primary"
                        size={18}
                        aria-hidden="true"
                      />

                      <span>
                        {detail}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CertificateCard({ certification, featured }: { certification: Certification; featured: boolean }) {
  const url = certification.credentialUrl;
  const platform = url?.includes("coursera.org/") ? "Coursera" : url?.includes("udemy.com/") ? "Udemy" : undefined;
  const Icon = certification.skills?.includes("Python") ? CodeXml
    : certification.skills?.includes("Linear Algebra") ? Grid2X2
    : certification.skills?.includes("Probability") ? Binary : Award;
  return (
    <article className={styles.certificate} data-featured={featured || undefined}>
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" className={styles.certBody} aria-label={`View certification details for ${certification.title}`}>
            <span className={styles.tile} aria-hidden="true"><Icon /></span>
            <span className={styles.certCopy}>
              <span className={styles.issuer}>{certification.issuer}</span>
              <strong>{certification.title}</strong>
              <span className={styles.description}>{certification.description}</span>
            </span>
          </button>
        </DialogTrigger>
        <footer className={styles.certFooter}>
          <span><Calendar size={15} aria-hidden="true" />{certification.year}</span>
          {platform && <span>{platform}</span>}
          {url && <a href={url} target="_blank" rel="noreferrer" aria-label={`View certificate for ${certification.title} in a new tab`}>View certificate <ExternalLink size={13} /></a>}
        </footer>
      <DialogContent className="max-h-[85vh] w-[92vw] max-w-2xl overflow-y-auto rounded-xl border border-primary/40 bg-[#0b1114] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase italic text-primary sm:text-4xl">
            {certification.title}
          </DialogTitle>

          <DialogDescription className="text-base font-bold uppercase tracking-tight text-white/60 sm:text-xl">
            {(certification.issuer ??
              "Certificate") +
              (certification.year
                ? ` • ${certification.year}`
                : "")}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
          {certification.description && (
            <div className="border-l-4 border-primary bg-white/5 p-4 italic sm:p-6">
              <p className="text-base text-white/80 sm:text-xl">
                {
                  certification.description
                }
              </p>
            </div>
          )}

          {(certification.skills ?? [])
            .length > 0 && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="border-b border-white/10 pb-2 text-xl font-black uppercase italic sm:text-2xl">
                Skills &amp; Topics
              </h4>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {(
                  certification.skills ??
                  []
                ).map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 bg-white/5 p-2.5 text-sm font-medium text-white/80 sm:p-3 sm:text-lg"
                  >
                    <CheckCircle2
                      className="shrink-0 text-primary"
                      size={18}
                      aria-hidden="true"
                    />

                    <span>
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {certification.credentialUrl && (
            <div className="pt-4 sm:pt-6">
              <a
                href={
                  certification.credentialUrl
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${certification.title} credential in a new tab`}
                className="flex h-14 w-full items-center justify-center bg-primary text-base font-black uppercase tracking-widest text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-safe:transition-transform motion-safe:hover:scale-[1.02] sm:h-16 sm:text-lg"
              >
                View Credential

                <ExternalLink
                  size={18}
                  className="ml-2"
                  aria-hidden="true"
                />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
      </Dialog>
    </article>
  );
}
