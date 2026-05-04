import { staticPlugin } from "@elysiajs/static";
import { env } from "@server/config/env";
import { logger } from "@server/config/logger";
import { initDatabase } from "@server/db";
import { errorHandlerPlugin, openapiPlugin, requestLoggerPlugin } from "@server/plugins";
import { Elysia } from "elysia";

export const app = new Elysia()
  .use(errorHandlerPlugin)
  .use(requestLoggerPlugin)
  .use(openapiPlugin)
  .use(await staticPlugin({ prefix: "/" }))
  .onStart(() => {
    initDatabase();
  })
  .listen(env.PORT, () => {
    logger.info(`Klip running at http://localhost:${env.PORT}`);
    logger.info(`API docs available at http://localhost:${env.PORT}/docs`);
  });
