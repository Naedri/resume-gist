// src/types/index.ts
export interface Resume {
  name: string;
  title: string;
  summary: string;
  experience: Experience[];
  contact: Contact;
  skills: string[];
  education: Education[];
  oss: OSS[]; // Reverted to OSS
}

export interface Experience {
  company: {
    name: string;
    url: string;
  };
  jobTitle: string;
  date: string;
  projects: ExperienceProject[];
}

export interface ExperienceProject {
  title: string;
  bullets: string[];
  stack: string[];
}

export interface Contact {
  age: string;
  location: string;
  phone: string;
  email: string;
  github: string;
}

export interface Education {
  school: string;
  degree: string;
  bullets: string[];
}

export interface OSS {
  // Reverted to OSS
  title: string;
  url: string;
  description: string;
}
