import type { EducationType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface EducationListProps {
  educations?: EducationType[];
  loading: boolean;
}

export const EducationList = ({ educations, loading }: EducationListProps) => {
  const { t } = useTranslation();
  return (
    <section className="educations-container">
      <h3 className="section-title">{t("section.education")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {educations?.map((e, index) => (
          <div key={index} className="education-item">
            <div className="school">{e.institution}</div>
            <div className="degree">{e.studyType}</div>
            <div className="date">
              {[
                t("date.xxs", { val: e.startDate }),
                t("date.xxs", { val: e.endDate })
              ].join(" - ")}
            </div>
            {e.courses && e.courses.length > 0 && (
              <ul>
                {e.courses.map((course, i) => (
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
