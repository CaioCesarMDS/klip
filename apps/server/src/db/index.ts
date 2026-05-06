import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { logger } from "@/config/logger";

export const db = new Database("klip.db", {
  strict: true,
});

export const initDatabase = () => {
  try {
    const schemaPath = join(import.meta.dir, "schema.sql");
    const schema = readFileSync(schemaPath, "utf-8");

    db.run(schema);

    logger.info("Database initialized!");
  } catch (err) {
    logger.error({ err }, "failed to initialize database");
    throw err;
  }
};
