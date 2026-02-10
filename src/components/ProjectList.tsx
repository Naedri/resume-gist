import type { ProjectType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface ProjectListProps {
  oss?: ProjectType[];
  loading: boolean;
}

export const ProjectList = ({ oss, loading }: ProjectListProps) => {
  const { t } = useTranslation();
  return (
    <section className="projects-container">
      <h3 className="section-title">{t("section.oss")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {oss?.map((item, index) => (
          <div key={index} className="oss-item">
            <div className="oss-title">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </div>
            <div className="oss-description">
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
