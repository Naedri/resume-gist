import { LanguageContext } from "@/contexts";
import type { Locale } from "@/types";
import { useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { firstLocale, altLocale } from "@/plugins";
import { useTelemetry } from "@/hooks";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const sendTelemetry = useTelemetry();
  const [language, setLanguage] = useState<Locale>(firstLocale);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === firstLocale ? altLocale : firstLocale;
    sendTelemetry("LANGUAGE_CHANGED", { language: newLanguage });
    setLanguage(newLanguage);
    void i18n.changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage: language, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
