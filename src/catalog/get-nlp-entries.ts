import { CONSTANTS } from "../commons/constants";
import { queryNegativeLabProEntries } from "../queries/query-nlp-entries";
import type { DB, Row } from "../types";
import { getBaseName } from "../utils/get-base-name";

const getNegativeLabProEntries = (db: DB) => {
  const rows: Row[] = queryNegativeLabProEntries(db);

  rows.forEach((item) => {
    const basename = getBaseName(item);
    const raw = `${basename}.${item.extension}`;
    const sidecar = `${basename}.${CONSTANTS.SIDECAR_EXTENSION}`;

    console.log(basename, raw, sidecar, item);
  });

  return {
    foo: rows,
  };
};

export { getNegativeLabProEntries };
