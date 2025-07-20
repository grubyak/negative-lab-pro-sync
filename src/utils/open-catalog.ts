import { drizzle } from "drizzle-orm/bun-sqlite";
import { getCatalogName } from "./get-catalog-name";

const openCatalog = () => drizzle(getCatalogName());

export { openCatalog };
