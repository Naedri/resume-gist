import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import type { ViteDevServer } from "vite";
import type { ResumeSchemaOfficial } from "@/types";

// Resolve runtime directory (important after bundling)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT ?? 5173;
const base = process.env.BASE ?? "/";

async function createServer() {
  // Cached production assets/template
  const templateHtml = isProduction
    ? await fs.readFile(path.resolve(__dirname, "./client/index.html"), "utf-8")
    : "";

  // Create http server
  const app = express();

  // Add Vite or respective production middlewares
  let vite: ViteDevServer | undefined;

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");

    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
      base
    });

    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;

    app.use(compression());
    app.use(
      base,
      sirv(path.resolve(__dirname, "./client"), { extensions: [] })
    );
  }

  // Serve server-rendered HTML
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl.replace(base, "");

      let template: string;

      let render: (url: string) => Promise<{
        head?: string;
        html?: string;
        initialData?: ResumeSchemaOfficial;
      }>;

      if (!isProduction) {
        // Always read fresh template in development
        template = await fs.readFile("./index.html", "utf-8");
        // Injecting the vite HMR client
        template = await vite!.transformIndexHtml(url, template);
        // Load the server entry with ssrLoadModule to transforms ESM source code to be usable in Node.js without bundling
        const entry = (await vite!.ssrLoadModule("/src/entry-server.tsx")) as {
          render: typeof render;
        };
        render = entry.render;
      } else {
        template = templateHtml;
        // Using SSR build result
        const entry = (await import("./entry-server.js")) as {
          render: typeof render;
        };
        render = entry.render;
      }

      // Render the app HTML by assuming entry-server.js export `render` function
      const rendered = await render(url);

      // Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? "")
        .replace(`<!--app-html-->`, rendered.html ?? "")
        .replace(
          `<!--script-initial-data-->`,
          `<script>window.__INITIAL_DATA__ = ${JSON.stringify(
            rendered.initialData ?? ""
          )}</script>`
        );

      // Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite?.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  // Start http server
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
}

void createServer();
