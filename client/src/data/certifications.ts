export type Certification = {
  id: string;
  title: string;
  issuer?: string;
  year?: string;

  description?: string;
  skills?: string[];

  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    id: "python-data-structures-2025",
    title: "Python Data Structures",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Completed the University of Michigan course covering strings, files, lists, dictionaries, and tuples, with practical exercises in organizing and processing data in Python.",
    skills: [
      "Python",
      "Data Structures",
      "File Processing",
      "Problem Solving",
    ],
    credentialUrl: "https://coursera.org/verify/0QCN9ZOU2H3K",
  },
  {
    id: "python-for-everybody-2025",
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "University of Michigan",
    year: "2025",
    description:
      "Completed the University of Michigan introductory Python course covering variables, expressions, conditional logic, loops, functions, and basic data handling.",
    skills: [
      "Python",
      "Programming Fundamentals",
      "Control Flow",
      "Functions",
    ],
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/VZ7ZQ6K8MNZ9",
  },
  {
    id: "linear-algebra-ml-2025",
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    year: "2025",
    description:
      "Completed a course focused on vectors, matrices, linear transformations, eigenvalues, and eigenvectors as mathematical foundations used in machine learning.",
    skills: [
      "Linear Algebra",
      "Vectors and Matrices",
      "Linear Transformations",
      "Machine Learning Foundations",
    ],
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/records/93ZFAK7AQTB8",
  },
  {
    id: "data-science-bootcamp-2025",
    title: "The Data Science Course: Complete Data Science Bootcamp 2025",
    issuer: "Udemy",
    year: "2025",
    description:
      "Completed an applied introductory program covering Python, statistics, data preparation, visualization, and foundational machine-learning workflows.",
    skills: [
      "Python",
      "Data Analysis",
      "Statistics",
      "Machine Learning Fundamentals",
    ],
    credentialUrl:
      "https://www.udemy.com/certificate/UC-ea5fde42-65ae-4b26-87f0-4877ebc0cdfe/",
  },
  {
    id: "probability-2025",
    title: "An Intuitive Introduction to Probability",
    issuer: "University of Zurich",
    year: "2025",
    description:
      "Completed a course covering probability rules, conditional probability, random variables, common distributions, and statistical reasoning.",
    skills: [
      "Probability",
      "Statistical Reasoning",
      "Random Variables",
      "Data Analysis",
    ],
    credentialUrl: "https://coursera.org/verify/7WCBNZ50OQAF",
  },
  {
    id: "ews-workshop-sdpi-2025",
    title: "Early Warning System Workshop",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Participated in a specialized SDPI workshop on community-based early warning systems, including environmental monitoring, IoT-supported data collection, and disaster-risk preparedness.",
    skills: [
      "Early Warning Systems",
      "Environmental Monitoring",
      "IoT Data Collection",
      "Risk Preparedness",
    ],
    credentialUrl: "/media/Certificates/early-warning-system.pdf",
  },
  {
    id: "ai-policy-sdpi-2025",
    title:
      "Thinking Beyond Knowledge Dissemination in the Age of AI: A Policy Perspective for Future Public Learning",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Participated in an SDPI workshop on how artificial intelligence is changing public learning and knowledge sharing, with emphasis on responsible adoption, policy considerations, and governance.",
    skills: [
      "Responsible AI",
      "Policy Awareness",
      "Public Learning",
      "Technology Governance",
    ],
    credentialUrl: "/media/Certificates/thinking-beyond-knowledge.pdf",
  },
  {
    id: "risk-thinking-sdpi-2025",
    title:
      "Safeguarding the Future: Integrating Risk Thinking into Development Planning",
    issuer: "Sustainable Development Policy Institute (SDPI)",
    year: "2025",
    description:
      "Participated in an SDPI workshop on applying risk awareness and long-term thinking to development planning and resilient decision-making.",
    skills: [
      "Risk Awareness",
      "Resilience Planning",
      "Strategic Foresight",
      "Decision-Making",
    ],
    credentialUrl: "/media/Certificates/safeguard-the-future.pdf",
  },
  {
    id: "cloud-computing-2022",
    title: "Cloud Computing",
    issuer: "Pakistan Software Export Board (PSEB)",
    year: "2022",
    description:
      "Completed a PSEB training program covering cloud service models, deployment models, virtualization, and the role of cloud platforms in application hosting.",
    skills: [
      "Cloud Computing",
      "Cloud Service Models",
      "Virtualization",
      "Application Hosting",
    ],
  },
  {
    id: "certified-python-programmer-2019",
    title: "Certified Python Programmer",
    issuer: "Aptech",
    year: "2019",
    description:
      "Earned an Aptech certification covering Python fundamentals, object-oriented programming, application development, and introductory web development with Flask.",
    skills: [
      "Python",
      "Object-Oriented Programming",
      "Flask",
      "Backend Fundamentals",
    ],
    credentialUrl: "/media/Certificates/Aptech.pdf",
  },
];