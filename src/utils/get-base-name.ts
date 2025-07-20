import type { Row } from "../types";

const getBaseName = (row: Row) => `${row.absolutePath}${row.pathFromRoot}${row.baseName}`;

export { getBaseName };
