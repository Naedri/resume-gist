import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App
      gistIdEn={import.meta.env.VITE_GIST_ID_EN}
      gistIdFr={import.meta.env.VITE_GIST_ID_FR}
    />
  </StrictMode>
);
