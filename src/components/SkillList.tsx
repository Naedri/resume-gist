import type { SkillType } from "@/types";
import { useTranslation } from "react-i18next";
export interface SkillListProps {
  skills: SkillType[];
}

export const SkillList = ({ skills }: SkillListProps) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="section-title" data-i18n="section.skills">
        {t("section.skill")}
      </h3>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
