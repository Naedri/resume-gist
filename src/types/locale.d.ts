import type { ResourceLanguage } from "i18next";

export type Resources = Record<Locale, { translation: ResourceLanguage }>;
export type Locale = "en" | "fr";
