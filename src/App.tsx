import { useState, useEffect } from "react";
import { Header, ExperienceList, Sidebar } from "@/components";
import type { CustomResumeSchema, Locale } from "@/types";
import { fetchRemoteResume, parseSchema } from "@/utils";
import { useAppState, useLanguage } from "@/hooks";
import { useTranslation } from "react-i18next";
import { AppStateProvider } from "./providers";

export interface AppProps {
  gistIds: Record<Locale, string>;
}

export default function App({ gistIds }: AppProps) {
  const { t } = useTranslation();
  const [resumeData, setResumeData] = useState<CustomResumeSchema | null>(null);
  const {
    state: { loading },
    setLoading
  } = useAppState();
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
    <AppStateProvider>
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
    </AppStateProvider>
  );
}
