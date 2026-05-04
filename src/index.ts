import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .use(
    openapi({
      path: "docs",
      exclude: {
        paths: ["/*"],
      },
      documentation: {
        info: {
          title: "Klip API",
          description: "API documentation for klip",
          version: "1.0.0",
          license: {
            name: "General Public License v3.0",
            url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
          },
        },
      },
    }),
  )
  .use(
    await staticPlugin({
      prefix: "/",
    }),
  )
  .listen(PORT);

console.log(`🦊 Klip running at http://${app.server?.hostname}:${app.server?.port}`);
