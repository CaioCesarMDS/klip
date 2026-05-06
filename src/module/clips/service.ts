import { randomUUID as uuid } from "node:crypto";
import { db } from "@server/db";
import { InternalError } from "@server/shared/errors";
import { clipMapper } from "./mapper";
import { BASE_CLIP_SELECT, SELECT_LIST } from "./sql";
import type { Clip, ClipListRes, ClipQuery, ClipRow, CreateClip } from "./types";

export const ClipsService = {
  create(data: CreateClip): Clip {
    const id = uuid();
    const now = new Date().toISOString();

    db.run(
      `INSERT INTO clips (id, content, content_type, source, is_favorite, file_path, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.content ?? null,
        data.contentType,
        data.source ?? null,
        data.isFavorite ? 1 : 0,
        data.filePath ?? null,
        now,
      ],
    );

    const row = db.query<ClipRow, [string]>(`${BASE_CLIP_SELECT} WHERE id = ?`).get(id);
    if (!row) throw new InternalError("Failed to retrieve the created clip");
    return clipMapper.rowToClip(row);
  },

  list({ limit = 50, offset = 0, contentType, isFavorite }: ClipQuery): ClipListRes {
    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (contentType) {
      conditions.push("content_type = ?");
      values.push(contentType);
    }

    if (isFavorite !== undefined) {
      conditions.push("is_favorite = ?");
      values.push(isFavorite ? 1 : 0);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const queryArgs = [...values, limit, offset];

    const items = db
      .query<ClipRow, typeof queryArgs>(SELECT_LIST(whereClause))
      .all(...queryArgs)
      .map(clipMapper.rowToClip);

    const result = db
      .query<{ total: number }, typeof values>(`
      SELECT COUNT(*) as total
      FROM clips ${whereClause}
    `)
      .get(...values);

    return {
      items,
      total: result?.total ?? 0,
    };
  },
} as const;
