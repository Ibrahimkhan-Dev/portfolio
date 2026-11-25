import { Braces, Layers3, PanelsTopLeft, ShieldCheck, Terminal } from "lucide-react";

import { skillCategories, type SkillCategory } from "@/data/skills";
import styles from "./skills.module.css";

const presentation = {
  "Backend & APIs": { Icon: Terminal, description: "Build APIs and connect business workflows to the database." },
  "Frontend & Mobile": { Icon: PanelsTopLeft, description: "Build web and mobile interfaces for enterprise workflows." },
  "Data & Infrastructure": { Icon: Layers3, description: "Design relational schemas, write SQL queries, and manage cloud storage." },
  "Security & Quality": { Icon: ShieldCheck, description: "Verify access rules and test critical workflows." },
};

function CapabilityCard({ category }: { category: SkillCategory }) {
  const { Icon, description } = presentation[category.title as keyof typeof presentation]
    ?? { Icon: Braces, description: "" };

  return (
    <article className={styles.card}>
      <div className={styles.cardHeading}>
        <span className={styles.icon}><Icon aria-hidden="true" /></span>
        <div>
          <h3>{category.title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <ul className={styles.tags} aria-label={category.title}>
        {category.skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </article>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className={styles.section}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Technical Capabilities</p>
          <h2 id="skills-heading">How I build <span>enterprise software</span></h2>
        </header>
        <div className={styles.cards}>
          {skillCategories.map((category) => <CapabilityCard key={category.title} category={category} />)}
        </div>
      </div>
    </section>
  );
}
