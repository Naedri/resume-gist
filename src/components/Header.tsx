import type { ResumeEssential } from "../types";

interface HeaderProps extends ResumeEssential {
  toggleLanguage: () => void;
  currentLanguage: "en" | "fr";
}

export default function Header({
  name,
  title,
  summary,
  toggleLanguage,
  currentLanguage
}: HeaderProps) {
  return (
    <header className="header">
      <div className="lang-toggle no-print" aria-label="Language toggle">
        <button
          onClick={toggleLanguage}
          className="lang-btn"
          aria-pressed={currentLanguage === "en"}
        >
          {currentLanguage === "en" ? <strong>EN</strong> : "EN"}
        </button>
        <span> | </span>
        <button
          onClick={toggleLanguage}
          className="lang-btn"
          aria-pressed={currentLanguage === "fr"}
        >
          {currentLanguage === "fr" ? <strong>FR</strong> : "FR"}
        </button>
      </div>
      <h1 className="name">{name}</h1>
      <h2 className="title" data-i18n="title.role">
        {title}
      </h2>
      <p
        className="summary"
        data-i18n="summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
    </header>
  );
}
