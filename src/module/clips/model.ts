import { t } from "elysia";

export const ClipType = t.Union([
  t.Literal("text"),
  t.Literal("link"),
  t.Literal("code"),
  t.Literal("image"),
]);

export const ClipModel = t.Object({
  id: t.String(),
  content: t.Nullable(t.String()),
  filePath: t.Nullable(t.String()),
  contentType: ClipType,
  mimeType: t.Nullable(t.String()),
  source: t.Nullable(t.String()),
  isFavorite: t.Boolean({ default: false }),
  createdAt: t.String({ format: "date-time" }),
  updatedAt: t.String({ format: "date-time" }),
});

export const CreateClipBody = t.Object({
  content: t.Optional(t.String({ minLength: 1, maxLength: 1_000_000 })),
  filePath: t.Optional(t.String()),
  contentType: ClipType,
  source: t.Optional(t.String()),
  isFavorite: t.Optional(t.Boolean({ default: false })),
});

export const ClipListQuery = t.Object({
  limit: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 50 })),
  offset: t.Optional(t.Numeric({ minimum: 0, default: 0 })),
  contentType: t.Optional(ClipType),
  isFavorite: t.Optional(t.BooleanString()),
});

export const ClipListResponse = t.Object({
  items: t.Array(ClipModel),
  total: t.Number(),
});
