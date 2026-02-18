import { useState, useEffect, useRef, useCallback } from "react";
import { Header, WorkList, Sidebar } from "@/components";
import type { ResumeSchemaOfficial, Locale } from "@/types";
import { fetchRemoteResume, parseSchema } from "@/utils";
import { useLanguage } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useTelemetry } from "@/hooks/useTelemetry";

export interface AppProps {
  gistIds: Record<Locale, string>;
  initialData?: ResumeSchemaOfficial | null;
  name?: string;
}

export default function App({ gistIds, initialData, name }: AppProps) {
  const { t } = useTranslation();
  const [resumeData, setResumeData] = useState<ResumeSchemaOfficial | null>(
    initialData ?? null
  );
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();
  const sendTelemetry = useTelemetry();
  const prefetchGists = useRef(new Set<string>());
  const isFirstRender = useRef(true);

  useEffect(() => {
    sendTelemetry("APP_MOUNTED");
  }, [sendTelemetry]);

  const onFetchError = useCallback(() => {
    setError(t("message.error.fetchResume"));
    setResumeData(null);
    setLoading(false);
  }, [t]);
  const onFetchSuccess = useCallback((data: ResumeSchemaOfficial) => {
    setError(null);
    setResumeData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    const gistId = gistIds[currentLanguage];
    if (!gistId) return;
    if (isFirstRender.current && initialData) {
      isFirstRender.current = false;
      return;
    }
    fetchRemoteResume(gistId).then(onFetchSuccess).catch(onFetchError);
  }, [currentLanguage, gistIds, initialData, onFetchError, onFetchSuccess]);

  useEffect(() => {
    if (!loading && resumeData) {
      for (const id of Object.values(gistIds)) {
        if (id && !prefetchGists.current.has(id)) {
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
          name={name ?? resume?.basic?.name ?? t("message.loading")}
          label={resume?.basic?.label}
          summary={resume?.basic?.summary}
          loading={loading}
        />
        <WorkList works={resume?.works} loading={loading} />
      </main>
      <Sidebar
        basic={resume?.basic}
        skills={resume?.skills}
        educations={resume?.educations}
        projects={resume?.projects}
        loading={loading}
      />
    </div>
  );
}
