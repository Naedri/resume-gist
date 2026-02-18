import { useLanguage } from "@/hooks";
import { altLocale, firstLocale } from "@/plugins";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <div className="lang-toggle no-print" aria-label="Language toggle">
      <button
        onClick={toggleLanguage}
        className="lang-btn"
        aria-pressed={currentLanguage === firstLocale}
      >
        {currentLanguage === firstLocale ? (
          <strong>{t(`language.${firstLocale}`)}</strong>
        ) : (
          t(`language.${firstLocale}`)
        )}
      </button>
      <span> | </span>
      <button
        onClick={toggleLanguage}
        className="lang-btn"
        aria-pressed={currentLanguage === altLocale}
      >
        {currentLanguage === altLocale ? (
          <strong>{t(`language.${altLocale}`)}</strong>
        ) : (
          t(`language.${altLocale}`)
        )}
      </button>
    </div>
  );
};
