import type { ResumeSchema as OfficialSchema } from "./json-resume";

export type BasicType = NonNullable<OfficialSchema["basics"]> & {
  age?: number;
};
export type WorkType = NonNullable<OfficialSchema["work"]>[number] & {
  stack?: string[];
};
export type EducationType = NonNullable<OfficialSchema["education"]>[number];
export type CertificateType = NonNullable<
  OfficialSchema["certificates"]
>[number];
export type SkillType = NonNullable<OfficialSchema["skills"]>[number];
export type LanguageType = NonNullable<OfficialSchema["languages"]>[number];
export type ReferenceType = NonNullable<OfficialSchema["references"]>[number];
export type ProjectsType = NonNullable<OfficialSchema["projects"]>[number];

export interface ResumeSchema {
  basic: BasicType;
  works?: WorkType[];
  educations?: EducationType[];
  certificates?: CertificateType[];
  skills?: SkillType[];
  languages?: LanguageType[];
  references?: ReferenceType[];
  projects?: ProjectsType[];
}
