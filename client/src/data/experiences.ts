export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;

  contributions?: string[];
  tech?: string[];
  links?: { label: string; url: string }[];
  letterUrl?: string;
};

export const experiences: Experience[] = [
  {
    id: "epazz-fullstack",
    title: "Full Stack Developer",
    company: "Epazz Tech",
    location: "Lahore",
    duration: "December 2025 - Present",
    description:
      "Epazz Tech is a multinational technology company with 450+ employees in Pakistan, operating across software development, AI engineering, drone technologies, mobile applications, and enterprise solutions, with executive leadership based in the USA and Canada. As a Full Stack Developer, I am part of the healthcare software team, contributing to enterprise-level system modernization and compliance-driven development.",
    contributions: [
      "Revamping a legacy EHR (Electronic Health Record) system from .NET Framework to .NET Core 8, developing scalable REST APIs and implementing a modern Angular frontend.",
      "Contributing to ONC Certification requirements, ensuring regulatory compliance and system interoperability standards.",
      "Working on HIPAA compliance implementation, strengthening data privacy, secure authentication, and healthcare data protection.",
      "Collaborating within a team of 6 developers in an Agile environment to deliver secure, production-ready healthcare solutions.",
      "Gaining experience in large-scale enterprise development, structured workflows, and coordination with international management and cross-functional teams.",
    ],
    tech: [
      "EHR System",
      "ONC Certification",
      "Hipaa Compliance",
      ".NET Core 8",
      "REST APIs",
      "Angular",
      "SQL",
      "Agile",
      "Git",
    ],
  },
  {
    id: "sanwa-dotnet",
    title: "ASP .NET Developer",
    company: "Sanwa Systems",
    location: "Islamabad",
    duration: "November 2023 - November 2025",
    description:
      "Sanwa Systems is a growing software house (30–40 employees) developing and maintaining internal business solutions for a UAE and USA-based automotive spare parts enterprise. The company builds and manages ERP, HRM, B2B, B2C platforms, and mobile ERP applications for Android and iOS. As a .NET Developer, I worked on maintaining and modernizing the company's core ERP system.",
    contributions: [
      "Maintained and enhanced a legacy ERP system built with ASP .NET MVC and Entity Framework.",
      "Contributed to the revamp of the ERP system using .NET Core and Angular, supporting modernization efforts.",
      "Designed and developed complete modules independently, including: Inventory Management, Warehouse Management, Logistics Management, Export-related functionalities.",
      "Developed and optimized SQL Server queries, stored procedures, and database structures using SSMS.",
      "Gained hands-on experience with Azure server deployment and hosting environments.",
      "Learned and implemented MVC architecture principles and enterprise-level backend workflows.",
      "Collaborated closely with the CEO (product owner) to align software features with real-world business operations in UAE and USA markets.",
    ],
    tech: [
      "ERP System",
      ".NET Core",
      "ASP .NET MVC",
      "Entity Framework",
      "C#",
      "SQL Server",
      "SSMS",
      "Azure",
      "Git",
    ],
  },
  {
    id: "spacedome-backend-python",
    title: "Backend Python Developer (Part-Time)",
    company: "Spacedome (NASTP)",
    location: "Islamabad",
    duration: "May 2023 - April 2024",
    description:
      "Spacedome is an AI-focused startup (10–15 team members) working on AI research and hardware integration solutions. I joined the team part-time alongside my undergraduate studies to support backend development and automation tasks.",
    contributions: [
      "Assisted in developing and maintaining Python-based backend services and REST APIs.",
      "Built and maintained Selenium automation bots for data extraction, web scraping, and workflow automation.",
      "Developed scripts to gather structured data for AI-related research and system integrations.",
      "Gained hands-on experience in backend architecture fundamentals and automation workflows.",
      "Collaborated in a small startup environment, contributing to fast-paced development cycles.",
    ],
    tech: ["Python", "Django", "Flask", "REST APIs", "Selenium", "Postman"],
  },
  {
    id: "spacedome-intern",
    title: "Intern",
    company: "Spacedome (NASTP)",
    location: "Islamabad",
    duration: "February 2023 - April 2023",
    description:
      "Spacedome is an AI-focused startup working on AI research and hardware integration solutions. I joined as an intern for my first professional industry experience, where I was introduced to IoT systems and real-world hardware-software integration.",
    contributions: [
      "Assisted in developing an IoT-based automation system, focusing on sensor data collection and real-time monitoring.",
      "Learned how hardware devices communicate with backend systems for data processing and control.",
      "Supported backend development tasks using Python and web frameworks.",
      "Worked with databases to store and manage IoT-generated data.",
      "Gained foundational knowledge of system architecture, API communication, and hardware integration workflows.",
      "Developed an understanding of how research-driven startups operate in fast-paced environments.",
    ],
    tech: ["Python", "Django", "Flask", "PostgreSQL", "IoT"],
  },
  {
    id: "wp-developer-2021",
    title: "WordPress Developer",
    company: "Freelance",
    location: "Remote",
    duration: "September 2021 - December 2021",
    description:
      "Worked with independent clients (acquired through Facebook and referrals) to design and deliver business websites across health, insurance, and digital marketing industries.",
    contributions: [
      "Designed and developed responsive WordPress websites tailored to client requirements.",
      "Customized themes and built pages using Elementor, HTML, and CSS.",
      "Configured and optimized plugins for SEO, security, and performance.",
      "Improved website loading speed and mobile responsiveness.",
      "Implemented contact forms and basic lead-generation workflows.",
      "Communicated directly with clients to gather requirements and deliver revisions.",
    ],
    tech: ["WordPress", "Elementor", "HTML", "CSS", "SEO", "Performance"],
    links: [
      {
        label: "GrooveHubMarketing.com",
        url: "https://groovehubmarketing.com/",
      },
      {
        label: "TopInsuranceDeals.com",
        url: "https://topinsurancedeals.com/index.html",
      },
      { label: "LinkLifeHealth.com", url: "https://linklifehealth.com/" },
    ],
  },
];
