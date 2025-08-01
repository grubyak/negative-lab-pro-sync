import { drizzle } from "drizzle-orm/bun-sqlite";

const openCatalog = (catalog: string) => drizzle(catalog);

export { openCatalog };
