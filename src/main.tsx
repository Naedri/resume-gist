import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "@/providers";
import { firstLocale, i18n } from "@/plugins";
import "@/styles";
import App from "./App";
import { gistIds } from "@/utils";

document.documentElement.lang = firstLocale;
document.title =
  import.meta.env.VITE_DOCUMENT_TITLE ??
  import.meta.env.VITE_RESUME_NAME ??
  "Resume Telemetry";

const name = import.meta.env.VITE_RESUME_NAME;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <App gistIds={gistIds} name={name} />
      </LanguageProvider>
    </I18nextProvider>
  </StrictMode>
);
