import { isDev } from "@server/config/constants";
import { logger } from "@server/config/logger";
import { InternalError, NotFoundError } from "@server/shared/errors";
import {
  InternalErrorSchema,
  NotFoundErrorSchema,
  ValidationErrorSchema,
} from "@server/shared/schemas/error.schema";
import type { ValidationError } from "elysia";
import { Elysia } from "elysia";

const internalErrorResponse = (message: string) => ({
  status: 500 as const,
  code: "INTERNAL_ERROR" as const,
  message: isDev ? message : "Internal server error",
});

export const errorHandlerPlugin = new Elysia({ name: "error" })
  .error({
    NOT_FOUND: NotFoundError,
    INTERNAL_ERROR: InternalError,
  })
  .model({
    ValidationError: ValidationErrorSchema,
    NotFoundError: NotFoundErrorSchema,
    InternalError: InternalErrorSchema,
  })
  .onError({ as: "global" }, ({ code, error, request, set }) => {
    const url = new URL(request.url);
    const message = error instanceof Error ? error.message : "Unknown error";

    logger[code === "NOT_FOUND" ? "warn" : "error"](
      { method: request.method, path: url.pathname, code, message },
      "request failed",
    );

    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return { status: 404 as const, code, message };

      case "VALIDATION":
        set.status = 400;
        return {
          status: 400 as const,
          code: "VALIDATION_ERROR" as const,
          message: "Invalid request data",
          ...(isDev && { details: (error as ValidationError).all ?? null }),
        };

      case "INTERNAL_ERROR":
        set.status = 500;
        return internalErrorResponse(message);

      default:
        set.status = 500;
        return internalErrorResponse(message);
    }
  });
