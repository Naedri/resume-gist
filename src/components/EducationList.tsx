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
    <section className="educations-container">
      <h3 className="section-title">{t("section.education")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {education?.map((edu, index) => (
          <div key={index} className="education-item">
            <div className="school">{edu.institution}</div>
            <div className="degree">{edu.studyType}</div>
            {edu.courses && edu.courses.length > 0 && (
              <ul>
                {edu.courses.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
