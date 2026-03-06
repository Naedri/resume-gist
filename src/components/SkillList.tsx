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
    <section className="skills-container flow">
      <h3 className="section-title">{t("section.skill")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <div className="skill-list stack">
          {skills?.map((s, index) => (
            <div key={index} className="skill-item stack">
              <h4 className="skill-name">{s.name}</h4>
              {s.keywords && s.keywords.length > 0 && (
                <ul className="skill-keyword-list">
                  {s?.keywords?.map((keyword, i) => (
                    <li className="skill-keyword" key={i}>
                      {keyword}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </SkeletonLoader>
    </section>
  );
};
