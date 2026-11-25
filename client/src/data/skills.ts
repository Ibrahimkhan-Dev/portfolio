export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend & APIs",
    skills: [
      "C#",
      "ASP.NET Core",
      "REST APIs",
      ".NET",
      "ASP.NET MVC",
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
      "Flutter",
      "JavaScript",
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
      "Redis",
      "Stored Procedures",
      "Relational Data Modeling",
      "Amazon S3",
      "Microsoft Azure",
      "Linux",
    ],
  },
  {
    title: "Security & Quality",
    skills: [
      "Role-Based Access Control",
      "Playwright",
      "Postman",
      "Multi-Tenant Systems",
      "JWT Authentication",
      "Refresh Token Rotation",
      "Unit Testing",
      "Integration Testing",
      "Selenium",
      "Git",
    ],
  },
];
