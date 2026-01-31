import { useState, useEffect } from "react";
import { Header, ExperienceList, Sidebar } from "@/components";
import type { ResumeSchema } from "@/types";
import { fetchGist, parseSchema } from "@/utils";

export interface AppProps {
  gistIdEn: string;
  gistIdFr: string;
}

export default function App({ gistIdEn, gistIdFr }: AppProps) {
  const [resumeData, setResumeData] = useState<ResumeSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    if (!gistIdEn || !gistIdFr) return;

    const gistId = language === "en" ? gistIdEn : gistIdFr;

    fetchGist(gistId)
      .then((data: ResumeSchema) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resume data.");
        setLoading(false);
      });
  }, [gistIdEn, gistIdFr, language]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resumeData) return <div>No data available.</div>;

  const resume = parseSchema(resumeData);

  return (
    <div className="resume-container">
      <main className="main-content">
        <Header
          name={resume.name}
          title={resume.title}
          summary={resume.summary}
          toggleLanguage={toggleLanguage}
          currentLanguage={language}
        />
        <ExperienceList experiences={resume.experience} />
      </main>
      <Sidebar
        contact={resume.contact}
        skills={resume.skills}
        education={resume.education}
        oss={resume.oss}
      />
    </div>
  );
}
