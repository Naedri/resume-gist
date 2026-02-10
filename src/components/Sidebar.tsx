import type { BasicType, EducationType, ProjectType, SkillType } from "@/types";
import {
  ContactList,
  SkillList,
  EducationList,
  ProjectList
} from "@/components";
import { useTranslation } from "react-i18next";

export interface SidebarProps {
  basic?: BasicType;
  skills?: SkillType[];
  education?: EducationType[];
  oss?: ProjectType[];
  loading: boolean;
}

export const Sidebar = ({
  basic,
  skills,
  education,
  oss,
  loading
}: SidebarProps) => {
  const { t } = useTranslation();
  return (
    <aside className="sidebar">
      {(loading || basic) && <ContactList {...basic} loading={loading} />}
      {(loading || skills) && <SkillList skills={skills} loading={loading} />}
      {(loading || education) && (
        <EducationList education={education} loading={loading} />
      )}
      {(loading || oss) && <ProjectList oss={oss} loading={loading} />}
      <div className="print-button">
        <button onClick={() => window.print()} className="no-print">
          {t("button.print")}
        </button>
      </div>
    </aside>
  );
};
