import type { BasicType, EducationType, ProjectType, SkillType } from "@/types";
import {
  ContactList,
  SkillList,
  EducationList,
  ProjectList
} from "@/components";
import { useTranslation } from "react-i18next";
import { useTelemetry } from "@/hooks/useTelemetry";

export interface SidebarProps {
  basic?: BasicType;
  skills?: SkillType[];
  educations?: EducationType[];
  projects?: ProjectType[];
  loading: boolean;
}

export const Sidebar = ({
  basic,
  skills,
  educations,
  projects,
  loading
}: SidebarProps) => {
  const { t } = useTranslation();
  const sendTelemetry = useTelemetry();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
      sendTelemetry("PRINT_CLICKED");
    }
  };

  return (
    <aside className="sidebar">
      {(loading || basic) && <ContactList {...basic} loading={loading} />}
      {(loading || skills) && <SkillList skills={skills} loading={loading} />}
      {(loading || educations) && (
        <EducationList educations={educations} loading={loading} />
      )}
      {(loading || projects) && (
        <ProjectList projects={projects} loading={loading} />
      )}
      <div className="print-button">
        <button onClick={handlePrint} className="no-print">
          {t("button.print")}
        </button>
      </div>
    </aside>
  );
};
