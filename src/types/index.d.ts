export * from "./gist";
export * from "./locale";
export * from "./resume-legacy";
export * from "./resume-new";

export type { Iso8601 } from "./json-resume";
export type { ResumeSchema as OfficialSchema } from "./json-resume";

import type { ResumeSchema as OfficialSchema } from "./json-resume";
export interface CustomResumeSchema extends OfficialSchema {
  basics: OfficialSchema["basics"] & {
    age?: number;
  };
  work?: (NonNullable<OfficialSchema["work"]>[number] & {
    stack?: string[];
  })[];
}
