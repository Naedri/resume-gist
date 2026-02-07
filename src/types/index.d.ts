export * from "./gist";
export * from "./locale";
export * from "./resume";
export { Iso8601 } from "./json-resume";

import type { ResumeSchema as JsonResumeSchema } from "./json-resume";
export interface CustomResumeSchema extends JsonResumeSchema {
  basics: JsonResumeSchema["basics"] & {
    age?: number;
  };
  work?: (NonNullable<JsonResumeSchema["work"]>[number] & {
    stack?: string[];
  })[];
}
