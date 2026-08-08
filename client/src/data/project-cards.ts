import type { ReactNode } from "react";

export type ProjectCard = {
  id: string;
  title: string;
  shortDesc: string;
  tech: string[];
  image?: string;
  category?: string;
  icon?: ReactNode;
};

export const projectCards: ProjectCard[] = [
  {
    id: "zenatrace",
    title: "ZenaTrace Pharmaceutical Traceability Platform",
    shortDesc:
      "Developed and validated a multi-tenant web platform for pharmaceutical serialization and supply-chain traceability, with a separate Flutter mobile R&D track.",
    tech: [
      "Angular",
      "TypeScript",
      ".NET 10",
      "ASP.NET Core",
      "SQL Server",
      "Redis",
      "Amazon S3",
      "Flutter",
    ],
    image: "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/login_screen_s1pyac.png",
    category: "Enterprise Pharmaceutical Traceability",
  },
  {
    id: "ehr-system",
    title: "Multi-Tenant EHR Legacy Support and Modernization",
    shortDesc:
      "Supported a live multi-tenant EHR while contributing to its transition from .NET Framework and WebForms toward Angular and .NET 8 APIs.",
    tech: [
      "C#",
      ".NET Framework",
      "ASP.NET WebForms",
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular",
      "TypeScript",
      "SQL Server",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1782818755/Pace-Plus-New1_idmoey.png",
    category: "Multi-Tenant Healthcare Platform",
  },
  {
    id: "onc-ehi-export",
    title: "ONC EHI Export and Supporting Security Controls",
    shortDesc:
      "Developed key backend functionality for ONC 170.315(b)(10) EHI export, including patient and population exports, structured artifacts, access checks, and audit history.",
    tech: [
      "C#",
      ".NET 9",
      "ASP.NET Core Web API",
      "SQL Server",
      "HL7 FHIR R4",
      "JWT Bearer Authentication",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774872955/ChatGPT_Image_Mar_30_2026_05_10_59_PM_cjmili.png",
    category: "Healthcare Compliance Case Study",
  },
  {
    id: "erp-system",
    title: "Enterprise ERP Platform Modernization",
    shortDesc:
      "Designed and developed inventory, warehouse, logistics, order, and export workflows while supporting the move from ASP.NET MVC toward .NET 8 and Angular.",
    tech: [
      "C#",
      "ASP.NET MVC",
      ".NET 8",
      "ASP.NET Core Web API",
      "Angular",
      "SQL Server",
      "Microsoft Azure",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774169939/dark_mode_nk6xdb.png",
    category: "Enterprise ERP Modernization",
  },
  {
    id: "selenium-bot",
    title: "Selenium Browser Automation System",
    shortDesc:
      "Built a confidential browser-automation system with one teammate for data extraction, form workflows, location-sensitive execution, and reliable processing on dynamic websites.",
    tech: [
      "Python",
      "Selenium",
      "Browser Automation",
      "Web Scraping",
      "Data Extraction",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596210/selenium-bot_jaehdr.png",
    category: "Confidential Automation Case Study",
  },
  {
    id: "home-automation",
    title: "IoT Home Automation System",
    shortDesc:
      "Built a Flutter application, Django APIs, and ESP8266/Arduino device logic for a supervised home-automation thesis combining mobile software and physical hardware.",
    tech: [
      "Flutter",
      "Dart",
      "Django",
      "Python",
      "ESP8266",
      "Arduino IDE",
      "IoT",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774078922/System_Architecture_Diagram_czwwia.png",
    category: "Bachelor's Final-Year Project",
  },
  {
    id: "private-cloud",
    title: "OpenStack Private Cloud Lab",
    shortDesc:
      "Built a five-node private-cloud lab with a four-member university team to practice OpenStack services, networking, virtualization, provisioning, and tenant isolation.",
    tech: [
      "OpenStack",
      "Ubuntu Linux",
      "Nova",
      "Neutron",
      "Glance",
      "Keystone",
    ],
    image:
      "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1774596192/topology-diagram_ahrcs1.png",
    category: "Academic Infrastructure Project",
  },
];
