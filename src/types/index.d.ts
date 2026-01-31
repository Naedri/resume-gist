export * from "./gist";
export { Iso8601 } from "./json-resume";
import type { ResumeSchema } from "./json-resume";
export interface ResumeSchema extends ResumeSchema {
  basics: ResumeSchema["basics"] & {
    age?: number;
  };
}

export * from "./resume";
