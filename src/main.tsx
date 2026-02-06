import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "@/providers";
import { i18n } from "@/plugins";
import "@/styles";
import App from "./App";

const gistIds = {
  en: import.meta.env.VITE_GIST_ID_EN,
  fr: import.meta.env.VITE_GIST_ID_FR
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <App gistIds={gistIds} />
      </LanguageProvider>
    </I18nextProvider>
  </StrictMode>
);
