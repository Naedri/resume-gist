export interface ResumeEssential {
  name: string;
  title: string;
  summary: string;
}

export interface Skill {
  name: string;
}

export interface Resume extends ResumeEssential {
  experience: Experience[];
  contact: Contact;
  skills: Skill[];
  education: Education[];
  oss: OSS[];
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
  title: string;
  url: string;
  description: string;
}
