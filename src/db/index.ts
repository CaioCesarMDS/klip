import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const db = new Database("klip.db", {
  strict: true,
});

const schemaPath = join(import.meta.dir, "schema.sql");
const schema = readFileSync(schemaPath, "utf-8");

export const initDatabase = () => {
  console.log("Initializing database...");
  db.run(schema);
  console.log("Database ready.");
};
