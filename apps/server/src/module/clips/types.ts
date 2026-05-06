import type { Static } from "elysia";
import type { ClipListQuery, ClipListResponse, ClipModel, CreateClipBody } from "./model";

export type Clip = Static<typeof ClipModel>;
export type CreateClip = Static<typeof CreateClipBody>;
export type ClipQuery = Static<typeof ClipListQuery>;
export type ClipListRes = Static<typeof ClipListResponse>;

export type ClipRow = {
  id: string;
  content: string | null;
  file_path: string | null;
  content_type: Clip["contentType"];
  mime_type: string | null;
  source: string | null;
  is_favorite: number;
  created_at: string;
  updated_at: string;
};
