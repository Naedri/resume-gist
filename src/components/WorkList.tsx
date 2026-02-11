import type { WorkType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";
import { getDuration } from "@/utils";

export interface WorkListProps {
  works?: WorkType[];
  loading: boolean;
}

export const WorkList = ({ works, loading }: WorkListProps) => {
  const { t } = useTranslation();
  return (
    <section className="works-container">
      <h3 className="section-title">{t("section.work")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {works?.map((w, index) => (
          <div key={index} className="work-item">
            <div className="work-header">
              <div>
                <h4 className="work-name">
                  <a href={w.url} target="_blank" rel="noopener noreferrer">
                    {w.name}
                  </a>
                </h4>
                <h5 className="work-position">{w.position}</h5>
              </div>
              <div className="date">
                <time dateTime={getDuration(w.startDate, w.endDate)}>
                  {[
                    t("date.xs", { val: w.startDate }),
                    t("date.xs", { val: w.endDate })
                  ].join(" - ")}
                </time>
              </div>
            </div>
            {w.highlights && w.highlights.length > 0 && (
              <ul>
                {w?.highlights?.map((highlight, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: highlight }} />
                ))}
              </ul>
            )}
            {w.stack && w.stack.length > 0 && (
              <div className="work-stack">
                <span>{t("work.stack")}</span>
                {` ${w.stack.join(", ")}`}
              </div>
            )}
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
