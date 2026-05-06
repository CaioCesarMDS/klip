import { Elysia } from "elysia";
import { isDev } from "@/config/constants";
import { logger } from "@/config/logger";

export const requestLoggerPlugin = new Elysia({
  name: "request-logger",
}).onAfterHandle({ as: "global" }, ({ request, set }) => {
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
});
