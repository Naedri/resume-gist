export interface BasicType {
  name: string;
  title: string;
  summary: string;
}

export interface SkillType {
  name: string;
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
}

export interface ExperienceProjectType {
  title: string;
  bullets: string[];
  stack: string[];
}

export interface ContactType {
  age: string;
  location: string;
  phone: string;
  email: string;
  github: string;
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
