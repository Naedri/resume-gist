import type { WorkType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

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
                <div className="work-name">
                  <a href={w.url} target="_blank" rel="noopener noreferrer">
                    {w.name}
                  </a>
                </div>
                <div className="work-position">{w.position}</div>
              </div>
              <div className="date">{[w.startDate, w.endDate].join(" - ")}</div>
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
