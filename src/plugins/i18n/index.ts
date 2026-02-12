import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
import type { Iso8601, Locale, Resources } from "@/types";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import { parseDate, TODAY } from "@/utils";

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

i18n.services.formatter?.add("DATE_XS", (value: Iso8601, lng?: string) => {
  if (value == TODAY) return t("date.today");
  const date = parseDate(value);
  return date.toLocaleDateString(lng, {
    month: "2-digit",
    year: "numeric"
  });
});

i18n.services.formatter?.add("DATE_XXS", (value: Iso8601, lng?: string) => {
  if (value == TODAY) return t("date.today");
  const date = parseDate(value);
  return date.toLocaleDateString(lng, {
    year: "numeric"
  });
});

export { i18n, firstLocale, altLocale };
