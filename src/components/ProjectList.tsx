import type { ProjectType } from "@/types";
import { useTranslation } from "react-i18next";
import { SkeletonLoader } from "@/components";

export interface ProjectListProps {
  projects?: ProjectType[];
  loading: boolean;
}

export const ProjectList = ({ projects, loading }: ProjectListProps) => {
  const { t } = useTranslation();
  return (
    <section className="projects-container">
      <h3 className="section-title">{t("section.project")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        {projects?.map((p, index) => (
          <div key={index} className="project-item">
            <div className="project-title">
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
            </div>
            <div className="project-description">
              <span>{p.description}</span>
            </div>
          </div>
        ))}
      </SkeletonLoader>
    </section>
  );
};
