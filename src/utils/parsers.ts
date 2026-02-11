import type { ResumeSchemaOfficial, ResumeSchema } from "@/types";

export function parseSchema(resumeJson: ResumeSchemaOfficial): ResumeSchema {
  return {
    basic: resumeJson.basics ?? {},
    works: resumeJson.work ?? [],
    educations: resumeJson.education ?? [],
    certificates: resumeJson.certificates ?? [],
    skills: resumeJson.skills ?? [],
    languages: resumeJson.languages ?? [],
    references: resumeJson.references ?? [],
    projects: resumeJson.projects ?? []
  };
}

export function parseDate(date: string): Date {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid ISO 8601 date format");
  }
  return parsedDate;
}
