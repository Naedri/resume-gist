import type { ExperienceType } from "@/types";
import { useTranslation } from "react-i18next";

export interface ExperienceListProps {
  experiences: ExperienceType[];
}

export const ExperienceList = ({ experiences }: ExperienceListProps) => {
  const { t } = useTranslation();
  return (
    <section>
      <h3 className="section-title">{t("section.experience")}</h3>
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
              <div className="job-title">{exp.jobTitle}</div>
            </div>
            <div className="date">{exp.date}</div>
          </div>
          {exp.projects.map((project, idx) => (
            <div key={idx}>
              <div className="project-title">{project.title}</div>
              <ul>
                {project.bullets.map((bullet, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: bullet }} />
                ))}
              </ul>
              <div className="stack">
                <span>{t("section.stack")}</span>: {project.stack.join(", ")}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};
