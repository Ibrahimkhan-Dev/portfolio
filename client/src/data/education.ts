export type Education = {
  id: string;
  institution: string;
  degree: string;
  period: string;
  desc: string;

  details?: string[];
};

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
