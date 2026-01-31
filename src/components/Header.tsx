import type { BasicType } from "@/types";
import { useTranslation } from "react-i18next";

export interface HeaderProps extends BasicType {
  toggleLanguage: () => void;
  currentLanguage: "en" | "fr";
}

export const Header = ({
  name,
  title,
  summary,
  toggleLanguage,
  currentLanguage
}: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <div className="lang-toggle no-print" aria-label="Language toggle">
        <button
          onClick={toggleLanguage}
          className="lang-btn"
          aria-pressed={currentLanguage === "en"}
        >
          {currentLanguage === "en" ? (
            <strong>{t("language.en")}</strong>
          ) : (
            t("language.en")
          )}
        </button>
        <span> | </span>
        <button
          onClick={toggleLanguage}
          className="lang-btn"
          aria-pressed={currentLanguage === "fr"}
        >
          {currentLanguage === "fr" ? (
            <strong>{t("language.fr")}</strong>
          ) : (
            t("language.fr")
          )}
        </button>
      </div>
      <h1 className="name">{name}</h1>
      <h2 className="title">{title}</h2>
      <p className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
    </header>
  );
};
