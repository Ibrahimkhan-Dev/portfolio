export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    skills: [
      "C#",
      ".NET",
      "ASP.NET Core",
      "ASP.NET MVC",
      "REST APIs",
      "Entity Framework Core",
      "Python",
      "Django",
      "Flask",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      "Angular",
      "TypeScript",
      "JavaScript",
      "Flutter",
      "Dart",
      "HTML",
      "CSS / SCSS",
      "Responsive Design",
    ],
  },
  {
    title: "Data & Infrastructure",
    skills: [
      "SQL Server",
      "T-SQL",
      "Stored Procedures",
      "Relational Data Modeling",
      "Redis",
      "Amazon S3",
      "Microsoft Azure",
      "Linux",
    ],
  },
  {
    title: "Security & Quality",
    skills: [
      "Multi-Tenant Systems",
      "Role-Based Access Control",
      "JWT Authentication",
      "Refresh Token Rotation",
      "Playwright",
      "Unit Testing",
      "Integration Testing",
      "Selenium",
      "Postman",
      "Git",
    ],
  },
];