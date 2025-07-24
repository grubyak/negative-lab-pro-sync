const usage = () => {
  console.debug = process.argv.includes("--verbose") ? console.debug : () => undefined;

  const help = process.argv.includes("--help");
  const go = process.argv.includes("--go");
  const updateCatalog = process.argv.includes("--update-catalog");
  const updateSidecar = process.argv.includes("--update-sidecar");

  if (help || (updateCatalog && updateSidecar) || (!updateCatalog && !updateSidecar)) {
    console.log(`
usage:
  nlp-sync --update-catalog --catalog <path> [--go] [--verbose]
  nlp-sync --update-sidecar --catalog <path> [--go] [--verbose]

options:
  --update-catalog     sync sidecar files into the catalog
  --update-sidecar     generate sidecar files from the catalog
  --catalog <path>     path to lightroom catalog (.lrcat)
  --go                 perform the operation (without this it's a dry-run)
  --verbose            verbose output
  --help               show this help message
`);
    process.exit(1);
  }

  return { go, updateCatalog, updateSidecar };
};

export { usage };
