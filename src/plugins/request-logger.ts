import { isDev } from "@server/config/constants";
import { logger } from "@server/config/logger";
import { Elysia } from "elysia";

export const requestLoggerPlugin = new Elysia({ name: "request-logger" }).onAfterHandle(
  { as: "global" },
  ({ request, set }) => {
    if (!isDev) return;
    const url = new URL(request.url);
    if (url.pathname.startsWith("/docs")) return;

    logger.info(
      {
        method: request.method,
        url: url.pathname,
        status: set.status ?? 200,
      },
      "request",
    );
  },
);
