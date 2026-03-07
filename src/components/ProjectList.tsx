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
    <section className="projects-container flow">
      <h3 className="section-title">{t("section.project")}</h3>
      <SkeletonLoader loading={loading} lines={4}>
        <div className="project-list stack">
          {projects?.map((p, index) => (
            <div key={index} className="project-item stack stack-xs">
              <h4 className="project-name">
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name}
                </a>
              </h4>
              <p className="project-description">{p.description}</p>
            </div>
          ))}
        </div>
      </SkeletonLoader>
    </section>
  );
};
