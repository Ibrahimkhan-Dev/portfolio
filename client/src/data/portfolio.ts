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
  
    category?: string;
    team?: string;
    supervisor?: string;
  
    context?: string;
    purpose?: string;
    whatChanged?: string;
  
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
    title: "Home Automation System Using IoT",
    shortDesc:
      "Supervised final-year thesis project where I built the Flutter app, Django APIs, and Arduino-based hardware logic for an IoT home automation system.",
  
    description:
      "A supervised final-year bachelor’s thesis completed under Mr. Abdul Hannan, Assistant Professor. I built the Flutter mobile application, developed Django/Python APIs to handle communication between the app and IoT devices, and programmed the hardware logic in Arduino IDE for device control and sensor-based interaction. The system was designed to improve convenience, efficiency, and home-device management by combining mobile control, backend communication, and hardware automation in one integrated solution.",
  
    tech: [
      "Flutter",
      "Django",
      "Python",
      "Arduino IDE",
      "C/C++",
      "IoT",
      "ESP8266"
    ],
  
    role: "Mobile, API & IoT Developer",
    company: "Abasyn University",
    duration: "2023-2024",
    category: "Academic / Infrastructure Case Study",
    supervisor: "Mr. Abdul Hannan, Assistant Professor",
  
    context:
      "Bachelor’s final-year thesis project developed in an academic environment to explore practical home automation through mobile software, backend APIs, and IoT hardware integration.",
  
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
      "Backed the project with thesis documentation, hardware photos, and demo videos."
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
      
    ]
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
      "Epazz Tech is a multinational technology company with 450+ employees in Pakistan, operating across software development, AI engineering, drone technologies, mobile applications, and enterprise solutions, with executive leadership based in the USA and Canada. As a Full Stack Developer, I am part of the healthcare software team, contributing to enterprise-level system modernization and compliance-driven development.",
    contributions: [
      "Revamping a legacy EHR (Electronic Health Record) system from .NET Framework to .NET Core 8, developing scalable REST APIs and implementing a modern Angular 20 frontend.",
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
      "Angular 20",
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
    skills: [
      "Django",
      "Flask",
      ".NET MVC",
      "React",
      "Bootstrap",
      "Entity Framework",
    ],
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
    degree: "Bachelor's in Computer Science",
    period: "2020 - 2024",
    desc: "Studied core computer science concepts including programming, software development, and computer systems.",
    details: [
      "Learned programming fundamentals, data structures, and algorithms.",
      "Worked on academic and personal software development projects.",
      "Gained experience with backend development and modern web technologies.",
      "Member of the programming event organizing team at the university.",
      "Served as a short-term TA (Teacher Assistant) helping students with programming labs.",
    ],
  },
  {
    id: "kallar-college",
    institution: "Kallar Kahar Science College",
    degree: "FSc (Pre-Engineering)",
    period: "2017 - 2019",
    desc: "Intensive study of Mathematics, Physics and Chemistry as core subjects.",
    details: [
      "Completed intermediate-level coursework in science and mathematics.",
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
      "Completed a specialized workshop on community-based Early Warning Systems (EWS), focusing on real-time environmental monitoring, IoT-enabled data acquisition, and system design for disaster preparedness and risk mitigation.",
    skills: [
      "System Monitoring",
      "Data Acquisition",
      "Internet of Things (IoT)",
    ],
    credentialUrl: "/media/Certificates/early-warning-system.pdf",
  },
  {
    id: "risk-thinking-sdpi-2025",
    title:
      "Safeguarding the Future: Integrating Risk Thinking into Development Planning",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Completed an SDPI capacity-building workshop on integrating risk assessment and strategic foresight into development planning, emphasizing risk-aware decision making, resilient system architecture, and long-term planning methodologies.",
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
      "Completed an SDPI workshop examining the policy implications of Artificial Intelligence in public learning systems, focusing on responsible AI adoption, knowledge dissemination frameworks, and the evolving role of AI in education and governance.",
    skills: [
      "Artificial Intelligence (AI)",
      "Policy Analysis",
      "Public Learning",
    ],
    credentialUrl: "/media/Certificates/thinking-beyond-knowledge.pdf",
  },
  {
    id: "python-for-everybody-2025",
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Completed the University of Michigan’s Python programming course, covering fundamental programming concepts including variables, control structures, functions, and data handling for problem solving and software development.",
    skills: ["Python", "Programming Fundamentals"],
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/VZ7ZQ6K8MNZ9",
  },
  {
    id: "linear-algebra-ml-2025",
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    year: "2025",
    description:
      "Completed a machine learning mathematics course focused on linear algebra concepts including vectors, matrices, eigenvalues, and matrix transformations used in modern machine learning algorithms.",
    skills: [
      "Linear Algebra",
      "Mathematics for ML",
      "Machine Learning Foundations",
    ],
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/93ZFAK7AQTB8",
  },
  {
    id: "python-data-structures-2025",
    title: "Python Data Structures",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Completed a course on Python data structures focusing on lists, dictionaries, tuples, and efficient data organization techniques used in algorithm design and problem solving.",
    skills: [
      "Python",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
      "Computational Thinking",
    ],
    credentialUrl: "https://coursera.org/verify/0QCN9ZOU2H3K",
  },
  {
    id: "probability-2025",
    title: "An Intuitive Introduction to Probability",
    issuer: "University of Zurich",
    year: "2025",
    description:
      "Completed a probability course covering foundational concepts including probability distributions, statistical reasoning, and quantitative analysis used in data science and predictive modeling.",
    skills: [
      "Probability",
      "Statistics",
      "Data Analysis",
      "Statistical Modeling",
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
      "Completed a comprehensive data science bootcamp covering Python programming, data analysis, machine learning fundamentals, and practical workflows for building data-driven solutions.",
    skills: ["Python", "Data Science", "Machine Learning"],
    credentialUrl:
      "https://www.udemy.com/certificate/UC-ea5fde42-65ae-4b26-87f0-4877ebc0cdfe/",
  },
  {
    id: "cloud-computing-2022",
    title: "Cloud Computing",
    issuer: "Pakistan Software Export Board (PSEB)",
    year: "2022",
    description:
      "Completed a training program on cloud computing fundamentals, covering cloud service models, deployment architectures, and the role of cloud infrastructure in modern application development.",
    skills: ["Cloud Computing", "Cloud Infrastructure", "Distributed Systems"],
  },
  {
    id: "certified-python-programmer-2019",
    title: "Certified Python Programmer",
    issuer: "Aptech",
    year: "2019",
    description:
      "Earned certification in Python programming with focus on object-oriented programming principles, application development, and building web applications using Flask.",
    skills: [
      "Python",
      "Object-Oriented Programming",
      "Flask",
      "Backend Development",
    ],
  },
];
