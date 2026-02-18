import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import { LanguageProvider } from "@/providers";
import { firstLocale, i18n } from "@/plugins";
import { gistIds } from "@/utils";
import { fetchRemoteResume } from "@/utils";

export async function render() {
  let initialData = null;
  try {
    if (gistIds[firstLocale]) {
      initialData = await fetchRemoteResume(gistIds[firstLocale] as string);
    }
  } catch (e) {
    console.error("Failed to fetch initial gist data", e);
  }

  const html = renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          <App gistIds={gistIds} initialData={initialData} />
        </LanguageProvider>
      </I18nextProvider>
    </StrictMode>
  );
  return { html, initialData };
}
