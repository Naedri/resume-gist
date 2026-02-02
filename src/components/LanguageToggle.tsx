import { useTranslation } from "react-i18next";

export interface LanguageToggleProps {
  currentLanguage: string;
  toggleLanguage: () => void;
}

export const LanguageToggle = ({
  currentLanguage,
  toggleLanguage
}: LanguageToggleProps) => {
  const { t } = useTranslation();

  return (
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
  );
};
