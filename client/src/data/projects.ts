import type { ReactNode } from "react";

export type Project = {
  id: string;

  title: string;
  shortDesc: string;
  tech: string[];

  description: string;
  role?: string;
  company?: string;
  duration?: string;

  category?: string;
  team?: string;
  supervisor?: string;

  context?: string;
  purpose?: string;
  constraints?: string;
  beforeState?: string;
  whatChanged?: string;
  outcome?: string;

  highlights?: string[];
  evidence?: { label: string; url?: string; gallery?: string[] }[];

  proofNote?: string;
  ctaLabel?: string;

  image?: string;
  gallery?: string[];

  liveUrl?: string;
  sourceUrl?: string;

  icon?: ReactNode;
};

export const projects: Project[] = [
  {
    id: "ehr-system",
    title: "EHR System Legacy Support & Modernization",
    shortDesc:
      "Contributing to EHR modernization from .NET Framework to .NET 8 and Angular at Epazz — while maintaining stability in the live legacy clinical platform.",

    description:
      "A confidential healthcare platform case study completed at Epazz. I worked across both the legacy system and its newer modernization stack. On the old platform, I handled bug fixing, issue investigation, and support-ticket resolution across long-lived healthcare modules. In parallel, I contributed to the newer stack built with Angular and ASP.NET Core APIs, supporting a more maintainable and scalable direction for the system without exposing product or client identity.",

    tech: [
      "C#",
      ".NET Framework",
      "ASP.NET WebForms",
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular",
      "TypeScript",
      "SQL Server",
      "Entity Framework",
      "Entity Framework Core",
      "JWT Authentication",
      "Duende IdentityServer",
    ],

    role: "Full Stack Developer",
    company: "Epazz",
    duration: "Ongoing",
    category: "Confidential Healthcare Platform Case Study",
    team: "Team-based project",

    context:
      "A confidential healthcare system environment with a large legacy codebase and a newer API-driven modernization effort running in parallel. The platform supports clinical and operational workflows such as referrals, intake, provider management, service plans, notes, reporting, and related healthcare processes.",

    purpose:
      "To maintain stability in the legacy healthcare platform through bug fixes and support work while also contributing to the transition toward a newer Angular and .NET-based architecture.",

    constraints:
      "Worked in a confidential healthcare environment with a broad legacy surface area, mixed framework generations, production support demands, and the need to make safe changes while modernization continued.",

    beforeState:
      "The system included an older long-lived codebase used for active support and issue resolution, while a newer frontend and backend stack was being developed to improve maintainability, scalability, and architectural clarity.",

    whatChanged:
      "Handled bug fixing and support-ticket work in the legacy EHR codebase, including troubleshooting existing healthcare modules and stabilizing operational workflows. At the same time, contributed to the newer stack through work aligned with Angular frontend development and ASP.NET Core/.NET 8 backend services, helping move the platform toward a cleaner layered architecture and more modern API-driven workflows.",

    outcome:
      "Helped keep the legacy healthcare platform operational and supportable while also contributing to its modernization path, improving reliability in the old environment and supporting progress on the newer stack.",

    highlights: [
      "Fixed bugs and resolved support tickets in a legacy EHR codebase.",
      "Worked across an older healthcare platform with long-lived modules and shared system components.",
      "Contributed in parallel to a newer Angular and .NET 8 modernization effort.",
      "Supported API-driven backend development with SQL-backed healthcare workflows.",
      "Balanced production support responsibilities with modernization work in the same product ecosystem.",
      "Presented as a confidential healthcare case study without exposing product or client identity.",
    ],

    proofNote:
      "This project was completed as confidential healthcare platform work at Epazz. Product identity, client references, source code, and internal system assets are not shared publicly. The portfolio presentation focuses on my engineering contribution across legacy support and modernization work.",

    ctaLabel: "View Case Study",
  },

  //===================================================================//

  {
    id: "onc-ehi-export",
    title: "ONC EHI Export & Security Compliance for an EHR System",
    shortDesc:
      "As part of the Epazz Tech team, I individually developed key backend functionality for an EHR system to support ONC §170.315(b)(10) EHI export and related security requirements around authentication, access control, and protected credential handling.",

    description:
      "A confidential healthcare compliance case study completed at Epazz Tech for an EHR system. The platform combined standards-based FHIR APIs under /fhir with a non-FHIR EHI export capability under /ehi for ONC certification support. Working as a team member, I individually developed core backend functionality that helped satisfy ONC §170.315(b)(10), with related support for §170.315(d)(1) authentication, access control, and authorization, plus §170.315(d)(12) encrypted credential protection. My work focused on export flows, authorization-aware access, auditability, artifact structure, and operational guardrails needed for a certification-ready implementation.",

    tech: [
      "C#",
      ".NET 9",
      "ASP.NET Core Web API",
      "SQL Server",
      "JWT Bearer Authentication",
      "Duende IdentityServer",
      "HL7 FHIR R4",
      "Background Job Processing",
    ],

    role: "Backend .NET Developer (Team Member)",
    company: "Epazz Tech",
    category: "Confidential Healthcare Compliance Case Study",
    team: "Team-based project",

    context:
      "Healthcare platform and EHR system API work where ONC certification support required a structured, electronic, and computable EHI export capability, with clear separation between standards-based FHIR APIs and the ONC-specific non-FHIR export workflow.",

    purpose:
      "To help an EHR system support ONC certification-focused capabilities by enabling auditable EHI export for single-patient and population scenarios while reinforcing secure access and compliance-oriented backend behavior.",

    constraints:
      "Worked in a confidential healthcare environment with certification-driven requirements, sensitive data handling, strict authorization rules, auditability needs, and the requirement to clearly distinguish FHIR interoperability features from ONC-specific /ehi export behavior.",

    beforeState:
      "The product needed a certification-ready export story that documented the format publicly, supported structured single-patient and population export workflows, enforced access rules, and produced auditable evidence suitable for technical and compliance review.",

    whatChanged:
      "Individually developed key backend functionality for the ONC export workflow, including a public export-format description, single-patient and population export endpoints, ZIP artifact generation with manifest.json and dataset JSON files, export audit history, and guardrails around filters, limits, and timeouts. I also supported authentication, authorization, and security-aligned behavior for protected export routes through JWT-based access, policy checks, patient-context enforcement, and compliance-oriented handling around credential protection and transport security.",

    outcome:
      "Helped turn the ONC work into a clearer, more auditable, and more implementation-ready certification case by supporting structured EHI export, stronger access-control alignment, transparent sensitive-data exclusion behavior, and evidence that reviewers could verify through documented endpoints, artifacts, and audit records.",

    highlights: [
      "Individually developed key backend functionality supporting ONC §170.315(b)(10) EHI export within a team-based healthcare platform project.",
      "Implemented public export-format documentation plus single-patient and population export workflows under /ehi.",
      "Built structured export artifacts using ZIP packaging with manifest metadata and dataset-level JSON output.",
      "Added auditable export tracking with start, complete, and fail states, artifact hashes, and per-dataset counts.",
      "Supported §170.315(d)(1) through authenticated access, authorization policies, and patient-context enforcement for protected routes.",
      "Supported §170.315(d)(12) through compliance-aligned credential and transport security expectations, including protected handling and TLS-oriented controls.",
    ],

    evidence: [
      {
        label: "Selected Technical Evidence",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace1_qrf5kq.png",
        ],
      },
    ],

    proofNote:
      "This project was completed as confidential healthcare platform work tied to ONC certification support for an EHR system. Public source code, production access, and internal certification assets are not shared publicly. The portfolio presentation focuses on system context, my specific backend ownership, documented export behavior, and sanitized supporting material where permitted.",
    ctaLabel: "View Case Study",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369450/EHR-CB-084a-Drummond-ONC-Health-IT-Certified-Seal-1024x1024_vzv5xv.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369450/EHR-CB-084a-Drummond-ONC-Health-IT-Certified-Seal-1024x1024_vzv5xv.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774514183/Screenshot_2026-03-26_133550_gmpsa7.png",
    ],
  },

  //===================================================================//

  {
    id: "erp-system",
    title: "Enterprise Resource Planning System Modernization",
    shortDesc:
      "Primarily designed and developed core logistics, order, and warehouse management workflows while supporting the modernization of a legacy ERP into a .NET 8 and Angular-based platform.",

    description:
      "A confidential enterprise ERP case study completed at Sanwa Systems. I worked across both the legacy .NET MVC ERP and its newer modernization effort built with .NET 8 APIs and an Angular frontend. My strongest ownership was in the logistics, order, and warehouse management areas, where I primarily designed and developed core workflows and backend functionality. I also maintained existing ERP features, built and improved APIs, optimized SQL-backed operations, and resolved complex issues to support reliability, scalability, and smoother business operations.",

    tech: [
      "C#",
      ".NET MVC",
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular",
      "JavaScript",
      "SQL Server",
      "REST API",
      "Git",
      "Jira",
    ],

    role: "Backend .NET Developer",
    company: "Sanwa Systems",
    duration: "December/2023 – December/2025",
    category: "ERP System Modernization",

    context:
      "Enterprise ERP environment supporting business-critical workflows across logistics, order processing, warehouse operations, inventory handling, and related operational modules.",

    purpose:
      "To maintain business continuity in the legacy ERP while helping modernize core workflows through a newer API-driven architecture using .NET 8 and Angular.",

    constraints:
      "Worked within a confidential enterprise environment involving legacy dependencies, production reliability needs, business-rule complexity, and coordination across teams during an active modernization phase.",

    beforeState:
      "The older ERP platform was built in .NET MVC and required ongoing maintenance and enhancement while newer architecture and workflows were being introduced.",

    whatChanged:
      "Primarily designed and developed core logistics, order, and warehouse management workflows, maintained parts of the legacy MVC-based ERP, and contributed to the newer revamp through backend API development in .NET 8. Improved backend performance, resolved complex issues, and helped move critical workflows toward a more scalable API-based architecture integrated with Angular.",

    outcome:
      "Helped sustain critical ERP operations, improved reliability and backend performance, and advanced the modernization of key operational workflows in logistics, order handling, and warehouse management.",

    highlights: [
      "Primarily designed and developed core logistics, order, and warehouse management workflows.",
      "Maintained and enhanced legacy ERP functionality built with .NET MVC.",
      "Contributed to ERP modernization using .NET 8 APIs and Angular.",
      "Built and improved backend logic, APIs, and SQL-driven operations.",
      "Optimized performance and resolved complex production-oriented issues.",
      "Collaborated with cross-functional agile teams through code reviews, sprint planning, and delivery coordination.",
    ],

    evidence: [
      {
        label: "Legacy ERP",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169233/Capture12_bxq4hk.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169232/Capture_1_lidnoq.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169232/ADD_PRODUCT_1_1_ddhgjh.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169232/Capture88_tlxnd3.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169231/Capture2_hi6jqw.png",
        ],
      },
      {
        label: "After Modernization",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774170381/login_system_z3f6ko.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774367564/Screenshot_2026-03-22_135237_domqrn.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169983/order_managment_m6q0bs.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169982/Order_Pickup_ynxwjk.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169983/Warehouse_rhzczd.png",
        ],
      },
    ],

    proofNote:
      "This project was completed as confidential enterprise work. Public source code, production screenshots, and internal workflows are not shared publicly. Portfolio presentation focuses on system context, my role, modernization scope, and sanitized supporting material where permitted.",

    ctaLabel: "View Case Study",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774170381/login_system_z3f6ko.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774367564/Screenshot_2026-03-22_135237_domqrn.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169233/Capture12_bxq4hk.png",
    ],
  },

  //===================================================================//

  {
    id: "home-automation",
    title: "Home Automation System Using IoT",
    shortDesc:
      "Supervised final-year thesis project where I built the Flutter app, Django APIs, and Arduino-based hardware logic for an IoT home automation system.",

    description:
      "A supervised final-year bachelor's thesis completed under Mr. Abdul Hannan, Assistant Professor. I built the Flutter mobile application, developed Django/Python APIs to handle communication between the app and IoT devices, and programmed the hardware logic in Arduino IDE for device control and sensor-based interaction. The system was designed to improve convenience, efficiency, and home-device management by combining mobile control, backend communication, and hardware automation in one integrated solution.",

    tech: [
      "Flutter",
      "Django",
      "Python",
      "Arduino IDE",
      "C/C++",
      "IoT",
      "ESP8266",
    ],

    role: "Mobile, API & IoT Developer",
    company: "Abasyn University",
    duration: "2023-2024",
    category: "Bachelor's Final Year Project",
    supervisor: "Mr. Abdul Hannan, Assistant Professor",

    context:
      "Bachelor's final-year thesis project developed in an academic environment to explore practical home automation through mobile software, backend APIs, and IoT hardware integration.",

    purpose:
      "To build a home automation system that allows users to monitor and control household appliances through a mobile app connected to IoT hardware via backend APIs.",

    whatChanged:
      "Built the Flutter app as the user-facing control layer, developed Django/Python APIs for communication between the application and IoT devices, and programmed the Arduino-based hardware logic for appliance control and sensor-driven behavior.",

    highlights: [
      "Built the Flutter mobile application for controlling and monitoring home devices.",
      "Developed Django/Python APIs to connect the mobile app with IoT hardware.",
      "Programmed Arduino-based device logic and hardware behavior.",
      "Integrated software, backend communication, and physical hardware into one working system.",
      "Supported home automation use cases such as appliance control, monitoring, and sensor-based interaction.",
      "Backed the project with thesis documentation, hardware photos, and demo videos.",
    ],

    evidence: [
      {
        label: "System Diagrams",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/Sequence_Diagram_nt7r6i.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078921/ER_Diagram_c07eow.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/circuit_Diagram_zsz7dz.png",
        ],
      },
      {
        label: "App screenshots",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Logo_efqyjk.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018658/Signup_screen_odkj6y.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Login_screen_vtyxv0.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Home_screen_vxhuaw.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Bedroom_light_voxa2c.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018658/Scheduling_Screen_msuzic.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Bathroom_Fan_b4tagd.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Kitchen_Screen_r7ynom.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Automation_Screen_eke30n.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Profile_Screen_wkgf32.jpg",
        ],
      },
      {
        label: "Hardware setup photos",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050503/1_wdieil.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050503/2_odttch.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/3_udpsuu.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/4_a781kz.jpg",
        ],
      },
      {
        label: "Demo videos",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/2_cy6cb2.mp4",
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/3_wm4fl1.mp4",
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/4_bjimkt.mp4",
        ],
      },
      {
        label: "Thesis abstract",
        url: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050551/Home_Automation_System_Ibrahim_final_dmxbyn.pdf",
      },
    ],

    proofNote:
      "This project was completed as a supervised final-year academic thesis. Portfolio evidence includes original app screenshots, hardware photos, demo videos, and thesis-based documentation.",

    ctaLabel: "Documentation & Media",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Logo_efqyjk.jpg",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Home_screen_vxhuaw.jpg",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/4_a781kz.jpg",
    ],
  },

  //===================================================================//

  {
    id: "selenium-bot",
    title: "Selenium-Based Web Automation Bot",
    shortDesc:
      "Built a confidential Selenium automation bot with one teammate to handle web scraping, form workflows, and location-based IP switching across browser tasks.",
    description:
      "A confidential automation project completed at Spacedome by a 2-member team. We developed a Selenium-based bot to automate repetitive browser workflows such as web scraping, form filling, and submission tasks across dynamic websites. The solution also supported IP changes based on postal-code requirements, with exception handling and wait logic to improve execution reliability across different workflow conditions.",
    tech: [
      "Python",
      "Selenium",
      "Automation",
      "Web Scraping",
      "Browser Automation",
    ],
    role: "Python Developer",
    company: "Spacedome",
    duration: "2023",
    category: "Confidential Enterprise Case Study",
    team: "2 members",
    purpose:
      "To automate repetitive browser-based workflows and support location-sensitive task execution more efficiently.",
    highlights: [
      "Automated form filling, submission, and repetitive browser workflows.",
      "Supported web scraping across dynamic web pages.",
      "Handled location-based IP changes according to postal-code requirements.",
      "Improved workflow reliability with exception handling and wait conditions.",
      "Built as a confidential company-associated solution by a 2-member team.",
    ],
    proofNote:
      "This project was completed as confidential company-associated work. Source code, workflow access, and screenshots are not publicly available.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596211/Bot_bxy54a.png",
    ],
  },

  //===================================================================//

  {
    id: "private-cloud",
    title: "University Private Cloud Lab with OpenStack",
    shortDesc:
      "Built a learning-focused private cloud lab with a 4-member university team by connecting five PCs and configuring an OpenStack-based local cloud environment.",
    description:
      "A hands-on academic team project completed under Prof. Asad Hanif at Abasyn University. We configured a functional private cloud using five university lab PCs — one acting as the controller node — connected over a dedicated local network. The exercise gave practical experience in cloud provisioning, tenant isolation, inter-node networking, and OpenStack dashboard operations that theory alone cannot replicate.",
    tech: [
      "OpenStack",
      "Ubuntu Linux",
      "Networking",
      "Virtualization",
      "Linux",
    ],
    role: "Team Member",
    company: "Abasyn University",
    duration: "2022",
    category: "Academic Infrastructure Project",
    team: "4 members",
    supervisor: "Prof. Asad Hanif",
    purpose:
      "Learning-focused deployment of a local private cloud using available university hardware.",
    highlights: [
      "Designed a 5-node topology with dedicated controller and compute roles.",
      "Configured static IP addressing and inter-node connectivity across all machines.",
      "Deployed OpenStack services (Nova, Neutron, Glance, Keystone) in a real environment.",
      "Provisioned virtual machines and validated tenant isolation on live hardware.",
      "Gained hands-on exposure to cloud infrastructure concepts beyond coursework.",
    ],
    proofNote:
      "The original setup was built as a university lab activity and public screenshots from the original environment are not available. Supporting diagrams shown here are reconstructed for portfolio presentation.",
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596191/architecture-diagram_us3bcq.png",
    ],
  },
];
