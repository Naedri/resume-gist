import { useState, useEffect, useRef } from "react";
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
  const prefetchGists = useRef(new Set<string>());

  const onFetchError = () => {
    setError(t("message.error.fetchResume"));
    setResumeData(null);
    setLoading(false);
  };
  const onFetchSuccess = (data: CustomResumeSchema) => {
    setError(null);
    setResumeData(data);
    setLoading(false);
  };

  useEffect(() => {
    const gistId = gistIds[currentLanguage];
    if (!gistId) return;
    fetchRemoteResume(gistId).then(onFetchSuccess).catch(onFetchError);
  }, [currentLanguage]);

  useEffect(() => {
    if (!loading && resumeData) {
      for (const [locale, id] of Object.entries(gistIds)) {
        if (
          locale !== currentLanguage &&
          id &&
          !prefetchGists.current.has(id)
        ) {
          fetchRemoteResume(id).catch(console.error);
          prefetchGists.current.add(id);
        }
      }
    }
  }, [loading, resumeData, gistIds, currentLanguage]);

  if (error) return <div>{t("message.error.display", { error })}</div>;
  if (!loading && !resumeData) return <div>{t("message.error.noData")}</div>;

  const resume = resumeData ? parseSchema(resumeData) : undefined;

  return (
    <div className="resume-container">
      <main className="main-content">
        <Header
          name={resume?.name}
          title={resume?.title}
          summary={resume?.summary}
          loading={loading}
        />
        <ExperienceList experiences={resume?.experience} loading={loading} />
      </main>
      <Sidebar
        age={resume?.age}
        contact={resume?.contact}
        skills={resume?.skills}
        education={resume?.education}
        oss={resume?.oss}
        loading={loading}
      />
    </div>
  );
}
