export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C#", "Python", "JavaScript", "TypeScript", "SQL", "C++", "PHP"],
  },
  {
    title: "Frameworks",
    skills: [
      "ASP.NET Core",
      ".NET MVC",
      "Entity Framework",
      "Angular",
      "Django",
      "Flask",
      "React",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Azure", "AWS", "Docker", "Git", "CI/CD", "Linux", "OpenStack"],
  },
  {
    title: "Tools & QA",
    skills: ["Postman", "Selenium", "Unit Testing", "Jira", "Agile", "Scrum", "SSMS"],
  },
];
