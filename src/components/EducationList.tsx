import type { EducationType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";
import { getDuration } from "@/utils";

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
        <div className="education-list">
          {educations?.map((e, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <div>
                  <h4 className="education-institution">
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      {e.institution}
                    </a>
                  </h4>
                  <h5 className="education-type">{e.studyType}</h5>
                </div>
                <div className="date">
                  <time dateTime={getDuration(e.startDate, e.endDate)}>
                    {[
                      t("date.xxs", { val: e.startDate }),
                      t("date.xxs", { val: e.endDate })
                    ].join(" - ")}
                  </time>
                </div>
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
        </div>
      </SkeletonLoader>
    </section>
  );
};
