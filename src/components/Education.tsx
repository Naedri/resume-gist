import type { Education } from "../types";

interface EducationProps {
  education: Education[];
}

export default function EducationSection({ education }: EducationProps) {
  return (
    <section className="education">
      <h3 className="section-title" data-i18n="section.education">
        Education
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
}
