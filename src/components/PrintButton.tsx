import { useLanguage, useTelemetry } from "@/hooks";
import { useTranslation } from "react-i18next";

export const PrintButton = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const sendTelemetry = useTelemetry();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
      const language = currentLanguage;
      sendTelemetry("PRINT_CLICKED", { language });
    }
  };

  return (
    <div className="print-button">
      <button onClick={handlePrint} className="no-print">
        {t("button.print")}
      </button>
    </div>
  );
};
