export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", ".NET Core", "C#", "C++", "JavaScript", "SQL", "PHP"],
  },
  {
    title: "Frameworks",
    skills: [
      "Django",
      "Flask",
      ".NET MVC",
      "React",
      "Bootstrap",
      "Entity Framework",
    ],
  },
  {
    title: "Cloud & Dev",
    skills: ["AWS", "Azure", "Docker", "OpenStack", "CI/CD", "Git", "Linux"],
  },
  {
    title: "Automation",
    skills: ["Selenium", "Unit Testing", "Jira", "Postman", "Agile", "Scrum"],
  },
];
