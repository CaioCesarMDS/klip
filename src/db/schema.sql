-- Configurations
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clips (
    id TEXT PRIMARY KEY,

    content TEXT,
    file_path TEXT,

    content_type TEXT NOT NULL,
    mime_type TEXT,

    source TEXT,
    is_favorite INTEGER DEFAULT 0,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,

    CHECK (is_favorite IN (0, 1)),
    CHECK (content_type IN ('text', 'link', 'code', 'json', 'html', 'image')),
    CHECK (content IS NOT NULL OR file_path IS NOT NULL)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_clips_created_at
ON clips (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clips_content_type
ON clips (content_type);
CREATE INDEX IF NOT EXISTS idx_clips_favorite
ON clips (is_favorite);

-- Full-text search (FTS5)
CREATE VIRTUAL TABLE IF NOT EXISTS clips_fts USING fts5(
    content,
    content='clips',
    content_rowid='rowid'
);

-- Triggers FTS
CREATE TRIGGER IF NOT EXISTS clips_ai
AFTER INSERT ON clips
WHEN new.content IS NOT NULL
BEGIN
    INSERT INTO clips_fts(rowid, content)
    VALUES (new.rowid, new.content);
END;

CREATE TRIGGER IF NOT EXISTS clips_ad
AFTER DELETE ON clips
WHEN old.content IS NOT NULL
BEGIN
    INSERT INTO clips_fts(clips_fts, rowid, content)
    VALUES ('delete', old.rowid, old.content);
END;

CREATE TRIGGER IF NOT EXISTS clips_au
AFTER UPDATE ON clips
BEGIN
    INSERT INTO clips_fts(clips_fts, rowid, content)
    SELECT 'delete', old.rowid, old.content
    WHERE old.content IS NOT NULL;

    INSERT INTO clips_fts(rowid, content)
    SELECT new.rowid, new.content
    WHERE new.content IS NOT NULL;
END;
