import type { ReactNode } from "react";

export type ProjectCard = {
  id: string;
  title: string;
  shortDesc: string;
  tech: string[];
  image?: string;
  featuredMedia?: {
    primary: string;
    secondary: string;
  };
  category?: string;
  icon?: ReactNode;
};

export const projectCards: ProjectCard[] = [
  {
    id: "zenatrace",
    title: "ZenaTrace Pharmaceutical Traceability Platform",
    shortDesc:
      "Planned and validated a working web MVP that traces serialized medicines through packaging and shipment, guiding AI-assisted implementation. A separate Flutter mobile R&D track is in progress.",
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
    featuredMedia: {
      primary:
        "https://res.cloudinary.com/dxeoxpsm5/image/upload/v1785504029/Dashboard_light_mode_unfbvw.png",
      secondary:
        "/media/images/zenatrace-shipment-640.webp",
    },
    category: "Enterprise Pharmaceutical Traceability",
  },
  {
    id: "ehr-system",
    title: "Multi-Tenant EHR Legacy Support and Modernization",
    shortDesc:
      "Helped maintain a live electronic health record (EHR) system while its team moved older WebForms workflows toward Angular and .NET 8 APIs.",
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
      "Built backend functionality for patient and population health data exports, including structured files, access checks, and audit history for ONC certification preparation.",
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
    title: "Automotive ERP Modernization",
    shortDesc:
      "Built inventory and warehouse workflows for an automotive ERP while helping move its older ASP.NET MVC system toward .NET 8 and Angular.",
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
      "Built browser automation with one teammate. Explicit waits and exception handling helped recover when dynamic pages loaded slowly or changed state.",
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
      "Built a final-year home automation prototype linking Flutter controls through Django APIs to ESP8266/Arduino hardware.",
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
      "Our four-person university team built a five-node OpenStack lab to practice networking, virtual machine provisioning, and tenant isolation.",
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
