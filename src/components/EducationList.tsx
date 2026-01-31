import type { EducationType } from "@/types";
import { useTranslation } from "react-i18next";

export interface EducationListProps {
  education: EducationType[];
}

export const EducationList = ({ education }: EducationListProps) => {
  const { t } = useTranslation();
  return (
    <section className="education">
      <h3 className="section-title" data-i18n="section.education">
        {t("section.education")}
      </h3>
      {education.map((edu, index) => (
        <div key={index}>
          <div className="school">{edu.school}</div>
          <div
            className="degree"
            data-i18n={`edu.${edu.school.toLowerCase().replace(" ", "_")}`}
          >
            {edu.degree}
          </div>
          <ul>
            {edu.bullets.map((bullet, i) => (
              <li
                key={i}
                data-i18n={`edu.${edu.school.toLowerCase().replace(" ", "_")}.b${i + 1}`}
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
