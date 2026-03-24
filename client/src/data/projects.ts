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

  icon?: string;
};

export const projects: Project[] = [
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
      { label: "Selected Technical Evidence",
        gallery: [
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace_gw6mnj.png",
          "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369184/pace1_qrf5kq.png",
        ],
       },
    ],
  
    proofNote:
      "This project was completed as confidential healthcare platform work tied to ONC certification support for an EHR system. Public source code, production access, and internal certification assets are not shared publicly. The portfolio presentation focuses on system context, my specific backend ownership, documented export behavior, and sanitized supporting material where permitted.",
    ctaLabel: "View Case Study",
    image: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774369450/EHR-CB-084a-Drummond-ONC-Health-IT-Certified-Seal-1024x1024_vzv5xv.png",
  },
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

    image: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774170381/login_system_z3f6ko.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774367564/Screenshot_2026-03-22_135237_domqrn.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169233/Capture12_bxq4hk.png",
    ],
  },
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

    image: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
    gallery: [
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Logo_efqyjk.jpg",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774018657/Home_screen_vxhuaw.jpg",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774050504/4_a781kz.jpg",
    ],
  },
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
    image: "/media/images/projects/selenium-bot/selenium-bot.png",
    gallery: [
      "/media/images/projects/selenium-bot/selenium-bot.png",
      "/media/images/projects/selenium-bot/Bot.png",
    ],
  },
  {
    id: "private-cloud",
    title: "University Private Cloud Lab with OpenStack",
    shortDesc:
      "Built a learning-focused private cloud lab with a 4-member university team by connecting five PCs and configuring an OpenStack-based local cloud environment.",
    description:
      "This academic team project was completed under the supervision of Prof. Asad Hanif at Abasyn University. Our team used five university lab PCs, including one parent/controller system, to build a local private-cloud setup for learning cloud infrastructure, networking, and virtualization concepts through hands-on practice.",
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
      "Connected five university PCs over a local wired network.",
      "Used one machine as the parent/controller node.",
      "Configured dedicated IP-based communication between systems.",
      "Explored private cloud concepts through OpenStack-based deployment.",
      "Worked collaboratively in a supervised academic environment.",
    ],
    proofNote:
      "The original setup was built as a university lab activity and public screenshots from the original environment are not available. Supporting diagrams shown here are reconstructed for portfolio presentation.",
    image: "/media/images/projects/private-cloud/topology-diagram.png",
    gallery: [
      "/media/images/projects/private-cloud/topology-diagram.png",
      "/media/images/projects/private-cloud/architecture-diagram.png",
    ],
  },
];
