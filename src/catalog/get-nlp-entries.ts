import { CONSTANTS } from "../commons/constants";
import { queryNegativeLabProEntries } from "../db/queries/query-nlp-entries";
import type { DB, NegativeLabProEntry, Row } from "../types";
import { getBaseName } from "../utils/get-base-name";
import { getGroupCategory } from "../utils/get-group-category";
import { lua } from "../utils/lua";

const getNegativeLabProEntries = (db: DB) => {
  const result: Record<string, NegativeLabProEntry> = {};
  const rows: Row[] = queryNegativeLabProEntries(db);

  rows.forEach((item) => {
    const basename = getBaseName(item);
    const sidecar = `${basename}.${CONSTANTS.SIDECAR_EXTENSION}`;

    if (!result[sidecar]) {
      result[sidecar] = {
        file: {
          baseName: item.baseName,
          extension: item.extension,
          pathFromRoot: item.pathFromRoot,
        },
      } as NegativeLabProEntry;
    }

    // id_global + internalValue
    result[sidecar][getGroupCategory(item.internalValue)] = lua.parse(item.internalValue);

    // nlpKey + nlpValue
    result[sidecar].general ??= {};
    result[sidecar].general[item.nlpKey ?? "unknown"] = item.nlpValue;
  });

  return result;
};

export { getNegativeLabProEntries };
