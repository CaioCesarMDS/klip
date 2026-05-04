import { type Static, t } from "elysia";

export const ValidationErrorSchema = t.Object({
  status: t.Literal(400),
  code: t.Literal("VALIDATION_ERROR"),
  message: t.String(),
  details: t.Optional(t.Any()),
});

export const NotFoundErrorSchema = t.Object({
  status: t.Literal(404),
  code: t.Literal("NOT_FOUND"),
  message: t.String(),
});

export const InternalErrorSchema = t.Object({
  status: t.Literal(500),
  code: t.Literal("INTERNAL_ERROR"),
  message: t.String(),
});

export const ErrorResponseSchema = t.Union([
  ValidationErrorSchema,
  NotFoundErrorSchema,
  InternalErrorSchema,
]);

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
