import type { SkillType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface SkillListProps {
  skills?: SkillType[];
  loading: boolean;
}

export const SkillList = ({ skills, loading }: SkillListProps) => {
  const { t } = useTranslation();
  return (
    <section className="skills-container">
      <h3 className="section-title">{t("section.skill")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <ul className="skills-list">
          {skills?.map((skill, index) => (
            <li key={index} className="skill-item">
              {skill.name}
            </li>
          ))}
        </ul>
      </SkeletonLoader>
    </section>
  );
};
