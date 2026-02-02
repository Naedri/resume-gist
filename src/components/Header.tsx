import { LanguageToggle } from "@/components";
import type { BasicType } from "@/types";

export const Header = ({ name, title, summary }: BasicType) => {
  return (
    <header className="header">
      <LanguageToggle />
      <h1 className="name">{name}</h1>
      <h2 className="title">{title}</h2>
      <p className="summary" dangerouslySetInnerHTML={{ __html: summary }} />
    </header>
  );
};
