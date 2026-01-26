// src/components/Skills.tsx
import React from "react";

interface SkillsProps {
  skills: string[];
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
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
