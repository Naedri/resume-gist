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
        <div className="skill-list">
          {skills?.map((s, index) => (
            <div key={index} className="skill-item">
              <span className="skill-title">{s.name}</span>
              {s.keywords && s.keywords.length > 0 && (
                <div className="skill-keyword-list">
                  {s.keywords.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      </SkeletonLoader>
    </section>
  );
};
