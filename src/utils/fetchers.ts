import type { CustomResumeSchema, GistResponse } from "@/types";

const gistCache: Record<string, CustomResumeSchema> = {};

export const fetchLocalResume = async (): Promise<CustomResumeSchema> => {
  const response = await fetch("/private/resume.json");
  if (response.ok) {
    return (await response.json()) as CustomResumeSchema;
  } else {
    throw new Error("Error fetching local resume");
  }
};

export const fetchRemoteResume = async (
  gistId: string
): Promise<CustomResumeSchema> => {
  let res;
  if (gistCache[gistId]) res = gistCache[gistId];
  else {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (response.ok) {
      const gist = (await response.json()) as GistResponse;
      const resume = JSON.parse(
        gist.files["resume.json"].content
      ) as CustomResumeSchema;
      gistCache[gistId] = resume;
      res = resume;
    } else {
      throw new Error(`Error fetching Gist: ${gistId}`);
    }
  }
  return res;
};
