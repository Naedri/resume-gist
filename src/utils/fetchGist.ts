import type { ResumeType } from "@/types";

interface GistResponse {
  files: {
    "resume.json": {
      content: string;
    };
  };
}

export async function fetchGist(gistId: string): Promise<ResumeType> {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Gist: ${response.statusText}`);
    }

    const data: GistResponse = (await response.json()) as GistResponse;
    return JSON.parse(data.files["resume.json"].content) as ResumeType;
  } catch (error) {
    console.error("Error fetching Gist:", error);
    throw error;
  }
}
