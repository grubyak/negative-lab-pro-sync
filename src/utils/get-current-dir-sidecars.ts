import { readdir } from "fs/promises";
import { join } from "path";
import { CONSTANTS } from "../constants";

const getCurrentDirSidecars = async () => {
  const dir = process.cwd();
  const entries = await readdir(dir, { withFileTypes: true });

  return entries
    .filter((item) => item.isFile() && item.name.endsWith(`.${CONSTANTS.SIDECAR_EXTENSION}`))
    .map((item) => join(dir, item.name));
};

export { getCurrentDirSidecars };
