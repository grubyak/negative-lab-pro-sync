const APP = "nlpx";
const RAW_EXTENSION = "CR3";
const SIDECAR_EXTENSION = `${APP}.json`;
const LC_VERSION = "14.3.1";
const NLP_VERSION = "3.0.2";
const NLP_PROPERTY_MATCH = "nlp%";

const PARAMS = {
  ALL: "--all",
  CATALOG: "--catalog",
  GO: "--go",
  HELP: "--help",
  UPDATE_CATALOG: "--update-catalog",
  UPDATE_SIDECAR: "--update-sidecar",
  VERBOSE: "--verbose",
};

const CONSTANTS = {
  APP,
  LC_VERSION,
  NLP_PROPERTY_MATCH,
  NLP_VERSION,
  PARAMS,
  RAW_EXTENSION,
  SIDECAR_EXTENSION,
} as const;

export { CONSTANTS };
