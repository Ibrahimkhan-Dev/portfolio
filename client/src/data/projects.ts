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
    id: "zenatrace",
    title: "ZenaTrace Pharmaceutical Traceability Platform",
    shortDesc:
      "Developed and validated a multi-tenant web platform for pharmaceutical serialization and supply-chain traceability, with a separate Flutter mobile R&D track.",

    description:
      "ZenaTrace is a multi-tenant pharmaceutical supply-chain traceability platform developed at Epazz Tech. My work covered requirements analysis, full-stack implementation, frontend and backend integration, authentication, tenant isolation, role-based access, responsive quality assurance, and testing. The completed Angular web MVP supports master data, serial generation and import, commissioning, aggregation, shipments, trace events, audit logs, search, file handling, imports and exports, dashboards, and administration. A separate Flutter application is being developed as a mobile R&D track and is not presented here as a production mobile release.",

    tech: [
      "Angular",
      "TypeScript",
      ".NET 8",
      "ASP.NET Core",
      "C#",
      "SQL Server",
      "Entity Framework Core",
      "REST APIs",
      "SQL Server Full-Text Search",
      "Redis",
      "SQL Server Outbox",
      "Amazon S3",
      "JWT Authentication",
      "Refresh Token Rotation",
      "Flutter",
      "Dart",
      "Playwright",
    ],

    role: "Full-Stack Developer",
    company: "Epazz Tech",
    duration: "2026 - Present",
    category: "Enterprise Pharmaceutical Traceability",
    team: "Epazz Tech product project",

    context:
      "Pharmaceutical and other compliance-focused supply chains need accurate product identity, controlled serial-number lifecycles, clear shipment history, tenant-isolated data, permission-based access, and reliable audit evidence. ZenaTrace brings these workflows together in one enterprise platform.",

    purpose:
      "To provide a secure and maintainable foundation for managing pharmaceutical master data, serialized products, packaging relationships, shipment operations, traceability records, audit evidence, imports, exports, files, and tenant-level administration.",

    constraints:
      "The project had to follow a fixed MVP scope, preserve strict tenant isolation, enforce action-level permissions, protect security-sensitive workflows, maintain trace and audit history, and avoid claiming regulatory integrations or certifications that were outside the approved release boundary.",

    beforeState:
      "The project began with separate scope, permission, technical-stack, data-model, API, UI/UX, and implementation documents. These requirements needed to be converted into one consistent application without introducing undocumented workflows, permissions, database fields, or API behavior.",

    whatChanged:
      "Converted the approved baselines into an Angular web portal, ASP.NET Core REST API, and SQL Server data model. Developed and reviewed workflows for products, GTINs, lots, partners, locations, serial batches, serial numbers, imports, commissioning, aggregations, shipments, trace events, exports, files, users, roles, permissions, settings, and dashboards. Added tenant-aware data access, role-based authorization, audit and trace records, SQL Server Full-Text Search, Redis caching, Amazon S3-backed file handling, SQL Server Outbox processing, and separate browser and mobile authentication flows.",

    outcome:
      "Delivered a working and test-backed web MVP that combines core pharmaceutical serialization and traceability workflows in one tenant-aware platform. The implementation also provides a stable backend foundation for the separate Flutter mobile R&D track and future product phases.",

    highlights: [
      "Developed and reviewed tenant-aware workflows for products, GTINs, lots, partners, locations, serial batches, and serial numbers.",
      "Implemented serialization workflows covering serial generation, CSV import, duplicate validation, status tracking, commissioning, and controlled lifecycle actions.",
      "Supported packaging hierarchies through aggregation workflows for items, cases, pallets, and bundles.",
      "Developed shipment workflows covering item assignment, shipping, receiving, cancellation, exception handling, and trace-history updates.",
      "Applied granular permissions across frontend routes, user actions, and protected backend endpoints while keeping backend authorization as the final security boundary.",
      "Implemented separate browser and mobile authentication flows with short-lived access tokens, refresh-token rotation, revocation, reuse detection, browser HttpOnly cookies, and mobile secure storage.",
      "Added trace events, audit logs, import and export jobs, S3-backed file metadata, full-text search, Redis caching, and SQL Server Outbox processing.",
      "Reviewed 37 application pages across seven viewport sizes through a responsive audit that produced 259 screenshots.",
      "Recorded verification checkpoints included 224 passing Playwright end-to-end tests, 99 passing Angular unit tests, and 613 passing backend tests, with no failures in those runs.",
    ],

    evidence: [
      {
        label: "Web Portal",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/login_screen_s1pyac.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/Dashboard_light_mode_unfbvw.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/Dashboard_dark_mode_yltlga.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/product_page_zam32y.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/audit_log_ugjvga.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504030/roles_and_permission_lo9pq1.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/permissions_cpecqr.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504030/user_list_qksdj3.png",
        ],
      },
      // {
      //   label: "Responsive Views",
      //   gallery: [
      //     "PASTE_APPROVED_DESKTOP_SCREENSHOT_URL_HERE",
      //     "PASTE_APPROVED_TABLET_SCREENSHOT_URL_HERE",
      //     "PASTE_APPROVED_MOBILE_SCREENSHOT_URL_HERE",
      //   ],
      // },
      // {
      //   label: "Architecture and Authentication",
      //   gallery: [
      //     "PASTE_SANITIZED_ARCHITECTURE_DIAGRAM_URL_HERE",
      //     "PASTE_SANITIZED_AUTH_FLOW_URL_HERE",
      //   ],
      // },
      // {
      //   label: "Testing and QA",
      //   gallery: [
      //     "PASTE_TEST_SUMMARY_URL_HERE",
      //     "PASTE_RESPONSIVE_QA_SUMMARY_URL_HERE",
      //   ],
      // },
      // {
      //   label: "Flutter Mobile R&D",
      //   gallery: [
      //     "PASTE_APPROVED_MOBILE_SCREENSHOT_URL_1_HERE",
      //     "PASTE_APPROVED_MOBILE_SCREENSHOT_URL_2_HERE",
      //   ],
      // },
    ],

    proofNote:
      "This is a confidential Epazz Tech company project. Only employer-approved, sanitized visuals should be published. I used ChatGPT and Claude as coding assistants for analysis, implementation support, and review, while remaining responsible for interpreting the approved documents, directing tasks, reviewing code and architecture, running verification, identifying defects, and accepting or rejecting changes. This case study presents the completed Angular web MVP and a separate Flutter mobile R&D track. It does not claim full DSCSA or EU FMD network integration, EPCIS certification, GS1 certification, production IoT integration, or a production mobile/offline release. Test numbers represent recorded project checkpoints and may change as development continues.",

    ctaLabel: "View Case Study",

    image: "",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/login_screen_s1pyac.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/Dashboard_light_mode_unfbvw.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/Dashboard_dark_mode_yltlga.png",
    ],
  },

  //===================================================================//

  {
    id: "ehr-system",
    title: "Multi-Tenant EHR Legacy Support and Modernization",
    shortDesc:
      "Supported a live multi-tenant EHR while contributing to its transition from .NET Framework and WebForms toward Angular and .NET 8 APIs.",

    description:
      "A confidential healthcare platform case study completed at Epazz Tech. I worked across a live multi-tenant Electronic Health Record system and its parallel modernization initiative. My responsibilities combined legacy defect investigation and support-ticket resolution with contributions to the newer Angular and ASP.NET Core stack, helping preserve operational stability while the platform moved toward a cleaner API-driven architecture.",

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

    role: "Full-Stack Developer",
    company: "Epazz Tech",
    duration: "December 2025 - Present",
    category: "Multi-Tenant Healthcare Platform",
    team: "Three-developer Agile team",

    context:
      "The product environment included a long-running multi-tenant healthcare platform with clinical and operational modules alongside a newer modernization stack. The system supports workflows such as referrals, intake, provider management, service plans, notes, reporting, and related healthcare operations.",

    purpose:
      "To maintain reliability in the active legacy platform while contributing to a gradual transition toward a more maintainable Angular and .NET architecture.",

    constraints:
      "Changes had to be made safely within a confidential healthcare environment involving sensitive information, production support obligations, shared legacy components, mixed framework generations, tenant-specific behavior, and ongoing modernization work.",

    beforeState:
      "The live product depended on an older .NET Framework and WebForms codebase that required continuous maintenance, while a newer frontend and backend stack was being developed to improve maintainability and long-term support.",

    whatChanged:
      "Investigated defects, resolved support tickets, and stabilized workflows within the legacy EHR while contributing to Angular frontend development and ASP.NET Core/.NET 8 backend services in the modernized platform. Supported API-driven workflows, SQL-backed healthcare operations, secure access patterns, and tenant-aware behavior across the product environment.",

    outcome:
      "Helped maintain continuity for active healthcare workflows while supporting the platform's move toward a more maintainable and API-driven architecture.",

    highlights: [
      "Investigated and resolved defects and support tickets across a long-running EHR codebase.",
      "Worked with multi-tenant healthcare workflows involving referrals, intake, providers, service plans, notes, and reporting.",
      "Contributed to Angular frontend development and ASP.NET Core/.NET 8 backend services.",
      "Supported SQL-backed APIs, authenticated functionality, and tenant-aware healthcare workflows.",
      "Balanced live-system maintenance with modernization work in the same product environment.",
      "Collaborated within a three-developer Agile team and coordinated with international management and cross-functional stakeholders.",
    ],

    evidence: [
      {
        label: "Legacy EHR",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818732/Pace_old_rb6alq.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818733/Pace_old2_xyiggj.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818732/Pace_old3_mvmbuj.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818733/Pace_old4_cladtm.png",
        ],
      },
      {
        label: "Modernized EHR",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New1_idmoey.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New2_gkpxlv.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New3_frzgir.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782819279/Screenshot_2026-06-30_163218_worook.png",
        ],
      },
    ],

    proofNote:
      "This project was completed as confidential healthcare platform work at Epazz Tech. Product identity, patient information, client references, source code, production access, and restricted internal assets are not shared. The presentation focuses on my development contribution to legacy support and modernization. Publish these visuals only if Epazz Tech has approved their public use.",

    ctaLabel: "View Case Study",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New1_idmoey.png",

    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New1_idmoey.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New2_gkpxlv.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782819279/Screenshot_2026-06-30_163218_worook.png",
    ],
  },

  //===================================================================//

  {
    id: "onc-ehi-export",
    title: "ONC EHI Export and Supporting Security Controls",
    shortDesc:
      "Developed key backend functionality for ONC 170.315(b)(10) EHI export, including patient and population exports, structured artifacts, access checks, and audit history.",

    description:
      "A confidential healthcare compliance case study completed at Epazz Tech for an EHR platform. The product combined standards-based FHIR APIs under /fhir with a separate non-FHIR EHI export workflow under /ehi. As a team member, I individually developed key backend functionality supporting ONC 170.315(b)(10), including export endpoints, ZIP artifact generation, manifest and dataset files, export tracking, authorization-aware access, and operational safeguards. My contribution supported certification preparation but does not represent independent certification ownership.",

    tech: [
      "C#",
      ".NET 9",
      "ASP.NET Core Web API",
      "SQL Server",
      "JWT Bearer Authentication",
      "Duende IdentityServer",
      "HL7 FHIR R4",
      "Background Job Processing",
      "JSON",
      "ZIP Artifact Generation",
    ],

    role: "Backend .NET Developer",
    company: "Epazz Tech",
    duration: "2026",
    category: "Healthcare Compliance Case Study",
    team: "Team-based project",

    context:
      "The EHR platform required a structured and computable EHI export capability for ONC certification support. The solution also needed a clear separation between standards-based FHIR APIs and the ONC-specific non-FHIR export workflow.",

    purpose:
      "To support individual-patient and population EHI exports while keeping access decisions, generated artifacts, execution history, and operational results secure and reviewable.",

    constraints:
      "The work involved sensitive healthcare data, strict authorization rules, certification-focused requirements, potentially long-running exports, artifact integrity, auditability, and clear handling of excluded sensitive data.",

    beforeState:
      "The product needed a reviewable export process with public format documentation, structured patient and population workflows, protected access, clear artifact contents, and operational evidence for technical and compliance assessment.",

    whatChanged:
      "Developed core backend functionality for the EHI export workflow, including public export-format documentation, individual-patient and population endpoints, ZIP generation, manifest metadata, dataset-level JSON output, export history, status transitions, file hashes, dataset counts, filters, limits, and timeout controls. Also supported JWT-based access, authorization policies, patient-context enforcement, protected credential handling, and transport-security expectations for export routes.",

    outcome:
      "Helped create a clearer and more auditable EHI export capability with structured artifacts, protected access, traceable execution history, and evidence that technical and compliance reviewers could assess during certification preparation.",

    highlights: [
      "Individually developed key backend functionality supporting ONC 170.315(b)(10) within a team-based EHR project.",
      "Implemented public export-format documentation and protected individual-patient and population export workflows.",
      "Generated ZIP artifacts containing manifest metadata and dataset-level JSON output.",
      "Added export tracking with started, completed, and failed states, artifact hashes, and per-dataset record counts.",
      "Implemented filters, limits, timeouts, and other safeguards for larger export operations.",
      "Supported authenticated access, authorization policies, and patient-context enforcement for protected routes.",
      "Maintained a clear separation between FHIR interoperability APIs and the ONC-specific EHI export workflow.",
    ],

    evidence: [
      {
        label: "Sanitized Technical Evidence",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace1_qrf5kq.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774514183/Screenshot_2026-03-26_133550_gmpsa7.png",
        ],
      },
    ],

    proofNote:
      "This project was completed as confidential healthcare platform work at Epazz Tech. Public source code, production access, patient data, and internal certification assets are not shared. This case study describes my specific backend contribution and does not claim that I personally certified the product or own any ONC certification mark. Publish the sanitized visuals only if their public use has been approved.",

    ctaLabel: "View Case Study",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",

    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace1_qrf5kq.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774514183/Screenshot_2026-03-26_133550_gmpsa7.png",
    ],
  },

  //===================================================================//

  {
    id: "erp-system",
    title: "Enterprise ERP Platform Modernization",
    shortDesc:
      "Designed and developed inventory, warehouse, logistics, order, and export workflows while supporting the move from ASP.NET MVC toward .NET 8 and Angular.",

    description:
      "A confidential enterprise ERP case study completed at Sanwa Systems for an automotive spare-parts business operating across the UAE and United States. I worked across the legacy ASP.NET MVC platform and its modernization initiative. My strongest ownership covered inventory, warehouse, logistics, order-management, and export-related workflows, supported by backend APIs, SQL Server operations, business-rule implementation, production issue resolution, and direct collaboration with the product owner.",

    tech: [
      "C#",
      "ASP.NET MVC",
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular",
      "JavaScript",
      "Entity Framework",
      "SQL Server",
      "Stored Procedures",
      "REST APIs",
      "Microsoft Azure",
      "Git",
      "Jira",
    ],

    role: "ASP.NET Developer",
    company: "Sanwa Systems",
    duration: "November 2023 - November 2025",
    category: "Enterprise ERP Modernization",

    context:
      "The ERP ecosystem supported business-critical automotive spare-parts operations across inventory, warehousing, logistics, orders, exports, B2B, B2C, HRM, and mobile-connected workflows for UAE and US operations.",

    purpose:
      "To maintain continuity in the legacy ERP while improving important operational workflows and supporting a gradual move toward a more maintainable API-driven architecture.",

    constraints:
      "The work involved legacy dependencies, complex operational rules, production reliability requirements, SQL-heavy workflows, direct product-owner coordination, and gradual modernization without interrupting daily business operations.",

    beforeState:
      "The business depended on an established ASP.NET MVC ERP that required ongoing maintenance and enhancement while newer APIs, interfaces, and architectural patterns were introduced.",

    whatChanged:
      "Independently designed and developed major workflows covering inventory, warehouse operations, logistics, order processing, and export-related functionality. Maintained existing MVC modules, implemented backend services and REST APIs, optimized SQL Server queries and stored procedures, resolved production defects, and contributed to the transition toward a .NET 8 and Angular architecture.",

    outcome:
      "Helped sustain business-critical ERP operations while improving workflow reliability, database performance, backend maintainability, and modernization progress across major automotive supply-chain functions.",

    highlights: [
      "Independently designed and developed major business modules covering inventory, warehouse operations, logistics, and export-related processes.",
      "Maintained and enhanced ERP functionality built with ASP.NET MVC, C#, Entity Framework, and SQL Server.",
      "Contributed to modernization through .NET 8 APIs and Angular-integrated workflows.",
      "Implemented business rules, backend services, validation logic, and database integrations for operational modules.",
      "Developed and optimized SQL Server queries, stored procedures, database structures, and data-access workflows.",
      "Investigated production issues and resolved defects affecting important ERP operations.",
      "Worked directly with the CEO and product owner to translate UAE and US business processes into software functionality.",
      "Gained practical experience deploying and maintaining .NET applications in Microsoft Azure environments.",
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
        label: "Modernized ERP",
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
      "This project was completed as confidential enterprise work at Sanwa Systems. Public source code, production access, customer data, and restricted internal workflows are not shared. The presentation focuses on my module ownership, maintenance work, modernization contribution, and sanitized supporting material. Publish these visuals only if Sanwa Systems has approved their public use.",

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
    id: "selenium-bot",
    title: "Selenium Browser Automation System",
    shortDesc:
      "Built a confidential browser-automation system with one teammate for data extraction, form workflows, location-sensitive execution, and reliable processing on dynamic websites.",

    description:
      "A confidential automation project completed at Spacedome by a two-member team. We developed a Selenium-based system to automate repetitive browser workflows involving web scraping, form completion, submissions, and location-sensitive execution. My work focused on Python automation logic, browser interaction, structured data extraction, exception handling, wait strategies, and reliable execution across changing webpage conditions.",

    tech: [
      "Python",
      "Selenium",
      "Browser Automation",
      "Web Scraping",
      "Data Extraction",
      "Workflow Automation",
      "Exception Handling",
    ],

    role: "Backend Python Developer",
    company: "Spacedome (NASTP)",
    duration: "2023 - 2024",
    category: "Confidential Automation Case Study",
    team: "Two-member team",

    context:
      "The project involved repetitive browser activities across dynamic websites where manual execution was time-consuming and location requirements affected how certain workflows needed to run.",

    purpose:
      "To automate structured data extraction, form completion, submission workflows, and location-sensitive browser operations while improving repeatability and execution reliability.",

    constraints:
      "The automation had to handle changing page states, asynchronous content, variable response times, form validation, location-based network requirements, and failures that could interrupt longer workflows.",

    beforeState:
      "The target activities required repeated manual browser interaction, making execution slower, less consistent, and harder to repeat across multiple workflow conditions.",

    whatChanged:
      "Implemented Selenium automation for navigation, data extraction, form filling, validation, and submission. Added explicit wait strategies, exception handling, retry-oriented behavior, and location-sensitive execution based on project requirements.",

    outcome:
      "Converted repetitive browser activities into a more structured and repeatable workflow with improved handling of dynamic content, timing differences, validation states, and recoverable failures.",

    highlights: [
      "Automated browser navigation, form completion, validation, and submission workflows.",
      "Extracted structured data from dynamic web pages using Python and Selenium.",
      "Supported location-sensitive execution according to project requirements.",
      "Improved stability through explicit waits, exception handling, and recoverable workflow behavior.",
      "Collaborated with one teammate to develop and maintain the confidential automation solution.",
    ],

    proofNote:
      "This project was completed as confidential company-associated work at Spacedome. Source code, target-system access, private workflow logic, and production data are not publicly available. The displayed visuals should remain conceptual or sanitized and must not reveal the target websites or private operating details.",

    ctaLabel: "View Case Study",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",

    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596211/Bot_bxy54a.png",
    ],
  },

  //===================================================================//

  {
    id: "home-automation",
    title: "IoT Home Automation System",
    shortDesc:
      "Built a Flutter application, Django APIs, and ESP8266/Arduino device logic for a supervised home-automation thesis combining mobile software and physical hardware.",

    description:
      "A supervised bachelor's final-year thesis completed at Abasyn University under Mr. Abdul Hannan, Assistant Professor. I developed the Flutter mobile application, built Django/Python APIs connecting the application with IoT devices, and programmed Arduino-based hardware logic for appliance control and sensor-driven behavior. The project combined mobile development, backend services, database communication, networking, and physical hardware into one working prototype.",

    tech: [
      "Flutter",
      "Dart",
      "Django",
      "Python",
      "REST APIs",
      "Arduino IDE",
      "C/C++",
      "ESP8266",
      "IoT",
      "Sensor Integration",
    ],

    role: "Mobile, Backend and IoT Developer",
    company: "Abasyn University",
    duration: "2023 - 2024",
    category: "Bachelor's Final-Year Project",
    supervisor: "Mr. Abdul Hannan, Assistant Professor",

    context:
      "The thesis explored how a mobile application, backend APIs, connected hardware, and sensors could be combined into a practical home-automation solution using accessible development tools and low-cost IoT components.",

    purpose:
      "To allow users to monitor and control household appliances through a Flutter application communicating with IoT hardware through Django-based backend APIs.",

    constraints:
      "The project required communication across mobile, backend, database, network, microcontroller, relay, appliance, and sensor layers while working within an academic budget and available hardware resources.",

    beforeState:
      "Home-device control and monitoring were handled manually without a unified mobile interface, backend communication layer, scheduling workflow, or sensor-driven automation logic.",

    whatChanged:
      "Built the Flutter application as the user-facing control layer, developed Django/Python APIs for communication and data processing, and programmed ESP8266/Arduino logic for appliance switching, scheduling, monitoring, and sensor-based automation.",

    outcome:
      "Delivered a working end-to-end prototype demonstrating mobile-controlled appliances, backend-mediated device communication, sensor interaction, scheduled actions, and integrated hardware-software behavior.",

    highlights: [
      "Built the Flutter application for monitoring and controlling connected household devices.",
      "Developed Django/Python REST APIs connecting the mobile application with the IoT hardware layer.",
      "Programmed ESP8266 and Arduino-based logic for appliance switching and sensor-driven behavior.",
      "Integrated mobile software, backend services, database communication, networking, and physical hardware.",
      "Implemented device control, monitoring, scheduling, and automated-response use cases.",
      "Documented the project through system diagrams, application screenshots, hardware photographs, demonstration videos, and a formal thesis.",
    ],

    evidence: [
      {
        label: "System Architecture and Design",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/Sequence_Diagram_nt7r6i.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078921/ER_Diagram_c07eow.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/circuit_Diagram_zsz7dz.png",
        ],
      },
      {
        label: "Flutter Application",
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
        label: "Hardware Prototype",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050503/1_wdieil.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050503/2_odttch.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/3_udpsuu.jpg",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/4_a781kz.jpg",
        ],
      },
      {
        label: "System Demonstrations",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/2_cy6cb2.mp4",
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/3_wm4fl1.mp4",
          "https://res.cloudinary.com/dxeoxpsm5/video/upload/v1774050469/4_bjimkt.mp4",
        ],
      },
      {
        label: "Thesis Documentation",
        url: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050551/Home_Automation_System_Ibrahim_final_dmxbyn.pdf",
      },
    ],

    proofNote:
      "This project was completed as a supervised bachelor's final-year thesis. The portfolio evidence includes original application screens, architecture diagrams, hardware photographs, demonstration videos, and thesis documentation.",

    ctaLabel: "View Project Evidence",

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
    id: "private-cloud",
    title: "OpenStack Private Cloud Lab",
    shortDesc:
      "Built a five-node private-cloud lab with a four-member university team to practice OpenStack services, networking, virtualization, provisioning, and tenant isolation.",

    description:
      "A hands-on academic infrastructure project completed at Abasyn University under Prof. Asad Hanif. Our four-member team configured a functional private-cloud environment using five university laboratory computers connected through a dedicated local network. The project provided practical experience with controller and compute roles, OpenStack services, virtual-machine provisioning, inter-node communication, dashboard operations, and tenant isolation.",

    tech: [
      "OpenStack",
      "Ubuntu Linux",
      "Nova",
      "Neutron",
      "Glance",
      "Keystone",
      "Networking",
      "Virtualization",
      "Private Cloud",
    ],

    role: "Cloud Infrastructure Team Member",
    company: "Abasyn University",
    duration: "2022",
    category: "Academic Infrastructure Project",
    team: "Four-member team",
    supervisor: "Prof. Asad Hanif",

    context:
      "The project was created to move beyond theoretical cloud-computing coursework and gain practical experience deploying a private-cloud environment on physical university hardware.",

    purpose:
      "To configure a working local private cloud capable of provisioning virtual machines, managing identities and images, connecting controller and compute nodes, and demonstrating tenant-isolated cloud operations.",

    constraints:
      "The team worked with five existing laboratory computers, local network resources, limited hardware capacity, manual Linux configuration, and the complexity of coordinating several OpenStack services across physical nodes.",

    beforeState:
      "The cloud-computing concepts had previously been studied mainly through coursework without a functioning multi-node environment for practical deployment and validation.",

    whatChanged:
      "Contributed to a five-node topology with controller and compute responsibilities, configured static network addresses and inter-node connectivity, helped deploy core OpenStack services, created users and projects, uploaded machine images, provisioned virtual machines, and validated dashboard and tenant-isolation behavior.",

    outcome:
      "Delivered a functioning educational private-cloud lab that demonstrated identity management, image management, compute provisioning, virtual networking, multi-node communication, and tenant isolation on real hardware.",

    highlights: [
      "Contributed to a five-node topology with defined controller and compute responsibilities.",
      "Configured static IP addressing and validated inter-node network connectivity.",
      "Helped deploy and configure Nova, Neutron, Glance, and Keystone services.",
      "Provisioned virtual machines and managed resources through the OpenStack dashboard.",
      "Created users, projects, and isolated tenant environments.",
      "Gained practical Linux, networking, virtualization, and cloud-infrastructure experience beyond classroom theory.",
    ],

    proofNote:
      "The original environment was built as a university laboratory project. Original deployment screenshots are not available, so the supporting topology and architecture diagrams were reconstructed for portfolio presentation and should be labeled as reconstructed visuals.",

    ctaLabel: "View Case Study",

    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",

    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596191/architecture-diagram_us3bcq.png",
    ],
  },
];