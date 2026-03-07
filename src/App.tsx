import { useState, useEffect, useRef, useCallback } from "react";
import {
  ContactList,
  EducationList,
  Header,
  ProjectList,
  SkillList,
  WorkList,
  PrintButton
} from "@/components";
import type { ResumeSchemaOfficial, Locale } from "@/types";
import { fetchRemoteResume, parseSchema } from "@/utils";
import { useLanguage, useWindowSize } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useTelemetry } from "@/hooks/useTelemetry";

export interface AppProps {
  gistIds: Record<Locale, string>;
  name?: string;
}

export default function App({ gistIds, name }: AppProps) {
  const { t } = useTranslation();
  const [resumeData, setResumeData] = useState<ResumeSchemaOfficial | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();
  const prefetchGists = useRef(new Set<string>());
  const sendTelemetry = useTelemetry();
  const { width } = useWindowSize();
  const isMobile = width > 0 && width <= 768;

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
    fetchRemoteResume(gistId).then(onFetchSuccess).catch(onFetchError);
  }, [currentLanguage, gistIds, onFetchError, onFetchSuccess]);

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

  const headerComponent = (
    <Header
      name={name ?? resume?.basic?.name ?? t("message.loading")}
      label={resume?.basic?.label}
      summary={resume?.basic?.summary}
      loading={loading}
    />
  );
  const workListComponent = (loading || resume?.works) && (
    <WorkList works={resume?.works} loading={loading} />
  );
  const contactListComponent = (loading || resume?.basic) && (
    <ContactList {...resume?.basic} loading={loading} />
  );
  const skillListComponent = (loading || resume?.skills) && (
    <SkillList skills={resume?.skills} loading={loading} />
  );
  const educationListComponent = (loading || resume?.educations) && (
    <EducationList educations={resume?.educations} loading={loading} />
  );
  const projectListComponent = (loading || resume?.projects) && (
    <ProjectList projects={resume?.projects} loading={loading} />
  );
  const printButtonComponent = <PrintButton />;

  return isMobile ? (
    <div className="resume-container">
      <main className="main-content flow">
        {headerComponent}
        {printButtonComponent}
        {contactListComponent}
        {skillListComponent}
        {workListComponent}
        {educationListComponent}
        {projectListComponent}
      </main>
    </div>
  ) : (
    <div className="resume-container sidebar-layout">
      <main className="main-content stack stack-xl">
        {headerComponent}
        {workListComponent}
        {printButtonComponent}
      </main>
      <aside className="sidebar flow">
        {contactListComponent}
        {skillListComponent}
        {educationListComponent}
        {projectListComponent}
      </aside>
    </div>
  );
}
