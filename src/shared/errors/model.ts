import { t } from "elysia";

export const ValidationDetailsItemModel = t.Object({
  path: t.String(),
  message: t.String(),
});

export const ValidationErrorModel = t.Object({
  status: t.Literal(400),
  code: t.Literal("VALIDATION"),
  message: t.String(),
  details: t.Union([t.Array(ValidationDetailsItemModel), t.Null()]),
});

export const NotFoundErrorModel = t.Object({
  status: t.Literal(404),
  code: t.Literal("NOT_FOUND"),
  message: t.String(),
});

export const InternalErrorModel = t.Object({
  status: t.Literal(500),
  code: t.Literal("INTERNAL_ERROR"),
  message: t.String(),
});

export const ErrorResponseModel = t.Union([
  ValidationErrorModel,
  NotFoundErrorModel,
  InternalErrorModel,
]);
