import type { ExperienceType } from "@/types";
import { useTranslation } from "react-i18next";

export interface ExperienceListProps {
  experiences: ExperienceType[];
}

export const ExperienceList = ({ experiences }: ExperienceListProps) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="section-title" data-i18n="section.experience">
        {t("section.experience")}
      </h3>
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          <div className="experience-header">
            <div>
              <div className="company">
                <a
                  href={exp.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exp.company.name}
                </a>
              </div>
              <div
                className="job-title"
                data-i18n={`job.${exp.jobTitle.toLowerCase().replace(" ", "_")}`}
              >
                {exp.jobTitle}
              </div>
            </div>
            <div
              className="date"
              data-i18n={`${exp.company.name.toLowerCase()}.date`}
            >
              {exp.date}
            </div>
          </div>
          {exp.projects.map((project, idx) => (
            <div key={idx}>
              <div className="project-title">{project.title}</div>
              <ul>
                {project.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    data-i18n={`${exp.company.name.toLowerCase()}.b${i + 1}`}
                    dangerouslySetInnerHTML={{ __html: bullet }}
                  />
                ))}
              </ul>
              <div className="stack">
                <span data-i18n="stack.label">{t("section.stack")}</span>:{" "}
                {project.stack.join(", ")}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
