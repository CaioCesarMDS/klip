import { Elysia } from "elysia";
import { initDatabase } from "@/db";
import { errorHandlerPlugin, openapiPlugin, requestLoggerPlugin } from "@/plugins";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { clipsRoutes } from "./module/clips/routes";

export const app = new Elysia()
  .use(errorHandlerPlugin)
  .use(requestLoggerPlugin)
  .use(openapiPlugin)
  .use(clipsRoutes)
  .onStart(() => {
    initDatabase();
  })
  .listen(env.PORT, () => {
    logger.info(`Klip running at http://localhost:${env.PORT}`);
    logger.info(`API docs available at http://localhost:${env.PORT}/docs`);
  });
