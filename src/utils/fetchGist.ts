export async function fetchGist(gistId: string): Promise<any> {
  try {
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Gist: ${response.statusText}`);
    }
    const data = await response.json();
    return JSON.parse(data.files["resume.json"].content);
  } catch (error) {
    console.error("Error fetching Gist:", error);
    throw error;
  }
}
