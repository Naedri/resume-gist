import type { Skill } from "../types";
interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section>
      <h3 className="section-title" data-i18n="section.skills">
        Skills
      </h3>
      <ul className="skills-list">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
