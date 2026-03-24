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
      "Completed the University of Michigan's Python programming course, covering fundamental programming concepts including variables, control structures, functions, and data handling for problem solving and software development.",
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
