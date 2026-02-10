import { LanguageToggle, SkeletonLoader } from "@/components";
import type { BasicType } from "@/types";
import { useTranslation } from "react-i18next";

export interface HeaderProps extends BasicType {
  loading: boolean;
}

export const Header = ({ name, label, summary, loading }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <header className="header-container">
      <LanguageToggle />
      <h1 className="name">{name ?? t("section.header.name")}</h1>
      <h2 className="label">
        {loading ? t("message.loading") : (label ?? "")}
      </h2>
      <SkeletonLoader loading={loading} lines={4}>
        {summary && (
          <p
            className="summary"
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
      </SkeletonLoader>
    </header>
  );
};
