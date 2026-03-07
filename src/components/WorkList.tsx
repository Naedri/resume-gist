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
    <section className="works-container flow">
      <h3 className="section-title">{t("section.work")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <div className="work-list stack">
          {works?.map((w, index) => (
            <div key={index} className="work-item stack">
              <div className="work-header cluster">
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
              {w.summary && <p className="work-summary">{w.summary}</p>}
              {w.highlights && w.highlights.length > 0 && (
                <ul className="work-highlight-list stack stack-xs">
                  {w?.highlights?.map((highlight, i) => (
                    <li className="work-highlight" key={i}>
                      {highlight}
                    </li>
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
        </div>
      </SkeletonLoader>
    </section>
  );
};
