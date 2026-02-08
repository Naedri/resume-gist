import type { EducationType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface EducationListProps {
  education?: EducationType[];
  loading: boolean;
}

export const EducationList = ({ education, loading }: EducationListProps) => {
  const { t } = useTranslation();
  return (
    <section className="education">
      <h3 className="section-title">{t("section.education")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {education?.map((edu, index) => (
          <div key={index}>
            <div className="school">{edu.school}</div>
            <div className="degree">{edu.degree}</div>
            <ul>
              {edu.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
