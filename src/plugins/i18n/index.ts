import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Locale, Resources } from "@/types";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const firstLocale: Locale = "fr";
const altLocale: Locale = "en";

const resources: Resources = {
  en: { translation: en },
  fr: { translation: fr }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: firstLocale,
    fallbackLng: firstLocale,
    interpolation: { escapeValue: false }
  })
  .catch((error) => {
    console.error("Error initializing i18n:", error);
  });

export { i18n, firstLocale, altLocale };
