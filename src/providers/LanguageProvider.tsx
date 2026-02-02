import { LanguageContext } from "@/contexts";
import { useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "fr" : "en";
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
