import type { ResumeSchemaOfficial, GistResponse } from "@/types";

const gistCache: Record<string, ResumeSchemaOfficial> = {};

export const fetchLocalResume = async (): Promise<ResumeSchemaOfficial> => {
  const urls = ["/private/resume.json", "/private/resume.jsonc"];
  for (const url of urls) {
    const response = await fetch(url);
    if (response.ok) {
      return (await response.json()) as ResumeSchemaOfficial;
    }
  }
  throw new Error("Error fetching local resume");
};

export const fetchRemoteResume = async (
  gistId: string
): Promise<ResumeSchemaOfficial> => {
  let res;
  if (gistCache[gistId]) res = gistCache[gistId];
  else {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (response.ok) {
      const gist = (await response.json()) as GistResponse;
      const resume = JSON.parse(
        gist.files["resume.json"].content
      ) as ResumeSchemaOfficial;
      gistCache[gistId] = resume;
      res = resume;
    } else {
      throw new Error(`Error fetching Gist: ${gistId}`);
    }
  }
  return res;
};
