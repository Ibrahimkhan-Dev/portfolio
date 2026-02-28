// client/src/data/portfolio.ts
import type React from "react";

/* =========================================================
   PROJECTS
   ========================================================= */

export type Project = {
  id: string;

  title: string;
  shortDesc: string;
  tech: string[];

  description: string;
  role?: string;
  company?: string;
  duration?: string;

  liveUrl?: string;
  sourceUrl?: string;

  icon?: React.ReactNode; // optional (we’ll keep undefined for now)
  image?: string; // e.g. "/media/images/erp.png"
};

/* =========================================================
   EXPERIENCE
   ========================================================= */

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

/* =========================================================
   SKILLS
   ========================================================= */

export type SkillCategory = {
  title: string;
  skills: string[];
};

/* =========================================================
   EDUCATION
   ========================================================= */

export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  desc: string;

  details?: string[];
};

/* =========================================================
   CERTIFICATIONS
   ========================================================= */

export type Certification = {
  id: string;
  title: string;
  issuer?: string;
  year?: string;

  description?: string;
  skills?: string[];

  credentialUrl?: string;
};

/* =========================================================
   DATA
   ========================================================= */


   /* =========================================================
   Projects
   ========================================================= */
export const projects: Project[] = [
  {
    id: "erp-system",
    title: "ERP System Enhancement",
    shortDesc:
      "Lead backend developer for enterprise Warehouse Management and Logistics modules.",
    description:
      "As the lead backend developer, I was responsible for designing, developing, and enhancing core modules of an enterprise-level ERP system, including Warehouse Management, Inventory Control, Logistics, and Sales Processing. I implemented RESTful APIs using .NET Core to ensure seamless integration across B2B and B2C platforms, and optimized complex SQL Server queries and stored procedures to enhance performance and reduce system latency.",
    tech: [".NET Core", "SQL Server", "REST API", "Selenium", "Git", "Jira"],
    role: "Backend .NET Developer",
    company: "Sanwa Systems",
    duration: "2023–Present",
    // image: "/media/images/erp-system.png",
    // liveUrl: "https://...",
    // sourceUrl: "https://github.com/..."
  },
  {
    id: "home-automation",
    title: "Home Automation System",
    shortDesc:
      "IoT system integrating hardware sensors with a Python-powered backend logic.",
    description:
      "Developed a smart home automation system that integrated IoT devices to provide real-time control and monitoring of appliances such as lights, thermostats, security cameras, and motion sensors. I designed and implemented the backend logic to manage device communication, automation triggers, and user interactions. The system ensured secure and seamless connectivity between hardware components and the user interface.",
    tech: ["IoT", "C/C++", "Python", "Arduino", "ESP8266"],
    role: "Team Lead",
    company: "Abasyn University",
    duration: "2023",
    // image: "/media/images/home-automation.png",
  },
  {
    id: "selenium-bot",
    title: "Selenium Automation Bot",
    shortDesc:
      "Custom bot for streamlined browser tasks with robust exception handling.",
    description:
      "Developed a custom Selenium-based automation bot to streamline repetitive browser tasks such as form filling, data extraction, and submission across dynamic web platforms. The bot was designed with robust exception handling, dynamic wait conditions, and cross-browser compatibility to ensure smooth execution and error resilience. I also implemented unit tests to validate automation workflows.",
    tech: ["Python", "Selenium", "Automation", "Unit Testing"],
    role: "Python Developer",
    company: "Spacedome",
    duration: "2023",
    // image: "/media/images/selenium-bot.png",
  },
  {
    id: "private-cloud",
    title: "Private Cloud OpenStack",
    shortDesc:
      "Deployment of scalable private cloud infrastructure on Ubuntu servers.",
    description:
      "Designed and deployed a secure and scalable private cloud infrastructure using OpenStack on Ubuntu Linux servers. The project involved configuring compute, storage, and networking components to enable efficient resource allocation and virtualization. I also implemented access controls and network segmentation to ensure data security and system reliability.",
    tech: ["OpenStack", "Ubuntu Linux", "Shell Scripting", "Networking"],
    role: "Cloud Engineer Intern",
    company: "Abasyn University",
    duration: "2022",
    // image: "/media/images/private-cloud.png",
  },
];

   /* =========================================================
   Experiences
   ========================================================= */

export const experiences: Experience[] = [
  {
    id: "epazz-fullstack",
    title: "Full Stack Developer",
    company: "Epazz Tech",
    location: "Lahore",
    duration: "December 2025 - Present",
    description:
      "Building and maintaining full-stack web applications with modern frontend and backend technologies, focusing on scalable APIs, performance optimization, and clean UI/UX.",
    tech: ["React", "TypeScript", "Node.js", "REST APIs", "SQL", "Git"],
    contributions: [
      "Built and maintained scalable full-stack web applications using modern frontend frameworks and backend APIs, ensuring smooth performance and clean UI/UX across devices.",
      "Designed and integrated RESTful APIs with secure authentication and role-based access control, improving data security and overall system reliability.",
      "Optimized database queries and application logic to reduce response time and improve performance for data-heavy modules.",
      "Collaborated with cross-functional teams in Agile sprints, using Git for version control and Jira/Trello for task tracking to deliver features on time.",
      "Implemented reusable UI components and improved frontend architecture, making the codebase easier to maintain and extend.",
    ],
  },
  {
    id: "sanwa-dotnet",
    title: "ASP .NET Developer",
    company: "Sanwa Systems",
    location: "Islamabad",
    duration: "November 2023 - November 2025",
    description:
      "Architected and optimized key ERP modules and APIs to ensure reliable and accurate data exchange across warehouse, logistics, and finance systems.",
    tech: [".NET Core", "C#", "SQL Server", "REST APIs", "Git", "Jira"],
    contributions: [
      "Architected and optimized key ERP modules and APIs to ensure reliable and accurate data exchange across crucial business systems, including warehouse, logistics, and finance.",
      "Engineered robust Microsoft SQL Server queries and stored procedures, significantly reducing processing times and enforcing data integrity across the platform.",
      "Executed full-cycle data migrations and schema updates to support major ERP system upgrades, successfully maintaining consistency across all integrated modules.",
      "Collaborated in Agile sprints, utilizing Git for version control and Jira for coordination, resulting in the smooth and dependable delivery of complex, data-dependent features.",
    ],
  },
  {
    id: "spacedome-backend-python",
    title: "Backend Python Developer",
    company: "Spacedome (NASTP)",
    location: "Islamabad",
    duration: "May 2023 - April 2024",
    description:
      "Developed and maintained Python backend services and RESTful APIs using Django/Flask, improving reliability, validation, and scalability of backend systems.",
    tech: ["Python", "Django", "Flask", "REST APIs", "Selenium", "Postman"],
    contributions: [
      "Developed and maintained Python backend services and robust RESTful APIs (Django/Flask) to power high-performance, data-driven applications.",
      "Implemented advanced data validation and testing protocols using Selenium, which significantly increased reliability and reduced manual effort across core application workflows.",
      "Troubleshot and resolved critical data inconsistencies, contributing directly to the design and deployment of highly scalable backend microservices capable of handling increased load.",
    ],
  },
  {
    id: "spacedome-intern",
    title: "Intern",
    company: "Spacedome (NASTP)",
    location: "Islamabad",
    duration: "February 2023 - April 2023",
    description:
      "Worked on IoT-based automation and backend development tasks, contributing to scalable web apps and real-time monitoring systems.",
    tech: ["Python", "Django", "Flask", "PostgreSQL", "IoT"],
    contributions: [
      "Designed and developed an IoT-based home automation system with a focus on real-time data acquisition and monitoring, demonstrating expertise in sensor integration and data streams.",
      "Engineered scalable web applications using Django/Flask and PostgreSQL, establishing robust, structured data workflows capable of supporting future feature expansion and increased user load.",
    ],
    letterUrl: "/media/images/internship-letter.jpg",
  },
  {
    id: "wp-developer-2021",
    title: "WordPress Developer",
    company: "Freelance",
    location: "Remote",
    duration: "September 2021 - December 2021",
    description:
      "Delivered responsive, SEO-optimised websites for clients in the health, insurance, and digital marketing industries. Specialised in front-end customisation, theme integration, plugin configuration, and performance tuning.",
    tech: ["WordPress", "Elementor", "HTML", "CSS", "SEO", "Performance"],
    contributions: [
      "Built and delivered responsive, SEO-optimised WordPress websites across health, insurance, and digital marketing niches.",
      "Handled front-end customisation, theme integration, plugin configuration, and performance tuning to improve user experience and load times.",
      "Implemented lead-generation flows, conversion tracking, and scalable content sections for marketing and blog growth.",
    ],
    links: [
      { label: "GrooveHubMarketing.com", url: "https://groovehubmarketing.com/" },
      { label: "TopInsuranceDeals.com", url: "https://topinsurancedeals.com/index.html" },
      { label: "LinkLifeHealth.com", url: "https://linklifehealth.com/" },
    ],
  },
];

   /* =========================================================
  SkillCategory
   ========================================================= */

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", ".NET Core", "C#", "C++", "JavaScript", "SQL", "PHP"],
  },
  {
    title: "Frameworks",
    skills: ["Django", "Flask", ".NET MVC", "React", "Bootstrap", "Entity Framework"],
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

   /* =========================================================
  Education
   ========================================================= */

export const education: Education[] = [
  {
    id: "abasyn-uni",
    institution: "Abasyn University",
    degree: "Software Engineering & Cloud Tech",
    period: "2019 - 2023",
    desc: "Focus on backend systems, cloud infrastructure, and IoT automation.",
    details: [
      "Specialized in Cloud Computing and Backend System Architecture.",
      "Completed hands-on projects in Distributed Systems and OpenStack deployment.",
      "Lead developer for university tech events and competitions.",
      "CGPA: 3.5/4.0 - Major in Software Engineering.",
    ],
  },
  {
    id: "kallar-college",
    institution: "Kallar Kahar Science College",
    degree: "Pre-Engineering",
    period: "2017 - 2019",
    desc: "Intensive study of Mathematics and Physics.",
    details: [
      "Focused on Physics, Chemistry, and Advanced Mathematics.",
      "Top 5% of graduating class.",
      "Member of the Science Club and Mathematics Society.",
      "Developed strong analytical and problem-solving foundations.",
    ],
  },
];

   /* =========================================================
 Certification
   ========================================================= */
export const certifications: Certification[] = [
  {
    id: "ews-workshop-sdpi-2025",
    title: "Early Warning System Workshop",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Issued Nov 2025. Workshop covering community-based monitoring and Early Warning Systems (EWS), aligned with real-time data acquisition and IoT-based systems design.",
    skills: ["System Monitoring", "Data Acquisition", "Internet of Things (IoT)"],
    credentialUrl: "/media/Certificates/early-warning-system.pdf",

  },
  {
    id: "risk-thinking-sdpi-2025",
    title: "Safeguarding the Future: Integrating Risk Thinking into Development Planning",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Issued Nov 2025. Capacity building workshop focused on integrating risk assessment and strategic foresight into development planning and system architecture.",
    skills: ["Risk Management", "Strategic Planning", "System Architecture"],
    credentialUrl: "/media/Certificates/safeguard-the-future.pdf",
  },
  {
    id: "ai-policy-sdpi-2025",
    title:
      "Thinking Beyond Knowledge Dissemination in the Age of AI: A Policy Perspective for Future Public Learning",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Issued Nov 2025. Workshop exploring policy implications of Artificial Intelligence in public learning and knowledge dissemination.",
    skills: ["Policy Analysis", "Artificial Intelligence (AI)", "Public Learning"],
    credentialUrl: "/media/Certificates/thinking-beyond-knowledge.pdf",
  },
  {
    id: "python-for-everybody-2025",
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Issued Sep 2025. Credential ID: VZ7ZQ6K8MNZ9.",
    skills: ["Python (Programming Language)"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/VZ7ZQ6K8MNZ9",
  },
  {
    id: "linear-algebra-ml-2025",
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    year: "2025",
    description:
      "Issued Aug 2025. Credential ID: 93ZFAK7AQTB8.",
    skills: ["Linear Algebra", "Mathematics", "Machine Learning"],
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/93ZFAK7AQTB8",
  },
  {
    id: "python-data-structures-2025",
    title: "Python Data Structures",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Issued Aug 2025. Credential ID: 0QCN9ZOU2H3K.",
    skills: [
      "Python Programming",
      "Data Structures & Algorithms",
      "Problem Solving",
      "Computational Thinking",
      "Programming Fundamentals",
    ],
    credentialUrl: "https://coursera.org/verify/0QCN9ZOU2H3K",
  },
  {
    id: "probability-2025",
    title: "An Intuitive Introduction to Probability",
    issuer: "University of Zurich",
    year: "2025",
    description:
      "Issued Aug 2025. Credential ID: 7WCBNZ50OQAF.",
    skills: [
      "Probability & Statistics",
      "Data Analysis",
      "Statistical Modeling",
      "Quantitative Risk Analysis",
      "Problem Solving",
      "Predictive Analytics",
    ],
    credentialUrl: "https://coursera.org/verify/7WCBNZ50OQAF",
  },
  {
    id: "data-science-bootcamp-2025",
    title: "The Data Science Course: Complete Data Science Bootcamp 2025",
    issuer: "Udemy",
    year: "2025",
    description:
      "Issued Aug 2025. Credential ID: UC-ea5fde42-65ae-4b26-87f0-4877ebc0cdfe.",
    skills: ["Python (Programming Language)", "Data Science", "Machine Learning"],
    credentialUrl: "https://www.udemy.com/certificate/UC-ed5e4e92-c5aa-42c5-870b-4879ebc0a5fe/",
  },
  {
    id: "cloud-computing-2022",
    title: "Cloud Computing",
    issuer: "Pakistan Software Export Board (PSEB)",
    year: "2022",
    description:
      "Issued Jun 2022. Expired Aug 2022.",
    skills: ["Cloud Computing"],
  },
  {
    id: "certified-python-programmer-2019",
    title: "Certified Python Programmer",
    issuer: "Aptech",
    year: "2019",
    description:
      "Issued Aug 2019. Certification covering Python programming with OOP principles and Flask.",
    skills: [
      "Python (Programming Language)",
      "Object-Oriented Programming (OOP)",
      "Flask",
    ],
  },
];
