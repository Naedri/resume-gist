import type { WorkType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface ExperienceListProps {
  experiences?: WorkType[];
  loading: boolean;
}

export const ExperienceList = ({
  experiences,
  loading
}: ExperienceListProps) => {
  const { t } = useTranslation();
  return (
    <section className="experiences-container">
      <h3 className="section-title">{t("section.experience")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {experiences?.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <div>
                <div className="company">
                  <a href={exp.url} target="_blank" rel="noopener noreferrer">
                    {exp.name}
                  </a>
                </div>
                <div className="job-title">{exp.position}</div>
              </div>
              <div className="date">
                {[exp.startDate, exp.endDate].join(" - ")}
              </div>
            </div>
            {exp.highlights && exp.highlights.length > 0 && (
              <ul>
                {exp?.highlights?.map((highlight, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: highlight }} />
                ))}
              </ul>
            )}
            {exp.stack && exp.stack.length > 0 && (
              <div className="stack">
                <span>{t("experience.stack")}</span>
                {` ${exp.stack.join(", ")}`}
              </div>
            )}
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
