import { LanguageToggle } from "@/components";
import type { BasicType } from "@/types";

export interface HeaderProps extends BasicType {
  toggleLanguage: () => void;
  currentLanguage: "en" | "fr";
}

export const Header = ({
  name,
  title,
  summary,
  toggleLanguage,
  currentLanguage
}: HeaderProps) => {
  return (
    <header className="header">
      <LanguageToggle
        currentLanguage={currentLanguage}
        toggleLanguage={toggleLanguage}
      />
      <h1 className="name">{name}</h1>
      <h2 className="title">{title}</h2>
      <p className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
    </header>
  );
};
