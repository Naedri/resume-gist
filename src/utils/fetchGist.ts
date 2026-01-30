import type { ResumeType, GistResponse } from "@/types";

const gistCache: Record<string, ResumeType> = {};

export const fetchGist = async (gistId: string): Promise<ResumeType> => {
  let res;
  if (gistCache[gistId]) res = gistCache[gistId];
  else {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (response.ok) {
      const gist: GistResponse = (await response.json()) as ResumeType;
      const resume = JSON.parse(
        gist.files["resume.json"].content
      ) as ResumeSchema;
      gistCache[gistId] = resume;
      res = resume;
    } else {
      throw new Error(`Error fetching Gist: ${gistId}`);
    }
  }
  return res;
};
