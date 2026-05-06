import { openapi } from "@elysiajs/openapi";

export const openapiPlugin = openapi({
  path: "/docs",
  exclude: {
    paths: ["/*", ""],
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
});
