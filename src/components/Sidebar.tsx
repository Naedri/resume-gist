import type {
  ContactType,
  EducationType,
  ProjectType,
  SkillType
} from "@/types";
import {
  ContactSection,
  SkillList,
  EducationList,
  ProjectList
} from "@/components";
import { useTranslation } from "react-i18next";

export interface SidebarProps {
  contact: ContactType;
  skills: SkillType[];
  education: EducationType[];
  oss: ProjectType[];
}

export const Sidebar = ({ contact, skills, education, oss }: SidebarProps) => {
  const { t } = useTranslation();
  return (
    <aside className="sidebar">
      <ContactSection {...contact} />
      <SkillList skills={skills} />
      <EducationList education={education} />
      <ProjectList oss={oss} />
      <div className="no-print">
        <button onClick={() => window.print()} className="print-button">
          {t("button.print")}
        </button>
      </div>
    </aside>
  );
};
