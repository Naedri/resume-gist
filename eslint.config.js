import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "src/types/json-resume.d.ts"]),

  // CLIENT (React / browser)
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/server.ts", "src/entry-server.tsx"],
    extends: [
      js.configs.recommended,
      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      // tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname
      },
      ecmaVersion: 2020,
      globals: globals.browser
    }
  },

  // SERVER (Node / SSR)
  {
    files: ["src/server.ts", "src/entry-server.tsx", "vite.config.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.node.json",
        tsconfigRootDir: import.meta.dirname
      },
      globals: globals.node
    }
  }
]);
