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
