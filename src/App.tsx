import { useState, useEffect } from "react";
import { Header, ExperienceList, Sidebar } from "@/components";
import type { ResumeSchema } from "@/types";
import { fetchRemoteResume, parseSchema } from "@/utils";
import { useLanguage } from "./hooks";

export interface AppProps {
  gistIdEn: string;
  gistIdFr: string;
}

export default function App({ gistIdEn, gistIdFr }: AppProps) {
  const [resumeData, setResumeData] = useState<ResumeSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (!gistIdEn || !gistIdFr) return;

    const gistId = currentLanguage === "en" ? gistIdEn : gistIdFr;

    fetchRemoteResume(gistId)
      .then((data: ResumeSchema) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resume data.");
        setLoading(false);
      });
  }, [gistIdEn, gistIdFr, currentLanguage]);

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
        />
        <ExperienceList experiences={resume.experience} />
      </main>
      <Sidebar
        age={resume.age}
        contact={resume.contact}
        skills={resume.skills}
        education={resume.education}
        oss={resume.oss}
      />
    </div>
  );
}
