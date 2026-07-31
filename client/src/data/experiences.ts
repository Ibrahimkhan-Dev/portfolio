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
    title: "Full-Stack Developer",
    company: "Epazz Tech",
    location: "Lahore, Pakistan",
    duration: "December 2025 - Present",
    description:
      "I work as a Full-Stack Developer at Epazz Tech, contributing to the development and modernization of multi-tenant healthcare and pharmaceutical traceability platforms. My work spans backend APIs, Angular and Flutter applications, relational databases, authentication, role-based access control, regulatory requirements, automated testing, and production-focused quality assurance.",
    contributions: [
      "Contributing to the modernization of a multi-tenant Electronic Health Record platform from .NET Framework to .NET 8 by developing REST APIs, implementing Angular interfaces, and supporting secure tenant-isolated healthcare workflows.",
      "Supporting ONC certification initiatives through work related to healthcare interoperability, regulatory requirements, standardized data exchange, and Electronic Health Information export capabilities.",
      "Contributing to HIPAA-aligned security improvements involving data privacy, authentication, authorization, access control, auditability, and protection of sensitive healthcare information.",
      "Developed and validated ZenaTrace, a multi-tenant pharmaceutical supply-chain traceability platform built with Angular, ASP.NET Core, SQL Server, Redis, Amazon S3, and Flutter.",
      "Worked across ZenaTrace features including master data, serialization, commissioning, aggregations, shipments, traceability, role-based permissions, tenant isolation, secure browser and mobile authentication, and responsive application workflows.",
      "Used AI-assisted development tools under my direction to accelerate implementation, while personally reviewing architecture, validating requirements, identifying defects, testing security-sensitive workflows, and verifying production readiness.",
      "Collaborating within a three-developer Agile team and coordinating with international management and cross-functional stakeholders to deliver secure, maintainable, and production-ready software.",
    ],
    tech: [
      "Multi-Tenant Systems",
      "Healthcare Software",
      "EHR Systems",
      "Pharmaceutical Traceability",
      "ONC Certification",
      "HIPAA",
      ".NET 8",
      "ASP.NET Core",
      "REST APIs",
      "Angular",
      "Flutter",
      "SQL Server",
      "Redis",
      "Amazon S3",
      "Authentication",
      "RBAC",
      "Automated Testing",
      "Agile",
      "Git",
    ],
  },
  {
    id: "sanwa-dotnet",
    title: "ASP.NET Developer",
    company: "Sanwa Systems",
    location: "Islamabad, Pakistan",
    duration: "November 2023 - November 2025",
    description:
      "I worked as an ASP.NET Developer at Sanwa Systems, developing, maintaining, and modernizing enterprise ERP solutions for an automotive spare-parts business operating across the UAE and United States. My work covered backend development, Angular integration, SQL Server database engineering, business-process automation, cloud deployment, and close collaboration with the product owner to translate operational requirements into production software.",
    contributions: [
      "Maintained and enhanced a legacy enterprise ERP platform built with ASP.NET MVC, C#, Entity Framework, and SQL Server.",
      "Contributed to the modernization of the ERP platform using ASP.NET Core and Angular, helping transition legacy workflows toward a more maintainable and scalable architecture.",
      "Independently designed and developed major business modules covering inventory management, warehouse operations, logistics workflows, and export-related processes.",
      "Implemented backend services, business rules, data-validation workflows, and database integrations supporting day-to-day automotive spare-parts operations.",
      "Developed and optimized SQL Server queries, stored procedures, database structures, and data-access workflows using SQL Server Management Studio.",
      "Supported B2B, B2C, HRM, ERP, and mobile-connected business workflows across an integrated enterprise software ecosystem.",
      "Gained hands-on experience deploying and maintaining .NET applications in Microsoft Azure hosting environments.",
      "Applied MVC architecture, separation of concerns, Entity Framework patterns, and structured enterprise development practices across production modules.",
      "Collaborated directly with the CEO and product owner to understand operational requirements and align software features with real-world business processes in the UAE and United States.",
      "Investigated production issues, resolved functional defects, and supported the reliability and continued operation of business-critical ERP workflows.",
    ],
    tech: [
      "Enterprise ERP",
      "Automotive Software",
      "ASP.NET Core",
      "ASP.NET MVC",
      "C#",
      "Angular",
      "Entity Framework",
      "REST APIs",
      "SQL Server",
      "Stored Procedures",
      "SSMS",
      "Microsoft Azure",
      "B2B",
      "B2C",
      "Git",
    ],
  },
  {
    id: "spacedome-backend-python",
    title: "Part-Time Backend Python Developer",
    company: "Spacedome (NASTP)",
    location: "Islamabad, Pakistan",
    duration: "May 2023 - April 2024",
    description:
      "I worked part-time as a Backend Python Developer at Spacedome while completing my undergraduate studies. I supported backend development, browser automation, structured data collection, and system-integration initiatives for AI-focused research and hardware-related projects within a fast-moving startup environment.",
    contributions: [
      "Supported the development and maintenance of Python-based backend services and REST APIs using Django and Flask.",
      "Built and maintained Selenium automation tools for browser-based workflows, structured data extraction, and repetitive task automation.",
      "Developed Python scripts to collect, clean, organize, and prepare structured data for AI research and system-integration requirements.",
      "Implemented web-scraping workflows with validation and error-handling logic to improve the reliability of automated data collection.",
      "Tested and validated backend endpoints and integration workflows using Postman.",
      "Contributed to backend architecture discussions, API workflows, and automation solutions within a small, fast-paced startup team.",
      "Balanced part-time professional development responsibilities with undergraduate studies while gaining practical experience in backend development and automation.",
    ],
    tech: [
      "Backend Development",
      "Python",
      "Django",
      "Flask",
      "REST APIs",
      "Selenium",
      "Web Automation",
      "Web Scraping",
      "Data Extraction",
      "Postman",
    ],
  },
  {
    id: "spacedome-intern",
    title: "Software Development Intern",
    company: "Spacedome (NASTP)",
    location: "Islamabad, Pakistan",
    duration: "February 2023 - April 2023",
    description:
      "I joined Spacedome as a Software Development Intern for my first professional industry experience, contributing to an IoT-based automation initiative and gaining practical exposure to backend development, sensor data processing, databases, and hardware-software integration within an AI-focused startup environment.",
    contributions: [
      "Supported the development of an IoT-based automation system involving sensor data collection, processing, and real-time monitoring.",
      "Assisted with Python-based backend development tasks using Django and Flask.",
      "Worked with PostgreSQL to store, organize, and manage data generated by connected devices.",
      "Learned how sensors and hardware devices communicate with backend services through APIs and integration workflows.",
      "Supported testing and troubleshooting of hardware-software communication and data-processing flows.",
      "Developed foundational knowledge of system architecture, API communication, databases, IoT workflows, and real-world software delivery.",
      "Collaborated within a small research-driven startup team and gained experience working in a fast-paced professional environment.",
    ],
    tech: [
      "IoT",
      "Python",
      "Django",
      "Flask",
      "REST APIs",
      "PostgreSQL",
      "Sensor Data",
      "Hardware Integration",
      "Backend Development",
    ],
  },
  {
    id: "wp-developer-2021",
    title: "Freelance WordPress Developer",
    company: "Freelance",
    location: "Remote",
    duration: "September 2021 - December 2021",
    description:
      "I worked directly with independent clients to design, develop, and deliver responsive business websites for the healthcare, insurance, and digital-marketing sectors. My responsibilities covered requirements gathering, WordPress implementation, visual customization, performance optimization, SEO configuration, and post-delivery revisions.",
    contributions: [
      "Designed and developed responsive WordPress websites based on individual client requirements and business goals.",
      "Customized WordPress themes and created page layouts using Elementor, HTML, and CSS.",
      "Configured plugins supporting search-engine optimization, website security, contact forms, backups, and performance.",
      "Improved page-loading performance and mobile responsiveness through image optimization, plugin review, and layout adjustments.",
      "Implemented contact forms and basic lead-generation workflows to support customer inquiries and business conversions.",
      "Tested websites across desktop and mobile devices to identify and resolve layout, usability, and compatibility issues.",
      "Communicated directly with clients to gather requirements, present progress, incorporate feedback, and deliver revisions.",
      "Managed website delivery independently from initial discussion through implementation and final handover.",
    ],
    tech: [
      "WordPress",
      "Elementor",
      "HTML",
      "CSS",
      "Responsive Design",
      "SEO",
      "Performance Optimization",
      "Plugin Configuration",
      "Client Communication",
    ],
    links: [
      {
        label: "GrooveHubMarketing.com",
        url: "https://groovehubmarketing.com/",
      },
      {
        label: "TopInsuranceDeals.com",
        url: "https://topinsurancedeals.com/index.html",
      },
      {
        label: "LinkLifeHealth.com",
        url: "https://linklifehealth.com/",
      },
    ],
  },
];
