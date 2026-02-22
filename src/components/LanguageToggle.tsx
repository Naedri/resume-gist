import { useLanguage } from "@/hooks";
import { altLocale, firstLocale } from "@/plugins";
import type { Locale } from "@/types";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { t } = useTranslation();
  const { currentLanguage, toggleLanguage } = useLanguage();

  const renderButton = (locale: Locale) => {
    const isActive = currentLanguage === locale;
    return (
      <button
        onClick={toggleLanguage}
        aria-pressed={isActive}
        className={isActive ? "is-active" : ""}
        title={t(`language.long.${locale}`)}
      >
        {isActive ? (
          <strong>{t(`language.short.${locale}`)}</strong>
        ) : (
          t(`language.short.${locale}`)
        )}
      </button>
    );
  };

  return (
    <div className="lang-toggle no-print" aria-label="Language toggle">
      {renderButton(firstLocale)}
      <span> | </span>
      {renderButton(altLocale)}
    </div>
  );
};
