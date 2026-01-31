import type { ProjectType } from "@/types";
import { useTranslation } from "react-i18next";

export interface ProjectListProps {
  oss: ProjectType[];
}

export const ProjectList = ({ oss }: ProjectListProps) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="section-title">{t("section.oss")}</h3>
      {oss.map((item, index) => (
        <div key={index} className="oss-item">
          <div className="oss-title">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </div>
          <div className="oss-description">
            <span
              data-i18n={`oss.${item.title.toLowerCase().replace(" ", "_")}.desc`}
            >
              {item.description}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};
