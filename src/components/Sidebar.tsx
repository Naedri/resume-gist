// src/components/Sidebar.tsx
import React from "react";
import { Contact, Education, OSS } from "../types";
import ContactSection from "./Contact";
import Skills from "./Skills";
import EducationSection from "./Education";
import OSSSection from "./OSS";

interface SidebarProps {
  contact: Contact;
  skills: string[];
  education: Education[];
  oss: OSS[];
}

export default function Sidebar({
  contact,
  skills,
  education,
  oss
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <ContactSection {...contact} />
      <Skills skills={skills} />
      <EducationSection education={education} />
      <OSSSection oss={oss} />
      <div className="no-print">
        <button
          onClick={() => window.print()}
          className="print-button"
          data-i18n="print.button"
        >
          Export to PDF
        </button>
      </div>
    </aside>
  );
}
