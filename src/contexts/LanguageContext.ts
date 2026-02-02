import { createContext } from "react";

interface LanguageContextType {
  currentLanguage: string;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
