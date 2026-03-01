// client/src/data/portfolio.ts

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

  icon?: string; // optional (we’ll keep undefined for now)
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
      "Epazz Tech is a multinational technology company with 450+ employees in Pakistan, operating across software development, AI engineering, drone technologies, mobile applications, and enterprise solutions, with executive leadership based in the USA. As a Full Stack Developer, I am part of the healthcare software team, contributing to enterprise-level system modernization and compliance-driven development.",
    contributions: [
      "Revamping a legacy EHR (Electronic Health Record) system from .NET Framework to .NET Core 8, developing scalable REST APIs and implementing a modern Angular 20 frontend.",
      "Contributing to ONC Certification requirements, ensuring regulatory compliance and system interoperability standards.",
      "Working on HIPAA compliance implementation, strengthening data privacy, secure authentication, and healthcare data protection.",
      "Collaborating within a team of 6 developers in an Agile environment to deliver secure, production-ready healthcare solutions.",
      "Gaining experience in large-scale enterprise development, structured workflows, and coordination with international management and cross-functional teams.",
    ],
    tech: ["EHR System", "ONC Certification", "Hipaa Compliance", ".NET Core 8", "REST APIs", "Angular 20", "SQL", "Agile", "Git",],
  },
  {
    id: "sanwa-dotnet",
    title: "ASP .NET Developer",
    company: "Sanwa Systems",
    location: "Islamabad",
    duration: "November 2023 - November 2025",
    description:
      "Sanwa Systems is a growing software house (30–40 employees) developing and maintaining internal business solutions for a UAE and USA-based automotive spare parts enterprise. The company builds and manages ERP, HRM, B2B, B2C platforms, and mobile ERP applications for Android and iOS.As a .NET Developer, I worked on maintaining and modernizing the company’s core ERP system.",
    contributions: [
      "Maintained and enhanced a legacy ERP system built with ASP .NET MVC and Entity Framework.",
      "Contributed to the revamp of the ERP system using .NET Core and Angular, supporting modernization efforts.",
      "Designed and developed complete modules independently, including: Inventory Management,Warehouse Management,Logistics Management,Export-related functionalities",
      "Developed and optimized SQL Server queries, stored procedures, and database structures using SSMS.",
      "Gained hands-on experience with Azure server deployment and hosting environments.",
      "Learned and implemented MVC architecture principles and enterprise-level backend workflows.",
      "Collaborated closely with the CEO (product owner) to align software features with real-world business operations in UAE and USA markets.",
    ],
    tech: ["ERP System",".NET Core", "ASP .NET MVC", "Entity Framework", "C#", "SQL Server", "SSMS", "Azure","Git"],
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
      "Collaborated in a small startup environment, contributing to fast-paced development cycles."
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
    letterUrl: "/media/images/internship-letter.jpg",
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
      "mplemented contact forms and basic lead-generation workflows.",
      "Communicated directly with clients to gather requirements and deliver revisions.",
    ],
     tech: ["WordPress", "Elementor", "HTML", "CSS", "SEO", "Performance"],
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
    credentialUrl: "https://www.udemy.com/certificate/UC-ea5fde42-65ae-4b26-87f0-4877ebc0cdfe/",
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
