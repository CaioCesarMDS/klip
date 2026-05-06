export const BASE_CLIP_SELECT = `
  SELECT
    id,
    content,
    file_path,
    content_type,
    mime_type,
    source,
    is_favorite,
    created_at,
    updated_at
  FROM clips
`;

export const SELECT_LIST = (where: string) => `
  ${BASE_CLIP_SELECT}
  ${where}
  ORDER BY is_favorite DESC, created_at DESC
  LIMIT ? OFFSET ?
`;
