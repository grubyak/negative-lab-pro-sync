import { CONSTANTS } from "../commons/constants";

const x = CONSTANTS.PARAMS;

const usage = () => {
  const go = process.argv.includes(x.GO);
  const updateCatalog = process.argv.includes(x.UPDATE_CATALOG);
  const updateSidecar = process.argv.includes(x.UPDATE_SIDECAR);
  const all = process.argv.includes(x.ALL);
  const catalog = process.argv.find((item) => item.startsWith(`${x.CATALOG}=`))?.split("=")[1] ?? null;
  const help =
    process.argv.includes(x.HELP) || !catalog || (updateCatalog && updateSidecar) || (!updateCatalog && !updateSidecar);

  if (help) {
    console.log(`
usage:
  ${CONSTANTS.APP} ${x.UPDATE_SIDECAR} ${x.CATALOG}<path> [${x.GO}] [${x.VERBOSE}] [${x.ALL}]
  ${CONSTANTS.APP} ${x.UPDATE_CATALOG} ${x.CATALOG}<path> [${x.GO}] [${x.VERBOSE}]

options:
  ${x.ALL}              applicable to ${x.UPDATE_SIDECAR}, include all nlp files from the catalog (default: current folder and subfolders)
  ${x.UPDATE_SIDECAR}   sync: .lrcat -> .${CONSTANTS.SIDECAR_EXTENSION}
  ${x.UPDATE_CATALOG}   sync: current folder .${CONSTANTS.SIDECAR_EXTENSION} -> .lrcat
  ${x.CATALOG}=<path>   absolute path of lightroom catalog
  ${x.GO}               apply changes (default: dry-run)
  ${x.VERBOSE}          verbose output

note:
  tested only with negative lab pro ${CONSTANTS.NLP_VERSION}
`);

    process.exit(1);
  }

  console.debug = process.argv.includes(x.VERBOSE) ? console.debug : () => undefined;

  return { all, catalog, go, updateCatalog, updateSidecar };
};

export { usage };
