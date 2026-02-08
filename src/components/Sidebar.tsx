import type {
  ContactType,
  EducationType,
  ProjectType,
  SkillType
} from "@/types";
import {
  ContactList,
  SkillList,
  EducationList,
  ProjectList
} from "@/components";
import { useTranslation } from "react-i18next";

export interface SidebarProps {
  age?: number;
  contact: ContactType;
  skills: SkillType[];
  education: EducationType[];
  oss: ProjectType[];
  loading: boolean;
}

export const Sidebar = ({
  age,
  contact,
  skills,
  education,
  oss,
  loading
}: SidebarProps) => {
  const { t } = useTranslation();
  return (
    <aside className="sidebar">
      <ContactList age={age} {...contact} loading={loading} />
      <SkillList skills={skills} loading={loading} />
      <EducationList education={education} loading={loading} />
      <ProjectList oss={oss} loading={loading} />
      <div className="no-print">
        <button onClick={() => window.print()} className="print-button">
          {t("button.print")}
        </button>
      </div>
    </aside>
  );
};
