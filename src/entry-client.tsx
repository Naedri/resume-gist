import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "@/providers";
import { firstLocale, i18n } from "@/plugins";
import "@/styles";
import App from "./App";
import { gistIds } from "@/utils";
import type { ResumeSchemaOfficial } from "@/types";

document.documentElement.lang = firstLocale;
document.title =
  import.meta.env.VITE_DOCUMENT_TITLE ??
  import.meta.env.VITE_RESUME_NAME ??
  "resume";

const name = import.meta.env.VITE_RESUME_NAME;

const initialData = (
  window as Window & { __INITIAL_DATA__?: ResumeSchemaOfficial }
).__INITIAL_DATA__;

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <App gistIds={gistIds} initialData={initialData} name={name} />
      </LanguageProvider>
    </I18nextProvider>
  </StrictMode>
);
