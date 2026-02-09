export interface BasicType {
  age?: number;
  name?: string;
  title?: string;
  summary?: string;
}

export interface SkillType {
  name: string;
  keywords: string[];
}

export interface ResumeType extends BasicType {
  experience: ExperienceType[];
  contact: ContactType;
  skills: SkillType[];
  education: EducationType[];
  oss: ProjectType[];
}

export interface ExperienceType {
  company: {
    name: string;
    url: string;
  };
  jobTitle: string;
  date: string;
  projects: ExperienceProjectType[];
  stack?: string[];
}

export interface ExperienceProjectType {
  title: string;
  bullets: string[];
}

export interface ContactType {
  location?: string;
  phone?: string;
  email?: string;
  github?: string;
}

export interface EducationType {
  school: string;
  degree: string;
  bullets: string[];
}

export interface ProjectType {
  title: string;
  url: string;
  description: string;
}
