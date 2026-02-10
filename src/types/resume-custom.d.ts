import type { ResumeSchemaOfficial } from "@/types";

export type BasicType = NonNullable<ResumeSchemaOfficial["basics"]> & {
  age?: number;
  github?: string;
};
export type WorkType = NonNullable<ResumeSchemaOfficial["work"]>[number] & {
  stack?: string[];
};
export type EducationType = NonNullable<
  ResumeSchemaOfficial["education"]
>[number];
export type CertificateType = NonNullable<
  ResumeSchemaOfficial["certificates"]
>[number];
export type SkillType = NonNullable<ResumeSchemaOfficial["skills"]>[number];
export type LanguageType = NonNullable<
  ResumeSchemaOfficial["languages"]
>[number];
export type ReferenceType = NonNullable<
  ResumeSchemaOfficial["references"]
>[number];
export type ProjectType = NonNullable<ResumeSchemaOfficial["projects"]>[number];

export interface ResumeSchema {
  basic: BasicType;
  works?: WorkType[];
  educations?: EducationType[];
  certificates?: CertificateType[];
  skills?: SkillType[];
  languages?: LanguageType[];
  references?: ReferenceType[];
  projects?: ProjectType[];
}
