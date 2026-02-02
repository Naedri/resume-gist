import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "@/providers";
import i18n from "@/plugins/i18n";
import "@/styles";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <App
          gistIdEn={import.meta.env.VITE_GIST_ID_EN}
          gistIdFr={import.meta.env.VITE_GIST_ID_FR}
        />
      </LanguageProvider>
    </I18nextProvider>
  </StrictMode>
);
