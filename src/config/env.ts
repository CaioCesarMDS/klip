import { Value } from "@sinclair/typebox/value";
import { type Static, t } from "elysia";
import { logger } from "./logger";

const envSchema = t.Object({
  NODE_ENV: t.Union([t.Literal("development"), t.Literal("production"), t.Literal("test")]),
  PORT: t.Number({ default: 3000 }),
});

type EnvSchemaType = Static<typeof envSchema>;

export const loadEnv = (input: unknown): EnvSchemaType => {
  const converted = Value.Convert(envSchema, input);
  const cleaned = Value.Clean(envSchema, converted);

  if (!Value.Check(envSchema, cleaned)) {
    throw Array.from(Value.Errors(envSchema, cleaned));
  }

  return cleaned as EnvSchemaType;
};

const initEnv = (): EnvSchemaType => {
  try {
    return loadEnv(process.env);
  } catch (error: unknown) {
    const isValidationError = Array.isArray(error);

    logger.fatal(
      isValidationError ? { errors: error } : { error },
      isValidationError
        ? "Environment validation failed"
        : "Unexpected error during environment initialization",
    );

    process.exit(1);
  }
};

export const env = initEnv();
export type Env = typeof env;
