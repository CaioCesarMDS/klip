import type { Clip, ClipRow } from "./types";

export const clipMapper = {
  rowToClip(row: ClipRow): Clip {
    return {
      id: row.id,
      content: row.content,
      filePath: row.file_path,
      contentType: row.content_type,
      mimeType: row.mime_type,
      source: row.source,
      isFavorite: Boolean(row.is_favorite),
      createdAt: new Date(row.created_at).toISOString(),
      updatedAt: new Date(row.updated_at).toISOString(),
    };
  },
};
