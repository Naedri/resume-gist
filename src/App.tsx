import { useState, useEffect } from "react";
import { Header, ExperienceList, Sidebar } from "@/components";
import type { ResumeType } from "@/types";
import { fetchGist } from "@/utils";

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "fr">("en");

  useEffect(() => {
    const gistId =
      language === "en"
        ? import.meta.env.VITE_GIST_ID_EN
        : import.meta.env.VITE_GIST_ID_FR;
    if (!gistId) {
      setError("Gist ID not found in environment variables.");
      setLoading(false);
      return;
    }

    fetchGist(gistId)
      .then((data: ResumeType) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resume data.");
        setLoading(false);
      });
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!resumeData) return <div>No data available.</div>;

  return (
    <div className="resume-container">
      <main className="main-content">
        <Header
          name={resumeData.name}
          title={resumeData.title}
          summary={resumeData.summary}
          toggleLanguage={toggleLanguage}
          currentLanguage={language}
        />
        <ExperienceList experiences={resumeData.experience} />
      </main>
      <Sidebar
        contact={resumeData.contact}
        skills={resumeData.skills}
        education={resumeData.education}
        oss={resumeData.oss}
      />
    </div>
  );
}
