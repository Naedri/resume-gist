import { createContext } from "react";
import type { Locale } from "@/types";

interface LanguageContextType {
  currentLanguage: Locale;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
