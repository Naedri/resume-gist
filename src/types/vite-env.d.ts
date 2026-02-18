interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  strictImportMetaEnv: unknown;
}
interface ImportMetaEnv {
  readonly VITE_GIST_ID_EN: string;
  readonly VITE_GIST_ID_FR: string;
  readonly VITE_RESUME_NAME?: string;
  readonly VITE_DOCUMENT_TITLE?: string;
  readonly VITE_DOCUMENT_LANG?: Locale;
  readonly VITE_TELEMETRY_URL?: string;
  readonly VITE_TELEMETRY_HEADER_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
