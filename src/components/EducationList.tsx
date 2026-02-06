import type { EducationType } from "@/types";
import { useTranslation } from "react-i18next";

export interface EducationListProps {
  education: EducationType[];
}

export const EducationList = ({ education }: EducationListProps) => {
  const { t } = useTranslation();
  return (
    <section className="education">
      <h3 className="section-title">{t("section.education")}</h3>
      {education.map((edu, index) => (
        <div key={index}>
          <div className="school">{edu.school}</div>
          <div className="degree">{edu.degree}</div>
          <ul>
            {edu.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
