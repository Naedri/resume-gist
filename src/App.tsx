import { useState, useEffect } from "react";
import { Header, ExperienceList, Sidebar } from "@/components";
import type { CustomResumeSchema, Locale } from "@/types";
import { fetchRemoteResume, parseSchema } from "@/utils";
import { useLanguage } from "@/hooks";
import { useTranslation } from "react-i18next";

export interface AppProps {
  gistIds: Record<Locale, string>;
}

export default function App({ gistIds }: AppProps) {
  const { t } = useTranslation();
  const [resumeData, setResumeData] = useState<CustomResumeSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    const gistId = gistIds[currentLanguage];
    if (!gistId) return;

    fetchRemoteResume(gistId)
      .then((data: CustomResumeSchema) => {
        setResumeData(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load resume data.");
        setLoading(false);
      });
  }, [currentLanguage, gistIds]);

  if (loading) return <div>{t("message.loading")}</div>;
  if (error) return <div>{t("message.error", { error })}</div>;
  if (!resumeData) return <div>{t("message.noData")}</div>;

  const resume = parseSchema(resumeData);

  return (
    <div className="resume-container">
      <main className="main-content">
        <Header
          name={resume.name}
          title={resume.title}
          summary={resume.summary}
          loading={loading}
        />
        <ExperienceList experiences={resume.experience} loading={loading} />
      </main>
      <Sidebar
        age={resume.age}
        contact={resume.contact}
        skills={resume.skills}
        education={resume.education}
        oss={resume.oss}
        loading={loading}
      />
    </div>
  );
}
