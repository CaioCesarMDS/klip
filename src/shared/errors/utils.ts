import { isDev } from "@server/config/constants";
import type { TSchema } from "@sinclair/typebox";
import type { ValidationError } from "elysia";
import type { ValidationDetailsItem } from "./types";

export const createInternalError = (message: string) => ({
  status: 500 as const,
  code: "INTERNAL_ERROR" as const,
  message: isDev ? message : "Internal server error",
});

export const formatValidationDetails = (
  errors?: ValidationError["all"],
): ValidationDetailsItem[] | null => {
  if (!errors || errors.length === 0) return null;

  return errors.map((err) => {
    const schema = err.schema as TSchema | undefined;

    if (schema && "anyOf" in schema && Array.isArray(schema.anyOf)) {
      const values = schema.anyOf
        .map((s) => ("const" in s ? String(s.const) : null))
        .filter((v): v is string => v !== null);

      if (values.length > 0) {
        return {
          path: err.path,
          message: `Must be one of: ${values.join(", ")}`,
        };
      }
    }

    return {
      path: err.path,
      message: err.summary || err.message,
    };
  });
};
