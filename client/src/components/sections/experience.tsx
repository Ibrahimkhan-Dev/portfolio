import {
  ArrowUpRight, BriefcaseBusiness, CalendarDays, CircleCheck, CodeXml,
  Layers3, Quote, Target, UsersRound, Zap,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { careerTracks, experienceDate, experiences, type Experience as Role } from "@/data/experiences";
import ridgeline from "@/assets/experience-ridgeline.webp";
import styles from "./experience.module.css";

const statistics = [
  { icon: CalendarDays, value: "3+", label: "Years of experience" },
  { icon: BriefcaseBusiness, value: experiences.length, label: "Professional roles" },
  { icon: CodeXml, value: careerTracks.length, label: "Career tracks" },
  { icon: UsersRound, value: "Enterprise", label: "Systems experience" },
];

const strengths = [
  { icon: Target, title: "Problem solver", detail: "Turn business rules into software" },
  { icon: Layers3, title: "Continuous learner", detail: "Work across stacks and domains" },
  { icon: UsersRound, title: "Team player", detail: "Review and validate together" },
  { icon: Zap, title: "Impact driven", detail: "Focus on everyday workflows" },
];

function RoleDetails({ role }: { role: Role }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={styles.roleTrigger} aria-label={`View ${role.title} details at ${role.company}`}>
          {role.title} <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className={styles.dialog}>
        <header className={styles.dialogHeader}>
          <p className={styles.dialogCompany}>{role.company}</p>
          <DialogTitle>{role.title}</DialogTitle>
          <DialogDescription className={styles.dialogMeta}>
            <span>{role.duration}</span>
            <span>{role.employment} · {role.location}</span>
          </DialogDescription>
        </header>
        <p>{role.description}</p>
        <ul className={styles.checks}>
          {role.contributions?.map((item) => <li key={item}><CircleCheck aria-hidden="true" />{item}</li>)}
        </ul>
        {!!role.links?.length && (
          <ul className={styles.links} aria-label="Portfolio project links">
            {role.links.map(({ label, url }) => (
              <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14} aria-hidden="true" /></a></li>
            ))}
          </ul>
        )}
        <TechTags items={role.tech ?? []} />
      </DialogContent>
    </Dialog>
  );
}

function TechTags({ items }: { items: string[] }) {
  return (
    <ul className={styles.tags} aria-label="Technologies and tools">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function CareerTrack({ track }: { track: (typeof careerTracks)[number] }) {
  const [latest] = track.roles;
  const grouped = track.roles.length > 1;
  const current = latest.end === null;
  const earliest = track.roles[track.roles.length - 1];
  const period = `${experienceDate(earliest.start, true)} – ${latest.end ? experienceDate(latest.end, true) : "Present"}`;
  const technologies = Array.from(new Set(track.roles.flatMap((role) => role.cardTech)));

  return (
    <li className={styles.track} data-current={current || undefined}>
      <div className={styles.milestone}>
        <p className={styles.period}>{period}</p>
        <span className={styles.node} aria-hidden="true" />
        <svg className={styles.connector} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 1 C27 1 49 10 70 18 S91 94 100 99" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <article className={styles.card} aria-labelledby={`company-${latest.id}`}>
        <header className={styles.identity}>
          <span className={styles.monogram} aria-hidden="true">{track.company[0]}</span>
          <div>
            <h3 id={`company-${latest.id}`}>{track.company}</h3>
            <p>{latest.location}{latest.employment === "Full-time" && " · Full-time"}</p>
          </div>
        </header>
        {track.roles.map((role) => (
          <div className={styles.role} key={role.id}>
            <h4><RoleDetails role={role} /></h4>
            {grouped && <p className={styles.roleDates}>{role.duration}</p>}
            {!grouped && <p className={styles.summary}>{role.summary}</p>}
          </div>
        ))}
        <TechTags items={technologies} />
      </article>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.shell}>
        <header className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Work experience</p>
            <h2 className={styles.title} id="experience-title">A journey of <span>building solutions</span></h2>
            <p className={styles.lede}>From WordPress sites to enterprise software, my work spans the interfaces, APIs and databases behind healthcare, pharmaceutical traceability and ERP systems.</p>
          </div>
          <dl className={styles.statistics}>
            {statistics.map(({ icon: Icon, value, label }) => (
              <div key={label}><Icon aria-hidden="true" /><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </header>
        <div className={styles.journey}>
          <div className={styles.landscape} aria-hidden="true">
            <img src={ridgeline} alt="" width="1920" height="640" loading="lazy" decoding="async" />
            <span>Better solutions ahead</span>
          </div>
          <ol className={styles.tracks} aria-label="Career timeline, most recent first">
            {careerTracks.map((track) => <CareerTrack key={track.company} track={track} />)}
          </ol>
        </div>
        <footer className={styles.footer}>
          <figure className={styles.quote}>
            <Quote aria-hidden="true" />
            <blockquote>Every role has been a stepping stone,<br /> every project a chance to create real impact.</blockquote>
            <figcaption>Muhammad Ibrahim Khan</figcaption>
          </figure>
          <ul className={styles.strengths}>
            {strengths.map(({ icon: Icon, title, detail }) => (
              <li key={title}><Icon aria-hidden="true" /><strong>{title}</strong><span>{detail}</span></li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
