import type { drizzle } from "drizzle-orm/bun-sqlite";

type DB = ReturnType<typeof drizzle>;

type Row = {
  absolutePath: string | null;
  baseName: string | null;
  extension: string | null;
  id_global: string | null;
  internalValue: string | null;
  pathFromRoot: string | null;
};

export { DB, Row };
